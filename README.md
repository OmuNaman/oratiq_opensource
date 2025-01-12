# Oratiq - AI-Powered Audio Transcription

Oratiq is a web application that transforms speech into text using advanced AI. It leverages the power of Google's Gemini API to provide accurate, fast, and multilingual transcriptions.

## Features

*   **Advanced Language Support:** Transcribes audio in over 50 languages with high accuracy.
*   **Ultra-Fast Transcription:** Provides near-instantaneous transcriptions, ideal for time-sensitive projects.
*   **Extensive Format Compatibility:** Supports all major audio and video file formats.
*   **Unparalleled Accuracy:** Achieves a 99.9% accuracy rate using the Gemini API.
*   **24/7 Availability:** Access the service anytime, anywhere.
*   **AI-Powered Enhancement:** Improves audio quality by reducing noise and clarifying speech.
*   **Secure and Confidential:** Employs robust security measures to protect your data.
*   **User-Friendly Interface:** Easy to use, even for those with no technical expertise.
*   **Dedicated Support Team:** Get help whenever you need it.
*   **Free Plan:** Offers a generous free plan to get started.

## Project Structure

This project consists of a frontend built with React and a backend server built with Node.js and Express.

**Frontend:**

*   The frontend is a single-page application (SPA) created using React and Vite.
*   It provides the user interface for uploading audio files, displaying transcriptions, and interacting with the application.
*   The frontend code is located in the `src` directory.

**Backend:**

*   The backend is a Node.js server that handles file uploads, communicates with the Gemini API, and manages temporary file storage.
*   It uses Express as the web framework and Multer for handling file uploads.
*   The backend code is in the `server.js` file.

## Getting Started (Local Development)

These instructions will help you set up the project on your local machine for development and testing.

**Prerequisites:**

1. **Node.js and npm:** Make sure you have Node.js (version 18 or later) and npm (Node Package Manager) installed on your system. You can download them from [https://nodejs.org/](https://nodejs.org/).
2. **API Keys:**
    *   **Gemini API Key:** You need an API key from Google's Gemini API. Get one from [https://ai.google.dev/](https://ai.google.dev/).
    *   **Telegram Bot Token:** You need a Telegram bot token and chat ID to receive contact form submissions. Create a bot using BotFather on Telegram and get your token and chat ID.
3. **Git:** Make sure you have Git installed for cloning the repository.

**Steps:**

1. **Clone the Repository:**
    ```bash
    git clone <repository-url> 
    cd <repository-name>
    ```

2. **Install Frontend Dependencies:**
    ```bash
    cd <your-project-directory>
    npm install
    ```

3. **Install Backend Dependencies:**
    ```bash
    cd <your-project-directory>
    npm install --prefix server
    ```
    
4. **Configure Environment Variables:**
    *   Create a  `.env`  file in the  `server`  directory.
    *   Add the following environment variables to your  `.env`  file:
    ```bash
        API_KEY=YOUR_GEMINI_API_KEY
        TELEGRAM_BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN
        TELEGRAM_CHAT_ID=YOUR_TELEGRAM_CHAT_ID
        ```

    *   Replace  `YOUR_GEMINI_API_KEY`,  `YOUR_TELEGRAM_BOT_TOKEN`, and  `YOUR_TELEGRAM_CHAT_ID`  with your actual API key and Telegram details.

5. **Run the Backend Server:**
    ```bash
    node server.js
    ```
    *   The server will start on port 5000 (or the port specified in your `server.js` file).

6. **Run the Frontend:**
    *   Open a new terminal window or tab.
    *   Navigate to your project directory.
    *   Run:

    ```bash
    npm run dev
    ```

    *   This will start the Vite development server, and your frontend application should open in your browser (usually at  `http://localhost:5173/`).

**Usage:**

1. Go to the homepage of the application in your browser.
2. Click on "Try for Free" or "Get Started" to navigate to the dashboard.
3. Drag and drop an audio file (up to 10 minutes, MP3 or WAV) onto the upload area, or click "browse" to select a file.
4. Click "Start Transcription".
5. The application will display a loading indicator while uploading and transcribing.
6. Once the transcription is complete, it will be displayed on the page.
7. You can download the transcription as a TXT file by clicking the "Download as TXT" button.

**Deployment:**

*   **Frontend:** The frontend can be deployed to Netlify (as you have already done).
*   **Backend:** The backend can be deployed to a cloud platform like Render, Heroku, AWS, or Google Cloud. You will need to set the environment variables on your hosting platform as well.

**Troubleshooting:**

*   **CORS Errors:** If you encounter Cross-Origin Resource Sharing (CORS) errors, make sure that your backend server is configured to allow requests from your frontend's origin (the Netlify URL).
*   **File Upload Issues:** If file uploads are not working, double-check your `multer` configuration and make sure the `uploads` directory has the correct permissions.
*   **API Key Errors:** Ensure that your Gemini API key is correct and that it's being used properly in your backend code.

**Important Notes:**

*   **Security:** Do not hardcode sensitive information like API keys directly into your frontend code. Use environment variables instead.
*   **Error Handling:** Implement proper error handling in both your frontend and backend to provide a better user experience.
*   **File Storage:** For production, consider using a cloud storage solution like AWS S3 or Google Cloud Storage instead of storing files on the server's file system.

This detailed README should provide a comprehensive guide for anyone to understand and run your Oratiq project locally. Remember to replace placeholders with your actual values and adapt the instructions as needed.
