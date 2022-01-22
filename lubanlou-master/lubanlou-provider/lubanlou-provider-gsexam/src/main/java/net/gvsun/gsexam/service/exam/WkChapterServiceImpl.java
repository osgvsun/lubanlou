package net.gvsun.gsexam.service.exam;

import net.gvsun.gsexam.domain.*;
import net.gvsun.gsexam.dto.common.GapsNumberVo;
import net.gvsun.gsexam.dto.common.SchoolAcademyVo;
import net.gvsun.gsexam.dto.common.SchoolClassesVo;
import net.gvsun.gsexam.dto.exam.WkChapterDto;
import net.gvsun.gsexam.dto.exam.WkLessonDto;
import net.gvsun.gsexam.jpa.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.*;

@Service("wkChapterService")
public class WkChapterServiceImpl implements WkChapterService {

    @Autowired
    private TCourseSiteJPA tCourseSiteJPA;
    @Autowired
    private TAssignmentItemJPA tAssignmentItemJPA;
    @Autowired
    private SchoolAcademyJPA schoolAcademyJPA;
    @Autowired
    private SchoolClassesJPA schoolClassesJPA;
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private TExperimentSkillJPA tExperimentSkillJPA;
    @Autowired
    private WkChapterJPA wkChapterJPA;
    @Autowired
    private WkLessonJPA wkLessonJPA;
    @Autowired
    private TAssignmentQuestionpoolJPA tAssignmentQuestionpoolJPA;

    /**************************************************************************
     * @Description: 根据tCourseSiteId寻找wkchapters
     * @Author: 罗璇
     * @Date: 2017/9/26 15:04
     **************************************************************************/
    @Override
    public List<WkChapterDto> findWkChaptersByTCourseSiteId(Integer tCourseSiteId) {
        List<WkChapterDto> voList = new ArrayList<WkChapterDto>();
        for(WkChapter wkChapter : tCourseSiteJPA.findOne(tCourseSiteId).getWkChapters()){
            WkChapterDto vo = new WkChapterDto();
            vo.setId(wkChapter.getId());
            vo.setName(wkChapter.getName());
            vo.setType(wkChapter.getType());
            //遍历wKlesson
            List<WkLessonDto> wkLessonDtos = new ArrayList<WkLessonDto>();
            for(WkLesson wkLesson : wkChapter.getWkLessons()){
                WkLessonDto dto = new WkLessonDto();
                dto.setId(wkLesson.getId());
                dto.setTitle(wkLesson.getTitle());

                wkLessonDtos.add(dto);
            }

            vo.setWkLessons(wkLessonDtos);

            voList.add(vo);
        }

        return voList;
    }
    /**************************************************************************
     * Description 根据tCourseSiteId和type寻找wkchapters
     *
     * @author 曹焕
     * @date 2018年11月23日
     **************************************************************************/
    @Override
    public List<WkChapterDto> findWkChaptersByTCourseSiteIdAndModuleType(Integer tCourseSiteId, Integer moduleType){
        List<WkChapterDto> voList = new ArrayList<WkChapterDto>();
        String sql = "select c from WkChapter c where c.TCourseSite.id = " + tCourseSiteId +
                " and c.type = " + moduleType;
        List<WkChapter> chapters = entityManager.createQuery(sql).getResultList();
        for(WkChapter wkChapter : chapters){
            WkChapterDto vo = new WkChapterDto();
            vo.setId(wkChapter.getId());
            vo.setName(wkChapter.getName());
            vo.setType(wkChapter.getType());
            //遍历wKlesson
            List<WkLessonDto> wkLessonDtos = new ArrayList<WkLessonDto>();
            for(WkLesson wkLesson : wkChapter.getWkLessons()){
                WkLessonDto dto = new WkLessonDto();
                dto.setId(wkLesson.getId());
                dto.setTitle(wkLesson.getTitle());

                wkLessonDtos.add(dto);
            }

            vo.setWkLessons(wkLessonDtos);

            voList.add(vo);
        }

        return voList;
    }
    /**************************************************************************
     * Description 根据tCourseSiteId寻找技能的chapters
     *
     * @author 曹焕
     * @date 2018年11月23日
     **************************************************************************/
    @Override
    public List<WkChapterDto> findWkChaptersByTExperimentSKillId(Integer tCourseSiteId){
        List<WkChapterDto> voList = new ArrayList<WkChapterDto>();
        List<TExperimentSkill> tExperimentSkills= tExperimentSkillJPA.findSkillListBySiteId(tCourseSiteId);
        for (TExperimentSkill t:tExperimentSkills) {
            WkChapter wkChapter = null;
            if (t.getChapterId()==0){
                wkChapter = wkLessonJPA.getOne(t.getLessonId()).getWkChapter();
            }else {
                wkChapter= wkChapterJPA.findOne(t.getChapterId());
            }
            WkChapterDto vo = new WkChapterDto();
            vo.setId(wkChapter.getId());
            vo.setName(wkChapter.getName());
            vo.setType(wkChapter.getType());
            voList.add(vo);
        }
        return  voList;
    }

