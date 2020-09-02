const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.redirect('/dangnhap');
});
router.get('/dangnhap',(req,res)=>{
    res.render('account/signIn', { layout: 'layout' });
});

module.exports = router;