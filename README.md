# TLDR Doctor

TLDR Doctor is a small web application that summarizes medical transcripts into a concise single paragraph using a locally hosted language model via the backend API. Paste text, pick a language, and get a short summary.

## Features
- Summarization of pasted transcripts into a short paragraph
- Language selection for output
- Summary persists across page refresh using browser local storage

Supported languages: English, Finnish, Dutch, Swedish.

## Local Setup (no deployment)
This project runs fully on your machine: a Fastify backend API and a Vite-based Vue frontend.

### Backend
From the `api/` directory:

```sh
# 1) Install
npm install

# 2) Build (TypeScript → JS)
npm run build

# 3) Run the built server
npm start

# Optional: run in watch mode during development
npm run dev
```

### Frontend
From the `frontend/` directory:

```sh
# 1) Install
npm install

# 2) Start dev server (hot reload)
npm run dev

# 3) Build for production
npm run build

# 4) Preview the built site
npm run preview
```

Notes
- The frontend communicates with the backend over HTTP.
- The last generated summary is restored after refresh via `localStorage`; pressing the Summarize button creates a new summary and updates the stored value.
