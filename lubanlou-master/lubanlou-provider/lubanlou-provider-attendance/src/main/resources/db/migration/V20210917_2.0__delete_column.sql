-- 清理冗余字段
-- 修改状态status字段注释
-- 陈佳利
alter table attendance_status drop column cname;
alter table attendance_status drop column class_date;
alter table attendance_status drop column first_time;
alter table attendance_status drop column last_time;
alter table attendance_status drop column first_att;
alter table attendance_status drop column last_att;
alter table attendance_status drop column first_address;
alter table attendance_status drop column last_address;


