const rtc = {
    // 用来放置本地客户端。
    client: null,
    // 用来放置本地音视频频轨道对象。
    localTracks: {
        videoTrack: null,
        audioTrack: null
    }
};

const options = {
    // 替换成你自己项目的 App ID。
    appId: "506215541da2fb4447649b00e75c4d0a",
    // 传入目标频道名。
    channel:$("#channelInput").val(),
    // 如果你的项目开启了 App 证书进行 Token 鉴权，这里填写生成的 Token 值。
    token: null,
    uid: "user"+$("#username").val()
};

// 保存用户的对象
var remoteUsers = {};

async function startBasicCall() {
    /**
     * 接下来的代码写在这里。
     */
    // 创建本地客户端 直播用live 一对多用rtc
    rtc.client = ArRTC.createClient({mode: "rtc", codec: "h264"});
    //其他用户进入
    rtc.client.on("user-published", function(user, mediaType) {
        const id = user.uid;
        remoteUsers[id] = user;
        subscribe(user, mediaType);
    });
    //其他用户离开
    rtc.client.on("user-unpublished", handleUserUnpublished);
    rtc.client.on("user-left", handleUserUnpublished);
    //一个方法创建音频和视频
    [options.uid, [rtc.localTracks.audioTrack, rtc.localTracks.videoTrack]] = await Promise.all([
        // join the channel
        rtc.client.join(options.appId, options.channel, options.token || null, options.uid),
        // create local tracks, using microphone and camera
        ArRTC.createMicrophoneAndCameraTracks({}, {}),
        // 分享屏幕
        /*ArRTC.createMicrophoneAudioTrack(),
        ArRTC.createScreenVideoTrack()*/
    ]);
    addUserWindow(options.uid, "#body");
    // 视频播放
    rtc.localTracks.videoTrack.play(`player-${options.uid}`);
    // 将这些音视频轨道对象发布到频道中。
    await rtc.client.publish(Object.values(rtc.localTracks));

    setCurrentChannel(options.channel)
    console.log("publish success!");
}

// 执行
startBasicCall();
// 用户离开
function handleUserUnpublished(user) {
    const id = user.uid;
    delete remoteUsers[id];
    $(`#player-${id}`).parent().remove();
}

// 用户进入时订阅ta
async function subscribe(user, mediaType) {
    const uid = user.uid;
    // subscribe to a remote user
    await rtc.client.subscribe(user, mediaType);
    console.log("subscribe success");
    if (mediaType === 'video') {
        addUserWindow(uid, "#body");
        user.videoTrack.play(`player-${uid}`);
    }
    if (mediaType === 'audio') {
        user.audioTrack.play();
    }
}

function addUserWindow(uid, parentName) {
    const player = `<div><div id="player-${uid}"></div><span>${uid.replace("user","")}</span></div>`;
    $(parentName).append(player);
}
$("#leaveBtn").click(function () {
    leave()
})

$("#joinBtn").click(function () {
    leave()
    options.channel = $("#channelInput").val();
    if (!options.channel || options.channel == "") {
        options.channel = "test"
    }
    startBasicCall()
})

async function leave() {
    if (!$("#body div").length > 0) return;
    setCurrentChannel("-")
    setTimeout(function () {
        $("#body div").remove();
    }, 0)
    for (trackName in rtc.localTracks) {
        var track = rtc.localTracks[trackName];
        if (track) {
            track.stop();
            track.close();
            rtc.localTracks[trackName] = null;
        }
    }
    // remove remote users and player views
    remoteUsers = {};

    // leave the channel
    await rtc.client.leave();
    console.log("client leaves channel success");
}

function setCurrentChannel(value = "test") {
    $("#currentChannel").text(value);
}