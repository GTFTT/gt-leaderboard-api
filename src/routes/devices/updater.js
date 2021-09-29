/**
 * Socket route
 */

const Joi = require("joi");
const _ = require("lodash");
const Boom = require('boom');

module.exports = ({ connectionsModel, devicesModel }) => {
    return {
        method: 'PUT',
        path: '/updater',
        config: {
            description: "Update device state and send appropriate refresh message",
            payload: { output: "data", parse: true, allow: "application/json" },
        },
        handler: async (request, h) => {

            const deviceCode = _.get(request.payload, 'deviceCode');
            const variables = _.get(request, 'payload.deviceState.variables');
            
            const connection = await connectionsModel.getConnection({deviceCode});

            if(!connection) throw Boom.badRequest("Connection not found");

            await devicesModel.recordDeviceVariables({deviceCode, variables});
            const device = await devicesModel.getDevice({deviceCode});

            console.log("device: ", device, '\n\n\n');
            console.log("variables: ", _.get(device, 'deviceState.variables', '\n\n\n'));
            connection.ws.send(JSON.stringify({
                cmd: "UPDATE_STATE", //Update device data
                variables: _.get(device, 'deviceState.variables')
            }));

            return { at: "socket1", status: "OK"}
        }
    }
};