layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate', 'formSelects'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form,
		laydate = layui.laydate,
		formSelects = layui.formSelects

	//向世界问个好
	//layer.msg('');

	form.render(null, 'stationappointmenttwobox');

	let userSchoolAcademy = ''; // 当前登录人所在院区
	// 获取用户信息
	$.ajax({
		url: 'getCurrentUser',
		type: 'GET',
		success: function (res) {
			let data = res;
			userSchoolAcademy = data.schoolAcademy;
			$("input[name=person]").val(data.cname);
			$("input[name=email]").val(data.email);
			$("input[name=telephone]").val(data.phone);
		}
	});
	let configUid = '';
	let pointStatus = '';
	let instructions = '';
	let fileId = '';
	let maxInterval = ''; //最大预约时间段
	let minInterval = ''; //最小预约时间段
	let openScope = ''; //预约接待对象
	let academyNumber = '';
	//预约须知
	$.ajax({
		url: deviceHost + "getAppBasicSettings",
		type: 'GET',
		async: false,
		data: {
			"configType": configType,
			"insUid": uid
		},
		dataType: "JSON",
		success: function (res) {
			let data = res.data;
			maxInterval = data.maxInterval;
			minInterval = data.minInterval;
			openScope = data.openScope;
			academyNumber = data.academyNumber;
			configUid = data.uid
			pointStatus = data.laboratoryLayoutImagesPointInfo;
			instructions = data.basicAttention;
			fileId = data.laboratoryLayoutImages;
		}
	})
	$.ajax({
		url: deviceHost + 'getAppOpeningCustomFieldList',
		type: 'GET',
		// async: false,
		data: {"configUid": configUid},
		success: function (res) {
			let data = res.data;
			for (let i = 0; i < data.length; i++) {
				if (data[i].displayStyle === "TEXT") {
					let input_text = `<div class="layui-col-lg12 other_field">
                                            <label class="layui-form-label">${data[i].note}:</label>
                                            <div class="layui-input-block">
                                                <input type="text" class="layui-input va_save" name="${data[i].uid}"
                                                       autocomplete="off"  ${data[i].necessary == 1 ? "lay-verify='required'" : ""}/>
                                            </div>
                                        </div>`;
					$('.reason').before(input_text);
				}
				else {
					let input_radio = `<div class="layui-col-lg12 other_field">
                                            <label class="layui-form-label">${data[i].note}:</label>
                                            <div class="layui-input-block">
                                                ${setOptions(data[i].displayStyle, data[i].openSettingCustomFieldValueVOList, data[i].uid, this)}
                                            </div>
                                        </div>`;
					$('.reason').before(input_radio);
				}
				form.render();
			}
		}
	});

	let drawingStyle = {}; // 绘制过程中样式
	let gImageLayer; //涂层绘制
	let gMap; //容器标注
	let gFirstFeatureLayer; // 实例化
	let gFirstMaskLayer; // 涂抹层
	var mv = new Vue({
		el: '#app',
		data() {
			return {
				imageUrl: '',
				pointStatus: '',
				instructions: '',
				fileId: '',
				appTime: '',
				initArr: [],
				selectArr: [],
				popArr: []
			}
		},
		mounted() {
			this.setInformation();
			this.setImage();
			let timeScope = setPeriodTime(new Date('2021-10-13 00:00:00'), new Date('2021-10-14 00:00:00'), 60, '~');
			var appPeriodTime = xmSelect.render({
				el: '#appPeriod',
				radio: true,
				style: {
					width: '180px'
				},
				theme: {color: '#0081ff'},
				toolbar: {show: true},
				data: timeScope,
				on: function (data) {
					var change = data.change;
					$('.appTime').val(change[0].value);
				}
			})
			//选择时间段
			laydate.render({
				elem: '#searchdate',
				type: 'date',
				min: new Date().format("yyyy-MM-dd"),
				done: function (value, date, endDate) {
					$('.appoiontment_time_after').find('label').text(value);
				}
			});
		},
		methods: {
			setInformation() {
				this.pointStatus = pointStatus;
				this.instructions = instructions;
				this.fileId = fileId;
			},
			getFileById(id) {
				return new Promise((resolve, reject) => {
					resourceContainer.getFileById({
						success: function (data) {
							resolve(data.url)
						},
						fail: function (reason) {
							console.log("失败:" + reason);
						},
						fileId: id,
						needToken: true
					});
				});
			},
			async setImage() {
				this.imageUrl = await this.getFileById(this.fileId)
				this.setCoating();
			},

			// 设置涂层
			setCoating() {
				gMap = new AILabel.Map('dot_map', {
					center: {x: 250, y: 177}, // 为了让图片居中
					zoom: 800,
					mode: 'PAN', // 绘制线段
					refreshDelayWhenZooming: true, // 缩放时是否允许刷新延时，性能更优
					zoomWhenDrawing: true,
					panWhenDrawing: true,
					zoomWheelRatio: 5, // 控制滑轮缩放缩率[0, 10), 值越小，则缩放越快，反之越慢
					withHotKeys: true // 关闭快捷键
				});
				gImageLayer = new AILabel.Layer.Image(
					'first-layer-image', // id
					{
						// src: 'http://ali.download.lubanlou.com/group1/M00/03/40/rBJ0pV7jPGeAAtALAAIZ4U7sKWQ213.jpg',
						// src: '../modules/openReservation/static/images/user_head.jpg',
						src: this.imageUrl,
						width: 500,
						height: 354,
						crossOrigin: true, // 如果跨域图片，需要设置为true
						position: { // 左上角相对中心点偏移量
							x: 0,
							y: 0
						},
						grid: { // 3 * 3
							columns: [{color: '#9370DB'}, {color: '#FF6347'}],
							rows: [{color: '#9370DB'}, {color: '#FF6347'}]
						}
					}, // imageInfo
					{name: '第一个图片图层'}, // props
					{zIndex: 5} // style
				);
				gMap.addLayer(gImageLayer);
				// 实例化
				gFirstFeatureLayer = new AILabel.Layer.Feature(
					'first-layer-feature', // id
					{name: '第一个矢量图层'}, // props
					{zIndex: 10} // style
				);
				gMap.addLayer(gFirstFeatureLayer);

				// 涂抹层
				gFirstMaskLayer = new AILabel.Layer.Mask(
					'first-layer-mask', // id
					{name: '第一个涂抹图层'}, // props
					{zIndex: 11, opacity: .5} // style
				);
				gMap.addLayer(gFirstMaskLayer);
				// 绘制结束
				let tracingPointData = []
				if (this.pointStatus != '') {
					tracingPointData = JSON.parse(this.pointStatus)
				}
				this.initArr = tracingPointData;
				for (let i = 0; i < tracingPointData.length; i++) {
					let point = new AILabel.Feature.Point(
						tracingPointData[i].id,
						tracingPointData[i].shape,
						{ name: "预约状态"},
						{ fillStyle: tracingPointData[i].style.fillStyle, lineCap: tracingPointData[i].style.lineCap}
					)
					gFirstFeatureLayer.addFeature(point);
				};

				gMap.events.on('dblClick', (feature, shape) => {
					console.log(feature)
					let pointShape = gFirstFeatureLayer.getTargetFeatureWithPoint(feature.global);
					console.log(pointShape)
					if (pointShape.style.fillStyle === '#e63522') {
						layer.msg('当前工位处于忙碌状态，请预约其他工位');
					} else if (pointShape.style.fillStyle === '#7d7d7d') {
						layer.msg('当前工位暂不开放，请预约其他工位');
					} else {
						const featureUpdate = new AILabel.Feature.Point(
							pointShape.id,
							pointShape.shape,
							{ name: "预约状态"},
							{ fillStyle: '#fcf', lineCap: pointShape.style.lineCap}
						)
						gFirstFeatureLayer.removeFeatureById(pointShape.id);
						gFirstFeatureLayer.addFeature(featureUpdate);
						this.selectArr.push(pointShape.id)
					}
					this.popArr.push(this.selectArr)

				})
			},
			zoomIn() {
				gMap.zoomIn();
			},
			zoomOut() {
				gMap.zoomOut();
			},
			setMode(mode, type) {
				gMap.setMode(mode);
				// 后续对应模式处理
				switch (gMap.mode) {
					case 'PAN': {
						break;
					}
					default:
						break;
				}
			},
			refresh() {
				this.setImage();
			},
			reply() {
				// 撤回操作，记录当前点位，存储当前选择点位，点击撤销时，移除当前最后一个记录，根据愿点位重新上色
				console.log(this.selectArr);
				console.log(this.initArr)

				let id = this.popArr[0].pop();
				for (let i = 0; i < this.initArr.length; i++) {
					if (this.initArr[i].id == id) {
						const featureUpdate = new AILabel.Feature.Point(
							this.initArr[i].id,
							this.initArr[i].shape,
							this.initArr[i].props,
							this.initArr[i].style,
						)
						gFirstFeatureLayer.removeFeatureById(this.initArr[i].id);
						gFirstFeatureLayer.addFeature(featureUpdate);
					}
				}

			},
			savebtn() {
				console.log(this.selectArr)
				let pass = 0;
				let openScopeTwo = 0;
				let appTime = $('.appTime').val();
				if (appTime) {
					let timeArr = appTime.split('~')
					let d1 = new Date('2021-11-11 ' + timeArr[0]);
					let d2 = new Date('2021-11-11 ' + timeArr[1]);
					let model = parseInt(d2 - d1) / 1000 /60 /60;
					// if (minInterval > model || model > maxInterval) {
					// 	pass = 1;
					// }
				}
				if (pass === 1 || !appTime) {
					layer.msg("请选择时间段");
					return false;
				}
				//判断，校内开放是，当前用户有没有预约权限
				if (openScope == 2 && pass === 0) {
					if (academyNumber) {
						let arr = academyNumber.split(',');
						if (userSchoolAcademy) {
							for (let i = 0; i < arr.length; i++) {
								if (arr[i] === userSchoolAcademy.academyNumber) {
									openScopeTwo = 1;
								}
							}
						}
					}
					if (openScopeTwo === 0) {
						layer.msg('当前用户为开放预约权限，请联系管理员处理');
						return false;
					} else {
						let other_arr = []
						$.each($('.other_field'), function (index, obj) {
							let newObj = {};
							newObj[$(obj).find('label').text().replace(/:/g, '')] = $(obj).find('input').attr('class') === 'va_save_checkbox' ? getCheckedBox($(obj).find('input')): $(obj).find('.va_save').val();
							other_arr.push(newObj)
						})
						let appPoint = []
						for (let i = 0; i < this.selectArr.length; i++) {
							for (let j = 0; j < this.initArr.length; j++) {
								if (this.selectArr[i] == this.initArr[j].id) {
									appPoint.push(this.initArr[j])
									j = this.initArr.length
								}
							}
						}
						let obj_all = { "appUser": currentUsername, "appUserMail": $("input[name=email]").val(),
							"appUserPhone": $("input[name=telephone]").val(), "appReason": $("input[name=reason]").val(),
							"configUid": configUid, "extendsFieldValue": other_arr, "appType": configType, "appPoint": appPoint};
						let arr = [];
						$.each($('.appoiontment_time_after'), function (index, obj) {
							let obj_arr = { "appDate": $(obj).find('label').text(), "appTime": $(obj).find('input').val() + ','};
							arr.push(Object.assign(obj_arr, obj_all));
						})

						$.ajax({
							url: `${appointmentHost}/saveAppInfo`,
							type: 'POST',
							async: false,
							data: {"appInfoVOListJson": JSON.stringify(arr)},
							success: function (res) {
								console.log()
								if (res.code === 0) {
									layer.msg('预约成功');
								} else {
									layer.msg(res.msg);
								}
							}
						})
					}

				}
					if (pass === 0 && openScope !== 2) {
						let other_arr = []
						$.each($('.other_field'), function (index, obj) {
							let newObj = {};
							newObj[$(obj).find('label').text().replace(/:/g, '')] = $(obj).find('input').attr('class') === 'va_save_checkbox' ? getCheckedBox($(obj).find('input')): $(obj).find('.va_save').val();
							other_arr.push(newObj)
						})
						let appPoint = []
						for (let i = 0; i < this.selectArr.length; i++) {
							for (let j = 0; j < this.initArr.length; j++) {
								if (this.selectArr[i] == this.initArr[j].id) {
									appPoint.push(this.initArr[j])
									j = this.initArr.length
								}
							}
						}
						let obj_all = { "appUser": currentUsername, "appUserMail": $("input[name=email]").val(),
							"appUserPhone": $("input[name=telephone]").val(), "appReason": $("input[name=reason]").val(),
							"configUid": configUid, "extendsFieldValue": other_arr, "appType": configType, "appPoint": appPoint};
						let arr = [];
						$.each($('.appoiontment_time_after'), function (index, obj) {
							let obj_arr = { "appDate": $(obj).find('label').text(), "appTime": $(obj).find('input').val() + ','};
							arr.push(Object.assign(obj_arr, obj_all));
						})

						$.ajax({
							url: `${appointmentHost}/saveAppInfo`,
							type: 'POST',
							async: false,
							data: {"appInfoVOListJson": JSON.stringify(arr)},
							success: function (res) {
								console.log()
								if (res.code === 0) {
									layer.msg('预约成功');
								} else {
									layer.msg(res.msg);
								}
							}
						})
				} else {
						layer.msg('当前用户暂无预约权限')
				}

			}
		}
	})
});