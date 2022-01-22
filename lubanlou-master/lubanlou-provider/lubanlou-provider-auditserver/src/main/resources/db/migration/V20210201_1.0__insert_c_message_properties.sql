-- 添加实验室取消预约功能
-- lay
-- 2021-02-01

INSERT INTO `c_message_properties` (`project_name`, `business_config_item`, `business_config_status`, `info`) VALUES ('limsproduct', 'CancelDeviceResAuditOrNot', 'no', '是否开启设备取消预约审核');
INSERT INTO `c_message_properties_extend` (`project_name`, `business_config_item`, `business_config_item_extend`,  `business_config_extend_status`,`info`) VALUES ('limsproduct',  'CancelDeviceResAuditOrNot','CancelDeviceResAuditOrNotMsg', 'no', '是否开启审核信息发送短信服务');
INSERT INTO `c_message_properties_extend` (`project_name`, `business_config_item`, `business_config_item_extend`,  `business_config_extend_status`,`info`) VALUES ('limsproduct',  'CancelDeviceResAuditOrNot','CancelDeviceResAuditOrNotMail', 'no', '是否开启审核信息发送邮件服务');
