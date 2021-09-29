//vendor
const _ = require('lodash');
const Boom = require('boom');

class Users {
    constructor(props) {
        this.mongoClient = props.mongoClient;
    }

    /**
     * Create a new user
     * @param {*} params.login 
     * @param {*} params.password 
     * @param {*} params.nickname - short user name
     * 
     * @returns Id of a created user
     */
    async createUser(params) {
        const {
            login,
            password,
            nickname,
        } = params;

        const query = this.mongoClient
            .db("main")
            .collection("users")
            .findOne({login});

        const user = await query;

        if(user) throw Boom.badRequest("User already exists");

        const res = await this.mongoClient.db("main").collection("users").insertOne({
            login,
            password,
            nickname,
        });

        return {id: _.get(res, 'insertedId') };
    }

    /**
     * TODO pagination for data like that
     * TODO return only specific fields to prevent passwords lost
     * @returns list of all users in the database
     */
    async getUsers() {

        try {
            const query = this.mongoClient
            .db("main")
            .collection("users")
            .find();

            const count = await query.count();
            const users = await query.toArray();

            return {count, list: users};
        } catch (error) {
            console.log(error);
        }

        return {};
    }

    async getUserByCredentials(credentials) {
        const { login, password } = credentials;

        const query = this.mongoClient
            .db("main")
            .collection("users")
            .findOne({login, password});

        const user = await query;

        if(!user) throw Boom.badRequest("No such a user found");

        return user;
    }

}

module.exports = Users;