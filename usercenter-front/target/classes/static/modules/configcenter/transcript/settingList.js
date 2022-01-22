// var evaluationHost =apiGateWayHost+"/configcenter/";
layui.define(function(exports) {
	var admin = layui.admin;
    var listUrl = '';
    var sourceProject = '';
	var currcname;//当前登录人姓名
	var curruserdetail;//当前登录人个人信息
	var currusername;//当前登录人工号
	var currauth = [];//当前登录人选择权限
	var authorities;//当前登录人拥有权限
	var currentauth = $.cookie('currauth');
	var currentauthName =  $.cookie("currentauthName");
	var needReleased = true;//是否需要发布功能
	layui.config({
		base:'../'
	}).extend({
		index:'lib/index'
	}).use(['index','form', 'element', 'table', 'laydate', 'laypage', 'util', 'layer'], function() {
		var $ = layui.$,
			admin = layui.admin,
			form = layui.form,
			element = layui.element,
			table = layui.table,
			laydate = layui.laydate,
			laypage = layui.laypage,
			util = layui.util,
			layer = layui.layer;
		var zuulHost =apiGateWayHost;
		var cols = [];//根据模板获取列表表头
		getConfigInfo();
		getCurrentUser();
		function getConfigInfo() {
			$.ajax({
				url: evaluationHost + 'api/configType/infoById?configType='+configType,
				type:'get',
				async: false,
				success:function (res){
					console.log(res);
					var header = $('.legend_select').html();
					$('.legend_select').html('评定指标设置——'+res.data.typeCname+header);
					// listUrl = res.data.url;
					var regex = new RegExp("http");
					if(regex.test(res.data.url)){
						listUrl +=res.data.url;
					}else{
						listUrl+=zuulHost+res.data.url;
					}
					if(listUrl.indexOf('/timetable/api/labroom/listLabCenter')!=-1){//实验中心管理不需要打分
						$('.toScore').hide();
						needReleased = false;
					}
					// getTableHeader();
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
											getTableHeader();
											tableRender();
											layer.close(index);
										}
									});
								}else{
									currauth.push(currentauth);
									getInfoAndAuthorityName(currauth[0]);
									// getTemplateProcess();
									getTableHeader();
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
								getTableHeader();
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
			var searchValue;
			if(listUrl.indexOf('?')!=-1){
				if(curruserdetail.data.enterpriseUser!=null){
					searchValue = curruserdetail.data.enterpriseUser.id+'_'+curruserdetail.data.enterpriseUser.enterpriseName;
				}else if(curruserdetail.data.governmentUser!=null){
					searchValue = curruserdetail.data.governmentUser.id+'_'+curruserdetail.data.governmentUser.gsiName;
				}else{
					// layer.alert('请使用正确的账号/权限登录!');
					listUrl+='&authorityName='+currauth;
					return false;
				}
				listUrl+='&authorityName='+currauth+'&authoritySearchValue='+searchValue;
			}
		}
		function getTableHeader(){
			var headerUrl = listUrl;
			if(listUrl.indexOf('?')!=-1){
				headerUrl+='&page=1&limit=1'
			}else{
				headerUrl+='?page=1&limit=1';
			}
			$.ajax({
				url:headerUrl,
				async:false,
				success: function (res) {
					var coll = [];
					var col = [];
					col.push(
						{title:'序号',minWidth:50,align: 'center',type:"numbers"},
						{field: 'name',title:'名称',minWidth:100,align: 'center'},
					);
					// $.each(res.data,function (index,item){
					if(res.code==200&&res.data.length>0){
						if(res.data[0].infoMap!=null){
							var infoIndex = 0;
							$.each(res.data[0].infoMap,function (i,d) {
								col.push({field: 'header'+infoIndex, title:i,minWidth:100,align:'center'})
								infoIndex++;
							})
						}
						if(res.data[0].startTime!=null&&res.data[0].endTime!=null){
							col.push({field: 'timeLimits',title:'起止时间',minWidth:100,align: 'center'},)
						}
					}else if(res.code == 500){
						layer.msg(res.msg);
					}
					// });
					col.push(
						{title: '操作', align: 'center',width: 200, toolbar: '#toolbar'}
					);
					coll.push(col);
					cols = coll;
				}
			})
		}
		//执行表单
		function tableRender(){
			table.render({
				elem: '#settingList',
				url: listUrl, //数据接口
				title: '评审列表',
				page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
					layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
					curr: 1, //设定初始在第 5 页
					groups: 1, //只显示 1 个连续页码
					first: false, //不显示首页
					last: false //不显示尾页
				},
				parseData: function(res){ //res 即为原始返回的数据
					// console.log(res);
					var pdata = {
						"code": 0, //解析接口状态
						"msg": "", //解析提示文本
						"count": res.total, //解析数据长度
						"data": [] //解析数据列表
					};
					if(res.code == 500){
						return pdata;
					}
					if(res.data.length>0){
						// console.log(pdata);
						var ids = '';
						$.each(res.data,function(index,item){
							ids += item.id+',';
							var record = {};
							record.id = item.id;
							record.name = item.name;
							var infoIndex = 0;
							if(item.infoMap!=null){
								$.each(item.infoMap,function (i,d) {
									record['header'+infoIndex] = d;
									infoIndex++;
								})
							}
							if(item.startTime!=null&&item.endTime!=null){
								record['timeLimits'] = item.startTime+' ~ '+item.endTime;
							}
							// record.fatherName = item.practiceCourseName;
							// record.schoolRoomName = item.schoolRoomName;
							pdata.data.push(record);
						})
						ids = (ids.substring(ids.length - 1) == ',') ? ids.substring(0, ids.length - 1) : ids;
						$.ajax({
							url:evaluationHost + 'api/template/releaseStatusByBusinessIds?businessIds='+ids+'&configType='+configType,
							type:'post',
							async:false,
							success:function (res){
								// console.log(res);
								$.each(res.data,function (index,item) {
									pdata.data[index]['templateId'] = item.templateId;
									pdata.data[index]['isReleased'] = item.isReleased;
									pdata.data[index]['needReleased'] = needReleased;
								})
							}
						})
					}
					return pdata;
				},
				cols: cols,
				data: table,
				limits: [5, 7, 10, 20],
				limit: 20, //每页默认显示的数量
				// skin: 'line', //表格风格
				even: true,
				id: 'settingList'
			});
		}


		//搜索
		// var $ = layui.$,
		reload = {
			reload: function() {
				var search_box = $('#search_box');
				//执行重载
				table.reload('settingList', {
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						search: search_box.val()
					}
				}, 'data');
			}
		};

		$('.tabsearch .layui-btn').on('click', function() {
			var type = $(this).data('type');
			reload[type] ? reload[type].call(this) : '';
		});
		//监听行工具事件
		table.on('tool(settingList)', function(obj) { //注：tool是工具条事件名，file 是 table 原始容器的属性 lay-filter="对应的值"
			var data = obj.data //获得当前行数据
				,
				layEvent = obj.event; //获得 lay-event 对应的值
			/*if(layEvent === 'reportdetail') {
				layer.msg('查看提交内容详情');
			};*/

			//打开评分项设置
			if(obj.event === 'set') {
				// layer.msg('打开评分项设置');
				data.isReleased = (data.isReleased == null) ? 0 : data.isReleased;
				var index = layer.open({
					type: 2 //此处以iframe举例
						,
					title: '评定指标设置('+data.name+')',
					area: ['390px', '260px'],
					shade: 0,
					maxmin: true,
					content: 'indicatorSetting?proId='+data.id+'&configType='+configType+'&sourceProject='+sourceProject+'&state='+data.isReleased,
					zIndex: layer.zIndex //重点1
						,
					success: function(layero) {
						layer.setTop(layero); //重点2
					},
					end: function(){
						table.reload('settingList');
					}
				});
				layer.full(index);
			}else if(obj.event === 'publish'){
				layer.confirm('发布后无法设置指标', function(index) {
					$.ajax({
						url:evaluationHost+'api/timetable/timetableByTemplate',
						// dataType: 'json',
						data: {templateId:data.templateId,sourceProject:sourceProject},
						type: 'post',
						async: false,
						success: function (res) {
							switch (res.code){
								case 200:
									layer.msg('已发布!')
									layer.close(index);
									table.reload('settingList');
									// window.location.reload();
									break;
								case 500:
									layer.msg(res.msg)
									layer.close(index);
									break;
								default:
									layer.msg('发布出错!');
									layer.close(index);
									break;
							}

						}
					})

				});
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
		toScore={
			toScore:function () {
				window.location.href = 'reviewList?configType='+configType;
			}
		}
		$('.breadcrumb_select').on('click', function(){
			var othis = $(this), type = othis.data('type');
			toScore[type] ? toScore[type].call(this, othis) : '';
		});
		// util.event('lay-demo', {
		// 	toScore: function(othis){
		// 		// console.log(othis)
		// 		window.location.href = 'reviewList?configType='+configType;
		// 	}
		// });

	});
});
