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
    }

    //"新增设备"下拉框的初始化
    function basicFormSelectInit(xmId, url) {
        formSelects.config(xmId, {
            beforeSuccess: function (id, url, searchVal, result) {
                var result1 = [];
                result.data.forEach(function (item) {
                    result1.push({name: item.cname, value: item.username});
                });
                //然后返回数据
                return result1;
            }
        }).data(xmId, 'server', {
            url: url
        });
    }

    //添加按钮初始化
    function AddBtnComponent(elId, tableDataUrl, formSelectComponentP, tableComponentP) {
        this.elId = elId;
        this.init = function () {
            document.querySelector(this.elId).addEventListener("click", function (evt) {
                formSelectComponentP.selectedData = formSelects.value(formSelectComponentP.elId).map(function (item) {
                    return item.value;
                });

                $.ajax({
                    url: tableDataUrl,
                    data: {
                        data: formSelectComponentP.selectedData,
                        page: 1,
                        limit: 1000
                    },
                    traditional: true,
                    success: function (resultData) {
                        tableComponentP.update(resultData.data);
                    },
                    error: function (err, msg) {
                        console.log(err);
                    }
                });
            });
        };

    }

    //table初始化
    function TableComponent(elId, cols) {
        this.elId = elId;
        this.cols = cols;
        this.data = [];
        this.update = function (dataP) {
            this.data = dataP;
            this.render();
        };
        this.render = function () {
            renderTable(this.elId, this.data, this.cols);
        };
        this.init = function () {
            this.render();
        }
    }

    function renderTable(elId, renderData, cols) {
        table.render({
            elem: elId,
            title: '已选设备',
            page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
                layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
                curr: 1, //设定初始在第 5 页
                groups: 1, //只显示 1 个连续页码
                first: false, //不显示首页
                last: false //不显示尾页
            },
            cols: cols,
            data: renderData,
            skin: 'line', //表格风格
            even: true,
            id: 'selectedlist',
            page: true,
            limits: [5, 7, 10, 20],
            limit: 5 //每页默认显示的数量
        });
    }

    var cols = [
        [
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
            }
        ]
    ];
    var tableComponent = new TableComponent("#selectedlist", cols);
    tableComponent.init();
    var formSelectComponent = new FormSelectComponent('addappointequipment', layui.setter.base + '../device/findAcademyGroupDevices?page=1&limit=5000');
    formSelectComponent.init();
    var addComponent = new AddBtnComponent("#addAppointDevice", layui.setter.base + '../device/findSelectDevices', formSelectComponent, tableComponent);
    addComponent.init();

    //单选按钮区域
    var IS_ACTIVE = 621, NOT_ACTIVE = 622;
    var appointment1 = -1;//是否允许预约
    var needAudit1 = -1;//预约是否需要审核
    var needAllowSecurityAccess1 = -1;//是否准入形式在线考试

    var trainType1 = 627;//培训形式,默认集体
    var $trainingMode = $(".training_mode");

    function getTrainType1Data() {
        return needExam1 === IS_ACTIVE ? trainType1 : -1;
    }

    var needExam1 = -1; //是否需要安全准入

    var realAllAudits = [];

    function getRealAllAuditsData() {
        return needAudit1 === IS_ACTIVE ? realAllAudits : realAllAudits.map(function (value) {
            return "0";
        });
    }

    needAllAudits.forEach(function (item, key) {
        realAllAudits[key] = "0";
        form.on('radio(' + item + ')', function (data) {
            realAllAudits[key] = data.value + "";
        });
    });
    var $allAudits = $(".need_examine_detail");

    function get62xData(val) {
        return val === "1" ? IS_ACTIVE : NOT_ACTIVE;
    }

    //允许预约
    form.on('radio(allowappoint)', function (data) {
        appointment1 = get62xData(data.value);
    });

    //预约是否需要审核
    form.on('radio(needexamine)', function (data) {
        data.value === "0" ? $allAudits.hide() : $allAudits.show();
        needAudit1 = get62xData(data.value);
    });
    //是否需要安全准入
    form.on('radio(securitygroup)', function (data) {
        data.value === "0" ? $trainingMode.hide() : $trainingMode.show();
        needExam1 = get62xData(data.value);
    });
    //考试形式是否在线考试
    form.on('radio(onlineexam)', function (data) {
        needAllowSecurityAccess1 = get62xData(data.value);
    });
    //培训模式,集中培训627，单独培训628
    form.on('radio(trainingmode)', function (data) {
        trainType1 = data.value === 1 ? 627 : 628;
    });
    document.querySelector("#saveSelectedDevices").addEventListener("click", saveData);
    function formCheck(devicesData,openRangeData) {
        var allowAppointElems = document.querySelectorAll('input[name=allowappoint]');
        var isAllowAppoint = allowAppointElems[0].checked;
        var notAllowAppoint = allowAppointElems[1].checked;
        if (isAllowAppoint) {//当允许预约时执行以下验证
            var needExamElems = document.querySelectorAll('input[name=needexamine]');
            var isNeedExam = needExamElems[0].checked;
            var notNeedExam = needExamElems[1].checked;
            if (!isNeedExam && !notNeedExam) {
                alert("请选择是否需要审核");
                return false;
            }
            var needSecurityAccessElems = document.querySelectorAll('input[name=securitygroup]');
            var isNeedSA = needSecurityAccessElems[0].checked;
            var notNeedSA = needSecurityAccessElems[1].checked;
            if(isNeedSA){//当允许预约且需要安全准入时执行以下验证
                var onlineExamAccessElems = document.querySelectorAll('input[name=onlineexam]');
                var isOnlineExam = onlineExamAccessElems[0].checked;
                var notOnlineExam = onlineExamAccessElems[1].checked;
                if(!(notOnlineExam || isOnlineExam)){
                    alert("请选择安全准入形式");
                    return false;
                }
            }else if(!notNeedSA){
                alert("请选择是否需要安全准入");
                return false;
            }
        } else if (!notAllowAppoint) {
            alert("请选择是否允许预约");
            return false;
        }

        if (!(Array.isArray(devicesData) && devicesData.length > 0)) {
            alert("请选择并添加设备");
            return false;
        }
        if(!(Array.isArray(openRangeData) && openRangeData.length > 0)){
            alert("请选择开放范围");
            return false;
        }
        return true;
    }
    function saveData() {
        var deviceData = tableComponent.data.map(function (item) {
            return item.id;
        });
        var openRangeData = formSelects.value("openrange").map(function (item) {
            return item.value;
        });
        if(!formCheck(deviceData,openRangeData)){
         return;
        }
        $.ajax({
            url: layui.setter.base + '../device/batchInstallDeviceAppointment',
            data: {
                data: deviceData,
                academies: openRangeData,
                appointment1: appointment1,
                needAudit1: needAudit1,
                needAllowSecurityAccess1: needAllowSecurityAccess1,
                trainType1: getTrainType1Data(),
                needExam1: needExam1,
                realAllAudits: getRealAllAuditsData()
            },
            method: "POST",
            traditional: true,
            success: deviceGlobal.saveSuccessCallback,
            error: function (errData, msg) {
                alert(errData);
                alert(msg);
            }
        })
    }
});