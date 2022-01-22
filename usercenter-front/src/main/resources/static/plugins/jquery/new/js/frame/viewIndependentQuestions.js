$(".btn-add-box").click(function () {

})
function DropDown(el) {
    this.dd = el;
    this.placeholder = this.dd.children('span');
    this.opts = this.dd.find('ul.dropdown > li');
    this.val = '';
    this.index = -1;
    this.initEvents();
}
DropDown.prototype = {
    initEvents : function() {
        var obj = this;

        obj.dd.on('click', function(event){
            $(this).toggleClass('active');
            return false;
        });

        obj.opts.on('click',function(){
            var opt = $(this);
            obj.val = opt.text();
            obj.index = opt.index();
            obj.placeholder.text(obj.val);
        });
    },
    getValue : function() {
        return this.val;
    },
    getIndex : function() {
        return this.index;
    }
}

$(function() {

    var dd = new DropDown( $('#dd') );

    $(document).click(function() {
        // all dropdowns
        $('.wrapper-dropdown-1').removeClass('active');
    });

});

function removeItem(obj,itemId){
    $(obj).parents("li").remove();
    //获取sectionIds数据
    var sectionIds=$("#sectionIds").val();
    var itemArray = sectionIds.split(",");
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
    $("#sectionIds").val(newItemIds);
}

function jumpToPageWithmanuallyView(page){
    //获取sectionId
    var sectionId=$("#sectionId").val();
    //获取ids
    var itemIds = $("#sectionIds").val();
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'viewIndependentQuestions?sectionId='+sectionId+'&currpage='+page+'&sectionIds='+itemIds;

}
function homePageManuallyView() {
    //首页
    //获取sectionId
    var sectionId=$("#sectionId").val();
    //获取ids
    var itemIds = $("#sectionIds").val();
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'viewIndependentQuestions?sectionId='+sectionId+'&currpage=1&sectionIds='+itemIds;
}
function lastPageManuallyView(){
    //末页
    //获取sectionId
    var sectionId=$("#sectionId").val();
    //获取ids
    var itemIds = $("#sectionIds").val();
    var totalPage=$("#totalPage").val();
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'viewIndependentQuestions?sectionId='+sectionId+'&currpage='+totalPage+'&sectionIds='+itemIds;
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
    var itemIds = $("#sectionIds").val();
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'viewIndependentQuestions?sectionId='+sectionId+'&currpage='+currpage+'&sectionIds='+itemIds;
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
    var itemIds = $("#sectionIds").val();
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'viewIndependentQuestions?sectionId='+sectionId+'&currpage='+currpage+'&sectionIds='+itemIds;
}
function back(){
    var sectionId = $("#sectionId").val();//获取当前是哪个大项
    var sectionIds = $("#sectionIds").val();//当前题目id串
    var itemIdsByList = sectionIds.split(",");//通过“，”将id字符串分隔并存入数组中
    var itemIdsByNum = itemIdsByList.length;//题目个数
    //更改父页面的id串和id个数
    parent.$("#itemList"+sectionId).val(sectionIds);
    parent.$("#itemCount"+sectionId).val(itemIdsByNum);
    parent.$("#itemCount_"+sectionId).val(itemIdsByNum);
    //更改父页面的题目数量和总分
    parent.calcTotalScore(sectionId);
    parent.calcItemTotalNum();
    var index = parent.layer.getFrameIndex(window.name);//先得到当前iframe层的索引
    parent.layer.close(index);//再执行关闭
}