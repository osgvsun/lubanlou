layui.use(['form','upload', 'element', 'layer', 'table', 'laydate'], function () {
    var $ = layui.$;
    var form = layui.form,
        layer = layui.layer
    let table = layui.table;
    let upload = layui.upload;
    let element = layui.element;
    var laydate = layui.laydate;

    //监听提交
    form.on('submit(newinfobtn)', function(data) {
        var field = data.field; //获取提交的字段
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        //报表字段json
        let reportFiledDTOList = [];
        let reportTitle = field.title.split('&&');
        let reportField = field.field.split('&&');
        for (var i=0;i<reportTitle.length;i++){
            let reportFieldDTO = {
                title: reportTitle[i],
                field: reportField[i],
            }
            reportFiledDTOList.push(reportFieldDTO);
        }
        //最后保存json
        let reportInfoList = [];
        let reportInfo = {
            reportNumber: field.reportNumber,
            reportName: field.reportName,
            lakeNumber : lakeNumber,
            reportTableField: reportFiledDTOList
        }
        reportInfoList.push(reportInfo);

        //提交 Ajax 成功后，关闭当前弹层并重载表格
        $.ajax({
            url: datashareHost + "insertReportInfo",
            type: "post",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(reportInfoList),
            success: function (res) {
                layui.layer.alert(res.msg);
                parent.layui.table.reload("lay_table_reportInfo");//重载表格
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