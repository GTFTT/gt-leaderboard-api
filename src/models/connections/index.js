//vendor
const _ = require('lodash');
const Boom = require('boom');

/**
 * Handle web socket connections here. You can get connection of a specific device or register a new one
 */
class Connections {
    constructor(props) {
        this.mongoClient = props.mongoClient;

        //This container handles instances of different connections
        this.wsContainer = {};
    }

    /**
     * Register connection for device by its code
     * @param {*} params.deviceCode - unique device code
     * @param {*} params.ws - web socket connection
     */
    async registerConnection({deviceCode, ws}) {
        this.wsContainer[deviceCode] = {
            ws,
        }
    }

    /**
     * Get registered ws connection for device
     * @param {*} params.deviceCode - unique device code
     * @returns device connection object or null
     */
    async getConnection({deviceCode}) {
        const deviceConnection = this.wsContainer[deviceCode];
        if(deviceConnection) {
            return deviceConnection;
        } else {
            return deviceConnection;
        }
    }
}

module.exports = Connections;