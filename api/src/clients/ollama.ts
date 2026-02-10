import type {LlmClient, GenerateOptions} from './llm';

const DEFAULT_TIMEOUT_MS = 30_000;

export type OllamaClientOptions = {
    host: string;
    model: string;
    timeoutMs?: number;
};

type OllamaGenerateResponse = { response: string };

export class OllamaClient implements LlmClient {
    private readonly host: string;
    private readonly model: string;
    private readonly timeoutMs: number;

    constructor(opts: OllamaClientOptions) {
        this.host = opts.host.replace(/\/$/, '');
        this.model = opts.model;
        this.timeoutMs = opts.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    }

    async generate(prompt: string, options?: GenerateOptions): Promise<string> {
        const res = await this.postGenerate(prompt, options);
        const text = await this.readGenerateResponse(res);
        if (!text) throw new Error('Ollama returned an empty response');
        return text;
    }

    private async postGenerate(prompt: string, options?: GenerateOptions): Promise<Response> {
        return this.fetchWithTimeout(`${this.host}/api/generate`, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                model: options?.model ?? this.model,
                prompt,
                stream: false,
            }),
        });
    }

    private async readGenerateResponse(res: Response): Promise<string> {
        if (!res.ok) {
            const body = await res.text().catch(() => '');
            throw new Error(`Ollama request failed (${res.status}): ${body}`);
        }
        const data = (await res.json()) as OllamaGenerateResponse;
        return data.response?.trim() ?? '';
    }

    private async fetchWithTimeout(url: string, init: RequestInit): Promise<Response> {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

        try {
            return await fetch(url, {...init, signal: controller.signal});
        } catch (err) {
            if (err instanceof DOMException && err.name === 'AbortError') {
                throw new Error('Ollama request timed out');
            }
            throw err;
        } finally {
            clearTimeout(timeoutId);
        }
    }
}
