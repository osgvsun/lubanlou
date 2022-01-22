/**
 * 方法修改不走layui内置函数
 */
//清空下拉框并重新添加
window.setOptionFn = function (name, str, form) {
    $(`select[name=${name}]`).html("");
    $(`select[name=${name}]`).append(str);
    form.render('select', null);
}

//通用下拉框方法
window.apiCommonSelectBySelect = function (type, search, callback, e) {
    $.ajax({
        url: labRoomHost + "/api/common/select/apiCommonSelectBySelect",
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify({type, search}),
        dataType: "JSON",
        success: callback,
        error: e
    });
}

// 通用下拉框通用回调函数
window.apiCommonSelectBySelectCallBackFn = function (res, name, a, b, form) {
    //回调函数
    let str = `<option value="">${a}</option>`
    if (res.results.length === 0) {
        str = `<option value="">${b}</option>`
    } else {
        for (let i = 0; i < res.results.length; i++) {
            str += `<option value="${res.results[i]['id']}">${res.results[i]['text']}</option>`
        }
    }
    setOptionFn(name, str, form)
}