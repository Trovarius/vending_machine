const should = require('chai').should()
const mocha = require('mocha');
const card_recharge = require('../../api/card_recharge');
const card_balance = require('../../api/card_balance');
const card_debit = require('../../api/card_debit');

describe('buy itens', () =>{
    describe('after recharge R$5,00 buy items', ()=>{
        
        let card = null;

        beforeEach(()=>{
            card = {
                history:[]
            }
        })

        it('buy 2.00 item balance should be equal to 3.00', () =>{
            //Arrange
            let price_item = 2.00

            //Action
            card = card_recharge.Recharge(card, new Date());
            card = card_debit.Debit(card, price_item);

            //Assert
            let expected_balance = 3.00;
            
            card_balance.GetBalance(card).should.equal(expected_balance);
        })

        it('should reject price item over 5.00', ()=>{
            //Action
            let price_item = 8.00;

            card = card_recharge.Recharge(card, new Date());
            card = card_debit.Debit(card, price_item);

            //Assert
            let expected_balance = 5.00;
            card_balance.GetBalance(card).should.equal(expected_balance);
        })
    })
})