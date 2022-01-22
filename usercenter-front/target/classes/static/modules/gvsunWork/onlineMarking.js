$(".marking_btn .layui-btn").click(
    function() {
        $(this).addClass("marking_btn_select").siblings(".layui-btn").removeClass("marking_btn_select");
    }
);
showPdf();
// showOldMarkingPage(markingPageId);
//获取当前窗口pdf视图窗口大小
var windowWidth=$("#markArea")[0].clientWidth;
console.log(windowWidth)
var height='841.92';
var width=windowWidth;
var pdfPageId=[];

var currentAuth = "teach";
//全局变量
var url = ''; // canvas图片的二进制格式转为dataURL格式
var type = 0;
var size=2;
var flag = false;
var x=0;//鼠标开始移动的位置x
var y=0;//鼠标开始移动的位置y
var i=0;
var myurl=new Array(); //保存批改内容
var myObject = new Array();

$('#markArea').on('mousedown',".over",function (event) {
    console.log(type)
    var curCanvasId=event.currentTarget.id;
    console.log(event)
    var scrollHeight=document.getElementById('edit'+curCanvasId).height;
    document.getElementById('showPdfArea').scrollTop=scrollHeight*curCanvasId;
    if(event.button=='0'&&type!=10){
        var currCanvas=document.getElementById(curCanvasId);
        var ctx=currCanvas.getContext('2d');

        myurl.push($("#"+curCanvasId)[0].toDataURL());
        if(type!=0){
            draw(curCanvasId);
        }
        else {
            if (myObject[0] != null) {
                for (var j = 0; j < myObject.length; j++) {
                    ctx.font = 'italic 20px sans-serif';
                    ctx.fillStyle = 'red';
                    ctx.fillText($("#canvas-input" + j).val(), myObject[j].x, myObject[j].y);
                    $("#canvas-input"+j).css('display','none');
                    $("#canvas-input" + j).val("")
                    url = $("#" + curCanvasId)[0].toDataURL();
                    loadImage(ctx, currCanvas, url);
                }
            }
            var canvas = document.getElementById(curCanvasId); // 得到画布
            var ctx = canvas.getContext('2d'); // 得到画布的上下文对象
            url = $('#' + curCanvasId)[0].toDataURL(); // 每次 mouseup 都保存一次画布状态
            var img = new Image();
            img.src=url
            if(size==1){
                img.onload = function () {
                    ctx.drawImage(img, x - 10, y - 10, 500, 900);
                };
            }
            if(size==3){
                img.onload = function () {
                    ctx.drawImage(img, x + 10, y + 10, 1200, 1600);
                };
            }
        }
    }
    if(event.button=='0'&&type==10){
        //删除标记
        eraser(curCanvasId)
    }

});
//pdf渲染为canvas
function showPdf(){
    // let url = 'http://teach.gvsun.net/group1/M00/00/4A/wKgBk2D-VF6ACxuGAAAEWySLeOo274.pdf?token=1de5fe7e2e24e120c9f5fe013b838c1c&ts=1627866349';
    // let url = httpRootUrl + 'modules/gvsunWork/static/js/onlineMarking/1.pdf'
    let urli = fileUrl;
    console.table(urli)
    var container = document.getElementById("marking_page");
    container.style.display = "block";
    pdfjsLib.GlobalWorkerOptions.workerSrc = httpRootUrl + 'modules/gvsunWork/static/js/onlineMarking/pdf.worker.js';
    pdfjsLib.getDocument(urli).promise.then(function(pdf){
        let report = $('#report');
        var shownPageCount = pdf.numPages < 50 ? pdf.numPages : 50;//设置显示的编码
        var getPageAndRender = function (pageNumber) {
            pdf.getPage(pageNumber).then(function (page){
                //获取原pdf宽度
                var viewport = page.getViewport({scale: 0.6});
                let canvas = $('<canvas id="page'+page._pageIndex+'" class="canvas"  draggable="true" ondragstart="drag(event)"></canvas>').attr({
                    'height': viewport.height,
                    'width': viewport.width
                });
                report.append(canvas);
                var renderContext = {
                    canvasContext: canvas[0].getContext('2d'),
                    viewport: viewport
                };
                page.render(renderContext);
            });
            if (pageNumber < shownPageCount) {
                pageNumber++;
                getPageAndRender(pageNumber);
            }
        }
        getPageAndRender(1);
    })
}

