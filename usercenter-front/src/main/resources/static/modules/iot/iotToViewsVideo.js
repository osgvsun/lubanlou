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
startVideoFlv(decodeURI(url))