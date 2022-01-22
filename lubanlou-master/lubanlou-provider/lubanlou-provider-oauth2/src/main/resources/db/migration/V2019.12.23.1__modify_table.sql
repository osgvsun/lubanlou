alter table cookie
  drop primary key;

delete from cookie
where client_id is null or client_id = 'null' or client_id = 'NULL' or username is null or username = 'NULL' or username = 'null';

alter table cookie
  add id int primary key auto_increment
  first;

alter table cookie
  add constraint fk_cookie_client_id_oauth_client_details_client_id foreign key (client_id) references oauth_client_details (client_id);

alter table cookie
  add constraint fk_cookie_username_users_username foreign key (username) references users(username);