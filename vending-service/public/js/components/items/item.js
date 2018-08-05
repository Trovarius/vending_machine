Vue.component('item-machine', {
    props: ["name", "price", "id"],
    methods: {
        buyItem() {
            console.log(this.name);
            console.log(this.price);
            console.log(this.id);
        }
    },
    template: `<div class="container" :data-can="id" :data-name="name"><div class="can"></div></div>`
});