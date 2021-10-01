//vendor
const _ = require('lodash');
const Boom = require('boom');

const { TO_DB } = require('../../constants/models/score/fields_map');
const { convertModel } = require('../../constants/helpers');

class Scores {
    constructor(props) {
        this.db = props.db;
    }

    applyScoresFilters(filters, knexQuery) {
        const {
            page,
            pageSize,
            userId,
        } = filters;

        if(page && pageSize) {
            knexQuery
                .limit(pageSize)
                .offset(pageSize*(page-1));
        }
        
        if(userId) {
            knexQuery
                .where('user_id_fk', '=', userId);
        }
    }

    /**
     * Get user scores and stats
     * @param {*} params.filters
     * @returns Scores and stats
     */
    async getUserScores({ userId, filters }) {
        const fullFilters = {...filters, userId}

        const userScoresQuery = this.db
            .select(TO_DB)
            .from('user_scores_tbl')
            .orderBy('id_pk', 'desc');

        const statsQuery = this.db
            .select(this.db.raw(`COUNT(*) as "count"`))
            .from('user_scores_tbl')
            .first();

        this.applyScoresFilters(fullFilters, userScoresQuery);
        this.applyScoresFilters(_.omit(fullFilters, ["page", "pageSize"]), statsQuery);
        
        // NOTE: This can be optimized by running two promises in parallel(if needed)
        const userScores = await userScoresQuery;
        const stats = await statsQuery;
        
        return { userScores, stats };
    }

    /**
     * @param {*} params.scoreEntity - will be transformed into db entity(model)
     * @returns Inserted ids
     */
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