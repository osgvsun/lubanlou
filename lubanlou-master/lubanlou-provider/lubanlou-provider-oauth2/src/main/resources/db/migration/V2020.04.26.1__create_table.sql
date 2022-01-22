drop table if exists `statistic`;
create table `statistic` (
  id                  int          auto_increment,
  login_type          enum ('QQ', 'PHONE', 'WECHAT', 'GITLAB') comment '登陆类型',
  user_identification varchar(255) comment '登陆时的用户标识',
  `datetime`          datetime     default null
  comment '登陆时间',
  datasource          varchar(255) default null
  comment '登陆的数据源',
  constraint primary key (id)
)
  engine = InnoDB, charset = utf8;