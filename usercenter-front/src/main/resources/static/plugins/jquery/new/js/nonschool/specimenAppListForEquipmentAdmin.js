function uploadFile(name){
    var top = $("#"+name).offset().top;
    $('#searchFile'+name).window({top:top+"px"});
    $('#searchFile'+name).window('open');
}
//上传检测报告
function uploadSpecimenFile(uid) {
    $('#searchFileDoc').window({
        position: 'absolute',
        margin:'0 auto',
        margin_left:'auto',
        margin_right:'auto',
});
    // $('#searchFileDoc').css({
    //     position: 'absolute',
    //     left: (document.body.clientWidth - $('#searchFileDoc').width()) / 2 + document.body.scrollLeft,
    //     top:((document.body.clientHeight - $('#searchFileDoc').height()) / 2 + document.body.scrollTop) < 0 ? 10 : (document.body.clientHeight - $('#searchFileDoc').height()) / 2 + document.body.scrollTop,
    // });
    $('#searchFileDoc').window('open');
    $('#uid').val(uid);
}
function filejudgeSize(type,isRefresh){
    if(type == '1'){
        var name='Pic';
    }
    if(type == '2'){
        var name='Doc';
    }
    if(type == '3'){
        var name='Attach';
    }
    if(type == '4'){
        var name='Video';
    }
    //送样检测的附件
    if(type == '6'){
        var name='Attach';
    }
    var $progress   = $(".upload"+name+"Progress");
    $progress.parent().show();
    $(".submit"+name).css("display","none");
    $(".submit"+name+"ing").css("display","");
    // var f = document.getElementById("file_upload"+name).files;
    // if(f!=null && f.length>0){
    //    if(f.length<=5){

    var formData = new FormData(document.forms.namedItem("importForm"+name));

    $.ajax({
        url:'../config/filejudgeSize?type='+type,
        type: 'POST',
        data: formData,
        dataType:"text",
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        error:function (request){
            alert('请求错误!');
        },
        success:function(data){
            if (data== 'overSize') {
                alert('单个文件不能超过10M！');
                $('#file_upload'+name).val('');
                $(".submit"+name).css("display","");
                $(".submit"+name+"ing").css("display","none");
            }else{
                //saveDocument(type,name);
                uploadMore(type,isRefresh);
            }
        }

    });

    //}
    //else{
    //  alert('单次上传文件不得超过5个');
    //$('#file_upload'+name).val('');
    // }
    //}
}
//type是上传的类型    isRefresh true则是批量上传，需要刷新网页，false是不需要刷新网页，适合单个设备上传图片
function uploadMore(type,isRefresh){
    var uid;
    if(document.getElementById("uid") != null){
        uid=document.getElementById("uid").value;
    }else{
        uid=null;
    }
    if(type == "1"){
        //推送form表单
        var form = new FormData(document.forms.namedItem('importFormPic'));
        var name="Pic";
    }
    if(type == "2"){
        var form = new FormData(document.forms.namedItem('importFormDoc'));
        var name="Doc";
    }
    if(type == "3"){
        var name="Attach";
        var form = new FormData(document.forms.namedItem('importFormAttach'));
    }
    if(type == "4"){
        var form = new FormData(document.forms.namedItem('importFormVideo'));
        var name="Video";
    }
    //送样检测附件
    if(type == "6"){
        var name="Attach";
        var form = new FormData(document.forms.namedItem('importFormAttach'));
    }
    var $progress   = $(".upload"+name+"Progress");
    $.ajax({
        url:"../file/uploadMore?type="+type+"&insUid="+uid,
        type:'POST',
        async:true,
        data:form,
        //ajax传form表单必填 开始-->
        processData:false,
        contentType:false,
        ////ajax传form表单必填 结束-->
        xhr :  function() {
            var xhr = $.ajaxSettings.xhr();
            if(xhr.upload){
                xhr.upload.addEventListener('progress',function(event){
                    var total = event.total,
                        position = event.loaded  || event.position,
                        percent = 0;
                    if(event.lengthComputable){
                        percent = Math.ceil(position / total * 100);
                    }
                    $progress.attr('aria-valuenow',percent);
                    $progress.width(percent+'%');
                    if(percent >= 100){

                    }}, false);
            }
            return xhr;
        },
        error:function(){
            alert("上传出错，再尝试一次或之后再试！");
            $(".submit"+name).css("display","");
            $(".submit"+name+"ing").css("display","none");
        },
        success:function(data){//AJAX查询成功
            if(isRefresh == true){
                //失败的文件名
                var failed="";
                //数据list的长度
                var len=data.length;
                //遍历
                var count=0;
                //成功的个数
                var success=0;
                //执行遍历
                for(var string in data){
                    //非最后一个
                    if(count<len-1){
                        failed+=data[count].documentName;
                        failed+="\n";
                        count++;
                    }else{
                        success=data[count].documentName;
                    }
                }
                alert("成功上传了"+success+"个文件,上传失败的是：\n"+failed);
                window.location.reload();
            }else{
                if(type == '1'){
                    //关掉框框
                    var name='Pic';
                    $progress.parent().hide();
                    $progress.attr('aria-valuenow',0);
                    $progress.width(0+'%');
                    $(".submit"+name).css("display","");
                    $(".submit"+name+"ing").css("display","none");
                    $('#searchFile'+name).window('close');

                    $('#input'+name).val('');
                    createList(data,name);
                }
                if(type == '2'){
                    //关掉框框
                    var name='Doc';
                    $progress.parent().hide();
                    $progress.attr('aria-valuenow',0);
                    $progress.width(0+'%');
                    $(".submit"+name).css("display","");
                    $(".submit"+name+"ing").css("display","none");
                    $('#searchFile'+name).window('close');
                    $('#input'+name).val('');
                    createList(data,name);
                }
                if(type == '3'){
                    //关掉框框
                    var name='Attach';
                    $progress.parent().hide();
                    $progress.attr('aria-valuenow',0);
                    $progress.width(0+'%');
                    $(".submit"+name).css("display","");
                    $(".submit"+name+"ing").css("display","none");
                    $('#searchFile'+name).window('close');
                    $('#input'+name).val('');
                    createList(data,name);
                }
                if(type == '4'){
                    //关掉框框
                    var name='Video';
                    $progress.parent().hide();
                    $progress.attr('aria-valuenow',0);
                    $progress.width(0+'%');
                    $(".submit"+name).css("display","");
                    $(".submit"+name+"ing").css("display","none");
                    $('#searchFile'+name).window('close');
                    $('#input'+name).val('');
                    createList(data,name);
                }

            }

        }
    });
}
function createList(data){
    window.location.reload();
}

