const card_repository = require("../repository/card_repository");
const product_repository = require("../repository/product_repository");
const card_route = require("./card_route");
const admin_route = require("./admin_route");

module.exports = server =>{
    card_route(server, card_repository, product_repository);
    admin_route(server);
}