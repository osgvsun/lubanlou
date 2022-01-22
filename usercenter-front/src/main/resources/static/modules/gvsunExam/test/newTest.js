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

	form.render(null, 'newtestbox');

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

    //测试详情默认模板
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
	form.on('submit(newtestbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        var ids = sessionStorage.getItem("num");
        field["status"] = 1;
        field["selectedItemIds"] = ids;
        // $("#newtestbox").submit();
		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		$.ajax({
			url: httpBaseUrl + '/views/test/saveTest?siteId=' + siteId + '&currUsername=' + username,
			type: 'POST',
			data: field,
			success: function (res) {
				console.log(res)
				// $("#newexambox").submit();
				parent.layui.table.reload("testlist");
				parent.layer.close(index); //再执行关闭
				sessionStorage.clear();
			}
		})
	});

	//监听提交
	form.on('submit(savetestbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  
        var ids = sessionStorage.getItem("num");
		//提交 Ajax 成功后，关闭当前弹层并重载表格
		field["status"] = 0;
		field["selectedItemIds"] = ids;

		$.ajax({
			url: httpBaseUrl + '/views/test/saveTest?siteId=' + siteId + '&currUsername=' + username,
			type: 'POST',
			data: field,
			success: function (res) {
				// $("#newexambox").submit();
				parent.layui.table.reload("testlist");
				parent.layer.close(index); //再执行关闭
			}
		})
	});

	//单选判断
	form.on('radio(submittimes)', function(data) {
		var abc = data.value;
		if(abc == "一次") {
			$(".submitnum").hide();
		} else {
			$(".submitnum").show();
		}
	});
	form.on('radio(source)', function(data) {
		var abc = data.value;
		if(abc == "题库") {
			$(".questionbank_box").show();
			$(".testbank").hide();
		} else {
			$(".questionbank_box").hide();
			$(".testbank").show();
		}
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

    //选择学校、班级
    formSelects.on('schoolAcademy', function(id, vals, val, isAdd, isDisabled){
        let len = vals.length;
        let onlyFirstVal = formSelects.value('schoolAcademy');
        if (len == 1){
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
	var addtestquestionbank = {
		addtestquestionbank: function() {
			//layer.msg('添加题库');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '添加题库',
				area: ['100%', '100%'],
				shade: 0.5,
				maxmin: true,
				content: 'addTestQuestionBank?currsection=1',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#addtestquestionbankbtn");
					submit.click();
				},
				cancel: function (){
					window.sessionStorage.removeItem('switchSelect');
				}
			});
			//layer.full(index);
		}
	};
	$('.addtestquestionbank').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		addtestquestionbank[method] ? addtestquestionbank[method].call(this, othis) : '';
	});

	//打开查看题库
	var testquestionbankdetail = {
		testquestionbankdetail: function() {
			//获取section
			var currsection=1;
			// 获取小项id
			var ids = window.sessionStorage.getItem("num");
			console.log(ids)
			console.log(ids);
			if (ids==null||ids==""||ids==undefined){
				alert("当前测试无题目，请添加");
			}else {
                //layer.msg('查看题库');
                var that = this;
                //多窗口模式，层叠置顶
                var index = layer.open({
                    type: 2 //此处以iframe举例
                    ,
                    title: '查看题库',
                    area: ['500px', '420px'],
                    shade: 0.5,
                    maxmin: true,
                    content: 'testQuestionBankDetail?sectionIds='+ ids+ '&sectionId=1&page='+ 1 + '&limit=' + 10,
                });
                //layer.full(index);
			}
		}
	};
	$('.testquestionbankdetail').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		testquestionbankdetail[method] ? testquestionbankdetail[method].call(this, othis) : '';
	});

    //根据分类获取对应的章节列表选项
    form.on('select(changeTestChaptersByModuleType)', function(data) {
        let options;
        var moduleType = data.value;
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
        form.render();
    });
});