// oauth2 cms地址和资源容器的地址
let defaultOrigin = "http://localhost";
let resourceContainerHost = window.resourceContainerHost;

// 预加载
preloadFile(resourceContainerHost + '/shareApi/resourceContainer.css', "style")
preloadFile(resourceContainerHost + '/shareApi/resourceContainer.js')

function preloadFile(url, as = "script") {
    let preloadLink = document.createElement("link");
    preloadLink.href = url;
    preloadLink.rel = "preload";
    preloadLink.as = as;
    document.head.appendChild(preloadLink);
}

// 动态加载js
function loadJS(url, callback) {
    let script = document.createElement('script'),
        fn = callback || function () {
        };
    script.type = 'text/javascript';
    //IE
    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState == 'loaded' || script.readyState == 'complete') {
                script.onreadystatechange = null;
                fn();
            }
        };
    } else {
        //其他浏览器
        script.onload = function () {
            fn();
        };
    }
    script.src = url;
    document.head.appendChild(script);
}

// 加载资源容器css和js
loadJS(resourceContainerHost + '/shareApi/resourceContainer.js', function () {
    // css
    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = resourceContainerHost + '/shareApi/resourceContainer.css';
    document.head.appendChild(link);
    // 资源容器init
    let oauth2Host = getOriginUrl();
    resourceContainer.initResourceContainer({
        siteName: 'oauth2',
        oauth2Host: oauth2Host + '/uaa'
    });
    getCmsImage();
});

// 获取cms返回的图片数据，再替换；
function getCmsImage() {
    let cmsHost = getOriginUrl();
    $.ajax({
        url: cmsHost + "/cmsproduct/api/getConfig",
        type: "GET",
        dataType: "JSON",
        success: function (res) {
            //login图片
            if (res.loginLogo) {
                resourceContainer.getFileById({
                    success: function (data) {
                        defaultLogo(data.url)
                    },
                    fail: function (reason) {
                        console.log("失败:" + reason);
                        defaultLogo()
                    },
                    fileId: res.loginLogo,
                    needToken: true
                });
            } else {
                defaultLogo();
            }
            //背景图片
            if (res.loginBgp) {
                resourceContainer.getFileById({
                    success: function (data) {
                        defaultBgp(data.url)
                    },
                    fail: function (reason) {
                        console.log("失败:" + reason);
                        defaultBgp();
                    },
                    fileId: res.loginBgp,
                    needToken: true,
                    prefCompressed: false,
                });
            } else {
                defaultBgp();
            }
        }, error: function () {
            defaultLogo();
            defaultBgp();
        }
    });

    //设置logo和背景图片
    function defaultLogo(url = location.origin + "/uaa/images/login/logo_basic.png") {
        $(".logo").css("background-image", `url(${url})`);
    }

    function defaultBgp(url = location.origin + "/uaa/images/login/bg4.jpg") {
        $(".banner").css("background-image", `url(${url})`);
    }
}

// 本地就用正式服鲁班楼
function getOriginUrl() {
    return location.origin.includes("localhost") ? defaultOrigin : location.origin;
}