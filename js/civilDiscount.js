var mmmai;
$(function () {
    mmmai = new Mmmai();
    /* 调用初始化区域滚动 */
    mmmai.initScroll();
    /* 调用国内折扣商品列表 */
    mmmai.inlanddiscount();
})

var Mmmai = function () {

}

Mmmai.prototype = {
    /* 初始化区域滚动 */
    initScroll: function () {
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            indicators: false, //是否显示滚动条
            bounce: true //是否启用回弹
        });
    },
    /* 国内折扣商品列表方法 */
    inlanddiscount: function () {
        /* 通过API获取数据 */
        $.ajax({
            url: 'http://mmb.ittun.com/api/getinlanddiscount',
            success: function(data) {
                // console.log(data);
                /* 调用模板渲染页面 */
                var html = template("inlandTem",data);
                $("#main .mui-row").html(html);
                /* 给商品添加点击事件 */
                $('#main .mui-row').on('click','a',function(){
                    /* 获取商品id */
                    // console.log(this);
                    var productId = $(this).data('id');
                    console.log(productId);
                    /* 点击跳转到商品详情页 */               
                    window.location.href = 'discountDetails.html'+'?productId='+productId;
                })
            }
        })
    }
}