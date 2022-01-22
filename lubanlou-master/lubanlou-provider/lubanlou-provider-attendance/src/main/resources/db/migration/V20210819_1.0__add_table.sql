-- attendance_items新增表-项目考勤表
-- 作者：陈佳利
-- 日期：2021-08-19
CREATE TABLE `attendance_items`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL  COMMENT '主键id',
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci  NOT NULL COMMENT '学生学号',
  `course_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '课程名称',
  `item_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '项目名称',
  `teachers` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '教师姓名',
  `weeks` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '项目周次',
  `school_year` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '学年',
  PRIMARY KEY (`id`,`username`) USING BTREE
)
 ENGINE = InnoDB
 CHARACTER SET = utf8 COLLATE = utf8_general_ci
 COMMENT='项目考勤表'
 ROW_FORMAT = COMPACT;