const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const express = require('express');
const app = express();
/*
const dbURI = 'mongodb+srv://batman:batman99@cluster0.sbxaw.mongodb.net/<dbname>?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser:true, useUnifiedTopology:true})
    .then((result) => {
        console.log('Connected to DB');
        app.listen(3000);
    })
    .catch((err) => {
        throw err;
    })
*/
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))


let counter = 0;
app.get('/', (req, res) => {
    req.session.viewCount += 1;
    res.cookie('c', req.session.viewCount);
    if (req.cookies.c === 'NaN' || req.cookies.c === undefined || req.cookies.c === NaN) {
        res.send('Your first visit ' + req.cookies.c);
    } else {
        res.send('Welcome Again! '+typeof(req.cookies.c) + ' ' + req.cookies.c);
    }
    // res.send(req.cookies.c);
})
app.get('/get', (req, res) => {
    res.send(req.cookies);
})


app.listen(3000);