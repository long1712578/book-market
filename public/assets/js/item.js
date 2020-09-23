$('.owl-carousel').owlCarousel();
// $(document).ready(function(){
//     $('.kv-ltr-theme-default-star').rating({
//         hoverOnClear: false,
//         containerClass: 'is-star'
//     });
// });

$(document).ready(()=>{
    $('.add-to-cart').on('click', addToCart);
});

function addToCart(){
    var id=$(this).data('id');
    var quantity=1;
    $.ajax({
        url: '/giohang',
        type: 'POST',
        data: {id,quantity},
        success: function(result){
            $('#cart-badge').html(result.totalQuantity);
        }
    });
}

function updateCart(id,quantity){
    if(quantity==0){
        removeCartItem(id);
    }else{
        updateCartItem(id,quantity);
    }
}

function removeCartItem(id){
    $.ajax({
        url: '/giohang',
        type: 'DELETE',
        data: {id},
        success: function(result){
            $('#cart-badge').html(result.totalQuantity);
            $('#totalPrice').html(result.totalPrice+' Đ');
            $(`#item${id}`).remove();
        }
    });
}
function updateCartItem(id,quantity){
    $.ajax({
        url: '/giohang',
        type: 'PUT',
        data: {id,quantity},
        success: function(result){
            $('#cart-badge').html(result.totalQuantity);
            $('#totalPrice').html(result.totalPrice+' Đ');
            $(`#price${id}`).html(result.item.price+' Đ');
        }
    });
}



function confirmCart(){
    if(confirm("Bạn có muốn thanh toán không?")){
        //var order=req.session.cart;
        //console.log("cart 123");
        var cartItem=document.getElementsByClassName('cart-item');
        var d=new Date();
        var date=d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear();
        $.ajax({
            url: '/cart/all',
            type: 'DELETE',
            data: {date},
            success: function(){
                $('#cart-badge').html('0');
                $('#cart-body').html(`<div class="alert alert-info text-center">My cart is empty</div>`)
            }
        });
    }
    
}