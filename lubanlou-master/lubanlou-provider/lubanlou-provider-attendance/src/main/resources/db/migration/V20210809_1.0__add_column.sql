-- attendance_course表添加字段
-- 作者：陈佳利
-- 日期：2021-08-09
ALTER TABLE `attendance_course`
ADD COLUMN `start_time`  time(0) NULL DEFAULT NULL COMMENT '开始节次时间',
ADD COLUMN `end_time`  time(0) NULL DEFAULT NULL COMMENT '结束节次时间';