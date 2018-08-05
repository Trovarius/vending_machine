Vue.component('card-balance', {
    props: ["balance"],
    filters:{
        money(value){
            if(!value) return "R$ 0,00";
            return `R$ ${value},00`;
        }
    },
    template: `<div><h1>{{this.balance | money}}</h1></div>`
});