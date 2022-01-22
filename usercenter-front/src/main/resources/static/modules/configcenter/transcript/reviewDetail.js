var cdata,
	lastTime = 0,
	firstStudent,
	targenJson = [],
	resultId = 0,
	timetableProcessId,
	timetableInfo,
	timetableResult = new Object(),
	LabRoomAgent,//实验室物联硬件信息
	imageFiles='',//图片id
	videoFiles='',//视频id
	currentCname = '',
	identity = '',
	player,//rtmp播放
	playerSrc = '',//rtmpsrc
	mobileUrl = '',//rtmpsrc 手机
	pcUrlFlv = '',//flv
	msgindex,
	totalScore = 0,
	totalDeduct = 0,
	textareafullscreens = [],//需要全屏的textarea
	steps = [],//所有阶段
	isIot = true;//是否需要摄像头
layui.config({
	base:'../'
}).extend({
	index:'lib/index'
}).use(['index','form', 'element', 'table', 'laydate', 'laypage', 'layer', 'util'], function() {
	var $ = layui.$,
		admin = layui.admin,
		form = layui.form,
		element = layui.element,
		table = layui.table,
		laydate = layui.laydate,
		laypage = layui.laypage,
		layer = layui.layer,
		util = layui.util;

	//向世界问个好
	// layer.msg('开始评审');

	form.render(null, 'startreview');
	//信息
	// form.val('startreview', {
	// 	"comment": "test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1test1",
	// 	"score": "test2"
	// });
	getConfigIndicatorByTemplateId();
	LabRoomAgent = video_init.getLabRoomAgents();
	getTimetableInfo();
	// video_init.initRtmpVideo();
	video_init.getFiles();
	var timetableResultDTO = new Object();
	timetableResultDTO['isComplete'] = -1;
	function getConfigIndicatorByTemplateId(){
		var params = {'templateId': templateId, 'step': 1, 'page': 1, 'limit': 999,}
		ajax(evaluationHost,'api/configIndicator/list','get',params,false,'json', null
			, function(res){ // POST或GET请求直接传参
				cdata = res.data;
				if(gradeMode === 'deduct'){
					$.each(cdata,function (i,d) {
						totalScore += Number(d.standardScore);
					})
				}
				targenJson = getFinallyData(cdata);
			}, function(res){
				alert("获取配置项失败！");
			})
	}
	function targetRender() {
		if($('.score_card').length > 0){
			$('.score_card').remove();
		}
		var totalStr = '';
		totalStr+='<div class="score_top"></div><div class="score_card"><span class="deduct_card">扣分：<font id="total_deduct">'+ totalDeduct +'</font></span>  得分：<font id="total_score">'+ totalScore +'</font> ' +
			'<button class="layui-btn save_score" style="float: right;margin-right: 5px;" type="button" onclick="saveAll()">一键保存</button>' +
			'</div>'
		$('.duo').prepend(totalStr);
		if(gradeMode === 'default'){
			$('.deduct_card').remove()
			$('.save_score').remove()
		}
		var str = '';
		$.each(targenJson,function (index,item) {
			str+='<div class="grid-item">' +
				'<div class="layuiadmin-card-text">' +
				'<div class="layui-text-top layui_textseries">' +
				'<i class="layui-icon layui-icon-form modulartit_icon"></i><font>' +
				item.fatherName+'</font></div>';
			$.each(item.origin,function (i,d) {
				str+='<div class="layui-text-content">' +
					'<div class="layui-text-center">' +
					'<div class="ltc_spec_symbol">' +
					'<label class="color_tag"><font>'+ d.name +'</font></label>' +
					'</div>' +
					'<div class="ltc_spec_symbol">';
				if(d.comment == null){d.comment = ''}
				str+='<label>'+ d.comment +'（'+ d.standardScore +'分）</label>' +
					'</div>' +
					'</div>' +
					'<p class="layui-text-bottom tr">' +
					'<input type="hidden" class="configId" value="'+ d.id +'"/>' +
					'<label class="comment_btn" data-method="comment_btn">查看评语</label>' +
					'<font>【成绩】</font>' +/*oninput="OnInput(event)" onpropertychange="OnPropChanged(event)"*/
					'<input type="button" class="btn_article layui-text-bottom-input" id="evaluationScore'+ d.sort +'" autocomplete="off" disabled="disabled" readonly="readonly"/>' +
					'<font>分</font>' +
					// '<input type="hidden" id="commentinfoDeatil_'+ d.id +'" value=""/>' +
					'</p>' +
					'<div class="layui-text-detail">' +
					'<textarea id="commentinfoDeatil_'+ d.id +'" class="comment_detail" disabled placeholder="未填写评语"></textarea></div>' +
					'</div>';
					'</div>';
			})

			str+='</div></div>';
		})
		$('.grid').html(str);
	}
	function getTimetableInfo(){
		var params = {'timetableId': timetableId}
		ajax(evaluationHost,'api/timetable/info','get',params,false,'json', null
			, function(res){ // POST或GET请求直接传参
				// console.log(res);
				timetableInfo = res.data;
				$.each(res.data[0].timetableProcessDTOS[0].timetableProcessInitiators,function (index,item) {
					if(item.initiatorUsername == currentUsername){
						currentCname = item.initiatorCname;
						identity = 'teacher';
						return false;
					}
				})
				if(identity!='teacher'){
					$.each(res.data[0].timetableProcessDTOS[0].timetableProcessTargets,function (index,item) {
						if(item.targetUsername == currentUsername){
							currentCname = item.targetCname;
							identity = 'student';
							return false;
						}
					})
				}
				timetableProcessId = res.data[0].timetableProcessDTOS[0].timetableProcessId;
				if(identity == 'teacher'){
					if(target!='null'){
						$.each(res.data[0].timetableProcessDTOS[0].timetableProcessTargets,function (i,d) {
							if(target == d.targetUsername){
								firstStudent = d;
								return false;
							}
						})
					}else{
						firstStudent = res.data[0].timetableProcessDTOS[0].timetableProcessTargets[0];
					}
					for(var i = 0;i<res.data[0].timetableProcessDTOS[0].timetableResults.length;i++){
						if(res.data[0].timetableProcessDTOS[0].timetableResults[i].initiatorUsername == currentUsername
							&&res.data[0].timetableProcessDTOS[0].timetableResults[i].targetUsername == firstStudent.targetUsername){
							resultId = res.data[0].timetableProcessDTOS[0].timetableResults[i].id;
							timetableResult = res.data[0].timetableProcessDTOS[0].timetableResults[i];
							break;
						}
					}
					$('.student_name').html('目标者：'+firstStudent.targetCname);
					$('.student_username').html(firstStudent.targetUsername);
					$('.teacher_name').html('打分者：'+currentCname);
					$('.teacher_username').html(currentUsername);
					$('.changeteacher').addClass('layui-hide');
					$('.teacher_id').addClass('identity');
				}else if(identity == 'student'){
					firstTeacher = res.data[0].timetableProcessDTOS[0].timetableProcessInitiators[0];
					for(var i = 0;i<res.data[0].timetableProcessDTOS[0].timetableResults.length;i++){
						if(res.data[0].timetableProcessDTOS[0].timetableResults[i].initiatorUsername == firstTeacher.initiatorUsername
							&&res.data[0].timetableProcessDTOS[0].timetableResults[i].targetUsername == currentUsername){
							resultId = res.data[0].timetableProcessDTOS[0].timetableResults[i].id;
							timetableResult = res.data[0].timetableProcessDTOS[0].timetableResults[i];
							break;
						}
					}
					$('.student_name').html('目标者：'+currentCname);
					$('.student_username').html(currentUsername);
					$('.teacher_name').html('打分者：'+firstTeacher.initiatorCname);
					$('.teacher_username').html(firstTeacher.initiatorUsername);
					$('.changestudent').addClass('layui-hide');
					$('.student_id').addClass('identity');
				}else{
					layer.alert('请使用正确的账号/权限登录!');
					window.location.href="about:blank";
					window.close();
				}
				targetRender()
				valueRender();
				if(!LabRoomAgent){
					var params = {'timetableId': proId}
					ajax(evaluationHost,'api/timetable/info','get',params,false,'json', null
						, function(res){ // POST或GET请求直接传参
							try {
								var resultFlag = false;//是否需要显示学生提交内容;
								$.each(res.data[0].timetableProcessDTOS,function (index, item) {
									$.each(item.configIndicators, function (i,d) {
										if(d.indicatorName&&d.indicatorName.indexOf('|count|')!=-1){
											resultFlag = true;
											return false;
										}
									})
									if(resultFlag){
										var str = ' <div class="layui-card-body">'+
											'<div class="layui-row layui-col-space20" style="margin: 0">'+
											'<div class="layui-form detail_item" action="" lay-filter="studentResult" id="studentResult">';
										// var stepInfo = configInputByInfo(item,data);
										str+= configInputByInfo(item,res);
										str+='</div></div></div>';
										$('.video_box_limit').html(str);
										$('#studentResult').parent().attr('id',`step_info_${steps[0].step}`);//用来为text赋值
										form.render();
										textareafullscreens = [];
										var suser = (identity=='teacher')?firstStudent.targetUsername:currentUsername;
										var params = getResultByInfo(res.data[0],suser);
										var video_box=$(".video_box").prop("outerHTML");
										$(".video_box").remove();
										$(".list_box").after(video_box);
										// if(params[0].code == 404){
										// 	alert('未找到该学生的提交数据!');
										// }
										for(var k in params[0]){
											$("#studentResult [name='"+ k +"']").val(params[0][k])
										}
										$.each(textareafullscreens,function (key,value) {
											$(`[name=${value}]`).textareafullscreen()
										})
										fileInit();
									}
								})
							} catch (e) {
								console.error(e);
							}
							// console.log(res);
						}, function(res){
							console.error(res);
						})
				}
			}, function(res){
				alert("获取配置项失败！");
			})
	}
	function valueRender(){
		var nowScore = 0;
		$.each(timetableResult, function(i) {
			// console.log(i); //获取键值
			// console.log(timetableResult[i]); //获取对应的value
			if(i.indexOf('evaluationScore')!=-1){
				if(timetableResult[i]!=null){
					nowScore += Number(timetableResult[i].split('_')[0]);
					$('#'+i).val(timetableResult[i].split('_')[0]);
					$('#'+i).prev().prev().attr('lay-tips',timetableResult[i].split('_')[1]);
					$('#'+i).next().next().val(timetableResult[i].split('_')[1]);
					// $('#'+i).prev().text('保存评语');
					$('#'+i).parent().nextAll('.layui-text-detail').eq(0).children('.comment_detail').text(timetableResult[i].split('_')[1])
					// $('#'+i).parent().nextAll('.layui-text-detail').eq(0).removeClass('layui-hide');
					// if(timetableResult[i].split('_')[1]!=''){
					// 	$('#'+i).prev().text('编辑评语');
					// }
				}
			}
		});
		if(nowScore!=0){
			$('#total_deduct').html('-'+(totalScore-nowScore));
			$('#total_score').html(nowScore);
		}
	}
	window.getVideoFiles = function () {
		var str = '';
		$.each(videoFiles.split(','),function (i,d) {
			resourceContainer.getFileById({
				success: function (data) {
					str+='<div class="video_file">' +
						'<div href="javascript:void(0)" data-imgUrl="'+data.url+'" onclick="video_click(this);" class="video_file_poster">' +
						'<video class="video_file_poster" src="'+data.url+'"></video>' +
						'</div></div>';
				}, fail: function (reason) {
					console.log("读取资源失败:" + reason);
				}, fileId:d, username: currentUsername, needToken: true
			});
		})
		$('.video_file_box_limit').html(str);
	}
	window.video_click = function (_this) {
		var img = $(_this).attr("data-imgUrl");
		$("#showlive").css('display','none');
		$(".fileshow").css('display','none');
		$("#showvideo").css('display','block');
		$("#showvideo").attr({src: img});
		// $(_this).addClass("video_select").siblings("div").removeClass("video_select");
		$('.video_file div').removeClass("video_select");
		$(_this).addClass("video_select");
		return false;
	}

//打开切换学生
	var changestudent = {
		changestudent: function() {
			//layer.msg('切换学生');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '切换目标者',
				area: ['350px', '350px'],
				shade: 0.5,
				maxmin: true,
				content: 'changeStudent?timetableId='+timetableId,
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#changestudentbtn");
					submit.click();
				},
				end: function () {
					var flag = false;
					if(identity == 'teacher'){
						for(var i = 0;i<timetableInfo[0].timetableProcessDTOS[0].timetableResults.length;i++){
							if(timetableInfo[0].timetableProcessDTOS[0].timetableResults[i].initiatorUsername == currentUsername
								&&timetableInfo[0].timetableProcessDTOS[0].timetableResults[i].targetUsername == $('.student_username').text()){
								resultId = timetableInfo[0].timetableProcessDTOS[0].timetableResults[i].id;
								timetableResult = timetableInfo[0].timetableProcessDTOS[0].timetableResults[i];
								flag = true;
								break;
							}
						}
					}
					if(!flag){
						resultId = 0;
						timetableResult = new Object();
					}
					targetRender();
					valueRender();
					$('.comment_btn').on('click', function() {
						var othis = $(this),
							method = othis.data('method');
						comment_btn[method] ? comment_btn[method].call(this, othis) : '';
					});
					if(LabRoomAgent){
						path = '物联/工位仪/'+LabRoomAgent[0].hardwareIp+'/'+courseId+'/'+proId+'/'+$('.student_username').text();
						video_init.getFiles();
					}
					if(!LabRoomAgent){
						var params = {'timetableId': proId}
						ajax(evaluationHost,'api/timetable/info','get',params,false,'json', null
							, function(res){ // POST或GET请求直接传参
								try {
									var resultFlag = false;//是否需要显示学生提交内容;
									$.each(res.data[0].timetableProcessDTOS,function (index, item) {
										$.each(item.configIndicators, function (i,d) {
											if(d.indicatorName&&d.indicatorName.indexOf('|count|')!=-1){
												resultFlag = true;
												return false;
											}
										})
										if(resultFlag){
											textareafullscreens = [];
											var params = getResultByInfo(res.data[0],$('.student_username').text());
											// if(params[0].code == 404){
											// 	alert('未找到该学生的提交数据!');
											// }
											for(var k in params[0]){
												$("#studentResult [name='"+ k +"']").val(params[0][k])
											}
										}
									})
									// $.each(textareafullscreens,function (key,value) {
									// 	$(`[name=${value}]`).textareafullscreen()
									// })
								} catch (e) {
									console.error(e);
								}
								// console.log(res);
							}, function(res){
								console.error(res);
							})
					}
				}
			});
			//layer.full(index);
		}
	};
	$('.changestudent').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		changestudent[method] ? changestudent[method].call(this, othis) : '';
	});
	//打开切换打分者
	var changeteacher = {
		changeteacher: function() {
			//layer.msg('切换学生');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '切换打分者',
				area: ['350px', '350px'],
				shade: 0.5,
				maxmin: true,
				content: 'changeTeacher?timetableId='+timetableId,
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#changeteacherbtn");
					submit.click();
				},
				end: function () {
					var flag = false;
					if(identity == 'student'){
						for(var i = 0;i<timetableInfo[0].timetableProcessDTOS[0].timetableResults.length;i++){
							if(timetableInfo[0].timetableProcessDTOS[0].timetableResults[i].initiatorUsername == $('.teacher_username').text()
								&&timetableInfo[0].timetableProcessDTOS[0].timetableResults[i].targetUsername == currentUsername){
								resultId = timetableInfo[0].timetableProcessDTOS[0].timetableResults[i].id;
								timetableResult = timetableInfo[0].timetableProcessDTOS[0].timetableResults[i];
								flag = true;
								break;
							}
						}
					}
					if(!flag){
						resultId = 0;
						timetableResult = new Object();
					}
					targetRender();
					valueRender();
					$('.comment_btn').on('click', function() {
						var othis = $(this),
							method = othis.data('method');
						comment_btn[method] ? comment_btn[method].call(this, othis) : '';
					});
				}
			});
			//layer.full(index);
		}
	};
	$('.changeteacher').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		changeteacher[method] ? changeteacher[method].call(this, othis) : '';
	});

	//打开查看视频资源页面
	var videotape = {
		videotape: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '查看视频资源',
				area: ['390px', '326px'],
				shade: 0.3,
				maxmin: true,
				content: 'videoFile.html'
			});
			layer.full(index);
		}
	};
	$('.videotape').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		videotape[method] ? videotape[method].call(this, othis) : '';
	});

	//打开查看图片资源页面
	var photograph = {
		photograph: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '查看图片资源',
				area: ['390px', '326px'],
				shade: 0.3,
				maxmin: true,
				content: 'photographFile?files='+imageFiles
			});
			layer.full(index);
		}
	};
	$('.photograph').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		photograph[method] ? photograph[method].call(this, othis) : '';
	});

	//打开单项填写评语
	var comment_btn = {
		comment_btn: function() {
			//layer.msg('');
			var flag = false;
			var that = this;
			var commentId = that.previousSibling.value;
			var commentinfoDeatil = document.getElementById('commentinfoDeatil_'+commentId).value;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '填写评语',
				area: ['350px', '175px'],
				shade: 0.3,
				maxmin: true,
				content: 'commentDetail?commentinfoDeatil='+commentinfoDeatil,
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				}
			});
			//layer.full(index);
		}
	};
	$('.comment_btn').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		comment_btn[method] ? comment_btn[method].call(this, othis) : '';
	});
	util.event('lay-demo', {
		usbLive: function () {
			$("#showlive").css('display','block');
			$(".fileshow").css('display','inline-block');
			$("#showvideo").css('display','none');
			// $("#bgvideo").css('display','none');
			if($('#bgvideo').length){
				$('#bgvideo').remove()
				videojs('bgvideo').dispose();
			}
		},
		rtmpLive: function () {
			$("#showlive").css('display','none');
			$(".fileshow").css('display','inline-block');
			$("#showvideo").css('display','none');
			// $("#bgvideo").css('display','');
			if (!$('#bgvideo').length) {
				var videostr = '<video id="bgvideo" class="video-js w100p" controls="controls" preload="auto"  data-setup=\'{}\'>' +
					'<source src='+ mobileUrl +'" type="application/x-mpegURL">' +
					'<source src="'+ playerSrc +'" type="rtmp/flv">' +
					'<source src="'+ pcUrlFlv +'" type="video/x-flv">' +
					'</video>'
				$('.video_box_limit').append(videostr);
				expandVideoInit("bgvideo")
				// player = videojs('bgvideo');
				// player.play();
			}
		},
		hideVideo: function () {
			// layer.msg('一键折叠')
			var _this = $(this);
			if(_this.html() == '显示视频'){
				layer.msg('显示视频');
				var p = 0;
				var timer;
				timer = setInterval(function () {
					if(p<55){
						p += 5;
						$('.video_box').css('padding',p+'% 0 0')
						$('.control_right').css('padding',p+'% 0 0')
					}else{
						clearInterval(timer)
						$('#showlive').removeClass('layui-hide');
						$('#showvideo').removeClass('layui-hide');
						_this.html('隐藏视频');
					}
				},30)
				// $('.video_box').css('padding','56.5% 0 0')
				// $('.control_right').css('padding','56.5% 0 0')

			}else{
				layer.msg('隐藏视频');
				var p = 55;
				var timer;
				timer = setInterval(function () {
					if(p>0){
						p -= 5;
						$('.video_box').css('padding',p+'% 0 0')
						$('.control_right').css('padding',p+'% 0 0')
					}else{
						clearInterval(timer);
						$('#showlive').addClass('layui-hide');
						$('#showvideo').addClass('layui-hide');
						_this.html('显示视频');
					}
				},30)
				// $('.video_box').css('padding','0')
				// $('.control_right  ').css('padding','0')
				// _this.html('显示视频');
			}
		},
		takePhoto: function () {
			// layer.msg('一键折叠')
			layer.msg('takePhoto');
		},
		recordVideo: function () {
			// layer.msg('一键折叠')
			layer.msg('recordVideo');
			// $('#takePhoto').addClass('layui-hide');
			$('#recordVideo').addClass('layui-hide');
			$('#start').removeClass('layui-hide');
			// $('#stop').removeClass('layui-hide');
		},
		start: function () {
			layer.msg('recordVideo');
			$('#start').addClass('layui-hide');
			$('#stop').removeClass('layui-hide');
		},
		stop: function () {
			layer.msg('recordVideo');
			// $('#takePhoto').removeClass('layui-hide');
			$('#recordVideo').removeClass('layui-hide');
			$('#start').addClass('layui-hide');
			$('#stop').addClass('layui-hide');
		},
	});
	function eachFinallyData(d,config,data) {
		if(d.configIndicatorDTOS.length>0){
			$.each(d.configIndicatorDTOS,function (i1,d1) {
				var newConfig = new Object();
				newConfig['fatherName']=config.fatherName;
				if(d1.configIndicatorDTOS.length>0){
					newConfig['fatherName']+='——'+d1.indicatorCname;
				}
				newConfig = eachFinallyData(d1,newConfig,data);
				if($.isPlainObject(newConfig)){
					data.push(newConfig);
				}
			})
			return data;
		}else{
			config['sort'] = d.sort;
			config['name'] = d.indicatorCname;
			config['comment'] = d.comment;
			config['standardScore'] = d.standardScore;
			config['id'] = d.id;
			return config;
		}

	}
	function getFinallyData(cdata) {
		var data = [];
		if(cdata.length>0){
			$.each(cdata,function (index,item){
				var config = new Object();
				// firstConfig['title'] = item.indicatorCname+'（'+item.standardScore+'）';
				config['fatherName'] = item.indicatorCname;
				if(item.configIndicatorDTOS.length>0){
					$.each(item.configIndicatorDTOS,function (i,d) {
						// config['fatherName']+='——'+d.indicatorCname;
						var newconfig = new Object();
						if(d.configIndicatorDTOS.length>0){
							newconfig['fatherName'] = item.indicatorCname+'——'+d.indicatorCname;
						}else{
							newconfig['fatherName'] = item.indicatorCname
						}
						newconfig = eachFinallyData(d,newconfig,data);
						if($.isPlainObject(newconfig)){
							data.push(newconfig);
						}

					})
				}else{
					// config['fatherName'] = item.indicatorCname;
					config['sort'] = item.sort;
					config['name'] = item.indicatorCname;
					config['comment'] = item.comment;
					config['standardScore'] = item.standardScore;
					config['id'] = item.id;
					data.push(config);
				}
			})
		}
		let tempArr = [];
		afterData = [];
		for (let i = 0; i < data.length; i++) {
			if (tempArr.indexOf(data[i].fatherName) === -1) {
				this.afterData.push({
					fatherName: data[i].fatherName,
					origin: [data[i]]
				});
				tempArr.push(data[i].fatherName);
			} else {
				for (let j = 0; j < this.afterData.length; j++) {
					if (this.afterData[j].fatherName == data[i].fatherName) {
						this.afterData[j].origin.push(data[i]);
						break;
					}
				}
			}
		}
		return afterData;
	}
	//公共ajax封装
	function ajax(commonUrl, url, type, params, async, dataType, contentType, successfn, errorfn) {
		// async = (async==null || async=="" || typeof(async)=="undefined")? "true" : async;
		type = (type==null || type=="" || typeof(type)=="undefined")? "post" : type;
		dataType = (dataType==null || dataType=="" || typeof(dataType)=="undefined")? "json" : dataType;
		contentType = (contentType==null || contentType=="" || typeof(contentType)=="undefined")? "application/x-www-form-urlencoded; charset=UTF-8" : contentType;
		params = (params==null || params=="" || typeof(params)=="undefined")? {"date": new Date().getTime()} : params;
		$.ajax({
			type: type,
			async: async,
			data: params,
			url: commonUrl + url,
			dataType: dataType,
			contentType: contentType,
			// beforeSend:function(res){
			// 	beforefn(res)
			// 	// console.log('看需要写不写,发送前的就是放加载图标的地方,这里显示,success和error函数里就隐藏');
			// },
			success: function (res) {
				successfn(res);
			},
			error: function (res) {
				errorfn(res);
			},
			// complete:function(){
			// 	// console.log('结束 看需要写不写');
			// }
		});
	}
});

