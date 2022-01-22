DROP PROCEDURE IF EXISTS `proc_gradebook_list`;
DELIMITER ;;
CREATE PROCEDURE `proc_gradebook_list`(IN module	varchar(255),
	IN type VARCHAR(255),
    IN siteId INT,
	IN username	varchar(255),
	IN cname	varchar(255),
	IN currPage varchar(11),
	IN pageSize varchar(11),
	IN classesNumber varchar(255),
	IN maxResult INT)
BEGIN
DECLARE query_sql LONGTEXT;
DECLARE query_sql_concat LONGTEXT;
DECLARE query_sql_sub LONGTEXT;
DECLARE query_sql_head LONGTEXT;
DECLARE query_sql_sum LONGTEXT;
DECLARE query_sql_weight LONGTEXT;
DECLARE query_sql_result LONGTEXT;
DECLARE query_sql_weight_result LONGTEXT;
DECLARE sum_weight DOUBLE;
DECLARE id_count INT;
DECLARE i INT;
DECLARE str_lengh INT;


  IF module='experience' AND type<>'assignment' THEN
	 	  SET query_sql= CONCAT("
	   	   select null as a1,null as a2,GROUP_CONCAT(CONCAT(tgo.title,'(',tgo.weight*100,'%)') ORDER BY tgo.id asc) ,
		  tg.title as a3,null as a4,null as a5,null as a6
			from t_gradebook tg
			left join t_grade_object tgo on tgo.grade_id=tg.id and tgo.is_open = 1
			where tg.site_id=",siteId," and tgo.module ='experience'
			UNION
			(select b.cname,b.student,GROUP_CONCAT(IFNULL(a.points,0) ORDER BY b.id asc),
			IFNULL(CONVERT(sum(a.points*a.weight )/sum(b.weight),decimal(11,1)),0),
			IFNULL(b.addition_group_score,0),
			IFNULL(b.group_ranking,'暂无排名'),
			IFNULL(b.group_marking,'')
			from
			(select ttg.student,ttg.cname,tgo.weight,ttg.addition_group_score,tgo.assignment_id,tgo.id,tgo.type,ttg.group_ranking,ttg.group_marking
			from t_test_grading ttg
			inner join t_gradebook tg on ttg.site_id = tg.site_id
			left join t_grade_object tgo on tgo.grade_id=tg.id and tgo.is_open = 1
			where tg.site_id=",siteId," and tgo.module ='experience' ");

			SET query_sql_concat = CONCAT("order by ttg.student,tgo.assignment_id) b

			left join
			(select tgr.student_number,tgr.cname,tgo.assignment_id,tgo.title,tgo.id,tgr.points,tgo.type,tgo.weight
			from t_grade_object tgo
			inner join t_gradebook tg on tg.site_id=",siteId," and tg.id=tgo.grade_id
			inner join t_grade_record tgr on tgr.object_id=tgo.id
			where tgo.module ='experience' and tg.site_id=",siteId," and tgo.is_open = 1
			group by tgr.student_number,tgo.id) a on b.student= a.student_number and b.id= a.id
	   group by b.student
			order by b.student,b.id");

		IF username <> '' THEN
			SET	query_sql = CONCAT(query_sql, ' and ttg.student like "', '%',username, '%"');
		END IF;
		IF cname <> '' THEN
			SET	query_sql = CONCAT(query_sql, ' and ttg.cname like "', '%',cname, '%"');
		END IF;
		IF classesNumber <> '' THEN
			SET	query_sql = CONCAT(query_sql, ' and ttg.classes_number like "', '%',classesNumber, '%"');
		END IF;
		IF currPage <> '' AND pageSize <> '' THEN
			SET query_sql_concat = CONCAT(query_sql_concat,' limit ',currPage ,',',pageSize);
		END IF;
			SET query_sql = CONCAT(query_sql,query_sql_concat,')');
			SET @sql1=query_sql;
      PREPARE stmt1 FROM @sql1;
      EXECUTE stmt1;

	END IF;


IF module='knowledge' THEN
		-- 取最高分标记为1时，权重成绩取最高分，否则按权重算分
		SET query_sql_weight_result = CONCAT("IFNULL(CONVERT(sum(a.points*a.weight )/sum(c.weight),decimal(11,1)),0),");
		IF maxResult = 1 THEN
				SET query_sql_weight_result = CONCAT("IFNULL(max(a.points),0),");
		END IF;
	  SET query_sql= CONCAT("
	   (select null as a1,null as a2,GROUP_CONCAT(CONCAT(tgo.title ,'(',tgo.weight*100,'%)') order by tgo.assignment_id asc),
		  tg.title as a3,null as a4,null as a5,null as a6,null as a7,null as a8,null as a9,null as a10,null as a11
			from t_gradebook tg
			inner join t_grade_object tgo on tg.id=tgo.grade_id and tgo.module ='",module,"' and tgo.type='",type,"' and tgo.is_open = 1
			where tg.site_id=",siteId,"	group by tg.site_id)

			UNION

			(select b.cname,b.student,group_concat( IFNULL(a.points,0) ORDER BY b.assignment_id asc) as points,
			",query_sql_weight_result,"
			IFNULL(b.addition_task_score,0),IFNULL(b.addition_test_score,0),IFNULL(b.addition_exam_score,0),
			IFNULL(b.addition_attendance_score,0),IFNULL(b.addition_experiment_assignment,0),IFNULL(b.addition_action_score,0),
			IFNULL(b.addition_experiment_score,0),IFNULL(b.addition_group_score,0)
			from
			(select ttg.student,ttg.cname,ttg.addition_task_score,ttg.addition_test_score,ttg.addition_exam_score,ttg.addition_attendance_score,ttg.addition_experiment_assignment
			,ttg.addition_action_score,ttg.addition_experiment_score,ttg.addition_group_score,tgo.assignment_id,tgo.id,ttg.classes_number
			from t_test_grading ttg
			inner join t_gradebook tg on ttg.site_id = tg.site_id
			left join t_grade_object tgo on tgo.grade_id=tg.id and tgo.is_open = 1
			where tg.site_id=",siteId," and tgo.module ='",module,"' and tgo.type='",type,"' order by ttg.student,tgo.assignment_id) b

			left join
			(select tgr.student_number,tgr.cname,tgo.assignment_id,tgo.title,tgo.id,tgr.points,tgo.type,tgo.weight
			from t_grade_object tgo
			inner join t_gradebook tg on tg.site_id=",siteId," and tg.id=tgo.grade_id
			inner join t_grade_record tgr on tgr.object_id=tgo.id
			where tgo.module ='",module,"' and tgo.type='",type,"' and tg.site_id=",siteId,"
			group by tgr.student_number,tgo.id) a on b.student= a.student_number and b.assignment_id= a.assignment_id

			left join t_weight_setting tws ON a.type = tws.type AND tws.site_id = ",siteId,"

			left join
			(select tgo.id,tgo.weight
			from t_grade_object as tgo inner join t_gradebook as tg on tgo.grade_id = tg.id and tgo.is_open = 1
			where tg.site_id = ",siteId," and tgo.type = '",type,"' and tgo.module='",module,"') c on c.id = b.id");

			SET query_sql_concat = CONCAT("
			group by b.student
			order by b.student,b.assignment_id");

			IF username = '' AND cname = '' AND classesNumber <> '' THEN
				SET	query_sql = CONCAT(query_sql, ' where b.classes_number like "', '%',classesNumber, '%"');
			END IF;
			IF username <> '' AND cname = '' AND classesNumber <> '' THEN
				SET	query_sql = CONCAT(query_sql, ' where b.student like "', '%',username, '%" and b.classes_number like "', '%',classesNumber, '%"');
			END IF;
			IF username = '' AND cname <> '' AND classesNumber <> '' THEN
				SET	query_sql = CONCAT(query_sql, ' where b.cname like "', '%',cname, '%" and b.classes_number like "', '%',classesNumber, '%"');
			END IF;
			IF username <> '' AND cname <> '' AND classesNumber <> '' THEN
				SET	query_sql = CONCAT(query_sql, ' where b.student like "', '%',username, '%" and b.cname like "', '%',cname, '%" and b.classes_number like "', '%',classesNumber, '%"');
			END IF;
			IF username <> '' AND cname = '' AND classesNumber = '' THEN
				SET	query_sql = CONCAT(query_sql, ' where b.student like "', '%',username, '%"');
			END IF;
			IF username = '' AND cname <> '' AND classesNumber = '' THEN
				SET	query_sql = CONCAT(query_sql, ' where b.cname like "', '%',cname, '%"');
			END IF;
			IF username <> '' AND cname <> '' AND classesNumber = '' THEN
				SET	query_sql = CONCAT(query_sql, ' where b.student like "', '%',username, '%" and b.cname like "', '%',cname, '%"');
			END IF;
			IF currPage <> '' AND pageSize <> '' THEN
			  SET query_sql_concat = CONCAT(query_sql_concat,' limit ',currPage ,',',pageSize);
			END IF;
			SET query_sql = CONCAT(query_sql,query_sql_concat,')');


			SET @sql1=query_sql;
			PREPARE stmt1 FROM @sql1;
			EXECUTE stmt1;
  End IF;

	IF module='skill' THEN
	  SET query_sql= CONCAT("
	   (select null as a1,null as a2,GROUP_CONCAT(CONCAT(tgo.title ,'(',tgo.weight*100,'%)') order by tgo.assignment_id asc),
		  tg.title as a3,null as a4,null as a5,null as a6,null as a7,null as a8,null as a9,null as a10,null as a11
			from t_gradebook tg
			inner join t_grade_object tgo on tg.id=tgo.grade_id and tgo.module ='",module,"' and tgo.type='",type,"' and tgo.is_open = 1
			where tg.site_id=",siteId,"	group by tg.site_id)

			UNION

			(select b.cname,b.student,group_concat( IFNULL(a.points,0) ORDER BY b.assignment_id asc) as points,
			IFNULL(CONVERT(sum(a.points*a.weight )/sum(c.weight),decimal(11,1)),0),
			IFNULL(b.addition_task_score,0),IFNULL(b.addition_skill_test_score,0),IFNULL(b.addition_skill_data_score,0),
			IFNULL(b.addition_skill_attendance_score,0),IFNULL(b.addition_experiment_assignment,0),IFNULL(b.addition_action_score,0),
			IFNULL(b.addition_experiment_score,0),IFNULL(b.addition_group_score,0)
			from
			(select ttg.student,ttg.cname,ttg.addition_task_score,ttg.addition_test_score,ttg.addition_exam_score,ttg.addition_attendance_score,ttg.addition_experiment_assignment
			,ttg.addition_action_score,ttg.addition_experiment_score,ttg.addition_group_score,tgo.assignment_id,tgo.id,ttg.addition_skill_test_score,ttg.addition_skill_attendance_score
			,addition_skill_data_score,ttg.classes_number
			from t_test_grading ttg
			inner join t_gradebook tg on ttg.site_id = tg.site_id
			left join t_grade_object tgo on tgo.grade_id=tg.id and tgo.is_open = 1
			where tg.site_id=",siteId," and tgo.module ='",module,"' and tgo.type='",type,"' order by ttg.student,tgo.assignment_id) b

			left join
			(select tgr.student_number,tgr.cname,tgo.assignment_id,tgo.title,tgo.id,tgr.points,tgo.type,tgo.weight
			from t_grade_object tgo
			inner join t_gradebook tg on tg.site_id=",siteId," and tg.id=tgo.grade_id
			inner join t_grade_record tgr on tgr.object_id=tgo.id
			where tgo.module ='",module,"' and tgo.type='",type,"' and tg.site_id=",siteId,"
			group by tgr.student_number,tgo.id) a on b.student= a.student_number and b.assignment_id= a.assignment_id

			left join t_weight_setting tws ON a.type = tws.type AND tws.site_id = ",siteId,"

			left join
			(select tgo.id,tgo.weight
			from t_grade_object as tgo inner join t_gradebook as tg on tgo.grade_id = tg.id and tgo.is_open = 1
			where tg.site_id = ",siteId," and tgo.type = '",type,"' and tgo.module='",module,"') c on c.id = b.id");

			SET query_sql_concat = CONCAT("
			group by b.student
			order by b.student,b.assignment_id");

			IF username = '' AND cname = '' AND classesNumber <> '' THEN
				SET	query_sql = CONCAT(query_sql, ' where b.classes_number like "', '%',classesNumber, '%"');
			END IF;
			IF username <> '' AND cname = '' AND classesNumber <> '' THEN
				SET	query_sql = CONCAT(query_sql, ' where b.student like "', '%',username, '%" and b.classes_number like "', '%',classesNumber, '%"');
			END IF;
			IF username = '' AND cname <> '' AND classesNumber <> '' THEN
				SET	query_sql = CONCAT(query_sql, ' where b.cname like "', '%',cname, '%" and b.classes_number like "', '%',classesNumber, '%"');
			END IF;
			IF username <> '' AND cname <> '' AND classesNumber <> '' THEN
				SET	query_sql = CONCAT(query_sql, ' where b.student like "', '%',username, '%" and b.cname like "', '%',cname, '%" and b.classes_number like "', '%',classesNumber, '%"');
			END IF;
			IF username <> '' AND cname = '' AND classesNumber = '' THEN
				SET	query_sql = CONCAT(query_sql, ' where b.student like "', '%',username, '%"');
			END IF;
			IF username = '' AND cname <> '' AND classesNumber = '' THEN
				SET	query_sql = CONCAT(query_sql, ' where b.cname like "', '%',cname, '%"');
			END IF;
			IF username <> '' AND cname <> '' AND classesNumber = '' THEN
				SET	query_sql = CONCAT(query_sql, ' where b.student like "', '%',username, '%" and b.cname like "', '%',cname, '%"');
			END IF;
			IF currPage <> '' AND pageSize <> '' THEN
			  SET query_sql_concat = CONCAT(query_sql_concat,' limit ',currPage ,',',pageSize);
			END IF;
			SET query_sql = CONCAT(query_sql,query_sql_concat,')');


			SET @sql1=query_sql;
			PREPARE stmt1 FROM @sql1;
			EXECUTE stmt1;
  End IF;

IF module='experience' AND type='assignment' THEN
	  SET query_sql= CONCAT("
	   (select null as a1,null as a2,GROUP_CONCAT(CONCAT(tgo.title ,'(',tgo.weight*100,'%)') order by tgo.assignment_id asc),
		  tg.title as a3,null as a4,null as a5,null as a6,null as a7,null as a8,null as a9,null as a10,null as a11
			from t_gradebook tg
			inner join t_grade_object tgo on tg.id=tgo.grade_id and tgo.module ='",module,"' and tgo.type='",type,"' and tgo.is_open = 1
			where tg.site_id=",siteId,"	group by tg.site_id)

			UNION

			(select b.cname,b.student,group_concat( IFNULL(a.points,0) ORDER BY b.assignment_id asc) as points,
			IFNULL(CONVERT(sum(a.points*a.weight )/sum(c.weight),decimal(11,1)),0),
			IFNULL(b.addition_task_score,0),IFNULL(b.addition_test_score,0),IFNULL(b.addition_exam_score,0),
			IFNULL(b.addition_attendance_score,0),IFNULL(b.addition_experiment_assignment,0),IFNULL(b.addition_action_score,0),
			IFNULL(b.addition_experiment_score,0),IFNULL(b.addition_group_score,0)
			from
			(select ttg.student,ttg.cname,ttg.addition_task_score,ttg.addition_test_score,ttg.addition_exam_score,ttg.addition_attendance_score,ttg.addition_experiment_assignment
			,ttg.addition_action_score,ttg.addition_experiment_score,ttg.addition_group_score,tgo.assignment_id,tgo.id,ttg.classes_number
			from t_test_grading ttg
			inner join t_gradebook tg on ttg.site_id = tg.site_id
			left join t_grade_object tgo on tgo.grade_id=tg.id and tgo.is_open = 1
			where tg.site_id=",siteId," and tgo.module ='",module,"' and tgo.type='",type,"' order by ttg.student,tgo.assignment_id) b

			left join
			(select tgr.student_number,tgr.cname,tgo.assignment_id,tgo.title,tgo.id,tgr.points,tgo.type,tgo.weight
			from t_grade_object tgo
			inner join t_gradebook tg on tg.site_id=",siteId," and tg.id=tgo.grade_id
			inner join t_grade_record tgr on tgr.object_id=tgo.id
			where tgo.module ='",module,"' and tgo.type='",type,"' and tg.site_id=",siteId,"
			group by tgr.student_number,tgo.id) a on b.student= a.student_number and b.assignment_id= a.assignment_id

			left join t_weight_setting tws ON a.type = tws.type AND tws.site_id = ",siteId,"

			left join
			(select tgo.id,tgo.weight
			from t_grade_object as tgo inner join t_gradebook as tg on tgo.grade_id = tg.id and tgo.is_open = 1
			where tg.site_id = ",siteId," and tgo.type = '",type,"' and tgo.module='",module,"') c on c.id = b.id");

			SET query_sql_concat = CONCAT("
			group by b.student
			order by b.student,b.assignment_id");

			IF username = '' AND cname = '' AND classesNumber <> '' THEN
				SET	query_sql = CONCAT(query_sql, ' where b.classes_number like "', '%',classesNumber, '%"');
			END IF;
			IF username <> '' AND cname = '' AND classesNumber <> '' THEN
				SET	query_sql = CONCAT(query_sql, ' where b.student like "', '%',username, '%" and b.classes_number like "', '%',classesNumber, '%"');
			END IF;
			IF username = '' AND cname <> '' AND classesNumber <> '' THEN
				SET	query_sql = CONCAT(query_sql, ' where b.cname like "', '%',cname, '%" and b.classes_number like "', '%',classesNumber, '%"');
			END IF;
			IF username <> '' AND cname <> '' AND classesNumber <> '' THEN
				SET	query_sql = CONCAT(query_sql, ' where b.student like "', '%',username, '%" and b.cname like "', '%',cname, '%" and b.classes_number like "', '%',classesNumber, '%"');
			END IF;
			IF username <> '' AND cname = '' AND classesNumber = '' THEN
				SET	query_sql = CONCAT(query_sql, ' where b.student like "', '%',username, '%"');
			END IF;
			IF username = '' AND cname <> '' AND classesNumber = '' THEN
				SET	query_sql = CONCAT(query_sql, ' where b.cname like "', '%',cname, '%"');
			END IF;
			IF username <> '' AND cname <> '' AND classesNumber = '' THEN
				SET	query_sql = CONCAT(query_sql, ' where b.student like "', '%',username, '%" and b.cname like "', '%',cname, '%"');
			END IF;
			IF currPage <> '' AND pageSize <> '' THEN
			  SET query_sql_concat = CONCAT(query_sql_concat,' limit ',currPage ,',',pageSize);
			END IF;
			SET query_sql = CONCAT(query_sql,query_sql_concat,')');


			SET @sql1=query_sql;
			PREPARE stmt1 FROM @sql1;
			EXECUTE stmt1;
  End IF;

IF module='nominals' THEN
	  SET query_sql= CONCAT("
	   (select null as a1,null as a2,GROUP_CONCAT(CONCAT(tgo.title ,'(',tgo.assignment_id,'+',tgo.weight*100,'%',')') order by tgo.assignment_id asc),
		  tg.title as a3,null as a4,null as a5,null as a6,null as a7,null as a8,null as a9,null as a10,null as a11,null as a12,null as a13
			from t_gradebook tg
			inner join t_grade_object tgo on tg.id=tgo.grade_id and tgo.module ='",module,"' and tgo.type='",type,"'
			where tg.site_id=",siteId,"	group by tg.site_id)

			UNION

			(select b.cname,b.student,group_concat( IFNULL(a.points,0) ORDER BY b.assignment_id asc) as points,
			IFNULL(CONVERT(sum(a.points*a.weight )/sum(c.weight),decimal(11,1)),0),
			IFNULL(b.addition_task_score,0),IFNULL(b.addition_test_score,0),IFNULL(b.addition_exam_score,0),
			IFNULL(b.addition_attendance_score,0),IFNULL(b.addition_experiment_assignment,0),IFNULL(b.addition_action_score,0),
			IFNULL(b.addition_experiment_score,0),IFNULL(b.addition_group_score,0),b.group_id,b.group_title
			from
			(select ttg.student,ttg.cname,ttg.addition_task_score,ttg.addition_test_score,ttg.addition_exam_score,ttg.addition_attendance_score,ttg.addition_experiment_assignment
			,ttg.addition_action_score,ttg.addition_experiment_score,ttg.addition_group_score,tgo.assignment_id,tgo.id,ttg.group_id,ttg.group_title
			from t_test_grading ttg
			inner join t_gradebook tg on ttg.site_id = tg.site_id
			left join t_grade_object tgo on tgo.grade_id=tg.id
			where tg.site_id=",siteId," and tgo.module ='",module,"' and tgo.type='",type,"' order by ttg.student,tgo.assignment_id) b

			left join
			(select tgr.student_number,tgr.cname,tgo.assignment_id,tgo.title,tgo.id,tgr.points,tgo.type,tgo.weight
			from t_grade_object tgo
			inner join t_gradebook tg on tg.site_id=",siteId," and tg.id=tgo.grade_id
			inner join t_grade_record tgr on tgr.object_id=tgo.id
			where tgo.module ='",module,"' and tgo.type='",type,"' and tg.site_id=",siteId,"
			group by tgr.student_number,tgo.id) a on b.student= a.student_number and b.assignment_id= a.assignment_id

			left join t_weight_setting tws ON a.type = tws.type AND tws.site_id = ",siteId,"

			left join
			(select tgo.id,tgo.weight
			from t_grade_object as tgo inner join t_gradebook as tg on tgo.grade_id = tg.id
			where tg.site_id = ",siteId," and tgo.type = '",type,"' and tgo.module='",module,"') c on c.id = b.id");

			SET query_sql_concat = CONCAT("
			group by b.student
			order by b.student,b.assignment_id");

			IF username <> '' AND cname = '' THEN
				SET	query_sql = CONCAT(query_sql, ' where b.student like "', '%',username, '%"');
			END IF;
			IF username = '' AND cname <> '' THEN
				SET	query_sql = CONCAT(query_sql, ' where b.cname like "', '%',cname, '%"');
			END IF;
			IF username <> '' AND cname <> '' THEN
				SET	query_sql = CONCAT(query_sql, ' where b.student like "', '%',username, '%" and b.cname like "', '%',cname, '%"');
			END IF;
			IF currPage <> '' AND pageSize <> '' THEN
			  SET query_sql_concat = CONCAT(query_sql_concat,' limit ',currPage ,',',pageSize);
			END IF;
			SET query_sql = CONCAT(query_sql,query_sql_concat,')');


			SET @sql1=query_sql;
			PREPARE stmt1 FROM @sql1;
			EXECUTE stmt1;
  End IF;

	END
;;
DELIMITER ;