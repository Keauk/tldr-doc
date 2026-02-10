import dotenv from 'dotenv';

dotenv.config();

// Centralized environment configuration for the API.
// Defaults are safe for local development.
export type AppConfig = {
    host: string;
    port: number;
    nodeEnv: 'development' | 'test' | 'production' | string;
    ollamaHost: string;
    ollamaModel: string;
    ollamaTimeoutMs: number;
};

function toNumber(value: string | undefined, fallback: number): number {
    const n = Number(value);
    return Number.isFinite(n) && n > 0 ? n : fallback;
}

export const config: AppConfig = {
    host: process.env.HOST?.trim() || '127.0.0.1',
    port: toNumber(process.env.PORT, 5055),
    nodeEnv: (process.env.NODE_ENV?.trim() || 'development') as AppConfig['nodeEnv'],
    ollamaHost: process.env.OLLAMA_HOST?.trim() || 'http://127.0.0.1:11434',
    ollamaModel: process.env.OLLAMA_MODEL?.trim() || 'llama3.2:3b',
    ollamaTimeoutMs: toNumber(process.env.OLLAMA_TIMEOUT_MS, 60_000),
};
