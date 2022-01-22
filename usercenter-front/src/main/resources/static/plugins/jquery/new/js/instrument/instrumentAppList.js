var firstAuditNames = $('#firstAuditName').val();
var secondAuditNames = $('#secondAuditName').val();
var timeList;
$(function () {
    var a = $(".downdiv");
    $.each(a, function () {
        $(this).click(function () {
            if ($(this).siblings("ul").css("display") == "none") {
                $(this).siblings("ul").css("display", "block");
            }
            else {
                $(this).siblings("ul").css("display", "none");
            }
        })
    })
});
/*function projectMachineAudit(){
    var uid = $(this).attr("data");
    window.location.href = '../instrument/projectMachineAudit?uid=' + uid;
}*/
$(".creditset").click(function () {
    $(".credit_table").css("display", "block");
});
$(".close_credit").click(function () {
    $(".credit_table").css("display", "none");
})

function showTable(index) {
    if (index == 1) {
        $(".list_table").removeClass("hide");
        $(".img_table").addClass("hide");
    }
    else {
        $(".img_table").removeClass("hide");
        $(".list_table").addClass("hide");
    }
}

$(function () {
    var projectName = $("#projectName").val();
    //江苏理工是两级审核
    if (projectName != 'jsutinstruments') {
        var initStep = [{
            title: firstAuditNames,
            content: firstAuditNames + "审核"
        }, {
            title: secondAuditNames,
            content: secondAuditNames + "审核"
        }, {
            title: "设备管理员",
            content: "设备管理员审核"
        }, {
            title: "结束",
            content: "结束"
        }];
    } else {
        var initStep = [{
            title: firstAuditNames,
            content: firstAuditNames + "审核"
        }, {
            title: "设备管理员",
            content: "设备管理员审核"
        }, {
            title: "结束",
            content: "结束"
        }];
    }
    // $(".ystep1").loadStep({
    //   //ystep的外观大小
    //   //可选值：small,large
    //   size: "large",
    //   //ystep配色方案
    //   //可选值：green,blue
    //   color: "blue",
    //   showContent:false,
    //   width:"100px",
    //
    //   //ystep中包含的步骤
    //
    // });

//原来的
    // $(".ystep3").loadStep({
    //     //ystep的外观大小
    //     //可选值：small,large
    //     size: "large",
    //     //ystep配色方案
    //     //可选值：green,blue
    //     color: "blue",
    //     showContent:false,
    //     width:"100px",
    //
    //     //ystep中包含的步骤
    //     steps: [{
    //         title: "",
    //         content: "导师审核"
    //     },{
    //         title: "",
    //         content: "实验室管理员审核"
    //     },{
    //         title: "",
    //         content: "设备管理员审核"
    //     },{
    //         title: "",
    //         content: "审核距拒绝"
    //     },{
    //         title: "",
    //         content: "审核通过"
    //     }]
    // });


    // var stateList=document.getElementsByClassName("ystep1");
    // for(var i=0;i<stateList.length;i++){
    // 	var stateId="state"+parseInt(i+1);
    // 	var thisValue= (document.getElementById(stateId)).value;
    //     if(thisValue==0){
    //         $("#ystep1"+(i+1)).setStep(1);
    //     }
    //     if(thisValue==1){
    //         $("#ystep1"+(i+1)).setStep(2);
    //     }
    //     if(thisValue==2){
    //         $("#ystep1"+(i+1)).setStep(3);
    //     }
    // }
    function initYsteps(index, steps, stage, style) {
        //shezhishijian
        /*for(var i = 0 ; i<stage+1;i++){
            var step = steps[i];
            step['enable'] = true;
        }*/
        $("#ystep3" + index).loadStep({
            size: "large",
            color: "blue",
            showContent: false,
            steps: steps
        });
        if (style == 0) {
            $("#ystep3" + index).setStep(stage + 1, 0);
        }
        if (style == 1) {
            if (projectName != 'jsutinstruments') {
                //设置有几个圆气泡
                $("#ystep3" + index).setStep(4, 0);
            } else {
                $("#ystep3" + index).setStep(3, 0);
            }
        }
        if (style == 2) {
            $("#ystep3" + index).setStep(stage + 1, 1);
        }

    }

    var stateList3 = document.getElementsByClassName("ystep3");
    var tr = stateList3.parentElement;
    for (var i = 0; i < 10; i++) {
        var stateId = "state" + parseInt(i + 1);
        var statusId = "status" + parseInt(i + 1);
        var auditId = "audit" + parseInt(i + 1);
        //检测是否有这个数据
        var valueExist = document.getElementById(stateId);
        var statusIdExist = document.getElementById(statusId);
        var auditIdValue=document.getElementById(auditId);
        if (valueExist != null&&statusIdExist!=null&&auditIdValue!=null) {
            var thisState = (document.getElementById(stateId)).value;
            var thisStatus = (document.getElementById(statusId)).value;
            var thisaudit = (document.getElementById(auditId)).value;
            initStep = [{
                title: firstAuditNames,
                content: firstAuditNames + "审核"
            }, {
                title: secondAuditNames,
                content: secondAuditNames + "审核"
            }, {
                title: "设备管理员",
                content: "设备管理员审核"
            }, {
                title: "结束",
                content: "结束"
            }];
            var step = initStep;

            if (thisStatus == 1) {

                if (thisState == 0) {

                }
                if (thisState == 1) {
                }
                if (thisState == 2) {
                }
                if (thisState == 3) {
                }
                initYsteps(i + 1, step, parseInt(thisState), 0);
                // if(thisState>0){
                //     step[0].message="通过";
                // }
                // if(thisState>1){
                //     step[1].message="通过";
                // }
                // if(thisState>2){
                //     step[2].message="通过";
                // }
            }
            if (thisStatus == 2) {
                //江苏理工是两级审核
                if (projectName != 'jsutinstruments') {
                    step[0].message = "通过";
                    step[1].message = "通过";
                    step[2].message = "通过";

                    initYsteps(i + 1, step, 3, 1);
                    step[0].message = "";
                    step[1].message = "";
                    step[2].message = "";
                    step[0].time = "";
                    step[1].time = "";
                    step[2].time = "";
                } else {
                    step[0].message = "通过";
                    step[1].message = "通过";

                    initYsteps(i + 1, step, 3, 1);
                    step[0].message = "";
                    step[1].message = "";
                    step[0].time = "";
                    step[1].time = "";
                }
            }
            if (thisStatus == 3 || thisStatus == 5 || thisStatus == 6) {
                initYsteps(i + 1, step, parseInt(thisState), 2);
            }
        }

    }


    // $(".ystep2").loadStep({
    //   //ystep的外观大小
    //   //可选值：small,large
    //   size: "large",
    //   //ystep配色方案
    //   //可选值：green,blue
    //   color: "blue",
    //   showContent:true,
    //
    //   //ystep中包含的步骤
    //   steps: [{
    // 	//步骤名称
    // 	title: "1",
    // 	//步骤内容(鼠标移动到本步骤节点时，会提示该内容)
    // 	content: "审核"
    //   },{
    // 	title: "2",
    // 	content: "导师审核"
    //   },{
    // 	title: "3",
    // 	content: "设备管理员审核"
    //   }]
    // });
    // $(".ystep2").setStep(2);
})

