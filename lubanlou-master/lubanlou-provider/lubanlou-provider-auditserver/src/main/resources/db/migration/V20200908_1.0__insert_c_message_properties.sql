-- 插入实验室管理配置
-- 陈乐为

INSERT INTO `c_message_properties` (`business_config_item`, `business_config_status`, `info`) VALUES ('TimetableAuditOrNot', 'yes', '是否开启教务排课审核');
INSERT INTO `c_message_properties` (`business_config_item`, `business_config_status`, `info`) VALUES ('SelfTimetableAuditOrNot', 'yes', '是否开启自主排课审核');
INSERT INTO `c_message_properties` (`business_config_item`, `business_config_status`, `info`) VALUES ('LabRoomStationGradedOrNot', 'no', '是否开启工位预约实验室分级审核');
INSERT INTO `c_message_properties` (`business_config_item`, `business_config_status`, `info`) VALUES ('AdjustTimetableAuditOrNot', 'yes', '是否开启调课审核');
INSERT INTO `c_message_properties` (`business_config_item`, `business_config_status`, `info`) VALUES ('CloseTimetableAuditOrNot', 'yes', '是否开启停课审核');
INSERT INTO `c_message_properties` (`business_config_item`, `business_config_status`, `info`) VALUES ('isSchoolLevelExamOrNot', 'no', '是否开启校级准入考试');
INSERT INTO `c_message_properties` (`business_config_item`, `business_config_status`, `info`) VALUES ('LabReservationAuditOrNot', 'yes', '是否开启实验室预约审核');
INSERT INTO `c_message_properties` (`business_config_item`, `business_config_status`, `info`) VALUES ('DeviceRepairAuditOrNot', 'yes', '是否开启设备维修审核');
INSERT INTO `c_message_properties` (`business_config_item`, `business_config_status`, `info`) VALUES ('DeviceReservationAuditOrNot', 'yes', '是否开启设备预约审核');
INSERT INTO `c_message_properties` (`business_config_item`, `business_config_status`, `info`) VALUES ('StationReservationAuditOrNot', 'yes', '是否开启工位预约审核');
INSERT INTO `c_message_properties` (`business_config_item`, `business_config_status`, `info`) VALUES ('CancelLabResAuditOrNot', 'yes', '是否开启实验室取消预约审核');
INSERT INTO `c_message_properties` (`business_config_item`, `business_config_status`, `info`) VALUES ('DeviceLendAuditOrNot', 'yes', '是否开启设备借用审核');
INSERT INTO `c_message_properties` (`business_config_item`, `business_config_status`, `info`) VALUES ('CancelStationResAuditOrNot', 'yes', '是否开启工位取消预约审核');


