const fs = require('fs');
const data = require('../data');

exports.index = function (req, res) {
    res.render('admin/recipes', { recipes: data.recipes });
};

exports.create = function (req, res) {
    res.render('admin/new');
};

exports.show = function (req, res) {
    const { id } = req.params;
    const found = data.recipes.find((recipe) => id == recipe.id);
    if (!found) return res.status(404).render('not-found');
    return res.render('admin/showRecipe', { recipe: found });
};

exports.edit = function (req, res) {
    const { id } = req.params;
    const found = data.recipes.find((recipe) => id == recipe.id);
    if (!found) return res.status(404).render('not-found');
    return res.render('admin/edit', { recipe: found });
};

exports.post = function (req, res) {
    const keys = Object.keys(req.body);
    for (const key of keys) if (req.body[key] == '') return res.send('Por favor, preencher todos os campos');
    let { image, title, author, ingredients, preparation, information } = req.body;
    id = checkID();

    data.recipes.push({
        id,
        image,
        title,
        author,
        ingredients,
        preparation,
        information,
    });

    fs.writeFile('data.json', JSON.stringify(data, null, 4), (err) => {
        if (err) return res.send('erro na escrita do arquivo');
        return res.redirect(`/admin/receitas/${id}`);
    });
};

exports.put = function (req, res) {
    let index = null;

    const { id } = req.body;
    const found = data.recipes.find((recipe, foundIndex) => {
        if (id == recipe.id) {
            index = foundIndex;
            return true;
        }
    });
    if (!found) return res.status(404).render('not-found');

    const recipe = {
        ...found,
        ...req.body,
        id: Number(req.body.id),
    };

    data.recipes[index] = recipe;

    fs.writeFile('data.json', JSON.stringify(data, null, 4), (err) => {
        if (err) return res.send('erro na escrita do arquivo');
        return res.redirect(`/admin/receitas/${index}`);
    });
};

exports.delete = function (req, res) {
    const { id } = req.body;
    data.recipes = data.recipes.filter((recipe) => recipe.id != id);
    fs.writeFile('data.json', JSON.stringify(data, null, 4), (err) => {
        if (err) return res.send('erro na escrita do arquivo');
        return res.redirect(`/admin/receitas`);
    });
};

function checkID() {
    for (let i = 0; true; i++) {
        let valid = true;
        for (let element of data.recipes) {
            if (element.id == i) {
                valid = false;
                break;
            }
        }
        if (valid) return i;
    }
}
