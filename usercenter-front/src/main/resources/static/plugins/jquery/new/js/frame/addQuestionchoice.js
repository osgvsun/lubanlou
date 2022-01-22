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

function jumpToPage(page){
    //跳转到指定的页面
    //获取题库的id
    var questionPoolId=$("#questionPoolId").val();
    var name = $("#searchStem").val();
    var type = $("#type").val();
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'questionPoolContent?questionPoolId='+questionPoolId+'&currpage='+page+'&name='+name+'&type='+type;

}
function homePage() {
    //首页
    var questionPoolId=$("#questionPoolId").val();
    var name = $("#searchStem").val();
    var type = $("#type").val();
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'questionPoolContent?questionPoolId='+questionPoolId+'&currpage=1&name='+name+'&type='+type;
}
function lastPage(){
    //末页
    var questionPoolId=$("#questionPoolId").val();
    var totalPage=$("#totalPage").val();
    var name = $("#searchStem").val();
    var type = $("#type").val();
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'questionPoolContent?questionPoolId='+questionPoolId+'&currpage='+totalPage+'&name='+name+'&type='+type;
}
function previousPage(){
    //上一页
    var questionPoolId=$("#questionPoolId").val();
    var currpage=$("#currpage").val();
    if(currpage>1){
        currpage=parseInt(currpage)-1;
    }else{
        currpage=1;
    }
    var name = $("#searchStem").val();
    var type = $("#type").val();
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'questionPoolContent?questionPoolId='+questionPoolId+'&currpage='+currpage+'&name='+name+'&type='+type;
}
function nextPage(){
    //下一页
    var questionPoolId=$("#questionPoolId").val();
    var currpage=$("#currpage").val();
    var totalPage=$("#totalPage").val();
    if(currpage<totalPage){
        currpage=parseInt(currpage)+1;
    }else{
        currpage=totalPage;
    }
    var name = $("#searchStem").val();
    var type = $("#type").val();
    var contextPath = /*[[@{/}]]*/'';
    location.href=contextPath+'questionPoolContent?questionPoolId='+questionPoolId+'&currpage='+currpage+'&name='+name+'&type='+type;
}

function searchStem(){
    var questionPoolId=$("#questionPoolId").val();
    var name = $("#searchStem").val();
    window.location.href = "questionPoolContent?questionPoolId="+questionPoolId+"&name="+name;
}



/*上传上传*/

layui.use('upload', function(){
    var $ = layui.jquery
        ,upload = layui.upload,element = layui.element,layer = layui.layer;
    var questionPoolId=$("#questionPoolId").val();
    var contextPath = $("#contextPath").val();
    var username = $("#username").val();
    //指定允许上传的文件类型
    var zuulServerUrl=$("#zuulServerUrl").val();
    //拖拽上传
    upload.render({
        elem: '#test10'
        ,url: zuulServerUrl+'/examserver/questionPoolApi/importQuestionPoolItem'
        ,accept: 'file' //普通文件
        ,data: {questionPoolId: questionPoolId,username:username} //可选项。额外的参数，如：{id: 123, abc: 'xxx'}
        ,done: function(res){
            alert("上传成功");
            //TODO 后面需要传入题库的id
            location.href=contextPath+'/questionPool/questionPoolContent?questionPoolId='+questionPoolId;
        },xhr:xhrOnProgress
        ,progress:function(value){//上传进度回调 value进度值
            element.progress('demo', value+'%')//设置页面进度条
        },before: function(obj){
            layer.load(); //上传loading
        }
    });
});
//创建监听函数

var xhrOnProgress=function(fun) {

    xhrOnProgress.onprogress = fun; //绑定监听

    //使用闭包实现监听绑

    return function() {

        //通过$.ajaxSettings.xhr();获得XMLHttpRequest对象

        var xhr = $.ajaxSettings.xhr();

        //判断监听函数是否为函数

        if (typeof xhrOnProgress.onprogress !== 'function')

            return xhr;

        //如果有监听函数并且xhr对象支持绑定时就把监听函数绑定上去

        if (xhrOnProgress.onprogress && xhr.upload) {

            xhr.upload.onprogress = xhrOnProgress.onprogress;

        }

        return xhr;

    }

}