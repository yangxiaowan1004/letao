/**
 * Created by yangxiaowan on 2018/3/5.
 */
$(function(){
     //1. 导航数据渲染

    function render(){
        $.ajax({
            type:'GET',
            url:'/category/queryTopCategory',
            success:function(info){
                console.log(info);
                $(".first").html(template("tem-nav",info));
                // 默认渲染第0个一级分类
                renderCon(info.rows[0].id)
            }
        })
    };
    render();

    // 内容数据渲染
    // 点击导航的一级分类，请求数据
    var id;
    $(".first").on("click","li",function(){
        $(this).addClass('now').siblings().removeClass('now');
        id=$(this).attr("id");
        renderCon(id);
        // 让区域滚动重新回到0，0 的位置
        mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0,0,300);


    })
    function renderCon(id){
        $.ajax({
            type:'GET',
            url:'/category/querySecondCategory',
            data:{id:id},
            success:function(info){
                console.log(info);
                $(".second").html(template("tem-con",info));


            }
        })
    }

})