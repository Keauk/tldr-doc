import type {LlmClient} from '../clients/llm';

const WORD_LIMIT_DEFAULT = 100;
const WORD_LIMIT_MAX = 300;
const LANGUAGES = {
    en: 'English',
    fi: 'Finnish',
    nl: 'Dutch',
    sv: 'Swedish',
} as const

type LanguageCode = keyof typeof LANGUAGES

export class SummarizeService {
    constructor(private readonly llm: LlmClient) {
    }

    async summarize(text: string, maxWords?: number, language?: string): Promise<{ summary: string }> {
        const limit = normalizeMaxWords(maxWords);
        const lang = normalizeLanguage(language);
        const prompt = buildPrompt(text.trim(), limit, lang);
        const output = await this.llm.generate(prompt);
        return {summary: output.trim()};
    }
}

function normalizeMaxWords(maxWords?: number): number {
    if (typeof maxWords !== 'number' || !Number.isFinite(maxWords)) return WORD_LIMIT_DEFAULT;
    if (maxWords < 1) return WORD_LIMIT_DEFAULT;
    return Math.min(Math.floor(maxWords), WORD_LIMIT_MAX);
}

function isLanguageCode(value: string): value is LanguageCode {
    return value in LANGUAGES
}

function normalizeLanguage(language?: string): LanguageCode {
    const code = language?.toLowerCase()
    return code && isLanguageCode(code) ? code : 'en'
}

function languageName(code: LanguageCode): string {
    return LANGUAGES[code]
}

function buildPrompt(text: string, maxWords: number, language: LanguageCode): string {
    const langName = languageName(language);
    return [
        `Summarize the following text in <= ${maxWords} words.`,
        `Write the summary in ${langName}.`,
        'Focus on the most clinically relevant details.',
        'Return only the summary paragraph without any preface or labels.',
        '',
        'Text:',
        text,
    ].join('\n');
}
