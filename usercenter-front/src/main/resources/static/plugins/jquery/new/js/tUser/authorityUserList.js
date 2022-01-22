var id = document.getElementById("id").value;
var header = $("meta[name='_csrf_header']").attr("content");
var token = $("meta[name='_csrf']").attr("content");
   
	$('#dg').datagrid({
	 /*<![CDATA[*/
	url : "../tUser/authorityUserListDetail?${_csrf.parameterName}=${_csrf.token}&id="+id,
	/*]]>*/
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
				var classname = '';
				$.ajax({
					async: false,
					data: {'classNumber':rowData.classNumber},
			        url:"../tUser/getSchoolClassName",
			        type:"POST",
			        success:function(data){//AJAX查询成功
			        	classname = data;
			        }
			    });
				return classname;
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
			width : '15%',
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
        	var btn = '<a href="#" onclick="deleteAuthorityUser(\''+rowData.username+'\','+id+')">删除</a>&nbsp;'; 
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
	
//删除
function deleteAuthorityUser(username,id){
	var result = confirm('确认是否删除?');
	if(result){
		window.location.href="../tUser/deleteAuthorityUser?username="+username+"&id="+id;
	}
}

//添加用户
function addAuthorityUser(){
	var id = document.getElementById("id").value;
	layer.ready(function(){
	    layer.open({
	        type: 2,
	        title: '添加学生',
	        fix: true,
	        shift:-1,
	        shadeClose: true,
	        move:false,
	        maxmin: false,
	        area: ['680px', '465px'],
	        content: '../tUser/addAuthorityUser?id='+id,
	        end:function(){
	        	location.reload();
	        }
	    });
	});
}


