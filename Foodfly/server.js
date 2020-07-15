const express = require('express');
const nunjucks = require('nunjucks');
const data = require('./public/JS/data');

const server = express();

server.use(express.static('public'));
server.set('view engine', 'njk');
nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true,
});

server.get('/', (req, res) => {
    res.render('main-page', { topPicks: data });
});

server.get('/sobre', (req, res) => {
    res.render('about');
});

server.get('/receitas', (req, res) => {
    res.render('recipes', { recipes: data });
});

server.get('/receitas/:index', function (req, res) {
    const recipes = data;
    const recipeIndex = req.params.index;
    const recipe = recipes.find((recipe) => {
        const id = recipe.id.match(/(\d+)/)[0];
        return id === recipeIndex;
    });
    if (!recipe) return res.send('page not found');
    return res.render('showRecipe', { recipe });
});

server.listen(3000);
