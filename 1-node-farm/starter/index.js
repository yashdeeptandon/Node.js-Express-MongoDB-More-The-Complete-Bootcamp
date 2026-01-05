const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const { replaceTemplate } = require('./modules/replaceTemplate');
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

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const slugs = dataObj.map(item => slugify(item.productName, {lower: true}))


console.log(slugs)

const server = http.createServer((req, res) =>{
  const {query, pathname} = url.parse(req.url, true)

  // OVERVIEW
  if(pathname === '/overview' || pathname === '/'){
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const cardsHtml = dataObj.map(item => replaceTemplate(tempCard, item)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);
  }else if(pathname === '/product'){
    const product = dataObj[query.id];
     res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const output = replaceTemplate(tempProduct, product)
    res.end(output);
  }else if(pathname === '/api'){
    // API
    res.writeHead(200, {
        'content-type': 'application/json'
      })
      res.end(data);
  }else{
    // NOT FOUND
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'yashdeep-tandon',
    })

    res.end('<h1>Page not found!</h1>')
  }

});

server.listen(8000, '127.0.0.1', () =>{
  console.log('Listening to the requests on port 8000');
});


// ROUTING

