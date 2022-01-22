layui.config({
	version: '1545041465480' //为了更新 js 缓存，可忽略
});

layui.use(['laypage', 'layer', 'table', 'element'], function() {
	var admin = layui.admin,
		laypage = layui.laypage //分页
		,
		layer = layui.layer //弹层
		,
		table = layui.table //表格
		,
		$ = layui.jquery,
		element = layui.element //元素操作

	// 获取当前用户的
	$.ajax({
		url: 'getCurrentUser',
		type: 'GET',
		async: false,
		data: {"clientId": "GvsunTeach"},
		success: function (res) {
			$('.username').text(res.cname)
		}
	});

	//顶部栏目渲染
	$.ajax({
		url: httpBaseUrl + 'api/getWorkTopInfo',
		type: 'GET',
		async: false,
		data: {"siteId": siteId},
		success: function (res) {
			let data = res;
			if (data) {
				for (let i = 0; i < data.length; i++) {
					let headNavTeacher = `<a id="${data[i].subModule + data[i].module}" href="../gvsunwork/teacherNormalHomeworkList?type=${data[i].module}&title=${data[i].subModule}" name="teacherNormalHomeworkList" target="i" lay-tips="查看作业">${data[i].name}</a>`;
					let headNavStudent = `<a id="${data[i].subModule + data[i].module}" href="../gvsunwork/studentNormalHomeworkList?type=${data[i].module}&title=${data[i].subModule}" name="studentNormalHomeworkList" target="i" lay-tips="查看作业">${data[i].name}</a>`;
					$('.teacher').append(headNavTeacher);
					$('.student').append(headNavStudent);
				}
			}
		}
	})
	//打开作业设置
	var sethomework = {
		sethomework: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '作业设置',
				area: ['500px', '240px'],
				shade: 0.5,
				maxmin: true,
				content: 'setHomework',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#sethomeworkbtn");
					submit.click();
				}
			});
			layer.full(index);
		}
	};
	$('.sethomework').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		sethomework[method] ? sethomework[method].call(this, othis) : '';
	});

	//打开切换用户权限
	var switchpermissions = {
		switchpermissions: function() {
			//layer.msg('切换用户权限');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '切换用户权限',
				area: ['500px', '240px'],
				shade: 0.5,
				maxmin: true,
				content: 'switchPermissions?cid=' + siteId,
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#switchpermissionsbtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.switchpermissions').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		switchpermissions[method] ? switchpermissions[method].call(this, othis) : '';
	});
	// 存储权限
	$.ajax({
		url: httpBaseUrl + 'auth/switchPermissionsApi',
		type: 'GET',
		data: {"cid": siteId, "username": username},
		async: false,
		success: function (res) {
			let data = res;
			if (res){
				let dataAuth  = data.filter(v => {
									return v.nowAuthority == "1"
								})
				for (let i = 0; i < dataAuth.length; i++) {
					if (dataAuth[i].authorityName == 'SCHOLASYCI' && dataAuth[i].nowAuthority == '1'){
						console.log(1)
						$('.student').show();
						$('.head_show').find('a').click();
						$('.teacher').remove();
					} else {
						console.log(2)
						$('.sethomework').show();
						$('.teacher').show();
						$('.group').show();
						$('.student').remove();
					}
				}
			}
		}
	});

	//退出

	window.logout = function () {
		localStorage.clear();
		$.cookie('currauth', '');
		$.cookie('currentauthName', '');
		location.href = httpBaseUrlLogin + '/webapp/logout';
	}
	window.localStorage.clear();

	$(".head_show a").click(function() {
		var name = $(this).attr("name");
		window.location.hash = name; //设置锚点
	})
	$(function () {
		if (head_type !== "" && head_type !== "null" && head_type !== null) {
			$("#" + head_title + head_type).click();
			let hash = window.location.hash;
			console.log(hash)
			let url = hash.substring(1, hash.length);
			$("#iframe").attr("src", url + "?type=" + head_type + "&title=" + head_title);
		} else {
			$('.head_show>a:first-child').click();
			let hash = window.location.hash;
			console.log(hash)
			let url = hash.substring(1, hash.length);
			$("#iframe").attr("src", url);
		}

	})
});