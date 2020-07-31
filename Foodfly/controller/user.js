const fs = require('fs');
const data = require('../data');

exports.main = function (req, res) {
    res.render('user/main-page', { topPicks: data.recipes });
};
exports.about = function (req, res) {
    res.render('user/about');
};
exports.index = function (req, res) {
    res.render('user/recipes', { recipes: data.recipes });
};
exports.show = function (req, res) {
    const { id } = req.params;
    const found = data.recipes.find((recipe) => id == recipe.id);
    if (!found) return res.status(404).render('not-found');
    return res.render('user/showRecipe', { recipe: found });
};
