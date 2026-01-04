const fs = require('fs');
const http = require('http');

////////////////////////////////
// FILE

// blocking code execution (Synchronous)

const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);

// non blocking code execution (Asynchronous)

fs.readFile('./txt/input.txt', 'utf-8', (err, data)=>{
  console.log(data);
})
console.log('Reading File...');



const textOut = `This is what we know about the avocado: ${textIn}. \n Created on ${Date.now()}`

fs.writeFileSync('./txt/output.txt', textOut);
console.log('File Written!');




//////////////////////////
// SERVER

const server = http.createServer((req, res) =>{
  res.end('Hello from the server.')
});

server.listen(8000, '127.0.0.1', () =>{
  console.log('Listening to the requests on port 8000');
})
