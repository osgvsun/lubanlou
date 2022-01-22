-- 修改字段类型
-- 黄浩
ALTER TABLE t_grade_object
MODIFY  `assignment_id` VARCHAR(255) NULL DEFAULT NULL COMMENT '关联t_assignment作业或测试id';