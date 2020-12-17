const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

app.use(cookieParser());


app.get('/check', checkCookies, (req, res) => {
    res.send('Welcome Again!!');
});
/*
app.get('/login', (req, res) => {
    res.cookie('cookieName', 10, { maxAge: 20 * 1000, httpOnly: true });
    res.send('You are all set!')
});
*/
// check/set cookie
function checkOrSetCookie (req, res, next) {
    var cookie = req.cookies.cookieName;
    if (cookie === undefined) {
        res.cookie('cookieName', 10, { maxAge: 20 * 1000, httpOnly: true});
        console.log('Cookie Created');

    }
    else {
        console.log('Cookie already exists');

    }
    next();
}

function checkCookies(req, res, next) {
    var cookie = req.cookies.cookieName;
    if (cookie === undefined) {
        res.sendStatus(403);
    }
    else {
        next();
    }
}

app.listen(3031);
