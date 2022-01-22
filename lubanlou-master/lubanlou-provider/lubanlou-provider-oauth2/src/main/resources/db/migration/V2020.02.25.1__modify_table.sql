alter table users
  modify qq_openid varchar(255) unique;

alter table users
  add phone varchar(255) unique;