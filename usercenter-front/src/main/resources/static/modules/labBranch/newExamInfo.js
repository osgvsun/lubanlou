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

	form.render(null, 'newexaminfobox');

	//时间
	laydate.render({
		elem: '#date',
		type: 'datetime',
		range: true
	});
	// /examserver/questionPoolApi/getQuestionTypeByPoolId
	let itemQuestion = []; // 存储题库列表
	$.ajax({
		url: timetableHost + '/api/labroom/newExam',
		type: 'POST',
		async: false,
		data: {"labRoomId": labRoomId},
		success: function (res){
			console.log(res);
			let data = res.data;
			itemQuestion = res.data.itemQuestion;
			for (let i = 0; i < data.itemQuestion.length; i++){
				let option = `<option value="${data.itemQuestion[i].id}">${data.itemQuestion[i].title}</option>`;
				$('#addTrquestionIdTest').append(option);
				form.render();
			}


		}
	})

	let itemTypeTest = []; //存储试题类型列表
	form.on('select(addTrquestionIdTest)', function (data){
		console.log(data.value);
		let questionPoolId = data.value;
		$.ajax({
			url: apiGateWayHost + '/examserver/questionPoolApi/getQuestionTypeByPoolId?questionPoolId=' + questionPoolId,
			type:"POST",
			async: false,
			contentType:"application/json;charset=utf-8",
			dataType:"json",
			// data: {"questionPoolId": questionPoolId},
			success: function (res){
				console.log(res)
				let data = res;
				let arr = [];
				Object.keys(data).forEach(function (key) {
					let b = {title: data[key], value: key};
					arr.push(b)
				});
				itemTypeTest = arr
				console.log(arr)
				for (let i = 0; i < arr.length; i++){
					let option = `<option value="${arr[i].value}">${arr[i].title}</option>`;
					$('#itemTypeTest').append(option);
					form.render();
				}
			}
		})
	})
	//监听提交
	form.on('submit(newexaminfobtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  
		// 新建考试
		console.log(field)
		let newDate = field.date.split(' - ');
		console.log(newDate)
		// let arr = {};
		// arr.id = '';
		// arr.title = field.name;
		// // arr.startDateTest = newDate[0];
		// // arr.dueDateTest = newDate[1];
		// arr.createTime = new Date();
		// arr.type = 1;
		// arr.questionSize = 12;
		let date = field.date.split(" - ");
		field['beginTime'] = date[0];
		field['endTime'] = date[1];
		field['itemType'] = 'LABROOM';
		field['itemUid'] = labRoomId




		let sectionNames = [];     //试题大项
		let questionIds = [];      //所属试题
		let itemTypes = [];        //试题类型
		let itemQuantities = [];   //试题数量
		let itemScores = [];       //每题分值
		$("input[name='sectionName']").each(function(j,item){
			sectionNames.push(item.value)
		});
		$("input[name='questionIdTest']").each(function(j,item){
			questionIds.push(item.value)
		});
		$("input[name='itemTypeTest']").each(function(j,item){
			itemTypes.push(item.value)
		});
		$("input[name='itemQuantityTest']").each(function(j,item){
			itemQuantities.push(item.value)
		});
		$("input[name='itemScoreTest']").each(function(j,item){
			itemScores.push(item.value)
		});
		let arr = {};
		arr['testTitle'] = '测试';
		arr['testScoreTest'] = '12';
		arr['timeLimit'] = '60';
		arr['startDateTest'] = date[0];
		arr['dueDateTest'] = date[1];
		arr['itemQuantities'] = itemQuantities;
		arr['itemScores'] = itemScores;
		arr['itemTypes'] = itemTypes;
		arr['questionIds'] = questionIds;
		arr['sectionNames'] = sectionNames;
		if (field['timeLimitOneTest'] == '2'){
			arr['timeLimitOneTest'] = field.customTime;  // 允许提交次数不能为空
		}
		//必传项
		arr['testFrom'] = 'question';




		// "id": "", "itemQuantities": ["1"], "itemScores": ["12"], "itemTypes": ["4"], "questionIds": ["122"], "sectionNames": ["12"],
		// answerToStudent: "no"
		// content: ""
		// dueDateTest: "2021-05-18 00:00:00"
		// id: ""
		// itemQuantities: ["1"]
		// itemScores: ["12"]
		// itemTypes: ["4"]
		// questionIds: ["122"]
		// sectionNames: ["12"]
		// startDateTest: "2021-05-17 00:00:00"
		// testFrom: "question"
		// testScoreTest: "12"
		// testTitle: "1333"
		// timeLimit: "60"
		// timeLimitOneTest: "12"
		// toStudent: "no"

		// examserver/examApi/saveTest
		$.ajax({
			url: apiGateWayHost + '/examserver/examApi/saveTest',
			type: 'POST',
			data: JSON.stringify(arr),
			contentType:"application/json;charset=utf-8",
			dataType:"json",
			success: function (res){
				let data = {};
				data.id = res;
				data.totalScore = field.totalScore;
				data.accessScore = field.accessScore;
				data.examName = field.examName;
				// data.testName = field.testName;
                data.beginTime = new Date(date[0]);
                data.endTime = new Date(date[1]);
                data.itemType = 'LABROOM';
                data.itemUid = labRoomId


				console.log(res)
				$.ajax({
					url: timetableHost + '/api/labroom/saveExam',
					type: 'POST',
					headers: {'x-datasource': "limsprodcut"},
					contentType: 'application/json',
					data: JSON.stringify(data),
					success: function (res){
						parent.layui.table.reload('examtab'); //重载表格
						parent.layer.close(index); //再执行关闭
						console.log(res)
					}
				})
			}
		})
		console.log(field)
		// beginTime
		// endTime




		// arr.
		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		// parent.layui.table.reload('newexaminfobox'); //重载表格
		// parent.layer.close(index); //再执行关闭
	});

	//普通作业——重复作业
	form.on('radio(timeLimitOneTest)', function(data) {
		let status = data.value;
		if(status == "1") {
			$('#customSpan').hide();
		} else {
			$('#customSpan').show();
		}
	});
	function findItemQuestionTitle(val){
		let title = itemQuestion.find(v => {
			return v.id == val;
		});
		return title.title;
	}
	function findItemTypeTest(val){
		let title = itemTypeTest.find(v => {
			return v.value == val;
		});
		return title.title;
	}
	//添加题库渲染表格
	$('.addQuestion').on('click', function (){
		console.log(1)
		layer.open({
			id: 1,
			type: 1,
			title: '试题详情',
			area: ['500px', '500px'],
			offset: 'auto',
			content: $('#modelQuestion'),
			btn: ['确认', '取消'],
			yes: function (index, lyero){
				console.log($('.addModelQuestion').serializeArray());
				//获取序列化表单对象
				let arrObj = $('.addModelQuestion').serializeArray();
				let questionTbody = `<tr>
										<td><input type="text" name="sectionName" value="${arrObj[0].value}"></td>
										<td><input type="hidden" name="questionIdTest" value="${arrObj[1].value}">${findItemQuestionTitle(arrObj[1].value)}</td>
										<td><input type="hidden" name="itemTypeTest" value="${arrObj[2].value}">${findItemTypeTest(arrObj[2].value)}</td>
										<td><input type="text" name="itemQuantityTest" value="${arrObj[3].value}"></td>
										<td><input type="text" name="itemScoreTest" value="${arrObj[4].value}"></td>
										<td>
                            				<button type="button" class="layui-btn layui-btn-danger" onclick="deleteQuestionList(this)">删除</button>
                        				</td>
									 </tr>`
				$('.questionTbody').append(questionTbody);

				$('#sectionName1').val('');
				$('#itemQuantityTest1').val('');
				$('itemScoreTest1').val('');
				layer.close(index);
			},
			btn2: function (index, layero){
				$('#sectionName1').val('');
				$('#itemQuantityTest1').val('');
				$('itemScoreTest1').val('');
				layer.close(index);
			}
		})
	})
	window.deleteQuestionList = function (obj) {
		console.log($(obj).parent().parent())
		let deleteObj = $(obj).parent().parent();
		deleteObj.remove();
	}

	//信息
	form.val('newexaminfobox', {
		"": "" //备注
	});

});