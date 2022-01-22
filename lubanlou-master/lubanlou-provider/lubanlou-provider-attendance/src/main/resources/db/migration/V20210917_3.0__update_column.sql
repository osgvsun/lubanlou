-- 修改状态status字段注释
-- 陈佳利
alter table attendance_status modify status int(11) NULL DEFAULT NULL COMMENT '考勤状态（1-正常；2-迟到；3-早退；4-旷课；5-请假）';


