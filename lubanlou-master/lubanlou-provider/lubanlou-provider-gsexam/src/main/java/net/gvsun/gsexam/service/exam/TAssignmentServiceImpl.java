package net.gvsun.gsexam.service.exam;

import com.easycache.annotation.Cache;
import net.gvsun.datasource.ClientDatabaseContext;
import net.gvsun.feign.TranscriptFeign;
import net.gvsun.gsexam.domain.*;
import net.gvsun.gsexam.dto.common.SchoolClassesVo;
import net.gvsun.gsexam.dto.common.TAssignmentVo;
import net.gvsun.gsexam.dto.common.UserVo;
import net.gvsun.gsexam.dto.exam.CopyExamDTO;
import net.gvsun.gsexam.dto.exam.CopyItemComponentDTO;
import net.gvsun.gsexam.jpa.*;
import net.gvsun.gsexam.service.common.ShareService;
import net.gvsun.gsexam.utils.EmptyUtil;
import net.gvsun.gsexam.utils.QRCodeUtil;
import net.gvsun.gsexam.vo.exam.EditExamTAssignmentComponentVo;
import net.gvsun.gsexam.vo.exam.EditTestVo;
import net.gvsun.gsexam.vo.exam.TCourseSiteVo;
import net.gvsun.gsexam.vo.exam.ViewExamVo;
import net.gvsun.resource.dto.ResourceFileDto;
import net.gvsun.resource.service.ResourceContainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.util.ResourceUtils;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.*;

@Service("tAssignmentService")
public class TAssignmentServiceImpl implements TAssignmentService {

    @Autowired
    private TAssignmentJPA tAssignmentJPA;
    @Autowired
    private SchoolClassesJPA schoolClassesJPA;
    @Autowired
    private TAssignmentClassJPA tAssignmentClassJPA;
    @Autowired
    private TAssignmentSectionJPA tAssignmentSectionJPA;
    @Autowired
    private TAssignmentItemJPA tAssignmentItemJPA;
    @Autowired
    private ShareService shareService;
    @Autowired
    private WkChapterService wkChapterService;
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private UserJPA userJPA;
    @Autowired
    private WkFolderJPA wkFolderJPA;
    @Autowired
    private TCourseSiteUserJPA tCourseSiteUserJPA;
    @Autowired
    private TAssignmentGradingJPA tAssignmentGradingJPA;
    @Autowired
    private TAssignmentItemMappingJPA tAssignmentItemMappingJPA;
    @Autowired
    private TAssignmentControlJPA tAssignmentControlJPA;
    @Autowired
    private TAssignmentAnswerAssignJPA tAssignmentAnswerAssignJPA;
    @Autowired
    private TAssignmentQuestionpoolJPA tAssignmentQuestionpoolJPA;
    @Autowired
    private TAssignmentItemComponentJPA tAssignmentItemComponentJPA;
    @Autowired
    private TCourseSiteJPA tCourseSiteJPA;
    @Autowired
    private TGradebookJPA tGradebookJPA;
    @Autowired
    private TGradeObjectJPA tGradeObjectJPA;
    @Autowired
    private SchoolAcademyJPA schoolAcademyJPA;
    @Autowired
    private ExamQuestionpoolJPA examQuestionpoolJPA;
    @Autowired
    private TExperimentSkillJPA tExperimentSkillJPA;
    @Autowired
    private QuestionPoolCategoryJPA questionPoolCategoryJPA;
    @Autowired
    private ResourceContainerService resourceContainerService;
    @Autowired
    private ExamListService examListService;
    @Autowired
    private WkChapterJPA wkChapterJPA;
    @Autowired
    private WkLessonJPA wkLessonJPA;
    @Autowired
    private ClientDatabaseContext clientDatabaseContext;
    @Autowired
    private TranscriptFeign transcriptInterface;

    /**************************************************************************
     * Description 查看考试内容列表
     *
     * @author 魏诚
     * @date 2017-08-01
     **************************************************************************/
    @Override
    public TAssignmentVo findExamList(HttpServletRequest request, UserVo user, TAssignmentVo exam) {
        //学生身份
        /*if(!"TEACHER".equals(request.getSession().getAttribute("AUTHORITYNAME"))&&exam.getUser().getUsername().equals(user.getUsername())) {
            String sql = "from TAssignment c where c.testParentId = '"+exam.getId()+"' and c.user.username = '"+user.getUsername()+"'";
            List<TAssignment> tAssignments = entityManager.createQuery(sql).getResultList();
            if (tAssignments.size()>0) {//如果已经存在则查询
                exam = tAssignments.get(0);
            }else{
                exam.setUser(user);
                exam.setTestParentId(exam.getId());
                exam.setCreatedTime(new Date());
                exam = tAssignmentJPA.save(exam);
            }
        }*/
        return exam;
    }

    /**************************************************************************
     * Description 根据id查找考试试题构成情况页面Vo
     *
     * @author 罗璇
     * @date 2017-09-01
     **************************************************************************/
    @Override
    public List<EditExamTAssignmentComponentVo> findTAssCompVoList(Integer assignmentId) {
        //创建页面Vo容器对象集合
        List<EditExamTAssignmentComponentVo> voList = new ArrayList<EditExamTAssignmentComponentVo>();
        if (assignmentId != null) {
            //查找考试
            TAssignment tAssignment = tAssignmentJPA.findOne(assignmentId);
            if (tAssignment != null) {
                //遍历试题构成表，并写入vo
                for (TAssignmentItemComponent tAssignmentItemComponent : tAssignment.getTAssignmentItemComponents()) {
                    EditExamTAssignmentComponentVo vo = new EditExamTAssignmentComponentVo();
                    vo.setSectionName(tAssignmentItemComponent.getSectionName());
                    vo.setQuestionpoolId(tAssignmentItemComponent.getTAssignmentQuestionpool().getQuestionpoolId());
                    vo.setTitle(tAssignmentItemComponent.getTAssignmentQuestionpool().getTitle());
                    vo.setItemQuantity(tAssignmentItemComponent.getItemQuantity());
                    vo.setItemScore(tAssignmentItemComponent.getItemScore());
                    vo.setItemType(tAssignmentItemComponent.getItemType());
                    vo.setItemGapnumber(tAssignmentItemComponent.getItemGapnumber());

                    voList.add(vo);
                }
            }

        }

        return voList;
    }

