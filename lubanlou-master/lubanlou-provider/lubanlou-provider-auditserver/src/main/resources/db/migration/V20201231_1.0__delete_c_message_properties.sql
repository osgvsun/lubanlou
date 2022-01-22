-- 大仪删除配置项:无用收费配置项删除
-- 李涵
-- 2020-12-31

DELETE
FROM
    c_message_properties
WHERE
    business_config_item IN ( 'isChargePersonalOrNot', 'isJudgeChargeByCommonTeam' );