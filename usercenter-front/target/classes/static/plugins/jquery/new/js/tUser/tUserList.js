var header = $("meta[name='_csrf_header']").attr("content");
var token = $("meta[name='_csrf']").attr("content");

// 用户列表
	$('#dg').datagrid({ 
	url : "../tUser/tUserListData",
	columns : [ [
		{
			field : 'username',
			title : '学号',
			width : '15%',
			align : 'left'
		},{
			field : 'cname',
			title : '姓名',
			width : '15%',
			align : 'left'
		},{
			field : 'classname',
			title : '班级',
			width : '15%',
			align : 'left',
			formatter:function(colData,rowData){
				if(rowData.schoolClass == null) {
					return "";
				}else {
					var classname = '';
					$.ajax({
						async: false,
						data: {'classUid':rowData.schoolClass.uid},
						url:"../tUser/getSchoolClassName",
						type:"POST",
						success:function(data){//AJAX查询成功
							classname = data;
						}
					});
					return classname;
				}
			}
		},{
			field : 'majorname',
			title : '专业',
			width : '15%',
			align : 'left',
			formatter:function(colData,rowData){
				var majorname = '';
				return majorname;
			}
		},{
			field : 'academyname',
			title : '学院',
			width : '20%',
			align : 'left',
			formatter:function(colData,rowData){
				var academyname = '';
				$.ajax({
					async: false,
					data: {'academyNumber':rowData.academyNumber},
			        url:"../tUser/getSchoolAcademyName",
			        type:"POST",
			        success:function(data){//AJAX查询成功
			        	academyname =  data;
			        }
			    });
				return academyname;
			}
		},{field : '_opt',title : '操作',	width:'15%',align:'left',formatter:function(colData,rowData){   //格式化函数添加一个操作列
        	var btn = '<a href="#" onclick="editTUser(\''+rowData.username+'\')">编辑</a>&nbsp;'; 
        	btn += '<a href="#" onclick="deleteTUser(\''+rowData.username+'\')">删除</a>&nbsp;'; 
         	return btn; 
        }
	  }] ],
	loadMsg : '正在处理...  ',
	idField : 'no',
	border : false,
	height : 'auto',
	striped : true,
	rownumbers : true,
	fitColumns : true,
	singleSelect : true,
	checkOnSelect : true,
	selectOnCheck : true,
	autoRowHeight : true,
	pagination : true,
	beforeSend: function(xhr){
        xhr.setRequestHeader(header, token);
    },
	pageSize : 15,
	pageList : [ 15, 25, 30 ],
	toolbar : '#toolBar'
});

//查询
function search(){
	var params=[];
    var dt=$('#searchform').serializeArray();
    $.each(dt,function(i,item){
       	params[item.name]=item.value;
    });
    $('#dg').datagrid({
    	queryParams: params
    });
}

//编辑
function editTUser(username){
	layer.ready(function(){ 
	    layer.open({
	        type: 2,
	        title: '用户信息',
	        fix: true,
	        shift:-1,
	        shadeClose: true,
	        move:false,
	        maxmin: false,
	        area: ['600px', '400px'],
	        content: '../tUser/editTUser?username='+username+'',
	    });
	});
}

//保存
function saveTUser() {
	$.ajax({
	    type: 'post',
	    url: '../tUser/saveTUser',
	    data: ({username:$('#username').val(),formSerialize: $("#submitForm").serialize(),cname:$("#cname").val()}),
	    success: function(data) {
	    	parent.window.location.reload();
	    }
	});
} 

//删除
function deleteTUser(username){
	var result = confirm('确认是否删除?');
	if(result){
		window.location.href="../tUser/deleteTUser?username="+username;
	}
}

//图片在线预览
function viewUpload(username, uploadId){
	layer.ready(function(){ 
		layer.open({
			type: 2,
			title: '在线预览',
			fix: true,
			shift:-1,
			shadeClose: true,
			move:false,
			maxmin: false,
			area: ['820px', '545px'],
			content: ['../tUser/viewUpload?username='+username+'&uploadId='+uploadId+'','no']
		});
	});
}

//导入用户
function importUsers(){
	layer.ready(function(){ 
		layer.open({
			type: 2,
			title: '导入用户',
			fix: true,
			shift:-1,
			shadeClose: true,
			move:false,
			maxmin: false,
			area: ['600px', '400px'],
			content: '../tUser/importUsers',
		});
	});
}


