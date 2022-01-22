package net.gvsun.common;

/**
 * Description:枚举类型 kafka发送所用主题集合
 *
 * @author 杨新蔚
 * @since 2020/6/24
 */
public enum MessageTopic {
    /**
     * 短信数据主题-通知教师有新学生(对应阿里模板SMS_230640028)
     */
    SEND_COMMON_EMAIL_NEW_STUDENT_NOTICE("email", "new_student_notice"),
    /**
     * 短信数据主题-退选导师通知(对应阿里模板SMS_230640019)
     */
    SEND_COMMON_EMAIL_DESELECTION_TUTOR_NOTICE("email", "deselection_tutor_notice"),
    /**
     * 短信数据主题-导师变更通知(对应阿里模板SMS_230241170)
     */
    SEND_COMMON_EMAIL_TUTOR_CHANGE_NOTICE("email", "tutor_change_notice"),
    /**
     * 短信数据主题-学生变更通知(对应阿里模板SMS_230630123)
     */
    SEND_COMMON_EMAIL_STUDENT_CHANGE_NOTICE("email", "student_change_notice"),
    /**
     * 邮件数据主题-email_notice
     */
    SEND_COMMON_EMAIL_NOTICE("email", "email_notice"),
    /**
     * 通知公告
     */
    SEND_COMMON_NOTICE("notice", "notice"),
    /**
     * 邮件数据主题-email_html(带模板)
     */
    SEND_COMMON_EMAIL_HTML("email", "email_html"),
    /**
     * 短信数据主题-audit_notice(对应阿里模板SMS_196615873)
     */
    SEND_COMMON_SMS_AUDIT_NOTICE("sms", "audit_notice"),
    /**
     * 短信数据主题-platform_notice(对应阿里模板SMS_190793933:平台通知公告)
     */
    SEND_COMMON_SMS_PLATFORM_NOTICE("sms", "platform_notice"),
    /**
     * 短信数据主题-teacher_evaluation(对应阿里模板SMS_186947491)
     */
    SEND_COMMON_SMS_TEACHER_EVALUATION("sms", "teacher_evaluation"),
    /**
     * 短信数据主题-audit_template(对应阿里模板SMS_186967419)
     */
    SEND_COMMON_SMS_AUDIT_TEMPLATE("sms", "audit_template"),
    /**
     * 短信数据主题-audit_result(对应阿里模板SMS_202548184)
     */
    SEND_COMMON_SMS_AUDIT_RESULT("sms", "audit_result"),
    /**
     * 短信数据主题-配置中心评审模板（对应阿里模板SMS_217436199）
     */
    SEND_COMMON_SMS_CONFIGCENTER_ASSESS("sms", "configcenter_assess"),
    /**
     * 短信数据主题-配置中心填报模板（对应阿里模板SMS_217416159）
     */
    SEND_COMMON_SMS_CONFIGCENTER_Fill("sms", "configcenter_fill"),
    /**
     * 短信数据主题-通知用户审核完成(对应阿里模板SMS_204125381)
     */
    SEND_COMMON_SMS_AUDIT_COMPLETE_NOTICE("sms", "audit_complete_notice"),
    /**
     * 短信数据主题-通知教师有新学生(对应阿里模板SMS_230640028)
     */
    SEND_COMMON_SMS_NEW_STUDENT_NOTICE("sms", "new_student_notice"),
    /**
     * 短信数据主题-退选导师通知(对应阿里模板SMS_230640019)
     */
    SEND_COMMON_SMS_DESELECTION_TUTOR_NOTICE("sms", "deselection_tutor_notice"),
    /**
     * 短信数据主题-导师变更通知(对应阿里模板SMS_230241170)
     */
    SEND_COMMON_SMS_TUTOR_CHANGE_NOTICE("sms", "tutor_change_notice"),
    /**
     * 短信数据主题-学生变更通知(对应阿里模板SMS_230630123)
     */
    SEND_COMMON_SMS_STUDENT_CHANGE_NOTICE("sms", "student_change_notice"),
    /**
     * 报表数据主题-SJ4
     */
    REFRESH_REPORT_DATA_SJ4("refreshReportData", "sj4"),
    /**
     * 报表数据主题-SJ5
     */
    REFRESH_REPORT_DATA_SJ5("refreshReportData", "sj5"),
    /**
     * 报表数据主题-SJ6
     */
    REFRESH_REPORT_DATA_SJ6("refreshReportData", "sj6"),
    /**
     * 报表数据主题-SJ8
     */
    REFRESH_REPORT_DATA_SJ8("refreshReportData", "sj8"),
    /**
     * 报表数据主题-SJ9
     */
    REFRESH_REPORT_DATA_SJ9("refreshReportData", "sj9"),
    /**
     * 报表数据主题-ProfessionalExperiment
     */
    REFRESH_REPORT_DATA_PE("refreshReportData", "professionalExperiment"),
    /**
     * 报表数据主题-ProfessionalTeachingLaboratory
     */
    REFRESH_REPORT_DATA_PTL("refreshReportData", "professionalTeachingLaboratory"),
    /**
     * 报表数据主题-VirtualExperiment
     */
    REFRESH_REPORT_DATA_VE("refreshReportData", "virtualExperiment"),
    /**
     * 报表数据主题-exemplarCenter
     */
    REFRESH_REPORT_DATA_EC("refreshReportData", "exemplarCenter"),
    /**
     * 刷新数据源主题
     */
    REFRESH_ALL_DATASOURCE("refreshAllDataSource", "refreshAllDataSource"),
    /**
     * 共享数据主题-插入用户
     */
    INSERT_USER("sharedData", "insert_user"),
    /**
     * 共享数据主题-插入用户卡号
     */
    INSERT_USER_CARD("sharedData", "insert_user_card"),
    /**
     * 共享数据主题-插入学院
     */
    INSERT_SCHOOL_ACADEMY("sharedData", "insert_school_academy"),
    /**
     * 共享数据主题-插入学期
     */
    INSERT_SCHOOL_TERM("sharedData", "insert_school_term"),
    /**
     * 共享数据主题-插入周次
     */
    INSERT_SCHOOL_WEEK("sharedData", "insert_school_week"),
    /**
     * 共享数据主题-插入周次
     */
    INSERT_SCHOOL_CAMPUS("sharedData", "insert_school_campus"),
    /**
     * 共享数据主题-插入节次
     */
    INSERT_SCHOOL_TIME("sharedData", "insert_school_time"),
    /**
     * 共享数据主题-插入楼宇
     */
    INSERT_SCHOOL_BUILD("sharedData", "insert_school_build"),
    /**
     * 共享数据主题-插入学科
     */
    INSERT_SCHOOL_SUBJECT("sharedData", "insert_school_subject"),
    /**
     * 共享数据主题-插入学科
     */
    INSERT_SCHOOL_MAJOR("sharedData", "insert_school_major"),
    /**
     * 共享数据主题-插入院系
     */
    INSERT_SCHOOL_DEPARTMENT("sharedData", "insert_school_department"),
    /**
     * 共享数据主题-插入班级
     */
    INSERT_SCHOOL_CLASS("sharedData", "insert_school_class"),
    /**
     * 共享数据主题-插入教室
     */
    INSERT_SCHOOL_ROOM("sharedData", "insert_school_room"),
    /**
     * 共享数据主题-插入设备
     */
    INSERT_SCHOOL_DEVICE("sharedData", "insert_school_device"),
    /**
     * 共享数据主题-导入字典信息
     */
    INSERT_DICTIONARY("sharedData", "insert_dictionary"),
    /**
     * 共享数据主题-导入课程信息
     */
    INSERT_SCHOOL_COURSE("sharedData", "insert_school_course"),
    /**
     * 共享数据主题-导入课程基础信息
     */
    INSERT_SCHOOL_COURSE_INFO("sharedData", "insert_school_course_info"),
    /**
     * 共享数据主题-导入课程计划
     */
    INSERT_SCHOOL_COURSE_DETAIL("sharedData", "insert_school_course_detail"),
    /**
     * 共享数据主题-设置课程班级
     */
    SET_SCHOOL_COURSE_CLASS("sharedData", "set_school_course_class"),
    /**
     * 共享数据主题-导入课程学生
     */
    INSERT_SCHOOL_COURSE_STUDENT("sharedData", "insert_school_course_student"),
    /**
     * 共享数据主题-修改用户
     */
    UPDATE_USER("sharedData", "update_user"),
    /**
     * 共享数据主题-修改用户卡号
     */
    UPDATE_USER_CARD("sharedData", "update_user_card"),
    /**
     * 共享数据主题-修改学院
     */
    UPDATE_SCHOOL_ACADEMY("sharedData", "update_school_academy"),
    /**
     * 共享数据主题-修改学期
     */
    UPDATE_SCHOOL_TERM("sharedData", "update_school_term"),
    /**
     * 共享数据主题-修改周次
     */
    UPDATE_SCHOOL_WEEK("sharedData", "update_school_week"),
    /**
     * 共享数据主题-修改周次
     */
    UPDATE_SCHOOL_CAMPUS("sharedData", "update_school_campus"),
    /**
     * 共享数据主题-修改节次
     */
    UPDATE_SCHOOL_TIME("sharedData", "update_school_time"),
    /**
     * 共享数据主题-修改楼宇
     */
    UPDATE_SCHOOL_BUILD("sharedData", "update_school_build"),
    /**
     * 共享数据主题-修改学科
     */
    UPDATE_SCHOOL_SUBJECT("sharedData", "update_school_subject"),
    /**
     * 共享数据主题-修改学科
     */
    UPDATE_SCHOOL_MAJOR("sharedData", "update_school_major"),
    /**
     * 共享数据主题-修改院系
     */
    UPDATE_SCHOOL_DEPARTMENT("sharedData", "update_school_department"),
    /**
     * 共享数据主题-修改班级
     */
    UPDATE_SCHOOL_CLASS("sharedData", "update_school_class"),
    /**
     * 共享数据主题-修改教室
     */
    UPDATE_SCHOOL_ROOM("sharedData", "update_school_room"),
    /**
     * 共享数据主题-修改设备
     */
    UPDATE_SCHOOL_DEVICE("sharedData", "update_school_device"),
    /**
     * 共享数据主题-修改字典信息
     */
    UPDATE_DICTIONARY("sharedData", "update_dictionary"),
    /**
     * 共享数据主题-修改课程信息
     */
    UPDATE_SCHOOL_COURSE("sharedData", "update_school_course"),
    /**
     * 共享数据主题-修改课程基础信息
     */
    UPDATE_SCHOOL_COURSE_INFO("sharedData", "update_school_course_info"),
    /**
     * 共享数据主题-修改课程计划
     */
    UPDATE_SCHOOL_COURSE_DETAIL("sharedData", "update_school_course_detail"),
    /**
     * 共享数据主题-修改课程学生
     */
    UPDATE_SCHOOL_COURSE_STUDENT("sharedData", "update_school_course_student"),
    /**
     * 共享数据主题-删除用户
     */
    DELETE_USER("sharedData", "delete_user"),
    /**
     * 共享数据主题-删除用户卡号
     */
    DELETE_USER_CARD("sharedData", "delete_user_card"),
    /**
     * 共享数据主题-删除学院
     */
    DELETE_SCHOOL_ACADEMY("sharedData", "delete_school_academy"),
    /**
     * 共享数据主题-删除学期
     */
    DELETE_SCHOOL_TERM("sharedData", "delete_school_term"),
    /**
     * 共享数据主题-删除周次
     */
    DELETE_SCHOOL_WEEK("sharedData", "delete_school_week"),
    /**
     * 共享数据主题-删除周次
     */
    DELETE_SCHOOL_CAMPUS("sharedData", "delete_school_campus"),
    /**
     * 共享数据主题-删除节次
     */
    DELETE_SCHOOL_TIME("sharedData", "delete_school_time"),
    /**
     * 共享数据主题-删除楼宇
     */
    DELETE_SCHOOL_BUILD("sharedData", "delete_school_build"),
    /**
     * 共享数据主题-删除学科
     */
    DELETE_SCHOOL_SUBJECT("sharedData", "delete_school_subject"),
    /**
     * 共享数据主题-删除学科
     */
    DELETE_SCHOOL_MAJOR("sharedData", "delete_school_major"),
    /**
     * 共享数据主题-删除院系
     */
    DELETE_SCHOOL_DEPARTMENT("sharedData", "delete_school_department"),
    /**
     * 共享数据主题-删除班级
     */
    DELETE_SCHOOL_CLASS("sharedData", "delete_school_class"),
    /**
     * 共享数据主题-删除教室
     */
    DELETE_SCHOOL_ROOM("sharedData", "delete_school_room"),
    /**
     * 共享数据主题-删除设备
     */
    DELETE_SCHOOL_DEVICE("sharedData", "delete_school_device"),
    /**
     * 共享数据主题-删除字典信息
     */
    DELETE_DICTIONARY("sharedData", "delete_dictionary"),
    /**
     * 共享数据主题-删除课程信息
     */
    DELETE_SCHOOL_COURSE("sharedData", "delete_school_course"),
    /**
     * 共享数据主题-删除课程基础信息
     */
    DELETE_SCHOOL_COURSE_INFO("sharedData", "delete_school_course_info"),
    /**
     * 共享数据主题-删除课程计划
     */
    DELETE_SCHOOL_COURSE_DETAIL("sharedData", "delete_school_course_detail"),
    /**
     * 共享数据主题-删除课程学生
     */
    DELETE_SCHOOL_COURSE_STUDENT("sharedData", "delete_school_course_student"),
    /**
     * 共享数据主题-设置默认校区
     */
    DEFAULT_CAMPUS("sharedData", "default_campus"),
    /**
     * iot数据主题，物联设备操作日志信息
     */
    SYNC_COMMON_HDWLOG("iotData", "sync_common_hdwlog"),
    /**
     * iot数据主题，添加用户权限数据
     */
    INSERT_INSTRUMENT_RESERVATION_TODAY("iotData", "insert_instrument_reservation_today"),
    /**
     * iot数据主题，删除用户权限数据
     */
    DELETE_INSTRUMENT_RESERVATION_TODAY("iotData", "delete_instrument_reservation_today"),
    /**
     * iot数据主题，添加设备信息
     */
    INSERT_LAB_ROOM_AGENT("iotData", "insert_lab_room_agent"),
    /**
     * iot数据主题，删除设备信息
     */
    DELETE_LAB_ROOM_AGENT("iotData", "delete_lab_room_agent");

    private String topic;
    private String subTopic;

    MessageTopic(String topic, String subTopic) {
        this.topic = topic;
        this.subTopic = subTopic;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getSubTopic() {
        return subTopic;
    }

    public void setSubTopic(String subTopic) {
        this.subTopic = subTopic;
    }
}
