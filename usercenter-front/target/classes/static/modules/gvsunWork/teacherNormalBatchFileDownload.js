layui.use(['form', 'laydate', 'layer', 'transfer'], function() {
	var $ = layui.jquery,
		form = layui.form,
		layer = layui.layer,
		transfer = layui.transfer;

	//获取所有到学生名单，用于制作穿梭数据
	let student = [];
	let studentData; //下载文件不走后台 用于存储数据
	$.ajax({
		url: httpBaseUrl + 'api/correctedByTeacherData',
		type: 'GET',
		async: false,
		data: {"assignmentId": assignmentId, "islate": 2, "siteId": siteId, "page": 1, "limit": 99999},
		success: function (res){
			let data = res.data;
			studentData = res.data;
			student = data.map(v => {
				return {"value": v.username, "title": v.cname}
			})
		}
	});
	//此处过滤数据
	let obj = {};
	student = student.reduce((cur, next) => {
		obj[next.value] ? "" : obj[next.value] = true && cur.push(next);
		return cur;
	}, []) //设置cur默认类型为数组，并且初始值为空的数组

	function filterStudent(d, x){
		let result = []
		for(let i = 0; i < x.length; i++) {
			result.push(d.find((v, t) => {
				return v.username == x[i]
			}))
		}
		return result
	}
	//监听提交
	form.on('submit(teachernormalbatchfiledownloadbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

		//获得右侧数据
		var getData = transfer.getData('student');
		console.log(getData)
		let username = [];
		for (let i = 0; i < getData.length; i++){
			username.push(getData[i].value)
		}
		let selectData = filterStudent(studentData, username)
		let fileId = [];
		console.log(selectData)
		let len = selectData.length;
		for (let i = 0; i < len; i++){
			fileId.push(selectData[i].fileUrl)
		}
		var loading = layer.msg('正在下载', {icon: 16, shade: 0.3, time: 0});
		window.location.href = httpBaseUrl + 'api/batchDownFileZip?ids=' + fileId.toString() + '&assignmentId=' + assignmentId + '&cid=' + siteId;
		let xhr = new XMLHttpRequest();
		xhr.open("GET", httpBaseUrl + 'api/batchDownFileZip?ids=' + fileId.toString() + '&assignmentId=' + assignmentId + '&cid=' + siteId, true);
		xhr.send();
		// 请求结束
		xhr.onloadend = e => {
			if (e.currentTarget.status == 200){
				parent.layui.table.reload('correctlist'); //重载表格
				parent.layer.close(index); //再执行关闭
				layer.close(loading);
			}
		};
	});
	form.render(null, 'teachernormalbatchfiledownloadbox');

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
		value: [] //初始右侧数据
			,
		showSearch: true //显示搜索框
		,id: 'student'
	})

});