    /**************************************************************************
     * @Description: 保存考试返回考试ID
     * @Author: 罗璇
     * @Date: 2017/10/8 19:41
     * @author 陈敬（修改）2018年12月17日
     **************************************************************************/
    @Transactional
    @Override
    public Integer saveTest(EditTestVo editTestVo, String username, Integer tCourseSiteId, String projectName) {
        TCourseSiteVo tCourseSiteVo = examListService.findCourseSiteById(tCourseSiteId);
        //查找当前用户
        User user = userJPA.findOne(username);
        TAssignment rsTAssignment = null;
        if (editTestVo.gettAssignmentId() == null) {//新建考试
            TAssignment tAssignment = new TAssignment();
            //保存一部分数据
            tAssignment.setTitle(editTestVo.gettAssignmentTitle());
            tAssignment.setNeedSubmit(editTestVo.getNeedSubmit());
            tAssignment.setMins(editTestVo.getMins());
            tAssignment.setContent(editTestVo.getContent());
            tAssignment.setType(editTestVo.getType());
            tAssignment.setEffectiveDays(editTestVo.getEffectiveDays());
            tAssignment.setEvaluation(editTestVo.getEvaluation());
            tAssignment.setKeyword(editTestVo.getKeyword());
            tAssignment.setConclusion(editTestVo.getConclusion());
            //学院
            tAssignment.setSchoolAcademy(editTestVo.getSchoolAcademy());
            tAssignment.setIsMakeUpExam(editTestVo.getIsMakeUpExam());
            //补考原考试id
            tAssignment.setOldAssignmentId(editTestVo.getOldAssignmentId());
            tAssignment.setSiteId(editTestVo.getSiteId());
            tAssignment.setStatus(editTestVo.getStatus());
            tAssignment.setCreatedTime(editTestVo.getCreatedTime());
            tAssignment.setUser(user);
            tAssignment.setSubScribeExamId(editTestVo.getSubScribeExamId());
            //先保存考试所属文件夹
            WkFolder wkFolder = new WkFolder();
            wkFolder.setName(editTestVo.gettAssignmentTitle());
            wkFolder.setType(6);
            wkFolder.setUser(user);
            wkFolder.setCreateTime(editTestVo.getCreatedTime());
            if (!tCourseSiteVo.getTitle().equals("全校考试") && editTestVo.getIsMakeUpExam().equals("0")) {
                if (editTestVo.getTestWkLessonId() != null) {
                    WkLesson wkLesson = new WkLesson();
                    wkLesson.setId(editTestVo.getTestWkLessonId());
                    wkFolder.setWkLesson(wkLesson);
                } else {
                    WkChapter wkChapter = new WkChapter();
                    //补考读取原考试
                    wkChapter.setType(editTestVo.getTestChapterType());
                    wkChapter.setId(editTestVo.getTestWkChapterId());
                    wkFolder.setWkChapter(wkChapter);
                }
            } else if (!tCourseSiteVo.getTitle().equals("全校考试") && editTestVo.getIsMakeUpExam().equals("1")) {
                TAssignment oldTA = tAssignmentJPA.findOne(editTestVo.getOldAssignmentId());
                wkFolder.setWkChapter(oldTA.getWkFolder().getWkChapter());
            }
            //保存文件夹
            wkFolder = wkFolderJPA.save(wkFolder);
            /*
             * 保存TAssignment需先保存一对一子表，然后设置为空，保存，然后再重新设置一对一子表，再保存。
             */
            //保存所属文件夹
            tAssignment.setWkFolder(wkFolder);
            //记录考试的控制表
            TAssignmentControl tAssignmentControl = new TAssignmentControl();
            //记录考试的设置表
            TAssignmentAnswerAssign tAssignmentAnswerAssign = new TAssignmentAnswerAssign();

            tAssignment.setTAssignmentControl(null);
            tAssignment.setTAssignmentAnswerAssign(null);

            tAssignment = tAssignmentJPA.save(tAssignment);
            if (tAssignment.getNeedSubmit() == 0) {//考试不需要提交
                List<TCourseSiteUser> users = tCourseSiteUserJPA.getTCourseSiteUsersByTCourseSiteIdAndRole(tCourseSiteId);
                for (TCourseSiteUser u : users) {
                    TAssignment test = new TAssignment();
                    test.setUser(u.getUser());
                    test.setTestParentId(tAssignment.getId());
                    test.setStatus(1);
                    test = tAssignmentJPA.save(test);

                    TAssignmentGrading grading = new TAssignmentGrading();
                    grading.setUserByStudent(u.getUser());
                    grading.setTAssignment(tAssignment);
                    grading.setTestId(test.getId());
                    grading.setFinalScore(0.0);
                    grading.setSubmitTime(1);
                    grading = tAssignmentGradingJPA.save(grading);

                }
            }

            //保存考试控制表
            tAssignmentControl.setTimelimit(editTestVo.getTimelimitOneTest());
            tAssignmentControl.setToGradebook(editTestVo.getToGradebook());
            tAssignmentControl.setGradeToStudent(editTestVo.getGradeToStudent());
            tAssignmentControl.setGradeToTotalGrade(editTestVo.getGradeToTotalGrade());
            tAssignmentControl.setAnswerToStudent(editTestVo.getAnswerToStudent());
            tAssignmentControl.setTestFrom(editTestVo.getTestFrom());
            tAssignmentControl.setStartdate(editTestVo.getStartdateTest());
            tAssignmentControl.setDuedate(editTestVo.getDuedateTest());
            tAssignmentControl.setTAssignment(tAssignment);
            tAssignmentControl = tAssignmentControlJPA.save(tAssignmentControl);

            //保存考试的设置表
            tAssignmentAnswerAssign.setUser(user);
            tAssignmentAnswerAssign.setScore(editTestVo.getTestScoreTest()==null?100:editTestVo.getTestScoreTest());
            tAssignmentAnswerAssign.setPassingScore(editTestVo.getPassingScore());
            tAssignmentAnswerAssign.setTAssignment(tAssignment);
            tAssignmentAnswerAssign = tAssignmentAnswerAssignJPA.save(tAssignmentAnswerAssign);

            //将考试设置和控制保存到考试
            tAssignment.setTAssignmentControl(tAssignmentControl);
            tAssignment.setTAssignmentAnswerAssign(tAssignmentAnswerAssign);
            tAssignment.setSequence(tAssignment.getId());//给考试排序，初始值和id保持一致
            tAssignment = tAssignmentJPA.save(tAssignment);

            //保存试卷题目构成
            Set<TAssignmentQuestionpool> tAssignmentQuestionpools = new HashSet<TAssignmentQuestionpool>();
            if (editTestVo.getTestFrom().equals("question")) {//若试题来源是题库
                if (editTestVo.getQuestionIds() != null && editTestVo.getQuestionIds().length != 0) {
                    for (String questionId : editTestVo.getQuestionIds()) {
                        tAssignmentQuestionpools.add(tAssignmentQuestionpoolJPA.findOne(Integer.valueOf(questionId)));
                    }
                    tAssignment.setTAssignmentQuestionpools(tAssignmentQuestionpools);
                    tAssignment = tAssignmentJPA.save(tAssignment);
                }

                if (editTestVo.getItemScores() != null && editTestVo.getItemScores().length != 0) {
                    Set<TAssignmentItemComponent> comSet = new HashSet<TAssignmentItemComponent>();
                    TAssignmentItemComponent tAssignmentItemComponent = null;
                    int j = 0;
                    for (int i = 0; i < editTestVo.getItemScores().length; i++) {
                        tAssignmentItemComponent = new TAssignmentItemComponent();
                        tAssignmentItemComponent.setSectionName(editTestVo.getSectionNames()[i]);
                        tAssignmentItemComponent.setItemType(Integer.valueOf(editTestVo.getItemTypes()[i]));
                        tAssignmentItemComponent.setItemQuantity(Integer.valueOf(editTestVo.getItemQuantitys()[i]));
                        tAssignmentItemComponent.setTAssignmentQuestionpool(tAssignmentQuestionpoolJPA.findOne(Integer.valueOf(editTestVo.getQuestionIds()[i])));
                        tAssignmentItemComponent.setItemScore(Double.valueOf(editTestVo.getItemScores()[i]));
                        tAssignmentItemComponent.setTAssignment(tAssignment);
                        if (tAssignmentItemComponent.getItemType() == 8) {
                            tAssignmentItemComponent.setItemGapnumber(Integer.valueOf(editTestVo.getGapsNumbers()[j]));
                            j++;
                        }
                        TAssignmentItemComponent component = tAssignmentItemComponentJPA.save(tAssignmentItemComponent);
                        comSet.add(component);
                    }
                    tAssignment.setTAssignmentItemComponents(comSet);
                    tAssignment = tAssignmentJPA.save(tAssignment);
                }
            } else if (editTestVo.getTestFrom().equals("testpool")) {//若试题来源是试卷库
                if (editTestVo.getExamQuestionpoolId() != null && editTestVo.getExamQuestionpoolId().toString().length() != 0) {
                    Integer examQuestionpoolId = Integer.valueOf(editTestVo.getExamQuestionpoolId());
                    ExamQuestionpool examQuestionpool = examQuestionpoolJPA.findOne(examQuestionpoolId);
                    if (examQuestionpool.getType() != 1) {
                        tAssignment.setExamQuestionpool(examQuestionpool);
                        tAssignment = tAssignmentJPA.save(tAssignment);
                    } else if (examQuestionpool.getType() == 1) {//自动组卷同题库一个逻辑
                        tAssignment.setExamQuestionpool(examQuestionpool);
                        Set<TAssignmentItemComponent> comSet = new HashSet<TAssignmentItemComponent>();
                        for (ExamSection examSection : examQuestionpool.getExamSections()) {
                            tAssignmentQuestionpools.add(tAssignmentQuestionpoolJPA.findOne(examSection.getItemQuestionpoolId()));

                            TAssignmentItemComponent tAssignmentItemComponent = null;
                            tAssignmentItemComponent = new TAssignmentItemComponent();
                            tAssignmentItemComponent.setSectionName(examSection.getName());
                            tAssignmentItemComponent.setItemType(examSection.getItemType());
                            tAssignmentItemComponent.setItemQuantity(examSection.getItemCount());
                            tAssignmentItemComponent.setTAssignmentQuestionpool(tAssignmentQuestionpoolJPA.findOne(examSection.getItemQuestionpoolId()));
                            tAssignmentItemComponent.setItemScore(examSection.getItemScore());
                            tAssignmentItemComponent.setTAssignment(tAssignment);
//                            if (tAssignmentItemComponent.getItemType() == 8) {
//                                tAssignmentItemComponent.setItemGapnumber(Integer.valueOf(editTestVo.getGapsNumbers()[j]));
//                                j++;
//                            }
                            TAssignmentItemComponent component = tAssignmentItemComponentJPA.save(tAssignmentItemComponent);
                            comSet.add(component);

                        }
                        tAssignment.setTAssignmentQuestionpools(tAssignmentQuestionpools);
                        tAssignment.setTAssignmentItemComponents(comSet);
                        tAssignment = tAssignmentJPA.save(tAssignment);
                    }
                }
            }
            rsTAssignment = tAssignment;
        } else {//修改考试
            TAssignment oldTAssignment = tAssignmentJPA.findOne(editTestVo.gettAssignmentId());
            //先保存考试所属文件夹
            WkFolder wkFolder = oldTAssignment.getWkFolder();
            wkFolder.setName(editTestVo.gettAssignmentTitle());
            wkFolder.setUser(user);
            wkFolder.setUpdateTime(new Date());
            if (!tCourseSiteVo.getTitle().equals("全校考试") && editTestVo.getIsMakeUpExam().equals("0")) {
                if (editTestVo.getTestWkLessonId() != null) {
                    WkLesson wkLesson = new WkLesson();
                    wkLesson.setId(editTestVo.getTestWkLessonId());
                    wkFolder.setWkLesson(wkLesson);
                    wkFolder.setWkChapter(null);
                } else {
                    WkChapter wkChapter = new WkChapter();
                    wkChapter.setType(editTestVo.getTestChapterType());
                    wkChapter.setId(editTestVo.getTestWkChapterId());
                    wkFolder.setWkChapter(wkChapter);
                    wkFolder.setWkLesson(null);
                }
            } else if (!tCourseSiteVo.getTitle().equals("全校考试") && editTestVo.getIsMakeUpExam().equals("1")) {
                TAssignment oldTA = tAssignmentJPA.findOne(editTestVo.getOldAssignmentId());
                wkFolder.setWkChapter(oldTA.getWkFolder().getWkChapter());
            }
            //保存文件夹
            wkFolder = wkFolderJPA.save(wkFolder);
            oldTAssignment.setWkFolder(wkFolder);
            oldTAssignment = tAssignmentJPA.save(oldTAssignment);

            oldTAssignment.setTitle(editTestVo.gettAssignmentTitle());
            oldTAssignment.setMins(editTestVo.getMins());
            oldTAssignment.setContent(editTestVo.getContent());
            oldTAssignment.setStatus(editTestVo.getStatus());
            oldTAssignment.setNeedSubmit(editTestVo.getNeedSubmit());
            oldTAssignment.setEffectiveDays(editTestVo.getEffectiveDays());
            oldTAssignment.setEvaluation(editTestVo.getEvaluation());
            oldTAssignment.setKeyword(editTestVo.getKeyword());
            oldTAssignment.setConclusion(editTestVo.getConclusion());
            //学院
            oldTAssignment.setSchoolAcademy(editTestVo.getSchoolAcademy());

            //考试控制表
            TAssignmentControl oldTAssignmentControl = oldTAssignment.getTAssignmentControl();

            oldTAssignmentControl.setStartdate(editTestVo.getStartdateTest());
            oldTAssignmentControl.setDuedate(editTestVo.getDuedateTest());
            oldTAssignmentControl.setGradeToStudent(editTestVo.getGradeToStudent());
            oldTAssignmentControl.setGradeToTotalGrade(editTestVo.getGradeToTotalGrade());
            oldTAssignmentControl.setToGradebook(editTestVo.getToGradebook());
            oldTAssignmentControl.setAnswerToStudent(editTestVo.getAnswerToStudent());
            oldTAssignmentControl.setTestFrom(editTestVo.getTestFrom());
            oldTAssignmentControl.setTimelimit(editTestVo.getTimelimitOneTest());
            oldTAssignmentControl.setTAssignment(oldTAssignment);
            oldTAssignmentControl = tAssignmentControlJPA.save(oldTAssignmentControl);
            oldTAssignment.setTAssignmentControl(oldTAssignmentControl);

            //考试设置表
            TAssignmentAnswerAssign oldTAssignmentAnswerAssign = oldTAssignment.getTAssignmentAnswerAssign();
            oldTAssignmentAnswerAssign.setScore(editTestVo.getTestScoreTest()==null?100:editTestVo.getTestScoreTest());
            oldTAssignmentAnswerAssign.setPassingScore(editTestVo.getPassingScore());
            oldTAssignmentAnswerAssign.setUser(user);
            oldTAssignmentAnswerAssign.setTAssignment(oldTAssignment);
            oldTAssignmentAnswerAssign = tAssignmentAnswerAssignJPA.save(oldTAssignmentAnswerAssign);
            oldTAssignment.setTAssignmentAnswerAssign(oldTAssignmentAnswerAssign);

            oldTAssignment = tAssignmentJPA.save(oldTAssignment);

            //解除试卷原有题型设置
            for (TAssignmentItemComponent tAssignmentItemComponent : oldTAssignment.getTAssignmentItemComponents()) {
                tAssignmentItemComponentJPA.delete(tAssignmentItemComponent);
            }
            oldTAssignment.setTAssignmentItemComponents(new HashSet<TAssignmentItemComponent>());
            oldTAssignment = tAssignmentJPA.save(oldTAssignment);
            Set<TAssignmentQuestionpool> tAssignmentQuestionpools = new HashSet<TAssignmentQuestionpool>();

            //解除试卷与已有题库的关联
            oldTAssignment.setTAssignmentQuestionpools(tAssignmentQuestionpools);
            //解除试卷与已有试卷库的关联
            oldTAssignment.setExamQuestionpool(null);

            oldTAssignment = tAssignmentJPA.save(oldTAssignment);

            if (editTestVo.getTestFrom().equals("question")) {//若试题来源是题库
                if (editTestVo.getQuestionIds() != null && editTestVo.getQuestionIds().length != 0) {
                    for (String questionId : editTestVo.getQuestionIds()) {
                        tAssignmentQuestionpools.add(tAssignmentQuestionpoolJPA.findOne(Integer.valueOf(questionId)));
                    }
                    oldTAssignment.setTAssignmentQuestionpools(tAssignmentQuestionpools);
                    oldTAssignment = tAssignmentJPA.save(oldTAssignment);
                }

                if (editTestVo.getItemScores() != null && editTestVo.getItemScores().length != 0) {
                    Set<TAssignmentItemComponent> comSet = new HashSet<TAssignmentItemComponent>();
                    for (int i = 0; i < editTestVo.getItemScores().length; i++) {
                        TAssignmentItemComponent tAssignmentItemComponent = new TAssignmentItemComponent();
                        tAssignmentItemComponent.setSectionName(editTestVo.getSectionNames()[i]);
                        tAssignmentItemComponent.setItemType(Integer.valueOf(editTestVo.getItemTypes()[i]));
                        tAssignmentItemComponent.setItemQuantity(Integer.valueOf(editTestVo.getItemQuantitys()[i]));
                        tAssignmentItemComponent.setTAssignmentQuestionpool(tAssignmentQuestionpoolJPA.findOne(Integer.valueOf(editTestVo.getQuestionIds()[i])));
                        tAssignmentItemComponent.setItemScore(Double.valueOf(editTestVo.getItemScores()[i]));
                        tAssignmentItemComponent.setTAssignment(oldTAssignment);
                        TAssignmentItemComponent component = tAssignmentItemComponentJPA.save(tAssignmentItemComponent);
                        comSet.add(component);
                    }
                    oldTAssignment.setTAssignmentItemComponents(comSet);
                    oldTAssignment = tAssignmentJPA.save(oldTAssignment);
                }
            } else if (editTestVo.getTestFrom().equals("testpool")) {//若试题来源是试卷库
                if (editTestVo.getExamQuestionpoolId() != null && editTestVo.getExamQuestionpoolId().toString().length() != 0) {
                    Integer examQuestionpoolId = Integer.valueOf(editTestVo.getExamQuestionpoolId());
                    ExamQuestionpool examQuestionpool = examQuestionpoolJPA.findOne(examQuestionpoolId);
                    if (examQuestionpool.getType() != 1) {
                        oldTAssignment.setExamQuestionpool(examQuestionpool);
                        oldTAssignment = tAssignmentJPA.save(oldTAssignment);
                    } else if (examQuestionpool.getType() == 1) {//自动组卷同题库一个逻辑
                        //修改时先删除
                        for (TAssignmentItemComponent deleteItem : oldTAssignment.getTAssignmentItemComponents()) {
                            deleteItem.setTAssignment(null);
                            tAssignmentItemComponentJPA.delete(deleteItem);
                        }
                        oldTAssignment.setExamQuestionpool(examQuestionpool);
                        oldTAssignment.setTAssignmentQuestionpools(null);
                        oldTAssignment.setTAssignmentItemComponents(null);
                        oldTAssignment = tAssignmentJPA.save(oldTAssignment);

                        Set<TAssignmentItemComponent> comSet = new HashSet<TAssignmentItemComponent>();
                        for (ExamSection examSection : examQuestionpool.getExamSections()) {
                            tAssignmentQuestionpools.add(tAssignmentQuestionpoolJPA.findOne(examSection.getItemQuestionpoolId()));

                            TAssignmentItemComponent tAssignmentItemComponent = null;
                            tAssignmentItemComponent = new TAssignmentItemComponent();
                            tAssignmentItemComponent.setSectionName(examSection.getName());
                            tAssignmentItemComponent.setItemType(examSection.getItemType());
                            tAssignmentItemComponent.setItemQuantity(examSection.getItemCount());
                            tAssignmentItemComponent.setTAssignmentQuestionpool(tAssignmentQuestionpoolJPA.findOne(examSection.getItemQuestionpoolId()));
                            tAssignmentItemComponent.setItemScore(examSection.getItemScore());
                            tAssignmentItemComponent.setTAssignment(oldTAssignment);
//                            if (tAssignmentItemComponent.getItemType() == 8) {
//                                tAssignmentItemComponent.setItemGapnumber(Integer.valueOf(editTestVo.getGapsNumbers()[j]));
//                                j++;
//                            }
                            TAssignmentItemComponent component = tAssignmentItemComponentJPA.save(tAssignmentItemComponent);
                            comSet.add(component);

                        }
                        oldTAssignment.setTAssignmentQuestionpools(tAssignmentQuestionpools);
                        oldTAssignment.setTAssignmentItemComponents(comSet);
                        oldTAssignment = tAssignmentJPA.save(oldTAssignment);
                    }
                }
            }
            rsTAssignment = oldTAssignment;
        }
        tAssignmentJPA.flush();
        return rsTAssignment.getId();
    }

