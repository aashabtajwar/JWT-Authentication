const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

app.use(cookieParser());
app.get('/private', (req, res) => {
    if (!req.cookies.token) return res.sendStatus(401);
    res.status(200).json({ secret : "Ginger Ale is a specific root bear" });
});
app.get('/', (req, res) => {
    res.writeHead(200, {
        "Set-Cookie": "token=encryptedstring; HttpOnly",
        "Access-Control-Allow-Credentials": "true"
    }).send();
});

app.listen(8000);