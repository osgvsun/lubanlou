-- 修改表默认值
-- caohuan 2021-12-15
ALTER TABLE message_receiver
MODIFY COLUMN read_state int(11)  DEFAULT 0;
update  message_receiver set read_state=0 where read_state is NULL;