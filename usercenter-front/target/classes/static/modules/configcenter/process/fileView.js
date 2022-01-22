//文件后缀
window.fileSuffix = {
    image: ["jpg", "jpeg", "png", "webp", "bmp", "gif", "jfif"],// 浏览器支持的图片显示类型
    rar: ["rar", "zip", '7z', "gzip", "gz", "tar"],// 压缩的文件夹后缀
    video: ["mp4", "flv", "mov", "wmv", "avi"],
    audio: ["mp3"],
    office: ["doc", "docx", "xls", "xlsx", "ppt", "pptx"],
    unpreview: function () {
        // 不可预览的类型
        return ["xmind", ...this.rar, "chm", "py"];
    },
    display: function () {
        // 有图片的文件后缀
        return ["pdf", "txt", "js", ...this.office, ...this.image, ...this.video, ...this.audio, ...this.unpreview()]
    }
}

//控制第一个是哪个接口
function folderHome(selector, callback) {
    let folderType = sessionStorage.getItem("folderType") || 0
    switch (+folderType) {
        case 0:
            //一级 我的文件夹
            yunHome(selector, callback)
            break;
        case 1:
            //共享
            break;
        case 2:
            //所有部门
            //getDepartments(selector, callback)
            //用户所在部门（后续判断若是没有部门就显示所有部门？
            getUserDepartment(selector, callback)
            break;
        case 3:
            //企业
            break;
    }
}

//访问这个文件夹里面的内容
function viewDeepFolder(folderId, callback, selector) {
    let folderType = sessionStorage.getItem("folderType") || 0
    switch (+folderType) {
        case 0:
            //我的文件夹
            yunSubDir(folderId, selector, callback)
            break;
        case 1:
            //共享
            break;
        case 2:
            //部门
            if ($(".page_content_catalog label").length >= 2) {
                departmentSubDir(folderId, selector, callback)
            } else {
                departmentHome(folderId, selector, callback)
            }
            break;
        case 3:
            //企业
            break;
    }
}

//获取用户所在的部门
function getUserDepartment(selector, callback) {
    let requestUrl;
    let fileLoadIndex = top.layer.load(2)
    $.ajax({
        url: oauth2 + "/resource/getUserDepartment",
        dataType: "JSON",
        data: {
            username: top.currentUsername
        },
        headers: {
            "x-datasource": top.$.cookie("datasource.cookie"),
        },
        beforeSend: function (xhr, setting) {
            requestUrl = setting.url;
            defaultToDoGetCacheFiles(requestUrl, xhr, selector, fileLoadIndex, callback)
        }, success: function (res) {
            resourcesCloudCaches.setData(requestUrl, res)
            renderFileBox(selector, res, callback)
        },
        complete: function () {
            top.layer.close(fileLoadIndex)
        }
    })
}

//部门文件夹
function getDepartments(selector, callback) {
    let requestUrl;
    let fileLoadIndex = top.layer.load(2)
    $.ajax({
        url: oauth2 + "/resource/getDepartments",
        type: "GET",
        dataType: "JSON",
        headers: {
            "x-datasource": top.$.cookie("datasource.cookie"),
        },
        beforeSend: function (xhr, setting) {
            requestUrl = setting.url;
            defaultToDoGetCacheFiles(requestUrl, xhr, selector, fileLoadIndex, callback)
        },
        success: function (res) {
            resourcesCloudCaches.setData(requestUrl, res)
            renderFileBox(selector, res, callback)
        },
        complete: function () {
            top.layer.close(fileLoadIndex)
        }
    })
}

//部门根目录
function departmentHome(folderId, selector, callback) {
    let requestUrl;
    let fileLoadIndex = top.layer.load(2)
    $.ajax({
        url: top.resourceContainerHost + "/yun/departmentHome",
        type: "GET",
        data: {departmentId: folderId},
        dataType: "JSON",
        headers: {
            "x-datasource": top.$.cookie("datasource.cookie"),
        },
        beforeSend: function (xhr, setting) {
            requestUrl = setting.url;
            defaultToDoGetCacheFiles(requestUrl, xhr, selector, fileLoadIndex, callback)
        },
        success: function (res) {
            resourcesCloudCaches.setData(requestUrl, res)
            renderFileBox(selector, res, callback)
        },
        complete: function () {
            top.layer.close(fileLoadIndex)
        }
    })
}

//部门 =》事业部 =》文件夹
function departmentSubDir(folderId, selector, callback) {
    let requestUrl;
    let fileLoadIndex = top.layer.load(2)
    $.ajax({
        url: top.resourceContainerHost + "/yun/departmentSubDir",
        type: "GET",
        data: {id: folderId},
        dataType: "JSON",
        headers: {
            "x-datasource": top.$.cookie("datasource.cookie"),
        },
        beforeSend: function (xhr, setting) {
            requestUrl = setting.url;
            defaultToDoGetCacheFiles(requestUrl, xhr, selector, fileLoadIndex, callback)
        },
        success: function (res) {
            resourcesCloudCaches.setData(requestUrl, res)
            renderFileBox(selector, res, callback)
        },
        complete: function () {
            top.layer.close(fileLoadIndex)
        }
    })
}

//我的文件夹
function yunHome(selector, callback) {
    let requestUrl;
    // let fileLoadIndex = top.layer.load(2)
    // $.ajax({
    //     // url: top.resourceContainerHost + "/yun/home",
    //     type: "GET",
    //     // data: {username: top.currentUsername},
    //     dataType: "JSON",
    //     headers: {
    //         "x-datasource": top.$.cookie("datasource.cookie"),
    //     },
    //     beforeSend: function (xhr, setting) {
    //         requestUrl = setting.url;
    //         defaultToDoGetCacheFiles(requestUrl, xhr, selector, fileLoadIndex, callback)
    //     },
    //     success: function (res) {
    //         resourcesCloudCaches.setData(requestUrl, res)
    //         renderFileBox(selector, res, callback)
    //     },
    //     complete: function () {
    //         top.layer.close(fileLoadIndex)
    //     }
    // })
    var sites = GetQueryStringU('globalVariable');
    requestUrl = 'getSites';
    // let res = '[{"siteId":197,"siteName":"庚商学院2018","chapterDTOS":[{"chapterId":8979,"chapterName":"测试11","lessonDTOS":[{"lessonId":7930,"folderDTOS":[{"fileDTOS":[],"folderName":"外部链接","folderId":61104},{"fileDTOS":[],"folderName":"啊啊啊啊啊啊啊","folderId":61112},{"fileDTOS":[{"fileName":"服务手册上戏项目.docx","resourceId":"185238","fileId":85635}],"folderName":"ssssss","folderId":61132}],"lessonName":"11"}],"folderDTOS":[{"fileDTOS":[{"fileName":"服务手册上戏项目.docx","resourceId":"185238","fileId":85636}],"folderName":"c嗯上","folderId":61134}]},{"chapterId":8989,"chapterName":"测试接口-章","lessonDTOS":[{"lessonId":7937,"folderDTOS":[{"fileDTOS":[],"folderName":"测试接口-目录","folderId":61133}],"lessonName":"测试接口-节"}],"folderDTOS":[]}]},' +
    //     '{"siteId":132,"siteName":"测试","chapterDTOS":[]}]'
    resourcesCloudCaches.setData(requestUrl, sites)
    renderFileBox(selector, sites, callback,'config')
}

//我的文件夹-里面的子文件夹查询
function yunSubDir(folderId, selector, callback) {
    let requestUrl;
    let fileLoadIndex = top.layer.load(2)
    $.ajax({
        url: top.resourceContainerHost + "/yun/subDir",
        data: {id: folderId},
        dataType: "JSON",
        headers: {
            "x-datasource": top.$.cookie("datasource.cookie"),
        }, beforeSend: function (xhr, setting) {
            requestUrl = setting.url;
            defaultToDoGetCacheFiles(requestUrl, xhr, selector, fileLoadIndex, callback)
        },
        success: function (res) {
            resourcesCloudCaches.setData(requestUrl, res)
            renderFileBox(selector, res, callback)
        }, complete: function () {
            top.layer.close(fileLoadIndex)
        }
    })
}

//获取缓存数据默认要做的事情
function defaultToDoGetCacheFiles(requestUrl, xhr, selector, loadIndex, callback) {
    resourcesCloudCaches.getData(requestUrl, function (cacheData) {
        if (cacheData != null) {
            let haveCache = true;
            //token为15分钟 清理缓存 aHR开头
            let sessionKey = Object.keys(sessionStorage);
            for (let i in sessionKey) {
                if (sessionKey[i].startsWith("aHR")) {
                    //毫秒
                    let diffTime = 10 * 60 * 1000;
                    //为缓存 判断value中时间和现在是否相差10分钟 是则remove它，如果它和现在的请求一样并且过期了，就不abort；
                    let s_date = JSON.parse(sessionStorage.getItem(sessionKey[i]))['cache_date'];
                    let nowTime = new Date().getTime();
                    //1000代码执行时间?
                    if (nowTime >= Number(s_date) + diffTime + 1000) {
                        //已过期
                        sessionStorage.removeItem(sessionKey[i]);
                        //如果是当前这个请求过期了
                        if (sessionKey[i] === btoa(requestUrl)) {
                            haveCache = false;
                        }
                        //如果点击的是当前所在的文件夹，就不用缓存？
                        //待续
                    }
                }
            }
            //over
            if (haveCache) {
                xhr.abort();
                renderFileBox(selector, JSON.parse(cacheData), callback)
                top.layer.close(loadIndex)
            }
        }
    })
}

//10分钟执行一次 预防用户停在一个页面不动导致预览token过期的文件
function definiteTime() {
    let timerKey = "cacheTimer"
    let refreshTime = 10 * 60 * 1000
    let cacheTimer = sessionStorage.getItem(timerKey)
    if (cacheTimer) {
        //存在 则关闭
        clearTimeout(Number(cacheTimer))
    }
    let timer = setTimeout(function () {
        let stb = document.querySelectorAll(".sub_tit_box");
        //点击导航刷新页面
        resourcesCloudBreadCrumb.click(stb[stb.length - 1].children[0], false);
    }, refreshTime)
    sessionStorage.setItem(timerKey, timer.toString());
}

//渲染file盒子
function renderFileBox(selector = ".pictext_box", res, callback = function () {
}, type) {
    // 10分钟刷新一次，但是不关闭预览
    definiteTime();
    // 渲染开始
    let _frame = window.frames['i'];
    // 清空
    let selector2 = _frame.document.querySelector(".pictext_box");
    $(selector2).html("");
    // 拼接
    if(type == 'config'){
        $(selector2).append(returnFileListTemplateBySiteId(res['data'] || res))
    }else{
        $(selector2).append(returnFileListTemplate(res['data'] || res))
    }

    // 渲染事件 单击与双击
    _frame.pictextEventInit();
    _frame.pictextEventInit2();
    _frame.pictextEventInit3();
    callback()
}

//返回文件列表html模板
function returnFileListTemplate(data) {
    let str = ""
    //渲染不需要cache_date
    delete data['cache_date']
    // data = eval('(' + data + ')')
    for (let i in data) {
        if (data.hasOwnProperty(i) && data[i]['name']) {
            let fileName = data[i]['name'];
            if (data[i]['file']) {
                let unknowBool = true;
                //是文件，判断后缀然后拼接
                let fileNameArr = fileName.split(".");
                if (fileNameArr.length >= 2) {
                    let fileSuffixLower = fileNameArr[fileNameArr.length - 1].toLocaleLowerCase();
                    //有后缀
                    let fileIndex = fileSuffix.display().indexOf(fileSuffixLower);
                    if (fileIndex > -1) {
                        //是否可预览判断
                        if (fileSuffix.unpreview().includes(fileSuffixLower)) {
                            //不可预览
                            str += returnFileTemplate(data[i], "unpreview_" + fileSuffix.display()[fileIndex]);
                        } else {
                            //并且可以识别的，不能识别的就是未知文件unknow
                            str += returnFileTemplate(data[i], fileSuffix.display()[fileIndex]);
                        }
                        unknowBool = false;
                    }
                }
                //未知文件
                if (unknowBool) {
                    str += returnFileTemplate(data[i], "unknow");
                }
            } else {
                //是文件夹
                str += returnFileTemplate(data[i])
            }
        }
    }
    return str;
}
//返回文件列表html模板
function returnFileListTemplateBySiteId(data) {
    let str = ""
    //渲染不需要cache_date
    delete data['cache_date']
    // data = eval('(' + data + ')')
    data = data.split(',');
    for (let i in data) {
        if (data.hasOwnProperty(i) && data[i]['name']) {
            let fileName = data[i]['name'];
            if (data[i]['file']) {
                let unknowBool = true;
                //是文件，判断后缀然后拼接
                let fileNameArr = fileName.split(".");
                if (fileNameArr.length >= 2) {
                    let fileSuffixLower = fileNameArr[fileNameArr.length - 1].toLocaleLowerCase();
                    //有后缀
                    let fileIndex = fileSuffix.display().indexOf(fileSuffixLower);
                    if (fileIndex > -1) {
                        //是否可预览判断
                        if (fileSuffix.unpreview().includes(fileSuffixLower)) {
                            //不可预览
                            str += returnFileTemplate(data[i], "unpreview_" + fileSuffix.display()[fileIndex]);
                        } else {
                            //并且可以识别的，不能识别的就是未知文件unknow
                            str += returnFileTemplate(data[i], fileSuffix.display()[fileIndex]);
                        }
                        unknowBool = false;
                    }
                }
                //未知文件
                if (unknowBool) {
                    str += returnFileTemplate(data[i], "unknow");
                }
            } else {
                //是文件夹
                str += returnFileTemplate(data[i])
            }
        }else{
            str += returnFileTemplateForConfig(data[i])
        }
    }
    return str;
}


//返回文件html模板
function returnFileTemplate(file, suffix = "folder") {
    let fileImageStr;
    let returnStr = '';
    if (fileSuffix.image.includes(suffix)) {
        //如果为图片，缩略图为图片
        fileImageStr = file.url;
    } else if (fileSuffix.rar.includes(suffix.split("unpreview_")[1])) {
        //统一压缩缩略图
        fileImageStr = returnDefaultImage("rar");
    } else if (fileSuffix.video.includes(suffix)) {
        fileImageStr = returnDefaultImage("mp4");
    } else if (suffix.includes("unpreview_")) {
        //存在不可预览的
        fileImageStr = returnDefaultImage(suffix.split("unpreview_")[1]);
    } else {
        //默认
        fileImageStr = returnDefaultImage(suffix)
    }
    returnStr+= `<div class="pictext_net opacity1" 
                    data-file-id="${file.id}" 
                    data-file-type="${suffix}" 
                    data-file-creator="${file['creator']}" 
                    data-file-url="${file.url}" 
                    title="${returnFileTitle(file)}"
                    >
                    <div class="pn_img_box">
                        <div class="pn_img">
                            <img src="${fileImageStr}" alt="">
                        </div>
                    </div>
                    <div class="pn_info">${file.name}</div>
                </div>`;
    return returnStr;
}
//返回文件html模板
function returnFileTemplateForConfig(file, suffix = "folder") {
    let fileImageStr;
    let returnStr = '';
    if (fileSuffix.image.includes(suffix)) {
        //如果为图片，缩略图为图片
        fileImageStr = file.url;
    } else if (fileSuffix.rar.includes(suffix.split("unpreview_")[1])) {
        //统一压缩缩略图
        fileImageStr = returnDefaultImage("rar");
    } else if (fileSuffix.video.includes(suffix)) {
        fileImageStr = returnDefaultImage("mp4");
    } else if (suffix.includes("unpreview_")) {
        //存在不可预览的
        fileImageStr = returnDefaultImage(suffix.split("unpreview_")[1]);
    } else {
        //默认
        fileImageStr = returnDefaultImage(suffix)
    }
    let fileLoadIndex = top.layer.load(2)
    $.ajax({
        url: top.resourceContainerHost + "/gvsunDirectory/getDirectoryInfo",
        data: {path: `教学平台/${file.split('_')[1]}(${file.split('_')[0]})`},
        dataType: "JSON",
        type: "GET",
        async: false,
        headers: {
            // "x-datasource": 'limsproduct-lubanlou',
            "x-datasource": top.$.cookie("datasource.cookie"),
        },
        success: function (res) {
            if(res.msg!='success'){
                layer.msg(res.msg);
            }else{
                returnStr+= `<div class="pictext_net opacity1" 
                    data-file-id="${res.data.id}" 
                    data-file-type="${suffix}" 
                    data-file-creator="${file['creator']}" 
                    data-file-url="${file.url}" 
                    title="${returnFileTitle(file)}"
                    >
                    <div class="pn_img_box">
                        <div class="pn_img">
                            <img src="${fileImageStr}" alt="">
                        </div>
                    </div>
                    <div class="pn_info">${file.split('_')[1]}</div>
                </div>`;
            }
        }, complete: function () {
            top.layer.close(fileLoadIndex)
        }
    })
    return returnStr;
}

