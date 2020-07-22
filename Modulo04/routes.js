const express = require('express');
const teachers = require('./teachers');
const routes = express.Router();

routes.get('/', (req, res) => res.redirect('/professores'));

routes.get('/professores', (req, res) => res.render('teachers/info'));
routes.get('/professores/criar', (req, res) => res.render('teachers/create'));
routes.get('/professores/:id', teachers.show);
routes.get('/professores/:id/edit', teachers.edit);

routes.get('/alunos', (req, res) => res.render('students/info'));
routes.get('/alunos/criar', (req, res) => res.render('students/create'));

routes.post('/professores', teachers.post);
routes.put('/professores', teachers.put);
routes.delete('/professores', teachers.delete);

module.exports = routes;
