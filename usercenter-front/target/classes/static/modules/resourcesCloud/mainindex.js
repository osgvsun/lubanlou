layui.use(['laypage', 'layer', 'table', 'element'], function () {
    var admin = layui.admin,
        laypage = layui.laypage, //分页
        layer = layui.layer,//弹层
        table = layui.table, //表格
        $ = layui.jquery,
        element = layui.element //元素操作

    //向世界问个好
    //layer.msg('');

    //打开切换用户权限
    var switchpermissions = {
        switchpermissions: function () {
            //layer.msg('切换用户权限');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2, //此处以iframe举例
                title: '切换用户权限',
                area: ['500px', '240px'],
                shade: 0.5,
                maxmin: true,
                content: 'switchPermissions',
                zIndex: layer.zIndex, //重点1
                move: false,
                success: function (layero) {
                    layer.setTop(layero); //重点2
                },
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#switchpermissionsbtn");
                    submit.click();
                }
            });
            //layer.full(index);
        }
    };
    $('.switchpermissions').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        switchpermissions[method] ? switchpermissions[method].call(this, othis) : '';
    });

    //打开上传
    var uploadfiles = {
        uploadfiles: function () {
            //layer.msg('');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2,//此处以iframe举例
                title: '上传文件到当前目录',
                area: ['500px', '385px'],
                shade: 0.5,
                maxmin: true,
                content: 'uploadFiles'
            });
            //layer.full(index);
        }
    };
    $('.uploadfiles').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        uploadfiles[method] ? uploadfiles[method].call(this, othis) : '';
    });

    //打开下载
    var downloadfiles = {
        downloadfiles: function () {
            /*//layer.msg('');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2, //此处以iframe举例
                title: '下载',
                area: ['500px', '165px'],
                shade: 0.5,
                maxmin: true,
                content: 'downloadFiles',
                zIndex: layer.zIndex,//重点1
                success: function (layero) {
                    layer.setTop(layero); //重点2
                },
                move: false,
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#downloadfilesbtn");
                    submit.click();
                }
            });
            //layer.full(index);*/
            //如果选中了文件就下载，判断多个都是文件才下载，负责判断为请选择文件或请勿选择文件夹

        }
    };
    $('.downloadfiles').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        downloadfiles[method] ? downloadfiles[method].call(this, othis) : '';
    });

    //打开创建分享
    var sharewithvarious = {
        sharewithvarious: function () {
            //layer.msg('');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2,//此处以iframe举例
                title: '创建分享',
                area: ['508px', '500px'],
                shade: 0.5,
                maxmin: true,
                content: 'shareWithVarious',
                zIndex: layer.zIndex, //重点1
                move: false,
                success: function (layero) {
                    layer.setTop(layero); //重点2
                },
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#sharewithvariousbtn");
                    submit.click();
                }
            });
            //layer.full(index);
        }
    };
    $('.sharewithvarious').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        sharewithvarious[method] ? sharewithvarious[method].call(this, othis) : '';
    });

    //打开链接分享
    var sharelink = {
        sharelink: function () {
            //layer.msg('');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2,//此处以iframe举例
                title: '链接分享',
                area: ['508px', '296px'],
                shade: 0.5,
                maxmin: true,
                move: false,
                content: 'shareLink'
            });
            //layer.full(index);
        }
    };
    $('.sharelink').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        sharelink[method] ? sharelink[method].call(this, othis) : '';
    });

    //打开二维码分享
    var shareqrcode = {
        shareqrcode: function () {
            //layer.msg('');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2,//此处以iframe举例
                title: '二维码分享',
                area: ['508px', '426px'],
                shade: 0.5,
                maxmin: true,
                move: false,
                content: 'shareQrcode'
            });
            //layer.full(index);
        }
    };
    $('.shareqrcode').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        shareqrcode[method] ? shareqrcode[method].call(this, othis) : '';
    });

    //打开预览
    var previewfiles = {
        previewfiles: function () {
            //layer.msg('');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2,//此处以iframe举例
                title: '预览',
                area: ['500px', '165px'],
                shade: 0.5,
                maxmin: true,
                move: false,
                content: 'previewFiles?url=1'
            });
            layer.full(index);
        }
    };
    $('.previewfiles').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        previewfiles[method] ? previewfiles[method].call(this, othis) : '';
    });

    //打开编辑
    var editfiles = {
        editfiles: function () {
            //layer.msg('');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2,//此处以iframe举例
                title: '编辑',
                area: ['500px', '165px'],
                shade: 0.5,
                maxmin: true,
                content: 'editFiles',
                zIndex: layer.zIndex, //重点1
                move: false,
                success: function (layero) {
                    layer.setTop(layero); //重点2
                },
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#editfilesbtn");
                    submit.click();
                }
            });
            //layer.full(index);
        }
    };
    $('.editfiles').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        editfiles[method] ? editfiles[method].call(this, othis) : '';
    });

    //打开删除
    var deletefiles = {
        deletefiles: function () {
            /*//layer.msg('');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2, //此处以iframe举例
                title: '删除',
                area: ['500px', '148px'],
                shade: 0.5,
                maxmin: true,
                content: 'deleteFiles',
                zIndex: layer.zIndex, //重点1
                move: false,
                success: function (layero) {
                    layer.setTop(layero); //重点2
                },
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#deletefilesbtn");
                    submit.click();
                }
            });
            //layer.full(index);*/
        }
    };
    $('.deletefiles').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        deletefiles[method] ? deletefiles[method].call(this, othis) : '';
    });

    //打开复制
    var copyfiles = {
        copyfiles: function () {
            //layer.msg('');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2,//此处以iframe举例
                title: '复制选中文档到文件夹',
                area: ['500px', '385px'],
                shade: 0.5,
                maxmin: true,
                content: 'copyFiles',
                zIndex: layer.zIndex, //重点1
                success: function (layero) {
                    layer.setTop(layero); //重点2
                },
                move: false,
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#copyfilesbtn");
                    submit.click();
                }
            });
            //layer.full(index);
        }
    };
    $('.copyfiles').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        copyfiles[method] ? copyfiles[method].call(this, othis) : '';
    });

    //打开移动
    var movefiles = {
        movefiles: function () {
            //layer.msg('');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2,//此处以iframe举例
                title: '移动选中文档到文件夹',
                area: ['500px', '385px'],
                shade: 0.5,
                maxmin: true,
                content: 'moveFiles',
                zIndex: layer.zIndex, //重点1
                move: false,
                success: function (layero) {
                    layer.setTop(layero); //重点2
                },
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#movefilesbtn");
                    submit.click();
                }
            });
            //layer.full(index);
        }
    };
    $('.movefiles').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        movefiles[method] ? movefiles[method].call(this, othis) : '';
    });

    //打开新建文件夹
    var newfolder = {
        newfolder: function () {
            //layer.msg('');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2,//此处以iframe举例
                title: '在当前目录下新建文件夹',
                area: ['500px', '165px'],
                shade: 0.5,
                maxmin: true,
                content: 'newFolder',
                zIndex: layer.zIndex, //重点1
                move: false,
                success: function (layero) {
                    layer.setTop(layero); //重点2
                },
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#newfolderbtn");
                    submit.click();
                }
            });
            //layer.full(index);
        }
    };
    $('.newfolder').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        newfolder[method] ? newfolder[method].call(this, othis) : '';
    });

    //刷新按钮
    var refresh = {
        refresh: function () {
            let folderType = sessionStorage.getItem("folderType")
            sessionStorage.clear();
            sessionStorage.setItem("folderType", folderType)
            $(".page_content_catalog label:last>a").click();
        }
    };
    $('.refresh').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        refresh[method] ? refresh[method].call(this, othis) : '';
    });

    //列表
    var listMode = {
        listMode: function () {
            layer.msg("暂未开发，请给工程师一点时间")
        }
    };
    $('.listMode').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        listMode[method] ? listMode[method].call(this, othis) : '';
    });

    //缩略图
    var thumbnailMode = {
        thumbnailMode: function () {
            layer.msg("暂未开发，请给工程师一点时间")
        }
    };
    $('.thumbnailMode').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        thumbnailMode[method] ? thumbnailMode[method].call(this, othis) : '';
    });

    //关闭所有窗口
    $(document).keydown(function (e) {
        if (e.which === 27) {
            layer.closeAll();
        }
    });
    //右键禁止
    $(document).contextmenu(function (e) {
        e.preventDefault()
    })
    $(document).click(function (e) {
        //右键menu hide
        window.frames['i'].$(".content_box>.user_detail").hide();
    })
});