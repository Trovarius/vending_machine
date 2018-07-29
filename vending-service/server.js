'use strict';

const Hapi = require('hapi');
const config = require('./config/server');
const card_controller = require('./controllers/card_controller');
const card_repo = require('./repository/card_repository');
const Path = require('path')


// Create a server with a host and port
const server = Hapi.server({
    host: config.host,
    port: config.port,
    routes: {
        files: {
            relativeTo: Path.join(__dirname, 'public')
        }
    }
});


card_controller(server, card_repo)

// Start the server
async function start() {

    try {
        await server.register(require('inert'));
        
        server.route({
            method: 'GET',
            path: '/{param*}',
            handler: {
                directory: {
                    path: '.'
                }
            }
        });

        await server.start();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();