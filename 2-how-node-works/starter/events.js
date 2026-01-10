const EventEmitter = require('events');

// const myEmitter = new EventEmitter();

class Sales extends EventEmitter{
  constructor(){
    super();
  }
}

const myEmitter = new Sales();

// observers

myEmitter.on('newSale', () => {
  console.log("There was a new sale");
});

myEmitter.on('newSale', () =>{
  console.log('Customer Name: Yashdeep');
})

myEmitter.on('newSale', stock =>{
  if(stock)console.log(`There are ${stock} items in the stock.`)
})

// emitter

myEmitter.emit('newSale');
myEmitter.emit('newSale', 9);