function deleteThis(uid,type){
    //删掉这个uid的commondocument
    $.ajax({
        url:"../config/deleteCommonDocumentByUid?uid="+uid,
        type:'POST',
        async:false,
        error:function(){
            alert("删除成功，但程序出错，请手动刷新页面！");

        },
        success:function(data){//AJAX查询成功
            alert("删除成功！");
            $('#'+data).fadeOut(2000);
        }
    });

}
function Access(id,obj){
    targetDeviceId = id;
    var nonschoolAppUid = "";
    nonschoolAppUid = $(obj).attr("data");
    $.ajax({
        url:"../instrument/securityAccess?id="+id,
        type:"GET",
        dataType:"TEXT",
        success:function(data){//AJAX查询成功
            if(data=="noMachineConfig"){
                alert("没有设置机时预约相关参数，请联系管理员设置后再预约！");
            }else{
                if(data=="success" || data=="isRead" || data=="isManager"|| data==""){
                    //校外送样检测的机时预约
                    window.location.href= '../instrument/doInstrumentMachineApp?insUid='+id+'&nonschoolAppUid='+nonschoolAppUid;
                }else if(data=="error"){
                    layer.msg('您还未通过培训,请先预约培训!', {
                        time: 0 //不自动关闭
                        ,btn: ['去预约培训', '先不预约了']
                        ,yes: function(index){
                            layer.close(index);
                            window.location.href= "../config/viewInstrumentTrainingForApp?currpage=1&insUid="+id;
                        }
                        ,btn2:function () {
                            window.location.reload();
                        }
                    });
                }else if(data=="noManager"){
                    alert("该设备还未添加设备管理员，暂不能预约，请联系相关人员进行添加！");
                }else if(data=="isBlack"){
                    alert("您已被加入黑名单，暂不能预约，请联系相关人员！");
                }else if(data=="inTraining"){
                    alert("您已在培训中，通过培训后方可预约！");
                }else if(data=="lowScore"){
                    alert("您的信誉积分不足，无法预约！");
                }else if(data=="notAcademy"){
                    alert("该设备未对您所在的学院开放预约，请联系相关人员！");
                }else if(data=="unAccessTest"){
                    layer.msg('您还未通过考试,请先通过考试!', {
                        time: 0 //不自动关闭
                        ,btn: ['去参加', '先不预约了']
                        ,yes: function(index){
                            layer.close(index);
                            window.location.href= "../config/viewInstrumentTest?insUid="+id;
                        }
                        ,btn2:function () {
                            window.location.reload();
                        }
                    });
                }
                else{
                    layer.msg(data, {
                        time: 0 //不自动关闭
                        ,btn: ['我已阅读，去预约', '先不预约了']
                        ,yes: function(index){
                            layer.close(index);
                            window.location.href= "../instrument/doInstrumentMachineApp?insUid="+id;
                        }
                        ,btn2:function () {
                            window.location.reload();
                        }
                    });
                }
            }

        }
    })
}
function confirmNonschoolSpecimenInspection(id,obj){
    targetDeviceId = id;
    var nonschoolAppUid = "";
    nonschoolAppUid = $(obj).attr("data");
    $.ajax({
        url:"../nonschool/confirmNonschoolSpecimenInspection?insUid="+id+'&nonschoolAppUid='+nonschoolAppUid,
        type:"GET",
        dataType:"TEXT",
        success:function(data){//AJAX查询成功
            if(data=="success"){
                alert("确认成功，请上传检测报告");
                window.location.reload();
            }
        }
    })
}
function selectHighLightInProject(){
    var stage=$("#selectsaaab").attr("data");
    if(stage==-1){
        stage=3;
    }
    $($("#selectsaaab").children().get(stage)).attr("class","order_select");
}