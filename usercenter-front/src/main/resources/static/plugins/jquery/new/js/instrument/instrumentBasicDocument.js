//iframe confirm
// $('.menu_list',window.parent.document).onclick(function(){
//     return confirm("您还未保存，确认离开吗？");
// })


//用ajax上传图片，并反馈结果
//type是上传的类型    isRefresh true则是批量上传，需要刷新网页，false是不需要刷新网页，适合单个设备上传图片
function uploadMore(type, isRefresh) {
    var uid;
    // alert("您能")
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
    if (type == "2") {
        var form = new FormData(document.forms.namedItem('importFormDoc'));
        var name = "Doc";
    }
    if (type == "3") {
        var name = "Attach";
        var form = new FormData(document.forms.namedItem('importFormAttach'));
    }
    if (type == "4") {
        var form = new FormData(document.forms.namedItem('importFormVideo'));
        var name = "Video";
    }
    //送样检测附件
    if (type == "6") {
        var name = "Attach";
        var form = new FormData(document.forms.namedItem('importFormAttach'));
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
                    createList(data, name);
                }
                if (type == '2') {
                    //关掉框框
                    var name = 'Doc';
                    $progress.parent().hide();
                    $progress.attr('aria-valuenow', 0);
                    $progress.width(0 + '%');
                    $(".submit" + name).css("display", "");
                    $(".submit" + name + "ing").css("display", "none");
                    $('#searchFile' + name).window('close');
                    $('#input' + name).val('');
                    createList(data, name);
                }
                if (type == '3') {
                    //关掉框框
                    var name = 'Attach';
                    $progress.parent().hide();
                    $progress.attr('aria-valuenow', 0);
                    $progress.width(0 + '%');
                    $(".submit" + name).css("display", "");
                    $(".submit" + name + "ing").css("display", "none");
                    $('#searchFile' + name).window('close');
                    $('#input' + name).val('');
                    createList(data, name);
                }
                if (type == '4') {
                    //关掉框框
                    var name = 'Video';
                    $progress.parent().hide();
                    $progress.attr('aria-valuenow', 0);
                    $progress.width(0 + '%');
                    $(".submit" + name).css("display", "");
                    $(".submit" + name + "ing").css("display", "none");
                    $('#searchFile' + name).window('close');
                    $('#input' + name).val('');
                    createList(data, name);
                }

            }

        }
    });
}

