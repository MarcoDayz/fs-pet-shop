const fs = require('fs'); // add this to the top of your js file
const command = process.argv[2];

getUsageMessage(command)
getRead(command)
getCreate(command)

function getUsageMessage(usageEntry){
    if(!command){
    console.log('Usage: node pets.js [read | create | update | destroy]')
    }
}

function getRead(usageEntry){
    let index = process.argv[3];
if(command === 'read' && !index){
    fs.readFile('./pets.json', 'utf-8', function(err, data){
        if(err){
            console.log('There was an error getting READ data');
        }
        let PetData = JSON.parse(data);
            console.log(PetData)
    })
}
if(command === 'read' && index){
    fs.readFile('./pets.json', 'utf-8', function(err, data){
        let petData = JSON.parse(data);
        if(err){
            console.log('There was an error getting index data at READ!');
            }else if(index < 0){
                console.log('Entry value is too low at READ!');
            }else if(index >= petData.length){
                console.log('Entry value is too high at READ!');
            }else{
                 console.log(petData[index]);
        }
    })
}
}

function getCreate(usageEntry) {
if (command === 'create') {
console.log("Usage: node pets.js create AGE KIND NAME");
    fs.readFile('./pets.json', 'utf-8', function (err, data) {
        if(err){
            console.log('There was an error at CREATE');//if error
        }
        const age = parseInt(process.argv[3]);//create variable for age index; turn into integer
        const kind = process.argv[4];//variable for kind index
        const name = process.argv[5];//variable for name index
        const pet = { age, kind, name };//variable for keys combined;
  
        const parsedData = JSON.parse(data);//parse JSON
        parsedData.push(pet);//push the new key and value in obj

        const JSONpets = JSON.stringify(parsedData);//stringify JSON

        if (!age || !kind || !name) {//if no arguments entered
            console.log("You are missing arguements to CREATE pet!")//console message
        }else{
            fs.writeFile('./pets.json', JSONpets, function (err) {//else; write keys and value in jSON
                if(err){
                    console.log('There was an error at CREATE adding data');//if error
                }
            })
        }
    })
}
}