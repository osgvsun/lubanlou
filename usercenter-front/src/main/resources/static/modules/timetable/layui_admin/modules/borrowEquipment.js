layui.use(['form', 'laypage', 'laydate', 'layer', 'table', 'element', 'formSelects', 'deviceBatchGlobal'], function () {
    var $ = layui.$,
        element = layui.element,
        layer = layui.layer,
        form = layui.form,
        laydate = layui.laydate,
        laypage = layui.laypage,
        table = layui.table,
        formSelects = layui.formSelects,
        deviceGlobal = layui.deviceBatchGlobal;

    function FormSelectComponent(elId, urlP) {
        this.elId = elId;
        this.url = urlP;
        this.selectData = [];
        this.init = function () {
            formSelects.config(this.elId, {
                beforeSuccess: function (id, url, searchVal, result) {
                    //我要把数据外层的code, msg, data去掉
                    result = result.data;
                    //我要转换数据
                    var result1 = [];
                    result.forEach(function (item) {
                        result1.push({name: item.name, value: item.id});
                    });
                    //然后返回数据
                    return result1;
                }
            }).data(this.elId, 'server', {
                url: this.url
            });
        };
        this.init()
    }

    //table初始化
    function TableComponent(elId) {
        this.elId = elId;
        this.cols = [
            [ //表头
                {
                    fixed: 'left',
                    title: '序号',
                    type: 'numbers'
                },
                {
                    field: 'name',
                    title: '设备名称(设备编号)',
                    width: 160,
                    sort: true,
                    templet: '<div>{{ d.name }}({{ d.number }})</div>'
                },
                /*{
                    field: 'number',
                    title: '设备编号',
                    sort: true
                },*/
                {
                    field: 'state',
                    title: '设备状态',
                    sort: true
                }, {
                field: 'model',
                title: '规格型号',
                sort: true
            }, {
                field: 'brand',
                title: '品牌',
                sort: true
            }, {
                field: 'price',
                title: '价格',
                sort: true
            }, {
                field: 'labroom',
                title: '实验室',
                sort: true
            }, {
                field: 'administrator',
                title: '设备管理员(工号)',
                width: 145,
                sort: true,
                templet: '<div>{{ d.administrator }}({{ d.jobnumber }})</div>'
            },
                /*{
                    field: 'jobnumber',
                    title: '工号',
                    sort: true
                }, */
                {
                    field: 'opentype',
                    title: '开放类型',
                    sort: true
                },
                // {
                //     fixed: 'right',
                //     title: '操作',
                //     width: 120,
                //     align: 'center',
                //     toolbar: '#operation'
                // }
            ]
        ];
        this.data = [];
        this.update = function (dataP) {
            this.data = dataP;
            this.render();
        };
        this.render = function () {
            table.render({
                elem: this.elId,
                title: '已选设备',
                page: deviceGlobal.renderPage,
                cols: this.cols,
                data: this.data,
                skin: 'line', //表格风格
                even: true,
                id: this.elId
            });
        };
        this.init = function () {
            this.render();
        }
    }

    var tableComponent = new TableComponent("#selectedlist");
    tableComponent.init();
    var formSelectComponent = new FormSelectComponent('addBorrowequipment', layui.setter.base + '../device/findAcademyGroupDevices?page=1&limit=5000');

    var addComponent = new deviceGlobal.AddBtnComponent("#addBorrowDevice", layui.setter.base + '../device/findSelectDevices', formSelectComponent, tableComponent);
    addComponent.init();

    var IS_ACTIVE = 621, NOT_ACTIVE = 622;

    function get62xData(val) {
        return val === "1" ? IS_ACTIVE : NOT_ACTIVE;
    }

    var needLoan1 = -1;//是否允许出借
    var needLendAudit1 = -1; //借用是否需要审核
    var realAllLendAudits = [];

    function getRealAllLendAuditsData() {
        return needLendAudit1 === IS_ACTIVE ? realAllLendAudits : realAllLendAudits.map(function (value) {
            return "0";
        });
    }

    needAllLendAudits.forEach(function (item, key) {
        realAllLendAudits[key] = "0";
        form.on('radio(' + item + ')', function (data) {
            realAllLendAudits[key] = data.value + "";
        });
    });
    //允许借用
    form.on('radio(allowborrow)', function (data) {
        needLoan1 = get62xData(data.value);
    });
    //借用需要审核
    form.on('radio(needexamine)', function (data) {
        needLendAudit1 = get62xData(data.value);
        var $needExamineChild = $(".need_examine_child")
        data.value === "1" ? $needExamineChild.show() : $needExamineChild.hide();
    });

    function formCheck(devicesData) {
        var allowBorrowElems = document.querySelectorAll('input[name=allowborrow]');
        var isAllowBorrow = allowBorrowElems[0].checked;
        var notAllowBorrow = allowBorrowElems[1].checked;
        if (isAllowBorrow) {
            var needExamElems = document.querySelectorAll('input[name=needexamine]');
            var isNeedExam = needExamElems[0].checked;
            var notNeedExam = needExamElems[1].checked;
            if (!isNeedExam && !notNeedExam) {
                alert("请选择是否需要审核");
                return false;
            }
        } else if (!notAllowBorrow) {
            alert("请选择是否允许借用");
            return false;
        }
        if (!(Array.isArray(devicesData) && devicesData.length > 0)) {
            alert("请选择并添加设备");
            return false;
        }
        return true;
    }

    document.querySelector("#saveSelectedDevices").addEventListener("click", saveData);

    function saveData(evt) {
        var selectedDeviceData = tableComponent.data.map(function (item) {
            return item.id;
        });
        if (!formCheck(selectedDeviceData)) {
            return;
        }
        $.ajax({
            url: layui.setter.base + '../device/batchInstallDeviceLending',
            data: {
                data: selectedDeviceData,
                needLoan1: needLoan1,
                needLendAudit1: needLendAudit1,
                realAllLendAudits: getRealAllLendAuditsData()
            },
            async: false,
            method: "POST",
            traditional: true,
            success: deviceGlobal.saveSuccessCallback,
            error: function (errData, msg) {
                alert("保存异常:" + msg);
            }
        })
    }
});