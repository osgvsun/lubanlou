function getValue(obj){
    systemSelect(obj)
}
layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate'], function () {
    var admin = layui.admin,
        laypage = layui.laypage,
        layer = layui.layer,
        table = layui.table,
        $ = layui.jquery,
        element = layui.element,
        form = layui.form,
        laydate = layui.laydate

    form.render(null, 'newlabbox');

    window.systemSelect = function (valueId){
        let option = `<option value="${valueId[0]}" selected>${valueId[1]}</option>` ;
        $("select[name='systemRoom']").append(option)
        form.render();
    }

    //时间
    laydate.render({
        elem: '#date',
        type: 'date'
    });

    //监听提交：保持实验室分室
    form.on('submit(newlabbtn)', function (data) {
        var field = data.field; //获取提交的字段
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引

        let acno = null;
        let type = 1;
        let labRoomDTO = {
            labRoomNumber: field.number,
            labRoomName: field.name,
            labRoomEnName: field.englishname,
            labCenter: field.core,
            labAnnex: field.lab,
            buildNumber: field.building,
            campusNumber: field.campus,
            floorNo: field.floor,
            labRoomArea: field.area,
            cdictionaryByLabRoom: field.cdictionaryByLabRoom,
            isOpen: field.isOpen,
            systemRoom: field.systemRoom,
            labRoomNature: field.labRoomNature,
            //基础设置结束
            labBase: field.base,
            cdictionaryByLabRoomClassification: field.category,
            labRoomTimeCreate: field.date,
            labRoomCapacity: field.capacity,
            cdictionaryByLabRoomSort: field.sort,
            cdictionaryByIsMultimedia: field.media,
            labRoomSubject: field.lesson,
            isSchoolEnterpriseCooperation: field.construction,
            isRoductivity: field.productivelab,
            isSimulation: field.simulationlab,
            labAddressDetail: field.detailAddress,
            labRoomIntroduction: field.describe,
            labRoomRegulations: field.rule,
            labRoomAttentions: field.attention,
            labRoomPrizeInformation: field.award
        }
        //提交 Ajax 成功后，关闭当前弹层并重载表格
        $.ajax({
            url: labRoomHost + `/api/labroom/saveLabRoom?acno=${acno}&type=${type}`,
            type: "POST",
            data: JSON.stringify(labRoomDTO),
            dataType: "JSON",
            contentType: "application/json;charset=UTF-8",
            success: function (res) {
                if (res.msg == "success") {
                    layer.msg("新建实验室成功！", {icon: 1})
                    // 处理data里的字段不同的数据
                    setTimeout(function () {
                        parent.layer.close(index); //再执行关闭
                    }, 1000)
                } else {
                    layer.msg("新建实验室失败！", {icon: 2})
                }
            }, error: function (e) {
                layer.msg('新建实验室失败！', {icon: 2});
            }
        })

    });

 // 新增所属房间
    $('.addSystemRoom').on('click', function (){
        var index = layer.open({
            type: 2 //此处以iframe举例
            ,
            title: '添加所属房间',
            area: ['100%', '100%'],
            shade: 0.5,
            maxmin: true,
            content: 'addSystemRoom',
            zIndex: layer.zIndex //重点1
            ,
            success: function (layero) {
                layer.setTop(layero); //重点2
            }
        });
    })
});
