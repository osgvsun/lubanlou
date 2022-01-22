layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate'], function() {
	var $ = layui.jquery,
		form = layui.form;
	form.render(null, 'newchargeitembox');
	//监听提交
	form.on('submit(newchargeitembtn)', function(data) {
		var field = data.field; //获取提交的字段
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引  

		itemmain: ""
		itemmone: ""
		itemmthree: ""
		itemmtwo: ""
		standardmain: ""
		standardone: ""
		standardthree: ""
		standardtwo: ""


		let arr = []
		let obj = {};
		if (field['itemmain'] !== '' || field['standardmain'] !== '') {
			obj = {"content": field['itemmain'], "amount": field['standardmain'], "type": "1"};
			arr.push(obj);
		}
		if (field['itemmone'] !== '' || field['standardone'] !== '') {
			obj = {"content": field['itemmone'], "amount": field['standardone'], "type": "2"};
			arr.push(obj);
		}
		if (field['itemmthree'] !== '' || field['standardthree'] !== '') {
			obj = {"content": field['itemmthree'], "amount": field['standardthree'], "type": "3"};
			arr.push(obj);
		}
		if (field['itemmtwo'] !== '' || field['standardtwo'] !== '') {
			obj = {"content": field['itemmtwo'], "amount": field['standardtwo'], "type": "4"};
			arr.push(obj);
		}
		let count = 0;
		for (let i = 0; i < arr.length; i++) {
			let fd = new FormData();
			fd = null;
			fd = new FormData();
			fd.append('instrumentUid', uid);
			fd.append('content', arr[i].content);
			fd.append('amount', arr[i].amount);
			fd.append('type', arr[i].type);
			$.ajax({
				url: httpDeviceUrl + 'saveInstrumentMachineItem',
				type: 'POST',
				data: fd,
				contentType: false,
				processData: false,
				success: function (res) {
					count++
					if (count === arr.length) {
						parent.layui.table.reload('chargeitem'); //重载表格
						parent.layer.close(index); //再执行关闭
					}
				}
			})
		}
	});
});