/**
 * Created by yangxiaowan on 2018/3/2.
 */

$(function(){

    // ������
    NProgress.configure({
        showSpinner: false
    });

    $(document).ajaxStart(function(){
        NProgress.start();
    });
    // ���е�ajax�������֮�󣬽���������
    $(document).ajaxStop(function(){
        setTimeout(function(){
            NProgress.done();
        },500)
    })

    // 2. �����˵���ʾ����
    $(".second").prev().on("click",function(){
        $(this).next().slideToggle();
    })

    // 3. ����˵���ť��ȫ����ʾ
    $(".menu").on("click",function(){
        $(".aside").toggleClass("now");
        $(".main").toggleClass("now")
    })

    // 4. �˳���ť����ʾģ̬��
    $(".out").on("click",function(){
        $("#logoutModal").modal("show");
    })

    // 4.2 ����˳����˳���¼��ҳ����ת����¼ҳ
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


    // 5. �����ǰ���ǵ�¼ҳ������ajax�����÷����������Ƿ��¼�������û�е�¼����ת����¼ҳ
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

