create table if not exists `users` (
  username        varchar(255) collate 'utf8_bin',
  password        varchar(255) collate 'utf8_bin',
  cname           varchar(255),
  gender          enum ('男', '女'),
  enabled         boolean default true,
  gitlab_username varchar(255) unique,
  constraint primary key (username)
)
  engine = InnoDB
  charset = utf8;

drop table if exists authorities;
create table authorities (
  authority_ename varchar(255) not null,
  authority_cname varchar(255) not null unique,
  constraint primary key (authority_ename)
)
  engine = InnoDB
  charset = utf8;

drop table if exists oauth_client_details;
create table oauth_client_details (
  client_id               varchar(255) comment '客户端ID',
  client_secret           varchar(255) comment '客户端密钥',
  client_name             varchar(255),
  scope                   varchar(255) comment '授权范围',
  authorized_grant_types  varchar(255) comment '授权类型',
  web_server_redirect_uri varchar(255) comment '回调地址',
  code                    varchar(255) comment '授权码',
  access_token            text comment '访问令牌',
  refresh_token           text comment '刷新令牌',
  timeout                 int comment '令牌的失效时间（据unix元年的秒数）',
  constraint primary key (client_id)
)
  engine = InnoDB
  charset = utf8;

drop table if exists `user_client_authority`;
create table `user_client_authority` (
  username  varchar(255) collate 'utf8_bin',
  client_id varchar(255),
  authority varchar(255),
  constraint `fk_username_user_username` foreign key (username) references `users` (username),
  constraint `fk_client_id_oauth_client_details_client_id` foreign key (client_id) references `oauth_client_details` (client_id),
  constraint `fk_username_authorities_authority_ename` foreign key (authority) references `authorities` (authority_ename),
  constraint primary key (username, client_id, authority)
)
  engine = InnoDB
  charset = utf8;

drop table if exists cookie;
create table cookie (
  username  varchar(255) collate 'utf8_bin',
  cookie    varchar(255),
  client_id varchar(255),
  constraint primary key (username, cookie, client_id)
)
  engine = InnoDB
  charset = utf8;

INSERT INTO `authorities` (`authority_ename`, `authority_cname`) VALUES ('ROLE_TEACHER', '教师');
INSERT INTO `authorities` (`authority_ename`, `authority_cname`) VALUES ('ROLE_ADMIN', '管理员');
INSERT INTO `authorities` (`authority_ename`, `authority_cname`) VALUES ('ROLE_STUDENT', '学生');