    /**************************************************************************
     * @Description: 根据作业测验或考试创建成绩册及成绩单
     * @Author: 罗璇
     * @Date: 2017/10/10 15:58
     **************************************************************************/
    @Transactional
    @Override
    public void createGradebook(Integer tCourseSiteId, Integer tAssignmentId, Integer chapterType, Integer chapterId) {
        String module = "";
        chapterType = (chapterType == null ? 1 : chapterType);
        //保存module
        if (chapterType != null) {
            if (chapterType == 1) {
                module = "knowledge";
            } else if (chapterType == 2 || chapterType == 200) {
                module = "skill";
            } else if (chapterType == 3) {
                module = "experience";
            }
        }
        TAssignment tAssignment = tAssignmentJPA.findOne(tAssignmentId);
        //查询作业（或测验）的控制项
        TAssignmentControl tAssignmentControl = tAssignment.getTAssignmentControl();
        //如果成绩需要加入成绩册，则创建成绩册
        if ("yes".equals(tAssignmentControl.getToGradebook())) {
            if (chapterType == 200) {
                TExperimentSkill tExperimentSkill = tExperimentSkillJPA.findTExperimentSkillByChapterId(chapterId);
            }
            //获取站点信息
            TCourseSite tCourseSite = tCourseSiteJPA.findOne(tCourseSiteId);
            if (chapterType == 200) {
                TExperimentSkill tExperimentSkill = tExperimentSkillJPA.findTExperimentSkillByChapterId(chapterId);
                transcriptInterface.createGradeBook(tCourseSiteId,tCourseSite.getTitle(),tAssignmentId.toString(),tAssignment.getTitle(),tAssignment.getType(),1.0,module,tExperimentSkill.getId(),tExperimentSkill.getExperimentName(),null,null,null,null,1);

            }else {
                transcriptInterface.createGradeBook(tCourseSiteId,tCourseSite.getTitle(),tAssignmentId.toString(),tAssignment.getTitle(),tAssignment.getType(),1.0,module,null,null,null,null,null,null,1);
            }
        }
    }

