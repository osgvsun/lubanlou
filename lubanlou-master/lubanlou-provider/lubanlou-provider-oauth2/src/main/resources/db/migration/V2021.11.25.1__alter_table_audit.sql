-- 2021-11-25
-- audit表添加created_time字段用于排序
-- Smark Lee
ALTER TABLE `audit`
ADD COLUMN `created_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间' AFTER `comment`;
