layui.use(['form', 'element', 'laydate', 'laypage', 'table', 'layer'], function() {
	var $ = layui.jquery,
		admin = layui.admin,
		form = layui.form,
		element = layui.element,
		laydate = layui.laydate,
		laypage = layui.laypage,
		table = layui.table,
		layer = layui.layer;

	form.render(null, 'securitylistbox');
	//实验室名字显示
	if (cookie.get("labRoomName")) {
		$("legend>span").text(cookie.get("labRoomName"));
	}
	//实验室面积、容量、管理员
	if (cookie.get("labRoomArea")) {
		$(".li_cell_box>.li_cell:eq(0)").append('面积: - ' + cookie.get("labRoomArea") + '㎡')
	}
	if (cookie.get("labRoomCapacity")) {
		$(".li_cell_box>.li_cell:eq(1)").append('容量: - ' + cookie.get("labRoomCapacity") + '人')
	}
	if (cookie.get("admins")) {
		$(".li_cell_box>.li_cell:eq(2)").append('管理员: - ' + cookie.get("admins"))
	}

	//执行一个表单
	var securitylist = table.render({
		elem: '#securitylist',
		url:  accessHost + '/getAccessEntityResult', //数据接口
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
					title: '序号',
					type: 'numbers',
					width: 40
				}, {
					field: 'username',
					title: '阅读人员',
					sort: true
				}, {
					field: 'createdTime',
					title: '阅读时间',
					sort: true
				}
			]
		],
		id: 'securitylist',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		limits: [5, 7, 10, 20],
		limit: 5 //每页默认显示的数量
	});

	var $ = layui.$,
		active = {
			reload: function() {
				var searchbox = $('#searchbox');

				//执行重载
				table.reload('securitylist', {
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						username: searchbox.val()
					}
				}, 'data');
			}
		};

	$('.search_line .layui-btn').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});
	//导出名单
	$('.export_list').on('click', function () {
		layer.msg('导出中······请稍等片刻');
		$.ajax({
			url:  accessHost + '/getAccessEntityResult?page=1&limit=9999', //数据接口,
			async: false,
			success: function (res) {
				let exportData = res.data;
				exportData.forEach((item, index, arr) => {
					item.createdTime = item.createdTime + '\t';
				});
				table.exportFile('securitylist',res.data, 'xls'); //导出数据
			}
		})
	})
});

//传递子页面锚
$(function() {
	$(".field_btn_box a").click(function() {
		var name = $(this).attr("name");
		top.location.hash = name; //设置锚点
	});
	$(".breadcrumb_top .breadcrumb_btn").click(function() {
		var name = $(this).attr("name");
		top.location.hash = name; //设置锚点
	});
	$(".layui-tab-title li a").click(function() {
		var name = $(this).attr("name");
		top.location.hash = name; //设置锚点
	});
});