    /**************************************************************************
     * Description 保存考试对应的班级到考试班级关系表
     * @author 洪春莹
     * @date 2018-12-11
     **************************************************************************/
    @Transactional
    @Override
    public void saveTAssignmentClass(Integer tAssignmentId, String[] schoolClasses) {
        int a = schoolClasses.length;
        //删除之前的数据
        List<TAssignmentClass> tAssignmentClasses = tAssignmentClassJPA.findAssignmentClassById(tAssignmentId);
        tAssignmentClassJPA.deleteAll(tAssignmentClasses);
        if (a > 0) {

            //获取选中的班级
            List<SchoolClass> schoolClassList = schoolClassesJPA.findClassByClassNumber(schoolClasses);
            for (int i = 0; i < a; i++) {
                TAssignmentClass tAssignmentClass = tAssignmentClassJPA.findAssignmentClassByIdAndNumber(tAssignmentId, schoolClasses[i]);
                if (tAssignmentClass == null) {
                    for (SchoolClass schoolClass : schoolClassList) {
                        //获取到的班级保存到t_assignment_class表里
                        TAssignmentClass tAssignmentClass1 = new TAssignmentClass();
                        //保存考试
                        tAssignmentClass1.settAssignment(tAssignmentJPA.findOne(tAssignmentId));
                        //保存班级
                        tAssignmentClass1.setSchoolClass(schoolClass);
                        tAssignmentClassJPA.save(tAssignmentClass1);
                    }
                }

            }
        }
    }

