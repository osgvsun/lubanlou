$(document).ready(function () {
    $("#currYear").text(localStorage.getItem("currYear"));
    tableRender();
});

//列表查询方法
function tableRender() {
    let search = $('#search').val();
    layui.use(['table'], function () {
        let table = layui.table;
        table.render({
            elem: '#lay_table_school_device',
            method: 'get',
            url: datashareHost + "getSchoolDeviceList",
            where: {
                search: search
            },
            page: true,
            size: 'sm',
            even: true,
            toolbar: '#schoolDevice_toolbar', //开启工具栏
            parseData: function(res){ //res 即为原始返回的数据
                console.log(res);
                var pdata = {
                    "code": 0, //解析接口状态
                    "msg": "", //解析提示文本
                    "count": res.data.length, //解析数据长度
                    "data": [] //解析数据列表
                };
                $.each(res.data,function(key, value){
                    let recourd = new Object();
                    recourd['deviceNumber'] = value.deviceNumber;
                    recourd['deviceName'] = value.deviceName;
                    recourd['deviceEnName'] = value.deviceEnName;
                    recourd['devicePattern'] = value.devicePattern;
                    recourd['deviceFormat'] = value.deviceFormat;
                    recourd['deviceUseDirection'] = value.deviceUseDirection;
                    recourd['deviceBuyDate'] = value.deviceBuyDate;
                    recourd['deviceAddress'] = value.deviceAddress;
                    recourd['deviceCountry'] = value.deviceCountry;
                    recourd['devicePrice'] = value.devicePrice;
                    recourd['deviceAccountedDate'] = value.deviceAccountedDate;
                    recourd['deviceSupplier'] = value.deviceSupplier;
                    recourd['departmentNumber'] = value.departmentNumber;
                    recourd['userNumber'] = value.userNumber;
                    recourd['keepUser'] = value.keepUser;
                    if (value.schoolDeviceExpand!=undefined){
                        recourd['warrantyTime'] = value.schoolDeviceExpand.warrantyTime;
                        recourd['serviceUser'] = value.schoolDeviceExpand.serviceUser;
                        recourd['servicePhone'] = value.schoolDeviceExpand.servicePhone;
                        recourd['deviceType'] = value.schoolDeviceExpand.deviceType;
                    }
                    pdata.data.push(recourd);
                })

                return pdata;
            },
            cols: [[
                {type: 'checkbox', fixed: 'left'},
                {
                    title: '序号',
                    type: 'numbers'
                }, {
                    field: 'deviceNumber',
                    title: '设备编号'
                }, {
                    field: 'deviceName',
                    title: '设备名称',
                    edit: 'text'
                }, {
                    field: 'deviceEnName',
                    title: '设备英文名',
                    edit: 'text'
                }, {
                    field: 'devicePattern',
                    title: '设备型号',
                    edit: 'text'
                }, {
                    field: 'deviceFormat',
                    title: '设备规格',
                    edit: 'text'
                }, {
                    field: 'deviceUseDirection',
                    title: '设备使用方向',
                    edit: 'text'
                }, {
                    field: 'deviceBuyDate',
                    title: '设备购买日期',
                    edit: 'text'
                }, {
                    field: 'deviceAddress',
                    title: '设备存放地点',
                    edit: 'text'
                }, {
                    field: 'deviceCountry',
                    title: '国别',
                    edit: 'text'
                }, {
                    field: 'devicePrice',
                    title: '设备价格',
                    edit: 'text'
                }, {
                    field: 'deviceAccountedDate',
                    title: '设备入账日期',
                    edit: 'text'
                }, {
                    field: 'deviceSupplier',
                    title: '设备供应商',
                    edit: 'text'
                }, {
                    field: 'departmentNumber',
                    title: '学院/部门编号',
                    edit: 'text'
                }, {
                    field: 'userNumber',
                    title: '设备领用人学工号',
                    edit: 'text'
                }, {
                    field: 'keepUser',
                    title: '设备保养者学工号',
                    edit: 'text'
                }, {
                    field: 'warrantyTime',
                    title: '保修期',
                    edit: 'text'
                }, {
                    field: 'serviceUser',
                    title: '售后联系人姓名',
                    edit: 'text'
                }, {
                    field: 'servicePhone',
                    title: '售后联系人的联系方式',
                    edit: 'text'
                }, {
                    field: 'deviceType',
                    title: '设备类别(0:设备 1:家具)',
                    edit: 'text'
                }
            ]]
        });

        //监听头工具栏事件
        table.on('toolbar(lay_table_school_device)', function (obj) {
            var checkStatus = table.checkStatus(obj.config.id)
                , data = checkStatus.data; //获取选中的数据
            switch (obj.event) {
                case 'update':
                    if (data.length === 0) {
                        layer.msg('请选择一行');
                    } else if (data.length > 1) {
                        layer.msg('只能同时编辑一个');
                    } else {
                        var updateData = data[0];
                        let schoolDeviceExpand = new Object();
                        schoolDeviceExpand['warrantyTime'] = data[0].warrantyTime;
                        schoolDeviceExpand['serviceUser'] = data[0].serviceUser;
                        schoolDeviceExpand['servicePhone'] = data[0].servicePhone;
                        schoolDeviceExpand['deviceType'] = data[0].deviceType;
                        updateData['schoolDeviceExpand'] = schoolDeviceExpand;
                        layer.confirm('真的要修改吗', function (index) {
                            $.ajax({
                                url: datashareHost + "shared/updateSchoolDevice",
                                type: "post",
                                contentType: "application/json",
                                dataType: "json",
                                data: JSON.stringify(updateData),
                                success: function (res) {
                                    layui.layer.alert(res.msg);
                                    table.reload("lay_table_school_device");
                                },
                                error: function () {
                                    layui.layer.alert("请求超时");
                                }
                            })
                        })
                    }
                    break;
                case 'delete':
                    if (data.length === 0) {
                        layui.layer.alert('请选择一行');
                    } else {
                        layer.confirm('真的要删除吗', function (index) {
                            $.ajax({
                                url: datashareHost + "shared/deleteSchoolDevice",
                                type: "post",
                                contentType: "application/json",
                                dataType: "json",
                                data: JSON.stringify(data),
                                success: function (res) {
                                    layui.layer.alert(res.msg);
                                    table.reload("lay_table_school_device");
                                },
                                error: function () {
                                    layui.layer.alert("请求超时");
                                }
                            })
                        })
                    }
                    break;
            }
            ;
        });
    });
}

//取消查询
function cancelSearch() {
    $('#search').val("");
    tableRender();
}

layui.use('upload', function () {
    let upload = layui.upload;
    var layer = layui.layer;
    function loading(msg){
        msgindex = layer.msg(msg, {
            icon:16,
            shade:[0.1, '#fff'],
            time:false,  //不自动关闭
            offsetqiuchuy:"100px"
        })
    }
    upload.render({
        elem: '#importSchoolDevice',
        url: datashareHost + 'shared/uploadSchoolDeviceByExcel',
        accept: 'file',
        exts: 'xlsx',
        before: function (res) {
            loading("数据导入中,请耐心等待......");
        },
        done: function (res) {
            if (res.code === 0){
                layer.confirm(res.msg, {
                    btn : [ '确定']//按钮
                }, function() {
                    location.reload();
                })
            }else {
                layui.layer.alert(res.msg);
            }
        },
        error: function () {
            layui.layer.msg("访问超时");
        }
    });
});
