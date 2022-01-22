const evaluationHost =apiGateWayHost+"/configcenter/";
var checked=new Array();
layui.config({
	base:'../../'
}).extend({
	index:'lib/index'
}).use(['index','form', 'element', 'laydate', 'laypage', 'table', 'layer', 'layedit', 'upload'], function() {
	var $ = layui.jquery,
		admin = layui.admin,
		form = layui.form,
		element = layui.element,
		laydate = layui.laydate,
		laypage = layui.laypage,
		table = layui.table,
		layer = layui.layer,
		layedit = layui.layedit,
		upload = layui.upload;

	let timetableId;
	let results;
	let resultId;
	var editorIndexs = [];//副文本框
	var uploadIndexs = [];//上传文件
	var timetableProcessId;
	//向世界问个好
	//layer.msg('');
	let configObj = {
		selectConfig : [],//记录配置项为单选下拉框的下标
		multiSelectConfig : [],//记录配置项为多选下拉框的下标
		inputConfig : [],//记录配置项为输入框的下标
		urlConfig : [],//记录配置项为外链的下标
		textConfig : [],//记录配置项为多行文本框的下标
		fileConfig : [],//记录配置项为附件的下标
		dateConfig : [],//记录配置项为日期的下标
		dateTimeConfig : [],//记录配置项为日期时间的下标
		rangeDateConfig : [],//记录配置项为范围日期的下标
		rangeTimeConfig : [],//记录配置项为范围时间的下标
		rangeDateTimeConfig : [],//记录配置项为范围日期+时间的下标
		radioConfig : [],//记录配置项为单选框的下标
		linkageConfig : [],////记录需要联动的配置项
		checkboxConfig : [],//记录配置项为多选框的下标
		messageConfig : [],//记录配置项为发送短信/邮箱的下标
		auditConfig : [],//记录配置项为审核的下标
		editorConfig : [],//记录配置项为副文本框的下标
	}
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
				timetableProcessId = res.data[0].timetableProcessDTOS[3].timetableProcessId;
				// //获取表单
				// let formstr = '';
				// formstr = configString(res.data[0].timetableProcessDTOS[3]);
				// $('.editachievementbox').find('.layui-row').html(formstr);
				//获取结果
				let resultstr = '';
				$.each(res.data[0].timetableProcessDTOS[3].timetableResults,function (key, value) {
					if(value.initiatorUsername === currentUsername){
						resultstr+=getWorkResult(res.data[0].timetableProcessDTOS[3].configIndicators,value);
					}
				})
				$('.case_box').html(resultstr);
				// configRender();
				resolve('getResult Success')
			}
		});

	})
	Promise.all([getTimetableId, getResultByTimetableId]).then((result) => {
		console.log(result)
	}).catch((error) => {
		console.log(error)
	})
	//信息
	// form.val('editacademicstudentworkachievementbox', {
	// 	"name": "我是名称",
	// 	"info": "我是简介/我是简介/我是简介/我是简介/我是简介/",
	// 	"teaminfo": "我是团队介绍/我是团队介绍/我是团队介绍/我是团队介绍/我是团队介绍/",
	// });
