layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		element = layui.element,
		form = layui.form,
		laydate = layui.laydate,
		$ = layui.jquery,
		formSelects = layui.formSelects;

	form.render(null, 'newexambox');

	//获取当前课程
	let course = findCourseSiteById(siteId).title;
	console.log(course)
	if (course === "全校考试") {
		$('.a1, .a2, .a3').remove();
		$('.a4, .a5').show();
	} else {
		$('.a4, .a5').remove();
		$('.a1, .a2, .a3').show();
	}

	//补考时渲染原课程
	findMakeUpExamList('#oldAssignmentId', siteId, form);
	//考试通知默认模板
	var temp = `    1、考生必须自觉服从监考员等考试工作人员管理，不得以任何理由妨碍监考员等考试工作人员履行职责，不得扰乱考场及其他考试工作地点的秩序。 
					<br>
					2、开考信号发出后才能开始答题。
					<br>
					3、在考场内须保持安静、不准吸烟，不准喧哗，不准交头接耳、左顾右盼、打手势、做暗号，不准夹带、旁窥、抄袭或有意让他人抄袭，不准传抄答案或交换试卷、答题卡，不准将试卷、答题卡或草稿纸带出试室。
					<br>
					4、遇试卷有问题或无法开始考试等问题，可举手询问；涉及试题内容的疑问，不得向监考人员询问。
`;
	$('#defaultAdd').on('click', function () {
		$('#contentTest').text(temp);
	});

	//日期范围
	laydate.render({
		elem: '#duedateTest',
		type: 'datetime',
		format: 'yyyy-MM-dd HH:mm:ss'
		,range: ['#startDate-1', '#endDate-1']
	});
	//监听提交
	form.on('submit(newexambtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
		$("#testStatus").val(1);
		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
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
		$("#newexambox").submit();
		parent.layer.close(index); //再执行关闭
		parent.showTable();
		window.parent.location.reload();
	});

	//监听提交
	form.on('submit(saveexambtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
		$("#testStatus").val(0);
		//$.ajax({});
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
		$("#newexambox").submit();
		parent.layer.close(index); //再执行关闭
		parent.showTable();
		window.parent.location.reload();
	});

	//下拉框判断
	form.on('select(sort)', function(data) {
		console.log(data.elem); //得到select原始DOM对象
		console.log(data.value); //得到被选中的值
		console.log(data.othis); //得到美化后的DOM对象
		let abc = data.value;
		if(abc == 1) {
			$(".sort").removeClass("layui-col-lg12").addClass("layui-col-lg4");
			$(".basicexam").show();
            $(".a1").hide();
            $(".a2").hide();
            $(".a3").hide();
            $(".a4").hide();
            $(".a5").hide();
            $("#testChapterType").removeAttr("lay-verify");
			$("#testWkChapterId").removeAttr("lay-verify");
			if ($('#oldAssignmentId').attr("lay-verify") == undefined){
				$('#oldAssignmentId').attr("lay-verify", "required");
			}
		} else {
			$(".sort").removeClass("layui-col-lg4").addClass("layui-col-lg12");
			$(".basicexam").hide();
            $(".a1").show();
            $(".a2").show();
            $(".a3").show();
            $(".a4").show();
            $(".a5").show();
			$('#oldAssignmentId').removeAttr("lay-verify");
			if ($("#testChapterType").attr("lay-verify") == undefined){
				$("#testChapterType").attr("lay-verify", "required");
				$("#testWkChapterId").attr("lay-verify", "required");
			}

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

	//执行题库
	// table.render({
	// 	elem: '#questionbank',
	// 	url: layui.setter.base + "json/questionbank.json", //数据接口
	// 	title: '题库',
	// 	page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
	// 		layout: ['count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
	// 		curr: 1, //设定初始在第 5 页
	// 		groups: 1, //只显示 1 个连续页码
	// 		first: false, //不显示首页
	// 		last: false //不显示尾页
	// 	},
	// 	cols: [
	// 		[ //表头
	// 			{
	// 				fixed: 'left',
	// 				title: '序号',
	// 				width: 50,
	// 				align: 'center',
	// 				type: 'numbers'
	// 			}, {
	// 				field: 'name',
	// 				title: '试题大项',
	// 				minWidth: 100,
	// 				sort: true
	// 			}, {
	// 				field: 'type',
	// 				title: '试题类型',
	// 				minWidth: 100,
	// 				sort: true
	// 			}, {
	// 				field: 'from',
	// 				title: '所属题库',
	// 				minWidth: 100,
	// 				sort: true
	// 			}, {
	// 				field: 'num',
	// 				title: '试题数量',
	// 				minWidth: 100,
	// 				sort: true
	// 			}, {
	// 				field: 'score',
	// 				title: '每题分值(仅用于本次考试)',
	// 				minWidth: 100,
	// 				sort: true
	// 			}, {
	// 				title: '操作',
	// 				width: 65,
	// 				align: 'center',
	// 				toolbar: '#toolbar'
	// 			}
	// 		]
	// 	],
	// 	data: table,
	// 	skin: 'line', //表格风格
	// 	even: true,
	// 	id: 'questionbank'
	// });

	//监听行工具事件
	// table.on('tool(questionbank)', function(obj) {
	// 	var data = obj.data;
	//
	// 	//删除
	// 	if(obj.event === 'del') {
	// 		layer.confirm('是否删除？', {
	// 			title: '提示'
	// 		}, function(index) {
	// 			obj.del();
	// 			layer.close(index);
	// 		});
	// 	}
	// });

	// 打开添加题库
	var addexamquestionbank = {
		addexamquestionbank: function() {
			//layer.msg('添加题库');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '添加题库',
				area: ['500px', '420px'],
				shade: 0.5,
				maxmin: true,
				content: 'addExamQuestionBank?testScoreTest=100',
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
		var othis = $(this),
			method = othis.data('method');
		addexamquestionbank[method] ? addexamquestionbank[method].call(this, othis) : '';
	});
	//根据分类获取对应的章节列表选项
    form.on('select(changeTestChaptersByModuleType)', function(data) {
        var options = '';
        var moduleType = data.value;
        console.log(moduleType)
        if (moduleType != '') {
			$('#testWkChapterId').empty();
			let data = 	findChapterMap(siteId, moduleType);
			if (data) {
				options = `<option value="">请选择</option>`;
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
       		options = `<option value="">请选择</option>`;
			$('#testWkLessonId').append(options);
       		for (let i in result) {
       			options = `<option value="${i}">${result[i]}</option>`;
       			$('#testWkLessonId').append(options);
			}
		}
        // document.getElementById("testWkLessonId").innerHTML = options;
        form.render();
    });

    //显示学院列表
	let findAllCollege = findAllAcademys();
	if (findAllCollege){
		for (let i in findAllCollege) {
			let option = `<option value="${findAllCollege[i].academyNumber}">${findAllCollege[i].academyName}</option>`;
			$('#schoolAcademy').append(option);
			formSelects.render();
		}
	}

	//选择班级
	formSelects.on('schoolAcademy', function(id, vals, val, isAdd, isDisabled){
		let len = vals.length;
		let onlyFirstVal = formSelects.value('schoolAcademy');
		if (len == 1){
			formSelects.undisabled('schoolClass');
			// $.ajax({
			// 	url: 'findAllClasses?schoolAcademy=' + onlyFirstVal[0].value,
			// 	type: "GET",
			// 	async: false,
			// 	// dataType: "json",
			// 	success: function (data) {
			// 		console.log(data)
			// 		var str = "<option value=" + "" + ">" + "请选择" + "</option>";
			// 		for (var i = 0; i < data.length; i++) {
			// 			str += "<option value=" + data[i].classNumber + ">" + data[i].className + "</option>";
			// 		}
			// 		$("#schoolClass").empty();
			// 		// $("#schoolClass").html(str);
			// 		$("#schoolClass").append(str);
			// 		// form.render();
			// 		formSelects.render('schoolClass');
			// 		// $("#schoolClass").trigger("chosen:updated");
			// 	}
			// });
			var findAllClass = {};
			findAllClass = findAllClasses(onlyFirstVal[0].value);
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
	if ($("input[name='testFrom']") === 'testpool') {
		let findAllExamQuestpool = findAllExamQuestpoolCategory('#examQuestionpoolCategory', form);

	}

    form.on('select(changeExamQuestionpoolCategory)', function(data) {
		findExamQuestionpool(data.value, '#examQuestionpool', form);
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
