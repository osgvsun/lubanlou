let cdata = new Array(); //全量數據
let steps = [];
let textareafullscreens = [];//需要全屏的textarea
const zuulHost =apiGateWayHost;
layui.config({
	base:'../../'
}).extend({
	index:'lib/index'
}).use(['index','laypage', 'layer', 'table', 'element', 'laydate', 'jquery', 'eleTree', 'code', 'form', 'slider', 'layedit', 'upload', 'transfer', 'util'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		laydate = layui.laydate,
		eleTree = layui.eleTree,
		code = layui.code,
		form = layui.form,
		slider = layui.slider,
		// formSelects = layui.formSelects,
		layedit = layui.layedit,
		upload = layui.upload,
		transfer = layui.transfer,
		util = layui.util;

	//向世界问个好
	layer.msg('进入建制架构');
	//监听提交
	form.on('submit(organizationalstructurebtn)', function(data) {
		layer.msg('已保存！');
	});

	$(".eleTree-search1").on("change", function() {
		el1.search($(this).val());
	})
	let msgindex;
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
	}
	let eleTreeObj = {
		elem: '.ele1',
		//data: data,
		// url: configCenterHost + 'api/organization/hierarchy?uid=-1',
		renderAfterExpand: true, //是否在第一次展开某个树节点后才渲染其子节点
		highlightCurrent: false, //是否高亮当前选中节点，默认值是 false
		defaultExpandAll: true, //是否默认展开所有节点
		expandOnClickNode: true, //是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点
		checkOnClickNode: false, //是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点
		//defaultExpandedKeys:[23],//默认展开的节点的 key 的数组
		autoExpandParent: true, //展开子节点的时候是否自动展开父节点
		showCheckbox: false, //节点是否可被选择
		checkStrictly: false, //在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
		//defaultCheckedKeys:false,//默认勾选的节点的 key 的数组
		accordion: false, //是否每次只打开一个同级树节点展开（手风琴效果）
		indent: false, //相邻级节点间的水平缩进，单位为像素
		lazy: false, //是否懒加载子节点，需与 load 方法结合使用
		load: false, //加载子树数据的方法，仅当 lazy 属性为true 时生效
		draggable: false, //是否开启拖拽节点功能
		// contextmenuList: ["add.async", "edit", "remove"],
		searchNodeMethod: function(value, data) {
			if(!value) return true;
			return data.label.indexOf(value) !== -1;
		}
	};
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
				data:JSON.stringify({templateId: eleTreeComponent.templateId,page:1,limit:999}),
				async: false,
				contentType: "application/json;charset=UTF-8",
				success: function (res) {
					// console.log(res)
					let select_index = $(".field_btn_box a").index($(".field_btn_box").find('.field_btn_select'))
					if(res.data.length>0){
						$.each(res.data,function (key, value) {
							if(value.businessId == eleTreeComponent.clickUid){
								steps = [];
								formIndicator.timetableId = value.id;
								$.each(value.timetableProcessDTOS,function (key,value) {
									$(".field_btn_box a").eq(key).attr('timetableProcess-id',value.timetableProcessId)
								})
								let str = configInputByInfo(value.timetableProcessDTOS[select_index],value,select_index);
								$('#detail').html(str);
								formIndicator.timetableResults = value.timetableProcessDTOS[select_index].timetableResults;
								if(formIndicator.timetableResults.length>0){
									var params = getResultByInfo(value);
									$.each(steps,function (i,d) {
										form.val('structure_detail', params[i]);
									})
								}
								return false;
							}
						})
					}else{
						$('#detail').html('');
					}
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
	function EleTreeComponent(obj) {
		this.elem = obj.elem;
		this.url = obj.url;
		this.clickUid = obj.clickUid;
		this.templateId = obj.templateId;
		this.processId = obj.processId;
		this.timetableId = obj.timetableId;
		this.render = function () {
			let that = this;
			$.ajax({
				url: that.url,
				async: false,
				success: function (res) {
					// console.log(res);
					cdata = res;
					node.info = res.data.children[0];
					renderEleTree(that.elem, getTreeData());
					$('.content_box').show();
					$('.loading').hide();
				},
				error: function (err, msg) {
					console.error(err);
				}
			});
		};
		this.init = function () {
			this.render();
		};
		this.reload = function () {
			this.render();
		};
	}

	function NodeInfo(info) {
		this.info = info;
		// this.parent = obj.parent;
		// this.attribute = obj.attribute;
		// this.children = obj.children;
		// this.test = obj.test;
	}

	function renderEleTree(elem, data) {
		eleTreeObj['elem'] = elem;
		eleTreeObj['data'] = data;
		let el1 = eleTree.render(eleTreeObj);
		$('[lay-filter="data1"]').find('.eleTree-node').find('.eleTree-node-content').eq(0).click();
		// el1.expandAll();
		$(".eleTree-search1").on("change", function() {
			el1.search($(this).val());
		})
	}
	eleTree.on("nodeClick(data1)", function(d) {
		console.group("节点点击nodeClick:")
		// console.log(d.data); // 点击节点对于的数据
		// console.log(d.event); // event对象
		// console.log(d.node); // 点击的dom节点
		// console.log(this); // 与d.node相同
		console.groupEnd();
		let orgStr = '';
		let subStr = '';
		let org = cdata.data;
		$.each(d.data.index, function (key, value) {
			org = org.children[value];
			// orgStr += (key+1) === d.data.index.length ? `<li class="layui-this"><a data="${org.uid}">${org.attribute.name}</a></li>` : `<li><a data="${org.uid}">${org.attribute.name}</a></li>`
			orgStr += (key+1) === d.data.index.length ? `<li class="layui-this"><a data="${org.uid}">${key+1}级建制</a></li>` : `<li><a data="${org.uid}">${key+1}级建制</a></li>`
			if((key+1) === d.data.index.length) {
				eleTreeComponent.clickUid = org.uid;
				eleTreeComponent.templateId = org.attribute.templateId;
				node.info = org;
				// getProcess('change');
			}
		})
		if(node.info.attribute.customField && JSON.stringify(node.info.attribute.customField) != "{}" && node.info.attribute.customField.url){
			let height = $('#left').height();
			// if(node.info.attribute.customField.url){
			let regex = new RegExp("http");
			let url = '';
			if(regex.test(node.info.attribute.customField.url)){
				url =node.info.attribute.customField.url;
			}else{
				url='http://'+node.info.attribute.customField.url;
			}
			$('.content_box').find('iframe').remove();
			$('.content_box').append(`<iframe style="width: 100%;height: ${height+40}px" id="attr_url" src="${url}"></iframe>`);
			$('.full_box').hide();
			// }
		}else{
			$('.content_box').find('iframe').remove();
			$('.full_box').show();
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
					eleTreeComponent.clickUid = res.data.uid;
					eleTreeComponent.templateId = res.data.attribute.templateId;
					node.info = res.data;
					if(node.info.attribute.customField && JSON.stringify(node.info.attribute.customField) != "{}" && node.info.attribute.customField.url){
						let height = $('#left').height();
						// if(node.info.attribute.customField.url){
						let regex = new RegExp("http");
						let url = '';
						if(regex.test(node.info.attribute.customField.url)){
							url =node.info.attribute.customField.url;
						}else{
							url='http://'+node.info.attribute.customField.url;
						}
						$('.content_box').find('iframe').remove();
						$('.content_box').append(`<iframe style="width: 100%;height: ${height+40}px" id="attr_url" src="${url}"></iframe>`);
						$('.full_box').hide();
						// }
					}else{
						$('.content_box').find('iframe').remove();
						$('.full_box').show();
						getProcess('change');
					}
				},
				error: function (err, msg) {
					console.error(err);
				}
			});
		});

	})
	eleTree.on("nodeChecked(data1)", function(d) {
		console.group("节点选中nodeChecked:")
		console.log(d.data); // 点击节点对于的数据
		console.log(d.isChecked); // input是否被选中
		console.log(d.node); // 点击的dom节点
		console.log(this); // input对于的dom
		console.groupEnd();
	})
	eleTree.on("nodeContextmenu(data1)", function(d) {
		console.group("节点右键nodeContextmenu:")
		console.log(d.data); // 点击节点对于的数据
		console.log(d.event); // event对象
		console.log(d.node); // 点击的dom节点
		console.log(this); // 与d.node相同
		console.groupEnd();
	})
	eleTree.on("nodeDrag(data1)", function(d) {
		console.group("节点拖拽nodeDrag:")
		// d.stop();           // 取消拖拽
		console.log(d.current); // 起始节点对应的dom和数据
		console.log(d.target); // 鼠标落点对应的dom和数据
		console.log(this); // 鼠标落点对应的dom
		console.groupEnd();
	})

	eleTree.on("nodeAppend(data1)", function(d) {
		// 异步操作
		setTimeout(function() {
			console.group("添加子节点nodeAppend:")
			console.log(d.data); // 点击节点对于的数据
			console.log(d.node); // 点击的dom节点
			console.log(this); // 与d.node相同
			// d.stop();            // 取消添加
			// d.setData({          // 自定义数据
			//     id: 666,
			//     label: "aaa"
			// })
			d.setData(); // 异步必须调用
			// d.stop();
			console.log(d.newData); // 新增加的节点数据
			console.groupEnd();
		}, 300)
	})
	eleTree.on("nodeInsertBefore(data1)", function(d) {
		// 异步操作
		setTimeout(function() {
			console.group("添加节点之前nodeInsertBefore:")
			console.log(d.data); // 点击节点对于的数据
			console.log(d.node); // 点击的dom节点
			console.log(this); // 与d.node相同
			// d.stop();            // 取消添加
			// d.setData({          // 自定义数据
			//     key: 666,
			//     label: "aaa"
			// })
			d.setData()
			console.log(d.newData); // 新增加的节点数据
			console.groupEnd();
		}, 300)
	})
	eleTree.on("nodeInsertAfter(data1)", function(d) {
		// 异步操作
		setTimeout(function() {
			console.group("添加节点之后nodeInsertAfter:")
			console.log(d.data); // 点击节点对于的数据
			console.log(d.node); // 点击的dom节点
			console.log(this); // 与d.node相同
			// d.stop();            // 取消添加
			// d.setData({          // 自定义数据
			//     key: 666,
			//     label: "aaa"
			// })
			d.setData()
			console.log(d.newData); // 新增加的节点数据
			console.groupEnd();
		}, 300)
	})
	eleTree.on("nodeEdit(data1)", function(d) {
		console.group("编辑节点nodeEdit:")
		console.log(d.data); // 点击节点对于的数据
		console.log(d.node); // 点击的dom节点
		console.log(d.value); // 新输入的值
		console.log(this); // 与d.node相同
		// d.stop();                // 取消编辑
		console.groupEnd();
		// 异步修改节点
		// setTimeout(function() {
		//     d.async()
		// },300)
	})
	eleTree.on("nodeRemove(data1)", function(d) {
		console.group("删除nodeRemove:")
		console.log(d.data); // 点击节点对于的数据
		console.log(d.node); // 点击的dom节点
		// d.stop();                // 取消删除
		console.groupEnd();
		// 异步删除节点
		// setTimeout(function() {
		//     d.async()
		// },300)
	})
	// 自定义右键菜单回调
	eleTree.on("nodeTest(data1)", function(d) {
		console.group("自定义右键菜单回调nodeTest:")
		console.log(d.data); // 点击节点对于的数据
		console.log(d.node); // 点击的dom节点
		console.log(this); // 与d.node相同
		console.groupEnd();
	})

	// var el1 = eleTree.render(obj);
	let eleTreeComponent = new EleTreeComponent({
		elem: '.ele1',
		url: configCenterHost +'api/organization/hierarchy?uid=-1'
	})
	let node = new NodeInfo();
	let formIndicator = new FormIndicatorComponent([]);
	eleTreeComponent.init();

	form.on('checkbox(test)', function(data) {
		var title = $(data.elem).attr("title");
		var isChecked = data.elem.checked;
		if(isChecked) {
			obj[title] = true;
		} else {
			obj[title] = false;
		}
		el1.reload(obj)
	});
	var arr = [];
	form.on('checkbox(menuList)', function(data) {
		var title = $(data.elem).attr("title");
		var isChecked = data.elem.checked;
		if(isChecked) {
			arr.push(title);
		} else {
			arr.splice(arr.indexOf(title), 1);
		}
		obj["contextmenuList"] = arr;
		el1.reload(obj);
	});
	slider.render({
		elem: '.slideTest',
		min: 10,
		max: 30,
		showstep: true,
		value: 16,
		change: function(value) {
			obj["indent"] = value;
			el1.reload(obj);
		}
	});

	//时间
	laydate.render({
		elem: '#time',
		type: 'time'
	});

	//日期
	laydate.render({
		elem: '#date',
		type: 'date',
		// 当前日期 --添加下面这句，不需要默认当日可删
		value: new Date(),
		done: function(value, date, endDate) {
			// console.log(value); //得到日期生成的值，如：2017-08-18
			// console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
			// console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
		}
	});

	//日期时间
	laydate.render({
		elem: '#datetime',
		type: 'datetime'
	});

	//时间范围
	laydate.render({
		elem: '#timerange',
		type: 'time',
		range: true
	});

	//日期范围
	laydate.render({
		elem: '#daterange',
		type: 'date',
		range: true
	});

	//日期时间范围
	laydate.render({
		elem: '#datetimerange',
		type: 'datetime',
		range: true
	});

	//建立编辑器的图片接口
	// layedit.set({
	// 	uploadImage: {
	// 		url: layui.setter.base + 'json/organizationalStructureImg.json' //接口url
	// 			,
	// 		type: '' //默认post
	// 	}
	// });
	//注意：layedit.set 一定要放在 build 前面，否则配置全局接口将无效。

	//建立富文本框编辑器
	layedit.build('textareabox', {
		height: 100 //设置编辑器高度
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
			, 'image' //插入图片
		]
	});

	//建立制度建设编辑器
	layedit.build('systemConstruction', {
		height: 100 //设置编辑器高度
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
			, 'image' //插入图片
		]
	});

	//建立安全建设编辑器
	layedit.build('safetyConstruction', {
		height: 100 //设置编辑器高度
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
			, 'image' //插入图片
		]
	});

	//建立其他建设编辑器
	layedit.build('otherConstruction', {
		height: 100 //设置编辑器高度
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
			, 'image' //插入图片
		]
	});

	//上传文件，选完文件后不自动上传,点击开始上传按钮上传

	//添加附件
	var pblist = $('#pblist'),
		uploadListIns = upload.render({
			elem: '#projectbook',
			url: '/upload/', //上传接口
			accept: 'file', //所有文件
			multiple: true, //多个上传
			auto: false, //是否直接选择文件后上传
			bindAction: '#uploadfilesbtn', //上传按钮
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
	function getProcess(type) {
		let subStr = '';
		$.ajaxSettings.async = false;
		$.get(configCenterHost+'api/templateProcess/infoByTemplateAndStep?templateId='+node.info.attribute.templateId,function (res) {
			// console.log(res);
			$.each(res.data, function (i, j) {
				if(type === 'add'){
					subStr += eleTreeComponent.processId === j.templateProcessId ? `<a class="field_btn_select" data="${j.templateProcessId}">${j.processCname}</a>` : `<a data="${j.templateProcessId}">${j.processCname}</a>`;
				}else{
					subStr += i === 0 ? `<a class="field_btn_select" data="${j.templateProcessId}">${j.processCname}</a>` : `<a data="${j.templateProcessId}">${j.processCname}</a>`;
					if(i === 0)
						eleTreeComponent.processId = j.templateProcessId;
				}
			})
			if(res.data.length === 0){
				eleTreeComponent.processId = 0;
			}
		})
		$.ajaxSettings.async = true;
		$('.subentry_tab').html(subStr);
		selectBtnBox();
		formIndicator.init(eleTreeComponent.processId);
	}
	function selectBtnBox(){
		//分项切换
		$(".field_btn_box a").click(
			function() {
				var a = $(this).index();
				$(this).addClass("field_btn_select").siblings().removeClass("field_btn_select");
				eleTreeComponent.processId = $(this).attr('data');
				formIndicator.init($(this).attr('data'));
				// $(".none").eq(a).show().siblings().hide();
			}
		);

	}
});