//应用模板
function applyTemplet(instrumentId) {
    var machineTempletId = $("#configMachineTemplet").val();
    window.location.href = '../templet/applyMachineTemplet?instrumentId=' + instrumentId + '&machineTempletId=' + machineTempletId;
}


$(function () {
    var initStepSpecimen = [{
        title: firstAuditNames,
        content: firstAuditNames + "审核"
    }, {
        title: "设备管理员",
        content: "设备管理员审核"
    }, {
        title: "接样",
        content: "接样"
    }, {
        title: "检测",
        content: "检测"
    }, {
        title: "结束",
        content: "结束"
    }];

    function initYstepsSpecimen(index, steps, stage, style) {
        $("#ystepSpecimen" + index).loadStep({
            size: "large",
            color: "blue",
            showContent: false,
            steps: steps
        });
        if (style == 0) {
            $("#ystepSpecimen" + index).setStep(stage + 1, 0);
        }
        if (style == 1) {
            $("#ystepSpecimen" + index).setStep(5, 0);
        }
        if (style == 2) {
            $("#ystepSpecimen" + index).setStep(stage + 1, 1);
        }
    }

    var stateList4 = document.getElementsByClassName("ystepSpecimen");
    var tr = stateList4.parentElement;
    for (var i = 0; i < 10; i++) {
        var stateId = "stateSpecimen" + parseInt(i + 1);
        var statusId = "statusSpecimen" + parseInt(i + 1);
        var valueExist = document.getElementById(stateId);
        var statusIdValue=document.getElementById(statusId);
        if (valueExist != null &&statusIdValue !=null) {
            var thisState = (document.getElementById(stateId)).value;
            var thisStatus = (document.getElementById(statusId)).value;
            var step = initStepSpecimen;
            if (thisStatus == 1) {
                if (thisState == 0) {
                }
                if (thisState == 1) {
                }
                if (thisState == 2) {
                }
                if (thisState == 3) {
                }
                initYstepsSpecimen(i + 1, step, parseInt(thisState), 0);
            }
            if (thisStatus == 2) {
                step[0].message = "通过";
                step[1].message = "通过";
                step[2].message = "结束";
                step[3].message = "结束";
                initYstepsSpecimen(i + 1, step, 3, 1);
                step[0].message = "";
                step[1].message = "";
                step[2].message = "";
                step[0].time = "";
                step[1].time = "";
                step[2].time = "";
            }
            if (thisStatus == 3 || thisStatus == 5 || thisStatus == 6) {
                initYstepsSpecimen(i + 1, step, parseInt(thisState), 2);
            }
        }

    }
})

