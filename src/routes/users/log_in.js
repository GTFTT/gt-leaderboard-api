//vendor
const Joi = require("joi");
const jwt = require('jsonwebtoken');
const _ = require('lodash');

module.exports = ({ usersModel, config }) => {
    return {
        method: 'POST',
        path: '/log_in',
        options: {
            tags: ['api', 'users'],
            description: "Log in, after login JWT will be returned",
            validate: {
                payload: Joi.object({
                    login: Joi.string().required(),
                    password: Joi.string().required(),
                })
            }
        },
        handler: async (request, h) => {
            const user = await usersModel.getUserByCredentials(request.payload);
            const userWithoutCredentials = _.omit(user, ['password', 'login']);

            const token = jwt.sign({user: userWithoutCredentials}, config.get('jwtSecret'));

            request.server.log(['info'], "LOG IN: " + _.get(user, 'nickname'));

            return {token, user: userWithoutCredentials};
        }
    }
};