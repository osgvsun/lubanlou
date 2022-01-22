function newSpecimentApp(){
    //多窗口模式，层叠置顶
    var win = layer.open({
        type: 2 //此处以iframe举例
        ,title: '新增申请'
        ,shade: 0
        ,maxmin: true
        ,offset: [ //为了演示，随机坐标
            0.4*($(window).height()-300)
            ,0.4*($(window).width()-390)
        ]
        ,content: '../nonschool/newSpecimentApp'
        ,success: function(layero){
            layer.setTop(layero); //重点2

        }
    });
    layer.full(win);
}
function submitEditForm(){
    var url="../nonschool/saveSpecimentApp";
    var myData={
        'uid':$("#uid").val(),
        'delegate' : $("#delegate").val(),
        'cname' : $("#cname").val(),
        'telephone' : $("#telephone").val(),
        'email' : $("#email").val(),
        'communicationAddress':$("#communicationAddress").val(),
        'saveCondition':$("#saveCondition").val(),
        'isRetention':$("#isRetention").val(),
        'checkType':$("#checkType").val(),
        'reportType':$("#reportType").val(),
        'remaining':$("#remaining").val(),
    }
    $.ajax({
        url:url,
        type:'POST',
        asyn:false,
        data:myData,
        dataType: "json",
        success:function(data){//AJAX查询成功
            if(data=="success"){
                alert("保存成功！");
                window.parent.location.reload();
            }else{
                alert("保存失败！");
            }
        }
    });

}
//新建样品
function addSpecimenSample(uid){
    var sampleName=$('#sampleName').val();
    var sampleType=$('#sampleType').val();
    var number=$('#number').val();
    if(number==null || number=="" ||!(/^\+?[1-9][0-9]*$/.test(number))){
        alert("请填写正确数量（非零的正整数）");
        return false;
    }else{
        // var checkItem=$('#checkItem').val();
        // var standard=$('#standard').val();
        var checkRequire=$('#checkRequire').val()
        var myData={
            'sampleName':sampleName,
            'sampleType':sampleType,
            'number':number,
            'checkRequire':checkRequire,
        }
        $.ajax({
            url:"../nonschool/addSpecimenSample?specimenId="+uid,
            type:'POST',
            async:false,
            data:myData,
            success:function(specimenSample){//AJAX新增成功
                var a_tag = '<td><a class="fa fa-trash-o ml10" onclick="deleteSpecimenSample(&quot;'+specimenSample.uid+'&quot;)"></a></td>';
                var td =
                    "<td>"+ sampleName+ "</td>" +
                    "<td>"+ sampleType+ "</td>" +
                    "<td>"+ number+ "</td>" +
                    "<td>"+ checkRequire+ "</td>";
                // "<td>"+ standard+ "</td>" ;
                var str = '<tr id="'+specimenSample.uid+'"></tr>';
                var $str = $(str);
                $str.append($(td));
                $str.append($(a_tag));
                $("#extends").append($str);
                $("#sampleName").val("");
                $("#sampleType").val("");
                $("#number").val("");
                // $("#checkItem").val("");
                // $("#standard").val("");
                $("#checkRequire").val("");
            }
        });
    }
}
//删除样品
function deleteSpecimenSample(uid){
    var myData={
        "uid":uid
    }
    $.ajax({
        url:"../nonschool/deleteSpecimenSample",
        type:'POST',
        async:false,
        data:myData,
        success:function(data){//AJAX成功
            $('#'+uid).hide(1000);
            // window.location.reload();
        }
    });
}
//编辑
function editSpecimentApp(uid){
    //多窗口模式，层叠置顶
    var win = layer.open({
        type: 2 //此处以iframe举例
        ,title: '新增申请'
        ,shade: 0
        ,maxmin: true
        ,offset: [ //为了演示，随机坐标
            0.4*($(window).height()-300)
            ,0.4*($(window).width()-390)
        ]
        ,content: '../nonschool/editSpecimentApp?uid='+uid
        ,success: function(layero){
            layer.setTop(layero); //重点2

        }
    });
    layer.full(win);
}
function deleteSpecimentApp(uid){
    window.location.href="../nonschool/deleteSpecimenNonschool?uid="+uid;
}
//查看
function specimentAppInfo(uid){
    //多窗口模式，层叠置顶
    var win = layer.open({
        type: 2 //此处以iframe举例
        ,title: '查看进度'
        ,shade: 0
        ,maxmin: true
        ,offset: [ //为了演示，随机坐标
            0.4*($(window).height()-300)
            ,0.4*($(window).width()-390)
        ]
        ,content: '../nonschool/specimentAppInfo?uid='+uid
        ,success: function(layero) {
            layer.setTop(layero); //重点2

        },end:function () {
            location.reload();
        }
    });
    layer.full(win);
}
function specimentAppInfo2(uid){

    window.location.href='../nonschool/specimentAppInfo?uid='+uid
}
//确认金额
function submitCount(uid){
    var url="../nonschool/submitCount";
    var myData={
        'uid':uid,
        'count' : $("#count").val(),
    }
    $.ajax({
        url:url,
        type:'POST',
        asyn:false,
        data:myData,
        dataType: "json",
        success:function(data){//AJAX查询成功
            if(data=="success"){
                alert("保存成功！");
                window.location.href='../nonschool/specimentAppList?currpage=1'
                // window.location.reload();
            }else{
                alert("保存失败！");
            }
        }
    });
}
//确认缴费凭证
function submitCertificate(uid){
    var certificate=$("#attachTable").find("tr").length;
    if(certificate<2){
        alert("请先上传缴费凭证");
        return false;
    }else {
        var url = "../nonschool/submitCertificate";
        var myData = {
            'uid': uid,
        };
        $.ajax({
            url: url,
            type: 'POST',
            asyn: false,
            data: myData,
            dataType: "json",
            success: function (data) {//AJAX查询成功
                if (data == "success") {
                    alert("保存成功！");
                    window.location.href = '../nonschool/specimentAppList?currpage=1'
                    // window.location.reload();
                } else {
                    alert("保存失败！");
                }
            }
        });
    }
}
//确认金额
function confirmCount(uid){
    var url="../nonschool/confirmCount";
    var options=$("#instrumentName1 option:selected");
    var instrument=options.val();
    var myData={
        'uid':uid,
        'instrument':instrument,
    }
    $.ajax({
        url:url,
        type:'POST',
        asyn:false,
        data:myData,
        dataType: "json",
        success:function(data){//AJAX查询成功
            if(data!="fail"){
                alert("确认成功！");
                $("#instrumentId").val(data);
                window.location.href='../nonschool/specimentAppList?currpage=1';
            }else{
                alert("请先上传付费凭证！");
            }
        }
    });
}
//填写快递信息
function confirmDeliveryInfo(uid){
    var url="../nonschool/confirmDeliveryInfo";
    var myData={
        'uid':uid,
        'deliveryName':$("#deliveryName").val(),
        'deliveryNumber':$("#deliveryNumber").val(),
    }
    $.ajax({
        url:url,
        type:'POST',
        asyn:false,
        data:myData,
        dataType: "json",
        success:function(data){//AJAX查询成功
            if(data=="success"){
                alert("确认成功！");
                window.location.href='../nonschool/specimentAppList?currpage=1'
            }else{
                alert("确认失败！");
            }
        }
    });
}
//确认收到样品
function confirmSample(uid,instrumentId){
    var sampleNumber=$("#sampleNumber").val();
    var list='';
    for(var i=0;i<sampleNumber;i++){
        var s=$('#describe'+i).val();
        if(s==""){
            s="未填写";
        }
        list+=s+",";
    }
    var url="../nonschool/confirmSample";
    var myData={
        'uid':uid,
        'list':list,

        // 'remark':$("#remark").val(),
    }
    $.ajax({
        url:url,
        type:'POST',
        asyn:false,
        data:myData,
        dataType: "json",
        success:function(data){//AJAX查询成功
            if(data=="success"){
                alert("确认成功！");
                window.location.href='../instrument/doInstrumentMachineApp?insUid='+instrumentId;
            }else{
                alert("确认失败！");
            }
        }
    });
}

