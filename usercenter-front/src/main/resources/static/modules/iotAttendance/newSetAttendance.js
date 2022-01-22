layui.use(['form', 'element', 'laypage', 'layer', 'layedit'], function() {
	var $ = layui.jquery,
		admin = layui.admin,
		form = layui.form,
		element = layui.element,
		laypage = layui.laypage,
		layer = layui.layer,
		layedit = layui.layedit;

	//向世界问个好
	//layer.msg('');	

	//监听提交
	form.on('submit(newsetattendancebtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

		//提交 Ajax 成功后，关闭当前弹层并重载表格
		//$.ajax({});
		parent.layui.table.reload('setattendancebox'); //重载表格
		parent.layer.close(index); //再执行关闭 
	});

	form.render(null, 'newsetattendancebox');

	//信息
	form.val('newsetattendancebox', {
		"": "" //备用
	});

	//【课程开始】考勤时间范围
	//开始时间
	form.on('radio(startfront)', function(startfront) {
		var startfront = startfront.value;
		if(startfront == "课前") {
			$(".startfront_after").hide();
			$(".startfront_before").show();
		}
		if(startfront == "课程开始") {
			$(".startfront_before").hide();
			$(".startfront_after").hide();
		}
		if(startfront == "课后") {
			$(".startfront_before").hide();
			$(".startfront_after").show();
		}
	});
	//结束时间
	form.on('radio(startlast)', function(startlast) {
		var startlast = startlast.value;
		if(startlast == "课前") {
			$(".startlast_after").hide();
			$(".startlast_before").show();
		}
		if(startlast == "课程开始") {
			$(".startlast_before").hide();
			$(".startlast_after").hide();
		}
		if(startlast == "课后") {
			$(".startlast_before").hide();
			$(".startlast_after").show();
		}
	});

	//【课程结束】考勤时间范围
	//开始时间
	form.on('radio(endfront)', function(endfront) {
		var endfront = endfront.value;
		if(endfront == "课前") {
			$(".endfront_after").hide();
			$(".endfront_before").show();
		}
		if(endfront == "课程开始") {
			$(".endfront_before").hide();
			$(".endfront_after").hide();
		}
		if(endfront == "课后") {
			$(".endfront_before").hide();
			$(".endfront_after").show();
		}
	});
	//结束时间
	form.on('radio(endlast)', function(endlast) {
		var endlast = endlast.value;
		if(endlast == "课前") {
			$(".endlast_after").hide();
			$(".endlast_before").show();
		}
		if(endlast == "课程开始") {
			$(".endlast_before").hide();
			$(".endlast_after").hide();
		}
		if(endlast == "课后") {
			$(".endlast_before").hide();
			$(".endlast_after").show();
		}
	});
});