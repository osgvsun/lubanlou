
function addly(option){
    var textbox = $('select  option:selected').val();
    var boox=document.getElementById("addly_loop");
    var div=document.getElementById("addly_loop").innerHTML;
        $("#addly_loop").empty();
        boox.innerHTML=div;
    $(".btn-add-box").click(function(){
        $(this).hide()
        $(this).siblings(".btn-cancel-box").show()
    })
    $(".btn-cancel-box").click(function(){
        $(this).hide();
        $(this).siblings(".btn-add-box").show()
    })
    //获取section
    var currsection=$("#currsection").val();
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+"addedQuestions?questionPoolId="+textbox+"&currsection="+currsection;
}
/*
$(".btn-add-box").click(function(){
    $(this).hide()
    $(this).siblings(".btn-cancel-box").show()
    //将对应的小题信息存储
})
$(".btn-cancel-box").click(function(){
    $(this).hide();
    $(this).siblings(".btn-add-box").show()
})
*/
function addItem(obj,itemId){
    var currsection=$("#currsection").val();
    $(obj).hide()
    $(obj).siblings(".btn-cancel-box").show()
    //获取当前题库的id
    var questionPoolId=$("#questionPoolId").val();
    var itemIds=sessionStorage.getItem(currsection);
    if(itemIds!=null){
        itemIds=itemIds+","+itemId;
    }else{
        itemIds=itemId;
    }
    //获取当前的section
    sessionStorage.setItem(currsection,itemIds);
}
function deleteItem(obj,itemId){
    var currsection=$("#currsection").val();
    $(obj).hide();
    $(obj).siblings(".btn-add-box").show()

    //获取当前题库的id
    var questionPoolId=$("#questionPoolId").val();
    var itemIds=sessionStorage.getItem(currsection+"_"+questionPoolId);
    var itemIdList=itemIds.split(",");
    for(var i=0;i<itemIdList.length;i++){
        if(itemId==itemIdList[i]){
            itemIdList.splice(i,1);
        }
    }
    var newItemIds="";
    for(var i=0;i<itemIdList.length;i++){
        if(newItemIds==""){
            newItemIds=itemIdList[i];
        }else{
            newItemIds=newItemIds+","+itemIdList[i];
        }
    }
    sessionStorage.setItem(currsection+"_"+questionPoolId,newItemIds)
}
$(function () {
    //判断该题库中小题的选中效果
    //获取目前的大项
    var len=$.cookie("sectionlength");
    for(var j=1;j<=len;j++){
        var itemIds = sessionStorage.getItem(j);
        if(itemIds!=null){
            var split = itemIds.split(",");
            for(var i=0;i<split.length;i++){
                //隐藏add按钮 显示删除按钮
                $("#add"+split[i]).hide();
                $("#del"+split[i]).show();
                $("#del"+split[i]).disabled=true;
            }
        }
    }
})
/*$(".btn_box_add .layui-btn-normal").click(function () {
    alert(1);
    $(".addly").css("display","none");
    alert(2);
})*/

function jumpToPageWithmanually(page){
    //跳转到指定的页面
    //获取题库的id
    var questionPoolId=$("#questionPoolId").val();
    //获取当前大项
    var currsection=$("#currsection").val();
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'addedQuestions?questionPoolId='+questionPoolId+'&currpage='+page+'&currsection='+currsection;

}
function homePageManually() {
    //首页
    var questionPoolId=$("#questionPoolId").val();
    var contextPath = /*[[@{/}]]*/'';
    //获取当前大项
    var currsection=$("#currsection").val();
    location.href=contextPath+'addedQuestions?questionPoolId='+questionPoolId+'&currpage=1'+'&currsection='+currsection;
}
function lastPageManually(){
    //末页
    var questionPoolId=$("#questionPoolId").val();
    var totalPage=$("#totalPage").val();
    var contextPath = /*[[@{/}]]*/'';
    //获取当前大项
    var currsection=$("#currsection").val();
    location.href=contextPath+'addedQuestions?questionPoolId='+questionPoolId+'&currpage='+totalPage+'&currsection='+currsection;
}
function previousPageManually(){
    //上一页
    var questionPoolId=$("#questionPoolId").val();
    var currpage=$("#currpage").val();
    if(currpage>1){
        currpage=parseInt(currpage)-1;
    }else{
        currpage=1;
    }
    var contextPath = /*[[@{/}]]*/'';
    //获取当前大项
    var currsection=$("#currsection").val();
    location.href=contextPath+'addedQuestions?questionPoolId='+questionPoolId+'&currpage='+currpage+'&currsection='+currsection;
}
function nextPageManually(){
    //下一页
    var questionPoolId=$("#questionPoolId").val();
    var currpage=$("#currpage").val();
    var totalPage=$("#totalPage").val();
    if(currpage<totalPage){
        currpage=parseInt(currpage)+1;
    }else{
        currpage=totalPage;
    }
    var contextPath = /*[[@{/}]]*/'';
    //获取当前大项
    var currsection=$("#currsection").val();
    location.href=contextPath+'addedQuestions?questionPoolId='+questionPoolId+'&currpage='+currpage+'&currsection='+currsection;
}
function back() {
       var index = parent.layer.getFrameIndex(window.name);
        parent.layer.close(index);
    }