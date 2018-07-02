const express = require('express');
const path = require('path');
const indexRoutes = require('./routes/index');
const usersRoutes = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoutes);
app.use('/users', usersRoutes);

module.exports = app;

