-- 添加业务识别类型,业务id以及通用识别字段
-- lay 2021-5-26
ALTER TABLE `message`
ADD COLUMN `business_type`  varchar(255)   CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '通用业务类型',
ADD COLUMN `business_uid`  varchar(255)   CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '通用业务主键',
ADD COLUMN `general_identification`  varchar(255)   CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '通用识别字段';