-- attendance_course新增表
-- 作者：陈佳利
-- 日期：2021-07-27
CREATE TABLE `attendance_course`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `course_no` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '课程编号',
  `course_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '课程名称',
  `lp_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '实验项目',
  `academy_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '学院名称',
  `lab_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '实验室名称',
  `teacher_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '教师姓名',
  `student_no` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '学生学号',
  `class_date` date NULL DEFAULT NULL COMMENT '上课日期',
  `weeks` int(11) NULL DEFAULT NULL COMMENT '上课周次',
  `weekday` int(11) NULL DEFAULT NULL COMMENT '上课星期',
  `start_class` int(11) NULL DEFAULT NULL COMMENT '开始节次',
  `end_class` int(11) NULL DEFAULT NULL COMMENT '结束节次',
  `attendance_status` int(11) NULL DEFAULT NULL COMMENT '手动考勤状态',
  PRIMARY KEY (`id`) USING BTREE
)
 ENGINE = InnoDB
 CHARACTER SET = utf8 COLLATE = utf8_general_ci
 COMMENT='课程考勤表'
 ROW_FORMAT = COMPACT;