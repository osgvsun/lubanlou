var siteName;
var beforeUpLoad;
var afterUpLoad;
var beforeMkdir;
var afterMkdir;
var beforeMkfiletabel;
var afterMkfiletabel;
var sortType;
var dirSelecter;
var fileSelecter;
var getCnameUrl;
var cnames;
var fileBoxCurrentPage = 1;
var fileBoxPageSize = 6;
var selectFileid;
var allowUload;
var allowDelete;
var beforeNewDirectory;
var afterNewDirectory;
var searchUsernameUrl;
var dirTool = false;
var beforeRenameDir;
var fileType;
var fileConfirm;
var afterRenameDir;
var afterDeletDir;
var multifilelist;
var multifileerror;
$(function() {
    console.log("Welcome to use the ResourceContainer plug-in @@ Author:林志威 @@ Version:2.0.1")
});
function initResourceContainer(initJson) {
    $(initJson.content).addClass("rc_line_sum");
    if (initJson.cnameUrl != null) {
        getCnameUrl = initJson.cnameUrl
    }
    if (initJson.searchUserUrl != null) {
        searchUsernameUrl = initJson.searchUserUrl
    }
    if (initJson.beforeMkdir != null) {
        beforeMkdir = initJson.beforeMkdir
    }
    if (initJson.afterMkdir != null) {
        afterMkdir = initJson.afterMkdir
    }
    if (initJson.beforeMkfiletabel != null) {
        beforeMkfiletabel = initJson.beforeMkfiletabel
    }
    if (initJson.beforeNewDirectory != null) {
        beforeNewDirectory = initJson.beforeNewDirectory
    }
    if (initJson.afterMkfiletabel != null) {
        afterMkfiletabel = initJson.afterMkfiletabel
    }
    if (initJson.afterNewDirectory != null) {
        afterNewDirectory = initJson.afterNewDirectory
    }
    if (initJson.beforeRenameDir != null) {
        beforeRenameDir = initJson.beforeRenameDir
    }
    if (initJson.afterRenameDir != null) {
        afterRenameDir = initJson.afterRenameDir
    }
    if (initJson.afterDeletDir != null) {
        afterDeletDir = initJson.afterDeletDir
    }
    if (initJson.dirTool != null) {
        dirTool = initJson.dirTool
    }
    if (initJson.allowDelete != null) {
        allowDelete = initJson.allowDelete
    }
    if (initJson.dirSelecter != null) {
        dirSelecter = initJson.dirSelecter
    }
    if (initJson.fileSelecter != null) {
        fileSelecter = initJson.fileSelecter
    }
    if (initJson.fileConfirm != null) {
        fileConfirm = initJson.fileConfirm
    }
    if (initJson.fileType != null) {
        fileType = initJson.fileType
    }
    if (initJson.allowUload != null) {
        allowUload = initJson.allowUload
    }
    $("<div class='rc_page' "+((initJson.pageSize!=null && initJson.currentPage!=null)?"":"style='display:none;'")+"><div class=\"rc_page_info\" pageSize='"+(initJson.pageSize!=null?initJson.pageSize:20)+"' currentPage='"+(initJson.currentPage=null?initJson.currentPage:1)+"'><span id='rc_totalRecords'></span>条记录 • 共<span id='rc_totalPages'></span>页</div><a class=\"rc_page_btn\" onclick='firstPage(null,this)'>首页</a><a class=\"rc_page_btn\"onclick='prePage(this)'>上一页</a><div class=\"rc_page_select\"><span>第</span><input id='rc_goto' type=\"text\" onkeypress='thisPage(event.keyCode||event.which,this)' value='1'/><span>页</span></div><a class=\"rc_page_btn\" onclick='thisPage(null,this)'>跳转</a><a class=\"rc_page_btn\" onclick='nexPage(this)'>下一页</a><a class=\"rc_page_btn\" onclick='lasPage(this)'>末页</a></div>").insertAfter($(initJson.content));
    sortType = initJson.sortType;
    if(dirTool){
        $(initJson.content).append("<div class='rc_dir_tool_sum'><button class=\"fa \" title=\"新建子目录\" onclick='createNewDirectory(this)'>✚</button></div>")
    }
    $("<div class='rc_tool_box'><label>文件夹名称<input id=\"rc_searchTagTitle\" type=\"text\" onKeyPress=\"doSearch(event.keyCode||event.which,this)\"/></label><label>文件名称<input id=\"rc_searchFileName\" type=\"text\" onKeyPress=\"doSearch(event.keyCode||event.which,this)\"/></label><label>上传时间从<input type=\"date\" id=\"rc_searchStartTime\" onKeyPress=\"doSearch(event.keyCode||event.which,this)\"/>到<input type=\"date\" id=\"rc_searchEndTime\" onKeyPress=\"doSearch(event.keyCode||event.which,this)\"/></label><label class=\"rc_submit_person\">上传人<input id=\"rc_searchCreaterUserName\" type='hidden'/><input id=\"rc_searchCreaterUserCname\" type='hidden'/><input id=\"rc_searchCreaterUserNameShow\" type=\"text\" oninput='searchUsers(this)' onKeyPress=\"doSearch(event.keyCode||event.which,this)\"/><input type=\"button\" value=\"×\" onclick='clearInput(this)' title=\"点击不选择上传人\"/><div id='rc_selectUser' style='display:none;overflow-y: auto; overflow-x:hidden;position: absolute;left:0px;top:32px;width: 200px;height: 300px;z-index:100;border: 1px solid #e4e5e7;background-color: white;'></div></label><input type=\"button\" value=\"查询\" onclick=\"firstPage(null,$(this).parent().next().next().children(':first-child').next())\"/><input style='margin-left: 10px;' type=\"button\" value=\"取消\" onclick=\"location.reload(true)\"/>"+(fileConfirm==1?"<input style='margin-left: 10px;' type=\"button\" value=\"确定\" onclick=\"confirmDirectSelect('resourceFile')\"/>":"")+"</div>").insertBefore($(initJson.content));
    getDirectoryId({
        directoryNames:initJson.basicNames,
        type:1,
        success:function(data){
            $(initJson.content).attr("data",data);
            getTagContext($(initJson.content),data,initJson.currentPage,initJson.pageSize);
        }
    });
}
function initUploadWindow(initJson) {
    allowUload=true;
    if (initJson.cnameUrl != null) {
        getCnameUrl = initJson.cnameUrl
    }
    if(initJson.beforeUpLoad !=null){
        beforeUpLoad=initJson.beforeUpLoad;
    }
    if(initJson.afterUpLoad !=null){
        afterUpLoad=initJson.afterUpLoad;
    }
    $("#rc_upLoadWindow").append(`
     <div class="rc_popup_fix">
     <span class="rc_fb_show_btn" onclick="showFilebox()"><</span>
     <div id='rc_fileBoxSelector' method="post"  class="rc_file_box" onclick="getTop(this)">
     <div class="rc_fb_tit">
     <span class="rc_fb_btn" onclick="showFilebox()">></span>文件选择器</div>
     <div class="rc_fb_tool"><form id='rc_fileBoxForm'>
     <label>文件名称<input class='res' style='width:130px;' id='rc_fileBoxSearchFileName' name="fileName" type="text" onKeyPress="doFileBoxSearch(event.keyCode||event.which)"/></label>
     <label class="rc_submit_person">上传人
     <input class='res' name="creater" type='hidden'/>
     <input class='res'  id='rc_fileBoxSearchCname' type='hidden'/>
     <input  class='res' style='width:140px;' type="text" oninput='searchUsers(this)' onKeyPress="doFileBoxSearch(event.keyCode||event.which)"/>
     <input type="button" value="×" onclick='clearInput(this)' title="点击不选择上传人"/>
     <div  style='display:none;overflow-y: auto; overflow-x:hidden;position: absolute;right: 40px;top: 45px;width: 200px;height: 150px;z-index:100;border: 1px solid #e4e5e7;background-color: white;'></div>
     </label>
     <label>上传时间从
     <input class='res' style='width:150px;' type="date" name="startTime" onKeyPress="doFileBoxSearch(event.keyCode||event.which)"/>到<input class='res' style='width:150px;' type="date" name="endTime" onKeyPress="doFileBoxSearch(event.keyCode||event.which)"/></label>
     <input style='float:right;margin-left: 10px;' onclick='clearFileSelectBox()' type="button" value="取消"/>
     <input style='float:right;' type="button" value="查询" onclick="firstPage(function() { fileBoxCurrentPage=1;searchFileBox();})"/>
     </form>
     </div>
     <div class="rc_fb_content">
     <div id = 'rc_fbCardTable' class="rc_fb_content_scroll rc_scrollbar"></div>
     </div>
     <div class="rc_page rc_fb_page">
     <a class="rc_page_btn" onclick='firstPage(function() { fileBoxCurrentPage=1;searchFileBox();})'>首页</a>
     <a class="rc_page_btn" onclick='fileBoxPrevPage()'>上一页</a>
     <a class="rc_page_btn" onclick='fileBoxNexPage()'>下一页</a>
     <a class="rc_page_btn" onclick="fileBoxLastPage()">末页</a>
     <div><div class="rc_page_info"><span id='rc_fileBoxTotalRecords'></span>条记录 • 共<span id='rc_fileBoxTotalPage'></span>页</div><div class="rc_page_select"><span>第</span><input id='rc_fileBoxGoTO' onKeyPress="fileBoxThisPage(event.keyCode||event.which)" style='color:#62a8d1;' type="text" /><span>页</span></div><a class="rc_page_btn" onclick='fileBoxThisPage()'>跳转</a></div></div></div>
     <div class="rc_popup" onclick="getTop(this)">
     <div class="rc_popup_tit">上传文件<input type="button" value="×"  onclick='closeopenUploadWindow()' title="关闭"/></div>
     <div class="rc_popup_content">
     <div class="rc_popup_line">
     <label>目标目录</label>
     <input id='rc_directoryId' name='directoryId' type="hidden"/>
     <input id='rc_fileTag1' name='fileTag1' type="hidden"/>
     <input name='username'  type="hidden" value='`+initJson.username+`'/>
     <input name='siteName' id='rc_uploadSiteName'  type="hidden"/>
     <input id='rc_publicState' name='publicState'  type="hidden" value='0'/>
     <input id='rc_uploadTitle' name='targetTitle' type="text" readonly='readonly'/></div>
     <div class="rc_popup_line" style='margin-top: 10px;'><label>共享状态:</label>
     <input type='checkbox' onclick='publicAllSite(this)'/>
     全网共享
     <input type='checkbox' style='margin-left: 20px;' onclick='publicMySite(this)'/>
     本站共享</div>
     <div ondrop="fileCardDrop(event)"ondragover="allowDrop(event)" style='display: none;' class="rc_popup_line" id='rc_noneFileBoxSelect'>
     <div><label>上传文件</label>
     <input type="file" name='file' id="rc_browsefile" style="visibility:hidden;" onchange="rc_filepath.value=this.value"/>
     <input type="textfield" id="rc_filepath" placeholder="未选择任何文件" readonly="readonly"/>
     <input type="button" id="rc_filebutton" value="✚ 添加文件" onclick="rc_browsefile.click()"/>
     </div>
     <div class="rc_progress_bar"><div id="rc_uploadBar" class="rc_uploadBar" style='width: 0%;'>
     <label id="rc_upPercent" class="rc_upPercent">0%</label></div></div></div>
     <div class="rc_popup_line" style='display: none; overflow-y: auto; overflow-x: hidden;height:170px;margin-top: 0;' id='rc_doFileBoxSelect'></div>
     <div id='rc_multiFilesSelect'>
     <div class="rc_popup_line">
						<input type="file" multiple="multiple" id="rc_files" hidden onchange="showUpFiles();"/>
						<div class="rc_addfiles_btn" onclick="rc_files.click()">添加文件</div>
					</div>
     <div class="rc_popuptab_line">
						<table class="rc_line_tab" id="rc_line_tab">
							<thead>
								<tr>
									<th>文件名</th>
									<th>进度</th>
									<th>状态</th>
									<th>操作</th>
								</tr>
							</thead>
							<tbody></tbody>
						</table>
					</div>
</div>
     <div class="rc_popup_btn">
     <input type="button" onclick='checkUploadType()' value="上传"/>
     <input type="button" onclick='closeopenUploadWindow()' value="取消"/>
     </div></div></div>`);
    searchFileBox();
    $("body").append("<div id='rc_messageBox' style='display:none;'  class=\"rc_popup_fix\"><div id='rc_messageSize' class=\"rc_popup\"><div id='rc_messageTitle' class=\"rc_popup_tit\"></div><div id='rc_messageContent' class=\"rc_popup_content\"></div></div></div>")
}
function getTag(obj) {
    $(obj).append("<p>正在获取目录下的数据...</p>");
    getTagContext($(obj),$(obj).attr("id").substring(4),null,null);
    $($(obj).prev().children().get(0)).attr("state", "get").click()
}
function getTagContext(obj,directoryId,currentPage,pageSize) {
    getDirectoryChildren({
        parentId:directoryId,
        type:1,
        sortType:sortType,
        currentPage:currentPage,
        pageSize:pageSize,
        success:function (data) {
            if($(obj).text()=="搜索中..."){
                $(obj).empty();
            }
            setTimeout(function () {
                $(obj).children("p").remove();
            },500);
            if($(obj).hasClass("rc_line_sum")){
                $(obj).next().children(".rc_page_info").children(":first-child").text(data.totalRecords).next().text(data.totalPages);
            }
            $.each(data.directorys,function (index,directory) {
                mkdir($(obj),directory.directoryName,directory.directoryId);
            });
        }
    });
    getFilesByDirectoryID($(obj),directoryId);
}
function getFilesByDirectoryID(obj,directoryId,successFunc) {
    $.ajax({
        url:resourceContainerHost+"/getFilesByDirectoryID?directoryId="+directoryId,
        type:"Get",
        dataType:"json",
        success:function (data) {
            if(successFunc!=null){
                successFunc(data);
            }else{
                if($(obj).text()=="搜索中..."){
                    $(obj).empty();
                }
                var array=new Array();
                $.each(data,function (index,file) {
                    array.push(file.fileCreater);
                });
                getCname(array);
                $.each(data,function (index,file) {
                    mkfiletable($(obj),file.fileName,file.id,file.upTime,cnames[index]);
                });
            }
        }
    });
}
function mkdir(obj, dirName, dirID, isGot) {
    if ($(obj).find("#rc_t" + dirID).length > 0) {
        return
    }
    if (beforeMkdir != null) {
        var doMk = beforeMkdir(obj, dirName, dirID, isGot);
        if (doMk == false) {
            return
        }
    }
    var tagtitle = dirName;
    var flagObj = $(obj).hasClass("rc_line_sum")?$(obj).prev():$(obj).parents(".rc_line_sum").prev();
    var flag = $(flagObj).find("#rc_searchTagTitle").val();
    if (flag != null) dirName = linlight(dirName, flag, "lightBlue");
    var dirString = "<div class=\"rc_line_box\"><div class=\"rc_main_line rc_head_line" + (isGot == "get" ? " rc_head_line_select": "") + "\"> <label onclick=\"slidLable(this)\" class=\"fa fa-folder-o\" state='" + (isGot == null ? "": isGot) + "'><span>" + dirName + "</span></label>"+(allowUload?"<div class='rc_inline_tool'>"+(dirSelecter==1?"<input  value=\"选择当前目录\" type=\"button\" onclick='confirmDirectSelector(this)'/>":"")+(sortType==null?"<button class=\"fa \" title=\"上移\" onclick='moveUp(this)'>↑</button><button class=\"fa \" title=\"下移\" onclick='moveDown(this)'>↓</button>":"")+(dirTool?"<button class=\"fa \" title=\"修改目录名\" onclick='changeDirectoryName(this)'>✎</button><button class=\"fa \" title=\"新建子目录\" onclick='createNewDirectory(this)'>✚</button><button  class=\"fa rc_delete_dir\" title=\"删除目录\" onclick='deletDir(this)'></button>":"")+"<button class=\"fa fa-upload\" title=\"上传资源\" onclick='openUploadWindow(this)' multi='true'></button></div>":"")+"</div><div id=\"rc_t" + dirID + "\" tagTitle='" + tagtitle + "' class=\"rc_sub_line_box_limit\"></div></div>";
    if($(obj).children(".rc_sub_line_tab").length>0){
        $(dirString).insertBefore($(obj).children(".rc_sub_line_tab"));
    }else{
        $(obj).append(dirString);
    }
    if (afterMkdir != null) {
        afterMkdir(obj, dirName, dirID, isGot)
    }
}
function mkfiletable(obj, filename, fileId, uptime, creater) {
    if (beforeMkfiletabel != null) {
        var doMk = beforeMkfiletabel(obj, filename, fileId, uptime, creater);
        if (doMk == false) {
            return
        }
    }
    var flagObj = $(obj).hasClass("rc_line_sum")?$(obj).prev():$(obj).parents(".rc_line_sum").prev();
    var flag = $(flagObj).find("#rc_searchFileName").val();
    if (!$(obj).children(".rc_sub_line_tab").length > 0) {
        $(obj).append("<div class=\"rc_sub_line_tab\"><table><thead><th>附件名称</th><th>详细信息</th>"+(fileSelecter==1?"<th>操作</th>":"")+(allowDelete?"<th>操作</th>":"")+"</thead><tbody></tbody></table></div>")
    }
    $(obj).find(".rc_sub_line_tab table tbody").append("<tr><td><a onclick='downLoadFile("+fileId+")'>" + linlight(filename, flag, "orange") + "</a></td><td>于" + uptime.substring(0, uptime.length - 2) + "由" + linlight(creater, $(flagObj).find("#rc_searchCreaterUserCname").val(), "orange") + "上传</td>"+(fileSelecter==1?"<td><a onclick='addSelectedTable(\""+filename+"\",\""+fileId+"\",\""+ uptime+"\",\""+creater+"\",this)'>添加</a></td>":"")+(allowDelete?"<td><a onclick='deleteThisFile("+fileId+",this)'>删除</a></td>":"")+"</tr>");
    if (afterMkfiletabel != null) {
        afterMkfiletabel(obj, filename, fileId, uptime, creater)
    }
}
function slidLable(obj) {
    if ($(obj).attr("state") == "get") {
        $(obj).parent().siblings(".rc_sub_line_box_limit").slideToggle();
        var theClass = $(obj).parent().attr("class");
        if (theClass.indexOf(" rc_head_line_select") == -1) {
            theClass += " rc_head_line_select"
        } else {
            theClass = theClass.replace(" rc_head_line_select", "")
        }
        $(obj).parent().attr("class", theClass)
    } else if ($(obj).attr("state") == "loading") {
        alert("该目录下文件过多，正在加载，请稍后！")
    } else {
        $(obj).attr("state", "loading");
        getTag($(obj).parent().next())
    }
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
function linLightLine(obj, color) {
    $(obj).css("background-color", color)
}
function linlight(str, flag, color) {
    if(flag == null){
        return str;
    }
    var flags = flag.split(" ");
    for (var i = 0; i < flags.length; i++) {
        str = str.replace(flags[i], "<span style='background-color: " + color + "'>" + flags[i] + "</span>")
    }
    return str
}
function mkfbcard(fileid, filename, fileurl, uptime, creater, tag) {
    var nameFlag = $("#rc_fileBoxSearchFileName").val();
    var cnameFlag = $("#rc_fileBoxSearchCname").val();
    var flagClass = "";
    if (fileid == selectFileid) {
        flagClass = " rc_file_select"
    }
    if (tag == "") {
        tag = "回收站"
    }
    $("#rc_fbCardTable").append("<div id='rc_filecard" + fileid + "' ondragstart='fileCardDrag(event)' draggable=\"true\" data='" + fileid + "' class=\"rc_fb_card" + flagClass + "\"><table><tr><th>文件名称：</th><td><a onclick='downLoadFile("+fileid+")'>" + linlight(filename, nameFlag, "orange") + "</a></td></tr><tr><th>文件目录：</th><td class='directory_name'>" + tag + "</td></tr><tr><th>文件信息：</th><td>于" + uptime + "由" + linlight(creater, cnameFlag, "orange") + "上传</td></tr><tr><td colspan=\"2\"><div type='button' class=\"rc_file_btn\" title=\"选择文件\" onclick='selectFile(this)'></div></td></tr></table></div>")
}
function doFileBoxSearch(e) {
    if (e == 13) {
        fileBoxCurrentPage = 1;
        searchFileBox()
    }
}
function getCname(array) {
    if(getCnameUrl==null){
        cnames = array;
        return;
    }
    $.ajax({
        url: getCnameUrl + "?usernames=" + array,
        dataType: "json",
        type: "GET",
        async: false,
        success: function(data) {
            cnames = data
        }
    })
}
function searchFileBox() {
    $.ajax({
        url: resourceContainerHost + "/searchFileSelect?currentPage=" + fileBoxCurrentPage + "&pageSize=" + fileBoxPageSize + "&username=" +$("#rc_fileTag1").next().val()+"&siteName="+siteName+"&"+$("#rc_fileBoxForm").serialize(),
        type: "GET",
        dataType: "json",
        success: function(data) {
            $("#rc_fileBoxTotalRecords").text(data.totalRecord);
            $("#rc_fileBoxTotalPage").text(data.totalPage);
            $("#rc_fileBoxGoTO").val(fileBoxCurrentPage);
            getCname(data.usernames);
            $("#rc_fbCardTable").empty();
            $.each(data.resourceFiles,
                function(index, value) {
                    mkfbcard(value.id, value.fileName, value.url, value.upTime, cnames[index], value.directoryId)
                    if(value.directoryId !="回收站"){
                        getDirectoryPathInfoById({
                            directoryId:value.directoryId,
                            type:1,
                            success:function (direct) {
                                var tagFlag = $("#rc_fileBoxSearchTag").val();
                                $("#rc_filecard"+value.id).find(".directory_name").html(linlight(direct.nameList, tagFlag, "lightblue"))
                            }
                        });
                    }
                })
        }
    })
}
function fileBoxNexPage() {
    var totalPage = parseInt($("#rc_fileBoxTotalPage").text());
    if (fileBoxCurrentPage < totalPage) {
        fileBoxCurrentPage += 1;
        searchFileBox()
    }
}
function fileBoxPrevPage() {
    if (fileBoxCurrentPage > 1) {
        fileBoxCurrentPage -= 1;
        searchFileBox()
    }
}
function fileBoxLastPage() {
    fileBoxCurrentPage = parseInt($('#rc_fileBoxTotalPage').text());
    searchFileBox()
}
function fileBoxThisPage(e) {
    if (e != null) {
        if (e != 13) {
            return
        }
    }
    var thispage = parseInt($("#rc_fileBoxGoTO").val());
    var totalPage = parseInt($("#rc_fileBoxTotalPage").text());
    if (testThisPage(thispage, totalPage)) {
        fileBoxCurrentPage = thispage;
        searchFileBox()
    }
}
function selectFile(obj) {
    if($("#rc_multiFilesSelect").css("display")!="none"){
        let card = $(obj).parent().parent().parent().parent().parent();
        let fname = $(card).find("tbody").children(":first-child").find("a").text();
        let fileId = $(card).attr("data");
        $('#rc_line_tab tbody').append('<tr id="rc_'+fname+'" uType="apply" fileId="'+fileId+'"><td class="rc_tl">' + fname + '</td><td class="rc_pb"><div class="rc_progress_bar"><div class="rc_uploadBar" style="width: 0%"></div></div></td><td class="rc_st"><font class="rc_success" style="display: none">✔</font><font class="rc_fail" style="display: none">×</font></td><td><div class="rc_upload" onclick="doApply('+fileId+',\'' + fname + '\')">上传</div><div class="rc_remove" onclick="removeMultiFile()">移除</div></td></tr>');
    }else{
        $(obj).parent().parent().parent().parent().parent().siblings(".rc_fb_card").removeClass("rc_file_select");
        $("#rc_noneFileBoxSelect").css("display", "none");
        $("#rc_doFileBoxSelect").empty();
        selectFileid = $(obj).parent().parent().parent().parent().parent(".rc_fb_card").addClass("rc_file_select").attr("data");
        $(obj).parent().parent().parent().parent().parent(".rc_fb_card").clone().addClass("rc_file_select_left").appendTo("#rc_doFileBoxSelect");
        $("#rc_doFileBoxSelect").css("display", "block");
        $("#rc_doFileBoxSelect").children().removeAttr("id").find(".rc_file_btn").attr("title", "取消选择").attr("onclick", "clearSelect(this)")

    }
}
function clearSelect(obj) {
    $("#rc_noneFileBoxSelect").css("display", "block");
    $("#rc_doFileBoxSelect").css("display", "none");
    $.each($("#rc_fbCardTable").children(),
        function(index, obj) {
            $(obj).removeClass("rc_file_select")
        });
    selectFileid = null
}
function clearFileSelectBox() {
    $("#rc_fileBoxForm").find(".res").val("");
    fileBoxCurrentPage = 1;
    searchFileBox()
}
function setDownloadHref(obj, fileId,renameObj) {
    getFile({
        fileId:fileId,
        success: function(data) {
            $(obj).attr("href", data.url + "?filename=" + subFileName(data.fileName));
            if(renameObj!=null){
                $(renameObj).text(data.fileName);
            }
        }
    })
}
function fileCardDrag(ev) {
    ev.dataTransfer.setData("CardId", ev.target.id)
}
function fileCardDrop(ev) {
    ev.preventDefault();
    selectFile($("#" + ev.dataTransfer.getData("CardId")).find(".rc_file_btn"))
}
function allowDrop(ev) {
    ev.preventDefault()
}
function openUploadWindow(obj) {
    if($(obj).attr("multi")=="true"){
        multifilelist = new Map();
        $("#rc_noneFileBoxSelect").css("display","none");
        $("#rc_doFileBoxSelect").css("display","none");
        $("#rc_multiFilesSelect").css("display","block");
    }else{
        $("#rc_noneFileBoxSelect").css("display","block");
        $("#rc_doFileBoxSelect").css("display","none");
        $("#rc_multiFilesSelect").css("display","none");
    }
    obj = $(obj).parent();
    var directoryId= $(obj).parent().next().attr("id").substring(4);
    getDirectoryPathInfoById({
        directoryId:directoryId,
        type:1,
        success:function (data) {
            $("#rc_uploadTitle").val(data.nameList);
            $("#rc_uploadSiteName").val(data.nameList.split("/")[0]);
            $("#rc_directoryId").val(directoryId);
            $("#rc_upLoadWindow").css("display", "block");
            if(window.screen.width>420){
                showFilebox();
            }
        }
    });

}
function openUploadWindowByPath( pathTitle,size,versionFlag,e) {
    var directorySize=2000;
    if(size!=null){
        directorySize=size
    }
    e = e|| window.event;
    if($(e.target).attr("multi")=="true"){
        multifilelist = new Map();
        $("#rc_noneFileBoxSelect").css("display","none");
        $("#rc_doFileBoxSelect").css("display","none");
        $("#rc_multiFilesSelect").css("display","block");
    }else{
        $("#rc_noneFileBoxSelect").css("display","block");
        $("#rc_doFileBoxSelect").css("display","none");
        $("#rc_multiFilesSelect").css("display","none");
    }
    if(versionFlag!=null){
        alert("api发生更新，您使用的是旧的api");
        return;
    }
    getDirectoryId({
        directoryNames:pathTitle,
        directorySize:directorySize,
        type:1,
        success:function (data) {
            $("#rc_uploadTitle").val(pathTitle);
            $("#rc_uploadSiteName").val(pathTitle.split("/")[0]);
            $("#rc_directoryId").val(data);
            resetUpPercent();
            $("#rc_upLoadWindow").css("display", "block");
            if(window.screen.width>420){
                showFilebox();
            }
        }
    });
}
function resetUpPercent(){
    document.getElementById("rc_uploadBar").style.width = "0%";
    $("#rc_upPercent").text("0%");
}
function closeopenUploadWindow() {
    $("#rc_filepath").val("");
    $("#rc_browsefile").val("");
    $("#rc_upLoadWindow").css("display", "none");
    $("#rc_fileBoxSelector").css("display", "none");
    $("#rc_messageBox").css("display", "none")
}
function checkUploadType() {
    if($("#rc_multiFilesSelect").css("display")!="none"){
        $(".rc_addfiles_btn").css("display","none");
        $.each($("#rc_line_tab").children("tbody").children(),function (index,object) {
            if($(object).find(".rc_success").css("display")==$(object).find(".rc_fail").css("display")){
                let filename = $(object).attr("id").substring(3);
                if($(object).attr("uType")=="apply"){
                    doApply($(object).attr("fileId"),filename);
                }else{
                    doUpload(filename);
                }
            }
        });
    }else{
        doUpload()
    }
}
function doUpload(multiFileName) {
    if($("#rc_publicState").parent().next().children().get(1).checked){
        $("#rc_publicState").val(2);
    }else if($("#rc_publicState").parent().next().children().get(2).checked){
        $("#rc_publicState").val(1);
    }else{
        $("#rc_publicState").val(0);
    }
    let filename = multiFileName;
    let filesize = 0;
    let name = filename;
    if(multiFileName!=null){
        filesize=multifilelist.get(multiFileName).size;
    }else{
        if ($("#rc_noneFileBoxSelect").css("display") == "none") {
            doApply($("#rc_doFileBoxSelect").children().attr("data"));
            return
        }
        filename = $("#rc_filepath").val();
        name = filename.split("\\")[filename.split("\\").length - 1];
        filesize = document.getElementById("rc_browsefile").files[0].size;
    }
    // 判断文件格式
    if(!checkSuffix(filename)){
        multifileerror++;
        return false;
    }
    $.ajax({
        url: resourceContainerHost + "/checkFile?filename=" + name + "&size=" + filesize,
        type: "GET",
        dataType: "json",
        success: function(data) {
            if (data.nofile == "nofile") {
                uLoad(multiFileName)
            } else {
                $("#rc_messageSize").css("width", "1200px");
                $("#rc_messageTitle").empty();
                $("#rc_messageTitle").append("<span style='color: #fff;font-size:14px;'>文件服务器发现可能一致的文件，是否直接采用？</span><input type=\"button\" value=\"×\"  onclick='closeopenMessageBox()' title=\"关闭\"/>");
                $("#rc_messageContent").empty();
                $("#rc_messageContent").append("<div id='rc_messageTable' style='overflow-y: auto;overflow-x: hidden;width: 100%;'><table width='100%'><thead><th width='30%'>文件名</th><th width='30%'>文件目录</th><th width='30%'>详细信息</th><th width='10%'>操作</th></th></thead><tbody id='rc_duplicateFiles'></tbody></table></div>");
                getCname(data[0]);
                $.each(data[1],
                    function(index, file) {
                        $("#rc_duplicateFiles").append("<tr onmouseenter='linLightLine(this,\"#ACD6FF\")' onmouseleave='linLightLine(this,\"white\")' style='height: 35px;'><td>" + file.fileName + "</td><td id='rc_checkFile"+file.id+"'>" + file.directoryId + "</td><td>于" + file.upTime.substring(0, file.upTime.length - 2) + "由" + cnames[index] + "上传</td><td><input type='button' style='background-color: #fff;border:1px solid #62a8d1;color: #62a8d1;font-size:14px;letter-spacing:2px;border-radius:3px;' value='采用' onclick='doApply(" + file.id +(multiFileName==null?"":",\""+multiFileName+"\"")+")'/></td></tr>");
                        if(file.directoryId!="回收站"){
                            getDirectoryPathInfoById({
                                directoryId:file.directoryId,
                                type:1,
                                success:function (direct) {
                                    $("#rc_checkFile"+file.id).text(direct.nameList);
                                }
                            });
                        }
                    });
                $("#rc_messageContent").append("<input type='button' style='background-color: #62a8d1;border:1px solid #62a8d1;color: #fff;font-size:14px;letter-spacing:2px;border-radius:3px;float: right;margin-top: 20px;' onclick='notApply("+(multiFileName==null?"":"\""+multiFileName+"\"")+")' value='不采用'/>");
                $("#rc_messageBox").css("display", "block");
                var tableHeight = parseInt($("#rc_messageTable").height());
                var height = tableHeight + 180;
                if (height > 600) {
                    height = 600;
                    $("#rc_messageTable").css("height", "460px")
                }
                $("#rc_messageSize").css("height", height + "px")
            }
        },
        error: function() {
            multifileerror++;
            alert("网络连接异常！")
        }
    })
}
function notApply(multiFileName) {
    $("#rc_messageBox").css("display", "none");
    uLoad(multiFileName)
}
function checkSuffix(filename) {
    if (filename == "") {
        alert("请选择上传文件");
        return false
    }
    if (filename.lastIndexOf('.') == -1) {
        alert("不支持无后缀名的文件！");
        return false
    }
    //uploadtype------>视频=1，图片=2，参考文献=3，pdf=4
    var uploadtype=$("#rc_type").val();
    var type = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
    var realFileName = filename.substring(filename.lastIndexOf('\\') + 1,filename.lastIndexOf('.'));
    let fileNameRegx = /^[\u4e00-\u9fa5_\.\{\}\｛\｝\【\】\[\]\(\)\（\）\-\w\s]+$/;
    var firstcheck = /^[0-9a-zA-Z]+$/;
    var imageregx = /(jpg|gif|png|jepg)$/;
    var videoregx = /(mp4|avi|wmv|rmvb)$/;
    var pdfregx = /(pdf)$/;
    if (!firstcheck.test(type)) {
        alert(filename+" 文件后缀异常！");
        return false
    }
    if (!fileNameRegx.test(realFileName)) {
        alert(filename+" 文件名不能包含特殊字符！目前允许的字符为：大中小括号、下划线、减号、小数点");
        return false
    }
    if(uploadtype==1 || uploadtype==203){
        if (videoregx.test(type)){
            $("#rc_fileTag1").val("video");
            return true;
        }else{
            alert("视频格式错误");
            closeopenUploadWindow();
            return false;
        }
    }else if(uploadtype==2 || uploadtype==202){
        if (imageregx.test(type)){
            $("#rc_fileTag1").val("image");
            return true;
        }else{
            alert("图片格式错误");
            closeopenUploadWindow();
            return false;
        }
    }else if(uploadtype == 4){
        if (pdfregx.test(type)){
            $("#rc_fileTag1").val("pdf");
            return true;
        }else{
            alert("只能上传pdf格式文件");
            closeopenUploadWindow();
            return false;
        }
    }else {
        if (imageregx.test(type)) {
            $("#rc_fileTag1").val("image");
        } else if (videoregx.test(type)) {
            $("#rc_fileTag1").val("video");
        } else if(pdfregx.test(type)){
            $("#rc_fileTag1").val("pdf");
        }else {
            $("#rc_fileTag1").val("file");
        }
    }
    return true;
}
function doApply(fileId,multiFileName) {
    $("#rc_fileTag1").val("");
    var form = new FormData(document.getElementById("rc_upLoadWindow"));
    if(multiFileName!=null){
        form.set("fileName",multiFileName);
    }else{
        if($("#rc_noneFileBoxSelect").css("display")=="none"){
            form.set("fileName",$("#rc_doFileBoxSelect").find("tbody").children(":first-child").find("a").text());
        }else{
            form.set("fileName",form.get("file").name);
        }
    }
    //判断文件类型开始
    var filename = form.get("fileName");
    if(!checkSuffix(filename)){
        return false;
    }
    //判断文件类型结束

    if (beforeUpLoad != null) {
        var bfu = beforeUpLoad(form, fileId);
        if(bfu!=null && !bfu){
            return;
        }
    }
    $.ajax({
        url: resourceContainerHost + "/applyFile?fileId=" + fileId + "&" + $("#rc_upLoadWindow").serialize(),
        type: "GET",
        success: function() {
            setUpTime({
                directoryId:$("#rc_directoryId").val(),
                type:1
            });
            if(multiFileName!=null){
                $("#rc_messageBox").css("display", "none")
                $(document.getElementById("rc_"+multiFileName)).find(".rc_uploadBar").css("width","100%");
                $(document.getElementById("rc_"+multiFileName)).find(".rc_success").css("display","block");
                $(document.getElementById("rc_"+multiFileName)).find(".rc_fail").css("display","none");
            }else{
                $("#rc_upLoadWindow").css("display", "none");
                $("#rc_fileBoxSelector").css("display", "none");
                $("#rc_messageBox").css("display", "none")
            }
            if (afterUpLoad != null) {
                afterUpLoad(form, "applysuccess", fileId)
            } else if(multiFileName==null){
                alert("上传成功！");
                location.reload(true)
            }
        },
        error: function() {
            if (afterUpLoad != null) {
                afterUpLoad(form, "applyerror")
            }
            if(multiFileName!=null){
                multifileerror++;
                alert(multiFileName+"采用失败！");
            }else{
                alert("网络异常！")
            }
        }
    })
}
function uLoad(multiFileName) {
    var form = new FormData(document.getElementById("rc_upLoadWindow"));
    if(multiFileName!=null){
        form.set("fileName",multiFileName);
        form.set("file",multifilelist.get(multiFileName));
    }else{
        form.set("fileName",form.get("file").name);
    }
    if (beforeUpLoad != null) {
        var bfu = beforeUpLoad(form);
        if(bfu!=null && !bfu){
            return;
        }
    }
    form = new FormData(document.getElementById("rc_upLoadWindow"));
    if(multiFileName!=null){
        form.set("fileName",multiFileName);
        form.set("file",multifilelist.get(multiFileName));
        console.log(multifilelist.get(multiFileName));
    }else{
        form.set("fileName",form.get("file").name);
    }
    console.log(form.get("file"));
    var url = resourceContainerHost + "/uploadFileNew";
    $.ajax({
        url: url,
        type: "POST",
        data: form,
        processData: false,
        contentType: false,
        success: function(data) {
            if("保存失败".indexOf(data) != -1){
                alert(data);
            }
            setUpTime({
                directoryId:$("#rc_directoryId").val(),
                type:1
            });
            if(multiFileName!=null){
                $(document.getElementById("rc_"+multiFileName)).find(".rc_uploadBar").css("width","100%");
                $(document.getElementById("rc_"+multiFileName)).find(".rc_success").css("display","block");
                $(document.getElementById("rc_"+multiFileName)).find(".rc_fail").css("display","none");
            }else{
                $("#rc_upLoadWindow").css("display", "none");
                $("#rc_fileBoxSelector").css("display", "none");
                $("#rc_messageBox").css("display", "none")
            }
            if (afterUpLoad != null) {
                afterUpLoad(form, "success", data)
            }else if(multiFileName==null) {
                alert("上传成功！");
                location.reload(true)
            }
        },
        error: function(data, error, obj) {
            if (afterUpLoad != null) {
                afterUpLoad(form, "error")
            }

            if(multiFileName!=null){
                multifileerror++;
                alert(multiFileName+"上传失败");
                $(document.getElementById("rc_"+multiFileName)).find(".rc_uploadBar").css("width","0%");
                $(document.getElementById("rc_"+multiFileName)).find(".rc_success").css("display","none");
                $(document.getElementById("rc_"+multiFileName)).find(".rc_fail").css("display","block");
            }else{
                alert("上传失败");
                setTimeout(resetUpPercent,
                    50)
            }
        },
        xhr: function() {
            var myXhr = $.ajaxSettings.xhr();
            if (myXhr.upload) {
                myXhr.upload.addEventListener('progress',
                    function(e) {
                        var percent = parseInt(e.loaded / e.total * 100);
                        if(multiFileName!=null){
                            $(document.getElementById("rc_"+multiFileName)).find(".rc_uploadBar").css("width",percent + "%");
                        }else{
                            document.getElementById("rc_uploadBar").style.width = percent + "%";
                            $("#rc_upPercent").text(percent + "%")
                        }
                    },
                    false)
            }
            return myXhr
        }
    })
}
function closeopenMessageBox() {
    $("#rc_messageBox").css("display", "none")
}
function publicAllSite(obj) {
    if(obj.checked){
        $(obj).parent().children().get(2).checked=true;
    }
}
function publicMySite(obj) {
    if(!obj.checked){
        $(obj).parent().children().get(1).checked=false;
    }
}
function moveDown(obj){
    obj = $(obj).parent();
    var index = $(obj).parent().parent();
    if(index.index() != length-1&&index.next().attr("class")!="rc_sub_line_tab"){
        index.next().after(index);
    }
    saveDirSort(index);
}
function moveUp(obj){
    obj = $(obj).parent();
    var index = $(obj).parent().parent();
    if(index.index() != 0){
        index.prev().before(index);
    }
    saveDirSort(index);
}
function saveDirSort(obj){
    var array = new Array();
    $.each($(obj).parent().children(),function (index,dir) {
        if($(dir).attr("class")=="rc_line_box"){
            array.push($.trim($(dir).children(".rc_sub_line_box_limit").attr("id")).substring(4));
        }
    });
    var current = 1;
    var pagesize = -1;
    if($(obj).parent().hasClass("rc_line_sum")){
        if($(obj).parent().next().hasClass("rc_page")){
            pagesize = $(foot).find(".page_info").attr("pageSize");
            current = $(foot).find(".page_info").attr("currentPage");
        }
    }
    changeDirectorySort({
        directories:array.join("/"),
        type:1,
        currentPage:current,
        pageSize:pagesize
    });
}
function firstPage(func,obj) {
    if (func != null) {
        func()
    } else {
        $(obj).next().next().children("input").val(1);
        searchFile($(obj).parent().prev())
    }
}
function prePage(obj) {
    var currpage = parseInt($(obj).next().children("input").val());
    if (currpage == 1) return;
    $(obj).next().children("input").val(currpage-1);
    searchFile($(obj).parent().prev())
}
function nexPage(obj) {
    var totalPages = parseInt($(obj).parent().children(".rc_page_info").children(":first-child").next().text());
    var currpage = parseInt($(obj).prev().prev().children("input").val());
    if (currpage == totalPages) return;
    currpage = currpage + 1;
    $(obj).prev().prev().children("input").val(currpage);
    searchFile($(obj).parent().prev())
}
function lasPage(obj) {
    var totalPages = parseInt($(obj).parent().children(".rc_page_info").children(":first-child").next().text());
    $(obj).prev().prev().prev().children("input").val(totalPages);
    searchFile($(obj).parent().prev())
}
function thisPage(e,obj) {
    if (e != null) {
        if (e != 13) {
            return
        }
    }else{
        obj = $(obj).prev().children("input");
    }
    var thispage = parseInt($(obj).val());
    var totalPages = parseInt($(obj).parent().children(".rc_page_info").children(":first-child").next().text());
    if (testThisPage(thispage, totalPages)) {
        searchFile($(obj).parent().parent().prev())
    }
}
function testThisPage(thisPage, totalPages) {
    var reg = /^[0-9]*$/;
    if (!reg.test(thisPage)) {
        alert("您输入的页码不是数字！");
        return false
    }
    if (thisPage < 1) {
        alert("您输入的页码小于1");
        return false
    }
    if (thisPage > totalPages) {
        alert("您输入的页码大于总页数");
        return false
    }
    return true
}
function searchFile(obj) {
    if($(obj).text()=="搜索中..."){
        alert("正在努力搜索中");
        return;
    }
    $(obj).empty();
    $(obj).text("搜索中...");
    var currentPage = $(obj).next().find("#rc_goto").val();
    var pageSize = $(obj).next().children().attr("pageSize");
    var directoryKey = $(obj).prev().children(":first-child").children("input").val();
    var fileKey = $(obj).prev().children(":first-child").next().children("input").val();
    var startTime = $(obj).prev().children(":first-child").next().next().children("#rc_searchStartTime").val();
    var endTime = $(obj).prev().children(":first-child").next().next().children("#rc_searchEndTime").val();
    var username = $(obj).prev().children(":first-child").next().next().next().children("#rc_searchCreaterUserName").val();
    if(directoryKey==""&&fileKey==""&&startTime==""&&endTime==""&&username==""){
        getTagContext($(obj),$(obj).attr("data"),currentPage,pageSize);
    }else{
        $(obj).next().css("display","block");
        var url = directoryEngineHost+"/search?currentPage="+currentPage+"&pageSize="+pageSize+"&type="+1+"&directoryId="+$(obj).attr("data")+"&directoryKey="+directoryKey+"&fileKey="+fileKey+"&startTime="+startTime+"&endTime="+endTime+"&username="+username;
        $.ajax({
            url:url,
            type:"GET",
            dataType:"json",
            success:function (data) {
                $(obj).empty();
                $(obj).next().find("#rc_totalRecords").text(data.totalRecords);
                $(obj).next().find("#rc_totalPages").text(data.totalPage);
                getCname(data.usernames);
                $.each(data.search,function (index,searchVO) {
                    if(searchVO.fileName==null){
                        mkdir($(obj),searchVO.directoryName,searchVO.directoryId);
                    }else{
                        mkdir($(obj),searchVO.directoryName,searchVO.directoryId,"get");
                        $(obj).find("#rc_t"+searchVO.directoryId).css("display","block");
                        mkfiletable($(obj).find("#rc_t"+searchVO.directoryId),searchVO.fileName,searchVO.fileId,searchVO.upTime,cnames[index]);
                    }
                })
            }
        });
    }
}
function createNewDirectory(obj) {
    var direcID;
    var reObj = $(obj).parent().parent();
    if($(reObj).hasClass("rc_main_line")){
        direcID=$(reObj).next().attr("id");
        direcID = direcID.substring(4);
        if(!$(reObj).hasClass("rc_head_line_select")){
            $(obj).parent().prev().click();
        }
        reObj=$(reObj).next();
    }else{
        direcID=$(reObj).attr("data");
    }
    if (beforeNewDirectory !=null){
        beforeNewDirectory(direcID,$(reObj));
    }
    newDirectory({
        directoryId:direcID,
        type:1,
        success:function (data) {
            if ($(reObj).find("#rc_t" + data.directoryId).length > 0) {
                alert("已经存在未命名子目录，请命名后再新建");
                if (afterNewDirectory !=null){
                    afterNewDirectory(data.directoryId,data.directoryName,"directAlreadyHave");
                }
            }else{
                mkdir($(reObj),data.directoryName,data.directoryId);
                if (afterNewDirectory !=null){
                    afterNewDirectory(data.directoryId,data.directoryName,"success");
                }
            }
        }
    })
}
function changeDirectoryName(obj) {
    var reobj = $(obj).parent().prev();
    $(reobj).append("<input style='color: black' value='"+$(reobj).children("span").text()+"' onclick='event.stopPropagation();'/><input style='color: black' type='button' value='确定' onclick='renameTheDirectory(this);event.stopPropagation();'/><input style='color: black' type='button' value='取消' onclick='cancelRename(this);event.stopPropagation();' oldData='"+$(reobj).children("span").text()+"'/>").children("span").remove();
}
function cancelRename(obj) {
    $("<span>"+$(obj).attr("oldData")+"</span>").insertAfter($(obj));
    $(obj).prev().remove();
    $(obj).prev().remove();
    $(obj).remove();
}
function renameTheDirectory(obj){
    if($(obj).attr("connecting")=="true"){
        alert("正在改名中，请稍后！");
        return;
    }
    $(obj).attr("connecting","true");
    var info = $(obj).parent().parent().next();
    var dirId = $(info).attr("id");
    dirId = dirId.substring(4);
    if(beforeRenameDir!=null){
        beforeRenameDir($(obj).prev().val())
    }
    renameDirectory({
        directoryId:dirId,
        directoryName:$(obj).prev().val(),
        type:1,
        success:function (data) {
            if(data.state=="fail"){
                alert("重命名失败，请检查是否存在同名文件或联系管理员！")
            }else{
                $(obj).prev().remove();
                $(obj).next().remove();
                $("<span>"+data.directoryName+"</span>").insertAfter($(obj));
                $(obj).parent().parent().next().attr("tagtitle",data.directoryName);
                $(obj).remove();
            }
            if(afterRenameDir!=null){
                $(obj).attr("connecting","false");
                afterRenameDir(data.state,data.directoryName,$(obj).parent().parent().next())
            }
        }
    });
}
function doSearch(e,obj) {
    if (e == 13)
        $(obj).parent().parent().children(":last-child").prev().click();
}
function searchUsers(obj) {
    if(searchUsernameUrl!=null){
        $.ajax({
            url: searchUsernameUrl + "?username=" + $(obj).val(),
            type: 'POST',
            dataType: 'json',
            success: function(data) {
                $(obj).next().next().css("display", "block");
                $(obj).next().next().empty();
                $.each(data,
                    function(key, val) {
                        $(obj).next().next().append("<div style='font-size:18px;text-align:center;color:black;width: 100%;border: 1px solid #cfcfcf;background-color:white;' onmouseenter='this.style.backgroundColor=\"rgb(200,200,200)\"' onmouseleave='this.style.backgroundColor=\"white\"' onclick='fixInput(this,\"" + key + "\",\"" + val + "\")'>" + key + "|" + val + "</div>")
                    })
            }
        })
    }
    else{
        $(obj).prev().val($(obj).val()).prev().val($(obj).val());
    }

}
function fixInput(obj, username, cname) {
    $(obj).parent().prev().prev().val(username + "|" + cname);
    $(obj).parent().prev().prev().prev().prev().val(username);
    $(obj).parent().prev().prev().prev().val(cname);
    $(obj).parent().css("display", "none")
}
function clearInput(obj) {
    $(obj).prev().prev().prev().val("");
    $(obj).prev().val("");
    $(obj).prev().prev().val("");
    $(obj).next().css("display", "none")
}
function deletDir(obj) {
    var direcID = $(obj).parent().parent().next().attr("id");
    direcID = direcID.replace("rc_t","");
    deleteDirectory({
        directoryId:direcID,
        type:1,
        success:function (data) {
            if(data.state=="success"){
                if(afterDeletDir!=null){
                    afterDeletDir("success");
                }
                $(obj).parent().parent().parent().remove();
            }else{
                alert("出现异常，请联系管理员！")
            }
        }
    });
}
function getFile(jsonData) {
    getAuthorization({
        async:jsonData.async,
        success:function(authorization){
            $.ajax({
                url:resourceContainerHost+"/getFileById?fileId="+jsonData.fileId,
                type:"Get",
                dataType:"json",
                async:(jsonData.async==null?true:jsonData.async),
                headers:{
                    Authorization:authorization
                },
                success:function (data) {
                    switch(data.url){
                        case "NoFileUrl":
                            if(jsonData.error!=null)
                                jsonData.error();
                            break;
                        case "AuthorizationOutOfTime":
                            if(jsonData.authorizationOutOfTime!=null)
                                jsonData.authorizationOutOfTime();
                            break;
                        case "NotAllowedRequest":
                            if(jsonData.notAllowedRequest!=null)
                                jsonData.notAllowedRequest();
                            break;
                        default:
                            if(jsonData.success!=null)
                                jsonData.success(data);
                            break;
                    }
                }
            })
        }
    });
}
function getFiles(jsonData) {
    getAuthorization({
        async:jsonData.async,
        success:function(authorization){
            $.ajax({
                url:resourceContainerHost+"/getFilesByIds?fileIds="+jsonData.fileIds,
                type:"Get",
                dataType:"json",
                async:(jsonData.async==null?true:jsonData.async),
                headers:{
                    Authorization:authorization
                },
                success:function (data) {
                    switch(data[0].url){
                        case "NoFileUrl":
                            if(jsonData.error!=null)
                                jsonData.error();
                            break;
                        case "AuthorizationOutOfTime":
                            if(jsonData.authorizationOutOfTime!=null)
                                jsonData.authorizationOutOfTime();
                            break;
                        case "NotAllowedRequest":
                            if(jsonData.notAllowedRequest!=null)
                                jsonData.notAllowedRequest();
                            break;
                        default:
                            if(jsonData.success!=null)
                                jsonData.success(data);
                            break;
                    }
                }
            })
        }
    });
}
function downLoadFile(fileId) {
    getFile({
        fileId:fileId,
        success:function (data) {
            location.href=data.url+"&filename="+subFileName(data.fileName);
        }
    })
}
function previewFile(fileId) {
    var url="";
    getFile({
        fileId:fileId,
        async:false,
        success:function (data) {
            url=data.url;
        }
    })
    window.open(url,"_blank");
}
function setSrc(fileId,obj) {
    getFile({
        fileId:fileId,
        success:function (data) {
            $(obj).attr("src",data.url);
        }
    })
}
function getTop(obj) {
    $(".rc_top_z_index").removeClass("rc_top_z_index");
    $(obj).addClass("rc_top_z_index");
}
function showFilebox() {
    $("#rc_fileBoxSelector").animate({ width: 'toggle' }, 350);
}
function deleteThisFile(fileId,obj) {
    if(confirm("你确定要删除 "+$(obj).parent().prev().prev().children(":first-child").text()+" 吗？")){
        deletResourceFile({
            fileId:fileId,
            directoryId:$(obj).parents("table").parent().parent().attr("id").replace("rc_t",""),
            success:function (data) {
                $(obj).parent().parent().remove();
            }
        })
    }

}
function deletResourceFile(jsonData){
    $.ajax({
        url:resourceContainerHost+"/deleteFile?fileId="+jsonData.fileId+"&directoryId="+jsonData.directoryId,
        type:"Get",
        success:function (data) {
            if(jsonData.success!=null){
                jsonData.success(data);
            }
        }
    })
}
function showUpFiles() {
    var filelist = document.getElementById('rc_files').files;
    for(var i = 0; i < filelist.length; i++) {
        if(document.getElementById("rc_"+filelist[i].name)){
            alert("列表中有同名文件："+filelist[i].name+"，已被忽略！");
        }else{
            multifilelist.set(filelist[i].name,filelist.item(i));
            $('#rc_line_tab tbody').append('<tr id="rc_'+filelist[i].name+'"><td class="rc_tl">' + filelist[i].name + '</td><td class="rc_pb"><div class="rc_progress_bar"><div class="rc_uploadBar" style="width: 0%"></div></div></td><td class="rc_st"><font class="rc_success" style="display: none">✔</font><font class="rc_fail" style="display: none">×</font></td><td><div class="rc_upload" onclick="doUpload(\'' + filelist[i].name + '\')">上传</div><div class="rc_remove" onclick="removeMultiFile()">移除</div></td></tr>');
        }
    }
}
function removeMultiFile(e) {
    e=e||window.event;
    let multifilename = $(e.target).parents("tr").attr("id").substring(3);
    multifilelist.delete(multifilename);
    $(e.target).parents("tr").remove();
}