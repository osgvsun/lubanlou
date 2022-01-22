-- 2021-12-22
-- 修改authorities表,添加主键
-- Smark Lee

ALTER TABLE `authorities`
ADD COLUMN `role_uid` int(11) NOT NULL AUTO_INCREMENT,
ADD PRIMARY KEY (`role_uid`);