// $(".field_btn_box a").click(
// 	function() {
// 		var a = $(this).index();
// 		$(this).addClass("field_btn_select").siblings().removeClass("field_btn_select");
// 		eleTreeComponent.processId = $(this).attr('data');
// 		formIndicator.init($(this).attr('data'));
// 		// $(".none").eq(a).show().siblings().hide();
// 	}
// );

//富文本赋值
$('#systemConstruction').html("此处为制度建设内容");
$('#safetyConstruction').html("此处为安全建设内容");
$('#otherConstruction').html("此处为其他建设内容");


function childrenTreeData(d) {
	var data = new Object();
	data['label'] = d.attribute.name;
	data['id'] = d.uid;
	data['organizationMap'] = d.attribute.organizationMap;
	if(d.children.length>0){
		data['children'] = [];
		$.each(d.children,function (i,d2) {
			data['children'].push(childrenTreeData(d2));
		})
	}
	return data;
}

function getTreeData() {
	let data = [];
	if(cdata.data.children.length === 0)
		return data;
	$.each(cdata.data.children,function (index,item){
		var firstConfig = new Object();
		firstConfig['id'] = item.uid;
		firstConfig['label'] = item.attribute.name;
		firstConfig['organizationMap'] = item.attribute.organizationMap;
		// if(index==0){
		// 	firstConfig['open'] = true;
		// }
		if(item.children.length>0){
			firstConfig['children'] = [];
			$.each(item.children,function (i,d) {
				firstConfig['children'].push(childrenTreeData(d));
			})
		}
		data.push(firstConfig);
	})
	return data;
}
/**
 * 删除url中指定参数
 * @param parameter 数组或字符串, url 链接
 * @returns {string}
 */
window.funcUrlDel = function(parameter,url) {
	var urlparts = url.split('?');
	if(urlparts.length >= 2) {
		//参数名前缀
		var prefix = encodeURIComponent(parameter) + '=';
		var pars = urlparts[1].split(/[&;]/g);
		//循环查找匹配参数
		for(var i = pars.length; i-- > 0;) {
			if(pars[i].lastIndexOf(prefix, 0) !== -1) {
				//存在则删除
				pars.splice(i, 1);
			}
		}
		return urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
	}
	return url;
}

