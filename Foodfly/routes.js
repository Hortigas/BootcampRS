const express = require('express');
const routes = express.Router();
const admin = require('./controller/admin');
const user = require('./controller/user');

routes.get('/', user.main);
routes.get('/sobre', user.about);
routes.get('/receitas', user.index);
routes.get('/receitas/:id', user.show);

routes.get('/admin/receitas', admin.index); // Mostrar a lista de receitas
routes.get('/admin/receitas/criar', admin.create); // Mostrar formulário de nova receita
routes.get('/admin/receitas/:id', admin.show); // Exibir detalhes de uma receita
routes.get('/admin/receitas/:id/editar', admin.edit); // Mostrar formulário de edição de receita

routes.post('/admin/receitas', admin.post); // Cadastrar nova receita
routes.put('/admin/receitas', admin.put); // Editar uma receita
routes.delete('/admin/receitas', admin.delete); // Deletar uma receita

module.exports = routes;
