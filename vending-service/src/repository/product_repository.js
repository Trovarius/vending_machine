'use strict'

let items = [{
        id: '1',
        item: "Coca-cola",
        price: 2.5
    },
    {
        id: '2',
        item: "Amendoim",
        price: 1.5
    },
    {
        id: '3',
        item: "Guaraná",
        price: 3.0
    },
    {
        id: '4',
        item: "Torcida",
        price: 1.60
    },
    {
        id: '5',
        item: "Redbull",
        price: 5.0
    },
];

module.exports = {
    FindAll() {
        return items;
    },
    FindById(itemId) {
        return items.filter(i => i.id == itemId);
    }, 
    GetItensPricedLessThan(price){
        return items.filter(i => i.price <= price);
    }
}