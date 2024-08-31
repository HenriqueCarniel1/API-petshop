const express = require('express');
const Router = express();

// Controllers
const users = require('../controllers/usersController')
//Middleware

//Routes
Router.post('/users/add', users.Add);
Router.get('/users/get', users.Get);
Router.delete('/users/delete/:id', users.Delete);

module.exports = Router;