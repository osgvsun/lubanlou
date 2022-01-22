drop procedure if exists proc_authority_tree;
delimiter //
create procedure proc_authority_tree(IN p_username varchar(255))
  begin
    select
      temp.client_id,
      temp.client_name,
      temp.authority_ename,
      temp.authority_cname,
      case when uca.username is not null
        then true
      else false end as checked
    from (
           select
             ocd.client_id,
             ocd.client_name,
             a.authority_ename,
             a.authority_cname
           from oauth_client_details as ocd cross join authorities as a
         ) as temp left join (select
                                client_id,
                                username,
                                authority
                              from user_client_authority
                              where username = p_username) as uca
        on temp.client_id = uca.client_id and temp.authority_ename = uca.authority
    order by temp.client_id, temp.authority_ename;
  end//
delimiter ;
