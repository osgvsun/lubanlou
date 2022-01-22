layui.use(['form','upload', 'element', 'layer', 'table', 'laydate'], function () {
    var $ = layui.$;
    var form = layui.form,
        layer = layui.layer
    let table = layui.table;
    let upload = layui.upload;
    let element = layui.element;
    var laydate = layui.laydate;

    //监听提交
    form.on('submit(newcoursebtn)', function(data) {
        var field = data.field; //获取提交的字段
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        let schoolCourseDTOList = [];
        let schoolCourseDTO = {
            courseNo: field.courseNo,
            courseNumber: field.courseNumber,
            teacher: field.teacher,
            courseName: field.courseName,
            termNumber: field.termNumber,
            academyNumber: field.academyNumber,
            planStudentNumber: field.planStudentNumber,
            courseSource: field.courseSource,
            classNumbers: field.classNumbers,
            creator: currentUsername
        }
        schoolCourseDTOList.push(schoolCourseDTO);
        //提交 Ajax 成功后，关闭当前弹层并重载表格
        $.ajax({
            url: datashareHost + "openapi/uploadSchoolCourseByDTO",
            type: "post",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(schoolCourseDTOList),
            success: function (res) {
                layui.layer.alert(res.msg);
                parent.layui.table.reload("lay_table_school_course");//重载表格
                if (res.code===0){
                    parent.layer.close(index); //再执行关闭
                }
            },
            error: function () {
                layui.layer.alert("请求超时");
            }
        })
    });

});