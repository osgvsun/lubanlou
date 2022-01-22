layui.use(['layer', 'element', 'form', 'layedit'], function() {
	var admin = layui.admin,
		layer = layui.layer,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form,
		layedit = layui.layedit

	//向世界问个好
	//layer.msg('');

	form.render(null, 'newcontentbox');

	//监听提交
	form.on('submit(newcontentbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		parent.layui.table.reload('newcontentbox'); //重载表格
		parent.layer.close(index); //再执行关闭 
	});

	//信息
	form.val('newcontentbox', {
		"set": 1, //所属设置默认值
		"project": 1 //所属分项默认值
	});

	//建立编辑器的图片接口
	layedit.set({
		uploadImage: {
			url: layui.setter.base + 'json/contentImg.json' //接口url
				,
			type: '' //默认post
		}
	});
	//注意：layedit.set 一定要放在 build 前面，否则配置全局接口将无效。
	//建立富文本框编辑器
	layedit.build('contentbox', {
		height: 163 //设置编辑器高度
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

});

//富文本赋值
$('#contentbox').html("");