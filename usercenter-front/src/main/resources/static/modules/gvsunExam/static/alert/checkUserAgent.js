/***
 * 获取当前浏览器类型
 */
myBrowser();
function myBrowser() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    console.log(userAgent)
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (!(userAgent.indexOf("Chrome") > -1) &&
        !(userAgent.indexOf("Firefox") > -1) &&
        !(userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera)
    ) {
        alert("请使用谷歌、火狐或edge浏览器");
    }
}