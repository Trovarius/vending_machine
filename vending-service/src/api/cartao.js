'use strict'
function date_diff_in_days(dateNow, date)  {
    let miliseconds = dateNow.getTime() - date.getTime();

    let days = parseInt(miliseconds / (1000 * 60 * 60 * 24));

    return days;
}

module.exports = {
    GetBalance(card, date = new Date()) {
        console.log(card.history);

        if (card.history.length == 0) return 0.00;

        var day_balance = card.history.filter(b => date_diff_in_days(b.date, date) == 0);

        if (day_balance.length == 0) return 0.00;

        var balance = day_balance.map(db => db.balance).reduce((a, b) => a + b, 0.00);

        return balance;
    },
    TodayBalanceIsEmpty(card, date) {
        if (card.history.length == 0) return true;
        
        console.log(card.history);

        let today_history = card.history.filter(b => date_diff_in_days(b.date, date) == 0);
        return today_history.length <= 0;
    }
}