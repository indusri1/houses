const houses = require('./db.json');
let globalId = 4;

const getHouses = (req, res) => {
    res.status(200).send(houses);
}
    
const deleteHouse = (req, res) => {
    const { id } = req.params; 
     for(let i = 0; i < houses.length; i++){
       if(houses[i].id === +id){
         houses.splice(i, 1);
         return res.status(200).send(houses);
       }
     }
     res.status(400).send(houses);
}

const createHouse = (req, res) => {
    const { address, price, imageURL } = req.body;
    houses.push({
        address,
        price: +price,
        imageURL,
        id: globalId,
    });
    globalId++;
    res.status(200).send(houses);
}

const updateRating = (req, res) => {
    const { id } = req.params;
    const { type } = req.body; 
  
    for(let i = 0; i < houses.length; i++){
      if(houses[i].id === +id){
        if(type === 'plus'){
          houses[i].price+=10000;
        } else if (type === 'minus' && houses[i].price > 0){
          houses[i].price-=10000
        }
        return res.status(200).send(houses);
      }
    }
}

module.exports = {
    getHouses,
    deleteHouse,
    createHouse,
    updateRating
  };