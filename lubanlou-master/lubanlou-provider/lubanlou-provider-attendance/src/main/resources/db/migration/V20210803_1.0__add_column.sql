-- attendance_course表添加字段
-- 作者：陈佳利
-- 日期：2021-08-03
ALTER TABLE `attendance_course`
ADD COLUMN `student_name`  varchar(255) NULL DEFAULT NULL COMMENT '学生姓名';