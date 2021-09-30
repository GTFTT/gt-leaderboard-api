//vendor
const _ = require('lodash');
const Boom = require('boom');


class Users {
    constructor(props) {
        this.db = props.db;
    }

    async getUser({userId}) {

        const user = await this.db('users_tbl')
            .select()
            .where('id_pk', '=', userId);

        return { user }
    }

    async getUsers() {
        const users = await this.db('users_tbl')
            .select();

        return { users }
    }

    async createUser({ userEntity }) {

        //TODD user entity to db_user_entity
        const db_user_entity = {
            first_name: userEntity.firstName,
            email: userEntity.email,
        }

        const insertedIds =  await this.db.transaction(async trx => {
            return await trx('users_tbl')
                .insert(db_user_entity)
                .returning('id_pk');
        });

        return { insertedIds };
    }

    async updateUser({ userEntity, userId }) {
        //TODD user entity to db_user_entity
        const db_user_entity = {
            first_name: userEntity.firstName,
        }

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