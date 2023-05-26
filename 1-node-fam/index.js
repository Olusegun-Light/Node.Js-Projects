const fs = require('fs');


// Files


//Blocking Synchronous way of reading/adding file
// How to Read from files
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn)

// How to write to files
// textout is enclosed in temple strings ``
const textOut = `This is what we know about the advocado: ${textIn}.\nCreated on ${Date.now()}`;

fs.writeFileSync('./txt/output.txt', textOut);
console.log("file is written");

// Non Blocking Asynchronous way of reading/writing filess

fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    if (err) return console.log("ERROR")
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
            console.log(data3);

            fs.writeFile('.txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
                console.log('your files has been written');
            })
        });
    });
});