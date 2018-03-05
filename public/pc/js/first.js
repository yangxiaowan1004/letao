/**
 * Created by yangxiaowan on 2018/3/4.
 */
$(function(){
    // 1. 表格渲染
    var page =1;
    var pageSize = 2;  // 每页显示条数
    function render(){
        // 1.1 获取数据渲染
        $.ajax({
            type:'GET',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info){
                console.log(info);
                $("tbody").html(template("tem",info));
                // 1.2 分页
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

    // 2. 添加按钮
    $(".btn_add").on("click",function(){
        // 2.1 模态框显示
        $("#firstModal").modal("show");
    });
    // 2.2 表单校验
    $(".form").bootstrapValidator({
        // 校验规则
        fields:{
            categoryName:{
                validators:{
                    notEmpty:{
                        message:"请输入一级分类名称"
                    }
                }
            }
        },
        feedbackIcons:{
            valid:'glyphicon glyphicon-ok',
            invalid:'glyphicon glyphicon-remove',
            validating:'glyphicon glyphicon-refresh'
        }
    });
    $(".form").on("success.form.bv",function(e){
        e.preventDefault();

        $.ajax({
            type:'POST',
            url:'/category/addTopCategory',
            data:$(".form").serialize(),
            success:function(info){
                console.log(info);
                if(info.success){
                    $("#firstModal").modal("hide");
                    $(".form").data("bootstrapValidator").resetForm(true);
                    page=1;
                    render();
                }
            }
        })
    })


})