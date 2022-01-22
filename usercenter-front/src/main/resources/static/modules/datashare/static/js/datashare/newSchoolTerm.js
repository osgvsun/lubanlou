layui.use(['form','upload', 'element', 'layer', 'table', 'laydate'], function () {
    var $ = layui.$;
    var form = layui.form,
        layer = layui.layer
    let table = layui.table;
    let upload = layui.upload;
    let element = layui.element;
    var laydate = layui.laydate;

    //学期开始时间
    laydate.render({
        elem: '#termStart',
        format: 'yyyy-MM-dd'
    });

    //学期结束时间
    laydate.render({
        elem: '#termEnd',
        format: 'yyyy-MM-dd'
    });

    //监听提交
    form.on('submit(newtermbtn)', function(data) {
        var field = data.field; //获取提交的字段
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        let schoolTermDTOList = [];
        let schoolTermDTO = {
            termName: field.termName,
            termStart: field.termStart,
            termEnd: field.termEnd,
            termCode: field.termCode,
            termNumber: field.termNumber,
            yearCode: field.yearCode,
            creator: currentUsername,
        }
        schoolTermDTOList.push(schoolTermDTO);
        //提交 Ajax 成功后，关闭当前弹层并重载表格
        $.ajax({
            url: datashareHost + "openapi/uploadSchoolTermByDTO",
            type: "post",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(schoolTermDTOList),
            success: function (res) {
                layui.layer.alert(res.msg);
                parent.layui.table.reload("lay_table_schoolTerm");//重载表格
                if (res.code===0){
                    parent.layer.close(index); //再执行关闭
                }
            },
            error: function () {
                layui.layer.alert("请求超时");
            }
        })
    });

});