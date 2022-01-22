Cookies.set("channel", "test2")
const rtc = {
    // 用来放置本地客户端。
    client: null,
    // 用来放置本地音视频频轨道对象。
    localAudioTrack: null,
    localVideoTrack: null,
};

const options = {
    // 替换成你自己项目的 App ID。
    appId: "506215541da2fb4447649b00e75c4d0a",
    // 传入目标频道名。
    channel: Cookies.get("channel") ? Cookies.get("channel") : "test",
    // 如果你的项目开启了 App 证书进行 Token 鉴权，这里填写生成的 Token 值。
    token: null,
};

//图标
let microphoneIcon = ["fa-microphone", "fa-microphone-slash"];
let eyeIcon = ["fa-eye", "fa-eye-slash"];

//开始视频
async function startBasicCall() {
    if (!Cookies.get("channel")) {
        if (!confirm("是否加入频道并打开摄像头麦克风")) {
            return;
        }
    }
    //本地流存在就不执行加入
    if (rtc.localAudioTrack && rtc.localVideoTrack) {
        layer.alert("请勿重复加入");
        return;
    }
    /**
     * 接下来的代码写在这里。
     */
    rtc.client = ArRTC.createClient({mode: "rtc", codec: "h264"});
    //--------------------------------------------订阅事件开始
    //当远端用户发布音视频轨道时
    rtc.client.on("user-published", async (user, mediaType) => {
        // 开始订阅远端用户
        await rtc.client.subscribe(user, mediaType);
        console.log("subscribe success", `[uid:${user.uid}]`);

        if (mediaType === "video") {
            // 当订阅完成后，就可以从 `user` 中获取远端视频轨道对象了
            domInit(user.videoTrack, user.uid, 2);
            // 要获取后面进来的，而不是之前就有的，怎么知道哪些人在里面了
            // layer.msg(`${user.uid}}加入了群聊`, { offset: "t" });
        }

        if (mediaType === "audio") {
            // 当订阅完成后，就可以从 `user` 中获取远端音视频轨道对象了
            const remoteAudioTrack = user.audioTrack;
            // 播放音频因为不会有画面，不需要提供 DOM 元素的信息
            remoteAudioTrack.play();
            // 远端用户禁音
            // remoteAudioTrack.setVolume(0);
        }
    });
    //当远端用户取消发布/远端用户离开了频道时
    rtc.client.on("user-unpublished", (user) => {
        // 获取刚刚动态创建的 DIV 节点
        domRemove(user.uid, true);
    });
    //报告本地用户当前的上行和下行网络质量。
    rtc.client.on("network-quality", (uid, stats) => {
        // console.log("downlinkNetworkQuality", stats.downlinkNetworkQuality);
        // console.log("uplinkNetworkQuality", stats.uplinkNetworkQuality);
    });
    //关注频道内的异常事件
    rtc.client.on("exception", function (evt) {
        console.log(evt.code, evt.msg, evt.uid);
    });
    //--------------------------------------------订阅事件结束
    // 通过麦克风采集的音频创建本地音频轨道对象。
    rtc.localAudioTrack = await ArRTC.createMicrophoneAudioTrack();
    // 通过摄像头采集的视频创建本地视频轨道对象。
    rtc.localVideoTrack = await ArRTC.createCameraVideoTrack({
        // encoderConfig: "480p_2",
        encoderConfig: "120p",
    });
    const uid = await rtc.client.join(
        options.appId,
        options.channel,
        options.token,
        null //username
    );
    //显示当前频道
    $("#currentChannel").text(rtc.client.channelName);
    //本地添加
    domInit(rtc.localVideoTrack, uid, 1);
    // rtc.localAudioTrack.play();
    // 将这些音视频轨道对象发布到频道中。
    await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
    console.log("publish success!");
    //页面click下才能播放音频？
    document.body.click();
    //定时器，测试
    setTimeout(function () {
        getRoles();
    }, 5000)
}

function convertRes(data, type) {
    switch (type) {
        case 1:
            return btoa(JSON.stringify(data))
            break;
        default:
            return JSON.parse(atob(data))
            break;
    }
}

function getRoles() {
    // let testTime = 0;
    let okRes;
    $.ajax({
        url: "./getRoles",
        dataType: "text",
        success: function (res) {
            console.log(`roles:[${res}]`)
            if (res) {
                //存在
                let roles = convertRes(res)
                okRes = roles;
                console.log(okRes)
                let aa = okRes['audiences'];
                if (aa.length > 0) {
                    //测试的username
                    if (aa.includes("20170201")) {
                        //我的权限修改为游客，频道当前是否推送，有推送就关闭推送leave，然后订阅当前频道；
                        // 离开频道
                        leaveCall()
                        //然后以游客的方式再订阅频道
                        //若是已经是游客身份和订阅就不再退出
                    }
                }
            }
        }, complete: function () {
            /*if (okRes) {

            }*/
            //延迟回调
            setTimeout(function () {
                getRoles()
            }, 5000)
        }
    })
}

//离开
async function leaveCall() {
    // 销毁本地音视频轨道
    rtc.localAudioTrack.close();
    rtc.localVideoTrack.close();
    rtc.localAudioTrack = null;
    rtc.localVideoTrack = null;

    // 遍历远端用户
    rtc.client.remoteUsers.forEach((user) => {
        // 销毁动态创建的 DIV 节点
        domRemove(user.uid);
    });
    // 个性化操作 删除本地窗口
    domRemove(rtc.client.uid, true);
    // 离开频道
    await rtc.client.leave();
}

//视频节点控制
function domRemove(uid, needMsg = false) {
    $(`#${uid}`).parent().remove();
    if (needMsg) {
        layer.msg(`${uid}退出了群聊`, {offset: "b"});
    }
}

//视频节点生成 type 1本地 2远程
function domInit(videoTrack, uid, type) {
    let videoClass;
    if (type === 1) {
        videoClass = "localVideo userVideo";
    } else {
        videoClass = "userVideo";
    }
    const playerContainer = `<div class="userBox"> 
    <div class="userData">
     ${uid}
    </div> 
    <div class="${videoClass}" id="${uid}"></div> 
    <div class="editMenu"> 
     <a href="javascript:void(0)" class="audio" onclick="toggleMicrophone('${uid}')"><i class="fa fa-microphone" aria-hidden="true"></i></a> 
     <a href="javascript:void(0)" class="video" onclick="toggleEye('${uid}')"><i class="fa fa-eye" aria-hidden="true"></i></a> 
    </div> 
   </div>`;
    $("body").append(playerContainer);
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

//uid来禁音

//获取视频帧
function getVideoLastImage(videoTrack) {
    const frameData = videoTrack.getCurrentFrameData();
    // 创建canvas
    const canvas = document.createElement("canvas");
    canvas.width = frameData.width;
    canvas.height = frameData.height;
    const ctx = canvas.getContext("2d");
    // 将截图显示在canvas上面
    ctx.putImageData(frameData, 0, 0);
    // 获取 dataUrl 作为图片的 src 属性
    const dataUrl = canvas.toDataURL();
    // 自动保存图片
    const a = document.createElement("a"); // 生成一个a元素
    const event = new MouseEvent("click"); // 创建一个单击事件
    a.download = "photo"; // 设置图片名称
    a.href = dataUrl; // 将生成的URL设置为a.href属性
    a.dispatchEvent(event); // 触发a的单击事件
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

startBasicCall();
