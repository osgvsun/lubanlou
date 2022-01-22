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
                    // if(flag==3||flag=='3'){
                    //     var a_tag="<a href='#' onclick='doAppChargeConfirm(&quot;"+data[i].appUid+"&quot;,&quot;"+data[i].type+"&quot;,&quot;2&quot;)'><td>查看</td></a>";
                    //
                    // }else{
                    //     var a_tag="<a href='#' onclick='viewAppChargeDetailBeforeConfirm1(&quot;"+data[i].appUid+"&quot;,&quot;"+data[i].type+"&quot;)'><td>查看</td></a>";
                    // }
                    if(flag==3||flag=='3'){
                        var a_tag="<a href='#' onclick='viewAppChargeDetailAfterConfirm1(&quot;"+data[i].appUid+"&quot;,&quot;"+data[i].type+"&quot;)'><td>查看</td></a>";
                    }else if(flag==-1||flag=='-1'){
                        var a_tag="<a href='#' onclick='viewAppChargeDetailBeforeConfirm1(&quot;"+data[i].appUid+"&quot;,&quot;"+data[i].type+"&quot;)'><td>查看</td></a>";
                    }
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
function agree(deviceNumber,flag,type){
    if(flag==1){
        layer.msg('确定同意吗？', {
            time: 0 //不自动关闭
            ,btn: ['确定', '取消']
            ,offset:["400px","40%"]
            ,area:["200px","100px"]
            ,yes: function(index){
                agree1(deviceNumber,flag,type);
                //agree1(deviceNumber,flag,type);
                layer.close(index);
            }
        });
    }
  if(flag==0){
      layer.msg('确定取消吗？', {
          time: 0 //不自动关闭
          ,btn: ['确定', '取消']
          ,offset:["400px","40%"]
          ,area:["200px","100px"]
          ,yes: function(index){
              agree1(deviceNumber,flag,type);
              //agree1(deviceNumber,flag,type);
              layer.close(index);
          }
      });
  }

}


