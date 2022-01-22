DROP VIEW
IF
	EXISTS `view_total_score_practicetimetable`;
CREATE VIEW `view_total_score_practicetimetable` AS SELECT
`d`.`student` AS `student`,
`d`.`cname` AS `cname`,
`d`.`course_number` AS `course_number`,
`d`.`title` AS `title`,
cast(
	sum((
			`d`.`points` * `d`.`weight`
		)) AS DECIMAL ( 10, 2 )) AS `total_score`,
ifnull( `d`.`marked_count`, 0 ) AS `rest_marked`
FROM
	(
	SELECT
		`a`.`student` AS `student`,
		`a`.`cname` AS `cname`,
		cast(
			sum((
				ifnull( `b`.`points`, 0 ) * ifnull( `c`.`final_weight`, 0 ))) AS DECIMAL ( 10, 2 )) AS `points`,
		`a`.`weight_id` AS `weight_id`,
		`c`.`final_weight` AS `final_weight`,
		`a`.`weight` AS `weight`,
		`b`.`title` AS `title`,
		`e`.`marked_count` AS `marked_count`,
		`a`.`course_number` AS `course_number`
	FROM
		(((((
						SELECT
							`ttg`.`student` AS `student`,
							`ttg`.`cname` AS `cname`,
							`tgo`.`id` AS `id`,
							`ttg`.`course_number` AS `course_number`,
							`tws`.`id` AS `weight_id`,
							`tws`.`weight` AS `weight`,
							`tgo`.`marked` AS `marked`
						FROM
							(((
										`t_test_grading` `ttg`
										JOIN `t_gradebook` `tg` ON ((
												`tg`.`course_number` = `ttg`.`course_number`
											)))
									LEFT JOIN `t_grade_object` `tgo` ON ((
											`tgo`.`grade_id` = `tg`.`id`
										)))
								LEFT JOIN `t_weight_setting` `tws` ON ((
										`tws`.`course_number` = `ttg`.`course_number`
									)))
						WHERE
							((
									`tg`.`term_number` = '63487ed7-bee1-4b7a-affb-92a1d692ecf9'
									)
							AND ( `tgo`.`module` = 'practiceTimetable' )))) `a`
					JOIN (
					SELECT
						`tgo`.`id` AS `id`,
						`tgr`.`student_number` AS `student_number`,
						`tgr`.`points` AS `points`,
						`tgr`.`weight_id` AS `weight_id`,
						`tg`.`title` AS `title`,
						`tg`.`course_number` AS `course_number`
					FROM
						((
								`t_grade_object` `tgo`
								JOIN `t_grade_record` `tgr` ON ((
										`tgo`.`id` = `tgr`.`object_id`
									)))
							JOIN `t_gradebook` `tg` ON ((
									`tg`.`id` = `tgo`.`grade_id`
									)))) `b` ON (((
								`a`.`student` = `b`.`student_number`
							)
							AND ( `a`.`weight_id` = `b`.`weight_id` )
							AND ( `a`.`id` = `b`.`id` )
						AND ( `a`.`course_number` = `b`.`course_number` ))))
				JOIN ( SELECT `ow`.`object_id` AS `object_id`, `ow`.`weight_id` AS `weight_id`, `ow`.`final_weight` AS `final_weight` FROM `object_weight` `ow` ) `c` ON (((
							`c`.`object_id` = `a`.`id`
							)
					AND ( `c`.`weight_id` = `a`.`weight_id` ))))
			LEFT JOIN (
			SELECT
				count( `tgo`.`id` ) AS `marked_count`,
				`tg`.`course_number` AS `course_number`
			FROM
				(
					`t_gradebook` `tg`
					JOIN `t_grade_object` `tgo` ON ((
							`tg`.`id` = `tgo`.`grade_id`
						)))
			WHERE
				( `tgo`.`marked` <> 1 )
			GROUP BY
				`tg`.`course_number`
				) `e` ON ((
					`e`.`course_number` = `a`.`course_number`
				)))
	GROUP BY
		`a`.`student`,
		`a`.`weight_id`
	ORDER BY
		`a`.`student`,
		`a`.`id`,
		`a`.`weight_id`
	) `d`
GROUP BY
	`d`.`student`;