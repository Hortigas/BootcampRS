const fs = require('fs');
const data = require('../data.json');

exports.info = function (req, res) {
    res.render('students/info', { students: data.students });
};
//pagina criar
exports.create = function (req, res) {
    res.render('students/create');
};
//pagina mostrar
exports.show = function (req, res) {
    const { id } = req.params;
    const found = data.students.find((student, foundIndex) => {
        if (id == student.id) {
            index = foundIndex;
            return true;
        }
    });
    if (!found) return res.status(404).render('not-found');

    const student = {
        ...found,
        age: calcAge(found.birth),
    };

    return res.render('students/show', { student });
};
//pagina editar
exports.edit = function (req, res) {
    const { id } = req.params;
    const found = data.students.find((student, foundIndex) => {
        if (id == student.id) {
            index = foundIndex;
            return true;
        }
    });
    if (!found) return res.status(404).render('not-found');

    const student = {
        ...found,
        birth: calcDate(found.birth),
    };

    return res.render('students/edit', { student });
};

//criar
exports.post = function (req, res) {
    const keys = Object.keys(req.body);
    for (const key of keys) if (req.body[key] == '') return res.send('Por favor, preencher todos os campos');
    if (req.body.urlVerify == 'false') return res.send('Por favor, coloque o link de uma imagem valida');
    if (!/^([a-zA-Z]+\s)*[a-zA-Z]+$/.test(req.body.name)) return res.send('Por favor, digite um nome valido');

    let { avatar_url, name, email, edu_level, birth, workload } = req.body;

    birth = Date.parse(birth);
    const id = checkID();
    workload = Number(workload);

    data.students.push({
        id,
        avatar_url,
        name,
        email,
        edu_level,
        birth,
        workload,
    });
    fs.writeFile('data.json', JSON.stringify(data, null, 4), (err) => {
        if (err) return res.send('erro na escrita do arquivo');
        return res.redirect('/alunos');
    });
};
//salvar
exports.put = function (req, res) {
    let index = null;

    const { id } = req.body;
    const found = data.students.find((student, foundIndex) => {
        if (id == student.id) {
            index = foundIndex;
            return true;
        }
    });
    if (!found) return res.status(404).render('not-found');

    const student = {
        ...found,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id),
        workload: Number(req.body.workload),
    };

    data.students[index] = student;

    fs.writeFile('data.json', JSON.stringify(data, null, 4), (err) => {
        if (err) return res.send('erro na escrita do arquivo');
        return res.redirect(`/alunos/${req.body.id}`);
    });
};
//deletar
exports.delete = function (req, res) {
    const { id } = req.body;
    data.students = data.students.filter((student) => student.id != id);
    fs.writeFile('data.json', JSON.stringify(data, null, 4), (err) => {
        if (err) return res.send('erro na escrita do arquivo');
        return res.redirect(`/alunos`);
    });
};

//funcoes extras
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
function checkID() {
    for (let i = 0; true; i++) {
        let valid = true;
        for (let element of data.students) {
            if (element.id == i) {
                valid = false;
                break;
            }
        }
        if (valid) return i;
    }
}
