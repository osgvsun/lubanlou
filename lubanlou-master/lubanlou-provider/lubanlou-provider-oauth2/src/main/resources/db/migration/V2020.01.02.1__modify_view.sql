drop view if exists vw_user_authority;
create view vw_user_authority as
  select
    u.username,
    u.cname,
    uca.client_id,
    ocd.client_name,
    a.authority_ename,
    a.authority_cname
  from users as u inner join user_client_authority as uca on u.username = uca.username
    inner join authorities as a on uca.authority = a.authority_ename
    inner join oauth_client_details as ocd on ocd.client_id = uca.client_id
  order by u.username, uca.client_id;