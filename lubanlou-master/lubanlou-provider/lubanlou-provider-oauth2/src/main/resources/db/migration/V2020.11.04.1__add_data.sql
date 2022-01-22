alter table users
  add `sufe_user_no` varchar(255);

INSERT ignore INTO authorities (`client_id`, `client_authority_id`, `authority_ename`, `authority_cname`)
VALUES ('GvsunUserCenter', 4, 'ROLE_UNIT', '单位用户');
