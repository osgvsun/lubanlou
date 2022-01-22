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
			teacherList = [],
			configTypeInfo,
			timetableInfo,
			cols = [];//根据模板获取列表表头
		$('.legend_select').append('——'+name)
		var myform=document.getElementById("myForm");
		myform.onkeypress=function(ev) {
			var ev=window.event||ev;
			if(ev.keyCode==13||ev.which==13)
			{
				return false;
			}
		}
		getConfigInfo();
		getTimetableInfo();
		getTableHeader();
		tableRender();
		function getConfigInfo() {
			$.ajax({
				url: evaluationHost + 'api/configType/infoById?configType='+configType,
				type:'get',
				async: false,
				success:function (res){
					configTypeInfo = res.data;
				},
				error:function () {
					layer.msg("获取config信息失败！");
				}
			});
		}
		function getTimetableInfo() {
			$.ajax({
				url: evaluationHost + 'api/timetable/info?timetableId='+timetableId,
				type:'get',
				async: false,
				success:function (res){
					// console.log(res);
					timetableInfo = res.data[0];
				},
				error:function () {
					layer.msg("获取config信息失败！");
				}
			});
		}
		function getTableHeader(){
			var hd = new Object();
			//判断url是否为配置中心本身，若是，则传现业务数据timetableId,若不是则传原业务数据id
			if(configTypeInfo.url.indexOf('/configcenter/')!=-1){
				hd['workUid'] = timetableId;
			}else{
				hd['workUid'] = proId;
			}
			// hd['workUid'] = proId;
			hd['businessTime'] = businessTime;
			// if(search){
			// 	hd['search'] = search;
			// }
			// if(gradeBy){
			// 	hd['gradeBy'] = gradeBy;
			// }
			$.ajax({
				url:zuulHost + '/transcript/configTeacherApi',
				async:false,
				method:'post',
				data: JSON.stringify(hd),
				contentType: 'application/json; charset=UTF-8',
				success: function (res) {
					console.log(res);
					teacherList = res;
					var coll = [];
					var col = [];
					col.push(
						{title:'序号',minWidth:50,align: 'center',type:"numbers"},
						{field: 'cname',title:'姓名',minWidth:100,width: 200,align: 'center'},
						{field: 'username',title:'学号',minWidth:100,width: 200,align: 'center'},
						// {field: 'courseNumber',title:'课程名称',minWidth:100,align: 'center'},
						// {field: 'labRoomNumber',title:'实验室名称',minWidth:100,align: 'center'},
					);
					// $.each(res.data,function (index,item){
					if(res.length>0){
						$.each(res,function (i,d) {
							col.push({field: 'header'+(i+1), title:d.cname+'('+d.username+')',minWidth:100,width: 200,align:'center'})
						})
					}
					col.push({field: 'average',title:'平均分',minWidth:100,width: 200,align: 'center',sort: true})
					coll.push(col);
					cols = coll;
				}
			})
		}
		//执行表单
		function tableRender(){
			table.render({
				elem: '#reviewReport',
				// url: evaluationHost + 'api/template/templateListByConfigType?configType='+configType, //数据接口
				url: zuulHost + '/transcript/configGradeDataApi',
				title: '评审报表('+name+')',
				method:'POST',
				where: {
					workUid: configTypeInfo.url.indexOf('/configcenter/')!=-1 ? timetableId : proId,
					businessTime: businessTime,
				},
				contentType: "application/json;charset=UTF-8",
				page: false,
				parseData: function(res){ //res 即为原始返回的数据
					console.log(res);
					var pdata = {
						"code": 0, //解析接口状态
						"msg": "", //解析提示文本
						"count": res.length, //解析数据长度
						"data": [] //解析数据列表
					};
					if(res.length>0){
						// console.log(pdata);
						$.each(res,function(index,item){
							$.each(timetableInfo.timetableProcessDTOS[0].timetableProcessTargets,function (i,dd) {
								if(item.student == dd.targetUsername){
									var record = {};
									let totalScore = 0 ;
									record.cname = item.cname;
									record.username = item.student;
									$.each(teacherList,function(j,d){
										record['header'+(j+1)] = '未评分';
										$.each(item.gradeList,function (i,obj) {
											if(obj.gradeBy == d.username) {
												totalScore+=obj.score
												record['header'+(j+1)] = obj.score;
											}
										})
									})
									record.average = (totalScore/teacherList.length).toFixed(1)
									pdata.data.push(record);
								}
							})

						})
					}
					return pdata;
				},
				cols: cols,
				data: table,
				skin: 'line', //表格风格
				even: true,
				// limits: [5, 7, 10, 20],
				// limit: 20, //每页默认显示的数量
				id: 'reviewReport'
			});

		}

		//搜索表单
		var $ = layui.$,
			reload = {
				reload: function() {
					var search = $('#search_student');
					// var gradeBy = $('#search_teacher');
					// getTableHeader(search.val(),gradeBy.val())
					var data1 = {
						workUid: proId,
						businessTime: businessTime,
						search: search.val(),
						// gradeBy: gradeBy.val()
					};
					//执行重载
					table.reload('reviewReport', {
						where: data1
					}, 'data');
				}
			};

		$('.tabsearch .reload-btn').on('click', function() {
			var type = $(this).data('type');
			reload[type] ? reload[type].call(this) : '';
		});
		window.exportFile = function () {
			layer.msg('导出中······请稍等片刻')
			var data = layui.table.cache["reviewReport"];
			table.exportFile('reviewReport',data, 'xls'); //导出数据
			// var data1 = {
			// 	workUid: proId,
			// 	businessTime: businessTime,
			// 	search: search.val(),
			// };
			// //执行重载
			// table.reload('exprortTable', {
			// 	page: {
			// 		curr: 1 //重新从第 1 页开始
			// 	},
			// 	where: data1,
			// 	done: function (res) {
			// 		table.exportFile('exprortTable',res.data, 'xls'); //导出数据
			// 	}
			// }, 'data');

		}
		// //监听行工具事件
		// table.on('tool(reviewlisttab)', function(obj) { //注：tool是工具条事件名，file 是 table 原始容器的属性 lay-filter="对应的值"
		// 	var data = obj.data //获得当前行数据
		// 		,
		// 		layEvent = obj.event; //获得 lay-event 对应的值
		// 	configType = window.btoa(window.encodeURIComponent(configType));
		// 	let proId = window.btoa(window.encodeURIComponent(data.id));
		// 	let templateId = window.btoa(window.encodeURIComponent(data.templateId));
		// 	let timetableId = window.btoa(window.encodeURIComponent(data.timetableId));
		// 	let schoolRoomNo = window.btoa(window.encodeURIComponent(data.labRoomNumber));
		// 	let courseId = window.btoa(window.encodeURIComponent(data.courseNumber));
		// 	let businessTime = window.btoa(window.encodeURIComponent(data.businessTime));
		// 	let name = window.btoa(window.encodeURIComponent(data.name));
		// 	//打开查看评审结果
		// 	if(obj.event === 'startReview') {
		// 		// layer.msg('startReview')
		// 		let url = 'startReview?proId='+proId+'&configType='+configType+'&templateId='+templateId+'&timetableId='+timetableId+'&courseId='+courseId+'&schoolRoomNo='+schoolRoomNo;
		// 		window.open(url,'_blank')
		// 	}else if(obj.event === 'reviewDetail'){
		// 		// layer.msg('reviewDetail')
		// 		let url = 'reviewDetail?proId='+proId+'&configType='+configType+'&templateId='+templateId+'&timetableId='+timetableId+'&courseId='+courseId+'&schoolRoomNo='+schoolRoomNo;
		// 		window.open(url,'_blank')
		// 	}else if(obj.event === 'reviewReport'){
		// 		let url = 'reviewReport?proId='+proId+'&businessTime='+businessTime+'&name='+name;
		// 		window.open(url,'_blank')
		// 	}
		// });

	});
});
