# ALUMINAI

ALUMINAI is a web application designed to revolutionize the way custom doors are designed, quoted, and visualized. It integrates cutting-edge technologies such as 3D visualization, augmented reality (AR), artificial intelligence (AI)-based recommendations, data export functionalities, and multimodal interactions including image upload and analysis to provide an intuitive and comprehensive user experience.

## Overview

ALUMINAI leverages a modern tech stack comprising Node.js and Express for the backend, with a React-based frontend for a dynamic and responsive single-page application (SPA). Authentication is handled via JWT for secure access, while MongoDB or PostgreSQL databases are utilized based on data structure requirements. Visualization and interactivity are enhanced with Three.js for 3D modeling, AR.js for augmented reality experiences, TensorFlow.js for AI-based design recommendations, and SheetJS for exporting quotes to Excel. The application also supports image upload and analysis, allowing users to influence design recommendations with their own photos.

The project is structured into a client and server directory, aligning with the separation of concerns principle. This structure facilitates independent development, testing, and deployment processes for the frontend and backend.

## Features

- **Custom Door Design**: Users can create and customize door designs using a 3D interface, with the ability to apply different materials, styles, and dimensions.
- **Real-time Quotations**: Instantly generate and export material and cost breakdowns for selected door designs to Excel, email, and PDF formats.
- **Augmented Reality Visualization**: View how door designs would look in real space using AR technology for a realistic perspective of the final product.
- **AI-based Recommendations**: Receive personalized design suggestions based on user preferences, trends, and uploaded images.
- **Secure User Authentication**: Register and login functionality with secure token-based authentication to protect user accounts and data.
- **Data Export**: Export quotes and designs directly to Excel for easy management and sharing, with support for additional formats.
- **Multimodal Interaction**: Upload images for analysis to influence design recommendations, with support for AI-driven image analysis and generative design creation.

## Getting started

### Requirements

- Node.js
- MongoDB or PostgreSQL
- React

### Quickstart

1. Clone the repository to your local machine.
2. Navigate to the project directory and install dependencies:
    - For the server: `npm install`
    - For the client: `cd client && npm install`
3. Set environmental variables by creating a `.env` file in the root and `client` directory. Ensure to include your API keys and endpoint URLs for Google Cloud Vision and DALL-E as required by the application features.
4. Start the backend server: `npm start` from the root directory.
5. Start the frontend application: `npm start` from the `client` directory.

Visit `http://localhost:3000` in your web browser to access the ALUMINAI application.

### License

Copyright (c) 2024.