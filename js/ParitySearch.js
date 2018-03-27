var mmm;
$(function () { 
    mmm = new Mmm();
// 调用区域滚动
    mmm.RegionRolling();

    //调用大分类title
    mmm.GetCategoryTitle();

    //调用小分类
   mmm.getcategorysmall();

   //调用点击跳转页面
   mmm.getproductList();
 })

 var Mmm = function () { 

  }


  Mmm.prototype = {
    //   区域滚动
    RegionRolling: function () {
        mui('.mui-scroll-wrapper').scroll({
            scrollY: true, //是否竖向滚动
            scrollX: false, //是否横向滚动
            startX: 0, //初始化时滚动至x
            startY: 0, //初始化时滚动至y
            indicators: true, //是否显示滚动条
            deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
            bounce: true //是否启用回弹
        });
    },

    //调用大类分标题
    GetCategoryTitle: function () {
        $.ajax({
            url: 'http://mmb.ittun.com/api/getcategorytitle',
            success: function (data) {
                // console.log(data);
                var html = template('categoeytitleTmp', data);
                $('.product-category >ul').html(html);
            }
        })

    },

    //小分类 
      getcategorysmall: function () {
          $('.category-ul').on('click', '.category-list>a', function () {
              // console.log(this);

              var id = $(this).parent().data('id');
              //  console.log(id)

              $.ajax({
                  url: 'http://mmb.ittun.com/api/getcategory',
                  data: { titleid: id },
                  success: function (data) {
                    //   console.log(data);
                      var html = template("getcategorysmallTmp", data);

                      $('.product-content .mui-row').html(html);
                  }
              })

              if ($(this).next().hasClass("show")) {
                  $(this).next().hide().removeClass("show");
                  $('.category-list .arrow').html('∧');
              } else {
                  $(".product-content").hide();
                  $(this).next().show().addClass("show");
                  $('.category-list .arrow').html('∨');
              }

          })
      },


      getproductList:function () { 
        $('.category-ul').on('click','.product-content .btn-jump',function () { 
            var id = $(this).data('id');
            // console.log(id);
            // window.location.href="productList.html?categoryid="+id;
         })
       }

  }



  
   
    