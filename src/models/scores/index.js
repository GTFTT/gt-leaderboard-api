//vendor
const _ = require('lodash');
const Boom = require('boom');


class Scores {
    constructor(props) {
        this.db = props.db;
    }

    async getUserScores() {}

    async createUserScore() {}
}

module.exports = Scores;