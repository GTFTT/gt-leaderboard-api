//vendor
const _ = require('lodash');
const Boom = require('boom');

const { TO_DB, TO_MODEL } = require('../../constants/models/users/fields_map');
const { convertModel } = require('../../constants/helpers');

class Users {
    constructor(props) {
        this.db = props.db;
    }

    async getUser({userId}) {

        const user = await this.db('users_tbl')
            .select()
            .where('id_pk', '=', userId)
            .first();

        return { user: convertModel(user, TO_MODEL) }
    }

    async getUsers() {
        const users = await this.db('users_tbl')
            .select();

        return { users }
    }

    async createUser({ userEntity }) {
        const db_user_entity = convertModel(userEntity, TO_DB);

        const insertedIds =  await this.db.transaction(async trx => {
            return await trx('users_tbl')
                .insert(db_user_entity)
                .returning('id_pk');
        });

        return { insertedIds };
    }

    async updateUser({ userEntity, userId }) {
        const db_user_entity = convertModel(userEntity, TO_DB);

        const updatedIds =  await this.db.transaction(async trx => {
            return await trx('users_tbl')
                .update(db_user_entity)
                .where('id_pk', '=', userId)
                .returning('id_pk');
        });

        return { updatedIds };
    }

    async deleteUser({ userId }) {
        const deletedIds =  await this.db.transaction(async trx => {
            return await trx('users_tbl')
                .delete()
                .where('id_pk', '=', userId)
                .returning('id_pk');
        });

        return { deletedIds };
    }
}

module.exports = Users;