function saveInstrumentManageUser(insUid,username){
    //将要所有要添加的数据传给后台处理
    $.ajax({
        url:"../config/saveInstrumentManager?instrumentUid="+insUid+"&username="+username+"&type=2",
        type:'POST',
        dataType:"json",
        success:function(data){//AJAX查询成功
            alert("成功收回权限！");
            window.location.reload(true);
        }
    });

}
function openDoor(){
        $.ajax({
            url:'../instrument/openDoor?roomId='+954,
            type:"POST",
            dataType:"json",
            success:function(data){
                console.log(data);
                if(data.result){
                    alert("刷新成功");
                }else{
                    alert("刷新失败");
                }
            },error:function (request){
                alert('请求错误!');
            }
        });

}
/*//查询
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
// 用户列表
	$('#dg').datagrid({ 
	url : "../instrument/instrumentManageListData",
	columns : [ [{
        field: '0', title: '<input id=\"instrument0\" type=\"checkbox\" > <label for=\"instrument0\"></label>', width: 30,
        formatter: function (colData,rowData) {
            return "<input type=\"checkbox\"  name=\"instrument\" value=\"" + rowData[0] + "\" id=\"instrument"+rowData[0]+"\">" +"<label for='instrument"+rowData[0]+"'></label>";
        }
    },
		{field : '1',title : '设备名称(设备编号)',	width:'9%',align:'left',formatter:function(colData,rowData){   //格式化函数添加一个操作列
			return rowData[1]+"("+rowData[0]+")";
        }
	  },{
			field : '4',
			title : '设备状态',
			width : '15%',
			align : 'left'
		},{
			field : '2',
			title : '实验室',
			width : '11%',
			align : 'left'
		},{
			field : '3',
			title : '设备管理员',
			width : '11%',
			align : 'left'
		},{field : '6',title : '预约类型',	width:'9%',align:'left',formatter:function(colData,rowData){   //格式化函数添加一个操作列
			if(rowData[6] != null && rowData[7] != null){
				return rowData[6]+"<br>"+rowData[7];
			}
			else{
				if(rowData[6] != null){
					return rowData[6];
				}
				else if(rowData[7] != null){
					return rowData[7];
				}
				else return "";
			}
        }
	  },{field : '8',title : '准入形式',	width:'9%',align:'left',formatter:function(colData,rowData){   //格式化函数添加一个操作列
			if(rowData[8] != null && rowData[9] != null){
				return rowData[8]+"<br>"+rowData[9];
			}
			else{
				if(rowData[8] != null){
					return rowData[8];
				}
				else if(rowData[9] != null){
					return rowData[9];
				}
				else return "";
			}
        }
	  },{field : '10',title : '开放对象',	width:'9%',align:'left',formatter:function(colData,rowData){   //格式化函数添加一个操作列
			if(rowData[10] != null && rowData[11] != null){
				return rowData[10]+"<br>"+rowData[11];
			}
			else{
				if(rowData[10] != null){
					return rowData[10];
				}
				else if(rowData[11] != null){
					return rowData[11];
				}
				else return "";
			}
        }
	  },{field : '_opt',title : '操作',	width:'20%',align:'left',formatter:function(colData,rowData){   //格式化函数添加一个操作列
        	var btn = '<a href="#" onclick="editTUser(\''+rowData[0]+'\')">仪器管理</a>&nbsp;'; 
        	btn += '<a href="#" onclick="deleteTUser(\''+rowData[0]+'\')">耗材管理</a>&nbsp;';
        	btn += '<a href="#" onclick="deleteTUser(\''+rowData[0]+'\')">仪器维修</a>&nbsp;';
        	btn += '<a href="#" onclick="deleteTUser(\''+rowData[0]+'\')">故障报告</a>&nbsp;';
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

function searchInCondition(type){
	var params=[];
    var dt=$('#searchform').serializeArray();
    $.each(dt,function(i,item){
       	params[item.name]=item.value;
    });
    params["type"] = type;
    $('#dg').datagrid({
    	queryParams: params
    });
}
		*/
