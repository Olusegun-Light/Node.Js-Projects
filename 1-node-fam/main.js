const http = require('http');
const url = require('url');
const fs = require('fs');
const slugify = require('slugify')
const replaceTemplate = require('./modules/replaceTemplate');


// SERVER

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8',);
const dataObj = JSON.parse(data);

const slugs = dataObj.map(el => slugify(el.productName, {lower: true}))
console.log(slugs);

const sever = http.createServer((req, res) => {
    
    // console.log(req.url);
    const {query, pathname} = (url.parse(req.url, true))

    // Overview page
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { 'Content-type': 'text/html' });

        const cardsHTML = dataObj.map(el => replaceTemplate(tempCard, el)).join('')
        const output = tempOverview.replace(`{%PRODUCT_CARDS%}`, cardsHTML)
        // console.log(cardsHTML);
        res.end(output);

    // Product page
    } else if (pathname === '/product') {
        // console.log(query)
        const product = dataObj[query.id]
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
    
    // API
    } else if (pathname === '/api') {
        res.writeHead(200, { 'Content-type': 'application/json' })
        res.end(data);

    // Not Found
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello'
        })
        res.end("<h1>Page not found!</h1>");
    }
});

// Local host sever
sever.listen(3000, '127.0.0.1', () => {
    console.log("Listening to request on port 3000")
})
