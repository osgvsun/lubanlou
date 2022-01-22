-- 添加字段用于保存二级主题
-- 曹焕 2021-5-06
ALTER TABLE `message`
ADD COLUMN `sub_topic`  varchar(255)  COMMENT '二级主题' AFTER `message_topic`,
ADD COLUMN `project_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci;