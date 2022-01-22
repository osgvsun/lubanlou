layui.config({
	base:'../../'
}).extend({
	index:'lib/index'
}).use(['index','layer', 'element', 'form'], function() {
	var admin = layui.admin,
		layer = layui.layer,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form

	//向世界问个好
	//layer.msg('');

	form.render(null, 'newfieldbox');
	let templateId = $('#templateId').val();
	let processId = $('#processId').val();
	let configId = $('#configId').val();
	let sonIndicator = 1;
	const indicatorNames = [
		{name:'current',cname:'当前XXX'},
		{name:'currentLogin',cname:'当前登录人'},
		{name:'globalVariable',cname:'全局变量'},
		{name:'count',cname:'多人单独提交'},
		{name:'totalColumn',cname:'合计'},
		{name:'countType',cname:'数量统计'},
		{name:'globelDate',cname:'流程起止时间'},
		{name:'currentDate',cname:'当前时间'},
		{name:'trueTime',cname:'流程真实可执行时间(计划流程)'},
		{name:'split',cname:'多选拆分多条数据'},
		{name:'search',cname:'异步搜索多选'},
		{name:'linkage',cname:'联动-条件'},
		{name:'linkage-',cname:'联动-结果'},
		{name:'audit',cname:'审核'},
		{name:'message',cname:'发送短信&邮箱'},
		{name:'taskSelect',cname:'选择分支(并行流程)'},
		{name:'show',cname:'预览附件(pdf&office文档)'},
	];
	function SelectComponent(elId,url) {
		this.elId = elId;
		this.url = url;
		this.render = function () {
			renderSelect(this.elId, this.url);
		};
		this.init = function () {
			this.render();
		}
	}
	function XmSelectComponent(elId) {
		this.elId = elId;
		this.data = [];
		this.render = function () {
			renderXmSelect(this.elId, this.data);
		};
		this.init = function () {
			this.render();
		};
		this.update = function () {
			// xmSlectUpdate()
			indicatorNameXmSelect.update({data: this.data})
		}
	}
	function renderSelect(elId,url){
		// $.ajaxSettings.async = false;
		$.get(url,function (res) {
			// console.log(res);
			let subStr = '';
			$.each(res.data, function (i, j) {
				subStr += Number(processId) === j.templateProcessId ? `<option value="${j.templateProcessId}" selected>${j.processCname}</option>` : `<option value="${j.templateProcessId}">${j.processCname}</option>`;
			})
			$(elId).append(subStr);
			form.render('select')
		})
		// $.ajaxSettings.async = true;
	}
	function renderXmSelect(elId,data){
		indicatorNameXmSelect = xmSelect.render({
			el: elId,
			tips: '请选择特殊字段类型',
			theme: {
				color: '#409eff',
			},
			on: function(data){
				//arr:  当前多选已选中的数据
				let urlConfig = ['current','currentLogin','search','linkage','linkage-'];
				let optionsConfig = ['audit','message'];
				let checkboxConfig = ['taskSelect'];
				$.each(data.arr,function (kay, value) {
					if(urlConfig.indexOf(value.value) !=-1){
						$('.url').show();
						if(value.value === 'currentLogin')
							$('#url').val('getCurrentUser').attr('disabled','disabled');
					}
					if(optionsConfig.indexOf(value.value) !=-1){
						$('.indicator_options').show();
						if(data.value === 'message')
							$('#indicatorOptions').val('是,否').attr('disabled','disabled');
					}
					if(checkboxConfig.indexOf(value.value) !=-1){
						if(data.isAdd){
							$('.indicator_options').hide();
							$('.indicator_options').val('');
						}
					}
				})
				$.each(data.change,function (kay, value) {
					if(checkboxConfig.indexOf(value.value) !=-1){
						if(!data.isAdd){
							$('.indicator_options').show();
						}
					}
				})
				// var arr = data.arr;
				// //change, 此次选择变化的数据,数组
				// var change = data.change;
				// //isAdd, 此次操作是新增还是删除
				// var isAdd = data.isAdd;

				// alert('已有: '+arr.length+' 变化: '+change.length+', 状态: ' + isAdd)
			},
			data: data
		})
	}
	let select = new SelectComponent('#process',configCenterHost+'api/templateProcess/infoByTemplateAndStep?templateId='+templateId);
	select.init();
	let indicatorNameXmSelect;
	let xmSelects = new XmSelectComponent('#indicatorName');
	xmSelects.init();
	if(configId){
		$.ajax({
			url: configCenterHost+'api/configIndicator/infoById?configIndicatorId='+ Number(configId) +'&templateProcessId='+ Number(processId),
			// async: false,
			success: function (res) {
				console.log(res);
				if(res.code === 200){
					//信息
					form.val('newfieldbox', {
						"contentType": res.data.contentType,
						"indicatorCname": res.data.indicatorCname,
						"indicatorEname": res.data.indicatorEname,
						"url": res.data.url,
						"indicatorOptions": res.data.indicatorOptions,
					});
					if(res.data.url)
						$('.url').show()
					if(res.data.configIndicatorDTOS.length>0){
						sonIndicator = res.data.configIndicatorDTOS.length;
						$('.son_indicators').show()
						$('#sonIndicators1').remove()
						for(let i = 0;i<res.data.configIndicatorDTOS.length;i++){
							$('.layui-icon-add-circle').before(`<input type="text" name="sonIndicators" id="sonIndicators${i+1}" data-id="${res.data.configIndicatorDTOS[i].id}" autocomplete="on" class="layui-input" value="${res.data.configIndicatorDTOS[i].indicatorCname}"/>`);
						}
					}
					if(res.data.indicatorOptions)
						$('.indicator_options').show()
					if(res.data.indicatorName){
						let names = res.data.indicatorName.split('|');
						let chose = [];
						$.each(indicatorNames,function (kay, value) {
							$.each(names,function (i,j) {
								if(j === value.name)
									chose.push({name: value.cname, value: value.name})
							})
						})
						indicatorNameXmSelect.setValue(chose);
						$('.indicator_name').show()
					}
				}

			}
		})

	}
	window.addSonIndicators = function (obj) {
		sonIndicator++;
		$(obj).before(`<input type="text" name="sonIndicators" id="sonIndicators${sonIndicator}" autocomplete="on" class="layui-input" />`);
	}
	form.on('select(contentTypeFilter)', function(data){
		// console.log(data.elem); //得到select原始DOM对象
		// console.log(data.value); //得到被选中的值
		// console.log(data.othis); //得到美化后的DOM对象
		$('.url').hide();
		$('.indicator_options').hide();
		$('#url').val('');
		$('#url').removeAttr("disabled");
		let names = [];
		switch (data.value){
			case 'input':
				names = ['current','currentLogin','totalColumn','count','globalVariable']
				break;
			case 'number':
				names = ['countType','totalColumn']
				break;
			case 'date':
				names = ['count','currentDate']
				break;
			case 'dateTime':
				names = ['current']
				break;
			case 'rangeDateTime':
				names = ['globelDate']
				break;
			case 'select':
				names = ['linkage','linkage-','current','globalVariable']
				$('.url').show()
				$('.son_indicators').show()
				break;
			case 'multiSelect':
				names = ['search','split','count']
				$('.url').show()
				$('.son_indicators').show()
				break;
			case 'radio':
				names = ['audit','message']
				$('.indicator_options').show()
				break;
			case 'checkbox':
				names = ['taskSelect']
				$('#indicatorName').html('')
				$('.indicator_options').show()
				break;
			case 'text':
				names = ['linkage-','current']
				break;
			case 'file':
				names = ['show']
				break;
			case 'url':
				names = ['linkage-','current']
				$('.url').show()
				break;
			case 'get':
				$('.url').show();
				break;
		}
		let options = new Array();
		$.each(indicatorNames,function (key, value) {
			if(names.indexOf(value.name) !== -1){
				options.push({name: `${value.cname}：${value.name}`, value: value.name})
				// $('#indicatorName').append(`<option value="${value.name}">${value.cname}：${value.name}</option>`)
			}
		})
		// form.render('select');
		xmSelects.data = options;
		xmSelects.update();
		if(names.length>0)
			$('.indicator_name').show();
		$('#url').val('');
	});
	form.on('select(indicatorNameFilter)', function(data){
		// console.log(data.elem); //得到select原始DOM对象
		// console.log(data.value); //得到被选中的值
		// console.log(data.othis); //得到美化后的DOM对象
		$('.url').hide();
		$('.indicator_options').hide();
		$('#url').val('');
		$('#url').removeAttr("disabled");
		let urlConfig = ['current','currentLogin','search','linkage','linkage-'];
		if(urlConfig.indexOf(data.value) !=-1){
			$('.url').show();
			if(data.value === 'currentLogin')
				$('#url').val('getCurrentUser').attr('disabled','disabled');
		}
		let optionsConfig = ['audit','message'];
		if(optionsConfig.indexOf(data.value) !=-1){
			$('.indicator_options').show();
			if(data.value === 'message')
				$('#indicatorOptions').val('是,否').attr('disabled','disabled');
		}
	});
	//监听提交
	form.on('submit(newfieldbtn)', function(data) {
		let field = data.field; //获取提交的字段
		// console.log(field);
		if(indicatorNameXmSelect.getValue('value').length>0){
			let indicatorNames = indicatorNameXmSelect.getValue('value').join('|');
			indicatorNames = '|'+indicatorNames+'|';
			field['indicatorName'] = indicatorNames;
		}else {
			field['indicatorName'] = '';
		}
		let configIndicatorDTOS = new Array();
		for(let i = 0;i < sonIndicator;i++){
			let configIndicatorDTO = new Object();
			// configIndicatorDTO['indicatorCname'] = field[`sonIndicators[${i}]`]
			configIndicatorDTO['indicatorCname'] = $(`[name='sonIndicators']`).eq(i).val();
			configIndicatorDTO['id'] = $(`[name='sonIndicators']`).eq(i).attr('data-id');
			configIndicatorDTOS.push(configIndicatorDTO);
		}
		if(sonIndicator.length>0){
			field['configIndicatorDTOS'] = configIndicatorDTOS;
		}
		let DTOs = new Array();
		DTOs.push(field);
		$.ajax({
			url: configCenterHost+'api/configIndicator/indicator?templateProcessId='+ Number(processId),
			type: 'post',
			data: JSON.stringify(DTOs),
			contentType:"application/json;charset=utf-8",
			success: function (res) {
				if(res.code === 200){
					var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
					//提交 Ajax 成功后，关闭当前弹层并重载表格
					//$.ajax({});
					parent.layui.table.reload('newfieldbox'); //重载表格
					parent.layer.close(index); //再执行关闭
				}
			}
		})

	});


});