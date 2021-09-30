const Joi = require("joi");

module.exports = ({scoresModel}) => {
    return {
        method: 'POST',
        path: '/users/{userId}/score',
        options: {
            tags: ['api', 'user_score'],
            description: "Create a new user score, created ids are returned",
            validate: {
                payload: Joi.object({
                    score: Joi.number().integer().min(-100).max(100).required()
                }),
                params: Joi.object({
                    userId: Joi.number().integer().required()
                }),
            }
        },
        handler: async (request, h) => {
            const res = await scoresModel.createUserScore({
                scoreEntity: request.payload,
                userId: request.params.userId,
            });

            request.server.log(['info'], "New user score was created");

            return {ok: "OK", ...res};
        }
    }
};