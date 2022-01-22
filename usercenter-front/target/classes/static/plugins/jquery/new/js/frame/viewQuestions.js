$(".btn-add-box").click(function () {


})

function removeItem(obj,itemId){
    $(obj).parents("li").remove();
    //同时删除对应的sessionStorage中的数据
    //获取当前是哪个大项
    var sectionId=$("#sectionId").val();
    var itemIds = sessionStorage.getItem(sectionId);
    var itemArray = itemIds.split(",");
    for(var i=0;i<itemArray.length;i++){
        if(itemId==itemArray[i]){
            itemArray.splice(i,1);
        }
    }
    var newItemIds="";
    for(var j=0;j<itemArray.length;j++){
        if(newItemIds==""){
            newItemIds=itemArray[j];
        }else{
            newItemIds=newItemIds+","+itemArray[j];
        }
    }
    sessionStorage.setItem(sectionId,newItemIds)
}

function jumpToPageWithmanuallyView(page){
    //获取sectionId
    var sectionId=$("#sectionId").val();
    //获取ids
    var itemIds = sessionStorage.getItem(sectionId);
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'viewQuestions?sectionId='+sectionId+'&currpage='+page+'&sectionIds='+itemIds;

}
function homePageManuallyView() {
    //首页
    //获取sectionId
    var sectionId=$("#sectionId").val();
    //获取ids
    var itemIds = sessionStorage.getItem(sectionId);
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'viewQuestions?sectionId='+sectionId+'&currpage=1&sectionIds='+itemIds;
}
function lastPageManuallyView(){
    //末页
    //获取sectionId
    var sectionId=$("#sectionId").val();
    //获取ids
    var itemIds = sessionStorage.getItem(sectionId);
    var totalPage=$("#totalPage").val();
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'viewQuestions?sectionId='+sectionId+'&currpage='+totalPage+'&sectionIds='+itemIds;
}
function previousPageManuallyView(){
    //上一页
    var currpage=$("#currpage").val();
    if(currpage>1){
        currpage=parseInt(currpage)-1;
    }else{
        currpage=1;
    }
    //获取sectionId
    var sectionId=$("#sectionId").val();
    //获取ids
    var itemIds = sessionStorage.getItem(sectionId);
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'viewQuestions?sectionId='+sectionId+'&currpage='+currpage+'&sectionIds='+itemIds;
}
function nextPageManuallyView(){
    //下一页
    var currpage=$("#currpage").val();
    var totalPage=$("#totalPage").val();
    if(currpage<totalPage){
        currpage=parseInt(currpage)+1;
    }else{
        currpage=totalPage;
    }
    //获取sectionId
    var sectionId=$("#sectionId").val();
    //获取ids
    var itemIds = sessionStorage.getItem(sectionId);
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'viewQuestions?sectionId='+sectionId+'&currpage='+currpage+'&sectionIds='+itemIds;
}
function back() {
    var index = parent.layer.getFrameIndex(window.name);//先得到当前iframe层的索引
    parent.layer.close(index);//再执行关闭
}