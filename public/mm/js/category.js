/**
 * Created by yangxiaowan on 2018/3/5.
 */
$(function(){
     //1. ����������Ⱦ

    function render(){
        $.ajax({
            type:'GET',
            url:'/category/queryTopCategory',
            success:function(info){
                console.log(info);
                $(".first").html(template("tem-nav",info));
                // Ĭ����Ⱦ��0��һ������
                renderCon(info.rows[0].id)
            }
        })
    };
    render();

    // ����������Ⱦ
    // ���������һ�����࣬��������
    var id;
    $(".first").on("click","li",function(){
        $(this).addClass('now').siblings().removeClass('now');
        id=$(this).attr("id");
        renderCon(id);
        // ������������»ص�0��0 ��λ��
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