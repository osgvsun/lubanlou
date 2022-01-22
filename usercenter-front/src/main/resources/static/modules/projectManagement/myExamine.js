layui.use(['laypage', 'layer', 'table', 'element', 'form'], function() {
	var admin = layui.admin,
		laypage = layui.laypage,
		layer = layui.layer,
		table = layui.table,
		$ = layui.jquery,
		element = layui.element,
		form = layui.form

	//向世界问个好
	// layer.msg('进入实验项目管理——我的审核');
	let academyNumber = '0103';
	let pConfig = [];
	$.ajax({
		url:`${timetableHost}api/common/config/apiConfigFromRedisDTOInfo`,
		async: false,
		type: 'post',
		success:function (res) {
			pConfig = res;
			pConfig['showTerm'] = false;
		},
		error: function () {
			layer.msg("获取字段配置项失败");
			return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
		}
	});
	let myauth = getCurrentAuth();
	getCurrentUser()
		.then(function (data) {
			// console.log(data);
			// return getCurrentAuth();
			// if(data){
			// 	academyNumber = data.schoolAcademy.academyNumber;
			// }
		})
	function getCurrentUser(){
		var currentUser = new Promise(function(resolve, reject){
			$.ajax({
				url: '../configcenter/getCurrentUser2',
				// dataType: 'json',
				async: false,
				type: 'get',
				success: function (res) {
					console.log(res);
					if(res){
						academyNumber = res.schoolAcademy.academyNumber;
					}
					// resolve(res);
				}
			});
			resolve('complete');
		});
		return currentUser;
	}
	function getCurrentAuth(){
		let currentAuth = [];
		let url = `${timetableHost}api/common/getCurrentAuthority?username=${currentUsername}`;
		$.ajax({
			url: url,
			// dataType: 'json',
			async: false,
			type: 'get',
			success: function (res) {
				if(res.code === 0){
					currentAuth = res;
				}

			}
		});
		return currentAuth;
	}
	form.render(null, 'myexaminebox');
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
	// let courseListSelect = new FormSelectComponent({
	// 	elId: 'courseNumber',
	// 	dataUrl: `${timetableHost}api/common/select/apiCommonSelectBySelect`,
	// 	type: 'schoolCourseInfoList',
	// 	model: 'single'
	// });
	let termListSelect = new FormSelectComponent({
		elId: 'termId',
		dataUrl: `${timetableHost}api/common/select/apiCommonSelectBySelect`,
		type: 'schoolTermList',
		model: 'single'
	});
	// let teacherListSelect = new FormSelectComponent({
	// 	elId: 'username',
	// 	dataUrl: `${timetableHost}api/common/select/apiCommonSelectBySelect`,
	// 	type: 'userList',
	// 	model: 'single'
	// });
	let levelListSelect = new FormSelectComponent({
		elId: 'status',
		dataUrl: `${timetableHost}api/common/select/apiCommonSelectBySelect`,
		type: 'dictionaryList',
		search: 'status_operation_item_check',
		model: 'single'
	});
	// courseListSelect.init();
	termListSelect.init();
	// teacherListSelect.init();
	levelListSelect.init();
	let cols = [ //表头
		{fixed: 'left',type: 'checkbox',width: 40},
		{fixed: 'left',title: '序号',type: 'numbers',width: 40},
		{field: 'lpCodeCustom',title: '实验编号',sort: true},
		{field: 'lpName',title: '实验名称',sort: true},
		{field: 'courseName',title: '所属课程',sort: true},
		{field: 'creatorName',title: '创建者',sort: true},
		{field: 'auditDetail',title: '状态',sort: true},
		{fixed: 'right',title: '操作',toolbar: '#toolbar'}
	];
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
	var uploadmyexamine = {
		uploadmyexamine: function() {
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
					var submit = layero.find('iframe').contents().find("#uploadmyexaminebtn");
					submit.click();
				}
			});
			//layer.full(index);
		}
	};
	$('.uploadmyexamine').on('click', function() {
		var othis = $(this),
			method = othis.data('method');
		uploadmyexamine[method] ? uploadmyexamine[method].call(this, othis) : '';
	});
	let url = `${timetableHost}/api/operation/getAllMyOperationItemList?auditor=${currentUsername}&academyNumber=${academyNumber}`;
	let hasSuperAdmin = false;
	$.each(myauth.data,function (index,item) {
		if(item.authorityName === 'SUPERADMIN'){
			hasSuperAdmin = true;
			return false;
		}
	})
	if(hasSuperAdmin)
		url = `${timetableHost}/api/operation/getAllMyOperationItemList?auditor=${currentUsername}`;
	//执行一个表单
	table.render({
		elem: '#myexamine',
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
            let data = [];
            $.each(res.data,function (key,value) {
                let d = value;
                d['auditFlag'] = false;
                $.each(myauth.data,function (index,item) {
                    if(value.authName === `ROLE_${item.authorityName}`){
                        d['auditFlag'] = true;
                        return false;
                    }
                })
                data.push(d);
            })
            pdata.data = data;
            return pdata;
        },
		cols: [
			cols
		],
		id: 'myexamine',
		data: table,
		skin: 'line', //表格风格			
		even: false,
		limits: [5, 10, 15, 20],
		limit: 15 //每页默认显示的数量
	});

	//监听行工具事件
	table.on('tool(myexamine)', function(obj) {
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
        if(obj.event === 'audit') {
            var index = layer.open({
                type: 2 //此处以iframe举例
                ,
                title: '审核项目',
                area: ['500px', '441px'],
                shade: 0.5,
				closeBtn: 1,
                maxmin: true,
                content: 'allProjectDetail?proId='+data.id+'&audit='+data.authName
            });
            layer.full(index);
        };
	});

	var $ = layui.$,
		active = {
			reload: function() {
				var searchbox = $('#searchbox');

				//执行重载
				table.reload('myexamine', {
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
			}
		};

	$('.search_line .layui-btn').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});
});