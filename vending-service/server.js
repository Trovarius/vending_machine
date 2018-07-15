'use strict';

const Hapi = require('hapi');
const config = require('./config/server');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const route_register = require("./routes");

(async () => {
    // Create a server with a host and port
    const server = Hapi.server(config);

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