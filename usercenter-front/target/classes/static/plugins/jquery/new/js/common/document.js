function uploadFile(){
    $('#searchFile').window({'top':'50px'});
    $('#searchFile').window('open');
}
//6666666
function filejudgeSize(type){
    var fileType=5;
    var f = document.getElementById("file_upload").files;
    if(f!=null && f.length>0){
        if(f.length<=5){
            var formData = new FormData(document.forms.namedItem("importForm"));
            $.ajax({
                url:'../config/filejudgeSize?type='+fileType,
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
                    if (data=='overSize') {
                        alert('单个文件不能超过10M！');
                        $('#file_upload').val('');
                    }else{
                        saveDocument(type);
                    }
                }
            });
        }else{
            alert('单次上传文件不得超过5个');
            $('#file_upload').val('');
        }
    }
}
function saveDocument(type){
    var instrument;
    //我的文件
    if(type == 'user'){
        instrument=$("#username").val();
    }
    //课题组文件
    if(type == 'commonteam'){
        instrument=$("#commonteam").val();
    }
    if(type == "system"){
        instrument="system";
    }
    if(type == 'academy'){
        instrument=$("#academy").val();
    }
    var module=$("#projectName").val();
    var fileServerString=$("#fileServer").val();
    //这里需要商讨
    var url=fileServerString+"/fileUpload/upload";
    var f = document.getElementById("file_upload").files;
    	if(f!=null && f.length>0){
    	    var fileName=$("#file_upload").val();
    	    var formData=new FormData($("#importForm")[0]);
            formData.append("username",instrument);
            //项目名，不同项目不同名字
            formData.append("module",module);
            formData.append("tag1","tag1");
            formData.append("tag2","tag2");
            formData.append("tag3","tag3");
            formData.append("tag4","tag4");
            formData.append("tag5","tag5");

        	       $.ajax({
            	              url:url,
            	              type: 'POST',
                              async: false,
            	              data: formData,
                              // //dataType:'json',
            	              contentType: false,
            	              processData: false,
            	             error:function (datas){
            	               alert('请求错误!');
            	             },
                             success:function(datas){
            	                  var fileName=datas.fileName;
            	                  var fileUrl=datas.fileUrl;
            	                  var fileCreater=instrument;
            	                  var myData={
            	                      "fileName":fileName,
                                      "fileUrl":fileUrl,
                                      "fileCreater":fileCreater
                                  };
            	                  $.ajax({
                                      url:"../common/saveMyDocument",
                                      type:'POST',
                                      async:false,
                                      data:myData,
                                      success:function () {
                                          alert("成功");
                                      },error:function () {
                                          alert("出错");
                                      }
                                  })
            	               location.reload();
            	             }
        	       });
        	}else{
        		alert('请选择文件再上传');
        	}
}
//查看当前课题组的文件页面
function viewCommonTeamDocument(uid){
    window.location.href="../common/commonteamDocument?uid="+uid;
}
function deleteDocument(uid){
    var myData={
      "uid":uid
    };

            $.ajax({
                url:"../common/deleteDocument",
                type:'POST',
                async:false,
                data:myData,
                success:function () {
                    alert("成功");
                    $('#'+uid).remove();
                },error:function () {
                    alert("出错");
                }
            })
}
