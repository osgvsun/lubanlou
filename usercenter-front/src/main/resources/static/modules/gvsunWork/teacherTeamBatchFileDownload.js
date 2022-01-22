layui.use(['form', 'element', 'layer', 'transfer'], function() {
	var $ = layui.jquery,
		form = layui.form,
		layer = layui.layer,
		transfer = layui.transfer;

	//获取所有到学生名单，用于制作穿梭数据
	let student = [];
	let studentData; //下载文件不走后台 用于存储数据
	$.ajax({
		url: httpBaseUrl + 'api/teacherteamCorrectListApi',
		type: 'GET',
		async: false,
		data: {"assignmentId": assignmentId, "islate": 2, "page": 1, "limit": 999},
		success: function (res){
			studentData = res.data;
		}
	})
	$.ajax({
		url: httpBaseUrl + 'api/getGroupsByAssignmentId',
		type: 'GET',
		async: false,
		data: {"assignmentId": assignmentId},
		success: function (res) {
			student = res.map(v => {
				return {"value": v.groupId, "title": v.title}
			})
		}
	})
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
				return v.groupId == x[i]
			}))
		}
		return result
	}
	//监听提交
	form.on('submit(teacherteambatchfiledownloadbtn)', function(data) {
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
		console.log(selectData)
		let fileId = [];
		let len = selectData.length;
		for (let i = 0; i < len; i++){
			fileId.push(selectData[i].fileIds)
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

	form.render(null, 'teacherteambatchfiledownloadbox');

	//小组信息复制到穿搜框
	transfer.render({
		elem: '#student',
		id: 'student',
		title: ['未选择小组', '已选择小组'] //自定义标题
			,
		data: student //数据
			//,width: 150 //定义宽度
			,
		height: 264 //定义高度
			,
		value: ["2", "5"] //初始右侧数据
			,
		showSearch: true //显示搜索框
	})

});