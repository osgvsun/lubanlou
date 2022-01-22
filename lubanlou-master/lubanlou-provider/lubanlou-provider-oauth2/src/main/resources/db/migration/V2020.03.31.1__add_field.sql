alter table users
  add first_login boolean not null default true;


update users
set users.first_login = false;