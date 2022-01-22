const rtc = {
    // 用来放置本地客户端。
    client: null,
    // 用来放置本地音视频频轨道对象。
    localAudioTrack: null,
    localVideoTrack: null,
    // 屏幕分享相关
    clientScreen: null,
    localScreenTrack: null,
};
var curruser = GetQueryString('username');
var videoChannel = GetQueryString('globalVariable');
const options = {
    // 替换成你自己项目的 App ID。
    appId: "506215541da2fb4447649b00e75c4d0a",
    // 传入目标频道名。
    channel: videoChannel? videoChannel : "test",
    uid: curruser,
    // 如果你的项目开启了 App 证书进行 Token 鉴权，这里填写生成的 Token 值。
    token: null,
    role: "audience", // host or audience
};

//图标
let microphoneIcon = ["fa-microphone", "fa-microphone-slash"];
let eyeIcon = ["fa-eye", "fa-eye-slash"];

//开始视频
async function startBasicCall(role = options.role) {
    options.role = role;
    console.log(`role:[${role}]`);
    //本地流存在就不执行加入
    if (rtc.localAudioTrack && rtc.localVideoTrack) {
        layer.alert("请勿重复加入");
        return;
    }
    if (!Cookies.get('videoChanneled') && role !== "audience") {
        if (!confirm("加入频道并打开摄像头麦克风")) {
            return;
        }else{
            Cookies.set('videoChanneled', videoChannel);
        }
    }
    /**
     * 接下来的代码写在这里。
     */
    rtc.client = ArRTC.createClient({ mode: "rtc", codec: "h264" });
    // rtc.client = ArRTC.createClient({ mode: "live", codec: "h264", role });
    //--------------------------------------------订阅事件开始
    // if (role === "audience") {
    //当远端用户发布音视频轨道时
    rtc.client.on("user-published", handleUserPublished);
    //当远端用户取消发布/远端用户离开了频道时
    rtc.client.on("user-unpublished", handleUserUnpublished);
    // }

    //host or audience 都需加入
    const uid = await rtc.client.join(
        options.appId,
        options.channel,
        options.token,
        options.uid //username
    );
    $("#currentChannel").text(rtc.client.channelName);

    //--------------------------------------------订阅事件结束
    if (role === "host") {
        //一起加载就不会触发joined方法？要延迟
        setTimeout(async function () {
            // 通过麦克风采集的音频创建本地音频轨道对象。
            rtc.localAudioTrack = await ArRTC.createMicrophoneAudioTrack();
            // 通过摄像头采集的视频创建本地视频轨道对象。
            rtc.localVideoTrack = await ArRTC.createCameraVideoTrack({
                // encoderConfig: "480p_2",
                encoderConfig: "120p",
            });
            //显示当前频道
            //本地添加
            domInit(rtc.localVideoTrack, uid, 1);
            // rtc.localAudioTrack.play();
            // 将这些音视频轨道对象发布到频道中。
            await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
            console.log("publish success!");
            //页面click下才能播放音频？
            document.body.click();
            $("#screenEditBox").show();
            $("#hostMenu").show();
            //自己为主持人
            channelInfo.add(uid + "【我】");
            channelInfo.addTagHost(uid + "【我】");
        }, 0);
    } else {
        channelInfo.add(uid + "【我】");
        channelInfo.addTagAudience(uid + "【我】");
    }
    //当用户加入
    rtc.client.on("user-joined", handleUserJoined);
    //当用户离开
    rtc.client.on("user-left", handleUserLeft);
    $("#hostBtn").attr("disabled", "disabled");
    $("#audienceBtn").attr("disabled", "disabled");
    $("#leaveChannel").removeAttr("disabled");
    layer.msg("加入成功");
    //个人信息接入
}

