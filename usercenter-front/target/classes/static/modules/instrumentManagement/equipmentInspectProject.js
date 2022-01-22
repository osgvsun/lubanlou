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

	form.render(null, 'equipmentinspectprojectbox');

	//基本信息渲染
	let basicInformation = JSON.parse(localStorage['basicInformation']);
	$('.deviceName').text(basicInformation.deviceName + '(' + basicInformation.schoolDevice + ')');
	$('.li_cell:eq(0)').append(basicInformation.devicePattern);
	$('.li_cell:eq(1)').append(basicInformation.lcCenterName + '(' + basicInformation.departmentNumber + ')');
	$('.li_cell:eq(2)').append(basicInformation.labRoomName);
	$('.li_cell:eq(3)').append(basicInformation.manufacturer);
	$('.li_cell:eq(4)').append(basicInformation.devicePrice + '元');

	let configSpecimenUid = window.sessionStorage.getItem("configSpecimenUid");
	$.ajax({
		url: httpDeviceUrl + 'getSpecimenItemList',
		type: 'GET',
		data: {"configSpecimenUid": configSpecimenUid},
		success: function (res) {
			let data = res;
			if (data.code === 0 && data.data.length !== 0) {
				let childData = group(res.data, 'itemName');
				console.log(childData)
				for (let i = 0; i < childData.length; i++) {
					let content = `<div class="layui-colla-item">
								<h2 class="layui-colla-title">【项目名称】
									<span>${childData[i].key}</span>
								</h2>
								<div class="colla_item_btn">
									<label class="layui-btn layui-btn-xs newinspectprojectcharge"
										   data-method="newinspectprojectcharge" onclick="newinspectprojectcharge('${childData[i].data[0].uid}')">添加收费项</label>
									<label class="layui-btn layui-btn-xs layui-btn-danger" onclick="deleteSpecimenItem('${childData[i].data[0].uid}', this)">删除</label>
								</div>
								<div class="layui-colla-content layui-show">
									<div class="layui-row layui-col-space10">
										<table class="layui-table tbody${i}">
										  <thead>
											<tr>
											  <th>ID</th>
											  <th>收费名称</th>
											  <th>校内收费</th>
											  <th>校外收费</th>
											  <th>备注</th>
											  <th>操作</th>
											</tr>
										  </thead>
										  <tbody>
										  
										  </tbody>
										</table>
									</div>
								</div>
							</div>`;
					$('.space_collapse').append(content);
					let data = childData[i].data
					let newData = data.filter(v => {
						return v.billingUid !== null;
					})
					for (let j = 0; j < newData.length; j++) {

						let tbady = `<tr>
										<td>${j + 1}</td>
										<td>${newData[j].billingName}</td>
										<td>${newData[j].billingInsideAcademy}</td>
										<td>${newData[j].billingOutsideSchool}</td>
										<td>${newData[j].billingInfo}</td>
										<td><a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del" onclick="deleteBilling('${newData[j].billingUid}', this)">删除</a></td>
									 </tr>`;
						$('.tbody' + i).append(tbady);
					}
					table.init('test', {

					});
				}
				form.render();
			} else {
				layer.msg(data.msg);
			}

		}
	});

	// 页面数据重构
	//数据结果重构
	function group(arr, key) {
		let map = {}, arrList = [];
		for (let i = 0; i < arr.length; i++) {
			let newArr = arr[i];
			if (!map[newArr[key]]) {
				arrList.push({
					key: newArr[key],
					data: [newArr]
				});
				map[newArr[key]] = newArr;
			} else {
				for (let j = 0; j < arrList.length; j++) {
					let d = arrList[j];
					if (d.key == newArr[key]) {
						d.data.push(newArr);
						break;
					}
				}
			}
		}
		console.log(arrList)
		return arrList;
	}
	//监听提交
	form.on('submit(equipmentinspectprojectbtn)', function(data) {
		var field = data.field; //获取提交的字段

		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		parent.layui.table.reload('equipmentinspectprojectbox'); //重载表格
		layer.msg('已保存');
	});

	//信息
	form.val('equipmentinspectprojectbox', {
		"": "" //备用
	});

	//打开新增检测项目
	var newinspectproject = {
		newinspectproject: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '新增检测项目',
				area: ['500px', '170px'],
				shade: 0.5,
				maxmin: true,
				content: 'newInspectProject',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newinspectprojectbtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.newinspectproject').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newinspectproject[method] ? newinspectproject[method].call(this, othis) : '';
	});

	//打开新增收费项
	window.newinspectprojectcharge = function (uid) {
		var that = this;
		//多窗口模式，层叠置顶
		var index = layer.open({
			type: 2 //此处以iframe举例
			,
			title: '新增收费项',
			area: ['500px', '420px'],
			shade: 0.5,
			maxmin: true,
			content: 'newInspectProjectCharge',
			zIndex: layer.zIndex //重点1
			,
			success: function(layero, index) {
				// layer.setTop(layero); //重点2
				let iframe = window['layui-layer-iframe' + index];
				iframe.child(uid);
			},
			btn: ['确定', '取消'],
			yes: function(index, layero) {
				//点击确认触发 iframe 内容中的按钮提交
				var submit = layero.find('iframe').contents().find("#newinspectprojectchargebtn");
				submit.click();
			}
		});
	}

	//执行一个表单
	table.render({
		elem: '#inspectprojectcharge',
		url: httpDeviceUrl + 'getSpecimenItemList', //数据接口
		where: {"configSpecimenUid": configSpecimenUid},
		title: '列表',
		cellMinWidth: 100,
		page: true, //开启分页			
		limit: 0,
		cols: [
			[ //表头
				{
					fixed: 'left',
					title: '序号',
					type: 'numbers',
					width: 50
				}, {
					field: 'billingName',
					title: '收费名称',
					sort: true
				}, {
					field: 'billingInsideAcademy',
					title: '校内收费',
					sort: true,
					templet: function (d) {
						return d.billingInsideAcademy + d.payUnit;
					}
				}, {
					field: 'billingOutsideSchool',
					title: '校外收费',
					sort: true,
					templet: function (d) {
						return d.billingOutsideSchool + d.payUnit
					}
				}, {
					field: 'billingInfo',
					title: '备注',
					sort: true
				}, {
					fixed: 'right',
					title: '操作',
					toolbar: '#inspectprojectchargetoolbar',
					width: 80
				}
			]
		],
		id: 'inspectprojectcharge',
		data: table,
		skin: 'line', //表格风格			
		even: false,
	});

	//监听行工具事件
	table.on('tool(inspectprojectcharge)', function(obj) {
		var data = obj.data;
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
		inspectprojectchargeactive = {
			reload: function() {
				var searchbox = $('#inspectprojectchargesearchbox');

				//执行重载
				table.reload('inspectprojectcharge', {
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

	$('.search_line .inspectprojectchargesearch').on('click', function() {
		var type = $(this).data('type');
		inspectprojectchargeactive[type] ? inspectprojectchargeactive[type].call(this) : '';
	});
	window.deleteSpecimenItem = function (id, obj) {
		layer.confirm('是否删除？', {
			title: '提示'
		}, function(index) {
			$.ajax({
				url: httpDeviceUrl + 'delSpecimenItem',
				type: 'POST',
				data: {"uid": id},
				success: function (res) {
					console.log(res)
					if (res.code === 0){
						$(obj).closest('.layui-colla-item').remove();
						layer.close(index);
					} else {
						layer.msg(res.msg);
					}
				}
			})
		});
	}

	window.deleteBilling = function (id, obj) {
		layer.confirm('是否删除？', {
			title: '提示'
		}, function(index) {
			$.ajax({
				url: httpDeviceUrl + 'delSpecimenBilling',
				type: 'POST',
				data: {"uid": id},
				success: function (res) {
					if (res.code === 0){
						$(obj).closest('tr').remove();
						layer.close(index);
					} else {
						layer.msg(res.msg);
					}
				}
			})
		});
	}
});

//全部收起
$(".collapse_hide").click(
	function() {
		$(".layui-colla-content").removeClass("layui-show");
	}
);

//全部展开
$(".collapse_show").click(
	function() {
		$(".layui-colla-content").addClass("layui-show");
	}
);

