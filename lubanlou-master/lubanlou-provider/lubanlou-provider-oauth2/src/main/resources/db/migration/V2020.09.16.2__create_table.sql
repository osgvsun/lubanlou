drop table if exists operation_log;
create table operation_log (
  id         int auto_increment,
  username   varchar(255) collate 'utf8_bin' comment '用户名',
  datetime   datetime comment '操作时间',
  type       enum ('注册', '绑定手机号') comment '操作类型',
  result     varchar(255) comment '操作结果',
  constraint primary key (id)
)
  engine = InnoDB
  charset = utf8;