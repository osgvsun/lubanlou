drop view if exists vw_user_authority;
create view vw_user_authority as
  select
    u.username,
    uca.client_id,
    a.authority_ename,
    a.authority_cname
  from users as u inner join user_client_authority as uca on u.username = uca.username
    inner join authorities as a on uca.authority = a.authority_ename
  order by u.username, uca.client_id;
