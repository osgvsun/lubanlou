var id = document.getElementById("id").value;
var header = $("meta[name='_csrf_header']").attr("content");
var token = $("meta[name='_csrf']").attr("content");	
var $dg = $('#dg').datagrid({
	/*<![CDATA[*/    
	url:"../projects/addAuthorityUserListDetail?${_csrf.parameterName}=${_csrf.token}&id="+id,
	/*]]>*/
	columns:[[
		{field:'username',title:'学号',width:'13%',align:'left'},
		{field:'cname',title:'姓名',width:'18%',align:'left'},
		{
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
		},
		{field : '_opt',title : '选择添加',	width:'27%',align:'left',formatter:function(value,data){   //格式化函数添加一个操作列
				return '<input type="checkbox" name="selectT" tid="'+data.username+'" class="skin-input"/>';  
        }}
	    ]],
	    loadMsg:'正在处理...  ',
	    idField:'no',
	    border:false,
	    height:'auto',
        striped:true,
	    rownumbers:false,
	    fitColumns:true,
	    singleSelect:true,
	    checkOnSelect:true,
        selectOnCheck:true,
        autoRowHeight:true,
        pagination:true,
        pageSize:10,
		pageList : [ 10, 15, 20 ],
		toolbar:'#toolBar',
        onLoadSuccess : function(data){
        	$('.skin-input').iCheck({
				checkboxClass: 'icheckbox_minimal-green',
				radioClass: 'iradio_minimal',
				increaseArea: '20%'
			});
        }
	});
	
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
	
	function cancel(){
		$("#username").val('')
		$("#cname").val('')
		search()
	}
	
	function saveAuthorityUsers(){
		
		var users = new Array();
		// 得到所有行
    	var rows = $("#dg").datagrid('getData').rows;  
    	$('input:checkbox[name=selectT]:checked').each(function(i){
    		users.push($(this).attr("tid"))
    	})
    	
    	if(rows.length != 0 ){
    		var params = {}
    		params['id'] = $("#id").val();
        	params['userStrs'] = users.join("-");
        	$.ajax({
				url:'../tUser/saveAuthorityUser',
				data:params,
				//dataType:'json',
				success:function(){
					layer.msg('添加成功', {
					    time: 1000
					});
					search()
				}
			})
    	}
	}