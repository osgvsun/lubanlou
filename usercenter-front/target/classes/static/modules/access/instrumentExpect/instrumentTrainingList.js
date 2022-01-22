layui.use(['element', 'form', 'table', 'laydate', 'layer'], function(){
    var element = layui.element,
        form = layui.form,
        laydate = layui.laydate,
        layer = layui.layer,
        table = layui.table; //导航的hover效果、二级菜单等功能，需要依赖element模块

    let username = '';
    form.render(null, 'instrumenttrainingbox');
    laydate.render({
        elem: '#expectDate'
    });
    $.ajax({
        url: 'getCurrentUser',
        type: 'GET',
        async: false,
        data: {"clientId": "GvsunUserCenter"},
        success: function (res) {
            username = res.username;
        }
    });
    var count = 0;
    $.ajax({
        url: httpAccessUrl + '/getAccessEntityResult',
        type: 'GET',
        async: false,
        data: {"page": 1, "limit": 99999, "accessCode": "TRAINING", "username": username},
        success: function (res) {
            console.log(res)
            count = res.count;
            $.cookie("count", count);
        }
    })
//执行一个表单
    table.render({
        elem: '#instrumenttraining',
        url: httpAccessUrl + '/getAccessEntityTraining', //数据接口
        where: {"entityId": entityId, "entityType": entityType},
        title: '列表',
        cellMinWidth: 100,
        page: true, //开启分页
        page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
            layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
            //curr: 5, //设定初始在第 5 页
            groups: 1, //只显示 1 个连续页码
            first: false, //不显示首页
            last: false //不显示尾页
        },
        cols: [
            [ //表头
                {
                    fixed: 'left',
                    title: '序号',
                    type: 'numbers',
                    width: 50
                }, {
                    field: 'address',
                    title: '培训地点',
                    sort: true
                }, {
                    field: 'content',
                    title: '培训内容',
                    sort: true
                }, {
                    field: 'advanceHour',
                    title: '提前预约时间',
                    sort: true,
                    templet: function (d) {
                        return d.advanceHour + '小时';
                    }
                }, {
                    field: 'status',
                    title: '培训状态',
                    sort: true,
                    templet: function (d) {
                        return (splitTime(d.trainingDateTime) > splitTime(getDate())) ? '培训时间未到' : '培训时间已过';
                    }
                }, {
                    field: 'trainingDateTime',
                    title: '培训时间',
                    sort: true
                }, {
                    field: 'maxNumber',
                    title: '目前人数/最大培训人数',
                    sort: true
                }, {
                    field: 'teacher',
                    title: '培训老师',
                    sort: true,
                    templet: function (d) {
                        return d.teacher + '/' + d.teacherCname;
                    }
                }, {
                    field: '',
                    title: '培训结果',
                    sort: true
                }, {
                    fixed: 'right',
                    title: '操作',
                    toolbar: '#toolbar',
                    minWidth: 100
                }
            ]
        ],
        id: 'instrumenttraining',
        data: table,
        skin: 'line', //表格风格
        even: false,
        limits: [5, 7, 10, 20],
        limit: 5 //每页默认显示的数量
    });

    table.on('tool(instrumenttraining)', function (obj) {
        var data = obj.data;
        console.log(data)
        //打开结果录入页面
        if(obj.event === 'signUp') {
            let objData = {};
            objData.code = 'TRAINING';
            objData.itemId = data.trainingId;
            objData.username = username;
            $.ajax({
                url: httpAccessUrl + '/saveAccessEntityResult?' + $.param(objData),
                type: 'POST',
                success: function (res) {
                    if (res.code === 0) {
                        layer.msg('报名成功');
                    }
                }
            })
        }
    })
    function splitTime(time) {
        time = new Date(time.replace(/\-/g, "\/"));
        return time;
    }
    function getDate() {
        let date = new Date();
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        let d = date.getDate();
        let hh = date.getHours();
        let mm = date.getMinutes();
        let ss = date.getSeconds();
        if (m < 10) {
            m = '0' + m;
        }
        if (d < 10) {
            d = '0' + d;
        }
        if (hh < 10) {
            hh = '0' + hh;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        if (ss < 10) {
            ss = '0' + ss;
        }
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss;
    }
    $('.addExpect').on('click', function () {
        let expectDate = $('#expectDate').val();
        $.ajax({
            url: httpAccessUrl + '/saveAccessTrainingExpect?entityId=' + entityId + "&entityType=" + entityType + '&expectDate=' + expectDate + "&username=" + username,
            type: 'POST',
            success: function (res) {
                if (res.code === 0) {
                    layer.msg("培训日期申请成功");
                } else {
                    layer.msg(res.msg);
                }
            }
        })
    })
});