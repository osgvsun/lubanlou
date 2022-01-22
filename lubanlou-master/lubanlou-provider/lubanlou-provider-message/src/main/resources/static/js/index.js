var contextPath=/*[[@{/}]]*/'';
var apiGateWayHost=$("#apiGateWayHost").val();
//var contextPath = $("meta[name='contextPath']").attr("content");
layui.use('table', function(){
    var table = layui.table;


    //第一个实例
    table.render({
        method:'post',
        elem: '#demo'
        ,url: apiGateWayHost+'/message/api/message/getMessageInfo' //数据接口
           , page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
                layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'], //自定义分页布局
                curr: 1, //设定初始在第 5 页
                groups: 1, //只显示 1 个连续页码
                first: false, //不显示首页
                last: false //不显示尾页
            },
            parseData: function(res){
                return {
                    "code": res.code, //解析接口状态
                    "msg": res.msg, //解析提示文本
                    "count": res.count, //解析数据长度
                    "data": res.data //解析数据列表
                };
            },
        cellMinWidth: 80//开启分页
        ,cols: [[ //表头
            {field: 'projectName', title: '来源项目'}
            ,{field: 'createCname', title: '发送人姓名'}
            ,{field: 'createUsername', title: '发送人用户名'}
            ,{field: 'messageTopic', title: '主题'}
            ,{field: 'messageContent', title: '消息内容'}
            ,{field: 'createdTime', title: '发送时间'}
            , {
                title: '接收人',
                templet: function (d) {
                    var string="";
                    if(d.messageReceivers!=''&&d.messageReceivers!=null) {
                        var s = d.messageReceivers.split(',');
                        for (var i = 0; i < s.length; i++) {
                            string += s[i] + " ";
                        }
                    }

                    return string;
                   // return renderTime(d.receiverUsername);
                }
            }
        ]],
        skin: 'line', //表格风格
        even: true,
        id: 'demo',
        page: true,

        limits: [5, 7, 10, 20],
        limit: 5 //每页默认显示的数量
    });

});
function renderTime(date) {
    var dateee = new Date(date).toJSON();
    return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}
function dateToStr(date) {
    var data = date.substr(0, 19);
    var newDate = new Date(new Date(data.replace(/T/g, ' ').replace(/-/g, '/')).getTime() + 8 * 60 * 60 * 1000);
  /*  date.toString()
    var time =new Date(date.time);
    var y = time.getFullYear();
    var M = time.getMonth() + 1;
    M = M < 10 ? ("0" + M) : M;
    var d = time.getDate();
    d = d < 10 ? ("0" + d) : d;
    var h = time.getHours();
    h = h < 10 ? ("0" + h) : h;
    var m = time.getMinutes();
    m = m < 10 ? ("0" + m) : m;
    var str = y + "-" + M + "-" + d + " " + h + ":" + m;
    return str;*/
}
