const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

app.use(cookieParser());


app.get('/', checkOrSetCookie, (req, res) => {
    res.send('Welcome!');
})

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

app.listen(3030);