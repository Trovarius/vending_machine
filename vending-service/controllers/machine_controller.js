module.exports = (server, itens_repo) =>{
    
    server.route({
        method: 'GET',
        path: '/itens',
        handler: function (request, h) {
            return h.response(itens_repo.GetAll()).code(201);
        }
    });

    server.route({
        method: 'POST',
        path: '/buy',
        handler: function (request, h) {
            const card_id = request.body.card_id;
            const item_id = request.body.item_id;
            
            return h.response(itens_repo.GetAll()).code(201);
        }
    });
}