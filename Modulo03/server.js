const express = require('express');
const nunjucks = require('nunjucks');
const cursosData = require('./public/JS/data');

const server = express();

server.use(express.static('public'));

server.set('view engine', 'njk');
nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true,
});
server.get('/', (req, res) => res.render('homePage', { cursosData }));

server.get('/curso', (req, res) => {
    const id = req.query.id;
    const curso = cursosData.find((element) => element.id === id);
    if (!curso) return res.status(404).render('not-found');
    return res.render('curso', { curso });
});

server.use(function (req, res) {
    res.status(404).render('not-found');
});

server.listen(3000, () => console.log('server is running'));
