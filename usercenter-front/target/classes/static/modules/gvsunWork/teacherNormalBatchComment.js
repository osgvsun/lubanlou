layui.use(['form', 'transfer'], function() {
	var $ = layui.jquery,
		form = layui.form,
		transfer = layui.transfer;
	//监听提交
	form.on('submit(teachernormalbatchcommentbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
		//获得右侧数据
		let getData = transfer.getData('student');
		let usernames = []; // 存放学生列表
		for (let i = 0; i < getData.length; i++){
			usernames.push(getData[i].value);
		}
		$.ajax({
			url: httpBaseUrl + 'api/commonWorkBatchComment',
			type: 'POST',
			data: {"assignmentId": parentData, "usernames": usernames.toString(), "comments": field.comment, "siteId": siteId},
			success: function (res){
				parent.layer.msg("评分成功");
				parent.layui.table.reload('correctlist'); //重载表格
				parent.layer.close(index); //再执行关闭
			}
		});
	});

	form.render(null, 'teachernormalbatchcommentbox');


	//获取所有到学生名单，用于制作穿梭数据
	let student = [];
	$.ajax({
		url: httpBaseUrl + 'api/getSiteStudents',
		type: 'GET',
		async: false,
		data: {"siteId": siteId},
		success: function (res) {
			console.log(res)
			let data = res;
			student = data.map(v => {
				return {"value": v.username, "title": v.cname}
			})
		}
	})

	//此处过滤数据
	let obj = {};
	student = student.reduce((cur, next) => {
		obj[next.value] ? "" : obj[next.value] = true && cur.push(next);
		return cur;
	}, []) //设置cur默认类型为数组，并且初始值为空的数组
	//成员信息复制到穿搜框
	transfer.render({
		elem: '#student',
		title: ['未选择成员', '已选择成员'] //自定义标题
			,
		data: student //数据
			//,width: 150 //定义宽度
			,
		height: 264 //定义高度
			,
		showSearch: true, //显示搜索框
		id: 'student'
	})

});