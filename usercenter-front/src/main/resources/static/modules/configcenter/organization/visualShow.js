layui.config({
	base:'../../'
}).extend({
	index:'lib/index'
}).use(['index','laypage', 'layer', 'table', 'eleTree', 'element'], function() {
	var admin = layui.admin,
		laypage = layui.laypage //分页
		,
		layer = layui.layer //弹层
		,
		table = layui.table //表格
		,
		eleTree = layui.eleTree,
		$ = layui.jquery,
		element = layui.element //元素操作

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
		// this.attribute = obj.attribut	e;
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
		let orgStr = '';
		let subStr = '';
		let org = cdata.data;
		$.ajax({
			url: configCenterHost +'api/organization/totalNodesAndArcsStartFrom?uid='+d.data.currentData.id,
			async: false,
			success: function (res) {
				console.log(res);
				let gd = new Object();
				gd['links'] = res.data.links;
				gd['nodes'] = [];
				$.each(res.data.nodes,function (key, value) {
					let node = new Object();
					node['id'] = value.uid;
					node['label'] = value.attribute.name;
					node['font'] = '14px';
					node['size'] = '39';
					node['scale'] = '1.8';
					node['properties'] = value.attribute.customField;
					node['properties']['templateId'] = value.attribute.templateId;
					if(value.attribute.customField.level == 1){
						node['color'] = 'rgb(255,8,202)';
						node['shape'] = 'ellipse';
					}else if(value.attribute.customField.level == 2){
						node['color'] = 'rgb(255,203,91)';
						node['shape'] = 'circle';
					}else if(value.attribute.customField.level == 3){
						node['color'] = 'rgb(71,168,216)';
						node['shape'] = 'circle';
					}else if(value.attribute.customField.level == 4){
						node['color'] = 'rgb(109,210,138)';
						node['height'] = 30;
						node['width'] = 140;
						node['shape'] = 'rect';
					}else if(value.attribute.customField.level == 5){
						node['color'] = 'rgb(102,194,239)';
						node['height'] = 30;
						node['width'] = 140;
						node['shape'] = 'rect';
					}
					gd['nodes'].push(node);
				})
				graphInit(gd);
			},
			error: function (err, msg) {
				console.error(err);
			}
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
	let eleTreeComponent;
	let visGraph = new VisGraph(document.getElementById('graph-panel'));
	$.ajax({
		url: configCenterHost +'api/organization/totalNodesAndArcs',
		async: false,
		success: function (res) {
			console.log(res);
			let uids = [];
			$.each(res.data.nodes,function (key, value) {
				if(uid == null || uid === ''){
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
	let node = new NodeInfo();
	eleTreeComponent.init();
	function graphInit(data){
		var graphData = data;
		// var graphData = {
		// 	nodes:[
		// 		{id:'1',label:'刘备',type:'兄',properties:{name:'刘玄德'}},
		// 		{id:'2',label:'关羽',type:'弟',properties:{name:'关云长'}},
		// 		{id:'3',label:'张飞',type:'弟',properties:{name:'张翼德'}}
		// 	],
		// 	links:[
		// 		{source:'1',target:'2',label:'兄弟',properties:{desc:'结拜'}},
		// 		{source:'1',target:'3',label:'兄弟'}
		// 	]
		// };

		//创建GraphVis对象，进行方法调用

		//
		//调用绘图方法，绘制关系图
		// visGraph.drawData(graphData);
		//选择布局算法类型
		var layoutType='fastFR';
//创建布局算法
		var layout = new LayoutFactory(graphData).createLayout(layoutType);

//绘制数据
		visGraph.drawData(graphData);

		//布局
		runTreeLayout(visGraph.getVisibleData());

		//完成后，缩放居中
		visGraph.setZoom('auto');


		function runTreeLayout(graphData){
			var layout=new LayoutFactory(graphData).createLayout("fastFR");
			layout.initAlgo();

//通过动画帧控制控制布局算法的执行，有动画效果
			let loopName='';
			function loop(){
				cancelAnimationFrame(loopName);
				layout.runLayout();  //运行布局算法
				visGraph.refresh(); //刷新视图（优化版本中需要手动刷新视图，原有版本自动刷新性能消耗较大）
				loopName = requestAnimationFrame(loop);
			};
			loopName = requestAnimationFrame(loop);
		}

		//获取图可视化元素中所有的节点
		var nodes = visGraph.nodes;
		var links = visGraph.links;

		//比如给类型为【男】的节点，显示标签并且绑定双击事件
		nodes.map(function(node){
			node.dbclick(function(event){
				// console.log('双击节点打开配置');
				links.map(function(link){
					if(link.properties.type == 'blank'){
						visGraph.deleteLink(link)
					}
				});
				nodes.map(function(nd){
					if(nd.type == 'blank'){
						visGraph.deleteNode(nd)
					}
				});
				eleTreeComponent.templateId = event.target.properties.templateId;
				$.ajax({
					url: configCenterHost +'api/configIndicator/list?templateId='+ eleTreeComponent.templateId +'&page=1&limit=999',
					type:'get',
					async: false,
					success: function (res) {
						// console.log(res)
						// eleTreeComponent.timetableId = res.data[0].id;
						if(res.data.length>0){
							$.each(res.data,function (key, value) {
								let n = new Object();
								let link = new Object();
								switch (value.contentType) {
									case 'url':
										n = {
											id:'10000',
											label: value.indicatorCname,
											fontColor:'255,255,255',
											type:'blank',
											properties:{url:value.url}
										}
										link = {
											source:event.target.id,
											target:10000,
											label:value.indicatorCname,
											lineType: 'vdirect',
											properties:{type:'blank'}
										}
										visGraph.addNode(n)
										visGraph.addEdge(link)
									break;
									case 'get':
									case 'post':
										value.url += value.url.indexOf('?')!=-1 ? '&username='+currentUsername : '?username='+currentUsername
										n = {
											id:'10000',
											label: value.indicatorCname,
											fontColor:'255,255,255',
											type:'api',
											properties:{url:value.url,method:value.contentType}
										}
										link = {
											source:event.target.id,
											target:10000,
											label:value.indicatorCname,
											lineType: 'vdirect',
											properties:{type:'api'}
										}
										visGraph.addNode(n)
										visGraph.addEdge(link)
									break;
								}
								return false;
							})

							visGraph.refresh()
							nodes.map(function(nd){
								switch (nd.type) {
									case 'blank':
										nd.dbclick(function(event){
											window.open(event.target.properties.url,'_blank')
										});
										break;
									case 'api':
										nd.dbclick(function(event){
											$.ajax({
												url: `${event.target.properties.url}`,
												type: event.target.properties.method,
												async: false,
												success: function (res) {
													layer.alert(JSON.stringify(res.data));
												},error: function (err) {
													layer.alert('接口调用失败!');
												}
											})
										});
										break;
								}
								// if(nd.type == 'blank'){
								// 	nd.dbclick(function(event){
								// 		window.open(event.target.properties.url,'_blank')
								// 	});
								// }
							});
						}
					},
					error:function () {
						alert("获取业务数据失败！");
					}
				})

			});
		});
		$('#zoomout').click(function () {
			visGraph.setZoom('zoomOut')
		});
		$('#zoomin').click(function () {
			visGraph.setZoom('zoomIn')
		});
		$('#movecenter').click(function () {
			visGraph.moveCenter()
		});
		$('#zoomauto').click(function () {
			visGraph.setZoom('auto')
		});
		$('#saveimage').click(function () {
			visGraph.saveImage(1800,800)
		});
		windowAddMouseWheel();
		function windowAddMouseWheel() {
			var scrollFunc = function (e) {
				e = e || window.event;
				if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
					if (e.wheelDelta > 0) { //当滑轮向上滚动时
						visGraph.setZoom('zoomOut')
					}
					if (e.wheelDelta < 0) { //当滑轮向下滚动时
						visGraph.setZoom('zoomIn')
					}
				} else if (e.detail) {  //Firefox滑轮事件
					if (e.detail> 0) { //当滑轮向上滚动时
						visGraph.setZoom('zoomOut')
					}
					if (e.detail< 0) { //当滑轮向下滚动时
						visGraph.setZoom('zoomIn')
					}
				}
			};
			//给页面绑定滑轮滚动事件
			if (document.addEventListener) { //火狐使用DOMMouseScroll绑定
				document.addEventListener('DOMMouseScroll', scrollFunc, false);
			}
			//其他浏览器直接绑定滚动事件
			window.onmousewheel = document.onmousewheel = scrollFunc;
		}
	}
// 	$.getJSON("../../json/graphData.json", function (data){
// 		var graphData = data;
// 		// var graphData = {
// 		// 	nodes:[
// 		// 		{id:'1',label:'刘备',type:'兄',properties:{name:'刘玄德'}},
// 		// 		{id:'2',label:'关羽',type:'弟',properties:{name:'关云长'}},
// 		// 		{id:'3',label:'张飞',type:'弟',properties:{name:'张翼德'}}
// 		// 	],
// 		// 	links:[
// 		// 		{source:'1',target:'2',label:'兄弟',properties:{desc:'结拜'}},
// 		// 		{source:'1',target:'3',label:'兄弟'}
// 		// 	]
// 		// };
//
// 		//创建GraphVis对象，进行方法调用
// 		let visGraph = new VisGraph(document.getElementById('graph-panel'));
// 		//
// 		//调用绘图方法，绘制关系图
// 		// visGraph.drawData(graphData);
// 		//选择布局算法类型
// 		var layoutType='fastFR';
// //创建布局算法
// 		var layout = new LayoutFactory(graphData).createLayout(layoutType);
//
// //绘制数据
// 		visGraph.drawData(graphData);
//
// 		//布局
// 		runTreeLayout(visGraph.getVisibleData());
//
// 		//完成后，缩放居中
// 		visGraph.setZoom('auto');
//
//
// 		function runTreeLayout(graphData){
// 			var layout=new LayoutFactory(graphData).createLayout("fastFR");
// 			layout.initAlgo();
//
// //通过动画帧控制控制布局算法的执行，有动画效果
// 			let loopName='';
// 			function loop(){
// 				cancelAnimationFrame(loopName);
// 				layout.runLayout();  //运行布局算法
// 				visGraph.refresh(); //刷新视图（优化版本中需要手动刷新视图，原有版本自动刷新性能消耗较大）
// 				loopName = requestAnimationFrame(loop);
// 			};
// 			loopName = requestAnimationFrame(loop);
// 		}
//
// 		//获取图可视化元素中所有的节点
// 		var nodes = visGraph.nodes;
// 		var links = visGraph.links;
//
// 		//比如给类型为【男】的节点，显示标签并且绑定双击事件
// 		nodes.map(function(node){
// 			if(node.type == '操作'){
// 				node.dbclick(function(event){
// 					// console.log('双击节点打开配置');
// 					links.map(function(link){
// 						if(link.properties.type == 'blank'){
// 							visGraph.deleteLink(link)
// 						}
// 					});
// 					nodes.map(function(nd){
// 						if(nd.type == 'blank'){
// 							visGraph.deleteNode(nd)
// 						}
// 					});
// 					let n = {
// 						id:'10000',
// 						label:'预约镜像',
// 						fontColor:'255,255,255',
// 						type:'blank',
// 						properties:{url:'https://www.baidu.com'}
// 					}
// 					let link = {
// 						source:event.target.id,
// 						target:10000,
// 						label:'预约',
// 						lineType: 'vdirect',
// 						properties:{type:'blank'}
// 					}
// 					visGraph.addNode(n)
// 					visGraph.addEdge(link)
// 					visGraph.refresh()
// 					nodes.map(function(nd){
// 						if(nd.type == 'blank'){
// 							nd.dbclick(function(event){
// 								window.open(event.target.properties.url,'_blank')
// 							});
// 						}
// 					});
// 				});
// 			}
// 		});
// 		$('#zoomout').click(function () {
// 			visGraph.setZoom('zoomOut')
// 		});
// 		$('#zoomin').click(function () {
// 			visGraph.setZoom('zoomIn')
// 		});
// 		$('#movecenter').click(function () {
// 			visGraph.moveCenter()
// 		});
// 		$('#zoomauto').click(function () {
// 			visGraph.setZoom('auto')
// 		});
// 		$('#saveimage').click(function () {
// 			visGraph.saveImage(1800,800)
// 		});
// 		windowAddMouseWheel();
// 		function windowAddMouseWheel() {
// 			var scrollFunc = function (e) {
// 				e = e || window.event;
// 				if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
// 					if (e.wheelDelta > 0) { //当滑轮向上滚动时
// 						visGraph.setZoom('zoomOut')
// 					}
// 					if (e.wheelDelta < 0) { //当滑轮向下滚动时
// 						visGraph.setZoom('zoomIn')
// 					}
// 				} else if (e.detail) {  //Firefox滑轮事件
// 					if (e.detail> 0) { //当滑轮向上滚动时
// 						visGraph.setZoom('zoomOut')
// 					}
// 					if (e.detail< 0) { //当滑轮向下滚动时
// 						visGraph.setZoom('zoomIn')
// 					}
// 				}
// 			};
// 			//给页面绑定滑轮滚动事件
// 			if (document.addEventListener) { //火狐使用DOMMouseScroll绑定
// 				document.addEventListener('DOMMouseScroll', scrollFunc, false);
// 			}
// 			//其他浏览器直接绑定滚动事件
// 			window.onmousewheel = document.onmousewheel = scrollFunc;
// 		}
// 	})
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
	//定义关系数据，包含节点（nodes）和 关系（links），可自定义属性，颜色、坐标，文字等
	// var graphData = {
	// 	nodes:[
	// 		{id:'1',label:'刘备',type:'兄',x:100,y:200,properties:{name:'刘玄德'}},
	// 		{id:'2',label:'关羽',type:'弟',x:300,y:200,properties:{name:'关云长'}},
	// 		{id:'3',label:'张飞',type:'弟',x:500,y:200,properties:{name:'张翼德'}}
	// 	],
	// 	links:[
	// 		{source:'1',target:'2',label:'兄弟',properties:{desc:'结拜'}},
	// 		{source:'1',target:'3',label:'兄弟'}
	// 	]
	// };

});