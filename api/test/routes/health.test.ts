import {beforeAll, afterAll, describe, it, expect} from 'vitest';
import {buildServer} from '../../src/server';

let app: Awaited<ReturnType<typeof buildServer>>;

beforeAll(async () => {
    app = await buildServer();
});

afterAll(async () => {
    await app.close();
});

describe('GET /health', () => {

    it('returns ok with uptime and timestamp', async () => {
        const res = await app.inject({method: 'GET', url: '/health'});
        const {status, uptime, timestamp} = res.json() as {
            status: string;
            uptime: number;
            timestamp: string;
        };

        expect(status).toBe('ok');
        expect(typeof uptime).toBe('number');
        expect(() => new Date(timestamp)).not.toThrow();
    });

});