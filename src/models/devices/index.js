//vendor
const _ = require('lodash');
const Boom = require('boom');

/**
 * Handle devices logic. Creating, searching and other stuff
 */
class Devices {
    constructor(props) {
        this.mongoClient = props.mongoClient;
    }

    /**
     * Get device by its code
     * @param params.deviceCode - unique device code
     */
    async getDevice(params) {
        const {
            deviceCode
        } = params;

        if(!deviceCode) throw Boom.badRequest("Device code not provided");

        const device = await this.mongoClient
            .db("main")
            .collection("devices")
            .findOne({deviceCode});

        return device;
    }

    /**
     * Check if device exists in database(is registered)
     * @param {*} params.deviceCode - unique device code
     * @returns true if device exists
     */
    async checkDeviceExistence({deviceCode}) {
        const device = await this.mongoClient
            .db("main")
            .collection("devices")
            .findOne({deviceCode});

        if(device) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Record data provided by device into its document
     * @param params.deviceCode - unique device code
     * @param params.payload - payload from device
     */
    async recordData(params) {
        const {
            payload,
            deviceCode
        } = params;

        if(!deviceCode) throw Boom.badRequest("Device code not provided");
        const exists = await this.checkDeviceExistence({deviceCode});
        if(!exists) throw Boom.badRequest("Device not found");

        const res = await this.mongoClient.db("main").collection("devices").updateOne(
            { deviceCode },
            { $set: {deviceState: payload} },
            { upsert: true }
        );

        return {_id: _.get(res, 'insertedId') };
    }

    /**
     * Record variables provided of a device
     * @param params.deviceCode - unique device code
     * @param params.payload - payload from device
     */
     async recordDeviceVariables(params) {
        const {
            variables,
            deviceCode
        } = params;

        await this.recordData({payload: {variables}, deviceCode});
    }
}

module.exports = Devices;