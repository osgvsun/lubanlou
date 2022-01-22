delimiter //
create procedure modify_table()
  begin
    declare v_exist int default 0;
    select exists(
        select 1
        from INFORMATION_SCHEMA.COLUMNS
        where TABLE_SCHEMA = 'oauth2' and TABLE_NAME = 'users' and COLUMN_NAME = 'employee_no'
    )
    into v_exist;
    if v_exist = 1
    then
      alter table users
        drop employee_no;
    end if;
  end//
delimiter ;

call modify_table();

drop procedure if exists modify_table;