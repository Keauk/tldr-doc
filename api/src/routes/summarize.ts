import {FastifyPluginAsync} from 'fastify';
import {SummarizeService} from '../services/summarize';

export type SummarizeRouteDeps = {
    summarizeService: SummarizeService;
};

const createSummarizeRoute = ({summarizeService}: SummarizeRouteDeps): FastifyPluginAsync => {
    return async (app) => {
        app.post(
            '/summarize',
            {
                schema: {
                    body: {
                        type: 'object',
                        required: ['text'],
                        properties: {
                            text: {type: 'string', minLength: 1},
                            maxWords: {type: 'number', minimum: 1},
                        },
                        additionalProperties: false,
                    },
                    response: {
                        200: {
                            type: 'object',
                            required: ['summary'],
                            properties: {
                                summary: {type: 'string'},
                            },
                            additionalProperties: false,
                        },
                    },
                },
            },
            async (request) => {
                const {text, maxWords} = request.body as { text: string; maxWords?: number };
                return await summarizeService.summarize(text, maxWords);
            }
        );
    };
};

export default createSummarizeRoute;
