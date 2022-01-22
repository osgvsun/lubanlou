-- 新增审核配置相关表
-- SmarkLee
-- 2021-11-08

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;


-- ----------------------------
-- Table structure for audit_entity
-- ----------------------------
DROP TABLE IF EXISTS `audit_entity`;
CREATE TABLE `audit_entity`  (
                                 `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '配置表id',
                                 `entity_id` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '流程配置主体id',
                                 `entity_type` enum('DEV','STA','LAB','ANNEX') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '流程配置主体类型',
                                 `is_audit_unanimous` tinyint(1) NOT NULL DEFAULT 0 COMMENT '审核层级是否一致（0：不一致；1：一致）',
                                 `created_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
                                 PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for audit_config
-- ----------------------------
DROP TABLE IF EXISTS `audit_config`;
CREATE TABLE `audit_config`  (
                                 `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '审核配置表id',
                                 `audit_entity_id` int(11) NOT NULL COMMENT '审核主体表id',
                                 `audit_type` enum('ACA_INSIDE','LAB_BELONG_SCHOOL','RES_USER_BELONG_SCHOOL') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '审核类型\r\nACA_INSIDE:院内预约审核层级;\r\nLAB_BELONG_SCHOOL:实验室所在学校审核层级；\r\nRES_USER_BELONG_SCHOOL:预约人所在学校审核层级。',
                                 `audit_level_sum` int(11) NOT NULL DEFAULT 0 COMMENT '流程总层数',
                                 `is_parallel_audit` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否并行审核',
                                 `enabled` tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否启用',
                                 PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for audit_config_level
-- ----------------------------
DROP TABLE IF EXISTS `audit_config_level`;
CREATE TABLE `audit_config_level`  (
                                       `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '流程等级配置详情表',
                                       `audit_config_id` int(11) NOT NULL COMMENT '流程配置表id',
                                       `audit_level` enum('TEACHER','TEAMHEADER','EQUIPMENTADMIN','LABMANAGER','EXCENTERDIRECTOR','CHARGEADMIN','PREEXTEACHING','ACADEMYLEVELM','EXPERIMENTALTEACHING','ASSISTANT','SUPERADMIN','GRADUATE','COLLEGELEADER','DEAN','ASSETMANAGEMENT','CFO','DEPARTMENTHEADER','CABINETADMIN','LABORATORYMAINTENANCE','PRESECTEACHING','ASSETMANAGER','SUPERVISIONGROUP','FULLTIMEMANAGER','STUGROUP','OPEARTIONSECURITYMANAGEMENT') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '对应流程层级code',
                                       `level_num` int(2) NOT NULL COMMENT '第几级',
                                       `enabled` tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否可用（重新保存层级后，原有的层级置为不可用）',
                                       PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;