//选择送样检测的检测人员
function saveDoInstrumentSpecimenUser(uid) {
    if ($("#queryTeacherNumber").val() != null && $("#queryTeacherNumber").val() != '') {
        var queryTeacherNumber = $("#queryTeacherNumber").val(); //将选中的值 添加到 array中
        //将要所有要添加的数据传给后台处理
        $.ajax({
            url: "../instrument/saveDoInstrumentSpecimenUser?uid=" + uid + "&username=" + queryTeacherNumber,
            type: 'get',
            dataType: "text",
            success: function (data) {//AJAX查询成功
                if (data == "success") {
                    alert("成功！");
                } else {
                    alert("失败！");
                }
                window.location.href = "../instrument/instrumentAppAuditListAll?currpage=1";
                // window.location.reload();
            }
        });
    } else {
        alert("请至少选择一条记录");
    }
}

function isCancelAppAllow() {
    var b = true
    var s;
    $('input[name="cancelAppCheckbox"]:checked').each(function (index, e) {
        $.ajax({
            type: 'post',
            async: false,
            data: {
                'uid': $(this).val(),
                'reType': $(this).attr('data')
            },
            url: '../instrument/canCancelInstrumentApp',
            success: function (data) {
                if (data == "success") {
                }
                else {
                    if (data == "fail") {
                        s = "超过可取消次数！";
                    }
                    if (data == "cantCancel") {
                        s = "该仪器不可取消！";
                    }
                    if (data == "isOver") {
                        s = "已超过预约开始时间，不可取消！";
                    }
                    if (data == "isNotSupportProjectAppCancel") {
                        s = "暂时不支持项目预约取消！";
                    }
                    if (data == "isOverCancleTime") {
                        s = "超过了可取消预约时间，不可取消！";
                    }
                    b = false;
                }
            },
            error: function () {
                s = "程序出错！";
                b = false;
            }
        });
        if (!b) {
            layer.msg(s);
            return b;
        }
    });
    if (b) {
        $(".cancelAppCheckboxReasonInfo_channel_book").show();
    }
}

function cancelAppCheckbox() {
    var b = true;
    var s = '';
    $('input[name="cancelAppCheckbox"]:checked').each(function (index, e) {
        $.ajax({
            type: 'post',
            async: false,
            data: {
                'uid': $(this).val(),
                'reType': $(this).attr('data'),
                "reasonInfo": $('#cancelAppCheckboxReasonInfo').val()
            },
            url: '../instrument/saveCancelInformation',
            success: function (data) {
                if (data == "success") {
                }
            },
            error: function () {
                b = false;
            }
        });
    });
    if (b) {
        layer.msg('批量取消成功');
        window.location.reload();
    } else {
        layer.msg('批量取消出错！系统异常');
    }
}

