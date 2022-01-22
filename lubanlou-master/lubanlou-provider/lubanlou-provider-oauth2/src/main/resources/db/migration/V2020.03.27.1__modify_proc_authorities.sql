-- 功能描述：获取指定用户在各个站点下的权限
drop procedure if exists proc_authority;
delimiter //
create procedure proc_authority(in p_username varchar(255))
  begin
    select
      a.client_id,
      o.client_name,
      a.authority_ename,
      a.authority_cname,
      a.client_authority_id,
      case when u.username is not null
        then true
      else false end as checked
    from authorities as a left join oauth_client_details o on a.client_id = o.client_id
      left join user_client_authority uca
        on o.client_id = uca.client_id and a.client_authority_id = uca.client_authority_id
      left join (select username
                 from users
                 where username = p_username) as u on u.username = uca.username
    where !(uca.username is NOT NULL AND u.username is NULL);
  end//
delimiter ;
