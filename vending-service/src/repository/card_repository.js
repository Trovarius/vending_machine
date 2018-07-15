'use strict'

var cards = [{
    id: 1,
    history: [
        {balance: 3.5, date: new Date(2018, 6, 10) },
        {balance: 5.0, date: new Date(2018, 6, 11) },
        {balance: 5.0, date: new Date(2018, 6, 8) },
        {balance: 8.4, date: new Date(2018, 6, 7) },
        {balance: 5.0, date: new Date(2018, 6, 5) },
        {balance: 2.5, date: new Date(2018, 5, 7) },
    ]
}]

module.exports = {
    FindById(cardId){
        if(!cards.length) return null;
        var card = cards.filter(c => c.id == cardId);
        
        if(card && card.length) return card[0];

        return null;
    },
    Save(cardId, card){
        var card = this.FindById(cardId);

        if(!card) return null;
        
        card.history = card.history;
        
        return card;
    }
}