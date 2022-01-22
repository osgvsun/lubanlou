function goEdit() {
    var inputs = $(".form_input");
    inputs.each(function (i,inp) {
        setTimeout(function () {
            if($(inp).attr("id") =="labRoomType" ||$(inp).attr("id") =="labRoomActive" ||$(inp).attr("id") =="labRoomAudit"){
                $(inp).fadeOut(0).next().fadeIn(0);
            }else{
                $(inp).css("background-color","rgb(232,231,227)").removeAttr("readonly");
            }
        },parseInt($(inp).attr("delay"))*50)
    });
    $("#editButton").fadeOut(500);
    setTimeout(function () {
        $("#saveButton").fadeIn(500);
    },500);
}
function goSave() {
    var info = new FormData(document.getElementById("infoForm"));
    $.ajax({
        url:"../lab/saveLabRoomInfo",
        type:"POST",
        //dataType:"json",
        data:info,
        processData:false,
        contentType:false,
        success: function (data) {
            if(data=="success"){
                alert("保存成功")
                location.reload(true);
            }else{
                alert("填写数据错误，请检查主任或学院或校区是否存在");
            }
        },
        error: function(data,error,obj) {
            alert("保存失败，请检查网络或稍后再试");
        }
    });
}
function showTheForm(formName) {
    var currName = $("#currForm").val();
    if(formName != currName){
        $("#currForm").val(formName);
        $("#" + currName).fadeOut(500);
        $("#" + currName+"Button").parent().attr("id","aaa");
        $("#"+formName+"Button").parent().attr("id","left_choose");
        setTimeout(function () {
            $("#"+formName).fadeIn(500);
        },500);
    }
}
//初始化
$(function() {
    $("#all").click(function() {
        $('input[name="CK_name"]').attr("checked",this.checked);
    });
    var $subBox = $("input[name='CK_name']");
    $subBox.click(function(){
        $("#all").attr("checked",$subBox.length == $("input[name='CK_name']:checked").length ? true : false);
    });
    $("#allDevice").click(function() {
        $('input[name="Device_name"]').attr("checked",this.checked);
    });
    var $subBox = $("input[name='Device_name']");
    $subBox.click(function(){
        $("#allDevice").attr("checked",$subBox.length == $("input[name='Device_name']:checked").length ? true : false);
    });
    $("#moveTo").coolautosuggest({
        url:encodeURI(encodeURI("../lab/getLabRoom?id=")),
        onSelected:function(result){
            $("#moveTo").val(result.data);
            $("#moveToId").val(result.labId);
        }
    });
    $(".faileButton").click(function(event) {
        /* Act on the event */
        $(".loadfalse").css('display', 'none');
        $(".back_shadow").css('display', 'none');
    });
});

//批量删除管理员
function deleteSelectedAdmin(labRoomId) {
    var agentAdminList=new Array();
    var adminList=new Array();
    $("input[name='CK_name']:checkbox").each(function() { //遍历所有的name为selectFlag的 checkbox
        if ($(this).attr("checked")) { //判断是否选中
            if($(this).val() == "1"){//管理员
                adminList.push($(this).attr("id")); //将选中的值 添加到 array中
            }else{//物联管理员
                agentAdminList.push($(this).attr("id")); //将选中的值 添加到 array中
            }

        }
    });
    $.ajax({
        url: "../lab/deletAllLabRoomAdmin?labRoomId=" + labRoomId + "&adminList=" + adminList+ "&agentAdminList=" + agentAdminList,
        dataType: 'json',
        type: 'GET',
        success: function () {
           alert("删除成功");
           //删除对应数据
            $("input[name='CK_name']:checkbox").each(function() { //遍历所有的name为selectFlag的 checkbox
                if ($(this).attr("checked")) { //判断是否选中
                    $(this).parent().parent().remove();
                }
            });
        }
    });
}

function deleteAdmin(labRoomId,username,type,obj) {
    $.ajax({
        url: "../lab/deletLabRoomAdmin?labRoomId=" + labRoomId + "&username=" + username+ "&type=" + type,
        dataType: 'json',
        type: 'GET',
        success: function () {
            alert("删除成功");
            //删除对应的数据
            $(obj).parent().parent().remove();
        }
    });
}

