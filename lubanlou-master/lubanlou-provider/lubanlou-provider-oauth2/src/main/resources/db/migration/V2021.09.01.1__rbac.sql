create table `rbac_role`
(
    uid  int primary key,
    name varchar(255)
)ENGINE = INNODB DEFAULT CHARSET = utf8 COMMENT '角色表';

create table `rbac_permission`
(
    uid  int primary key,
    name varchar(255),
    inheritable tinyint(1) default 1
)ENGINE = INNODB DEFAULT CHARSET = utf8 COMMENT '许可表';

create table `rbac_role_resource_permission`
(
    role_uid         int,
    resource_uid     int,
    permission_uid   int,
    constraint primary key (role_uid, resource_uid,permission_uid)
)ENGINE = INNODB DEFAULT CHARSET = utf8 COMMENT '角色-资源-许可表';