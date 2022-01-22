layui.use(['form', 'laydate', 'jquery', 'laypage', 'layer'], function(){
    var form = layui.form,
        laydate = layui.laydate,
        $ = layui.jquery,
        laypage = layui.laypage,
        layer = layui.layer;

    form.render(null, );
    //日期范围
    laydate.render({
        elem: '#test1'
        //设置开始日期、日期日期的 input 选择器
        //数组格式为 2.6.6 开始新增，之前版本直接配置 true 或任意分割字符即可
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
    function getAttendance(page, limit, startDate, usernames) {
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
            "usernames": usernames
        }
        // 1.出勤；2.迟到；3.早退；4.旷课；5.请假）
        $.ajax({
            url: attendanceHost + '/attendanceManagement/getBasicAttendanceLogByDate',
            // url: "http://localhost:8844/attendanceManagement/getAttendanceLogs?currPage=1&pageSize=10&startDate=2021-05-10&endDate=2021-09-10&usernames=20200261",
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
                            <td>${data[i].workDate}</td>
                            <td>${data[i].startTime}</td>
                            <td>${data[i].endTime}</td>
<!--                            <td>${data[i].attendanceStatus === 1 ? "出勤" : data[i].attendanceStatus === 2 ? "迟到" : data[i].attendanceStatus === 3 ? "早退" : data[i].attendanceStatus === 4 ? "旷课" : "请假"}</td>-->
                            <td>${data[i].method}</td>
                            <td>${data[i].workTime}</td>
                            <td>${data[i].startWorkPlace}</td>
                            <td>${data[i].endWorkPlace}</td>
                            <td>
                                <span>${data[i].amEndTime}</span><br />
                                <span>${data[i].pmStartTime}</span>
                            </td>
                            <td>
                                <span>${data[i].amEndWorkPlace}</span><br />
                                <span>${data[i].pmStartWorkPlace}</span>
                            </td>
                            <td>
                                <div class="layui-input-block">
                                  <select lay-filter="attendanceStatus">
                                    <option value="1" data="${data[i].startTime}" ${data[i].attendanceStatus === 1 ? "selected" : ""}>出勤</option>
                                    <option value="2" data="${data[i].startTime}" ${data[i].attendanceStatus === 2 ? "selected" : ""}>迟到</option>
                                    <option value="3" data="${data[i].startTime}" ${data[i].attendanceStatus === 3 ? "selected" : ""}>早退</option>
                                    <option value="4" data="${data[i].startTime}" ${data[i].attendanceStatus === 4 ? "selected" : ""}>旷课</option>
                                    <option value="5" data="${data[i].startTime}" ${data[i].attendanceStatus === 5 ? "selected" : ""}>请假</option>
                                  </select>
                                </div>
                            </td>
                          </tr>`;
                    $('#creditCardRecordsAttendce').append(tr);
                    form.render();
                }
                setPage(page, limit, res.count, startDate, usernames);
                layer.close(index);
            }
        })
    }
    form.on("select(attendanceStatus)", function (obj) {
        let that = this;
        let val = obj.value;
        let data = obj;
        let dateData = data.elem[val - 1].attributes.data.value.split(" ")[0].replace(/-/g, "");
        let username = $(obj.othis).closest("tr").find('td:eq(1)').text();
        $.ajax({
            url: attendanceHost + `/updateAttendanceStatus?id=${dateData}&username=${username}&attendanceType=${val}`,
            type: 'POST',
            contentType:"application/json;charset=utf-8",
            success: function (res) {
                if (res.code === 0) {
                    layer.msg(res.msg);
                } else {
                    layer.msg(res.msg);
                }
            }
        })
        console.log(dateData)
    })
    //分页功能
    //自定义首页、尾页、上一页、下一页文本
    function setPage(page, limit, count, startDate, usernames) {
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
                    getAttendance(obj.curr, obj.limit, startDate, usernames)
                }
            }
        });
    }

    $(".sureSearch").on('click', function () {
        let usernameList = $("select[name='messageName']").val();
        let username = usernames.getValue();
        let usernamesArr = [];
        let startDate = $('#test1').val();
        if (username.length !== 0) {
            let usernamesNewArr = usernames.getValue();
            for (let i = 0; i < usernamesNewArr.length; i++) {
                usernamesArr.push(usernamesNewArr[i].value);
            }
        } else if (usernameList !== null && usernameList !== "") {
            usernamesArr = usernameList.split(',');
        }
        getAttendance(1, 10, startDate, usernamesArr)
    })

    //记录导出
    $(".exportData").on('click', function () {
        let usernameList = $("select[name='messageName']").val();
        let username = $("select[name='usernames']").val();
        let usernamesArr = [];
        let startDate = $('#test1').val();
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
            "usernames": usernamesArr
        }
        axios({
            method: 'post',
            url: apiGateWayHost + '/financial/financial/api/exportGetBasicAttendanceLogByDate', // 请求地址
            data: data, // 参数
            responseType: 'blob',
        }).then(res => {
            let newName = '考勤记录.xlsx'
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