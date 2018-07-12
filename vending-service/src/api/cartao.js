'use strict'

module.exports = {
    GetBalance(card, date = new Date()) {
        console.log(card.history);

        if (card.history.length == 0) return 0.00;

        let milisecondsToDays = balancedate => {
            console.log(balancedate.getTime());
            console.log(date.getTime());
            let miliseconds = balancedate.getTime() - date.getTime();
            console.log(miliseconds)

            let days = parseInt(miliseconds / (1000 * 60 * 60 * 24));

            console.log(days);

            return days;
        }

        var day_balance = card.history.filter(b => milisecondsToDays(b.date) == 0);

        console.log(day_balance);

        if (day_balance.length == 0) return 0.00;

        var balance = day_balance.map(db => db.balance).reduce((a, b) => a + b, 0.00);

        return balance;
    },
    TodayBalanceIsEmpty(card, date){
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
}