Vue.component('recharge-button', {
    methods:{
        clicked(){
           this.$emit('clicked');
        }
    },
    template: `<button @click="clicked()">Recarregar Cartao</button>`
});