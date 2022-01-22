/**
 * 设备管理公共方法
 */

/**
 * 方法： 图片批量下载，懒加载显示
 * 参数： 标签，图片id，首次加载图片数，懒加载函数
 */
function arrReadImg(imgClass, imgIdAttr, numFirst, imgUrl) {
    let arr = []; //存放id 获取
    let arrData = []; //回放
    $(imgClass).each(function (index, ele) {
        let data = $(ele).attr(imgIdAttr);
        arrData.push(data);
        if (data != null && parseFloat(data).toString() !== "NaN") {
            arr.push(data);
        }
    });
    resourceContainer.getFilesByIds({
        success: function (fileDtos) {
            let string = JSON.stringify(arr);
            let arrObj = string.replace(/"/g, '');
            let aa = JSON.parse(arrObj);
            fileDtos.sort((a, b) => {
                return aa.indexOf(a.id) - aa.indexOf(b.id);
            });
            let fileDtoss = [];
            for (let j = 0; j < fileDtos.length; j++) {
                if (fileDtos[j].url) {
                    fileDtoss.push(fileDtos[j])
                }
            }
            // httpBaseUrl + 'static_c/img/noimage.jpg

            arrData.map((v, i) => {
                if (!fileDtoss[i] || v != fileDtoss[i].id) {
                    fileDtoss.splice(i, 0, {id: arrData[i], url: imgUrl})
                }
            });
            let image = [];
            for (let i = 0; i < fileDtoss.length; i++) {
                image.push(fileDtoss[i].url);
            }
            // 获取所有的图片标签
            const imgs = $(imgClass);
            const result = imgs.length;
            // num用于统计当前显示到了哪一张图片，避免每次都从第一张图片开始检查是否露出
            for (let i = 0; i < numFirst; i++) {
                if (i < result) {
                    imgs[i].src = image[i];
                }
            }
            let num = numFirst;
            // 获取可视区域的高度
            const viewHeight = window.innerHeight || document.documentElement.clientHeight
            // 监听事件定位到最外层window对象
            window.parent.addEventListener('scroll', function (e) {
                // console.log(parent.document.documentElement.scrollTop)   //滚动条滚动的距离

                // for (let i = num; i < result; i++){
                //     //iframe懒加载 使用滚动条卷其高度减去目标元素距离可视距离
                //     let distance = parent.document.documentElement.scrollTop - $(imgs[i]).parent().offset().top;
                //     // 如果滚动距离减去目标元素值大于零，说明元素露出
                //     if (distance >= 0){
                //         imgs[i].src = image[i];
                //         num = i + 1
                //     }
                // }
                for (let i = num; i < imgs.length; i++){
                    // 用可视区域高度减去元素顶部距离可视区域顶部的高度
                    let distance = viewHeight - imgs[i].getBoundingClientRect().top;
                    // 如果可视区域高度大于等于元素顶部距离可视区域顶部的高度，说明元素露出
                    if (distance >= 0){
                        imgs[i].src = image[i];
                        num = i + 1
                    }
                }
            }, false)

        }, fail: function (msg) {
            alert(msg);
        },
        fileIds: arr
    });
}

/**
 * 实验室渲染
 */
function getLabRoom(form) {
    $.ajax({
        url: httpDeviceUrl +"getLabRoomList",
        type: 'GET',
        async: false,
        success: function (data) {
            let result = data;
            if (data) {
                for (let i = 0; i < result.data.length; i++) {
                    let option = `<option value="${result.data[i].labRoomNumber}" label="${result.data[i].id}">${result.data[i].labRoomName}</option>`;
                    $("select[name='labRoom']").append(option);
                    form.render('select');
                }

            }
        }
    })
}

/**
 *获取仪器的配置信息
 */
function getInstrumentConfig(uid) {
    let data = {};
    $.ajax({
        url: httpDeviceUrl + 'getInstrumentConfig',
        type: 'GET',
        async: false,
        data: {'uid': uid},
        success: function (res) {
            data = res;
            // if (data.code === 0 && data.data !== null && data.data !== "") {
            //     college = data.data.academyNumber.split(",");
            //     form.val('equipmentreservebox', {
            //         'resvIsHour': data.data.resvIsHour,
            //         'resvIsSpecimen': data.data.resvIsSpecimen,
            //         'resvCreditScore': data.data.resvCreditScore,
            //         'openScope': data.data.openScope
            //     })
            //     if(data.data.openScope == "2") {
            //         $(".collagechoose").show();
            //     } else {
            //         $(".collagechoose").hide();
            //     }
            // } else if (data.code !== 0){
            //     layer.msg(data.msg);
            // }
        }
    });
    return data;
}