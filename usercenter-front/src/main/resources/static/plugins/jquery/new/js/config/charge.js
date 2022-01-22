//金额联动

//小计
//通过改变实际金额改变折扣和小计
function changeTimeSum(index,type){
    //折扣和实际金额联动的flag
    var flag;
        //跟着折扣动
        var discountFunction="discount";
        //跟着实际金额动
        var realChargeFunction="realCharge";
        //联动类型
    //分段和不分段的收费
    var time="time";
    var additional="additional";
    //机时费改变折扣
    if(type == "timeDiscount"){
        flag=discountFunction;
        type=time;
    }
    if(type == "timeRealCharge"){
        flag=realChargeFunction;
        type=time;
    }
    if(type == "additionalDiscount"){
        flag=discountFunction;
        type=additional;
    }
    if(type == "additionalRealCharge"){
        flag=realChargeFunction;
        type=additional;
    }
    //获取各个id
        //真实价格
        var realCharge=type+"RealCharge";
        //默认金额
        var defaultCharge=type+"Default";
        //折扣
        var discount=type+"Discount";
        //td长度
        var length=type+"Length";
        //小计
        var sum=type+"Sum";
    if(flag == realChargeFunction){
        //得到原来的金额
        var timeDefaults=document.getElementById(defaultCharge+index).innerText;
        //得到实际金额
        var timeRealCharges=$('#'+realCharge+index).val();
        //计算出折扣并赋值
        document.getElementById(discount+index).value=parseFloat(timeRealCharges/timeDefaults).toFixed(2);
        //得到这些td的长度，准备计算小计
        var length=$('#'+length).val();
        var sums=0.0;
        for(var i=0;i<length;i++){
            sums=(parseFloat(sums)+parseFloat($('#'+realCharge+i).val())).toFixed(2);
        }
        document.getElementById(sum).innerText=sums;
    }
    if(flag == discountFunction){
        //得到原来的金额
        var timeDefaults=document.getElementById(defaultCharge+index).innerText;
        //得到折扣
        var timeDiscount=$('#'+discount+index).val();
        //计算出实际值
        document.getElementById(realCharge+index).value=parseFloat(timeDefaults*timeDiscount).toFixed(2);
        //得到这些td的长度，准备计算小计
        var length=$('#'+length).val();
        var sums=0.0;
        for(var i=0;i<length;i++){
            sums=(parseFloat(sums)+parseFloat($('#'+realCharge+i).val())).toFixed(2);
        }
        document.getElementById(sum).innerText=sums;
    }
    caculatorSum();
}
//通过改变实际金额改变折扣和小计 不分段

