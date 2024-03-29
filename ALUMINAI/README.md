# ALUMINAI

ALUMINAI is an innovative web app designed to revolutionize the way custom doors are designed, quoted, and visualized. By harnessing the power of 3D visualization, augmented reality, AI-based recommendations, and seamless data export functionalities, ALUMINAI aims to provide an intuitive platform for both individuals and businesses.

## Overview

The app's architecture leverages a Node.js backend with Express for API management, paired with a React frontend to ensure a dynamic and responsive Single Page Application (SPA). Secure authentication is handled via JWT, with data storage options including MongoDB or PostgreSQL. The integration of Three.js and AR.js allows for immersive 3D and AR experiences, while TensorFlow.js powers intelligent design recommendations. SheetJS facilitates the export of quotes to Excel, ensuring a comprehensive and user-friendly experience.

## Features

- **Custom Door Design**: Users can create and personalize door designs in 3D.
- **Real-time Quotation**: Obtain material costs and project quotations instantly.
- **Augmented Reality Visualization**: View custom door designs in real space.
- **AI-based Recommendations**: Receive design suggestions based on preferences.
- **Data Export**: Easily export quotations to Excel for record-keeping.
- **Chatbot Assistance**: An AI-powered chatbot provides expert guidance on door and window design.

## Getting Started

### Requirements

- Docker and Docker Compose
- Node.js
- MongoDB or PostgreSQL
- An internet connection for AR and AI functionalities

### Quickstart

1. Clone the repository and navigate to the project directory.
2. Build the Docker containers using `docker-compose build`.
3. Start the application with `docker-compose up`. Access the client at `http://localhost:3000` and the server at `http://localhost:5000`.

Please ensure you have the necessary environment variables configured, including the OpenAI API key for the chatbot functionalities.

### License

Copyright (c) 2024.