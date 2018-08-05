const itens =[
    { id: 1, description: "Coca", price: 5.00 },
    { id: 2, description: "Torcida", price: 3.00 },
    { id: 3, description: "7Bello", price: 0.50 }
]
module.exports = {
    GetAll(){
        return itens;
    }
}