//监听提交
	form.on('submit(saveachievementboxbtn)', function(data) {

		var d1 = data.field;
		var configIndicatorDTOss = [];
		// console.log(d1);
		$.each(configObj.multiSelectConfig,function (index,item){
			var xmList = xmSelect.get('#multiSelectConfig'+item.index);
			var valueArr = xmList[0].getValue('value');
			var nameArr = xmList[0].getValue('name');
			var str = '';
			$.each(valueArr,function (i,d) {
				str+=d+'_'+nameArr[i]+',';
			});
			str = str.slice(0,str.length-1);
			// d1['evaluationScore'+item.index] = xmList[0].getValue('valueStr')+'_'+xmList[0].getValue('nameStr')
			d1['evaluationScore'+item.index] = str;
		});
		$.each(configObj.selectConfig,function (index,item) {
			d1['evaluationScore'+item.index] += '_'+$('#selectConfig'+item.index).find("option:selected").text();
		});
		$.each(configObj.checkboxConfig,function (index,item) {
			let tasks = '';
			$('input[name="evaluationScore'+ item.index +'"]:checked').each(function() { //遍历所有被选中的name为selectFlag的 checkbox
				tasks+=$(this).val()+'_'+$(this).attr('title')+',';
			});
			tasks = (tasks.substring(tasks.length - 1) == ',') ? tasks.substring(0, tasks.length - 1) : tasks
			d1['evaluationScore'+item.index] = tasks;
		});
		$.each(configObj.urlConfig,function (index,item) {
			if(item.type.indexOf('|pay|')!=-1){
				var isPay = $('#evaluationScore'+item.index).attr('data');
				d1['evaluationScore'+item.index] = isPay;
			}else {
				d1['evaluationScore'+item.index] = $('#evaluationScore'+item.index).attr('href')
			}
		});
		// console.log(d1);
		saveTimetable(d1);
	});
	function saveTimetable(d1) {
		let timetableResultDTO = new Object();
		d1['timetableProcessId'] = timetableProcessId;
		d1['initiatorUsername'] = currentUsername;
		timetableResultDTO['timetableResult'] = d1;
		timetableResultDTO['submitUser'] = currentUsername;
		timetableResultDTO['stageId'] = 1;
		timetableResultDTO['isComplete'] = -1;
		timetableResultDTO['timetableProcessId'] = timetableProcessId;
		var data = JSON.stringify(timetableResultDTO);
		// 保存
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
					layer.msg('保存成功');
					$(".showachievementbox").show();
					$(".editachievementbox").hide();
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
	}
	//上传文件，选完文件后不自动上传,点击开始上传按钮上传


	function configString(data) {
		let str = '';
		$.each(data,function (key, value) {
			if(value.contentType === 'input'){
				str+=`<div class="layui-col-lg12">
							<label class="layui-form-label">${value.indicatorCname}</label>
							<div class="layui-input-block">
								<input type="text" name="evaluationScore${key+1}"  autocomplete="on" class="layui-input" lay-verify="required" placeholder="请输入${value.indicatorCname}">
							</div>
						</div>`
			}else if(value.contentType === 'editor'){
				configObj.editorConfig.push({index:key+1,indicatorName: value.indicatorName ? value.indicatorName : ''});
				str+=`<div class="layui-col-lg12">
							<label class="layui-form-label">${value.indicatorCname}</label>
							<div class="layui-input-block">
								<textarea id="editorConfig${key+1}" name="evaluationScore${key+1}" style="display: none;" lay-verify="content"></textarea>
							</div>
						</div>`
			}else if(value.contentType === 'number'){
				str+=`<div class="layui-col-lg12">
							<label class="layui-form-label">${value.indicatorCname}</label>
							<div class="layui-input-block">
								<input type="number" name="evaluationScore${key+1}" autocomplete="on" class="layui-input" lay-verify="required" placeholder="请输入${value.indicatorCname}">
							</div>
						</div>`
			}else if(value.contentType === 'date'){
				configObj.dateConfig.push({index:key+1,indicatorName: value.indicatorName ? value.indicatorName : ''});
				str+=`<div class="layui-col-lg12">
							<label class="layui-form-label">${value.indicatorCname}</label>
							<div class="layui-input-block">
								<input type="imput" id="dateConfig${key+1}" name="evaluationScore${key+1}" autocomplete="on" class="layui-input" lay-verify="required" placeholder="请选择${value.indicatorCname}">
							</div>
						</div>`
			}else if(value.contentType === 'dateTime'){
				configObj.dateTimeConfig.push({index:key+1,indicatorName: value.indicatorName ? value.indicatorName : ''});
				str+=`<div class="layui-col-lg12">
							<label class="layui-form-label">${value.indicatorCname}</label>
							<div class="layui-input-block">
								<input type="imput" id="dateTimeConfig${key+1}" name="evaluationScore${key+1}" autocomplete="on" class="layui-input" lay-verify="required" placeholder="请选择${value.indicatorCname}">
							</div>
						</div>`
			}else if(value.contentType === 'rangeDate'){
				configObj.rangeDateConfig.push({index:key+1,indicatorName: value.indicatorName ? value.indicatorName : ''});
				str+=`<div class="layui-col-lg12">
							<label class="layui-form-label">${value.indicatorCname}</label>
							<div class="layui-input-block">
								<input type="imput" id="rangeDateConfig${key+1}" name="evaluationScore${key+1}" autocomplete="on" class="layui-input" lay-verify="required" placeholder="请选择${value.indicatorCname}">
							</div>
						</div>`
			}else if(value.contentType === 'rangeDateTime'){
				configObj.rangeDateTimeConfig.push({index:key+1,indicatorName: value.indicatorName ? value.indicatorName : ''});
				str+=`<div class="layui-col-lg12">
							<label class="layui-form-label">${value.indicatorCname}</label>
							<div class="layui-input-block">
								<input type="imput" id="rangeDateTimeConfig${key+1}" name="evaluationScore${key+1}" autocomplete="on" class="layui-input" lay-verify="required" placeholder="请选择${value.indicatorCname}">
							</div>
						</div>`
			}else if(value.contentType === 'multiSelect'){
				configObj.multiSelectConfig.push({index: (key + 1), url: value.url, configIndicatorDTOS: value.configIndicatorDTOS, type: value.indicatorName ? value.indicatorName : ''});
				str+=`<div class="layui-col-lg12">
							<label class="layui-form-label">${value.indicatorCname}</label>
							<div class="layui-input-block">
								<div id="multiSelectConfig${key+1}" class="xm-select-demo"></div>
							</div>
						</div>`
			}else if(value.contentType === 'select'){
				let selectObject = new Object();
				selectObject['index'] = key+1;
				selectObject['url'] = value.url;
				selectObject['type'] = value.indicatorName ? value.indicatorName : '';
				selectObject['id'] = value.id;
				selectObject['configIndicatorDTOS'] = value.configIndicatorDTOS;
				if (value.indicatorName && value.indicatorName.indexOf('|linkage') != -1) {
					for (var j = 0; j < value.indicatorName.split('|').length; j++) {
						if (value.indicatorName.split('|')[j].indexOf('linkage') != -1) {
							selectObject['parentId'] = value.indicatorName.split('|')[j].replace(/[^0-9]/ig, "");
						}
					}
					selectObject['linkageType'] = 'select';
					configObj.linkageConfig.push(selectObject);
				}
				configObj.selectConfig.push(selectObject)
				str+=`<div class="layui-col-lg12">
							<label class="layui-form-label">${value.indicatorCname}</label>
							<div class="layui-input-block">
								<select name="evaluationScore${key+1}" id="selectConfig${key+1}" lay-verify="required" lay-filter="select${key+1}" lay-search="">
									<option value="">请选择${value.indicatorCname}</option>
								</select>
							</div>
						</div>`
			}else if(value.contentType === 'text'){
				let textObject = new Object();
				textObject['index'] = (key + 1);
				textObject['type'] = value.indicatorName ? value.indicatorName : '';
				textObject['id'] = value.id;
				textObject['url'] = value.url;
				// textConfig.push((index+1));
				if (value.indicatorName && value.indicatorName.indexOf('linkage') != -1) {
					for (var j = 0; j < value.indicatorName.split('|').length; j++) {
						if (value.indicatorName.split('|')[j].indexOf('linkage') != -1) {
							textObject['parentId'] = value.indicatorName.split('|')[j].replace(/[^0-9]/ig, "");
						}
					}
					textObject['linkageType'] = 'text';
					// linkageType = 'text';
					str += `<div class="layui-col-lg12">
	 							<label class="layui-form-label">${value.indicatorCname}</label>
	 							<div class="layui-input-block">
	 								<textarea type="text"  id="textConfig${key+1}" name="evaluationScore${key+1}"   placeholder="请填写${value.indicatorCname}" autocomplete="on" class="layui-textarea" readonly="" ></textarea>
	 							</div>
	 						</div>`;
					configObj.linkageConfig.push(textObject);
				}else {
					str += `<div class="layui-col-lg12">
	 							<label class="layui-form-label">${value.indicatorCname}</label>
	 							<div class="layui-input-block">
	 								<textarea type="text"  id="textConfig${key+1}" name="evaluationScore${key+1}"   placeholder="请填写${value.indicatorCname}" autocomplete="on" class="layui-textarea"></textarea>
	 							</div>
	 						</div>`;
				}
				configObj.textConfig.push(textObject);
			}else if (value.contentType == 'radio') {
				configObj.radioConfig.push({index: (key + 1), url: value.url, type: value.indicatorName ? value.indicatorName : ''});
				if (value.indicatorName && value.indicatorName.indexOf('audit')!=-1) {
					$('.stepInfo').click();
					configObj.auditConfig.push((key + 1));
				} else if (value.indicatorName && value.indicatorName.indexOf('|message|')!=-1){
					configObj.messageConfig.push((key + 1));
				}
				str += `<div class="layui-col-lg12">
 							<label class="layui-form-label">${value.indicatorCname}</label>
 							<div class="layui-input-block">`
				if(value.indicatorOptions ==  null||value.indicatorOptions==''){
					str+=`<input type="radio" name="evaluationScore${key+1}" value="1" title="是">
					      <input type="radio" name="evaluationScore${key+1}" value="0" title="否">`;
				}else{
					let options = value.indicatorOptions.indexOf(',')!=-1?value.indicatorOptions.split(','):value.indicatorOptions.split('，');
					$.each(options,function (j,o) {
						str+=`<input type="radio" name="evaluationScore${key+1}" value="${j+1}" title="${o}">`
					})
				}
				// '<input type="text" id="isAudit'+ templateId +'" name="isAudit'+ templateId +'"  lay-verify="required" placeholder="请选择'+ item.indicatorCname +'" autocomplete="off" class="layui-input" />' +
				str+=`</div></div>`;
			}else if (value.contentType == 'checkbox') {
				configObj.checkboxConfig.push({index: (key + 1), url: value.url, type: value.indicatorName ? value.indicatorName : ''});
				str += `<div class="layui-col-lg12">
 							<label class="layui-form-label">${value.indicatorCname}</label>
 							<div class="layui-input-block" style="padding-top: 5px;">`
				let options = value.indicatorOptions.indexOf(',')!=-1?value.indicatorOptions.split(','):value.indicatorOptions.split('，');
				$.each(options,function (j,o) {
					str+=`<input type="checkbox" lay-skin="primary" name="evaluationScore${key+1}" value="${j+1}" title="${o}">`
				})
				str+=`</div></div>`;
			}else if (value.contentType == 'file') {
				configObj.fileConfig.push({index: (key + 1), type: value.indicatorName ? value.indicatorName : ''});
				let step = 0;
				$('.subentry_tab a').each(function () {
					if($(this).hasClass('field_btn_select'))
						step = $(this).index()+1;
				})
				str += `<div class="layui-col-lg12">
 							<label class="layui-form-label">${value.indicatorCname}</label>
 							<div class="layui-input-block" style="padding-top: 5px;">`
				str+=`
<!--<div class="mix_uploadbox">
// 						<div class="layui-upload">
// 							<div class="layui-upload-drag" id="uploadFile${key + 1}">
// 								<i class="layui-icon"></i>
// 								<p>点击选择文件，或将文件拖拽到此处</p>
// 							</div>
// 							<div class="layui-upload-list">
// 								<table class="layui-table">
// 									<thead>
// 										<tr>
// 											<th>文件名</th>
// 											<th>大小</th>
// 											<th>状态</th>
// 											<th>操作</th>
// 										</tr>
// 									</thead>
// 									<tbody id="pblist${key+1}"></tbody>
// 								</table>
// 								<div class="upload_btn">
// 									<input type="button" class="layui-btn" id="uploadfilesbtn${key + 1}" value="开始上传文件" />
// 								</div>
// 							</div>
// 						</div>
// 						</div>-->
<button type="button" class="layui-btn" onclick="uploadFileMeeting(${(key + 1)},3)">上传附件</button>
					 <input id="fileUpload${ (key + 1)}_3" name="evaluationScore${ (key + 1)}" class="layui-input layui-disabled" disabled=""/>
					 </div></div>`;
			}else if(value.contentType === 'url'){
				let urlObject = new Object();
				urlObject['index'] = (key + 1);
				urlObject['type'] = value.indicatorName ? value.indicatorName : '';
				urlObject['id'] = value.id;
				urlObject['url'] = value.url;
				if (value.indicatorName && value.indicatorName.indexOf('linkage') != -1) {
					for (var j = 0; j < value.indicatorName.split('|').length; j++) {
						if (value.indicatorName.split('|')[j].indexOf('linkage') != -1) {
							urlObject['parentId'] = value.indicatorName.split('|')[j].replace(/[^0-9]/ig, "");
						}
					}
					urlObject['linkageType'] = 'url';
					linkageConfig.push(urlObject);
				}
				configObj.urlConfig.push(urlObject);
				if (value.url == null) {
					value.url = 'http://www.baidu.com'
				}
				str += `<div class="layui-col-lg12">
 							<label class="layui-form-label">${value.indicatorCname}</label>
 							<div class="layui-input-block" style="padding-top: 5px;">`
				let globalVariableFlag = false;
				if (value.indicatorName && value.indicatorName.indexOf('|pay|') != -1) {//支付必须先提交
					str += `<a id="evaluationScore${key+1}" data="0" onclick="firstSubmit('${value.url}',this)" >点我进入${value.indicatorCname}</a>`
				} else if (value.indicatorName && value.indicatorName.indexOf('|linkage') != -1) {//联动框
					str += `<a id="evaluationScore${key+1}" target="_blank" ></a>`;
				} else if (value.indicatorName && value.indicatorName.indexOf('|current|') != -1 || value.indicatorName == 'current') {//当前登录
					str += `<a id="evaluationScore${key+1}" target="_blank" >点我进入${value.indicatorCname}</a>`;
				} else {
					str += `<a id="evaluationScore${key+1}" href="${value.url}?username=${currentUsername}" target="_blank">点我进入${value.indicatorCname}</a>`;
				}
				str += `</div></div>`;
			}
		})
		return str;
	}
	//上传附件
	window.uploadFileMeeting = function (index,step) {
		let temp = `学生成果上传_${currentUsername}`
		openUploadWindowByPath('配置中心/学业导师/'+temp,index,step);
	};
	function configRender() {
		$.each(configObj.fileConfig,function (index, item) {
			//导入
			var pblist = $(`#pblist${item.index}`),
				uploadListIns = upload.render({
					elem: `#uploadFile${item.index}`,
					url: '/upload/', //上传接口
					accept: 'file', //所有文件
					multiple: true, //多个上传
					auto: false, //是否直接选择文件后上传
					data: {isLayui: false},
					bindAction: `#uploadfilesbtn${item.index}`, //上传按钮
					choose: function(obj) {
						var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
						//读取本地文件
						obj.preview(function(index, file, result) {
							var tr = $(['<tr id="upload-' + index + '">', '<td class="wordbreak">' + file.name + '</td>', '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>', '<td>等待上传</td>', '<td>', '<button class="layui-btn layui-btn-xs demo-reload" onClick="return false;">重传</button>', '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>', '</td>', '</tr>'].join(''));

							//单个重传
							tr.find('.demo-reload').on('click', function() {
								obj.upload(index, file);
							});

							//删除
							tr.find('.demo-delete').on('click', function() {
								delete files[index]; //删除对应的文件
								tr.remove();
								uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
							});

							pblist.append(tr);
						});
					},
					done: function(res, index, upload) {
						if(res.code == 0) { //上传成功
							var tr = pblist.find('tr#upload-' + index),
								tds = tr.children();
							tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
							tds.eq(3).html(''); //清空操作
							return delete this.files[index]; //删除文件队列已经上传成功的文件
						}
						this.error(index, upload);
					},
					error: function(index, upload) {
						var tr = pblist.find('tr#upload-' + index),
							tds = tr.children();
						tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
						tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
					}
				});
			uploadIndexs.push(pblist);
		})
		//单选框
		$.each(configObj.selectConfig,function (index,item) {
			// var url = zuulHost+item.url;
			// var regex = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/;
			if(!item.url){
				$.each(item.configIndicatorDTOS,function (i, d) {
					$('#selectConfig'+item.index).append(new Option(d.indicatorCname, d.id));// 下拉菜单里添加元素
				});
				form.render("select");
				return true;
			}
			var regex = new RegExp("http");
			if(item.url && regex.test(item.url)){
				var url =item.url;
			}else{
				var url=zuulHost+item.url;
			}
			if(item.type.indexOf('|current|')!=-1){
				url += url.indexOf('?')!=-1 ? '&username='+currusername : '?username='+currusername
			}
			$.ajax({
				url: url,
				dataType: 'json',
				async: false,
				type: 'post',
				// headers: {"x-datasource": "limsproduct"},
				success: function (res) {
					// console.log(res)
					$.each(res.data, function (i, d) {
						$('#selectConfig'+item.index).append(new Option(d.text, d.id));// 下拉菜单里添加元素
					});
					form.render("select");
					if(item.type.indexOf('|linkage|')!=-1){
						let filter = 'select'+item.index;
						form.on('select('+filter+')', function(data){
							console.log(data.value); //得到被选中的值
							var son;
							$.each(linkageConfig,function (i,d) {
								// })
								switch (d.linkageType) {
									case 'select' :
										if(item.id == d.parentId){
											son = d;
											// var regex = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/;
											var regex =  new RegExp("http");
											let sonurl = son.url
											if(!regex.test(son.url)){
												sonurl = zuulHost + sonurl;
											}
											sonurl += sonurl.indexOf('?')!=-1 ? '&id='+data.value : '?id='+data.value
											if(son.type.indexOf('|current|')!=-1){
												sonurl += '&username='+currusername
											}
											$.ajax({
												url: sonurl,
												dataType: 'json',
												async: false,
												type: 'post',
												success: function (res) {
													$('#selectConfig'+son.index).empty();
													$('#selectConfig'+son.index).prepend('<option value="">请选择</option>')
													$.each(res.data, function (ii, dd) {
														$('#selectConfig'+son.index).append(new Option(dd.text, dd.id));// 下拉菜单里添加元素
													});
													form.render("select");
												}
											});
										}
										break;
									case 'text' :
										// $.each(textConfig,function (i,d) {
										if(item.id == d.parentId){
											son = d;
											// var regex = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/;
											var regex =  new RegExp("http");
											let sonurl = son.url
											if(!regex.test(son.url)){
												sonurl =zuulHost+sonurl;
											}
											$.ajax({
												url: sonurl+'?id='+data.value,
												dataType: 'json',
												async: false,
												type: 'get',
												success: function (res) {
													// console.log(res)
													var str = '';
													if(res.data.length>0){
														$.each(res.data[0],function (i) {
															str+=i+'：'+res.data[0][i]+'\n'
														})
													}
													$('#textConfig'+son.index).text(str);
												}
											});
										}
										// })
										break;
									case 'url' :
										if(item.id == d.parentId){
											son = d;
											if(son.url.indexOf('resourceCloud')!=-1){//教学平台课程资源展示
												let courseInfo = `${data.value}_${$(data.elem).find('option:selected').text()}`
												$('#evaluationScore'+son.index).text('点我查看课程资源');
												$('#evaluationScore'+son.index).attr('href',son.url + '?username=' + currentUsername + '&globalVariable=' + courseInfo);
											}else{
												// var regex = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/;
												var regex =  new RegExp("http");
												let sonurl = son.url
												if(!regex.test(son.url)){
													sonurl =zuulHost+sonurl;
												}
												$.ajax({
													url: sonurl+'?id='+data.value,
													dataType: 'json',
													async: false,
													type: 'get',
													success: function (res) {
														// console.log(res)
														var str = '';
														if(res.data.length>0){
															$.each(res.data[0],function (i) {
																if(i == 'text')
																	str+=res.data[0][i];
															})
														}
														$('#evaluationScore'+son.index).text(str);
														$('#evaluationScore'+son.index).attr('href',str);
													}
												});
											}

										}
										break;
									case 'table' :
										if(item.id == d.parentId){
											son = d;
										}
										//获取表头
										var cols = [];
										var listUrl = '';
										var regex = new RegExp("http");
										listUrl += regex.test(son.url) ? son.url : zuulHost+son.url
										listUrl += listUrl.indexOf('?')!=-1 ? '&timetableId='+data.value+'&templateId='+templateId : '?timetableId='+data.value+'&templateId='+templateId
										$.ajax({
											url:listUrl,
											async:false,
											success: function (res) {
												var coll = [];
												var col = [];
												if(son.type.indexOf('|checkbox|')!=-1){
													col.push(
														{type:'checkbox'},
													);
												}
												col.push(
													{title:'序号',minWidth:50,align: 'center',type:"numbers"},
													// {field: 'name',title:'名称',minWidth:100,align: 'center'},
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
												}else if(res.code == 500){
													layer.msg(res.msg);
												}
												// col.push(
												//     {title: '操作', align: 'center',width: 200, toolbar: '#toolbar'}
												// );
												coll.push(col);
												cols = coll;
											}
										})
										table.reload('evaluationScoreTable_'+son.index, {
											url: listUrl
											,cols: cols
										});
										break;
									default :
										console.error('未找到联动相关项!');
								}
							})
						});
					}
				}
			});
		});
		//多选
		$.each(configObj.multiSelectConfig,function (index,item) {
			var multis = 'multiSelectConfig'+item.index;
			// var regex = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/;
			var regex = new RegExp("http");
			if(regex.test(item.url)){
				var url =item.url;
			}else{
				var url=zuulHost+item.url;
			}
			if(item.type == 'current' || item.type.indexOf('|current|') != -1) {
				url += url.indexOf('?')!=-1 ? '&username='+currusername : '?username='+currusername
			}
			if(item.type.indexOf('|search|')!=-1){//数据过多需要筛选 远程搜索
				multis = xmSelect.render({
					el: '#multiSelectConfig'+item.index,
					name: 'evaluationScore'+item.index,
					layVerify: 'required',
					autoRow: true,
					// toolbar: { show: true,showIcon: false },
					filterable: true,
					remoteSearch: true,
					theme: {color: '#1E9FFF'},
					model: {icon: 'hidden'},
					remoteMethod: function(val, cb, show){
						//这里如果val为空, 则不触发搜索
						if(!val){
							return cb([]);
						}
						url = funcUrlDel('keyword',url);
						url += url.indexOf('?')!=-1 ? '&keyword='+val : '?keyword='+val
						$.ajax({
							url: url,
							async: false,
							type: 'get',
							// headers: {"x-datasource": "limsproduct"},
							success: function (res) {
								var data1 = [];
								$.each(res.data, function (index, item) {
									var d = {name: item.text,value: item.id};
									data1.push(d);
									// str+='<option value="'+ item.id +'">'+ item.text +'</option>'
								});
								cb(data1)
							}
						});
					}
				});
			}else{
				multis = xmSelect.render({
					el: '#multiSelectConfig'+item.index,
					name: 'evaluationScore'+item.index,
					filterable: true,
					layVerify: 'required',
					// toolbar: {show: true, showIcon: false},
					theme: {color: '#1E9FFF',},
					model: {icon: 'hidden',},
					data: []
				});
				if(item.url!=null || item.url!=''){
					$.ajax({
						url: url,
						dataType: 'json',
						async: false,
						type: 'post',
						success: function (res) {
							var data1 = [];
							$.each(res.data, function (index, item) {
								var d = {name: item.text,value: item.id};
								data1.push(d);
								// str+='<option value="'+ item.id +'">'+ item.text +'</option>'
							});
							multis.update({
								data:data1
							})
						}
					});
				}else{
					var data1 = [];
					$.each(item.configIndicatorDTOS,function (i, d) {
						var o = {name: d.indicatorCname,value: d.id};
						data1.push(o);
						// str+='<option value="'+ item.id +'">'+ item.text +'</option>'
					});
					multis.update({
						data:data1
					})
				}
			}
		});
		//链接
		$.each(configObj.urlConfig,function (index,item) {
			var url = '';
			if(item.url != null || item.url != '') {
				if (item.type == 'current' || item.type.indexOf('|current|') != -1) {
					// var regex = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/;
					var regex = new RegExp("http");
					if (regex.test(item.url)) {
						url += item.url;
					} else {
						url += zuulHost + item.url;
					}
					url += url.indexOf('?')!=-1 ? '&username='+currusername : '?username='+currusername
					$.ajax({
						url: url,
						// dataType: 'json',
						async: false,
						type: 'get',
						success: function (res) {
							if (Array.isArray(res.data)) {
								// $('#evaluationScore'+item.index).text(res.data[0].text);
								$('#evaluationScore' + item.index).attr('href', res.data[0].text);
							} else {
								// $('#evaluationScore'+item.index).text(res.data.text);
								$('#evaluationScore' + item.index).attr('href', res.data.text);
							}
							// console.log(res)
						}
					});
				}
			}
		});
		//文本框
		$.each(configObj.textConfig,function (index,item) {
			var url = '';
			if(item.url != null || item.url != '') {
				if (item.type == 'current' || item.type.indexOf('|current|') != -1) {
					// var regex = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/;
					var regex = new RegExp("http");
					if (regex.test(item.url)) {
						url += item.url;
					} else {
						url += zuulHost + item.url;
					}
					url += url.indexOf('?')!=-1 ? '&username='+currusername : '?username='+currusername
					$.ajax({
						url: url,
						// dataType: 'json',
						async: false,
						type: 'get',
						success: function (res) {
							if (Array.isArray(res.data)) {
								$('#textConfig'+item.index).text(res.data[0].text)
							} else {
								$('#textConfig'+item.index).text(res.data.text)
							}
							// console.log(res)
						}
					});
				}
			}
			$('#textConfig'+item.index).textareafullscreen();
		});
		//副文本框
		$.each(configObj.editorConfig,function (index,item) {
			//建立编辑器
			var editorIndex = layedit.build(`editorConfig${item.index}`, {
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
			editorIndexs.push(editorIndex);
		});

		//日期
		$.each(configObj.dateConfig,function (index,item) {
			if(item.indicatorName && item.indicatorName.indexOf('|currentDate|')!=-1){
				laydate.render({
					elem: '#dateConfig'+item.index,
					trigger: 'click',
					value: new Date(),
				});
				$('#dateConfig'+item.index).attr('disabled','disabled');
			}else if(item.indicatorName && item.indicatorName.indexOf('|wednesday|')!=-1){
				let weekday = getDay(new Date());
				laydate.render({
					elem: '#dateConfig'+item.index,
					trigger: 'click',
					value: weekday,
				});
			}else{
				laydate.render({
					elem: '#dateConfig'+item.index,
					trigger: 'click',
				});
			}

		});
		//日期时间
		$.each(configObj.dateTimeConfig,function (index,item) {
			if(item.indicatorName && item.indicatorName.indexOf('|current|')!=-1){
				laydate.render({
					elem: '#dateTimeConfig'+item.index,
					type: 'datetime',
					trigger: 'click',
					value: new Date()
				});
				$('#dateTimeConfig'+item.index).attr('disabled','disabled');
				setInterval(function () {
					var date = new Date();
					var y = date.getFullYear();
					var m = date.getMonth()+1;
					var d = date.getDate();
					var h = date.getHours();
					var min = date.getMinutes();
					var s = date.getSeconds();
					var str=y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d)+'  '+(h<10?('0'+h):h)+':'+(min<10?('0'+min):min)+':'+(s<10?('0'+s):s);
					$('#dateTimeConfig'+item.index).val(str);
				}, 1000);
			}else{
				laydate.render({
					elem: '#dateTimeConfig'+item.index,
					type: 'datetime',
					trigger: 'click',
				});
			}

		});
		//日期范围
		$.each(configObj.rangeDateConfig,function (index,item) {
			laydate.render({
				elem: '#rangeDateConfig'+item.index,
				trigger: 'click'
				// min:minDate()
				, range: '~'
			});
		});
		//日期时间范围
		$.each(configObj.rangeDateTimeConfig,function (index,item) {
			laydate.render({
				elem: '#rangeDateTimeConfig'+item.index
				,trigger: 'click'
				,type: 'datetime'
				// min:minDate()
				, range: '~'
			});
		});
		window.getDay = function (dd) {
			var week = dd.getDay(); //获取时间的星期数
			var minus = (week - 3) >= 0 ? -(7- week + 3) : week - 3;
			dd.setDate(dd.getDate() - minus); //获取minus天前的日期
			var y = dd.getFullYear();
			var m = dd.getMonth() + 1; //获取月份
			var d = dd.getDate();
			return y + "-" + m + "-" + d;
		}
	}
	function getWorkResult(configIndicators,data) {
		let str = `<div class="case_main_tit">
						<input type="button" class="layui-input readinputbtn" autocomplete="off" disabled="disabled" readonly="readonly" value="个人成果" />
					</div>`
		$.each(configIndicators, function (key, value) {
			let evaluationScore = 'evaluationScore'+(key+1);
			if(value.contentType !== 'file'){
				str+=`<div class="case_nav">
						<div class="case_nav_tit">${value.indicatorCname}</div>
						<input type="button" class="layui-input readinputbtn" autocomplete="off" disabled="disabled" readonly="readonly" value="${data[evaluationScore]}"/>
								<!--调试时可暂时把disabled与readonly删除。此行仅为提示，可删。-->
					</div>`
			}else{
				str+=`<div class="case_nav">
						<div class="case_nav_tit">文件资料
							<div class="layui-inline font_normal mt0-5">
								<input type="button" class="layui-btn layui-btn-xs" value="全部下载">
								<input type="button" class="layui-btn layui-btn-xs layui-btn-green" value="所选文件下载">
								<input type="text" class="startvalue" hidden="" placeholder="shift键选择" />
								<input type="text" class="ivalue" hidden="" placeholder="ctrl键选择" />
								<font class="font_grey">(可按住ctrl键点选或按住shift键连选)</font>
							</div>
						</div>
						<div class="pictext_box opacity_box mt10">`
						$.each(data[evaluationScore].split(','),function (index, item) {
							str+=`<div class="pictext_net opacity1" title="${item.split('_')[item.split('_').length-1]}">
										<div class="pn_img_box">
											<div class="pn_img">
												<img src="/teacherInformationCenter/modules/configcenter/static/images/audio.png">
											</div>
										</div>
										<div class="pn_info">${item.split('_')[item.split('_').length-1]}</div>
									</div>`
						});
				str+=`</div>
					</div>`
			}
		})
		return str;
	}
});

//工作成果编辑查看
$(".editachievementboxbtn").click(
	function() {
		$(".editachievementbox").show();
		$(".showachievementbox").hide();
	}
);

// $(".saveachievementboxbtn").click(
// 	function() {
// 		$(".showachievementbox").show();
// 		$(".editachievementbox").hide();
// 	}
// );

$(".cancelachievementboxbtn").click(
	function() {
		$(".showachievementbox").show();
		$(".editachievementbox").hide();
	}
);

//传递子页面锚
$(function() {
	$(".layui-tab-title li a").click(function() {
		var name = $(this).attr("name");
		top.location.hash = name; //设置锚点
	});
});