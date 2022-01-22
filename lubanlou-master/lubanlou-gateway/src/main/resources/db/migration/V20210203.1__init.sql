DROP TABLE IF EXISTS `gateway_api_define`;
CREATE TABLE `gateway_api_define`
(
    `id`               varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
    `path`             varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
    `service_id`       varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
    `url`              varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL     DEFAULT NULL,
    `retryable`        int                                                     NOT NULL DEFAULT 0,
    `enabled`          int                                                     NOT NULL DEFAULT 1,
    `strip_prefix`     int                                                     NOT NULL DEFAULT 1,
    `api_name`         varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL     DEFAULT NULL,
    `white_label`      int                                                     NOT NULL DEFAULT 1 COMMENT '1全局白名单,2局部白名单,3局部黑名单',
    `description`      varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL     DEFAULT NULL,
    `part_white_label` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL     DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  CHARACTER SET = utf8
  COLLATE = utf8_general_ci;

INSERT INTO `gateway_api_define`(`id`, `path`, `service_id`, `url`, `retryable`, `enabled`, `strip_prefix`, `api_name`,
                                 `white_label`, `description`, `part_white_label`)
VALUES ('oauth2', '/jwt/**', 'oauth2', NULL, 0, 1, 1, NULL, 1, 'OAuth2', NULL);


INSERT INTO `gateway_api_define` (`id`, `path`, `service_id`, `url`, `retryable`, `enabled`, `strip_prefix`, `api_name`, `white_label`, `description`, `part_white_label`) VALUES ('auditserver', '/auditserver/**', 'auditserver', '', 0, 1, 1, NULL, 1, '审核微服务', NULL);
INSERT INTO `gateway_api_define` (`id`, `path`, `service_id`, `url`, `retryable`, `enabled`, `strip_prefix`, `api_name`, `white_label`, `description`, `part_white_label`) VALUES ('cms', '/cmsproduct/**', 'cms', '', 0, 1, 1, NULL, 1, '', '');
INSERT INTO `gateway_api_define` (`id`, `path`, `service_id`, `url`, `retryable`, `enabled`, `strip_prefix`, `api_name`, `white_label`, `description`, `part_white_label`) VALUES ('config', '/config/**', 'config', '', 0, 1, 1, NULL, 1, '', NULL);
INSERT INTO `gateway_api_define` (`id`, `path`, `service_id`, `url`, `retryable`, `enabled`, `strip_prefix`, `api_name`, `white_label`, `description`, `part_white_label`) VALUES ('configcenter', '/configcenter/**', 'configcenter', '', 0, 1, 1, NULL, 1, 'configcenter 配置中心', '');
INSERT INTO `gateway_api_define` (`id`, `path`, `service_id`, `url`, `retryable`, `enabled`, `strip_prefix`, `api_name`, `white_label`, `description`, `part_white_label`) VALUES ('customer', '/customer/**', 'customer', '', 0, 1, 1, NULL, 1, '', '');
INSERT INTO `gateway_api_define` (`id`, `path`, `service_id`, `url`, `retryable`, `enabled`, `strip_prefix`, `api_name`, `white_label`, `description`, `part_white_label`) VALUES ('cvinlims', '/cvinlims/timetable/**', 'timetable', '', 0, 1, 1, '', 1, '江苏威诺排产', '');
INSERT INTO `gateway_api_define` (`id`, `path`, `service_id`, `url`, `retryable`, `enabled`, `strip_prefix`, `api_name`, `white_label`, `description`, `part_white_label`) VALUES ('datashare', '/datashare/**', 'datashare', '', 0, 1, 1, NULL, 1, '', '');
INSERT INTO `gateway_api_define` (`id`, `path`, `service_id`, `url`, `retryable`, `enabled`, `strip_prefix`, `api_name`, `white_label`, `description`, `part_white_label`) VALUES ('examserver', '/examserver/**', 'examserver', '', 0, 1, 1, NULL, 1, '', NULL);
INSERT INTO `gateway_api_define` (`id`, `path`, `service_id`, `url`, `retryable`, `enabled`, `strip_prefix`, `api_name`, `white_label`, `description`, `part_white_label`) VALUES ('experiment', '/experiment/**', 'experiment', '', 1, 1, 1, NULL, 1, '实验室项目', '');
INSERT INTO `gateway_api_define` (`id`, `path`, `service_id`, `url`, `retryable`, `enabled`, `strip_prefix`, `api_name`, `white_label`, `description`, `part_white_label`) VALUES ('gscheck', '/gscheck/timetable/**', 'timetable', '', 0, 1, 1, '', 1, '江苏威诺排产', '');
INSERT INTO `gateway_api_define` (`id`, `path`, `service_id`, `url`, `retryable`, `enabled`, `strip_prefix`, `api_name`, `white_label`, `description`, `part_white_label`) VALUES ('iot', '/iot/**', 'iot', '', 0, 1, 1, NULL, 1, '', '');
INSERT INTO `gateway_api_define` (`id`, `path`, `service_id`, `url`, `retryable`, `enabled`, `strip_prefix`, `api_name`, `white_label`, `description`, `part_white_label`) VALUES ('message', '/message/**', 'message', '', 0, 1, 1, NULL, 1, '消息服务', '');
INSERT INTO `gateway_api_define` (`id`, `path`, `service_id`, `url`, `retryable`, `enabled`, `strip_prefix`, `api_name`, `white_label`, `description`, `part_white_label`) VALUES ('process', '/process/**', 'process', '', 0, 1, 1, NULL, 1, 'process会议中心', '');
INSERT INTO `gateway_api_define` (`id`, `path`, `service_id`, `url`, `retryable`, `enabled`, `strip_prefix`, `api_name`, `white_label`, `description`, `part_white_label`) VALUES ('report-service', '/report-service/**', 'report-service', NULL, 0, 1, 1, NULL, 1, '报表中心', NULL);
INSERT INTO `gateway_api_define` (`id`, `path`, `service_id`, `url`, `retryable`, `enabled`, `strip_prefix`, `api_name`, `white_label`, `description`, `part_white_label`) VALUES ('resource', '/resource/**', 'resource', '', 0, 1, 1, NULL, 1, '资源容器', '/gvsunResource/uploadFile\r\n/gvsunResource/resourceContainer.js\r\n/gvsunDirectory/getDataGrade\r\n/shareApi/.*');
INSERT INTO `gateway_api_define` (`id`, `path`, `service_id`, `url`, `retryable`, `enabled`, `strip_prefix`, `api_name`, `white_label`, `description`, `part_white_label`) VALUES ('sjtudc-service', '/sjtudc/**', 'sjtudc-service', '', 0, 1, 1, NULL, 1, '', '');
INSERT INTO `gateway_api_define` (`id`, `path`, `service_id`, `url`, `retryable`, `enabled`, `strip_prefix`, `api_name`, `white_label`, `description`, `part_white_label`) VALUES ('timetable', '/timetable/**', 'timetable', '', 0, 1, 1, NULL, 0, '', '');
INSERT INTO `gateway_api_define` (`id`, `path`, `service_id`, `url`, `retryable`, `enabled`, `strip_prefix`, `api_name`, `white_label`, `description`, `part_white_label`) VALUES ('timetable-gscheck', '/gscheck/timetable/**', 'timetable-gscheck', '', 0, 1, 1, NULL, 1, NULL, NULL);
INSERT INTO `gateway_api_define` (`id`, `path`, `service_id`, `url`, `retryable`, `enabled`, `strip_prefix`, `api_name`, `white_label`, `description`, `part_white_label`) VALUES ('timetable-gvsuntest', '/limsproduct/timetable/**', 'timetable', '', 0, 1, 1, NULL, 1, '', '');
INSERT INTO `gateway_api_define` (`id`, `path`, `service_id`, `url`, `retryable`, `enabled`, `strip_prefix`, `api_name`, `white_label`, `description`, `part_white_label`) VALUES ('timetable-jnulims', '/jnulims/timetable/**', 'timetable-jnulims', '', 0, 1, 1, NULL, 1, NULL, NULL);
INSERT INTO `gateway_api_define` (`id`, `path`, `service_id`, `url`, `retryable`, `enabled`, `strip_prefix`, `api_name`, `white_label`, `description`, `part_white_label`) VALUES ('timetable-sjdhj', '/shjdhjlims/timetable/**', 'timetable-sjdhj', '', 0, 1, 1, NULL, 1, '上海交大环境', '');
INSERT INTO `gateway_api_define` (`id`, `path`, `service_id`, `url`, `retryable`, `enabled`, `strip_prefix`, `api_name`, `white_label`, `description`, `part_white_label`) VALUES ('timetable-zjcclims', '/zjcclims/timetable/**', 'timetable-zjcclims', '', 0, 1, 1, NULL, 1, NULL, NULL);
INSERT INTO `gateway_api_define` (`id`, `path`, `service_id`, `url`, `retryable`, `enabled`, `strip_prefix`, `api_name`, `white_label`, `description`, `part_white_label`) VALUES ('transcript', '/transcript/**', 'transcript', '', 0, 1, 1, NULL, 1, NULL, NULL);
INSERT INTO `gateway_api_define` (`id`, `path`, `service_id`, `url`, `retryable`, `enabled`, `strip_prefix`, `api_name`, `white_label`, `description`, `part_white_label`) VALUES ('usercenter', '/usercenter/**', 'usercenter', '', 0, 1, 1, NULL, 1, '用户中心', '');
INSERT INTO `gateway_api_define` (`id`, `path`, `service_id`, `url`, `retryable`, `enabled`, `strip_prefix`, `api_name`, `white_label`, `description`, `part_white_label`) VALUES ('xmgl', '/xmgl/**', 'xmgl', '', 0, 1, 1, NULL, 1, '项目管理', '');
