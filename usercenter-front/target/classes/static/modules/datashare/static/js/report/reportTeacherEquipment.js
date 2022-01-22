$(document).ready(function () {
    $("#currYear").text(localStorage.getItem("currYear"));
    tableRender();
});

let array = [];
//列表查询方法
function tableRender() {
    let search = $('#search').val();
    layui.use(['table'], function () {
        let table = layui.table;
        table.render({
            elem: '#lay_table_teacher_equipment',
            method: 'get',
            url: datashareHost + "getTeacherEquipmentList",
            where: {
                search: search
            },
            page: true,
            size: 'sm',
            even: true,
            cols: [[
                {type: 'checkbox', fixed: 'left'},
                {title: '序号', type: 'numbers'},
                {field: 'teacher', title: '工号'},
                {field: 'teacherName', title: '导师姓名'},
                {field: 'gender', title: '性别'},
                {field: 'teacherMajor', title: '专业'},
                {field: 'education', title: '学历/学位'},
                {field: 'teacherTitle', title: '职称'},
                {field: 'studentNum', title: '指导学生数'},
                {field: 'studentName', title: '学生姓名'},
                {field: 'student', title: '学号'},
                {field: 'studentMajor', title: '专业'},
                {field: 'classes', title: '班级'},
                {field: 'telephone', title: '手机号'},
                {field: 'remarks', title: '备注（转专业新加、变更导师新加）',width:200},
            ]]
        });
        //监听单元格编辑
        table.on('edit(lay_table_teacher_equipment)', function (obj) {
            let index = -1;
            let data = obj.data;
            for (let i = 0; i < array.length; i++) {
                if (data.laboratoryNumber === array[i].laboratoryNumber) {
                    index = i;
                }
            }
            if (index === -1) {
                array.push(data);
            } else {
                array[index] = data;
            }
        });
    });
}

//取消查询
function cancelSearch() {
    $('#search').val("");
    tableRender();
}


//列表查询方法
function reportExportTxt() {
    window.open(datashareHost + "report/exportTeacherEquipmentTxt?limsAuth="+$.cookie('currentAuthBydatashare')+"&currYear="+localStorage.currYear);
}


function reportExportExcel() {
    window.open(datashareHost + "report/exportTeacherEquipmentExcel?limsAuth="+$.cookie('currentAuthBydatashare')+"&currYear="+localStorage.currYear);
}

layui.use(['upload', 'element'], function () {
    let upload = layui.upload;
    let element = layui.element;

    function loading(msg){
        msgindex = layer.msg(msg, {
            icon:16,
            shade:[0.1, '#fff'],
            time:false,  //不自动关闭
            offsetqiuchuy:"100px"
        })
    }



    //获取报表数据
    window.getConfigData = function () {
        let termNumber = $("#termSelect").val();
        $.ajax({
            url: datashareHost + "putConfigData",
            data: {'termNumber': termNumber},
            method: "post",
            beforeSend: function (res) {
                loading("数据更新中,请耐心等待......");
            },
            success: function (res) {
                layer.confirm(res.msg, {
                    btn : [ '确定']//按钮
                }, function() {
                    location.reload();
                })
            },
            error: function () {
                layui.layer.msg("出错啦！");
            }
        });
    }
});

