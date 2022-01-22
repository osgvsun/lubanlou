package net.gvsun.gswork.jpa;

import net.gvsun.gswork.domain.SchoolWeek;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;


/****************************************************************************
 * Description 教学系统-学校周次表
 *
 * @author 魏诚
 * @date 2017-07-26
 ****************************************************************************/
public interface SchoolWeekJPA extends JpaRepository<SchoolWeek, Integer>,
        JpaSpecificationExecutor<SchoolWeek> {

	//获取当前学期的schoolweek
	@Query("select c from SchoolWeek c where c.schoolTerm.id=?1 and c.week=?2")
	List<SchoolWeek> findSchoolWeekByTermId(Integer termId, Integer weekId);

	//获取当前学期的schoolweek

	//String sql="select w from SchoolWeek w where w.date='"+date+"' ";
	//sql+="and w.schoolTerm.id = "+schoolTerm+"";
	@Query("select w from SchoolWeek w where w.date=?1 and w.schoolTerm.id =?2")
	List<SchoolWeek> findSchoolWeek(Date date, Integer termId);
	/**************************************************************************
	 * Description 获取当前课程的所有周
	 *
	 * @author qxr
	 * @date 2018-8-10
	 * @return 站点里的周次集合
	 **************************************************************************/
	@Query("select w from SchoolWeek w where w.schoolTerm.id =?1")
	List<SchoolWeek> findWeekList(Integer termId);

	@Query("select w from SchoolWeek w where w.schoolTerm.id=?1 and w.week=?2 and w.weekday=?3")
	public SchoolWeek findDateByTermIdAndWeekAndWeekday(Integer termId, Integer weekId, Integer weekday);
}
