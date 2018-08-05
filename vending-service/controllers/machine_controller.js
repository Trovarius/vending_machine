const debit = require('../api/card_debit');

module.exports = (server, itens_repo, card_repo) =>{
    
    server.route({
        method: 'GET',
        path: '/items',
        handler: function (request, h) {
            return h.response(itens_repo.GetAll()).code(201);
        }
    });

    server.route({
        method: 'GET',
        path: '/items/{balance}',
        handler: function (request, h) {
            let balance = request.params.balance;

            let itemsBelowBalance = itens_repo.GetAll().filter(i => i.price <= balance);

            return h.response(itemsBelowBalance).code(201);
        }
    });

    server.route({
        method: 'POST',
        path: '/buy/{item_id}/{card_id}',
        handler: function (request, h) {
            console.log(request.params);
            const card_id = request.params.card_id;
            const item_id = request.params.item_id;

            const card = card_repo.GetById(card_id);
            const item = itens_repo.GetAll().filter(i => i.id == item_id)[0];

            if (!card) return h.response("Cartão não encontrado.").code(404);
            let newCard = debit.Debit(card, item.price);

            return h.response(newCard).code(201);
        }
    });
}