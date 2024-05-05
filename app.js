
const express = require('express');
const path = require('path');
const Database = require('./src/modules/DataBase');


const port = process.env.PORT || 8080;


const app = express();


app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname,'src/views'));
app.set('view engine', 'hbs');
app.use(express.static('public')); // Serve static files from 'public' directory
app.use('/',require(path.join(__dirname, '/src/routes/routes.js')))


// app.post('/submit', async (req, res) => {
//     const db = new Database(); // Create an instance of the Database class

//     try {
//         const { name, sr } = req.body;
//         const connectedClient = await db.connectToDatabase(); // Connect to the database

//         // Execute the queries
//         const id = await connectedClient.query('SELECT nextval(\'formstable_id_seq\');');
//         const ex = id.rows[0].nextval;
//         const result = await connectedClient.query('INSERT INTO formstable(id, sr, name) VALUES ($1,$2,$3)', [ex, sr, name]);

//         // Close the database connection
//         await db.closeDatabaseConnection();

//         // Render the redirect view
//         // res.redirect('');
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });







app.listen(port,()=>{
    console.log('Server Started');
})
module.exports = app;