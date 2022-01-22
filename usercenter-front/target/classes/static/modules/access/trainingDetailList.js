layui.use(['form', 'element', 'laydate', 'laypage', 'table', 'layer'], function() {
	var $ = layui.jquery,
		admin = layui.admin,
		form = layui.form,
		element = layui.element,
		laydate = layui.laydate,
		laypage = layui.laypage,
		table = layui.table,
		layer = layui.layer;

	//向世界问个好
	//layer.msg('');

	form.render(null, 'trainingdetaillistbox');

	//监听提交
	form.on('submit(trainingdetaillistbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		parent.layui.table.reload('trainingdetaillistbox'); //重载表格
		parent.layer.close(index); //再执行关闭 
	});

	//信息
	form.val('trainingdetaillistbox', {
		"": "" //备用
	});

	//执行一个表单
	table.render({
		elem: '#trainingdetaillist',
		url: httpAccessUrl + '/getAccessEntityResult', //数据接口
		where: {"accessCode": "TRAINING", "entityId": entityId, "entityType": entityType},
		title: '列表',
		cellMinWidth: 100,
		page: true, //开启分页			
		page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
			layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
			//curr: 5, //设定初始在第 5 页				
			groups: 1, //只显示 1 个连续页码				
			first: false, //不显示首页				
			last: false //不显示尾页
		},
		cols: [
			[ //表头
				{
					fixed: 'left',
					type: 'checkbox',
					width: 30
				}, {
					fixed: 'left',
					title: '序号',
					type: 'numbers',
					width: 40
				}, {
					field: 'username',
					title: '学号',
					sort: true
				}, {
					field: 'name',
					title: '姓名',
					sort: true
				}, {
					field: 'pass',
					title: '是否通过',
					minWidth: 110,
					sort: true
				}, {
					fixed: 'right',
					title: '操作',
					templet: '#toolbar',
					minWidth: 100,
					unresize: true
				}
			]
		],
		id: 'trainingdetaillist',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		limits: [5, 7, 10, 20],
		limit: 5 //每页默认显示的数量
	});

	form.render();
	form.on('switch(operation)', function(data){
		let resultId = data.value;
		let result = data.elem.checked ? 1 : 0;
		$.ajax({
			url: httpAccessUrl + '/updateAccessEntityResult?resultId=' + resultId + '&result=' + result,
			type: 'POST',
			success: function (res) {
				if (res.code === 0) {
					layer.msg('录入成功');
				} else {
					layer.msg(res.msg);
				}
			}
		})
	});

	var $ = layui.$,
		active = {
			reload: function() {
				var searchbox = $('#searchbox');

				//执行重载
				table.reload('trainingdetaillist', {
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						key: {
							labname: searchbox.val()
						}
					}
				}, 'data');
			}
		};

	$('.search_line .layui-btn').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});
});