    /**************************************************************************
     * Description 保存考试对应的学院到考试学院关系表（和考试班级关系表共用）
     * @author 洪春莹
     * @date 2019-4-23
     **************************************************************************/
    @Override
    public void saveTAssignmentAcademy(Integer tAssignmentId, String[] schoolAcademy) {
        int a = 0;
        if (schoolAcademy != null) {
            a = schoolAcademy.length;
        }
        //删除之前的数据
        List<TAssignmentClass> tAssignmentClasses = tAssignmentClassJPA.findAssignmentClassById(tAssignmentId);
        tAssignmentClassJPA.deleteAll(tAssignmentClasses);
        //获取选中的学院
        List<SchoolAcademy> schoolAcademyList = schoolAcademyJPA.findAcademyByAcademyNumber(schoolAcademy);
        for (int i = 0; i < a; i++) {
            TAssignmentClass tAssignmentClass = tAssignmentClassJPA.findAssignmentClassByIdAndAcademy(tAssignmentId, schoolAcademy[i]);
            if (tAssignmentClass == null) {
                for (SchoolAcademy schoolAcademy1 : schoolAcademyList) {
                    //获取到的学院保存到t_assignment_class表里
                    TAssignmentClass tAssignmentClass1 = new TAssignmentClass();
                    //保存考试
                    tAssignmentClass1.settAssignment(tAssignmentJPA.findOne(tAssignmentId));
                    //保存班级
                    tAssignmentClass1.setSchoolAcademy(schoolAcademy1);
                    tAssignmentClassJPA.save(tAssignmentClass1);
                }
            }

        }
    }

