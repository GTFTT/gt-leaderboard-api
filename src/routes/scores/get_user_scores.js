const Joi = require("joi");

module.exports = ({ scoresModel }) => {
    return {
        method: 'GET',
        path: '/users/{userId}/scores',
        options: {
            tags: ['api', 'user_score'],
            description: "Get all user scores",
            validate: {
                params: Joi.object({
                    userId: Joi.number().integer().required()
                }),
                query: Joi.object({
                    page: Joi.number().integer().min(1).default(1),
                    pageSize: Joi.number().integer().min(2).default(25),
                })
            }
        },
        handler: async (request, h) => {

            request.server.log(['info'], "Get user scores");

            const result = await scoresModel.getUserScores({
                userId: request.params.userId,
                filters: request.query
            });

            return result;
        }
    }
};