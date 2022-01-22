-- 计算评分项打分成绩
-- 黄浩 2020年8月24日
DROP PROCEDURE IF EXISTS `proc_work_score_calculate`;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `proc_work_score_calculate`(
  IN `experimentTitle` varchar(255),
  IN `levelNum` int,
  IN `student` varchar(255))
BEGIN
DECLARE varParentId INT;
DECLARE varObjectId INT;
DECLARE varWeightId INT;
DECLARE varPeriod DECIMAL(5,2);
DECLARE done int default 0;
DECLARE edone int default 0;
DECLARE varScore DECIMAL(5,2);
DECLARE query_sql LONGTEXT;

-- 外层循环体开始
declare weightIdCur cursor for
(SELECT
	SUM(ow.final_weight * tgr.points),tws.parent_id,tgo.id,tws.id
FROM
	t_weight_setting tws
INNER JOIN t_grade_record tgr ON tgr.weight_id = tws.id
INNER JOIN object_weight ow ON ow.weight_id = tgr.weight_id
INNER JOIN t_grade_object tgo ON tgo.id = ow.object_id
WHERE tws.`level` = levelNum AND tgo.experiment_title = exprimentTitle GROUP BY tws.parent_id);

declare continue handler for not FOUND set done = 1;
-- 外层循环体结束
-- 外层循环评分项开始
open weightIdCur;

varWeightLoop: LOOP
	fetch weightIdCur into varScore,varParentId,varObjectId,varWeightId;
	IF done = 1 THEN
			LEAVE varWeightLoop;
	END IF;

	IF edone <> 1 THEN
			delete from t_grade_record where object_id = varObjectId and weight_id = varWeightId;
			SET query_sql=CONCAT("insert into t_grade_record (NULL,'",student,"',NULL,",varScore,",",varObjectId,",NOW(),",varWeightId,")");

					SET @sql1=query_sql;
					PREPARE stmt1 FROM @sql1;
					EXECUTE stmt1;
	END IF;
END LOOP;

close weightIdCur;
-- 外层循环评分项结束
END
;;
DELIMITER ;