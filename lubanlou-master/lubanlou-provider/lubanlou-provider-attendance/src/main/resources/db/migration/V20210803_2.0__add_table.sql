-- common_hdwlog新增表
-- 作者：陈佳利
-- 日期：2021-08-03
CREATE TABLE `common_hdwlog`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `cardno` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '卡号',
  `cardname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户名',
  `hardware_ip` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '物联ip',
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '状态',
  `datetime` datetime(0) NULL DEFAULT NULL COMMENT '操作日期',
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户工号',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '考勤地位',
  `hardware_type` int(11) NULL DEFAULT NULL COMMENT '机器类型',
  `source` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '机器MAC地址',
  `att_type_id` int(11) NULL DEFAULT NULL COMMENT '考勤类型号',
  `deviceindex` int(11) NULL DEFAULT NULL COMMENT '门号',
  `att_data_source` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '考勤数据来源',
  `att_deviation` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '考勤偏差距离',
  `att_room` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '考勤教室信息',
  `att_destination` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '考勤目标地址',
  `status_type` int(11) NULL DEFAULT NULL COMMENT '刷卡类型：0：失败；1：成功打开（无打开关闭之分的则默认1）；2：成功关闭',
  PRIMARY KEY (`id`) USING BTREE
)
 ENGINE = InnoDB
 CHARACTER SET = utf8 COLLATE = utf8_general_ci
 COMMENT='物联日志表'
 ROW_FORMAT = COMPACT;