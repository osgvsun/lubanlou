layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form,
		laydate = layui.laydate

	//向世界问个好
	//layer.msg('');

	form.render(null, 'setlabreservationbox');
	var serverHostArray = document.location.href.split('/');
	var serverHost = serverHostArray[0] + "//" + serverHostArray[2] + "";

	//信息
	form.val('setlabreservationbox', {
		"": "" //备注
	});
	// labRoomReservation   是否允许预约
	// labRoomWorker  可预约工位数
	// cdictionaryByIsAudit   预约是否需要审核
	//cdictionaryByAllowSecurityAccess  安全准入
	//accessIsExam  考试准入
	let savecDictionaries = [];
	let authorityList = [];
	let schoolAcademyList = [];
	let flag = '';
	$.ajax({
		url: timetableHost + '/api/labroom/editLabRoomSettingRest',
		type: 'GET',
		async: false,
		data: {"labRoomId": labRoomId},
		success: function (data){
			console.log(data)
			let cDictionaries = data.data.cDictionaries;  // 是否需审核
			savecDictionaries = data.data.cDictionaries;
			authorityList = data.data.authorityList;
			schoolAcademyList = data.data.schoolAcademyList;
			flag = data.data.flag;
			let authLevelOne = data.data.authLevelOne;
			let needAllAudits = data.data.needAllAudits;
			let labRoom = data.data.labRoom;
			let openAcademyAndAuthorities = data.data.openAcademyAndAuthorities;
			console.log(labRoom)
			if (flag){
				let row = `<div class="layui-col-lg4">
							<div class="layui-input-block" style="text-align: left">${authLevelOne}</div>
						  </div>`;
				$('.setMainBody').prepend(row);
			} else {
				if (needAllAudits){
					for (let i = 0; i < needAllAudits.length; i++){
						let row = `<div class="layui-col-lg4 ovh">
								<label class="layui-form-label">是否需要${needAllAudits[i].authNames}审核</label>
								<div class="layui-input-block">
									<input type="radio" name="${needAllAudits[i].needAllAudit}" value="1" title="是" checked="">
									<input type="radio" name="${needAllAudits[i].needAllAudit}" value="2" title="否">
								</div>
							 </div>`;   //needAllAudits
						$('.setMainBody').prepend(row);
					}
				}
			}
			let str = `<div class="layui-col-lg4">
						<label class="layui-form-label">是否允许预约</label>
						<div class="layui-input-block">
							<input type="radio" name="labRoomReservation" value="1" title="是" lay-filter="reservation"
								   ${labRoom.labRoomReservation == 1 ? 'checked' : ''}>
								<input type="radio" name="labRoomReservation" value="2" title="否" lay-filter="reservation" ${labRoom.labRoomReservation == 2 ? 'checked' : ''}>
						</div>
					  </div>
					  <div class="layui-col-lg4 examine">
						<label class="layui-form-label">预约是否需要审核</label>
						<div class="layui-input-block CDictionaryByIsAudit">
						
						</div>
					  </div>
					   <div class="layui-col-lg4 security">
                        <label class="layui-form-label">是否需要安全准入</label>
                        <div class="layui-input-block cdictionaryByAllowSecurityAccess">
                            
                        </div>
                    </div>
                    <div class="layui-col-lg4 modal">
                        <label class="layui-form-label">安全准入形式
                            <div class="font-italic font_grey">（在线考试）</div>
                        </label>
                        <div class="layui-input-block accessIsExam">
                            
                        </div>
                    </div>
			`
			$('.setMainBody').prepend(str);
			for (let i = 0; i < cDictionaries.length; i++){
				let row = `<input type="radio" name="CDictionaryByIsAudit" value="${cDictionaries[i].id}" title="${cDictionaries[i].cname}" lay-filter="examine" ${labRoom.cdictionaryByIsAudit == cDictionaries[i].id ? 'checked' : ''}>`;
				$('.CDictionaryByIsAudit').append(row);
				let securityAccess = `<input type="radio" name="CDictionaryByAllowSecurityAccess" value="${cDictionaries[i].id}" title="${cDictionaries[i].cname}" lay-filter="security" ${labRoom.cdictionaryByAllowSecurityAccess == cDictionaries[i].id ? 'checked' : ''}>`;
				// form.render();
				$('.cdictionaryByAllowSecurityAccess').append(securityAccess);
				let accessIsExam = `<input type="radio" name="accessIsExam" value="${cDictionaries[i].id}" title="${cDictionaries[i].cname}" lay-filter="modal" ${labRoom.accessIsExam == cDictionaries[i].id ? 'checked' : ''}>`;
				$('.accessIsExam').append(accessIsExam);
			}

			if (labRoom.labRoomReservation == 2){
				$(".examine").hide();
				$(".ovh").hide();
				$(".security").hide();
				// $(".modal").hide();
			} else {
				$(".examine").show();
				$(".ovh").show();
				$(".security").show();
				$(".modal").show();
			}

			if (openAcademyAndAuthorities){
				for (let i = 0; i < openAcademyAndAuthorities.length; i++){
					let row =`<tr><td class="multiple_info">
								<font>${openAcademyAndAuthorities[i][2]}</font>
							  </td>
							  <td class="multiple_info">
								<font>${openAcademyAndAuthorities[i][1]}</font>
							  </td>
							  <td>
								<input type="button" class="layui-btn layui-btn-xs layui-btn-danger" value="删除" onclick="deleteOAA('${openAcademyAndAuthorities[i][0]}', this)">
							  </td>
						  </tr>`;
					$('.setList').append(row);
				}
			}


			form.render();


		}
	});
	//监听提交
	form.on('submit(setlabreservationbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引

// 		var data1 = JSON.stringify({
// 			"labRoomId": ${labRoomId},
// 			"page": ${page},
// 			"type": ${type},
// 			"isAppointment": appointment1,
// 			"needAudit": needAudit1,
// 			"realAllAudits": realAllAudits,
// 			"needAllowSecurityAccess": needAllowSecurityAccess1,
// 			"flag": ${flag},
// 			"needExam": needExam1,
// 			"academies": selectedSchoolAcademy,
// 			"authorities": selectedAuthority,
// 			"labRoomId": ${labRoomId},
// //        "needLoan":needLoan1,
// 		});
		console.log(field);
		let obj = {};
		obj['labRoomId'] = labRoomId;
		obj['labRoomReservation'] = field.labRoomReservation;
		obj['needAudit'] = field.CDictionaryByIsAudit;
		obj['needAllowSecurityAccess'] = field.CDictionaryByAllowSecurityAccess;
		obj['needExam'] = field.accessIsExam;
		obj['page'] = 1;
		obj['type'] = 1;
		obj['flag'] = flag;
		if (field.authority != null || field.schoolAcademy != null){
			obj['authorities'] = field.authority.split(",");
			obj['academies'] = field.schoolAcademy.split(",");
		}else {
			obj['authorities'] = [];
			obj['academies'] = [];
		}

		$.ajax({
			url: timetableHost + '/api/labroom/saveLabRoomSettingRest',
			type: 'POST',
			data: obj,
			contentType: 'application/json;charset=UTF-8',
			async: false,
			success: function (res){
				if(data == "success"){
					alert("保存成功");
				}else{
					alert("保存失败");
				}
				// parent.layui.table.reload('setlabreservationbox'); //重载表格
				parent.layer.close(index); //再执行关闭
			},
			error: function (res){
				alert('请求错误!');
			}
		})

		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});

	});

	let openSetObjData = authorityList.map(v => {
		return {"name": v.cname, "value": v.id}
	});
	let schoolAcademyListData = schoolAcademyList.map(v => {
		return {"name": v.academyName, "value": v.academyNumber};
	});
	var openSetObj = xmSelect.render({
		el: '#openSetObj',
		language: 'zn',
		name: 'authority',
		theme: {
			color: '#aaaaaa',
		},
		data: openSetObjData
	})
	var openSetScope = xmSelect.render({
		el: '#openSetScope',
		language: 'zn',
		name: 'schoolAcademy',
		theme: {
			color: '#aaaaaa',
		},
		data: schoolAcademyListData
	})
	form.on('radio(reservation)', function(data) {
		var abc = data.value;
		if(abc == "1") {
			$(".examine").show();
			$(".ovh").show();
			$(".security").show();
			$(".modal").show();
			// $(".object").show();
			// $(".range").show();
		} else {
			$(".examine").hide();
			$(".ovh").hide();
			$(".security").hide();
			// $(".modal").hide();
			// $(".object").hide();
			// $(".range").hide();
		}
	});

	form.on('radio(examine)', function(data) {
		var abc = data.value;
		console.log(abc)
		if(abc == savecDictionaries[0].id) {
			$(".ovh").show();
		} else {
			$(".ovh").hide();
		}
	});

	form.on('radio(security)', function(data) {
		var abc = data.value;
		console.log(savecDictionaries)
		if(abc == savecDictionaries[0].id) {
			$(".modal").show();
		} else {
			console.log(1)
			$(".modal").hide();
		}
	});
	window.getRowObj = function (obj){
		while(obj.tagName.toLowerCase() != "tr"){
			obj = obj.parentNode;
			if(obj.tagName.toLowerCase() == "table")return null;
		}
		return obj;
	}
	window.deleteOAA = function (academyNumber, e){
		$.ajax({
			url: serverHost + '/limsproduct/device/deleteLabRoomStationOpenSetting',
			type: "GET",
			data: {"labRoomId": labRoomId, "academyNumber": academyNumber},
			success: function (res){
				if(res == "success"){
					let tr = getRowObj(e);
					if(tr != null){
						tr.parentNode.removeChild(tr);
					}
				} else if(res == "error"){
					alert("请求错误!");
				}
			}
		})
	}
});