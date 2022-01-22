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

	var currusername = $.cookie('currauth'); // 存储当前用户权限
	if ($.cookie('currauth') === 'TEACHER') {
		$('#certificate, #questionPool').css("display", "inline-block");
	} else {
		$('#certificate, #questionPool').remove();
	}
	// //获取当前课程
	// let course = findCourseSiteById(siteId).title;
	// $.cookie('coursename', course);

	// 获取当前用户的
	$.ajax({
		url: 'getCurrentUser',
		type: 'GET',
		async: false,
		data: {"clientId": "GvsunTeach"},
		success: function (res) {
			$('.name').text(res.cname)
		}
	})

	// 首次加载记录当前权限
	$.ajax({
		url: httpBaseUrl + '/exam/login/getAuthorityInSite',
		type: 'GET',
		data: {"cid": siteId, "username": username},
		success: function (res) {
			let data = res;
			if (data.length > 0){
				if (currusername === undefined || currusername ==='') {
					$.cookie('currauth', data[0].authorityName);
				}
			}
		}
	})
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
				content: 'switchPermissions',
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

	//打开个人中心
	var personalinfo = {
		personalinfo: function() {
            apiGateWayHost = apiGateWayHost.replace("/api", "")
			window.location.href = apiGateWayHost + '/teacherInformationCenter/index';
		}
	};
	$('.personalinfo').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		personalinfo[method] ? personalinfo[method].call(this, othis) : '';
	});

    if(pathType == 'knowledge'){
        $('#knowledge')[0].click();
		let hash = window.location.hash;
		let url = hash.substring(1, hash.length);
		console.log(url)
		$("#iframe").attr("src", url);
    }else if (pathType == 'learning'){
        $('#learning')[0].click();
		let hash = window.location.hash;
		let url = hash.substring(1, hash.length);
		console.log(url)
		$("#iframe").attr("src", url);
    }else if (pathType == 'experience'){
        $('#experience')[0].click();
		let hash = window.location.hash;
		let url = hash.substring(1, hash.length);
		console.log(url)
		$("#iframe").attr("src", url);
    }
	setTimeout(() => {
		if (pathType == "knowledge" || pathType == null) {
			$('#exam').click();
			let hash = window.location.hash;
			let url = hash.substring(1, hash.length);
			$("#iframe").attr("src", url);
		} else if (pathType == "learning") {
			$('#test').click();
			let hash = window.location.hash;
			let url = hash.substring(1, hash.length);
			$("#iframe").attr("src", url);
		}
	})
	//退出
	var serverHostArray = document.location.href.split('/');
	var serverHost = serverHostArray[0] + "//" + serverHostArray[2] + "/" + serverHostArray[3] + "/";
	window.logout = function () {
		localStorage.clear();
		$.cookie('currauth', '');
		$.cookie('currentauthName', '');
		location.href = serverHost + 'logout';
	}
});
function toTeach(obj) {
	window.open($(obj).attr('data'),'_blank')
	// location.href = $(obj).attr('data');
}
function toQuestion(obj) {
    window.open($(obj).attr('data'),'_blank')
    // location.href = $(obj).attr('data');
}