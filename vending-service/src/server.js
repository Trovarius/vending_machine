'use strict';

const Hapi=require('hapi');
const config = require('./config/server')
const card_repository = require('./repository/cartao_repository');

// Create a server with a host and port
const server = Hapi.server({
    host: config.HOST,
    port: config.PORT
});

server.Today = new Date();

const card_route = require('./routes/cartao_route')(server, card_repository);
const date_route = require('./routes/date_route')(server);


server.route({
    method:'GET',
    path:'/',
    handler:function(request,h) {
        return "Bem vindo a Vending Machine api";
    }
});

// Start the server
async function start() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();