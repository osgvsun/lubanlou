create table if not exists `audit` (
  username varchar(255) collate 'utf8_bin',
  status   int comment '审核状态, int 32位, 最多32个审核层级, 从右往左审核',
  type     enum ('register') comment 'register(注册审核)',
  constraint `fk_audit_username` foreign key (username) references `users` (username),
  constraint primary key (username, status, type)
)
  engine = InnoDB
  charset = utf8 comment '在审核表里的用户处在正在审核的状态，审核完成之后从审核表删除';