//批量名单管理
function setCreditScore(){
    var array=new Array();
    var flag; //判断是否一个未选
    $("input[name='CK_name']:checkbox").each(function() { //遍历所有的name为CK_name的 checkbox
        if ($(this).attr("checked")) { //判断是否选中
            flag = true; //只要有一个被选择 设置为 true
        }
    })
    if (flag) {
        $("input[name='CK_name']:checkbox").each(function() { //遍历所有的name为selectFlag的 checkbox
            if ($(this).attr("checked")) { //判断是否选中
                array.push($(this).val()); //将选中的值 添加到 array中
            }
        })
        var arrayS = array.toString();
        layer.ready(function(){
            layer.open({
                type: 2,
                title: '批量设置信誉积分',
                fix: true,
                maxmin:true,
                shift:-1,
                closeBtn: 1,
                shadeClose: true,
                move:false,
                maxmin: false,
                area: ['1000px', '420px'],
                content: "../instrument/setCreditScore?arrayS="+arrayS,
                end: function(){
                }
            });
        });
    } else {
        alert("请至少选择一个设备");
    }
}

//批量名单管理
function blackManageList(remark,needAudit){
	if(remark==3){//准入等级或免审核名单
	}else{//黑名单或授权名单
		var needAudit = "";
	}
    var trainingUid = $("#trainingUid").val();
    var array=new Array();
    var flag; //判断是否一个未选
    $("input[name='CK_name']:checkbox").each(function() { //遍历所有的name为CK_name的 checkbox
        if ($(this).attr("checked")) { //判断是否选中
            flag = true; //只要有一个被选择 设置为 true
        }
    })

    if (flag) {
        $("input[name='CK_name']:checkbox").each(function() { //遍历所有的name为selectFlag的 checkbox
            if ($(this).attr("checked")) { //判断是否选中
                array.push($(this).val()); //将选中的值 添加到 array中
            }
        })
		var arrayS = array.toString();
       layer.ready(function(){
            layer.open({
                type: 2,
                title: '批量名单管理',
                fix: true,
                maxmin:true,
                shift:-1,
                closeBtn: 1,
                shadeClose: true,
                move:false,
                maxmin: false,
                area: ['1000px', '420px'],
                content: "../instrument/blackManageList?remark="+remark+"&needAudit="+needAudit+"&arrayS="+arrayS,
                end: function(){
                }
            });
        });
    } else {
        alert("请至少选择一个设备");
    }
}




function searchInCondition(type){
	$("#type").val(type);
	document.searchForm.submit();
}
//JS操作cookies方法!
//写cookies
function setCookie(name,value)
{
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

//读取cookies
function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function cancel(){
    $.cookie("Manage-"+"LabRoom","");
    $.cookie("Manage-"+"InstrumentName","");
	window.location.href='../instrument/instrumentManageList?currpage=1';
}

function listInnerSameDevice(deviceNumber){
	layer.ready(function(){ 
	    layer.open({
	        type: 2,
	        title: '添加关联设备',
	        fix: true,
	        maxmin:true,		        
	        shift:-1,
	        closeBtn: 1,
	        shadeClose: true,
	        move:false,
	        maxmin: false,
	        area: ['1000px', '420px'],
	        content: '../instrument/listInnerSameDevice?deviceNumber='+deviceNumber+'&currpage=1',
	        end: function(){
	        	//search()
	        }
	    });
	});
}
//点击查询时保存cookies
function setManageCookie() {
	var labroom=$("#labRoom").val();
    var instrumentName1=$("#instrumentName1").val();
    var center=$("#center").val();
    $.cookie("Manage-"+"Center",center);
    $.cookie("Manage-"+"LabRoom",labroom);
    $.cookie("Manage-"+"InstrumentName",instrumentName1);
}
 $("#center").on("change",function(){
    var myData = {
        "centerId":$(this).val()
    }
    $.ajax({
        url:"../instrument/findLabroomsByCenterId",
        type:"POST",
        dataType:"json",
        data:myData,
        success:function(data){//AJAX查询成功
           // alert(data.length);
           $("#labRoom").empty();//首先清空select现在有的内容
            $("#labRoom").append("<option selected='selected'  value=0>请选择</option>");
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                // var option = $("<option  value="+item.id+">"+item.name+"</option>");
                $("#labRoom").append("<option  value=" + item + ">" + item + "</option>");
            }
            $("#labRoom").trigger("liszt:updated");
        }
    })
     $.ajax({
         url:"../instrument/findInstrumentNumberAndNamesByCenterId",
         type:"POST",
         dataType:"json",
         data:myData,
         success:function(data){//AJAX查询成功
             // alert(data.length);
             $("#instrumentName1").empty();//首先清空select现在有的内容
             $("#instrumentName1").append("<option selected='selected'  value=0>请选择</option>");
             for (var i = 0; i < data.length; i++) {
                 var item = data[i];
                 // var option = $("<option  value="+item.id+">"+item.name+"</option>");
                 $("#instrumentName1").append("<option  value=" + item + ">" + item + "</option>");
             }
             $("#instrumentName1").trigger("liszt:updated");
         }
     })
 });
