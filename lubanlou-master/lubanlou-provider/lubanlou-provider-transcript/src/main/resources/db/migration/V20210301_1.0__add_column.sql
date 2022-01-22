-- 新增display字段标识显示（1）还是隐藏（0）
ALTER TABLE `t_weight_setting`
ADD COLUMN `display` int(11) NULL COMMENT '显示（1）还是隐藏（0）,默认显示' AFTER `parent_id`;