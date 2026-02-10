import { FastifyPluginAsync } from 'fastify';

// Exposes a simple readiness check used by the frontend/dev tooling.
const healthRoute: FastifyPluginAsync = async (app) => {
  app.get('/health', async () => {
    return {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  });
};

export default healthRoute;
