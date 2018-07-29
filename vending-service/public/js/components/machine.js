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

Vue.component('card-pad', {
    data() {
        return {
            cardNumber: "",
            cardInfo: ""
        }
    },
    methods: {
        entrar(el) {
            fetch(`/card/${this.cardNumber}`)
            .then(data =>{
                console.log(data);
                return data.json();
            })
            .catch(error => this.cardInfo = "Cartão não encontrado")
            .then(json =>{
                console.log(json);
                this.cardInfo = JSON.stringify(json);
            });
            
        }
    },
    template: `<div style="margin-left:50px">
    {{cardNumber}}
    <button @click="cardNumber += '1' ">1</button>
    <button @click="cardNumber += '2'">2</button>
    <button @click="cardNumber += '3'">3</button>
    <button @click="cardNumber += '4'">4</button>
    <button @click="cardNumber += '5'">5</button>
    
    <button @click="entrar()">Entrar</button>
    {{cardInfo}}
</div>`
});

Vue.component('machine', {
    template: `<div>
    
    <card-pad/>

    <div class="machine">

        <div class="inner">
            <div class="arm">
                <div class="hand"></div>
            </div>
            
            <div class="shelf" data-shelf="A">
                <item-machine id="1" name="Coca"/>
                <item-machine id="2" name="pipoca"/>
                <item-machine id="3" name="energetico"/>
                <item-machine id="4" name="amendoim"/>
                <item-machine id="5" name="chocolate"/>
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
    
    <div class="numpad">
        <div class="current-input"></div>
    </div>

 
    
    <a href="https://twitter.com/lewitje" target="_blank">by @lewitje</a>
    </div>`
});