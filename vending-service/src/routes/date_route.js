
module.exports = (server) => {

    const response = require("../config/server_response");
    
    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    server.route({
        method: ['POST', 'PUT'],
        path:'/addday',
        handler: function(request,h) {
            server.Today = addDays(server.Today, 1);

            return response(h).OK(`Data atualizada para ${server.Today}`);
        }
    });
}