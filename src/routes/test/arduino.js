/**
 * Socket route
 */

const Joi = require("joi");
const _ = require("lodash");

 module.exports = ({storage, db}) => {
    return {
        method: 'POST',
        path: '/arduino',
        // method: 'GET',
        // path: '/',
        // options: {
        //     validate: {
        //         payload: true //Allow everything
        //     }
        // },
        handler: async (request, h) => {

            console.log("Socket connection!");

            // console.log("Storage before: ", storage);
            // console.log("Payload: ", _.get(request, 'payload'));

            // storage.test2 = _.get(request, 'payload');
            // console.log("Storage after: ", storage, '\n\n');

            // console.log('We are in post method');
            // const res = await db("test_tbl").select(`text`);
            // console.log(res);

            return {answer: 'Post'};
        }
    }
};