//Vendor
const Hapi = require('@hapi/hapi');
const Boom = require('boom');
const HapiAuthJwt2 = require('hapi-auth-jwt2');
const awilix= require('awilix'); //Main container
const Inert = require('inert'); //Static files processing
const Vision = require('vision'); //Extended functionaity for routes
const dotenv = require('dotenv');
const knex = require('knex');

//Proj
const { styledServerMessage } = require('./src/lib/styled_console_messages');

dotenv.config(); //Setup environment variables first

const config = require('./src/configs/serverConfigs.js');
const knexFile = require('./src/configs/knexFile.js');
const jwtSecurity = require('./src/configs/jwtSecurity.js');

const container = awilix.createContainer();
container.register({ config: awilix.asValue(config) });
container.register({ db: awilix.asValue(knex(knexFile)) });
container.register({ jwtSecurity: awilix.asFunction(jwtSecurity) });

require('./src/models')(container); //Connect models
const routesWithExceptionHandlers = require('./src/routes')(container);

//Initialize server
const server = Hapi.server({
    host: config.get('ip'),
    port: config.get('port'),
    routes: {
        cors: true, //Allow cors to access from localhost
        validate: {
            failAction: async (request, h, err) => {
                //Throw errors anyway and everywhere, we are no in Google for now
                server.log(['error'], err);
                throw err;
            },
        },
    },
});

const startServer = async function() {
    const authJwtOptions = container.resolve('jwtSecurity');

    if (config.get('env') === 'development') {
        await server.register([ Inert, Vision ]);
    }
    await server.register({plugin: HapiAuthJwt2});

    server.app.container = container;
    server.auth.strategy('jwt', 'jwt', authJwtOptions);
    await server.route(routesWithExceptionHandlers);
    
    await server.start();
    server.log(['system_info'], `Server started at: ${server.info.uri}`);
    server.log(['system_info'], `Server/Config NODE_ENV: ${process.env.NODE_ENV}/${config.get('env')}`);
    server.log(['system_info'], `Server/Config PORT: ${process.env.PORT}/${config.get('port')}`);
    server.log(['system_info'], `Server/Config HOST: ${process.env.HOST}/${config.get('ip')}`);
}

//Event: if 'info' or 'error' is emmited we have to output it manually
server.events.on('log', styledServerMessage);



//----------------------------------------------------------------------------------
//Shutdown handlers

async function gracefulShutdown() {
    try {
        server.log('info', 'Stopping server.');
        await server.stop();
        process.exit(0);
    } catch (err) {
        console.log(err);
        console.log('Stopping server.');
        process.exit(1);
    }
}

async function uncaughtExceptionShutdown(err) {
    console.log(err);
    console.log('Stopping server.');
    process.exit(1);
}

process.on('unhandledRejection', function(err) {
    throw err;
});
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('uncaughtException', uncaughtExceptionShutdown);


//----------------------------------------------------------------------------------

//Export function which wiil start the server if we call it
module.exports = async () => {
    if (!server.app.container) {
        await startServer();
    }
    return server;
};


// Run server if we called this file from console
if (require.main === module) module.exports();





