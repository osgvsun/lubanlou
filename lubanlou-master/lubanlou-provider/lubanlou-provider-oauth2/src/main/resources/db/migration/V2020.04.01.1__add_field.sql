alter table audit
  add `audited` boolean not null default false comment '是否已经审核过',
  add `comment` varchar(255) comment '审核意见';


alter table users add `is_enterprise` boolean default false comment '是否是企事业用户';