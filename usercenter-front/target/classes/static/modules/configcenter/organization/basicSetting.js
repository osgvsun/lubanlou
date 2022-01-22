layui.config({
	base:'../../'
}).extend({
	index:'lib/index'
}).use(['index','laypage', 'layer', 'table', 'element', 'form'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form

	//向世界问个好
	layer.msg('进入基础设置');

	form.render(null, 'basicsettingbox');

	//打开新增内容
	var newcontent = {
		newcontent: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '新增内容',
				area: ['580px', '480px'],
				shade: 0.5,
				maxmin: true,
				content: 'newContent.html',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newcontentbtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.newcontent').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newcontent[method] ? newcontent[method].call(this, othis) : '';
	});

	//执行一个表单
	table.render({
		elem: '#basicsetting',
		url: layui.setter.base + 'json/basicSetting.json', //数据接口						
		title: '列表',
		toolbar: '#toolbars',
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
					title: '序号',
					type: 'numbers',
					width: 50
				}, {
					field: 'name',
					title: '名称',
					sort: true
				}, {
					fixed: 'right',
					title: '操作',
					toolbar: '#toolbar',
					width: 110
				}
			]
		],
		id: 'basicsetting',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		limits: [5, 7, 10, 20],
		limit: 5 //每页默认显示的数量
	});

	//监听行工具事件
	table.on('tool(basicsetting)', function(obj) {
		var data = obj.data;

		//打开编辑页面
		if(obj.event === 'edit') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '编辑内容',
				area: ['580px', '480px'],
				shade: 0.5,
				maxmin: true,
				content: 'editContent.html',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#editcontentbtn");
					submit.click();
				}
			});
			//layer.full(index);
		};

		//删除
		if(obj.event === 'del') {
			layer.confirm('是否删除？', {
				title: '提示'
			}, function(index) {
				obj.del();
				layer.close(index);
			});
		}
	});

	var $ = layui.$,
		active = {
			reload: function() {
				var searchbox = $('#searchbox');

				//执行重载
				table.reload('basicsetting', {
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						key: {
							name: searchbox.val()
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