    /**************************************************************************
     * @Description: 知识技能体验-ajax根据type和课程id获取章节
     * @Author: 罗璇
     * @Date: 2017/10/10 17:41
     **************************************************************************/
    @Override
    public Map<Integer, String> findChapterMapByModuleTypeAndSiteId(Integer tCourseSiteId, Integer moduleType) {
        Map<Integer, String> map = new HashMap<Integer, String>();
        if(moduleType==null){
            moduleType=1;
        }
        //根据type和课程id获取章节
        if(moduleType==1 || moduleType == 3) {
            String sql = "select c from WkChapter c where c.TCourseSite.id = " + tCourseSiteId +
                    " and c.type = " + moduleType;
            List<WkChapter> chapters = entityManager.createQuery(sql).getResultList();
            //获取章节id和名称
            for (WkChapter c : chapters) {
                map.put(c.getId(), c.getName());
            }
        }else{
            List<WkChapterDto> wkChapterDtoList=this.findWkChaptersByTExperimentSKillId(tCourseSiteId);
            for (WkChapterDto w:wkChapterDtoList) {
                map.put(w.getId(),w.getName());
            }
        }
        return map;
    }

    /**************************************************************************
     * @Description: 知识技能体验-ajax根据章节id和获取课时列表map
     * @Author: 罗璇
     * @Date: 2017/10/10 17:54
     **************************************************************************/
    @Override
    public Map<Integer, String> findLessonMapByChapterId(Integer chapterId) {
        Map<Integer, String> map = new HashMap<Integer, String>();
        //获取章节对应课时
        String sql = "select c from WkLesson c where c.wkChapter.id = " + chapterId;
        List<WkLesson> lessons = entityManager.createQuery(sql).getResultList();
        //获取所有对应课时的id和题目
        for(WkLesson c:lessons){
            map.put(c.getId(), c.getTitle());
        }
        return map;
    }

