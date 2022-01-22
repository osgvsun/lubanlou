delete from user_client_authority
where client_id = 'xmgl';
delete from authorities
where client_id = 'xmgl';
insert ignore into authorities (client_id, client_authority_id, authority_ename, authority_cname)
values ('GvsunProject', 8, 'student', '学生'), ('GvsunProject', 9, 'teacher', '教师');