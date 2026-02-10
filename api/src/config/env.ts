import dotenv from 'dotenv';

dotenv.config();

// Centralized environment configuration for the API.
// Defaults are safe for local development.
export type AppConfig = {
  host: string;
  port: number;
  nodeEnv: 'development' | 'test' | 'production' | string;
};

function toNumber(value: string | undefined, fallback: number): number {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export const config: AppConfig = {
  host: process.env.HOST?.trim() || '127.0.0.1',
  port: toNumber(process.env.PORT, 5055),
  nodeEnv: (process.env.NODE_ENV?.trim() || 'development') as AppConfig['nodeEnv'],
};
