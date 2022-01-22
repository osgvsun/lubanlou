var zuulUrl = $("#zuulServerUrl").val() + "/timetable/";
layui.use(['index', 'form', 'laydate', 'upload', 'laypage', 'layer', 'table', 'element', 'formSelects'], function () {
    var $ = layui.$,
        admin = layui.admin,
        element = layui.element,
        layer = layui.layer,
        laydate = layui.laydate,
        form = layui.form,
        upload = layui.upload,
        laypage = layui.laypage,
        table = layui.table;
    formSelects = layui.formSelects;

    //向世界问个好
    //layer.msg('开始设备快速保养');

    form.render(null, 'newformbox');
    formSelects.render("affiliationAcademySelect");

    //获取下拉框的数据;
    $.ajax({
        url: zuulUrl + "api/common/select/apiCommonSelectBySelect",
        type: "POST",
        data: JSON.stringify({
            type: "schoolAcademyList",
            search: "",
        }),
        dataType: "JSON",
        async: false,
        contentType: "application/json;charset=utf-8",
        success: function (res) {
            // 所属学院和下属学院;
            let arr = [];
            let str = `<option value="">请选择</option>`
            for (let i = 0; i < res.results.length; i++) {
                str += `<option value="${res.results[i]['id']}">${res.results[i]['text']}</option>`
                arr.push({
                    value: res.results[i]['id'],
                    name: res.results[i]['text'],
                })
            }
            $(`select[name=academyNumber]`).html("");
            $(`select[name=academyNumber]`).append(str);
            form.render('select', null);
            //多选框
            formSelects.data('affiliationAcademySelect', 'local', {
                arr: arr
            });
        }, error: function (e) {
            layer.alert("获取学院信息失败");
        }
    })

    let affiliationNumber = $("#affiliationNumber").val();
    // 存在就是修改
    if (affiliationNumber) {
        $.ajax({
            url: zuulUrl + "api/school/listSchoolAffiliation",
            type: "POST",
            data: {
                affiliationNumber: affiliationNumber
            },
            dataType: "json",
            success: function (data) {
                form.val('newformbox', {
                    "affiliationNumber": data[0]['affiliationNumber'],
                    "name": data[0]['name'],
                    "academyNumber": data[0]['academyNumber'],
                });
                $("input[name=affiliationNumber]").addClass("layui-disabled").attr("readonly", "readonly")
                //下属学院
                if (data[0]['affiliationAcademy']) {
                    let arr = []
                    for (let i of data[0]['affiliationAcademy']) {
                        arr.push(i['academyNumber'])
                    }
                    formSelects.value('affiliationAcademySelect', arr, true);
                }
            }
        })
    }

    //监听提交
    form.on('submit(affiliationBtn)', function (data) {
        var field = data.field; //获取提交的字段
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        //处理多选的数据
        let affiliationAcademyData = []
        let formSelected = formSelects.value('affiliationAcademySelect');
        for (let i in formSelected) {
            affiliationAcademyData.push({
                "academyNumber": formSelected[i]['value'],
                "academyName": formSelected[i]['name']
            })
        }
        //提交 Ajax 成功后，关闭当前弹层并重载表格
        $.ajax({
            url: zuulUrl + "api/school/saveSchoolAffiliation",
            type: "POST",
            data: JSON.stringify({
                "affiliationNumber": field.affiliationNumber,
                "academyNumber": field.academyNumber,
                "name": field.name,
                "createdBy": $("#currentUsername").val(),
                "affiliationAcademy": affiliationAcademyData
            }),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                top.layer.alert("保存成功")
                parent.layui.table.reload('listSchoolAffiliation'); //重载表格
                parent.layer.close(index); //再执行关闭
            }, error: function () {
                top.layer.alert("保存失败")
            }
        });
    });

});