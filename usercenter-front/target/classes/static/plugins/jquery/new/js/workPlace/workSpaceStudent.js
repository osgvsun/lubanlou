
//flag 1 2 3是待审核 已通过 已拒绝的flag（机时预约），myType是机时预约还是送样检测 stage是审核的stage(flag的 意义其实代表了工作平台上的相应标签)
//学生都可以看到待审核 所以学生是stage=-1    -1即所有，
function changeTitle(flag,myType,stage){
    var myData={
        "flag":flag,
        "myType":myType,
        "stage":stage
    }
    $.ajax({
        url:"../tUser/changeTitleOfReservationInWorkPlace",
        type:'POST',
        async:false,
        data:myData,
        dataType: "json",
        success:function(data){//AJAX查询成功
            if(myType=="1"){
                $("#reservation").html("");
                var i=0;
                if(data!=null){
                    for(var js in data){
                        // <a th:if="${instrumentApp[4] == '2' or instrumentApp[4] == 2}"  class="instru_btn"  th:onclick="'agree(&quot;'+${instrumentApp[15]}+'&quot;,1,1)'">同意</a>
                        //         <a th:if="${instrumentApp[4] == '2' or instrumentApp[4] == 2}"  class="instru_btn"  th:onclick="'agree(&quot;'+${instrumentApp[15]}+'&quot;,0,1)'">拒绝</a>
                        // <a class="instru_btn" th:href="@{/instrument/teacherReservationAuditMachineApp(uid=${instrumentApp[15]})}">查看</a>
                        var a_tag2 = "<td><a class=\"instru_btn\" href='../instrument/teacherReservationAuditMachineApp?uid="+data[i].appUid+"'>"
                            +"查看</a></td>";
                        var td =
                            "<td>"+data[i].resUser + "</td>" +
                            // "<td>"+data[i].appTime + "</td>" +
                            "<td>"+data[i].deviceName + "("+data[i].deviceNumber+")</td>" +
                            "<td>"+data[i].labRoomName+"</td>"+
                            "<td>"+data[i].beginTime+"</td>"+
                            "<td>"+data[i].endTime+"</td>";
                        var td2="";
                        if(data[i].state=="0"){
                            td2="<td>等待导师审核</td>";
                        }
                        if(data[i].state=="1"){
                            td2="<td>等待实验室管理员审核</td>";
                        }
                        if(data[i].state=="2"){
                            td2="<td>等待设备管理员审核</td>";
                        }
                        if(data[i].state=="3"){
                            td2="<td>完成审核</td>";
                        }
                        var str = "<tr id='"+data[i].appUid+"'></tr>";
                        var $str = $(str);
                        $str.append($(td));
                        $str.append($(td2));
                        $str.append($(a_tag2));
                        $("#reservation").append($str);
                        i++;
                    }
                }
            }else{
                $("#reservation1").html("");
                var i=0;
                if(data!=null){
                    for(var js in data){
                        var td2="";
                        if(data[i].state=="0"){
                            td2="<td>等待导师审核</td>";
                        }
                        if(data[i].state=="1"){
                            td2="<td>等待设备管理员审核</td>";
                        }
                        if(data[i].state=="2"){
                            td2="<td>等待接样</td>";
                        }
                        if(data[i].state=="3"){
                            td2="<td>等待分发</td>";
                        }
                        if(data[i].state=="3"){
                            td2="<td>等待确认检测完成</td>";
                        }
                        // <a th:if="${instrumentApp[4] == '2' or instrumentApp[4] == 2}"  class="instru_btn"  th:onclick="'agree(&quot;'+${instrumentApp[15]}+'&quot;,1,1)'">同意</a>
                        //         <a th:if="${instrumentApp[4] == '2' or instrumentApp[4] == 2}"  class="instru_btn"  th:onclick="'agree(&quot;'+${instrumentApp[15]}+'&quot;,0,1)'">拒绝</a>
                        // <a class="instru_btn" th:href="@{/instrument/teacherReservationAuditMachineApp(uid=${instrumentApp[15]})}">查看</a>
                        var a_tag2 = "<td><a class=\"instru_btn\" href='../instrument/teacherReservationAuditSpecimenApp?uid="+data[i].appUid+"'>"
                            +"查看</a></td>";
                        var td =
                            "<td>"+data[i].resUser + "</td>" +
                            "<td>"+data[i].deviceName + "("+data[i].deviceNumber+")</td>" +
                            "<td>"+data[i].labRoomName+"</td>"+
                            "<td>送样时间："+data[i].beginTime+"</td>"+
                            // "<td>期望时间："+data[i].endTime+"</td>";
                            "<td>送样数："+data[i].specimenNumber+"</td>";
                        var str = "<tr id='"+data[i].appUid+"'></tr>";
                        var $str = $(str);
                        $str.append($(td));
                        $str.append($(td2));
                        $str.append($(a_tag2));
                        $("#reservation1").append($str);
                        i++;
                    }
                }
            }

        }

    });
}
function changeBillingTitle(flag){
    var myData={
        "flag":flag,
    }
    $.ajax({
        url:"../tUser/changeTitleOfBillingInWorkPlace",
        type:'POST',
        async:false,
        data:myData,
        dataType: "json",
        success:function(data){//AJAX查询成功
            $("#reservation2").html("");
            var i=0;
            if(data!=null){
                for(var js in data){
                    if(data[i].type=='1'){
                    var span =
                        "<td>" + data[i].deviceName +
                        '('+data[i].deviceNumber+')</td><td>机时预约</td><td> '+
                        '</td><td>'+data[i].labRoomName+'</td><td> '+
                        data[i].billing+
                        '</td><td colspan="2">'+data[i].beginTime.substring(0,16)+
                        '-'+data[i].endTime.substring(0,16)+'</td><td> '+
                        '</td><td> '+
                        "</td>";}
                        else{
                        var span =
                            "<td>" + data[i].deviceName +
                            '('+data[i].deviceNumber+')</td><td>送样检测</td><td> '+
                            '</td><td>'+data[i].labRoomName+'</td><td> '+
                            data[i].billing+
                            '</td><td>'+data[i].beginTime.substring(0,9)+'</td><td>'
                            +data[i].endTime.substring(0,9)+'</td><td> '+
                            '</td><td> '+
                            "</td>";
                    }
                    var a_tag="<a href='#' onclick='doAppChargeConfirm(&quot;"+data[i].appUid+"&quot;,&quot;"+data[i].type+"&quot;,&quot;1&quot;)'><td>费用确认</td></a>";
                    var str = "<tr></tr>";
                    var $str = $(str);
                    $str.append($(span));
                    $str.append($(a_tag));
                    $("#reservation2").append($str);




                    "<table><tr><td>" + data[i].deviceName +
                    '</td><td>('+data[i].deviceNumber+')</td><td> '+
                    '</td><td>'+data[i].labRoomName+'</td><td> '+
                    data[i].billing+
                    '</td><td>'+data[i].beginTime+
                    '-'+data[i].endTime+'</td><td> '+
                    '</td><td>费用结算</td><td> '+
                    "</td></tr></table>";
                    i++;
                }
            }
        }
    });
}