//具体遍历图片等信息的方法
function createList(data, name) {
    var hideDiv;
    var hideDivSmall;
    var hideId;
    var appendTable;
    if (name == 'Pic') {
        hideDiv = 'picDiv';
        hideDivSmall = 'picDivSmall';
        hideId = "Pic";
        //大图遍历
        //先把已存在的大图display none
        $('.gallery_img_nav .nav_a').each(function () {
            $(".gallery_img img").hide();
        });
        for (var string in data) {
            if (string == 0) {
                var str = "<img id='" + hideId + "1" + data[parseInt(string)].uid + "' class='w60p slip_img' alt=\"\" src='" + data[0].documentUrl + "'  style=\"display: block;\" />";
            } else {
                var str = "<img id='" + hideId + "1" + data[parseInt(string)].uid + "' class='w60p slip_img' alt=\"\" src='" + data[parseInt(string)].documentUrl + "'  style=\"display: none;\" />";
            }
            var $str = $(str);
            $("#" + hideDiv).append($str);
        }
    }
    if (name == 'Doc') {
        hideId = "Doc";
        appendTable = 'docTable';
    }
    if (name == 'Attach') {
        hideId = "Attach";
        appendTable = 'attachTable';
    }
    if (name == 'Video') {
        hideId = "Video";
        appendTable = 'videoTable';
    }
    if (name == "qrCode") {
        var img = "<img id='qrCodeImg' class='slip_img' alt=\"\" src='" + data + "' />";
        $("#QRCode").append($(img));
    }
    //图片的情况：小图和删除的遍历
    //执行遍历
    for (var string in data) {
        if (name == 'Pic') {
            var img = "<img id='" + hideId + "2" + data[parseInt(string)].uid + "' alt=\"\" class='slip_img' src='" + data[parseInt(string)].documentUrl + "' style=\"width: 100px;height:89px;\"/>";
            var div = "<div id='" + hideId + "3" + data[parseInt(string)].uid + "' class='img_container' style=\"display: inline-block\"></div>";
            var $div = $(div);
            if (string == 0) {
                var a1 = "<a id='" + hideId + "4" + data[parseInt(string)].uid + "' class=\"nav_a\ on\" style=\"display: block;\" rel=\"img1\" href=\"javascript:;\"></a>";
            } else {
                var a1 = "<a id='" + hideId + "4" + data[parseInt(string)].uid + "' class=\"nav_a\" style=\"display: block;\" rel=\"img1\" href=\"javascript:;\"></a>";
            }

            var $a1 = $(a1);
            $a1.click(function () {
                $(".gallery_img_nav .nav_a").removeClass('on');
                $(this).addClass("on");
                var index = $(this).parent().index();
                if ($(".gallery_img img").eq(index).is(":hidden")) {
                    $(".gallery_img img").slideUp();
                    $(".gallery_img img").eq(index).slideDown();
                }
            })
            $a1.append($(img));
            $div.append($a1);
            var a2 = "<a id='" + hideId + "5" + data[parseInt(string)].uid + "' class=\"mt10\" onclick='deleteThis(\"" + data[parseInt(string)].uid + "\",\"" + hideId + "\")'>" +
                "<i class=\"fa fa-trash-o f20\"></i>" +
                "</a>";
            $div.append($(a2));
            $("#" + hideDivSmall).append($div);
        }
        if (name == 'Doc' || name == "Attach") {
            var tr = "<tr id='" + data[parseInt(string)].uid + "'></tr>";
            var td1 = "<td>" + data[parseInt(string)].documentName + "</td>";
            var td2 = "<td></td>";
            var deleteIcon = " <a class=\"fa fa-trash-o ml10\"  onclick='deleteThis(\"" + data[parseInt(string)].uid + "\",\"" + hideId + "\")' ></a>";
            // var downloadIcon="<a class=\"fa fa-download ml10\" href='instruments/config/downloadCommonDocument?uid="+data[parseInt(string)].uid+"' ></a>";
            var down = "<a class=\"fa fa-download ml10\" href='" + data[parseInt(string)].documentUrl + "?filename=" + data[parseInt(string)].documentName + "'  download='" + data[parseInt(string)].documentName + "' >点击下载</a>";
            var $td2 = $(td2);
            $td2.append($(deleteIcon));
            // $td2.append($(downloadIcon));
            $td2.append($(down));
            var $tr = $(tr);
            $tr.append($(td1));
            $tr.append($td2);
            $("#" + appendTable).append($tr);
        }
        if (name == "Video") {
            var video = "<video style=\"height: 360px;margin:0 auto;display: block;\" class=\"w60p mtb10\" controls=\"controls\" src='" + data[parseInt(string)].documentUrl + "' ></video>";
            var source1 = "<source src=\"#\" type=\"video/mp4\"/>";
            var source2 = "<source src=\"#\" type=\"video/ogg\"/>";
            var source3 = "<source src=\"#\" type=\"video/webm\"/>";
            var obj = "<object data=\"#\"></object>";
            var embed = "<embed src=\"#\"/>";
            var div = "<div style=\"text-align: center;\" class=\"h35 lh35 tc f16\"></div>";
            var lable = "<label  th:text=\"@{${commonVideo.videoName}}\"></label>";
            var deleteIcon = " <a class=\"fa fa-trash-o ml10\"  onclick='deleteThis(\"" + data[parseInt(string)].uid + "\",\"" + hideId + "\")' ></a>";
            var $div = $(div);
            $div.append($(lable));
            $div.append($(deleteIcon));
            var $obj = $(obj);
            $obj.append($(embed));
            var $video = $(video);
            $video.append($(source1));
            $video.append($(source2));
            $video.append($(source3));
            $video.append($obj);
            var divSum = "<div id='" + data[parseInt(string)].uid + "'></div>";
            var $divSum = $(divSum);
            $divSum.append($video);
            $divSum.append($div);
            $("#videoTable").append($divSum);


        }
    }
}

