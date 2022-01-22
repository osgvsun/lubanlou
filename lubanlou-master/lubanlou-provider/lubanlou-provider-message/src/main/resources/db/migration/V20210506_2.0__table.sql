-- 修改、删除字段
-- 曹焕 2021-5-06
ALTER TABLE `message`
MODIFY COLUMN `message_topic` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE `message`
drop time_stamp;
