let cdata = new Array(); //全量數據
layui.config({
	base:'../../'
}).extend({
	index:'lib/index'
}).use(['index','laypage', 'layer', 'table', 'eleTree', 'slider', 'element', 'form'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		eleTree = layui.eleTree,
		slider = layui.slider,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form

	//向世界问个好
	// layer.msg('进入自定义设置');

	let mode = parent.$('#mode').val();
	form.render(null, 'customsettingbox');
	var eleTreeObj = {
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
		contextmenuList: [
			{text: "新增子节点", eventName: "add"},
			{text: "编辑", eventName: "edit"},
			{text: "删除", eventName: "remove"}
		],
		searchNodeMethod: function(value, data) {
			if(!value) return true;
			return data.label.indexOf(value) !== -1;
		}
	};
 	function EleTreeComponent(obj) {
		this.elem = obj.elem;
		this.url = obj.url;
		this.clickUid = obj.clickUid;
		this.templateId = obj.templateId;
		this.processId = obj.processId;
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
	function IndicatorTableComponent(elId) {
		this.elId = elId;
		this.templateReleased = '';
		this.processId = '';
		this.cols = [];
		// this.cols = cols;
		// this.data = [];
		this.render = function () {
			if(this.templateReleased === 1){
				this.cols = [ //表头
					{fixed: 'left',title: '序号',type: 'numbers',width: 50},
					{field: 'indicatorCname',title: '字段名称',sort: true},
					{field: 'contentType',title: '字段类型',sort: true},
					{field: 'indicatorName',title: '特殊字段',sort: true},
					{field: 'url',title: 'url',sort: true},
				];
			}else{
				this.cols = [ //表头
					{fixed: 'left',title: '序号',type: 'numbers',width: 50},
					{field: 'indicatorCname',title: '字段名称',sort: true},
					// 	{field: 'indicatorEname',title: '字段英文名称',sort: true},
					{field: 'contentType',title: '字段类型',sort: true},
					{field: 'indicatorName',title: '特殊字段',sort: true},
					{field: 'url',title: 'url',sort: true},
					// 	{field: 'use',title: '启用',sort: true},
					// 	{field: 'required',title: '必填',sort: true},
					{fixed: 'right',title: '操作',toolbar: '#toolbar',width: 110}
				];
			}
			renderTable(this.elId, configCenterHost +'api/configIndicator/list?templateProcessId='+this.processId,this.cols);
		};
		this.init = function () {
			this.render();
		}
	}

	function NodeInfo(info) {
		this.info = info;
		this.parentInfo = null;
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
	function nodeUpdate(type,obj) {
		let url = '';
		let atype = 'GET';
		let data = {"date": new Date().getTime()};
		if(type === 'add'){
			let customField = new Object();
			if(!mode || mode === 'tree'){
				url += configCenterHost+'api/organization/addNode?name='+obj['name']+'&parent='+obj['parent']+'&configTypeCname='+obj['name']
				data['parent'] =obj['parent'];
				customField['url'] = obj['url'];
			}else{
				url += configCenterHost+'api/organization/addGraphNode'
				if(obj['parent'] != -1){
					data['parent'] =obj['parent'];
				}
				if(obj['current']){
					data['current'] =obj['current'];
				}
				customField['level'] = obj['level'];
			}
			data['name'] =obj['name'];
			data['configTypeId'] =obj['configType'];
			data['configTypeCname'] =obj['name'];
			data['customField'] = JSON.stringify(customField);
			atype = 'POST'
		}else if(type === 'del'){
			if(!mode || mode === 'tree'){
				url += configCenterHost+'api/organization/deleteNode?uid='+obj['uid']
			}else{
				url += configCenterHost+'api/organization/deleteGraphNode?uid='+obj['uid']
			}
			atype = 'DELETE'
		}else if(type === 'rename'){
			let customField = new Object();
			if(!mode || mode === 'tree'){
				url += configCenterHost+'api/organization/renameNode?name='+ obj['name'] +'&uid='+obj['uid']
				customField['url'] = obj['url'];
			}else{
				url += configCenterHost+'api/organization/renameGraphNode'
			}
			data['uid'] =obj['uid'];
			data['name'] =obj['name'];
			data['customField'] = JSON.stringify(customField);
			atype = 'POST'
		}
		$.ajax({
			url: url,
			type: atype,
			async: false,
			data: data,
			success:function (res) {
				if(res.code === 0){
					layer.msg('保存成功!');
					if(obj['index'])
						layer.close(obj['index']);
					eleTreeComponent.reload();
				}
			},
			error: function () {
				alert("后台操作节点报错");
				return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
			}
		});
	}
	function rightContentMenu(type,d){
		let str = ''
		str +='<div style="padding: 20px 10px">' +
			'<form class="layui-form myData layui-col-space20" lay-filter="addNodeForm">';
			if(type === 'add'){
				str+='<div class="layui-form-item">' +
					'<label style="width: 130px;" class="layui-form-label">父节点：</label>' +
					'<div style="margin-left: 130px;" class="layui-input-block">';
				str+= '<span>'+ d.data.attribute.name +'</span>';
				str+= '<input type="hidden" id="parentId" name="parentId" value="'+ d.data.id +'" />';
				str+='</div>' +
					'</div>';

			}
		str+='<div class="layui-form-item">' +
			'<label style="width: 130px;" class="layui-form-label">节点内容：</label>' +
			'<div style="margin-left: 130px;" class="layui-input-block">';
		if(!mode || mode === 'tree'){
			str+=' <input  type="text" id="name" name="name" lay-verify="required" class="layui-input" />';
		}else{
			str+=' <input  type="text" id="name" name="name" class="layui-input" />';
		}
		/* lay-verify="required"*/
		str+='</div>' +
			'</div>' ;
		if(!mode || mode === 'tree'){
			str+='<div class="layui-form-item">' +
				'<label style="width: 130px;" class="layui-form-label">节点URL(非必填)：</label>' +
				'<div style="margin-left: 130px;" class="layui-input-block">';
			str+=' <input type="text" id="url" name="url" class="layui-input" />';
			str+='</div>' +
				'</div>';
		}else if(type === 'add'){
			str+='<div class="layui-form-item">' +
				'<label style="width: 130px;" class="layui-form-label">选择已有节点：</label>' +
				'<div style="margin-left: 130px;" class="layui-input-block">';
			str+='<select id="currentNode" name="current" lay-search lay-filter="currentNode">' +
				'<option value="">与上文节点内容互斥</option>';
			$.ajax({
				url: configCenterHost +'api/organization/totalNodesAndArcs',
				async: false,
				success: function (res) {
					// console.log(res);
					// let level = Number(d.data.attribute.customField.level)+1;
					$.each(res.data.nodes,function (key, value) {
						// if(value.attribute.customField.level == level){
							str+='<option value="'+ value.uid +'">'+ value.attribute.name +'</option>'
						// }
					})
				},
				error: function (err, msg) {
					console.error(err);
				}
			});
			str+='</select>';
			str+='</div>' +
				'</div>';
			str+='<div class="layui-form-item">' +
				'<label style="width: 130px;" class="layui-form-label">configType：</label>' +
				'<div style="margin-left: 130px;" class="layui-input-block">';
			str+=' <input  type="text" id="configType" name="configType" class="layui-input" placeholder="与流程引擎相关,无需求可不填"/>';/* lay-verify="required"*/
			str+='</div>' +
				'</div>' ;
		}
		str+=' <div style="margin: 15px 0;" class="layui-form-item tutor-block">';
		str+='<div style="margin-left: 130px;" class="layui-input-block">';
		str+='<button type="button" id="editNode" class="layui-btn" lay-submit lay-filter="addNode">保存</button>' +
			// '<button type="reset" class="layui-btn layui-btn-primary">重置</button>' +
			'</div>' +
			'</form></div>';
		return str;
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
        let parentOrg;
        $.each(d.data.index, function (key, value) {
			parentOrg = org;
            org = org.children[value];
            // orgStr += (key+1) === d.data.index.length ? `<li class="layui-this"><a data="${org.uid}">${org.attribute.name}</a></li>` : `<li><a data="${org.uid}">${org.attribute.name}</a></li>`
            orgStr += (key+1) === d.data.index.length ? `<li class="layui-this"><a data="${org.uid}">${key+1}级建制</a></li>` : `<li><a data="${org.uid}">${key+1}级建制</a></li>`
            if((key+1) === d.data.index.length) {
                eleTreeComponent.clickUid = org.uid;
                eleTreeComponent.templateId = org.attribute.templateId;
                node.info = org;
                node.parentInfo = parentOrg;
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
                    $.each(cdata.data.children,function (key,value) {
						if(value.uid === nodedata.uid){
							node.parentInfo = cdata.data;
							return false;
						}
						$.each(value.children,function (i,j) {
							if(j.uid === nodedata.uid){
								node.parentInfo = value;
								return false;
							}
						})
						return false;
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
						// $('.process_content').find('iframe').remove();
						// $('.process_content').append(`<iframe style="width: 100%;height: ${height+40}px" id="attr_url" src="${url}"></iframe>`);
						// $('.search_line').hide();
						// $('.head_tab').hide();
						// $('.content_box').find('iframe').remove();
						// $('.full_box').show();
						getProcess('change',url);
						// }
					}else{
						$('.process_content').find('iframe').remove();
						$('.search_line').show();
						$('.head_tab').show();
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

	eleTree.on("nodeAdd(data1)", function(d) {
		console.group("添加子节点nodeAdd:")
		// console.log(d.data); // 点击节点对于的数据
		// console.log(d.node); // 点击的dom节点
		// console.log(this); // 与d.node相同
		// d.stop();            // 取消添加
		// d.setData({          // 自定义数据
		//     id: 666,
		//     label: "aaa"
		// })
		// d.setData(); // 异步必须调用
		// // d.stop();
		// console.log(d.newData); // 新增加的节点数据
		console.groupEnd();
		// let obj = new Object();
		// obj['name'] = d.newData.label;
		// obj['parent'] = d.data.id;
		// nodeUpdate('add',obj);
		let str = rightContentMenu('add',d);

		//多窗口模式，层叠置顶
		var index = layer.open({
			type: 1,
			title: '新增节点',
			shadeClose: true,
			closeBtn: 0,
			area: ['550px', 'auto'],
			content: str
		});
		form.render('select');
		form.on('submit(addNode)', function (data) {
			let field = data.field;
			let obj = new Object();
			switch (mode) {
				case 'tree':
					obj['name'] = field['name'];
					obj['parent'] = field['parentId'];
					obj['url'] = field['url'];
					obj['index'] = index;
					break;
				case 'graph':
					obj['level'] = Number(d.data.attribute.customField.level)+1;
					obj['parent'] = field['parentId'];
					obj['index'] = index;
					obj['configType'] = field['configType'];
					if(field.current){
						obj['current'] = field['current'];
					}else{
						obj['name'] = field['name'];
					}
					break;
				default:
					obj['name'] = field['name'];
					obj['parent'] = field['parentId'];
					obj['url'] = field['url'];
					obj['index'] = index;
					break;
			}
			nodeUpdate('add',obj)
			return false;
		});
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
		// console.log(d.data); // 点击节点对于的数据
		// console.log(d.node); // 点击的dom节点
		// console.log(d.value); // 新输入的值
		// console.log(this); // 与d.node相同
		// d.stop();                // 取消编辑
		console.groupEnd();
		// 异步修改节点
		// setTimeout(function() {
		//     d.async()
		// },300)
		let str = rightContentMenu('edit',d);

		//多窗口模式，层叠置顶
		var index = layer.open({
			type: 1,
			title: '编辑节点',
			shadeClose: true,
			closeBtn: 0,
			area: ['550px', 'auto'],
			content: str,
			success: function () {
				form.val('addNodeForm', {
					"name": d.data.label,
					"url": d.data.attribute.customField.url ?  d.data.attribute.customField.url : ''
				});
			}
		});
		form.render('select');
		form.on('submit(addNode)', function (data) {
			let field = data.field;
			let obj = new Object();
			obj['uid'] = d.data.id;
			obj['name'] = field['name'];
			obj['url'] = field['url'];
			obj['index'] = index;
			nodeUpdate('rename',obj);
			return false;
		});
	})
	eleTree.on("nodeRemove(data1)", function(d) {
		console.group("删除nodeRemove:")
		// console.log(d.data); // 点击节点对于的数据
		// console.log(d.node); // 点击的dom节点
		// // d.stop();                // 取消删除
		console.groupEnd();
		// 异步删除节点
		// setTimeout(function() {
		//     d.async()
		// },300)
		let obj = new Object();
		obj['uid'] = d.data.id;
		nodeUpdate('del',obj);
	})
	// 自定义右键菜单回调
	eleTree.on("nodeTest(data1)", function(d) {
		console.group("自定义右键菜单回调nodeTest:")
		console.log(d.data); // 点击节点对于的数据
		console.log(d.node); // 点击的dom节点
		console.log(this); // 与d.node相同
		console.groupEnd();
	})

	// var el1 = eleTree.render(eleTreeObj);
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
				if(uids.length === 0){
					layer.alert('未找到符合要求的节点!')
					return false;
				}
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

	let tableComponent = new IndicatorTableComponent('#customsetting');
    let node = new NodeInfo();
	eleTreeComponent.init();

	form.on('checkbox(test)', function(data) {
		var title = $(data.elem).attr("title");
		var isChecked = data.elem.checked;
		if(isChecked) {
			eleTreeObj[title] = true;
		} else {
			eleTreeObj[title] = false;
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
		eleTreeObj["contextmenuList"] = arr;
		el1.reload(eleTreeObj);
	});
	slider.render({
		elem: '.slideTest',
		min: 10,
		max: 30,
		showstep: true,
		value: 16,
		change: function(value) {
			eleTreeObj["indent"] = value;
			el1.reload(eleTreeObj);
		}
	});
	//打开新增字段
	var methods = {
		newfield: function() {
			//layer.msg('');
			var that = this;
			if(!eleTreeComponent.processId){
				layer.msg('请选择正确的分项!')
				return false;
			}
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2, //此处以iframe举例
				title: '新增字段',
				area: ['500px', '500px'],
				shade: 0.5,
				maxmin: true,
				shadeClose: true,
				content: 'newField?templateId='+eleTreeComponent.templateId+'&processId='+eleTreeComponent.processId,
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newfieldbtn");
					submit.click();
				},
				end: function () {
					tableComponent.render()
				}
			});
			//layer.full(index);
		},
		newNode: function() {
			let that = this;
			let str = ''
			str +='<div style="padding: 20px 10px">' +
				'<form class="layui-form myData" lay-filter="editNodeForm">' +
				// '<div class="layui-form-item">' +
				// '<label class="layui-form-label">上级指标：</label>' +
				// '<div class="layui-input-block">' +
				// ' <input type="text" name="parentId" id="treeS" lay-filter="treeS" class="layui-input" readonly/>' +
				// '</div>' +
				// '</div>' +
				'<div class="layui-form-item">' +
				'<label style="width: 120px;" class="layui-form-label">根目录节点内容：</label>' +
				'<div style="margin-left: 120px;" class="layui-input-block">';
				str+=' <input style="width: 80%;" type="text" lay-verify="required" id="name" name="name" class="layui-input" />';
				str+='</div>' +
				'</div>' +
				' <div style="margin: 15px 0;" class="layui-form-item tutor-block">';
				str+='<div style="margin-left: 120px;" class="layui-input-block">';
				str+='<button type="button" id="editNode" class="layui-btn" lay-submit lay-filter="editNode">保存</button>' +
				// '<button type="reset" class="layui-btn layui-btn-primary">重置</button>' +
				'</div>' +
				'</form></div>';
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 1,
				title: '新增根目录节点',
				shadeClose: true,
				closeBtn: 0,
				area: ['500px', 'auto'],
				content: str
			});
			form.on('submit(editNode)', function (data) {
				let field = data.field;
				let obj = new Object();
				obj['name'] = field['name'];
				obj['parent'] = '-1';
				obj['index'] = index;
				obj['level'] = 1;
				nodeUpdate('add',obj)
				return false;
			});
		},
		publish: function() {
			let businessIds = '';
			console.log(node.parentInfo);
			$.each(node.parentInfo.children,function (key, value) {
				businessIds+=`${value.uid},`
			})
			layer.confirm('发布后此建制将无法设置分项/字段!', function(index) {
				$.ajax({
					url:configCenterHost+'api/timetable/timetableByTemplate',
					// dataType: 'json',
					data: {templateId:eleTreeComponent.templateId,sourceProject:'configcenter',businessIds:businessIds},
					type: 'post',
					async: false,
					success: function (res) {
						switch (res.code){
							case 200:
								layer.msg('已发布!')
								layer.close(index);
								// window.reload
								window.location.reload();
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
		},
		cancelPublish: function() {
			layer.confirm('撤回发布之前填写的表单结果将被清空!', function(index) {
				$.ajax({
					url:`${configCenterHost}api/timetable/timetableByTemplate/${eleTreeComponent.templateId}`,
					// dataType: 'json',
					type: 'DELETE',
					async: false,
					success: function (res) {
						switch (res.code){
							case 0:
								layer.msg('已撤回发布!')
								layer.close(index);
								// window.reload
								window.location.reload();
								break;
							case -1:
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
	};
	$('.btn-method').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		methods[method] ? methods[method].call(this, othis) : '';
	});

	//执行一个表单
	function renderTable(elId,url,cols){
		let tableObj = {
			elem: elId,
			url: url, //数据接口
			title: '列表',
			toolbar: '#toolbars',
			cellMinWidth: 100,
			page: true, //开启分页
			page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
				layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
				//curr: 5, //设定初始在第 5 页
				groups: 1, //只显示 1 个连续页码
				first: false, //不显示首页
				last: false //不显示尾页
			},
			parseData: function(res){ //res 即为原始返回的数据
				var pdata = {
					"code": 0, //解析接口状态
					"msg": "", //解析提示文本
					"count": res.total, //解析数据长度
					"data": res.data //解析数据列表
				};
				// console.log(res);

				return pdata;
			},
			cols: [
				cols
			],
			id: 'customsetting',
			data: table,
			skin: 'line', //表格风格
			even: false,
			limits: [5, 10, 15, 20],
			limit: 15 //每页默认显示的数量
		}
		if(!tableComponent.processId){
			delete tableObj.url;
			tableObj['data'] = []
		}
		table.render(tableObj);
	}


	//监听行工具事件
	table.on('tool(customsetting)', function(obj) {
		var data = obj.data;

		//打开编辑页面
		if(obj.event === 'edit') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '编辑字段',
				area: ['500px', '480px'],
				shade: 0.5,
				maxmin: true,
				content: 'newField?templateId='+eleTreeComponent.templateId+'&processId='+eleTreeComponent.processId+'&configId='+data.id,
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['确定', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#newfieldbtn");
					submit.click();
				},
				end: function () {
					tableComponent.render()
				}
			});
			//layer.full(index);
		};

		//删除
		if(obj.event === 'del') {
			layer.confirm('是否删除？', {
				title: '提示'
			}, function(index) {
				$.ajax({
					url: `${configCenterHost}api/configIndicator/deleteIndicatorByIds?indicatorIds=${data.id}`,
					type: 'DELETE',
					success: function(res){
						if(res.code === 200){
							layer.msg('删除成功');
							obj.del();
							layer.close(index);
						}
					}
				})
			});
		}
	});

	var $ = layui.$,
		active = {
			reload: function() {
				var searchbox = $('#searchbox');

				//执行重载
				table.reload('customsetting', {
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						key: {
							name: searchbox.val()
						}
					}
				}, 'data');
			}
		};
	function btnInit(){
		$('.addnav').css('display','inline-block');
		$('.editnav').css('display','inline-block');
		$(".savenav").hide();
		$(".add_nav_box").hide();
		$(".new_nav_box").hide();
		$(".field_btn_box").css("display", "inline");
	}
	$('.search_line .layui-btn').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});

	function selectBtnBox(){
		//分项切换
		$(".field_btn_box a").click(
			function() {
				$(this).addClass("field_btn_select").siblings().removeClass("field_btn_select");
				if(!$(this).attr('data')){
					let height = $('#left').height();
					$('.process_content').find('iframe').remove();
					$('.process_content').append(`<iframe style="width: 100%;height: ${height-150}px" id="attr_url" src="${$(this).attr('data-herf')}"></iframe>`);
					$('.search_line').hide();
					$('.head_tab').hide();
				}else{
					$('.process_content').find('iframe').remove();
					$('.search_line').show();
					$('.head_tab').show();
					eleTreeComponent.processId = Number($(this).attr('data'));
					tableComponent.processId = eleTreeComponent.processId;
					tableComponent.render();
				}

			}
		);

	}
	let processFlag = '';//是编辑还是新增
//添加/删除一次功能菜单
	$(".addnav").click(
		function() {
			processFlag = 'add';
			$(this).hide();
			$(".editnav").hide();
			$(".savenav").css("display", "inline-block");
			$(".new_nav_box").css("display", "inline-block");
			$(".new_nav_box").html('');
			$(".new_nav_box:last").append($(".add_nav_box>.add_nav_single").clone());
		}
	);
	$(".delete_nav").click(
		function() {
			deletenav(this);
		}
	);

	$(".editnav").click(
		function() {
			processFlag = 'edit';
			let processCname = '';
			$('.field_btn_box  a').each(function () {
				if($(this).hasClass('field_btn_select')){
					processCname = $(this).text();
				}
			})
			$(this).hide();
			$(".addnav").hide();
			$(".savenav").css("display", "inline-block")
			$(".field_btn_box").hide();
			$(".new_nav_box").html('').css("display", "inline-block");
			$(".new_nav_box:last").append($(".add_nav_box>.add_nav_single").clone());
			$(".new_nav_box .add_nav_single").find('input').val(processCname);
		}
	);
	$(".savenav").click(
		function() {
			// console.log($('.new_nav_box').find('input').val());
			// console.log(eleTreeComponent.clickUid);
            $(this).hide();
            console.log(node);
            let data = new Object();
            if(processFlag === 'add'){
				data = {
					processCname: $('.new_nav_box').find('input').val(),
					templateId: node.info.attribute.templateId,
				}
			}else{
				data = {
					processCname: $('.new_nav_box').find('input').val(),
					templateId: node.info.attribute.templateId,
					templateProcessId: eleTreeComponent.processId
				}
			}
			$.ajax({
                url: configCenterHost +'api/templateProcess/insertTemplateProcess',
                type: 'POST',
				data: JSON.stringify(data),
				contentType:"application/json;charset=utf-8",
                success: function (res) {
                    if(res.code === 200){
                        layer.msg('保存成功!');
						getProcess('add');
                    }
                }
            })
		}
	);
	window.deletenav = function (obj) {
		if(processFlag === 'add'){
			$(obj).parents(".add_nav_single").remove();
			btnInit();
		}else{
			$.ajax({
				url: configCenterHost +'api/templateProcess/deleteTemplateProcess?templateProcessId='+eleTreeComponent.processId,
				type: 'DELETE',
				success: function (res) {
					if(res.code === 200){
						layer.msg('删除成功!');
						getProcess();
						// location.reload();
					}
				}
			})
		}

	}
	function getProcess(type,url) {
		btnInit();
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
			if(res.data.length===0){
				eleTreeComponent.processId = 0;
				$('input[data-method="newfield"]').hide();
				$('label[data-method="publish"]').hide();
				$('label[data-method="cancelPublish"]').hide();
			}

		})
		if(url)
			subStr+=`<a class="url" data-herf="${url}">链接(url)</a>`
		if(subStr === '')
			$('.editnav').hide();
		$('.subentry_tab').html(subStr);
		selectBtnBox();
		if(eleTreeComponent.processId){
			$('label[data-method="publish"]').show();
			$.get(configCenterHost+'api/template/info?templateId='+node.info.attribute.templateId,function (res) {
				console.log(res);
				tableComponent.templateReleased = res.data.isReleased;
				if(res.data.isReleased === 1){
					$('.short_btn').hide();
					$('input[data-method="newfield"]').hide();
					$('label[data-method="cancelPublish"]').show();
				}else{
					$('label[data-method="cancelPublish"]').hide();
					$('input[data-method="newfield"]').show();
				}
			})
		}else{
			if(url)
				$('.url').click();
		}
		$.ajaxSettings.async = true;
		if(type !== 'add'){
			tableComponent.processId = eleTreeComponent.processId;
			tableComponent.render()
		}
	}
});


function childrenTreeData(d) {
	var data = new Object();
	data['label'] = d.attribute.name;
	data['id'] = d.uid;
	data['attribute'] = d.attribute;
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
	// if(uid != -1){
	// 	var firstConfig = new Object();
	// 	firstConfig['id'] = cdata.data.uid;
	// 	firstConfig['label'] = cdata.data.attribute.name;
	// 	firstConfig['attribute'] = cdata.data.attribute;
	// 	if(cdata.data.children.length>0){
	// 		firstConfig['children'] = [];
	// 		$.each(cdata.data.children,function (i,d) {
	// 			firstConfig['children'].push(childrenTreeData(d));
	// 		})
	// 	}
	// 	data.push(firstConfig);
	// }else{
		if(cdata.data.children.length === 0)
			return data;
		$.each(cdata.data.children,function (index,item){
			var firstConfig = new Object();
			firstConfig['id'] = item.uid;
			firstConfig['label'] = item.attribute.name;
			firstConfig['attribute'] = item.attribute;
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
	// }
	return data;
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

