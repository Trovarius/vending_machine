const response = require("../utils/server_response");

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

module.exports = (server) => {
    
    server.route({
        method: ['POST', 'PUT'],
        path: '/admin/addday',
        config: {
            description: 'Recharge',
            notes: 'Access this route to recharge this card',
            tags: ['api', "admin"], // ADD THIS TAG
            handler: function (request, h) {
                server.Today = addDays(server.Today, 1);

                return response(h).OK(`Data atualizada para ${server.Today}`);
            }
        }
    });
}