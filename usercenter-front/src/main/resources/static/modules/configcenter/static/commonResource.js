var contextPath = "";
// var evaluationHost = "";

$(document).ready(function () {
    contextPath = $("#pageContext").val();
    // evaluationHost =$("#zuulServerUrl").val()+"/configcenter/";
    // 初始化资源
    resourceContainer.initResourceContainer({
        oauth2Host: oauth2Host,
        resourceContainerHost: resourceContainerHost + "/gvsunResource",
        directoryEngineHost: resourceContainerHost + "/gvsunDirectory",
        siteName: "配置中心",
        authorizationURL: resourceContainerHost + "/shareApi/getAuthorization",
        username: currentUsername,
        resourceContainerHostForUpload: resourceContainerHostForUpload
    });


    //读取资源，返回文件存放路径
    $.each($(".resource-img"),function (index,obj) {
        if($(obj).attr("state")==1){
            if($(obj).attr("data").indexOf("/")==-1){
                getFile({
                    fileId:$(obj).attr("data"),
                    success:function (data) {
                        if(!data.code){
                            $(obj).attr("src",data.data.url);
                            $(obj).load();
                        }

                    }
                });
            }else{
                $(obj).attr("src",$(obj).attr("data"));
            }
        }
    });
});

function getAuthorization(jsonData) {
    $.ajax({
        type: "Get",
        async: (jsonData.async == null ? true : jsonData.async),
        url: contextPath+"/shareApi/getAuthorization",
        success: function (data) {
            jsonData.success(data);
        }
    });
};

// 读取资源
function getFile(jsonData) {
    getAuthorization({
        async:jsonData.async,
        success:function(authorization){
            $.ajax({
                url: $("#resourceContainerHost").val()+"/gvsunResource/getFileById?id="+jsonData.fileId,
                type:"Get",
                dataType:"json",
                async:(jsonData.async==null?true:jsonData.async),
                headers:{
                    Authorization:authorization
                },
                success:function (data) {
                    switch(data.url){
                        case "NoFileUrl":
                            if(jsonData.error!=null)
                                jsonData.error();
                            break;
                        case "AuthorizationOutOfTime":
                            if(jsonData.authorizationOutOfTime!=null)
                                jsonData.authorizationOutOfTime();
                            break;
                        case "NotAllowedRequest":
                            if(jsonData.notAllowedRequest!=null)
                                jsonData.notAllowedRequest();
                            break;
                        default:
                            if(jsonData.success!=null)
                                jsonData.success(data);
                            break;
                    }
                }
            })
        }
    });
};

