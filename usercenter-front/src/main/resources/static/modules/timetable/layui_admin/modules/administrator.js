layui.config({
    base: $('#contextPath').val()+'/layui_admin/' //假设这是你存放拓展模块的根目录
}).extend({ //设定模块别名
    index: 'lib/index', //主入口模块
    // deviceBatchGlobal: 'modules/deviceBatchGlobal', //如果 mymod.js 是在根目录，也可以不用设定别名
    // formSelects: 'modules/formSelects', //如果 mymod.js 是在根目录，也可以不用设定别名
});
layui.use(['index','form', 'laypage', 'laydate', 'layer', 'table', 'element', 'formSelects','deviceBatchGlobal'], function () {
    var $ = layui.$,
        element = layui.element,
        layer = layui.layer,
        form = layui.form,
        laydate = layui.laydate,
        laypage = layui.laypage,
        table = layui.table,
        formSelects = layui.formSelects,
        deviceGlobal = layui.deviceBatchGlobal;

    var cols = [
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
            // templet: '<div>{{ d.administrator }}({{ d.jobnumber }})</div>'
            templet: function (d) {
                var administrator = formSelects.value('selectAdministrator', 'nameStr');
                var jobnumber = formSelects.value('selectAdministrator', 'valStr');
                return '<div>'+ administrator +'('+ jobnumber +')</div>'
            }
        },
            {
                field: 'opentype',
                title: '开放类型',
                sort: true
            }
        ]
    ];
    formSelects.on('labRoom', function(id, vals, val, isAdd, isDisabled){
        //id:           点击select的id
        //vals:         当前select已选中的值
        //val:          当前select点击的值
        //isAdd:        当前操作选中or取消
        //isDisabled:   当前选项是否是disabled
        var labRoomId = isAdd?val.value:'';
        formSelectComponent.dataUrl = (labRoomId=='')?'../device/findAcademyGroupDevices?page=1&limit=5000': '../device/findAcademyGroupDevices?page=1&limit=5000&labRoomId='+labRoomId;
        formSelectComponent.init();
        // console.log(formSelectComponent)
        //如果return false, 那么将取消本次操作
    });

    function basicFormSelectInit(xmId, url) {
        formSelects.config(xmId, {
            beforeSuccess: function (id, url, searchVal, result) {
                var result1 = [];

                result.forEach(function (item) {
                    if(xmId == 'labRoom'){
                        result1.push({name: item.labRoomName, value: item.id});
                    }else{
                        result1.push({name: item.cname, value: item.username});
                    }
                });
                //然后返回数据
                return result1;
            }
            ,success: function(id, url, searchVal, result){      //使用远程方式的success回调
                var labId = $('#labId').val();
                // var labs = [];
                if(labId&&xmId == 'labRoom'){
                    // labs.push
                    formSelects.value(xmId, labId.split(','));
                }
            },

        }).data(xmId, 'server', {
            url: url
        });
    }

    basicFormSelectInit('selectAdministrator', "../device/findDeviceManager");
    basicFormSelectInit('labRoom',  "../labRoom/getAllLabRoom?currpage=1&pageSize=99999");

	document.querySelector("#saveSelectedDevices").addEventListener("click", function () {
		var data = {
			username:formSelects.value('selectAdministrator')[0].value,
			data:tableComponent.data.map(function (item) { return item.id; })
		};
		console.log(data);
		$.ajax({
			url: '../device/batchInstallDeviceManager',
			method: 'POST',
			data: data,
			traditional: true,
            success: deviceGlobal.saveSuccessCallback,
            error: function (errData, msg) {
                alert("保存异常:"+msg);
            }
		});
	});

    function FormSelectComponent(obj) {
        this.elId = obj.elId;
        this.selectedData = [];
        this.dataUrl = obj.dataUrl;
        this.tableDataUrl = obj.tableDataUrl;
        this.parent = obj.parent;
        this.addElId = obj.addElId;
        this.tableDataSuccess = obj.tableDataSuccess;
        this.init = function () {
            var that = this;
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
                url: this.dataUrl
            });
            document.querySelector(this.addElId).addEventListener("click", function (evt) {
                that.selectedData = formSelects.value(that.elId).map(function (item) {
                    return item.value;
                });

                $.ajax({
                    url: that.tableDataUrl,
                    data: {
                        data: that.selectedData,
                        page: 1,
                        limit: 1000
                    },
                    traditional: true,
                    success: that.tableDataSuccess,
                    error: function (err, msg) {
                        console.log(err);
                    }
                });
            });
        }

    }

    function TableComponent(elId, cols) {
        this.elId = elId;
        this.cols = cols;
        this.data = [];
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

    var tableComponent = new TableComponent("#selectedlist", cols);
    tableComponent.init();
    var labId = $('#labId').val();
    if(labId){
        var dataUrl = layui.setter.base+'../device/findAcademyGroupDevices?page=1&limit=5000&labRoomId='+labId;
    }else{
        var dataUrl = layui.setter.base+'../device/findAcademyGroupDevices?page=1&limit=5000';
    }
    var formSelectComponent = new FormSelectComponent({
        elId: 'addequipment',
        dataUrl:  dataUrl,
        tableDataUrl:  layui.setter.base+'../device/findSelectDevices',
        parent: tableComponent,
        addElId: '#addDevice',
        tableDataSuccess: function (resultData) {
            tableComponent.data = resultData.data;
            tableComponent.render();
        }
    });
    formSelectComponent.init();
});