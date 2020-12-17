require('dotenv').config();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const methodOverride = require('method-override');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();

app.use(cookieParser());
app.use(methodOverride('_method'));
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
// @route - /profile/logout
app.delete('/profile/logout', (req, res) => {
    
    res.clearCookie('token');
    res.redirect('/login');
})


// @route -/profile
app.get('/profile', cookieCheck, authCheck, (req, res) => {
    res.json(req.user);
})


// @route - /dashboard
app.get('/dashboard', cookieCheck, authCheck, (req, res) => {
    res.render('home.ejs', {user: req.user})
});

// @route - login
app.get('/login', loginCheck, (req, res) => {
    res.render('login.ejs');
});
app.post('/login', loginCheck, (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // function to check/authenticate
    authenticate(email, password);
    async function authenticate(email, password) {
        const user = userUser.find(user => email === user.email);
        if (!user) {
            console.log('NO USER FOUND!');
            res.redirect('/login?error=noSuchUser')
        }
        else {
            console.log(user);
            try {
                if (await bcrypt.compare(password, user.password)) {
                    // asign user
                    console.log('password matched')
                    const token = jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '30s' });
                    // set cookie
                    res.cookie('token', token, { maxAge: 30 * 1000, httpOnly: true });
                    // redirect to dashboard
                    res.redirect('/dashboard');


                }
                else {
                    // redirect with message
                    res.redirect('/login?error=passwordMismatch');
                }
            }
            catch (err) {
                res.redirect('/login?error=unknownError');
            }
        }
    }
})

// function to check cookies
function cookieCheck(req, res, next) {
    var cookie = req.cookies.token;
    if (cookie === undefined) {
        // do not allow access
        res.sendStatus(403);
    }
    else {
        next();
    }
}
function authCheck(req, res, next) {
    const authToken = req.cookies.token;
    // verify
    jwt.verify(authToken, process.env.TOKEN_SECRET, (err, user) => {
        //console.log(err);
        if (err) return res.sendStatus(401);
        else {
            req.user = user;
            next();
        }
    })
}

function loginCheck(req, res, next) {
    if (!req.user) {
        next();
    }
    else {
        redirect('/dashboard');
    }
}
app.listen(5000);