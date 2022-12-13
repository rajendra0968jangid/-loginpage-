const router = require('express').Router();
const loginData = require('../models/teacher');

router.get('/shows',async(req,res)=>{
    const data = await loginData.find(); 
    res.render('./html/data.ejs',{student:data});
})

router.get('/update/:id',async(req,res)=>{
    const id = req.params.id;
    const data = await loginData.findById(id);
    res.render('./html/edit.ejs',{uname:data.username,password:data.password});
})

router.post('/update/:id',async(req,res)=>{
    const id = req.params.id;
    const {uname,password} = req.body;
    const data = await loginData.findByIdAndUpdate(id,{username:uname,password:password});
    res.redirect('/');
})

router.get('/delete/:id',async(req,res)=>{
    const id = req.params.id;
    await loginData.findByIdAndDelete(id,{});
    res.redirect('/');
})

module.exports=router;