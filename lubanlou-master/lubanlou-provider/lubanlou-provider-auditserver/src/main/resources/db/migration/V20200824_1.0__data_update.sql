-- 更新实验室管理的基础配置数据
-- 陈乐为
update c_message_properties set info='是否开启实验项目审核' where business_config_item='ItemAuditOrNot' AND project_name='limsproduct';