-- 2021-11-29
-- users表添加hust_user_no字段用于对接学校统一身份认证
-- 张德冰
alter table users
  add `hust_user_no` varchar(255);
