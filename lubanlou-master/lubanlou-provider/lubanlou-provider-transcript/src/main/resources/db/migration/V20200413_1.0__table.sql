alter table `t_test_grading` add skill_assignment_score float (0) DEFAULT NULL COMMENT '实验作业成绩';
alter table `t_test_grading` add skill_report_score  float (0) DEFAULT NULL COMMENT '实验报告成绩';
alter table `t_test_grading` add skill_data_score float (0) DEFAULT NULL COMMENT '实验数据成绩';
alter table `t_test_grading` add skill_attendance_score float (0) DEFAULT NULL COMMENT '实验考勤成绩';
alter table `t_test_grading` add addition_skill_data_score float (0) DEFAULT NULL COMMENT '额外实验数据成绩';
alter table `t_test_grading` add addition_skill_attendance_score float (0) DEFAULT NULL COMMENT '额外实验考勤成绩';