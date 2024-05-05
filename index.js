// const {client, connectToDatabase, closeDatabaseConnection } = require('../PostTables/DataBase');
const express = require('express');
const Database = require('../PostTables/DataBase');
const port = 8080;


const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('views', __dirname);
app.set('view engine', 'hbs');

app.post('/submit', async (req, res) => {
    const db = new Database(); // Create an instance of the Database class

    try {
        const { name, sr } = req.body;
        const connectedClient = await db.connectToDatabase(); // Connect to the database

        // Execute the queries
        const id = await connectedClient.query('SELECT nextval(\'formstable_id_seq\');');
        const ex = id.rows[0].nextval;
        const result = await connectedClient.query('INSERT INTO formstable(id, sr, name) VALUES ($1,$2,$3)', [ex, sr, name]);

        // Close the database connection
        await db.closeDatabaseConnection();

        // Render the redirect view
        // res.redirect('');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});



// app.post('/submit', async (req,res)=>{
//     let conectedClient;
//     try {
//         const {name,sr} = req.body;
//         conectedClient = await new connectToDatabase(); 
//         const id = await conectedClient.query('SELECT nextval(\'formstable_id_seq\');');
//         const ex = id.rows[0].nextval;
//         const result = await conectedClient.query('INSERT INTO formstable(id, sr, name) VALUES ($1,$2,$3)',[ex,sr,name]);
//         // await closeDatabaseConnection(conectedClient);
//         res.render('redirect.hbs')
//     } 
//     catch(error){
//         console.log('Error', error);
//         res.status(500).send('Internal Server Error');
//         await closeDatabaseConnection();
//     }finally{
//         if(conectedClient){
//             console.log('in finally');
//             closeDatabaseConnection();
//         }
//     }
//     // await closeDatabaseConnection();
    
// });



// app.post('/submit', async (req, res) => {
//     let client;
//     try {
//         const { name, sr } = req.body;
//         client = await database.connect(); // Connect to the database
//         if (!client) {
//             throw new Error('Database connection failed');
//         }
//         const idResult = await client.query('SELECT nextval(\'formstable_id_seq\');');
//         const ex = idResult.rows[0].nextval;
//         const result = await client.query('INSERT INTO formstable(id, sr, name) VALUES ($1, $2, $3)', [ex, sr, name]);
//         res.render('redirect.hbs'); // Send the response
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).send('Internal Server Error');
//     } finally {
//         if (client) {
//             await database.disconnect(); // Disconnect from the database
//         }
//     }
// });



app.get('/',(req,res)=>{
    res.render('index.hbs');
})

app.listen(port,()=>{
    console.log('Server Started');
})