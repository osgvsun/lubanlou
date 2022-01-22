layui.use(['layer', 'form'], function () {
    var layer = layui.layer,
        form = layui.form;

    $.ajax({
        url: labRoomHost + '/api/timetable/common/apiViewTimetableInfo',
        type: 'POST',
        async: false,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", getJWTAuthority($.cookie("currUser")));
        },
        data: {
            "courseNo": courseNo,
            "groupId": ""
        },
        success: function (res) {
            let data = res.rows;
            for (let i = 0; i < data.length; i++) {
                let str = ''
                if (data[i].info) {
                    str = JSON.parse(data[i].info)
                }
                if (status == 'WEEKDAY_WEEK_CLASS') {
                    $('#student1').closest('table').show();

                    let tr = `<tr>
                            <td>${i + 1}</td>
                            <td>${data[i].weekday}</td>
                            <td>${data[i].startWeek}-${data[i].endWeek}</td>
                            <td>${data[i].startClass}-${data[i].endClass}</td>
                            <td>${data[i].labInfo}</td>
                            <td>${data[i].teachers}</td>
                            <td>
                              ${setStatus(data[i])}
                            </td>
                          </tr>`;
                    $('#student1').append(tr);
                }
                if (status == 'DATETIME') {
                    $('#student2').closest('table').show();
                    let tr = `<tr>
                            <td>${i + 1}</td>
                            ${str ? '<td>' + str.startDate + ' ~ ' + str.endDate + '</td>' : '<td></td>'}
                            <td>${data[i].labInfo}</td>
                            <td>${data[i].teachers}</td>
                            <td>
                              ${setStatus(data[i])}
                            </td>
                          </tr>`;
                    $('#student2').append(tr);
                }
                if (status == 'WEEKDAY_TIME_WEEK') {
                    $('#student3').closest('table').show();
                    let tr = `<tr>
                            <td>${i + 1}</td>
                            <td>${data[i].weekday}</td>
                            <td>${data[i].startWeek}-${data[i].endWeek}</td>
                            ${str ? '<td>' + str.startDate + ' ~ ' + str.endDate + '</td>' : '<td></td>'}
                            <td>${data[i].labInfo}</td>
                            <td>${data[i].teachers}</td>
                            <td>
                              ${setStatus(data[i])}
                            </td>
                          </tr>`;
                    $('#student3').append(tr);
                }

            }
            let flag = false;
            if(data.findIndex(item => item.status==11 || item.status == 13)!=-1) {
                flag = true;
            }
            if (flag) {
                $('.exportData').css('display', 'block')
            }
        }
    });

    //
    function setStatus(obj) {
        let operation = '';
        if (obj.status == 1 || obj.status == 11) {
            if (obj.adjustStatus == 1) {
                operation = `<font>调整后数据</font>`
            } else if (obj.adjustStatus == 16) {
                operation = `<font>坐班停止</font>`
            } else {
                operation += `<button type="button" class="layui-btn layui-btn-normal layui-btn-sm" onclick='theClasses(${JSON.stringify(obj)})'>坐班调整</button>
                              <button type="button" class="layui-btn layui-btn-normal layui-btn-sm" onclick="theClosed(${obj.sameNumberId}, ${obj.startWeek}, ${obj.endWeek})">坐班停止</button>`
            }
        } else if (obj.status == 15) {
            operation = `<font color='red'>调整前数据</font>`
        } else if (obj.status == 16) {
            operation = `<font class="layui-btn layui-btn-warm layui-btn-sm">坐班停止</font>`
        }
        return operation;
    }
    // 调课
    window.theClasses = function (obj) {
        console.log(obj)
        var index = layer.open({
            type: 2,
            title: '坐班调整',
            maxmin: true,
            shadeClose: true,
            area: ['1100px', '500px'],
            content: 'theClasses?timetableStyle=' + timetableStyle,
            success: function (layero, index) {
                var iframe = window['layui-layer-iframe' + index];
                iframe.renderChildForm(obj)
            },
            btn: ['确定', '取消'],
            yes: function (index, layero) {
                //点击确认触发 iframe 内容中的按钮提交
                var submit = layero.find('iframe').contents().find("#exportData");
                submit.click();
            }
        })
        // layer.full(index)
    }
    // 停课
    window.theClosed = function (sameNumberId, startWeek, endWeek) {

        let falg = false;

        layer.confirm("确定要停止坐班吗?", {title: "提示"}, function (index) {
            for (let i = startWeek; i <= endWeek; i++) {
                let arr = new Object();
                arr.timetableStyle = timetableStyle;
                //调停课
                arr.status = 11;
                arr.adjustWeek = i;
                arr.weeks = [i];
                arr.createdBy = $.cookie("currUser");
                arr.sameNumberId = sameNumberId;
                var arrs = JSON.stringify(arr);
                $.ajax({
                    url: labRoomHost + '/api/timetable/adjust/apiTimetableAdjustSuspend',
                    type: 'POST',
                    async: false,
                    contentType: 'application/json;charset=utf-8',
                    beforeSend: function(request) {
                        request.setRequestHeader("Authorization", getJWTAuthority($.cookie("currUser")));
                    },
                    data: arrs,
                    success: function (res) {
                        falg = true
                    }
                })
            }
            if (falg) {
                layer.close(index);
                location.reload();
                layer.msg('坐班停止');
            }
        })

    }

    // 排课完成
    $('.exportData').on('click', function () {
        let arr = new Object();
        arr.courseNo = courseNo;
        arr.timetableStyle = timetableStyle;
        arr.status = 12;
        arr.createdBy = $.cookie("currUser");
        let arrs = JSON.stringify(arr);
        $.ajax({
            url: labRoomHost + '/api/timetable/common/apiTimetablePublic',
            type: 'POST',
            async: false,
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", getJWTAuthority($.cookie("currUser")));
            },
            contentType: 'application/json',
            data: arrs,
            success: function (res) {
                location.reload();
            }
        })
    })
})