$(function() {
    // 初始化轮播图插件
    //获得slider插件对象
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；  让轮播图支持自动轮播
    });
    getNav();
    getProductList();

})
// 获取导航栏的api文档
function getNav() {
    $.ajax({
        url: 'http://mmb.ittun.com/api/getindexmenu',
        success: function(data) {
            var html = template('navTmp', data);
            console.log(data);
            $('#nav-category .mui-row').html(html);

            $("#nav-category .mui-row>div").eq(7).click(function(){
               if($(this).next().hasClass("hide")){
                    for(var i = 8 ;i<$("#nav-category .mui-row>div").length;i++){
                        $("#nav-category .mui-row>div").eq(i).removeClass("hide");
                    }
                //    $(this).nextAll().removeClass("hide");
               }else {
                // $(this).nextAll().addClass("hide");
                for(var i = 8 ;i<$("#nav-category .mui-row>div").length;i++){
                    $("#nav-category .mui-row>div").eq(i).addClass("hide");
                }
               }

            })
            
        }
    })
}

// 获取折扣列表的文档

function getProductList() {
    $.ajax({
        url: 'http://mmb.ittun.com/api/getmoneyctrl',
        // type:"jsonp",
        success: function(data) {
            console.log(data);
            var html = template('productlistTmp', data);
            $('#recomment .productlist>ul').html(html);
        }
    })
}