DROP PROCEDURE IF EXISTS `proc_gradebook_total_list`;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `proc_gradebook_total_list`(
  IN siteId INT,
	IN username	varchar(255),
	IN cname	varchar(255),
	IN currPage varchar(11),
	IN pageSize varchar(11),
	IN classesNumber varchar(255))
BEGIN
DECLARE query_sql LONGTEXT;
SET query_sql= CONCAT("select
	ttg.id,ttg.site_id,ttg.cname as cname,ttg.student as username,
	IFNULL(ttg.task_grade,'0') as task_grade,
	IFNULL(ttg.test_grade,'0') as test_grade,
	IFNULL(ttg.skill_test_grade,'0') as skill_test_grade,
	IFNULL(ttg.exam_grade,'0') as exam_grade,
	IFNULL(ttg.attendance_grade,'0') as attendance_grade,
	IFNULL(ttg.experiment_grade,'0') as experiment_grade,
	IFNULL(ttg.action_grade,'0') as behavior_grade,
	IFNULL(ttg.group_grade,'0') as group_grade,
	IFNULL(ttg.skill_assignment_score,'0') as skill_assignment_grade,
	IFNULL(ttg.skill_report_score,'0') as skill_report_grade,
	IFNULL(ttg.skill_data_score,'0') as skill_data_grade,
	IFNULL(ttg.skill_attendance_score,'0') as skill_attendance_grade,
	IFNULL(ttg.experience_work_score,'0') as experience_work_grade,
	CONVERT((IFNULL(ttg.task_grade*tws1.weight,0)+IFNULL(ttg.exam_grade*tws2.weight,0)+
	IFNULL(ttg.test_grade*tws3.weight,0)+IFNULL(ttg.attendance_grade*tws4.weight,0)+
	IFNULL(ttg.action_grade*tws6.weight,0)+
	IFNULL(ttg.group_grade*tws7.weight,0)+IFNULL(ttg.skill_assignment_score*tws8.weight,0)+
	IFNULL(ttg.skill_report_score*tws9.weight,0)+IFNULL(ttg.skill_test_grade*tws10.weight,0)+
	IFNULL(ttg.skill_data_score*tws11.weight,0)+IFNULL(ttg.skill_attendance_score*tws12.weight,0)+IFNULL(ttg.experience_work_score*tws13.weight,0))/
	(tws1.weight+tws2.weight+tws3.weight+tws4.weight+tws6.weight+tws7.weight+tws8.weight+tws9.weight+tws10.weight+tws11.weight+tws12.weight+tws13.weight),DECIMAL(11,1)) as weight_score,
	IFNULL(ttg.addition_score,0) as addition_score,
	ttg.update_time,
	tg.title
	from t_test_grading ttg
	inner join t_gradebook as tg on tg.site_id = ttg.site_id
	left join t_weight_setting tws1 on tws1.site_id=ttg.site_id and tws1.type='assignment'
	left join t_weight_setting tws2 on tws2.site_id=ttg.site_id and tws2.type='exam'
	left join t_weight_setting tws3 on tws3.site_id=ttg.site_id and tws3.type='test'
	left join t_weight_setting tws4 on tws4.site_id=ttg.site_id and tws4.type='attendance'

	left join t_weight_setting tws6 on tws6.site_id=ttg.site_id and tws6.type='behavior'
	left join t_weight_setting tws7 on tws7.site_id=ttg.site_id and tws7.type='group'
	left join t_weight_setting tws8 on tws8.site_id=ttg.site_id and tws8.type='expwork'
	left join t_weight_setting tws9 on tws9.site_id=ttg.site_id and tws9.type='expreport'
	left join t_weight_setting tws10 on tws10.site_id=ttg.site_id and tws10.type='exptest'
	left join t_weight_setting tws11 on tws11.site_id=ttg.site_id and tws11.type='expdata'
	left join t_weight_setting tws12 on tws12.site_id=ttg.site_id and tws12.type='expattendance'
	left join t_weight_setting tws13 on tws13.site_id=ttg.site_id and tws13.type='experiencework'
  where ttg.site_id=",siteId," ");

	IF username <> '' THEN
		SET	query_sql = CONCAT(query_sql, ' and ttg.student like "', '%',username, '%"');
	END IF;
	IF cname <> '' THEN
		SET	query_sql = CONCAT(query_sql, ' and ttg.cname like "', '%',cname, '%"');
	END IF;
	IF classesNumber <> '' THEN
		SET	query_sql = CONCAT(query_sql, ' and ttg.classes_number like "', '%',classesNumber, '%"');
	END IF;
	SET query_sql = CONCAT(query_sql,' order by ttg.student');

	IF currPage <> '' AND pageSize <> '' THEN
		SET query_sql = CONCAT(query_sql,' limit ',currPage ,',',pageSize);
	END IF;

	SET @sql1=query_sql;
	PREPARE stmt1 FROM @sql1;
	EXECUTE stmt1;

END
;;
DELIMITER ;