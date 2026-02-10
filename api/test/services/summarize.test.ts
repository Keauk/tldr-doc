import { describe, it, expect } from 'vitest';
import type { LlmClient } from '../../src/clients/llm';
import { SummarizeService } from '../../src/services/summarize';

class FakeLlm implements LlmClient {
  constructor(private readonly reply: string) {}
  async generate(): Promise<string> {
    return this.reply;
  }
}

describe('SummarizeService', () => {
  it('returns trimmed summary from LLM', async () => {
    const service = new SummarizeService(new FakeLlm('  Hello world.  '));
    const res = await service.summarize('Some input text', 10);
    expect(res).toEqual({ summary: 'Hello world.' });
  });

  it('uses default maxWords when not provided', async () => {
    const service = new SummarizeService(new FakeLlm('Summary'));
    const res = await service.summarize('Input without limit');
    expect(typeof res.summary).toBe('string');
  });
});
