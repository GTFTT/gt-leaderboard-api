//Vendor
const awilix = require('awilix');
const _ = require('lodash');


/**
 * Key is the name of a module(will be use to create model name) and a value is an export from file
 */
const models = {
    // 'connections': require('./connections'),
    'users': require('./users'),
    'scores': require('./scores'),
}

/**
 * Register all modes in awilix container
 * @param {*} container - awilix container
 * @returns Array of objects that are routes with common exception handler 
 */
module.exports = (container) => {
    _.each(models, (value, key) => {
        const moduleName = key + "Model";
        
        container.register({[moduleName]: awilix.asClass(value).singleton()});
    });
};