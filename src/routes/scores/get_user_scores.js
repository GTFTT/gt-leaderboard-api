const Joi = require("joi");

module.exports = ({ scoresModel }) => {
    return {
        method: 'GET',
        path: '/users/{userId}/scores',
        options: {
            tags: ['api', 'users'],
            description: "Get all user scores without pagination",
            validate: {
                params: Joi.object({
                    userId: Joi.number().integer().required()
                }),
            }
        },
        handler: async (request, h) => {

            //TODO pagination

            request.server.log(['info'], "Get list of all users");

            const result = await scoresModel.getUserScores({
                userId: request.params.userId,
            });

            return result;
        }
    }
};