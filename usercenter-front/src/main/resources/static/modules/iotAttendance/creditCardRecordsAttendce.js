layui.use(['form', 'laydate', 'jquery', 'laypage', 'layer'], function(){
    var form = layui.form,
        laydate = layui.laydate,
        $ = layui.jquery,
        laypage = layui.laypage,
        layer = layui.layer;

    form.render(null, );
    //日期范围
    laydate.render({
        elem: '#test6'
        //设置开始日期、日期日期的 input 选择器
        //数组格式为 2.6.6 开始新增，之前版本直接配置 true 或任意分割字符即可
        ,range: ["#test-startDate", "#test-endDate"]
    });
    $.ajax({
        url: apiGateWayHost + '/financial/financial/api/getTerritory',
        // url: 'http://localhost:8764' + '/financial/api/getTerritory',
        type: 'POST',
        success: function (res) {
            let data = res.data;
            for (let i = 0; i < data.length; i++) {
                let option = `<option value="${data[i].usernameList.join(',')}">${data[i].messageName}</option>`;
                $("select[name='messageName']").append(option);
                form.render();
            }
        }
    })
    let usernameArr = [];
    $.ajax({
        url: apiGateWayHost + '/financial/financial/api/getUserList',
        // url: 'http://localhost:8764' + '/financial/api/getUserList',
        type: 'POST',
        async: false,
        success: function (res) {
            let data = res.data;
            usernameArr = data.map(v => {
                return { "name": v.cname, "value": v.userName}
            })

        }
    })
    var usernames = xmSelect.render({
        el: '#usernames',
        filterable: true,
        style: {
           width: '150px'
        },
        data: usernameArr
    })
    getAttendance(1, 10)
    //列表数据渲染
    function getAttendance(page, limit, startDate, endDate, usernames) {
        var index = layer.load(1, {
            shade: [0.1,'#fff'], //0.1透明度的白色背景
            content: '加载中...',
            success: function (layero) {
                layero.find('.layui-layer-content').css({
                    'padding-top': '40px',//图标与样式会重合，这样设置可以错开
                    'width': '200px'//文字显示的宽度
                });
            }
        });
        let data = {
            "currPage": page,
            "pageSize": limit,
            "startDate": startDate,
            "endDate": endDate,
            "usernames": usernames
        }
        $.ajax({
            url: attendanceHost + '/attendanceManagement/getAttendanceLogs',
            // url: "http://localhost:8844/attendanceManagement/getAttendanceLogs",
            type: 'POST',
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(data),
            success: function (res) {
                $('#creditCardRecordsAttendce').empty();
                let data =  res.data;
                for (let i = 0; i < data.length; i++) {
                    let tr = `<tr>
                            <td>${i + 1}</td>
                            <td>${data[i].username}</td>
                            <td>${data[i].cardno}</td>
                            <td>${data[i].cname}</td>
                            <td>${data[i].datetime}</td>
                            <td>${data[i].status}</td>
                            <td>${data[i].address}</td>
                            <td>${data[i].source}</td>
                          </tr>`;
                    $('#creditCardRecordsAttendce').append(tr);
                }
                setPage(page, limit, res.count, startDate, endDate, usernames);
                layer.close(index);
            }
        })
    }
    //分页功能
    //自定义首页、尾页、上一页、下一页文本
    function setPage(page, limit, count, startDate, endDate, usernames) {
        laypage.render({
            elem: 'page'
            ,count: count
            ,curr: page
            ,limit: limit
            ,first: '首页'
            ,last: '尾页'
            ,prev: '<em>←</em>'
            ,next: '<em>→</em>'
            ,theme: '#367c5d',
            layout: ['count', 'prev', 'page', 'next', 'skip'],
            jump: function (obj, first) {
                if (!first) {
                    getAttendance(obj.curr, obj.limit, startDate, endDate, usernames)
                }
            }
        });
    }

    $(".sureSearch").on('click', function () {
        let usernameList = $("select[name='messageName']").val();
        let username = usernames.getValue();
        let usernamesArr = [];
        let startDate = $('#test-startDate').val();
        let endDate = $('#test-endDate').val();
        if (username.length !== 0) {
            let usernamesNewArr = usernames.getValue();
            for (let i = 0; i < usernamesNewArr.length; i++) {
                usernamesArr.push(usernamesNewArr[i].value);
            }
        } else if (usernameList !== null && usernameList !== "") {
            usernamesArr = usernameList.split(',');
        }
        getAttendance(1, 10, startDate, endDate, usernamesArr)
    })

    //记录导出
    $(".exportData").on('click', function () {


        let usernameList = $("select[name='messageName']").val();
        let username = $("select[name='usernames']").val();
        let usernamesArr = [];
        let startDate = $('#test-startDate').val();
        let endDate = $('#test-endDate').val();
        if (usernameList !== null && usernameList !== "") {
            usernamesArr = usernameList.split(',');
        } else {
            let usernamesNewArr = usernames.getValue();
            for (let i = 0; i < usernamesNewArr.length; i++) {
                usernamesArr.push(usernamesNewArr[i].value);
            }
        }
        let data = {
            "currPage": 1,
            "pageSize": 99999,
            "startDate": startDate,
            "endDate": endDate,
            "usernames": usernamesArr
        }
        axios({
            method: 'post',
            url: apiGateWayHost + '/financial/financial/api/exportGetAttendanceLogs', // 请求地址
            // url: 'http://localhost:8764' + '/financial/api/exportGetAttendanceLogs',
            data: data, // 参数
            responseType: 'blob',
        }).then(res => {
            let newName = '刷卡记录.xlsx'
            // 处理返回的文件流
            const content = res.data

            const blob = new Blob([content], { type: 'application/octet-stream;charset=ISO8859-1' })
            // console.log(res.headers)
            // const fileName = res.headers['content-disposition'].split('filename=')[1]
            const fileName = newName
            if ('download' in document.createElement('a')) {
                // 非IE下载
                const elink = document.createElement('a')
                elink.download = fileName
                elink.style.display = 'none'
                elink.href = URL.createObjectURL(blob)
                document.body.appendChild(elink)
                elink.click()
                URL.revokeObjectURL(elink.href) // 释放URL 对象
                document.body.removeChild(elink)
            } else {
                // IE10+下载
                navigator.msSaveBlob(blob, fileName)
            }
        })
    })
});