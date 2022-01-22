
function OpenGetShowColumnDlg() {
    $('#GetShowColumn').dialog('open').dialog('setTitle', '设置显示隐藏列');
}

//全选
function ChooseAllColumns() {
    $("#GetShowColumn input[type='checkbox']").prop('checked',true);
}
//取消全选
function ClearAllColumns() {
    $("#GetShowColumn input[type='checkbox']").removeAttr("checked", "checked");
}

function hideColumn(table) {
    var cbx = $("#GetShowColumn input[type='checkbox']"); //获取Form里面是checkbox的Object
    var checkedValue = "";
    var unCheckValue = "";
    for (var i = 0; i < cbx.length; i++) {
        if (cbx[i].checked) {//获取已经checked的Object
            if (checkedValue.length > 0) {
                checkedValue += "," + cbx[i].value; //获取已经checked的value
            }
            else {
                checkedValue = cbx[i].value;
            }
        }
        if (!cbx[i].checked) {//获取没有checked的Object
            if (unCheckValue.length > 0) {
                unCheckValue += "," + cbx[i].value; //获取没有checked的value
            }
            else {
                unCheckValue = cbx[i].value;
            }
        }
    }
    var checkeds = new Array();
    if (checkedValue != null && checkedValue != "") {
        checkeds = checkedValue.split(',');
        for (var i = 0; i < checkeds.length; i++) {
            $('#dg').datagrid('showColumn', checkeds[i]); //显示相应的列
        }
    }

    clearHideListCookie(table)

    var unChecks = new Array();
    if (unCheckValue != null && unCheckValue != "") {
        unChecks = unCheckValue.split(',');
        for (var i = 0; i < unChecks.length; i++) {
            addToHideList(table,unChecks[i]);
            $('#dg').datagrid('hideColumn', unChecks[i]); //隐藏相应的列
        }
    }
    $('#GetShowColumn').dialog('close');
}

function clearHideListCookie(table){
    document.cookie="hideList"+table+"="+'';
};

//把要隐藏字段存入cookie
function addToHideList(table,field){
    var hideList;
    var strCookie=document.cookie;
    var arrCookie=strCookie.split("; ");

    for(var i=0;i<arrCookie.length;i++){
        var arr=arrCookie[i].split("=");
        if("hideList"+table==arr[0]){
            hideList=arr[1];
            break;
        }
    }

    if(hideList==null){
        hideList="";
        document.cookie="hideList"+table+"="+hideList+","+field;
    }else{
        document.cookie="hideList"+table+"="+hideList+","+field;
    }

}

//得到cookie里面的隐藏列
function getHideListCookie(table){
    var values=new Array();
    var strCookie=document.cookie;
    if(strCookie==null||strCookie==''){
        return values;
    }
    var arrCookie=strCookie.split("; ");
    var hideList;
    //遍历cookie数组，处理每个cookie对
    for(var i=0;i<arrCookie.length;i++){
        var arr=arrCookie[i].split("=");
        if("hideList"+table==arr[0]){
            hideList=arr[1];
            break;
        }
    }

    if(hideList!=null){
        values=hideList.split(",");
    }
    return values;
}