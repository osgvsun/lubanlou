var ccrole;
var ccroleCname;
var cctree;
layui.define(function (e) {
    layui.use(['index', 'form', 'laydate', 'table', 'upload'], function () {
        var $ = layui.$,
            admin = layui.admin,
            layer = layui.layer,
            laydate = layui.laydate,
            form = layui.form,
            upload = layui.upload,
            table = layui.table;



        $(document).ready(function () {
            var curruser = localStorage.getItem("role");
            curruser = JSON.parse(curruser);
            if(curruser.username != username){$('#editInfo').hide();$('.header_edit').hide()}
            $.ajax({
                url: userCenterHost + '/usercenter/getTeacherBasicInfo',
                async: false,
                type: "GET",
                data: {
                    username: username
                },
                contentType:"application/json",
                success: function (res) {
                    if(!res.code){
                        var data=res.data;
                        ccrole = JSON.stringify(data);
                        if(data.roleList.length){
                            role_name=data.roleList[0].roleName;
                            ccroleCname = data.roleList[0].roleCname;
                        }
                        else{
                            alert("接口返回用户权限出错！")
                        }

                    }
                    else{
                        alert(res.msg);
                    }

                }
            });
            var currentRoleUid=JSON.parse(ccrole).roleList[0].id;
            $.ajax({
                url: userCenterHost + '/usercenter/getMenuTree',
                async: false,
                type: "GET",
                data:{
                    username:username,
                    roleId:currentRoleUid,
                    target:1
                },
                contentType: "json;charset=UTF-8",
                success: function (data) {
                    console.log(data);
                    cctree = JSON.stringify(data);
                }
            });
            var dataObject = JSON.parse(cctree).nextLevelConfigSet;
            var role = JSON.parse(ccrole).roleList[0].roleName;
            for (var i = 0; i < dataObject.length; i++) {
                if (dataObject[i].config.name === "个人基本情况管理" && dataObject[i].config.admin != 1) {
                    if (role == 'ROLE_TEACHER' || role == 'ROLE_STUDENT') {
                        if (dataObject[i].config.adminSetting == 1 || dataObject[i].config.selfSetting == 1) {
                            var personTree = dataObject[i].nextLevelConfigSet;
                            for (var j = 0; j < personTree.length; j++) {
                                if (personTree[j].config.adminSetting == 1 || personTree[j].config.selfSetting == 1) {
                                    $('#' + personTree[j].config.tableName).css("display", "block");
                                    var level3 = personTree[j].nextLevelConfigSet;
                                    var tableField = [{
                                        title: '序号',
                                        width: 100,
                                        type: "numbers",
                                        align:'center',
                                        textAlign:'center'
                                    }];
                                    for (var k = 0; k < level3.length; k++) {
                                        if (level3[k].config.adminSetting == 1 || level3[k].config.selfSetting == 1) {
                                            if (level3[k].config.field == 'professionalTutor') {
                                                tableField.push({
                                                    field: level3[k].config.field,
                                                    title: level3[k].config.name,
                                                    align: 'center',
                                                    textAlign:'center',
                                                    width: '120',
                                                    templet: function (d) {
                                                        var data = d.professionalTutor;
                                                        if (d.professionalTutor == '0') {
                                                            data = '否';
                                                        }
                                                        if (d.professionalTutor == '1') {
                                                            data = '是';
                                                        }
                                                        return data;
                                                    }
                                                });
                                            } else {
                                                tableField.push({
                                                    field: level3[k].config.field,
                                                    title: level3[k].config.name,
                                                    align: 'center',
                                                    textAlign:'center',
                                                    width: '120'
                                                });
                                            }

                                            $("." + level3[k].config.field).parent().parent().show();
                                            var editField = document.getElementsByName(level3[k].config.field);
                                            for (var r = 0; r < editField.length; r++) {
                                                if (level3[k].config.edit == 0 || level3[k].config.edit == 1) {
                                                    editField[r].disabled = true
                                                }
                                            }
                                        } else {
                                            $("." + level3[k].config.field).removeAttr("lay-verify");
                                        }
                                    }
                                    var table1 = personTree[j].config.tableName;
                                    if (table1 === 'user_info') {
                                        for (var t = 0; t < level3.length; t++) {
                                            if (level3[t].config.field == 'resume' || level3[t].config.field == 'researchInterests') {
                                                var label = '<div class="layui-col-lg12"> ' +
                                                    '<label class="layui-form-label">' + level3[t].config.name + '</label>' +
                                                    ' <div class="layui-input-block"> ' +
                                                    '<textarea type="text" name="' + level3[t].config.field + '" id="' + level3[t].config.field + 'show" autocomplete="off" class="layui-textarea"disabled="disabled" readonly="readonly"></textarea> ' +
                                                    '</div> ' +
                                                    '</div>'
                                                $('#basicInfoShow').append(label);
                                            } else if (level3[t].config.field != 'cname' && (level3[t].config.adminSetting == 1 || level3[t].config.selfSetting == 1)) {
                                                var label = '<div class="layui-col-lg4"> ' +
                                                    '<label class="layui-form-label">' + level3[t].config.name + '</label>' +
                                                    ' <div class="layui-input-block"> ' +
                                                    '<input type="text" name="' + level3[t].config.field + '" id="' + level3[t].config.field + 'show" autocomplete="off" class="layui-input"disabled="disabled" readonly="readonly"/> ' +
                                                    '</div> ' +
                                                    '</div>'
                                                $('#basicInfoShow').append(label);
                                            }
                                        }
                                    }
                                    //人事类别表格
                                      if (table1 === 'user_personnel_category_info') {
                                          /* tableField.push({
                                               fixed: 'right',
                                               title: '操作',
                                               align: 'center',
                                               toolbar: '#edit6',
                                               width: 200
                                           });*/
                                          table.render({
                                              elem: '#personnelCategoryInfo'
                                              , url: userCenterHost + '/usercenter/getUserPersonnelCategoryInfo'
                                              , method: 'GET'
                                              , where: {
                                                  username: username
                                              }
                                              , cols: [//标题栏
                                                  tableField
                                              ]
                                              //,skin: 'line' //表格风格
                                              , even: true
                                              , page: false //是否显示分页
                                              //,limits: [5, 7, 10]
                                              //,limit: 5 //每页默认显示的数量
                                          });
                                      }
                                      if (table1 === 'user_position_info') {
                                          /* tableField.push({
                                               fixed: 'right',
                                               title: '操作',
                                               align: 'center',
                                               toolbar: '#edit1',
                                               width: 200
                                           });*/
                                          table.render({
                                              elem: '#postInfo'
                                              , url: userCenterHost + '/usercenter/getUserPositionInfo'
                                              , method: 'POST'
                                              , where: {
                                                  username: username
                                              }
                                              , cols: [//标题栏
                                                  tableField
                                              ]
                                              //,skin: 'line' //表格风格
                                              , even: true
                                              , page: false //是否显示分页
                                              //,limits: [5, 7, 10]
                                              //,limit: 5 //每页默认显示的数量
                                          });
                                      }
                                      if (table1 === 'user_talent_info') {
                                          /* tableField.push({
                                               fixed: 'right',
                                               title: '操作',
                                               align: 'center',
                                               toolbar: '#edit2',
                                               width: 200
                                           });*/
                                          table.render({
                                              elem: '#talentInfo'
                                              , url: userCenterHost + '/usercenter/getUserTalentInfo'
                                              , method: 'POST'
                                              , where: {
                                                  username: username
                                              }
                                              , cols: [//标题栏
                                                  tableField
                                              ]
                                              //,skin: 'line' //表格风格
                                              , even: true
                                              , page: false //是否显示分页
                                              //,limits: [5, 7, 10]
                                              //,limit: 5 //每页默认显示的数量
                                          });
                                      }
                                      if (table1 === 'user_administration_info') {
                                          /*   tableField.push({
                                                 fixed: 'right',
                                                 title: '操作',
                                                 align: 'center',
                                                 toolbar: '#edit3',
                                                 width: 200
                                             });*/
                                          table.render({
                                              elem: '#administrationInfo'
                                              , url: userCenterHost + '/usercenter/getUserAdministrationInfo'
                                              , method: 'POST'
                                              , where: {
                                                  username: username
                                              }
                                              , cols: [//标题栏
                                                  tableField
                                              ]
                                              //,skin: 'line' //表格风格
                                              , even: true
                                              , page: false //是否显示分页
                                              //,limits: [5, 7, 10]
                                              //,limit: 5 //每页默认显示的数量
                                          });
                                      }
                                      if (table1 === 'user_tutor_info') {
                                          /*tableField.push({
                                              fixed: 'right',
                                              title: '操作',
                                              align: 'center',
                                              toolbar: '#edit4',
                                              width: 200
                                          });*/
                                          table.render({
                                              elem: '#tutorInfo'
                                              , url: userCenterHost + '/usercenter/getUserTutorInfo'
                                              , method: 'POST'
                                              , where: {
                                                  username: username
                                              }
                                              , cols: [//标题栏
                                                  tableField
                                              ]
                                              //,skin: 'line' //表格风格
                                              , even: true
                                              , page: false //是否显示分页
                                              //,limits: [5, 7, 10]
                                              //,limit: 5 //每页默认显示的数量
                                          });
                                      }
                                      if (table1 === 'user_academic_info') {
                                          tableField.push({
                                              fixed: 'right',
                                              title: '操作',
                                              align: 'center',
                                              toolbar: '#edit5',
                                              width: 200
                                          });
                                          table.render({
                                              elem: '#academicInfo'
                                              , url: userCenterHost + '/usercenter/getUserAcademicInfo'
                                              , method: 'POST'
                                              , where: {
                                                  username: username
                                              }
                                              , cols: [//标题栏
                                                  tableField
                                              ]
                                              //,skin: 'line' //表格风格
                                              , even: true
                                              , page: false //是否显示分页
                                              //,limits: [5, 7, 10]
                                              //,limit: 5 //每页默认显示的数量
                                          });
                                      }
                                }
                            }
                        }
                    }
                    break;
                }
            }
            $(".fa-spinner").remove();
        });

        var uploadInst = upload.render({
            elem: '#img' //绑定元素
            , url: '/upload/' //上传接口
            , done: function (res) {
                //上传完毕回调
            }
            , error: function () {
                //请求异常回调
            }
        });
        form.render(null, 'showBasicInfo');


        /*入党时间*/
        laydate.render({
            elem: '#partyTime'
        });

        /*职位晋升时间*/
        laydate.render({
            elem: '#upgradeTime_add'
            , type: 'month'
        });
        laydate.render({
            elem: '#upgradeTime'
            , type: 'month'
        });

        /*人才称号获批时间*/
        laydate.render({
            elem: '#talentTime_add'
            , type: 'year'
        });
        laydate.render({
            elem: '#talentTime'
            , type: 'year'
        });
        /*人事截至时间*/
        /*laydate.render({
            elem: '#personnelCategoryTime_add',
            range: true
        });
        laydate.render({
            elem: '#personnelCategoryStartTime',
        });*/
        laydate.render({
            elem: '.startDatetime',
        });

        /*职务信息任职时间*/
        laydate.render({
            elem: '#appointmentTime_add'
        });
        laydate.render({
            elem: '#appointmentTime'
        });

        /*获批时间*/
        laydate.render({
            elem: '#approvalTime_add'
        });
        laydate.render({
            elem: '#receiveApprovalTime'
        });

        /*学术信息任职时间*/
        laydate.render({
            elem: '#academicAppointmentTime_add',
            range: true
        });
        laydate.render({
            elem: '#academicAppointmentTime',
            range: true
        });
        /*身份证有效起止时间*/
        laydate.render({
            elem: '#idNoStartDatetime'
        });
        laydate.render({
            elem: '#idNoEndDatetime'
        });
        /*护照有效期起止时间*/
        laydate.render({
            elem: '#passportStartDatetime'
        });
        laydate.render({
            elem: '#passportEndDatetime'
        });
        /*港澳通行证有效起止时间*/
        laydate.render({
            elem: '#hmtTrafficPermitStartDatetime'
        });
        laydate.render({
            elem: '#hmtTrafficPermitEndDatetime'
        });

        /* 自定义验证规则 */
        form.verify({
            title: function (value) {
                if (value.length < 5) {
                    return '标题至少得5个字符啊';
                }
            },
            pass: [/(.+){6,12}$/, '密码必须6到12位'],
            content: function (value) {
                layedit.sync(editIndex);
            }
        });

        /* 监听提交 */
        form.on('submit(showBasicInfo)', function (data) {
            $(this).parents().parents().parents().siblings(".fill_box").slideDown();
            var data = data.field;
            editStandard(data);
            for (var i = 0; i < Object.entries(data).length; i++) {
                if (Object.entries(data)[i][0] == 'department') {
                    var option = '<option  value="' + Object.entries(data)[i][1] + '" selected>' + Object.entries(data)[i][1] + '</option>';
                    $("#department").append(option);
                }
                if (Object.entries(data)[i][0] == 'highestDegreeGetFromMatherSchool') {
                    $("input[name='highestDegreeGetFromMatherSchool'][title='" + Object.entries(data)[i][1] + "']").attr("checked", true);
                }
                if (Object.entries(data)[i][0] == 'political') {
                    if (Object.entries(data)[i][1] === '群众' || Object.entries(data)[i][1] === '无党派人士') {
                        $('#partyTime').removeAttr("lay-verify");
                        $('#JoinPatyTime').css("display", 'none');
                    }
                }
            }
            form.render();
            return false;
        });
        form.on('submit(basicInfo)', function (data) {
            console.log(data)
            layer.alert('确认提交吗', {
                closeBtn: 1    // 是否显示关闭按钮
                , btn: ['确定', '取消'] //按钮
                , yes: function () {
                    $("#basicInfoAdd").parents(".layui-card-body").siblings(".layui-card-header").find(".header_edit").show();
                    layer.closeAll();
                    var field = data.field;
                    // 显示才判断
                    if($(".highestDegreeGetFromMatherSchool").parents(".layui-col-md121")[0].style.display != "none"&&!field.hasOwnProperty("highestDegreeGetFromMatherSchool")){
                        alert("请选择最高学位是否本校获得！")
                    }
                    else {
                        field['username'] = username;
                        field['college'] = $("#college option:selected").attr("id");
                        field['department'] = $("#department option:selected").attr("id");
                        admin.req({
                            url: userCenterHost + '/usercenter/saveTeacherBasicInfo',
                            data: field,
                            dataType: 'json',
                            method: 'POST',
                            success: function (res) {
                                if (!res.code) {
                                    parent.layer.alert("提交成功!");
                                    $(".clearForm").trigger("click");
                                    $("#basicInfoAdd").hide();
                                    location.reload();
                                } else {
                                    console.log(res.msg);
                                    parent.layer.alert('保存失败！');
                                }

                            }
                        })
                    }

                }
            })
            return false;
        });
        form.on('submit(postInfo)', function (data) {
            layer.alert('确认提交吗', {
                closeBtn: 1    // 是否显示关闭按钮
                , btn: ['确定', '取消'] //按钮
                , yes: function () {
                    $(".clearForm").trigger("click");
                    $("#postInfoAdd").parents(".layui-card-body").siblings(".layui-card-header").find(".header_edit").show();
                    $("#postInfoAdd").hide();
                    layer.closeAll();
                    var field = data.field;
                    field['username'] = username;
                    admin.req({
                        url: userCenterHost + '/usercenter/saveUserPositionInfo',
                        data: field,
                        dataType: 'json',
                        method: 'POST'
                        , success: function (res) {
                            if (!res.code) {
                                parent.layer.alert("提交成功!");
                                table.reload('postInfo');
                            } else {
                                console.log(res.msg);
                                parent.layer.alert('保存失败！');
                            }
                        }
                    })
                }
            });
            return false;
        });
        form.on('submit(talentInfo)', function (data) {
            layer.alert('确认提交吗', {
                closeBtn: 1    // 是否显示关闭按钮
                , btn: ['确定', '取消'] //按钮
                , yes: function () {
                    $(".clearForm").trigger("click");
                    $("#talentInfoAdd").parents(".layui-card-body").siblings(".layui-card-header").find(".header_edit").show();
                    $("#talentInfoAdd").hide();
                    layer.closeAll();
                    var field = data.field;
                    field['username'] = username;
                    admin.req({
                        url: userCenterHost + '/usercenter/saveUserTalentInfo',
                        data: field,
                        dataType: 'json',
                        method: 'POST'
                        , success: function (res) {
                            if (!res.code) {
                                parent.layer.alert("提交成功!");
                                table.reload('talentInfo');
                            } else {
                                console.log(res.msg);
                                parent.layer.alert('保存失败！');
                            }
                        }
                    })
                }
            })
            return false;
        });
        form.on('submit(administrationInfo)', function (data) {
            layer.alert('确认提交吗', {
                closeBtn: 1    // 是否显示关闭按钮
                , btn: ['确定', '取消'] //按钮
                , yes: function () {
                    $(".clearForm").trigger("click");
                    $("#administrationInfoAdd").parents(".layui-card-body").siblings(".layui-card-header").find(".header_edit").show();
                    $("#administrationInfoAdd").hide();
                    layer.closeAll();
                    var field = data.field;
                    field['username'] = username;
                    admin.req({
                        url: userCenterHost + '/usercenter/saveUserAdministrationInfo',
                        data: field,
                        dataType: 'json',
                        method: 'POST'
                        , success: function (res) {
                            if (!res.code) {
                                parent.layer.alert("提交成功!")
                                table.reload('administrationInfo');
                            } else {
                                console.log(res.msg);
                                parent.layer.alert('保存失败！');
                            }
                        }
                    })
                }
            })
            return false;
        });
        form.on('submit(tutorInfo)', function (data) {
            layer.alert('确认提交吗', {
                closeBtn: 1    // 是否显示关闭按钮
                , btn: ['确定', '取消'] //按钮
                , yes: function () {
                    $(".clearForm").trigger("click");
                    $("#tutorInfoAdd").parents(".layui-card-body").siblings(".layui-card-header").find(".header_edit").show();
                    $("#tutorInfoAdd").hide();
                    layer.closeAll();
                    var field = data.field;
                    field['username'] = username;
                    admin.req({
                        url: userCenterHost + '/usercenter/saveUserTutorInfo',
                        data: field,
                        dataType: 'json',
                        method: 'POST'
                        , success: function (res) {
                            if (!res.code) {
                                parent.layer.alert("提交成功!");
                                table.reload('tutorInfo');
                            } else {
                                console.log(res.msg);
                                parent.layer.alert('保存失败！');
                            }
                        }
                    })
                }
            });
            return false;
        });
        form.on('submit(academicInfo)', function (data) {
            layer.alert('确认提交吗', {
                closeBtn: 1    // 是否显示关闭按钮
                , btn: ['确定', '取消'] //按钮
                , yes: function () {
                    $(".clearForm").trigger("click");
                    $("#academicInfoAdd").parents(".layui-card-body").siblings(".layui-card-header").find(".header_edit").show();
                    $("#academicInfoAdd").hide();
                    layer.closeAll();
                    var field = data.field;
                    field['username'] = username;
                    admin.req({
                        url: userCenterHost + '/usercenter/saveUserAcademicInfo',
                        data: field,
                        dataType: 'json',
                        method: 'POST'
                        , success: function (res) {
                            if (!res.code) {
                                parent.layer.alert("提交成功!");
                                table.reload('academicInfo');
                            } else {
                                console.log(res.msg);
                                parent.layer.alert('保存失败！');
                            }
                        }
                    })
                }
            })
            return false;
        });
        //人事类别提交
        form.on('submit(personnelCategory)', function (data) {
            layer.alert('确认提交吗', {
                closeBtn: 1    // 是否显示关闭按钮
                , btn: ['确定', '取消'] //按钮
                , yes: function () {
                    $(".clearForm").trigger("click");
                    $("#personnelCategoryAdd").parents(".layui-card-body").siblings(".layui-card-header").find(".header_edit").show();
                    $("#personnelCategoryAdd").hide();
                    layer.closeAll();
                    var field = data.field;
                    field['username'] = username;
                    admin.req({
                        url: userCenterHost + '/usercenter/saveUserPersonnelCategoryInfo',
                        data: field,
                        dataType: 'json',
                        method: 'POST'
                        , success: function (res) {
                            if (!res.code) {
                                parent.layer.alert("提交成功!");
                                table.reload('personnelCategoryInfo');
                            } else {
                                console.log(res.msg);
                                parent.layer.alert('保存失败！');
                            }
                        }
                    })
                }
            })
            return false;
        });
        //基本信息入党时间表单联动
        form.on('select(political)', function (data) {
            if (data.value === '群众' || data.value === '无党派人士') {
                $('#partyTime').val('');
                $('#JoinPatyTime').css("display", 'none');
                $('#partyTime').removeAttr("lay-verify");
            } else {
                $('#JoinPatyTime').css("display", 'inline-block');
                $('#partyTime').removeAttr("lay-verify");
            }
        });
        //职称信息表单联动
        form.on('select(test)', function (data) {
            if (data.value === '教授' || data.value === '研究员' || data.value === '研究馆员'|| data.value === '教授级高级工程师') {
                $('#officialRankAdd').val("高级");
            }
            if (data.value === '讲师' || data.value === '助理研究员' || data.value === '工程师' || data.value === '实验师') {
                $('#officialRankAdd').val("中级");
            }
            if (data.value === '助教' || data.value === '助理工程师') {
                $('#officialRankAdd').val("初级");
            }
            if (data.value === '副教授' || data.value === '副研究员' || data.value === '高级工程师' || data.value === '副研究馆员') {
                $('#officialRankAdd').val("副高级");
            }
            if (data.value === '高级技师' || data.value === '技师' || data.value === '高级工' || data.value === '中级工') {
                $('#officialRankAdd').val("其他职称");
            }
        })
        //编辑职称信息表单联动
        form.on('select(edit_test)', function (data) {
            if (data.value === '教授' || data.value === '研究员' || data.value === '研究馆员'|| data.value === '教授级高级工程师') {
                $('#officialRank').val("高级");
            }
            if (data.value === '讲师' || data.value === '助理研究员' || data.value === '工程师' || data.value === '实验师') {
                $('#officialRank').val("中级");
            }
            if (data.value === '助教' || data.value === '助理工程师') {
                $('#officialRank').val("初级");
            }
            if (data.value === '副教授' || data.value === '副研究员' || data.value === '高级工程师' || data.value === '副研究馆员') {
                $('#officialRank').val("副高级");
            }
            if (data.value === '高级技师' || data.value === '技师' || data.value === '高级工' || data.value === '中级工') {
                $('#officialRank').val("其他职称");
            }
        });

        // 编辑学院信息联动
        form.on('select(schoolTest)', function (data) {
            //部门
            // $.ajax({
            //     url: userCenterHost + '/usercenter/dropDownBoxController/getDepartment',
            //     type: 'GET',
            //     data: {
            //         collegeId: $(data.elem).find("option:selected").attr("id")
            //     },
            //     success: function (res) {
            //         $("#department").children().remove();
            //         form.render();
            //         if (!res.code) {
            //             var data = res.data;
            //             for (var i = 0; i < data.length; i++) {
            //                 var option = '<option id="' + data[i].id + '" value="' + data[i].department + '">' + data[i].department + '</option>';
            //                 $("#department").append(option);
            //             }
            //             form.render();
            //         } else {
            //             alert(res.msg);
            //         }
            //     }
            //
            // });
        })


        //获取用户基本信息
        $.ajax({
            url: userCenterHost + '/usercenter/getTeacherBasicInfo',
            data: {
                username: username
            },
            type: "GET",
            success: function (res) {
                if (!res.code) {
                    var data = res.data;
                    form.val('showBasicInfo', {
                        'cname': data.cname
                    });
                    for (var item in data) {
                        if (item == 'highestDegreeGetFromMatherSchool' && data[item] != null) {
                            if (data[item] == '0') {
                                $("#" + item + 'show').val('否');
                            }
                            if (data[item] == '1') {
                                $("#" + item + 'show').val('是');
                            }

                        } else if (data[item] != null) {
                            $("#" + item + 'show').val(data[item]);
                        }
                    }
                    if (data.identificationPhoto != null) {
                        // resourceContainer.getFileById({
                        //     success: function (res) {
                        //         $('#photo_img').attr("src", res.url);
                        //     },
                        //     fail: function () {
                        //         alert('图像获取失败！');
                        //         $('#photo_img').attr("src", '');
                        //     },
                        //     fileId: data.identificationPhoto,
                        //     needToken: true
                        // })
                    }
                } else {
                    console.log(res.msg);
                }

            }
        });

        $("#uploadPhoto").click(function () {

            layer.open({
                type: 2
                , id: 'layerDemo' //防止重复弹出
                , area: ["80%", "80%"]
                , content: '../teacher/onloadPhoto'
                , btn: '确定'
                , btnAlign: 'c' //按钮居中
                , shade: 0 //不显示遮罩
                , yes: function () {
                    layer.closeAll();
                }
            });

        })

        //监听职称信息编辑
        table.on('tool(postInfo)', function (obj) {
            var data = obj.data;
            if (obj.event === 'detail') {
                layer.msg('ID：' + data.id + ' 的查看操作');
            } else if (obj.event === 'del') {
                layer.confirm('真的删除行么', function (index) {
                    obj.del();
                    admin.req({
                        url: userCenterHost + '/usercenter/deleteUserPositionInfo',
                        data: data,
                        dataType: 'json',
                        method: 'POST'
                        , success: function (res) {
                            if (!res.code) {
                                parent.layer.alert("删除成功!")
                                table.reload('postInfo');
                            } else {
                                console.log(res.msg);
                                parent.layer.alert('保存失败！');
                            }

                        }
                    })
                    layer.close(index);
                });
            } else if (obj.event === 'edit') {
                /*layer.alert('编辑行：<br>'+ JSON.stringify(data))*/
                var edit_div = '#postInfo_uid';
                editStandard(data, edit_div);
                form.render();
                layer.open({
                    type: 1
                    , title: '编辑'
                    , area: ['60%', '50%']
                    , id: 'layerDemo1'/* + type*/ //防止重复弹出
                    , content: $('#edit_postInfo')
                    , btnAlign: 'c' //按钮居中
                    , shade: 0 //不显示遮罩
                    , yes: function () {
                        layer.closeAll();
                    }
                });
            }
        });
        //监听人才信息编辑
        table.on('tool(talentInfo)', function (obj) {
            var data = obj.data;
            if (obj.event === 'detail') {
                layer.msg('ID：' + data.id + ' 的查看操作');
            } else if (obj.event === 'del') {
                layer.confirm('真的删除行么', function (index) {
                    obj.del();
                    admin.req({
                        url: userCenterHost + '/usercenter/deleteUserTalentInfo',
                        data: data,
                        dataType: 'json',
                        method: 'POST'
                        , success: function (res) {
                            if (!res.code) {
                                parent.layer.alert("删除成功!")
                                table.reload('postInfo');
                            } else
                                parent.layer.alert(res.msg);
                        }
                    })
                    layer.close(index);
                });
            } else if (obj.event === 'edit') {
                /*layer.alert('编辑行：<br>'+ JSON.stringify(data))*/
                var edit_div = '#talentInfo_uid';
                editStandard(data, edit_div);
                form.render();
                layer.open({
                    type: 1
                    , title: '编辑'
                    , area: ['60%', '50%']
                    , id: 'layerDemo2'//防止重复弹出
                    , content: $('#edit_talentInfo')
                    , btnAlign: 'c' //按钮居中
                    , shade: 0 //不显示遮罩
                    , yes: function () {
                        layer.closeAll();
                    }
                });
            }
        });

        //监听职务信息编辑
        table.on('tool(administrationInfo)', function (obj) {
            var data = obj.data;
            if (obj.event === 'detail') {
                layer.msg('ID：' + data.id + ' 的查看操作');
            } else if (obj.event === 'del') {
                layer.confirm('真的删除行么', function (index) {
                    obj.del();
                    admin.req({
                        url: userCenterHost + '/usercenter/deleteUserAdministrationInfo',
                        data: data,
                        dataType: 'json',
                        method: 'POST'
                        , success: function (res) {
                            if (!res.code) {
                                parent.layer.alert("删除成功!")
                                table.reload('postInfo');
                            } else
                                parent.layer.alert(res.msg);
                        }
                    })
                    layer.close(index);
                });
            } else if (obj.event === 'edit') {
                /*layer.alert('编辑行：<br>'+ JSON.stringify(data))*/
                var edit_div = '#administrationInfo_uid';
                editStandard(data, edit_div);
                form.render();
                layer.open({
                    type: 1
                    , title: '编辑'
                    , area: ['60%', '50%']
                    , id: 'layerDemo3'  //防止重复弹出
                    , content: $('#edit_administrationInfo')
                    , btnAlign: 'c' //按钮居中
                    , shade: 0 //不显示遮罩
                    , yes: function () {
                        layer.closeAll();
                    }
                });
            }
        });
        //监听导师信息编辑
        table.on('tool(tutorInfo)', function (obj) {
            var data = obj.data;
            if (obj.event === 'detail') {
                layer.msg('ID：' + data.id + ' 的查看操作');
            } else if (obj.event === 'del') {
                layer.confirm('真的删除行么', function (index) {
                    obj.del();
                    admin.req({
                        url: userCenterHost + '/usercenter/deleteUserTutorInfo',
                        data: data,
                        dataType: 'json',
                        method: 'POST'
                        , success: function (res) {
                            if (!res.code) {
                                parent.layer.alert("删除成功!")
                                table.reload('postInfo');
                            } else
                                parent.layer.alert(res.msg);
                        }
                    })
                    layer.close(index);
                });
            } else if (obj.event === 'edit') {
                /*layer.alert('编辑行：<br>'+ JSON.stringify(data))*/
                var edit_div = '#tutorInfo_uid';
                editStandard(data, edit_div);
                for (var i = 0; i < Object.entries(data).length; i++) {
                    if (Object.entries(data)[i][0] == 'professionalTutor') {
                        $("input[name='professionalTutor'][value='" + Object.entries(data)[i][1] + "']").attr("checked", true);
                    }
                }
                form.render();
                layer.open({
                    type: 1
                    , title: '编辑'
                    , area: ['60%', '50%']
                    , id: 'layerDemo4' //防止重复弹出
                    , content: $('#edit_tutorInfo')
                    , btnAlign: 'c' //按钮居中
                    , shade: 0 //不显示遮罩
                    , yes: function () {
                        layer.closeAll();
                    }
                });
            }
        });
        //监听学术信息编辑
        table.on('tool(academicInfo)', function (obj) {
            var data = obj.data;
            if (obj.event === 'detail') {
                layer.msg('ID：' + data.id + ' 的查看操作');
            } else if (obj.event === 'del') {
                layer.confirm('真的删除行么', function (index) {
                    obj.del();
                    admin.req({
                        url: userCenterHost + '/usercenter/deleteUserAcademicInfo',
                        data: data,
                        dataType: 'json',
                        method: 'POST'
                        , success: function (res) {
                            if (!res.code) {
                                parent.layer.alert("删除成功!")
                                table.reload('postInfo');
                            } else
                                parent.layer.alert(res.msg);
                        }
                    })
                    layer.close(index);
                });
            } else if (obj.event === 'edit') {
                /*layer.alert('编辑行：<br>'+ JSON.stringify(data))*/
                var edit_div = '#academicInfo_uid';
                editStandard(data, edit_div);
                var academicAppointmentTime = $("#startTime").val() + ' - ' + $("#endTime").val();
                $("#academicAppointmentTime").val(academicAppointmentTime);
                form.render();
                layer.open({
                    type: 1
                    , title: '编辑'
                    , area: ['60%', '50%']
                    , id: 'layerDemo5' //防止重复弹出
                    , content: $('#edit_academicInfo')
                    , btnAlign: 'c' //按钮居中
                    , shade: 0 //不显示遮罩
                    , yes: function () {
                        layer.closeAll();
                    }
                });
            }
        });
        //监听人事信息编辑
        table.on('tool(personnelCategory)', function (obj) {
            var data = obj.data;
            if (obj.event === 'detail') {
                layer.msg('ID：' + data.id + ' 的查看操作');
            } else if (obj.event === 'del') {
                layer.confirm('真的删除行么', function (index) {
                    obj.del();
                    admin.req({
                        url: userCenterHost + '/usercenter/deleteUserPersonnelCategoryInfo',
                        data: data,
                        dataType: 'json',
                        method: 'POST'
                        , success: function (res) {
                            if (!res.code) {
                                parent.layer.alert("删除成功!")
                                table.reload('personnelCategoryInfo');
                            } else
                                parent.layer.alert(res.msg);
                        }
                    })
                    layer.close(index);
                });
            } else if (obj.event === 'edit') {
                /*layer.alert('编辑行：<br>'+ JSON.stringify(data))*/
                var edit_div = '#personnelCategory_uid';
                editStandard(data, edit_div);
                // var personnelCategoryTime=$("#startDatetime").val()+' - '+$("#endDatetime").val();
                // $("#personnelCategoryTime").val(personnelCategoryTime);
                form.render();
                layer.open({
                    type: 1
                    , title: '编辑'
                    , area: ['60%', '50%']
                    , id: 'layerDemo5' //防止重复弹出
                    , content: $('#edit_personnelCategory')
                    , btnAlign: 'c' //按钮居中
                    , shade: 0 //不显示遮罩
                    , yes: function () {
                        layer.closeAll();
                    }
                });
            }
        });


        /* 下拉框数据读取显示
        * */

        //政治面貌
        $.ajax({
            url: userCenterHost + '/usercenter/dropDownBoxController/getPoliticsStatus',
            type: 'GET',
            success: function (res) {
                if (!res.code) {
                    var data = res.data;
                    for (var i = 0; i < data.length; i++) {
                        var option = '<option value="' + data[i].politicsStatus + '">' + data[i].politicsStatus + '</option>';
                        $("#political").append(option);
                    }
                    form.render();
                } else {
                    alert(res.msg);
                }

            }
        });
        //学院
        $.ajax({
            url: userCenterHost + '/usercenter/dropDownBoxController/getCollege',
            type: 'GET',
            success: function (res) {
                if (!res.code) {
                    var data = res.data;
                    for (var i = 0; i < data.length; i++) {
                        var option = '<option id="' + data[i].id + '" value="' + data[i].college + '">' + data[i].college + '</option>';
                        $("#college").append(option);
                    }
                    form.render();
                } else {
                    alert(res.msg);
                }
            }
        });
        // //部门
        // $.ajax({
        //     url: userCenterHost + '/usercenter/dropDownBoxController/getDepartment',
        //     type: 'GET',
        //     async: false,
        //     success: function (res) {
        //         if(!res.code){
        //             var data=res.data;
        //             for (var i = 0; i < data.length; i++) {
        //                 var option = '<option value="' + data[i].id + '">' + data[i].department + '</option>';
        //                 $("#department").append(option);
        //             }
        //             form.render();
        //         }
        //         else{
        //             alert(res.msg);
        //         }
        //     }
        //
        // });
        //职称
        $.ajax({
            url: userCenterHost + '/usercenter/dropDownBoxController/getProfessionalTitle',
            type: 'GET',
            success: function (res) {
                if (!res.code) {
                    var data = res.data;
                    for (var i = 0; i < data.length; i++) {
                        var option = '<option value="' + data[i].professionalTitle + '">' + data[i].professionalTitle + '</option>';
                        $(".profession").append(option);

                    }
                    form.render();
                } else {
                    alert(res.msg);
                }
            }

        });
        //岗位类别
        $.ajax({
            url: userCenterHost + '/usercenter/dropDownBoxController/getjobCategory',
            type: 'GET',
            success: function (res) {
                if (!res.code) {
                    var data = res.data;
                    for (var i = 0; i < data.length; i++) {
                        var option = '<option value="' + data[i].jobCategory + '">' + data[i].jobCategory + '</option>';
                        $(".jobCategory").append(option);
                    }
                    form.render();
                } else {
                    alert(res.msg);
                }
            }
        });
        //岗位等级
        $.ajax({
            url: userCenterHost + '/usercenter/dropDownBoxController/getJobRank',
            type: 'GET',
            success: function (res) {
                if (!res.code) {
                    var data = res.data;
                    for (var i = 0; i < data.length; i++) {
                        var option = '<option value="' + data[i] + '">' + data[i] + '</option>';
                        $(".jobRank").append(option);
                    }
                    form.render();
                } else {
                    alert(res.msg);
                }
            }
        });
        //导师类别
        $.ajax({
            url: userCenterHost + '/usercenter/dropDownBoxController/getTutorCategory',
            type: 'GET',
            success: function (res) {
                if (!res.code) {
                    var data = res.data;
                    $.each(data, function (i, n) {
                        $(".tutorCategory").append(
                            "<option value=" + n.tutorCategory + ">" + n.tutorCategory
                            + "</option>");
                    });
                    form.render();
                } else {
                    alert(res.msg);
                }

            }
        });
        //人才称号
        $.ajax({
            url: userCenterHost + '/usercenter/dropDownBoxController/getTalent',
            type: 'GET',
            success: function (res) {
                if (!res.code) {
                    var data = res.data;
                    $.each(data, function (i, n) {
                        $(".talent").append(
                            "<option value=" + n.talent + ">" + n.talent
                            + "</option>");
                    });
                    form.render();
                } else {
                    alert(res.msg);
                }

            }
        });
        //人事类别称号
        $.ajax({
            url: userCenterHost + '/usercenter/dropDownBoxController/getPersonnelCategory',
            type: 'GET',
            success: function (res) {
                if (!res.code) {
                    var data = res.data;
                    $.each(data, function (i, n) {
                        $(".personnelCategory").append(
                            "<option value=" + n.personnelCategory + ">" + n.personnelCategory
                            + "</option>");
                    });
                    form.render();
                } else {
                    alert(res.msg);
                }

            }
        });
    });
    e('personalInfo', {});
});


$(".header_edit").click(
    function () {
        $(this).hide();
        $(this).parents().siblings(".layui-card-body").find(".detail_item").hide();
        $(this).parents().siblings(".layui-card-body").find(".fill_box").slideDown();
    }
);

$(".edit_hide").click(
    function () {
        $(this).parents().parents().parents().parents().parents(".layui-card-body").siblings(".layui-card-header").find(".header_edit").show();
        $(this).parents().parents().parents().parents(".fill_box").hide();
        $(this).parents().parents().parents().parents().siblings(".detail_item").fadeIn();
    }
);

function upload() {
    window.location.href = userCenterHost + '/usercenter/reportExport/comprehensiveSituation?username=' + username;
    // $.ajax({
    //     url: userCenterHost + '/usercenter/reportExport/comprehensiveSituation',
    //     data: {
    //         username : currentUsername
    //     },
    //     type:"GET",
    //     done:function(data){
    //         data = data.data;
    //     }
    // })

}


