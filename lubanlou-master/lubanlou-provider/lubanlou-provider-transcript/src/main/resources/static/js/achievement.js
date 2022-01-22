layui.config({
	version: '1545041465480' //为了更新 js 缓存，可忽略
});

layui.use(['laypage', 'layer', 'table', 'element'], function() {
	var laypage = layui.laypage //分页
		,
		layer = layui.layer //弹层
		,
		table = layui.table //表格
		,
		$ = layui.jquery,
		element = layui.element //元素操作

	//向世界问个好
	//layer.msg('进入成绩列表');

	//执行一个成绩列表表单
	table.render({
		elem: '#achievement',
		url: 'gradebookList', //数据接口
		title: '父项目列表',
		cellMinWidth: 100,
        where: {'module': 'knowledge','siteId': 839,'type':'exam'},
		page: true, //开启分页			
		page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
			layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
			//curr: 5, //设定初始在第 5 页				
			groups: 1, //只显示 1 个连续页码				
			first: false, //不显示首页				
			last: false //不显示尾页
		},
        parseData: function(res){ //res 即为原始返回的数据
            console.log(res)
            return {
                "code": 0, //解析接口状态
                "msg": "", //解析提示文本
                "count": "", //解析数据长度
                "data": res //解析数据列表
            };
        },
		cols: [
			[ //表头
				{
					fixed: 'left',
					title: '序号',
					type: 'numbers',
					width: 50
				}, {
					field: 'pjname',
					title: '项目名称',
					edit: 'text',
					sort: true
				}, {
					fixed: 'right',
					field: 'pjitem',
					title: '学分评定',
					edit: 'text',
					sort: true,
					align: 'center',
                colspan:1
					// templet: '<div>{{ d.credit }}<font class="tab_font">分</font></div>'
				}
			]
		],
		id: 'achievementReload',
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
				table.reload('achievementReload', {
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						key: {
							searchid: searchbox.val()
						}
					}
				}, 'data');
			}
		};

	$('.searchline .layui-btn').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});
});