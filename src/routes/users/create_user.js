const Joi = require("joi");

const { supportedRegions } = require('../../constants/global');

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
                    firstName: Joi.string().min(1).max(255).pattern(new RegExp('^[a-zA-Z0-9_.]*$')).empty("").required(),
                    lastName: Joi.string().min(1).max(255).pattern(new RegExp('^[a-zA-Z0-9_.]*$')).empty("").optional(),
                    email: Joi.string().email().required(),
                    region: Joi.string().valid(...supportedRegions).empty("").optional()
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