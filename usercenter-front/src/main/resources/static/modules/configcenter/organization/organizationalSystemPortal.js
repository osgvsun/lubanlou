let cdata = new Array(); //全量數據
let steps = [];
let textareafullscreens = [];//需要全屏的textarea
const zuulHost =apiGateWayHost;
layui.config({
	base:'../../'
}).extend({
	index:'lib/index'
}).use(['index','laypage', 'layer', 'table', 'element', 'form'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form

	//向世界问个好
	// layer.msg('查看详情');
	//筛选条件
	// var cdata = [];
	var filterData = [];
	var maxLevel = 1;
	var data1 = [];
	var data2 = [];
	var data3 = [];
	function NodeComponent(obj) {
		this.clickUid = obj.clickUid;
		this.templateId = obj.templateId;
		this.processId = obj.processId;
		this.timetableId = obj.timetableId;
		this.info = obj.info;
	}
	function FormIndicatorComponent(data) {
		this.data = data;
		this.timetableId = null;
		this.timetableResults = [];
		this.formNames = [];
		this.render = function () {
			// console.log(formIndicator);
			configObj = {
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
			}
			// let str = configStr();
			// $('.form_indicators').html(str);
			// configRender();
			// form.render();
			$.ajax({
				url: configCenterHost +'api/timetable/infoByExactSearch',
				type: 'post',
				data:JSON.stringify({templateId: nodeComponent.templateId,page:1,limit:999}),
				async: false,
				contentType: "application/json;charset=UTF-8",
				success: function (res) {
					// console.log(res)
					let select_index = $(".field_btn_box a").index($(".field_btn_box").find('.field_btn_select'))
					if(res.data.length>0){
						$.each(res.data,function (key, value) {
							if(value.businessId == nodeComponent.clickUid){
								steps = [];
								formIndicator.timetableId = value.id;
								$.each(value.timetableProcessDTOS,function (key,value) {
									$(".field_btn_box a").eq(key).attr('timetableProcess-id',value.timetableProcessId)
								})
								let step = 0;
								$('.subentry_tab a').each(function () {
									if($(this).hasClass('field_btn_select'))
										step = $(this).index()+1;
								})
								value.timetableProcessDTOS[select_index]['processStep'] = step;
								let str = configInputByInfo(value.timetableProcessDTOS[select_index],value,select_index);
								$('#detail').html(str);
								formIndicator.timetableResults = value.timetableProcessDTOS[select_index].timetableResults;
								if(formIndicator.timetableResults.length>0){
									var params = getResultByInfo(value);
									$.each(steps,function (i,d) {
										form.val('organizationalsystemportalbox', params[i]);
									})
									fileInit();
								}
								$('textarea').each(function () {
									$(this).flexText();
									$(this).hide();
								})
								return false;
							}
						})
					}else{
						$('#detail').html('');
					}
					$('#detail').show();
				},
				error:function () {
					alert("获取业务数据失败！");
				}
			})
		};
		this.init = function (processId) {
			formIndicator.formNames = [];
			formIndicator.timetableResults = [];
			if(!processId){
				formIndicator.data = [];
				formIndicator.render();
			}else{
				let that = this;
				$.ajax({
					url: configCenterHost +'api/configIndicator/list?templateProcessId='+processId+'&page=1&limit=999',
					dataType: 'json',
					async: false,
					type: 'get',
					success: function (res) {
						formIndicator.data = res.data;
						formIndicator.render();
					},
					error:function () {
						alert("获取指标项失败！");
					}
				})
			}
		}
	}
	function filterInit(nowLevel,targetId,url,state) {
		$.ajax({
			url: url,
			async: false,
			success: function (res) {
				// console.log(res);
				filterData = [];
				let level = Number(targetId.replace(/[^0-9]/ig, ""));
				if(nowLevel>maxLevel){
					maxLevel = nowLevel;
				}else if(nowLevel<maxLevel){
					for(let i = nowLevel+1 ; i<(maxLevel+1);i++){
						$(`#level_${i}`).comboboxfilter('loadData', filterData);
						$('.selected-tag').each(function (key, value) {
							if($(this).hasClass(`level_${i}`)){
								$(this).remove();
							}
						})
					}
				}
				if(res.data){
					cdata = res;
					let getOne = false;//如果有指定1级节点就只显示此一级节点以下的节点
					if(state!=null && uid != -1 && state == 'first'){
						filterData.push({
							'id': res.data.uid,
							'text': res.data.attribute.name,
							'attribute': res.data.attribute,
							'index': 0,
						})
					}else{
						$.each(res.data.children,function (key, value) {
							filterData.push({
								'id': value.uid,
								'text': value.attribute.name,
								'attribute': value.attribute,
								'index': key,
							})
						})
					}
					// $.each(res.data.children,function (key, value) {
					// 	if(uid!=null && uid == value.uid){
					// 		filterData.push({
					// 			'id': value.uid,
					// 			'text': value.attribute.name,
					// 			'attribute': value.attribute,
					// 			'index': key,
					// 		})
					// 		getOne = true;
					// 		return false;
					// 	}
					// })
					// if(!getOne){
					//
					// }
					if($(`#${targetId}`).length > 0) {
						//元素存在时执行的代码
						$(`#${targetId}`).comboboxfilter('loadData', filterData);
					}else{
						if(res.data.children.length>0){
							$('.tag_box').append(`<div id="${targetId}"></div>`);
							$(`#${targetId}`).comboboxfilter({
								url: '',
								scope: 'material',
								text: `${level}级栏目：`,
								unlimitText: '全部',
								multiple: false,
								data: filterData,
								onChange  : function(choose){
									// console.log(choose);
									if(choose)
										filterInit(level,`level_${level+1}`,`${configCenterHost}api/organization/hierarchy?uid=${choose}`);
								},
								onClick: function(itemData) {//单击事件，当前点击documnet对象对应的数据对象
									console.log(itemData);
									getInfo(level,itemData);
								},
							});
						}
					}
				}
			},
			error: function (err, msg) {
				console.error(err);
			}
		});
		$('.any').hide()
	}
	function getInfo(level,itemData){
		let orgStr = '';
		let subStr = '';
		let org = cdata.data;

		for(let i = 0; i<level;i++){
			let value = $(`#level_${i+1}`).comboboxfilter('getValue');
			// console.log(value);
			orgStr += (i+1) === level ? `<li class="layui-this"><a data="${value.value}">${value.text}</a></li>` : `<li><a data="${value.value}">${value.text}</a></li><li style="display: inline">></li>`
			if((i+1) === level) {
				nodeComponent.clickUid = value.value;
				nodeComponent.templateId = itemData.attribute.templateId;
				nodeComponent.info = itemData;
			}
		}
		if(nodeComponent.info.attribute.customField && JSON.stringify(nodeComponent.info.attribute.customField) != "{}" && nodeComponent.info.attribute.customField.url){
			// if(nodeComponent.info.attribute.customField.url){
			let regex = new RegExp("http");
			let url = '';
			if(regex.test(nodeComponent.info.attribute.customField.url)){
				url =nodeComponent.info.attribute.customField.url;
			}else{
				url='http://'+nodeComponent.info.attribute.customField.url;
			}
			// $('.content-detail').find('iframe').remove();
			// $('.content-detail').append(`<iframe style="width: 100%;height: 850px" id="attr_url" src="${url}"></iframe>`);
			// $('.content-local').removeClass('layui-show');
			// $('.content-local').hide();
			getProcess('change',url);
			// }
		}else{
			$('.content-detail').find('iframe').remove();
			$('.content-local').show();
			getProcess('change');
		}
		$('.organizational_tab').html(orgStr);
		element.on('tab(organizational_tab)', function(data){
			// console.log(this); //当前Tab标题所在的原始DOM元素
			// console.log(data.index); //得到当前Tab的所在下标
			// console.log(data.elem); //得到当前的Tab大容器
			$.ajax({
				url:  configCenterHost +'api/organization/hierarchy?uid='+$(this).find('a').attr('data'),
				success: function (res) {
					// console.log(res);
					nodeComponent.clickUid = res.data.uid;
					nodeComponent.templateId = res.data.attribute.templateId;
					nodeComponent.info = res.data;
					if(nodeComponent.info.attribute.customField && JSON.stringify(nodeComponent.info.attribute.customField) != "{}" && nodeComponent.info.attribute.customField.url){
						// if(nodeComponent.info.attribute.customField.url){
						let regex = new RegExp("http");
						let url = '';
						if(regex.test(nodeComponent.info.attribute.customField.url)){
							url =nodeComponent.info.attribute.customField.url;
						}else{
							url='http://'+nodeComponent.info.attribute.customField.url;
						}
						// $('.content-detail').find('iframe').remove();
						// $('.content-detail').append(`<iframe style="width: 100%;height: 850px" id="attr_url" src="${url}"></iframe>`);
						// $('.content-local').removeClass('layui-show');
						// $('.content-local').hide();
						getProcess('change',url);
						// }
					}else{
						$('.content-detail').find('iframe').remove();
						$('.content-local').show();
						getProcess('change');
					}
				},
				error: function (err, msg) {
					console.error(err);
				}
			});
		});
	}
	$('#level_1').comboboxfilter({
		url: '',
		scope: 'material',
		text: '1级栏目：',
		unlimitText: '全部',
		multiple: false,
		data: data1,
		onChange  : function(choose){//值改变事件 参数为当前已经选择的全部值
			// console.log(choose);
			if(choose)
				filterInit(1,'level_2',`${configCenterHost}api/organization/hierarchy?uid=${choose}`);
		},
		onClick: function(itemData) {//单击事件，当前点击documnet对象对应的数据对象
			console.log(itemData);
			getInfo(1,itemData);
		},

	});
	$('#level_2').comboboxfilter({
		url: '',
		scope: 'material',
		text: '2级栏目：',
		unlimitText: '全部',
		multiple: false,
		data: data2,
		onChange  : function(choose){
			// console.log(choose);
			if(choose)
				filterInit(2,'level_3',`${configCenterHost}api/organization/hierarchy?uid=${choose}`);
		},
		onClick: function(itemData) {//单击事件，当前点击documnet对象对应的数据对象
			console.log(itemData);
			getInfo(2,itemData);
		},
	});
	$('#level_3').comboboxfilter({
		url: '',
		scope: 'material',
		text: '3级栏目：',
		unlimitText: '全部',
		multiple: false,
		data: data3,
		onChange  : function(choose){
			// console.log(choose);
			if(choose)
				filterInit(3,'level_4',`${configCenterHost}api/organization/hierarchy?uid=${choose}`);
		},
		onClick: function(itemData) {//单击事件，当前点击documnet对象对应的数据对象
			console.log(itemData);
			getInfo(3,itemData);
		},
	});
	let nodeComponent = new NodeComponent({});
	let formIndicator = new FormIndicatorComponent([]);
	if(uid == null || uid === '')
		uid = -1;
	filterInit(1,'level_1', `${configCenterHost}api/organization/hierarchy?uid=${uid}`,'first');
	$('#level_1').find('.radio').find('.list').find('.filter-tag').eq(0).click();
	$('.loading').hide();
	form.render(null, 'organizationalsystemportalbox');

	function getProcess(type,url) {
		let subStr = '';
		$.ajaxSettings.async = false;
		$.get(configCenterHost+'api/templateProcess/infoByTemplateAndStep?templateId='+nodeComponent.info.attribute.templateId,function (res) {
			// console.log(res);
			$.each(res.data, function (i, j) {
				if(type === 'add'){
					subStr += nodeComponent.processId === j.templateProcessId ? `<a class="field_btn_select" data="${j.templateProcessId}">${j.processCname}</a>` : `<a data="${j.templateProcessId}">${j.processCname}</a>`;
				}else{
					subStr += i === 0 ? `<a class="field_btn_select" data="${j.templateProcessId}">${j.processCname}</a>` : `<a data="${j.templateProcessId}">${j.processCname}</a>`;
					if(i === 0)
						nodeComponent.processId = j.templateProcessId;
				}
			})
			if(res.data.length === 0){
				nodeComponent.processId = 0;
			}
		})
		$.ajaxSettings.async = true;
		if(url)
			subStr+=`<a class="url" data-herf="${url}">链接(url)</a>`
		$('.subentry_tab').html(subStr);
		selectBtnBox();
		if(!nodeComponent.processId && url)
			$('.url').click();
		formIndicator.init(nodeComponent.processId);
	}
	function selectBtnBox(){
		//分项切换
		$(".field_btn_box a").click(
			function() {
				$(this).addClass("field_btn_select").siblings().removeClass("field_btn_select");
				if(!$(this).attr('data')){
					$('.process_content').find('iframe').remove();
					$('.process_content').append(`<iframe style="width: 100%;height: 850px;margin-top: 20px" id="attr_url" src="${$(this).attr('data-herf')}"></iframe>`);
					$('.process-form').hide();
				}else{
					$('.process_content').find('iframe').remove();
					$('.process-form').show();
					// $(this).addClass("field_btn_select").siblings().removeClass("field_btn_select");
					// eleTreeComponent.processId = $(this).attr('data');
					formIndicator.init($(this).attr('data'));
					// $(".none").eq(a).show().siblings().hide();
				}
			}
		);

	}
	//信息
	form.val('organizationalsystemportalbox', {
		"text": "test1",
		"number": "test2",
		"password": "test3",
		"tel": "test4",
		"time": "test5",
		"date": "test6",
		"datetime": "test7",
		"timerange": "test8",
		"daterange": "test9",
		"datetimerange": "test1",
		"baseselect": "test12",
		"multipleselect": "test13",
		"radio": "test14",
		"checkbox": "test15",
		"basictextarea": "test16",
		"textareabox": "test17"
	});

});

//收放筛选条件
$(".tagbox_toggle_btn").click(
	function() {
		$(".tag_box").slideToggle(200);
		$(".tagbox_toggle_btn span").toggleClass("layui-hide");
	}
);