//同意还是拒绝 审核
function agree1(deviceNumber,flag,type){
    var myData={
        "deviceNumber":deviceNumber,
        "flag":flag,
        "type":type
    }
    $.ajax({
        url:"../tUser/agree",
        type:'POST',
        async:false,
        data:myData,
        dataType: "json",
        success:function(data){//AJAX查询成功
            $('#'+deviceNumber).fadeOut(2000);
           // $("#"+deviceNumber).css('display','none');
        }
    });
}
//新建培训
function newInstrumentTraining1(insUid,device){
    document.getElementById("instrument").value=device;
    var currpage = $("#currpage").val();
    $('#external-frame', window.parent.document).height(700)
    var offset = ((window.screen.height - height) * 0.3) + 'px';

    layer.ready(function(){
        layer.open({
            type: 2,
            title: '新建培训',
            /*fix: true,
            maxmin:true,
            offset: offset,
            shift:-1,
            closeBtn: 1,
            shadeClose: true,
            move:false,
            maxmin: false,
            area: ['540px', '400px'],*/
            content: '../instrument/newInstrumentTrainingSingle?insUid='+insUid,
            end: function(){
                changeDeviceForApp($(instrument).val());
               // window.location.href="../instrument/editInstrumentTrainingList?currpage="+currpage+"&insUid="+insUid;
            }
        });
    });
}
//约 委 培
function changeDeviceForApp(deviceNumber) {
    var myData = {
        "deviceNumber": deviceNumber,
    }
    $.ajax({
        url: "../tUser/changeDeviceForApp",
        type: 'POST',
        async: false,
        data: myData,
        dataType: "json",
        success: function (data) {//AJAX查询成功
            $("#appointmentMachine").html("");
            $("#appointmentSpecimen").html("");
            $("#training").html("");

            document.getElementById("appointmentMachine").innerHTML +=
                "<table>" +
                "<tr><th>预约者</th>" +
                "<th>导师</th>" +
                "<th>预约时间</th>" +
                "</tr>";
            document.getElementById("appointmentSpecimen").innerHTML +=
                "<table>" +
                "<tr><th>预约者</th>" +
                "<th>导师</th>" +
                "<th>样品数</th>" +
                "</tr>";


            var i = 0;

            if (data != null) {
                for (var js in data) {
                    if (data[i].reType == "1") {
                        document.getElementById("appointmentMachine").innerHTML +=
                            "<tr><td>" + data[i].resUser +
                            '</td><td>' + data[i].teacher + '</td><td> ' +
                            data[i].beginTime + '-' + data[i].endTime +
                            "</td></tr>";

                    }
                    if (data[i].reType == "2") {
                        document.getElementById("appointmentSpecimen").innerHTML +=
                            "<tr><td>" + data[i].resUser +
                            '</td><td>' + data[i].teacher +
                            '</td><td>' + data[i].specimenNumber +
                            "</td></tr>";
                    }
                    if (data[i].reType == "3") {
                        var span = "<span>"+data[i].training1 + "</span>";
                        var a_tag = "<span><a href='#' " +
                            "onclick='viewInstrumentTrainingPeopleList(&quot;"+
                            data[i].trainingUid+
                            "&quot;)'>"+data[i].trainingNumber+"&nbsp;&nbsp;"
                            +"</a></span>";
                        if(data[i].training2=="&nbsp;&nbsp;&nbsp;时间未到，不能录入"){
                            var a_tag1 = "<span>"+data[i].training2
                                +"</span>";
                        }else{
                            var a_tag1 = "<a href='#' " +
                                "onclick='viewInstrumentTrainingPeopleListResult(&quot;"+
                                data[i].trainingUid+
                                "&quot;)'>"+data[i].training2
                                +"</a>";
                        }


                        var str = "<tr></tr>";
                        var $str = $(str);
                        $str.append($(span));
                        $str.append($(a_tag));
                        $str.append($(a_tag1));
                        $("#training").append($str);
                    }
                    i++;
                }
            }


            document.getElementById("appointmentMachine").innerHTML += " </table>";
            document.getElementById("appointmentSpecimen").innerHTML += " </table>";
            document.getElementById("instrument").value=deviceNumber;

            $("#appointmentMachine tr").hover(function () {
                ev = window.event;
                var top = ev.clientY;
                var left = $("#appointmentMachine").offset().left + $("#appointmentMachine").width();
                $(".appointment_div").css("left", left + "px");
                $(".appointment_div").css("top", top + "px");
                $(".appointment_div").css("display", "block");
            }, function () {
                $(".appointment_div").css("display", "none");
            })
        }
    });

}
//flag 1 2 3是待审核 已通过 已拒绝的flag，myType是机时预约还是送样检测 stage是审核的stage
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
                        var a_tag = "<td><a class=\"instru_btn\" href='#' " +
                            "onclick='agree(&quot;"+
                            data[i].appUid+
                            "&quot;,1,1)'>"
                            +"同意</a></td>";
                        var a_tag1 = "<td><a class=\"instru_btn\" href='#' " +
                            "onclick='agree(&quot;"+
                            data[i].appUid+
                            "&quot;,0,1)'>"
                            +"拒绝</a></td>";
                        var a_tag2 = "<td><a class=\"instru_btn\" href='../instrument/teacherReservationAuditMachineApp?uid="+data[i].appUid+"'>"
                            +"查看</a></td>";
                        var td =
                            "<td>"+data[i].resUser + "</td>" +
                            "<td>"+data[i].deviceName +"("+data[i].deviceNumber+")"+"</td>" +
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

                        if(data[i].state=="3"){
                            td2="<td>完成审核</td>";
                        }
                        var str = "<tr id='"+data[i].appUid+"'></tr>";
                        var $str = $(str);
                        $str.append($(td));
                        $str.append($(td2));
                        if(data[i].state=="2"){
                            $str.append($(a_tag));
                            $str.append($(a_tag1));
                        }

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
                        // <a th:if="${instrumentApp[4] == '2' or instrumentApp[4] == 2}"  class="instru_btn"  th:onclick="'agree(&quot;'+${instrumentApp[15]}+'&quot;,1,1)'">同意</a>
                        //         <a th:if="${instrumentApp[4] == '2' or instrumentApp[4] == 2}"  class="instru_btn"  th:onclick="'agree(&quot;'+${instrumentApp[15]}+'&quot;,0,1)'">拒绝</a>
                        // <a class="instru_btn" th:href="@{/instrument/teacherReservationAuditMachineApp(uid=${instrumentApp[15]})}">查看</a>
                        var a_tag = "<td><a class=\"instru_btn\" href='#' " +
                            "onclick='agree(&quot;"+
                            data[i].appUid+
                            "&quot;,1,2)'>"
                            +"同意</a></td>";
                        var a_tag1 = "<td><a class=\"instru_btn\" href='#' " +
                            "onclick='agree(&quot;"+
                            data[i].appUid+
                            "&quot;,0,2)'>"
                            +"拒绝</a></td>";
                        var a_tag2 = "<td><a class=\"instru_btn\" href='../instrument/teacherReservationAuditMachineApp?uid="+data[i].appUid+"'>"
                            +"查看</a></td>";
                        var td =
                            "<td>"+data[i].resUser + "</td>" +
                            "<td>"+data[i].deviceName +"("+data[i].deviceNumber+")"+"</td>" +
                            "<td>"+data[i].labRoomName+"</td>"+
                            "<td>"+data[i].beginTime+"</td>"+
                            "<td>"+data[i].endTime+"</td>";
                       // var td2="";
                        // if(data[i].state=="0"){
                        //     td2="<td>等待导师审核</td>";
                        // }
                        // if(data[i].state=="1"){
                        //     td2="<td>等待实验室管理员审核</td>";
                        // }
                        //
                        // if(data[i].state=="3"){
                        //     td2="<td>完成审核</td>";
                        // }
                        var str = "<tr id='"+data[i].appUid+"'></tr>";
                        var $str = $(str);
                        $str.append($(td));
                       // $str.append($(td2));
                            $str.append($(a_tag));
                            $str.append($(a_tag1));

                        $str.append($(a_tag2));
                        $("#reservation1").append($str);
                        i++;
                    }
                }
            }

        }
    });
}



//
function viewAppChargeDetailBeforeConfirm1(appUid, type){
    layer.ready(function(){
        layer.open({
            type: 2,
            title: '费用确认',
            fix: true,
            maxmin:true,
            shift:-1,
            closeBtn: 1,
            shadeClose: true,
            move:false,
            maxmin: false,
            area: ['1000px', '420px'],
            content: '../instrument/viewAppChargeDetailBeforeConfirm?appUid='+appUid+'&type='+type,
            end: function(){
            }
        });
    });
}
function viewAppChargeDetailAfterConfirm1(appUid, type){
    layer.ready(function(){
        layer.open({
            type: 2,
            title: '费用确认',
            fix: true,
            maxmin:true,
            shift:-1,
            closeBtn: 1,
            shadeClose: true,
            move:false,
            maxmin: false,
            area: ['1000px', '420px'],
            content: '../instrument/viewAppChargeDetailAfterConfirm?appUid='+appUid+'&type='+type,
            end: function(){
            }
        });
    });
}