//收缩左侧可视化盒子
$(".left_control_btn").click(
	function() {
		$(this).toggleClass("left_control_change_btn");
		$(".control_right").toggleClass("control_right_change");
		$(".control_left").toggle();
	}
);

//实验室信息切换
$(".news_list_container").hover(
	function() {
		$(this).find(".news_list").show();
		$(this).addClass("news_selected");
		$(this).siblings().find(".news_list").hide();
		$(this).siblings().removeClass("news_selected")
	}
);

$(".news_container .news_list_container:nth-child(2)").addClass("news_selected");

//切换学生
$(".card_sub_btn").click(
	function() {
		$(this).addClass("card_sub_btn_select").siblings(".card_sub_btn").removeClass("card_sub_btn_select");
	}
);

//移动端唤起实验室信息
$(".mobile_mode .labinfo").click(
	function() {
		$(".review_limit").slideDown();
		$(".mobile_news_head").show();
	}
);
$(".mobile_mode .mnh_close").click(
	function() {
		$(".review_limit").slideUp();
		$(".mobile_news_head").hide();
	}
);

//移动端唤起评委评语
$(".mobile_mode .judgecomment").click(
	function() {
		$(".judgecomment_box").slideDown();
		$(".duo").hide();
	}
);

//移动端唤起打分项
$(".mobile_mode .scoreline").click(
	function() {
		$(".duo").slideDown();
		$(".judgecomment_box").slideUp();
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
	parent.src = "video/flvvideo"; //判断当前没有flash组件则加载flv播放
} else {
	parent.src = "video/flashvideo"; //判断当前有flash组件则加载flash播放
}