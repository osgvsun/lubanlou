var client; // RTC client
var localTracks = {
    videoTrack: null,
    audioTrack: null
};
// var curruser = localStorage.getItem("role");
// curruser = JSON.parse(curruser);
var curruser = GetQueryString('username');
var videoChannel = GetQueryString('globalVariable');
var remoteUsers = {};
// RTC client options
var options = {
    appid: "506215541da2fb4447649b00e75c4d0a",
    channel: "test",
    uid: curruser,
    token: null
};

var mics = []; // all microphones devices you can use
var cams = []; // all cameras devices you can use
var currentMic; // the microphone you are using
var currentCam; // the camera you are using


let volumeAnimation;

// the demo can auto join channel with params in url
$(async () => {
    var urlParams = new URL(location.href).searchParams;
    options.appid = urlParams.get("appid");
    options.channel = urlParams.get("channel");
    options.token = urlParams.get("token");
    await mediaDeviceTest();
})
$("#join-form").submit(async function (e) {
    e.preventDefault();
    $("#join").attr("disabled", true);
    $("#device-wrapper").css("display", "flex");
    try {
        options.appid = $("#appid").val();
        options.token = $("#token").val();
        options.channel = $("#channel").val();
        await join();
        if(options.token) {
            $("#success-alert-with-token").css("display", "block");
        } else {
            $("#success-alert a").attr("href", `index.html?appid=${options.appid}&channel=${options.channel}&token=${options.token}`);
            $("#success-alert").css("display", "block");
        }
    } catch (error) {
        console.error(error);
    } finally {
        $("#leave").attr("disabled", false);
    }
})
// var videoChannel = $.cookie('urlConfig');
if(videoChannel!=undefined&&videoChannel!=''){
    $('#channel').val(videoChannel);
    $('#join')[0].click();
}
// $('#join')[0].click();
$("#leave").click(function (e) {
    leave();
})

async function join() {
    // create RTC client
    client = ArRTC.createClient({ mode: "rtc", codec: "h264" });

    // add event listener to play remote tracks when remote user publishs.
    client.on("user-published", handleUserPublished);
    client.on("user-unpublished", handleUserUnpublished);

    // join a channel.
    // options.uid = await client.join(options.appid, options.channel, options.token || null);
    if (!localTracks.audioTrack || !localTracks.videoTrack) {
        [options.uid, [localTracks.audioTrack, localTracks.videoTrack]] = await Promise.all([
            // join the channel
            client.join(options.appid, options.channel, options.token || null, options.uid),
            // create local tracks, using microphone and camera
            ArRTC.createMicrophoneAndCameraTracks({}, {}),
            // ArRTC.createMicrophoneAudioTrack(),
            // ArRTC.createCameraVideoTrack()
        ]);
        // [ localTracks.audioTrack, localTracks.videoTrack ] = await Promise.all([
        //     // create local tracks, using microphone and camera
        //     ArRTC.createMicrophoneAudioTrack(),
        //     ArRTC.createCameraVideoTrack()
        // ]);
    }
    // play local video track
    localTracks.videoTrack.play("local-player");
    // $("#local-player-name").text(`localVideo(${options.uid})`);
    $("#local-player-name").text('localVideo('+ curruser +')');

    // publish local tracks to channel
    await client.publish(Object.values(localTracks));
    console.log("publish success");
}
async function mediaDeviceTest() {
    // create local tracks
    [ localTracks.audioTrack, localTracks.videoTrack ] = await Promise.all([
        // create local tracks, using microphone and camera
        ArRTC.createMicrophoneAudioTrack(),
        ArRTC.createCameraVideoTrack()
    ]);

    // play local track on device detect dialog
    localTracks.videoTrack.play("pre-local-player");
    // localTracks.audioTrack.play();
}


async function leave() {
    for (trackName in localTracks) {
        var track = localTracks[trackName];
        if(track) {
            track.stop();
            track.close();
            localTracks[trackName] = undefined;
        }
    }

    localTracks = {};

    // remove remote users and player views
    remoteUsers = {};
    $("#remote-playerlist").html("");

    // leave the channel
    await client.leave();

    $("#local-player-name").text("");
    $("#join").attr("disabled", false);
    $("#leave").attr("disabled", true);
    $("#device-wrapper").css("display", "none");
    console.log("client leaves channel success");
}

async function subscribe(user, mediaType) {
    const uid = user.uid;
    let suser;
    $.ajaxSettings.async = false;
    $.get(apiGateWayHost+'/usercenter/getUserInfo?username='+uid, function (res) {
            suser = res;
    })
    $.ajaxSettings.async = true;
    // subscribe to a remote user
    await client.subscribe(user, mediaType);
    console.log("subscribe success");
    if (mediaType === 'video') {
        let player;
        if(suser!=undefined){
            player = $(`
      <div id="player-wrapper-${uid}">
        <p class="player-name">remoteUser(${suser.cname}-${suser.username})</p>
        <div id="player-${uid}" class="player"></div>
      </div>
    `);
        }else{
            player = $(`
      <div id="player-wrapper-${uid}">
        <p class="player-name">remoteUser(${uid})</p>
        <div id="player-${uid}" class="player"></div>
      </div>
    `);
        }

        $("#remote-playerlist").append(player);
        user.videoTrack.play(`player-${uid}`);
    }
    if (mediaType === 'audio') {
        user.audioTrack.play();
    }
}

function handleUserPublished(user, mediaType) {
    const id = user.uid;
    remoteUsers[id] = user;
    subscribe(user, mediaType);
}

function handleUserUnpublished(user) {
    const id = user.uid;
    delete remoteUsers[id];
    $(`#player-wrapper-${id}`).remove();
}
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
async function switchCamera(label) {
    currentCam = cams.find(cam => cam.label === label);
    $(".cam-input").val(currentCam.label);
    // switch device of local video track.
    await localTracks.videoTrack.setDevice(currentCam.deviceId);
}

async function switchMicrophone(label) {
    currentMic = mics.find(mic => mic.label === label);
    $(".mic-input").val(currentMic.label);
    // switch device of local audio track.
    await localTracks.audioTrack.setDevice(currentMic.deviceId);
}