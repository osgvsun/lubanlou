-- message_receiver表添加字段
-- 曹焕 2021-5-06
ALTER TABLE `message_receiver`
ADD COLUMN `read_state` int(11) NULL DEFAULT NULL COMMENT '消息状态（0：未读，1：已读）',
ADD COLUMN `read_time` datetime(0) NULL DEFAULT NULL COMMENT '读取时间',
ADD COLUMN `handle_state` int(11) NULL DEFAULT NULL COMMENT '处理状态（0：未处理，1：已处理）',
ADD COLUMN `handle_time` datetime(0) NULL DEFAULT NULL COMMENT  '处理时间';
