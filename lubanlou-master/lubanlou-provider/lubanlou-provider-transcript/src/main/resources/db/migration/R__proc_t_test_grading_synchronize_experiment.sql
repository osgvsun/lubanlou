DROP PROCEDURE IF EXISTS `proc_t_test_grading_synchronize_experiment`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `proc_t_test_grading_synchronize_experiment`(
  IN courseNumber varchar(40)
  )
BEGIN
DECLARE varStudentNumber varchar(255);
DECLARE varCName varchar(255);
DECLARE varPoints decimal(5,1);
DECLARE varCourseNumber varchar(40);
DECLARE varModule varchar(255);
DECLARE varType varchar(255);
DECLARE varCurCount INT;
DECLARE varExpreportPoints decimal(5,1);
DECLARE varExpworkPoints decimal(5,1);
DECLARE varExpworkWeight decimal(5,1);
DECLARE varExpreportWeight decimal(5,1);
DECLARE sumWeight decimal(5,1);


DECLARE done int default 0;

declare userCur cursor for
	select tgr.student_number,tgr.cname,sum(tgr.points*tgo.weight) as points,tg.course_number,tgo.module,tgo.type
	from t_grade_record tgr
	inner join t_grade_object tgo on tgo.id=tgr.object_id
	inner join t_gradebook tg on tg.id=tgo.grade_id where tg.course_number=courseNumber
	group by tgr.student_number,tgo.module,tgo.type;

declare continue handler for not FOUND set done = 1;

open userCur;

REPEAT
fetch userCur into varStudentNumber,varCName,varPoints,varCourseNumber,varModule,varType;

	SELECT count(*) into varCurCount from t_test_grading ttg where ttg.student=varStudentNumber and ttg.course_number=courseNumber;
	IF varCurCount=0 THEN
		insert into t_test_grading(id,student,cname,course_number) VALUES(null,varStudentNumber,varCName,varCourseNumber);
	END IF;

until done end repeat;

close userCur;

update t_test_grading ttg inner join
   (select a.student,a.course_number,
   CONVERT(sum(case when a.type='assignment' then a.points*tws.weight when a.type='report' then a.points*tws1.weight when a.type='prepareTest' then a.points*tws2.weight end)/(tws.weight+tws1.weight+tws2.weight),decimal(11,1)) as points
   from(
			select a.student,b.type,b.course_number,
									IFNULL(CONVERT((IFNULL(sum(a.points*a.weight )/(case when b.type = 'assignment' then e.weight when b.type <> 'assignment' then c.weight end),0) +
											case when b.type='assignment' then IFNULL(d.addition_experiment_assignment,0)
													 when b.type='report' then IFNULL(d.addition_experiment_score,0)
													 when b.type='prepareTest' then IFNULL(d.addition_skill_test_score,0) end
							),decimal(11,1)),0) as points
			from
			(select tgo.assignment_id,tgo.type,tg.course_number,tgo.weight,ttg.student
			from t_gradebook tg
			left join t_test_grading ttg on ttg.course_number = tg.course_number
			left join t_grade_object tgo on tgo.grade_id=tg.id
			where tgo.module ='experiment' and tgo.is_open = 1 and tg.course_number = courseNumber
			order by tgo.assignment_id) b

			left join
			(select tgr.cname,tgr.student_number,tgo.assignment_id,tgo.title,tgo.id,tgr.points,tgo.type,tgo.weight
			from t_grade_object tgo
			inner join t_gradebook tg on tg.course_number=courseNumber and tg.id=tgo.grade_id
			left join t_grade_record tgr on tgr.object_id=tgo.id
			where tgo.module ='experiment' and tg.course_number=courseNumber and tgo.is_open = 1
			group by tgr.student_number,tgo.id) a on b.assignment_id= a.assignment_id and b.student = a.student_number
			left join
			(select c.course_number,sum(c.weight) as weight
			from
			(select tg.course_number,tgo.weight
			from t_gradebook tg
			left join t_grade_object tgo on tgo.grade_id=tg.id
			where tg.course_number=courseNumber and tgo.module ='experiment' and tgo.is_open = 1 group by experiment_id ) c )
			c on c.course_number = courseNumber
			left join
			(select e.course_number,sum(e.weight) as weight
			from
			(select tg.course_number,tgo.weight
			from t_gradebook tg
			left join t_grade_object tgo on tgo.grade_id=tg.id
			where tg.course_number=courseNumber and tgo.module ='skill' and tgo.is_open = 1 and tgo.type='assignment' ) e )
			e on e.course_number = courseNumber
			left join
			(select IFNULL(ttg.addition_experiment_assignment,0) as addition_experiment_assignment,IFNULL(ttg.addition_experiment_score,0) as addition_experiment_score,IFNULL(ttg.addition_skill_test_score,0) as addition_skill_test_score,ttg.student from t_test_grading as ttg where ttg.course_number = courseNumber) d on d.student = b.student
			left join t_weight_setting tws ON a.type = tws.type AND tws.course_number = courseNumber

			group by b.student,b.type
			order by b.student,b.assignment_id) a
			left join t_weight_setting tws on tws.course_number=courseNumber and tws.type='expwork'
			left join t_weight_setting tws1 on tws1.course_number=courseNumber and tws1.type='expreport'
			left join t_weight_setting tws2 on tws2.course_number=courseNumber and tws2.type='exptest'
			group by a.student
		) a on a.student=ttg.student and a.course_number=ttg.course_number and ttg.course_number=courseNumber
	 set ttg.experiment_grade=a.points;




END
;;
DELIMITER ;