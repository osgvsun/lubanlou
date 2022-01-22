-- attendance_mode新增表-考勤模式表
-- 作者：陈佳利
-- 日期：2021-09-14
CREATE TABLE `attendance_mode`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hardware_type` int(11)  NOT NULL COMMENT '考勤设备类型(547-考勤机;751-班牌;872-工位仪;548-门禁;888-小程序)',
  `enabled` int(11) NULL DEFAULT NULL COMMENT '是否使用(1-使用;null或者0-未使用)',
  PRIMARY KEY (`id`) USING BTREE
)
 ENGINE = InnoDB
 CHARACTER SET = utf8 COLLATE = utf8_general_ci
 COMMENT='考勤模式表'
 ROW_FORMAT = COMPACT;