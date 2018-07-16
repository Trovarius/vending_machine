const assert = require('chai').assert;
const card_api = require('../../api/card');
const date_utils = require('../../utils/date');

describe('Card', function () {

  let card = {
    history: []
  };

  beforeEach(() => {
    card.history = [{
        balance: 3.5,
        date: new Date(2018, 6, 10)
      },
      {
        balance: 5.0,
        date: new Date(2018, 6, 11)
      },
      {
        balance: 5.0,
        date: new Date(2018, 6, 8)
      },
      {
        balance: 8.4,
        date: new Date(2018, 6, 7)
      },
      {
        balance: 5.0,
        date: new Date(2018, 6, 5)
      },
      {
        balance: 2.5,
        date: new Date(2018, 5, 7)
      },
    ];
  });

  describe('Obtem saldo cartao', function () {

    it('o saldo deveria começar zerado', function () {
      let today = new Date();

      let balance = card_api.GetBalance(card, today);

      assert.equal(balance, 0);
    });

    it('a cada começo de dia deveria começar zerado', function () {
      let today = new Date();

      let today_balance = card_api.GetBalance(card, today);

      let tomorrow = date_utils.AddDays(today, 1);

      let tomorrow_balance = card_api.GetBalance(card, tomorrow);

      assert.equal(0, tomorrow_balance);
    });

    
    it('depois de recarregar deveria retornar o saldo com valor 5', function () {
      let today = new Date();

      card_api.Recharge(card, today);

      let balance_after_recharge = card_api.GetBalance(card, today);

      assert.equal(5, balance_after_recharge);
    });

    it('depois de realizar uma compra deveria retornar o balance atualizado', function () {
      let today = new Date();

      card_api.Recharge(card, today);
      let balance_after_recharge = card_api.GetBalance(card, today);

      let item_price = 2.0;
      
      card_api.BuyItem(card, item_price, today);

      let new_balance = card_api.GetBalance(card, today);

      assert.equal(balance_after_recharge - item_price, new_balance);
    });
  });

  describe("Recarregar cartao", () => {
    it("Saldo não adiciona mesmo se tentar recarregar duas vezes por dia",  () => {
      let today = new Date();

      let first_recharge_of_day = card_api.Recharge(card, today);
      let first_balance = card_api.GetBalance(first_recharge_of_day, today);

      let second_recharge_of_day = card_api.Recharge(first_recharge_of_day, today);
      let second_balance = card_api.GetBalance(second_recharge_of_day, today);
      

      assert.equal(first_balance, second_balance);
    })
  });

  describe("Comprar item", () => {
    it("Não permite comprar item com valor maior que o saldo",  () => {
      let today = new Date();

      card = card_api.Recharge(card, today);
      let balance = card_api.GetBalance(card, today);

      let item_price = balance + 1.0;

      let result = card_api.BuyItem(card, item_price, today);
      
      assert.isFalse(result);
    })
  });
});