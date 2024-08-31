const express = require('express');
const Router = express();

// Controllers
const users = require('../controllers/usersController')
//Middleware

//Routes
Router.post('/users/add', users.Add);

module.exports = Router;