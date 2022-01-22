/** layuiAdmin.std-v1.2.1 LPPL License By http://www.layui.com/admin/ */ ;
layui.define(function(e) {
	layui.use("table", function() {
		var e = (layui.$, layui.table);
		e.render({
			elem: "#userManagement",
			url: layui.setter.base + "json/information/userManagement.js",
			title: '用户管理',
			cellMinWidth: 100,
			cols: [
				[{
					field: 'id',
					title: '教工号',
					width: 100,
					sort: true,
					fixed: true
				}, {
					field: 'username',
					title: '姓名'
				}, {
					field: 'sex',
					title: '性别'
				},{
					field: 'phone',
					title: '手机',
					minWidth:120
				}, {
					field: 'email',
					title: '邮箱',
					minWidth:170
				}, {
					fixed: 'right',
					title: '操作',
					width: 370,
					align: 'center',
					toolbar: '#userbar'
				}
				]
			],
			page: true,
			limits:[10,20,30,40,50,60,70,80,90,200],
			height: 315,
			skin: "line"
		});
		var $ = layui.$,
			active = {
				reload: function() {
					var demoReload = $('#userId');

					//执行重载
					table.reload('userManagement', {
						page: {
							curr: 1 //重新从第 1 页开始
						},
						where: {
							key: {
								id: demoReload.val()
							}
						}
					});
				}
			};

		$('.userManagementbtn .layui-btn').on('click', function() {
			var type = $(this).data('type');
			active[type] ? active[type].call(this) : '';
		});
	}), e("userManagement", {})
});