/**
 * Created by yangxiaowan on 2018/3/4.
 */
$(function(){
    var page=1;
    var pageSize=5;
    // 1. 获取数据渲染
    function render(){
        $.ajax({
            type:'GET',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info){
                console.log(info);
                $("tbody").html(template("tem",info));
                // 分页
                $("#pagination").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:page,
                    totalPages:Math.ceil(info.total/info.size),
                    onPageClicked:function(a,b,c,p){
                        page=p;
                        render();
                    }
                })
            }
        })
    }
    render();

    // 2. 点击添加分类，模态框显示
    $(".btn_add").on("click",function(){
        $("#secondModal").modal("show");
    })
})