const RECHARGE_VALUE = 5.00;

function DateDiffInDays(date, compare_date){
    let diff = compare_date.getTime() - date.getTime();

    if(diff < 0) return 0;

    let days = diff / (1000 * 60 * 60 * 24);

    return Math.round(days);
}

module.exports = {
    Recharge(card, dateNow = new Date()){
        if(!card.history) card["history"] = [];

        if(card.history.filter(h => DateDiffInDays(h.date, dateNow) == 0).length)
            return card;
        
        card.history.push({balance:RECHARGE_VALUE, date: dateNow});
        
        return card;
    }
}