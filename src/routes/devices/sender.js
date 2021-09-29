/**
 * Socket route
 */

const Joi = require("joi");
const _ = require("lodash");
const Boom = require('boom');

module.exports = ({ connectionsModel, devicesModel }) => {
    return {
        method: 'POST',
        path: '/sender',
        config: {
            description: "Used to send data to specific devices by their deviceCode",
            notes: ["Remember to send initial message with device code to register connection"],
            payload: { output: "data", parse: true, allow: "application/json" },
        },
        handler: async (request, h) => {

            const deviceCode = _.get(request.payload, 'deviceCode');
            const data = request.payload

            console.log("Sender payload: ", request.payload);
            const connection = await connectionsModel.getConnection({deviceCode});

            if(!connection) throw Boom.badRequest("Connection not found");
            
            connection.ws.send(JSON.stringify(data));

            return { at: "socket1", status: "OK"}
        }
    }
};