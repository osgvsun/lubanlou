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

	form.render(null, 'setstationreservationbox');
	var serverHostArray = document.location.href.split('/');
	var serverHost = serverHostArray[0] + "//" + serverHostArray[2] + "";

	let savecDictionaries = [];
	let authorityList = [];
	let schoolAcademyList = [];
	let flag = '';
	$.ajax({
		url: timetableHost + '/api/labroom/editLabRoomStationReserSetting',
		type: 'GET',
		async: false,
		data: {"labRoomId": labRoomId},
		success: function (data){
			console.log(data)
			let labRoom = data.data.labRoom;
			let authLevelOne = data.data.authLevelOne;
			let needAllAudits = data.data.needAllAudits;
			savecDictionaries = data.data.cDictionaries;
			authorityList = data.data.authorityList;
			schoolAcademyList = data.data.schoolAcademyList;
			let openAcademyAndAuthorities = data.data.openAcademyAndAuthorities;
			flag = data.data.flag
			// //是否预约
			// let str = `<div class="layui-col-lg4">
            //             <label class="layui-form-label">是否允许预约</label>
            //             <div class="layui-input-block">
            //                 <input type="radio" name="labRoomReservation" value="1" title="是" lay-filter="reservation"
            //                        checked="">
            //                 <input type="radio" name="labRoomReservation" value="2" title="否" lay-filter="reservation">
            //             </div>
            //            </div>
			// 			<div class="layui-col-lg4 stationnum">
			// 				<label class="layui-form-label">可预约工位数</label>
			// 				<div class="layui-input-block">
			// 					<input type="text" name="labRoomWorker" placeholder="请输入可预约工位数" autocomplete="on"
			// 						   class="layui-input" lay-verify="required"/>
			// 				</div>
			// 			</div>`;
			// $('.setAppointment').prepend(str);
            if (flag) {
            	let row = `<div class="layui-col-lg4">
							<div class="layui-input-block" style="text-align: left">${authLevelOne}</div>
						  </div>`;
				$('.setAppointment').prepend(row);
			} else {
            	if (needAllAudits){
					for (let i = 0; i < needAllAudits.length; i++) {
						let row = `<div class="layui-col-lg4 ovh">
								<label class="layui-form-label">是否需要${needAllAudits[i].authNames}审核</label>
								<div class="layui-input-block">
									<input type="radio" name="${needAllAudits[i].needAllAudit}" value="1" title="是" checked="">
									<input type="radio" name="${needAllAudits[i].needAllAudit}" value="2" title="否">
								</div>
							 </div>`;   //needAllAudits
						$('.setAppointment').prepend(row);
					}
				}
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
	})
	//监听提交
	form.on('submit(setstationreservationbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

		console.log(field)
		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		// parent.layui.table.reload('setstationreservationbox'); //重载表格
		// parent.layer.close(index); //再执行关闭

		let obj = {};
		obj['labRoomId'] = labRoomId;
		obj['isAppointment'] = field.labRoomReservation;
		obj['needAudit'] = field.isAudit;
		obj['labRoomWorker'] = field.labRoomWorker;
		obj['page'] = 1;
		obj['type'] = 1;
		obj['flag'] = flag;
		obj['authorities'] = field.authority;
		obj['academies'] = field.schoolAcademy;
		$.ajax({
			url: timetableHost + '/api/labroom/saveLabRoomStationReserSetting',
			type: 'POST',
			data: obj,
			contentType: 'application/json;charset=UTF-8',
			async: false,
			success: function (res) {
				if(data == "success"){
					alert("保存成功");
				}else{
					alert("保存失败");
				}
				parent.layer.close(index); //再执行关闭
			}
		})
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
	//信息
	form.val('setstationreservationbox', {
		"": "" //备注
	});

	form.on('radio(reservation)', function(data) {
		var abc = data.value;
		if(abc == "1") {
			$(".stationnum").show();
			$(".examine").show();
			$(".object").show();
			$(".range").show();
		} else {
			$(".stationnum").hide();
			$(".examine").hide();
			$(".object").hide();
			$(".range").hide();
		}
	});

	form.on('radio(examine)', function(data) {
		var abc = data.value;
		if(abc == "1") {
			$(".teacher").show();
			$(".director").show();
		} else {
			$(".teacher").hide();
			$(".director").hide();
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