//设置大小
function setSize(sizeId) {
    size=sizeId;
}
//设置批阅事件
function setType(typeId) {
    type=typeId
}
//绘图片
function loadImage(ctx, canvas, url) {
    var img = new Image();
    img.src = url;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}
//画矩形
function drawRect(e, canvasId) {
    if (flag) {
        var canvas = document.getElementById(canvasId); // 得到画布
        var ctx = canvas.getContext('2d'); // 得到画布的上下文对象
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        loadImage(ctx, canvas, url);
        ctx.strokeStyle = '#f00';
        ctx.beginPath();
        ctx.strokeRect(x, y, e.offsetX - x, e.offsetY - y);
    }
}
//画直线
function drawLine(e, canvasId) {
    if (flag) {
        var canvas = document.getElementById(canvasId); // 得到画布
        var ctx = canvas.getContext('2d'); // 得到画布的上下文对象
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        loadImage(ctx, canvas, url);
        ctx.strokeStyle = '#f00';
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }
}
//画圆
function drawCircle(e, canvasId) {
    if (flag) {
        var canvas = document.getElementById(canvasId); // 得到画布
        var ctx = canvas.getContext('2d'); // 得到画布的上下文对象
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        loadImage(ctx, canvas, url);
        ctx.strokeStyle = '#f00';
        ctx.beginPath();
        var r = (e.offsetY-y > e.offsetX-x) ? e.offsetY :e.offsetX;
        var rx =Math.abs(e.offsetX-x)/2;
        var ry =Math.abs(e.offsetY-y)/2 ;
        ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2); // 绗涓弬鏁伴粯璁ゆ槸false-椤烘椂閽
        ctx.stroke();
    }
}
function changeWidth(obj) {
    var text_length = $(obj).val().length;
    var current_width = parseInt(text_length) * 21;
    $(obj).css("border", "1px dashed #F00");
    $(obj).css("width", current_width + "px");
}
//撤回
function turnback() {
    var currentCtx=currentCanvas.getContext('2d');
    if (myurl.length > 0) {
        url = myurl[myurl.length - 1];
        myurl.length--;
        var img = new Image();
        img.src = url;
        img.onload = function () {
            currentCtx.drawImage(img, 0, 0, currentCanvas.width, currentCanvas.height);
        }
    }
}
//批阅
function draw(canvasId) {
    var e1 = window.event;
    x = e1.offsetX; // 鼠标落下时的X
    y = e1.offsetY; // 鼠标落下时的Y
    var canvas = document.getElementById(canvasId); // 得到画布
    var ctx = canvas.getContext('2d'); // 得到画布的上下文对象
    url = $('#' + canvasId)[0].toDataURL(); // 每次 mouseup 都保存一次画布状态
    loadImage(ctx, canvas, url);
    if (type == 4) {
        var img = new Image();
        img.src = httpRootUrl + "modules/gvsunWork/static/markingwork/editor_accept.png";
        img.onload = function () {
            ctx.drawImage(img, x - 10, y - 10, 30, 30);

        };
        if(size==1){
            img.onload = function () {
                ctx.drawImage(img, x - 10, y - 10, 20, 20);

            };
        }
        if(size==3){
            img.onload = function () {
                ctx.drawImage(img, x - 10, y - 10, 40, 40);

            };
        }
        url = $('#' + canvasId)[0].toDataURL();
        loadImage(ctx, canvas, url);
    }
    else if (type == 5) {
        var img = new Image();
        img.src = httpRootUrl + "modules/gvsunWork/static/markingwork/h3.png";
        img.onload = function () {
            ctx.drawImage(img, x - 10, y - 10, 100, 140);
        };
        if(size==1){
            img.onload = function () {
                ctx.drawImage(img, x - 10, y - 10, 50, 70);
            };
        }
        if(size==3){
            img.onload = function () {
                ctx.drawImage(img, x - 10, y - 10, 150, 210);
            };
        }
        url = $('#' + canvasId)[0].toDataURL();
        loadImage(ctx, canvas, url);
    }
    else if (type == 6) {
        var img = new Image();
        img.src = httpRootUrl + "modules/gvsunWork/static/markingwork/h1.png";
        img.onload = function () {
            ctx.drawImage(img, x - 10, y - 10, 35, 70);
        }
        if(size==1){
            img.onload = function () {
                ctx.drawImage(img, x - 10, y - 10, 20, 35);
            }
        }
        if(size==3){
            img.onload = function () {
                ctx.drawImage(img, x - 10, y - 10, 50, 105);
            }
        }
        url = $('#' + canvasId)[0].toDataURL();
        loadImage(ctx, canvas, url);
    }
    else if (type == 7) {
        var thisCanvas = document.getElementById(canvasId);
        var localy=canvasId*thisCanvas.height+y;
        console.log(canvasId)
        $("#markArea").append("<input type='text' id='canvas-input" + i + "' class='canvas-input'  oninput='changeWidth(this)' style='position:absolute;top:" +localy+ "px;left:" + x + "px;'/>")
        setTimeout(function(){
            $("#canvas-input" + i).focus();
            document.getElementById("canvas-input" + i).focus();
            i++;
        },100)

        myObject[i] = {'x': x, 'y': y};

        type = 0
    }
    else if (type == 8) {
        var img = new Image();
        img.src = httpRootUrl + "modules/gvsunWork/static/markingwork/yue.gif";
        img.onload = function () {
            ctx.drawImage(img, x - 10, y - 10, 30, 30);
        }
        if(size==1){
            img.onload = function () {
                ctx.drawImage(img, x - 10, y - 10, 20, 20);
            }
        }
        if(size==3){
            img.onload = function () {
                ctx.drawImage(img, x - 10, y - 10, 50, 50);
            }
        }
        url = $('#' + canvasId)[0].toDataURL();
        loadImage(ctx, canvas, url);
    }
    $('#' + canvasId).mouseup(function (e) {

        url = $('#' + canvasId)[0].toDataURL();
        loadImage(ctx, canvas, url);
    })
    if (type == 1) {
        $('#' + canvasId).mousedown(function (e) {
            flag = true;
            x = e.offsetX; // 鼠标落下时的X
            y = e.offsetY; // 鼠标落下时的Y
        }).mouseup(function (e) {
            $(this).unbind('mousemove');
            flag = false;
            loadImage(ctx, canvas, url);

        }).mousemove(function (e) {
            drawRect(e, canvasId); // 绘制方法
        })


    }
    else if (type == 2) {
        console.log(type)
        $('#' + canvasId).mousedown(function (e) {
            flag = true;
            x = e.offsetX; // 鼠标落下时的X
            y = e.offsetY; // 鼠标落下时的Y
            console.log(x)
        }).mouseup(function (e) {
            $(this).unbind('mousemove');
            flag = false;
            loadImage(ctx, canvas, url);

        }).mousemove(function (e) {
            drawLine(e, canvasId); // 绘制方法
        })

    }
    else if (type == 3) {
        $('#' + canvasId).mousedown(function (e) {
            flag = true;
            x = e.offsetX; // 鼠标落下时的X
            y = e.offsetY; // 鼠标落下时的Y
        }).mouseup(function (e) {
            $(this).unbind('mousemove');
            flag = false;
            loadImage(ctx, canvas, url);

        }).mousemove(function (e) {
            drawCircle(e, canvasId);
        })


    }
    currentCanvas = canvas;

}
//批阅功能需要教师权限
function drag(ev)
{
    if(currentAuth=='teach'){
        console.log(ev)
        ev.dataTransfer.setData("Text",ev.target.id);
    }
}
function allowDrop(ev)
{
    if(currentAuth=='teach'){
        ev.preventDefault();
    }
}
function drop(ev)  {
    if(currentAuth=='teach'){
        ev.preventDefault();

        var data = ev.dataTransfer.getData("Text");

        var item = document.getElementById(data);
        console.log(item)
        //获取画布id
        var canvasid=item.id.substring(4);
        //创建一个新画布
        var newCanvas = document.createElement('canvas');
        var context = newCanvas.getContext('2d');

        //获取画布的维度尺寸
        newCanvas.width = item.width;
        newCanvas.height = item.height;
        newCanvas.id = 'edit'+canvasid;
        // newCanvas.id=item.id;
        //定义一个同等大小的canvas用于批改标注
        var newCanvas2 = document.createElement('canvas');
        var context2 = newCanvas2.getContext('2d');

        //获取画布的维度尺寸
        newCanvas2.width =item.width;
        newCanvas2.height =item.height;
        newCanvas2.id=canvasid;
        newCanvas2.className='canvas over';
        //获取编辑区域已有几张canvas，使新的canvas置于对应的报告canvas之上
        var hasCanvasNum=$("#markArea").find('canvas').length/2;
        newCanvas2.style.top=hasCanvasNum*item.height+'px';
        newCanvas2.style.left='0px';

        //把旧画布画到新画布上
        context.drawImage(item, 0, 0,newCanvas.width, newCanvas.height);
        context2.fillStyle = 'rgba(255, 255, 255, 0)';
        var cloneCanvas=newCanvas;
        var hasCanvas=$("#markArea").find('canvas[id^="'+canvasid+'"]');
        if(!hasCanvas.length){
            if(ev.target.nodeName=='DIV'){
                ev.target.appendChild(cloneCanvas);
                ev.target.appendChild(newCanvas2)
            }
            else {
                ev.target.after(cloneCanvas);
                ev.target.after(newCanvas2)
            }

            //将编辑页面的页面编号保存到pdfPageId
            pdfPageId.push(canvasid);
        }
        else{
            location.href='#'+canvasid;//如果修改区域已存在该页面，则直接定位到该页面
        }
        // addMarkingPage(item,item.id,item.width,item.height,ev.target)
    }
}
//给批改区域添加canvas
//copyCanvas 是报告内容  MarkingDIV  要放置编辑页面的元素
function addMarkingPage(copyCanvas,id,height,width,MarkingDIV) {
    //创建一个新画布
    var newCanvas = document.createElement('canvas');
    var context = newCanvas.getContext('2d');

    //获取画布的维度尺寸
    newCanvas.width = width;
    newCanvas.height = height;
    newCanvas.id = 'edit'+id;
    // newCanvas.id=item.id;
    //定义一个同等大小的canvas用于批改标注
    var newCanvas2 = document.createElement('canvas');
    var context2 = newCanvas2.getContext('2d');

    //获取画布的维度尺寸
    newCanvas2.width =width;
    newCanvas2.height =height;
    newCanvas2.id=id;
    newCanvas2.className='canvas over';
    //获取编辑区域已有几张canvas，使新的canvas置于对应的报告canvas之上
    var hasCanvasNum=$("#markArea").find('canvas').length/2;
    newCanvas2.style.top=hasCanvasNum*height+'px';
    newCanvas2.style.left='0px';
    //把图片画到新画布上
    var img = new Image();
    img.src = copyCanvas;
    console.log(img.width)
    img.onload = function(){
        img.setAttribute('crossOrigin', 'anonymous');
        context.drawImage(img, 0, 0,newCanvas.width,newCanvas.height);
    }
    context2.fillStyle = 'rgba(255, 255, 255, 0)';
    var cloneCanvas=newCanvas;
    var hasCanvas=$("#markArea").find('canvas[id^="'+id+'"]');
    if(!hasCanvas.length){
        MarkingDIV.appendChild(cloneCanvas);
        MarkingDIV.appendChild(newCanvas2);
        //将编辑页面的页面编号保存到pdfPageId
        pdfPageId.push(id);
    }
}
function eraser(canvasId)
{
    var e1 = window.event;
    x = e1.offsetX; // 鼠标落下时的X
    y = e1.offsetY; // 鼠标落下时的Y
    var canvas = document.getElementById(canvasId); // 得到画布
    var currentCtx = canvas.getContext('2d'); // 得到画布的上下文对象
    if(size==1){
        currentCtx.clearRect(x, y, 50, 50);
    }
    if(size==2){
        currentCtx.clearRect(x, y, 80, 80);
    }
    if(size==3){
        currentCtx.clearRect(x, y, 100, 100);
    }
}
function showOldMarkingPage(markingPageId) {
//保存已批改的页面id
    var markingIdArr=markingPageId.split(',');
    for(var index in markingIdArr){
        if (markingIdArr[index]!='null'){
            resourceContainer.getFileById({
                success: function (data) {
                    // //在编辑区域绘制canvas
                    console.log(data.fileName);
                    var fileImg=data.fileName.split('.')[0];
                    var pageindex=fileImg.substring(3);
                    console.log($("#markArea"));
                    if(height!=''){
                        addMarkingPage(data.url,pageindex-1,height,width,$("#markArea")[0])
                    }
                }, fail: function (reason) {
                    console.log("失败:" + reason);
                }, fileId: markingIdArr[index], needToken: true
            });
        }
    }

}

