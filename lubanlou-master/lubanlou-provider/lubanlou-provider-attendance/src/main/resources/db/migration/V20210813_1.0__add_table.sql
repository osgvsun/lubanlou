-- attendance_status新增表-学生考勤状态表
-- 作者：陈佳利
-- 日期：2021-08-13
CREATE TABLE `attendance_status`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL  COMMENT '主键id',
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci  NOT NULL COMMENT '学号',
  `cname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户名',
  `class_date` date NULL DEFAULT NULL COMMENT '上课日期',
  `first_time` datetime(0) NULL DEFAULT NULL COMMENT '刷卡时间1',
  `last_time` datetime(0) NULL DEFAULT NULL COMMENT '刷卡时间2',
  `first_att` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '考勤偏差距离1',
  `last_att` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '考勤偏差距离2',
  `first_address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '考勤地点1',
  `last_address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '考勤地点2',
  `status` int(11) NULL DEFAULT NULL COMMENT '考勤状态（1-正常；2-迟到/早退；3-旷课；4-请假；）',
  PRIMARY KEY (`id`,`username`) USING BTREE
)
 ENGINE = InnoDB
 CHARACTER SET = utf8 COLLATE = utf8_general_ci
 COMMENT='学生考勤状态表'
 ROW_FORMAT = COMPACT;