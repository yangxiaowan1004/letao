/**
 * Created by yangxiaowan on 2018/3/2.
 */

$(function(){

    // 进度条
    NProgress.configure({
        showSpinner: false
    });

    $(document).ajaxStart(function(){
        NProgress.start();
    });
    // 所有的ajax请求结束之后，进度条结束
    $(document).ajaxStop(function(){
        setTimeout(function(){
            NProgress.done();
        },500)
    })

    // 2. 二级菜单显示隐藏
    $(".second").prev().on("click",function(){
        $(this).next().slideToggle();
    })

    // 3. 点击菜单按钮，全屏显示
    $(".menu").on("click",function(){
        $(".aside").toggleClass("now");
        $(".main").toggleClass("now")
    })

    // 4. 退出按钮，显示模态框
    $(".out").on("click",function(){
        $("#logoutModal").modal("show");
    })

    // 4.2 点击退出，退出登录，页面跳转到登录页
    $(".btn_logout").on("click",function(){
        $.ajax({
            type:'GET',
            url:'/employee/employeeLogout',
            success:function(info){
                //console.log(info);
                if(info.success){
                    location.href="login.html";
                }
            }
        })
    })


    // 5. 如果当前不是登录页，发送ajax请求，让服务器返回是否登录过，如果没有登录，跳转到登录页
    if(location.href.indexOf("login.html")==-1){
        $.ajax({
            type:'GET',
            url:'/employee/checkRootLogin',
            success:function(info){
                if(info.error==400){
                    location.href="login.html";
                }
            }
        })
    }

})

