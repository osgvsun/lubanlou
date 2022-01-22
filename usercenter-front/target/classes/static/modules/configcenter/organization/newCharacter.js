layui.use(['form', 'element', 'layer', 'transfer', 'util'], function() {
	var $ = layui.jquery,
		admin = layui.admin,
		form = layui.form,
		element = layui.element,
		layer = layui.layer,
		transfer = layui.transfer,
		util = layui.util;

	//向世界问个好
	//layer.msg('');

	form.render(null, 'newcharacterbox');

	//监听提交
	form.on('submit(newcharacterbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		parent.layui.table.reload('newcharacterbox'); //重载表格
		parent.layer.close(index); //再执行关闭 
	});

	//信息
	form.val('newcharacterbox', {
		"": "", //备用
	});

	//穿梭数据
	var labselected = [{
		"value": "1",
		"title": "人员1"
	}, {
		"value": "2",
		"title": "人员2"
	}, {
		"value": "3",
		"title": "人员3"
	}, {
		"value": "4",
		"title": "人员4",
		"disabled": true //暂时不可用的人员被封锁，"disable"的状态为true
	}, {
		"value": "5",
		"title": "人员5"
	}, {
		"value": "6",
		"title": "人员6"
	}, {
		"value": "7",
		"title": "人员7"
	}]

	//复制到人员穿搜框
	transfer.render({
		elem: '#personselected',
		title: ['未选择', '已选择'] //自定义标题
			,
		data: labselected //数据
			//,width: 150 //定义宽度
			,
		height: 264 //定义高度
			//	,
			//value: ["1", "3"] //初始右侧数据
			,
		showSearch: true //显示搜索框
	})
});