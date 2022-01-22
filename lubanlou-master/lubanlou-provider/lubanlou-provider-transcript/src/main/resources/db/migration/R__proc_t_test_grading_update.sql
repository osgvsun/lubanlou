DROP PROCEDURE IF EXISTS `proc_t_test_grading_update`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `proc_t_test_grading_update`(IN module	varchar(255),
  IN type	varchar(255),
  IN site_id INT,
  IN student	varchar(255),
  IN score NUMERIC(8,1))
  BEGIN

IF module='knowledge' and type='assignment' THEN
   UPDATE t_test_grading ttg SET ttg.addition_task_score=score where ttg.student=student and ttg.site_id= site_id ;
END if;

IF module='knowledge' and type='exam' THEN
   UPDATE t_test_grading ttg SET ttg.addition_exam_score=score where ttg.student=student and ttg.site_id= site_id;
END if;

IF module='knowledge' and type='test' THEN
   UPDATE t_test_grading ttg SET ttg.addition_test_score=score where ttg.student=student and ttg.site_id= site_id;
END if;

IF module='knowledge' and type='attendance' THEN
   UPDATE t_test_grading ttg SET ttg.addition_attendance_score=score where ttg.student=student and ttg.site_id= site_id;
END if;
IF module='knowledge' and type='action' THEN
   UPDATE t_test_grading ttg SET ttg.addition_action_score=score where ttg.student=student and ttg.site_id= site_id;
END if;

IF module='skill' and type='assignment' THEN
   UPDATE t_test_grading ttg SET ttg.addition_experiment_assignment=score where ttg.student=student and ttg.site_id= site_id;
END if;

IF module='skill' and type='report' THEN
   UPDATE t_test_grading ttg SET ttg.addition_experiment_score=score where ttg.student=student and ttg.site_id= site_id;
END if;

IF module='skill' and type='prepareTest' THEN
   UPDATE t_test_grading ttg SET ttg.addition_skill_test_score=score where ttg.student=student and ttg.site_id= site_id;
END if;

IF module='skill' and type='data' THEN
   UPDATE t_test_grading ttg SET ttg.addition_skill_data_score=score where ttg.student=student and ttg.site_id= site_id;
END if;

IF module='skill' and type='attendance' THEN
   UPDATE t_test_grading ttg SET ttg.addition_skill_attendance_score=score where ttg.student=student and ttg.site_id= site_id;
END if;

IF module='experience' THEN
   UPDATE t_test_grading ttg SET ttg.addition_group_score=score where ttg.student=student and ttg.site_id= site_id;
END if;

IF module='experience' and type = 'assignment'  THEN
   UPDATE t_test_grading ttg SET ttg.addition_experience_work_score=score where ttg.student=student and ttg.site_id= site_id;
END if;

IF module='all' THEN
   UPDATE t_test_grading ttg SET ttg.addition_score=score where ttg.student=student and ttg.site_id= site_id;
END if;

END
;;
DELIMITER ;