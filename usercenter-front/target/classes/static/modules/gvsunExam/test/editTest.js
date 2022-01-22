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

	//向世界问个好
	//layer.msg('');

	form.render(null, 'edittestbox');

	let itemIds;
    let schoolAcademyNum;
    let schoolClassNum;
    $.ajax({
        url: httpBaseUrl + "/views/getOneTAssignmentApi",//数据接口
        data: {'assignmentId': assignmentId},
        type: 'GET',
        async: false,
        success: function (res) {
            itemIds = res.itemIds;
            var timelimitOneTest = res.timelimitOneTest;
            var flag;
            var start = format(res.startdateTest, 'yyyy-MM-dd HH:mm:ss');
            var due = format(res.duedateTest, 'yyyy-MM-dd HH:mm:ss');
            if(timelimitOneTest!=1){
                flag = '自定义';
                $(".submitnum").show();
            }else {
                flag = 1;
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
            form.val('edittestbox', {
                "testTitle": res.tAssignmentTitle,
                "testScoreTest": res.testScoreTest,
                "testScoreTestShow": res.testScoreTest,
                "testChapterType": res.testChapterType,
                "testWkChapterId": res.testWkChapterId,
                "testWkLessonId": res.testWkLessonId,
                "startdateTest": start,
                "duedateTest":  due,
                "customTime": flag,
                "customTime1": timelimitOneTest,
                "checknameTest": res.toGradebook,
                "checkname1Test": res.gradeToStudent,
                "checkname2Test": res.gradeToTotalGrade,
                "checkname3Test": res.answerToStudent,
                "contentTest": res.content,
                "testId": res.tAssignmentId,
                "schoolAcademy": res.schoolAcademy,
                "schoolClass": res.schoolClass
            });
            schoolAcademyNum= res.schoolAcademy
            schoolClassNum= res.schoolClass

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
            form.val('edittestbox', {
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
	form.on('submit(edittestbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        field["status"] = 1;
        field["selectedItemIds"] ="";
        for(var i in itemIds){
            if(i==itemIds.length-1){
                field["selectedItemIds"]+=itemIds[i]
            }else {
                field["selectedItemIds"]+=itemIds[i]+','
            }
        }
        console.log(field["selectedItemIds"])
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
        field["status"] = 1;
        field["selectedItemIds"] ="";
        for(var i in itemIds){
            if(i==itemIds.length-1){
                field["selectedItemIds"]+=itemIds[i]
            }else {
                field["selectedItemIds"]+=itemIds[i]+','
            }
        }
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

    formSelects.on('schoolAcademy', function(id, vals, val, isAdd, isDisabled){
        let len = vals.length;
        let onlyFirstVal = formSelects.value('schoolAcademy');
        if (len == 1){
            formSelects.undisabled('schoolClass');
            $.ajax({
                url: httpBaseUrl + '/views/findAllClasses?schoolAcademy=' + onlyFirstVal[0].value,
                type: "GET",
                async: false,
                // dataType: "json",
                success: function (data) {
                    console.log(data)
                    var str = "<option value=" + "" + ">" + "请选择" + "</option>";
                    for (var i = 0; i < data.length; i++) {
                        str += "<option value=" + data[i].classNumber + ">" + data[i].className + "</option>";
                    }
                    $("#schoolClass").empty();
                    // $("#schoolClass").html(str);
                    $("#schoolClass").append(str);
                    // form.render();
                    formSelects.render('schoolClass');
                    // $("#schoolClass").trigger("chosen:updated");
                }
            });
        } else {
            formSelects.disabled('schoolClass');
        }
    }, true);

	//打开添加题库
	var addtestquestionbank = {
		addtestquestionbank: function() {
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
				content: 'addTestQuestionBank',
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
				}
			});
			layer.full(index);
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
				content: '../gvsunexam/testQuestionBankDetail?sectionIds='+ itemIds.toString()+ '&sectionId='+ currsection+ '&page='+ 1 + '&limit=' + 10,
			});
			layer.full(index);
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



});