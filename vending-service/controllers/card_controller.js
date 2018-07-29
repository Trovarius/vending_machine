const card_balance = require('../api/card_balance');
const card_recharge = require('../api/card_recharge');

const card_hateoas = (card) => {
    return {
        ...card,
        actions: [{
                name: "ObterInfo",
                route: `/card/${card.id}`,
                description: "Rota para obter informações do cartão"
            },
            {
                name: "ObterSaldo",
                route: `/card/balance/${card.id}`,
                description: "Rota para obter saldo do cartao"
            },
            {
                name: "Recarregar",
                route: `[POST]/card/recharge/${card.id}`,
                description: "Rota para recarga de cartao"
            }
        ]
    }
}

module.exports = (server, card_repo) => {
    server.route({
        method: 'GET',
        path: '/card/{id}',
        handler: function (request, h) {
            const card_id = request.params.id;
            const card = card_repo.GetById(card_id);

            if (!card) return h.response("Cartão não encontrado.").code(404);

            return card_hateoas(card);
        }
    });

    server.route({
        method: 'GET',
        path: '/card/balance/{id}',
        handler: function (request, h) {
            const card_id = request.params.id;
            const card = card_repo.GetById(card_id);

            if (!card) return h.response("Cartão não encontrado.").code(404);

            let card_with_balance = { ...card,
                balance: card_balance.GetBalance(card)
            };

            return h.response(card_hateoas(card_with_balance)).code(201);
        }
    });

    server.route({
        method: 'POST',
        path: '/card/recharge/{id}',
        handler: function (request, h) {
            const card_id = request.params.id;
            const card = card_repo.GetById(card_id);

            if (!card) return h.response("Cartão não encontrado.").code(404);
            
            const card_recharged = card_recharge.Recharge(card);

            const card_with_balance = { ...card_recharged,
                balance: card_balance.GetBalance(card_recharged)
            };

            return h.response(card_hateoas(card_with_balance)).code(201);
        }
    });
}