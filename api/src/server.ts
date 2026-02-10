import Fastify from 'fastify';
import {config} from './config/env';
import healthRoute from './routes/health';
import createSummarizeRoute from './routes/summarize';
import {SummarizeService} from './services/summarize';
import {OllamaClient} from './clients/ollama';

export type ServerDeps = {
    summarizeService?: SummarizeService;
};

export async function buildServer(deps: ServerDeps = {}) {
    const app = Fastify({logger: true});

    // Routes
    await app.register(healthRoute);

    const summarizeService =
        deps.summarizeService ??
        new SummarizeService(
            new OllamaClient({
                host: config.ollamaHost,
                model: config.ollamaModel
            })
        );
    await app.register(createSummarizeRoute({summarizeService}));

    return app;
}

async function start() {
    const app = await buildServer();

    try {
        await app.listen({host: config.host, port: config.port});
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }

    const close = async () => {
        try {
            await app.close();
            process.exit(0);
        } catch (err) {
            app.log.error(err);
            process.exit(1);
        }
    };

    process.on('SIGINT', close);
    process.on('SIGTERM', close);
}

if (require.main === module) {
    void start();
}

export type {};
