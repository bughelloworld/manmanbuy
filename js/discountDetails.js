var mmmai;
var id;
$(function () {
    mmmai = new Mmmai();
    
    /* 调用商品详情 */
    mmmai.productDetails();
})
var Mmmai = function () {

}

Mmmai.prototype = {
    // 获取url中参数的值
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    },
    /* 商品详情页面 */
    productDetails: function () {
        id = mmmai.getQueryString("productId");
        console.log(id);
        $.ajax({
            url: 'http://mmb.ittun.com/api/getdiscountproduct',
            data: {
                productid: id
            },
            success: function (data) {
                console.log(data);
                /* 调用模板渲染页面 */
                var html = template('productDetailsTmp',data);
                $('.details .content').html(html);

                /* 获取商城名 */
                var scName = $('#main .content .small').text();
                // console.log(scName);
                /* 给前往购买添加点击事件 */
                $('#main .content').on('click','.btn-buy',function(){
                    if (scName == "京东商城") {
                        window.location.href = 'http://app.jd.com/';
                    } else {
                        window.location.href = 'https://h5.m.taobao.com/#index';
                    }
                })
            }        
        })
    }
}