function changeTimeSumNotSeg(type){
    if(type == 'timeRealCharge'){
        //得到原来的金额
        var timeDefaults=document.getElementById("timeDefault").innerText;
        //得到实际金额
        var timeRealCharges=$('#timeRealCharge').val();
        //计算出折扣并赋值
        document.getElementById("timeDiscount").value=timeRealCharges/timeDefaults;
        var sum=0.0;
        sum=parseFloat(sum)+parseFloat($('#timeRealCharge').val());
        document.getElementById("timeSum").innerText=sum;
    }
    if(type == 'timeDiscount'){
        //得到原来的金额
        var timeDefaults=document.getElementById("additionalDefault").innerText;
        //得到折扣
        var timeDiscount=$('#timeDiscount').val();
        //计算出实际值
        document.getElementById("timeRealCharge").value=timeDefaults*timeDiscount;
        var sum=0.0;
        sum=parseFloat(sum)+parseFloat($('#timeRealCharge').val());
        document.getElementById("timeSum").innerText=sum;
    }
    if(type == 'additionalRealCharge'){
        //得到原来的金额
        var timeDefaults=document.getElementById("additionalDefault").innerText;
        //得到实际金额
        var timeRealCharges=$('#additionalRealCharge').val();
        //计算出折扣并赋值
        document.getElementById("additionalDiscount").value=timeRealCharges/timeDefaults;
        var sum=0.0;
        sum=parseFloat(sum)+parseFloat($('#additionalRealCharge').val());
        document.getElementById("additionalSum").innerText=sum;
    }
    if(type == 'additionalDiscount'){
        //得到原来的金额
        var timeDefaults=document.getElementById("additionalDefault").innerText;
        //得到折扣
        var timeDiscount=$('#additionalDiscount').val();
        //计算出实际值
        document.getElementById("additionalRealCharge").value=timeDefaults*timeDiscount;
        var sum=0.0;
        sum=parseFloat(sum)+parseFloat($('#additionalRealCharge').val());
        document.getElementById("additionalSum").innerText=sum;
    }
    caculatorSum();
}
function addExtra(type) {
        var item=$("#item").val();
        var price=$("#price").val();
        var appUid=$("#appUid").val();
        var myData={
            "item":item,
            "price":price,
            "type":type,
            "appUid":appUid
        }
        $.ajax({
            url:"../instrument/saveExtraBilling",
            type:'POST',
            async:false,
            data:myData,
            success:function(instrumentAppCharge) {
                var item="<td>"+instrumentAppCharge.projectName+"</td>";
                var price="<td>"+instrumentAppCharge.defaultCharge+"</td>";
                var option="<td><a onclick='deleteExtra(&apos;"+instrumentAppCharge.uid+"&apos;)'>删除</a></td>";
                var tr="<tr id='"+instrumentAppCharge.uid+"'></tr>";
                var $tr=$(tr);
                $tr.append($(item));
                $tr.append($(price));
                $tr.append($(option));
                $("#extraEditTable").append($tr);
                $("#item").val("");
                $("#price").val("");
                var extraSums=document.getElementById("extraSum").innerText;
                extraSums=parseFloat(extraSums)+instrumentAppCharge.defaultCharge;
                document.getElementById("extraSum").innerText=extraSums;
                caculatorSum();
            },error:function(){
                alert("输入有误！");
            }
        });
}
//假删
function deleteExtraNotReal2(counter){
    var needToDelete=document.getElementById("price"+counter).innerText;
    updateSum("-",needToDelete);
    $("#extra"+counter).fadeOut(2000);
}
function deleteExtraNotReal(realCharge,uid){
    $("#"+uid).fadeOut(2000);
    updateSum("-",realCharge);
}
//假新增
function addExtraNotReal(){
    var counter=$("#counter").val();
    var tr="<tr id='extra"+counter+"'></tr>";
    var $tr=$(tr);
    var item="<td>"+document.getElementById("item").value+"</td>";
    var price="<td id='price"+counter+"'>"+document.getElementById("price").value+"</td>";
    var option="<td><a onclick='deleteExtraNotReal2("+counter+")'>删除</a></td>";
    $tr.append($(item));
    $tr.append($(price));
    $tr.append($(option));
    $("#extraEditTable").append($tr);
    updateSum("+",document.getElementById("price").value);
    $("#item").val("");
    $("#price").val("");
    counter=(parseInt(counter)+1);
    document.getElementById("counter").value=counter;
}
//更新额外的小计和总的小计
//type=1 +   type=2 -
function updateSum(type,realCharge){
    if(type == "-"){
        var extraSums=document.getElementById("extraSum").innerText;
        extraSums=parseFloat(extraSums)-parseFloat(realCharge);
        document.getElementById("extraSum").innerText=extraSums;
        var shouldCharges=document.getElementById("shouldCharge").innerText;
        shouldCharges=parseFloat(shouldCharges)-parseFloat(realCharge);
        document.getElementById("shouldCharge").innerText=shouldCharges;
        var actualCharges=document.getElementById("actualCharge").innerText;
        actualCharges=parseFloat(actualCharges)-parseFloat(realCharge);
        document.getElementById("actualCharge").innerText=actualCharges;
    }else{
        var extraSums=document.getElementById("extraSum").innerText;
        extraSums=parseFloat(extraSums)+parseFloat(realCharge);
        document.getElementById("extraSum").innerText=extraSums;
        var shouldCharges=document.getElementById("shouldCharge").innerText;
        shouldCharges=parseFloat(shouldCharges)+parseFloat(realCharge);
        document.getElementById("shouldCharge").innerText=shouldCharges;
        var actualCharges=document.getElementById("actualCharge").innerText;
        actualCharges=parseFloat(actualCharges)+parseFloat(realCharge);
        document.getElementById("actualCharge").innerText=actualCharges;
    }

}


