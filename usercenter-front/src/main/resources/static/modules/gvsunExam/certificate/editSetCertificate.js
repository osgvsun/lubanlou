layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate', 'upload'], function() {
    var admin = layui.admin,
        laypage = layui.laypage,
        layer = layui.layer,
        table = layui.table,
        $ = layui.jquery,
        element = layui.element,
        form = layui.form,
        laydate = layui.laydate,
        upload = layui.upload;


    console.log(projectName)
    form.val('editsetcertificatebox', {
        "number": projectName.number,
        "name": projectName.name,
        "title": projectName.title,
        "prefix": projectName.prefix
    });
    // if (projectName.photoUrl) {
    //     setImage(res.photoUrl)
    // }
    form.render(null, 'editsetcertificatebox');

    form.on('submit(addauthbtn)', function (data) {
        var fieId = data.field;
        var index = parent.layer.getFrameIndex(window.name);
        // $('#editsetcertificatebox').submit();
        fieId["projectName"] = projectName.projectName;
        $.ajax({
            url: httpBaseUrl + '/views/saveCertificate',
            type: 'POST',
            data: fieId,
            success: function (res) {

            }
        })
    });
    var contextPath = /*[[@{/}]]*/'';

    //上传文件，选完文件后不自动上传,点击开始上传按钮上传
    //监听文件
    var pblist = $('#pblist');
    $('#upload-file').on('change', function (e){
        var e = e || window.event;
        //获取 文件 个数 取消的时候使用
        var files = e.target.files;
        console.log(e);
        console.log(files);
        let name = files[0].name;
        let size = (files[0].size / 1024 /1024).toFixed(2) + 'MB';
        console.log(size)

        // 				//读取本地文件
        // e.preview(function (index, file, result) {
        var tr = $(['<tr id="upload-' + 1 + '">', '<td class="wordbreak">' + name + '</td>', '<td>' + size + '</td>', '<td>等待上传</td>', '<td>', '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>', '</td>', '</tr>'].join(''));
        //删除
        tr.find('.demo-delete').on('click', function () {
            tr.remove();
        });

        pblist.append(tr);
        // });

    })

    $("#editsetcertificatebtn").on("click", function (){
        var file = document.getElementById('upload-file').files;
        resourceContainer.getDirectoryIdByPath({
            path: "教学平台/证书图",
            success: function (directoryId) {
                let formData = new FormData();
                formData.append("siteName", "教学平台");
                formData.append("username", username);
                formData.append("fileTags", "image");
                formData.append("files", file[0]);
                formData.append("directoryId", directoryId);
                formData.append("shareState", "私有");
                //自定义图片压缩的宽度 px
                formData.append("width", 800);
                formData.append("height", 100);
                resourceContainer.uploadFile({
                    formData: formData,
                    afterUploadSuccess: function (data) {
                        alert("上传成功");
                        window.fileIds = data.fileIds;
                        console.log(data.files);
                        var tr = pblist.find('tr#upload-' + 1),
                            tds = tr.children();
                        tds.eq(2).html('<span span style="color: #5FB878;">上传成功</span>');
                        tds.eq(3).html('');
                        console.log(data.fileIds[0])
                        $.ajax({
                            type:'POST',
                            url: httpBaseUrl + '/views/saveSchoolPhoto',
                            data: {fileid: data.fileIds[0]},
                            success: function (result) {

                            }
                        })

                    },
                    uploadFail: function (reason) {
                        alert("上传失败:" + reason);

                        var tr = pblist.find('tr#upload-' + 1),
                            tds = tr.children();
                        tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
                        tds.eq(3).find('.demo-reload').removeClass('layui-hide');
                    },
                });
            },
            fail: function (reason) {
                alert("获取目录id失败:" + reason);
            },
        });
    })

});