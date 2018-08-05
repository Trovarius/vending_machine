(function(){
    new Vue({
        el: '#components-demo',
        data(){
            return {
                cardViewModel: null
            }
        },
        mounted(){
            new VendingMachineJQuery();
        }
    })
})();
