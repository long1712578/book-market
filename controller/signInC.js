const express = require('express');
const router = express.Router();

router.get('/dangnhap',(req,res)=>{
    res.render('account/signIn', { layout: 'layout' });
});

module.exports = router;