const Joi = require("joi");

module.exports = ({usersModel}) => {
    return {
        method: 'POST',
        path: '/users',
        options: {
            tags: ['api', 'users'],
            description: "Create a new user, user id is returned",
            validate: {
                // payload: true //Allow everything
                payload: Joi.object({
                    login: Joi.string().min(5).max(255).pattern(new RegExp('^[a-zA-Z0-9_@.]*$')).required(),
                    password: Joi.string().min(6).max(255).pattern(new RegExp('^[a-zA-Z0-9_@.]*$')).required(),
                    nickname: Joi.string().min(1).max(20).required(),
                })
            }
        },
        handler: async (request, h) => {
            const res = await usersModel.createUser({...request.payload});

            request.server.log(['info'], "New user was created");

            return {ok: "OK", ...res};
        }
    }
};