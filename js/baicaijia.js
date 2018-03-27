var mma;
var id;
$(function () {
    mma = new Mma();
    mma.navTitlebar();
    mma.gooodsTitle();
});
//获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
    interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；
});

mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators: true, //是否显示滚动条
});

var Mma = function () {

};
Mma.prototype = {

    navTitlebar: function () {
        $.ajax({
            type: 'get',
            url: "http://mmb.ittun.com/api/getbaicaijiatitle",
            dataType: 'json',
            success: function (data) {
                var html = template('topCategoryTmp', data);
                $('.nav-classify .mui-row').html(html);
                mma.gooodsTitle();
            }
        })
        $.ajax({
            url: 'http://mmb.ittun.com/api/getbaicaijiaproduct',
            dataType: 'json',
            data: { titleid:8},
            success: function (data) {
                var html = template('productlistTmp', data);
                $('#productGurp .mui-content').html(html);
            }
        })

    },
    gooodsTitle: function () {
        $('.nav-classify .mui-row >div').click(function (e) {
            id = parseInt($(this).attr('data-id'));
            $.ajax({
                url: 'http://mmb.ittun.com/api/getbaicaijiaproduct',
                dataType: 'json',
                data: { titleid: id },
                success: function (data) {
                    var html = template('productlistTmp', data);
                    $('#productGurp .mui-content').html(html);
                }
            })

        })
    }
}





