let cdata = new Array(); //全量數據
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
	let mode = parent.$('#mode').val();
	// form.render(null, 'organizationalstructurebox');

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
			console.log(formIndicator);
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
			let str = configStr();
			$('.form_indicators').html(str);
			configRender();
			form.render();
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
								formIndicator.timetableId = value.id;
								$.each(value.timetableProcessDTOS,function (key,value) {
									$(".field_btn_box a").eq(key).attr('timetableprocess-id',value.timetableProcessId)
								})
								formIndicator.timetableResults = value.timetableProcessDTOS[select_index].timetableResults;
								if(formIndicator.timetableResults.length>0){
									let paramSP = getValueSP('processKey',formIndicator.formNames,value,select_index+1,currentUsername);
									form.val('form_indicators', paramSP );
									form.render('select');
									fileInit();
								}
								return false;
							}
						})


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
				$('.bottom_btnbox').find('layui-btn').hide();
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
						$('.bottom_btnbox').show();
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
					if(!res.data){
						cdata = [];
						renderEleTree(that.elem, cdata);
					}else{
						cdata = res;
						if(uid!=-1 && mode!='graph')
							cdata = {
								data: {
									children: [cdata.data],
									parent: null,
									uid: -1
								}
							}
						node.info = res.data.children[0];
						renderEleTree(that.elem, getTreeData());
					}
					$('.content_box').show();
					$('.bottom_btnbox').show();
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
		el1.unExpandAll();
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
		if (!!(window.history && history.pushState)) {
			if(!getQueryString('uid')){
				parent.history.replaceState(null,document.title,`${parent.location.href}?uid=${d.data.currentData.id}`);
				// window.location.href(`${window.location.href}?uid=${d.data.currentData.id}`);
			}else{
				parent.history.replaceState(null,document.title,changeURLArg(`${parent.location.href}`,'uid',d.data.currentData.id));
			}
		}
		let orgStr = '';
		let subStr = '';
		let org = cdata.data;
		$.each(d.data.index, function (key, value) {
			org = org.children[value];
			// orgStr += (key+1) === d.data.index.length ? `<li class="layui-this"><a data="${org.uid}">${org.attribute.name}</a></li>` : `<li><a data="${org.uid}">${org.attribute.name}</a></li>`
			orgStr += (key+1) === d.data.index.length ? `<li class="layui-this"><a data="${org.uid}">${key+1}级建制字段定义</a></li>` : `<li><a data="${org.uid}">${key+1}级建制字段定义</a></li>`
			if((key+1) === d.data.index.length) {
				eleTreeComponent.clickUid = org.uid;
				eleTreeComponent.templateId = org.attribute.templateId;
				node.info = org;
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
			// $('.content_box').find('iframe').remove();
			// $('.content_box').append(`<iframe style="width: 100%;height: ${height+40}px" id="attr_url" src="${url}"></iframe>`);
			// $('.full_box').hide();
			getProcess('change',url);
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
			let url;
			if(!mode || mode === 'tree'){
				url = configCenterHost +'api/organization/hierarchy?uid='+$(this).find('a').attr('data');
			}else{
				url = configCenterHost +'api/organization/graphHierarchy?uids='+$(this).find('a').attr('data');
			}
			$.ajax({
				url:  url,
				success: function (res) {
					// console.log(res);
					let nodedata;
					if(!mode || mode === 'tree'){
						nodedata = res.data
					}else{
						nodedata = res.data.children[0]
					}
					eleTreeComponent.clickUid = nodedata.uid;
					eleTreeComponent.templateId = nodedata.attribute.templateId;
					node.info = nodedata;
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
						// $('.content_box').find('iframe').remove();
						// $('.content_box').append(`<iframe style="width: 100%;height: ${height+40}px" id="attr_url" src="${url}"></iframe>`);
						// $('.full_box').hide();
						getProcess('change',url);
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
	let eleTreeComponent;
	if(uid == null || uid === '')
		uid = -1;
	if(!mode || mode === 'tree'){
		eleTreeComponent = new EleTreeComponent({
			elem: '.ele1',
			url: `${configCenterHost}api/organization/hierarchy?uid=${uid}`
		})
	}else{
		$.ajax({
			url: configCenterHost +'api/organization/totalNodesAndArcs',
			async: false,
			success: function (res) {
				console.log(res);
				let uids = [];
				$.each(res.data.nodes,function (key, value) {
					if(uid == null || uid === '' || uid == -1){
						if(value.attribute.customField.level && value.attribute.customField.level == 1){
							uids.push(value.uid);
						}
					}else{
						if(value.uid == uid){
							uids.push(value.uid);
							return false;
						}
					}
				})
				eleTreeComponent = new EleTreeComponent({
					elem: '.ele1',
					url: configCenterHost +'api/organization/graphHierarchy?uids='+uids
				})
			},
			error: function (err, msg) {
				console.error(err);
			}
		});

	}
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
	function getProcess(type,url) {
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
				$('.bottom_btnbox').hide();
			}
		})
		if(url)
			subStr+=`<a class="url" data-herf="${url}">链接(url)</a>`
		$('.subentry_tab').html(subStr);
		selectBtnBox();
		if(eleTreeComponent.processId){
			$.get(configCenterHost+'api/template/info?templateId='+node.info.attribute.templateId,function (res) {
				if(res.data.isReleased === 1){
					$('.bottom_btnbox').show().find('.no_released').hide();
					$('.bottom_btnbox').show().find('.layui-btn').show();
				}else{
					$('.bottom_btnbox').show().find('.layui-btn').hide();
					$('.bottom_btnbox').show().find('.no_released').show();
				}
			})
		}else{
			if(url)
				$('.url').click();
		}
		$.ajaxSettings.async = true;

		formIndicator.init(eleTreeComponent.processId);
	}
	function selectBtnBox(){
		//分项切换
		$(".field_btn_box a").click(
			function() {
				$(this).addClass("field_btn_select").siblings().removeClass("field_btn_select");
				if(!$(this).attr('data')){
					let height = $('#left').height();
					$('.process_content').find('iframe').remove();
					$('.process_content').append(`<iframe style="width: 100%;height: ${height-150}px;margin-top: 20px" id="attr_url" src="${$(this).attr('data-herf')}"></iframe>`);
					$('.process-form').hide();
				}else{
					$('.process_content').find('iframe').remove();
					$('.process-form').show();
					// $(this).addClass("field_btn_select").siblings().removeClass("field_btn_select");
					eleTreeComponent.processId = $(this).attr('data');
					formIndicator.init($(this).attr('data'));
					// $(".none").eq(a).show().siblings().hide();
				}
			}
		);

	}
	function configStr() {
		let str = '<input type="hidden" name="id" id="id"/>';
		$.each(formIndicator.data,function (key, value) {
			formIndicator.formNames.push('evaluationScore'+(key+1));
			if(value.contentType === 'input'){
				str+=`<div class="layui-col-lg4">
							<label class="layui-form-label">${value.indicatorCname}</label>
							<div class="layui-input-block">
								<input type="text" name="evaluationScore${key+1}"  autocomplete="on" class="layui-input" lay-verify="required" placeholder="请输入${value.indicatorCname}">
							</div>
						</div>`
			}else if(value.contentType === 'number'){
				str+=`<div class="layui-col-lg4">
							<label class="layui-form-label">${value.indicatorCname}</label>
							<div class="layui-input-block">
								<input type="number" name="evaluationScore${key+1}" autocomplete="on" class="layui-input" lay-verify="required" placeholder="请输入${value.indicatorCname}">
							</div>
						</div>`
			}else if(value.contentType === 'date'){
				configObj.dateConfig.push({index:key+1,indicatorName: value.indicatorName ? value.indicatorName : ''});
				str+=`<div class="layui-col-lg4">
							<label class="layui-form-label">${value.indicatorCname}</label>
							<div class="layui-input-block">
								<input type="imput" id="dateConfig${key+1}" name="evaluationScore${key+1}" autocomplete="on" class="layui-input" lay-verify="required" placeholder="请选择${value.indicatorCname}">
							</div>
						</div>`
			}else if(value.contentType === 'dateTime'){
				configObj.dateTimeConfig.push({index:key+1,indicatorName: value.indicatorName ? value.indicatorName : ''});
				str+=`<div class="layui-col-lg4">
							<label class="layui-form-label">${value.indicatorCname}</label>
							<div class="layui-input-block">
								<input type="imput" id="dateTimeConfig${key+1}" name="evaluationScore${key+1}" autocomplete="on" class="layui-input" lay-verify="required" placeholder="请选择${value.indicatorCname}">
							</div>
						</div>`
			}else if(value.contentType === 'rangeDate'){
				configObj.rangeDateConfig.push({index:key+1,indicatorName: value.indicatorName ? value.indicatorName : ''});
				str+=`<div class="layui-col-lg4">
							<label class="layui-form-label">${value.indicatorCname}</label>
							<div class="layui-input-block">
								<input type="imput" id="rangeDateConfig${key+1}" name="evaluationScore${key+1}" autocomplete="on" class="layui-input" lay-verify="required" placeholder="请选择${value.indicatorCname}">
							</div>
						</div>`
			}else if(value.contentType === 'rangeDateTime'){
				configObj.rangeDateTimeConfig.push({index:key+1,indicatorName: value.indicatorName ? value.indicatorName : ''});
				str+=`<div class="layui-col-lg4">
							<label class="layui-form-label">${value.indicatorCname}</label>
							<div class="layui-input-block">
								<input type="imput" id="rangeDateTimeConfig${key+1}" name="evaluationScore${key+1}" autocomplete="on" class="layui-input" lay-verify="required" placeholder="请选择${value.indicatorCname}">
							</div>
						</div>`
			}else if(value.contentType === 'multiSelect'){
				configObj.multiSelectConfig.push({index: (key + 1), url: value.url, configIndicatorDTOS: value.configIndicatorDTOS, type: value.indicatorName ? value.indicatorName : ''});
				str+=`<div class="layui-col-lg4">
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
				str+=`<div class="layui-col-lg4">
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
				str+=`<button type="button" class="layui-btn" onclick="uploadFileMeeting(${(key + 1)},${step})">上传附件</button>
					 <input id="fileUpload${ (key + 1)}_${step}" name="evaluationScore${ (key + 1)}" class="layui-input layui-disabled" disabled=""/>
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
	function configRender() {
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
	//上传附件
	window.uploadFileMeeting = function (index,step) {
		let temp = `${node.info.attribute.name}_${node.info.attribute.templateId}(${step})`
		openUploadWindowByPath('配置中心/建制管理/'+temp,index,step);
	};
	function loading(msg){
		msgindex = layer.msg(msg, {
			icon:16,
			shade:[0.1, '#fff'],
			time:false,  //不自动关闭
			offsetqiuchuy:"100px"
		})
	}
	form.on('submit(organizationalstructurebtn)', function(data) {
		console.log('保存');
		// console.log(data.elem); //被执行事件的元素DOM对象，一般为button对象
		// console.log(data.form);//被执行提交的form对象，一般在存在form标签时才会返回
		// console.log(data.field);//当前容器的全部表单字段，名值对形式：{name: value}
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
		d1['timetableProcessId'] = Number($(".field_btn_box").find('.field_btn_select').attr('timetableprocess-id'));
		d1['initiatorUsername'] = currentUsername;
		timetableResultDTO['timetableResult'] = d1;
		timetableResultDTO['submitUser'] = currentUsername;
		timetableResultDTO['stageId'] = 1;
		timetableResultDTO['isComplete'] = -1;
		timetableResultDTO['timetableProcessId'] = Number($(".field_btn_box").find('.field_btn_select').attr('timetableprocess-id'));
		var data = JSON.stringify(timetableResultDTO);
		// 保存
		$.ajax({
			// url:zuulUrl+'api/meetingProcess/saveMeetingProcess',
			url:configCenterHost+'api/timetableResult/resultNew',
			dataType: 'json',
			data: data,
			type: 'post',
			// async: false,
			contentType:"application/json;charset=utf-8",
			beforeSend: function () {
				loading("数据提交中,请耐心等待......");
			},
			complete: function (){
				layer.close(msgindex);
			},
			success:function (res) {
				// console.log(res);
				if(res.code == '200'){
					layer.msg('保存成功!')
					formIndicator.init(eleTreeComponent.processId);
					// window.location.reload();
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
function getQueryString(name){
	var reg=eval("/"+name+"/g");
	var r = parent.location.href.split('#')[1];
	var flag=reg.test(r);
	if(flag){
		return true;
	}else{
		return false;
	}
}
function changeURLArg(url, arg, arg_val) {
	var pattern = arg + '=([^&]*)';
	var replaceText = arg + '=' + arg_val;
	if (url.match(pattern)) {
		var retuenUrl = url;
		var temp = '/(\&' + arg + '=)([^&]*)/gi';
		if (eval(temp).test(retuenUrl)) {
			retuenUrl = retuenUrl.replace(eval(temp), '&' + replaceText);
		}
		var temps = '/([\?])(' + arg + '=)([^&]*)/gi';
		if (eval(temps).test(retuenUrl)) {
			retuenUrl = retuenUrl.replace(eval(temps), '?' + replaceText);
		}
		return retuenUrl;
	}
	else {
		// if (url.match('[\?]')) {
		if (url.indexOf('?') > 0) {
			return url + "&" + replaceText;
		} else {
			return url + "?" + replaceText;
		}
	}
	return url + '\n' + arg + '\n' + arg_val;
}
