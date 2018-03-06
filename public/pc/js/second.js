/**
 * Created by yangxiaowan on 2018/3/4.
 */
$(function(){
    var page=1;
    var pageSize=5;
    // 1. 页面获取数据渲染
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

        //2.2 模态框一级分类数据渲染
        $.ajax({
            type:'GET',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            success:function(info){
                console.log(info);
                $(".dropdown-menu").html(template("tem-drop",info));
            }
        })
    })
    // 2.3 当选中某一个下拉菜单的a时，让下拉菜单显示相同的内容
    $(".dropdown-menu").on("click","a",function(){
        var txt = $(this).text();
        $(".drop-text").text(txt);
        var id = $(this).parent().data("id");
        $("[name='categoryId']").val(id);

        $(".form").data("bootstrapValidator").updateStatus("categoryId","VALID")

    })

    // 2.4 图片预览---拿到上传的图片的路径，赋值给下面的img 的src
    // 利用插件，图片上传到服务器，服务器返回图片在服务器存放的地址
    $("#file").fileupload({
        dataType:'json',
        done:function(e,data){
            console.log(data.result.picAddr);
            var url = data.result.picAddr;
            $(".img_box img").attr("src",url);
            $("[name='brandLogo']").val(url);
            // 手动修改为校验通过状态
            $(".form").data("bootstrapValidator").updateStatus("brandLogo","VALID")
        }
    })

    // 3. 点击保存，将表单数据上传到服务器，重新渲染
    // 3.1 表单校验
    $(".form").bootstrapValidator({
        // 配置校验规则
        fields:{
            categoryId:{
                validators:{
                    notEmpty:{
                        message:'请选择一级分类'
                    }
                }
            },
            brandName:{
                validators:{
                    notEmpty:{
                        message:'请输入品牌名称'
                    }
                }
            },
            brandLogo:{
                validators:{
                    notEmpty:{
                        message:'请上传图片'
                    }
                }
            },
        },
        excluded:[],// 让所有的都参与校验
        // 小图标
        feedbackIcons:{
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        }
    })

    // 表单校验通过事件，阻止默认事件，用ajax提交到服务器
    $(".form").on("success.form.bv",function(e){
        e.preventDefault();

        $.ajax({
            type:'POST',
            url:'/category/addSecondCategory',
            data:$(".form").serialize(),
            success:function(info){
                console.log(info);
                $("#secondModal").modal("hide");
                page=1;
                render();
                // 表单样式重置
                $(".form").data("bootstrapValidator").resetForm(true);
                $(".drop-text").text("请选择一级分类");
                $(".img_box img").attr("src","images/none.png");
            }
        })
    })


})