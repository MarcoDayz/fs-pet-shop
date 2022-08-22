const express = require('express'); //import node js express
const app = express();//optional; assign express a var
const fs = require('fs');//import node js file system
const PORT = 3000;//assign a port num

//GET ALL
app.get('/pets', function(req,res){
    fs.readFile('pets.json', 'utf-8', function(err, data){
        res.status(200)
        res.contentType('application/json')
        res.send(data);
    })
})
//GET ONE
app.get('/pets/:id', function(req,res){
    const urlIndex = req.params.id;
    fs.readFile('pets.json', 'utf-8', function(err, data){
        const petData = JSON.parse(data);
        const petDataLength = petData.length;

        if(urlIndex >= petDataLength || urlIndex < 0){
            res.status(404);
            res.contentType('text/plain');
            res.send('Not Found')
        }else{
            res.status(200)
            res.contentType('application/json')
            res.send(JSON.stringify(petData[urlIndex]))
        }
    })  
});

app.put('/pets/:id', function(req,res){
    res.send(req.query.id)
});

// CREATE
app.post('/pets', function(req,res){

    const age = Number(req.query.age);
    const kind = req.query.kind;
    const name = req.query.name;

    if(!age || !kind || !name){
        res.status(400)
        res.contentType('text/plain')
        res.send('Bad Request')
    };

    fs.readFile('pets.json', 'utf-8', function(err, data){
        if(err){
            res.send('Error readind pet data');
        }
        const petData = JSON.parse(data);
        const newPet = {"age": age, "kind": kind, "name": name};
        petData.push(newPet);
        
        const JSONPets = JSON.stringify(petData);
        res.status(200)
        res.contentType('application/json')
        res.send(JSONPets);

        fs.writeFile('pets.json', JSONPets, function(err){
            if(err){
                res.send('Error writing pet data');
            }
        })
    })    
});

app.get('/*' , function(req,res){
    res.status(404);
    res.contentType('text/plain');
    res.send('Not Found');

})


app.listen(PORT, function(){
    console.log(`listening on port: ${PORT}`)
})