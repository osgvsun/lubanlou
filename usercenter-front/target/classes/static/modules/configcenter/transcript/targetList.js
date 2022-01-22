layui.define(function(exports) {
	var admin = layui.admin;

	layui.config({
		base:'../'
	}).extend({
		index:'lib/index'
	}).use(['index','form', 'element', 'table', 'laydate', 'laypage', 'layer'], function() {
		var $ = layui.$,
			admin = layui.admin,
			form = layui.form,
			element = layui.element,
			table = layui.table,
			laydate = layui.laydate,
			laypage = layui.laypage,
			layer = layui.layer;
		var zuulHost =apiGateWayHost,
			templateId = '',
			sourceProject = '',
			currcname,//当前登录人姓名
			curruserdetail,//当前登录人个人信息
			currusername,//当前登录人工号
			currauth = [],//当前登录人选择权限
			authorities,//当前登录人拥有权限
			currentauth = $.cookie('currauth'),
			currentauthName =  $.cookie("currentauthName"),
			cols = [];//根据模板获取列表表头
		getConfigInfo();
		getCurrentUser();
		getAllTemplates();
		function getConfigInfo() {
			$.ajax({
				url: evaluationHost + 'api/configType/infoById?configType='+configType,
				type:'get',
				async: false,
				success:function (res){
					console.log(res);
					$('.legend_select').html('目标列表——'+res.data.typeCname);
					if(res.data.sourceProject!=null&&res.data.sourceProject!=''){
						sourceProject = res.data.sourceProject;
					}else{
						layer.msg('请配置来源项目!');
					}
				},
				error:function () {
					layer.msg("获取config信息失败！");
				}
			});
		}
		function getAllTemplates() {
			$.ajax({
				url: evaluationHost + 'api/template/templateListByConfigType?configType='+configType+'&processUsername='+currusername+'&page=1&limit=999',
				type:'POST',
				async: false,
				success:function (res){
					if(res.data.length == 0){
						layer.msg("当前没有项目(工种)发布!");
					}else{
						// $('.timetable_tool').removeClass('layui-hide');
						var str = '';
						$.each(res.data,function (index,item){
							str +='<option value="'+ item.templateId +'">'+ item.businessName +'('+ item.businessId +')</option>'
						});
						$('#template').append(str);
						// templateId = res.data[0].templateId;
						form.render('select');
					}
					// console.log(res);
				},
				error:function () {
					layer.msg("获取项目(工种)失敗！");
				}
			});
		}
		function getCurrentUser() {
			$.ajax({
				url: 'getCurrentUser',
				// dataType: 'json',
				async: false,
				type: 'get',
				success: function (res) {
					currusername = res.username;
					currcname = res.cname;
					authorities = res.authorityMap[sourceProject];
					$.ajax({
						url: apiGateWayHost+'/usercenter/userInfo?username='+currusername,
						// dataType: 'json',
						async: false,
						type: 'get',
						success: function (res) {
							// console.log(res);
							curruserdetail = res;
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
											$('.changeAuth').html('切换权限（'+ $("input[name='auth']:checked").attr('title') +'）');
											currauth.push($("input[name='auth']:checked").val());
											getInfoAndAuthorityName(currauth[0]);
											// getTemplateProcess();
											tableRender();
											layer.close(index);
										}
									});
								}else{
									currauth.push(currentauth);
									getInfoAndAuthorityName(currauth[0]);
									// getTemplateProcess();
									tableRender();
								}
								$.each(authorities,function (index,item) {
									if(currentauth == item.name){
										currentauthName = item.cname;
										$.cookie("currentauthName",currentauthName);
									}
								});
								$('.changeAuth').html('切换权限（'+ currentauthName +'）');
								$('.changeAuth').removeClass('layui-hide');
							}else{
								if(authorities && authorities.length>0){
									currauth.push(authorities[0].name);
								}
								getInfoAndAuthorityName(currauth[0]);
								// getTemplateProcess();
								tableRender();
							}
						}
					});
				}
			});
		}
		//根据权限获取筛选项
		function getInfoAndAuthorityName(currauth) {
			$.cookie("currauth",currauth);
			// if(listUrl.indexOf('?')!=0){
			// 	if(curruserdetail.data.enterpriseUser!=null){
			// 		searchValue = curruserdetail.data.enterpriseUser.id+'_'+curruserdetail.data.enterpriseUser.enterpriseName;
			// 	}else if(curruserdetail.data.governmentUser!=null){
			// 		searchValue = curruserdetail.data.governmentUser.id+'_'+curruserdetail.data.governmentUser.gsiName;
			// 	}
			// 	listUrl+='&authorityName='+currauth+'&authoritySearchValue='+searchValue;
			// }
		}
		window.getUserByUsername = function (username) {
			var pae = new Object();
			if(username == ''){layer.msg('没有获取到用户名!');return false;}
			//获取用户基本信息
			$.ajaxSettings.async = false;
			$.get( userCenterHost + '/usercenter/getTeacherBasicInfo',{username: username}, function (res) {
				if (!res.code) {
					pae['username'] = res.data.username;
					pae['cname'] = res.data.cname;
					pae['phone'] = res.data.phone;
				} else {
					console.error(res.msg);
				}
			})
			$.ajaxSettings.async = true;
			return pae;
		}
		//执行表单
		function tableRender(){
			table.render({
				elem: '#reviewlisttab',
				// url: evaluationHost + 'api/template/templateListByConfigType?configType='+configType, //数据接口
				url: evaluationHost + 'api/configType/targetUserByConfigTypeId?configType='+configType, //数据接口
				title: '学生列表',
				method:'GET',
				page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
					layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
					curr: 1, //设定初始在第 5 页
					groups: 1, //只显示 1 个连续页码
					first: false, //不显示首页
					last: false //不显示尾页
				},
				parseData: function(res){ //res 即为原始返回的数据
					console.log(res);
					var pdata = {
						"code": 0, //解析接口状态
						"msg": "", //解析提示文本
						"count": res.total, //解析数据长度
						"data": [] //解析数据列表
					};
					// pdata.data = res.data.records;
					if(res.data.records.length>0){
						// console.log(pdata);
						$.each(res.data.records,function(index,item){
							pdata.data.push(getUserByUsername(item.username));
						})
					}
					return pdata;
				},
				cols: [[
					{title:'序号',minWidth:50,align: 'center',type:"numbers"},
					{field: 'username',title:'学号/工号',minWidth:100,width: 200,align: 'center'},
					{field: 'cname',title:'姓名',minWidth:100,width: 200,align: 'center'},
					{field: 'phone',title:'联系方式',minWidth:100,width: 200,align: 'center'},
					{title: '操作', align: 'center',width: 300, toolbar: '#toolbar'}
				]],
				data: table,
				skin: 'line', //表格风格
				even: true,
				limits: [5, 7, 10, 20],
				limit: 20, //每页默认显示的数量
				id: 'reviewlisttab'
			});

		}

		//搜索表单
		var $ = layui.$,
			reload = {
				reload: function() {
					var search_box = $('#search_box');
					var data1 = {
						templateId: $('#template').val(),
						configTypeId: configType,
						search: search_box.val()
					};
					templateId = $('#template').val();
					//执行重载
					table.reload('reviewlisttab', {
						page: {
							curr: 1 //重新从第 1 页开始
						},
						where: data1
					}, 'data');
				}
			};

		$('.tabsearch .reload-btn').on('click', function() {
			var type = $(this).data('type');
			reload[type] ? reload[type].call(this) : '';
		});

		//监听行工具事件
		table.on('tool(reviewlisttab)', function(obj) { //注：tool是工具条事件名，file 是 table 原始容器的属性 lay-filter="对应的值"
			var data = obj.data //获得当前行数据
				,
				layEvent = obj.event; //获得 lay-event 对应的值
			// configType = window.btoa(window.encodeURIComponent(configType));
			// let proId = window.btoa(window.encodeURIComponent(data.id));
			// let templateId = window.btoa(window.encodeURIComponent(data.templateId));
			// let timetableId = window.btoa(window.encodeURIComponent(data.timetableId));
			// let schoolRoomNo = window.btoa(window.encodeURIComponent(data.labRoomNumber));
			// let courseId = window.btoa(window.encodeURIComponent(data.courseNumber));
			// let businessTime = window.btoa(window.encodeURIComponent(data.businessTime));
			// let name = window.btoa(window.encodeURIComponent(data.name));
			//打开查看评审结果
			if(obj.event === 'detailTimetable') {
				// layer.msg('startReview')
				let url = 'reviewList?configType='+configType+'&targetUser='+data.username;
				window.open(url,'_blank')
			}
		});
		//切换权限
		changeAuth={
			changeAuth:function () {
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
					closeBtn :0,//不显示关闭按钮
					success: function(){
						form.render();
					},
					btn1: function (index) {
						$.cookie("currauth",$("input[name='auth']:checked").val());
						window.location.reload()
					}
				});
			}
		}
		$('.breadcrumb_select').on('click', function(){
			var othis = $(this), type = othis.data('type');
			changeAuth[type] ? changeAuth[type].call(this, othis) : '';
		});

	});
});

