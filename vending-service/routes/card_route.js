
'use strict'
const card_api = require("../api/card");
const response = require("../utils/server_response");

function card_htaccess(card){
    return [
        {
            "action": "Info",
            "description": "Access this route to get card infos",
            "method": "GET",
            "route" : `/card/${card.id}`
        },
        {
            "action": "Recharge",
            "description": "Access this route to recharge this card",
            "method": "POST",
            "route" : `/card/${card.id}/recharge`
        },
        {
            "action": "Buy item",
            "description": "Access this route to buy item with this card",
            "method": "POST",
            "route" : `/card/${card.id}/buy/{itemId}`
        }
    ];
}

module.exports = (server, card_repo, product_repo) => {

    server.route({
        method: ['POST', 'PUT'],
        path:'/card/{cardId}/recharge',
        config: {
            description: 'Recharge',
            notes: 'Access this route to recharge this card',
            tags: ['api'], // ADD THIS TAG
            handler: function(request,h) {
                let cardId = request.params.cardId;
                let dateNow = server.Today;
                
                if(!cardId) return response(h).NotFound("Cartão não encontrado");
    
                let card = card_repo.FindById(cardId);
    
                if(!card) return response(h).NotFound("Cartão não encontrado");
                
                let result = {
                    menssage: "",
                    cardId: card.id,
                    date: dateNow,
                    balance: card_api.GetBalance(card, dateNow),
                    actions: card_htaccess(card)
                };

                if(!card_api.TodayHistoryIsEmpty(card, dateNow))
                {
                    result.menssage = "Já ocorreu uma recarga hoje";
                    return response(h).BadRequest(result);
                }
                
                card = card_api.Recharge(card, dateNow);
                card_repo.Save(cardId, card);
    
                result.menssage = "Cartão recarregado com sucesso.";
                result.balance = card_api.GetBalance(card);

                return response(h).OK(result);
            }
        },
        
    });

    server.route({
        method: ['POST', 'PUT'],
        path:'/card/{cardId}/buy/{itemId}',
        config: {
            description: 'Buy',
            notes: 'Access this route to buy item with a card',
            tags: ['api'], // ADD THIS TAG
            handler: function(request,h) {
                let cardId = request.params.cardId;
                let itemId =  request.params.itemId;
                let dateNow = server.Today;
                
                if(!cardId) return response(h).NotFound("Cartão não encontrado");
                if(!itemId) return response(h).NotFound("Item  não encontrado");
    
                let card = card_repo.FindById(cardId);
                let item = product_repo.FindById(itemId);
    
                if(!card) return response(h).NotFound("Cartão não encontrado");
                if(!item || item.length > 1) return response(h).NotFound("Item não encontrado");
                
                let result = {
                    menssage: "",
                    cardId: card.id,
                    date: dateNow,
                    balance: card_api.GetBalance(card, dateNow),
                    actions: card_htaccess(card)
                };

                if(!card_api.BuyItem(card, item[0].price, dateNow)){
                    result.menssage = "Valor do item maior que o saldo total."
                    return response(h).BadRequest(result);
                }

                card_repo.Save(cardId, card);
                result.menssage = "Item comprado com sucesso."

                return response(h).OK(result);
            }
        }
        
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
                
                let card = card_repo.FindById(cardId);
                
                if(!card) return response(h).NotFound("Cartão não encontrado");
                
                let card_balance = card_api.GetBalance(card, dateNow);
                let itens_available = product_repo.GetItensPricedLessThan(card_balance);

                let result = {
                    cardId: card.id,
                    date: dateNow,
                    balance: card_balance,
                    items_available: itens_available,
                    history: card.history,
                    actions: card_htaccess(card)
                }
    
                return response(h).OK(result);
            }
        }
    });
}