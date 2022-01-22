alter table oauth_client_details
  drop access_token,
  drop refresh_token,
  drop timeout;

drop table if exists token;
create table token (
  access_token  text comment '访问令牌',
  refresh_token varchar(255) comment '刷新令牌',
  timeout       int comment '令牌的失效时间（据unix元年的秒数）',
  client_id     varchar(255) comment '客户端ID',
  constraint fk_token_client_id foreign key (client_id) references oauth_client_details (client_id)
)
  engine = InnoDB, charset = utf8;