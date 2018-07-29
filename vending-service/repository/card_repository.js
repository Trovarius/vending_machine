const cards =[
    { id: 1, history:[] }
]


module.exports = {
    GetById(id){
        let card = cards.filter(c => c.id == id)

        return card.length ? card[0] : null;
    }
}