export type GenerateOptions = {
    model?: string;
    temperature?: number;
};

export interface LlmClient {
    generate(prompt: string, options?: GenerateOptions): Promise<string>;
}
