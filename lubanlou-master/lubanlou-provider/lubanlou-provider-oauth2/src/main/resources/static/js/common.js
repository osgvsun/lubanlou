// js
$(function () {
    js_bind_common();
})

// js绑定
function js_bind_common() {
    // input focus 效果
    $(".itext").focus(function () {
        $(this).siblings("label").addClass("item_label_focus")
    })
    $(".itext").blur(function () {
        $(this).siblings("label").removeClass("item_label_focus")
    });
}

// msg样式变化
function msgStyleChange(type = 0) {
    let classList = ["msg_error","msg_success","msg_warning"]
    let fontList = ["fa-minus-circle","fa-check-circle","fa-warning"]
    const changeFn = (className,targetName,list,index)=>{
        $(className)[0].classList = targetName
        $(className).addClass(list[index] || list[0])
    }
    changeFn(".msg","msg",classList,type)
    changeFn(".msg .fa","fa",fontList,type)
}

// msg文字显示
function msgTextShow(text, type = 0,id="#error_text") {
    if (text) {
        msgStyleChange(type)
        $(id).html(text);
    }
    $(".msg").css("visibility", "visible");
}
function msgTextShowBp(text, type = 0) {
    msgTextShow(text,type,"#bound_phone_error_text")
}

// msg文字隐藏
function msgTextHide() {
    $(".msg").css("visibility", "hidden");
    $(".force_error").removeClass("force_error")
}

// 复制操作
copy = (copyId) => {
    if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {//区分iPhone设备
        console.log('ios')
        window.getSelection().removeAllRanges();//这段代码必须放在前面否则无效
        let Url2 = document.getElementById(copyId);//要复制文字的节点
        let range = document.createRange();
        // 选中需要复制的节点
        range.selectNode(Url2);
        // 执行选中元素
        window.getSelection().addRange(range);
        // 执行 copy 操作
        let successful = document.execCommand('copy');

        // 移除选中的元素
        window.getSelection().removeAllRanges();
    } else {
        let text = document.getElementById(copyId).value;
        const textarea = document.createElement("textarea");
        textarea.style.position = 'fixed';
        textarea.style.top = "0";
        textarea.style.left = "0";
        textarea.style.border = 'none';
        textarea.style.outline = 'none';
        textarea.style.resize = 'none';
        textarea.style.background = 'transparent';
        textarea.style.color = 'transparent';
        textarea.value = text;// 修改文本框的内容
        document.body.appendChild(textarea);
        textarea.select()// 选中文本
        try {
            const msg = document.execCommand('copy') ?
                'successful' : 'unsuccessful';
            console.log(msg)
        } catch (err) {
            console.log('unable to copy', err)
        }
        document.body.removeChild(textarea)
    }
}

function inputFocus(selector,type="error"){
    $(".force_error").removeClass("force_error")
    $(selector).hasClass("item_force")?$(selector).addClass("force_"+type):$(selector).parents(".item_force").addClass("force_"+type)
    $(selector).focus();
}