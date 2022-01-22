layui.use(['form', 'element', 'laydate', 'laypage', 'table', 'layer', 'formSelects', 'util', 'layedit', 'upload'], function () {
    var $ = layui.jquery,
        admin = layui.admin,
        form = layui.form,
        element = layui.element,
        laydate = layui.laydate,
        laypage = layui.laypage,
        table = layui.table,
        layer = layui.layer,
        formSelects = layui.formSelects,
        util = layui.util,
        upload = layui.upload,
        layedit = layui.layedit;


    form.render(null, 'equipmentReservebox');

    //实验室名字显示
    if (cookie.get("labRoomName")) {
        $("legend>span").text(cookie.get("labRoomName"));
    }
    //实验室面积、容量、管理员
    if (cookie.get("labRoomArea")) {
        $(".li_cell_box>.li_cell:eq(0)").append('面积: - ' + cookie.get("labRoomArea") + '㎡')
    }
    if (cookie.get("labRoomCapacity")) {
        $(".li_cell_box>.li_cell:eq(1)").append('容量: - ' + cookie.get("labRoomCapacity") + '人')
    }
    if (cookie.get("admins")) {
        $(".li_cell_box>.li_cell:eq(2)").append('管理员: - ' + cookie.get("admins"))
    }
    //监听提交
    form.on('submit(equipmentReservebtn)', function (data) {
        let field = data.field; //获取提交的字段
        // 验证
        let attrName = false;
        if (!field.appointmentType) {
            attrName = "预约类型"
        } else if (!field.openScope) {
            attrName = "预约接待对象"
        } else if (!field.openObject) {
            attrName = "开放对象"
        } else if (field.openScope == 2 && !field.academyNumbers) {
            attrName = "校内开放学院"
        } else if (!editor.txt.html()) {
            attrName = "注意事项"
        } else if (field.configType == "STA") {
            if (!field.appointmentForm) {
                attrName = "工位预约形式"
            } else if (!field.reservationsNumber) {
                attrName = "可预约工位数"
            }
        }
        if (attrName) {
            layer.msg(`${attrName}不能为空`, {icon: 5, anim: 6})
            return false;
        }
        // 打包
        let params = {
            uid: field.insUid,//实验室id
            configType: field.configType,//当前页面设置类型
            appointmentType: field.appointmentType,//预约类型
            creditScore: field.resvCreditScore,//信誉积分
            openScope: field.openScope,//预约接待对象
            openObject: field.openObject,//开放对象
            academyNumbers: field.openScope == 2 ? formSelects.value('academyNumbers', 'valStr') : null,//校内开放学院，开放对象是校内的时候才有值
            basicAttention: editor.txt.html(),//注意事项
            username: field.username,
            appointmentForm: field.appointmentForm,//工位预约形式，类型是工位才可以选
            reservationsNumber: field.reservationsNumber,//可预约工位数
            laboratoryLayoutImages: cookie.get('laboratoryLayoutImages'),
            laboratoryLayoutImagesPointInfo: window.sessionStorage.getItem('laboratoryLayoutImagesPointInfo'),
        }
        //提交 Ajax 成功后，关闭当前弹层并重载表格
        $.ajax({
            url: deviceHost + "saveAppBasicSettings",
            type: "POST",
            dataType: "JSON",
            data: params,
            success: function (res) {
                layer.msg("保存成功", {icon: 1});
            }
        });
        // parent.layui.table.reload('equipmentReservebox'); //重载表格
        // layer.msg('已保存');
    });

    form.on('radio(openScope)', function (data) {
        var abc = data.value;
        if (abc == "2") {
            $(".collagechoose").show();
        } else {
            $(".collagechoose").hide();
        }
    });

    //校内开放学院
    let schoolData = [];
    $.ajax({
        url: deviceHost + "getSchoolAcademyList",
        dataType: "JSON",
        async: false,
        success: function (res) {
            schoolData = res;
        }
    })
    let result = []
    for (let i of schoolData.data) {
        result.push({
            name: i['academyName'],
            value: i['academyNumber'],
        })
    }
    formSelects.data('academyNumbers', "local", {
        arr: result
    });
    /*}
})*/

    // 注意事项
    const E = window.wangEditor;
    const editor = new E('#note');
    // 编辑器设置菜单项
    editor.config.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        'image',  // 插入图片
        'undo',  // 撤销
        'redo'  // 重复
    ]
    editor.config.uploadImgShowBase64 = true
    editor.create();

    // 初始化表单
    let index = layer.load(2);
    $.ajax({
        url: deviceHost + "getAppBasicSettings",
        data: {
            insUid: $("[name=insUid]").val(),//实验室id
            configType: $("[name=configType]").val(),//当前页面设置类型
        },
        dataType: "JSON",
        success: function (res) {
            let field = res.data;
            if(field.openScope == 2){
                $(".collagechoose").show();
            }
            form.val('equipmentReservebox', {
                appointmentType: field.appointmentType,//预约类型
                resvCreditScore: field.resvCreditScore,//信誉积分
                openScope: field.openScope,//预约接待对象
                openObject: field.openObject,//开放对象
                appointmentForm: field.appointmentForm,//工位预约形式，类型是工位才可以选
                reservationsNumber: field.reservationsNumber,//可预约工位数
            });
            cookie.set('childPoint', field.laboratoryLayoutImagesPointInfo);
            cookie.set('laboratoryLayoutImages', field.laboratoryLayoutImages);
            formSelects.value("academyNumbers", field.academyNumber?.split(","))
            editor.txt.html(field.basicAttention)
        },
        complete: function () {
            layer.close(index)
        }
    });

    resourceContainer.getDirectoryIdByPath({
        path: '开放预约',
        success: function (directoryId) {
            upload.render({
                elem: '#uploadImage'
                // ,url: '' //此处配置你自己的上传接口即可
                ,accept: 'image' //普通文件
                ,data: {
                    fileTags: 'image',//文件类型（image,file,video）
                    siteName: '开放预约',//站点名
                    username: currentUsername, //上传人
                    shareState: "私有",
                    directoryId: directoryId,//目录id
                    width: 1080
                }
                ,done: function(res){
                    layer.msg('上传成功');
                    let fileId = res.fileIds[0];
                    cookie.set('laboratoryLayoutImages', fileId);
                    getImage(fileId)
                }
            });
        },
        fail: function (reason) {
            alert("获取目录id失败:" + reason);
        }, needToken: true
    })
    //上传实验室图片
    $('.uploadImage').on('click', function () {
        $('#uploadImage').click();
    })

    if (cookie.get('laboratoryLayoutImages')){
        getImage(cookie.get('laboratoryLayoutImages'));
    }
    function getImage(fileId) {
        resourceContainer.getFileById({
            fileId: fileId,
            success: function (data) {
                $('.w100block1').attr("src", data.url);
            },
            fail: function (res) {
                console.log("失败" + res)
            },
            needToken: true
        })
    }
    // 获取可视化图片的相对位置
    $('.w100block1').click(function(){
        var index = layer.open({
            type: 2 //此处以iframe举例
            ,
            title: '工位标记',
            area: ['600px', '500px'],
            shade: 0.5,
            maxmin: true,
            content: 'imageTracingPoint',
            zIndex: layer.zIndex //重点1
            ,
            success: function(layero, index) {
                // layer.setTop(layero); //重点2
                let iframe = window['layui-layer-iframe' + index];
            },
            btn: ['确定', '取消'],
            yes: function(index, layero) {
                //点击确认触发 iframe 内容中的按钮提交
                var submit = layero.find('iframe').contents().find("#imagetracingpointbtn");
                submit.click();
            }
        });
        layer.full(index);
    })

});
//传递子页面锚
$(function () {
    $(".field_btn_box a").click(function () {
        var name = $(this).attr("name");
        top.location.hash = name; //设置锚点
    });
    $(".breadcrumb_top .breadcrumb_btn").click(function () {
        var name = $(this).attr("name");
        top.location.hash = name; //设置锚点
    });
});
