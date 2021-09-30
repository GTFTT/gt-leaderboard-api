const Joi = require("joi");

module.exports = ({ scoresModel }) => {
    return {
        method: 'GET',
        path: '/users/{userId}/scores',
        options: {
            tags: ['api', 'user_score'],
            description: "Get all user scores without pagination",
            validate: {
                params: Joi.object({
                    userId: Joi.number().integer().required()
                }),
            }
        },
        handler: async (request, h) => {

            //TODO pagination

            request.server.log(['info'], "Get user scores");

            const result = await scoresModel.getUserScores({
                userId: request.params.userId,
            });

            return result;
        }
    }
};