layui.use(['layer', 'form'], function () {
    var layer = layui.layer,
        form = layui.form;

    // $.ajax({
    //     url: labRoomHost + '/api/timetable/common/apiViewAdjustTimetableInfo',
    //     type: 'POST',
    //     data: {
    //         courseNo: courseNo
    //     },
    //     beforeSend: function(request) {
    //         request.setRequestHeader("Authorization", getJWTAuthority($.cookie("currUser")));
    //     },
    //     success: function (res) {
    //
    //     }
    // })
    // let detail = {}



    window.getCourseObj = function (obj) {
        var teacher = xmSelect.render({
            el: '#teacher',
            tips: '请选择导师',
            style: {
                width: '400px'
            },
            theme: {
                color: '#0081ff',
            },
            layVerify: "required",
            radio: true,
            filterable: true
        })

        var classList = xmSelect.render({
            el: '#classList',
            tips: '请选择节次',
            style: {
                width: '400px'
            },
            theme: {
                color: '#0081ff',
            },
            on: function (data) {
                var arr = data.arr;
                let result = [];
                for (let i = 0; i < arr.length; i++) {
                    result.push(arr[i].value)
                }
                labRoomList(obj.termId, $('#interest').val(), result.join(), weeklist.getValue('valueStr'), "", false)
            }
        })

        let labroom = xmSelect.render({
            el: '#lab',
            tips: '请选择房间',
            style: {
                width: '400px'
            },
            theme: {
                color: '#0081ff',
            },
            filterable: true
        })
        let weeklist = xmSelect.render({
            el: '#weedayList',
            tips: '请选择周次',
            style: {
                width: '400px'
            },
            theme: {
                color: '#0081ff',
            },
            on: function (data) {
                var arr = data.arr;
                let result = [];
                for (let i = 0; i < arr.length; i++) {
                    result.push(arr[i].value)
                }
                labRoomList(obj.termId, $('#interest').val(), classList.getValue('valueStr'), result.join(), "", false)
            }
        })

        console.log(obj)
        // detail

        // 授课教师渲染
        $.ajax({
            url: labRoomHost + '/api/user/apiUserListBySelect',
            type: 'POST',
            async: false,
            data: {
                userRole: 1,
                academyNumber: $.cookie("academyNumber"),
                search: ""
            },
            success: function (res) {

                let data = res.results;
                let arr = [];
                if (data) {
                    arr = data.map((v, i) => {
                        if (v.text.indexOf(obj.teachers) !== -1) {
                            return { "name": v.text, "value": v.id, "selected": true}
                        } else {
                            return { "name": v.text, "value": v.id}
                        }
                    })
                }
                teacher.update({
                    data: arr
                })

            }
        })

        // 星期渲染
        form.val('creditcardrecordsattendcebox', {
            "interest": obj.weekday
        })
        // 节次渲染
        $.ajax({
            url: labRoomHost + '/api/timetable/common/apiClassListBySelect',
            type: 'POST',
            data: {
                "termId": obj.termId
            },
            success: function (res) {
                let data = res.results;
                let arr = [];
                if (data) {
                    arr = data.map(v => {
                        if (v.text.indexOf('第') !== -1) {
                            if (v.id >= obj.startClass && v.id <= obj.endClass) {
                                return { "name": v.text, "value": v.id, "selected": true}
                            } else {
                                return { "name": v.text, "value": v.id}
                            }
                        } else {
                            if (v.id >= obj.startClass && v.id <= obj.endClass) {
                                return { "name": "第" + v.text + "节", "value": v.id, "selected": true}
                            } else {
                                return { "name": "第" + v.text + "节", "value": v.id}
                            }

                        }
                    })
                }
                classList.update({
                    data: arr
                })
            }
        })

        // 实验室渲染
        labRoomList(obj.termId, obj.weekday, calculateSum(obj.startClass, obj.endClass).join(), '', obj.labInfo, true)

        // 周次

        weekList(obj.weekday, obj.startWeek, obj.endWeek, true)

        //
        form.on('select(interest)', function (data) {
            let val = data.value;
            labRoomList(obj.termId, val, classList.getValue('valueStr'), weeklist.getValue('valueStr'), "", false);
            weekList(obj.weekday, '', '', false)
        })

        function labRoomList(termId, weekday, classes, weeks, labInfo, status) {
            $.ajax({
                url: labRoomHost + '/api/labroom/apiLabRoomListBySelect',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    term: termId,
                    weekday: weekday,
                    classes: classes,
                    weeks: weeks,
                    soft: ""
                }),
                success: function (res) {
                    let data = res.results.map(v => {
                        if (v.text.indexOf(labInfo.slice(0, 3)) !== -1 && status) {
                            return { "value": v.id, "name": v.text, "selected": true}
                        } else {
                            return { "value": v.id, "name": v.text}
                        }

                    })
                    labroom.update({
                        data: data
                    })
                }
            })
        }
        function weekList(weekday, startWeek, endWeek, status) {
            $.ajax({
                url: labRoomHost + '/api/timetable/common/apiWeekListBySelect',
                type: 'POST',
                contentType: "application/json",
                data: JSON.stringify({
                    term: obj.termId,
                    weekday: weekday,
                }),
                success: function (res) {
                    let data = res.results.map(v => {
                        if (v.text.indexOf('第') !== -1) {
                            if (v.id >= startWeek && v.id <= endWeek && status) {
                                return { "value": v.id, "name": v.text, "selected": true }
                            } else {
                                return { "value": v.id, "name": v.text }
                            }

                        } else {
                            if (v.id >= startWeek && v.id <= endWeek && status) {
                                return { "value": v.id, "name": "第" + v.text + "周", "selected": true }
                            } else {
                                return { "value": v.id, "name": "第" + v.text + "周" }
                            }

                        }
                    });
                    weeklist.update({
                        data: data
                    })
                }
            })
        }
        $('.exportData').on('click', function () {
            console.log(1)

            let arr = new Object();
            arr.courseNo = obj.courseNo;
            arr.courseDetailNo = obj.courseDetailNo;
            arr.groupId = obj.groupId;
            arr.weeks = weeklist.getValue('valueStr').split(',');
            arr.weekday = $('#interest').val();
            arr.sameNumberId = obj.sameNumberId;
            arr.status = 11;
            arr.createdBy = $.cookie("currUser");
            arr.timetableStyle = timetableStyle;
            arr.tearchs = teacher.getValue('valueStr').split(',');
            arr.term = obj.termId;
            arr.submitNum = 1;
            arr.adjustStatus = 1;
            arr.tutors = obj.tutors.split(',');
            arr.items = obj.items.split(',');
            arr.labRoomIds = labroom.getValue('valueStr').split(',');
            arr.classes = classList.getValue('valueStr').split(',');
            arr.adjustWeek = obj.endWeek
            let arrs = JSON.stringify(arr);
            $.ajax({
                url: labRoomHost + '/api/timetable/adjust/apiTimetableAdjustEnd',
                type: 'POST',
                async: false,
                contentType: 'application/json;charset=utf-8',
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", getJWTAuthority($.cookie("currUser")));
                },
                data: arrs,
                success: function (json) {
                    var index = parent.layer.getFrameIndex(window.name);
                    parent.layer.close(index);
                    parent.layer.msg('坐班调整完成');
                    parent.location.reload();

                    //成功的时候记录一个状态，在点击调课完成时状态取消
                    $.cookie("arrangingStatus", 1)
                }
            })
        })

    }

    // let c = calculateSum(2, 2)
    // console.log(c)
    function calculateSum(m, n) {
        let arr = [];
        for (let i = m; i <= n; i++) {
            if (i <= n) {
                arr.push(i)
            }
        }
        return arr
    }
})