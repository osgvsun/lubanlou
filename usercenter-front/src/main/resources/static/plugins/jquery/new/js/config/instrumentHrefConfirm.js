//仪器详情的几个超链接公共的confirm功能
//AJAX预约前验证
function Access(id){
    var flag=false;
    $.ajax({
        url:"../instrument/securityAccess?id="+id,
        type:"GET",
        async:false,
        dataType:"TEXT",
        success:function(data){//AJAX查询成功
            if(data=="noMachineConfig"){
                alert("没有设置机时预约相关参数，请联系管理员设置后再预约！");
            }else{
                if(data=="success"){
                    flag=true;
                }else if(data=="error"){
                    layer.msg('您还未通过培训,请先预约培训!', {
                        time: 0 //不自动关闭
                        ,btn: ['去预约培训', '先不预约了']
                        ,yes: function(index){
                            layer.close(index);
                            window.location.href= "../config/viewInstrumentTrainingForApp?currpage=1&insUid="+id;
                        }
                    });
                }else if(data=="noManager"){
                    alert("该设备还未添加设备管理员，暂不能预约，请联系相关人员进行添加！");
                }else if(data=="thisSchoolAcademyNoNumber") {
                    alert("在schoolDevice表中这个设备的departmentNumber为空，请联系数据查看并修改！");
                }else if(data=="isBlack"){
                    alert("您已被加入黑名单，暂不能预约，请联系相关人员！");
                }else if(data=="isRead" || data=="isManager"|| data==""){
                    flag=true;
                }else if(data=="inTraining"){
                    alert("您已在培训中，通过培训后方可预约！");
                }else if(data=="notAcademy"){
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
                            return;
                        }
                    });
                }else{
                    layer.msg(data, {
                        time: 0 //不自动关闭
                        ,btn: ['我已阅读，去预约', '先不预约了']
                        ,yes: function(index){
                            layer.close(index);
                            flag=true;
                        }
                    });
                }
            }
        }
    });
    return flag;
}
//AJAX预约前验证
function AccessSpeci(id){
    var flag=false;
    targetDeviceId = id;
    $.ajax({
        url:"../instrument/isSpecimenExist?id="+id,
        type:"GET",
        async:false,
        dataType:"TEXT",
        success:function(data){//AJAX查询成功
            if(data=="noSpecimenConfig"){
                alert("没有设置送样检测相关参数，请联系管理员设置后再预约！");
                flag=false;
            }else{
                flag=true;
                //window.location.href= "../instrument/doInstrumentSpecimenApp?insUid="+id;
            }
        }
    })
    return flag;
}