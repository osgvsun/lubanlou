layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate'], function() {
	var $ = layui.jquery,
		element = layui.element,
		form = layui.form;

	form.render(null, 'newsampleattributebox');

	//监听提交
	form.on('submit(newsampleattributebtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

		let configSpecimenUid = window.sessionStorage.getItem('configSpecimenUid');
		let obj = {};
		obj = {
			"configSpecimenUid": configSpecimenUid,
			"name": field.name,
			"style": field.style
		};
		if (field.style === "0") {
			Object.assign(obj,{"choice1": field.radioChoice1, "choice2": field.radioChoice2, "choice3": field.radioChoice3, "choice4": field.radioChoice4});
		}
		if (field.style === "1") {
			field['configSpecimenUid'] = configSpecimenUid
			obj = field;
		}
		$.ajax({
			url: httpDeviceUrl + 'saveConfigSpecimenExtend',
			type: 'POST',
			data: obj,
			success: function (res) {
				if (res.code === 200) {
					parent.layui.table.reload('sampleattribute'); //重载表格
					parent.layer.close(index); //再执行关闭
				}
			}
		})
	});

	//描述方式
	form.on('radio(kind)', function(data) {
		var abc = data.value;
		if(abc == "0") {
			$(".kind_radio").show();
			$(".kind_checkbox").hide();
		}
		if(abc == "1") {
			$(".kind_checkbox").show();
			$(".kind_radio").hide();
		}
		if(abc == "2") {
			$(".kind_radio").hide();
			$(".kind_checkbox").hide();
		}
	});
});