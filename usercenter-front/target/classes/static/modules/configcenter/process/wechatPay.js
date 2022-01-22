var evaluationHost =apiGateWayHost+"/configcenter/";
layui.define(function (e) {
    layui.config({
        base:'../'
    }).extend({
        index:'lib/index'
    }).use(['index','table','form','layer'],function () {
        var $ = layui.$,
            layer = layui.layer,
            form = layui.form,
            table = layui.table;

        function random(min, max) {//生成随机数
            return Math.floor(Math.random() * (max - min)) + min;
        }
        var orderId;
        var wxTimer;
        var resultId = $.cookie('resultId');
        var payIndex = $.cookie('payIndex');
        console.log(resultId+'_'+payIndex)
        window.paytowin = function () {
            $.ajax({
                url: apiGateWayHost + '/usercenter/wechatCharge/createQRCodeUrl',
                // dataType: 'json',
                async: false,
                type: 'get',
                success: function (res) {
                    console.log(res);
                    var str = '<div class="row"><div class="card"><div class="card-header"><h4 id="title" style="text-align: center !important;">打开微信，扫码支付0.01元</h4></div><div id="qrcode"></div></div></div>';
                    // jQuery('#qrcode').qrcode({
                    //     render: "canvas", //也可以替换为table
                    //     width: 200,
                    //     height: 200,
                    //     text: "weixin://wxpay/bizpayurl?pr=Omw0Vd200"
                    // });
                    layer.open({
                        type: 1,
                        content: str, //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
                        title: '扫码支付',
                        closeBtn: 0,
                        area: ['500px','500px']
                    });
                    var qrcode = new QRCode(document.getElementById("qrcode")); // 获取将要呈现二维码的容器
                    qrcode.makeCode(res.codeUrl);
                    orderId = res.orderId;
                    // 查询接口
                    // checkOrderInfo();
                    wxTimer=setInterval(checkOrderInfo, 3000);
                }, error: function () {
                    layer.msg("获取code_url失败！");
                }
            })
        }
        //定义函数myClose关闭当前窗口
        function myClose(){
            //将id为time的元素的内容转为整数，保存在变量n中
            // var n=parseInt(time.innerHTML);
            var n=$('#time').text().replace(/[^0-9]/ig,"");
            n--;//将n-1
            //如果n==0,关闭页面
            //否则, 将n+秒钟后自动关闭，再保存回time的内容中
            if(n>-1){
                time.innerHTML="支付成功!"+n+"秒钟后自动关闭";
                timer=setTimeout(myClose,1000);
            }else{
                window.location.href="about:blank";
                window.close();
            }
        }
        var timer=null;
        window.checkOrderInfo = function () {
            // console.log('查询订单状态');

            $.ajax({
                url: apiGateWayHost + '/usercenter/wechatCharge/queryOrder?orderId='+orderId+'&username='+currentUsername, // 支付状态接口 ： 找后端要
                success: function (res) {
                    console.log(res);
                    // 这个请求只会在用户支付完成的时候返回一大串数据，如果用户没有支付，这个请求会一直等待服务器的响应，超时的话会，请求就会失败（还是没有返回数据）
                    if (res.tradeState == 'SUCCESS') {
                        if (wxTimer) { // 支付成功！钱收到了！就不用在监听了
                            clearInterval(wxTimer);
                            wxTimer = null;
                            var timetableResultDTO = new Object();
                            var d1 = new Object();
                            d1['evaluationScore'+payIndex] = 1;
                            d1['id'] = resultId;
                            timetableResultDTO['timetableResult'] = d1;
                            timetableResultDTO['isComplete'] = -1;
                            var data = JSON.stringify(timetableResultDTO);
                            $.ajax({
                                url:evaluationHost+'api/timetableResult/resultNew',
                                dataType: 'json',
                                data: data,
                                type: 'post',
                                async: false,
                                contentType:"application/json;charset=utf-8",
                                success:function (res) {
                                    // console.log(res);
                                    if(res.code == '200'){
                                        layer.msg('<span id="time">支付成功!5秒钟后自动关闭</span><br>',{
                                            time: false, //不自动关闭
                                        });
                                        timer=setTimeout(myClose,1000);
                                    }else{
                                        layer.msg('后台保存缴费状态报错');
                                        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                                    }
                                },
                                error: function () {
                                    alert("后台保存缴费状态报错");
                                    return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                                }
                            })

                        }
                    }
                }
            })
        }
    })
    e("phenomMenuList",{})
})