layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate', 'formSelects', 'util'], function() {
    var admin = layui.admin,
        laypage = layui.laypage,
        layer = layui.layer,
        table = layui.table,
        $ = layui.jquery,
        element = layui.element,
        form = layui.form,
        laydate = layui.laydate,
        formSelects = layui.formSelects,
        util = layui.util;

    form.render(null, 'newopentimebox');

    //监听提交
    form.on('submit(newopentimebtn)', function(data) {
        var field = data.field; //获取提交的字段
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引

        let dateStatus = field.opendaterange.split("~");
        let timeStatus = field.opentimerange.split("-");
        let refreshCycleTime = field.refreshCycleDay + ',' + field.refreshCycleTime;
        let dataObj = {
            "status": 1,
            "startDate": dateStatus[0],
            "endDate": dateStatus[1],
            "startTime": timeStatus[0],
            "endTime": timeStatus[1],
            "weekdays": field.week,
            "openRank": field.grade,
            "minAheadTime": field.mintime,
            "maxAheadTime": field.maxtime,
            "refreshCycleTime": refreshCycleTime,
            "addOrEdit": "add"
        };
        parent.layui.table.reload('opentime'); //重载表格
        parent.opentimeData(JSON.stringify(dataObj));
        parent.layer.close(index); //再执行关闭
    });

    //已设置开放日期范围
    laydate.render({
        elem: '#opendaterange',
        type: 'date',
        range: '~'
    });

    //开放时间范围
    laydate.render({
        elem: '#opentimerange',
        type: 'time',
        range: true
    });
    // 开放时间刷新周期时间点
    laydate.render({
        elem: '#refreshCycleTime',
        type: 'time'
    });
});