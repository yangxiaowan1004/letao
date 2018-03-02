/**
 * Created by yangxiaowan on 2018/3/2.
 */
$(function(){

    // 1. У���
    $('form').bootstrapValidator({
        // 配置校验规则
        // 1.1 ָ配置字段校验
        fields:{
            username:{
                validators:{
                    notEmpty:{
                        message:"用户名不能为空"
                    },
                    stringLength:{
                        min:2,
                        max:7,
                        message:"用户名长度为2-6位"
                    },
                    callback:{
                        message:"用户名错误"
                    }
                }
            },
            password:{
                validators:{
                    notEmpty:{
                        message:"密码不能为空"
                    },
                    stringLength:{
                        min:6,
                        max:10,
                        message:"密码长度为6-10位"
                    },
                    callback:{
                        message:"密码错误"
                    }
                }
            }
        },
        // 验证表单显示的图标
        feedbackIcons:{
            valid:'glyphicon glyphicon-ok',
            invalid:'glyphicon glyphicon-remove',
            validating:'glyphicon glyphicon-refresh'
        }
    })

    // 表单校验成功事件，阻止表单的默认提交，用ajax 提交
    $("form").on("success.form.bv",function(e){
        e.preventDefault();
        $.ajax({
            type:'POST',
            url:'/employee/employeeLogin',
            data:$('form').serialize(),
            dataType:'json',
            success:function(info){
                console.log(info);
                if(info.error==1000){
                    $("form").data("bootstrapValidator").updateStatus("username","INVALID","callback")
                }
                if(info.error==1001){
                    $("form").data("bootstrapValidator").updateStatus("password","INVALID","callback")
                }
                if(info.success){
                    location.href="index.html";
                }
            }
        })
    })

    // 重置表单
    $("[type='reset']").on("click",function(){
        $("form").data("bootstrapValidator").resetForm();
    })

})