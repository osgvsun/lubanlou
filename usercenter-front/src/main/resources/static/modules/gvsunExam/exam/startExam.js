layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form,
		laydate = layui.laydate
	$.ajax({
		url: httpBaseUrl + '/api/findEditTestVoById',
		type: 'GET',
		data: {"assignmentId": assignmentId},
		success: function (res) {
			$('.basic_content').find('span').html(res.content);
		}
	})
	form.render(null, 'startexambox');
	if(!isLink){
		$('.bottom_btnbox').css("display", "none");
	}else {
		$('.bottom_btnbox').css("display", "block");
	}
	$('#startexambtn').on('click', function() {
		console.log("22222222222222222222222222222")
		//判断考试次数
		var flag
		$.ajax({
			async: false,
			data: {'examId': assignmentId, "username": username},
			url: httpBaseUrl + "/views/isExamCanAnswer",
			type: "POST",
			success: function (data) {
				flag = data;
			},
			error: function (e) {
			}
		});
	if(flag) {
		//考试创建副本获取test_parent_id
		$.ajax({
			url: httpBaseUrl + '/views/newExamPaper',
			type: 'GET',
			async: false,
			data: {"examId": assignmentId, "username": username},
			success: function (res) {
				examUrl = 'beginExam?simulation=' + 0 + '&examId=' + res + '&page=1'
			}
		})
		location.href = examUrl;
	}else {
		alert("没有更多作答次数");
	}
	});




});