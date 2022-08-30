import express from "express";
// import fs from 'fs';
import pkg from "pg";
const {Pool} = pkg;
const app = express();
const port = 4000;

const pool = new Pool({
    user:'markdays',
    password:'',
    host:'localhost',
    port:5432,
    database:'pets'
});

app.use(express.json());

//GET ALL
app.get('/pets', async (req,res) => {
    try{
        let {rows} = await pool.query('SELECT * FROM pets');
        res.send(rows);
    }catch(error){
    console.error(error.message);
    }
});
//GET 1
app.get('/pets/:id', async (req,res) => {
    try{
        const {id} = req.params;
        let {rows} = await pool.query(`SELECT * FROM pets WHERE pet_id = $1`,[id]);
        res.send(rows);
    }catch(error){
    console.error(error.message);
    }
});
//Create
app.post('/pets', async (req,res) => {
    try{
        let {name,age,kind} = req.body;
        await pool.query(`INSERT INTO pets (name,age,kind) VALUES ($1,$2,$3)`,[name,age,kind]);
        let {rows} = await pool.query('SELECT * FROM pets');
        res.send(rows);
    }catch(error){
    console.error(error.message);
    }
});
//UPDATE 1
app.patch('/pets/:id', async (req,res) => {
    try{
        const {id} = req.params;
        let {name,age,kind} = req.body;
        await pool.query(`UPDATE pets SET name = $1, age = $2, kind = $3 WHERE pet_id = $4`,[name,age,kind,id]);
        let {rows} = await pool.query('SELECT * FROM pets');
        res.send(rows);
    }catch(error){
    console.error(error.message);
    }
});

//DELETE 1
app.delete('/pets/:id', async (req,res) => {
    try{
        const {id} = req.params;
        await pool.query(`DELETE FROM pets WHERE pet_id = $1`,[id]);
        let {rows} = await pool.query('SELECT * FROM pets');
        res.send(rows);
    }catch(error){
    console.error(error.message);
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});

// app.use(express.json()); 


// //GET 1
// app.get('/pets/:id', (req,res) => {
//     const urlIndex = req.params.id;
//     fs.readFile('pets.json', 'utf-8', function(err, data){
//         const petData = JSON.parse(data);
//         const petDataLength = petData.length;

//         if(urlIndex >= petDataLength || urlIndex < 0){
//             res.status(404);
//             res.contentType('text/plain');
//             res.send('Not Found')
//         }else{
//             res.status(200)
//             res.contentType('application/json')
//             res.send(JSON.stringify(petData[urlIndex]))
//         }
//     }) 
// });

// //GET ALL
// app.get('/pets', function(req,res){
//     fs.readFile('pets.json', 'utf-8', function(err, data){
//         res.status(200)
//         res.contentType('application/json')
//         res.send(data);
//     });
// });

// // CREATE
// app.post('/pets', (req,res) => {
//     const body = req.body;
// fs.readFile('pets.json', 'utf-8', (err, data) => {
//         if(err){
//             throw err;
//         }
//         const petData = JSON.parse(data);
//             petData.push(body);
//         const JSONPets = JSON.stringify(petData);
//             res.status(200)
//             res.contentType('application/json')
//             res.send(JSONPets);
// fs.writeFile('pets.json', JSONPets, (err) => {
//             if(err){
//                 throw err;
//             }
//         })
//     })
// });

// //UPDATE 1
// app.patch('/pets/:id', (req,res) => {
//     const urlID = req.params.id;
//     const petJSON = fs.readFileSync('pets.json');
//     const data = JSON.parse(petJSON);
//     const dataIndex = data[urlID];

//     if(req.body.age){
//     dataIndex['age'] = Number(req.body.age);
//     fs.writeFileSync('pets.json', (JSON.stringify(data)));
//     res.json(data);
//     }
//     else if(req.body.name){
//         dataIndex['name'] = req.body.name;
//         fs.writeFileSync('pets.json', (JSON.stringify(data)));
//         res.json(data);
//         }
//     else if(req.body.kind){
//         dataIndex['kind'] = req.body.kind;
//         fs.writeFileSync('pets.json', (JSON.stringify(data)));
//         res.json(data);
//         }
//         else{
//             throw err;
//         }
// });

// //DELETE
// app.delete('/pets/:id', (req,res) => {
//     const id = req.params.id
//     fs.readFile('pets.json', 'utf-8', (err,data) => {
//         const parseData = JSON.parse(data)
//         parseData.splice(id, 1);
//         let jsondata = JSON.stringify(parseData)
//         res.send(jsondata)
//         fs.writeFile('pets.json',jsondata, 'utf-8', (err) =>{
//             if(err){
//                 throw err;
//             }
//         })
//     })
// })