    /**************************************************************************
     * Description 查找编辑考试内容
     * @Author 张佳鸣
     * @Date 2017-12-18
     **************************************************************************/
    @Override
    public EditTestVo findEditTestVoById(Integer tAssignmentId, String projectName) {
        //创建页面Vo容器对象
        EditTestVo editTestVo = new EditTestVo();
        //查找考试
        TAssignment tAssignment = tAssignmentJPA.findOne(tAssignmentId);
        if (tAssignment != null) {
            //tAssignment数据写入vo
            editTestVo.settAssignmentId(tAssignmentId);
            editTestVo.setContent(tAssignment.getContent());
            editTestVo.settAssignmentTitle(tAssignment.getTitle());
            editTestVo.setStatus(tAssignment.getStatus());
            editTestVo.setSchoolAcademy(tAssignment.getSchoolAcademy());
            editTestVo.setEffectiveDays(tAssignment.getEffectiveDays()==null?0:tAssignment.getEffectiveDays());
            editTestVo.setEvaluation(tAssignment.getEvaluation());
            editTestVo.setKeyword(tAssignment.getKeyword());
            editTestVo.setConclusion(tAssignment.getConclusion());
            if (tAssignment.getSchoolAcademy() != null) {
                String anumber[] = tAssignment.getSchoolAcademy().split(",");
                String aname = "";
                for (String number : anumber) {
                    if (number.equals("*000")) {
                        aname += "全校,";
                    } else {
                        aname += schoolAcademyJPA.getSchoolAcademiesByAcademyNumber(number).getAcademyName() + ",";
                    }

                    editTestVo.setSchoolAcademyName(aname);
                }
            }
            editTestVo.setNeedSubmit(tAssignment.getNeedSubmit());
            editTestVo.setMins(tAssignment.getMins());
            editTestVo.setType(tAssignment.getType());
            editTestVo.setSiteId(tAssignment.getSiteId());
            editTestVo.setCreatedTime(tAssignment.getCreatedTime());
            editTestVo.setSubScribeExamId(tAssignment.getSubScribeExamId());
            editTestVo.setExamCategory(tAssignment.getExamQuestionpool() == null ? null : tAssignment.getExamQuestionpool().getCategory());
            editTestVo.setExamCategoryName(tAssignment.getExamQuestionpool() == null ? "未选择试卷库分类" : questionPoolCategoryJPA.findOne(tAssignment.getExamQuestionpool().getCategory()).getTitle());
            editTestVo.setExamQuestionpoolId(tAssignment.getExamQuestionpool() == null ? null : tAssignment.getExamQuestionpool().getId());
            editTestVo.setExamQuestionpoolName(tAssignment.getExamQuestionpool() == null ? "未选择试卷库" : tAssignment.getExamQuestionpool().getTitle());
            //补考为1，普通考试为0
            if (tAssignment.getIsMakeUpExam() != null) {
                editTestVo.setIsMakeUpExam(tAssignment.getIsMakeUpExam());
            } else {
                editTestVo.setIsMakeUpExam("0");
            }
            if (tAssignment.getOldAssignmentId() != null) {
                editTestVo.setOldAssignmentName(tAssignmentJPA.findOne(tAssignment.getOldAssignmentId()).getTitle() == null ? "未命名" : tAssignmentJPA.findOne(tAssignment.getOldAssignmentId()).getTitle());
            }
            //考试所属文件夹
            WkFolder wkFolder = tAssignment.getWkFolder();
            if (projectName.equals("proteach")) {
                if (wkFolder.getWkLesson() != null) {
                    editTestVo.setTestWkLessonId(wkFolder.getWkLesson().getId());
                    editTestVo.setTestWkChapterId(wkFolder.getWkLesson().getWkChapter().getId());
                    editTestVo.setTestChapterType(wkFolder.getWkLesson().getWkChapter().getType());
                } else if (wkFolder.getWkChapter() != null) {
                    editTestVo.setTestChapterType(wkFolder.getWkChapter().getType());
                    editTestVo.setTestWkChapterId(wkFolder.getWkChapter().getId());
                }
            }

            //考试控制表
            TAssignmentControl tAssignmentControl = tAssignment.getTAssignmentControl();
            editTestVo.setStartdateTest(tAssignmentControl.getStartdate());
            editTestVo.setDuedateTest(tAssignmentControl.getDuedate());
            editTestVo.setGradeToStudent(tAssignmentControl.getGradeToStudent());
            editTestVo.setGradeToTotalGrade(tAssignmentControl.getGradeToTotalGrade());
            editTestVo.setToGradebook(tAssignmentControl.getToGradebook());
            editTestVo.setAnswerToStudent(tAssignmentControl.getAnswerToStudent());
            editTestVo.setTestFrom(tAssignmentControl.getTestFrom());
            editTestVo.setTimelimitOneTest(tAssignmentControl.getTimelimit());
            //考试设置表
            TAssignmentAnswerAssign tAssignmentAnswerAssign = tAssignment.getTAssignmentAnswerAssign();
            editTestVo.setTestScoreTest(tAssignmentAnswerAssign.getScore());
            editTestVo.setPassingScore(tAssignmentAnswerAssign.getPassingScore());
            //保存试卷题目构成
            Set<TAssignmentQuestionpool> tAssignmentQuestionpools = tAssignment.getTAssignmentQuestionpools();
            List<String> questionIds = new ArrayList<>();
            if (tAssignmentQuestionpools.size() > 0) {
                for (TAssignmentQuestionpool tAssignmentQuestionpool : tAssignmentQuestionpools) {
                    questionIds.add(tAssignmentQuestionpool.getQuestionpoolId().toString());
                }
            }
            editTestVo.setQuestionIds(questionIds.toArray(new String[questionIds.size()]));

            Set<TAssignmentItemComponent> tAssignmentItemComponents = tAssignment.getTAssignmentItemComponents();
            List<String> sectionNames = new ArrayList<>();
            List<String> itemTypes = new ArrayList<>();
            List<String> itemQuantitys = new ArrayList<>();
            List<String> itemScores = new ArrayList<>();
            List<Integer> itemIds = new ArrayList<>();
            if (tAssignmentItemComponents.size() > 0) {
                for (TAssignmentItemComponent tAssignmentItemComponent : tAssignmentItemComponents) {
                    sectionNames.add(tAssignmentItemComponent.getSectionName());
                    itemTypes.add(tAssignmentItemComponent.getItemType().toString());
                    itemQuantitys.add(tAssignmentItemComponent.getItemQuantity().toString());
                    itemScores.add(Double.toString(tAssignmentItemComponent.getItemScore()));
                }
            }
            editTestVo.setSectionNames(sectionNames.toArray(new String[sectionNames.size()]));
            editTestVo.setItemTypes(itemTypes.toArray(new String[itemTypes.size()]));
            editTestVo.setItemQuantitys(itemQuantitys.toArray(new String[itemQuantitys.size()]));
            editTestVo.setItemScores(itemScores.toArray(new String[itemScores.size()]));
            //获取考试对应班级
            String classes = new String();
            List<String> schoolClasses = new ArrayList<>();
            List<TAssignmentClass> tAssignmentClassList = tAssignmentClassJPA.findAssignmentClassById(tAssignmentId);
            if (tAssignmentClassList.size() > 0) {
                for (TAssignmentClass tAssignmentClass : tAssignmentClassList) {
                    if (tAssignmentClass.getSchoolClass() != null) {
                        schoolClasses.add(tAssignmentClass.getSchoolClass().getClassNumber());
                        classes = classes + tAssignmentClass.getSchoolClass().getClassName() + ",";
                    }
                }
                //去掉最后一个逗号
                if (!classes.equals("")) {
                    classes = classes.substring(0, classes.length() - 1);
                    editTestVo.setClasses(classes);
                }
            }
            editTestVo.setSchoolClass(schoolClasses.toArray(new String[schoolClasses.size()]));
            if (tAssignment.getTAssignmentSections().size() > 0) {
                for (TAssignmentSection tAssignmentSection : tAssignment.getTAssignmentSections()) {
                    if (tAssignmentSection.getTAssignmentItems().size() > 0) {
                        for (TAssignmentItem tAssignmentItem : tAssignmentSection.getTAssignmentItems()) {
                            itemIds.add(tAssignmentItem.getId());
                        }
                    }
                }
            }
            editTestVo.setItemIds(itemIds.toArray(new Integer[itemIds.size()]));
        }

        return editTestVo;
    }

