'use strict'

const DAILY_BALANCE_VALUE = 5.00;

function DateDiffInDays(dateNow, date)  {
    let miliseconds = dateNow.getTime() - date.getTime();

    let days = parseInt(miliseconds / (1000 * 60 * 60 * 24));

    return days;
}

module.exports = {
    GetBalance(card, date = new Date()) {
        console.log(card.history);

        if (card.history.length == 0) return 0.00;

        var day_balance = card.history.filter(b => DateDiffInDays(b.date, date) == 0);

        if (day_balance.length == 0) return 0.00;

        var balance = day_balance.map(db => db.balance).reduce((a, b) => a + b, 0.00);

        return balance;
    },
    TodayBalanceIsEmpty(card, date) {
        if (card.history.length == 0) return true;
        
        console.log(card.history);

        let today_history = card.history.filter(b => DateDiffInDays(b.date, date) == 0);
        return today_history.length <= 0;
    },
    Recharge(card, recharge_date){
        if(!card) return null;

        card.history.push({balance: DAILY_BALANCE_VALUE, date: new Date(recharge_date.getFullYear(), recharge_date.getMonth(), recharge_date.getDate()) });
        
        return card;
    },
    BuyItem(card, item_price, buy_date){
        if(!card) return null;
        
        if(item_price > this.GetBalance(card))
            return false;

        card.history.push({balance: (item_price * -1), date: new Date(buy_date.getFullYear(), buy_date.getMonth(), buy_date.getDate()) });
        
        return true;
    }
}