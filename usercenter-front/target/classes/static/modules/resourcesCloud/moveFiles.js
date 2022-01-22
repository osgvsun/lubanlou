layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate', 'eleTree'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form,
		laydate = layui.laydate,
		eleTree = layui.eleTree

	//向世界问个好
	//layer.msg('');

	//监听提交
	form.on('submit(movefilesbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		parent.layui.table.reload('movefilesbox'); //重载表格
		parent.layer.close(index); //再执行关闭 
	});

	//树形组织
	$(".eleTree-search1").on("change", function() {
		el1.search($(this).val());
	})

	var obj = {
		elem: '.ele1',
		//data: data,
		url: layui.setter.base + 'modules/resourcesCloud/static/json/moveFiles.json',
		renderAfterExpand: true, //是否在第一次展开某个树节点后才渲染其子节点
		highlightCurrent: false, //是否高亮当前选中节点，默认值是 false
		defaultExpandAll: true, //是否默认展开所有节点
		expandOnClickNode: true, //是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点
		checkOnClickNode: false, //是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点
		//defaultExpandedKeys:[23],//默认展开的节点的 key 的数组
		autoExpandParent: true, //展开子节点的时候是否自动展开父节点
		showCheckbox: true, //节点是否可被选择
		checkStrictly: false, //在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
		//defaultCheckedKeys:false,//默认勾选的节点的 key 的数组
		accordion: false, //是否每次只打开一个同级树节点展开（手风琴效果）
		indent: false, //相邻级节点间的水平缩进，单位为像素
		lazy: false, //是否懒加载子节点，需与 load 方法结合使用
		load: false, //加载子树数据的方法，仅当 lazy 属性为true 时生效
		draggable: true, //是否开启拖拽节点功能
		contextmenuList: ["add.async", "edit", "remove"],
		searchNodeMethod: function(value, data) {
			if(!value) return true;
			return data.label.indexOf(value) !== -1;
		}
	};

	eleTree.on("nodeClick(data1)", function(d) {
		console.group("节点点击nodeClick:")
		console.log(d.data); // 点击节点对于的数据
		console.log(d.event); // event对象
		console.log(d.node); // 点击的dom节点
		console.log(this); // 与d.node相同
		console.groupEnd();

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

	var el1 = eleTree.render(obj);

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

});