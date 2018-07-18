const card_repository = require("../repository/card_repository");
const product_repository = require("../repository/product_repository");
const card_route = require("./card_route");
const admin_route = require("./admin_route");

module.exports = server =>{
    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, h) {
            return "Bem vindo a Vending Machine api, acesse /documention para informações de uso da API";
        }
    });
    
    card_route(server, card_repository, product_repository);
    admin_route(server);
}