function openUploadWindowByPath(path,index,step) {
    resourceContainer.initUploadFileWindow({
        afterUploadSuccess: function (data) {
            //data包含fileIds(文件id数组)、files(文件数组)、path(上传路径)
            var fileIds = data.fileIds;
            var files = data.files;
            var targetTitle = data.path;
            let configFiles = '';
            for (var i = 0; i < fileIds.length; i++) {
                var fd = new FormData();
                var fileName = files[i].name;
                var fileSize = resourceContainer.transformSize(files[i].size);
                var fileId = fileIds[i];
                var url = "";
                var timetableResultId = $('#timetableResultId').val();
                // var d1 = configResultList[0];
                // var configResult = d1[$('#configName').val()];
                if(targetTitle.split("/")[targetTitle.split("/").length-2]=="业务流程记录"){
                    configFiles += fileId+'_'+fileName+',';
                }else if(targetTitle.split("/")[targetTitle.split("/").length-2]=="建制管理"){
                    configFiles += fileId+'_'+fileName+',';
                }
            }
            if(targetTitle.split("/")[targetTitle.split("/").length-2]=="业务流程记录"){
                configFiles = (configFiles.substring(configFiles.length - 1) == ',') ? configFiles.substring(0, configFiles.length - 1) : configFiles
                $('#fileUpload'+index+'_'+step).val(configFiles);
            }else if(targetTitle.split("/")[targetTitle.split("/").length-2]=="建制管理" || targetTitle.split("/")[targetTitle.split("/").length-2]=="学业导师"){
                configFiles = (configFiles.substring(configFiles.length - 1) == ',') ? configFiles.substring(0, configFiles.length - 1) : configFiles
                $('#fileUpload'+index+'_'+step).val(configFiles);
            }else if(targetTitle.split("/")[targetTitle.split("/").length-2]=="项目库管理"){
                $.ajax({
                    url: `${timetableHost}api/operation/saveOperationItemEnclosure?operationItemId=${targetTitle.split("/")[targetTitle.split("/").length-1]}&enclosureIds=${fileIds.join(',')}`,
                    type: 'post',
                    async: false,
                    success: function (res) {
                     if(res.data.code === 0){
                         location.reload();
                     }else{
                         layer.msg('啊哦,后台出错了');
                     }
                    }
                })
            }
            resourceContainer.showUploadWindow(false);
        },
        path: path,
        uploadFail: function (reason) {
                alert('上传失败：' + reason);
        },
        fileTags: ['我的文件'],
        multiple: true//是否启用多文件上传
    });
    resourceContainer.showUploadWindow(true);
};
function fileInit(tableEachIndex) {
    var download = '.file_download';
    var show = '.file_show';
    if(tableEachIndex){
        download = '.file_download_table'+tableEachIndex;
        show = '.file_show_table'+tableEachIndex;
    }
    $.each($(download), function (index, obj) {
        $(obj).click(function(){
            resourceContainer.downLoadFile({
                fileId: $(obj).attr("data")
            })
        });
    });
    $.each($(show), function (index, obj) {
        $(obj).click(function(){
            resourceContainer.getFileById({
                success:function(result){
                    layer.confirm('下载/预览?<br>doc,docx,ppt,pptx,xls,xlsx<font color="red">最大可预览大小为10M</font>', {
                        btn: ['下载','预览'] //按钮
                        , offset: ['150px', '40%']
                    }, function(index){
                        resourceContainer.downLoadFile({
                            fileId: $(obj).attr("data")
                        })
                        layer.close(index);
                    }, function(index){
                        if(isPdf(result.fileName)){
                            layer.open({
                                type: 2,
                                area: ['1000px', '650px'],
                                fixed: false, //不固定
                                maxmin: true,
                                content: result.url
                            });
                        }else if(isMp4(result.fileName)){
                            layer.open({
                                type: 2,
                                area: ['1000px', '650px'],
                                fixed: false, //不固定
                                maxmin: true,
                                content: result.url
                            });
                        }else if(isDoc(result.fileName)){
                            window.open("http://view.officeapps.live.com/op/view.aspx?src="+escape(result.url),'_blank');
                        }else{
                            // layer.msg('不是pdf,暂不支持预览谢谢!');
                            layer.confirm('对不起,暂不支持该文件格式预览!<br><font color="red">支持的格式:pdf,mp4,doc,docx,ppt,pptx,xls,xlsx</font>', {
                                btn: ['下载','关闭'] //按钮
                                , offset: ['150px', '40%']
                            }, function(index){
                                resourceContainer.downLoadFile({
                                    fileId: $(obj).attr("data")
                                })
                                layer.close(index);
                            }, function(index){
                                layer.close(index);
                            });
                        }
                    });
                    // $('#photo_img').attr("src", result.url);
                },
                fail:function(){
                    alert('文件获取失败！');
                    // $('#photo_img').attr("src",'');
                },
                fileId:$(obj).attr("data"),
                needToken:true
            })
        });
    });
}
// 资源下载
function downLoadFile(fileId) {
    resourceContainer.downLoadFile({
        fileId:fileId,
        fail: function (reason) {
            alert('下载失败:' + reason);
        }
    })
}

//删除系统图片
function deleteSystemPic(id,fileId) {
    f({
        id: id,
        fileId:fileId,
    });
}
function f(jsonData) {
    getAuthorization({
        async:jsonData.async,
        success:function(authorization){
            jsonData.needToken = authorization;
            jsonData.fail = function(){}
            jsonData.success = function(){
                $.ajax({
                    url:contextPath+"/system/deleteSystemPic?id="+jsonData.id,
                    type:"POST",
                    success:function () {
                        alert("删除图片成功");
                        location.reload(true);
                    }})
            }
            resourceContainer.deleteFileById(jsonData)
        }
    })
}

window.isPdf = function (fileName) {
    let regExp = /\.(PDF)$/i;
    if (fileName && fileName.search(regExp) !== -1) {
        return true;
    } else {
        return false;
    }
};
window.isMp4 = function (fileName) {
    let regExp = /\.(MP4)$/i;
    if (fileName && fileName.search(regExp) !== -1) {
        return true;
    } else {
        return false;
    }
};
window.isDoc = function (fileName) {
    let regExp = /\.(DOC|DOCX|XLSX|XLS|PPT|PPTX)$/i;
    if (fileName && fileName.search(regExp) !== -1) {
        return true;
    } else {
        return false;
    }
};