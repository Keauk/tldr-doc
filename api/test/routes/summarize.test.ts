import {beforeAll, afterAll, describe, it, expect} from 'vitest';
import type {FastifyInstance} from 'fastify';
import {buildServer} from '../../src/server';
import {SummarizeService} from '../../src/services/summarize';

class FakeSummarizeService extends SummarizeService {
    constructor() {
        super({generate: async () => ''});
    }

    async summarize(text: string, maxWords?: number, language?: string): Promise<{ summary: string }> {
        void text;
        void maxWords;
        void language;
        return {summary: 'Fixed fake summary.'};
    }
}

type SummarizeResponse = { summary: string };

let app: FastifyInstance;

beforeAll(async () => {
    app = await buildServer({summarizeService: new FakeSummarizeService()});
});

afterAll(async () => {
    await app.close();
});

describe('POST /summarize', () => {

    it('returns a summary via injected service (no network)', async () => {
        const res = await app.inject({
            method: 'POST',
            url: '/summarize',
            payload: {text: 'Patient presents with cough and fever.'},
        });

        const body = res.json() as SummarizeResponse;

        expect(res.statusCode).toBe(200);
        expect(body).toEqual({summary: 'Fixed fake summary.'});
    });

    it('rejects missing text', async () => {
        const res = await app.inject({
            method: 'POST',
            url: '/summarize',
            payload: {},
        });

        expect(res.statusCode).toBe(400);
    });

    it('rejects empty text', async () => {
        const res = await app.inject({
            method: 'POST',
            url: '/summarize',
            payload: {text: ''},
        });

        expect(res.statusCode).toBe(400);
    });

});
