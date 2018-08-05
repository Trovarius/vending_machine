Vue.component('machine', {
    data() {
        return {
            card: null,
            items: []
        }
    },
    watch:{
        card:function(newCard, oldCard){
            this.getItems();
        }
    },
    methods: {
        getCard(cardNumber) {
            fetch(`/card/${cardNumber}`)
                .then(data => {
                    console.log(data);
                    return data.json();
                })
                .catch(error => this.card = null)
                .then(json => {
                    this.card = json;
                    console.log(this.card);
                });
        },
        recharge() {
            fetch(this.card.actions.Recharge.route, {
                    method: 'POST', // or 'PUT'
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(data => {
                    console.log(data);
                    return data.json();
                })
                .catch(error => this.card = null)
                .then(json => {
                    this.card = json;
                });
        },
        getItems(){
            fetch(`/items/${this.card.balance}`)
            .then(data => {
                console.log(data);
                return data.json();
            })
            .catch(error => this.card = null)
            .then(json => {                
                this.items = json;
                console.log(this.items);
            });
        },
        buyItem(itemDesc){
            
            let itemId = this.items.filter(i => i.description == itemDesc)[0].id;
            
            fetch(`/buy/${itemId}/${this.card.id}`, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify({item_id: itemId, card_id: this.card.id}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(data => {
                console.log(data);
                return data.json();
            })
            .catch(error => this.card = null)
            .then(json => {
                this.getCard(this.card.id);
            });
        }
    },
    template: `<div>
    <div class="header" v-if="card">
        <card-balance :balance="card.balance"/>

        <recharge-button @clicked="recharge"/>
    </div>

    <div class="machine" v-if="card">

        <div class="inner">
            <div class="arm">
                <div class="hand"></div>
            </div>
            
            <div class="shelf" data-shelf="A">
                <item-machine v-for="item in this.items" :id="item.id" :name="item.description" />
            </div>
            
        </div>
        
        <div class="glass">
        </div>
        
        <div class="tray-inner">
        </div>
        
        <div class="tray">
        </div>

        <div class="numberpad">
        </div>
    </div>

  

    <div class="itemnumpad" v-if="card">
        <numpad :buttons="this.items.map(x => x.description)" @enter="buyItem" clearEverySelection/>
    </div>

    <numpad @enter="getCard" itens="" v-else/>
    
    <a href="https://twitter.com/lewitje" target="_blank">by @lewitje</a>
    </div>`
});