INSERT INTO `oauth_client_details`(`client_id`, `client_secret`, `client_name`, `scope`, `authorized_grant_types`, `web_server_redirect_uri`, `code`) VALUES ('acme', 'acmesecret', 'uia', NULL, NULL, NULL, NULL);
INSERT INTO `oauth_client_details`(`client_id`, `client_secret`, `client_name`, `scope`, `authorized_grant_types`, `web_server_redirect_uri`, `code`) VALUES ('GvSunCMS', 'eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1NTkyOTMwNTl9.TlUNSBzn97s_71cnm3ltzcNS9XckcMaW4aTRFXq6iy1pYT1vk9JEvqn-UHtgHyH6XleFu5iNsYK8O-pfHc', 'CMS', NULL, NULL, NULL, NULL);
INSERT INTO `oauth_client_details`(`client_id`, `client_secret`, `client_name`, `scope`, `authorized_grant_types`, `web_server_redirect_uri`, `code`) VALUES ('GvsunDirectory', 'jq7S69x0D#RZvfBT^stX1%KaKQjGoX37uAlEw%gfojUG3AeWEP0NrDC*^s69e6c7v#QlD2mwf9r77xBj2RuXPf8dDVEqoBZoo%3BGJ0iGa6!BhT4wibnhjfSgyabk4MX', '目录引擎', NULL, NULL, NULL, NULL);
INSERT INTO `oauth_client_details`(`client_id`, `client_secret`, `client_name`, `scope`, `authorized_grant_types`, `web_server_redirect_uri`, `code`) VALUES ('GvSunElasticSearch', 'C$5zkdRrj8psCUiC93nYb1t!%Bqf1sZ*d!1YUoVq0VxoVXmSH^iebgiaFGy6eneatPTJ24d4Wbm%HLXO$W7Z*n&QHN%rCNo^DcSxqIr@R5foZHR5349^cN5bx3R3uIfs', '全文搜索引擎', NULL, NULL, NULL, NULL);
INSERT INTO `oauth_client_details`(`client_id`, `client_secret`, `client_name`, `scope`, `authorized_grant_types`, `web_server_redirect_uri`, `code`) VALUES ('GvsunExam', 'it9Xu8u8OQ$4T48K$yV49OC3lEzB97#FUrS5u6ohzDiB$Dp5R2xv*jeq@@YYUrlX3K&x3LMu!WfSa^tC^vzkR0wkA9KdEuG%2Dn9a#XwdICrdKCVRuOFEjHf%gItj7#f', '考试服务', NULL, NULL, NULL, NULL);
INSERT INTO `oauth_client_details`(`client_id`, `client_secret`, `client_name`, `scope`, `authorized_grant_types`, `web_server_redirect_uri`, `code`) VALUES ('GvSunFinancial', 'Pi6mssq7MEc%O6hlYW&7tL7Z&EzsY9e4xGt4rlP8uapku*ViKPi#HgwaNK3Yqf5Eher#4P9cFv9XVyS*L%Gb9AH!y$oVxD3OkB1LG7lBjERO2hCZEiamFkxXyKi$H5Di', '运营管理', NULL, NULL, NULL, NULL);
INSERT INTO `oauth_client_details`(`client_id`, `client_secret`, `client_name`, `scope`, `authorized_grant_types`, `web_server_redirect_uri`, `code`) VALUES ('GvsunLabroom', 'MisjTDa^ZintCniukj^eP5WQF!PYLjnrOmj%0tbMX#rxp646#eRYHYpaCK7H@2v3!5I6tzKxmExH!k&N^%$#BkH&RiOJwojun15FBg%Go@pAeS&5hxTz4RNB$gyI9R@W', '实验室基础信息', NULL, NULL, NULL, NULL);
INSERT INTO `oauth_client_details`(`client_id`, `client_secret`, `client_name`, `scope`, `authorized_grant_types`, `web_server_redirect_uri`, `code`) VALUES ('GvsunLims', '*Yq9g1Exze#9rV1@&75foh#zT@&J9ASD326Ks1x4%DQ4iziN^m98nGyWZMhx3CeScO@xv1nSJYfry9i0Sd9UG8w7gvv3JFGyWCx4oYqWYUcA0Vz07mYbjNE7MM7OIbdO', '实验室管理', NULL, NULL, NULL, NULL);
INSERT INTO `oauth_client_details`(`client_id`, `client_secret`, `client_name`, `scope`, `authorized_grant_types`, `web_server_redirect_uri`, `code`) VALUES ('GvSunOpenApi', 'sT0MZneM4Rme8gSw', '开放Api', NULL, NULL, NULL, NULL);
INSERT INTO `oauth_client_details`(`client_id`, `client_secret`, `client_name`, `scope`, `authorized_grant_types`, `web_server_redirect_uri`, `code`) VALUES ('GvsunPortal', 'eE1!EvS$sy9XajYVoPjpFqE2#pv&A#K%YIS2*o0wD$hBk*qkBUp63&BwVo77xNKih279avXxS$GE8HyEh0b6C^251^5SkAGNp7@#js6KpPbUbW5YaypjFjehjI1rS$3Q', 'Portal', NULL, NULL, NULL, NULL);
INSERT INTO `oauth_client_details`(`client_id`, `client_secret`, `client_name`, `scope`, `authorized_grant_types`, `web_server_redirect_uri`, `code`) VALUES ('GvsunProject', '3HeD1&LoAAOWuLOjK8O13fr5@WQxFJf0%cRkmPPKsGLd4*7pNtCnd4wFSF7YY!khy%dTEeR$#Zq1@9dO$oB9*xvHCWkiVl#YNkV2@taEZUrPZYmVBjZvOmYOFd7$@M&C', '项目管理', NULL, NULL, NULL, NULL);
INSERT INTO `oauth_client_details`(`client_id`, `client_secret`, `client_name`, `scope`, `authorized_grant_types`, `web_server_redirect_uri`, `code`) VALUES ('GvsunResource', 'kpV7hG%kCrX9^Z*DxUvQdu%cnB^M6%dL^LieQHj^q!druAO#GT^g1Qj1&YZ%k2EAJ1t7F1VeWoMOa0Stf5b5r4LjLD@T8WttSKf2QHGdYsk0^LkgiZMz#W4&qoZAHWZb', '资源容器引擎', NULL, NULL, NULL, NULL);
INSERT INTO `oauth_client_details`(`client_id`, `client_secret`, `client_name`, `scope`, `authorized_grant_types`, `web_server_redirect_uri`, `code`) VALUES ('GvsunTeach', 'ENFq65LU%6ZonS^Yizd4m*e@@lUsAqWFcaXLss8o2VWb67#yUdsffMFY%72MC@9RYi#$feCu4JjEmrbbROXQ58u%we00e!sjUAMEWECHwx21$cQeCD91185l&LJu#lz@', '教学平台', NULL, NULL, NULL, NULL);
INSERT INTO `oauth_client_details`(`client_id`, `client_secret`, `client_name`, `scope`, `authorized_grant_types`, `web_server_redirect_uri`, `code`) VALUES ('GvsunTeacher', 'it9Xu8u8OQ$4T48K$yV49OC3lEzB97#FUrS5u6ohzDiB$Dp5R2xv*jeq@@YYUrlX3K&x3LMu!WfSa^tC^vzkR0wkA9KdEuG%2Dn9a#XwdICrdKCVRuOFEjHf%gItj7#d', '教师信息库', NULL, NULL, NULL, NULL);
INSERT INTO `oauth_client_details`(`client_id`, `client_secret`, `client_name`, `scope`, `authorized_grant_types`, `web_server_redirect_uri`, `code`) VALUES ('GvsunTimetable', '8itUbvT1J9gB&J9cLZTmZY7Q3z1I%*e&BQ%vuIiqOsLM#FA1m@SNbRTIK6hIE1ve@X8w*@rW6x&rygAs4TreWWCU0Do@2*v6v2LM*!FgdlmFG9&o#S@dLB!v^w2H*7fx', '排课微服务', NULL, NULL, NULL, NULL);
INSERT INTO `oauth_client_details`(`client_id`, `client_secret`, `client_name`, `scope`, `authorized_grant_types`, `web_server_redirect_uri`, `code`) VALUES ('GvsunTranscript', '^lhbE^)c^XPVP0R^w)xS#PQNQl&7htj3xlvP@1fJ~X@ZaFoYOJocKg66BYUh$4eZ5vqOGrj7SBxEntSfIX^pEq7kOg~Z9p~BK(Ch41Ubn8u)27!#~8D(cnr08pvFCZXA', '成绩微服务', NULL, NULL, NULL, NULL);
INSERT INTO `oauth_client_details`(`client_id`, `client_secret`, `client_name`, `scope`, `authorized_grant_types`, `web_server_redirect_uri`, `code`) VALUES ('GvsunUserCenter', 'MisjTDa^ZintCniukj^eP5WQF!PYLjnrOmj%0tbMX#rxp646#eRYHYpaCK7H@2v3!5I6tzKxmExH!k&N^%$#BkH&RiOJwojun15FBg%Go@pAeS&5hxTz4RNB$gyI9R@#', '用户中心', NULL, NULL, NULL, NULL);
INSERT INTO `oauth_client_details`(`client_id`, `client_secret`, `client_name`, `scope`, `authorized_grant_types`, `web_server_redirect_uri`, `code`) VALUES ('nodejsTest', 'sT0MZneM4Rme8gSw', 'nodejs测试', NULL, NULL, NULL, NULL);
INSERT INTO `oauth_client_details`(`client_id`, `client_secret`, `client_name`, `scope`, `authorized_grant_types`, `web_server_redirect_uri`, `code`) VALUES ('sjtudc', 'zPw2#NKYf%NVm%fcjVCy^zlxUmayu5v8XpjTdYoX4W!kvvM3ss9$4IKbvJ5wkj*FihuTw3q)Ho$d*f0lQBNC(UJERr!5J0AM4Yv0UNVoqYN39ci3&UK4Luy^0LDEz8*r', '大创', NULL, NULL, NULL, NULL);
INSERT INTO `oauth_client_details`(`client_id`, `client_secret`, `client_name`, `scope`, `authorized_grant_types`, `web_server_redirect_uri`, `code`) VALUES ('xmgl', 'cn&UsWCMkqvtlpgnl9JWH1EijJ5Mx0dF^D@4DmJcDL6onaw77n*&8Uz5AmWQeRx@', 'portal-xmgl', NULL, NULL, NULL, NULL);

