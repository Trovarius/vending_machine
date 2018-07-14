
'use strict'
const card_api = require("../api/cartao");

module.exports = (server, cardRepo) => {

    const response = require("../config/server_response");

    server.route({
        method: ['POST', 'PUT'],
        path:'/card/{cardId}/recharge',
        config: {
            description: 'Recharge',
            notes: 'Access this route to recharge this card',
            tags: ['api'], // ADD THIS TAG
            handler: function(request,h) {
                var cardId = request.params.cardId;
                var dateNow = server.Today;
                
                if(!cardId) return response(h).NotFound("Cartão não encontrado");
    
                var card = cardRepo.FindById(cardId);
    
                if(!card) return response(h).NotFound("Cartão não encontrado");
                
                if(!card_api.TodayBalanceIsEmpty(card, dateNow))
                    return response(h).BadRequest("Já ocorreu uma recarga hoje");
                
                cardRepo.Recharge(cardId);
    
                let result = {
                    mensagem: "Cartão recarregado com sucesso.",
                    cardId: card.id,
                    balance: card_api.GetBalance(card, dateNow),
                    actions: [
                        {
                            "action": "Info",
                            "description": "Access this route to get card infos",
                            "method": "GET",
                            "route" : `/card/${card.id}`
                        }
                    ]
                }
    
    
                return response(h).OK(result);
            }
        },
        
    });

    server.route({
        method: 'GET',
        path:'/card/{cardId}',
        config: {
            description: 'Card Info',
            notes: 'Access this route to get card infos',
            tags: ['api'], // ADD THIS TAG
            handler: function(request,h) {
                let cardId = request.params.cardId;
                let dateNow = server.Today;
                
                let card = cardRepo.FindById(cardId);
                
                if(!card) return response(h).NotFound("Cartão não encontrado");
    
                let result = {
                    cardId: card.id,
                    balance: card_api.GetBalance(card, dateNow),
                    actions: [
                        {
                            "action": "Recharge",
                            "description": "Access this route to recharge this card",
                            "method": "POST",
                            "route" : `/card/${card.id}/recharge`
                        }
                    ]
                }
    
                return response(h).OK(result);
            }
        }
        
    });
}