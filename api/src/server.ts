import Fastify from 'fastify';
import healthRoute from './routes/health';
import { config } from './config/env';

async function buildServer() {
  const app = Fastify({ logger: true });

  // Routes
  await app.register(healthRoute);

  return app;
}

async function start() {
  const app = await buildServer();

  try {
    await app.listen({ host: config.host, port: config.port });
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

start();

export type { };
