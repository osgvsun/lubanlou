var contextPath = $("meta[name='contextPath']").attr("content");
layui.use('table', function(){
    var examId=$("#examId").val();
    var table = layui.table;
    //方法级渲染
    table.render({
        elem: '#LAY_table_user'
        ,url: contextPath+'/exam/showExamGrading?examId='+examId
        ,cols: [[
            {field:'username', title: '用户名', width:200, sort: true}
            ,{field:'cname', title: '姓名', width:200, sort: true}
            ,{field:'score', title: '成绩', width:200, sort: true}
            ,{field:'commitDate', title: '提交日期', width:300,sort: true}
        ]]
        ,id: 'testReload'
        ,page: true
        ,height: 400
    });
});