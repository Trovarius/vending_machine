'use strict';

const Hapi = require('hapi');
const config = require('./config/server');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const card_repository = require('./repository/card_repository');
const product_repository = require('./repository/product_repository');
const admin_route = require('./routes/admin_route');
const card_route = require('./routes/card_route');
const route_register = require("./routes");

(async () => {
    // Create a server with a host and port
    const server = Hapi.server({
        host: config.HOST,
        port: config.PORT
    });

    server.Today = new Date();

    const swaggerOptions = {
        info: {
            title: 'Test API Documentation',
            version: 'v1',
        },
    };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    
    //Register Routes
    route_register(server);
    

    //Default route
    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, h) {
            return "Bem vindo a Vending Machine api, acesse /document para informações de uso da API";
        }
    });

    // Start the server
    async function start() {

        try {
            await server.start();
        } catch (err) {
            console.log(err);
            process.exit(1);
        }

        console.log('Server running at:', server.info.uri);
    };

    start();
})();