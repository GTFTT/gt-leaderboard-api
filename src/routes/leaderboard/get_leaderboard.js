const Joi = require("joi");

module.exports = ({ leaderboardModel }) => {
    return {
        method: 'GET',
        path: '/leaderboard',
        options: {
            tags: ['api', 'leaderboard'],
            description: "Get leaderboard",
        },
        handler: async (request, h) => {

            //TODO filters

            request.server.log(['info'], "Get leaderboard");

            const result = await leaderboardModel.getLeaderboard();

            return result;
        }
    }
};