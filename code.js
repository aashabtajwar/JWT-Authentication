const bcrypt = require('bcrypt');

async function runNow() {
    const password = await bcrypt.hash('password', 10);
    console.log(password);
}

runNow();