//确认样品信息
function confirmSampleCheck(uid){
    var sampleNumber=$("#sampleNumber").val();
    var checkItemlist='';
    var standardlist='';
    for(var i=0;i<sampleNumber;i++){
        var s=$('#checkItem'+i).val();
        if(s==""){s="未填写";}
        checkItemlist+=s+",";
        var m=$('#standard'+i).val();
        if(m==""){ m="未填写";}
        standardlist+=m+",";
    }
    var url="../nonschool/confirmSampleCheck";
    var myData={
        'uid':uid, 'checkItemlist':checkItemlist,

        'standardlist':standardlist,
    }
    $.ajax({
        url:url,
        type:'POST',
        asyn:false,
        data:myData,
        dataType: "json",
        success:function(data){//AJAX查询成功
            if(data=="success"){
                alert("确认成功！");
                window.location.reload();
            }else{
                alert("确认失败！");
            }
        }
    });
}

function rejectSampleCheck(uid){
    var realURL="../nonschool/rejectSampleCheck?uid="+uid;
    var index = layer.open({
        type: 2 //此处以iframe举例
        ,
        title: '请填写拒绝原因',
        area: ['450px', '250px'],
        shade: 0,
        maxmin: true,
        content: realURL,
        zIndex: layer.zIndex //重点1
        ,
    });
}


