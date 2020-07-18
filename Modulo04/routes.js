const express = require('express');
const teachers = require('./teachers');
const routes = express.Router();

routes.get('/', (req, res) => res.redirect('/professores'));

routes.get('/professores', (req, res) => res.render('teachers/info'));
routes.get('/professores/criar', (req, res) => res.render('teachers/create'));

routes.get('/alunos', (req, res) => res.render('students/info'));
routes.get('/alunos', (req, res) => res.render('students/create'));

routes.post('/professores', teachers.post);

module.exports = routes;
