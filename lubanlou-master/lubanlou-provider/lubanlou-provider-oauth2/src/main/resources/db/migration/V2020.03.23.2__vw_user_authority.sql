drop view if exists vw_user_authority;
create view vw_user_authority as
  select
    uca.username,
    uca.client_id,
    uca.client_authority_id,
    a.authority_ename,
    a.authority_cname
  from user_client_authority as uca inner join authorities as a
      on uca.client_id = a.client_id and uca.client_authority_id = a.client_authority_id
  order by uca.username, uca.client_id, uca.client_authority_id;
