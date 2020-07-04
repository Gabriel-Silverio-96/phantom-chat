const express = require('express');
const app = express();
const port = 80;

//Files public
app.use(express.static('src/public'));

//Engine views
app.set('view engine', 'ejs');
app.set('views', './src/views')

//Validation
const expressValidator = require('express-validator');
app.use(expressValidator());

//Bodyparser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

const consign = require('consign');
consign()
    .include('src/routes')
    .then('src/controllers')
    .into(app);

module.exports = {app, port};