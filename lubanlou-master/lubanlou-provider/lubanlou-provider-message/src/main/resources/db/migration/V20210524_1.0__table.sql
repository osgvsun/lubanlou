-- 添加字段用于保存二级主题
-- 曹焕 2021-5-06
ALTER TABLE `message`
ADD COLUMN `data_process`  json NULL COMMENT '数据处理字段,json字符串',
ADD COLUMN `title` varchar(255)   CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '标题';