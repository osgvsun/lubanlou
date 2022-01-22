DROP PROCEDURE IF EXISTS `porc_gradebook_total_list_practiceTimetable`;
DELIMITER ;;
CREATE PROCEDURE `porc_gradebook_total_list_practiceTimetable`(IN `courseNumber` varchar(255),IN `product` varchar(255),IN `currPage` varchar(11),IN `pageSize` varchar(11))
BEGIN
DECLARE query_sql LONGTEXT;
SET query_sql= CONCAT("
				(select null as a1,null as a2,GROUP_CONCAT(tws.id) from t_gradebook tg
				inner join t_weight_setting tws on tws.course_number=tg.course_number
				where tg.course_number='",courseNumber,"' and tg.product='",product,"')
				union
				(select d.student,d.cname,GROUP_CONCAT(d.points order by d.weight_id) from(
				select a.student,a.cname,CONVERT(SUM(IFNULL(b.points,0)*IFNULL(c.final_weight,0)),decimal(10,2)) as points,a.weight_id,c.final_weight from
								(select ttg.student,ttg.cname,tgo.id,ttg.course_number,tws.id as weight_id from t_test_grading ttg
								inner join t_gradebook tg on tg.course_number = ttg.course_number
								left join t_grade_object tgo on tgo.grade_id = tg.id
								left join t_weight_setting tws on tws.course_number = ttg.course_number
								where ttg.course_number='",courseNumber,"' and tgo.module='",product,"' ) a
								left join
								(select tgo.id,tgr.student_number,tgr.points,tgr.weight_id from t_grade_object tgo
								inner join t_grade_record tgr on tgo.id = tgr.object_id
								inner join t_gradebook tg on tg.id = tgo.grade_id
								where tg.course_number = '",courseNumber,"'
								) b on a.student = b.student_number and a.weight_id = b.weight_id and a.id=b.id
								left join
								(select ow.object_id,ow.weight_id, ow.final_weight from object_weight ow) c on c.object_id = a.id and c.weight_id = a.weight_id
								group by a.student,a.weight_id
								order by a.student,a.id,a.weight_id asc) d
				group by d.student");
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