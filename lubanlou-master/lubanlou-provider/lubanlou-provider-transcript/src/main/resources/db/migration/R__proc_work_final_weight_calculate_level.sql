-- 计算评分项权重
-- 黄浩 2020年8月24日
DROP PROCEDURE IF EXISTS `proc_work_final_weight_calculate_level`;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `proc_work_final_weight_calculate_level`(
  IN parentId  INT)
BEGIN
DECLARE varWeightId INT;
DECLARE varObjectId INT;
DECLARE varPeriod DECIMAL(5,2);
DECLARE done int default 0;
DECLARE edone int default 0;
DECLARE varSumWeight DECIMAL(5,2);

-- 外层循环体开始
declare weightIdCur cursor for
	select ow.object_id,ow.weight_id from object_weight ow
	inner join t_weight_setting tws on tws.id=ow.weight_id
	where tws.parent_id=parentId;

declare continue handler for not FOUND set done = 1;

-- 标准分求和
select sum(tws.weight) into varSumWeight from t_weight_setting tws
	where tws.parent_id=parentId;
-- 外层循环体结束
-- 外层循环评分项开始
open weightIdCur;

varWeightLoop: LOOP
	fetch weightIdCur into varObjectId,varWeightId;
	IF done = 1 THEN
			LEAVE varWeightLoop;
	END IF;

	IF edone <> 1 THEN
			update object_weight as o,(select (tws.weight/varSumWeight) as weight from t_weight_setting tws where tws.id=varWeightId) a set o.final_weight = a.weight where o.weight_id = varWeightId and o.object_id = varObjectId;
	END IF;
END LOOP;

close weightIdCur;
-- 外层循环评分项结束
END
;;
DELIMITER ;