function deleteExtra(appUid){
    var myData={
        "appUid":appUid
    }
    $.ajax({
        url:"../instrument/deleteExtraBilling",
        type:'POST',
        async:false,
        data:myData,
        success:function(instrumentAppCharge) {
           $("#"+instrumentAppCharge.uid).remove();
            var extraSums=document.getElementById("extraSum").innerText;
            extraSums=parseFloat(extraSums)-instrumentAppCharge.defaultCharge;
            document.getElementById("extraSum").innerText=extraSums;
            caculatorSum();
        },error:function(){
            alert("删除出错！");
        }
    });
}
//计算所有的合计，，实际费用与应收费用
function caculatorSum(){
    var sumA= parseFloat(document.getElementById("timeSum").innerText);
    var sumB= parseFloat(document.getElementById("additionalSum").innerText);
    var sumC= parseFloat(document.getElementById("extraSum").innerText);
    var sumActual=sumA+sumB+sumC;
    document.getElementById("actualCharge").innerText=sumActual;
    var origalSum=parseFloat(document.getElementById("allSumShould").value);
    var extraSum=parseFloat(document.getElementById("extraSum").innerText);
    if(extraSum==NaN){
        extraSum=parseFloat(0.0);
    }
    document.getElementById("shouldCharge").innerText=origalSum+extraSum;
}
//保存发起收费的各个选项
function saveNewCharge(){
    // 机时预约或送样检测的uid
    var appUids=$("#appUid").val();
    //预约类型 1 机时预约 2 送样检测
    var types=$("#reType").val();
    //附加的条数
    var additionalLengths=$("#additionalLength").val();
    //机时预约或送样检测的条数
    var timeLengths=$("#timeLength").val();
    //jsonarray
    var myData={};
    if(types == 'MachineApp'){
        //是否分段
        var billingFlags=$("#billingFlag").val();
        if(billingFlags=='true'){
            //分段
            var time=[];
            for(var i=0;i<timeLengths;i++){
                var timeCharge={};
                timeCharge.timeBillingRate=document.getElementById("timeBillingRate"+i).innerText;
                timeCharge.timeItemName=document.getElementById("timeItemName"+i).innerText;
                timeCharge.timeDate=document.getElementById("timeDate"+i).innerText;
                timeCharge.timeDefault=document.getElementById("timeDefault"+i).innerText;
                timeCharge.timeDiscount=$('#timeDiscount'+i).val();
                timeCharge.timeRealCharge=$('#timeRealCharge'+i).val();
                time.push(timeCharge);
            }
        }else{
            //不分段
            var notSeg={};
            notSeg.notSegCharge=document.getElementById("notSegCharge").innerText;
            notSeg.notSegDate=document.getElementById("notSegDate").innerText;
            notSeg.timeDefault=document.getElementById("timeDefault").innerText;
            notSeg.timeDiscount=$('#timeDiscount').val();
            notSeg.timeRealCharge=$('#timeRealCharge').val();
        }
    }else if(types == 'SpecimenApp'){
        //送样检测
        var time=[];
        for(var i=0;i<timeLengths;i++){
            var timeCharge={};
            timeCharge.uid=$('#specimenUid'+i).val();
            timeCharge.timeBillingRate=document.getElementById("timeBillingRate"+i).innerText;
            timeCharge.specimenCount=document.getElementById("specimenCount"+i).innerText;
            timeCharge.itemName=document.getElementById("itemName"+i).innerText;
            timeCharge.billingName=document.getElementById("billingName"+i).innerText;
            timeCharge.timeDefault=document.getElementById("timeDefault"+i).innerText;
            timeCharge.timeDiscount=$('#timeDiscount'+i).val();
            timeCharge.timeRealCharge=$('#timeRealCharge'+i).val();
            time.push(timeCharge);
        }
    }else if(types=="ProjectMachine"||types=="ProjectSpecimen"){
        //分段
        var time=[];
        for(var i=0;i<timeLengths;i++){
            var timeCharge={};
            timeCharge.timeBillingRate=document.getElementById("timeBillingRate"+i).innerText;
            timeCharge.timeItemName=document.getElementById("timeItemName"+i).innerText;
            timeCharge.timeDate=document.getElementById("timeDate"+i).innerText;
            timeCharge.timeDefault=document.getElementById("timeDefault"+i).innerText;
            timeCharge.timeDiscount=$('#timeDiscount'+i).val();
            timeCharge.timeRealCharge=$('#timeRealCharge'+i).val();
            time.push(timeCharge);
        }
    }
    //附加
    if(types=="ProjectMachine"||types=="ProjectSpecimen"){
        var additional=[];
        var additionalCharge = {};
        additionalCharge.additionalName = document.getElementById("additionalName").innerText;
        additionalCharge.additionalDefault = document.getElementById("additionalDefault").innerText;
        additionalCharge.additionalInfo = document.getElementById("additionalInfo").innerText;
        additionalCharge.additionalDiscount = $('#additionalDiscount').val();
        additionalCharge.additionalRealCharge = $('#additionalRealCharge').val();
        additional.push(additionalCharge);
    }else {
        var additional = [];
        for (var i = 0; i < additionalLengths; i++) {
            var additionalCharge = {};
            additionalCharge.additionalName = document.getElementById("additionalName" + i).innerText;
            additionalCharge.additionalInfo = document.getElementById("additionalInfo" + i).innerText;
            additionalCharge.additionalDefault = document.getElementById("additionalDefault" + i).innerText;
            additionalCharge.additionalDiscount = $('#additionalDiscount' + i).val();
            additionalCharge.additionalRealCharge = $('#additionalRealCharge' + i).val();
            additional.push(additionalCharge);
        }
    }
    //instrumentMachine还是instrumentSpecimen的信息
    var appInfo={};
    appInfo.appUid=appUids;
    appInfo.type=types;
    myData.time=time;
    myData.notSeg=notSeg;
    myData.additional=additional;
    myData.appInfo=appInfo;
    myData.billingFlags=billingFlags;
    //实际费用
    var actualCharges=document.getElementById("actualCharge").innerText;
    myData.actualCharge=actualCharges;
    $.ajax({
        url:"../instrument/saveInstrumentAppCharge",
        type:'POST',
        async:false,
        data:{
            ds:JSON.stringify(myData)
        },
        success:function(res) {
            if(res=="success") {
                alert("成功发起收费！");
                parent.window.location.reload();
                var index = parent.layer.getFrameIndex(window.name);
                parent.layer.close(index);
            }

        }
    });
    //机时费和送样费
        //机时预约
            //分段
            //不分段
        //送样检测

    //附加收费
   // DONE
    //额外费用
        //额外费用及时保存 无需保存
}
// confrimType 1 预约者 2 导师 3 设备管理员   确认者类型 导师“teacher” 预约者“resUser” 设备管理员 “manager”
function confirmCharge(confirmType){
    if(confirmType == "1") {
        confirmType="resUser";
    }
    if(confirmType == "2") {
        confirmType="teacher";
    }
    if(confirmType == "3") {
        confirmType="manager";
    }
    var reTypes=$('#reType').val();
    var sequenceLasts=$('#sequenceLast').val();
    var appUids=$('#appUid').val();
    var actualCharges=document.getElementById("actualCharge").innerText;
    var myData= {
        "reType":reTypes,
        "appUid":appUids,
        "sequenceLast":sequenceLasts,
        "confirmType":confirmType,
        "actualCharge":actualCharges
    };
        $.ajax({
            url:"../instrument/saveConfirmCharge",
            type:'POST',
            async:false,
            data: myData,
            success:function() {
                alert("成功确认收费！");
                parent.window.location.reload();
            },error:function(){
                alert("出错啦！");
            }
        });
}
//管理员调整收费
function managerConfirm(){
    var reTypes=$('#reType').val();
    var sequenceLasts=$('#sequenceLast').val();
    var appUids=$('#appUid').val();
    var answers=$('#answer').val();
    var actualCharges=document.getElementById("actualCharge").innerText;
    var adjustment;

    if(document.getElementById("idjustmentTrue")!=null) {
        if(document.getElementById("idjustmentTrue").checked){
            adjustment="1";
        }else{
            adjustment="2";
        }
    }
    if(adjustment == "1"){
        //开始拼json
        //定义需要传递的jsonObject
        var myData={};
        //即时预约的jsonArray
        var time=[];
        //附加收费的jsonArray
        var additional=[];
        //额外收费的jsonArray
        var extra=[];
        //得到array的长度
        var timeLengths=$("#timeLength").val();
        var additionalLengths=$("#additionalLength").val();
        for(var i=0;i<timeLengths;i++){
            //机时预约的一个object
            var timeCharge={};
            //设置值
            timeCharge.uid=$("#timeUid"+i).val();
            timeCharge.timeDiscount=$('#timeDiscount'+i).val();
            timeCharge.timeRealCharge=$('#timeRealCharge'+i).val();
            //timeArray增加这个object
            time.push(timeCharge);
        }
        for(var i=0;i<additionalLengths;i++){
            var additionalCharge={};
            additionalCharge.uid=$("#additionalUid"+i).val();
            additionalCharge.additionalDiscount=$('#additionalDiscount'+i).val();
            additionalCharge.additionalRealCharge=$('#additionalRealCharge'+i).val();
            additional.push(additionalCharge);
        }
        var len = $("#extraEditTable").find("tr").length;
        for ( var i=2;i<len;i++){
            var extraCharge={};
            var pro = $("#extraEditTable").find("tr").eq(i).find("td").eq(0).text();
            var price = $("#extraEditTable").find("tr").eq(i).find("td").eq(1).text();
            extraCharge.item=pro;
            extraCharge.price=price;
            extra.push(extraCharge);
        }
        //其他信息
        var appInfo={};
        appInfo.appUid=appUids;
        appInfo.type=reTypes;
        myData.time=time;
        myData.additional=additional;
        myData.extra=extra;
        myData.appInfo=appInfo;
        myData.actualCharge=actualCharges;
        myData.sequenceLast=sequenceLasts;
        myData.answer=answers;
        myData.adjustment=adjustment;
        $.ajax({
            url:"../instrument/alterInstrumentAppCharge",
            type:'POST',
            async:false,
            data:{
                //将jsonObject序列化为字符串并传递到后台
                ds:JSON.stringify(myData)
            },
            success:function() {
                alert("成功修改收费！");
                parent.window.location.reload();
            },error:function(){
                alert("服务器异常！");
            }
        });

    }else{
        var myData= {
            "reType":reTypes,
            "appUid":appUids,
            "sequenceLast":sequenceLasts,
            "actualCharge":actualCharges,
            "adjustment":adjustment,
            "answer":answers
        };
        $.ajax({
            url:"../instrument/managerConfirm",
            type:'POST',
            async:false,
            data: myData,
            success:function() {
                alert("成功确认调整收费！");
                parent.window.location.reload();
            },error:function(){
                alert("出错啦！");
            }
        });
    }

}
//管理员确认缴费
function confirmPayment() {
    var reTypes = $('#reType').val();
    var appUids = $('#appUid').val();
    var sequenceLasts=$('#sequenceLast').val();
    var commonteamUid = $('#ctUid') .val();
    var money = $('#money').val();
    var resUser = $('#resUser').val();
    var academyName = $('#academy').val();
    var myData = {
        "reType": reTypes,
        "appUid": appUids,
        "sequenceLast":sequenceLasts,
        "commonteamUid":commonteamUid,
        "resUser":resUser,
        "money":money,
        "academyName":academyName
    };
    $.ajax({
        url: "../instrument/finishPayment",
        type: 'POST',
        async: false,
        data: myData,
        success: function () {
            alert("成功确认缴费！");
            parent.window.location.reload();
        }, error: function () {
            alert("出错啦！");
        }
    });
}
//有异议
function objection(confirmType){
    if(confirmType == "1") {
        confirmType="resUser";
    }
    if(confirmType == "2") {
        confirmType="teacher";
    }
    if(confirmType == "3") {
        confirmType="manager";
    }
    var reTypes=$('#reType').val();
    var sequenceLasts=$('#sequenceLast').val();
    var appUids=$('#appUid').val();
    var reason=$("#objections").val();
    var actualCharges=document.getElementById("actualCharge").innerText;
    var myData= {
        "reType":reTypes,
        "appUid":appUids,
        "sequenceLast":sequenceLasts,
        "confirmType":confirmType,
        "actualCharge":actualCharges,
        "reason":reason
    };
    $.ajax({
        url:"../instrument/saveObjection",
        type:'POST',
        async:false,
        data: myData,
        success:function() {
            alert("成功提交异议！");
            parent.window.location.reload();
        },error:function(){
            alert("出错啦！");
        }
    });
}
//显示view隐藏edit或显示edit隐藏view
function showOrHide(type){
    if(type == 1){
        $("#chargeTrEdit").hide();
        $("#additionalTrEdit").hide();
        $("#extraTrEdit").hide();
        $("#chargeTrView").show();
        $("#additionalTrView").show();
        $("#extraTrView").show();
    }else{
        $("#chargeTrEdit").show();
        $("#additionalTrEdit").show();
        $("#extraTrEdit").show();
        $("#chargeTrView").hide();
        $("#additionalTrView").hide();
        $("#extraTrView").hide();
    }
}