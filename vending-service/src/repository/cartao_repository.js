'use strict'
const DAILY_BALANCE_VALUE = 5.00;

var cards = [{
    id: 1,
    history: [
        {balance: DAILY_BALANCE_VALUE, date: new Date(2018, 6, 10) },
        {balance: DAILY_BALANCE_VALUE, date: new Date(2018, 6, 11) },
        {balance: DAILY_BALANCE_VALUE, date: new Date(2018, 6, 8) },
        {balance: DAILY_BALANCE_VALUE, date: new Date(2018, 6, 7) },
        {balance: DAILY_BALANCE_VALUE, date: new Date(2018, 6, 5) },
        {balance: DAILY_BALANCE_VALUE, date: new Date(2018, 5, 7) },
    ]
}]

module.exports = {
    FindById(cardId){
        if(!cards.length) return null;
        var card = cards.filter(c => c.id == cardId);
        
        if(card && card.length) return card[0];

        return null;
    },
    Recharge(cardId){
        var card = this.FindById(cardId);

        if(!card) return null;

        card.history.push({balance: DAILY_BALANCE_VALUE, date: new Date() });
        
        return card;
    }
}