function searchAdmin() {
    var data = $("#adminSearch").val();
    $.ajax({
        url:"../lab/getUsers?data="+data,
        //dataType:'json',
        type:'GET',
        success:function (data) {
            $("#searchedAdmin").empty();
            $.each(data,function (key,val) {
                $("#searchedAdmin").append("<tr><td>"+val+"</td><td>"+key+"</td><td><input type='button' class='search ml10' style='float: none;' value='添加' onclick='addAdmin(\""+key+"\",\""+val+"\")'/></td></tr>");
            });
        }
    });
}
function addAdmin(username,cname) {
    $("#selected"+username).remove();
    $("#selectedAdmin").append("<tr id='selected"+username+"'><td>"+cname+"</td><td name='S_username'>"+username+"</td><td><input type='button' class='search ml10' style='float: none;' value='移除' onclick='removeAdmin(\""+username+"\")'/></td></tr>");
}

function removeAdmin(username) {
    $("#selected"+username).remove();
}

function emptyAdmin() {
    $("#selectedAdmin").empty();
}

function openAdminEditer(type){
    $("#addAdminType").val(type);
    if(type==1){
        $("#labAdminWindow").attr("title","添加管理员");
    }else{
        $("#labAdminWindow").attr("title","添加物联管理员");
    }
    $("#labAdminWindow").window('open');
}

function confrimAddAdmin(labRoomId) {
    var type = $("#addAdminType").val();
    var usernames = new Array();
    $("td[name='S_username']").each(function() { //遍历所有的name为selectFlag的 checkbox
        usernames.push($(this).text())
    });
    $.ajax({
        url:"../lab/saveLabAdmin?type="+type+"&usernames="+usernames+"&labRoomId="+labRoomId,
        type:"GET",
        //dataType:"json",
        success: function () {
            $(".panel-tool-close").click();
            alert("保存成功")
            //增加数据
           $.each(usernames,function f(index,username) {
               var cname = $($("#selected"+username).children().get(0)).text();
               if(type==1){
               $("#adminShowTable").append("<tr><td><input type='checkbox' name='CK_name' id='"+username+"' value='"+cname+"'/><label for='\"+username+\"'></label></td>" +
                   "<td>"+cname+"</td>" +
                   "<td>"+username+"</td>" +
                   "<td>管理员</td>" +
                   "<td><a onclick='deleteAdmin("+labRoomId+","+username+","+type+",this)'>删除</a></td></tr>");
               }else{
                   $("#adminShowTable").append("<tr><td><input type='checkbox' name='CK_name' id='"+username+"' value='"+cname+"'/><label for='\"+username+\"'></label></td>" +
                       "<td>"+cname+"</td>" +
                       "<td>"+username+"</td>" +
                       "<td>物联管理员</td>" +
                       "<td><a onclick='deleteAdmin("+labRoomId+","+username+","+type+",this)'>删除</a></td></tr>");
               }
               //清空
               emptyAdmin();
            });
        },
        error: function(data,error,obj) {
            alert("保存失败，请检查网络或稍后再试");
        }
    });
}

function deleteAgent(id) {
    $.ajax({
        url:'../lab/deleteLabRoomAgent?id='+id,
        //dataType:'json',
        type:'GET',
        success:function () {
            alert("删除成功");
            $("#agent"+id).remove();
        }
    });
}

function confirmLabRoomAgent() {
    var form= new FormData(document.getElementById("labAgentEditorForm"));
    $.ajax({
        url:"../lab/saveLabRoomAgent",
        type:"POST",
        //dataType:"json",
        data:form,
        processData:false,
        contentType:false,
        success: function (data) {
                //关窗口
                $(".panel-tool-close").click();
                alert("保存成功")
                //插数据
                $("#agent"+data.id).remove();
                $("#labRoomAgentShowTable").append("<tr id='agent"+data.id+"' align='center'>" +
                    "<td>"+data.cname+"</td>" +
                    "<td>"+form.get("hardwareIp")+"</td>" +
                    "<td>"+form.get("hardwarePort")+"</td>" +
                    "<td>"+form.get("hardwareType")+"</td>" +
                    "<td></td>" +
                    "<td><a onclick='editorAgent("+data.id+")'>修改</a> <a onclick='deleteAgent("+data.id+")'>删除</a></td>" +
                    "</tr>")
        },
        error: function(data,error,obj) {
            alert("保存失败，请检查网络或稍后再试");
        }
    });
}

function editorAgent(id) {
    //获取数据
    $.ajax({
        url:'../lab/findLabAgent?id='+id,
        //dataType:'json',
        type:'GET',
        success:function (data) {
            $($("#labAgentEditorForm").children().get(0)).val(data.id)
            $("#hardwareType").val(data.hardwareType);
            $("#hardwareIp").val(data.hardwareIp);
            $("#hardwarePort").val(data.hardwarePort);
            $("#hardwareRemark").val(data.hardwareRemark)
            $("#serverId").val(data.serverId);
            $("#labAgentWindow").window('open');
        },
        error: function(data,error,obj) {
            alert("读取数据失败，请检查网络或稍后再试");
        }
    });
}

