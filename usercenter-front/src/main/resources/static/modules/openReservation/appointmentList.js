layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form,
		laydate = layui.laydate;

	form.render(null, 'appointmentlistbox');

	//预约时间段
	let arr = setPeriodTime(new Date('2021-10-13 00:00:00'), new Date('2021-10-14 00:00:00'), 60, '-');
	var appPeriodTime = xmSelect.render({
		el: '#appPeriod',
		radio: true,
		style: {
			width: '180px'
		},
		theme: {color: '#0081ff'},
		toolbar: {show: true},
		data: arr
	})
	let usernameSearch = setUsername();
	let labs = setLabs('#labs');
	//打开批量审核
	var batchappointmentlist = {
		batchappointmentlist: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '批量审核',
				area: ['500px', '350px'],
				shade: 0.5,
				maxmin: true,
				content: 'batchAppointmentList',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#batchappointmentlistbtn");
					submit.click();
				}
			});
			layer.full(index);
		}
	};
	$('.batchappointmentlist').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		batchappointmentlist[method] ? batchappointmentlist[method].call(this, othis) : '';
	});

	setAppointement(1, 10);
	function setAppointement(page, limit, appUser, appType, labId, appPeriod) {
		var index = layer.load(1, {
			shade: [0.1,'#fff'], //0.1透明度的白色背景
			content: '正在加载我的预约...',
			success: function (layero) {
				layero.find('.layui-layer-content').css({
					'padding-top': '40px',//图标与样式会重合，这样设置可以错开
					'width': '200px'//文字显示的宽度
				});
			}
		});
		$('#my_appointment').empty();
		$.ajax({
			url: `${appointmentHost}/appList/${page}/${limit}`,
			type: 'GET',
			data: {"appUser": appUser, "appType": appType, "labId": labId, "appPeriod": appPeriod},
			success: function (res) {
				let data = res.data;
				if (!data || res.code !== 0) {
					let emptyTr = `<tr><td colspan="12" style="text-align: center">暂无数据</td></tr>`;
					$('#my_appointment').append(emptyTr);
				} else {
					for (let i = 0; i < data.length; i++) {
						let tr = `<tr>
								<td>${i + 1}</td>
								<td>${data[i].deviceName == null ? "" : data[i].deviceName}</td>
								<td>${data[i].appTypeName}</td>
								<td>${data[i].appDate}</td>
								<td>${data[i].appTime}</td>
								<td>${data[i].appTotalTime}</td>
								<td>${data[i].appPointNumber}</td>
								<td>${data[i].appUser == null ? "" : data[i].appUser}</td>
								<td></td>
								<td>${data[i].admins == null ? "" : data[i].appUser}</td>
								<td>
									<button type="button" class="layui-btn layui-btn-green layui-btn-xs" 
									onclick='detail(${JSON.stringify(data[i])})'>查看</button>
								</td>
							   </tr>`;
						$('#my_appointment').append(tr);
						setPage(page, limit, res.count, appUser, appType, labId, appPeriod)
					}
				}

			},
			error: function (res) {
				let emptyTr = `<tr><td colspan="12" style="text-align: center">接口异常～</td></tr>`;
				$('#my_appointment').append(emptyTr);
			},
			complete: function (xhr, ts) {
				layer.close(index);
			}
		})
	}
	function setPage(page, limit, count, appUser, appType, labId, appPeriod) {
		laypage.render({
			elem: 'page',
			count: count,
			first: '首页',
			last: '尾页',
			limit: limit,
			curr: page,
			prev: '<em>←</em>',
			next: '<em>→</em>',
			theme: '#1E9FFF',
			layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
			jump: function(obj, first) {
				if (!first){
					setAppointement(obj.curr, obj.limit, appUser, appType, labId, appPeriod)
				}
			}
		});
	}
	window.detail = function (res) {
		var index = layer.open({
			type: 2 //此处以iframe举例
				,
			title: '查看',
			area: ['500px', '480px'],
			shade: 0.5,
			maxmin: true,
			content: 'appointmentListDetail',
			success: function (layero, index) {
				let iframe = window['layui-layer-iframe' + index];
				// 向子页面的全局函数child传参
				iframe.child(JSON.stringify(res));
			}
		});
	}
	// chaxun
	$('.search_sure').on('click', function () {
		let appUser = usernameSearch.getValue('valueStr');
		let appType = $('.app_type').val();
		let labId = labs.getValue('valueStr');
		let appPeriod = appPeriodTime.getValue('valueStr');
		setAppointement(1, 10, appUser, appType, labId, appPeriod);
	})
	$('.reset_from').on('click', function () {
		$('#myappointmentbox')[0].reset();
		usernameSearch.setValue([ ]);
		appPeriodTime.setValue([ ]);
		labs.setValue([ ]);
		setAppointement(1, 10);
	})
});