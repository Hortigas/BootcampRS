const express = require('express');
const server = express();

server.get('/', (req, res) => {
    res.send('online');
});

server.listen(3000);