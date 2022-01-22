$(function () {
    document.getElementById("kw").onfocus = function () {
        $(this).parent().addClass("iptfocus");
    }
    document.getElementById("kw").onblur = function () {
        $(this).parent().removeClass("iptfocus");
    }
    $('#form').on('submit', function () {
        event.preventDefault() //阻止form表单默认提交
    })
})
function doGVSunSearch() {
    $(window).scrollTop(0);
    //临时方案
    if ($("#kw").val() == "") {
        location.reload(true);
    }
    if ($("#flag").length > 0) {
        $("#flag").remove();
        $("#head").removeClass("head_index");
        $(".s_form_index").removeClass("s_form_index");
        $(".wrapper").removeClass("wrapper");
        $("#logo").attr("width", "150px").removeAttr("height");
        $("#form").addClass("fm").removeAttr("style");
        $("#lg").addClass("lg");
        $("#searchType").removeClass("none_display");
    }
    $.ajax({
        url: directoryEngineHost + "/supperSearch?" + $("#form").serialize(),
        type: "get",
        dataType: "json",
        success: function (data) {
            $("#resultsContain").empty();
            var keys = new Array();
            $.each($("#kw").val().split(" "),function (index,key) {
                keys.push(key);
            });
            $.each(data.keys, function (key, weight) {
                keys.push(key);
            });
            $.each(data.results, function (index, value) {
                mkResultCard();
                var resultObj = $("#resultsContain").children(":last-child");
                var userTag;
                var avstract;
                if (value.tag.length > 0) {
                    userTag = value.tag.split("/");
                } else {
                    userTag = new Array();
                }
                if(value.fileId == null){
                    $(resultObj).attr("id", "file" + value.directoryId);
                    $(resultObj).find("h3").html("<a href='#' onclick='alert(\"目录预览还未完成\")'>" + highlight(subTitle(value.directoryName.split("/")[value.directoryName.split("/").length-1]), keys) + "</a><span class='fileTag tag'>目录</span><span class='basicTag tag'>" + value.siteName + "</span>" );
                    avstract = "<table class='f13'><tr>"
                        + "<td id='directory" + value.directoryId + "'><bm>所属目录</bm>:" + highlight(value.directoryName, keys)
                        + "</td></tr><tr><td>"
                        +"<span class='userTag tag'>"
                        + ((userTag.length ==0) ?"无自定义标签":userTag.join("</span><span class='userTag tag'>"))
                        + "</span></td></tr></table>";
                }else{
                    var basicTag = value.directoryName.split("/");
                    basicTag.splice(0,1);
                    var testFile = value.fileName.substring(value.fileName.lastIndexOf(".") + 1).toUpperCase();
                    var imageregx = /JPG|GIF|PNG|JPEG|BMP/;
                    var videoRegex = /MP4/;
                    var videoTest = testFile.match(videoRegex);
                    var imgTest = testFile.match(imageregx);
                    var openRegex = /JPG|GIF|PNG|JPEG|TXT|PDF|XML|MP4/;
                    var openTest = testFile.match(openRegex);
                    $(resultObj).attr("id", "file" + value.fileId);
                    $(resultObj).find("h3").html("<a href='" + value.url + (openTest ? "' target='_blank'" : "?filename=" + subFileName(value.fileName) + "'") + ">" + highlight(subTitle(value.fileName), keys) + "</a><span class='fileTag tag'>文件</span><span class='basicTag tag'>" + value.siteName + "</span>" + (value.publicState == 1 ? "<span class='siteTag tag'>本站共享</span>" : (value.publicState == 2 ? "<span class='siteTag tag'>全网共享</span>" : "")));
                    $(resultObj).find("p").text("上传时间:" + value.upTime + "   上传人:" + value.creater);

                    avstract = "<table class='f13'><tr>"
                        + (imgTest ? "<td style='width:150px;' rowspan='3'><image style='width:150px;height:150px' src='" + value.url + "' /></td>" : "")
                        + (videoTest ? "<td style='width:150px;' rowspan='3'><video preload='meta' controls='controls' style='width:150px;height:150px' src='" + value.url + "' /></td>" : "")
                        + "<td id='directory" + value.directoryId + "'><bm>所属目录</bm>:" + highlight(value.directoryName, keys)
                        + "</td></tr><tr><td>"
                        + ((basicTag.length == 0)?"":"<span class='basicTag tag'>"
                            +  basicTag.join("</span><span class='basicTag tag'>"))
                        + "</span><span class='userTag tag'>"
                        + ((userTag.length ==0) ?"无自定义标签":userTag.join("</span><span class='userTag tag'>"))
                        + "</span></td></tr><tr><td style='float:right;'>" +
                        (openTest ? "<a href='" + value.url + "'  target='_blank' >预览</a>":"") + "<a href= '"
                        + value.url + "?filename=" + subFileName(value.fileName)
                        + "'>下载</a></td></tr></table>";
                }
                    $(resultObj).find(".abstract").html(avstract);

            });
            var fd = new FormData();
            fd.append("keys", keys.join("|"));
            fd.append("type",$("#type").val());
            $.ajax({
                url: directoryEngineHost + "/countSearch",
                type: "POST",
                processData: false,
                contentType: false,
                data: fd,
                dataType: "json",
                success: function (pageModel) {
                    $(".nums_text").text("庚商搜索引擎为您发现相关结果" + pageModel.totalRecords + "条");
                    initPageFoot(parseInt($("#currentPage").val()), parseInt(pageModel.totalPages))
                }
            });
        }
    })
}
function mkResultCard() {
    $("#resultsContain").append("<div class='result '><h3 class='t'></h3><p class='f13 m'></p><div class='c- abstract'></div><div class='f13'></div></div>");
}
function highlight(str, keys) {
    if (keys == null) {
        return str;
    }
    for (var i = 0; i < keys.length; i++) {
        str = str.replace(new RegExp(keys[i],"gm"), "<em>" + keys[i] + "</em>");
    }
    return str;
}
function subFileName(fileName) {
    if (fileName.length > 35) {
        var fixTag = fileName.split(".")[fileName.split(".").length - 1];
        var fixFilename1 = fileName.substr(0, 10);
        var fixFilename2 = fileName.substr((fileName.lastIndexOf(".") - 10), 11);
        return fixFilename1 + "..." + fixFilename2 + fixTag
    } else {
        return fileName
    }
}
function inputSearch(e) {
    if (e == 13) {
        superSearchFirstPage();
    }
}
function superSearchFirstPage() {
    $("#form").find("#currentPage").val("1");
    doGVSunSearch();
}
function initPageFoot(currPage, totalPages) {
    $("#pageFoot").empty();
    if (currPage != 1) {
        $("#pageFoot").append("<a class='n'onclick='goToLastPage()'><上一页</a>");
    }
    var startPage = 1;
    var endPage = totalPages;
    if (currPage > 4) {
        startPage = currPage - 4;
        if (totalPages > currPage + 5) {
            endPage = currPage + 5;
        }
    } else {
        if (totalPages > 10) {
            endPage = 10;
        }
    }
    for (var i = startPage; i <= endPage; i++) {
        $("#pageFoot").append("<a><span class='pc" + (i == currPage?" selected_pc'":"' onclick='goToThisPage(this)'")+" >" + i + "</span></a>");
    }
    if (currPage < totalPages) {
        $("#pageFoot").append("<a class='n' onclick='goToNextPage()'>下一页></a>");
    }
}
function goToThisPage(obj) {
    $("#form").find("#currentPage").val($(obj).text());
    doGVSunSearch();
}
function goToNextPage() {
    $("#form").find("#currentPage").val((parseInt($("#form").find("#currentPage").val())+1));
    doGVSunSearch();
}
function goToLastPage() {
    $("#form").find("#currentPage").val((parseInt($("#form").find("#currentPage").val()) - 1));
    doGVSunSearch();
}
function subTitle(str) {
    if (str.length > 35) {
        return str.substring(0, 35) + "...";
    } else {
        return str;
    }
}
function setSearchType(obj) {
    $(obj).addClass("type_select").siblings().removeClass("type_select");
    $("#type").val($(obj).index());
    doGVSunSearch();
}