layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate'], function () {
    var admin = layui.admin,
        laypage = layui.laypage,
        layer = layui.layer,
        table = layui.table,
        $ = layui.jquery,
        element = layui.element,
        form = layui.form,
        laydate = layui.laydate

    //向世界问个好
    //layer.msg('');

    form.render(null, 'previewfilesbox');

    //监听提交
    form.on('submit(previewfilesbtn)', function (data) {
        var field = data.field; //获取提交的字段
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引

        //提交 Ajax 成功后，关闭当前弹层并重载表格
        //$.ajax({});
        parent.layui.table.reload('previewfilesbox'); //重载表格
        parent.layer.close(index); //再执行关闭
    });

    //信息
    form.val('previewfilesbox', {
        "": "" //备用
    });

    //esc关闭预览（当焦点在预览窗口时
    $(document).keydown(function (e) {
        if (e.which === 27) {
            let index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
            parent.layer.close(index);
        }
    });

    // 浏览器窗口变化时 预览窗口也变化;
    $(parent.window).resize(function () {
        let index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        parent.layer.full(index);
    });

    //判断为图片
    if (fileSuffix.image.includes(fileType)) {
        setPreviewSrc(fileUrl, "img")
    } else if (fileSuffix.video.includes(fileType)) {
        //为视频
        setPreviewSrc(fileUrl, "video")
    } else if (fileSuffix.office.includes(fileType)) {
        //为微软办公软件
        let officeUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(fileUrl.toString())}`;
        setPreviewSrc(officeUrl)
    } else {
        //具体格式的文件
        switch (fileType) {
            case "pdf":
                setPreviewSrc(fileUrl)
                break;
            default:
                //测试这个文件能否用iframe打开
                setPreviewSrc(fileUrl)
                break;
        }
    }

    //设置文件预览并展示
    function setPreviewSrc(url, type = "iframe", src = "src") {
        $(`#previewfilesbox>*[data-preview-type=${type}]`).attr(src, url).show();
    }
});