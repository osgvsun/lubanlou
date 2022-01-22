$(function () {
    var zuulServerUrl=$("#zuulServerUrl").val();
    var questionPoolId=$("#questionPoolId").val();
    $.ajax({
        type: 'GET',
        async: false,
        url: zuulServerUrl+'/examserver/questionPoolApi/getQuestionList?questionPoolId='+questionPoolId,
        contentType:"application/json;charset=utf-8",
        dataType:"json",
        success: function(data) {
            $.each(data, function (index, item) {
                var count=index+1;
                var content="";
                content +='<ul class="m-list"><div class="question">';
                content +='<span>"'+count+'"</span>';
                content +='<span>"'+item.stem.replace(/<\/?.+?>/g, "");+'" ></span>';
                $.each(item.questionOptionDTOList,function (index2,item2) {

                })
                content +='</div></ul>';
                $("#content").html(content);
            });
        },
    })

})

function deleteQuestionPool(poolId){

    if(confirm("是否确认删除当前题库？")){
        var contextPath = /*[[@{/}]]*/'';
        location.href=contextPath+'deleteQuestionPool?questionPoolId='+poolId;
    }else{
        return false;
    }
}

function jumpToPage2(page){
    //跳转到指定的页面
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'mainPage?currpage='+page;

}
function homePage2() {
    //首页
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'mainPage?currpage=1';
}
function lastPage2(){
    //末页
    var totalPage=$("#totalPage").val();
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'mainPage?currpage='+totalPage;
}
function previousPage2(){
    //上一页
    var currpage=$("#currpage").val();
    if(currpage>1){
        currpage=parseInt(currpage)-1;
    }else{
        currpage=1;
    }
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'mainPage?currpage='+currpage;
}
function nextPage2(){
    //下一页
    var currpage=$("#currpage").val();
    var totalPage=$("#totalPage").val();
    if(currpage<totalPage){
        currpage=parseInt(currpage)+1;
    }else{
        currpage=totalPage;
    }
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'mainPage?currpage='+currpage;
}
<!--日期-->

layui.use('laydate', function(){
    var laydate = layui.laydate;

    //常规用法
    laydate.render({
        elem: '#createdTime'
    });

});

function exportQuestionPool() {
    var questionPoolId = $("#questionPoolId").val();
    var zuulServerUrl=$("#zuulServerUrl").val();
    window.location.href=zuulServerUrl+"/examserver/questionPoolApi/exportExcelQuestionPoolById?questionPoolId="+questionPoolId;
    alert("导出成功")
}

function saveQuestionPool(){
    var zuulServerUrl=$("#zuulServerUrl").val();
    var title=$("#title").val();
    var uid=$("#uid").val();
    var questionPoolFlag=$("#questionPoolFlag").val();
    var category=$("#category").val();
    var arr = new Object();
    arr.id = $("#questionPoolId").val();
    arr.title = $("#title").val();
    var data = JSON.stringify(arr);
    $.ajax({
        type: 'POST',
        async: false,
        url: zuulServerUrl+'/examserver/questionPoolApi/saveQuestionPool',
        contentType:"application/json;charset=utf-8",
        dataType:"json",
        data:data,
        success: function(res) {
            var myData={
                "questionPoolId":res,
                "title":title,
                "uid":uid,
                "questionPoolFlag":questionPoolFlag,
                "category":category,
            };
            $.ajax({
                url:"../questionPool/saveQuestionPool",
                type:"post",
                data:myData,
                success: function () {
                    var index=parent.layer.getFrameIndex(window.name);
                    parent.layer.close(index);
                    window.parent.location.reload();
                }
            })
        }
    });
}

