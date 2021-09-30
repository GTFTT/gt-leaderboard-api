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
                    firstName: Joi.string().min(5).max(255).pattern(new RegExp('^[a-zA-Z0-9_@.]*$')).required(),
                    //TODO Email validation
                    //TODO other fields
                    email: Joi.string().min(6).max(255).required(),
                })
            }
        },
        handler: async (request, h) => {
            const res = await usersModel.createUser({userEntity: request.payload});

            request.server.log(['info'], "New user was created");

            return {ok: "OK", ...res};
        }
    }
};