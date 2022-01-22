function uploadMore(type, isRefresh) {
    var uid;
    if (document.getElementById("uid") != null) {
        uid = document.getElementById("uid").value;
    } else {
        uid = null;
    }
    if (type == "1") {
        //推送form表单
        var form = new FormData(document.forms.namedItem('importFormPic'));
        var name = "Pic";
    }
    var $progress = $(".upload" + name + "Progress");
    $.ajax({
        url: "../file/uploadMore?type=" + type + "&insUid=" + uid,
        type: 'POST',
        async: true,
        data: form,
        //ajax传form表单必填 开始-->
        processData: false,
        contentType: false,
        ////ajax传form表单必填 结束-->
        xhr: function () {
            var xhr = $.ajaxSettings.xhr();
            if (xhr.upload) {
                xhr.upload.addEventListener('progress', function (event) {
                    var total = event.total,
                        position = event.loaded || event.position,
                        percent = 0;
                    if (event.lengthComputable) {
                        percent = Math.ceil(position / total * 100);
                    }
                    $progress.attr('aria-valuenow', percent);
                    $progress.width(percent + '%');
                    if (percent >= 100) {

                    }
                }, false);
            }
            return xhr;
        },
        error: function () {
            alert("上传出错，再尝试一次或之后再试！");
            $(".submit" + name).css("display", "");
            $(".submit" + name + "ing").css("display", "none");
        },
        success: function (data) {//AJAX查询成功
            if (isRefresh == true) {
                //失败的文件名
                var failed = "";
                //数据list的长度
                var len = data.length;
                //遍历
                var count = 0;
                //成功的个数
                var success = 0;
                //执行遍历
                for (var string in data) {
                    //非最后一个
                    if (count < len - 1) {
                        failed += data[count].documentName;
                        failed += "\n";
                        count++;
                    } else {
                        success = data[count].documentName;
                    }
                }
                alert("成功上传了" + success + "个文件,上传失败的是：\n" + failed);
                window.location.reload();
            } else {
                if (type == '1') {
                    //关掉框框
                    var name = 'Pic';
                    $progress.parent().hide();
                    $progress.attr('aria-valuenow', 0);
                    $progress.width(0 + '%');
                    $(".submit" + name).css("display", "");
                    $(".submit" + name + "ing").css("display", "none");
                    $('#searchFile' + name).window('close');

                    $('#input' + name).val('');
                    alert('上传成功！');
                    window.location.reload();
                }

            }

        }
    });
}
function deleteThisSlidePics(uid){
    if(confirm("是否删除？")){
        location.href="../config/deleteSlidePicByUid?uid="+uid;
    }
}

function deleteThis(uid) {

    $.get(
        "../config/deleteCommonDocumentByUid?uid=" + uid,
        function (e) {
            console.log(e);
            alert('删除成功');
            window.location.reload();
        }
    );

}

function uploadFile(name) {
    alert('为了上传保持稳定，建议选择单图片上传');
    var top = $("#" + name).offset().top;
    $('#searchFile' + name).window({top: top + "px"});
    $('#searchFile' + name).window('open');

}

function filejudgeSize(type, isRefresh) {
    if (type == '1') {
        var name = 'Pic';
    }
    var $progress = $(".upload" + name + "Progress");
    $progress.parent().show();
    $(".submit" + name).css("display", "none");
    $(".submit" + name + "ing").css("display", "");
    var f = document.getElementById("file_upload").files
    var formData = new FormData(document.forms.namedItem("importForm" + name));
    if(f.length==0){
        alert('请选择文件再上传');
        return false;
    }


    $.ajax({
        url: '../config/filejudgeSize?type=' + type,
        type: 'POST',
        data: formData,
        dataType: "text",
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        error: function (request) {
            alert('请求错误!');
        },
        success: function (data) {
            if (data == 'overSize') {
                alert('单个文件不能超过10M！');
                $('#file_upload' + name).val('');
                $(".submit" + name).css("display", "");
                $(".submit" + name + "ing").css("display", "none");
            } else {
                uploadMore(type, isRefresh);
            }
        }

    });

}