//信息盒子高度
var x = $(".control_left_box").height();
var y = $(".video_box_limit").height();
//var z = $(document).height();
$(".list_box").height(x - y);

//收缩左侧可视化盒子
$(".left_control_btn").click(
	function() {
		$(this).toggleClass("left_control_change_btn");
		$(".control_right").toggleClass("control_right_change");
		$(".control_left").toggle();
	}
);

//可视化视频
var parent = document.getElementById("videobox");

function flashChecker() {
	var hasFlash = 0;　　　　 //是否安装了flash  
	var flashVersion = 0;　　 //flash版本  

	if(document.all) {
		var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
		if(swf) {
			hasFlash = 1;
			VSwf = swf.GetVariable("$version");
			flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0]);
		}
	} else {
		if(navigator.plugins && navigator.plugins.length > 0) {
			var swf = navigator.plugins["Shockwave Flash"];
			if(swf) {
				hasFlash = 1;
				var words = swf.description.split(" ");
				for(var i = 0; i < words.length; ++i) {
					if(isNaN(parseInt(words[i]))) continue;
					flashVersion = parseInt(words[i]);
				}
			}
		}
	}
	return {
		f: hasFlash,
		v: flashVersion
	};
}

var fls = flashChecker();
var s = "";
if(!fls.f) {
	parent.src = "video/flvvideo.html"; //判断当前没有flash组件则加载flv播放
} else {
	parent.src = "video/flashvideo.html"; //判断当前有flash组件则加载flash播放
}