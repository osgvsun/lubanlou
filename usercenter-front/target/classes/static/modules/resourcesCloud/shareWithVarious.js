layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate', 'transfer', 'util'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form,
		laydate = layui.laydate,
		transfer = layui.transfer,
		util = layui.util

	//向世界问个好
	//layer.msg('');

	form.render(null, 'sharewithvariousbox');

	//监听提交
	form.on('submit(sharewithvariousbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		parent.layui.table.reload('sharewithvariousbox'); //重载表格
		parent.layer.close(index); //再执行关闭 
	});

	//信息
	form.val('sharewithvariousbox', {
		"": "" //备用
	});

	//联系人穿梭数据
	var member = [{
		"value": "1",
		"title": "成员1"
	}, {
		"value": "2",
		"title": "成员2"
	}, {
		"value": "3",
		"title": "成员3"
	}, {
		"value": "4",
		"title": "成员4",
		"disabled": true //暂时不可用的人员被封锁，"disable"的状态为true
	}, {
		"value": "5",
		"title": "成员5"
	}, {
		"value": "6",
		"title": "成员6"
	}, {
		"value": "7",
		"title": "成员7"
	}]

	//部门穿梭数据
	var department = [{
		"value": "1",
		"title": "部门1"
	}, {
		"value": "2",
		"title": "部门2"
	}, {
		"value": "3",
		"title": "部门3"
	}, {
		"value": "4",
		"title": "部门4",
		"disabled": true //暂时不可用的人员被封锁，"disable"的状态为true
	}, {
		"value": "5",
		"title": "部门5"
	}, {
		"value": "6",
		"title": "部门6"
	}, {
		"value": "7",
		"title": "部门7"
	}]

	//角色(职务)穿梭数据
	var profession = [{
		"value": "1",
		"title": "职务人员1"
	}, {
		"value": "2",
		"title": "职务人员2"
	}, {
		"value": "3",
		"title": "职务人员3"
	}, {
		"value": "4",
		"title": "职务人员4",
		"disabled": true //暂时不可用的人员被封锁，"disable"的状态为true
	}, {
		"value": "5",
		"title": "职务人员5"
	}, {
		"value": "6",
		"title": "职务人员6"
	}, {
		"value": "7",
		"title": "职务人员7"
	}]

	//成员信息复制到穿搜框
	transfer.render({
		elem: '#member',
		title: ['未选择成员', '已选择成员'] //自定义标题
			,
		data: member //数据
			//,width: 150 //定义宽度
			,
		height: 264 //定义高度
			,
		value: ["1", "2", "3", "5"] //初始右侧数据
			,
		showSearch: true //显示搜索框
	})

	//部门信息复制到穿搜框
	transfer.render({
		elem: '#department',
		title: ['未选择部门', '已选择部门'] //自定义标题
			,
		data: department //数据
			//,width: 150 //定义宽度
			,
		height: 264 //定义高度
			,
		value: ["3", "4", "5"] //初始右侧数据
			,
		showSearch: true //显示搜索框
	})

	//角色(职务)信息复制到穿搜框
	transfer.render({
		elem: '#profession',
		title: ['未选择角色(职务)', '已选择角色(职务)'] //自定义标题
			,
		data: profession //数据
			//,width: 150 //定义宽度
			,
		height: 264 //定义高度
			,
		value: ["2", "5"] //初始右侧数据
			,
		showSearch: true //显示搜索框
	})

});