//Vendor
const awilix = require('awilix');
const routeExceptionHandler = require('./../lib/errorsHandling/routeExceptionHandler');
const _ = require('lodash');


/**
 * Routes object, contains key value pair where key is the name of a module and a value is a function from route file
 */
const routes = {
    'test': require('./test/testRout'),
    'test2': require('./test/testRoute2'),
    // 'arduino': require('./test/arduino'),
    
    // Users
    'create_user': require('./users/create_user'),
    'get_users': require('./users/get_users'),
    'get_user': require('./users/get_user'),
    'update_user': require('./users/update_user'),
    'delete_user': require('./users/delete_user'),
    // 'log_in': require('./users/log_in'),
    
    //Devices
    // 'socketConnectionPoint': require('./devices/socketConnectionPoint'),
    // 'sender': require('./devices/sender'),
    // 'updater': require('./devices/updater'),
}

/**
 * 
 * @param {*} container Awilix container
 * @returns Array of objects that are routes with common exception handler 
 */
module.exports = (container) => {

    //Array of names of registered routes
    const registeredRoutes = [];

    //Register routes with awilix as singelton(adding suffix to the end)
    _.each(routes, (value, key) => {
        const moduleName = key + "Route";
        
        container.register({[moduleName]: awilix.asFunction(value).singleton()});

        registeredRoutes.push(moduleName);
    });

    //Return routes with common exeption handler
    const handledRoutes = _.map(registeredRoutes, (moduleName) => {
        const route = container.resolve(moduleName);
        return _.isFunction(route.handler)
            ? _.assign({}, route, {
                handler: routeExceptionHandler.bind(null, route),
            })
            : route
    });

    return handledRoutes;
};