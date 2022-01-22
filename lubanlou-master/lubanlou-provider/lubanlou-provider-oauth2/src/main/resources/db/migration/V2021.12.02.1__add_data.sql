-- 2021-12-01
-- users表添加swufe_user_no字段用于对接学校统一身份认证
-- 张德冰
alter table users
  add `swufe_user_no` varchar(255);
