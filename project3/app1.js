const express = require('express');
const practise = express();
practise.use(express.urlencoded({extended:false}));
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/teachers');
const session = require('express-session');
practise.use(session({
    secret:'raj',
    resave:false,
    saveUninitialized:false
}))

const router1 = require('./router/page');
practise.use(router1);

const router2 = require('./router/data');
practise.use(router2);


practise.use(express.static('public'));
practise.set('view engine','ejs');
practise.listen(4800);
