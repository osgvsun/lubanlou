layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form,
		laydate = layui.laydate;

	form.render(null, 'newotherfieldbox');

	//监听提交
	form.on('submit(newotherfieldbtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		let arrObj = [];
		$.each($("input[name=content]"), function (index, obj) {
			console.log(obj)
			if (index > 0) {
				arrObj.push({uid: '', value: $(obj).val()})
			}
		})
		field['openSettingCustomFieldValueVOList'] = arrObj;
		field['addOrEdit'] = 'add';
		console.log(arrObj)
		console.log(field)
		parent.layui.table.reload('othercontent'); //重载表格
		parent.otherContentData(JSON.stringify(field));
		parent.layer.close(index); //再执行关闭
	});

	//字段类型
	form.on('select(type)', function(obj) {
		let val = obj.value;
		if (val == 'TEXT') {
			$('.add_nav_box').closest('.layui-col-lg8').hide();
		} else {
			$('.add_nav_box').closest('.layui-col-lg8').show();
		}
	})

	//添加/删除一次模块
	$(".addnav").click(function() {
		$(".addnav").before($(".add_nav_box>.add_nav_single").clone());
	});
});
function deletenav(obj) {
	$(obj).parents(".add_nav_single").remove();
}