layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate'], function () {
    var admin = layui.admin,
        laypage = layui.laypage,
        layer = layui.layer,
        table = layui.table,
        $ = layui.jquery,
        element = layui.element,
        form = layui.form,
        laydate = layui.laydate

    var currentauth = cookie.get('currauth'); //存储当前权限
    var statusCenter = cookie.get('status'); // 判断从哪一个入口来源

    form.render(null, 'editmodularbox');

    //监听提交
    form.on('submit(editmodularbtn)', function (data) {
        var field = data.field; //获取提交的字段
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引

        //提交 Ajax 成功后，关闭当前弹层并重载表格
        //$.ajax({});
        parent.layui.table.reload('editmodularbox'); //重载表格
        parent.layer.close(index); //再执行关闭
    });

    labDetailInit();

    function labDetailInit() {
        let labDetailLoadIndex = layer.load(2);
        $.ajax({
            url: labRoomHost + "/api/labroom/getLabRoomById",
            type: "GET",
            data: {labRoomId: getQueryVariableWithZhongWen("labRoomId")},
            success: function (res) {
                layer.close(labDetailLoadIndex)
                $("#labDetailTitle").text(res.labRoomName);
                //信息
                form.val('labdetailbox', {
                    "name": res.labRoomName, //
                    "englishname": res.labRoomEnName, //
                    "address": res.labAddressDetail, //
                    "floor": res.floorNo, //
                    "area": res.labRoomArea, //
                    "capacity": res.labRoomCapacity, //
                    "number": res.labRoomNumber, //
                    "appointment": res.labRoomReservation == 1 ? '是' : "否", //
                    "isOpen": res.isOpen == 1 ? '是' : '否', //
                    "rule": res.labRoomRegulations, //
                    "describe": res.labRoomIntroduction, //
                    "attention": res.labRoomAttentions, //
                    "award": res.labRoomPrizeInformation, //
                    "core": res.labCenterDTO.centerName, //
                    "lab": res.labAnnexDTO.labName, //
                    "campus": res.systemCampusDTO.campusName, //
                    "building": res.systemBuildDTO.buildName, //
                    "base": res.labBaseName, //
                    "date": res.labRoomTimeCreate, //
                    "lesson": res.labRoomSubjectName, //
                    "construction": res.isSchoolEnterpriseCooperation == 1 ? "是" : "否",
                    "productivelab": res.isRoductivity == 1 ? "是" : "否",
                    "simulationlab": res.isSimulation == 1 ? "是" : "否",
                    "category":res.labRoomClassification,
                    "sort":res.labRoomSort,
                    "media":res.isMultimedia,
                    "systemRoom": res.systemRoomName + '(' + res.systemRoom + ')',
                    "cdictionaryByLabRoom": res.cdictionaryByLabRoomName,
                    "labRoomNature": res.labRoomNatureName
                });
            }, error: function () {
                layer.close(labDetailLoadIndex)
                layer.msg("请求实验室信息失败", {icon: 2})
            }
        })
    }

    //打开编辑实验室
    var editlab = {
        editlab: function () {
            layer.msg('编辑实验室');
            var that = this;
            //多窗口模式，层叠置顶
            var index = layer.open({
                type: 2, //此处以iframe举例
                title: '编辑实验室',
                area: ['500px', '490px'],
                shade: 0.5,
                maxmin: true,
                content: 'editLab?labRoomId=' + labRoomId,
                zIndex: layer.zIndex //重点1
                ,
                success: function (layero) {
                    layer.setTop(layero); //重点2
                },
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#editlabbtn");
                    submit.click();
                    setTimeout(function () {
                        // 编辑提交后刷新详情；
                        labDetailInit();
                    }, 500)
                }
            });
            layer.full(index);
        }
    };
    $('.editlab').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        editlab[method] ? editlab[method].call(this, othis) : '';
    });

    //根据当前权限显示界面
    $(function () {
        if ((currentauth !== 'LABMANAGER' && currentauth !== 'EXCENTERDIRECTOR' && currentauth !== 'ACADEMYLEVELM' && currentauth !== 'SUPERADMIN') || statusCenter === 'center' || cookie.get('allstatus') == 1) {
            $('.editlab').remove();
        } else {
            $('.editlab').show();
        }
    })

});