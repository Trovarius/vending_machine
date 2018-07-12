
'use strict'

module.exports = (server, cardRepo) => {

    const response = require("../config/server_response");

    function TodayBalanceIsEmpty(card, date){
        console.log('history length:' + card.history.length)

        if(card.history.length == 0) return true;
        console.log(card.history);
        console.log(date);

        let milisecondsToDays = balancedate =>{
            console.log(balancedate.getTime());
            console.log(date.getTime());
            let miliseconds = balancedate.getTime() - date.getTime();
            console.log(miliseconds)

            let days = parseInt(miliseconds/(1000*60*60*24));
            
            console.log(days);
            
            return days;
        }

        let today_history = card.history.filter(b => milisecondsToDays(b.date) == 0);
        console.log(today_history);                            
        return today_history.length <= 0;
    }
    
    server.route({
        method: ['POST', 'PUT'],
        path:'/cartao/{cardId}/recarregar',
        handler: function(request,h) {
            var cardId = request.params.cardId;
            var dateNow = server.Today;
            
            if(!cardId) return response(h).NotFound("Cartão não encontrado");

            var card = cardRepo.FindById(cardId);

            if(!card) return response(h).NotFound("Cartão não encontrado");
            
            if(!TodayBalanceIsEmpty(card, dateNow))
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

            return response(h).OK(card.balance(dateNow));
        }
    });
}