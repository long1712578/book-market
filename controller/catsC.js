const express = require('express');
const router = express.Router();


router.get('/sanpham',(req,res)=>{
    res.render('index', { layout: 'main' });
});

module.exports = router;