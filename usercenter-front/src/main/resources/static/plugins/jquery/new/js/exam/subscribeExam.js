var contextPath = $("meta[name='contextPath']").attr("content");
//输入内容是数字
function changeNumber(obj){
    var price=$(obj).val();
    price = price.replace(/[^\d.]/g,"");
    //必须保证第一个为数字而不是.
    price = price.replace(/^\./g,"");
    //保证只有出现一个.而没有多个.
    price = price.replace(/\.{2,}/g,".");
    //保证.只出现一次，而不能出现两次以上
    price = price.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
    $(obj).val(price);
}
layui.use('table', function(){
    var subScribeExamId=$("#subScribeExamId").val();
    var table = layui.table;
    //方法级渲染
    table.render({
        elem: '#LAY_table_sub'
        ,url: contextPath+'/exam/alreadySubScribeStudent?subScribeExamId='+subScribeExamId
        ,cols: [[
            {field:'id', title: '序号', width:200, sort: true}
            ,{field:'username', title: '学号', width:200, sort: true}
            ,{field:'cname', title: '姓名', width:200, sort: true}
            ,{field:'classes', title: '班级', width:150,sort: true}
            ,{field:'academy', title: '学院', width:150,sort: true}
        ]]
        ,id: 'testReload'
        ,page: true
        ,height: 400
    });
});

/*点击预约*/
function startSubScribe(examId){
    //判断是否还有预约名额
    //发送ajax请求
    $.ajax({
        async :false,
        data: {'subScribeExamId':examId},
        url: contextPath+"/exam/isHaveAssignedForExam",
        type:"POST",
        success:function(data){//AJAX查询成功
            if(data){
                location.href=contextPath+"/exam/startSubScribeExam?subScribeExamId="+examId;
            }else{
                alert("当前已无更多名额！");
            }
        }
    });
}
/*取消預約*/
function cancelSubScribe(examId) {
    location.href=contextPath+"/exam/cancelSubScribeExam?subScribeExamId="+examId;
}