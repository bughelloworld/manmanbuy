var maimai;
$(function() {
   maimai=new Maim();
    maimai.getProductList(pageid);
    maimai.pageJump();
})
// 获取折扣列表的文档
// 定义一个页码
var pageid=0;
// 定义总页数
var pagecount=1;
var Maim=function(){

}
Maim.prototype={
    getProductList:function(pageid){
        // console.log(pageid);
        
        $.ajax({
            url: 'http://mmb.ittun.com/api/getmoneyctrl',
            // type:"jsonp",
            // 返回的是第几页的数据和页码 的条数  
            data:{pageid:pageid,pagesize:10},
            success: function(data) {
                // console.log(data);
                var html = template('productListTmp', data);
                $('#main .productlist>ul').html(html);
                // 定义一个总页数  是总条数/每页大小
                pagecount=Math.ceil(data.totalCount/10);
                // console.log(pagecount);
                
                // 定义一个数组用来存取页码数
                var arr=[];
                // 还要有当前的页码数
                for(var i=1;i<=pagecount;i++){
                    arr.push(i);
                }
                // 定义一个对象  因为模板只能传对象 存储总页码数数组  和当前页码  
                var obj={
                    pagecount:arr,
                    pageid:pageid
                }
                // console.log(obj);
                
                // 调用模板生成分页按钮 
                var html=template('pageTmp',obj);
                // 把分页按钮放到ul里面 
                $(".mui-pagination").html(html);
                // 页码的计算逻辑 
                // 第一 你要有一个页码的总数  总的页码数  是总条数除以每页的显示数量  
                // 第二 你要知道当前的页码数是几  
                // 第三  要有一个每页大小  就是每页有几条数据 
                // 第四  点击上一页 当前页码数++  请求数据 
                // 第五 点击下一页  当前页码数——  请求数据 
                // 第六  点击某页  跳转到当前页  请求数据 
            }
        })
    },
    pageJump:function(){
            // 获取所有页码的点击事件 因为是动态生成的 所以要用事件委托来添加事件
        $(".mui-pagination").on('click','.page',function(){
            // console.log(this);
            
            // 把全局的当前页码数设置称点击的按钮的页码数
            page=$(this).data('pageid')-1;
            // console.log(page);            
            // 调用查询当前页面的数据 
            maimai.getProductList(page);
        });
        // 给上一页添加点击事件  
        
        $(".mui-pagination").on('click','.prev-page',function(){
            // 判断当前如果页面小于第二页，就查询第一页的数据 
            if(page<1){
                page=0;
            // 调用查询当前页面的数据 
            maimai.getProductList(page);
            
            }else{
                // 如果页数大于1  上一页   当前页  --
                page--;
                // 调用查询当前页面的数据 
                maimai.getProductList(page);
                // console.log(page); 
            }
        });
        $('.mui-pagination').on('click','.next-page',function(){
            // 判断如果当前页面大于了   最大页码数就-1   例如最大是18页 17的下一页就停在这里
            if(page >= (pagecount)){
                page=pagecount;
                // 调用查询当前页面的数据 
                maimai.getProductList(page);
            } else{
                // 如果小于了  最大页码数-1  就正常当前页++ 
                page++;
                // 调用查询当前页面的数据 
                maimai.getProductList(page);
                console.log(page); 
            }
        });
    }
    
}
// function getProductList() {
//     $.ajax({
//         url: 'http://mmb.ittun.com/api/getmoneyctrl',
//         // type:"jsonp",
//         // 返回的是第几页的数据和页码 的条数  
//         data:{pageid:pageid,pagesize:10},
//         success: function(data) {
//             console.log(data);
//             var html = template('productListTmp', data);
//             $('#main .productlist>ul').html(html);
//             // 定义一个总页数  是总条数/每页大小
//             pagecount=Math.ceil(data.totalCount/10);
//             console.log(pagecount);
            
//             // 定义一个数组用来存取页码数
//             var arr=[];
//             // 还要有当前的页码数
//             for(var i=1;i<=pagecount;i++){
//                 arr.push(i);
//             }
//             // 定义一个对象  因为模板只能传对象 存储总页码数数组  和当前页码  
//             var obj={
//                 pagecount:arr,
//                 pageid:pageid
//             }
//             // 调用模板生成分页按钮 
//             var html=template('pageTmp',obj);
//             // 把分页按钮放到ul里面 
//             $(".mui-pagination").html(html);
//             // 页码的计算逻辑 
//             // 第一 你要有一个页码的总数  总的页码数  是总条数除以每页的显示数量  
//             // 第二 你要知道当前的页码数是几  
//             // 第三  要有一个每页大小  就是每页有几条数据 
//             // 第四  点击上一页 当前页码数++  请求数据 
//             // 第五 点击下一页  当前页码数——  请求数据 
//             // 第六  点击某页  跳转到当前页  请求数据 
//         }
//     })
// }
// //页码跳转 
// function pageJump(){
//     // 获取所有页码的点击事件 因为是动态生成的 所以要用事件委托来添加事件
//     $(".mui-pagination").on('click','pageid',function(){
//         // 把全局的当前页码数设置称点击的按钮的页码数
//         page=$(this).data('pageid');
//         console.log(page);
        
//         // 调用查询当前页面的数据 
//         getProductList();
//     });
//     // 给上一页添加点击事件  
    
//     $(".mui-pagination").on('click','prev-page',function(){
//         // 判断当前如果页面小于第二页，就查询第一页的数据 
//         if(page<=2){
//             page=1;
//            // 调用查询当前页面的数据 
//             getProductList();
//         }else{
//             // 如果页数大于2  上一页   当前页  --
//             page--;
//             // 调用查询当前页面的数据 
//             getProductList();
//         }
//     });
//     $('.mui-pagination').on('click','next-page',function(){
//         // 判断如果当前页面大于了   最大页码数就-1   例如最大是18页 17的下一页就停在这里
//         if(page>=(pagecount-1)){
//             page=pagecount;
//             // 调用查询当前页面的数据 
//             getProductList();   
//         } else{
//             // 如果小于了  最大页码数-1  就正常当前页++ 
//             page++;
//             // 调用查询当前页面的数据 
//             getProductList();
//         }
//     });

// }
