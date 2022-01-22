layui.use(['form', 'element', 'laydate', 'laypage', 'table', 'layer', 'carousel', 'echarts'], function() {
	var $ = layui.jquery,
		admin = layui.admin,
		form = layui.form,
		element = layui.element,
		laydate = layui.laydate,
		laypage = layui.laypage,
		table = layui.table,
		layer = layui.layer,
		carousel = layui.carousel,
		echarts = layui.echarts;

	//向世界问个好
	layer.msg('进入预约总览');

	form.render(null, 'appointmentoverviewbox');

	//信息
	form.val('appointmentoverviewbox', {
		"": "" //备用
	});

	//实验室使用时间段
	laydate.render({
		elem: '#labdate',
		type: 'date',
		range: true,
		value: '2021-08-05 - 2021-09-30'
	});

	//执行一个表单
	table.render({
		elem: '#openappointmentranking',
		url: layui.setter.base + 'modules/openReservation/static/json/openAppointmentRanking.json', //数据接口
		title: '列表',
		cellMinWidth: 100,
		page: true, //开启分页			
		page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
			layout: ['count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
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
					field: 'lab',
					title: '实验室',
					sort: true
				}, {
					field: 'machine',
					title: '机时数',
					sort: true
				}, {
					field: 'person',
					title: '人次数',
					sort: true
				}
			]
		],
		id: 'openappointmentranking',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		limits: [5, 7, 10, 20],
		limit: 5 //每页默认显示的数量
	});

	//人员使用时间段
	laydate.render({
		elem: '#userdate',
		type: 'date',
		range: true,
		value: '2021-08-05 - 2021-09-30'
	});

	//执行一个表单
	table.render({
		elem: '#useruseranking',
		url: layui.setter.base + 'modules/openReservation/static/json/userUseRanking.json', //数据接口
		title: '列表',
		cellMinWidth: 100,
		page: true, //开启分页			
		page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
			layout: ['count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
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
					title: '姓名',
					sort: true
				}, {
					field: 'appointment',
					title: '预约次数',
					sort: true
				}, {
					field: 'machine',
					title: '机时数',
					sort: true
				}
			]
		],
		id: 'useruseranking',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		limits: [5, 7, 10, 20],
		limit: 5 //每页默认显示的数量
	});

	//实验室整体开放时间段
	laydate.render({
		elem: '#labopendate',
		type: 'date',
		range: true,
		value: '2021-08-05 - 2021-09-30'
	});
});

//图表
layui.use(["admin", "carousel"], function() {
	var e = layui.$,
		a = (layui.admin, layui.carousel),
		t = layui.element,
		i = layui.device();
	e(".layadmin-carousel").each(function() {
		var t = e(this);
		a.render({
			elem: this,
			width: "100%",
			arrow: "none",
			interval: t.data("interval"),
			autoplay: t.data("autoplay") === !0,
			trigger: i.ios || i.android ? "click" : "hover",
			anim: t.data("anim")
		})
	}), t.render("progress")
}), layui.use(["carousel", "echarts"], function() {
	var e = layui.$,
		a = (layui.carousel, layui.echarts),
		t = [],
		//标准柱状图
		i = [{
			title: {
				text: "开放预约时间",
				//subtext: "副标题"
			},
			tooltip: {
				trigger: "axis"
			},
			legend: {
				data: ["机时数", "人次数"]
			},
			calculable: !0,
			xAxis: [{
				type: "category",
				data: ["实验室1", "实验室2", "实验室3", "实验室4", "实验室5", "实验室6"]
			}],
			yAxis: [{
				type: "value"
			}],
			series: [{
				name: "机时数",
				type: "bar",
				data: [2, 4, 6, 8, 10, 12],
				markPoint: {
					data: [{
						type: "max",
						name: "最大值"
					}, {
						type: "min",
						name: "最小值"
					}]
				},
				markLine: {
					data: [{
						type: "average",
						name: "平均值"
					}]
				}
			}, {
				name: "人次数",
				type: "bar",
				data: [10, 20, 30, 40, 50, 60],
				markPoint: {
					data: [{
						name: "年最高",
						value: 60,
						xAxis: 5,
						yAxis: 65,
						symbolSize: 18
					}, {
						name: "年最低",
						value: 10,
						xAxis: 0.2,
						yAxis: 11
					}]
				},
				markLine: {
					data: [{
						type: "average",
						name: "平均值"
					}]
				}
			}]
		}],
		n = e("#basic_bar").children("div"),
		l = function(e) {
			t[e] = a.init(n[e], layui.echartsTheme), t[e].setOption(i[e]), window.onresize = t[e].resize
		};

	//标准条形图	
	if(n[0]) {
		l(0);
		var h = [],
			f = [{
				title: {
					text: "人员使用排行",
					//subtext: "副标题"
				},
				tooltip: {
					trigger: "axis"
				},
				legend: {
					data: ["机时数"]
				},
				calculable: !0,
				xAxis: [{
					type: "value",
					boundaryGap: [0, .01]
				}],
				yAxis: [{
					type: "category",
					data: ["用户1", "用户2", "用户3", "用户4", "用户5", "用户6"]
				}],
				series: [{
					name: "机时数",
					type: "bar",
					data: [10, 30, 50, 70, 90, 110]
				}]
			}],
			g = e("#basic_strip").children("div"),
			S = function(e) {
				h[e] = a.init(g[e], layui.echartsTheme), h[e].setOption(f[e]), window.onresize = h[e].resize
			};

		if(g[0]) {
			S(0);
			var u = [],
				x = [{
					title: {
						//text: "实验室整体开放情况",
						//subtext: "副标题"
					},
					tooltip: {
						trigger: "axis"
					},
					legend: {
						data: ["2020年", "2019年"]
					},
					calculable: !0,
					xAxis: [{
						type: "category",
						boundaryGap: !1,
						data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月"]
					}],
					yAxis: [{
						type: "value",
						axisLabel: {
							formatter: "{value} °C"
						}
					}],
					series: [{
						name: "2020年",
						type: "line",
						data: [120, 200, 250, 170, 350, 510, 80],
						markPoint: {
							data: [{
								type: "max",
								name: "最大值"
							}, {
								type: "min",
								name: "最小值"
							}]
						},
						markLine: {
							data: [{
								type: "average",
								name: "平均值"
							}]
						}
					}, {
						name: "2019年",
						type: "line",
						data: [320, 140, 100, 280, 450, 320, 240],
						markPoint: {
							data: [{
								name: "年最低",
								value: 100,
								xAxis: 2,
								yAxis: 101
							}, {
								name: "年最高",
								value: 450,
								xAxis: 4,
								yAxis: 455
							}]
						},
						markLine: {
							data: [{
								type: "average",
								name: "平均值"
							}]
						}
					}]
				}],
				v = e("#basic_line").children("div"),
				b = function(e) {
					u[e] = a.init(v[e], layui.echartsTheme), u[e].setOption(x[e]), window.onresize = u[e].resize
				};

			//其他备用	
			if(v[0]) {
				b(0);
			}
		}
	}
});