update user_client_authority set client_id = 'xmgl' where client_id = 'GvsunProject';
update authorities set client_id = 'xmgl' where client_id = 'GvsunProject';
delete from oauth_client_details where client_id = 'GvsunProject';
update oauth_client_details set client_name = '项目管理' where client_id = 'xmgl';