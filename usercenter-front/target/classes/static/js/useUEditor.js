$('.editor').each(function () {
    var thisId=$(this).attr('id');
    var ue = UE.getEditor(thisId, {
        toolbars: [
            [
                'fontfamily', //字体
                'fontsize', //字号
                'undo', //撤销
                'redo', //重做
                'forecolor', //字体颜色
                'backcolor', //背景色
                'background', //背景
                'bold', //加粗
                'italic', //斜体
                'underline', //下划线
                'strikethrough', //删除线
                'fontborder', //字符边框
                '|',
                'paragraph',
                'emotion', //表情
                'superscript', //上标
                'subscript', //下标
                'spechars', //特殊字符
                'customstyle', //自定义标题
                '|',
                'justifyleft', //居左对齐
                'justifycenter', //居中对齐
                'justifyright', //居右对齐
                'directionalityltr', //从左向右输入
                'directionalityrtl', //从右向左输入
                'rowspacingtop', //段前距
                'rowspacingbottom', //段后距
                'lineheight', //行间距
                '|',
                'link', //超链接
                'unlink', //取消链接
                'inserttable',//表格
                'simpleupload', //单图上传
                'insertimage', //多图上传
                // 'insertvideo', //视频
                'insertframe', //插入ifream
                'attachment', //上传附件
                '|',
                'imagenone', //默认
                'imageleft', //左浮动
                'imagecenter', //居中
                'imageright', //右浮动
                'insertorderedlist', //有序列表
                'insertunorderedlist', //无序列表
                '|',
                // 'wordimage', //图片转存
                'removeformat', //清除格式
                'formatmatch', //格式刷
                'autotypeset',//自动排版
                // 'source', //源代码
                '|',
                'print', //打印
                'preview', //预览
                'horizontal', //分隔线
                'time', //时间
                'date', //日期
                'fullscreen', //全屏

            ]
        ]
    });
})
