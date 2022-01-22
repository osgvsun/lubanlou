// flash检测
function flashCheck() {
    var flag = false;
    if (window.ActiveXObject) {
        try {
            var swf = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
            if (swf) {
                flag = true;
            }
        } catch (e) {}
    } else {
        try {
            var swf = navigator.plugins["Shockwave Flash"];
            if (swf) {
                flag = true;
            }
        } catch (e) {}
    }
    return flag;
}
// 设置swf为本地的
function setLocalFlashSwf() {
    let swfName = "video-js.swf";
    let indexJs = "videojs-flvjs-expand.js";
    let indexJsSrc = $(`script[src*='/${indexJs}']`)[0].src;
    let _swf = indexJsSrc.replace(indexJs, swfName);
    videojs.options.flash.swf = _swf;
}
// 运行检测
function expandExecuteCheck(id) {
    //判断有效流有几种
    $(`#${id}>source[src='']`).remove();
    let useVideo = $(`#${id}>source[src]`);
    if (useVideo.length === 0) {
        //如果没有可播放的地址 则退出
        alert("请至少传入一个播放地址");
        return false;
    } else {
        // 浏览器自带的
        const DEFAULT_TYPE = ["video/mp4", "video/webm", "video/ogg"];
        const DEFAULT_RULES = [".mp4", ".webm", ".ogg"];
        // 可播放的格式
        const VIDEO_TYPE = [
            "application/x-mpegURL",
            "rtmp/flv",
            "video/x-flv",
            ...DEFAULT_TYPE,
        ];
        const VIDEO_RULES = [".m3u8", "rtmp:", ".flv", ...DEFAULT_RULES];
        const TECH_TYPE = ["html5", "flash", "flvjs"];

        // let techOrder = ["html5"];
        let techOrder = []; //
        let sourceMatch = {};
        let matchObj = {};

        // 赋值
        VIDEO_TYPE.forEach(function (val, index) {
            sourceMatch[VIDEO_TYPE[index]] = VIDEO_RULES[index];
        });

        // 检测页面中的source和type
        for (let i = 0; i < useVideo.length; i++) {
            // current source type
            let cSource_type = useVideo[i]["type"];
            let cSource_typeLower = cSource_type.toLowerCase();
            // src
            let cSource_src = useVideo[i]["src"];
            let cSource_srcLower = cSource_src.toLowerCase();

            //是否有这个source type
            if (cSource_type && sourceMatch.hasOwnProperty(cSource_typeLower)) {
                let isMatch = cSource_srcLower.includes(sourceMatch[cSource_typeLower]);
                //has
                if (isMatch) {
                    //符合条件
                    console.info(`info:`, `[${cSource_src}]`, `[${cSource_type}]`);
                    matchObj[`${cSource_type}`] = `${cSource_src}`;
                    // 判断order
                    switch (cSource_type) {
                        case VIDEO_TYPE[0]:
                        case VIDEO_TYPE[1]:
                            techOrder.push(TECH_TYPE[1]);
                            break;
                        case VIDEO_TYPE[2]:
                            techOrder.push(TECH_TYPE[2]);
                            break;
                    }
                } else {
                    //不符合的 remove
                    let currentStr = `#${id}>source[src='${cSource_src}'][type='${cSource_type}']`;
                    $(currentStr).remove();
                    console.error(
                        `ERROR:`,
                        `[${cSource_src}]`,
                        `[${cSource_type}]`,
                        `[流地址不符合格式，无法播放]`
                    );
                }
            }
        }
        // 判断是否都不符合
        let useVideo2 = $(`#${id}>source[src]`);
        if (useVideo2.length === 0) {
            // 如果没有可播放的地址 则退出
            alert("没有符合条件的播放地址，播放失败");
            return false;
        } else {
            techOrder = Array.from(new Set(techOrder));
            // 判断flash是否存在
            let f_ok = flashCheck();
            if (!f_ok && techOrder.includes(TECH_TYPE[1])) {
                delete techOrder[techOrder.indexOf(TECH_TYPE[1])];
                delete matchObj[VIDEO_TYPE[0]];
                delete matchObj[VIDEO_TYPE[1]];
                // 删除后没有播放地址就提示
                if (Object.keys(matchObj).length === 0) {
                    alert("浏览器没有flash 无法播放");
                    return false;
                }
            }
            /**
             *优先级
             *  之前是 html5 > flash > flv
             *  现在 flash > flv > html5
             */
            techOrder.push(TECH_TYPE[0]); //
            console.info(`techOrder:[${techOrder}]`);
            // 返回techOrder 数组可能有空元素但是不影响
            return techOrder;
        }
    }
}
// 初始化
function expandVideoInit(id) {
    //swf切换为本地的
    setLocalFlashSwf()
    // 运行检测
    let result = expandExecuteCheck(id);
    if (!result) {
        return;
    }
    console.time("VIDEOJS");
    videojs(
        id,
        {
            techOrder: result,
            // autoplay: true,
            // muted: true,
            flvjs: {
                mediaDataSource: {
                    isLive: true,
                    cors: true,
                    withCredentials: false,
                    hasAudio:false
                },
            }
        },
        function onPlayerReady() {
            videojs.log("Your player is ready!");
            console.timeEnd("VIDEOJS");
            // flvjs对象
            console.log(this.tech({ IWillNotUseThisInPlugins: true }));
            let { flvPlayer } = this.tech({
                IWillNotUseThisInPlugins: true,
            });
            if (flvPlayer) {
                flvPlayer.play();
            }
        }
    );
}
// 切换地址
function expandVideoSrc(obj) {
    let videoElement = document.getElementById("videojs-flvjs-player_Flvjs_api");
    if (!videoElement) {
        // 不存在就是flash
        // videojs的修改
        videojs(obj.id, {}).ready(function () {
            var myPlayer = this;
            myPlayer.src(obj.url);
            myPlayer.play();
        });
    } else {
        // 获取父元素然后删除之前的dom，再重新创建一个;
        let parentDiv = document.getElementById(obj.id).parentElement;
        videojs(obj.id).dispose();
        let str = `<video id="${obj.id}" class="video-js" controls muted>
                      <source
                        src="${obj.url}"
                        type="video/x-flv"
                      /></video>`;
        $(parentDiv).append(str);
        // 执行
        expandVideoInit(obj.id);
    }
}
