//vendor
const _ = require('lodash');
const Boom = require('boom');


class Leaderboard {
    constructor(props) {
        this.db = props.db;
    }

    async getLeaderboard() {
        const leaderboard = await this.db
            .select()
            .from('users_tbl')
            .orderBy('rating', 'desc')
            .limit(100);
        
        return { leaderboard };
    }
}


module.exports = Leaderboard;