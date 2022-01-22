const evaluationHost =apiGateWayHost+"/configcenter/";
var checked=new Array();
layui.config({
	base:'../../'
}).extend({
	index:'lib/index'
}).use(['index','form', 'element', 'laydate', 'laypage', 'table', 'layer', 'layedit'], function() {
	var $ = layui.jquery,
		admin = layui.admin,
		form = layui.form,
		element = layui.element,
		laydate = layui.laydate,
		laypage = layui.laypage,
		table = layui.table,
		layer = layui.layer,
		layedit = layui.layedit;

	//向世界问个好
	//layer.msg('');
	let timetableId;
	let results;
	let resultId;
	let editorConfig = [];
	let editors = [];
	// form.render(null, 'editacademicstudentworklogbox');
	//
	// //信息
	// form.val('editacademicstudentworklogbox', {
	// 	"": "" //备用
	// });
	let getTimetableId = new Promise((resolve, reject) => {
		$.ajax({
			url: `${evaluationHost}api/timetableProcess/usersByCurrentUser`,
			type:'get',
			data:{username: currentUsername,typeName: 'academicAdvisor',type: 'INITIATOR',page: 1,limit: 1},
			async: false,
			success:function (res){
				// console.log(res);
				timetableId = res.data.timetableProcessInitiatorDTOS[0].timetableId;
				resolve('getTimetableId Success')
				// getNextConfigInfo();
			},
			error:function () {
				layer.msg("获取学生相关信息失敗！");
			}
		});

	})
	let getResultByTimetableId = new Promise((resolve, reject) => {
		$.ajax({
			url: evaluationHost + 'api/timetable/info?timetableId=' + timetableId,
			dataType: 'json',
			async: false,
			type: 'get',
			success: function (res) {
				// console.log(res);
				timetableProcessId = res.data[0].timetableProcessDTOS[2].timetableProcessId;
				let str  = '';
				results = res.data[0].timetableProcessDTOS[2].timetableResults;
				$.each(res.data[0].timetableProcessDTOS[2].timetableResults,function (key, value) {
					if(value.initiatorUsername === currentUsername){
						str+=getWorkLog(res.data[0].timetableProcessDTOS[2].configIndicators,value);
					}
				})
				$('.work_logs').html(str);
				resolve('getResult Success')
			}
		});

	})
	Promise.all([getTimetableId, getResultByTimetableId]).then((result) => {
		console.log(result)
		$.each(editorConfig,function (key,value) {
			var editorIndex = layedit.build(`worklog${value.resultId}`, {
				height: 288 //设置编辑器高度
				,
				tool: [
					'strong' //加粗
					, 'italic' //斜体
					, 'underline' //下划线
					, 'del' //删除线
					, '|' //分割线
					, 'left' //左对齐
					, 'center' //居中对齐
					, 'right' //右对齐
					, '|' //分割线
					, 'link' //超链接
					, 'unlink' //清除链接
					// , 'image' //插入图片
				]
			});
			editors.push({id:value.resultId,editor:editorIndex});
		})
	}).catch((error) => {
		console.log(error)
	})
	//工作日志编辑查看
	$(".editworklogboxbtn").click(
		function() {
			resultId = $(this).attr('data');
			$(this).parent(".layui-timeline-title").siblings(".editworklogbox").show();
			$(this).parent(".layui-timeline-title").siblings(".showworklogbox").hide();
		}
	);

	$(".saveworklogboxbtn").click(
		function() {
			let content;
			let index = $(`#worklog${resultId}`).attr('data');
			$.each(editors, function (key, value) {
				if(value.id.toString() === resultId){
					content = layedit.getContent(value.editor)
					return false;
				}
			})
			let timetableResultDTO = new Object();
			let timetableResult;
			$.each(results,function (key, value) {
				if(value.id.toString() === resultId){
					timetableResult = value;
					return false;
				}
			})
			timetableResult[`evaluationScore${index}`] = content;
			timetableResultDTO['timetableResult'] = timetableResult;
			timetableResultDTO['submitUser'] = currentUsername;
			timetableResultDTO['stageId'] = 1;
			timetableResultDTO['isComplete'] = -1;
			timetableResultDTO['timetableProcessId'] = timetableProcessId;
			// console.log(timetableResultDTO);
			var data = JSON.stringify(timetableResultDTO);
			$.ajax({
				// url:zuulUrl+'api/meetingProcess/saveMeetingProcess',
				url:evaluationHost+'api/timetableResult/resultNew',
				dataType: 'json',
				data: data,
				type: 'post',
				// async: false,
				contentType:"application/json;charset=utf-8",
				success:function (res) {
					// console.log(res);
					if(res.code == '200'){
						window.location.reload();
					}else{
						layer.msg(res.msg);
						return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
					}
				},
				error: function () {
					alert("后台保存数据报错");
					return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
				}
			});
			$(this).parents(".editworklogbox").siblings(".showworklogbox").show();
			$(this).parents(".editworklogbox").hide();
		}
	);

	$(".cancelworklogboxbtn").click(
		function() {
			$(this).parents(".editworklogbox").siblings(".showworklogbox").show();
			$(this).parents(".editworklogbox").hide();
		}
	);
	//打开新增工作日志
	var newacademicstudentworklog = {
		newacademicstudentworklog: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '新增工作日志',
				area: ['800px', '535px'],
				shade: 0.5,
				maxmin: true,
				content: 'newAcademicStudentWorkLog?timetableId='+timetableId,
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newacademicstudentworklogbtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.newacademicstudentworklog').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		newacademicstudentworklog[method] ? newacademicstudentworklog[method].call(this, othis) : '';
	});

	//建立编辑器的图片接口
	layedit.set({
		// uploadImage: {
		// 	url: layui.setter.base + 'json/questionImg.json' //接口url
		// 		,
		// 	type: '' //默认post
		// }
	});
	//注意：layedit.set 一定要放在 build 前面，否则配置全局接口将无效。


	function getWorkLog(configIndicators,data) {
		let  time = format(data.createdTime,'yyyy-MM-dd HH:mm:ss');
		let str = `<li class="layui-timeline-item">
						<i class="layui-icon layui-timeline-axis"></i>
						<div class="layui-timeline-content layui-text">
							<h3 class="layui-timeline-title">${time}
								<label class="layui-btn layui-btn-xs layui-btn-green editworklogboxbtn" data="${data.id}">编辑</label>
							</h3>`
		$.each(configIndicators,function (key, value) {
			let evaluationScore = 'evaluationScore'+(key+1);
			if(value.contentType === 'date' || value.contentType === 'dateTime' || value.contentType === 'rangeDate' || value.contentType === 'rangeDateTime'){
				str+=`<div class="showworklogbox">
								<label>${value.indicatorCname}：</label>
								<!--调试时可暂时把disabled与readonly删除。此行仅为提示，可删。-->
								<span>${data[evaluationScore]}</span>
							</div>`
			}else if(value.contentType === 'editor'){
				editorConfig.push({index:key+1,resultId:data.id,indicatorName: value.indicatorName ? value.indicatorName : ''});
				str+=`<div class="showworklogbox">
								<label>${value.indicatorCname}：</label>
								<!--调试时可暂时把disabled与readonly删除。此行仅为提示，可删。-->
								<span id="content${key+1}" disabled="disabled" readonly="readonly">
									${data[evaluationScore]}
								</span>
							</div>
							<div class="editworklogbox hide">
								<textarea id="worklog${data.id}" data="${key+1}" name="worklog" style="display: none;"></textarea>
								<div class="tc mt10">
									<input type="button" class="layui-btn saveworklogboxbtn" value="提交日志" />
									<input type="button" class="layui-btn layui-btn-red cancelworklogboxbtn" value="取消" />
								</div>
							</div>`
			}else{
				str+=`<div class="showworklogbox">
								<label>${value.indicatorCname}：</label>
								<!--调试时可暂时把disabled与readonly删除。此行仅为提示，可删。-->
								<span>
									${data[evaluationScore]}
								</span>
							</div>
							`
			}
		})
							str+=`</div>
					</li>`
		return str;
	}
	function format(time, format) {
		var t = new Date(time);
		var tf = function (i) {
			return (i < 10 ? '0' : '') + i
		};
		return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
			switch (a) {
				case 'yyyy':
					return tf(t.getFullYear());
					break;
				case 'MM':
					return tf(t.getMonth() + 1);
					break;
				case 'mm':
					return tf(t.getMinutes());
					break;
				case 'dd':
					return tf(t.getDate());
					break;
				case 'HH':
					return tf(t.getHours());
					break;
				case 'ss':
					return tf(t.getSeconds());
					break;
			}
		})
	}
});

// //规定要做自适应高度的textarea
// $(function() {
// 	$('#content1').flexText();
// 	$('#content2').flexText();
// 	$('#content3').flexText();
// });



//传递子页面锚
$(function() {
	$(".layui-tab-title li a").click(function() {
		var name = $(this).attr("name");
		top.location.hash = name; //设置锚点
	});
});