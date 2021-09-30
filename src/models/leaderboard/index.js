//vendor
const _ = require('lodash');
const Boom = require('boom');


class Leaderboard {
    constructor(props) {
        this.db = props.db;
    }

    async getLeaderboard() {}
}


module.exports = Leaderboard;