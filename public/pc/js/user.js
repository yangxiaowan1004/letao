/**
 * Created by yangxiaowan on 2018/3/4.
 */
$(function(){
    // 1. �û�������Ⱦ
    var page=1;
    var pageSize = 5;

    function render(){
        //1.1 ��������
        $.ajax({
            type:'GET',
            url:'/user/queryUser',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info){
                console.log(info);
                $("tbody").html(template("tem",info));
                // 1.2 ��ҳ��Ⱦ
                $("#pagination").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:page,
                    numberOfPages:6,
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

    // ������ť
    var id;
    var isDelete;
    // 2.1 �����ť��ģ̬����ʾ
    $("tbody").on("click",".btn",function(){
        $("#userModal").modal("show");
        id = $(this).parent().data("id");
        //console.log(id);
        isDelete=$(this).hasClass("btn-success")?1:0;
        //console.log(isDelete);

        // 2.2 ���ȷ�ϰ�ť���������󣬺�ִ̨�в������������ݣ�������Ⱦ
        $(".confirm").off().on("click",function(){
            //console.log(11);
            $.ajax({
                type:'POST',
                url:'/user/updateUser',
                data:{
                    id:id,
                    isDelete:isDelete
                },
                success:function(info){
                    console.log(info);
                    if(info.success){
                        $("#userModal").modal("hide");
                        render();
                    }
                }
            })

        })
    })
    //$(".confirm").on("click",function(){
    //
    //    //$("#userModal").modal("hide");
    //    console.log(101);
    //
    //})

})