const Joi = require("joi");

module.exports = ({ usersModel }) => {
    return {
        method: 'GET',
        path: '/users/{userId}',
        options: {
            tags: ['api', 'users'],
            description: "Get user by ID",
            validate: {
                params: Joi.object({
                    userId: Joi.number().integer().required()
                }),
            }
        },
        handler: async (request, h) => {

            request.server.log(['info'], "Get a users by ID");

            const result = await usersModel.getUser({userId: request.params.userId});

            return result;
        }
    }
};