    /**************************************************************************
     * Description 删除考试
     * @Author 张佳鸣
     * @ate 2017-12-20
     **************************************************************************/
    @Override
    public void deleteExam(Integer tAssignmentId) {
        List<TAssignmentSection> tAssignmentSectionList = tAssignmentSectionJPA.findSetionByTAssignmentId(tAssignmentId);
        for (TAssignmentSection tAssignmentSection : tAssignmentSectionList) {
            tAssignmentSection.setTAssignment(null);
            tAssignmentSectionJPA.save(tAssignmentSection);
        }
        //根据考试id查找考试所在文件夹
        TAssignment tAssignment = tAssignmentJPA.findOne(tAssignmentId);
        if (tAssignment.getType().equals("exam")) {
            List<TAssignmentItem> tAssignmentItemList = tAssignmentItemJPA.findTAssignmentItemByTAssignmentId(tAssignmentId);
            if (tAssignmentItemList != null) {
                for (TAssignmentItem tAssignmentItem : tAssignmentItemList) {
                    tAssignmentItemJPA.delete(tAssignmentItem);
                }
            }

            /*TAssignmentSection tAssignmentSection = tAssignmentSectionJPA.findSetionByTAssignmentId(tAssignmentId);
            if (tAssignmentSection!=null){
                tAssignmentSectionJPA.delete(tAssignmentSection);
            }*/
        }
        //删除考试班级关系表的数据
        List<TAssignmentClass> tAssignmentClasses = tAssignmentClassJPA.findAssignmentClassById(tAssignmentId);
        tAssignmentClassJPA.deleteAll(tAssignmentClasses);
        //获取所有成绩
        List<TAssignmentGrading> tAssignmentGradings = tAssignmentGradingJPA.findAllExamGradingById(tAssignmentId);
        for (TAssignmentGrading tAssignmentGrading : tAssignmentGradings) {
            //根据成绩id获取所有的TAssignmentItemMapping
            List<TAssignmentItemMapping> tAssignmentItemMappings = tAssignmentItemMappingJPA.findItemMappingByExamId(tAssignmentGrading.getAccessmentgradingId());
            for (TAssignmentItemMapping tAssignmentItemMapping : tAssignmentItemMappings) {
                //删除所有跟成绩关联的数据
                tAssignmentItemMappingJPA.delete(tAssignmentItemMapping);
            }
            //删除此次考试的所有成绩
            tAssignmentGradingJPA.delete(tAssignmentGrading);
        }

       /* String sql="select c.*  from t_assignment_section as c where c.assignment_id="+tAssignment.getId();
        List<Object[]> list=entityManager.createNativeQuery(sql).getResultList();
        for (Object[] ob:list) {
          TAssignmentSection tAssignmentSection=tAssignmentSectionJPA.findOne(Integer.parseInt(ob[0].toString()));
          Set<TAssignmentItem> tAssignmentItemSet=tAssignmentSection.getTAssignmentItems();
          for( TAssignmentItem item:tAssignmentItemSet){
              if(tAssignment.getId()== item.getTAssignmentSection().getTAssignment().getId())
              item.getTAssignmentSection().setTAssignment(null);
              tAssignmentItemJPA.save(item);
          }
          tAssignmentSection.setTAssignment(null);
            tAssignmentSectionJPA.save(tAssignmentSection);
        }
*/

        WkFolder wkFolder = tAssignment.getWkFolder();
        Integer siteId = tAssignment.getSiteId();
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
//        MultiValueMap<String, Object> params = new LinkedMultiValueMap<>();//参数放入一个map中，restTemplate不能用hashMap
//        //需要的参数
//        params.add(ClientDatabase.QUERY_KEY, clientDatabaseContext.getCurrentDataSourceDto().getSchoolName());
//        params.add("assignmentId", tAssignmentId);
//        params.add("siteId", siteId);
//        String url = apiGateWayHost + "/transcript/deleteTranscript";
//
//        //将请求参数放入map中
//        HttpEntity<MultiValueMap<String, Object>> request = new HttpEntity<>(params, headers);//将参数和header组成一个请求
        tAssignment.setWkFolder(null);
        tAssignmentJPA.delete(tAssignment);
        if (wkFolder != null) {
            wkFolderJPA.delete(wkFolder);
            wkFolderJPA.flush();
        }
        //解除补考关系
        List<TAssignment> makeUpAssignmentList = tAssignmentJPA.findMakeUpExam(tAssignmentId);
        for (TAssignment makeUpAssignment : makeUpAssignmentList) {
            makeUpAssignment.setIsMakeUpExam(null);
            makeUpAssignment.setOldAssignmentId(null);
            tAssignmentJPA.save(makeUpAssignment);
        }
//        RestTemplate restTemplate = new RestTemplate();
//        String response = restTemplate.postForObject(url, request, String.class);
        String jsonReturnVo =  transcriptInterface.deleteTranscript(tAssignmentId.toString(),null,null,siteId);
        System.out.println("执行考试删除结果:" + jsonReturnVo);
    }

    /**************************************************************************
     * Description 根据学院查找所有班级（去除教师班级）
     * @Author 刘博越
     * @ate 2019-3-7
     **************************************************************************/
    @Override
    public String[] findAllClassByAcademyId(String academyNumber) {
        //获取所有可参加考试的班级
        List<SchoolClassesVo> schoolClassesVos = wkChapterService.findAllClassesByAcademyNumber(academyNumber);
        int count = 0;//统计有多少老师班级
        for (SchoolClassesVo s : schoolClassesVos) {
            if (s.getClassNumber().contains("教师班级")) {
                count++;
            }
        }
        int i = 0;
        String[] classes = new String[schoolClassesVos.size() - count];
        if (schoolClassesVos.size() > 0) {
            for (SchoolClassesVo schoolClass : schoolClassesVos) {
                if (!schoolClass.getClassNumber().contains("教师班级")) {
                    classes[i] = schoolClass.getClassNumber();
                    i++;
                }
            }
        }
        return classes;
    }

    /**************************************************************************
     * Description 查找查看考试内容
     * @Author 刘博越
     * @ate 2019-5-28
     **************************************************************************/
    @Override
    public ViewExamVo findViewExamVoById(Integer tAssignmentId, String projectName) {
        return null;
    }

    /**************************************************************************
     * Description 根据id查找考试名称
     * @Author 曹焕
     * @ate 2019-6-19
     **************************************************************************/
    @Override
    public String findTAssignmentById(Integer id) {
        TAssignment tAssignment = tAssignmentJPA.findOne(id);
        return tAssignment.getTitle();
    }