//确认检测完成
function endCheck(uid){
    var url="../nonschool/endCheck";
    var myData={
        'uid':uid,
        'include':$("#include").val(),
    }
    $.ajax({
        url:url,
        type:'POST',
        asyn:false,
        data:myData,
        dataType: "json",
        success:function(data){//AJAX查询成功
            if(data=="success"){
                alert("确认成功！");
                 window.location.reload();
                // window.location.href='../nonschool/specimentAppList?currpage=1'

            }else{
                alert("确认失败！");
            }
        }
    });
}
//确认检测报告
function reportCheck(uid){
    var url="../nonschool/reportCheck";
    var myData={
        'uid':uid,
        'reportCheck':$("#reportCheck").val(),
    }
    $.ajax({
        url:url,
        type:'POST',
        asyn:false,
        data:myData,
        dataType: "json",
        success:function(data){//AJAX查询成功
            if(data=="success"){
                alert("确认成功！");
                window.location.reload();
            }else{
                alert("确认失败！");
            }
        }
    });
}
//导出pdf
function exportSpecimenInfo(uid){
    layer.confirm('一定要导出到pdf！', {icon: 1, title: "提示"}, function (index) {
    window.location.href="../nonschool/exportSpecimenInfo?uid="+uid;
    layer.close(index);
    });
}


var downPdf = document.getElementById("renderPdf");
downPdf.onclick=function() {
    var ui =document.getElementById("renderPdf");
    var uid =$("#uid").val();
    ui.style.display="none";
    html2canvas(document.body, {
        background: '#FFFFFF',
        onrendered:function(canvas) {

            var contentWidth = canvas.width;
            var contentHeight = canvas.height;

            //一页pdf显示html页面生成的canvas高度;
            var pageHeight = contentWidth / 592.28 * 841.89;
            //未生成pdf的html页面高度
            var leftHeight = contentHeight;
            //pdf页面偏移
            var position = 0;
            //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
            var imgWidth = 595.28;
            var imgHeight = 592.28/contentWidth * contentHeight;

            var pageData = canvas.toDataURL('image/jpeg', 1.0);

            var pdf = new jsPDF('', 'pt', 'a4');

            //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
            //当内容未超过pdf一页显示的范围，无需分页
            if (leftHeight < pageHeight) {
                pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
            } else {
                while(leftHeight > 0) {
                    pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                    leftHeight -= pageHeight;
                    position -= 841.89;
                    //避免添加空白页
                    if(leftHeight > 0) {
                        pdf.addPage();
                    }
                }
            }
            pdf.save('content.pdf');
        }
    })
    $.get("../nonschool/exportPdf?uid="+uid, function (data) {
        alert("导出测试协议成功！");
    });
}
function instrumentAppRecordsView(uid){
    window.location.href="../nonschool/instrumentAppRecordsView?specimenId="+uid;
}

//确认收到样品并分配仪器
function  instrumentAppRecords1(uid){
    var myData={
        "uid":uid,
    }
    $.ajax({
        url: "../nonschool/instrumentAppRecords?specimenId=" + uid,
        type: 'POST',
        async: false,
        data: myData,
        success: function (data) {//AJAX新增成功
            window.location.href="../nonschool/instrumentAppRecords?specimenId=" + uid;
        }
    });
}
