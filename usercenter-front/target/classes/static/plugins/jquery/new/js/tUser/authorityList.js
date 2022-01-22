var header = $("meta[name='_csrf_header']").attr("content");
var token = $("meta[name='_csrf']").attr("content");

$('#dg').datagrid({ 
	url : "../tUser/authorityListDetail",
	columns : [ [
		{
			field : 'cname',
			title : '用户组名称',
			width : '25%',
			align : 'left'
		},{
			field : 'name',
			title : '用户组标识',
			width : '25%',
			align : 'left'
		},{
			field : 'authorityUserNum',
			title : '用户组人数',
			width : '25%',
			align : 'left',
			formatter:function(colData,rowData){
				var authorityUserNum = '';
				$.ajax({
					async: false,
					data: {'id':rowData.id},
			        url:"../tUser/getAuthorityUserNum",
			        type:"POST",
			        success:function(data){//AJAX查询成功
			        	authorityUserNum = data;
			        }
			    });
				return authorityUserNum;
			}
		},{field : '_opt',title : '操作',	width:'20%',align:'left',formatter:function(colData,rowData){   //格式化函数添加一个操作列
        	var btn = '<a href="#" onclick="editAuthority(\''+rowData.id+'\')">查看</a>&nbsp;'; 
         	return btn; 
        }}
	] ],
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

//权限下用户列表
function editAuthority(id){
	window.location.href="../tUser/listAuthorityUser?id="+id;
}


