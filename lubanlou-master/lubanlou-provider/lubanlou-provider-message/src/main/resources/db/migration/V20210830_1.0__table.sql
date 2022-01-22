-- 添加短信模板表
-- caohuan 2021-08-30
CREATE TABLE `sms_template` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chinese_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL  COMMENT '模板中文名',
  `english_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL  COMMENT '模板英文名',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;
INSERT INTO `sms_template` (`chinese_name`, `english_name`)  VALUES
('评审通知','SMS_217436199'),
('填报通知','SMS_217416159'),
('通知用户审核完成','SMS_204125381'),
('通知管理员审核注册','SMS_204110408'),
('审核结果通知模版','SMS_202548184'),
('预约审核结果通知模板','SMS_196619478'),
('通知审核人审核模板','SMS_196615873'),
('会议准备通知','SMS_190794616'),
('参加会议通知','SMS_190784756'),
('平台通知公告','SMS_190793933'),
('教师评价','SMS_186947491'),
('审核模板','SMS_186967419'),
('通知公告','SMS_186967418');
