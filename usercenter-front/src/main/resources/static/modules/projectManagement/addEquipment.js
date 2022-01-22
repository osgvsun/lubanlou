layui.config({
	base:'../'
}).extend({
	index:'lib/index'
})
var checked=new Array();
layui.use(['laypage', 'layer', 'table', 'element', 'form'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form

	//向世界问个好
	//layer.msg('');

	//监听提交
	form.on('submit(addequipmentbtn)', function(data) {
		let field = data.field; //获取提交的字段
		let deviceIds = checked.join(',');
		let operationItemId = $('#proId').val();
		$.ajax({
			url: `${timetableHost}api/operation/saveOperationItemDevice`,
			data: {operationItemId: operationItemId,deviceIds: deviceIds},
			async: false,
			dataType: 'json',
			type: 'post',
			success: function (res) {
				if(res.code === 0){
					layer.msg(res.msg);
					let index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
					parent.layer.close(index); //再执行关闭
				}
			}

		})
		// return false;
	});

	form.render(null, 'addequipmentbox');

	//执行一个表单
	table.render({
		elem: '#addequipment',
		url: timetableHost + "lims/api/labRoomDevice/getLabRoomDeviceListByPage", //数据接口
		title: '列表',
		cellMinWidth: 90,
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
					width: 50
				}, {
					field: 'deviceNumber',
					title: '设备编号',
					sort: true
				}, {
					field: 'deviceName',
					title: '设备名称',
					sort: true
				}, {
					field: 'labRoomName',
					title: '所属实验室',
					sort: true
				}, {
					field: 'deviceFormat',
					title: '规格',
					width: 115,
					sort: true
				}, {
					field: 'devicePattern',
					title: '型号',
					sort: true
				}, {
					field: 'devicePrice',
					title: '单价',
					sort: true
				}
			]
		],
		id: 'addequipment',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		limits: [5, 10, 15, 20],
		limit: 15, //每页默认显示的数量
		done: function (res) {
			// 设置换页勾选之前的
			// console.log(checked);
			//在缓存中找到PM_CODE ,然后设置data表格中的选中状态
			//循环所有数据，找出对应关系，设置checkbox选中状态
			for(var i=0;i<res.data.length;i++){
				for(var j=0;j<checked.length;j++){
					if(res.data[i].id==checked[j]){
						//这里才是真正的有效勾选
						res.data[i]["LAY_CHECKED"]='true';
						//找到对应数据改变勾选样式，呈现出选中效果
						var index= res.data[i]['LAY_TABLE_INDEX'];
						$('.layui-table tr[data-index=' + index + '] input[type="checkbox"]').prop('checked', true);
						$('.layui-table tr[data-index=' + index + '] input[type="checkbox"]').next().addClass('layui-form-checked');
					}
				}
			}
		}
	});
	table.on('checkbox(addequipment)', function(obj){
		var _this = obj.tr[1];
		// handleCheck1(event,_this);
		form.render('checkbox');
		// var flag = $(_this).find('.layui-form-checkbox').hasClass('layui-form-checked')
		// console.log(obj.checked); //当前是否选中状态
		// console.log(obj.data); //选中行的相关数据
		// console.log(obj.type); //如果触发的是全选，则为：all，如果触发的是单选，则为：one
		// if(obj.checked){
		if(obj.type == 'all'){
			if(obj.checked) {
				var cache = table.cache['addequipment'];
				for (var j = 0; j < cache.length; j++) {
					for(var i=checked.length-1;i>-1;i--){
						if(checked[i] == cache[j].id){
							checked.splice(i,1);
						}
					}
				}
				for (var i = 0; i < cache.length; i++) {
					checked.push(cache[i].id);
				}
				// $.cookie("checkedCourse",checked);
			}else {
				var cache = table.cache['addequipment'];
				for (var j = 0; j < cache.length; j++) {
					for(var i=checked.length-1;i>-1;i--){
						if(checked[i] == cache[j].id){
							checked.splice(i,1);
						}
					}
				}
			}
		}else if(obj.type == 'one'){
			if(event.shiftKey) {
				const boxs = document.querySelectorAll('.layui-table-fixed .layui-table-body .layui-form-checkbox');
				const boxArr = Array.from(boxs);
				boxArr.forEach(function(value,index,arr) {
					// console.log('123')
					var u = $('.layui-table-main table tr').eq(index).find('td').eq(2).find('div').text();
					if($(value).hasClass('layui-form-checked')){
						if(checked.indexOf(u)==-1){
							checked.push(u);
						}
					}else{
						if(checked.indexOf(u)!=-1){
							checked.splice(checked.indexOf(u), 1);
						}
					}
				});
			}else{
				// if(obj.checked) {
				if($(_this).find('.layui-form-checkbox').hasClass('layui-form-checked')) {
					for(var i=checked.length-1;i>-1;i--){
						if(checked[i] == obj.data.id){
							checked.splice(i,1);

						}
					}
					checked.push(obj.data.id);
				}else {
					for(var i=checked.length-1;i>-1;i--){
						if(checked[i] == obj.data.id){
							checked.splice(i,1);
						}
					}
				}
			}

		}
		// }
		// console.log(checked);

	});
	var $ = layui.$,
		active = {
			search: function() {
				var searchbox = $('#searchbox');

				//执行重载
				table.reload('addequipment', {
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						// key: {
							search: searchbox.val()
						// }
					}
				}, 'data');
			},
			reload: function() {
				var searchbox = $('#searchbox');

				//执行重载
				table.reload('addequipment', {
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						// key: {
							search: ''
						// }
					}
				}, 'data');
			}
		};

	$('.search_line .layui-btn').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});
});