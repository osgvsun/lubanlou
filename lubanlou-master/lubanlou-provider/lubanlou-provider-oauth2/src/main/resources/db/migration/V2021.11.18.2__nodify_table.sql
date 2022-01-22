-- 2021-11-18
-- 角色授权关系表删除多余字段
-- lay
ALTER TABLE  `rbac_role_resource_permission` DROP COLUMN business_uid;
ALTER TABLE `rbac_role_resource_permission` modify column resource_uid VARCHAR(255);
