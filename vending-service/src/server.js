'use strict';

const Hapi = require('hapi');
const config = require('./config/server');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const card_repository = require('./repository/cartao_repository');

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

    //Routes setup
    const card_route = require('./routes/cartao_route')(server, card_repository);
    const date_route = require('./routes/admin_route')(server);

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