-- 添加字段用于保存审核结果中文名称(用于保证修改层级后原审核数据记录能够正常显示)
-- 吴奇臻 2019-5-24
ALTER TABLE `business_audit_level_result`
ADD COLUMN `audit_level_name`  varchar(255) NOT NULL AFTER `audit_level`;
