# reyllm

reyllm is a full-stack application designed to enable users to build a private ChatGPT-like interface. It facilitates intelligent conversation with documents by utilizing commercial off-the-shelf or popular open-source Large Language Models (LLMs) and vector database solutions. Users can run reyllm locally or host it remotely, ensuring privacy and flexibility in managing document interactions.

## Overview

This project is structured into a monorepo consisting of a frontend built with ViteJS and React, a NodeJS Express backend for handling interactions and managing the vector database, and Docker configurations for containerization. The application supports multiple user instances with permission settings, enabling efficient document management through a user-friendly interface.

## Features

- Multi-user instance support with granular permissions.
- Customizable, embeddable chat widget for websites.
- Support for various document types including PDF, TXT, DOCX, etc.
- Two chat modes for conversation and direct queries.
- In-chat citations for document references.
- Cloud deployment ready with a "Bring your own LLM" model.
- Cost-effective document management.
- Full Developer API for custom integrations.
- Supported LLMs include open-source models and services like OpenAI, Azure OpenAI, Anthropic ClaudeV2, and more.
- Embedders and Vector Databases like LanceDB, Astra DB, Pinecone, and others are supported.

## Getting Started

### Requirements

- Node.js
- Docker
- Access to supported LLMs and vector database solutions.

### Quickstart

1. Clone the repository to your local machine.
2. Navigate to the project directory and build the Docker containers using the provided Docker instructions.
3. Start the frontend and backend services as per the instructions found in their respective README.md files.
4. Configure the .env files with your database connection strings and LLM API keys as necessary.

### License

Copyright (c) 2024. All rights reserved.