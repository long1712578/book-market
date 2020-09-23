let express=require('express');
let router=express.Router();
var order;

router.get('/giohang',(req,res)=>{
    var cart=req.session.cart;
    res.locals.cart=cart.getCart();
    res.render('cart');
})
router.post('/giohang',(req,res,next)=>{
    var productId=req.body.id;
    var quantity=isNaN(req.body.quantity)? 1 : req.body.quantity;
    var mPro=require('../models/productM');
    mPro
    .allByProId(productId)
    .then(product=>{
       //console.log(product);
        var cartItem=req.session.cart.add(product,productId,quantity);
       var str=JSON.stringify(cartItem);
       var json =  JSON.parse(str);
        res.json(json);
    })
    .catch(error=>next(error));
});

router.put('/giohang',(req,res)=>{
    var productId=req.body.id;
    var quantity=parseInt(req.body.quantity);
    var cartItem=req.session.cart.update(productId,quantity);
    
    res.json(cartItem);

});
router.delete('/giohang',(req,res)=>{
    var productId=req.body.id;
    req.session.cart.remove(productId);
    res.json({
        totalQuantity: req.session.cart.totalQuantity,
        totalPrice: req.session.cart.totalPrice
    });
});

router.delete('/giohang/all',async(req,res)=>{
    
    const mPro= require('../models/productM');
    //const ps=mPro.updateQuantity(21,1);
    //const cart =req.session.cart.items[0].item;
    const lengCart=req.session.cart.totalQuantity;
    const carts=req.session.cart.getCart();
    for (var i=0; i<lengCart;i++){
        const count=carts.items[i].quantity;
        const ma_so=carts.items[i].item[0].ma_so;
        const ma=carts.items[i].item[0].cuahang;
        const date=req.body.date;
        const user=req.session.user;
        console.log(user);
        console.log(ma);
        //var mPro=require('../models/productM');
        var mUser= require('../models/accountM');
        var mShop= require('../models/shopM');

        const ten=await mPro.allByProId(ma_so);
        const tensp=ten[0].ten_san_pham;

        const giasp=ten[0].gia_tien;
        const tongtien=giasp*count;

        const TenNguoi=await mUser.FullNameById(user);
        const tennguoi=TenNguoi[0].f_Fullname;
        const DiaChi=await mUser.AddressById(user);
        const diachi=DiaChi[0].f_Address;
        const tenShop=await mShop.nameShopByMaShop(ma);
        const shop=tenShop[0].TenCuaHang;
        const ps1=await mPro.insertHistory(ma_so,count,date,user,ma);
        const ps2=await mPro.insertBill(tensp,tennguoi,count,tongtien,date,diachi,shop);
        //const ps=mPro.updateQuantity(id_sp,count);
    }
    req.session.cart.empty();
    res.sendStatus(204);
    res.end();
    
});

module.exports=router;