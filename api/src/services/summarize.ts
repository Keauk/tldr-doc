import type {LlmClient} from '../clients/llm';

const WORD_LIMIT_DEFAULT = 100;
const WORD_LIMIT_MAX = 300;

export class SummarizeService {
    constructor(private readonly llm: LlmClient) {
    }

    async summarize(text: string, maxWords?: number): Promise<{ summary: string }> {
        const limit = normalizeMaxWords(maxWords);
        const prompt = buildPrompt(text.trim(), limit);
        const output = await this.llm.generate(prompt);
        return {summary: output.trim()};
    }
}

function normalizeMaxWords(maxWords?: number): number {
    if (typeof maxWords !== 'number' || !Number.isFinite(maxWords)) return WORD_LIMIT_DEFAULT;
    if (maxWords < 1) return WORD_LIMIT_DEFAULT;
    return Math.min(Math.floor(maxWords), WORD_LIMIT_MAX);
}

function buildPrompt(text: string, maxWords: number): string {
    return [
        `Summarize the following text in <= ${maxWords} words.`,
        'Focus on the most clinically relevant details.',
        'Return only the summary paragraph without any preface or labels.',
        '',
        'Text:',
        text,
    ].join('\n');
}
