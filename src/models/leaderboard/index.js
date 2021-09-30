//vendor
const _ = require('lodash');
const Boom = require('boom');

const { TO_DB } = require('../../constants/models/users/fields_map');
const { escapeRegExp } = require('../../constants/helpers');

class Leaderboard {
    constructor(props) {
        this.db = props.db;
    }

    applyLeaderboardFilters(filters, knexQuery) {
        const {
            page,
            pageSize,
            region,
            query,
        } = filters;

        if(page && pageSize) {
            knexQuery
                .limit(pageSize)
                .offset(pageSize*(page-1));
        }

        if(region) {
            knexQuery
                .where('region', '=', region);
        }

        if(query) {
            const escapedQuery = query ? escapeRegExp(query) : query;
      
            knexQuery.andWhere(function() {
                this
                    .where('first_name', '~*', escapedQuery)
                    .orWhere('last_name', '~*', escapedQuery)
                    .orWhereRaw(`first_name || last_name ~* '${escapedQuery}'`)
            });
        }
    }

    async getLeaderboard({filters}) {
        const leaderboardQuery = this.db
            .select(TO_DB)
            .from('users_tbl')
            .orderBy('rating', 'desc');
        
        const statsQuery = this.db
            .select(this.db.raw(`COUNT(*) as "count"`))
            .from('users_tbl');

        this.applyLeaderboardFilters(filters, leaderboardQuery);
        this.applyLeaderboardFilters(_.omit(filters, ["page", "pageSize"]), statsQuery);
        
        // NOTE: This can be optimized by running two promises in parallel(if needed)
        const leaderboard = await leaderboardQuery;
        const stats = await statsQuery;

        return {
            leaderboard,
            stats,
        };
    }
}


module.exports = Leaderboard;