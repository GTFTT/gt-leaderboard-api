//vendor
const _ = require('lodash');
const Boom = require('boom');


class Scores {
    constructor(props) {
        this.db = props.db;
    }

    async getUserScores({ userId }) {
        const userScores = await this.db
            .select()
            .from('user_scores_tbl')
            .where('user_id_fk', '=', userId);
        
        return { userScores };
    }

    async createUserScore({ scoreEntity, userId }) {
        const db_score_entity = {
            score: scoreEntity.score,
            user_id_fk: userId
        };

        const insertedIds =  await this.db.transaction(async trx => {
            return await trx('user_scores_tbl')
                .insert(db_score_entity)
                .returning('id_pk');
        });

        return { insertedIds };
    }
}

module.exports = Scores;