const express = require('express');
const router = express.Router();
const sha = require('sha.js');
const nguoi_dung=require('../models/accountM');


router.get('/dangki',(req,res)=>{
    res.render('account/signUp', { layout: 'layout' });
});

router.post('/dangki', async (req, res) => {
            const username = req.body.username;
            const password = req.body.password;
            const fullname = req.body.fullname;
            const email = req.body.email;
            const phoneNumber = req.body.phoneNumber;
            const gender = parseInt(req.body.gender);
            if (gender == 0) gender = 1;
            const dob = req.body.DOB;
            const address = req.body.address;
            const typeAccount = parseInt(req.body.typeAccount);
            if (typeAccount == 0) typeAccount = 1;
            const salt = Date.now().toString(16);
            const preHash = password + salt;
            const hash = sha('sha256').update(preHash).digest('hex');
            const pwHash = hash + salt;
            const user = {
                ten_dang_nhap: username,
                mat_khau: pwHash,
                ho_ten: fullname,
                email: email,
                so_dien_thoai: phoneNumber,
                gioi_tinh: gender,
                ngay_sinh: dob,
                dia_chi: address,
                ten_don_vi: null,
                loai: typeAccount
            }
            const uId = await nguoi_dung.add(user);
            res.redirect('/dangnhap');
}),

module.exports = router;