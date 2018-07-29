const should = require('chai').should()
const mocha = require('mocha');
const card_recharge = require('../../api/card_recharge');
const card_balance = require('../../api/card_balance');

describe("card recharge per day", () => {
    let card = {};
    let date = null;

    //Arrange
    beforeEach(() => {
        card = {
            history: []
        };

        date = new Date()
    })


    it('balance should be 0.00 before recharge and 5 after', () => {
        //Action
        let balance_before_recharge = card_balance.GetBalance(card);
        card = card_recharge.Recharge(card, date)

        //Assert
        balance_before_recharge.should.equal(0)
        card_balance.GetBalance(card).should.equal(5.00)
    })

    it('first recharge of the day should credit R$5,00 on history', () => {

        //Action
        card = card_recharge.Recharge(card, date);

        //Assert
        let expected_balance = 5.00;

        card_balance.GetBalance(card).should.equal(expected_balance);
        card.history.length.should.equal(1);
    })

    it('second recharge should not included on history and keep credit R$5,00', () => {
        //Action
        //First recharge
        card = card_recharge.Recharge(card);

        //Second recharge
        card = card_recharge.Recharge(card);

        //Assert
        let expected_balance = 5.00;

        card_balance.GetBalance(card).should.equal(expected_balance);
        card.history.length.should.equal(1);
    })

    it('after recharge should get history object with balance of 5 and date equals to date now', () => {
        //Action
        //First recharge
        card = card_recharge.Recharge(card, date);

        //Assert
        let expected_balance = 5.00;
        let expected_history = {
            balance: expected_balance,
            date: date
        }


        card_balance.GetBalance(card).should.equal(expected_balance);
        card.history.length.should.equal(1);
        var history = card.history[0];
        history.balance.should.equal(expected_history.balance);
        history.date.should.equal(expected_history.date);
    });

    it('after midnight recharge is available, history should have 2 inputs', () => {
        //Action
        //First recharge
        card = card_recharge.Recharge(card, date);

        var tomorrow = new Date();
        tomorrow.setDate(date.getDate() + 1);

        card = card_recharge.Recharge(card, tomorrow);

        //Assert

        card.history.length.should.equal(2);
        card.history[0].date.should.equal(date);
        card.history[1].date.should.equal(tomorrow);
    });
})