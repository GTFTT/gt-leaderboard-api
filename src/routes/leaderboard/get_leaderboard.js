const Joi = require("joi");

const { supportedRegions } = require('../../constants/global');

module.exports = ({ leaderboardModel }) => {
    return {
        method: 'GET',
        path: '/leaderboard',
        options: {
            tags: ['api', 'leaderboard'],
            description: "Get leaderboard and stats",
            validate: {
                query: Joi.object({
                    page: Joi.number().integer().min(1).default(1),
                    pageSize: Joi.number().integer().min(2).default(100),
                    region: Joi.string().valid(...supportedRegions).empty("").optional().description('Filter for regions, see constants'),
                    query: Joi.string().empty("").optional().description('Used to filter users by name')
                })
            }
        },
        handler: async (request, h) => {

            request.server.log(['info'], "Get leaderboard");

            const result = await leaderboardModel.getLeaderboard({
                filters: request.query,
            });

            return result;
        }
    }
};