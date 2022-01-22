layui.use(['layer', 'element', 'form'], function() {
	var layer = layui.layer,
		$ = layui.jquery,
		form = layui.form;

	form.render(null, 'labqualificationbox');
	var currentauth = cookie.get('currauth'); //存储当前权限
	var statusCenter = cookie.get('status'); // 判断从哪一个入口来源
	//获取fu容器用于渲染页面labqualificationbox
	let labqualificationbox = document.getElementById('labqualificationbox');
    //根据templateId，取数据
	getExperimentCenter();
	var data;
	// sort 配置指标当前业务排序
	// var sort = sort;
	function getList(id, configType) {
		$('.levelIndicators').html('');
		$.ajax({
			url: apiGateWayHost +'/configcenter/api/configIndicator/list',
			type: 'GET',
			async: false,
			data: {templateId: id, step: 1, page: 1, limit: 999},
			success: function (res) {
				let sort = res.total + 1;
				data = res.data.filter(v => {
					return v.id == listId;
				});
				if (data != null){
					//以及标题
					let configIndicatorDTOS = data[0].configIndicatorDTOS;
					$('.first-submit').attr('onclick', `sureTemplate(${configType}, ${data[0].id}, ${sort}, ${id}, this, 4)`)
					if (configIndicatorDTOS.length !== 0) {
						for (let i = 0; i < configIndicatorDTOS.length; i++) {
							let levelIndicators = `<div class="layui-card-header">${configIndicatorDTOS[i].indicatorCname}
														<input type="button" class="layui-btn layui-btn-mid editbtn-level" value="编辑" ${configIndicatorDTOS[i].configIndicatorDTOS.length === 0 ? "" : "style='display: none'"}/>
														<input type="button" class="layui-btn layui-btn-mid save-level" value="保存" style="display: none" onclick="sureTemplate(${configType}, ${configIndicatorDTOS[i].id}, ${sort}, ${id}, this, 1)"/>
														<input type="reset" class="layui-btn layui-btn-mid cancel-level" value="取消" style="display: none"/>								
												   </div>
												   <div class="layui-card-body">
													<div class="layui-form-item" ${configIndicatorDTOS[i].configIndicatorDTOS.length === 0 && configIndicatorDTOS[i].comment ? "" : "style='display: none'"}>
														<div class="layui-input-block level-input">
														  <textarea name="title" required placeholder="请输入指标内容" class="layui-textarea" readonly>${configIndicatorDTOS[i].comment ? configIndicatorDTOS[i].comment : ''}</textarea>
														</div>
													</div>	
													<div class="fill_box secondaryIndicators${i}">
													 
													</div>
												   </div>
													`;
							$('.levelIndicators').append(levelIndicators);
							let configIndicatorDTOSS = configIndicatorDTOS[i].configIndicatorDTOS;
							if (configIndicatorDTOSS.length !== 0) {
								for (let j = 0; j < configIndicatorDTOSS.length; j++) {
									let secondaryIndicators = `<div class="fill_box_content">
																	<div class="fbc_tit">${configIndicatorDTOSS[j].indicatorCname}
																	   <input type="button" class="layui-btn layui-btn-sm editbtn-second" value="编辑" ${configIndicatorDTOSS[j].configIndicatorDTOS.length === 0 ? "" : "style='display: none'"}/>
																	   <input type="button" class="layui-btn layui-btn-sm save-level" value="保存" style="display: none" onclick="sureTemplate(${configType}, ${configIndicatorDTOSS[j].id}, ${sort}, ${id}, this, 2)"/>
														 			   <input type="reset" class="layui-btn layui-btn-sm cancel-level" value="取消" style="display: none"/>
																	<div class="layui-form-item second-textarea" ${configIndicatorDTOSS[j].configIndicatorDTOS.length === 0 && configIndicatorDTOSS[j].comment ? "" : "style='display: none'"}>
																		<div class="layui-input-block level-input">
																		  <textarea name="title" required placeholder="请输入指标内容" class="layui-textarea" readonly>${configIndicatorDTOSS[j].comment ? configIndicatorDTOSS[j].comment : ''}</textarea>
																		</div>
													                </div>
																	</div>

																	<div class="fbc_info">
																		<div class="layui-row layui-col-space10">
																		   <div class="fbc_info_content level3Indicators${j}">
																		   </div>

																		   
																		</div>
																	</div>
															   </div>`;
									$('.secondaryIndicators' + i).append(secondaryIndicators);
									let configIndicatorDTOSSS = configIndicatorDTOSS[j].configIndicatorDTOS;
									if (configIndicatorDTOSSS.length !== 0) {
										for (let k = 0; k < configIndicatorDTOSSS.length; k++) {
											let level3Indicators = `<div class="fbc_info_content">
																		<div class="fbc_tit">${configIndicatorDTOSSS[k].indicatorCname}
																			<input type="button" class="layui-btn  layui-btn-sm editbtn-level" value="编辑" ${configIndicatorDTOSSS[k].configIndicatorDTOS.length === 0 ? "" : "style='display: none'"}/>
																			<input type="button" class="layui-btn  layui-btn-sm save-level" value="保存" style="display: none" onclick="sureTemplate(${configType}, ${configIndicatorDTOSSS[k].id}, ${sort}, ${id}, this, 3)"/>
																			<input type="reset" class="layui-btn  layui-btn-sm cancel-level" value="取消" style="display: none"/>								
																	    </div>
																    </div>
																	<div class="layui-card-body" ${configIndicatorDTOSSS[k].comment? "style='padding: 0'" : "style='display: none'"}>
																		<div class="layui-form-item">
																			<div class="layui-input-block level-input">
																			  <textarea name="title" required placeholder="请输入指标内容" class="layui-textarea" readonly>${configIndicatorDTOSSS[k].comment ? configIndicatorDTOSSS[k].comment : ''}</textarea>
																			</div>
																		</div>
																    </div>`;
											$('.level3Indicators' + j).append(level3Indicators);
										}
									}
								}
							} else {
								$('.secondaryIndicators' + i).remove();
							}


						}
					}

				}

				$('.editbtn-level').on('click', function () {
					let state = $(this).closest('.layui-card-header').next().children().first().css('display');
					let fbc_info_content = $(this).closest('.fbc_info_content').next().css('display');
					$(this).css('display', 'none');
					$(this).next().fadeToggle("slow");
					$(this).next().next().fadeToggle("slow");
					if (state === "none" || fbc_info_content === "none") {
						$(this).closest('.layui-card-header').next().children().first().fadeToggle("slow");
						$(this).closest('.layui-card-header').next().children().first().find('textarea').removeAttr('readonly').focus();
						$(this).closest('.fbc_info_content').next().fadeToggle("slow");
						$(this).closest('.fbc_info_content').next().find('textarea').removeAttr('readonly').focus();

					} else {
						$(this).closest('.layui-card-header').next().children().first().find('textarea').removeAttr('readonly').focus();
						$(this).closest('.fbc_info_content').next().find('textarea').removeAttr('readonly').focus();
					}
				});

				$('.cancel-level').on('click', function () {
					$(this).css('display', 'none');
					$(this).prev().css('display', 'none');
					$(this).prev().prev().fadeToggle();
					$(this).closest('.layui-card-header').next().children().first().find('textarea').attr('readonly', true);
					$(this).next().find('textarea').attr('readonly', true);
					$(this).closest('.fbc_info_content').next().children().first().find('textarea').attr('readonly', true);
				});
				$('.editbtn-second').on('click', function () {
					let state = $(this).next().next().next().css('display');
					$(this).css('display', 'none');
					$(this).next().fadeToggle();
					$(this).next().next().fadeToggle()
					if (state === "none") {
						$(this).next().next().next().fadeToggle();
						$(this).next().next().next().find('textarea').removeAttr('readonly').focus();
					} else {
						$(this).next().next().next().find('textarea').removeAttr('readonly').focus();
					}

				})
			}

		})
		form.render();
	}

	let selectValue = 0;
	form.on('checkbox(level-input)', function(data){
		let elem = data.elem;
		let checked = data.elem.checked;
		selectValue = data.value;
		let state = $(elem).closest('.layui-col-md12').next().css('display');
		$(elem).closest('.layui-col-md12').next().fadeToggle("slow");
		$(elem).closest('.layui-col-md12').next().find('input:first-child').val($(elem).attr('title'));
		let inputAll = $(elem).closest('.layui-col-md12').find('input');
		$(inputAll).each(function (i, e) {
			if (elem !== e && checked) {
				$(e).attr('disabled', true);
			}
			if (!checked) {
				$(e).removeAttr('disabled');
			}
		})
	});
	window.sureTemplate = function (configType, parentId, sort, templateId, obj, flag, edit) {
		let configIndicatorDTOs = [];
		let configIndicatorDTO = {};
		let templateDTO = {};
		let indicatorCname = '';
		if (flag === 1) {
			indicatorCname = $(obj).closest('.layui-card-header').next().children().first().find('textarea').val();
		}
		if (flag === 2) {
			indicatorCname = $(obj).next().next().find('textarea').val();
		}
		if (flag === 3) {
			// indicatorCname = $(obj).prev().find('input:first-child').val();
			indicatorCname = $(obj).closest('.fbc_info_content').next().children().first().find('textarea').val();
		}
		if (edit === 'edit') {
			configIndicatorDTO["id"] = selectValue;
			configIndicatorDTO["indicatorCname"] = indicatorCname;
		} else {
			configIndicatorDTO["id"] = parentId;
			configIndicatorDTO["standardScore"] = '1';
			configIndicatorDTO["comment"] = indicatorCname;
		}
		configIndicatorDTOs.push(configIndicatorDTO);
		templateDTO["processStep"] = 1;
		templateDTO["templateId"] = templateId;
		templateDTO["configIndicatorDTOS"] = configIndicatorDTOs;

		configIndicatorDTOs.push(configIndicatorDTO);
		templateDTO["processStep"] = 1;
		templateDTO["templateId"] = templateId;
		templateDTO["configIndicatorDTOS"] = configIndicatorDTOs;

		let list = JSON.stringify(templateDTO);
		$.ajax({
			url: apiGateWayHost + '/configcenter/api/template/templateAndIndicator',
			type: 'POST',
			data: list,
			contentType: 'application/json;charset=utf-8',
			dataType: 'json',
			success: function (res) {
				$('.short_btn').next().css('display', 'none');
				if (res.code == "200") {
					layer.msg('编辑成功');
					getList(templateId, configType);
				}

			}

		})
	}
	// getExperimentCenter();
	//根据房间Id去获取实验中心id
	function getExperimentCenter() {
		$.ajax({
			url: apiGateWayHost + '/timetable/api/labroom/getLabCenterByLabRoomId',
			type: 'GET',
			async: false,
			data: {labRoomId: labRoomId},
			success: function (res) {
				let data = res.data;
				if (data){
					getTemplateId(data)
				}
			}
		})
	}
	//根据实验中心id取templateId  //sort
	function getTemplateId(id) {
		$.ajax({
			url: apiGateWayHost + '/configcenter/api/template/infoByBusinessIdAndConfigType',
			type: 'GET',
			async: false,
			data: {BusinessId: id},
			success: function (res) {
				if (res == null){
					getList(res.data);
					window.sessionStorage.setItem("templateId", res.data);
				} else {
					getList(res.data[0].id, res.data[0].configType);
					window.sessionStorage.setItem("templateId", res.data[0].id);
				}

			}
		})
	};
	//根据当前权限显示界面
	$(function () {
		if ((currentauth !== 'LABMANAGER' && currentauth !== 'EXCENTERDIRECTOR' && currentauth !== 'ACADEMYLEVELM' && currentauth !== 'SUPERADMIN') || statusCenter === 'center') {
			$('.editbtn-level, .editbtn-second').remove();
		}
	})
});
