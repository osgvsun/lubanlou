-- 功能描述：获取指定用户在各个站点下的权限
-- 陈敬
-- 2021-12-22 update By SmarkLee 添加权限主键字段
drop procedure if exists proc_authority;
delimiter //
create procedure proc_authority(in p_username varchar(255))
begin
    SELECT
        a.client_id,
        (SELECT client_name
         from oauth_client_details
         where client_id = a.client_id) as client_name,
        a.authority_ename,
        a.authority_cname,
        a.client_authority_id,
        case when u.username is not null
                 then true
             else false end                  as checked,
        a.role_uid as role_uid
    FROM
        (SELECT username
         FROM users
         WHERE username = p_username) as u
            LEFT JOIN user_client_authority as uca on u.username = uca.username
            RIGHT JOIN authorities as a on a.client_id = uca.client_id AND a.client_authority_id = uca.client_authority_id;
end//
delimiter ;
