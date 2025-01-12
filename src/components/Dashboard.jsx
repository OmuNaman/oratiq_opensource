import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  X,
  AlertCircle,
  Check,
  Loader2,
  Play,
  Pause,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // Add isPlaying state
  const inputRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (file) => {
    if (!file.type.startsWith("audio/")) {
      return "Please upload an audio file";
    }

    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.src = URL.createObjectURL(file);

      audio.addEventListener("loadedmetadata", () => {
        URL.revokeObjectURL(audio.src);
        if (audio.duration > 600) {
          reject("File duration exceeds 10 minutes limit");
        } else {
          resolve(null);
        }
      });

      audio.addEventListener("error", () => {
        URL.revokeObjectURL(audio.src);
        reject("Error loading audio file");
      });
    });
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setError("");

    const droppedFile = e.dataTransfer.files[0];
    try {
      const validationError = await validateFile(droppedFile);
      if (!validationError) {
        setFile(droppedFile);
      } else {
        setError(validationError);
      }
    } catch (err) {
      setError(err);
    }
  };

  const handleChange = async (e) => {
    e.preventDefault();
    setError("");

    if (e.target.files && e.target.files[0]) {
      try {
        const validationError = await validateFile(e.target.files[0]);
        if (!validationError) {
          setFile(e.target.files[0]);
        } else {
          setError(validationError);
        }
      } catch (err) {
        setError(err);
      }
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("audioFile", file);

    try {
      const response = await fetch("http://localhost:5000/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setTranscription(data.transcription);
    } catch (error) {
      setError(error.message);
    } finally {
      setUploading(false);
      setIsTranscribing(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([transcription], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transcription.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div
          onClick={() => navigate("/")}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Oratiq
          </span>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Upload Audio File</h1>

          <div
            className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-all ${
              dragActive
                ? "border-blue-500 bg-blue-500/10"
                : "border-gray-600 hover:border-gray-500"
            } ${error ? "border-red-500 bg-red-500/10" : ""}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={inputRef}
              type="file"
              accept="audio/*"
              onChange={handleChange}
              className="hidden"
            />

            {!file && (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Upload className="w-12 h-12 text-gray-400" />
                </div>
                <div>
                  <p className="text-lg">
                    Drag and drop your audio file here, or{" "}
                    <button
                      onClick={() => inputRef.current?.click()}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      browse
                    </button>
                  </p>
                  <p className="text-gray-400 mt-2">
                    Maximum duration: 10 minutes
                  </p>
                </div>
              </div>
            )}

            {file && !error && (
              <div className="space-y-4">
                {/* Audio Player */}
                {file && (
                  <div className="flex items-center justify-center space-x-2">
                    <button onClick={handlePlayPause}>
                      {isPlaying ? (
                        <Pause className="w-6 h-6 text-blue-500" />
                      ) : (
                        <Play className="w-6 h-6 text-blue-500" />
                      )}
                    </button>
                    <audio
                      ref={audioRef}
                      src={URL.createObjectURL(file)}
                      onEnded={() => setIsPlaying(false)}
                    />
                    <span className="text-lg">{file.name}</span>
                    <button
                      onClick={() => setFile(null)}
                      className="p-1 hover:bg-gray-700 rounded"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={uploading || isTranscribing}
                  className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Uploading...</span>
                    </div>
                  ) : isTranscribing ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Transcribing...</span>
                    </div>
                  ) : (
                    "Start Transcription"
                  )}
                </button>
              </div>
            )}

            {error && (
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2 text-red-500">
                  <AlertCircle className="w-6 h-6" />
                  <span className="text-lg">{error}</span>
                </div>
                <button
                  onClick={() => {
                    setError("");
                    setFile(null);
                  }}
                  className="text-blue-400 hover:text-blue-300"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>

          {/* Display Transcription */}
          {transcription && (
            <div className="mt-8 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Transcription:</h3>
              <div className="text-gray-300 whitespace-pre-wrap">
                {transcription}
              </div>
              <button
                onClick={handleDownload}
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg mt-4"
              >
                Download as TXT
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;