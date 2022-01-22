SET FOREIGN_KEY_CHECKS = 0;

alter table user_client_authority
  drop foreign key fk_username_authorities_authority_ename;

drop table if exists `user_client_authority`;
create table `user_client_authority` (
  username            varchar(255) collate 'utf8_bin',
  client_id           varchar(255),
  client_authority_id int,
  constraint `fk_username_user_username` foreign key (username) references `users` (username),
  constraint `fk_user_client_authority_client_id` foreign key (client_id) references `oauth_client_details` (client_id),
  constraint primary key (username, client_id, client_authority_id)
)
  engine = InnoDB
  charset = utf8;

drop table if exists authorities;
create table authorities (
  client_id           varchar(255),
  client_authority_id int,
  authority_ename     varchar(255) not null,
  authority_cname     varchar(255) not null,
  constraint `fk_authorities_client_id` foreign key (client_id) references oauth_client_details (client_id)
)
  engine = InnoDB
  charset = utf8;

SET FOREIGN_KEY_CHECKS = 1;

drop procedure if exists proc_authority_tree;

INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunTeach', 1, 'STUDENT', '在册学生');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunTeach', 2, 'TEACHER', '专职教师');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunTeach', 9, 'SUB-MANGER', '助管');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunTeach', 10, 'EQUIPMENTADMIN', '设备管理员');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunTeach', 11, 'SUPERADMIN', '超级管理员');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunTeach', 100, 'TEACHING', '授课教师');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunTeach', 101, 'ASSISTANT', '助教');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunTeach', 102, 'JUDGES', '评委');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunTeach', 103, 'SCHOLASYCI', '选课学生');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunTeach', 105, 'STAFF', '行政人员');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunTeach', 109, 'AUDITOR', '旁听生');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunTeach', 111, 'SUPERVISIOR', '督导');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunTeach', 133, 'TEAMLEADER', '组长');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunLims', 1, 'STUDENT', '学生');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunLims', 2, 'TEACHER', '教师');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunLims', 3, 'PREEXTEACHING', '实验教学副院长');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunLims', 4, 'EXCENTERDIRECTOR', '实验中心主任');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunLims', 5, 'LABMANAGER', '实验室管理员');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunLims', 6, 'ACADEMYLEVELM', '院系级系统管理员');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunLims', 7, 'EXPERIMENTALTEACHING', '实验教务');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunLims', 9, 'ASSISTANT', '助教');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunLims', 10, 'EQUIPMENTADMIN', '设备管理员');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunLims', 11, 'SUPERADMIN', '超级管理员');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunLims', 12, 'GRADUATE', '研究生');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunLims', 13, 'COLLEGELEADER', '学院领导');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunLims', 14, 'DEAN', '教务处');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunLims', 16, 'ASSETMANAGEMENT', '实训部设备资产统计员');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunLims', 17, 'CFO', '系主任');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunLims', 18, 'DEPARTMENTHEADER', '教研室主任');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunLims', 19, 'CABINETADMIN', '创新成果管理员');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunLims', 20, 'LABORATORYMAINTENANCE', '实训部参观接待员');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunLims', 22, 'PRESECTEACHING', '实训部教学秘书');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunLims', 23, 'ASSETMANAGER', '设备管理科科员');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunLims', 24, 'SUPERVISIONGROUP', '督导小组');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunLims', 25, 'FULLTIMEMANAGER', '专职管理员');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunLims', 26, 'STUGROUP', '督察小组学生');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunLims', 27, 'OPEARTIONSECURITYMANAGEMENT', '运行与安全管理科');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunLims', 28, 'PROJECTPURCHASER', '项目请购人');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunUserCenter', 1, 'ROLE_ADMIN', '管理员');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunUserCenter', 2, 'ROLE_TEACHER', '教师');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('GvsunUserCenter', 3, 'ROLE_STUDENT', '学生');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('datashare', 1, 'ROLE_ADMIN', '管理员');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('datashare', 2, 'ROLE_TEACHER', '教师');
INSERT INTO `authorities`(`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`) VALUES ('datashare', 3, 'ROLE_STUDENT', '学生');
