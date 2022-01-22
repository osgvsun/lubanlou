$.ajax({
    url: timetableHost + '/api/labroom/openVideo',
    type: 'GET',
    async: false,
    data: {"agentId": agentId},
    success: function (res) {
        console.log(res);
        let data = res;
        if (data.data.pcUrlFlv) {
            startVideoFlv(data.data.pcUrlFlv);
        } else {
            startVideoRtmp('flashvideo', data.data.pcUrl);
            $('#flvvideo').remove();
        }
    }
});

//flv视频设置
function startVideoFlv(url) {
    var videoElement = document.getElementById('flvvideo');
    var flvPlayer = flvjs.createPlayer({
        type: 'flv',
        isLive: true,
        hasAudio: false,
        hasVideo: true,
        autoplay: true,
        enableStashBuffer: true,
        url: url
    });
    flvPlayer.attachMediaElement(videoElement);
    flvPlayer.load();
    flvPlayer.play();
}

//rtmp视频设置
function startVideoRtmp(selector, url) {
    var videoObject = {
        container: `#${selector}`, //“#”代表容器的ID，“.”或“”代表容器的class
        variable: 'player', //该属性必需设置，值等于下面的new chplayer()的对象
        autoplay: true, //自动播放
        live: true,
        volume: 0,
        video: url
    };
    var player = new ckplayer(videoObject);
}