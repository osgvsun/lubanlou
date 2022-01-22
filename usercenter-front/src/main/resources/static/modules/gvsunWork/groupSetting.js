layui.config({
	base: '../'
}).extend({treeTable: "modules/gvsunWork/static/js/treeTable"}).use(['laypage', 'layer', 'table', 'element', 'form', 'treeTable', 'util', 'transfer'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form,
		util = layui.util,
		transfer = layui.transfer,
		treeTable = layui.treeTable;

	//向世界问个好
	layer.msg('进入自定义设置');
	setCourseSite('#site', siteId, $)
	form.render(null, 'customsettingbox');
	// 渲染表格
	var insTb = treeTable.render({
		elem: '#demoTreeTb',
		reqData: function(data, callback) {
			$.get( httpBaseUrl + 'api/getGroupManageList?siteId=' + siteId, function (res) {
				callback(res);
			});
		},
		height: 'full-200',
		tree: {
			iconIndex: 2,
			isPidData: true,
			idName: 'id',
			pidName: 'pid'
		},
		open: true
		, page: true
		, limit: 10   //默认十条数据一页
		, limits: [10, 20, 30, 50], //数据分页条
		cols: [
			[
				{type: 'numbers'},
				{type: 'checkbox'},
				{title: ''},
				{field: 'name', title: '名称', edit: 'text', minWidth: 165},
				{align: 'center', toolbar: '#tbBar', title: '操作', width: 240}
			]
		],
		style: 'margin-top:0;'
	});
	// 全部展开
	$('#btnExpandAll').click(function () {
		insTb.expandAll();
	});

	// 全部折叠
	$('#btnFoldAll').click(function () {
		insTb.foldAll();
	});
	treeTable.on("tool(demoTreeTb)", function (obj) {
		let data = obj.data;
		if (obj.event === 'add') {
			if (data.pid !== null && data.id.indexOf('_') !== -1) {
				let initData = [];
				let initValue = [];
				$.ajax({
					url: httpBaseUrl + 'api/getUserListByGroupIdPage',
					type: 'GET',
					async: false,
					data: {"groupId": data.id.split('_')[1], "page": 1, "pageSize": 999},
					success: function (res) {
						initData = res.data.map(v => {
							initValue.push(v.username);
							return {"title": v.cname, "value": v.username}
						})
					}
				})
				layer.open({
					type: 1,
					title: '添加小组成员',
					area: ['500px', '500px'],
					shade: 0.5,
					maxmin: true,
					content: $('#groupUsername'),
					zIndex: layer.zIndex,
					success: function (layero, index) {
						let result = [];
						$.ajax({
							url: httpBaseUrl + 'api/getUserListGroupCanUse',
							type: 'GET',
							async: false,
							data: {"siteId": siteId, "categoryId": data.pid},
							success: function (res) {
								result = res.map(v => {
									return {"title": v.cname, "value": v.username}
								})
								Object.assign(result, initData)
							}
						})
						//显示搜索框
						transfer.render({
							elem: '#groupUsername'
							,data: result
							,title: ['未选择', '已选择']
							,value: initValue
							,showSearch: true
							,id: 'groupUsername'
						})
						layer.setTop(layero);
					},
					btn: ['提交', '取消'],
					yes: function (index, layero) {
						//获得右侧数据
						let getData = transfer.getData('groupUsername');
						let username = [];
						for (let i = 0; i < getData.length; i++) {
							username.push(getData[i].value);
						}
						$.ajax({
							url: httpBaseUrl + 'api/saveGroupUsers',
							type: 'GET',
							data: {"usernames": username.toString(), "groupId": data.id.split('_')[1], "siteId": siteId},
							success: function (res) {
								layer.close(index)
								insTb.reload();
								insTb.expandAll();
							}
						})
					}
				})
			} else {
				layer.open({
					type: 1 //此处以iframe举例
					,
					title: '添加小组',
					area: ['500px', '240px'],
					shade: 0.5,
					maxmin: true,
					content: $('#groupType'),
					zIndex: layer.zIndex, //重点1,
					success: function(layero, index) {
						layer.setTop(layero); //重点2
					},
					btn: ['提交', '取消'],
					yes: function(index, layero) {
						//点击确认触发 iframe 内容中的按钮提交
						let name = $("textarea[name='content']").val();
						if (name == "") {
							parent.layer.msg('请输入类别内容');
							return false
						} else {
							$.ajax({
								url: httpBaseUrl + 'api/saveGroup',
								type: 'GET',
								data: {"siteId": siteId, "name": name, "categoryId": data.id},
								success: function (res) {
									layer.close(index);
									insTb.reload();
									insTb.expandAll();
								}
							})
						}
					}
				})
			}

		}
		if (obj.event === 'del') {
			if (data.pid === null) {
				$.ajax({
					url: httpBaseUrl + 'api/deleteGroupCategoryById',
					type: 'POST',
					data: {"categoryId": data.id},
					success: function (res) {
						layer.msg('小组类别删除成功');
						obj.del();
					}
				})
			} else if (data.id.indexOf("_") !== -1){
				$.ajax({
					url: httpBaseUrl + 'api/deleteGroupById',
					type: 'POST',
					data: {"groupId": data.id.split("_")[1]},
					success: function (res) {
						layer.msg('小组删除成功');
						obj.del();
					}
				})
			}
		}
	})
	// 编辑
	treeTable.on('edit(demoTreeTb)', function (obj) {
		if (obj.data.pid === null) {
			$.ajax({
				url: httpBaseUrl + 'api/saveGroupCategory',
				type: 'POST',
				async: false,
				data: {"categoryId": obj.data.id, "siteId": siteId, "name": obj.value},
				success: function (res) {
					layer.msg('修改成功')
				}
			})
		} else if (obj.data.id.indexOf('_') !== -1) {
			$.ajax({
				url: httpBaseUrl + 'api/saveGroup',
				type: 'POST',
				async: false,
				data: {"groupId": obj.data.id.split('_')[1], "categoryId": obj.data.pid, "name": obj.value, "siteId": siteId},
				success: function (res) {
					layer.msg('修改成功')
				}
			})
		}
	})


	// 新增小组分类
	$('.addGroupType').on('click', function (res) {
		layer.open({
			type: 1 //此处以iframe举例
			,
			title: '添加小组类别',
			area: ['500px', '240px'],
			shade: 0.5,
			maxmin: true,
			content: $('#groupType'),
			zIndex: layer.zIndex, //重点1,
			success: function(layero, index) {
				layer.setTop(layero); //重点2
			},
			btn: ['提交', '取消'],
			yes: function(index, layero) {
				//点击确认触发 iframe 内容中的按钮提交
				let name = $("textarea[name='content']").val();
				if (name == "") {
					parent.layer.msg('请输入类别内容');
					return false
				} else {
					$.ajax({
						url: httpBaseUrl + 'api/saveGroupCategory',
						type: 'GET',
						data: {"siteId": siteId, "name": name},
						success: function (res) {
							layer.close(index);
							insTb.reload();
							insTb.expandAll();
						}
					})
				}
			}
		})
	})


	$(".layui-tab").on("click",function(e){
		if($(e.target).is(".layui-tab-close")){
			let categoryId = $(e.target).parent().attr("lay-id");
			let categoryName = $(e.target).parent().text();
			$.ajax({
				url: httpBaseUrl + 'api/deleteGroupCategoryById',
				type: 'GET',
				data: {'categoryId': categoryId},
				success: function (res) {
					layer.msg('小组类别删除成功');
				},
				error: function (res) {
					element.tabAdd('group', {
						title: `${categoryName}`,
						id: `${categoryId}`,
					})
				}
			})
		}
	})

});

//分项切换
$(".field_btn_box a").click(
	function() {
		$(this).addClass("field_btn_select").siblings().removeClass("field_btn_select");
	}
);

//添加/删除一次功能菜单
$(".addnav").click(
	function() {
		$(".savenav").css("display", "inline-block");
		$(".new_nav_box:last").append($(".add_nav_box>.add_nav_single").clone());
	}
);

$(".editnav").click(
	function() {
		$(this).hide();
		$(".savenav").css("display", "inline-block")
		$(".field_btn_box").hide();
		$(".add_nav_box").css("display", "inline");
	}
);
$(".savenav").click(
	function() {
		$(this).hide();
		$(".editnav").css("display", "inline-block");
		$(".add_nav_box").hide();
		$(".field_btn_box").css("display", "inline");
		location.reload();
	}
);

function deletenav(obj) {
	$(obj).parents(".add_nav_single").remove();
}