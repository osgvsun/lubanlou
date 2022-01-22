drop table if exists `department`;
create table `department` (
  id   int primary key,
  name varchar(255) not null
)
  engine = InnoDB
  charset = utf8;

drop table if exists `user_department`;
create table `user_department` (
  username      varchar(255) collate 'utf8_bin',
  department_id int,
  constraint `fk_user_department_username` foreign key (username) references `users` (username),
  constraint `fk_user_department_department_id` foreign key (department_id) references `department` (id)
)
  engine = InnoDB
  charset = utf8;

INSERT INTO `department`(`id`, `name`) VALUES (1, '运营管理部');
INSERT INTO `department`(`id`, `name`) VALUES (2, '产品开发部');
INSERT INTO `department`(`id`, `name`) VALUES (3, '项目部');
INSERT INTO `department`(`id`, `name`) VALUES (4, '云端事业部');
INSERT INTO `department`(`id`, `name`) VALUES (5, '客户服务部');
INSERT INTO `department`(`id`, `name`) VALUES (6, '边缘计算事业部');
INSERT INTO `department`(`id`, `name`) VALUES (7, '营销中心');
