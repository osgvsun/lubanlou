/**
 * Created by Remli on 2021/5/24.
 */
layui.use(['form','layer'],function () {
    var $ = layui.$,
        layer = layui.layer,
        form = layui.form;
    var authorities,
        currentauth = $.cookie('currentAuthBydatashare'),
        currentanthcname = $.cookie('currentAuthCnameBydatashare');
    getCurrentUser();
    liShowAndHide();
    document.getElementById("datashare_cname").innerText = currentanthcname+':'+currentUsername+'，您好';
    function getCurrentUser() {
        $.ajax({
            url: 'getCurrentUser',
            // dataType: 'json',
            async: false,
            type: 'get',
            success: function (res) {
                currusername = res.username;
                currcname = res.cname;
                authorities = res.authorityMap.GvsunLims;
                if(authorities && authorities.length>0){
                    //优先选中超管权限
                    for(var i = 0;i<authorities.length;i++) {
                        if (authorities[i].name === 'SUPERADMIN'){
                            currentauth = (currentauth === undefined ? authorities[i].name:currentauth );
                            currentanthcname = (currentanthcname === undefined ?authorities[i].cname:currentanthcname);
                        }
                    }
                    //如果没有权限则选第一项权限
                    currentauth = (currentauth === undefined ? authorities[0].name:currentauth );
                    currentanthcname = (currentanthcname === undefined ?authorities[0].cname:currentanthcname);
                }else {
                    currentauth = 'visitor';
                    currentanthcname = '游客';
                }
                $.cookie('currentAuthBydatashare',currentauth);
                $.cookie('currentAuthCnameBydatashare',currentanthcname);
                // auth
                let cAuth = $.cookie("currentAuthBydatashare");
                if (cAuth) {
                    let authArr = ["EXPERIMENTALTEACHING", "EXCENTERDIRECTOR", "ACADEMYLEVELM", "SUPERADMIN"];
                    if(authArr.includes(cAuth.toString().toUpperCase())){
                        $("ul.dhu-menu.function-app").show();
                    }else{
                        layer.alert("当前权限无法访问")
                    }
                }
            }
        });
    }
    function liShowAndHide() {
        $.ajax({
            url: datashareHost + "report/configData",
            success: function (data) {
                let num = 0;
                if (data.sj1Show!=null&&data.sj1Show!=undefined&&data.sj1Show){
                    num++;
                    $("#sj1").show();
                }else {
                    $("#sj1").hide();
                }
                if (data.sj2Show!=null&&data.sj2Show!=undefined&&data.sj2Show){
                    num++;
                    $("#sj2").show();
                }else {
                    $("#sj2").hide();
                }
                if (data.sj3Show!=null&&data.sj3Show!=undefined&&data.sj3Show){
                    num++;
                    $("#sj3").show();
                }else {
                    $("#sj3").hide();
                }
                if (data.sj4Show!=null&&data.sj4Show!=undefined&&data.sj4Show){
                    num++;
                    $("#sj4").show();
                }else {
                    $("#sj4").hide();
                }
                if (data.sj5Show!=null&&data.sj5Show!=undefined&&data.sj5Show){
                    num++;
                    $("#sj5").show();
                }else {
                    $("#sj5").hide();
                }
                if (data.sj6Show!=null&&data.sj6Show!=undefined&&data.sj6Show){
                    num++;
                    $("#sj6").show();
                }else {
                    $("#sj6").hide();
                }
                if (data.sj7Show!=null&&data.sj7Show!=undefined&&data.sj7Show){
                    num++;
                    $("#sj7").show();
                }else {
                    $("#sj7").hide();
                }
                if (data.reportUndergraduateLaboratoryShow!=null&&data.reportUndergraduateLaboratoryShow!=undefined&&data.reportUndergraduateLaboratoryShow){
                    num++;
                    $("#sj8").show();
                }else {
                    $("#sj8").hide();
                }
                if (data.reportUndergraduateDeviceShow!=null&&data.reportUndergraduateDeviceShow!=undefined&&data.reportUndergraduateDeviceShow){
                    num++;
                    $("#sj9").show();
                }else{
                    $("#sj9").hide();
                }
                if (data.reportExemplarCenterShow!=null&&data.reportExemplarCenterShow!=undefined&&data.reportExemplarCenterShow){
                    num++;
                    $("#reportExemplarCenter").show();
                }else{
                    $("#reportExemplarCenter").hide();
                }
                if (data.reportVirtualExperimentShow!=null&&data.reportVirtualExperimentShow!=undefined&&data.reportVirtualExperimentShow){
                    num++;
                    $("#reportVirtualExperiment").show();
                }else{
                    $("#reportVirtualExperiment").hide();
                }
                if (data.reportProfessionalExperimentShow!=null&&data.reportProfessionalExperimentShow!=undefined&&data.reportProfessionalExperimentShow){
                    num++;
                    $("#reportProfessionalExperiment").show();
                }else{
                    $("#reportProfessionalExperiment").hide();
                }
                if (data.reportProfessionalTeachingLaboratoryShow!=null&&data.reportProfessionalTeachingLaboratoryShow!=undefined&&data.reportProfessionalTeachingLaboratoryShow){
                    num++;
                    $("#reportProfessionalTeachingLaboratory").show();
                }else{
                    $("#reportProfessionalTeachingLaboratory").hide();
                }
                if (data.reportLabRoomUsageShow!=null&&data.reportLabRoomUsageShow!=undefined&&data.reportLabRoomUsageShow){
                    num++;
                    $("#reportLabRoomUsage").show();
                }else{
                    $("#reportLabRoomUsage").hide();
                }
                if (data.reportExperimentShow!=null&&data.reportExperimentShow!=undefined&&data.reportExperimentShow){
                    num++;
                    $("#reportExperiment").show();
                }else{
                    $("#reportExperiment").hide();
                }
                if (data.reportTeacherEquipmentShow!=null&&data.reportTeacherEquipmentShow!=undefined&&data.reportTeacherEquipmentShow){
                    num++;
                    $("#reportTeacherEquipment").show();
                }else{
                    $("#reportTeacherEquipment").hide();
                }
                if (data.sandauReportShow!=null&&data.sandauReportShow!=undefined&&data.sandauReportShow){
                    num++;
                    $("#sandauReport").show();
                }else{
                    $("#sandauReport").hide();
                }
                if (data.customizeReportShow!=null&&data.customizeReportShow!=undefined&&data.customizeReportShow){
                    num++;
                    $("#reportLake").show();
                }else{
                    $("#reportLake").hide();
                }
                if (data.reportGitShow!=null&&data.reportGitShow!=undefined&&data.reportGitShow){
                    num++;
                    $("#reportGitQuestion").show();
                }else{
                    $("#reportGitQuestion").hide();
                }
                if (data.reportDutyManageShow!=null&&data.reportDutyManageShow!=undefined&&data.reportDutyManageShow){
                    num++;
                    $("#reportDutyManage").show();
                }else{
                    $("#reportDutyManage").hide();
                }
                if(num>9){
                    $('#menu_box_top').css('overflow-x','scroll')
                    $('.header').css('height','72px')
                    $('.menu_list').css('min-width','300px')
                }
                if($.cookie('currentAuthBydatashare')==='EXPERIMENTALTEACHING'||$.cookie('currentAuthBydatashare')==='EXCENTERDIRECTOR'
                    ||$.cookie('currentAuthBydatashare')==='ACADEMYLEVELM'||$.cookie('currentAuthBydatashare')==='SUPERADMIN'){
                    $("li[id^='sj']").each(function(){
                        if($(this).is(':visible')){
                            $(this).children()[0].click();
                            return false;
                        }
                    })
                }
            }
        });
    }

//切换权限
    changeAuth={
        changeAuth:function () {
            var str = '';
            str+='<div class="layui-form">';
            $.each(authorities,function (index,item) {
                if(currentauth == item.name){
                    str+=' <input type="radio" name="auth" value="'+ item.name +'" title="'+ item.cname +'" checked="">'
                }else{
                    str+=' <input type="radio" name="auth" value="'+ item.name +'" title="'+ item.cname +'">'
                }

            });
            str+='</div>'
            layer.confirm(str,{
                btn: ['确定'],
                title : '请选择权限',
                closeBtn :0,//不显示关闭按钮
                success: function(){
                    form.render();
                },
                btn1: function (index) {
                    currentauth = $("input[name='auth']:checked").val();
                    $.cookie("currentAuthBydatashare",$("input[name='auth']:checked").val());
                    $.each(authorities,function (index,item) {
                        if(currentauth === item.name){
                            currentanthcname = item.cname;
                        }
                    })
                    $.cookie('currentAuthCnameBydatashare',currentanthcname);
                    document.getElementById("datashare_cname").innerText = `${currentanthcname}:${currentUsername}，您好`;
                    window.location.reload()
                    // currauth = [];
                    // currauth.push($("input[name='auth']:checked").val());
                    // // currauth = $("input[name='auth']:checked").val();
                    // getInfoByAuthorityName(currauth[0]);
                    // getTemplateProcess();
                    // getTableHeader();
                    // tableRender();
                    // layer.close(index);
                }
            });
        }
    }
    $('.breadcrumb_select').on('click', function(){
        var othis = $(this), type = othis.data('type');
        changeAuth[type] ? changeAuth[type].call(this, othis) : '';
    });
})
