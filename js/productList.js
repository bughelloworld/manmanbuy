var mmm;
var id = getQueryString('categoryid');

$(function () {
    mmm = new Mmm();
    //获取传过来的id
    // getQueryString('categoryid');
    // console.log(id)
    mmm.getproductid();


    mmm.initPullRefresh();

    mmm.getproduct({
        categoryid: id
    }, function (data) {
        // 把搜索出来的商品渲染页面
        var html = template('getproductTmp', data);
        $('.productList-content >ul').html(html);
    })


})
var pageid = 1;
var Mmm = function () {

}

Mmm.prototype = {
    //初始化下拉刷新
     //初始化下拉刷新
     initPullRefresh: function() {
        mui.init({
            pullRefresh: {
                /*区域滚动的父容器 传入父容器选择器*/
                container: ".mui-scroll-wrapper", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
                down: {
                    contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                    contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                    contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                    // 下拉刷新的回调函数 必须要写 用来写ajax请求刷新数据
                    callback: function() {
                        /*定义一个定时器模拟请求*/
                        setTimeout(function() {
                            // 1. 调用刷新数据的方法
                            mmm.getproduct({
                                categoryid: id,
                                pageid: 1,
                                pagesize: 10
                            }, function(data) {
                                // console.log(data)
                                // 2. 拿到数据后去重新渲染页面
                                var html = template('getproductTmp', data);
                                $('.productList-content >ul').html(html);
                                // 3. 刷新完成后 结束下拉刷新
                                mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                                // 4. 重置上拉加载更多 （不然如果之前已经拉到底就无法上拉了）
                                mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
                                // 5. 还要把page重置为1
                                pageid = 1;
                            });

                        }, 1000)
                    }
                },
                up: {
                    contentrefresh: "正在加载更多...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                    contentnomore: '我是有底线的', //可选，请求完毕若没有更多数据时显示的提醒内容；
                    // 上拉加载更多的回调函数
                    callback: function() {
                        /*延迟1秒钟结束上拉加载更多*/
                        setTimeout(function() {
                            // 2. 每次上拉加载更多需要加载更多数据 页码数++ 
                            pageid++;
                            // 3. 根据当前的加完后的页码数去请求数据
                            mmm.getproduct({
                                proName: id,
                                pageid: pageid,
                                pagesize: 10
                            }, function(data) {
                                //4.  调用模板 往商品列表后面去追加更多的商品
                                var html = template('getproductTmp', data);
                                // 5. 判断当前的模板是否返回了内容
                                if (html) {
                                    // 6. 如果返回了内容 就表示还有数据 追加数据
                                    $('.productList-content >ul').append(html);
                                    //7. 当数据追加完毕 结束上拉加载更多
                                    mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(false);
                                } else {
                                    // 8. 如果返回为空 结束上拉加载更多 并且提示没有更多数据了
                                    mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
                                }
                            });
                        }, 1000);
                    }
                }
            }
        });
    },
                           
                // 获取商品数据
    getproduct: function (options,callback) {
   
        options.categoryid = options.categoryid || id;
        options.pageid = options.pageid || 1;
        options.pagesize = options.pagesize || 10;
        $.ajax({
            url: 'http://mmb.ittun.com/api/getproductlist',
            data:
                options,
                // productName:"空调"
       
            success: function (data) {
                callback(data);
                // console.log(id)
                // var html = template('getproductTmp',data);
                // console.log(data)
                // $('.productList-content >ul').html(html);
            }
        })
    },

    getproductid:function () { 
        $('.productList-content >ul').on('tap','.Product-item',function () { 
            var productid = $(this).data("id")
            // console.log(productid)
            window.location.href="productxiangqin.html?productid="+productid;
         })
     }


     }
                
//获取url地址栏的参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}