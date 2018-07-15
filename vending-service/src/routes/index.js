const card_route = require("./card_route");
const card_repository = require("../repository/card_repository");
const admin_route = require("./admin_route");
const vending_route = require("./vending_route");

module.exports = server =>{
    card_route(server, card_repository);
    admin_route(server);
    vending_route(server);
}