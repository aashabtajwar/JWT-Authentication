require('dotenv').config();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();

app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));



let userUser = [
    {   
        name: "Aashab Tajwar",
        email: "name@mail.com",
        password: process.env.pass,
        roll: "1831019"
    }
];
// @route - home/dashboard
app.get('/dashboard', cookieCheck, (req, res) => {
    res.send('<h1>Welcome</h1>')
});

// @route - login
app.get('/login', (req, res) => {
    res.render('login.ejs');
});
app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // function to check/authenticate
    authenticate(email, password);
    async function authenticate(email, password) {
        const user = userUser.find(user => email === user.email);
        if (!found) {
            console.log('NO USER FOUND!');
            res.redirect('/login?error=noSuchUser')
        }
        else {
            console.log(found);
            try {
                if (await bcrypt.compare(password, user.password)) {
                    // asign user
                    const token = jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '60s' });
                    
                }
                else {
                    // redirect with message
                    res.redirect('/login?error=passwordMismatch');
                }
            }
            catch {}
        }
    }
})

// function to check cookies
function cookieCheck(req, res, next) {
    var cookie = req.cookie.cookieName;
    if (cookie === undefined) {
        // do not allow access
        res.sendStatus(403);
    }
    else {
        next();
    }
}

app.listen(5000);