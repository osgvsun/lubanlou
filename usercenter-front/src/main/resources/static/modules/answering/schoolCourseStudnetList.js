layui.use(['layer', 'form'], function () {
    var layer = layui.layer,
        form = layui.form;

    var contextPath = $("meta[name='contextPath']").attr("content");
    if (type == 1) {
        $('.layui-card-header').find('span').text('已选学生名单');
        $.ajax({
            url: labRoomHost + '/api/timetable/manage/getTimetableGroupStudents',
            type: 'POST',
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", getJWTAuthority(username));
            },
            data: {
                "courseNo": courseNo,
                "groupId": termId
            },
            success: function (res) {
                console.log(res)
                let data = res.userDTOs;
                for (let i = 0; i < data.length; i++) {
                    let tr = `<tr>
                            <td>${i + 1}</td>
                            <td>${courseNo}</td>
                            <td>${data[i].cname}(${data[i].username})</td>
                            <td>${data[i].academyName}</td>
                          </tr>`;
                    $("#student").append(tr);
                }
                if (!data || data.length == 0) {
                    let tr = `<tr><td colspan="4" style="text-align: center">暂无数据</td></tr>`;
                    $("#student").append(tr);
                }
            }, error: function (res) {
                let tr = `<tr><td colspan="4" style="text-align: center">接口异常</td></tr>`;
                $("#student").append(tr);
            }
        })
    } else {
        $('.layui-card-header').find('span').text('全部学生名单');
        $.ajax({
            url: labRoomHost + '/api/school/apiSchoolCourseStudentList',
            type: 'POST',
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", getJWTAuthority(username));
            },
            contentType: 'application/json',
            data: JSON.stringify({
                "courseNo": courseNo,
                "groupId": termId
            }),
            success: function (res) {
                console.log(res)
                let data = res.rows;
                for (let i = 0; i < data.length; i++) {
                    let tr = `<tr>
                            <td>${i + 1}</td>
                            <td>${data[i].courseNo}</td>
                            <td>${data[i].cname}(${data[i].username})</td>
                            <td>${data[i].academyName}</td>
                          </tr>`;
                    $("#student").append(tr);
                }
                if (!data || data.length == 0) {
                    let tr = `<tr><td colspan="4" style="text-align: center">暂无数据</td></tr>`;
                    $("#student").append(tr);
                }
            }, error: function (res) {
                let tr = `<tr><td colspan="4" style="text-align: center">接口异常</td></tr>`;
                $("#student").append(tr);
            }
        })
    }

    // $('.changeStudent').on('click', function () {
    //     // window.location.href=contextPath+"/lims/timetable/course/exportSchoolCourseStudentList?courseNo="+courseNo+"&term="+termId;
    //     $.ajax({
    //         url: labRoomHost + '/api/school/apiSchoolCourseStudentList',
    //         type: 'POST',
    //         contentType: 'application/json;charset=utf-8',
    //         beforeSend: function(request) {
    //             request.setRequestHeader("Authorization", getJWTAuthority(username));
    //         },
    //         data: JSON.stringify({
    //             "courseNo": courseNo,
    //             "order": "asc",
    //             "sort": "cname",
    //             "termId": termId
    //         }),
    //         success: function (res) {
    //             console.log(res)
    //             let data = res.rows;
    //             var tHeader = ["教学班编号", "学生信息(姓名)", "学生信息(学号)", "行政班名称", "所属学院"];
    //             var filterVal = ["courseNo", "cname", "username", "className", "academyName"];
    //             // const list = tableData //把要导出的数据tableData存到list
    //             const data1 = formatJson(filterVal, data)
    //             export_json_to_excel(tHeader, data1, '学生名单列表excel') //最后一个是表名字
    //         }
    //     })
    // })
    // //格式转换,不需要改动
    // function formatJson(filterVal, jsonData) {
    //     return jsonData.map(v => filterVal.map(j => v[j]))
    // }
})