function deleteThis(uid, type) {
    //删掉这个uid的commondocument
    $.ajax({
        url: "../config/deleteCommonDocumentByUid?uid=" + uid,
        type: 'POST',
        async: false,
        error: function () {
            alert("删除成功，但程序出错，请手动刷新页面！");

        },
        success: function (data) {//AJAX查询成功
            alert("删除成功！");
            if (type == 'Pic') {
                for (var i = 1; i < 6; i++) {
                    $('#Pic' + i + data).fadeOut(2000);
                    $('#Pic' + i + data).remove();
                }
                $(".gallery_img img").show();
                $(".gallery_img img").not(":first").hide();
            }
            if (type == 'Doc' || type == 'Attach') {
                $('#' + data).fadeOut(2000);
            }
            if (type == "Video") {
                $('#' + data).fadeOut(2000);
            }

        }
    });

}

function saveText() {
    var acalist = $('#openCategory').val();
    // alert(acalist)
    var content1 = editor1.txt.html();
    var content2 = editor2.txt.html();
    var content3 = editor3.txt.html();
    var content4 = editor4.txt.html();
    var insUid = document.getElementById("insUid").value;
    var myData = {
        "acalist": acalist,
        "content1": content1,
        "content2": content2,
        "content3": content3,
        "content4": content4,
        "insUid": insUid,
    }
    $.ajax({
        type: 'post',
        async: false,
        url: '../config/saveBasicInfomation?acalist=' + acalist + '&insUid=' + insUid,
        data: myData,
        success: function () {
            return true;
        },
        error: function () {
            return false;
        }
    });
}

function uploadFile(name) {
    var top = $("#" + name).offset().top;
    $('#searchFile' + name).window({top: top + "px"});
    $('#searchFile' + name).window('open');

}

function uploadFile1(name) {
    alert("需要上传相应设备的编号命名的图片哦！")
    $('#searchFile' + name).window({top: '200px'});
    $('#searchFile' + name).window('open');
}

function filejudgeSize(type, isRefresh) {
    if (type == '1') {
        var name = 'Pic';
    }
    if (type == '2') {
        var name = 'Doc';
    }
    if (type == '3') {
        var name = 'Attach';
    }
    if (type == '4') {
        var name = 'Video';
    }
    //送样检测的附件
    if (type == '6') {
        var name = 'Attach';
    }
    var $progress = $(".upload" + name + "Progress");
    $progress.parent().show();
    $(".submit" + name).css("display", "none");
    $(".submit" + name + "ing").css("display", "");
    // var f = document.getElementById("file_upload"+name).files;
    // if(f!=null && f.length>0){
    //    if(f.length<=5){

    var formData = new FormData(document.forms.namedItem("importForm" + name));

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
                alert('单个文件不能超过100M！');
                $('#file_upload' + name).val('');
                $(".submit" + name).css("display", "");
                $(".submit" + name + "ing").css("display", "none");
            } else {
                //saveDocument(type,name);
                uploadMore(type, isRefresh);
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

function saveDocument(type, name) {
    // alert(type)
    var id = $('#uploadId').val();
    var url = "";
    if (type == 1) {
        url = "../config/instrumentBasicImageUpload?insUid=" + id;
    } else if (type == 2) {
        url = "../config/instrumentBasicDocumentUpload?insUid=" + id;
    } else if (type == 3) {
        url = "../config/instrumentBasicAttachmentUpload?insUid=" + id;
    } else if (type == 4) {
        url = "../config/instrumentBasicVideoUpload?insUid=" + id;
    }
    var f = document.getElementById("file_upload" + name).files;
    if (f != null && f.length > 0) {
        var $progress = $(".upload" + name + "Progress");
        $progress.parent().show();
        var formData = new FormData(document.forms.namedItem("importForm" + name));
        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            //dataType:"text",
            async: true,
            cache: false,
            contentType: false,
            processData: false,
            error: function (data) {
                alert('请求错误!');
            },
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
                            $progress.parent().hide();
                            $progress.attr('aria-valuenow', 0);
                            $progress.width(0 + '%');
                        }
                    }, false);
                }
                return xhr;
            },

            success: function () {
                uploadMore("4", "false");
                saveText();
                //   location.reload();
            }
        });
    } else {
        alert('请选择文件再上传');
    }
}

