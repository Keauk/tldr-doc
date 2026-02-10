import Fastify from 'fastify';
import {config} from './config/env';
import healthRoute from './routes/health';
import summarizeRoute from './routes/summarize';

export async function buildServer() {
    const app = Fastify({logger: true});

    // Routes
    await app.register(healthRoute);
    await app.register(summarizeRoute);

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