function testIsIp(){
    var hardwareIp=$("#hardwareIp").val();
    var reSpaceCheck = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;
    if (reSpaceCheck.test(hardwareIp)) {
        hardwareIp.match(reSpaceCheck);
        if (RegExp.$1 <= 255 && RegExp.$1 >= 0
            && RegExp.$2 <= 255 && RegExp.$2 >= 0
            && RegExp.$3 <= 255 && RegExp.$3 >= 0
            && RegExp.$4 <= 255 && RegExp.$4 >= 0) {
            //do nothing
        }
        else {
            alert("您输入的ip地址不合法")
        }
    }
    else {
        alert("您输入的ip地址不合法")
    }
}
function newAgent() {
    $("#aggentId").val("-1");
    $("#hardwareIp").val("");
    $("#hardwarePort").val("");
    $("#hardwareRemark").val("")
    $("#labAgentWindow").window('open');
}

function allocatingAdmin(btn) {
    //找到输入框
    var input = $(btn).parent().prev().children().get(1);
    $(input).coolautosuggest({
        url:encodeURI(encodeURI("../lab/getUser?username=")),
        onSelected:function(result){
            var data = result.data.split('|');
            $(input).val(data[1]+'('+data[0]+')').prev().val(result.username);
        }
    });
    $(input).attr("readonly",false).css("background-color","rgba(232,231,227,1)").next().next().fadeIn(0).next().fadeIn(0);

}

function confirmDeviceAdmin(btn,id) {
    //获取用户名
    var username = $(btn).prev().prev().prev().prev().val();
    //判断是否为空
    if(username == null){
        alert("请输入用户");
    }else{
        $.ajax({
            url:'../lab/setDeviceAdmin?username='+username+'&id='+id,
            type:'GET',
            //dataType:'json',
            success:function (data) {
                if(data == "success"){
                    //隐藏输入框
                    $(btn).fadeOut(0).prev().fadeOut(0).prev().prev().attr("readonly","true").css("background-color","rgba(232,231,227,0)").next().remove();
                }else {
                    alert("修改失败，请检查用户是否存在");
                }
            },
            error:function () {
                alert("修改成功");
                window.location.reload();
            }

        });
    }
}
function cancelDeviceAdmin(btn,id) {
    //清空输入框,username
    $(btn).prev().prev().attr("value","").removeAttr("autocomplete").prev().val(-1);
    //调用保存
    confirmDeviceAdmin($(btn).next(),id);
}

function deviceMove() {


    //显示实验室
    var first = $("#deviceManagerDiv").children().get(0);
    $(first).fadeOut(500).next().fadeOut(500).next().next().next().fadeIn(0).next().next().fadeIn(0).next().fadeIn(0);
    setTimeout(function () {
        $(first).next().next().fadeIn(500).next().fadeIn(500);
    },500);

}
function confirmDeviceMove(labRoomId) {
    var moveto = parseInt($("#moveToId").val());
    if(parseInt(labRoomId) == moveto){
        alert("不能往本实验室转移设备！");
        return false;
    }
    var ids = new Array();
    var flag = false;
    $("input[name='Device_name']:checkbox").each(function() { //遍历所有的name为selectFlag的 checkbox
        if ($(this).attr("checked")) { //判断是否选中
            // $(this).parent().parent().remove();
            ids.push($(this).val());
            flag=true;
        }
    });
    if(!flag){
        alert("请选择设备！");
    }else{
        $.ajax({
            url: "../lab/deviceMove?moveTo=" + moveto + "&ids=" + ids,
            type: 'GET',
            success: function (data) {
                if(data=="success"){
                    alert("转移成功");
                    //删除对应数据
                    $("input[name='Device_name']:checkbox").each(function() { //遍历所有的name为selectFlag的 checkbox
                        if ($(this).attr("checked")) { //判断是否选中
                            $(this).parent().parent().remove();
                        }
                    });
                    //隐藏转移界面
                    cancelDeviceMove();
                }else{
                    alert("转移失败，请检查实验室是否存在")
                }
            }
        });
    }
}
function removeLabDevice(){
    //设置值为-1；
    $("#moveToId").val(-1);
    //调用转移
    confirmDeviceMove(0);
}
function cancelDeviceMove() {
    var first = $("#deviceManagerDiv").children().get(0);
    $(first).fadeIn(0).next().fadeIn(0).next().fadeOut(0).next().fadeOut(0).next().fadeOut(0).next().next().fadeOut(0).next().fadeOut(0);
}

