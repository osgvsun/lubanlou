layui.config({
	base:'../'
}).extend({
	index:'lib/index'
})
var checked=new Array();
layui.use(['laypage', 'layer', 'table', 'element', 'form'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form

	//向世界问个好
	// layer.msg('进入实验项目管理——全部项目');
	let academyNumber = '0103';
	let myauth;
	let proNumberEdit = false;
	form.render(null, 'allprojectbox');
	function FormSelectComponent(obj){
		this.elId = obj.elId;
		this.selectedData = [];
		this.dataUrl = obj.dataUrl;
		this.type = obj.type;
		this.search = obj.search;
		this.model = obj.model;
		this.init = function () {
			let that = this;
			let data = new Object();
			data['type'] = that.type;
			data['search'] = that.search;
			data['academyNumber'] ='';
			data['userRole'] ='';
			$.ajax({
				url: that.dataUrl,
				dataType: 'json',
				// async: false,
				data: JSON.stringify(data),
				type: 'post',
				contentType:"application/json;charset=utf-8",
				success: function (res) {
					// console.log(res);
					if(that.model === 'single'){
						$.each(res.results, function (i, d) {
							$(`[name='${that.elId}']`).append(new Option(d.text, d.id));// 下拉菜单里添加元素
						});
						form.render("select");
					}
				}
			})
		}

	}
	let pConfig = [];
	$.ajax({
		url:`${timetableHost}api/common/config/apiConfigFromRedisDTOInfo`,
		async: false,
		type: 'post',
		success:function (res) {
			console.log(res);
			pConfig = res;
			if(pConfig['showTerm'])
				$('.termImport').css({'display':'inline-block'});
			// pConfig.showLab = false;
			// pConfig.showTerm = false;
		},
		error: function () {
			layer.msg("获取字段配置项失败");
			return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
		}
	});
	let cols = [ //表头
		// {fixed: 'left',type: 'checkbox',width: 40},
		{fixed: 'left',title: '序号',type: 'numbers',width: 40},
		// {field: 'lpCodeCustom',title: '实验编号',sort: true, edit: 'text'},
		{field: 'lpName',title: '实验名称',sort: true},
		{field: 'courseName',title: '所属课程',sort: true},
		{field: 'creatorName',title: '创建者',sort: true},
		{field: 'auditStatus',title: '状态',sort: true},
		{fixed: 'right',title: '操作',toolbar: '#toolbar'}
	];
	if(proNumberEdit && !pConfig['showCodeCustom']){
		cols.splice(2,0,{field: 'lpCodeCustom',title: '实验编号',sort: true, edit: 'text'});
	}else{
		cols.splice(2,0,{field: 'lpCodeCustom',title: '实验编号',sort: true});
	}
	if(pConfig.showTerm){
		cols.splice(4,0,{field: 'termName',title: '学期',sort: true});
	}else{
		$(`[name='termId']`).parent().hide();
	}
	if(pConfig.showLab){
		cols.splice(4,0,{field: 'labRoomName',title: '所属实验室',width: 115,sort: true});
	}
	if(pConfig.showUpdateUser){
		cols.splice(4,0,{field: 'updateUser',title: '首开人',width: 115,sort: true});
	}
	//打开导入实验项目
	var uploadallproject = {
		uploadallproject: function() {
			//layer.msg('');
			var that = this;
			//多窗口模式，层叠置顶
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '导入项目',
				area: ['508px', '478px'],
				shade: 0.5,
				maxmin: true,
				content: 'uploadAllProject',
				zIndex: layer.zIndex //重点1
					,
				success: function(layero) {
					layer.setTop(layero); //重点2
				},
				btn: ['导入', '取消'],
				yes: function(index, layero) {
					//点击确认触发 iframe 内容中的按钮提交
					var submit = layero.find('iframe').contents().find("#uploadallprojectbtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.uploadallproject').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		uploadallproject[method] ? uploadallproject[method].call(this, othis) : '';
	});
	let url = `${timetableHost}/api/operation/getAllMyOperationItemList`;
	if(itemName){url += url.indexOf('?')!=-1 ? `&itemName=${itemName}` : `?itemName=${itemName}`};
	if(auditor){url +=  url.indexOf('?')!=-1 ? `&auditor=${auditor}` : `?auditor=${auditor}`};
	if(labId){url +=  url.indexOf('?')!=-1 ? `&labId=${labId}` : `?labId=${labId}`};
	if(termId){url +=  url.indexOf('?')!=-1 ? `&termId=${termId}` : `?termId=${termId}`};
	if(status && status!='null'){url +=  url.indexOf('?')!=-1 ? `&status=${status}` : `?status=${status}`};
	if(courseNumber){url +=  url.indexOf('?')!=-1 ? `&courseNumber=${courseNumber}` : `?courseNumber=${courseNumber}`};
	if(username){url +=  url.indexOf('?')!=-1 ? `&username=${username}` : `?username=${username}`};
	if(academyNumber){url +=  url.indexOf('?')!=-1 ? `&academyNumber=${academyNumber}` : `?academyNumber=${academyNumber}`};
	if(itemNumber){url +=  url.indexOf('?')!=-1 ? `&itemNumber=${itemNumber}` : `?itemNumber=${itemNumber}`};
	if(courseName){url +=  url.indexOf('?')!=-1 ? `&courseName=${courseName}` : `?courseName=${courseName}`};
	if(subjectNumber){url +=  url.indexOf('?')!=-1 ? `&subjectNumber=${subjectNumber}` : `?subjectNumber=${subjectNumber}`};
	if(categoryMainId){url +=  url.indexOf('?')!=-1 ? `&categoryMainId=${categoryMainId}` : `?categoryMainId=${categoryMainId}`};
	if(categoryNatureId){url +=  url.indexOf('?')!=-1 ? `&categoryNatureId=${categoryNatureId}` : `?categoryNatureId=${categoryNatureId}`};
	if(categoryStudentId){url +=  url.indexOf('?')!=-1 ? `&categoryStudentId=${categoryStudentId}` : `?categoryStudentId=${categoryStudentId}`};
	//执行一个表单
	table.render({
		elem: '#allproject',
		url: url, //数据接口
		title: '列表',
		cellMinWidth: 90,
		page: true, //开启分页			
		page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
			layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
			//curr: 5, //设定初始在第 5 页				
			groups: 1, //只显示 1 个连续页码				
			first: false, //不显示首页				
			last: false //不显示尾页
		},
		parseData: function(res){ //res 即为原始返回的数据
			var pdata = {
				"code": 0, //解析接口状态
				"msg": "", //解析提示文本
				"count": res.count, //解析数据长度
				"data": [] //解析数据列表
			};
			pdata.data = res.data;
			return pdata;
		},
		cols: [
			cols
		],
		id: 'allproject',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		limits: [5, 10, 15, 20],
		limit: 15, //每页默认显示的数量
		done: function (res) {
			// 设置换页勾选之前的
			// console.log(checked);
			//在缓存中找到PM_CODE ,然后设置data表格中的选中状态
			//循环所有数据，找出对应关系，设置checkbox选中状态
			for(var i=0;i<res.data.length;i++){
				for(var j=0;j<checked.length;j++){
					if(res.data[i].id==checked[j]){
						//这里才是真正的有效勾选
						res.data[i]["LAY_CHECKED"]='true';
						//找到对应数据改变勾选样式，呈现出选中效果
						var index= res.data[i]['LAY_TABLE_INDEX'];
						$('.layui-table tr[data-index=' + index + '] input[type="checkbox"]').prop('checked', true);
						$('.layui-table tr[data-index=' + index + '] input[type="checkbox"]').next().addClass('layui-form-checked');
					}
				}
			}
		}
	});

	//监听行工具事件
	table.on('tool(allproject)', function(obj) {
		var data = obj.data;
		//打开查看页面
		if(obj.event === 'detail') {
			var index = layer.open({
				type: 2 //此处以iframe举例
					,
				title: '查看项目',
				area: ['500px', '441px'],
				shade: 0.5,
				maxmin: true,
				content: 'allProjectDetail?proId='+data.id
			});
			layer.full(index);
		};
		if(obj.event === 'deactivate') {
			layer.confirm('确定停用？', {
				title: '提示'
			}, function(index) {
				$.ajax({
					url: `${timetableHost}api/operation/deactivateOperationItem?itemId=${data.id}`,
					type: 'post',
					success: function (res) {
						if(res.code === 0){
							table.reload('allproject');
							layer.close(index);
						}
					}
				})

			});
		};
	});
	//监听单元格编辑
	table.on('edit(allproject)', function(obj){
		var value = obj.value //得到修改后的值
			,data = obj.data //得到所在行所有键值
			,field = obj.field; //得到字段
		if(value.gblen()>13){
			layer.msg('实验编号过长!请控制在13个字符之内(中文占2个字符)');
			return false;
		}
		if(data.auditStatus == data.approved){
			$.ajax({
				url: `${timetableHost}api/operation/saveOperationItem`,
				data: JSON.stringify({id: data.id,lpCodeCustom: value}),
				dataType: 'json',
				type: 'post',
				// async: false,
				contentType:"application/json;charset=utf-8",
				success: function (res) {
					if(res.code === 0){
						table.reload('allproject');
						layer.close(index);
						layer.msg('修改成功')
					}else{
						layer.msg(res.msg)
					}
				}
			})
			// layer.msg(value)
		}else{
			layer.msg('很抱歉,只能修改审核通过的编号')
		}
	});
	table.on('checkbox(allproject)', function(obj){
		var _this = obj.tr[1];
		// handleCheck1(event,_this);
		form.render('checkbox');
		// var flag = $(_this).find('.layui-form-checkbox').hasClass('layui-form-checked')
		// console.log(obj.checked); //当前是否选中状态
		// console.log(obj.data); //选中行的相关数据
		// console.log(obj.type); //如果触发的是全选，则为：all，如果触发的是单选，则为：one
		// if(obj.checked){
		if(obj.type == 'all'){
			if(obj.checked) {
				var cache = table.cache['allproject'];
				for (var j = 0; j < cache.length; j++) {
					for(var i=checked.length-1;i>-1;i--){
						if(checked[i] == cache[j].id){
							checked.splice(i,1);
						}
					}
				}
				for (var i = 0; i < cache.length; i++) {
					checked.push(cache[i].id);
				}
				// $.cookie("checkedCourse",checked);
			}else {
				var cache = table.cache['allproject'];
				for (var j = 0; j < cache.length; j++) {
					for(var i=checked.length-1;i>-1;i--){
						if(checked[i] == cache[j].id){
							checked.splice(i,1);
						}
					}
				}
			}
		}else if(obj.type == 'one'){
			if(event.shiftKey) {
				const boxs = document.querySelectorAll('.layui-table-fixed .layui-table-body .layui-form-checkbox');
				const boxArr = Array.from(boxs);
				boxArr.forEach(function(value,index,arr) {
					// console.log('123')
					var u = $('.layui-table-main table tr').eq(index).find('td').eq(2).find('div').text();
					if($(value).hasClass('layui-form-checked')){
						if(checked.indexOf(u)==-1){
							checked.push(u);
						}
					}else{
						if(checked.indexOf(u)!=-1){
							checked.splice(checked.indexOf(u), 1);
						}
					}
				});
			}else{
				// if(obj.checked) {
				if($(_this).find('.layui-form-checkbox').hasClass('layui-form-checked')) {
					for(var i=checked.length-1;i>-1;i--){
						if(checked[i] == obj.data.id){
							checked.splice(i,1);

						}
					}
					checked.push(obj.data.id);
				}else {
					for(var i=checked.length-1;i>-1;i--){
						if(checked[i] == obj.data.id){
							checked.splice(i,1);
						}
					}
				}
			}

		}
		// }
		// console.log(checked);

	});
	var $ = layui.$,
		active = {
			reload: function() {
				var searchbox = $('#searchbox');

				//执行重载
				table.reload('allproject', {
					page: {
						curr: 1 //重新从第 1 页开始
					},
					where: {
						// key: {
						itemName: searchbox.val(),
						username: $(`[name='username']`).val(),
						labId: $(`[name='labId']`).val(),
						termId: $(`[name='termId']`).val(),
						status: $(`[name='status']`).val(),
						courseNumber: $(`[name='courseNumber']`).val(),
						// }
					}
				}, 'data');
			},
			massDelete: function () {
				let idList = checked.join(',');
				layer.confirm('确定删除？', {
					title: '提示'
				}, function(index) {
					$.ajax({
						url: `${timetableHost}api/operation/batchDeleteOperationItem?idList=${idList}`,
						type: 'post',
						success: function (res) {
							if(res.code === 0){
								checked = new Array();
								table.reload('allproject');
								layer.close(index);
							}
						}
					})

				});
			},
			importItem: function () {
				let idList = checked.join(',');
				let termId = $(`[name='term']`).val();
				$.ajax({
					url: `${timetableHost}api/operation/importOperationItemByTerm?itemIds=${idList}&termId=${termId}&username=${currentUsername}`,
					type: 'post',
					success: function (res) {
						if(res.code === 0){
							layer.msg('导入成功')
							checked = new Array();
							table.reload('allproject');
						}
					}
				})
			}
		};

	$('.search_line .layui-btn').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});
	String.prototype.gblen = function() {
		var len = 0;
		for (var i=0; i<this.length; i++) {
			if (this.charCodeAt(i)>127) {
				len += 2;
			} else {
				len ++;
			}
		}
		return len;
	}
});