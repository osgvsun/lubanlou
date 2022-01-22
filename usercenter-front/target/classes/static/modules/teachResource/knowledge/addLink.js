layui.use(['form', 'upload'], function() {
	var $ = layui.$,
		admin = layui.admin,
		element = layui.element,
		layer = layui.layer,
		form = layui.form,
		upload = layui.upload;

	//向世界问个好
	//layer.msg('进入添加链接');

	form.render(null, 'addlink');

	//监听提交
	form.on('submit(addlinkbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		parent.layui.table.reload('addlink'); //重载表格
		parent.layer.close(index); //再执行关闭 
	});

	//基础信息
	form.val('addlink', {
		"": "", //备用
	});
});

//链接
$(".newlink").click(
	function() {
		$("#addlink_box:last").append($("#addlink_box>.fill_box:last-child").clone(true)); //一定要有true,保证深克隆
	}
);

$(".delete_link").on('click',
	function() {
		$(this).parents(".fill_box").remove();
	}
);