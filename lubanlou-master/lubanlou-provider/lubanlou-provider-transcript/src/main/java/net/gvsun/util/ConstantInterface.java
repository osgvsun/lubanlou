package net.gvsun.util;

/****************************************************************************
 * Description: 统一教学平台项目标志位
 *
 * @author:孟金城
 * @date : 2018-08-14
 ****************************************************************************/

public interface ConstantInterface {

    /****************************************************************************
     * Description: 通用常量定义
     *
     * @author:魏诚
     * @date : 2018-08-19
     ****************************************************************************/
    public String MESSAGE_SYNCHRONIZE_FINISH = "同步完成";
    public String MESSAGE_OK = "ok";

    /****************************************************************************
     * Description: 通用常量定义
     *
     * @author:魏诚
     * @date : 2018-08-19
     ****************************************************************************/
    public String STRING_COMMON_TRUE = "TRUE";
    public String STRING_COMMON_FALSE = "FALSE";
    public String STRING_COMMON_SESSION_SITE_ID = "cid";

    public int INT_COMMON_PAGE_PAGESIZE = 15;

    /****************************************************************************
     * Description: 实验室（Lab）模块{1.预约发布；2.预约保存}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int LAB_TYPE_RESERVATION_AND_RELEASE = 1;
    public int LAB_TYPE_RESERVATION_AND_SAVE = 2;

    /****************************************************************************
     * Description: 实验室（Lab）模块{是否开放，1.开放，2.不开放}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int LAB_OPEN_ENABLE_YES = 1;
    public int LAB_OPEN_ENABLE_NO = 2;

    /****************************************************************************
     * Description: 实验室（Lab）模块{角色（0学生 1教师 2组长）}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int LAB_ROLE_STUDENT = 0;
    public int LAB_ROLE_TEACHER = 1;
    public int LAB_ROLE_GROUP_LEADER = 2;

    /****************************************************************************
     * Description: 实验室（Lab）模块{是否可用(1是，0否）}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int LAB_LAB_ROOM_ACTIVE_YES = 1;
    public int LAB_LAB_ROOM_ACTIVE_NO = 0;

    /****************************************************************************
     * Description: 实验室（Lab）模块{是否可预约（1是，0否）}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int LAB_LAB_ROOM_RESERVATION_YES = 1;
    public int LAB_LAB_ROOM_RESERVATION_NO = 0;

    /****************************************************************************
     * Description: 实验室（Lab）模块{预约是否审核（1：是，0：否）}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int LAB_LAB_ROOM_AUDIT_YES = 1;
    public int LAB_LAB_ROOM_AUDIT_NO = 0;

    /****************************************************************************
     * Description: 实验室（Lab）模块{1可用 0不可用}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int LAB_IS_USED_YES = 1;
    public int LAB_IS_USED_NO = 0;

    /****************************************************************************
     * Description: 实验室（Lab）模块{是否允许教学外设备对外开放（0 否  1 是）}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int LAB_ALLOW_DEVICE_USE_NO = 0;
    public int LAB_ALLOW_DEVICE_USE_YES = 1;

    /****************************************************************************
     * Description: 实验室（Lab）模块{1保存 2发布到黄埔}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int LAB_LAB_ROOM_TYPE_SAVE = 1;
    public int LAB_LAB_ROOM_TYPE_PUBLISH = 2;

    /****************************************************************************
     * Description: 实验室（Lab）模块{发布标志位（1：已发布，0：未发布）}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int LAB_PUBLISH_YES = 1;
    public int LAB_PUBLISH_NO = 0;

    /****************************************************************************
     * Description: 实验室（Lab）模块{硬件类型（1.视频）}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int LAB_HARDWARE_TYPE_VIEDO = 1;

    /****************************************************************************
     * Description: 实验室（Lab）模块{坐标信息类型。0:设备；1:实验项目；2:文档；3:视频}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int LAB_INFORMATION_TYPE_DEVICE = 0;
    public int LAB_INFORMATION_TYPE_EXPERIMENTAL_PROJECT = 1;
    public int LAB_INFORMATION_TYPE_TEST = 2;
    public int LAB_INFORMATION_TYPE_VIDEO = 3;

    /****************************************************************************
     * Description: 实验室（Lab）模块{是否可用，1：可用，0：不可用}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int LAB_ENABLED_USE = 1;
    public int LAB_ENABLED_NO_USE = 0;

    /****************************************************************************
     * Description: 实验室（Lab）模块{楼宇类型:1.圆形,2.椭圆,3.板楼,4.筒子楼,5.凸楼,6.凹楼}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int LAB_BUILD_TYPE_CIRCULAR = 1;
    public int LAB_BUILD_TYPE_ELLIPTIC = 2;
    public int LAB_BUILD_TYPE_BOARD_FLOOR = 3;
    public int LAB_BUILD_TYPE_TUBE_SHAPED_APARTMENT = 4;
    public int LAB_BUILD_TYPE_CONVEX_FLOOR = 5;
    public int LAB_BUILD_TYPE_CONCAVE_FLOOR = 6;

    /****************************************************************************
     * Description: 站点房间(Site room)模块{17个区域的定义，关联到c_dictionary表，
     *              c_category为值c_t_course_site_room_position}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int SITE_ROOM_BUILD_TYPE_CIRCULAR = 1;

    /****************************************************************************
     * Description: 权限管理(authority management)模块{分类(1为学生、老师、助教、
     *              实验室管理员、设备管理员，2为实验教学副院长、实验中心主任，3为实
     *              验教务，4为超级管理员）}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int AUTHORITY_MANAGEMENT_TYPE_STUDENT_OR_TEACHER_OR_ASSISTANT_OR_LABADMIN_OR_EQUIPMENTADMIN = 1;
    public int AUTHORITY_MANAGEMENT_TYPE_TEACHING_PRESIDENT_OR_EXPERIMENTAL_DIRECTOR = 2;
    public int AUTHORITY_MANAGEMENT_TYPE_EXPERIMENTAL_TEACHING = 3;
    public int AUTHORITY_MANAGEMENT_TYPE_SUPERADMIN = 4;

    /****************************************************************************
     * Description: 权限管理(authority management)模块{判断当前权限，1表示当前权限为该权限}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int AUTHORITY_MANAGEMENT_NOW_AUTHORITY_YES = 1;

    /****************************************************************************
     * Description: 字典表(dictionary)模块{是否可用：1是；2否}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int DICTIONARY_ENABLED_YES = 1;
    public int DICTIONARY_ENABLED_NO = 0;

    /****************************************************************************
     * Description: 文件上传下载(File upload and download)模块{类型（1：图片、2：文档
     *              、3：实验室全景图、4：实验室展示图、201：教学计划、202教学大纲、203
     *              教学标准、300：教学模块使用说明视频）}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int FILE_UPLOAD_AND_DOWNLOAD_COMMON_DOCUMENT_TYPE_PICTURE = 1;
    public int FILE_UPLOAD_AND_DOWNLOAD_COMMON_DOCUMENT_TYPE_TEST = 2;
    public int FILE_UPLOAD_AND_DOWNLOAD_COMMON_DOCUMENT_TYPE_LABORATORY_PANORAMIC_PICTURE = 3;
    public int FILE_UPLOAD_AND_DOWNLOAD_COMMON_DOCUMENT_TYPE_LABORATORY_SHOW_PICTURE = 4;
    public int FILE_UPLOAD_AND_DOWNLOAD_COMMON_DOCUMENT_TYPE_TEACH_PLAN = 201;
    public int FILE_UPLOAD_AND_DOWNLOAD_COMMON_DOCUMENT_TYPE_TEACH_OUTLINE = 202;
    public int FILE_UPLOAD_AND_DOWNLOAD_COMMON_DOCUMENT_TYPE_TEACH_STANDARD = 203;
    public int FILE_UPLOAD_AND_DOWNLOAD_COMMON_DOCUMENT_TYPE_TEACH_INSTRUCTION_VIDEO = 300;

    /****************************************************************************
     * Description: 文件上传下载(File upload and download)模块{标志位（针对项目验收阶段
     *              1 项目建设阶段资料  2项目教学阶段资料  3仪器设备资料   4 综合效益资料）}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int FILE_UPLOAD_AND_DOWNLOAD_FLAG_CONSTRUCTION_INFORMATION = 1;
    public int FILE_UPLOAD_AND_DOWNLOAD_FLAG_TEACH_INFORMATION = 2;
    public int FILE_UPLOAD_AND_DOWNLOAD_FLAG_DEVICE_INFORMATION = 3;
    public int FILE_UPLOAD_AND_DOWNLOAD_FLAG_COMPREHENSIVE_INFORMATION = 4;

    /****************************************************************************
     * Description: 文件上传下载(File upload and download)模块{0：视频，1：图片，2：文件，
     *              3：作业附件，100：资源文件夹，101：资源文件，102：资源链接，201：实验指
     *              导书，202：实验视频，203：实验图片，204：实验工具205：知识图谱，以及
     *              t_course_stage主键的小组阶段}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int FILE_UPLOAD_AND_DOWNLOAD_TYPE_PICTURE = 1;
    public int FILE_UPLOAD_AND_DOWNLOAD_TYPE_TEST = 2;
    public int FILE_UPLOAD_AND_DOWNLOAD_TYPE_HOMEWORK_ATTACHMENT = 3;
    public int FILE_UPLOAD_AND_DOWNLOAD_TYPE_RESOURCE_FOLDER = 100;
    public int FILE_UPLOAD_AND_DOWNLOAD_TYPE_RESOURCE_TEST = 101;
    public int FILE_UPLOAD_AND_DOWNLOAD_TYPE_RESOURCE_LINK = 102;
    public int FILE_UPLOAD_AND_DOWNLOAD_TYPE_LAB_BOOK = 201;
    public int FILE_UPLOAD_AND_DOWNLOAD_TYPE_LAB_VIDEO = 202;
    public int FILE_UPLOAD_AND_DOWNLOAD_TYPE_LAB_PICTURE = 203;
    public int FILE_UPLOAD_AND_DOWNLOAD_TYPE_LAB_TOOL = 204;
    public int FILE_UPLOAD_AND_DOWNLOAD_TYPE_KNOWLEDGE_MAP = 205;

    /****************************************************************************
     * Description: 文件上传下载(File upload and download)模块{用于app判断是否是最近更
     *              新,0为不是最近更新，1为最近更新}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int FILE_UPLOAD_AND_DOWNLOAD_IS_NEW_APP_NO = 0;
    public int FILE_UPLOAD_AND_DOWNLOAD_IS_NEW_APP_YES = 1;

    /****************************************************************************
     * Description: 文件上传下载(File upload and download)模块{是否封存（1：封存，0：开放）}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int FILE_UPLOAD_AND_DOWNLOAD_IS_SEALED_NO = 0;
    public int FILE_UPLOAD_AND_DOWNLOAD_IS_SEALED_YES = 1;

    /****************************************************************************
     * Description: 文件上传下载(File upload and download)模块{是否可以下载（1：可下载，
     *              0：不可下载）}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int FILE_UPLOAD_AND_DOWNLOAD_CAN_DOWNLOAD_YES = 1;
    public int FILE_UPLOAD_AND_DOWNLOAD_CAN_DOWNLOAD_NO = 0;

    /****************************************************************************
     * Description: 文件上传下载(File upload and download)模块{是否可以预览（1：可预览，
     *              0：不可预览）}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int FILE_UPLOAD_AND_DOWNLOAD_CAN_PREVIEW_YES = 1;
    public int FILE_UPLOAD_AND_DOWNLOAD_CAN_PREVIEW_NO = 0;

    /****************************************************************************
     * Description: 文件上传下载(File upload and download)模块{手机微课是否可以查看：
     *              1可以，0不可以}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int FILE_UPLOAD_AND_DOWNLOAD_TO_MOBILE_YES = 1;
    public int FILE_UPLOAD_AND_DOWNLOAD_TO_MOBILE_NO = 0;

    /****************************************************************************
     * Description: 考勤机考勤(attendance)模块{状态位：0：未考勤，1：已考勤}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int ATTENDANCE_LOG_STATUS_NO = 0;
    public int ATTENDANCE_LOG_STATUS_YES = 1;

    /****************************************************************************
     * Description: 考勤机考勤(attendance)模块{考勤类型：0：正常到，1：迟到，3：旷课}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int ATTENDANCE_ATTENDANCE_TYPE_NORMAL = 0;
    public int ATTENDANCE_ATTENDANCE_TYPE_LATE = 1;
    public int ATTENDANCE_ATTENDANCE_TYPE_TRUANCY = 3;

    /****************************************************************************
     * Description: 考勤机考勤(attendance)模块{是否可用（1可用，0不可用）}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public String ATTENDANCE_ENABLED_YES = "1";
    public String ATTENDANCE_ENABLED_NO = "0";

    /****************************************************************************
     * Description: 试卷库(Test paper library)模块{试卷库状态1显示0删除}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int TEST_PAPER_LIBRARY_STATUS_YES = 1;
    public int TEST_PAPER_LIBRARY_STATUS_NO = 0;

    /****************************************************************************
     * Description: 试卷库(Test paper library)模块{试卷库的来源1自动组卷2手动组卷3自主组卷}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int TEST_PAPER_LIBRARY_TYPE_AUTOMATIC = 1;
    public int TEST_PAPER_LIBRARY_TYPE_MANUAL = 2;
    public int TEST_PAPER_LIBRARY_TYPE_INDEPENDENT = 3;

    /****************************************************************************
     * Description: 黄浦区(Huangpu district)模块{消息状态：1已发布 0：未发布}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int HUANGPU_DISTRICT_STATUS_YES = 1;
    public int HUANGPU_DISTRICT_STATUS_NO = 0;

    /****************************************************************************
     * Description: 黄浦区(Huangpu district)模块{状态（0：待发布 1：已发布）}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int HUANGPU_DISTRICT_STATE_NO = 0;
    public int HUANGPU_DISTRICT_STATE_YES = 1;

    /****************************************************************************
     * Description: 黄浦区(Huangpu district)模块{类型（0：中心新闻 1：成绩展示 2：风采展示）}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int HUANGPU_DISTRICT_TYPE_NEWS_CENTER = 0;
    public int HUANGPU_DISTRICT_TYPE_RESULTS_SHOW = 1;
    public int HUANGPU_DISTRICT_TYPE_SHOW = 2;

    /****************************************************************************
     * Description: 系统管理(System management)模块{判定该条数据是否为有效数据：1为有效；0为无效}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int SYSTEM_MANAGEMENT_IS_VAILD_YES = 1;
    public int SYSTEM_MANAGEMENT_IS_VAILD_NO = 0;

    /****************************************************************************
     * Description: 系统管理(System management)模块{课程标记为：1为自建课程；0为基础数据}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int SYSTEM_MANAGEMENT_FLAG_SELF_COURSE = 1;
    public int SYSTEM_MANAGEMENT_FLAG_BASIS_COURSE = 0;

    /****************************************************************************
     * Description: 系统管理(System management)模块{0:学校学期 1：教师自定义学期}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int SYSTEM_MANAGEMENT_TERM_STATUS_SCHOOL_TERM = 0;
    public int SYSTEM_MANAGEMENT_TERM_STATUS_TEACHER_TERM = 1;

    /****************************************************************************
     * Description: 系统管理(System management)模块{是否是当前学期，1：是}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public String SYSTEM_MANAGEMENT_NOW_TERM_YES = "1";

    /****************************************************************************
     * Description: 系统管理(System management)模块{是否在校,1表示在校}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public String SYSTEM_MANAGEMENT_USER_STATUS_YES = "1";

    /****************************************************************************
     * Description: 系统管理(System management)模块{有效标记,1为有效}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int SYSTEM_MANAGEMENT_ENABLED_YES = 1;

    /****************************************************************************
     * Description: 教学平台功能（Teaching Function） 模块{状态 1：已发布，0：未发布}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int TEACHING_FUNCTION_STATUS_YES = 1;
    public int TEACHING_FUNCTION_PLATFORM_STATUS_NO = 0;

    /****************************************************************************
     * Description: 教学平台功能（Teaching Function ）模块{xam为测验，assignment为作业，
     *             test为考试，report为实验报告，attendence为考勤，prepareExam为预习测试，
     *             data为实验数据，menu为左侧栏，top为老教学的顶部栏}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/

    public String TEACHING_ACTIVITY_MODULE_KNOWLEDGE = "knowledge";
    public String TEACHING_ACTIVITY_MODULE_SKILL = "skill";
    public String TEACHING_ACTIVITY_MODULE_EXPERIENCE = "experience";

    public String TEACHING_ACTIVITY_TYPE_ASSIGNMENT = "assignment";
    public String TEACHING_ACTIVITY_TYPE_EXAM = "exam";
    public String TEACHING_ACTIVITY_TYPE_EXAM_ERROR = "test";
    public String TEACHING_ACTIVITY_TYPE_TEST_ERROR = "exam";
    public String TEACHING_ACTIVITY_TYPE_TEST = "test";
    public String TEACHING_ACTIVITY_TYPE_REPORT = "report";
    public String TEACHING_ACTIVITY_TYPE_ATTENDENCE = "attendance";
    public String TEACHING_ACTIVITY_TYPE_PREPAREEXAM = "prepareExam";
    public String TEACHING_ACTIVITY_TYPE_DATA = "data";
    public String TEACHING_ACTIVITY_TYPE_MENU = "menu";
    public String TEACHING_ACTIVITY_TYPE_TOP = "top";
    public String TEACHING_ACTIVITY_TYPE_EXPERIMENT = "experiment";
    public String TEACHING_ACTIVITY_TYPE_EXPREPORT = "expreport";
    public String TEACHING_ACTIVITY_TYPE_EXPTEST = "exptest";
    public String TEACHING_ACTIVITY_TYPE_EXPWORK = "expwork";
    public String TEACHING_ACTIVITY_TYPE_EXPDATA = "expdata";
    public String TEACHING_ACTIVITY_TYPE_EXPATTENDANCE = "expattendance";
    public String TEACHING_ACTIVITY_TYPE_BEHAVIOR = "behavior";
    public String TEACHING_ACTIVITY_TYPE_JUDGES = "judges";
    public String TEACHING_ACTIVITY_TYPE_TEACH = "teach";
    public String TEACHING_ACTIVITY_TYPE_GROUP = "group";
    public String TEACHING_ACTIVITY_TYPE_EXPERIENCEWORK = "experiencework";

    /****************************************************************************
     * Description: 教学平台功能（Teaching Function ）模块{标志：0：普通作业；1：小组作业}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int TEACHING_FUNCTION_IS_GROUP_NO = 0;
    public int TEACHING_FUNCTION_IS_GROUP_YES = 1;

    /****************************************************************************
     * Description: 教学平台功能（Teaching Function ）模块{作业是否全改：1.全部修改；0.部分修改}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int TEACHING_FUNCTION_IS_CHECK_ALL_YES = 1;
    public int TEACHING_FUNCTION_IS_CHECK_ALL_NO = 0;

    /****************************************************************************
     * Description: 教学平台功能（Teaching Function） 模块{作业是否需要提交：1.需要；0.不需要}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int TEACHING_FUNCTION_NEED_SUBMIT_YES = 1;
    public int TEACHING_FUNCTION_NEED_SUBMIT_NO = 0;

    /****************************************************************************
     * Description: 教学平台功能（Teaching Function） 模块{考试限制，如果为0则表示为无限次}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int TEACHING_FUNCTION_TIMELIMIT_UNLIMITED = 0;

    /****************************************************************************
     * Description: 教学平台功能（Teaching Function） 模块{是否发布到成绩册：yes是，no不是}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public String TEACHING_FUNCTION_TO_GRADEBOOK_YES = "YES";
    public String TEACHING_FUNCTION_TO_GRADEBOOK_NO = "NO";

    /****************************************************************************
     * Description: 教学平台功能（Teaching Function ）模块{学生提交作业的形式，1表示输入
     *              文字或上传附件，2表示仅文字，3表示仅附件}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int TEACHING_FUNCTION_SUBMIT_TYPE_WORD_OR_ACCESSORY = 1;
    public int TEACHING_FUNCTION_SUBMIT_TYPE_WORD = 2;
    public int TEACHING_FUNCTION_SUBMIT_TYPE_ACCESSORY = 3;

    /****************************************************************************
     * Description: 教学平台功能（Teaching Function ）模块{yes表示成绩公布给学生，no表示
     *              成绩不公布给学生}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public String TEACHING_FUNCTION_GRADE_TO_STUDENT_YES = "yes";
    public String TEACHING_FUNCTION_GRADE_TO_STUDENT_NO = "no";

    /****************************************************************************
     * Description: 教学平台功能（Teaching Function） 模块{yes表示成绩计入总成绩，no表示
     *              不计入总成绩}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public String TEACHING_FUNCTION_GRADE_TO_TOTAL_GRADE_YES = "yes";
    public String TEACHING_FUNCTION_GRADE_TO_TOTAL_GRADE_NO = "no";

    /****************************************************************************
     * Description: 教学平台功能（Teaching Function ）模块{是否显示答题详情，yes显示，no不显示}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public String TEACHING_FUNCTION_ANSWER_TO_STUDENT_SHOW = "yes";
    public String TEACHING_FUNCTION_GRADE_TO_TOTAL_GRADE_NOSHOW = "no";

    /****************************************************************************
     * Description: 教学平台功能（Teaching Function ）模块{题目来源：testpool为试卷库，
     *              question为题库}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public String TEACHING_FUNCTION_TEST_FROM_TESTPOO = "testpool";
    public String TEACHING_FUNCTION_TEST_FROM_QUESTION = "question";

    /****************************************************************************
     * Description: 教学平台功能（Teaching Function） 模块{是否在线评分：1是；0否}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int TEACHING_FUNCTION_IS_ONLINE_MARKING_YES = 1;
    public int TEACHING_FUNCTION_IS_ONLINE_MARKING_NO = 0;

    /****************************************************************************
     * Description: 教学平台功能（Teaching Function ）模块{是否迟交0正常，1迟交}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int TEACHING_FUNCTION_ISLATE_YES = 1;
    public int TEACHING_FUNCTION_ISLATE_NO = 0;

    /****************************************************************************
     * Description: 教学平台功能（Teaching Function） 模块{考勤类型：0：出勤；1：迟到；
     *              2：早退；3：旷课；4：请假}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int TEACHING_FUNCTION_ATTENDENCE_TYPE_ATTENDANCE = 0;
    public int TEACHING_FUNCTION_ATTENDENCE_TYPE_LATE = 1;
    public int TEACHING_FUNCTION_ATTENDENCE_TYPE_EARLY = 2;
    public int TEACHING_FUNCTION_ATTENDENCE_TYPE_TRUANCY = 3;
    public int TEACHING_FUNCTION_ATTENDENCE_TYPE_LEAVE = 4;

    /****************************************************************************
     * Description: 教学平台功能（Teaching Function ）模块{type默认为1，小组作业附件}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int TEACHING_FUNCTION_GRADING_TYPE_ACCESSORY = 1;

    /****************************************************************************
     * Description: 教学平台功能（Teaching Function） 模块{题目类型：1多选，2对错，4单选，
     *              5简答题，8填空，9匹配}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int TEACHING_FUNCTION_ASSIGNMENT_ITEM_TYPE_MULTI_SELECT = 1;
    public int TEACHING_FUNCTION_ASSIGNMENT_ITEM_TYPE_TRUE_OR_FALSE = 2;
    public int TEACHING_FUNCTION_ASSIGNMENT_ITEM_TYPE_MULTIPLE_CHOICE = 4;
    public int TEACHING_FUNCTION_ASSIGNMENT_ITEM_TYPE_SHORT_ANSWER = 5;
    public int TEACHING_FUNCTION_ASSIGNMENT_ITEM_TYPE_FILL_BLANKS = 8;
    public int TEACHING_FUNCTION_ASSIGNMENT_ITEM_TYPE_MATCHING = 9;

    /****************************************************************************
     * Description: 教学平台功能（Teaching Function ）模块{试题类型：1多选，2对错，4单选，
     *              5简答题，8填空，9匹配}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int TEACHING_FUNCTION_ITEM_TYPE_MULTI_SELECT = 1;
    public int TEACHING_FUNCTION_ITEM_TYPE_TRUE_OR_FALSE = 2;
    public int TEACHING_FUNCTION_ITEM_TYPE_MULTIPLE_CHOICE = 4;
    public int TEACHING_FUNCTION_ITEM_TYPE_SHORT_ANSWER = 5;
    public int TEACHING_FUNCTION_ITEM_TYPE_FILL_BLANKS = 8;
    public int TEACHING_FUNCTION_ITEM_TYPE_MATCHING = 9;

    /****************************************************************************
     * Description: 教学平台功能（Teaching Function ）模块{题库类型，1为公共题库，2为非公共题库}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int TEACHING_FUNCTION_QUESTIONPOOL_TYPE_PUBLIC = 1;
    public int TEACHING_FUNCTION_QUESTIONPOOL_TYPE_NOPUBLIC = 0;

    /****************************************************************************
     * Description: 教学平台功能（Teaching Function） 模块{题库设置项：1:公用   2:测验专用
     *             （不开放给学生练习）}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int TEACHING_FUNCTION_IS_OPEN_YES = 1;
    public int TEACHING_FUNCTION_IS_OPEN_NO = 0;

    /****************************************************************************
     * Description: 教学平台功能（Teaching Function ）模块{题库类型，0为题库，1为试卷库}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int TEACHING_FUNCTION_IS_TEST_YES = 1;
    public int TEACHING_FUNCTION_IS_TEST_NO = 0;

    /****************************************************************************
     * Description: 教学平台功能（Teaching Function） 模块{练习类型，order为顺序练习，
     *              stochastic为随机练习，mistake为错题练习}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/

    public String TEACHING_FUNCTION_EXERCISE_TYPE_ORDER = "order";
    public String TEACHING_FUNCTION_EXERCISE_TYPE_STOCHASTIC = "stochastic";
    public String TEACHING_FUNCTION_EXERCISE_TYPE_MISTAKE = "mistake";

    /****************************************************************************
     * Description: 教学平台功能（Teaching Function ）模块{是否发布:1发布，0未发布}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int TEACHING_FUNCTION_RELEASED_YES = 1;
    public int TEACHING_FUNCTION_RELEASED_NO = 0;

    /****************************************************************************
     * Description: 教学平台功能（Teaching Function ）模块{是否计入课程成绩1：计入课程成绩及平均分，0：不计入}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int TEACHING_FUNCTION_MARKED_YES = 1;
    public int TEACHING_FUNCTION_MARKED_NO = 0;



    /****************************************************************************
     * Description: 教学平台课程（Teaching platform course） 模块{表示课程来源，1表示
     *              从教务排课推送过来，2表示自主排课推送过来}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public String TEACHING_PLATFORM_COURSE_TYPE_EDUCATIONAL_ADMINISTRATION = "1";
    public String TEACHING_PLATFORM_COURSE_TYPE_INDEPENDENT = "2";

    /****************************************************************************
     * Description: 教学平台课程（Teaching platform course）模块{是否开放（0表是否，1表示是）}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int TEACHING_PLATFORM_COURSE_IS_OPEN_YES = 1;
    public int TEACHING_PLATFORM_COURSE_IS_OPEN_NO = 0;

    /****************************************************************************
     * Description: 教学平台课程（Teaching platform course）模块{使用默认为1，假删除是
     *              改状态为0}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int TEACHING_PLATFORM_COURSE_STATUS_DEFAULT = 1;
    public int TEACHING_PLATFORM_COURSE_STATUS_FALSE_DELETE = 0;

    /****************************************************************************
     * Description: 教学平台课程（Teaching platform course）模块{用于app判断是否是最
     *              近更新,0为不是最近更新，1为最近更新}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int TEACHING_PLATFORM_COURSE_IS_NEW_APP_YES = 1;
    public int TEACHING_PLATFORM_COURSE_IS_NEW_APP_NO = 0;

    /****************************************************************************
     * Description: 教学平台课程（Teaching platform course）模块{保存发布到黄浦状态
     *              1.保存 2.发布，0删除}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int TEACHING_PLATFORM_COURSE_PRO_STATUS_SAVE = 1;
    public int TEACHING_PLATFORM_COURSE_PRO_STATUS_RELEASE = 2;
    public int TEACHING_PLATFORM_COURSE_PRO_STATUS_DELETE = 0;

    /****************************************************************************
     * Description: 教学平台课程（Teaching platform course）模块{状态（0正常1关闭外键）}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int TEACHING_PLATFORM_COURSE_STATE_NORMAL = 0;
    public int TEACHING_PLATFORM_COURSE_STATE_CLOSE_FOREIGN_KEY = 1;

    /****************************************************************************
     * Description: 教学平台课程（Teaching platform course）模块{小组作品发布状态1表示
     *              发布0表示未发布}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int TEACHING_PLATFORM_COURSE_GROUP_IS_OPEN_YES = 1;
    public int TEACHING_PLATFORM_COURSE_GROUP_IS_OPEN_NO = 0;

    /****************************************************************************
     * Description: 教学平台课程（Teaching platform course）模块{发布到黄埔标志位（1：
     *              已发布，0：未发布）}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int TEACHING_PLATFORM_COURSE_GROUP_PUBLISH_YES = 1;
    public int TEACHING_PLATFORM_COURSE_GROUP_PUBLISH_NO = 0;

    /****************************************************************************
     * Description: 教学平台课程（Teaching platform course）模块{优秀作品发布标志位
     *              （1：已发布，0：未发布)}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int TEACHING_PLATFORM_COURSE_GROUP_IS_EXCELLENT_YES = 1;
    public int TEACHING_PLATFORM_COURSE_GROUP_IS_EXCELLENT_NO = 0;

    /****************************************************************************
     * Description: 教学平台课程（Teaching platform course）模块{发布到项目管理平台标
     *              志位：1：发布到项目管理平台}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int TEACHING_PLATFORM_COURSE_GROUP_PRO_STATUS_YES = 1;

    /****************************************************************************
     * Description: 教学平台课程（Teaching platform course）模块{是否可用标志位（1：可
     *              以，0:不可用)}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int TEACHING_PLATFORM_COURSE_DISABLED_YES = 1;
    public int TEACHING_PLATFORM_COURSE_DISABLED_NO = 0;

    /****************************************************************************
     * Description: 教学平台课程（Teaching platform course）模块{角色（0学生）(其他课
     *              程角色已不用该字段）}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int TEACHING_PLATFORM_COURSE_ROLE_STUDENT = 0;
    /****************************************************************************
     * Description: 教学平台课程（Teaching platform course）模块{类型，1：知识 2：技
     *              能:3：体验 200：实验项目}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    /**
     * 类型，1：知识 2：技能:3：体验 200：实验项目
     * 字段：type
     ***************************/
    public int TEACHING_PLATFORM_COURSE_CHAPTER_TYPE_KNOWLEDGE = 1;
    public int TEACHING_PLATFORM_COURSE_CHAPTER_TYPE_SKILL = 2;
    public int TEACHING_PLATFORM_COURSE_CHAPTER_TYPE_EXPERIENCE = 3;
    public int TEACHING_PLATFORM_COURSE_CHAPTER_TYPE_EXPERIMENTAL_PROJECT = 200;