function saveNewInstrument(insUid) {
    var acalist = $('#openCategory').val();

    var content1 = editor1.txt.html();
    var content2 = editor2.txt.html();
    var content3 = editor3.txt.html();
    var content4 = editor4.txt.html();

    var firstClassificationList = $("input[name='firstClassification']");
    var secondClassificationList = $("input[name='secondClassification']");
    var firstClassification = "";
    var secondClassification = "";
    var firstClassificationText = "";
    var secondClassificationText = "";
    var firstArray = new Array();
    var secondArray = new Array();
    var firstTextArray = new Array();
    var secondTextArray = new Array();
    if (firstClassificationList.length != 0) {
        for (var i = 0; i < firstClassificationList.length; i++) {
            if (firstClassificationList[i].checked == true) {
                firstArray.push(firstClassificationList[i].value);
                var aaa = document.getElementById('firstText' + firstClassificationList[i].value).innerHTML;
                firstTextArray.push(aaa);
            }
        }
        firstClassification = firstArray.join(",");
        firstClassificationText = firstTextArray.join(",");
    }
    if (secondClassificationList.length != 0) {
        for (var i = 0; i < secondClassificationList.length; i++) {
            if (secondClassificationList[i].checked == true) {
                secondArray.push(secondClassificationList[i].value);
                var bbb = document.getElementById('secondText' + secondClassificationList[i].value).innerText;
                secondTextArray.push(bbb);
            }
        }
        secondClassification = secondArray.join(",");
        secondClassificationText = secondTextArray.join(",");
    }

    var myData = {
        "acalist": acalist,
        "content1": content1,
        "content2": content2,
        "content3": content3,
        "content4": content4,
        "insUid": insUid,
        "firstClassification": firstClassification,
        "secondClassification": secondClassification,
    }
    $.ajax({
        type: 'post',
        async: false,
        url: '../config/saveBasicInfomation?acalist=' + acalist + '&insUid=' + insUid,
        data: myData,
        success: function () {
            alert("保存成功");
            $("#firstClassifications").html(firstClassificationText);
            $("#secondClassifications").html(secondClassificationText);
        },
        error: function () {
        }
    });
}

$(function () {
    var myData = {
        "uid": $("#uid").val()
    }
    $.ajax({
        type: 'POST',
        url: '../config/getEditorConfig',
        //dataType:'json',
        data: myData,
        success: function (data) {
            editor1.txt.html(data.text1);
            editor2.txt.html(data.text2);
            editor3.txt.html(data.text3);
            editor4.txt.html(data.text4);
        },
        error: function () {
            //  alert("保存失败")
        }
    });
})

function SetCookie(name, value) {
    var exp = new Date();
    exp.setTime(exp.getTime() + 6 * 24 * 60 * 60 * 1000); //6天过期
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + "; path=/";
    return true;
};

//读取cookie
function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null;
};

//判定离开页面
function confirms() {
    var acalist = $('#openCategory').val();
    // alert(acalist)
    var content1 = editor1.txt.html();
    var content2 = editor2.txt.html();
    var content3 = editor3.txt.html();
    var content4 = editor4.txt.html();
    var insUid = document.getElementById("insUid").value;
    var isConfirm;
    var myData = {
        "acalist": acalist,
        "content1": content1,
        "content2": content2,
        "content3": content3,
        "content4": content4,
        "insUid": insUid,
    }
    $.ajax({
        type: 'post',
        async: false,
        url: '../config/checkTextIsModify?acalist=' + acalist + '&insUid=' + insUid,
        data: myData,
        success: function (data) {
            if (data == "true") {
                // isConfirm=confirm("您还未保存，确认离开吗？");

            } else {
                isConfirm = true;
            }

        },
        error: function () {
            return false;
        }
    });
    return isConfirm;
    //return confirm("您还未保存，确认离开吗？");
}

function isfirstClassificationChange(firstClassificationCode) {
    var firstCheckBox = document.getElementById("first" + firstClassificationCode);
    if (firstCheckBox.checked == true) {
        console.log(firstCheckBox.value);
        if (firstClassificationCode != -1) {
            firstClassificationCode += '_';
            $.ajax({
                type: 'post',
                async: false,
                url: '../config/listInstrumentSecondClassificationByFirst?code=' + firstClassificationCode,
                success: function (data) {
                    $("#secondClassificationSpan").append(data);
                }
                ,
                error: function () {
                    return false;
                }
            })
        }
    } else {
        //取消选中
        var second = document.getElementsByName("secondClassificationDiv");
        for (var i = 0; i < second.length; i++) {
            console.log(second[i].firstChild.value);
            if (second[i].childNodes[0].value.indexOf(firstClassificationCode) != -1) {
                second[i].remove();
            }
        }
    }
}
