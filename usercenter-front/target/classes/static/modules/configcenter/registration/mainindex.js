const evaluationHost =apiGateWayHost+"/configcenter/";
layui.config({
	base:'../../'
}).extend({
	index:'lib/index'
}).use(['index','laypage', 'layer','form', 'table', 'element'], function() {
	var admin = layui.admin,
		laypage = layui.laypage //分页
		,
		layer = layui.layer //弹层
		,
		form = layui.form
		,
		table = layui.table //表格
		,
		$ = layui.jquery,
		element = layui.element //元素操作

	//向世界问个好
	//layer.msg('');
	let clientId = 'GvsunUserCenter',
		// configType = configTypes.split(',')[0],
		currcname,//当前登录人姓名
		curruserdetail,//当前登录人个人信息
		currusername,//当前登录人工号
		currauth = [],//当前登录人选择权限
		authorities,//当前登录人拥有权限
		templateId,//进入页面的第一个模板id
		currentauth = $.cookie('currauth'),
		currentauthName =  $.cookie("currentauthName");
	getAllTemplates();
	getNextConfigId();
	getTemplateInfo();
	getCurrentUser();
	$('.academic').click(function () {
		let href = $(this).attr('href');
		// let url = hash. substring(1, hash. length);
		if(href.indexOf('?configType')==-1){
			href+=`?configType=${config1}`;
			$(this).attr('href',href)
		}
		// $(" #iframe"). attr('src',href)
	})
	if(location.href.indexOf('#') != -1){
		let href = location.href.split('#')[1];
		// let url = hash. substring(1, hash. length);
		$(" #iframe"). attr('src',href)
	}
	function getAllTemplates() {
		$.ajax({
			url: evaluationHost + 'api/template/infoByConfigType?configType='+configType,
			type:'get',
			async: false,
			success:function (res){
				if(res.data.length==1){
					templateId = res.data[0].id;
				}else if(res.data.length == 0){
					layer.msg("当前业务未创建模板!");
				}else{
					templateId = res.data[0].id;
				}
			},
			error:function () {
				layer.msg("获取模板列表失敗！");
			}
		});
	}
	function getTemplateInfo() {
		$.ajax({
			url: evaluationHost + 'api/template/info?templateId='+templateId,
			type:'get',
			async: false,
			success:function (res){
				clientId = res.data.sourceProject;
			},
			error:function () {
				layer.msg("获取模板信息失敗！");
			}
		});
	}
	// 获取子流程信息
	function getNextConfigId() {
		$.ajax({
			url: evaluationHost + 'api/configType/configTypes/father/'+configType,
			type:'get',
			async: false,
			success:function (res){
				// console.log(res);
				config1 = configType;
				config2 = res.data[0].id;
				config3 = res.data[0].childList[0].id;

				// getNextConfigInfo();
			},
			error:function () {
				layer.msg("获取下一个流程模板列表失敗！");
			}
		});

	}
	getCurrentUser();
	function getCurrentUser() {
		$.ajax({
			url: '../getCurrentUser',
			// dataType: 'json',
			async: false,
			type: 'get',
			success: function (res) {
				currusername = res.username;
				currcname = res.cname;
				authorities = res.authorityMap[clientId];
				$.ajax({
					url: apiGateWayHost+'/usercenter/userInfo?username='+currusername,
					// dataType: 'json',
					async: false,
					type: 'get',
					success: function (r) {
						// console.log(r);
						curruserdetail = r;
						if(authorities && authorities.length>1){
							if(currentauth == undefined||currentauth == ''){
								var str = '';
								str+='<div class="layui-form">';
								$.each(authorities,function (index,item) {
									str+=' <input type="radio" name="auth" value="'+ item.name +'" title="'+ item.cname +'" checked="">'
								});
								str+='</div>'
								layer.confirm(str,{
									btn: ['确定'],
									title : '请选择权限',
									closeBtn :0,//不显示关闭按钮
									success: function(){
										form.render();
									},
									btn1: function (index) {
										currentauthName =  $("input[name='auth']:checked").attr('title');
										$('.switchpermissions').html(`切换权限(${currentauthName})`);
										currauth.push($("input[name='auth']:checked").val());
										layer.close(index);
									}
								});
								currentauthName = authorities[0].cname;
								currauth.push(authorities[0].name);
								$.cookie("currauth",currauth[0]);
							}else{
								currauth.push(currentauth);
							}
							$.each(authorities,function (index,item) {
								if(currentauth == item.name){
									currentauthName = item.cname;
									$.cookie("currentauthName",currentauthName);
								}
							});
							$('.switchpermissions').html(`切换权限(${currentauthName})`);
						}else{
							if(authorities && authorities.length>0){
								currauth.push(authorities[0].name);
								currentauthName = authorities[0].cname;
								$('.switchpermissions').html(`切换权限(${currentauthName})`);
							}
							$.cookie("currauth",currauth[0]);
						}
					}
				});
			}
		});
	}
	//打开切换用户权限
	var switchpermissions = {
		switchpermissions: function() {
			var str = '';
			str+='<div class="layui-form">';
			$.each(authorities,function (index,item) {
				if(currentauth == item.name){
					str+=' <input type="radio" name="auth" value="'+ item.name +'" title="'+ item.cname +'" checked="">'
				}else{
					str+=' <input type="radio" name="auth" value="'+ item.name +'" title="'+ item.cname +'">'
				}

			});
			str+='</div>'
			layer.confirm(str,{
				btn: ['确定'],
				title : '请选择权限',
				// closeBtn :0,//不显示关闭按钮
				success: function(){
					form.render();
				},
				btn1: function (index) {
					$.cookie("currauth",$("input[name='auth']:checked").val());
					window.location.reload()
				}
			});
		}
	};
	$('.switchpermissions').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		switchpermissions[method] ? switchpermissions[method].call(this, othis) : '';
	});
});