// 开始订阅远端用户
async function handleUserPublished(user, mediaType) {
    console.log(111, `uid:[${user.uid}]`);
    // 若是是本地分享屏幕的流，则不订阅
    if (user.uid.includes("screen")) {
        let replaceUid = user.uid.toString().replace("screen", "");
        $("#currentShareUser").text(replaceUid);
        if (replaceUid === rtc.client.uid) {
            //不订阅
            return;
        } else {
            $("input[value=分享屏幕]").attr("disabled", "disabled");
        }
        console.log(user);
    } else {
        //屏幕不算
        channelInfo.add(user.uid);
    }
    await rtc.client.subscribe(user, mediaType);
    // rtc.client.subscribe(user, mediaType);
    console.log(
        "subscribe success",
        `[uid:${user.uid}] [mediaType:${mediaType}]`
    );

    if (mediaType === "video") {
        // 当订阅完成后，就可以从 `user` 中获取远端视频轨道对象了
        domInit(user.videoTrack, user.uid, 2, !user.uid.includes("screen"));
        // 在info中加上主持人的tag
        channelInfo.addTagHost(user.uid);
    }

    if (mediaType === "audio") {
        // 当订阅完成后，就可以从 `user` 中获取远端音视频轨道对象了
        const remoteAudioTrack = user.audioTrack;
        // 播放音频因为不会有画面，不需要提供 DOM 元素的信息
        remoteAudioTrack.play();
        // 远端用户禁音
        // remoteAudioTrack.setVolume(0);
    }
}

//远端用户离开
function handleUserUnpublished(user) {
    // 获取刚刚动态创建的 DIV 节点
    console.log(`leave uid:[${user.uid}]`);
    domRemove(user.uid, true);
    // 如果是屏幕分享的流
    if (user.uid.toString().includes("screen")) {
        $("#currentShareUser").text("");
        $("input[value=分享屏幕]").removeAttr("disabled");
    }
}

//用户加入 host or audience
function handleUserJoined(user) {
    //屏幕分享也触发joined，不显示在info列表
    if (user.uid.includes("screen")) {
        //在info后面加上正在分享的tag？
    } else {
        channelInfo.add(user.uid);
        channelInfo.addTagAudience(user.uid)
    }
    console.log(`${isHostOrAudience(user)} ${user.uid} joined`);
}

//用户离开 host or audience
function handleUserLeft(user, reason) {
    channelInfo.remove(user.uid);
    console.log(`${isHostOrAudience(user)} ${user.uid} left reason:[${reason}]`);
}

//检测是主持人还是观众
function isHostOrAudience(user) {
    console.log(user.hasAudio, user.hasVideo);
    //有音频或视频就是host
    if (user.hasAudio || user.hasVideo) {
        return "host";
    }
    return "audience";
}

//离开
async function leaveCall() {
    Cookies.remove('videoChanneled');
    // 销毁本地音视频轨道
    if (options.role === "host") {
        rtc.localAudioTrack.close();
        rtc.localVideoTrack.close();
        rtc.localAudioTrack = null;
        rtc.localVideoTrack = null;
        $("#screenEditBox").hide();
        $("#hostMenu").hide();
        //如果分享了屏幕也leave
        if (rtc.clientScreen) {
            shareScreenStop();
        }
    }

    // 遍历远端用户
    rtc.client.remoteUsers.forEach((user) => {
        // 销毁动态创建的 DIV 节点
        domRemove(user.uid);
    });
    // 个性化操作 删除本地窗口
    domRemove(rtc.client.uid, true);
    // 离开频道
    await rtc.client.leave();

    $("#hostBtn").removeAttr("disabled");
    $("#audienceBtn").removeAttr("disabled");
    $("#leaveChannel").attr("disabled", "disabled");
    $("#currentChannel").text("");
    //人数清空
    channelInfo.empty();
}

//视频节点控制
function domRemove(uid, needMsg = false) {
    $(`#${uid}`).parent().remove();
    if (needMsg) {
        layer.msg(`${uid}退出了群聊`, { offset: "b" });
    }
}

