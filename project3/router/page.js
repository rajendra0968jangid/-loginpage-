const router = require('express').Router();
const loginData = require('../models/teacher');
const bcrypt = require('bcrypt');
function seq(req,res,next){
    if(req.session.isAuth){
        next();
    }
    else{
        res.redirect('/login');
    }
}

router.get('/',seq,(req,res)=>{
    res.render('./html/home.ejs');
})

router.get('/login',(req,res)=>{
    res.render('./html/login.ejs');
})

router.get('/signup',(req,res)=>{
    res.render('./html/signup');
})

router.post('/signup',async(req,res)=>{
    const {fname,lname,password,pass} = req.body;
    const uname = fname + " " + lname;
    const salt = await bcrypt.hash(password,10);
    const data = await loginData({username:uname,password:salt});
    data.save();
    if(password == pass){
        res.redirect('/login');
    }
    else{
        res.redirect('/signup');
    }
})

router.post('/login',async(req,res)=>{
    const {uname,password} = req.body;
    const data = await loginData.findOne({username:uname});
    if(data != null){
        if(bcrypt.compareSync(password,data.password)){
            req.session.isAuth=true;
            res.redirect('/');
        } 
        else{
            res.redirect('/login');
        }
    }
    else{
       res.redirect('/login');
    }
})

router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/login');
})

module.exports=router;