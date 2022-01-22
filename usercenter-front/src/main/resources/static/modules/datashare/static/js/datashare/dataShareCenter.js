/**
 * Created by Remli on 2021/5/24.
 */
layui.use(['form','layer'],function () {
    var $ = layui.$,
        layer = layui.layer,
        form = layui.form;
    var authorities,
        currentauth = $.cookie('currentAuthBydatashare'),
        currentanthcname = $.cookie('currentAuthCnameBydatashare');
    getCurrentUser();
    liShowAndHide();
    document.getElementById("datashare_cname").innerText = currentanthcname+':'+currentUsername+'，您好';
    function getCurrentUser() {
        $.ajax({
            url: 'getCurrentUser',
            // dataType: 'json',
            async: false,
            type: 'get',
            success: function (res) {
                currusername = res.username;
                currcname = res.cname;
                authorities = res.authorityMap.GvsunLims;
                if(authorities && authorities.length>0){
                    //优先选中超管权限
                    for(var i = 0;i<authorities.length;i++) {
                        if (authorities[i].name === 'SUPERADMIN'){
                            currentauth = (currentauth === undefined ? authorities[i].name:currentauth );
                            currentanthcname = (currentanthcname === undefined ?authorities[i].cname:currentanthcname);
                        }
                    }
                    //如果没有权限则选第一项权限
                    currentauth = (currentauth === undefined ? authorities[0].name:currentauth );
                    currentanthcname = (currentanthcname === undefined ?authorities[0].cname:currentanthcname);
                }else {
                    currentauth = 'visitor';
                    currentanthcname = '游客';
                }
                $.cookie('currentAuthBydatashare',currentauth);
                $.cookie('currentAuthCnameBydatashare',currentanthcname);
                // auth
                let cAuth = $.cookie("currentAuthBydatashare");
                if (cAuth) {
                    let authArr = ["TEACHER", "ACADEMYLEVELM", "SUPERADMIN"];
                    if(authArr.includes(cAuth.toString().toUpperCase())){
                        // $("ul.dhu-menu.function-app").show();
                    }else{
                        $("#schoolCourseList").hide();
                    }
                }
            }
        });
    }
    function liShowAndHide() {
        // if($.cookie('currentAuthBydatashare')==='EXPERIMENTALTEACHING'||$.cookie('currentAuthBydatashare')==='EXCENTERDIRECTOR'
        //     ||$.cookie('currentAuthBydatashare')==='ACADEMYLEVELM'||$.cookie('currentAuthBydatashare')==='SUPERADMIN'){
        //     $("li[id^='sj']").each(function(){
        //         if($(this).is(':visible')){
        //             $(this).children()[0].click();
        //             return false;
        //         }
        //     })
    }

//切换权限
    changeAuth={
        changeAuth:function () {
            var str = '';
            str+='<div class="layui-form">';
            $.each(authorities,function (index,item) {
                if(currentauth == item.name){
                    str+=' <input type="radio" name="auth" value="'+ item.name +'" title="'+ item.cname +'" checked="">'
                }else{
                    str+=' <input type="radio" name="auth" value="'+ item.name +'" title="'+ item.cname +'">'
                }

            });
            str+='</div>'
            layer.confirm(str,{
                btn: ['确定'],
                title : '请选择权限',
                closeBtn :0,//不显示关闭按钮
                success: function(){
                    form.render();
                },
                btn1: function (index) {
                    currentauth = $("input[name='auth']:checked").val();
                    $.cookie("currentAuthBydatashare",$("input[name='auth']:checked").val());
                    $.each(authorities,function (index,item) {
                        if(currentauth === item.name){
                            currentanthcname = item.cname;
                        }
                    })
                    $.cookie('currentAuthCnameBydatashare',currentanthcname);
                    document.getElementById("datashare_cname").innerText = `${currentanthcname}:${currentUsername}，您好`;
                    window.location.reload()
                    // currauth = [];
                    // currauth.push($("input[name='auth']:checked").val());
                    // // currauth = $("input[name='auth']:checked").val();
                    // getInfoByAuthorityName(currauth[0]);
                    // getTemplateProcess();
                    // getTableHeader();
                    // tableRender();
                    // layer.close(index);
                }
            });
        }
    }
    $('.breadcrumb_select').on('click', function(){
        var othis = $(this), type = othis.data('type');
        changeAuth[type] ? changeAuth[type].call(this, othis) : '';
    });

    if(path == 'schoolCourse'){
        location.href = '../datashare/schoolCourseList'
    }else {
        $('#schoolTerm')[0].click();
    }
})
