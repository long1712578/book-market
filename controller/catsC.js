const express = require('express');
const router = express.Router();
const mcat = require('../models/catsM');
const mpro = require('../models/productM');

router.get('/', (req, res) => {
    res.redirect('/sanpham');
});

router.get('/sanpham', async (req, res) => {
    const cats = await mcat.all();
    const ps = await mpro.all();
    const pslike = await mpro.allLike();

    //Phan trang
    const page = parseInt(req.query.page) || 1;
    const rs = await mpro.allByPaging(page);
    for (let cat of cats) {
        cat.isActive = false;
    }

    const pages = [];
    for (let i = 0; i < rs.pageTotal; i++) {
        pages[i] = { value: i + 1, active: (i + 1) === page };
    }
    const navs = {};
    if (page > 1) {
        navs.prev = page - 1;
    }
    if (page < rs.pageTotal) {
        navs.next = page + 1;
    }
    res.render('index', {
        layout: 'main', cats: cats, ps: rs.products, pages: pages,
        navs: navs, pslike: pslike
    });
});

router.get('/sanpham/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const page = parseInt(req.query.page) || 1;
    const cats = await mcat.all();
    const pslike = await mpro.allLike();
    const rs = await mpro.allByIdPaging(id, page);
    for (let cat of cats) {
        cat.isActive = false;
        if (cat.ma_so == id) {
            cat.isActive = true;
        }
    }
    const pages = [];
    for (let i = 0; i < rs.pageTotal; i++) {
        pages[i] = { value: i + 1, active: (i + 1) === page };
    }
    const navs = {};
    if (page > 1) {
        navs.prev = page - 1;
    }
    if (page < rs.pageTotal) {
        navs.next = page + 1;
    }
    res.render('index', {
        layout: 'main',
        cats: cats,
        ps: rs.products,
        pslike: pslike,
        pages: pages,
        navs: navs,
    });
});

router.get('/sanpham/timkiem', async (req,res)=>{
    const name=req.query.name;
    const cats=await mcat.all();
    const ps=await mpro.allSearchNameProALL(name)
    const pslike = await mpro.allLike();
    const pages = [];
    for (let i = 0; i < rs.pageTotal; i++) {
        pages[i] = { value: i + 1, active: (i + 1) === page };
    }
    const navs = {};
    if (page > 1) {
        navs.prev = page - 1;
    }
    if (page < rs.pageTotal) {
        navs.next = page + 1;
    }
    for(let cat of cats){
        cat.isActive=false;
    }
    
    res.render('index',{
        layout: 'main',
        cats: cats, 
        ps: ps,
        pslike: pslike,
        pages: pages,
        navs: navs,
    });
});

router.get('/sanpham/ps/:id',async(req,res)=>{
    const id=parseInt(req.params.id);
    const proDetail=await mpro.allByProId(id);
    console.log(proDetail);
    res.render('detailPro',{
        proDetail: proDetail,
        layout: 'main1',
    });
});

module.exports = router;