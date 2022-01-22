-- 添加大仪配置教师权限是否需要参加统一安全考试
-- 李涵
-- 2021-05-21

INSERT INTO `c_message_properties` (`project_name`,`business_config_item`, `business_config_status`, `info`) VALUES ('insproduct','isTeacherNeedCommonAccess', 'no', '是否教师需要参加统一考试');
INSERT INTO `c_message_properties` (`project_name`,`business_config_item`, `business_config_status`, `info`) VALUES ('tcminstruments','isTeacherNeedCommonAccess', 'no', '是否教师需要参加统一考试');