layui.use(['layer', 'form', 'laydate', 'laypage'], function () {
    var layer = layui.layer,
        form = layui.form,
        laydate = layui.laydate,
        laypage = layui.laypage;

    // 答疑内容
    // setContent();

    // 新建计划
    // 1、 先选导师
    // 2、根据导师显示当前导师所拥有的课程
    // 3、学生名单默认全部，当课程名称发生变化时立即出发名单变化
    // 课程内容
    var course = xmSelect.render({
        el: '#course',
        style: {
            width: '400px'
        },
        theme: {
            color: '#0081ff'
        },
        filterable: true,
        on: function (data) {
            // var change = data.change;
            // var arr = data.arr;
            // // 变化就出发
            // let val = []
            // for (let i = 0; i < arr.length; i++) {
            //     val.push(arr[i].courseNo)
            // }
            // setStudent(val.join(','));
        },
        data: []
    })

    function setTeacher(val) {
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
            filterable: true,
            remoteSearch: true,
            on: function(data){
                var change = data.change;
                var arr = data.arr;
                if (change.length !== 0) {
                    setCourse(change[0].value)
                    $.cookie('teacher', arr[0].value)
                }
            },
            remoteMethod: function (val, cb, show) {
                $.ajax({
                    url: labRoomHost + '/api/user/apiUserListBySelect',
                    type: 'POST',
                    async: false,
                    data: {
                        userRole: 1,
                        academyNumber: $.cookie("academyNumber"),
                        search: val
                    },
                    success: function (res) {
                        let data = res.results;
                        let arr = [];
                        if (data) {
                            arr = data.map((v, i) => {
                                if (v.id == $.cookie("currUser")) {
                                    return { "name": v.text, "value": v.id, "selected": true}
                                } else {
                                    return { "name": v.text, "value": v.id}
                                }
                            })
                            cb(arr)
                        } else {
                            cb([])
                        }
                    }
                })
            }
        });
        return teacher
    }
    let teacher_vm = setTeacher()
    // setCourse()

    let student_vm = setStudent()
    // 学期
    let semester_vm = {};
    if ($.cookie('teacher')) {
        semester_vm = setSemester(setCourse, $.cookie('teacher'), true);
    } else {
        semester_vm = setSemester(setCourse, $.cookie('currUser'), true);
    }
    function setCourse(val, termId){
        // 课程初次不需要渲染
        if (val) {
            $.ajax({
                url: datashareHost + '/openapi/getSchoolCourseList',
                type: 'POST',
                async: false,
                contentType: 'application/json',
                data: JSON.stringify({
                    "page": 1,
                    "limit": 9999,
                    "search": val
                }),
                dataType: 'json',
                success: function (res) {
                    let data = res.data;
                    let term = ''

                    if (termId) {
                        term = termId;
                    } else {
                        term = semester_vm.vm.getValue()[0].id;
                    }
                    let result = data.filter(v => v.courseApp != "2" && v.courseApp != "1" && v.termId == parseInt(term)).map(v => {
                        return {"value": v.courseNo, "name": v.courseName + "(" + v.courseNo + ")", "courseNo": v.courseNo}
                    });
                    course.update({
                        data: duplicateRemoval(result)
                    })
                }
            })
        }

    }



    // setCourse()
    /*
     * 导师
     */
    if ($.cookie("currUser")) {
        setCourse($.cookie("currUser"))
    }
    function setStudent(search) {
        var student = xmSelect.render({
            el: '#student',
            style: {
                width: '400px'
            },
            theme: {
                color: '#0081ff',
            },
            //配置搜索
            filterable: true,
            //配置远程分页
            paging: true,
            pageRemote: true,
            //数据处理
            remoteMethod: function(val, cb, show, pageIndex){
                let seaVal = '';
                if (search) {
                    seaVal = search
                } else {
                    seaVal = val;
                }
                $.ajax({
                    url: datashareHost + '/getUserList',
                    type: 'GET',
                    data: {
                        page: pageIndex,
                        limit: 10,
                        search: seaVal
                    },
                    dataType: 'json',
                    success: function (res) {
                        let data = res.data;
                        let result = data.map(v => {
                            return { "value": v.username, "name": v.cname }
                        })
                        let page = Math.ceil(res.count / 10);
                        cb(result, page)
                        form.render()
                    },
                    error: function (res) {
                        cb([], 0)
                    }
                })
            }
        })
        return student;
    }


    // 新建计划结束 时间安排开始

    let json = {};
    $.ajax({
        url: labRoomHost + '/api/common/config/apiPlatformConfigInfo',
        type: 'POST',
        async: false,
        data: {
            modelType: "timetable"
        },
        headers: { "x-datasource": getCookie("datasource.cookie")},
        success: function (res) {
            json = res;
            if (res.studentModel === "COURSE") {
                $('#course').closest('.layui-inline').css("display", "inline-block")
            } else if (res.studentModel === "SELF") {
                $('#student').closest('.layui-inline').css("display", "inline-block")
            }
        }
    })

    // 新建计划文字
    function setHtmlT(name, val) {
        let htmlT = `<div class="layui-form-item layui-col-md6 input_show">
                    <label class="layui-form-label">${name}:</label>
                    <div class="layui-input-inline">
                      <input style="border: none; width: 400px" type="text" name="title" required  lay-verify="required" placeholder="${val}" title="${val}" value="${val}" autocomplete="off" class="layui-input" readonly>
                    </div>
                  </div>`;
       return htmlT;
    }
    // 新建计划保存
    $('.exportData').on('click', function () {
        let teacher = teacher_vm.getValue('valueStr');
        let course1 = course.getValue('valueStr');
        let semester = semester_vm.vm.getValue('valueStr');
        let type = $("select[name=courseApp]").val();

        //校验非空
        if (teacher == '') {
            layer.msg('请选择课程导师');
            return false;
        }
        if (semester == '') {
            layer.msg('请选择学期信息');
            return false;
        }
        if (type == '') {
            layer.msg('请选择课程类型');
            return false;
        }
        if (course1 == '') {
            layer.msg('请选择答疑内容');
            return false;
        }

        let courseNo = "(" + semester + ")" + "-" + type + "-" + teacher + "-" + type + "-" + (parseInt(Math.random() * 900 + 100 , 10));
        // uploadSchoolCourseStudentByDTO

        let ss = [];
        if (course1) {
            ss.push({
                "courseNo": courseNo,
                "courseNumber": type,
                "teacher": teacher,
                "termNumber": semester,
                "academyNumber": $.cookie("academyNumber"),
                "schoolCourseExpandDTO": {
                    "courseApp": type
                },
                "createTime": renderTime(new Date()),
                "creator": $.cookie("currUser"),
                "oldCourseNo": course1
            })
        } else {
            ss.push({
                "courseNo": courseNo,
                "courseNumber": type,
                "teacher": teacher,
                "termNumber": semester,
                "academyNumber": $.cookie("academyNumber"),
                "schoolCourseExpandDTO": {
                    "courseApp": type
                },
                "createTime": renderTime(new Date()),
                "creator": $.cookie("currUser")
            })
        }
        c(ss)
    })
    function c(data) {
        let index = layer.load(1, {
            shade: [0.1,'#fff'], //0.1透明度的白色背景
            content: '正在导入教学班数据请稍后...',
            success: function (layero) {
                layero.find('.layui-layer-content').css({
                    'padding-top': '40px',//图标与样式会重合，这样设置可以错开
                    'width': '200px'//文字显示的宽度
                });
            }
        });

        $.ajax({
            url: datashareHost + '/openapi/uploadSchoolCourseByDTO',
            type: 'POST',
            // async: false,
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (res) {
                // teacher_vm.update({ disabled: true });
                // semester_vm.vm.update({ disabled: true });
                // course.update({ disabled: true });
                // $("select[name=courseApp]").attr("disabled", 'disabled')

                // form.render('select')
                // $.cookie("saveData", JSON.stringify(data));
                if (res.code == 0) {
                    let student = student_vm.getValue('valueStr');
                    // if (res1.code == 0) {
                        $.cookie("saveData", JSON.stringify(data));
                    // }
                    // $('.exportData').css('display', 'none')
                    if (!data[0].oldCourseNo) {
                        let index_student = layer.load(1, {
                            shade: [0.1,'#fff'], //0.1透明度的白色背景
                            content: '正在导入学生信息请稍后...',
                            success: function (layero) {
                                layero.find('.layui-layer-content').css({
                                    'padding-top': '40px',//图标与样式会重合，这样设置可以错开
                                    'width': '200px'//文字显示的宽度
                                });
                            }
                        });
                        $.ajax({
                            url: datashareHost + '/openapi/uploadSchoolCourseStudentByDTO',
                            type: 'POST',
                            contentType: 'application/json',
                            data: JSON.stringify([{
                                "studentNumber": student,
                                "courseNo": data[0].courseNo,
                                "createTime": renderTime(new Date()),
                                "creator": $.cookie("currUser")
                            }]),

                            success: function (res1) {
                                layer.msg(res1.msg)
                                if (res1.code == 0) {
                                    $('.text_content').find('.layui-col-md12').css('display', 'none');

                                    $('.text_content').append( setHtmlT('导师', teacher_vm.getValue('nameStr')));
                                    $('.text_content').append( setHtmlT('学期', semester_vm.vm.getValue('nameStr')));
                                    $('.text_content').append( setHtmlT('类型', $("select[name=courseApp]").find('option:selected').text()));

                                    if (json.studentModel === "COURSE") {
                                        $('.text_content').append( setHtmlT('答疑内容', course.getValue('nameStr')));
                                    }
                                    if (json.studentModel === "SELF") {
                                        $('.text_content').append( setHtmlT('学生名单', student_vm.getValue('nameStr')));
                                    }

                                    $('.exportData').css('display', 'none')
                                }
                            },
                            complete: function () {
                                layer.close(index_student);
                            }
                        })
                    } else {
                        $('.text_content').find('.layui-col-md12').css('display', 'none');

                        $('.text_content').append( setHtmlT('导师', teacher_vm.getValue('nameStr')));
                        $('.text_content').append( setHtmlT('学期', semester_vm.vm.getValue('nameStr')));
                        $('.text_content').append( setHtmlT('类型', $("select[name=courseApp]").find('option:selected').text()));

                        if (json.studentModel === "COURSE") {
                            $('.text_content').append( setHtmlT('答疑内容', course.getValue('nameStr')));
                        }
                        if (json.studentModel === "SELF") {
                            $('.text_content').append( setHtmlT('学生名单', student_vm.getValue('nameStr')));
                        }

                        $('.exportData').css('display', 'none')
                    }

                } else {
                    layer.msg(res.msg)
                }
            },
            complete: function (XHR, TS) {
                layer.close(index)
            }
        })
    }


    // let json = {
    //     "school": null,
    //     "requiredItemSelect": false,
    //     "singleSelectFromTeacher": true,
    //     "batchSaveTimetable": true,
    //     "requiredSoftManage": true,
    //     "requiredVirtualImage": true,
    //     "requiredTimetableStation": true,
    //     "studentModel": null,
    //     "timetableModel": 'WEEKDAY_TIME_WEEK'
    // }
    // timetableModel
    // 1、WEEKDAY_WEEK_CLASS:星期周次节次
    // * 2、DATETIME:日期时间
    // * 3、WEEKDAY_TIME_WEEK:星期时间周次
    // labRoomParams.term = $("#term").val();
    // labRoomParams.weekday = weekDayList;
    // labRoomParams.classes = classList;
    // labRoomParams.weeks = "";
    // labRoomParams.soft = "";
    // labRoomParams.role = role;
    // labRoomParams.createdBy = username;

    // 周次
    let weeklist = xmSelect.render({
        el: '#weedayList',
        tips: '请选择周次',
        style: {
            width: '400px'
        },
        theme: {
            color: '#0081ff',
        }
    })
    function setWeekList(term, weekday) {
        $.ajax({
            url: labRoomHost + '/api/timetable/common/apiWeekListBySelect',
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify({
                term: term,
                weekday: weekday,
            }),
            success: function (res) {
                let data = res.results.map(v => {
                    if (v.text.indexOf('第') !== -1) {
                        return { "value": v.id, "name": v.text }
                    } else {
                        return { "value": v.id, "name": "第" + v.text + "周" }
                    }
                });
                weeklist.update({
                    data: data
                })
            }
        })

    }
    // 星期监听
    form.on('select(interest)', function(data){
        let val = data.value;
        // 潘崇过后的周次接口
        setWeekList(semester_vm.vm.getValue()[0].id, val)
    });

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
    //节次
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
            var arr = data.arr
            let res = [];
            for (let i = 0; i < arr.length; i++) {
                res.push(arr[i].value)
            }
            $.ajax({
                url: labRoomHost + '/api/labroom/apiLabRoomListBySelect',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    term: semester_vm.vm.getValue()[0].id,
                    weekday: '2',
                    classes: res.join(','),
                    weeks: "4",
                    soft: ""
                }),
                success: function (res) {
                    let data = res.results.map(v => {
                        return { "value": v.id, "name": v.text}
                    })
                    labroom.update({
                        data: data
                    })
                }
            })
        }
    });
    setClassList()
    function setClassList(termId) {

        $.ajax({
            url: labRoomHost + '/api/timetable/common/apiClassListBySelect',
            type: 'POST',
            data: {
                "termId": 1
            },
            success: function (res) {
                let data = res.results;
                let arr = [];
                if (data) {
                    arr = data.map(v => {
                        if (v.text.indexOf('第') !== -1) {
                            return { "name": v.text, "value": v.id}
                        } else {
                            return { "name": "第" + v.text + "节", "value": v.id}
                        }
                    })
                }
                classList.update({
                    data: arr
                })
            }
        })
    }

    if (json.timetableModel == 'WEEKDAY_WEEK_CLASS') {

    }
    if (json.timetableModel == 'DATETIME') {

        $('#interest, #weedayList, #time_input, #classList').closest('.layui-form-item').css('display', 'none');
        $('#date_input, #time_input').closest('.layui-form-item').css('display', 'block');
        laydate.render({
            elem: '#date_input',
            done: function (value, date, endDate) {
                let weekday = weekDay(value)
                let classes = $('#time_input').val();
                if (classes) {
                    // 计算节次
                    setLabRoom(weekday, getClasses(classes).join(','))
                } else {
                    setLabRoom(weekday, '')
                }
            }
        });
        laydate.render({
            elem: '#time_input'
            ,type: 'time'
            ,range: true
            ,format: 'HH:mm:ss',
            value: '00:00:00 - 23:00:00',
            done: function (value, date, endDate) {
                let weekday = $('#date_input').val();
                if (weekday) {
                    setLabRoom(weekDay(weekday), getClasses(value).join(','))
                } else {
                    setLabRoom('', getClasses(value).join(','))
                }

            }
        });
    }
    if (json.timetableModel == 'WEEKDAY_TIME_WEEK') {
        $('#weedayList, #interest, #time_input').closest('.layui-form-item').css('display', 'block');
        $('#classList, #date_input').closest('.layui-form-item').css('display', 'none');
        laydate.render({
            elem: '#time_input'
            ,type: 'time'
            ,range: true
            ,format: 'HH:mm:ss',
            value: '00:00:00 - 23:00:00',
            done: function (value, date, endDate) {

                console.log(endDate)
                let weekday = $('#interest').val();
                if (weekday) {
                    setLabRoom(weekday, getClasses(value).join(','))
                } else {
                    setLabRoom('', getClasses(value).join(','))
                }

            }
        });
    }
    getTimeList()
    function getTimeList(){

    }
    // 房间号设置
    function setLabRoom(weekday, classes) {
        $.ajax({
            url: labRoomHost + '/api/labroom/apiLabRoomListBySelect',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                term: semester_vm.vm.getValue()[0].id,
                weekday: weekday,
                classes: classes,
                weeks: "",
                soft: ""
            }),
            success: function (res) {
                let data = res.results.map(v => {
                    return { "value": v.id, "name": v.text}
                })
                labroom.update({
                    data: data
                })
            }
        })
    }

    // $(function () {
    //     setWeekList(semester_vm.vm.getValue()[0].id, $("select[name=interest]").val())
    // })

    $('.newTimeData').on('click', function () {

        let data = {};
        if (!$.cookie("saveData")) {
            layer.msg('请先保存新建计划');
            return false;
        }
        let c =  JSON.parse($.cookie("saveData"));
        if (json.timetableModel == 'WEEKDAY_WEEK_CLASS') {
            data = {
                "courseNo": c[0].courseNo,
                "termId": semester_vm.vm.getValue()[0].id,
                "weekday": $("select[name=interest]").val(),
                "weeks": weeklist.getValue('valueStr'),
                "sections": classList.getValue('valueStr'),
                "rooms": labroom.getValue('valueStr'),
                "teacher": c[0].teacher,
                "info": ""
            }
            saveData(data, c[0].courseNo)
        }
        if (json.timetableModel == 'DATETIME') {

            let dataDate = $('#date_input').val();
            // 星期
            if (dataDate) {
                data["weekday"] = weekDay(dataDate)
            }
            // 节次
            let dataTime = $('#time_input').val();
            let section = []
            if (dataTime) {
                let timeData = [];
                $.ajax({
                    url: datashareHost + '/openapi/getSchoolTimeList',
                    type: 'GET',
                    async: false,
                    success: function (res) {
                        timeData = res.data;
                    }
                })
                let data1 = dataTime.split(' - ');


                for (let i = 0; i < timeData.length; i++) {
                    if (isDateTimes(timeData[i].sectionStartDate, data1[0], timeData[i].sectionEndDate, data1[1])) {
                        section.push(timeData[i].section)
                    }
                }
                // 房间号
            }
            data["sections"] = section.join(',');
            data["rooms"] = labroom.getValue('valueStr');
            data["teacher"] = c[0].teacher
            data["weeks"] = '';
            data["termId"] = semester_vm.vm.getValue()[0].id;
            data["courseNo"] = c[0].courseNo;
            data["info"] = JSON.stringify({ startDate: dataDate + " " + dataTime.split(" - ")[0], endDate: dataDate + " " + dataTime.split(" - ")[1]})
            saveData(data, c[0].courseNo)
        }
        if (json.timetableModel == 'WEEKDAY_TIME_WEEK') {
            // 节次
            let dataTime = $('#time_input').val();
            let section = []
            if (dataTime) {
                let timeData = [];
                $.ajax({
                    url: datashareHost + '/openapi/getSchoolTimeList',
                    type: 'GET',
                    async: false,
                    success: function (res) {
                        timeData = res.data;
                    }
                })
                let data1 = dataTime.split(' - ');


                for (let i = 0; i < timeData.length; i++) {
                    if (isDateTimes(data1[0], timeData[i].sectionStartDate, data1[1], timeData[i].sectionEndDate)) {
                        section.push(timeData[i].section)
                    }
                }
                // 房间号
            }
            data = {
                "courseNo": c[0].courseNo,
                "termId": semester_vm.vm.getValue()[0].id,
                "weekday": $("select[name=interest]").val(),
                "weeks": weeklist.getValue('valueStr'),
                "rooms": labroom.getValue('valueStr'),
                "teacher": c[0].teacher,
                "sections": Array.from(new Set(section)).join(','),
                "info": JSON.stringify({ startDate: dataTime.split(" - ")[0], endDate: dataTime.split(" - ")[1]})
            }
            saveData(data, c[0].courseNo)
        }
    })

    function setList(termId, page, limit, callback) {
        $('#plan_list').empty();
        $.ajax({
            url: labRoomHost + '/api/timetable/common/apiViewTimetableInfo',
            type: 'POST',
            async: false,
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", getJWTAuthority($.cookie("currUser")));
            },
            data: {
                "courseNo": callback,
                "groupId": ""
            },
            success: function (res) {
                $('#list').css('display', 'block');
                let data = res.rows;
                for (let i = 0; i < data.length; i++) {
                    let str = ''
                    if (data[i].info) {
                        str = JSON.parse(data[i].info)
                    }
                    if (json.timetableModel == 'WEEKDAY_WEEK_CLASS') {
                        $('#plan_list').closest('table').show()
                        let tr = `<tr>
                                <td>${data[i].weekday}</td>
                                <td>${data[i].startWeek}-${data[i].endWeek}</td>
                                <td>${data[i].startClass}-${data[i].endClass}</td>
                                <td>${data[i].labInfo}</td>
                                <td>${data[i].teachers}</td>
                                <td><button type="button" class="layui-btn layui-btn-primary layui-border-red" onclick="deleteTimetableByBySameNumberId(${data[i].sameNumberId}, '${callback}')">删除</button></td>
                              </tr>`;
                        $('#plan_list').append(tr);
                    }
                    if (json.timetableModel == 'DATETIME') {
                        $('#plan_list1').closest('table').show();
                        let tr = `<tr>
                                <td>${data[i].weekday}</td>
                               ${str ? '<td>' + str.startDate + ' ~ ' + str.endDate + '</td>' : '<td></td>'}
                                <td>${data[i].labInfo}</td>
                                <td>${data[i].teachers}</td>
                                <td><button type="button" class="layui-btn layui-btn-primary layui-border-red" onclick="deleteTimetableByBySameNumberId(${data[i].sameNumberId}, '${callback}')">删除</button></td>
                              </tr>`;
                        $('#plan_list1').append(tr);
                    }
                    if (json.timetableModel == 'WEEKDAY_TIME_WEEK') {
                        $('#plan_list2').closest('table').show();
                        let tr = `<tr>
                                <td>${data[i].weekday}</td>
                                <td>${data[i].startWeek}-${data[i].endWeek}</td>
                                ${str ? '<td>' + str.startDate + ' ~ ' + str.endDate + '</td>' : '<td></td>'}
                                <td>${data[i].labInfo}</td>
                                <td>${data[i].teachers}</td>
                                <td><button type="button" class="layui-btn layui-btn-primary layui-border-red" onclick="deleteTimetableByBySameNumberId(${data[i].sameNumberId}, '${callback}')">删除</button></td>
                              </tr>`;
                        $('#plan_list2').append(tr);
                    }

                }
                if (data.length == 0 || !data) {
                    let table = `<tr><th colspan="6" style="text-align: center">无数据</th></tr>`;
                    $('#plan_list').append(table);
                }
                setPage(page, limit, res.total, termId)

            }
        })
    }

    function saveData(data, callback) {
        $.ajax({
            url: labRoomHost + '/api/timetable/put/in-class-timetableAppointments',
            type: 'post',
            contentType: 'application/json',
            async: false,
            headers: { "x-datasource": getCookie("datasource.cookie")},
            data: JSON.stringify(data),
            success: function (res) {
                if (res.msg == "success") {
                    layer.msg('保存成功');
                    // 表单清空
                    $('#interest').val("");
                    weeklist.setValue([ ]);
                    $('#time_input').val('');
                    labroom.setValue([ ]);
                    $('#date_input').val('');
                    classList.setValue([ ]);
                    form.render('select');
                } else {
                    layer.msg(res.msg)
                }
                setList(semester_vm.vm.getValue()[0].id, 0, 10, callback)
            }
        })
    }
    function setWeek(startWeek, endWeek) {
        let str = ''
        if (startWeek == endWeek) {
            str += endWeek;
        } else {
            str = startWeek + endWeek;
        }
        return str;
    }
    // 删除
    window.deleteTimetableByBySameNumberId = function (id, termId) {
        $.ajax({
            url: labRoomHost + '/api/timetable/manage/apiDeleteTimetableBySameNumberId',
            type: 'post',
            dataType: 'json',
            async: false,
            data: { "id": id},
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", getJWTAuthority($.cookie("currUser")));
            },
            success: function (res) {
                layer.msg('已删除');
                setList(termId, 0, 10, termId)
            }
        })
    }
    // 获取周次-节次-星期-房间号
    // 分页
    function setPage(page, limit, count, termId) {
        // if (page === 0)
        page += 1;
        // 分页偏移量计算
        page = Math.ceil(page / limit);
        laypage.render({
            elem: 'page',
            count: count,
            first: '首页',
            last: '尾页',
            limit: limit,
            curr: page,
            prev: '<em>←</em>',
            next: '<em>→</em>',
            theme: '#1E9FFF',
            layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
            jump: function(obj, first) {
                obj.curr = Number(obj.curr) - 1;
                if (!first){
                    setList(termId, obj.curr * obj.limit, obj.limit)
                }
            }
        });
    }
})