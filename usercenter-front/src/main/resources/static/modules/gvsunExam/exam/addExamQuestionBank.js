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

	form.render(null, 'addexamquestionbankbox');

	//监听提交
	form.on('submit(addexamquestionbankbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

        var sectionName = $("#addTrSectionName").val().trim();
        var questionIdTest = $("#addTrquestionIdTest").val();
        var questionIdTestHtml = $("#addTrquestionIdTest option:selected").html();
        var itemTypeTest = $("#addTritemTypeTest").val();
        var itemTypeTestHtml = $("#addTritemTypeTest option:selected").html();
        var gapsNumber = $("#gapsNumber").val();
        var itemScoreTest =  $("#addTritemScoreTest").val().trim();  //每题分值
        if (sectionName == "") {
            alert("请填写大项名称");
            return false;
        }
        if (itemTypeTest == "") {
            alert("请选择试题类型");
            return false;
        }
        var itemQuantityTest = $("#addTritemQuantityTest").val().trim(); //题目数量
        if (itemQuantityTest == "") {
            return false;
        } else {
            var itemCount = questionIdTestHtml.substring(questionIdTestHtml.indexOf("(") + 1, questionIdTestHtml.indexOf(")"));
            if (itemQuantityTest > Number(itemCount)) {
                alert("题库数量不足，请重新设定！");
                return false;
            }
        }
        //计算分数（添加题目的分数不能大于总分数）
        var  allScore = itemScoreTest*itemQuantityTest
        if(testScoreTest<=allScore){
            alert("添加的试题总分值不能大于考试总分")
            return false
        }


        var isReturn = false;
        //判断题目数量是否超过该类型题目数量总数
        $.ajax({
            async: false,
            data: {
                'questionpoolId': parseInt($("#addTrquestionIdTest option:selected").val()),
                'quantity': parseInt(itemQuantityTest),
                'type': parseInt(itemTypeTest),
                'gapsNumber': gapsNumber
            },
            url: httpBaseUrl + "/views/question/checkTestItemCount",
            type: "POST",
            success: function (data) {//AJAX查询成功
                if (data == "failure") {
                    alert("该题型题库数量不足，请重新设定！");
                    isReturn = true;
                }
            }
        });
        if (isReturn) {
            return false;
        }
        if (itemTypeTest == 8) {
            var itemScoreTest = $("#addGapScoreTest").val().trim();
            if (itemScoreTest == "") {
                alert("请填写每空分值");
                return false;
            }
            if (gapsNumber == "") {
                alert("请选择每题空个数");
                return false;
            }
            itemScoreTest *= gapsNumber;
        } else {
            var itemScoreTest = $("#addTritemScoreTest").val();
            if (itemScoreTest == "") {
                alert("请填写试题分值");
                return false;
            }
        }
        //查看是否已录该题库
        var isAddPool = $("#" + questionIdTest + "_" + itemTypeTest).length > 0;
        if (isAddPool && itemTypeTest != 8) {
            alert("该题库已添加，可直接修改数量");
            return false;
        }

        var trString = '<tr id="' + questionIdTest + '_' + itemTypeTest + '">' +
            '<td><input type="text"  name="sectionName" value="' + sectionName + '" />' + '</td>' +
            '<td><input type="hidden" name="itemTypeTest" value="' + itemTypeTest + '"/>' + itemTypeTestHtml + '</td>' +
            '<td><input type="hidden" name="questionIdTest" value="' + questionIdTest + '"/>' + questionIdTestHtml + '</td>' +
            '<td><input type="text"  name="itemQuantityTest" value="' + itemQuantityTest + '"  oninput="changeNumber(this)" /></td>'
        if (itemTypeTest != 8) {
            trString += '<td><input type="text"  name="itemScoreTest" value="' + itemScoreTest + '" oninput="changeNumber(this)" /></td>'
        } else {
            trString +=
                '<td><input type="text"  name="itemScoreTest" value="' + itemScoreTest + '"/></td>' +
                '<input type="hidden" name="gapsNumbers" value="' + gapsNumber + '"/>';
        }
        trString += '<td><button type="button" class="btn"  onclick="deleteThisTr(this)">删除</button></td>' +
            '</tr>';
        $("#addTrSectionName").val("");
        $("#addTritemTypeTest").val("");
        $("#addTritemQuantityTest").val("");
        $("#addTritemScoreTest").val("");
        $("#gapsNumber").val("");
        var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
        parent.$('#itemBody').append(trString);
        parent.layui.table.render();


		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		// parent.layui.table.reload('addexamquestionbankbox'); //重载表格
		parent.layer.close(index); //再执行关闭 
	});

	//信息
	form.val('addexamquestionbankbox', {
		"tag": "test1、test2、test3、test4、test5、test6、test7、test8、test9"
	});

	//题库类别
    $.ajax({
        url: httpBaseUrl + '/api/findAllExamQuestpoolCategory',
        type: 'GET',
        success: function (res) {
            let data = res;
            if (data) {
                for (let i = 0; i < data.length; i++) {
                    let option = `<option value="${data[i].id}">${data[i].title}</option>`;
                    $('#addQuestionpoolCategory').append(option);
                    form.render('select');
                }
            }
        }
    })
	//下拉框判断
	form.on('select(type)', function(data) {
        var questionType = $("#addTritemTypeTest").val();
        var qpCategory = $("#addQuestionpoolCategory").val();
        var isOpen = $("#addQuestionPoolIsOpen").val();
		var abc = data.value;
		if(abc == "5") {
			// $(".tag").show();
			$(".judge").show();
            $(".a6").hide();
            $(".a7").hide();
            $(".a8").hide();
		}else if (abc == "8"){
            $(".a6").show();
            $(".a7").show();
            $(".a8").show();
        } else {
			// $(".tag").hide();
			$(".judge").hide();
			$(".tag_hint").hide();
            $(".a6").hide();
            $(".a7").hide();
            $(".a8").hide();
		}
        $.ajax({
            url: httpBaseUrl + '/views/updateQuestionPool?selectType=' + isOpen + '&categoryId=' + qpCategory + '&questionType=' + questionType + '&cid=' + siteId,
            type: "GET",
            dataType: "json",
            success: function (data) {
                var str = "<option value=" + "" + ">" + "请选择" + "</option>";
                for (var i = 0; i < data.length; i++) {
                    str += "<option value=" + data[i].questionpoolId + ">" + data[i].title + "(" + data[i].tassignmentItemsSize + ")" + "</option>";
                }
                ;
                $("#addTrquestionIdTest").empty();
                $("#addTrquestionIdTest").html(str);
                form.render();

            }
        });
	});

	form.on('select(judge)', function(data) {
		var abc = data.value;
		if(abc == "2") {
			$(".tag_hint").show();
		} else {
			$(".tag_hint").hide();
		}
	});
	form.on('select(qpCategory)',function () {
	    var questionType = $("#addTritemTypeTest").val();
        var qpCategory = $("#addQuestionpoolCategory").val();
        var isOpen = $("#addQuestionPoolIsOpen").val();
        $.ajax({
            url: httpBaseUrl + '/views/updateQuestionPool?selectType=' + isOpen + '&categoryId=' + qpCategory + '&questionType=' + questionType,
            type: "GET",
            dataType: "json",
            success: function (data) {
                var str = "<option value=" + "" + ">" + "请选择" + "</option>";
                for (var i = 0; i < data.length; i++) {
                    str += "<option value=" + data[i].questionpoolId + ">" + data[i].title + "(" + data[i].tassignmentItemsSize + ")" + "</option>";
                }
                ;
                $("#addTrquestionIdTest").empty();
                $("#addTrquestionIdTest").html(str);
                form.render();

            }
        });
    });

    form.on('select(isOpen)',function () {
        var questionType = $("#addTritemTypeTest").val();
        var qpCategory = $("#addQuestionpoolCategory").val();
        var isOpen = $("#addQuestionPoolIsOpen").val();
        $.ajax({
            url: httpBaseUrl + '/views/updateQuestionPool?selectType=' + isOpen + '&categoryId=' + qpCategory + '&questionType=' + questionType,
            type: "GET",
            dataType: "json",
            success: function (data) {
                var str = "<option value=" + "" + ">" + "请选择" + "</option>";
                for (var i = 0; i < data.length; i++) {
                    str += "<option value=" + data[i].questionpoolId + ">" + data[i].title + "(" + data[i].tassignmentItemsSize + ")" + "</option>";
                }
                ;
                $("#addTrquestionIdTest").empty();
                $("#addTrquestionIdTest").html(str);
                form.render();

            }
        });
    });

    form.on('select(findgaps)', function(data) {
        var addTrquestionIdTest = $("#addTrquestionIdTest").val();
        var qpCategory = $("#addQuestionpoolCategory").val();
        var isOpen = $("#addQuestionPoolIsOpen").val();
        var addTritemTypeTest = $("#addTritemTypeTest").val();
        var contextPath = /*[[@{/}]]*/'';
        if (addTritemTypeTest == 8) {
            $.ajax({
                url: httpBaseUrl + '/views/findGapsNumberByQuestionpool?questionpoolId=' + data.value,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    var str = "<option value=" + "" + ">" + "请选择" + "</option>";
                    for (var i = 0; i < data.length; i++) {
                        str += "<option value=" + data[i].gapsNumber + ">" + data[i].gapsNumber + "个空(该题库中有" + data[i].allgaps + "个)" + "</option>";
                    }
                    ;
                    $("#gapsNumber").empty();
                    $("#gapsNumber").html(str);
                    form.render();
                    // $("#gapsNumber").trigger("liszt:updated");

                }
            });
        }
    });
});
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