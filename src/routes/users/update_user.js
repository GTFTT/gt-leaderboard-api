const Joi = require("joi");

const { supportedRegions } = require('../../constants/global');

module.exports = ({ usersModel }) => {
    return {
        method: 'PATCH',
        path: '/users/{userId}',
        options: {
            tags: ['api', 'users'],
            description: "Update user by ID",
            validate: {
                params: Joi.object({
                    userId: Joi.number().integer().required()
                }),
                //TODO at least one param
                payload: Joi.object({
                    firstName: Joi.string().min(1).max(255).pattern(new RegExp('^[a-zA-Z0-9_.]*$')).empty("").optional(),
                    lastName: Joi.string().min(1).max(255).pattern(new RegExp('^[a-zA-Z0-9_.]*$')).empty("").optional(),
                    region: Joi.string().valid(...supportedRegions).empty("").optional()
                })
            }
        },
        handler: async (request, h) => {

            request.server.log(['info'], "Update a users by ID");

            const result = await usersModel.updateUser({
                userEntity: request.payload,
                userId: request.params.userId
            });

            return result;
        }
    }
};