const Joi = require("joi");

module.exports = ({ usersModel }) => {
    return {
        method: 'DELETE',
        path: '/users/{userId}',
        options: {
            tags: ['api', 'users'],
            description: "Delete user by ID",
            validate: {
                params: Joi.object({
                    userId: Joi.number().integer().required()
                }),
            }
        },
        handler: async (request, h) => {

            request.server.log(['info'], "DELETE a users by ID");

            const result = await usersModel.deleteUser({userId: request.params.userId});

            return result;
        }
    }
};