//视频节点生成 type 1本地 2远程
function domInit(videoTrack, uid, type, editMenu = true, customStyle = "") {
    let videoClass;
    let editDisplay;
    let suser;
    if (type === 1) {
        videoClass = "localVideo userVideo";
    } else {
        videoClass = "userVideo";
    }

    if (!editMenu) {
        editDisplay = "visibility:hidden;";
        //获取视频长宽
        console.log(videoTrack);
        console.log(videoTrack.getStats());
        customStyle = "width:1280px;height:720px;";
    }
    $.ajaxSettings.async = false;
    $.get(apiGateWayHost+'/usercenter/getUserInfo?username='+uid, function (res) {
        suser = res;
    })
    $.ajaxSettings.async = true;
    let playerContainer;
    if(suser !=undefined ){
        playerContainer =`<div class="userBox"> 
    <div class="userData">
     ${uid}-${suser.cname}
    </div> 
    <div class="${videoClass}" id="${uid}" style="${customStyle}"></div> 
    <div class="editMenu" style="${editDisplay}"> 
     <a href="javascript:void(0)" class="audio" onclick="toggleMicrophone('${uid}')"><i class="fa fa-microphone" aria-hidden="true"></i></a> 
     <a href="javascript:void(0)" class="video" onclick="toggleEye('${uid}')"><i class="fa fa-eye" aria-hidden="true"></i></a> 
    </div> 
   </div>`;
    }else{
        playerContainer = `<div class="userBox"> 
    <div class="userData">
     ${uid}
    </div> 
    <div class="${videoClass}" id="${uid}" style="${customStyle}"></div> 
    <div class="editMenu" style="${editDisplay}"> 
     <a href="javascript:void(0)" class="audio" onclick="toggleMicrophone('${uid}')"><i class="fa fa-microphone" aria-hidden="true"></i></a> 
     <a href="javascript:void(0)" class="video" onclick="toggleEye('${uid}')"><i class="fa fa-eye" aria-hidden="true"></i></a> 
    </div> 
   </div>`;
    }
    //  const playerContainer = `<div class="userBox">
    //  <div class="userData">
    //   ${uid}
    //  </div>
    //  <div class="${videoClass}" id="${uid}" style="${customStyle}"></div>
    //  <div class="editMenu" style="${editDisplay}">
    //   <a href="javascript:void(0)" class="audio" onclick="toggleMicrophone('${uid}')"><i class="fa fa-microphone" aria-hidden="true"></i></a>
    //   <a href="javascript:void(0)" class="video" onclick="toggleEye('${uid}')"><i class="fa fa-eye" aria-hidden="true"></i></a>
    //  </div>
    // </div>`;
    if (!editMenu) {
        $("#screenPlace").append(playerContainer);
    } else {
        $("body").append(playerContainer);
    }
    //个人禁音
    // this.mutedSign("off");

    // 订阅完成，播放远端音视频
    // 传入我们刚刚给 DIV 节点指定的 ID，让 SDK 在这个节点下创建相应的播放器播放远端视频
    videoTrack.play(uid);
}

//本地音量调节
function localAudioTrackSet(volume) {
    rtc.localAudioTrack.setVolume(volume);
}

//个人禁音
function mutedSign(state) {
    let uid = rtc.client.uid;
    const micObj = $(`#${uid}`).next().find(".audio").children();
    switch (state) {
        case "on":
            layer.msg("声音已开启");
            // rtc.localAudioTrack.play();
            rtc.localAudioTrack.setVolume(100);
            micObj.addClass("fa-microphone");
            micObj.removeClass("fa-microphone-slash");
            break;
        case "off":
            layer.msg("您当前已禁音，可按上面按钮打开麦克风");
            // rtc.localAudioTrack.stop();
            rtc.localAudioTrack.setVolume(0);
            micObj.removeClass("fa-microphone");
            micObj.addClass("fa-microphone-slash");
            break;
    }
}

