DROP PROCEDURE IF EXISTS `proc_t_test_grading_synchronize`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `proc_t_test_grading_synchronize`(
  IN siteId INT
  )
BEGIN
DECLARE varStudentNumber varchar(255);
DECLARE varCName varchar(255);
DECLARE varPoints decimal(5,1);
DECLARE varSiteId INT;
DECLARE varModule varchar(255);
DECLARE varType varchar(255);
DECLARE varCurCount INT;
DECLARE varExpreportPoints decimal(5,1);
DECLARE varExpworkPoints decimal(5,1);
DECLARE varExpworkWeight decimal(5,1);
DECLARE varExpreportWeight decimal(5,1);
DECLARE sumWeight decimal(5,1);
DECLARE maxScore decimal(5,1);


DECLARE done int default 0;

declare userCur cursor for
	select tgr.student_number,tgr.cname,sum(tgr.points*tgo.weight) as points,tg.site_id,tgo.module,tgo.type
	from t_grade_record tgr
	inner join t_grade_object tgo on tgo.id=tgr.object_id
	inner join t_gradebook tg on tg.id=tgo.grade_id where tg.site_id=siteId
	group by tgr.student_number,tgo.module,tgo.type;

declare continue handler for not FOUND set done = 1;

open userCur;

REPEAT
fetch userCur into varStudentNumber,varCName,varPoints,varSiteId,varModule,varType;

	SELECT count(*) into varCurCount from t_test_grading ttg where ttg.student=varStudentNumber and ttg.site_id=siteId;
	IF varCurCount=0 THEN
		insert into t_test_grading(id,student,cname,site_id) VALUES(null,varStudentNumber,varCName,varSiteId);
	END IF;


	If not done THEN

		select max(tgr.points) as points into maxScore
		from t_grade_record tgr
		inner join t_grade_object tgo on tgo.id=tgr.object_id
		inner join t_gradebook tg on tg.id=tgo.grade_id where tg.site_id=1119
		and tgr.student_number = varStudentNumber and tgo.module = varModule and tgo.type = varType;

		IF varModule='knowledge' and varType='assignment' THEN
				select sum(tgo.weight) into sumWeight from t_grade_object as tgo
				inner join t_gradebook as tg on tg.id = tgo.grade_id where tg.site_id = siteId and tgo.module = 'knowledge' and tgo.type = 'assignment';

				UPDATE t_test_grading ttg SET ttg.task_grade=CONVERT(varPoints/sumWeight+IFNULL(ttg.addition_task_score,0),decimal(11,1)),ttg.update_time = NOW()
				where ttg.student=varStudentNumber and ttg.site_id= siteId ;
		End if;

		IF varModule='knowledge' and varType='test' THEN
				select sum(tgo.weight) into sumWeight from t_grade_object as tgo
				inner join t_gradebook as tg on tg.id = tgo.grade_id where tg.site_id = siteId and tgo.module = 'knowledge' and tgo.type = 'test';

				UPDATE t_test_grading ttg SET ttg.test_grade=CONVERT(varPoints/sumWeight+IFNULL(ttg.addition_test_score,0),decimal(11,1)),ttg.update_time = NOW()
				where ttg.student=varStudentNumber and ttg.site_id= siteId;
		END if;

		IF varModule='knowledge' and varType='exam' THEN
				select sum(tgo.weight) into sumWeight from t_grade_object as tgo
				inner join t_gradebook as tg on tg.id = tgo.grade_id where tg.site_id = siteId and tgo.module = 'knowledge' and tgo.type = 'exam';

				IF sumWeight = 0 THEN
					UPDATE t_test_grading ttg SET ttg.exam_grade=CONVERT(maxScore+IFNULL(ttg.addition_exam_score,0),decimal(11,1)),ttg.update_time = NOW()
					where ttg.student=varStudentNumber and ttg.site_id= siteId;
				END IF;
				IF sumWeight <> 0 THEN
					UPDATE t_test_grading ttg SET ttg.exam_grade=CONVERT(varPoints/sumWeight+IFNULL(ttg.addition_exam_score,0),decimal(11,1)),ttg.update_time = NOW()
					where ttg.student=varStudentNumber and ttg.site_id= siteId;
				END IF;
		END if;

		IF varModule='knowledge' and varType='attendance' THEN
				select sum(tgo.weight) into sumWeight from t_grade_object as tgo
				inner join t_gradebook as tg on tg.id = tgo.grade_id where tg.site_id = siteId and tgo.module = 'knowledge' and tgo.type = 'attendance';

				UPDATE t_test_grading ttg SET ttg.attendance_grade=CONVERT(varPoints/sumWeight+IFNULL(ttg.addition_attendance_score,0),decimal(11,1)),ttg.update_time = NOW()
				where ttg.student=varStudentNumber and ttg.site_id= siteId;
		END if;


		IF varModule='skill' and varType='assignment' THEN
				select sum(tgo.weight) into sumWeight from t_grade_object as tgo
				inner join t_gradebook as tg on tg.id = tgo.grade_id where tg.site_id = siteId and tgo.module = 'skill' and tgo.type = 'assignment';

				UPDATE t_test_grading ttg SET ttg.skill_assignment_score=CONVERT(varPoints/sumWeight+IFNULL(ttg.addition_experiment_assignment,0),decimal(11,1)),ttg.update_time = NOW()
				where ttg.student=varStudentNumber and ttg.site_id= siteId;
		END if;


		IF varModule='skill' and varType='report' THEN
				select sum(tgo.weight) into sumWeight from t_grade_object as tgo
				inner join t_gradebook as tg on tg.id = tgo.grade_id where tg.site_id = siteId and tgo.module = 'skill' and tgo.type = 'report';

				UPDATE t_test_grading ttg SET ttg.skill_report_score=CONVERT(varPoints/sumWeight+IFNULL(ttg.addition_experiment_score,0),decimal(11,1)),ttg.update_time = NOW()
				where ttg.student=varStudentNumber and ttg.site_id= siteId;
		END if;


		IF varModule='skill' and varType='prepareTest' THEN
				select sum(tgo.weight) into sumWeight from t_grade_object as tgo
				inner join t_gradebook as tg on tg.id = tgo.grade_id where tg.site_id = siteId and tgo.module = 'skill' and tgo.type = 'prepareTest';

				UPDATE t_test_grading ttg SET ttg.skill_test_grade=CONVERT(varPoints/sumWeight+IFNULL(ttg.addition_skill_test_score,0),decimal(11,1)),ttg.update_time = NOW()
				where ttg.student=varStudentNumber and ttg.site_id= siteId;
		END if;


		IF varModule='skill' and varType='data' THEN
				select sum(tgo.weight) into sumWeight from t_grade_object as tgo
				inner join t_gradebook as tg on tg.id = tgo.grade_id where tg.site_id = siteId and tgo.module = 'skill' and tgo.type = 'data';

				UPDATE t_test_grading ttg SET ttg.skill_data_score=CONVERT(varPoints/sumWeight+IFNULL(ttg.addition_skill_data_score,0),decimal(11,1)),ttg.update_time = NOW()
				where ttg.student=varStudentNumber and ttg.site_id= siteId;
		END if;


		IF varModule='skill' and varType='attendance' THEN
				select sum(tgo.weight) into sumWeight from t_grade_object as tgo
				inner join t_gradebook as tg on tg.id = tgo.grade_id where tg.site_id = siteId and tgo.module = 'skill' and tgo.type = 'attendance';

				UPDATE t_test_grading ttg SET ttg.skill_attendance_score=CONVERT(varPoints/sumWeight+IFNULL(ttg.addition_skill_attendance_score,0),decimal(11,1)),ttg.update_time = NOW()
				where ttg.student=varStudentNumber and ttg.site_id= siteId;
		END if;

		IF varModule='experience' and varType='assignment' THEN
				select sum(tgo.weight) into sumWeight from t_grade_object as tgo
				inner join t_gradebook as tg on tg.id = tgo.grade_id where tg.site_id = siteId and tgo.module = 'experience' and tgo.type = 'assignment';

				UPDATE t_test_grading ttg SET ttg.experience_work_score=CONVERT(varPoints/sumWeight+IFNULL(ttg.addition_experience_work_score,0),decimal(11,1)),ttg.update_time = NOW()
				where ttg.student=varStudentNumber and ttg.site_id= siteId;
		END if;



	End if;
until done end repeat;

close userCur;


	update t_test_grading ttg inner join
			(select student_number,tg.site_id,
			IFNULL(CONVERT(sum(tgr.points*tgo.weight )/sum(tgo.weight),decimal(11,1)),0)+IFNULL(ttg.addition_group_score,0) as points
			from t_grade_record tgr
			inner join t_gradebook tg on tg.site_id=siteId
			inner join t_grade_object tgo on tgo.grade_id=tg.id and tgo.id=tgr.object_id
			left join t_test_grading ttg on ttg.student=tgr.student_number and ttg.site_id=siteId
			where tgo.module ='experience' and tgo.type <> 'assignment'
			group by tgr.student_number) a on a.student_number=ttg.student and a.site_id=ttg.site_id and ttg.site_id=siteId
	 set ttg.group_grade=a.points;


END
;;
DELIMITER ;