// 判断能否取消预约(可以则显示取消原因输入框，不可以则提示相关不可以的原因)
function canCancel(uid, reType) {
    var reType = reType;
    var uid = uid;
    var myData = {
        "uid": uid,
        "reType": reType
    }
    $.ajax({
        type: 'post',
        async: false,
        data: myData,
        url: '../instrument/canCancelInstrumentApp',
        success: function (data) {
            if (data == "success") {
                $("#insUid").val(uid);
                $("#reType").val(reType);
                $(".channel_book").show();
            }
            if (data == "fail") {
                alert("超过可取消次数！");
            }
            if (data == "cantCancel") {
                alert("该仪器不可取消！");
            }
            if (data == "isOver") {
                alert("已超过预约开始时间，不可取消！");
            }
            if (data == "isNotSupportProjectAppCancel") {
                alert("暂时不支持项目预约取消！");
            }
            if (data == "isOverCancleTime") {
                alert("超过了可取消预约时间，不可取消！");
            }
        },
        error: function () {
            alert("程序出错！");
        }
    })
}

function cancelThisApp() {
    var uid = $("#insUid").val();
    var reType = $("#reType").val();
    var reasonInfo = $("#reasonInfo").val();
    var myData = {
        "uid": uid,
        "reType": reType,
        "reasonInfo": reasonInfo
    }

    $.ajax({
        type: 'post',
        async: false,
        data: myData,
        url: '../instrument/saveCancelInformation',
        success: function (data) {
            if (data == "success") {
                alert("取消成功！");
                window.location.reload();
            }
        },
        error: function () {
            alert("程序出错！");
        }
    });
}

