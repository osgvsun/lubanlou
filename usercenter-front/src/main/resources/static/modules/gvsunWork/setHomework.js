layui.use(['form', 'layer'], function() {
	var $ = layui.jquery,
		form = layui.form,
		layer = layui.layer;
	// 想要获取的cook键值
	var sourceCookie = getCookie('datasource.cookie');
	//监听提交
	form.on('submit(sethomeworkbtn)', function(data) {
		var field = data.field; //获取提交的字段
		console.log(field)
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
		let obj = {};
		obj['title'] = sourceCookie + '-' +field.title + '-' + field.type;
		obj['onlineMarking'] = field.onlineMarking;
		obj['repeatAssignment'] = field.repeatAssignment;
		obj['transcript'] = field.transcript;
		obj['group'] = field.group;
		obj['duplicateChecking'] = field.duplicateChecking;
		obj['chapter'] = '1';

		if (field.experiment === undefined) {
			obj['experiment'] = '0';
		} else {
			obj['experiment'] = '1';
		}

		if (field.lesson === undefined) {
			obj['lesson'] = '0';
		} else {
			obj['lesson'] = '1';
		}
		if (field.noLimit === undefined) {
			obj['noLimit'] = '0';
		} else {
			obj['noLimit'] = '1';
		}
		if (field.pdf === undefined) {
			obj['pdf'] = '0';
		} else {
			obj['pdf'] = '1';
		}
		if (field.word === undefined) {
			obj['word'] = '0';
		} else {
			obj['word'] = '1';
		}
		if (field.excel === undefined) {
			obj['excel'] = '0';
		} else {
			obj['excel'] = '1';
		}
		if (field.pic === undefined) {
			obj['pic'] = '0';
		} else {
			obj['pic'] = '1';
		}
		if (field.txt === undefined) {
			obj['txt'] = '0';
		} else {
			obj['txt'] = '1';
		}
		console.log(obj);
		$.ajax({
			url: httpBaseUrl + 'api/saveConfigShowApi',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(obj),
			success: function (res){
				let data = res;
				parent.layer.msg('保存成功')
				parent.layer.close(index); //再执行关闭
				parent.location.reload()
			}
		})
	});

	form.render(null, 'sethomeworkbox');
	//在线批阅限制附件类型
	form.on('radio(online)', function(online) {
		var online = online.value;
		if(online == "1") {
			//pdf显示
			$(".online_enclosure").show();
			//基础附件不显示
			$(".basic_enclosure").hide();
			//基础附件清空
			$("input:checkbox[title='不限制']").prop("checked", false);
			$("input:checkbox[title='pdf']").prop("checked", false);
			$("input:checkbox[title='word']").prop("checked", false);
			$("input:checkbox[title='excel']").prop("checked", false);
			$("input:checkbox[title='图片']").prop("checked", false);

			$(".online_enclosure_checkbox").prop("checked", true);
			form.render(); //更新全部，不能删除
		} else {
			//pdf不显示
			$(".online_enclosure").hide();
			//基础附件显示
			$(".basic_enclosure").show();
		}
	});

	form.on('checkbox(configuration)', function(data){
		let elem = data.elem;
		let _this = data.othis;
		if (elem.getAttribute('name') == 'chapter'){
			elem.setAttribute('checked', 'checked');
			_this.addClass('layui-form-checked')
			layer.msg('必填项，默认勾选');
			return false
		}
	});
	form.on('checkbox(online_enclosure_checkbox)', function (data) {
		let elem = data.elem;
		let _this = data.othis;
		elem.setAttribute('checked', 'checked');
		_this.addClass('layui-form-checked')
		layer.msg('必填项，默认勾选');
		return false
	})
	form.on('radio(radioModule)', function (data) {
		let val = data.value;
		if (val === 'skill') {
			$("input[name='experiment']").removeAttr('disabled');
		} else {
			$("input[name='experiment']").attr('disabled', 'disabled');
		}
		form.render();
	})

});

//添加/删除一次模块
$(".addmodule").click(
	function() {
		$(".new_module_box:last").append($(".add_module_box>.add_module_single").clone());
	}
);

function deletemodule(obj) {
	$(obj).parents(".add_module_single").remove();
}

//添加/删除一次功能菜单
$(".addnav").click(
	function() {
		$(".new_nav_box:last").append($(".add_nav_box>.add_nav_single").clone());
	}
);

function deletenav(obj) {
	$(obj).parents(".add_nav_single").remove();
}