layui.use('layer', function () {
    var layer = layui.layer;
    window.submitOnlineMarking = function (){
        let comment = $('#comments').val();
        let finalGrading = $('#finalScore').val();
        if (comment == ""){
            console.log(layer)
            layer.msg("请填写评价内容");
            return false;
        }
        if (finalGrading == ""){
           layer.msg("请填写评价分数", {icon: -1});
            return false;
        }
        for (let i = 0; i < pdfPageId.length; i++){
            let myCanvas =$("#markArea").find('canvas[id^="'+pdfPageId[i]+'"]')[0];
            //将批改的内容画布画到原批改画布上，一起提交到后台
            let currCanvas=document.getElementById('edit'+pdfPageId[i]);
            let ctx=currCanvas.getContext('2d');
            ctx.drawImage(myCanvas, 0, 0,currCanvas.width, currCanvas.height);
            let image = currCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            //首次上传批改图片，告诉后台清除之前旧的批改文件
            let clean=false;
            if(i==0){
                clean=true;
            }
            let page=parseInt(pdfPageId[i])+1;

            $.ajax({
                async: false,
                type: "POST",
                url: httpBaseUrl + "api/saveMarkingImageNew",//改
                data: {'imageString': image, 'gradingId': gradingId, 'siteId': siteId, 'page': page,'clean':clean},
                dataType: "text",
                traditional: true,
                success: function (data) {
                    alert("操作成功");
                    var index = parent.layui.layer.getFrameIndex(window.name); //先得到当前iframe层的索引

                    //提交 Ajax 成功后，关闭当前弹层并重载表格
                    //$.ajax({});username
                    setTimeout(() => {
                        parent.layui.table.reload('correctlist'); //重载表格
                        parent.layui.layer.close(index); //再执行关闭
                    }, 200)

                },
                error: function () {
                    alert("保存失败！");
                    flag = false;
                }
            });
        }
        $.ajax({
            url: httpBaseUrl + 'api/commonWorkBatchScore',
            type: 'GET',
            async: false,
            data: {"finalScore": finalGrading, "siteId": siteId, "assignmentId": assignmentId, "usernames": username},
            success: function (res) {

            }
        })
        $.ajax({
            url: httpBaseUrl + 'api/commonWorkBatchComment',
            type: 'GET',
            async: false,
            data: {"comments": comment, "siteId": siteId, "assignmentId": assignmentId, "usernames": username},
            success: function (res) {
                alert("操作成功");
                var index = parent.layui.layer.getFrameIndex(window.name); //先得到当前iframe层的索引

                //提交 Ajax 成功后，关闭当前弹层并重载表格
                //$.ajax({});username
                setTimeout(() => {
                    parent.layui.table.reload('correctlist'); //重载表格
                    parent.layui.layer.close(index); //再执行关闭
                }, 200)

            }
        })

    }
})

