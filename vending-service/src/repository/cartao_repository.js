'use strict'
const DAILY_BALANCE_VALUE = 5.00;

var cards = [{
    id: 1,
    balance: function(date = new Date()){
        console.log(this.history);

        if(this.history.length == 0) return 0.00;

        let milisecondsToDays = balancedate =>{
            console.log(balancedate.getTime());
            console.log(date.getTime());
            let miliseconds = balancedate.getTime() - date.getTime();
            console.log(miliseconds)

            let days = parseInt(miliseconds/(1000*60*60*24));
            
            console.log(days);
            
            return days;
        }
        
        var day_balance = this.history.filter(b => milisecondsToDays(b.date) == 0);

        console.log(day_balance);
                    
        if(day_balance.length == 0) return 0.00;
        
        var balance = day_balance.map(db => db.balance).reduce((a, b) => a + b, 0.00);

        return balance;
    },
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
        console.log(cards);
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