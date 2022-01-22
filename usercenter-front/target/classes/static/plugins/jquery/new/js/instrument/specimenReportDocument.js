


//iframe confirm
// $('.menu_list',window.parent.document).onclick(function(){
//     return confirm("您还未保存，确认离开吗？");
// })


//用ajax上传图片，并反馈结果
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
//具体遍历图片等信息的方法
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

function saveText(){
    var acalist = $('#openCategory').val();
    // alert(acalist)
    var content1 = editor1.txt.html();
    var content2 = editor2.txt.html();
    var content3 = editor3.txt.html();
    var content4 = editor4.txt.html();
var insUid=document.getElementById("insUid").value;
    var myData ={
        "acalist": acalist,
        "content1":content1,
        "content2":content2,
        "content3":content3,
        "content4":content4,
        "insUid":insUid,
    }
    $.ajax({
        type: 'post',
        async: false,
        url: '../config/saveBasicInfomation?acalist='+acalist+'&insUid='+insUid,
        data: myData,
        success: function() {
            return true;
        },
        error:function() {
            return false;
        }
    });
}
function uploadFile(name){
    var top = $("#"+name).offset().top;
    $('#searchFile'+name).window({top:top+"px"});
    $('#searchFile'+name).window('open');

}
function uploadFile1(name){
    alert("需要上传相应设备的编号命名的图片哦！")
    $('#searchFile'+name).window({top:'200px'});
    $('#searchFile'+name).window('open');
}
function uploadSpecimenFile(uid){
    $('#searchFileDoc').window({top:'200px'});
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
                        alert('单个文件不能超过100M！');
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

function saveDocument(type,name){
    // alert(type)
    var id=$('#uploadId').val();
    var url="";
    if (type==1){
        url="../config/instrumentBasicImageUpload?insUid="+id;
    } else if (type==2){
        url="../config/instrumentBasicDocumentUpload?insUid="+id;
    } else if (type==3) {
        url="../config/instrumentBasicAttachmentUpload?insUid="+id;
    } else if (type==4) {
        url="../config/instrumentBasicVideoUpload?insUid="+id;
    }
    var f = document.getElementById("file_upload"+name).files;
    	if(f!=null && f.length>0){
            var $progress   = $(".upload"+name+"Progress");
            $progress.parent().show();
        		var formData = new FormData(document.forms.namedItem("importForm"+name));
        	       $.ajax({
            	              url:url,
            	              type: 'POST',
            	              data: formData,
                              //dataType:"text",
            	              async: true,
            	              cache: false,
            	              contentType: false,
            	              processData: false,
            	             error:function (data){
            	               alert('请求错误!');
            	             },
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
                                             $progress.parent().hide();
                                           $progress.attr('aria-valuenow',0);
                                            $progress.width(0+'%');
                                   }}, false);
                                   }
                                   return xhr;
                            },

                       success:function(){
                           uploadMore("4","false");
                           saveText();
            	            //   location.reload();
            	             }
        	       });
        	}else{
        		alert('请选择文件再上传');
        	}
}

function saveNewInstrument(insUid){
    var acalist = $('#openCategory').val();
    // alert(acalist)
    var content1 = editor1.txt.html();
    var content2 = editor2.txt.html();
    var content3 = editor3.txt.html();
    var content4 = editor4.txt.html();
    var firstClassification = $("#firstClassification").val();
    var secondClassification = $('input:radio:checked').val();

    var myData ={
        "acalist": acalist,
        "content1":content1,
        "content2":content2,
        "content3":content3,
        "content4":content4,
        "insUid":insUid,
        "firstClassification":firstClassification,
        "secondClassification":secondClassification,
    }
    $.ajax({
        type: 'post',
        async: false,
        url: '../config/saveBasicInfomation?acalist='+acalist+'&insUid='+insUid,
        data: myData,
        success: function() {
            alert("保存成功")
        },
        error:function() {
        }
    });
}

function SetCookie(name, value) {
    var exp = new Date();
    exp.setTime(exp.getTime() + 6 * 24 * 60 * 60 * 1000); //6天过期
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString()+"; path=/";
    return true;
};
//读取cookie
function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]); return null;
};
//判定离开页面
function confirms(){
    var acalist = $('#openCategory').val();
    // alert(acalist)
    var content1 = editor1.txt.html();
    var content2 = editor2.txt.html();
    var content3 = editor3.txt.html();
    var content4 = editor4.txt.html();
    var insUid=document.getElementById("insUid").value;
    var isConfirm;
    var myData ={
        "acalist": acalist,
        "content1":content1,
        "content2":content2,
        "content3":content3,
        "content4":content4,
        "insUid":insUid,
    }
    $.ajax({
        type: 'post',
        async: false,
        url: '../config/checkTextIsModify?acalist='+acalist+'&insUid='+insUid,
        data: myData,
        success: function(data) {
            if(data=="true"){
                // isConfirm=confirm("您还未保存，确认离开吗？");

            }else{
                isConfirm=true;
            }

        },
        error:function() {
            return false;
        }
    });
    return isConfirm;
    //return confirm("您还未保存，确认离开吗？");
}

function secondClassification() {
    var firstClassification = $("#firstClassification").val();
    if(firstClassification!=-1){
        firstClassification += '_';
        $.ajax({
            type: 'post',
            async: false,
            url: '../config/listInstrumentSecondClassificationByFirst?code='+firstClassification,
            success: function(data) {
                $("#secondClassificationDiv").empty();
                $("#secondClassificationDiv").append(data);

            }
            ,
            error:function() {
                return false;
            }
        });
    }
}
