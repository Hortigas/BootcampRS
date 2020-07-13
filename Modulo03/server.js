const express = require('express');
const nunjucks = require('nunjucks');

const server = express();

server.use(express.static('public'));

server.set('view engine', 'njk');
nunjucks.configure('views', {
    express: server,
});

server.get('/', (req, res) => res.render('homePage'));

server.use(function (req, res) {
    res.status(404).render('not-found');
});

server.listen(3000, () => console.log('server is running'));
