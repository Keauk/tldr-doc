import {FastifyPluginAsync} from 'fastify';

const summarizeRoute: FastifyPluginAsync = async (app) => {
    app.post(
        '/summarize',
        {
            schema: {
                body: {
                    type: 'object',
                    required: ['text'],
                    properties: {
                        text: {type: 'string', minLength: 1},
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
            // TODO: Delegate summarization to LLM service.
            const {text} = request.body as { text: string };
            void text;
            return {summary: 'Placeholder summary.'};
        }
    );
};

export default summarizeRoute;
