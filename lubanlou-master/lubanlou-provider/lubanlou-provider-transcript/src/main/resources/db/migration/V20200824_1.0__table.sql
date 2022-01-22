ALTER TABLE `t_weight_setting` ADD COLUMN `level` int(11) NULL COMMENT '评分项等级';
ALTER TABLE `t_weight_setting` ADD COLUMN `practice_id` int(11) NULL COMMENT '工训评分项id';
ALTER TABLE `t_weight_setting` ADD COLUMN `parent_id` int(11) NULL COMMENT '上一级评分项id';
ALTER TABLE `object_weight` ADD COLUMN `marking_score` decimal(10,2) NULL COMMENT '';