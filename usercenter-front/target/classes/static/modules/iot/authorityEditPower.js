layui.use(['index', 'form', 'laypage', 'laydate', 'layer', 'table', 'element', 'transfer', 'util'], function() {
	var $ = layui.$,
		admin = layui.admin,
		element = layui.element,
		layer = layui.layer,
		form = layui.form,
		laydate = layui.laydate,
		laypage = layui.laypage,
		table = layui.table,
		transfer = layui.transfer,
		util = layui.util;

	//向世界问个好
	//layer.msg('');

	//监听提交
	form.on('submit(editpowerbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		parent.layui.table.reload('authoritypowercontrollertab'); //重载表格
		parent.layer.close(index); //再执行关闭 
	});

	form.render(null, 'editpower');

	//信息
	form.val('editpower', {
		"accessdate": "2020-09-22 - 2020-10-28",
		"accesstime": "00:00:00 - 12:00:00",
		"accessweek": 2
	});

	//设置
	form.on('radio(accesstype)', function(data) {
		//alert(data.elem);
		//console.log(data.elem);
		//alert(data.value);//
		var abc = data.value;
		if(abc == "按时授权") {
			$(".accessdate").show();
		} else {
			$(".accessdate").hide();
		}
	});

	//授权日期
	laydate.render({
		elem: '#accessdate',
		range: true
	});

	//授权时间
	laydate.render({
		elem: '#accesstime',
		type: "time",
		range: true
	});

	//穿梭数据
	var equipment = [{
		"value": "1",
		"title": "one(111111)"
	}, {
		"value": "2",
		"title": "two(222222)"
	}, {
		"value": "3",
		"title": "three(333333)"
	}, {
		"value": "4",
		"title": "four(444444)"
	}, {
		"value": "5",
		"title": "five(555555)"
	}, {
		"value": "6",
		"title": "six(666666)"
	}, {
		"value": "7",
		"title": "seven(777777)"
	}]

	var lab = [{
		"value": "1",
		"title": "one"
	}, {
		"value": "2",
		"title": "two"
	}, {
		"value": "3",
		"title": "three"
	}, {
		"value": "4",
		"title": "four",
		"disabled": true //暂时不可用的人员被封锁，"disable"的状态为true
	}, {
		"value": "5",
		"title": "five"
	}, {
		"value": "6",
		"title": "six"
	}, {
		"value": "7",
		"title": "seven"
	}]

	//授权用户穿搜框
	transfer.render({
		elem: '#equipment',
		title: ['未授权设备', '已授权设备'] //自定义标题
			,
		data: equipment //数据
			//,width: 150 //定义宽度
			,
		height: 264 //定义高度
			,
		value: ["1", "3"] //初始右侧数据
			,
		showSearch: true //显示搜索框
	})

	//授权实验室穿搜框
	transfer.render({
		elem: '#lab',
		title: ['未授权实验室', '已授权实验室'] //自定义标题
			,
		data: lab //数据
			//,width: 150 //定义宽度
			,
		height: 264 //定义高度
			,
		value: ["2", "5", "6"] //初始右侧数据
			,
		showSearch: true //显示搜索框
	})
});