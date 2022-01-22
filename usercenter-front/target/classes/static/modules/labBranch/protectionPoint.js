layui.use(['laypage', 'layer', 'table', 'element', 'form', 'laydate'], function () {
    var admin = layui.admin,
        laypage = layui.laypage,
        layer = layui.layer,
        table = layui.table,
        $ = layui.jquery,
        element = layui.element,
        form = layui.form,
        laydate = layui.laydate

    //向世界问个好
    //layer.msg('');

    form.render(null, 'protectionpointbox');

    //监听提交
    form.on('submit(protectionpointbtn)', function (data) {
        var field = data.field; //获取提交的字段
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引

        //提交 Ajax 成功后，关闭当前弹层并重载表格
        //$.ajax({});
        parent.layui.table.reload('protectionpointbox'); //重载表格
        parent.layer.close(index); //再执行关闭
    });

    //信息
    form.val('protectionpointbox', {
        "typeinfoone": "此处为其他防护要点信息此处为其他防护要点信息此处为其他防护要点信息此处为其他防护要点信息此处为其他防护要点信息此处为其他防护要点信息此处为其他防护要点信息此处为其他防护要点信息此处为其他防护要点信息此处为其他防护要点信息此处为其他防护要点信息此处为其他防护要点信息此处为其他防护要点信息此处为其他防护要点信息",
        "typeinfotwo": "此处为其他防护要点信息"
    });

});

$("input[type=checkbox]").attr("disabled", "disabled");

$(".editbtn").on("click",
    function () {
        $(this).parents(".layui-card-header").siblings().find("input[type=checkbox]").removeAttr("disabled");
        $(this).hide();
        $(this).parents(".layui-card-header").siblings().find(".savebtn").show();
        $(this).parents(".layui-card-header").siblings().find(".resetbtn").show();
        $(this).parents(".layui-card-header").siblings().find(".typeinfo_show").attr("type", "text").removeAttr("disabled").removeAttr("readonly").removeClass("btn_article").addClass("layui-input");
    }
);

$(".savebtn").on("click",
    function () {
        $(this).siblings("input[type=checkbox]").attr("disabled", "disabled");
        $(this).hide();
        $(this).siblings(".resetbtn").hide();
        $(this).parents(".layui-card-body").siblings().find(".editbtn").show();
        $(this).siblings(".typeinfo_show").attr("type", "button").attr("disabled", "disabled").attr("readonly", "readonly").removeClass("layui-input").addClass("btn_article");
    }
);

$(".resetbtn").on("click",
    function () {
        $(this).siblings("input[type=checkbox]").attr("disabled", "disabled");
        $(this).hide();
        $(this).siblings(".savebtn").hide();
        $(this).parents(".layui-card-body").siblings().find(".editbtn").show();
        $(this).siblings(".typeinfo_show").attr("type", "button").attr("disabled", "disabled").attr("readonly", "readonly").removeClass("layui-input").addClass("btn_article");
    }
);