    /****************************************************************************
     * Description: 教学平台课程（Teaching platform course）模块{封存，0：未封存  1：已封存}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int TEACHING_PLATFORM_COURSE_LOCKCHAPTER_YES = 1;
    public int TEACHING_PLATFORM_COURSE_LOCKCHAPTER_NO = 0;

    /****************************************************************************
     * Description: 教学平台课程（Teaching platform course）模块{资源类型：1、视频；
     *              2、图片；3、文件；4、作业；5、测试；6、考试；7、微课；8、项目卡片;
     *              9、考勤；200：实验报告，201：实验指导书，202：实验视频，203：实验
     *              图片，204：实验工具，205：实验预习测试，206：实验数据}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int TEACHING_PLATFORM_COURSE_TYPE_VIDEO = 1;
    public int TEACHING_PLATFORM_COURSE_TYPE_PICTURE = 2;
    public int TEACHING_PLATFORM_COURSE_TYPE_FILE = 3;
    public int TEACHING_PLATFORM_COURSE_TYPE_WORK = 4;
    public int TEACHING_PLATFORM_COURSE_TYPE_EXAM = 5;
    public int TEACHING_PLATFORM_COURSE_TYPE_TEST = 6;
    public int TEACHING_PLATFORM_COURSE_TYPE_SMALL_CLASS = 7;
    public int TEACHING_PLATFORM_COURSE_TYPE_PROJECT_CARD = 8;
    public int TEACHING_PLATFORM_COURSE_TYPE_ATTENDANCE = 9;
    public int TEACHING_PLATFORM_COURSE_TYPE_LAB_REPORT = 200;
    public int TEACHING_PLATFORM_COURSE_TYPE_LAB_INSTRUCTION = 201;
    public int TEACHING_PLATFORM_COURSE_TYPE_LAB_VIDEO = 202;
    public int TEACHING_PLATFORM_COURSE_TYPE_LAB_PICTURE = 203;
    public int TEACHING_PLATFORM_COURSE_TYPE_LAB_TOOL = 204;
    public int TEACHING_PLATFORM_COURSE_TYPE_LAB_TEST = 205;
    public int TEACHING_PLATFORM_COURSE_TYPE_LAB_DATA = 206;

    /****************************************************************************
     * Description: 公告栏（Bulletin board）模块{0：讨论；1、2、3：置顶；100：实验技能
     *              问答；101、102、103：实验问答置顶}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int BULLETIN_BOARD_TYPE_DISCUSS = 0;
    //public  int BULLETIN_BOARD_TYPE_TOP = 1,2,3;
    public int BULLETIN_BOARD_TYPE_LAB_QUESTION_AND_ANSWER = 100;
    //public  int BULLETIN_BOARD_TYPE_LAB_ANSWER_TOP = 101,102,103;

    /****************************************************************************
     * Description: 公告栏（Bulletin board）模块{是否发布（0未发布，1已发布）}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int BULLETIN_BOARD_PUBLISH_NO = 0;
    public int BULLETIN_BOARD_PUBLISH_YES = 1;

    /****************************************************************************
     * Description: 公告栏（Bulletin board）模块{message类型：100为通知，200为信息公告，
     *              201为信息公告和发送邮件，202为201发送邮件后的状态，301为只发送邮件，
     *              302为301发送邮件后的状态}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int BULLETIN_BOARD_MESSAGE_TYPE_NOTICE = 100;
    public int BULLETIN_BOARD_MESSAGE_TYPE_ANNOUNCEMENT = 200;
    public int BULLETIN_BOARD_MESSAGE_TYPE_ANNOUNCEMENT_AND_SEND = 201;
    public int BULLETIN_BOARD_MESSAGE_TYPE_ANNOUNCEMENT_AND_SEND_STATE = 202;
    public int BULLETIN_BOARD_MESSAGE_TYPE_SEND = 301;
    public int BULLETIN_BOARD_MESSAGE_TYPE_SEND_STATE = 302;

    /****************************************************************************
     * Description: 公告栏（Bulletin board）模块{标志：0：未读；1：已读}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int BULLETIN_BOARD_IS_READ_NO = 0;
    public int BULLETIN_BOARD_IS_READ_YES = 1;

    /****************************************************************************
     * Description: 实验项目（experimental project）模块{假删除：1、正常，0、已删除}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int EXPERIMENTAL_PROJECT_EXPERIMENT_STATUS_NORMAL = 1;
    public int EXPERIMENTAL_PROJECT_EXPERIMENT_STATUS_DELETE = 0;

    /****************************************************************************
     * Description: 实验项目（experimental project）模块{实验类别：1、基础型2、设计型
     *              3、创新型4、综合型5、演示型6、验证型}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int EXPERIMENTAL_PROJECT_EXPERIMENT_TYPE_BASIS = 1;
    public int EXPERIMENTAL_PROJECT_EXPERIMENT_TYPE_DESIGN = 2;
    public int EXPERIMENTAL_PROJECT_EXPERIMENT_TYPE_INNOVATION = 3;
    public int EXPERIMENTAL_PROJECT_EXPERIMENT_TYPE_COMPREHENSIVE = 4;
    public int EXPERIMENTAL_PROJECT_EXPERIMENT_TYPE_DEMO = 5;
    public int EXPERIMENTAL_PROJECT_EXPERIMENT_TYPE_VALIDATION = 6;

    /****************************************************************************
     * Description: 实验项目（experimental project）模块{是否启用：1、启用；0、未启用}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int EXPERIMENTAL_PROJECT_EXPERIMENT_ISOPEN_YES = 1;
    public int EXPERIMENTAL_PROJECT_EXPERIMENT_ISOPEN_NO = 0;

    /****************************************************************************
     * Description: 教学排课（teaching process）模块{排课状态 1：已发布 10未发布 2：待发布}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int TEACHING_PROCESS_STATUS_PUBLISHED = 1;
    public int TEACHING_PROCESS_STATUS_NOPUBLISHED = 10;
    public int TEACHING_PROCESS_STATUS_TO_BE_PUBLISHED = 2;

    /****************************************************************************
     * Description: 教学排课（teaching process）模块{排课方式：1直接排课2调整排课3二次
     *              不分组排课4二次分组排课5自主排课}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int TEACHING_PROCESS_TIMETABLE_STYLE_DIRECT_COURSE = 1;
    public int TEACHING_PROCESS_TIMETABLE_STYLE_ADJUST_COURSE = 2;
    public int TEACHING_PROCESS_TIMETABLE_STYLE_SECOND_NOGROUP_COURSE = 3;
    public int TEACHING_PROCESS_TIMETABLE_STYLE_SECOND_GROUP_COURSE = 4;
    public int TEACHING_PROCESS_TIMETABLE_STYLE_INDEPENDENT_COURSE = 5;

    /****************************************************************************
     * Description: 教学排课（teaching process）模块{此次排课针对的是设备还是实验室（1
     *              设备  2 实验室）}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int TEACHING_PROCESS_DEVICE_OR_LAB_ISDEVICE = 1;
    public int TEACHING_PROCESS_DEVICE_OR_LAB_ISLAB = 2;

    /****************************************************************************
     * Description: 远程实验（remote experiment）模块{ 视频码状态 0位未被使用 1 使用中}
     *
     * @author:孟金城
     * @date : 2018-08-14
     ****************************************************************************/
    public int REMOTE_EXPERIMENT_STATUS_NO = 0;
    public int REMOTE_EXPERIMENT_STATUS_YES = 1;
    /****************************************************************************
     * Description: 课程按钮（system_button）模块，{按钮所属模块 knowledge知识 creative体验 skill技能 teach课程信息 bulletin公告栏}
     *
     * @author:黄浩
     * @date : 2018-08-14
     ****************************************************************************/
    public String SYSTEM_BUTTON_TYPE_KNOWLEDGE = "/knowledge";
    public String SYSTEM_BUTTON_TYPE_CREATIVE = "/creative";
    public String SYSTEM_BUTTON_TYPE_SKILL = "/skill";
    public String SYSTEM_BUTTON_TYPE_TEACH = "/teach";
    public String SYSTEM_BUTTON_TYPE_BULLETIN = "/bulletin";
    public String SYSTEM_BUTTON_TYPE_MANAGE= "/manage";
    public String SYSTEM_BUTTON_TYPE_RESOURCE= "/resource";
}