$(function () {
    //子窗口
    $(".teacherReservation").click(function () {
        var uid = $(this).attr("data");
        //多窗口模式，层叠置顶
        var win = layer.open({
            type: 2 //此处以iframe举例
            , title: '查看详情'
            , shade: 0
            , maxmin: true
            , offset: [ //为了演示，随机坐标
                0.4 * ($(window).height() - 300)
                , 0.4 * ($(window).width() - 390)
            ]
            , content: '../instrument/teacherReservationAuditMachineApp?uid=' + uid
            , success: function (layero) {
                layer.setTop(layero); //重点2
            }
        });
        layer.full(win);
    })
    $(".projectMachineAudit").on('click',function () {
        var uid = $(this).attr("data");
        // window.location.href = '../instrument/projectMachineAudit?uid=' + uid;
        //多窗口模式，层叠置顶
        var win = layer.open({
            type: 2 //此处以iframe举例
            ,title: '查看详情'
            ,shade: 0
            ,maxmin: true
            ,offset: [ //为了演示，随机坐标
                0.4*($(window).height()-300)
                ,0.4*($(window).width()-390)
            ]
            ,content: '../instrument/projectMachineAudit?uid='+uid
            ,success: function(layero){
                layer.setTop(layero); //重点2
            }
        });
        layer.full(win);
    })
//申请延时
    $(".applyDelay").click(function () {
        var uid = $(this).attr("data");
        $.ajax({
            url: "../instrument/applyDelay?uid=" + uid,
            type: "GET",
            success: function (data) {//AJAX查询成功
                if (data == "cantDelay") {
                    alert("该设备不允许延时");
                } else if (data == "noDelay") {
                    alert("后续有预约，无法延时");
                } else {
                    window.location.href = '../instrument/doInstrumentMachineApp?insUid=' + data + '&applyDelay=' + 'true' + '&appOriginalUid=' + uid;
                }

            }
        })
    })
    function applyDelay(uid) {
        var uid = uid;
        $.ajax({
            url: "../instrument/applyDelay?uid=" + uid,
            type: "POST",
            success: function (data) {//AJAX查询成功
                if (data == "cantDelay") {
                    alert("该设备不允许延时");
                } else if (data == "noDelay") {
                    alert("后续有预约，无法延时");
                } else {
                    window.location.href = '../instrument/doInstrumentMachineApp?insUid=' + data + '&applyDelay=' + 'true' + '&appOriginalUid=' + uid;
                }

            }
        })
    }
    $(".projectSpecimenAudit").click(function () {
        var uid = $(this).attr("data");
        //多窗口模式，层叠置顶
        var win = layer.open({
            type: 2 //此处以iframe举例
            , title: '查看详情'
            , shade: 0
            , maxmin: true
            , offset: [ //为了演示，随机坐标
                0.4 * ($(window).height() - 300)
                , 0.4 * ($(window).width() - 390)
            ]
            , content: '../instrument/projectSpecimenAudit?uid=' + uid
            , success: function (layero) {
                layer.setTop(layero); //重点2
            }
        });
        layer.full(win);
    })
//子窗口
    $(".teacherReservationSpecimen").click(function () {
        var uid = $(this).attr("data");
        //多窗口模式，层叠置顶
        var win = layer.open({
            type: 2 //此处以iframe举例
            , title: '查看详情'
            , shade: 0
            , maxmin: true
            , offset: [ //为了演示，随机坐标
                0.4 * ($(window).height() - 300)
                , 0.4 * ($(window).width() - 390)
            ]
            , content: '../instrument/teacherReservationAuditSpecimenApp?uid=' + uid


            , success: function (layero) {
                layer.setTop(layero); //重点2
            }
        });
        layer.full(win);
    })
    $(".labManagerReservation").click(function () {
        var uid = $(this).attr("data");
        //多窗口模式，层叠置顶
        var win = layer.open({
            type: 2 //此处以iframe举例
            , title: '查看详情'
            , shade: 0
            , maxmin: true
            , offset: [ //为了演示，随机坐标
                0.4 * ($(window).height() - 300)
                , 0.4 * ($(window).width() - 390)
            ]
            , content: '../instrument/labManagerReservationAuditMachineApp?uid=' + uid


            , success: function (layero) {
                layer.setTop(layero); //重点2
            }
        });
        layer.full(win);
    })
    $(".managerReservation").click(function () {
        var uid = $(this).attr("data");
        //多窗口模式，层叠置顶
        var win = layer.open({
            type: 2 //此处以iframe举例
            , title: '查看详情'
            , shade: 0
            , maxmin: true
            , offset: [ //为了演示，随机坐标
                0.4 * ($(window).height() - 300)
                , 0.4 * ($(window).width() - 390)
            ]
            , content: '../instrument/managerReservationAuditMachineApp?uid=' + uid


            , success: function (layero) {
                layer.setTop(layero); //重点2
            }
        });
        layer.full(win);
    })
    $(".viewReservation").click(function () {
        var uid = $(this).attr("data");
        //多窗口模式，层叠置顶
        var win = layer.open({
            type: 2 //此处以iframe举例
            , title: '查看详情'
            , shade: 0
            , maxmin: true
            , offset: [ //为了演示，随机坐标
                0.4 * ($(window).height() - 300)
                , 0.4 * ($(window).width() - 390)
            ]
            , content: '../instrument/projectMachineAudit?uid=' + uid


            , success: function (layero) {
                layer.setTop(layero); //重点2
            }
        });
        layer.full(win);
    })
    $(".viewReservationSpecimen").click(function () {
        var uid = $(this).attr("data");
        //多窗口模式，层叠置顶
        var win = layer.open({
            type: 2 //此处以iframe举例
            , title: '查看详情'
            , shade: 0
            , maxmin: true
            , offset: [ //为了演示，随机坐标
                0.4 * ($(window).height() - 300)
                , 0.4 * ($(window).width() - 390)
            ]
            , content: '../instrument/viewReservationAuditSpecimenApp?uid=' + uid


            , success: function (layero) {
                layer.setTop(layero); //重点2
            }
        });
        layer.full(win);
    })
    /*$(".viewReservationSpecimen").click(function () {
        var uid = $(this).attr("data");
        //多窗口模式，层叠置顶
        var win = layer.open({
            type: 2 //此处以iframe举例
            , title: '查看详情'
            , shade: 0
            , maxmin: true
            , offset: [ //为了演示，随机坐标
                0.4 * ($(window).height() - 300)
                , 0.4 * ($(window).width() - 390)
            ]
            , content: '../instrument/viewReservationAuditSpecimenApp?uid=' + uid


            , success: function (layero) {
                layer.setTop(layero); //重点2
            }
        });
        layer.full(win);
    })*/
    $(".pushAgentUseTime").click(function () {
        var uid = $(this).attr("data");
        $.ajax({
            url: "../instrument/pushAgentUseTime?uid=" + uid,
            type: 'POST',
            asyn: false,
            dataType: "json",
            success: function (data) {//AJAX查询成功
                if (data == "success") {
                    alert("同步成功");
                    window.location.reload();
                } else {
                    alert("同步失败！");
                }
            }
        });
    })
    $(".checkElectricInfo").click(function () {
        var uid = $(this).attr("data");
        //多窗口模式，层叠置顶
        var win = layer.open({
            type: 2 //此处以iframe举例
            , title: '查看详情'
            , shade: 0
            , maxmin: true
            , offset: [ //为了演示，随机坐标
                0.4 * ($(window).height() - 300)
                , 0.4 * ($(window).width() - 390)
            ]
            , content: '../instrument/checkElectricInfo?uid=' + uid


            , success: function (layero) {
                layer.setTop(layero); //重点2
            }
        });
        layer.full(win);
    })
    $(".managerReservationSpecimen").click(function () {
        var uid = $(this).attr("data");
        //多窗口模式，层叠置顶
        var win = layer.open({
            type: 2 //此处以iframe举例
            , title: '查看详情'
            , shade: 0
            , maxmin: true
            , offset: [ //为了演示，随机坐标
                0.4 * ($(window).height() - 300)
                , 0.4 * ($(window).width() - 390)
            ]
            , content: '../instrument/managerReservationAuditSpecimenApp?uid=' + uid


            , success: function (layero) {
                layer.setTop(layero); //重点2
            }
        });
        layer.full(win);
    })
    $(".confirmSpecimen").click(function () {
        var uid = $(this).attr("data");
        //多窗口模式，层叠置顶
        var win = layer.open({
            type: 2 //此处以iframe举例
            , title: '查看详情'
            , shade: 0
            , maxmin: true
            , offset: [ //为了演示，随机坐标
                0.4 * ($(window).height() - 300)
                , 0.4 * ($(window).width() - 390)
            ]
            , content: '../instrument/confirmSpecimen?uid=' + uid


            , success: function (layero) {
                layer.setTop(layero); //重点2
            }
        });
        layer.full(win);
    })
    $(".allocateSpecimen").click(function () {
        var uid = $(this).attr("data");
        //多窗口模式，层叠置顶
        var win = layer.open({
            type: 2 //此处以iframe举例
            , title: '查看详情'
            , shade: 0
            , maxmin: true
            , offset: [ //为了演示，随机坐标
                0.4 * ($(window).height() - 300)
                , 0.4 * ($(window).width() - 390)
            ]
            , content: '../instrument/allocateSpecimen?uid=' + uid


            , success: function (layero) {
                layer.setTop(layero); //重点2
            }
        });
        layer.full(win);
    })
    $(".confirmFinishSpecimen").unbind('click').click(function () {
        var uid = $(this).attr("data");
        //多窗口模式，层叠置顶
        var win = layer.open({
            type: 2 //此处以iframe举例
            , title: '查看详情'
            , shade: 0
            , maxmin: true
            , offset: [ //为了演示，随机坐标
                0.4 * ($(window).height() - 300)
                , 0.4 * ($(window).width() - 390)
            ]
            , content: '../instrument/confirmFinishSpecimen?uid=' + uid


            , success: function (layero) {
                layer.setTop(layero); //重点2
            }
        });
        layer.full(win);
    })
    $(".editMachineReservationEvaluation").click(function () {
        var uid = $(this).attr("data");
        //多窗口模式，层叠置顶
        var win = layer.open({
            type: 2 //此处以iframe举例
            , title: '查看详情'
            , shade: 0
            , maxmin: true
            , offset: [ //为了演示，随机坐标
                0.4 * ($(window).height() - 300)
                , 0.4 * ($(window).width() - 390)
            ]
            , content: '../instrument/editMachineReservationEvaluation?uid=' + uid


            , success: function (layero) {
                layer.setTop(layero); //重点2
            }
        });
        layer.full(win);
    })
    $(".editSpecimenReservationEvaluation").click(function () {
        var uid = $(this).attr("data");
        //多窗口模式，层叠置顶
        var win = layer.open({
            type: 2 //此处以iframe举例
            , title: '查看详情'
            , shade: 0
            , maxmin: true
            , offset: [ //为了演示，随机坐标
                0.4 * ($(window).height() - 300)
                , 0.4 * ($(window).width() - 390)
            ]
            , content: '../instrument/editSpecimenReservationEvaluation?uid=' + uid


            , success: function (layero) {
                layer.setTop(layero); //重点2
            }
        });
        layer.full(win);
    })

    $(".viewMachineReservationEvaluation").click(function () {
        var uid = $(this).attr("data");
        //多窗口模式，层叠置顶
        var win = layer.open({
            type: 2 //此处以iframe举例
            , title: '查看详情'
            , shade: 0
            , maxmin: true
            , offset: [ //为了演示，随机坐标
                0.4 * ($(window).height() - 300)
                , 0.4 * ($(window).width() - 390)
            ]
            , content: '../instrument/viewMachineReservationEvaluation?uid=' + uid


            , success: function (layero) {
                layer.setTop(layero); //重点2
            }
        });
        layer.full(win);
    })
    $(".viewSpecimenReservationEvaluation").click(function () {
        var uid = $(this).attr("data");
        //多窗口模式，层叠置顶
        var win = layer.open({
            type: 2 //此处以iframe举例
            , title: '查看详情'
            , shade: 0
            , maxmin: true
            , offset: [ //为了演示，随机坐标
                0.4 * ($(window).height() - 300)
                , 0.4 * ($(window).width() - 390)
            ]
            , content: '../instrument/viewSpecimenReservationEvaluation?uid=' + uid


            , success: function (layero) {
                layer.setTop(layero); //重点2
            }
        });
        layer.full(win);
    })
})
function Access(id, specimenAppUid) {
    targetDeviceId = id;
    // var specimenAppUid = "";
    // specimenAppUid = $(obj).attr("data");
    $.ajax({
        url: "../instrument/securityAccess?id=" + id,
        type: "GET",
        dataType: "TEXT",
        success: function (data) {//AJAX查询成功
            if (data == "noMachineConfig") {
                alert("没有设置机时预约相关参数，请联系管理员设置后再预约！");
            } else {
                if (data == "success" || data == "isRead" || data == "isManager" || data == "") {
                    //校外送样检测的机时预约
                    window.location.href = '../instrument/doInstrumentMachineApp?insUid=' + id + '&specimenAppUid=' + specimenAppUid;
                } else if (data == "error") {
                    layer.msg('您还未通过培训,请先预约培训!', {
                        time: 0 //不自动关闭
                        , btn: ['去预约培训', '先不预约了']
                        , yes: function (index) {
                            layer.close(index);
                            window.location.href = "../config/viewInstrumentTrainingForApp?currpage=1&insUid=" + id;
                        }
                        , btn2: function () {
                            window.location.reload();
                        }
                    });
                } else if (data == "noManager") {
                    alert("该设备还未添加设备管理员，暂不能预约，请联系相关人员进行添加！");
                } else if (data == "isBlack") {
                    alert("您已被加入黑名单，暂不能预约，请联系相关人员！");
                } else if (data == "inTraining") {
                    alert("您已在培训中，通过培训后方可预约！");
                } else if (data == "lowScore") {
                    alert("您的信誉积分不足，无法预约！");
                } else if (data == "notAcademy") {
                    alert("该设备未对您所在的学院开放预约，请联系相关人员！");
                } else if (data == "unAccessTest") {
                    layer.msg('您还未通过考试,请先通过考试!', {
                        time: 0 //不自动关闭
                        , btn: ['去参加', '先不预约了']
                        , yes: function (index) {
                            layer.close(index);
                            window.location.href = "../config/viewInstrumentTest?insUid=" + id;
                        }
                        , btn2: function () {
                            window.location.reload();
                        }
                    });
                }
                else {
                    layer.msg(data, {
                        time: 0 //不自动关闭
                        , btn: ['我已阅读，去预约', '先不预约了']
                        , yes: function (index) {
                            layer.close(index);
                            window.location.href = "../instrument/doInstrumentMachineApp?insUid=" + id;
                        }
                        , btn2: function () {
                            window.location.reload();
                        }
                    });
                }
            }

        }
    })
}

//查看已取消预约原因
function viewCancelReason(uid, reType) {
    $.ajax({
        type: 'post',
        async: false,
        url: "../instrument/viewCancelReason?uid=" + uid + "&reType=" + reType,
        success: function (data) {
            $("#viewCancleReason-reason").html(data);
            $("#viewCancleReasonbackGround").show();
        },
        error: function () {
            alert("程序出错！");
        }
    });
}

//点击关闭取消原因弹窗
function closeViewCancleReason() {
    $("#viewCancleReasonbackGround").hide();
}



