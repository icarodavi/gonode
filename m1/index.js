const express = require('express');

const app = express();

app.use((req, res) => {
    res.send('Yes');
    console.log('acessou');
});

app.listen(3000);