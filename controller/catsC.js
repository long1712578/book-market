const express = require('express');
const router = express.Router();
const mcat= require('../models/catsM');
const mpro=require('../models/productM');


router.get('/sanpham',async(req,res)=>{
    const cats=await mcat.all();
    const ps=await mpro.all();
    res.render('index', { layout: 'main',cats: cats, ps:ps});
});

module.exports = router;