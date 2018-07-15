const response = require("../utils/server_response");
const date_utils = require("../utils/date");

module.exports = (server) => {
    
    server.route({
        method: ['POST', 'PUT'],
        path: '/admin/addday',
        config: {
            description: 'Recharge',
            notes: 'Access this route to recharge this card',
            tags: ['api', "admin"], // ADD THIS TAG
            handler: function (request, h) {
                server.Today = date_utils.AddDays(server.Today, 1);

                return response(h).OK(`Data atualizada para ${server.Today}`);
            }
        }
    });
}