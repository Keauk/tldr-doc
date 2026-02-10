# TLDR Doctor

TLDR Doctor is a small web application that summarizes medical transcripts into a concise single paragraph using a locally hosted language model via the backend API. Paste text, pick a language, and get a short summary.

![TLDR Doctor screenshot](./demo-screenshot.png)

## Features
- Summarization of pasted transcripts into a short paragraph
- Language selection for output
- Summary persists across page refresh using browser local storage

Supported languages: English, Finnish, Dutch, Swedish.

## Local Setup (no deployment)
This project runs fully on your machine: a Fastify backend API and a Vite-based Vue frontend.

### LLM Setup (Required prerequisite)

This project requires a locally running language model via Ollama. Install Ollama and download the model before starting the backend.

#### Install Ollama
```sh
curl -fsSL https://ollama.com/install.sh | sh
```

#### Verify installation
```sh
ollama --version
```

#### Start Ollama and download the model
```sh
ollama serve
ollama pull llama3.2:3b
```

### Backend
From the `api/` directory:

#### Installs all Node dependencies
```sh
npm install
```

#### Starts the development server with hot reload
```sh
npm run dev
```

#### Builds a production bundle
```sh
npm run build
```

#### Locally previews the production build
```sh
npm run preview
```

### Frontend
From the `frontend/` directory:

#### Installs all Node dependencies
```sh
npm install
```

#### Compiles TypeScript to JavaScript
```sh
npm run build
```

#### Starts the built server
```sh
npm start
```

#### Starts dev mode with file watching
```sh
npm run dev
```


## Notes
- The frontend communicates with the backend over HTTP.
- The last generated summary is restored after refresh via `localStorage`; pressing the Summarize button creates a new summary and updates the stored value.
