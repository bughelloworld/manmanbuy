var mmbuy;
var id;
var brandTitle;
$(function() {
    mmbuy = new MMBuy();
    mmbuy.initScroll();
    mmbuy.getHotBrand();
    mmbuy.setBrandId();
})
var MMBuy = function () {


}
MMBuy.prototype = {
    // 初始化区域滚动
    initScroll: function () {
        mui('.mui-scroll-wrapper').scroll({
            scrollY: true, //是否竖向滚动
            scrollX: false, //是否横向滚动
            startX: 0, //初始化时滚动至x
            startY: 0, //初始化时滚动至y
            indicators: false, //是否显示滚动条
            deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
            bounce: true     //是否启用回弹
        });
    },
    // 获取热门品牌数据
    getHotBrand:function(){
        $.ajax({
            url:"http://mmb.ittun.com/api/getbrandtitle",
            success:function(data){
                var html = template("hotBrandTmp",data);
                $('#main .brand-list >ul').html(html);
            }
        })
    },
    setBrandId:function(){
        $("#main .brand-list >ul").on('click',"#main .brand-list >ul>li",function(){
            id = $(this).data('id');
            window.location.href="goodBrand.html?id="+ id;
            // 设置本地存储
            brandTitle = $(this).data('brandtitle');
            localStorage.setItem('brandTitle',brandTitle);
            
        })
    }
}