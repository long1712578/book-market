const express = require('express');
const router = express.Router();
const mcat=require('../models/catsM');
const mpro=require('../models/productM');
const muser=require('../models/accountM');

router.get('/quanly',async(req,res)=>{
    const cats=await mcat.all();
    const buyer=await muser.countBuyer();
    const seller=await muser.countSeller();
    const countPro=await mpro.countPro();
    res.render('admin', { layout: 'layout',cats: cats,buyer: buyer,seller: seller, countPro: countPro,});
});

router.post('/quanly/them',async(req,res)=>{
    const name=req.body.nameCat;
    const store=req.body.nameStore;
    const cat={
        ten_loainame,
        store,
    }
    const id=await mcat.add()
});

router.get('/canhan',async(req,res)=>{
    res.render('profile', { layout: 'layout',});
});
module.exports = router;