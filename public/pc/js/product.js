/**
 * Created by yangxiaowan on 2018/3/6.
 */
$(function(){
    var page=1;
    var pageSize=2;
    var result=[];  // 用于存放上传的图片

    // 1. 获取数据渲染页面
    render();
    function render(){
        // 1.1 请求数据
        $.ajax({
            type:'GET',
            url:"/product/queryProductDetailList",
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
                    },
                    // 设置每个按钮显示的文字
                    itemTexts:function(type,page,current){
                        switch(type){
                            case "first":
                                return "第一页";
                            case "next":
                                return "下一页";
                            case "prev":
                                return "上一页";
                            case "last":
                                return "尾页";
                            default:
                                return page;
                        }
                    },
                    tooltipTitles:function(type,page,current){
                        return;
                    }
                })
            }
        })
    }


    // 2. 添加商品
    // 2.1 点击添加商品，显示模态框
    $(".btn_add").on("click",function(){
        //console.log(11);
        $("#productModal").modal("show");
        // 2.2 选择二级分类渲染
        $.ajax({
            type:'GET',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            success:function(info){
                console.log(info);
                $(".dropdown-menu").html(template("tem-drop",info))
            }
        })
    })
    // 2.3 点击二级分类下拉菜单，选择分类，让内容显示在下拉菜单里
    $(".dropdown-menu").on("click","a",function(){
        $(".drop-text").text($(this).text());
        //让下面隐藏的input框记录brandId
        $("[name='brandId']").val($(this).parent().data('id'));
        // 改为验证通过的状态
        //$(".form").data("bootstrapValidator").updateStatus("brandId","VALID");
    })
    //2.4 图片上传
    $("#file").fileupload({
        dataType:'json',
        done:function(e,data){
            //console.log(data);
            if(result.length>=3){
                return;
            }
            result.push(data.result);
            if(result.length==3){
                // 如果上传了3张图片，让校验通过
                $(".form").data("bootstrapValidator").updateStatus("productLogo","VALID");
                //return;
            }
            else{
                $(".form").data("bootstrapValidator").updateStatus("productLogo","INVALID")

            }
            var url = data.result.picAddr;
            //console.log(data.result.picAddr);
            //往 img_box 里添加图片
            $(".img_box").append("<img src="+url+" width=100 height=100 />");

        }
    })
    // 2.5 表单校验
    $(".form").bootstrapValidator({
        excluded:[],
        feedbackIcons:{
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            brandId:{   // 1、品牌名称
                validators:{
                    notEmpty:{
                        message:'请选择品牌名称'
                    }
                }
            },
            proName:{   // 2、商品名称
                validators:{
                    notEmpty:{
                        message:'请输入商品名称'
                    }
                }
            },
            proDesc:{   // 3、商品描述
                validators:{
                    notEmpty:{
                        message:'请输入商品描述'
                    }
                }
            },
            num:{   // 4、商品库存
                validators:{
                    notEmpty:{   // 非空
                        message:'请输入商品库存'
                    },
                    regexp:{  // 非0 开头的数字
                        regexp:/^[1-9]\d*$/,
                        message:'请输入一个有效的商品库存'
                    }
                }
            },
            size:{   // 5、商品尺码
                validators:{
                    notEmpty:{
                        message:'请输入商品尺码'
                    },
                    regexp:{
                        regexp:/^\d{2}-\d{2}$/,
                        message:'请输入有效的尺码（如34-46）'
                    }
                }
            },
            oldPrice:{   // 商品原价
                validators:{
                    notEmpty:{
                        message:'请输入商品原价'
                    }
                }
            },
            price:{   // 商品价格
                validators:{
                    notEmpty:{
                        message:'请输入商品价格'
                    }
                }
            },
            productLogo:{
                validators:{
                    notEmpty:{
                        message:'请上传3张图片'
                    }
                }
            }

        }
    })
    // 2.6 表单校验通过事件，ajax提交
    $(".form").on("success.form.bv",function(e){
        e.preventDefault();
        var data=$(".form").serialize();
        data += "&picName1="+result[0].picName+"&picAddr1="+result[0].picAddr;
        data += "&picName2="+result[1].picName+"&picAddr2="+result[1].picAddr;
        data += "&picName3="+result[2].picName+"&picAddr3="+result[2].picAddr;
        //console.log(data);
        $.ajax({
            type:'POST',
            url:'/product/addProduct',
            data:data,
            success:function(info){
                console.log(info);
                if(info.success){
                    $("#productModal").modal("hide");
                    page=1;
                    render();
                    $(".form").data("bootstrapValidator").resetForm(true);
                    $(".drop-text").text("请选择品牌名称");
                    $(".img_box img").remove();
                    result=[];
                }


            }
        })
    })





})