DROP PROCEDURE IF EXISTS `porc_gradebook_list_practiceTimetable`;
DELIMITER ;;
CREATE PROCEDURE `porc_gradebook_list_practiceTimetable`(IN `courseNumber` varchar(255),IN `module` varchar(255),IN `workId` int,IN `currPage` varchar(11),IN `pageSize` varchar(11))
BEGIN
DECLARE query_sql LONGTEXT; 

	
		SET query_sql= CONCAT("
				(select null as a1,null as a2,GROUP_CONCAT(ow.weight_id) from t_grade_object tgo 
				inner join object_weight ow on ow.object_id=tgo.id
				where tgo.id= ",workId,")
				union
				(select a.student,a.cname,GROUP_CONCAT(IFNULL(b.points,-1) order by a.weight_id) from
				(select ttg.student,ttg.cname,tgo.id,ttg.course_number,ow.weight_id as weight_id from t_test_grading ttg
				inner join t_gradebook tg on tg.course_number = ttg.course_number
				left join t_grade_object tgo on tgo.grade_id = tg.id
				inner join object_user ou on ou.object_uid = tgo.experiment_title and ou.username = ttg.student
				left join object_weight ow on ow.object_id=tgo.id
				where ttg.course_number='",courseNumber,"' and tgo.module='",module,"' and tgo.id=",workId,") a
				left join 
				(select tgo.id,tgr.student_number,tgr.points,tgr.weight_id from t_grade_object tgo 
				inner join t_grade_record tgr on tgo.id = tgr.object_id
				where tgo.id = ",workId," group by tgr.student_number,tgr.weight_id) b on a.student = b.student_number and a.weight_id = b.weight_id 
				group by a.student
				order by a.student,a.weight_id");

			IF currPage <> '' AND pageSize <> '' THEN
			  SET query_sql = CONCAT(query_sql,' limit ',currPage ,',',pageSize);
			END IF;
				SET query_sql = CONCAT(query_sql,')');

			SET @sql1=query_sql;
			PREPARE stmt1 FROM @sql1;
			EXECUTE stmt1;
END
;;
DELIMITER ;