//全部禁音
function mutedAll(state) {
    switch (state) {
        case "on":
            // rtc.localAudioTrack.play();
            rtc.localAudioTrack.setVolume(100);
            rtc.client.remoteUsers.forEach((user) => {
                // user.audioTrack.play();
                user.audioTrack.setVolume(100);
            });
            layer.msg("声音已放开");
            $(".audio").children().addClass("fa-microphone");
            $(".audio").children().removeClass("fa-microphone-slash");
            break;

        case "off":
            // rtc.localAudioTrack.stop();
            rtc.localAudioTrack.setVolume(0);
            rtc.client.remoteUsers.forEach((user) => {
                // user.audioTrack.stop();
                user.audioTrack.setVolume(0);
            });
            layer.msg("已全禁音（包括自己");
            $(".audio").children().removeClass("fa-microphone");
            $(".audio").children().addClass("fa-microphone-slash");
            break;
    }
}

function listenYourselfAudio() {
    if (!rtc.localAudioTrack.isPlaying) {
        layer.msg("开启");
        rtc.localAudioTrack.play();
    } else {
        layer.msg("关闭");
        rtc.localAudioTrack.stop();
    }
}

//关闭自己的视频轨道
function iDontWantYouSeeMyFace() {
    rtc.localVideoTrack.setEnabled(!rtc.localVideoTrack._enabled);
}

//判断uid是否是本地的uid
function checkUid(uid) {
    if (rtc.client.uid == uid) {
        return true;
    }
    return false;
}

//图标眼睛开关
function toggleEye(uid = rtc.client.uid) {
    //判断是否是自己的
    if (checkUid(uid)) {
        iDontWantYouSeeMyFace();
    } else {
        // 遍历远端用户
        rtc.client.remoteUsers.forEach((user) => {
            if (uid === user.uid) {
                //是那个用户
                if (user.videoTrack.isPlaying) {
                    user.videoTrack.stop();
                } else {
                    user.videoTrack.play(uid);
                }
            }
        });
    }
    let eyeObj = $(`#${uid}`).next().find(".video").children();
    eyeObj.toggleClass("fa-eye");
    eyeObj.toggleClass("fa-eye-slash");
}

//图标麦克风
function toggleMicrophone(uid = rtc.client.uid) {
    //判断是否是自己的
    if (checkUid(uid)) {
        mutedSign(
            $(`#${uid}`).next().find(".audio").children().hasClass("fa-microphone")
                ? "off"
                : "on"
        );
    } else {
        // 遍历远端用户
        rtc.client.remoteUsers.forEach((user) => {
            if (uid === user.uid) {
                //是那个用户
                if (user.audioTrack.isPlaying) {
                    user.audioTrack.stop();
                    let micObj = $(`#${uid}`).next().find(".audio").children();
                    micObj.removeClass("fa-microphone");
                    micObj.addClass("fa-microphone-slash");
                } else {
                    user.audioTrack.play();
                    let micObj = $(`#${uid}`).next().find(".audio").children();
                    micObj.addClass("fa-microphone");
                    micObj.removeClass("fa-microphone-slash");
                }
            }
        });
    }
}

//分享屏幕
async function shareScreen() {
    if (!rtc.client) {
        layer.alert("请加入频道");
        return;
    }
    // rtc.clientScreen = ArRTC.createClient({ mode: "rtc", codec: "h264" });
    rtc.clientScreen = ArRTC.createClient({
        mode: "live",
        codec: "h264",
        role: "host",
    });
    ArRTC.getDevices()
        .then((devices) => {
            console.log("first device id", devices[0].deviceId);
        })
        .catch((e) => {
            console.log("get devices error!", e);
        });
    rtc.localScreenTrack = await ArRTC.createScreenVideoTrack(
        {
            // 可以在这里配置编码参数，详细参考 API 文档
            // encoderConfig: "4K_3",
            // encoderConfig: "1440p_2",
            // encoderConfig: "720p_3",
            // encoderConfig: "1080p",
            encoderConfig: {
                frameRate: { max: 144 },
                // width: { max: 1280, min: 720 },
                // height: { max: 1280, min: 720 },
                // bitrateMin: 4780,
                bitrateMin: 7350,
            },
        },
        "false"
    );
    const uid = await rtc.clientScreen.join(
        options.appId,
        options.channel,
        options.token,
        //用户名加上screen
        rtc.client.uid + "screen"
    );
    await rtc.clientScreen.publish([rtc.localScreenTrack]);
    $("#displayScreen").show();
    $("input[value=分享屏幕]").attr("disabled", "disabled");
    $("input[value=停止分享]").removeAttr("disabled");
    layer.msg("屏幕已分享");
}

