const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const {login, signup} = require('../utils/authentication')
const router = express.Router();



var text = "";
var charset = "abcdefghijklmnopqrstuvwxyz0123456789";

for( var i=0; i < 16; i++ )
    text += charset.charAt(Math.floor(Math.random() * charset.length));

const random = text;
// Set up middleware to parse request bodies
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static('public')); // Serve static files from 'public' directory
router.use(session({
    secret: random, // Change this to a secure random string
    resave: false,
    saveUninitialized: true
}));


router.get('/',(req, res) => {
    res.render('login');
});
router.get('/login', (req, res) => {
    res.render('login');
});

// Login route (POST)
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const returnstatus = await login(username,password);
    if (returnstatus)
    {
        req.session.userId = returnstatus[0].id; 
        req.session.userName = returnstatus[0].pagename;
        res.redirect('/welcome'); 
    }
    else
    {
        // res.send('Invalid username or password.');
        res.render('/login');
    }
});



router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup', async (req, res) => {
    const { username, password, email } = req.body;
    const returnstatus = await signup(username,password,email);
    if (returnstatus)
    {
        const userId = returnstatus[0].id;
        res.send(`User ${username} with ID ${userId} signed up successfully!`);
    }
    else
    {
        console.error('Error during signup:');
        res.status(500).send('Error during signup');
    }
});


let userid = 0;
router.get('/welcome', (req, res) => {
    if (req.session.userId)
    {
        userid = req.session.userId;
        username = req.session.userName;
        console.log('userid:', userid);
        //res.sendFile(__dirname + '/loggedin.html',{userid});
        res.render('loggedin',{userid : userid, username:username});
    }
    else
    {
        res.redirect('/login');
        //res.render('login'); // Redirect to login route if not logged in
    }
});



router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err)
        {
            console.error('Error destroying session:', err);
        }
        res.redirect('/login');
    });
});





module.exports = router;