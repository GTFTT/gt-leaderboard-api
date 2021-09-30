//vendor
const _ = require('lodash');
const Boom = require('boom');

const { TO_DB } = require('../../constants/models/score/fields_map');
const { convertModel } = require('../../constants/helpers');

class Scores {
    constructor(props) {
        this.db = props.db;
    }

    async getUserScores({ userId, filters }) {
        const {
            page,
            pageSize,
        } = filters;
        const userScoresQuery = this.db
            .select(TO_DB)
            .from('user_scores_tbl')
            .where('user_id_fk', '=', userId);

        if(page) {
            userScoresQuery
                .limit(pageSize)
                .offset(pageSize*(page-1));
        }
        
        return { userScores: await userScoresQuery };
    }

    async createUserScore({ scoreEntity, userId }) {
        const db_score_entity = convertModel({...scoreEntity, userId}, TO_DB);

        const insertedIds =  await this.db.transaction(async trx => {
            return await trx('user_scores_tbl')
                .insert(db_score_entity)
                .returning('id_pk');
        });

        return { insertedIds };
    }
}

module.exports = Scores;