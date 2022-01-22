-- 添加短信签名表
-- caohuan 2021-08-30
CREATE TABLE `sms_signature` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sign_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL  COMMENT '短信签名',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;
INSERT INTO `sms_signature` (`sign_name`)  VALUES
('鲁班楼'),
('庚商鲁班楼');
