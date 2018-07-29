module.exports = {
    GetBalance(card){

        if(!card.history || card.history.length == 0)
            return 0;

        let balance_array = card.history.map(h => h.balance);
        let balance = balance_array.reduce((accumulator, currentValue) => accumulator + currentValue);
            
        return balance;
    }
}