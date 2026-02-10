import {FastifyPluginAsync} from 'fastify';

const healthRoute: FastifyPluginAsync = async (app) => {
    app.get('/health', () => {
        return {
            status: 'ok',
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
        };
    });
};

export default healthRoute;
