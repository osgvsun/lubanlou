-- 2021-11-18
-- 角色授权关系表添加字段及修改字段名
-- lay
ALTER TABLE `rbac_role_resource_permission` add business_uid varchar(255);
ALTER TABLE `rbac_role_resource_permission` add business_type VARCHAR(255);
