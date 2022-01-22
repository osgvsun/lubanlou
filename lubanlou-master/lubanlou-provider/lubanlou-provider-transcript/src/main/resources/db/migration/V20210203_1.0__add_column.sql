-- 新增评分人字段
alter table `t_grade_record` add grade_cname VARCHAR (255) DEFAULT NULL COMMENT '评分人姓名';