-- 更新实验室管理的基础配置数据
-- 陈乐为
update c_message_properties set business_config_status='yes' where business_config_status='1';
update c_message_properties set business_config_status='no' where business_config_status='2';

update c_message_properties_extend set business_config_extend_status='yes' where business_config_extend_status='1';
update c_message_properties_extend set business_config_extend_status='no' where business_config_extend_status='2';