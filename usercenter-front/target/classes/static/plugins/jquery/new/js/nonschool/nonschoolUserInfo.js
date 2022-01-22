function submitEditForm1(username){
    var url="../nonschool/saveUserBaseInfo?username="+username;
    var pwd = $("#pwd").val();
    var repwd = $("#repwd").val();
    var cname = $("#cname").val();
    var phone = $("#phone").val();
    var email = $("#email").val();
    var delegate=$("#delegate").val();
    var communicationaddress=$("#communicationaddress").val();
    var unitname=$("#unitname").val();
    var address=$("#address").val();
    var bankaddress=$("#bankaddress").val();
    var bankcard=$("#bankcard").val();
    var taxid=$("#taxid").val();

    if(pwd === null || pwd === "") {
        alert("请填写格式正确的密码！");
        return false;
    }else if(pwd!=repwd) {
        alert("两次密码不相同！");
        return false;
    }else if(phone === null || phone === "" || !(/^1[3|4|5|7|8|9][0-9]\d{4,8}$/.test(phone))) {
        alert("请填写格式正确的电话号码！");
        return false;
    }else if(email === null || email === "" || !(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(email))) {
        alert("请填写格式正确的邮箱地址！");
        return false;
    }else {
        var myData={
            'pwd' : $("#pwd").val(),
            'cname' : $("#cname").val(),
            'phone' : $("#phone").val(),
            'email' : $("#email").val(),
            'delegate':$("#delegate").val(),
            'communicationaddress':$("#communicationaddress").val(),
            'unitname':$("#unitname").val(),
            'address':$("#address").val(),
            'bankaddress':$("#bankaddress").val(),
            'bankcard':$("#bankcard").val(),
            'taxid':$("#taxid").val(),
        }
        $.ajax({
            url:url,
            type:'POST',
            asyn:false,
            data:myData,
            success:function(data){//AJAX查询成功
                if(data=="success"){
                    alert("保存成功！");
                }else{
                    alert("保存失败！");
                }
            }
        });
    }
}
function submitEditForm(uid){
    var url="../nonschool/saveInspectioniBaseInfo?id="+uid;
    var myData={
        'inspectionName':$("#inspectionName").val(),
        'address':$("#address").val(),
        'phone':$("#phone").val(),
        'bankName':$("#bankName").val(),
        'bankCard':$("#bankCard").val(),
        'taxId':$("#taxId").val(),
        'bankId':$("#bankId").val(),
        'telephone':$("#telephone").val(),
        'unitName':$("#unitName").val(),
    }
    $.ajax({
        url:url,
        type:'POST',
        asyn:false,
        data:myData,
        success:function(data){//AJAX查询成功
            if(data=="success"){
                alert("保存成功！");
            }else{
                alert("保存失败！");
            }
        }
    });
}

//新建承检员
function addInspectionAdmin(id){
    var cname=$('#cname').val();
    var telephone=$('#telephone').val();
    var myData={
        'cname':cname,
        'telephone':telephone,
    }
    $.ajax({
        url:"../nonschool/addInspectionAdmin?id="+id,
        type:'POST',
        async:false,
        data:myData,
        success:function(inspectionAdmin){//AJAX新增成功
            var a_tag = '<td><a class="fa fa-trash-o ml10" onclick="deleteInspectionAdmin(&quot;'+inspectionAdmin.id+'&quot;)"></a></td>';
            var td =
                "<td>"+ cname+ "</td>" +
                "<td>"+telephone + "</td>" ;
            var str = '<tr id="'+inspectionAdmin.id+'"></tr>';
            var $str = $(str);
            $str.append($(td));
            $str.append($(a_tag));
            $("#extends").append($str);
            $("#cname").val("");
            $("#telephone").val("");
        }
    });
}
//新建承检员
function tUserList(uid){
    //多窗口模式，层叠置顶
    var win = layer.open({
        type: 2 //此处以iframe举例
        ,title: '添加承检员'
        ,shade: 0
        ,maxmin: true
        ,offset: [ //为了演示，随机坐标
            0.4*($(window).height()-300)
            ,0.4*($(window).width()-390)
        ]
        ,content: '../nonschool/tUserList?currpage=1&uid='+uid
        ,success: function(layero){
            layer.setTop(layero); //重点2

        }
    });
    layer.full(win);
}
//新建承检员
function deleteInspectionAdmin(id){
    var myData={
        "id":id
    }
    $.ajax({
        url:"../nonschool/deleteInspectionAdmin?id="+id,
        type:'POST',
        async:false,
        data:myData,
        success:function(data){//AJAX成功
            $('#'+id).hide(1000);
            // window.location.reload();
        }
    });
}