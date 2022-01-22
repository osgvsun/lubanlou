// 编辑个人信息
function editMyInfo(userName) {
	$('#changePassword').hide();
	$('#editMyInfo').fadeIn(300);
}

// 保存个人信息
function saveMyInfo(flag) {
	var phoneNum = $("#phoneNum").val();
	var emailAddress = $("#emailAddress").val();
	if(phoneNum === null || phoneNum === "" || !(/^1[3|4|5|7|8|9][0-9]\d{4,8}$/.test(phoneNum))) {
		alert("请填写格式正确的电话号码！");
		return false;
	}else if(emailAddress === null || emailAddress === "" || !(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(emailAddress))) {
		alert("请填写格式正确的邮箱地址！");
		return false;
	}else {
		var mydata ={
            'uid':$('#userName').val(),
            'phoneNum':phoneNum,
            'emailAddress':emailAddress
		}
		$.ajax({
		    type: 'post',
		    url: '../user/saveMyInfo',
		    data: mydata,
		    //data: ({formSerialize: $("#editForm").serialize(),uid:$('#userName').val()}),
		    success: function(data) {
		    	if(data = "success"){
		    		if(flag == 1){
                        alert("修改成功，请再次刷新页面！");
					}
                    else {
                        parent.window.location.reload();
                    }
				}
		    	//$("#myInfo").reload();
		    }
		});
	}
}

//取消修改
function cancel() {
	$('#editMyInfo').fadeOut(100);
	$('#changePassword').fadeOut(100);
}

// 修改密码
function editPassword() {
	$('#editMyInfo').hide();
	$('#changePassword').fadeIn(300);
}

function changePassword(userName) {
	var oldPsw = '10010003';
	var strPsw = $('#oldPsw').val();
	var newPsw = $('#newPsw').val();
	var confirmPsw = $('#confirmPsw').val();
	
	$("#confirm").click(function(){
		if(strPsw === "" || strPsw === null){
	        layer.alert('请输入原密码！' ,{
	            icon: 0,
	            skin: 'layer-ext-moon' ,});
	        return false;
	    } else if(strPsw !== oldPsw) {
	    	layer.alert('密码错误！' ,{
	            icon: 0,
	            skin: 'layer-ext-moon' ,});
	        return false;
	    }
		if(newPsw === "" || newPsw === null){
	        layer.alert('请输入新密码！' ,{
	            icon: 0,
	            skin: 'layer-ext-moon' ,});
	        return false;
	    }
		if(confirmPsw === "" || confirmPsw === null || confirmPsw !== newPsw){
	        layer.alert('确认密码不一致，请重新输入！' ,{
	            icon: 0,
	            skin: 'layer-ext-moon' ,});
	        return false;
	    }
		
		$.ajax({
		    type: 'post',
		    url: '../../user/saveMyPassword',
		    data: $("#pswForm").serialize(),
		    data: ({formSerialize: $("#pswForm").serialize(),uid:$('#userName').val()}),
		    success: function(data) {
		    	$("#myInfo").reload();
		    }
		});
	});
	
	
}