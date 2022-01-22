drop table if exists `object_user`;
CREATE TABLE `object_user` (
  `object_uid` varchar(255) NOT NULL COMMENT '关联t_grade_object表的字段，在工训里关联experiment_title字段',
  `username` varchar(255) NOT NULL COMMENT '用户名',
  PRIMARY KEY (`object_uid`,`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;