
'use strict'
const card_api = require("../api/cartao");

module.exports = (server, cardRepo) => {

    const response = require("../config/server_response");

    server.route({
        method: ['POST', 'PUT'],
        path:'/cartao/{cardId}/recarregar',
        handler: function(request,h) {
            var cardId = request.params.cardId;
            var dateNow = server.Today;
            
            if(!cardId) return response(h).NotFound("Cartão não encontrado");

            var card = cardRepo.FindById(cardId);

            if(!card) return response(h).NotFound("Cartão não encontrado");
            
            if(!card_api.TodayBalanceIsEmpty(card, dateNow))
                return response(h).BadRequest("Já ocorreu uma recarga hoje");
            
            cardRepo.Recharge(cardId);

            return response(h).OK("Recarregado");
        }
    });

    server.route({
        method: 'GET',
        path:'/cartao/{cardId}',
        handler: function(request,h) {
            var cardId = request.params.cardId;
            var dateNow = server.Today;
            
            var card = cardRepo.FindById(cardId);
            
            if(!card) return response(h).NotFound("Cartão não encontrado");

            return response(h).OK(card_api.GetBalance(card, dateNow));
        }
    });
}