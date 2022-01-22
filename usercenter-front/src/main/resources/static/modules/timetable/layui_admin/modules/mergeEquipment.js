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

    var formSelectComponent = {
        el:'addequipment',
        selectData:[],
        init:function () {
            formSelects.config(this.el, {
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
            }).data(this.el, 'server', {
                url: layui.setter.base + '../device/findNoRelationAndGroupDevices'
            });

            document.querySelector("#addMergedDevice").addEventListener("click", function (evt) {
                formSelectComponent.selectedData = formSelects.value(formSelectComponent.el).map(function (item) {
                    return item.value;
                });

                $.ajax({
                    url: layui.setter.base + '../device/findSelectDevices',
                    data: {
                        data: formSelectComponent.selectedData,
                        page: 1,
                        limit: 1000
                    },
                    traditional: true,
                    success: function (resultData) {
                        formSelectComponent.parent.addData = resultData.data;
                        formSelectComponent.parent.render();
                    },
                    error: function (err, msg) {
                        console.log(err);
                    }
                });
            });
        }
    };
    var saveComponent = {
        el:"#saveSelectedDevices",
        init:function () {
            document.querySelector(this.el).addEventListener("click", function () {
                if(!(saveComponent.parent.addData.length > 0)){

                    if(saveComponent.parent.editData.length > 0){//点击编辑进来的
                        window.parent.layer.closeAll();
                    }else{//点击关联设备设置进来的
                        alert("请选择并添加设备");
                    }
                    return;
                }
                $.ajax({
                    url: layui.setter.base + '../device/saveGroupDevices',
                    method: 'POST',
                    data: saveComponent.parent.getGroupFormData(),
                    traditional: true,
                    success: deviceGlobal.saveSuccessCallback,
                    error: function (errData, msg) {
                        alert("保存异常:"+msg);
                    }
                });
            });
        }
    };
    var tableComonent = {
        el:'#selectedlist',
        equipmentNameEl:"input[name=equipmentname]",
        equipmentNumberEl:"input[name=equipmentnumber]",
        editData:[],
        addData:[],
        getRenderData:function(){
            var result = [];
            if(Array.isArray(this.editData)){
                result = result.concat(this.editData);
            }
            if(Array.isArray(this.addData)){
                result = result.concat(this.addData);
            }
            return result;
        },
        getGroupFormData:function(){
            var formData = {};
            formData.groupName = this.getGroupName();
            formData.groupNumber =this.getGroupNumber();
            formData.data = this.addData.map(function (item) {
                return item.id;
            });
            return formData;
        },
        getGroupName:function(){
            return document.querySelector(this.equipmentNameEl).value;
        },
        getGroupNumber:function(){
            return document.querySelector(this.equipmentNumberEl).value;
        },
        init:function(){
            equipmentNumber?document.querySelector("input[name=equipmentnumber]").value=equipmentNumber:null;
            equipmentName?document.querySelector("input[name=equipmentname]").value=equipmentName:null;
            if(equipmentNumber||equipmentName){
                $.ajax({
                    url: layui.setter.base + '../device/editGroupDevices',
                    data: {
                        groupName:equipmentName,
                        groupUid:equipmentNumber,
                        page: 1,
                        limit: 1000
                    },
                    traditional: true,
                    success: function (resultData) {
                        tableComonent.editData=resultData.data;
                        tableComonent.render();
                    },
                    error: function (err, msg) {
                        console.log(err);
                    }
                });
            }else{
                tableComonent.render();
            }
            //监听行工具事件
            table.on('tool(selectedlist)', function (obj) { //注：tool是工具条事件名，selectedlist 是 table 原始容器的属性 lay-filter="对应的值"
                if (obj.event === 'del') {
                    function deleteData(sourceData,obj){
                        for(var i=0;i<sourceData.length;i++){
                            if(sourceData[i].id === obj.data.id){
                                sourceData.splice(i,1);
                                $.ajax({
                                    url:layui.setter.base+'../device/deleteGroupDevice',
                                    data:{
                                        groupNumber:tableComonent.getGroupNumber(),
                                        groupName: tableComonent.getGroupName(),
                                        labRoomDeviceId:obj.data.id
                                    },
                                    method:"post"
                                });
                                tableComonent.render();
                                return true;
                            }
                        }
                    }
                    layer.confirm('真的要删除吗？', function (index) {
                        if(!deleteData(tableComonent.editData,obj)){
                            deleteData(tableComonent.addData,obj);
                            formSelects.value(formSelectComponent.el,tableComonent.addData.map(function (item) { return item.id}));
                        }
                        layer.close(index);
                        layer.msg("删除成功");
                    });
                }
            });
            var that = this;
            this.components.forEach(function (item) {
                item.parent = that;
                item.init();
            })
        },
        components:[saveComponent,formSelectComponent],
        render:function () {
            renderTable(this.el,this.getRenderData());
        }
    };
    tableComonent.init();
    function renderTable(elId,renderData) {
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
            cols: [
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
                    }, {
                    fixed: 'right',
                    title: '操作',
                    width: 120,
                    align: 'center',
                    toolbar: '#operation'
                }
                ]
            ],
            data: renderData,
            skin: 'line', //表格风格
            even: true,
            id: 'selectedlist',
            page: true,
            limits: [5, 7, 10, 20],
            limit: 5 //每页默认显示的数量
        });
    }
});