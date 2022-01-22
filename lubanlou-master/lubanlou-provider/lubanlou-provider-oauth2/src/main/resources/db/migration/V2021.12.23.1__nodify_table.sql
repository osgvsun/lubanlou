-- 2021-12-23
-- 张德冰
-- 用户表增加user_no字段，更新相关数据，删除学校对应的no字段
alter table users add `user_no` varchar(255);
  
-- 用户表，把其他***_user_no里面的数据更新到user_no
UPDATE users SET user_no = zisu_user_no WHERE zisu_user_no IS NOT NULL;

UPDATE users SET user_no = cd_user_no WHERE cd_user_no IS NOT NULL;

UPDATE users SET user_no = wz_user_no WHERE wz_user_no IS NOT NULL;

UPDATE users SET user_no = hdu_user_no WHERE hdu_user_no IS NOT NULL;

UPDATE users SET user_no = skd_user_no WHERE skd_user_no IS NOT NULL;

UPDATE users SET user_no = hust_user_no WHERE hust_user_no IS NOT NULL;

UPDATE users SET user_no = sufe_user_no WHERE sufe_user_no IS NOT NULL;

UPDATE users SET user_no = SJTU_user_no WHERE SJTU_user_no IS NOT NULL;

UPDATE users SET user_no = xaau_user_no WHERE xaau_user_no IS NOT NULL;

UPDATE users SET user_no = swufe_user_no WHERE swufe_user_no IS NOT NULL;

-- 用户表，删除学校对应的***_user_no字段 
ALTER TABLE  users DROP COLUMN zisu_user_no;

ALTER TABLE  users DROP COLUMN cd_user_no;

ALTER TABLE  users DROP COLUMN wz_user_no;

ALTER TABLE  users DROP COLUMN hdu_user_no;

ALTER TABLE  users DROP COLUMN skd_user_no;

ALTER TABLE  users DROP COLUMN hust_user_no;

ALTER TABLE  users DROP COLUMN sufe_user_no;

ALTER TABLE  users DROP COLUMN SJTU_user_no;

ALTER TABLE  users DROP COLUMN xaau_user_no;
 
ALTER TABLE  users DROP COLUMN swufe_user_no;