    /**************************************************************************
     * Description 查找学院列表
     *
     * @author 洪春莹
     * @date 2018年10月30日
     **************************************************************************/
    @Override
    public List<SchoolAcademyVo> findAllAcademys() {
        List<SchoolAcademyVo> schoolAcademyVoList = new ArrayList<>();
        List<SchoolAcademy> schoolAcademyList = schoolAcademyJPA.findAll();
        for(SchoolAcademy a:schoolAcademyList){
            if(a.getIsVaild()!=0){
                SchoolAcademyVo schoolAcademyVo = new SchoolAcademyVo();
                schoolAcademyVo.setAcademyNumber(a.getAcademyNumber());
                schoolAcademyVo.setAcademyName(a.getAcademyName());
                schoolAcademyVoList.add(schoolAcademyVo);
            }
        }
        return schoolAcademyVoList;
    }
    /**************************************************************************
     * Description 查找学院列表(有可以考试班级的学院)
     *
     * @author 刘博越
     * @date 2019年3月21日
     **************************************************************************/
    @Override
    public List<SchoolAcademyVo> findAllExamAcademys() {
        List<SchoolAcademyVo> schoolAcademyVoList = new ArrayList<>();
        List<SchoolAcademy> schoolAcademyList = schoolAcademyJPA.findAll();
        for(SchoolAcademy a:schoolAcademyList){
            if(a.getIsVaild()!=0){
                //List<SchoolClassesVo> schoolClassesVos = this.findAllClassesByAcademyNumber(a.getAcademyNumber());
                List<SchoolClass> schoolClassList = schoolClassesJPA.findAllClassesByAcademyNumber(a.getAcademyNumber());
                if(schoolClassList.size()!=0){
                    SchoolAcademyVo schoolAcademyVo = new SchoolAcademyVo();
                    schoolAcademyVo.setAcademyNumber(a.getAcademyNumber());
                    schoolAcademyVo.setAcademyName(a.getAcademyName());
                    schoolAcademyVoList.add(schoolAcademyVo);
                }
            }
        }
        return schoolAcademyVoList;
    }

    /**************************************************************************
     * Description 根据学院查找班级
     *
     * @author 洪春莹
     * @date 2018年12月06日
     **************************************************************************/
    @Override
    public List<SchoolClassesVo> findAllClassesByAcademyNumber(String schoolAcademy){
        List<SchoolClassesVo> schoolClassesVoList = new ArrayList<>();
        List<SchoolClass> schoolClassList = schoolClassesJPA.findAllClassesByAcademyNumber(schoolAcademy);
        //取近五年的班级
        Calendar date = Calendar.getInstance();
        int year =date.get(Calendar.YEAR);
        for(SchoolClass a:schoolClassList){
            if(a.getClassGrade()!=null && a.getClassGrade().length()>=4 && Integer.parseInt(a.getClassGrade().substring(0,4))+ 5 >= year){
                SchoolClassesVo schoolClassesVo = new SchoolClassesVo();
                schoolClassesVo.setClassNumber(a.getClassNumber());
                schoolClassesVo.setClassName(a.getClassName());
                schoolClassesVoList.add(schoolClassesVo);
            }
        }
        return schoolClassesVoList;

    }

    /**************************************************************************
     * Description 根据题库动态获取填空题空的个数以及对应的题数
     *
     * @author 洪春莹
     * @date 2019年01月07日
     **************************************************************************/
    @Override
    public List<GapsNumberVo> findGapsNumberByQuestionpool(Integer questionpoolId){
        List<GapsNumberVo> gapsNumberVoList = new ArrayList<>();
        //通过题库id查询本题库所对应的所有试题
        TAssignmentQuestionpool tAssignmentQuestionpool = tAssignmentQuestionpoolJPA.findOne(questionpoolId);
        String ids = "";
        for (TAssignmentItem tAssignmentItem : tAssignmentQuestionpool.getTAssignmentItems()) {
            ids += "'"+tAssignmentItem.getId()+"',";
        }
        if(!ids.equals("")){
            ids= ids.substring(0, ids.length()-1);
        }else {
            ids="''";
        }
        String sql = "SELECT gaps_number,count(gaps_number) FROM `t_assignment_item` where id in ("+ids+") AND type=8 GROUP BY gaps_number HAVING COUNT(gaps_number)>=1 ORDER BY gaps_number";
        Query query = entityManager.createNativeQuery(sql);
        List<Object[]> rseult = new ArrayList<>(query.getResultList());
        for(Object[] object : rseult){
            GapsNumberVo gapsNumberVo = new GapsNumberVo();
            gapsNumberVo.setGapsNumber(Integer.parseInt(object[0].toString()));
            gapsNumberVo.setAllgaps(Integer.parseInt(object[1].toString()));
            gapsNumberVoList.add(gapsNumberVo);
        }
        return gapsNumberVoList;

    }


}
