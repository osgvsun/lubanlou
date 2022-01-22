alter table `statistic`
  modify login_type enum ('QQ', 'PHONE', 'WECHAT', 'GITLAB', 'APPLET', 'USERNAME', 'SJTU', 'HDU', 'SUFE') comment '登陆类型';