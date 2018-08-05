Vue.component('numpad', {
    props:{
        buttons:{
            default: [1,2,3,4,5,6,7,8,9,0]
        },
        clearEverySelection:{
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            cardNumber: "",
        }
    },
    methods: {
        padClick(e){
            if(["C", "E"].indexOf(e.target.innerText) == -1)
            {
                if(this.clearEverySelection) this.cardNumber = "";
                this.cardNumber += e.target.innerText;
            }
            else if(e.target.innerText == "C")
            {
                this.cardNumber = "";
            }
            else
            {
                this.$emit('enter', this.cardNumber)
            }
        }
    },
    template: `
    <div class="numpad">
    <div id="wrap">
    <ul id="display">
        <li v-for="num in cardNumber.split('')"> {{num}}</li>
        <div class="clear"></div>
    </ul>
    <ul id="numpad">
      <li v-for="n in [...this.buttons, 'C', 'E']" @click="padClick">{{n}}</li>
    </ul>
  </div>
    </div>`
});