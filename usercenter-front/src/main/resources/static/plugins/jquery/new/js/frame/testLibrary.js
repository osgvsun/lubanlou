function jumpToPage2(page){
    //跳转到指定的页面
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'testLibrary?currpage='+page;

}
function homePage2() {
    //首页
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'testLibrary?currpage=1';
}
function lastPage2(){
    //末页
    var totalPage=$("#totalPage").val();
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'testLibrary?currpage='+totalPage;
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
    location.href=contextPath+'testLibrary?currpage='+currpage;
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
    location.href=contextPath+'testLibrary?currpage='+currpage;
}
function deleteExamQuestionpool(examQuestionpoolId) {
    var contextPath = /*[[@{/}]]*/'';
    if(confirm("是否确认删除？"))
    {
        $.ajax({
            async: false,
            type: "POST",
            url: contextPath+"deleteExamQuestionpool",
            data: {'examQuestionpoolId':examQuestionpoolId},
            dataType:"text",
            success:function(data){
                $("#"+examQuestionpoolId).remove();
            },
            error:function() {
                alert("删除失败！");
            }
        });
    }
}