// 所属实验室与仪器名称/编号实现省市联动效果
// $("#labRoom").on("change",function(){
//     var myData = {
//         "labRoomName":$(this).val()
//     }
//     $.ajax({
//         url:"../instrument/findInstrumentNumberAndNamesByLabRoomName",
//         type:"POST",
//         dataType:"json",
//         data:myData,
//         success:function(data){//AJAX查询成功
//             // alert(data.length);
//             $("#instrumentName1").empty();//首先清空select现在有的内容
//             $("#instrumentName1").append("<option selected='selected'  value=0>请选择</option>");
//             for (var i = 0; i < data.length; i++) {
//                 var item = data[i];
//                 // var option = $("<option  value="+item.id+">"+item.name+"</option>");
//                 $("#instrumentName1").append("<option  value=" + item + ">" + item + "</option>");
//             }
//             $("#instrumentName1").trigger("liszt:updated");
//         }
//     })
// });


function transferUpload(){
    var myData={};
    $.ajax({
        url:"../file/transferUpload",
        type:"POST",
        dataType:"json",
        data:myData,
        success:function(data){//AJAX查询成功
            alert("转换成功！");
        }
    })
}
$(".snd_click").on("click",".can_chose",function () {
    $(this).removeClass("can_chose").addClass("already_chose");
    $(this).siblings().removeClass("can_chose").addClass("no_chose");
    var text = $(this).text();
    var $span = $("<span>"+text+"<i class='fa fa-close'></i></span>");
    $(this).parent().parent().siblings("a").find(".chose_option").append($span);
    var id = $(this).eq(0).attr('id');
    findCollect(id);
})
$(".osnd_click").on("click",".can_chose",function () {
    $(this).removeClass("can_chose").addClass("already_chose");
    $(this).siblings().removeClass("can_chose").addClass("no_chose");
    var text = $(this).text();
    var $span = $("<span>"+text+"<i class='fa fa-close'></i></span>");
    $(this).parent().parent().siblings("a").find(".chose_option").append($span);
    var id = $(this).eq(0).attr('id');
    findCollectForOpen(id);
})
$(".asnd_click").on("click",".can_chose",function () {
    $(this).removeClass("can_chose").addClass("already_chose");
    $(this).siblings().removeClass("can_chose").addClass("no_chose");
    var text = $(this).text();
    var $span = $("<span>"+text+"<i class='fa fa-close'></i></span>");
    $(this).parent().parent().siblings("a").find(".chose_option").append($span);
    var id = $(this).eq(0).attr('id');
    findCollectForAgent(id);
})
$(".psnd_click").on("click",function (){
    var low_price =lowPrice.value;
    var hight_price=hightPrice.value;
    findCollectForPrice(low_price,hight_price);
})
function findCollectForAgent(text){
    setCookie("AgentForManage",text);
    window.location.reload();
}
function findCollectForOpen(text){
    setCookie("OpenForManage",text);
    window.location.reload();
}
function findCollectForPrice(text1,text2){
    setCookie("lowForManage",text1);
    setCookie("hightForManage",text2);
    window.location.reload();
}
function findCollect(text){
    setCookie("collectForManage",text);
    window.location.reload();
}
function cancelCollect(){
    setCookie("collectForManage","");
    window.location.reload();
}
function cancelCollectForOpen(){
    setCookie("OpenForManage","");
    window.location.reload();
}
function cancelCollectForAgent(){
    setCookie("AgentForManage","");
    window.location.reload();
}
$(".chose_option").on("click",".fa-close",function () {
    //var text = $(this).parent().text();
    $(this).parents(".channel_nav_a").siblings("div").find(".already_chose").removeClass("already_chose").addClass("can_chose");
    $(this).parents(".channel_nav_a").siblings("div").find(".no_chose").removeClass("no_chose").addClass("can_chose");
    $(this).parent().remove();

})
function filtInstrument(){
    var curr=$("#currpage").val();
    var filt = "all";
    var radio = document.getElementsByName("filt");
    for (var j=0; j<radio.length; j++) {
        if (radio[j].checked) {
            filt=radio[j].value;
        }
    }
    window.location.href='../instrument/instrumentManageList?currpage='+curr+'&filt='+filt;
}
function reset1(){
    window.location.href="../instrument/instrumentManageList?currpage=1";
}