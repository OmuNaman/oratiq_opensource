import express from "express";
import cors from "cors";
import multer from "multer";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import fs from "fs";
import path from "path";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const upload = multer({ dest: "uploads/" }); // Files will be stored in 'uploads/' temporarily

// Configure Gemini API
const apiKey = "Your_Gemini_API_Key"; //YOUR API KEY
const genAI = new GoogleGenerativeAI(apiKey);
const fileManager = new GoogleAIFileManager(apiKey);

async function uploadToGemini(path, mimeType) {
  const uploadResult = await fileManager.uploadFile(path, {
    mimeType,
    displayName: path,
  });
  const file = uploadResult.file;
  console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
  return file;
}

const model = genAI.getGenerativeModel({
  model: "gemini-exp-1206",
  systemInstruction: "You are a state-of-the-art multilingual transcription assistant designed to convert audio into high-quality, accurate text in any language. Your primary objectives are:\n\nLanguage Identification: Automatically detect the language of the input audio.\nContextual Understanding: Accurately transcribe speech while maintaining proper grammar, punctuation, and context-specific nuances.\nMultilingual Support: Handle code-switching (multiple languages in the same audio) seamlessly.\nOutput Quality: Ensure the transcription is polished, formatted, and ready for professional use.\nSpecific Task Details:\n\nInput: Audio recordings in diverse languages, accents, and speaking speeds.\nOutput: Clear, error-free text with proper sentence structure and punctuation.\nAdditional Requirements:\nRemove filler words (\"um,\" \"uh\") unless specified.\nFlag any ambiguous or unclear sections for manual review with a timestamp.\nGuidelines:\n\nFocus on delivering precise, human-like transcription results.\nFor uncommon words or names, make an educated guess based on phonetics and context.\nPrioritize speed and accuracy, but avoid cutting corners.\nOutput Format:\nMaintain line breaks for readability in long transcriptions.\nHighlight any detected errors or uncertainties.\n",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// API endpoint for audio transcription
app.post(
  "/transcribe",
  upload.single("audioFile"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No audio file uploaded." });
    }

    const filePath = req.file.path;
    const mimeType = req.file.mimetype;

    try {
      // Upload the file to Gemini File Manager
      const file = await uploadToGemini(filePath, mimeType);
      const chatSession = model.startChat({
        generationConfig,
        history: [
          {
            role: "user",
            parts: [
              {
                fileData: {
                  mimeType: file.mimeType,
                  fileUri: file.uri,
                },
              },
            ],
          },
        ],
      });

      // Send a message to start the transcription
      const result = await chatSession.sendMessage("Transcribe This Audio!");
      const transcription = result.response.text();
      console.log(transcription)

      // Delete the local file after a delay (e.g., 5 minutes)
      setTimeout(() => {
        fs.unlink(filePath, (err) => {
          if (err) console.error("Error deleting file:", err);
          else console.log("File deleted:", filePath);
        });
      }, 300000); // 300000 ms = 5 minutes

      // Send the transcription back to the client
      res.json({ transcription });
    } catch (error) {
      console.error("Error during transcription:", error);
      res.status(500).json({ error: "Transcription failed." });
    }
  }
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});