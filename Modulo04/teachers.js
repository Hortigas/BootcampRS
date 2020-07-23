const fs = require('fs');
const data = require('./data.json');

exports.info = function (req, res) {
    res.render('teachers/info', { teachers: data.teachers });
};
//criar novo
exports.post = function (req, res) {
    const keys = Object.keys(req.body);
    for (const key of keys) if (req.body[key] == '') return res.send('Por favor, preencher todos os campos');
    if (req.body.urlVerify == 'false') return res.send('Por favor, coloque o link de uma imagem valida');
    if (!/^([a-zA-Z]+\s)*[a-zA-Z]+$/.test(req.body.name)) return res.send('Por favor, digite um nome valido');

    let { avatar_url, name, birth, edu_level, education, knowledge } = req.body;

    birth = Date.parse(birth);
    const id = Number(data.teachers.length);
    const created_at = Date.now();
    knowledge = knowledge.split(', ');

    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        edu_level,
        education,
        knowledge,
        created_at,
    });
    fs.writeFile('data.json', JSON.stringify(data, null, 4), (err) => {
        if (err) return res.send('erro na escrita do arquivo');
        return res.redirect('/professores');
    });
};
//mostrar
exports.show = function (req, res) {
    const { id } = req.params;
    const found = data.teachers.find((teacher, foundIndex) => {
        if (id == teacher.id) {
            index = foundIndex;
            return true;
        }
    });
    if (!found) return res.status(404).render('not-found');

    const teacher = {
        ...found,
        age: calcAge(found.birth),
        since: new Intl.DateTimeFormat('pt-BR').format(found.created_at),
    };

    return res.render('teachers/show', { teacher });
};
//editar
exports.edit = function (req, res) {
    const { id } = req.params;
    const found = data.teachers.find((teacher, foundIndex) => {
        if (id == teacher.id) {
            index = foundIndex;
            return true;
        }
    });
    if (!found) return res.status(404).render('not-found');

    const teacher = {
        ...found,
        birth: calcDate(found.birth),
        since: new Intl.DateTimeFormat('pt-BR').format(found.created_at),
        knowledge: found.knowledge.join(', '),
    };

    return res.render('teachers/edit', { teacher });
};
//salvar mudancas
exports.put = function (req, res) {
    let index = null;

    const { id } = req.body;
    const found = data.teachers.find((teacher, foundIndex) => {
        if (id == teacher.id) {
            index = foundIndex;
            return true;
        }
    });
    if (!found) return res.status(404).render('not-found');

    const teacher = {
        ...found,
        ...req.body,
        birth: Date.parse(req.body.birth),
        knowledge: req.body.knowledge.split(', '),
        id: Number(req.body.id),
    };

    data.teachers[index] = teacher;

    fs.writeFile('data.json', JSON.stringify(data, null, 4), (err) => {
        if (err) return res.send('erro na escrita do arquivo');
        return res.redirect(`/professores/${req.body.id}`);
    });
};

exports.delete = function (req, res) {
    const { id } = req.body;
    data.teachers = data.teachers.filter((teacher) => teacher.id != id);
    fs.writeFile('data.json', JSON.stringify(data, null, 4), (err) => {
        if (err) return res.send('erro na escrita do arquivo');
        return res.redirect(`/professores`);
    });
};

function calcDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getUTCFullYear();
    const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
    const day = ('0' + date.getUTCDate()).slice(-2);
    return `${year}-${month}-${day}`;
}

function calcAge(timestamp) {
    const age = Math.floor((new Date().getTime() - timestamp) / (1000 * 60 * 60 * 24 * 365));
    return age;
}

function calcSince(created_at) {
    const since = new Date(created_at);
    return since.getVarDate;
}
