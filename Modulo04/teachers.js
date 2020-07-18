const fs = require('fs');
const data = require('./data.json');

exports.post = function (req, res) {
    const keys = Object.keys(req.body);
    for (const key of keys) if (req.body[key] == '') return res.send('Por favor, preencher todos os campos');
    if (req.body.urlVerify == 'false') return res.send('Por favor, coloque o link de uma imagem valida');
    if (!/^([a-zA-Z]+\s)*[a-zA-Z]+$/.test(req.body.name)) return res.send('Por favor, digite um nome valido');

    let { avatar_url, name, birth, edu_level, education, knowledge } = req.body;

    birth = Date.parse(birth);
    const id = Number(data.instructors.length);
    const created_at = Date.now();

    data.instructors.push({
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
