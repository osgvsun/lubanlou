alter table users
  drop qq;

alter table users
  add qq_openid varchar(255)
  after gitlab_username;

alter table users
  add wechat_openid varchar(255)
  after qq_openid;

alter table cookie drop foreign key fk_cookie_client_id_oauth_client_details_client_id;
alter table cookie drop client_id;