//返回文件title
function returnFileTitle(file) {
    if (file.size != null) {
        file.size = `大小：${sizeTostr(file.size)}&#10;`;
    } else {
        file.size = ""
    }
    if (file.lastModificationTime != null) {
        file.lastModificationTime = `创建时间：${moment(file['lastModificationTime']).format("YYYY-MM-DD dddd HH:MM")}`;
    } else {
        file.lastModificationTime = ""
    }
    return `名称：${file.name}&#10;${file.size}${file.lastModificationTime}`;
}

//返回默认图片
function returnDefaultImage(name) {
    return `../modules/resourcesCloud/static/images/suffix/${name}.png`;
}

//文件系统缓存
window.resourcesCloudCaches = {
    //是否开缓存
    enable: true,
    getData: function (requestUrl, callback) {
        if (!this.enable) {
            callback(null);
            return;
        }
        this.aop(requestUrl)
        callback(sessionStorage.getItem(btoa(requestUrl)))
    },
    setData: function (requestUrl, res) {
        if (!this.enable) return;
        //设置进进入缓存的时间（毫秒
        if (Array.isArray(res)) {
            //是数组
            res = {
                data: res
            }
        }
        this.aop(requestUrl)
        res['cache_date'] = new Date().getTime();
        sessionStorage.setItem(btoa(requestUrl.toString()), JSON.stringify(res))
    },
    aop: function (requestUrl) {
        window.frames['i'].$(".cacheRequestUrl").val(btoa(requestUrl))
    },
    removeCurrentData: function (refresh = false) {
        //删除当前文件列表的缓存
        sessionStorage.removeItem(window.frames['i'].$(".cacheRequestUrl").val())
        //并且刷新
        if (refresh) {
            $(".page_content_catalog label:last>a").click();
        }
    }
}

//文件大小显示转换
function sizeTostr(size) {
    var data = "";
    if (size < 0.1 * 1024) { //如果小于0.1KB转化成B
        data = size.toFixed(2) + "B";
    } else if (size < 0.1 * 1024 * 1024) {//如果小于0.1MB转化成KB
        data = (size / 1024).toFixed(2) + "KB";
    } else if (size < 0.1 * 1024 * 1024 * 1024) { //如果小于0.1GB转化成MB
        data = (size / (1024 * 1024)).toFixed(2) + "MB";
    } else { //其他转化成GB
        data = (size / (1024 * 1024 * 1024)).toFixed(2) + "GB";
    }
    var sizestr = data + "";
    var len = sizestr.indexOf("\.");
    var dec = sizestr.substr(len + 1, 2);
    if (dec == "00") {//当小数点后为00时 去掉小数部分
        return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
    }
    return sizestr;
}

//如果是部门文件夹就不能新建文件夹
function checkCurrentBreadCrumb() {
    //current当前面包屑
    let c_b = $(".sub_tit_box>a");
    //不能新建文件夹的目录
    if (c_b.length === 1 && c_b.text() === resourcesCloudBreadCrumb.folderTypeArr[2]) {
        $(".newfolder").addClass("po_btn_disabled")
    } else {
        $(".newfolder").removeClass("po_btn_disabled")
    }
}
function GetQueryStringU(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
    var context = "";
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : decodeURI(context);
}