    /**************************************************************************
     * Description:生成考试/测试二维码
     *
     * @author：洪春莹
     * @date ：2019年5月21日
     **************************************************************************/
    @Override
    public String encodeByExamId(String examId) {
        //项目目录
        String rootPath = null;
        String imgPath = null;
        try {
            rootPath = ResourceUtils.getURL("").getPath();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        //新建的图片路径
        String fileName1 = "examQrCode.png";
        // 存放在二维码中的内容
        String text = examId;
        // 嵌入二维码的图片路径
        imgPath = rootPath + "controller/src/main/resources/static/images/identity/logo.jpg";
        imgPath.substring(2, imgPath.length());
        // 生成的二维码的路径及名称
        String destPath = "";
        destPath = rootPath + "controller/src/main/resources/static/images/" + fileName1;
        destPath.substring(1, destPath.length());
        //生成二维码
        try {
            QRCodeUtil.encode(text, imgPath, destPath, true);
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println(fileName1);
        return fileName1;
    }

    /**************************************************************************
     * Description:二维码图片上传到文件服务器
     *
     * @author：吴奇臻
     * @date ：2019年8月5日
     **************************************************************************/
    @Override
    public void saveExamQRcode(String examId, String fileName) {
        //项目目录
        String rootPath = null;
        try {
            rootPath = ResourceUtils.getURL("").getPath();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        rootPath = rootPath + "controller/src/main/resources/static/images/" + fileName;
        rootPath.substring(1, rootPath.length());
        File file = new File(rootPath);
        if (file.exists()) {
            System.out.println(file.getName());
        }
        //考试名称
        TAssignment tAssignment = tAssignmentJPA.getOne(Integer.valueOf(examId));
        //创建目录
        long directoryId = resourceContainerService.createDirectory("教学平台/考试二维码");
        //上传至文件服务器
        ResourceFileDto resourceFileDto = resourceContainerService.uploadFileToDirectory(file, directoryId);
        tAssignment.setQrcodeUrl(resourceFileDto.getId().toString());
        tAssignmentJPA.save(tAssignment);
    }

    /**************************************************************************
     * Description:获取考试题目
     *
     * @author：黄浩
     * @date ：2020年10月22日
     **************************************************************************/
    @Override
    public CopyExamDTO getExamDetail(Integer examId) {
        CopyExamDTO copyExamDTO = new CopyExamDTO();
        List<Integer> copyQuestionPoolId = new ArrayList<>();
        List<CopyItemComponentDTO> copyItemComponentDTOList = new ArrayList<>();
        //考试主体
        TAssignment tAssignment = tAssignmentJPA.findOne(examId);
        copyExamDTO.setId(examId);
        copyExamDTO.setTitle(tAssignment.getTitle());
        //题库情况
        if (tAssignment.getExamQuestionpool() == null) {
            for (TAssignmentQuestionpool tAssignmentQuestionpool : tAssignment.getTAssignmentQuestionpools()) {
                copyQuestionPoolId.add(tAssignmentQuestionpool.getQuestionpoolId());
            }
            copyExamDTO.setCopyQuestionPoolId(copyQuestionPoolId);
            for (TAssignmentItemComponent tAssignmentItemComponent : tAssignment.getTAssignmentItemComponents()) {
                CopyItemComponentDTO copyItemComponentDTO = new CopyItemComponentDTO();
                copyItemComponentDTO.setItemType(tAssignmentItemComponent.getItemType());
                copyItemComponentDTO.setItemQuantity(tAssignmentItemComponent.getItemQuantity());
                copyItemComponentDTO.setItemScore(tAssignmentItemComponent.getItemScore());
                copyItemComponentDTO.setSectionName(tAssignmentItemComponent.getSectionName());
                copyItemComponentDTO.settQuestionpoolId(tAssignmentItemComponent.getTAssignmentQuestionpool().getQuestionpoolId());
                copyItemComponentDTO.setItemGapnumber(tAssignmentItemComponent.getItemGapnumber());
                copyItemComponentDTOList.add(copyItemComponentDTO);
            }
            copyExamDTO.setCopyItemComponentDTOList(copyItemComponentDTOList);
        } else {
            //试卷库
            copyExamDTO.setExamQuestionpoolId(tAssignment.getExamQuestionpool().getId());
        }
        return copyExamDTO;
    }

    /**************************************************************************
     *Description 生成考试
     * @author 黄浩
     * @date 2020年10月20日
     **************************************************************************/
    @Override
    @Transactional
    public boolean copyExam(Integer sourceTestId, Integer targetSiteId, CopyExamDTO copyExamDTO) {
        try {
            //获取源数据的考试
            TAssignment tAssignment = tAssignmentJPA.findOne(sourceTestId);
            //获取新保存的考试
            WkFolder wkFolder = null;
            Integer testChapterType = null;
            Integer testWkChapterId = null;
            if (tAssignment.getWkFolder().getWkChapter() != null) {
                //获取目标章节
                WkChapter wkChapter = wkChapterJPA.findBySiteIdAndName(targetSiteId, tAssignment.getWkFolder().getWkChapter().getName(), tAssignment.getWkFolder().getWkChapter().getType());
                Integer siteId = wkChapter.getTCourseSite().getId();
                //复制测试信息，存储过程参数:目标chapterId,源folderId
                Query query = entityManager.createNativeQuery("{call proc_copy_exam_folder(:chapterId ,:folderId,:targetSiteId)}");
                query.setParameter("chapterId", wkChapter.getId());
                query.setParameter("folderId", tAssignment.getWkFolder().getId());
                query.setParameter("targetSiteId", targetSiteId);
                query.executeUpdate();
                //获取新保存的考试
                wkFolder = wkFolderJPA.findTestFolder(wkChapter.getId(), tAssignment.getTitle(), 6);
                testChapterType = wkChapter.getType();
                testWkChapterId = wkChapter.getId();
            } else {
                //获取目标小节
                WkLesson wkLesson = wkLessonJPA.findWkLessonBySiteIdAndTitle(targetSiteId, tAssignment.getWkFolder().getWkLesson().getTitle(), tAssignment.getWkFolder().getWkLesson().getWkChapter().getType());
                //复制测试信息，存储过程参数:目标lessonId,源folderId
                Query query = entityManager.createNativeQuery("{call proc_copy_lesson_exam_folder(:lessonId ,:folderId,:targetSiteId)}");
                query.setParameter("lessonId", wkLesson.getId());
                query.setParameter("folderId", tAssignment.getWkFolder().getId());
                query.setParameter("targetSiteId", targetSiteId);
                query.executeUpdate();
                //获取新保存的考试
                wkFolder = wkFolderJPA.findTestLessonIdFolder(wkLesson.getId(), tAssignment.getTitle(), 6);
                testChapterType = wkLesson.getWkChapter().getType();
                testWkChapterId = wkLesson.getWkChapter().getId();
            }
            //复制t_assignment_section
            TAssignment newTAssignment = new TAssignment();
            for (TAssignment t : wkFolder.getTAssignments()) {
                newTAssignment = t;
            }

            //保存试卷题目构成
            Set<TAssignmentQuestionpool> tAssignmentQuestionpools = new HashSet<TAssignmentQuestionpool>();
            if (copyExamDTO.getExamQuestionpoolId() == null) {//若试题来源是题库
                for (Integer questionId : copyExamDTO.getCopyQuestionPoolId()) {
                    tAssignmentQuestionpools.add(tAssignmentQuestionpoolJPA.findOne(questionId));
                }
                newTAssignment.setTAssignmentQuestionpools(tAssignmentQuestionpools);
                newTAssignment = tAssignmentJPA.save(newTAssignment);

                Set<TAssignmentItemComponent> comSet = new HashSet<TAssignmentItemComponent>();
                TAssignmentItemComponent tAssignmentItemComponent = null;
                for (CopyItemComponentDTO copyItemComponentDTO : copyExamDTO.getCopyItemComponentDTOList()) {
                    tAssignmentItemComponent = new TAssignmentItemComponent();
                    tAssignmentItemComponent.setSectionName(copyItemComponentDTO.getSectionName());
                    tAssignmentItemComponent.setItemType(copyItemComponentDTO.getItemType());
                    tAssignmentItemComponent.setItemQuantity(copyItemComponentDTO.getItemQuantity());
                    tAssignmentItemComponent.setTAssignmentQuestionpool(tAssignmentQuestionpoolJPA.findOne(copyItemComponentDTO.gettQuestionpoolId()));
                    tAssignmentItemComponent.setItemScore(copyItemComponentDTO.getItemScore());
                    tAssignmentItemComponent.setTAssignment(newTAssignment);
                    if (tAssignmentItemComponent.getItemType() == 8) {
                        tAssignmentItemComponent.setItemGapnumber(copyItemComponentDTO.getItemGapnumber());
                    }
                    TAssignmentItemComponent component = tAssignmentItemComponentJPA.save(tAssignmentItemComponent);
                    comSet.add(component);
                }
                newTAssignment.setTAssignmentItemComponents(comSet);
                newTAssignment = tAssignmentJPA.save(newTAssignment);
            } else {//若试题来源是试卷库
                ExamQuestionpool examQuestionpool = examQuestionpoolJPA.findOne(copyExamDTO.getExamQuestionpoolId());
                newTAssignment.setExamQuestionpool(examQuestionpool);
                newTAssignment = tAssignmentJPA.save(newTAssignment);
            }
            this.createGradebook(targetSiteId, newTAssignment.getId(), testChapterType, testWkChapterId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**************************************************************************
     * Description 根据学院查找所有班级（去除教师班级）
     * @Author 刘博越
     * @ate 2019-3-7
     **************************************************************************/
    @Override
    public String findAllClassByAcademyIdStr(String academyNumber) {
        String res = "";
        List<SchoolClassesVo> resList = new ArrayList<>();
        if (!EmptyUtil.isEmpty(academyNumber)) {
            String[] arr = academyNumber.split(",");
            for (String str:arr){
                List<SchoolClassesVo> schoolClassesVos = wkChapterService.findAllClassesByAcademyNumber(str);
                resList.addAll(schoolClassesVos);
            }
            //获取所有可参加考试的班级


            for (SchoolClassesVo s : resList) {
                if (!s.getClassNumber().contains("教师班级")) {
                    res += s.getClassNumber() + ",";
                }
            }
            if (res.length() > 0) {
                res = res.substring(0, res.length() - 1);
            }
        }
        return res;
    }
}