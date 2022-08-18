const http = require('http');
const fs = require('fs');
const { ifError } = require('assert');

const server = http.createServer();
const port = 8000

server.on('request',function(req,res) {

    if(req.url === `/pets/`) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        fs.readFile('pets.json', 'utf-8', function(err, data) {
            if(err){
                console.log('There was an error');
            }
            res.end(data);
        })

    }
    const splitUrl = req.url.split('/');
    const indexValue = splitUrl[splitUrl.length -1];
    const lastIndexValue = JSON.stringify(indexValue);

    if(req.url === `/pets/${indexValue}`){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
       
    fs.readFile('pets.json', 'utf-8', function(err, data){
            if(err){
                console.log('There was an error');
            }
            let petData = JSON.parse(data);
            let sendData = petData[indexValue]
            res.end(JSON.stringify(sendData))
            
        })

        if(indexValue > lastIndexValue.length) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain')
            res.end('Not Found')
        } else if(indexValue < 0){
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json')
            res.end('Not Found')

        }

    }
    
})

server.listen(port, function(){
    console.log(`listening on port: ${port}`)
})