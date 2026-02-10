import {beforeAll, afterAll, describe, it, expect} from 'vitest';
import type {FastifyInstance} from 'fastify';
import {buildServer} from '../src/server';

type SummarizeResponse = { summary: string };

let app: FastifyInstance;

beforeAll(async () => {
    app = await buildServer();
});

afterAll(async () => {
    await app.close();
});

describe('POST /summarize', () => {

    // TODO: Adjust this test-case when LLM has been wired.
    it('returns placeholder summary', async () => {
        const res = await app.inject({
            method: 'POST',
            url: '/summarize',
            payload: {text: 'Patient presents with cough and fever.'},
        });

        const body = res.json() as SummarizeResponse;

        expect(res.statusCode).toBe(200);
        expect(body).toEqual({summary: 'Placeholder summary.'});
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
