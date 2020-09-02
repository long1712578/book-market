const express = require('express');
const router = express.Router();


router.get('/dangki',(req,res)=>{
    res.render('account/signUp', { layout: 'layout' });
});

module.exports = router;