function searchDevice() {
    var data = $("#deviceSearch").val();
    $.ajax({
        url:"../lab/getDevices?data="+data,
        //dataType:'json',
        type:'GET',
        success:function (data) {
            $("#searchedDevice").empty();
            $.each(data,function (index,val) {
                $("#searchedDevice").append("<tr><td>"+val.deviceName+"</td><td>"+val.deviceNumber+"</td><td>"+val.devicePrice+"</td><td><input type='button' class='search ml10' style='float: none;' value='添加' onclick='addDevice(\""+val.deviceName+"\",\""+val.deviceNumber+"\",\""+val.devicePrice+"\")'/></td></tr>");
            });
        }
    });
}
function addDevice(name,number,price) {
    $("#selectedDevice"+number).remove();
    $("#selectedDevice").append("<tr id='selectedDevice"+number+"'><td>"+name+"</td><td name='S_device'>"+number+"</td><td>"+price+"</td><td><input type='button' class='search ml10' style='float: none;' value='移除' onclick='removeDevice(\""+number+"\")'/></td></tr>");
}

function removeDevice(number) {
    $("#selectedDevice"+number).remove();
}

function emptyDevice() {
    $("#selectedDevice").empty();
}
function openDeviceEditer(){
    $("#labDeviceWindow").window('open');
}

function confrimAddDevice(labRoomId) {
    var devicesNumbers = new Array();
    $("td[name='S_device']").each(function() { //遍历所有的name为selectFlag的 checkbox
        devicesNumbers.push($(this).text())
    });
    $.ajax({
        url:"../lab/saveLabDevice?devicesNumbers="+devicesNumbers+"&labRoomId="+labRoomId,
        type:"POST",
        //dataType:"json",
        success: function (data) {
            $(".panel-tool-close").click();
            alert("添加成功")
            //增加数据
            $.each(data,function (index,value) {
                $("#deviceShowTable").append("<tr id='device"+value.id+"'  align='center'>" +
                    "<td><input type='checkbox' name='Device_name' id='"+value.id+"' value='"+value.id+"'/><label for='"+value.id+"'></label></td>" +
                    "<td>"+value.deviceName+"</td>" +
                    "<td>"+value.deviceNumber+"</td>" +
                    "<td>"+value.devicePrice+"</td>" +
                    "<td>" +
                    "<input type='hidden' value/>" +
                    "<input style='border-width: 0px;background-color:rgba(232,231,227,0);' readonly='true'/>" +
                    "<input style='display: none;border-color: brown;background-color: brown;margin-left: 10px;' class='search ml10 r' onclick='cancelDeviceAdmin(this,"+value.id+")' type='button' value='撤销资格'/>" +
                    "<input style='display: none;' class='search ml10 r' onclick='confirmDeviceAdmin(this,"+value.id+")' type='button' value='确认'/>" +
                    "</td>" +
                    "<td><a onclick='allocatingAdmin(this)'>分配管理员</a></td>" +
                    "</tr>");
            });
            //清空
            emptyDevice();
        },
        error: function(data,error,obj) {
            alert("添加失败，请检查网络或稍后再试");
        }
    });
}

function refreshPermissions(roomId){
    // alert("正在刷新，请稍等！")
    $(".loading").css("display","block");
    $(".back_shadow").css("display","block");
    $.ajax({
        url:'../lab/refreshPermissions?roomId='+roomId+'',
        type:"POST",
        // //dataType:"json",
        success:function(data){
            console.log(data);
            if(data.indexOf("true")){
                if(data=="noFound"){
                    alert("该实验室未绑定门禁");
                    $(".loadfalse").css("display","block");
                    $(".loading").css("display","none");
                }else{
                    alert("刷新成功");
                    $(".loading").css("display","none");
                    $(".back_shadow").css("display","none");
                }
            }else{
                alert("门禁设备失效");
                $(".loadfalse").css("display","block");
                $(".loading").css("display","none");
            }
        },error:function (request){
            alert("请求错误");
            $(".loading").css("display","none");
            $(".back_shadow").css("display","none");
        }
    });
}
function openDoor(agentId){
    $.ajax({
        url: '../lab/openDoor?agentId=' + agentId + '',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data == "sucess") {
                alert("开门成功！");
            } else {
                alert("开门失败，请检查当前网络连接或者再试一次。");
            }

        }
    });
}

function openVideo(roomID) {
    var url = "../smartAgent/labVideo?id="+roomID;
    window.open(url); // 新窗口
}