const card_balance = require('./card_balance');

module.exports = {
    Debit(card, price_item){
        if(!card.history) card["history"] = [];

        if(card_balance.GetBalance(card) < price_item)
            return card;

        card.history.push({balance: price_item * -1, date: new Date()});

        return card;
    }
}