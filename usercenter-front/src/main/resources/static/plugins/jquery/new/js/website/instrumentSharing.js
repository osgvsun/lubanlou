function submitAcademy(id){
    setCookie("academyNumber",id);
    window.location.reload();
}
function submitLabCenter(labCenterId) {
    setCookie("labCenterId",labCenterId);
    window.location.reload();
}
function queryInstrument(){
    var keywords=document.getElementById("keywords").value;
    setCookie("keywords",keywords);
    window.location.reload();
}
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
    setCookie("academyNumber","");
    setCookie("labCenterId","");
    window.location.href='../website/instrumentShareing?currpage=1';
}
