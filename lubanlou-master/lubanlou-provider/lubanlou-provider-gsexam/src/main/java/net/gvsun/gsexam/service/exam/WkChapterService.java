package net.gvsun.gsexam.service.exam;

import net.gvsun.gsexam.dto.common.GapsNumberVo;
import net.gvsun.gsexam.dto.common.SchoolAcademyVo;
import net.gvsun.gsexam.dto.common.SchoolClassesVo;
import net.gvsun.gsexam.dto.exam.WkChapterDto;

import java.util.List;
import java.util.Map;

public interface WkChapterService {

    /**************************************************************************
    * @Description: 根据tCourseSiteId寻找wkchapters
    * @Author: 罗璇
    * @Date: 2017/9/26 15:04
    **************************************************************************/
    public List<WkChapterDto> findWkChaptersByTCourseSiteId(Integer tCourseSiteId);
    /**************************************************************************
     * Description 根据tCourseSiteId和type寻找wkchapters
     *
     * @author 曹焕
     * @date 2018年11月23日
     **************************************************************************/
    public List<WkChapterDto> findWkChaptersByTCourseSiteIdAndModuleType(Integer tCourseSiteId, Integer moduleType);
    /**************************************************************************
     * Description 根据tCourseSiteId寻找技能的chapters
     *
     * @author 曹焕
     * @date 2018年11月23日
     **************************************************************************/
    public List<WkChapterDto> findWkChaptersByTExperimentSKillId(Integer tCourseSiteId);
    /**************************************************************************
    * @Description: 知识技能体验-ajax根据type和课程id获取章节
    * @Author: 罗璇
    * @Date: 2017/10/10 17:41
    **************************************************************************/
    public Map<Integer, String> findChapterMapByModuleTypeAndSiteId(Integer tCourseSiteId, Integer moduleType);
    /**************************************************************************
    * @Description: 知识技能体验-ajax根据章节id和获取课时列表map
    * @Author: 罗璇
    * @Date: 2017/10/10 17:54
    **************************************************************************/
    public Map<Integer, String> findLessonMapByChapterId(Integer chapterId);

    /**************************************************************************
     * Description 查找学院列表
     *
     * @author 洪春莹
     * @date 2018年10月30日
     **************************************************************************/
    public List<SchoolAcademyVo> findAllAcademys();
    /**************************************************************************
     * Description 查找学院列表(有可以考试班级的学院)
     *
     * @author 刘博越
     * @date 2019年3月21日
     **************************************************************************/
    public List<SchoolAcademyVo> findAllExamAcademys();
    /**************************************************************************
     * Description 根据学院查找班级
     *
     * @author 洪春莹
     * @date 2018年12月06日
     **************************************************************************/
    public List<SchoolClassesVo> findAllClassesByAcademyNumber(String schoolAcademy);
    /**************************************************************************
     * Description 根据题库动态获取填空题空的个数以及对应的题数
     *
     * @author 洪春莹
     * @date 2019年01月07日
     **************************************************************************/
    public List<GapsNumberVo> findGapsNumberByQuestionpool(Integer questionpoolId);
}