INSERT INTO `c_message_properties_extend` (`business_config_item`, `business_config_item_extend`, `business_config_extend_status`, `info`) VALUES ('LabRoomStationGradedOrNot', '1LabRoomStationGradedOrNot', 'yes', '是否开启一级实验室工位预约审核');
INSERT INTO `c_message_properties_extend` (`business_config_item`, `business_config_item_extend`, `business_config_extend_status`, `info`) VALUES ('LabRoomStationGradedOrNot', '2LabRoomStationGradedOrNot', 'no', '是否开启二级实验室工位预约审核');
INSERT INTO `c_message_properties_extend` (`business_config_item`, `business_config_item_extend`, `business_config_extend_status`, `info`) VALUES ('TimetableAuditOrNot', 'TimetableAuditOrNotMsg', 'no', '是否开启审核信息发送短信服务');
INSERT INTO `c_message_properties_extend` (`business_config_item`, `business_config_item_extend`, `business_config_extend_status`, `info`) VALUES ('TimetableAuditOrNot', 'TimetableAuditOrNotMail', 'no', '是否开启审核信息发送邮件服务');
INSERT INTO `c_message_properties_extend` (`business_config_item`, `business_config_item_extend`, `business_config_extend_status`, `info`) VALUES ('SelfTimetableAuditOrNot', 'SelfTimetableAuditOrNotMsg', 'no', '是否开启审核信息发送短信服务');
INSERT INTO `c_message_properties_extend` (`business_config_item`, `business_config_item_extend`, `business_config_extend_status`, `info`) VALUES ('SelfTimetableAuditOrNot', 'SelfTimetableAuditOrNotMail', 'no', '是否开启审核信息发送邮件服务');
INSERT INTO `c_message_properties_extend` (`business_config_item`, `business_config_item_extend`, `business_config_extend_status`, `info`) VALUES ('AdjustTimetableAuditOrNot', 'AdjustTimetableAuditOrNotMsg', 'no', '是否开启审核信息发送短信服务');
INSERT INTO `c_message_properties_extend` (`business_config_item`, `business_config_item_extend`, `business_config_extend_status`, `info`) VALUES ('AdjustTimetableAuditOrNot', 'AdjustTimetableAuditOrNotMail', 'no', '是否开启审核信息发送邮件服务');
INSERT INTO `c_message_properties_extend` (`business_config_item`, `business_config_item_extend`, `business_config_extend_status`, `info`) VALUES ('CloseTimetableAuditOrNot', 'CloseTimetableAuditOrNotMsg', 'no', '是否开启审核信息发送短信服务');
INSERT INTO `c_message_properties_extend` (`business_config_item`, `business_config_item_extend`, `business_config_extend_status`, `info`) VALUES ('CloseTimetableAuditOrNot', 'CloseTimetableAuditOrNotMail', 'no', '是否开启审核信息发送邮件服务');
INSERT INTO `c_message_properties_extend` (`business_config_item`, `business_config_item_extend`, `business_config_extend_status`, `info`) VALUES ('ItemAuditOrNot', 'ItemAuditOrNotMsg', 'no', '是否开启审核信息发送短信服务');
INSERT INTO `c_message_properties_extend` (`business_config_item`, `business_config_item_extend`, `business_config_extend_status`, `info`) VALUES ('ItemAuditOrNot', 'ItemAuditOrNotMail', 'no', '是否开启审核信息发送邮件服务');
INSERT INTO `c_message_properties_extend` (`business_config_item`, `business_config_item_extend`, `business_config_extend_status`, `info`) VALUES ('OutlineAuditOrNot', 'OutlineAuditOrNotMsg', 'no', '是否开启审核信息发送短信服务');
INSERT INTO `c_message_properties_extend` (`business_config_item`, `business_config_item_extend`, `business_config_extend_status`, `info`) VALUES ('OutlineAuditOrNot', 'OutlineAuditOrNotMail', 'no', '是否开启审核信息发送邮件服务');
INSERT INTO `c_message_properties_extend` (`business_config_item`, `business_config_item_extend`, `business_config_extend_status`, `info`) VALUES ('LabReservationAuditOrNot', 'LabReservationAuditOrNotMsg', 'yes', '是否开启审核信息发送短信服务');
INSERT INTO `c_message_properties_extend` (`business_config_item`, `business_config_item_extend`, `business_config_extend_status`, `info`) VALUES ('DeviceRepairAuditOrNot', 'DeviceRepairAuditOrNotMsg', 'yes', '是否开启审核信息发送短信服务');
INSERT INTO `c_message_properties_extend` (`business_config_item`, `business_config_item_extend`, `business_config_extend_status`, `info`) VALUES ('DeviceReservationAuditOrNot', 'DeviceReservationAuditOrNotMsg', 'yes', '是否开启审核信息发送短信服务');
INSERT INTO `c_message_properties_extend` (`business_config_item`, `business_config_item_extend`, `business_config_extend_status`, `info`) VALUES ('StationReservationAuditOrNot', 'StationReservationAuditOrNotMsg', 'yes', '是否开启审核信息发送短信服务');
INSERT INTO `c_message_properties_extend` (`business_config_item`, `business_config_item_extend`, `business_config_extend_status`, `info`) VALUES ('CancelLabResAuditOrNot', 'CancelLabResAuditOrNotMsg', 'yes', '是否开启审核信息发送短信服务');
INSERT INTO `c_message_properties_extend` (`business_config_item`, `business_config_item_extend`, `business_config_extend_status`, `info`) VALUES ('DeviceLendAuditOrNot', 'DeviceLendAuditOrNotMsg', 'yes', '是否开启审核信息发送短信服务');
INSERT INTO `c_message_properties_extend` (`business_config_item`, `business_config_item_extend`, `business_config_extend_status`, `info`) VALUES ('CancelStationResAuditOrNot', 'CancelStationResAuditOrNotMsg', 'yes', '是否开启审核信息发送短信服务');
INSERT INTO `c_message_properties_extend` (`business_config_item`, `business_config_item_extend`, `business_config_extend_status`, `info`) VALUES ('LabReservationAuditOrNot', 'LabReservationAuditOrNotMail', 'yes', '是否开启审核信息发送邮件服务');
INSERT INTO `c_message_properties_extend` (`business_config_item`, `business_config_item_extend`, `business_config_extend_status`, `info`) VALUES ('DeviceRepairAuditOrNot', 'DeviceRepairAuditOrNotMail', 'yes', '是否开启审核信息发送邮件服务');
INSERT INTO `c_message_properties_extend` (`business_config_item`, `business_config_item_extend`, `business_config_extend_status`, `info`) VALUES ('DeviceReservationAuditOrNot', 'DeviceReservationAuditOrNotMail', 'yes', '是否开启审核信息发送邮件服务');
INSERT INTO `c_message_properties_extend` (`business_config_item`, `business_config_item_extend`, `business_config_extend_status`, `info`) VALUES ('StationReservationAuditOrNot', 'StationReservationAuditOrNotMail', 'yes', '是否开启审核信息发送邮件服务');
INSERT INTO `c_message_properties_extend` (`business_config_item`, `business_config_item_extend`, `business_config_extend_status`, `info`) VALUES ('CancelLabResAuditOrNot', 'CancelLabResAuditOrNotMail', 'yes', '是否开启审核信息发送邮件服务');
INSERT INTO `c_message_properties_extend` (`business_config_item`, `business_config_item_extend`, `business_config_extend_status`, `info`) VALUES ('DeviceLendAuditOrNot', 'DeviceLendAuditOrNotMail', 'yes', '是否开启审核信息发送邮件服务');
INSERT INTO `c_message_properties_extend` (`business_config_item`, `business_config_item_extend`, `business_config_extend_status`, `info`) VALUES ('CancelStationResAuditOrNot', 'CancelStationResAuditOrNotMail', 'yes', '是否开启审核信息发送邮件服务');
