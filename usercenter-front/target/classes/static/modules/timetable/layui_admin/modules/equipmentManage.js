layui.use(['index', 'form', 'laypage', 'layer', 'table', 'element'], function() {
	var $ = layui.$,
		admin = layui.admin,
		element = layui.element,
		layer = layui.layer,
		form = layui.form,
		laypage = layui.laypage,
		table = layui.table;

	//监听行工具事件
	table.on('tool(equipment)', function(obj) { //注：tool是工具条事件名，equipment是 table 原始容器的属性 lay-filter="对应的值"
		var data = obj.data;//获得当前行数据
		//打开关联设备设置
		if(obj.event === 'editrelateequip') {
		    var relateUrl = concatUrlWithParameter('relateEquipment',{
                relationNumber:data.number,
                relationName:data.name
            });
			openPage('关联设备编辑',relateUrl);
		} else {
            var groupUrl = concatUrlWithParameter('mergeEquipment',{
                groupNumber:data.number,
                groupName:data.name
            });
            openPage('合并设备编辑',groupUrl);
        }
	});
	function concatUrlWithParameter(url,paramObj) {
		var result = url+"?";
		for(var key in paramObj){
			result+=(key+"="+paramObj[key]+"&")
		}
		return result.substr(0,result.length-1);
	}
	function openPage(titleP,contentP) {
		//多窗口模式，层叠置顶
		var index = layer.open({
			type: 2, //此处以iframe举例
			title: titleP,
			shade: 0.3,
			maxmin: true,
			content: contentP,//'relateEquipment',
			area: ['100%', '100%'],
			zIndex: layer.zIndex, //重点1
			success: function(layero) {
				layer.setTop(layero); //重点2
			},
			btn: ['确定', '取消'],
			yes: function(index, layero) {
				//点击确认触发 iframe 内容中的按钮提交
				var submit = layero.find('iframe').contents().find("#saveSelectedDevices");
				submit.click();
			}
		});
		layer.full(index);
	}
	var deviceBatchMap = {
		relateequipment:['关联设备设置','relateEquipment'],
		mergeequipment:['设备合并显示设置','mergeEquipment'],
		administrator:['批量设置设备管理员','administrator'],
		appointequipment:['设备预约批量设置','appointEquipment'],
		borrowequipment:['设备借用批量设置','borrowEquipment']
	};
	$('.header_edit').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		openPage.apply(null,deviceBatchMap[method]);
	});

	var relationForm = document.querySelector("#relationdevice-container form[name=queryForm]");
	var groupForm = document.querySelector("#groupdevice-container form[name=queryForm]");
    //初始化渲染
	$.ajax({
        url:relationForm.action,
        async:false,
        method:relationForm.method,
        success:function (resultData) {
            renderRelationDeviceTable(resultData.data);
        }
    });
    $.ajax({
        url:groupForm.action,
        async:false,
        method:groupForm.method,
        success:function (resultData) {
            renderGroupDeviceTable(resultData.data);
        }
    });
    //列合并
    layuiRowspan('name', 1);

    relationForm.addEventListener("submit",function (evt) {
        evt.preventDefault();
        var target = evt.target;
        var elements = target.elements;
        var formData = {};
        formData.labroomid = getSelectValue(elements.labroomid);
        formData.jobnumber = getSelectValue(elements.jobnumber);
        formData.name = elements.name.value;
        formData.number = elements.number.value;
        $.ajax({
            url:target.action,
            method:target.method,
            data:formData,
            success:function (resultData) {
            	console.log(this.action);
            	renderRelationDeviceTable(resultData.data);
            },
            err:function (err,msg) {
                console.log(msg);
            }
        });
    });
    function getSelectValue(selectElem) {
        return selectElem[selectElem.selectedIndex].value;
    }
	function renderRelationDeviceTable(renderData){
		table.render({
			elem:'#relationEquipmentTable',
            page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
                // layout: ['prev', 'next'], //自定义分页布局
                // prev:"上一页",
                // next:"下一页",
                curr: 1, //设定初始在第 1 页
                groups: 1, //只显示 1 个连续页码
                first:false,
                last:false,
                limit: 5,//每页默认显示的数量
                limits: [5, 7, 10, 20],
            },
            done:function(){
                layuiRowspan('name', 1);
            },
			cols:[[
				{type:'numbers',title:'序号', width:50},
				{field:'name',title:'设备名称(设备编号)',width: 155,toolbar: '#relationEquipInfo'},
				{
					field: 'state',
					title: '设备状态',
					width:80
				}, {
					field: 'model',
					title: '规格型号',
					width:80
				}, {
					field: 'brand',
					title: '品牌',
					width:80
				}, {
					field: 'price',
					title: '价格'
				}, {
					field: 'labroom',
					title: '实验室'
				},
				{
					field: 'administrator',
					title: '设备管理员(工号)',
					templet: '<div>{{ d.administrator }}({{ d.jobnumber }})</div>'
				},
				{
					field: 'opentype',
					title: '开放类型',
					width:80
				}
			]],
			data:renderData
		});
	}

    groupForm.addEventListener("submit",function (evt) {
		evt.preventDefault();
		var target = evt.target;
		var elements = target.elements;
		var formData = {};
		formData.labroomid = getSelectValue(elements.labroomid);
		formData.jobnumber = getSelectValue(elements.jobnumber);
		formData.name = elements.name.value;
		formData.number = elements.number.value;
		$.ajax({
			url:target.action,
			method:target.method,
			data:formData,
			success:function (resultData) {
				console.log(this.action);
				renderGroupDeviceTable(resultData.data);
			},
			err:function (err,msg) {
				console.log(msg);
			}
		});
	});
	function renderGroupDeviceTable(renderData){
		table.render({
			elem:'#groupEquipmentTable',
            page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
                // layout: ['prev', 'next'], //自定义分页布局
                // prev:"上一页",
                // next:"下一页",
                curr: 1, //设定初始在第 1 页
                groups: 1, //只显示 1 个连续页码
                first:false,
                last:false,
                limit: 5,//每页默认显示的数量
                limits: [5, 7, 10, 20],
            },
            done:function(){
                layuiRowspan('name', 2);
            },
			cols:[[
				{type:'numbers',title:'序号', width:50},
				{field:'name',title:'设备名称(设备编号)',width: 155,toolbar: '#groupEquipInfo'},
				{
					field: 'state',
					title: '设备状态',
					width:80
				}, {
					field: 'model',
					title: '规格型号',
					width:80
				}, {
					field: 'brand',
					title: '品牌',
					width:80
				}, {
					field: 'price',
					title: '价格'
				}, {
					field: 'labroom',
					title: '实验室'
				},
				{
					field: 'administrator',
					title: '设备管理员(工号)',
					templet: '<div>{{ d.administrator }}({{ d.jobnumber }})</div>'
				},
				{
					field: 'opentype',
					title: '开放类型',
					width:80
				}
			]],
			data:renderData
		});
	}
});