function displayLocalScreen() {
    if ($(`#${rtc.clientScreen.uid}`).length === 0) {
        domInit(rtc.localScreenTrack, rtc.clientScreen.uid, 2, false);
    } else {
        $(`#${rtc.clientScreen.uid}`).parent().remove();
    }
}

//取消分享
async function shareScreenStop() {
    $("#currentShareUser").text("");
    $("#displayScreen").hide();
    $(`#${rtc.client.uid}screen`).parent().remove();
    $("input[value=分享屏幕]").removeAttr("disabled");
    $("input[value=停止分享]").attr("disabled", "disabled");
    await rtc.clientScreen.leave();
    layer.msg("屏幕分享已关闭");
}

// 观众进入
// $("#audienceBtn").click();
// 主持人进入
// $("#hostBtn").click();
function hiddenChannelInfo() {
    $("#channelInfo").fadeOut();
    $("#channelInfoMini").fadeIn();
}
function showChannelInfo() {
    $("#channelInfo").fadeIn();
    $("#channelInfoMini").fadeOut();
}

const channelInfo = (function () {
    function getCount() {
        return +$(".userNumber:eq(0)").text();
    }
    function updateCount() {
        //以li数量为准
        $(".userNumber").text($("#channelInfo li").length);
    }
    function add(uid) {
        //如果uid存在就不加了
        if ($(`.${uid}`).length !== 0) {
            return;
        }
        let li = document.createElement("li");
        li.classList = uid;
        li.innerText = uid;
        $("#channelInfo ul").append(li);
        updateCount();
    }
    function remove(uid) {
        $(`.${uid}`).remove();
        updateCount();
    }
    function empty() {
        $(".userNumber").text(0);
        $("#channelInfo ul").html("");
    }
    function addTagHost(uid) {
        let suser;
        $.ajaxSettings.async = false;
        $.get(apiGateWayHost+'/usercenter/getUserInfo?username='+uid, function (res) {
            suser = res;
        })
        $.ajaxSettings.async = true;
        if(suser !=undefined ){
            var userinfo = uid +'-'+suser.cname
        }else{
            var userinfo = uid
        }
        let hostStr = ` <li class="${uid}" style="
   "><span class="layui-badge layui-bg-orange" style="margin-right: 5px;">主持人</span><span style="
       vertical-align: middle;
       font-size: 14px;
   ">${userinfo}</span></li>`;
        console.log($(`.${uid}`));
        $(`.${uid}`)[0].outerHTML = hostStr;
    }
    function addTagAudience(uid) {
        let suser;
        $.ajaxSettings.async = false;
        $.get(apiGateWayHost+'/usercenter/getUserInfo?username='+uid, function (res) {
            suser = res;
        })
        $.ajaxSettings.async = true;
        if(suser !=undefined ){
            var userinfo = uid +'-'+suser.cname
        }else{
            var userinfo = uid
        }
        let hostStr = ` <li class="${uid}" style="
   "><span class="layui-badge layui-bg-gray" style="margin-right: 5px;">观众</span><span style="
       vertical-align: middle;
       font-size: 14px;
   ">${userinfo}</span></li>`;
        console.log($(`.${uid}`));
        $(`.${uid}`)[0].outerHTML = hostStr;
    }
    return {
        add,
        remove,
        empty,
        addTagHost,
        addTagAudience
    };
})();
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
    var context = "";
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}
layui.use(["layer"], function () {
    layer = layui.layer;
    //询问框
    if(videoChannel!=undefined&&videoChannel!=''){
        layer.confirm('主持人(需获取视频/麦克风权限)/观众？', {
            btn: ['主持人','观众'] //按钮
        }, function(index){
            $("#hostBtn").click();
            layer.close(index);
        }, function(index){
            $("#audienceBtn").click();
            layer.close(index);
        });
    }
});