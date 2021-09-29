/**
 * Socket route
 */

const Joi = require("joi");
const _ = require("lodash");

module.exports = ({ devicesModel, connectionsModel }) => {
    return {
        method: 'POST',
        path: '/socket',
        config: {
            description: "Used by web socket protocol to connect to the server(establish ws connection)",
            notes: [
                "From ESP32(and Postman) connection string looks like this: ws://ffb4-92-112-198-38.ngrok.io/socket1",
                "Remember to send initial message with device code to register connection",
            ],
            plugins: {
                websocket: {
                    only: true,
                    autoping: 30 * 1000, //Automatic connection checking
                }
            },
            payload: { output: "data", parse: true, allow: "application/json" },
        },
        handler: async (request, h) => {

            const deviceCode = _.get(request.payload, 'deviceCode') || _.get(request.headers, 'deviceCode');
            let { ws } = request.websocket();
            const payload = request.payload

            // console.log("Payload: ", request.payload);

            const exists = await devicesModel.checkDeviceExistence({deviceCode});
            if(!exists) {
                request.server.log(['info'], "Connection failed because device not found in database");
                ws.send(JSON.stringify({ status: "DEVICE_NOT_FOUND", server: "RTC_API_SERVER" }));
                ws.close(); //Close connection
            }

            const connection = await connectionsModel.getConnection({deviceCode});

            if(!connection) {
                await connectionsModel.registerConnection({deviceCode, ws});
                ws.send(JSON.stringify({ status: "CONNECTION_REGISTERED", server: "RTC_API_SERVER" }));
                request.server.log(['info'], "Connection registered");
            }

            await devicesModel.recordData({deviceCode, payload});
                        
            return { at: "socket1", deviceCode }
        }
    }
};