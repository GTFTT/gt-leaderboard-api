const Joi = require("joi");

module.exports = ({ usersModel }) => {
    return {
        method: 'GET',
        path: '/users',
        options: {
            tags: ['api', 'users'],
            description: "Get all users without pagination",
        },
        handler: async (request, h) => {

            request.server.log(['info'], "Get list of all users");

            const users = await usersModel.getUsers();

            return users;
        }
    }
};