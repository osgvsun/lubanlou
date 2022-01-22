layui.use(['layer', 'form', 'laypage'], function () {
    var layer = layui.layer,
        form = layui.form,
        laypage = layui.laypage;

    let currUser = ''; //当前登录人
    let academyNumber = ''; //当前登录人所在的学院
    let permissions = ''; // 权限
    let currauth = $.cookie("currauth");
    // 读取默认配置
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
            json = res.timetableModel;
        }
    })
    // 1、WEEKDAY_WEEK_CLASS:星期周次节次
    // * 2、DATETIME:日期时间
    // * 3、WEEKDAY_TIME_WEEK:星期时间周次

    // 学期
    let semester = setSemester();
    $.ajax({
        url: '../openReservation/getCurrentUser',
        type: 'GET',
        async: false,
        success: function (res) {
            let data = res;
            currUser = data.username;
            $.cookie("currUser", currUser)
            // data.schoolAcademy = {
            //     academyName: "经济管理学院",
            //     academyNumber: "0101",
            //     academyType: null,
            //     createTime: null,
            //     creator: null,
            //     isVaild: null,
            //     updateTime: null,
            //     updater: null,
            // }
            // console.log(data.schoolAcademy.academyNumber)
            $.cookie("academyNumber", data.schoolAcademy.academyNumber)
            if (data.schoolAcademy) {
                academyNumber = data.schoolAcademy.academyNumber;
            }
            permissions = data.authorityMap.GvsunLims;
        }
    })
    if ($.cookie("currentauthName")) {
        $('.changeAuth').text("切换权限(" + $.cookie("currentauthName") + ")")
    }
    let arrType = []
    $.ajax({
        url: labRoomHost + '/api/common/c_dictionary',
        type: 'GET',
        async: false,
        headers: { "x-datasource": getCookie("datasource.cookie")},
        data: { "category": "category_timetable_course_app"},
        success: function (res) {
            let data = res.data;
            if (data) {
                data = data.map(v => {
                    return { value: v.cnumber, name: v.cname }
                })
            } else {
                data = []
            }
            arrType = duplicateRemoval(data)
            // for (let i = 0; i < arr.length; i++) {
            //     let option = `<option value="${arr[i].value}">${arr[i].name}</option>`;
            //     $('#type').append(option);
            //     form.render('select');
            // }
        }
    })
    let answerType = xmSelect.render({
        el: '#type',
        tips: '请选择类型',
        style: {
            width: '200px'
        },
        theme: {
            color: '#0081ff',
        },
        // initValue: [0, 1],
        filterable: true,
        data: arrType
    });

    if (currauth == 'STUDENT') {
        $('.newAdd').css('display', 'none')
        let type = answerType.getValue('valueStr');
        if (!type) {
            type = '0,1';
        }
        //学生选课列表接口
        setStuList(semester.init, '', 0, 10, type);
        // setStuList('1003', '', 0, 10, type);
        $('#student').css('display', 'table');
    } else {
        let type = answerType.getValue('valueStr');
            if (!type) {
                type = '0,1';
            }
        setCourse(semester.init, '', 0, 10, type);
        // setCourse('1003', '', 0, 10, type);

        $('#other').css('display', 'table');
    }
    $('.changeAuth').on('click', function () {
        var str = '';
        str += '<div class="layui-form">';
        $.each(permissions,function (index,item) {
            if(currauth == item.name){
                str+=' <input type="radio" name="auth" value="'+ item.name +'" title="'+ item.cname +'" checked="">'
            }else{
                str += ' <input type="radio" name="auth" value="'+ item.name +'" title="'+ item.cname +'">'
            }

        });
        // form.render();
        str += '</div>';
        layer.confirm(str,{
            btn: ['确定'],
            title : '请选择权限',
            closeBtn :0,//不显示关闭按钮
            area:['800px','250px'],
            offset: '400px',
            success: function(){
                form.render();
            },
            btn1: function (index) {
                $.cookie("currauth",$("input[name='auth']:checked").val());
                $.cookie("currentauthName", $("input[name='auth']:checked").attr("title"));
                window.location.reload()
            }
        });
    })
    // 权限弹窗
    if (!currauth) {
        var str = '';
        str += '<div class="layui-form">';
        $.each(permissions,function (index,item) {
            if(currauth == item.name){
                str+=' <input type="radio" name="auth" value="'+ item.name +'" title="'+ item.cname +'" checked="">'
            }else{
                str += ' <input type="radio" name="auth" value="'+ item.name +'" title="'+ item.cname +'">'
            }

        });
        // form.render();
        str += '</div>';
        layer.confirm(str,{
            btn: ['确定'],
            title : '请选择权限',
            closeBtn :0,//不显示关闭按钮
            area:['800px','250px'],
            offset: '400px',
            success: function(){
                form.render();
            },
            btn1: function (index) {
                $.cookie("currauth",$("input[name='auth']:checked").val());
                $.cookie("currentauthName", $("input[name='auth']:checked").attr("title"));
                window.location.reload()
            }
        });
    }

    // 答疑内容
    function setStuList(termId, search, page, limit, type) {
        $('#table_list').empty();
        $.ajax({
            url: labRoomHost + '/api/timetable/student/apiStuCourseByPage',
            type: 'POST',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify({
                "offset": page,
                "limit": limit,
                "termId": termId,
                "order": "asc",
                "role": currauth,
                "academyNumber": academyNumber,
                "createdBy": currUser,
                "search": search,
                "courseApp": type
            }),
            success: function (res) {
                // table_list
                let data  = res.rows;
                for (let i = 0; i < data.length; i++) {
                    let table = `<tr>
                                <td>${i + 1}</td>
                                <td>${data[i].courseName}</td>
                                <td colspan="4">
                                    <table frame="void" class="inTable">
                                    ${setInfo(data[i].timetableBatchDTOS, data[i].timetableDTOs)}
                                    </table>
                                </td>
                             </tr>`;
                    $('#table_list').append(table);
                }
                if (data.length == 0 || !data) {
                    let table = `<tr><th colspan="6" style="text-align: center">无数据</th></tr>`;
                    $('#table_list').append(table);
                }
                setPage(page, limit, res.total, termId, search, 1);

            }
        })
    }
    // ${setCourseStu(data[i].timetableBatchDTOS)}
    // 在时间范围之内
    // selected 1 退选
    // 2 选定组数已达上限
    // 3 名额已满
    // 其他 选定

    // 不在时间内
    // 1 选定
    // 当前时间大于结束时间
    // 已结束
    // 当前时间小于开始时间
    // 未开始

    // 坐班信息
    function setInfo(obj, timeTableObj) {
        let str = '';
        for (let i = 0; i < obj.length; i++) {
            for (let j = 0; j < obj[i].timetableGroupDTOs.length; j++) {
                let data = obj[i].timetableGroupDTOs[j].timetables;
                for (let k = 0; k < data.length; k++) {
                    str += `<tr>
                                <td width="90px">${data[k].teachers}</td>
                                <td width="200px">${data[k].labInfo}</td>
                                <td width="200px">${courseStuPlans(data[k])}</td>
                                <td>${setSelect(obj[i].startDate, obj[i].endDate, obj[i].timetableGroupDTOs[j].selected, data[k].groupId, data.length)}</td>
                            </tr>`;
                }
            }
        }
        return str;
    }

    // 操作
    function setSelect(start, end, status, groupId, len) {
        let currTime = new Date();
        let startTime = new Date(start);
        let endTime = new Date(end)
        if (currTime > startTime && currTime < endTime) {
            if (status == 1) {
                return `<button class="layui-btn layui-btn-warm layui-btn-sm" type="button" onclick="dropGroupStudent(${groupId})">退选</button>`;
            } else if (status == 2) {
                return `<span>选定组数已达上限</span>`
            } else if (status == 3) {
                return `<span>名额已满</span>`
            } else if (len == 0) {
                return `<span>未排课</span>`
            } else {
                return `<button class="layui-btn layui-btn-primary layui-btn-sm layui-border-blue" type="button" onclick="selectBatchGroup(${groupId})">选定</button>`
            }
        } else {
            if (status == 1) {
                return `<button class="layui-btn layui-btn-primary layui-btn-sm layui-border-blue" type="button">已选定</button>`
            } else if (currTime > endTime){
                return `<span>已结束</span>`
            } else if (currTime < startTime) {
                return `<span>未开始</span>`
            }
        }

    }

    // 选课
    window.selectBatchGroup = function (group) {
        layer.confirm('是否确认选择？', {
            title: '提示'
        }, function(index) {
           $.ajax({
               url: labRoomHost + '/api/timetable/manage/apiSelectBatchGroup',
               type: 'POST',
               data: {
                   "groupId": group,
                   "createdBy": currUser
               },
               beforeSend: function(request) {
                   request.setRequestHeader("Authorization", getJWTAuthority(currUser));
               },
               success: function (res) {
                   layer.close(index)
                   let search = $('.search_all').val();
                   let type = answerType.getValue('valueStr');
                   if (!type) {
                       type = '0,1';
                   }
                   setStuList(semester.vm.getValue()[0].id, search, 0, 10, type)
               }
           })
        });
    }
    // 退选
    window.dropGroupStudent = function(groupId) {
        layer.confirm('是否确认选择？', {
            title: '提示'
        }, function(index) {
            $.ajax({
                url: labRoomHost + '/api/timetable/student/apiDeleteGroupStudent',
                type: 'POST',
                data: {
                    "groupId": groupId,
                    "createdBy": currUser
                },
                beforeSend: function(request) {
                    request.setRequestHeader("Authorization", getJWTAuthority(currUser));
                },
                success: function (res) {
                    layer.close(index)
                    let search = $('.search_all').val();
                    let type = answerType.getValue('valueStr');
                    if (!type) {
                        type = '0,1';
                    }
                    setStuList(semester.vm.getValue()[0].id, search, 0, 10, type)
                }
            })
        });
    }

   $('.sureSearch').on('click', function () {
       let search = $('.search_all').val();
       let type = answerType.getValue('valueStr');
       if (!type) {
           type = '0,1';
       }
       if (currauth == 'STUDENT') {
           //学生选课列表接口
           setStuList(semester.vm.getValue()[0].id, search, 0, 10, type)
       } else {
           setCourse(semester.vm.getValue()[0].id, search, 0, 10, type)
           // setCourse(3, search, 0, 10)
       }
   })

    $('.newAdd').on('click', function () {
        var index = layer.open({
            type: 2, //此处以iframe举例
            // url: ,
            title: '新建',
            shade: 0.5,
            maxmin: true,
            content: 'newPlan',
            cancel: function () {
                $.cookie("saveData", null)
            }
        });
        layer.full(index);
    })

    if ($.cookie("currauth") != 'TEACHER' && $.cookie("currauth") != 'ACADEMYLEVELM' && $.cookie("currauth") != 'SUPERADMIN') {
        $('#other> thead ').find('tr th:last-child').remove();
        $('.newAdd').remove();
    }
    // 教师列表
    function setCourse(termId, search, page, limit, type) {
        $('#other_list').empty();
        $.ajax({
            url: labRoomHost + '/api/school/apiSchoolCourseListByPage',
            type: 'POST',
            async: false,
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", getJWTAuthority(currUser));
            },
            contentType: 'application/json',
            data: JSON.stringify({
                "offset": page,
                "limit": limit,
                "termId": termId,
                "order": "asc",
                "role": currauth,
                "modelType": "TIMETABLE_COURSE",
                "academyNumber": academyNumber,
                "createdBy": currUser,
                "search": search,
                "status": "ALL",
                "courseApp": type
            }),
            success: function (res) {
                let data = res.rows;
                for (let i = 0; i < data.length; i++) {
                    let tr = `<tr>
                            <td>${i + 1}</td>
                            <td>${data[i].courseName}</td>
                            <td>${data[i].cname}</td>
                            <td colspan="3">
                                <table frame="void" class="inTable">
                                    ${courseRow(data[i].timetableDTOs)}
                                </table>
                            </td>
                            
                            ${$.cookie("currauth") == 'TEACHER' || $.cookie("currauth") == 'ACADEMYLEVELM' || $.cookie("currauth") == 'SUPERADMIN' ? `<td><button type="button" class="layui-btn layui-btn-warm layui-btn-sm" title="编辑" onclick="definiteCourse('${data[i].courseNo}', ${data[i].timetableStyle})">编辑</button></td>` : ''}
                            
                          </tr>`;
                    $('#other_list').append(tr)
                }
                if (data.length == 0 || !data) {
                    let table = `<tr><th colspan="7" style="text-align: center">无数据</th></tr>`;
                    $('#other_list').append(table);
                }
                setPage(page, limit, res.total, termId, search, 2, type)
            }
        })
    }

    // 课程计划
    function courseStuPlans(obj) {
        let div = `<div>`;
            let str = ''
            if (obj.info) {
                str = JSON.parse(obj.info)
            }
            if (json == 'WEEKDAY_WEEK_CLASS') {
                if (obj.startWeek == obj.endWeek) {
                    div += obj.endWeek
                } else {
                    div += obj.startWeek + '-' + obj.endWeek
                }
                div += '周 星期' + obj.weekday + ' ';
                if (obj.startClass == obj.endClass) {
                    div += obj.endClass
                } else {
                    div += obj.startClass + '-' + obj.endClass
                }
            }
            if (json == 'DATETIME') {
                div += str ? str.startDate+ ' ~ ' + str.endDate : ''
            }
            if (json == 'WEEKDAY_TIME_WEEK') {
                if (obj.startWeek == obj.endWeek) {
                    div += obj.endWeek
                } else {
                    div += obj.startWeek + '-' + obj.endWeek
                }
                div += '周 星期' + obj.weekday + ' ';
                div += str ? str.startDate+ ' ~ ' + str.endDate : ''
            }

        div += '</div>'
        return div
    }
    function coursePlans(obj) {
        let str = ''
        if (obj.info) {
            str = JSON.parse(obj.info)
        }
        let div = `<div>`;
        if (json == 'WEEKDAY_WEEK_CLASS') {
            if (obj.startWeek == obj.endWeek) {
                div += obj.endWeek
            } else {
                div += obj.startWeek + '-' + obj.endWeek
            }
            div += '周 星期' + obj.weekday + ' ';
            if (obj.startClass == obj.endClass) {
                div += obj.endClassName
            } else {
                div += obj.startClassName + '-' + obj.endClassName
            }
        }
        if (json == 'DATETIME') {
            div += str ? str.startDate+ ' ~ ' + str.endDate : '';
        }
        if (json == 'WEEKDAY_TIME_WEEK') {
            if (obj.startWeek == obj.endWeek) {
                div += obj.endWeek
            } else {
                div += obj.startWeek + '-' + obj.endWeek
            }
            div += '周 星期' + obj.weekday + ' ';
            div += str ? str.startDate+ ' ~ ' + str.endDate : ''
        }

        div += '</div>'
        return div
    }

    // 已排课表
    function courseRow(obj, timetableStyle) {
        let div = ``;
        for (let i = 0; i < obj.length; i++) {
            div += `<tr>
                        <td width="190px">${obj[i].labInfo}</td>
                        <td width="190px">${coursePlans(obj[i])}</td>
                        <td style="text-align: center"><button type="button" class="layui-btn layui-btn-normal layui-btn-sm" title="查看"><a style="color: #fff" href="javascript: void(0)" onclick="schoolCourseStudents('${obj[i].groupId}', '${obj[i].courseNo}', 1)">${obj[i].groupStudents ? obj[i].groupStudents : 0 }</a> / <a style="color: #fff" href="javascript: void(0)" onclick="schoolCourseStudents('${obj[i].groupId}', '${obj[i].courseNo}')">${obj[i].groupNumbers ? obj[i].groupNumbers : 0}</a></button></td>
                    </tr>`
        }
        return div;
    }
    // 学生名单
    window.schoolCourseStudents = function (termId, courseNo, type) {
        var index = layer.open({
            type: 2,
            title: '查看学生名单',
            maxmin: true,
            shadeClose: true,
            area: ['1100px', '500px'],
            content: 'schoolCourseStudnetList?termId=' + termId + '&courseNo=' + courseNo + '&type=' + type
        });
        layer.full(index);
    }

    // 教师排课
    // function authArranging(timetableStatus, obj, termId, courseNo, timetableStyle) {
    //     let result = ``;
    //     if (timetableStatus == 2 || timetableStatus == 5) { //判断审核
    //         if (obj.publicActionAuth) {
    //             result += `<button type="button" class="layui-btn layui-btn-normal" onclick="publicTimetable(${timetableStyle}, ${courseNo}, 1)">发布</button><br>`
    //         }
    //     }
    //     if (timetableStatus == 3) { // 不需要审核或审核已完成
    //         if (obj.publicActionAuth) {
    //             result += `<button type="button" class="layui-btn layui-btn-normal" onclick="publicTimetable(${timetableStyle}, ${courseNo}, 1)">发布</button><br>`
    //         }
    //     } else if (timetableStatus == 10) {
    //         if (obj.addActionAuth) {
    //             if (timetableStyle == 1) {
    //                 result += `<button type="button" class="layui-btn layui-btn-normal" onclick="definiteCourse(${termId}, ${courseNo}, undefined, 1)">编辑</button><br>`
    //             }
    //         }
    //     }
    //     return result;
    // }
    // 发布
    // window.publicTimetable = function(timetableStyle, courseNo, status) {
    //     let arr = new Object();
    //     arr.courseNo = courseNo;
    //     arr.timetableStyle = timetableStyle;
    //     arr.status = status;
    //     arr.createdBy = currUser;
    //     let arrs = JSON.stringify(arr);
    //     $.ajax({
    //         url: labRoomHost + '/api/timetable/common/apiTimetablePublic',
    //         type: 'POST',
    //         beforeSend: function(request) {
    //             request.setRequestHeader("Authorization", getJWTAuthority(currUser));
    //         },
    //         async: false,
    //         dataType: 'json',
    //         data: arrs,
    //         success: function (res) {
    //             // if (status == 1) {
    //                 // 需要推送班排数据
    //             // }
    //             // 重新渲染列表
    //         }
    //     })
    // }
    // 编辑
    window.definiteCourse = function(courseNo, timetableStyle) {
        console.log(courseNo)
        var index = layer.open({
            type: 2,
            title: '编辑',
            maxmin: true,
            shadeClose: true,
            area: ['1100px', '500px'],
            content: 'editCource?courseNo=' + courseNo + '&timetableStyle=' + timetableStyle + '&status=' + json,
            end: function () {
                // refreshBootstrapTableLayer();
                // 渲染列表
            },
            cancel: function () {
                location.reload();
            }
        });
        layer.full(index);
    }
    // 分页
    function setPage(page, limit, count, termId, search, type, status) {
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
                    if (type == 1) {
                        setStuList(termId, search, obj.curr * obj.limit, obj.limit, status)
                    }
                    if (type == 2) {
                        setCourse(termId, search, obj.curr * obj.limit, obj.limit, status)
                    }

                }
            }
        });
    }
})