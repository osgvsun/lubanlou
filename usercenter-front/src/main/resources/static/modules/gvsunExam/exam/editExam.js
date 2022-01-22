var format = function(time, format){
    var t = new Date(time);
    var tf = function(i){return (i < 10 ? '0' : '') + i};
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
        switch(a){
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        }
    })
}
layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form,
		laydate = layui.laydate,
		formSelects = layui.formSelects;

	form.render(null, 'editexambox');

	//获取当前课程
	let course = findCourseSiteById(siteId).title;
	if (course === "全校考试") {
		$('.a1, .a2, .a3').remove();
		$('.a4, .a5').show();
	} else {
		$('.a4, .a5').remove();
		$('.a1, .a2, .a3').show();
	}
	var schoolAcademyNum  //学院编号
	var schoolClassNum  // 班级
	var itemScores   //题目数量
	var itemQuantitys  // 分值
	var testScoreTest //总分值
	var allScore=0 //已经添加的试题分数
	//补考时渲染原课程
	findMakeUpExamList('#oldAssignmentId', siteId, form);

    $.ajax({
        url: httpBaseUrl + "/views/getOneTAssignmentApi",//数据接口
		data: {'assignmentId': assignmentId},
        type: 'GET',
        async: false,
        success: function (res) {
			var timelimitOneTest = res.timelimitOneTest;
			var effectiveDays = res.effectiveDays;
			var flag;
			var effective;
            var start = format(res.startdateTest, 'yyyy-MM-dd HH:mm:ss');
            var due = format(res.duedateTest, 'yyyy-MM-dd HH:mm:ss');
			if(timelimitOneTest!=1){
                flag = '自定义';
                $(".submitnum").show();
			}else {
				flag = 1;
			}
			if (effectiveDays!=0){
				effective = '设置';
				$(".effectivenum").show();
			}else {
				effective = 0;
			}
			if (res.classes != null){
				let schoolClassArr = res.schoolClass;
				let classes = res.classes.split(",");
				var arrayClass = [];
				for (var i = 0; i < schoolClassArr.length; i++){
					let obj = {};
					for (var j = 0;j < classes.length; j++){
						if (i == j){
							obj.name = classes[j];
							obj.value = schoolClassArr[i];
							arrayClass.push(obj);
						}
					}
				}
			}

            //信息
            form.val('editexambox', {
            	"testTitle": res.tAssignmentTitle,
            	"testScoreTest": res.testScoreTest,
            	"testScoreTestShow": res.testScoreTest,
            	"isMakeUpExam": res.isMakeUpExam,
            	"oldAssignmentId": res.oldAssignmentId,
            	"testChapterType": res.testChapterType ==200 ? 2 : res.testChapterType,
            	"mins": res.mins,
				"startdateTest": start,
            	"duedateTest":  due,
            	"passingScore": res.passingScore,
            	"schoolAcademy": res.schoolAcademy,
            	"schoolClass": res.schoolClass,
            	"customTime": flag,
            	"customTime1": timelimitOneTest,
            	"effectiveDays": effective,
            	"effectiveDays1": effectiveDays,
            	"checknameTest": res.toGradebook,
            	"checkname1Test": res.gradeToStudent,
            	"checkname2Test": res.gradeToTotalGrade,
            	"checkname3Test": res.answerToStudent,
            	"testFrom": res.testFrom,
            	"testNeedSubmit": res.needSubmit,
            	"contentTest": res.content,
            	"testId": res.tAssignmentId,
            	"examQuestionpoolCategory": res.examCategory,
            	"examQuestionpool": res.examQuestionpoolId,
            	"evaluation": res.evaluation,
            	"keyword": res.keyword,
            	"conclusion": res.conclusion,
            });
			schoolAcademyNum= res.schoolAcademy
			schoolClassNum= res.schoolClass
			itemScores   =res.itemScores
			testScoreTest = res.testScoreTest
			itemQuantitys = res.itemQuantitys
			//章节渲染
			let chapter = findChapterMap(siteId, res.testChapterType);
			for (let i in chapter) {
				let option = `<option value="${i}">${chapter[i]}</option>`;
				$("#testWkChapterId").append(option);
			}
			//小节渲染
			let lesson = findLessonMap(res.testWkChapterId);
			for (let i in lesson) {
				let option = `<option value="${i}">${lesson[i]}</option>`;
				$("#testWkLessonId").append(option);
			}
			form.val('editexambox', {
				"testWkChapterId": res.testWkChapterId,
				"testWkLessonId": res.testWkLessonId,
			})
        }
    });

	//日期范围
	laydate.render({
		elem: '#duedateTest',
		type: 'datetime',
		format: 'yyyy-MM-dd HH:mm:ss'
		,range: ['#startDate-1', '#endDate-1']
	});

	//监听提交
	form.on('submit(editexambtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
		var allScore = itemQuantitys
        $("#testStatus").val(1);
		if (field.testFrom == "question") {
			if ($('#itemBody').children().length == 0) {
				alert("请添加题库后在保存!");
				return false;
			}
		} else {
			if ($('#examQuestionpool').val() == "") {
				alert("请添加试卷库后在保存!");
				return false;
			}
		}
		$("#editexambox").submit();
		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		parent.layer.close(index); //再执行关闭
		parent.showTable();
	});

	//监听提交
	form.on('submit(saveexambtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  
        $("#testStatus").val(0);
		if (field.testFrom == "question") {
			if ($('#itemBody').children().length == 0) {
				alert("请添加题库后在保存!");
				return false;
			}
		} else {
			if ($('#examQuestionpool').val() == "") {
				alert("请添加试卷库后在保存!");
				return false;
			}
		}
        $("#editexambox").submit();
		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		parent.layui.table.reload('editexambox'); //重载表格
		parent.layer.close(index); //再执行关闭
		parent.showTable();
	});

	//下拉框判断
	form.on('select(sort)', function(data) {
		var abc = data.value;
		if(abc == 1) {
			$(".sort").removeClass("layui-col-lg12").addClass("layui-col-lg4");
			$(".basicexam").show();
            $(".a1").hide();
            $(".a2").hide();
            $(".a3").hide();
		} else {
			$(".sort").removeClass("layui-col-lg4").addClass("layui-col-lg12");
			$(".basicexam").hide();
            $(".a1").show();
            $(".a2").show();
            $(".a3").show();
		}
	});

	//单选判断
	form.on('radio(submittimes)', function(data) {
		var abc = data.value;
		if(abc == 1) {
			$(".submitnum").hide();
		} else {
			$(".submitnum").show();
		}
	});
    form.on('radio(effective)', function(data) {
        var abc = data.value;
        if(abc == 0) {
            $(".effectivenum").hide();
        } else {
            $(".effectivenum").show();
        }
    });
	form.on('radio(source)', function(data) {
		var abc = data.value;
		if(abc == "question") {
			$(".questionbank_box").show();
			$(".testbank").hide();
		} else {
			let findAllExamQuestpool = findAllExamQuestpoolCategory('#examQuestionpoolCategory', form);
			$(".questionbank_box").hide();
			$(".testbank").show();
		}
	});

	$(function () {
		if ($('#question').is(':checked')){
			$(".questionbank_box").show();
			$(".testbank").hide();
		} else {
			$(".questionbank_box").hide();
			$(".testbank").show();
		}
	})

	//执行题库
	$.ajax({
		url: httpBaseUrl + "/api/findTAssCompVoList",
		type: 'GET',
		data: {"assignmentId": assignmentId},
		success: function (res) {
			let data = res;
			if (data.length !== 0) {
				for (let i = 0; i < data.length; i++) {
					let tr = `<tr>
								<td>
									<input type="text" name="sectionName" value="${data[i].sectionName}">
								</td>
								<td>
									<input type="text" name="itemTypeTest" value="${data[i].itemType}" title="${data[i].itemType === 1 ? '多选题' : data[i].itemType === 2 ? '判断题' : data[i].itemType === 4 ? '单选题' : data[i].itemType === 8 ? '填空题' : data[i].itemType === 5 ? '简答题' : ''}">
								</td>
								<td>
									<input type="hidden" name="questionIdTest" value="${data[i].questionpoolId}" style="width: 50px">
									<span>${data[i].title}</span>
								</td>
								<td>
									<input type="text" name="itemQuantityTest" value="${data[i].itemQuantity}" oninput="changeNumber(this)">
								</td>
								<td>
									<input type="text" name="itemScoreTest" value="${data[i].itemScore}" oninput="changeNumber(this)">
								</td>
								<td>
									<button type="button" class="btn" onclick="deleteThisTr(this)">删除</button>								
								</td>
							  </tr>`;
					$('#itemBody').append(tr);
				}
			}
		}
	});

	//监听行工具事件
	table.on('tool(questionbank)', function(obj) {
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

	//打开添加题库
	var addexamquestionbank = {
		addexamquestionbank: function() {
			//layer.msg('添加题库');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 ,//此处以iframe举例,
				title: '添加题库',
				area: ['100%', '100%'],
				shade: 0.5,
				maxmin: true,
				content: 'addExamQuestionBank?testScoreTest='+(testScoreTest-allScore),
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#addexamquestionbankbtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};

	$('.addexamquestionbank').on('click', function() {
		$.each($('#itemBody>tr'), function (index, obj) {
			var td3= $(obj).find('td:eq(3)>input').val()
			var td4 = $(obj).find('td:eq(4)>input').val()
			allScore+= td3*td4;
		})
		if(allScore>=testScoreTest){
			layer.msg("添加的试题总分值不能大于考试总分")
		}else {
			var othis = $(this),
				method = othis.data('method');
			addexamquestionbank[method] ? addexamquestionbank[method].call(this, othis) : '';
		}

	});
    //根据分类获取对应的章节列表选项
    form.on('select(changeTestChaptersByModuleType)', function(data) {
    	console.log(data);
        var options = '<option value="">请选择</option>';
        var moduleType = data.value;
        if (moduleType != '') {
			$('#testWkChapterId').empty();
			let data = 	findChapterMap(siteId, moduleType);
			if (data) {
				options = `<option>请选择</option>`;
				$('#testWkChapterId').append(options);
				for (let i in data) {
					options = `<option value="${i}">${data[i]}</option>`
					$('#testWkChapterId').append(options);
				}
				let lessonOptions = '<option value="">请选择</option>';
				$('#testWkLessonId').html(lessonOptions)
			}
        }
        form.render();
    });
    //根据章节回去对应的课时列表选项
    form.on('select(changeTestLessonsByChapterId)', function(data) {
		var options = '';
		var chapterId = data.value;
		$('#testWkLessonId').empty();
		let result = findLessonMap(chapterId);
		if (result) {
			options = `<option>请选择</option>`;
			$('#testWkLessonId').append(options);
			for (let i in result) {
				options = `<option value="${i}">${result[i]}</option>`;
				$('#testWkLessonId').append(options);
			}
		}
		form.render();
    });

	//显示学院列表
	let findAllCollege = findAllAcademys();
	let re= schoolAcademyNum.split(",")
	if (findAllCollege){
		for (let i in findAllCollege) {
			for(let j in re ) {
				if (findAllCollege[i].academyNumber !== re[j]) {
					let option = `<option value="${findAllCollege[i].academyNumber}">${findAllCollege[i].academyName}</option>`;
					$('#schoolAcademy').append(option);
				} else {
					let option = `<option selected value="${findAllCollege[i].academyNumber}">${findAllCollege[i].academyName}</option>`;
					$('#schoolAcademy').append(option);
				}
			}

		}
		formSelects.render();
	}
	//回显班级
	if(schoolAcademyNum){
		let re= schoolAcademyNum.split(",");
		let classNum= schoolClassNum;
		let classLists=[];
		for(let i in re){
			 classLists= classLists.concat(findAllClasses(re[i]))
		}
		if(classLists){
			for (let j in classLists) {
				for(let k in classNum ) {
					if (classLists[j].classNumber !== classNum[k]) {
						let option = `<option value="${classLists[j].classNumber}">${classLists[j].className}</option>`;
						$('#schoolClass').append(option);
					} else {
						let option = `<option selected value="${classLists[k].className}">${classLists[k].className}</option>`;
						$('#schoolClass').append(option);
					}
				}

			}
			formSelects.render();
		}

	}

	//选择学院加载班级信息
	formSelects.on('schoolAcademy', function(id, vals, val, isAdd, isDisabled){
		let len = vals.length;
		let onlyFirstVal = formSelects.value('schoolAcademy');
		if (len == 1){
			formSelects.undisabled('schoolClass');
			let findAllClass = findAllClasses(onlyFirstVal[0].value);
			if (findAllClass) {
				for (let i in findAllClass) {
					let option = `<option value="${findAllClass[i].classNumber}">${findAllClass[i].className}</option>`;
					$('#schoolClass').append(option);
					formSelects.render();
				}
			}
		} else {
			formSelects.disabled('schoolClass');
		}
	}, true);

	//试卷库渲染
	if ($("input[name='testFrom']").val() === 'testpool') {
		let findAllExamQuestpool = findAllExamQuestpoolCategory('#examQuestionpoolCategory', form);

	}

    //选择试卷库
    form.on('select(changeExamQuestionpoolCategory)', function(data) {
        var options = '<option value="">请选择试卷库</option>';
		let getExamQuestionpool = findExamQuestionpool(data.value, '#examQuestionpool', form);
    });
});
//删除当前已添加的题库
function deleteThisTr(obj) {
    $(obj).parent().parent().remove();
}
//输入内容是数字
function changeNumber(obj) {
    var price = $(obj).val();
    price = price.replace(/[^\d.]/g, "");
    //必须保证第一个为数字而不是.
    price = price.replace(/^\./g, "");
    //保证只有出现一个.而没有多个.
    price = price.replace(/\.{2,}/g, ".");
    //保证.只出现一次，而不能出现两次以上
    price = price.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    $(obj).val(price);
}