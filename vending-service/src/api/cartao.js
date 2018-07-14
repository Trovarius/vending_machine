'use strict'

module.exports = {
    GetBalance(card, date = new Date()) {
        console.log(card.history);

        if (card.history.length == 0) return 0.00;

        let milisecondsToDays = balancedate => {
            let miliseconds = balancedate.getTime() - date.getTime();

            let days = parseInt(miliseconds / (1000 * 60 * 60 * 24));

            return days;
        }

        var day_balance = card.history.filter(b => milisecondsToDays(b.date) == 0);

        if (day_balance.length == 0) return 0.00;

        var balance = day_balance.map(db => db.balance).reduce((a, b) => a + b, 0.00);

        return balance;
    },
    TodayBalanceIsEmpty(card, date) {
        if (card.history.length == 0) return true;

        let milisecondsToDays = balancedate => {
            let miliseconds = balancedate.getTime() - date.getTime();

            let days = parseInt(miliseconds / (1000 * 60 * 60 * 24));

            return days;
        }

        let today_history = card.history.filter(b => milisecondsToDays(b.date) == 0);
        return today_history.length <= 0;
    }
}