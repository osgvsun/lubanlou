package net.gvsun.gsexam.service.test;

import com.easycache.annotation.Cache;
import net.gvsun.datasource.ClientDatabaseContext;
import net.gvsun.feign.TranscriptFeign;
import net.gvsun.gsexam.domain.*;
import net.gvsun.gsexam.dto.common.SchoolAcademyVo;
import net.gvsun.gsexam.dto.common.UserVo;
import net.gvsun.gsexam.dto.exam.login.TAssignmentAnswerDto;
import net.gvsun.gsexam.jpa.*;
import net.gvsun.gsexam.service.common.ShareService;
import net.gvsun.gsexam.service.exam.ExamListService;
import net.gvsun.gsexam.service.exam.TAssignmentService;
import net.gvsun.gsexam.utils.ListUtil;
import net.gvsun.gsexam.vo.exam.ExamItemVo;
import net.gvsun.gsexam.vo.exam.TCourseSiteVo;
import net.gvsun.gsexam.vo.test.TestDetailVo;
import net.gvsun.gsexam.vo.test.TestInfoVO;
import net.gvsun.gsexam.vo.test.TestSectionVO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.math.BigDecimal;
import java.util.*;

/**************************************************************************
 * Description:测试service实现
 *
 * @author:lixueteng
 * @date:2018/1/18 0018
 **************************************************************************/
@Service("testInfoService")
public class TestInfoServiceImpl implements TestInfoService {

    @Autowired
    private TAssignmentJPA tAssignmentJPA;
    @Autowired
    private UserJPA userJPA;
    @Autowired
    private WkFolderJPA wkFolderJPA;
    @Autowired
    private TAssignmentControlJPA tAssignmentControlJPA;
    @Autowired
    private TAssignmentAnswerAssignJPA tAssignmentAnswerAssignJPA;
    @Autowired
    private TAssignmentSectionJPA tAssignmentSectionJPA;
    @Autowired
    private TAssignmentItemJPA tAssignmentItemJPA;
    @Autowired
    private TAssignmentAnswerJPA tAssignmentAnswerJPA;
    @Autowired
    private TAssignmentGradingJPA tAssignmentGradingJPA;
    @Autowired
    private TAssignmentItemMappingJPA tAssignmentItemMappingJPA;
    @Autowired
    private ShareService shareService;
    @Autowired
    private TGradebookJPA tGradebookJPA;
    @Autowired
    private TGradeObjectJPA tGradeObjectJPA;
    @Autowired
    private TGradeRecordJPA tGradeRecordJPA;
    @Autowired
    private TAssignmentClassJPA tAssignmentClassJPA;
    @Autowired
    private WkChapterJPA wkChapterJPA;
    @Autowired
    private WkLessonJPA wkLessonJPA;
    @Autowired
    private TCourseSiteJPA tCourseSiteJPA;
    @Autowired
    private ExamListService examListService;
    @Autowired
    private TAssignmentService tAssignmentService;
    @Autowired
    private TranscriptFeign transcriptInterface;
    @Autowired
    private EntityManager entityManager;
    @Autowired
    private ClientDatabaseContext clientDatabaseContext;

    /**************************************************************************
     * Description 保存测试
     *
     * @param testInfoVO 新建测试信息vo
     * @author lixueteng
     * @date 2018-01-18
     **************************************************************************/
    @Override
    public Integer saveTest(TestInfoVO testInfoVO, UserVo userVo, Integer cid, String projectName) {
        TCourseSiteVo tCourseSiteVo = examListService.findCourseSiteById(cid);
        //保存tassignment相关
        User user = userJPA.findOne(userVo.getUsername());
        if (testInfoVO.getId() == null) {
            //先保存考试所属文件夹
            WkFolder wkFolder = new WkFolder();
            wkFolder.setName(testInfoVO.getTitle());
            wkFolder.setType(5);
            wkFolder.setUser(user);
            wkFolder.setCreateTime(new Date());
            if (!tCourseSiteVo.getTitle().equals("全校考试")) {
                if (testInfoVO.getClassId() != null) {
                    WkLesson wkLesson = new WkLesson();
                    wkLesson.setId(testInfoVO.getClassId());
                    wkFolder.setWkLesson(wkLesson);
                } else {
                    WkChapter wkChapter = new WkChapter();
                    wkChapter.setType(testInfoVO.getCategoryId());
                    wkChapter.setId(testInfoVO.getChapterId());
                    wkFolder.setWkChapter(wkChapter);
                }
            }
            //保存文件夹
            wkFolder = wkFolderJPA.save(wkFolder);
            TAssignment tAssignment = new TAssignment();
            tAssignment.setTitle(testInfoVO.getTitle());
            tAssignment.setContent(testInfoVO.getDescription());
            tAssignment.setCreatedTime(new Date());
            //0 未发布 1 已发布
            tAssignment.setStatus(testInfoVO.getStatus());
            tAssignment.setUser(user);
            tAssignment.setWkFolder(wkFolder);
            //tAssignment.setNeedSubmit(testInfoVO.getSubmitTime());
            tAssignment.setType(testInfoVO.getType());
            tAssignment.setSiteId(cid);
            //学院
            tAssignment.setSchoolAcademy(testInfoVO.getSchoolAcademy1());
            tAssignment = tAssignmentJPA.save(tAssignment);
            tAssignment.setSequence(tAssignment.getId());
            TAssignmentControl tAssignmentControl = new TAssignmentControl();
            tAssignmentControl.setStartdate(testInfoVO.getStartDate());
            tAssignmentControl.setDuedate(testInfoVO.getEndTime());
            tAssignmentControl.setTAssignment(tAssignment);
            tAssignmentControl.setTimelimit(testInfoVO.getSubmitTime());
            tAssignmentControl.setToGradebook(testInfoVO.getIsToGradebook());
            tAssignmentControl.setGradeToStudent(testInfoVO.getIsToStudent());
            tAssignmentControl.setGradeToTotalGrade(testInfoVO.getIsToTotalScore());
            tAssignmentControl.setAnswerToStudent(testInfoVO.getIsShowDetail());
            tAssignmentControl = tAssignmentControlJPA.save(tAssignmentControl);
            TAssignmentAnswerAssign tAssignmentAnswerAssign = new TAssignmentAnswerAssign();
            tAssignmentAnswerAssign.setUser(user);
            tAssignmentAnswerAssign.setTAssignment(tAssignment);
            tAssignmentAnswerAssign.setScore(testInfoVO.getScore() == null ? 100 : testInfoVO.getScore());
            tAssignmentAnswerAssign = tAssignmentAnswerAssignJPA.save(tAssignmentAnswerAssign);
            tAssignment.setTAssignmentControl(tAssignmentControl);
            tAssignment.setTAssignmentAnswerAssign(tAssignmentAnswerAssign);
            tAssignment = tAssignmentJPA.save(tAssignment);

            //保存大项相关信息
            for (TestSectionVO sectionVO : testInfoVO.getTestSectionVOS()) {
                TAssignmentSection section = new TAssignmentSection();
                section.setTAssignment(tAssignment);
                section.setUser(user);
                section.setCreatedTime(new Date());
                section.setSequence(sectionVO.getSectionIndex());
                section.setDescription(sectionVO.getSectionTitle());
                section.setStatus(1);
                section = tAssignmentSectionJPA.save(section);
                //计算分数，保留小数点后一位(不要四舍五入，直接截取)
                int itemCount = sectionVO.getItemIds().size();
                double testScore = testInfoVO.getScore();
                String originalScoreStr = String.format("%.4f", testScore / itemCount);
                double avgScore = Double.parseDouble(originalScoreStr.substring(0, originalScoreStr.indexOf(".") + 2));
                double lastScore = testScore - (avgScore * (itemCount - 1));
                //获取大项对应的小题
                for (int i = 0; i < itemCount; i++) {
                    Integer itemId = sectionVO.getItemIds().get(i);
                    TAssignmentItem one = tAssignmentItemJPA.findOne(itemId);
                    TAssignmentItem newTAssignmentItem = new TAssignmentItem();
                    BeanUtils.copyProperties(one, newTAssignmentItem);
                    newTAssignmentItem.setId(null);
                    if (i == itemCount - 1) {
                        //最后一题分数
                        newTAssignmentItem.setScore(lastScore);
                    } else {
                        //前n-1道题分数
                        newTAssignmentItem.setScore(avgScore);
                    }
                    newTAssignmentItem.setTAssignmentSection(section);
                    newTAssignmentItem.setTAssignmentQuestionpools(new HashSet<TAssignmentQuestionpool>());
                    newTAssignmentItem.setTAssignmentAnswers(new HashSet<TAssignmentAnswer>());
                    newTAssignmentItem.setTAssignmentItemMappings(new HashSet<TAssignmentItemMapping>());
                    newTAssignmentItem.setTExerciseItemRecords(new HashSet<TExerciseItemRecord>());
                    newTAssignmentItem.setTMistakeItems(new HashSet<TMistakeItem>());
                    newTAssignmentItem.setItemParent(one.getId());
                    newTAssignmentItem.setCreatedTime(new Date());
                    newTAssignmentItem = tAssignmentItemJPA.save(newTAssignmentItem);
                    //保存小题对应的答案
                    Set<TAssignmentAnswer> tAssignmentAnswers = one.getTAssignmentAnswers();

                    List<TAssignmentAnswer> list = new ArrayList<>();
                    for (TAssignmentAnswer tAssignmentAnswer : tAssignmentAnswers) {
                        list.add(tAssignmentAnswer);
                    }
                    Collections.sort(list, new Comparator<TAssignmentAnswer>() {//根据id排序解决set无序问题
                        @Override
                        public int compare(TAssignmentAnswer arg0, TAssignmentAnswer arg1) {
                            return (arg0.getId()).compareTo(arg1.getId());
                        }
                    });
                    /*Set<TAssignmentAnswer> orderedTAssignmentAnswers = new TreeSet<TAssignmentAnswer>(new Comparator<TAssignmentAnswer>() {
                        @Override
                        public int compare(TAssignmentAnswer o1, TAssignmentAnswer o2) {
                            if (o1.getId() != null && !"".equals(o1.getId()) && o2.getId() != null && !"".equals(o2.getId())) {
                                return o1.getId().compareTo(o2.getId());
                            } else
                                return 0;
                        }
                    });*/
                    // orderedTAssignmentAnswers.addAll(tAssignmentAnswers);
                    for (TAssignmentAnswer answer : list) {
                        TAssignmentAnswer newAnswer = new TAssignmentAnswer();
                        BeanUtils.copyProperties(answer, newAnswer);
                        newAnswer.setId(null);
                        newAnswer.setTAssignmentItem(newTAssignmentItem);
                        newAnswer.setTAssignmentItemMappings(new HashSet<TAssignmentItemMapping>());
                        newAnswer.setTExerciseAnswerRecords(new HashSet<TExerciseAnswerRecord>());
                        tAssignmentAnswerJPA.save(newAnswer);
                    }
                }
            }
            return tAssignment.getId();
        } else {
            //先保存考试所属文件夹
            WkFolder wkFolder = new WkFolder();
            wkFolder.setName(testInfoVO.getTitle());
            wkFolder.setType(5);
            wkFolder.setUser(user);
            wkFolder.setCreateTime(new Date());
            if (!tCourseSiteVo.getTitle().equals("全校考试")) {
                if (testInfoVO.getClassId() != null) {
                    WkLesson wkLesson = new WkLesson();
                    wkLesson.setId(testInfoVO.getClassId());
                    wkFolder.setWkLesson(wkLesson);
                } else {
                    WkChapter wkChapter = new WkChapter();
                    wkChapter.setType(testInfoVO.getCategoryId());
                    wkChapter.setId(testInfoVO.getChapterId());
                    wkFolder.setWkChapter(wkChapter);
                }
            }
            //保存文件夹
            wkFolder = wkFolderJPA.save(wkFolder);
            TAssignment tAssignment = tAssignmentJPA.findOne(testInfoVO.getId());
            tAssignment.setTitle(testInfoVO.getTitle());
            tAssignment.setContent(testInfoVO.getDescription());
            tAssignment.setCreatedTime(new Date());
            //0 未发布 1 已发布
            tAssignment.setStatus(testInfoVO.getStatus());
            tAssignment.setUser(user);
            tAssignment.setWkFolder(wkFolder);
            //tAssignment.setNeedSubmit(testInfoVO.getSubmitTime());
            tAssignment.setType(testInfoVO.getType());
            tAssignment.setSiteId(cid);
            //学院
            tAssignment.setSchoolAcademy(testInfoVO.getSchoolAcademy1());
            //tAssignment.setSchoolAcademy(testInfoVO.getSchoolAcademy());
            tAssignment = tAssignmentJPA.save(tAssignment);
            tAssignment.setSequence(tAssignment.getId());
            //考试控制表
            TAssignmentControl tAssignmentControl = tAssignment.getTAssignmentControl();
            tAssignmentControl.setStartdate(testInfoVO.getStartDate());
            tAssignmentControl.setDuedate(testInfoVO.getEndTime());
            tAssignmentControl.setTAssignment(tAssignment);
            tAssignmentControl.setTimelimit(testInfoVO.getSubmitTime());
            tAssignmentControl.setToGradebook(testInfoVO.getIsToGradebook());
            tAssignmentControl.setGradeToStudent(testInfoVO.getIsToStudent());
            tAssignmentControl.setGradeToTotalGrade(testInfoVO.getIsToTotalScore());
            tAssignmentControl.setAnswerToStudent(testInfoVO.getIsShowDetail());
            tAssignmentControl = tAssignmentControlJPA.save(tAssignmentControl);
            //考试设置表
            TAssignmentAnswerAssign tAssignmentAnswerAssign = tAssignment.getTAssignmentAnswerAssign();
            tAssignmentAnswerAssign.setUser(user);
            tAssignmentAnswerAssign.setTAssignment(tAssignment);
            tAssignmentAnswerAssign.setScore(testInfoVO.getScore() == null ? 100 : testInfoVO.getScore());
            tAssignmentAnswerAssign = tAssignmentAnswerAssignJPA.save(tAssignmentAnswerAssign);
            tAssignment.setTAssignmentControl(tAssignmentControl);
            tAssignment.setTAssignmentAnswerAssign(tAssignmentAnswerAssign);
            tAssignment = tAssignmentJPA.save(tAssignment);
            TAssignmentSection tAssignmentSection = null;
            for (TAssignmentSection tas : tAssignment.getTAssignmentSections()) {
                tAssignmentSection = tas;
            }

            //保存大项相关信息
            for (TestSectionVO sectionVO : testInfoVO.getTestSectionVOS()) {
                TAssignmentSection section = new TAssignmentSection();
                section.setTAssignment(tAssignment);
                section.setUser(user);
                section.setCreatedTime(new Date());
                section.setSequence(sectionVO.getSectionIndex());
                section.setDescription(sectionVO.getSectionTitle());
                section.setStatus(1);
                section = tAssignmentSectionJPA.save(section);
                //计算分数，保留小数点后一位(不要四舍五入，直接截取)
                int itemCount = sectionVO.getItemIds().size();
                double testScore = testInfoVO.getScore();
                String originalScoreStr = String.format("%.4f", testScore / itemCount);
                double avgScore = Double.parseDouble(originalScoreStr.substring(0, originalScoreStr.indexOf(".") + 2));
                double lastScore = testScore - (avgScore * (itemCount - 1));
                //获取大项对应的小题
                for (int i = 0; i < itemCount; i++) {
                    Integer itemId = sectionVO.getItemIds().get(i);
                    TAssignmentItem one = tAssignmentItemJPA.findOne(itemId);
                    TAssignmentItem newTAssignmentItem = new TAssignmentItem();
                    BeanUtils.copyProperties(one, newTAssignmentItem);
                    newTAssignmentItem.setId(null);
                    if (i == itemCount - 1) {
                        //最后一题分数
                        newTAssignmentItem.setScore(lastScore);
                    } else {
                        //前n-1道题分数
                        newTAssignmentItem.setScore(avgScore);
                    }
                    newTAssignmentItem.setTAssignmentSection(section);
                    newTAssignmentItem.setTAssignmentQuestionpools(new HashSet<TAssignmentQuestionpool>());
                    newTAssignmentItem.setTAssignmentAnswers(new HashSet<TAssignmentAnswer>());
                    newTAssignmentItem.setTAssignmentItemMappings(new HashSet<TAssignmentItemMapping>());
                    newTAssignmentItem.setTExerciseItemRecords(new HashSet<TExerciseItemRecord>());
                    newTAssignmentItem.setTMistakeItems(new HashSet<TMistakeItem>());
                    newTAssignmentItem.setItemParent(one.getId());
                    newTAssignmentItem.setCreatedTime(new Date());
                    newTAssignmentItem = tAssignmentItemJPA.save(newTAssignmentItem);
                    //保存小题对应的答案
                    Set<TAssignmentAnswer> tAssignmentAnswers = one.getTAssignmentAnswers();
                    for (TAssignmentAnswer answer : tAssignmentAnswers) {
                        TAssignmentAnswer newAnswer = new TAssignmentAnswer();
                        BeanUtils.copyProperties(answer, newAnswer);
                        newAnswer.setId(null);
                        newAnswer.setTAssignmentItem(newTAssignmentItem);
                        newAnswer.setTAssignmentItemMappings(new HashSet<TAssignmentItemMapping>());
                        newAnswer.setTExerciseAnswerRecords(new HashSet<TExerciseAnswerRecord>());
                        tAssignmentAnswerJPA.save(newAnswer);
                    }
                }
            }
            tAssignmentSection.setTAssignment(null);
            tAssignmentSectionJPA.delete(tAssignmentSection);
            return tAssignment.getId();
        }
    }

    /**************************************************************************
     * Description 测试列表
     *
     * @param id 站点id/章节id/小节id
     * @return 测试VO集合
     * @author lixueteng
     * @date 2018-01-18
     **************************************************************************/
    @Override
    public List<TestInfoVO> findAllTest(UserVo userVo, String authorityName, Integer id, Integer dictionary) {
        List<TestInfoVO> returnList = new ArrayList<>();
        List<TAssignment> allTest = new ArrayList<TAssignment>();
        //dictionary：1 参数id为课程id;2 参数id为章节id;3 参数id为小节id
        switch (dictionary) {
            case 1: {
                if ("TEACHER".equals(authorityName)) {
                    TCourseSiteVo tCourseSiteVo = examListService.findCourseSiteById(id);
                    if (tCourseSiteVo.getTitle().equals("全校考试")) {
                        allTest = tAssignmentJPA.findTAssignmentExamBySiteIdAndSchoolAcademy(id, "test", userVo.getAcademyNumber());
                    } else {
                        allTest = tAssignmentJPA.findTAssignmentExamBySiteId(id, "test");
                    }
                } else if ("SUPERADMIN".equals(authorityName)) {
                    allTest = tAssignmentJPA.findTAssignmentExamBySiteId(id, "test");
                } else {
                    TCourseSiteVo tCourseSiteVo = examListService.findCourseSiteById(id);
                    if (tCourseSiteVo.getTitle().equals("全校考试")) {
                        allTest = this.findTAssignment(id, "test", userVo);
                    } else {
                        allTest = tAssignmentJPA.findTAssignmentExamByStudentAndSiteId(id, "test");
                    }
                }
                break;
            }
            case 2: {
                allTest = tAssignmentJPA.findByChapterIdAndType(id, "test");
                break;
            }
            case 3: {
                allTest = tAssignmentJPA.findByLessonIdAndType(id, "test");
                break;
            }
            default:
        }
        for (TAssignment tAssignment : allTest) {
            TestInfoVO testInfoVO = new TestInfoVO();
            testInfoVO.setId(tAssignment.getId());
            testInfoVO.setTitle(tAssignment.getTitle());
            testInfoVO.setStatus(tAssignment.getStatus());
            testInfoVO.setStartDate(tAssignment.getTAssignmentControl().getStartdate());
            testInfoVO.setEndTime(tAssignment.getTAssignmentControl().getDuedate());
            testInfoVO.setScore(tAssignment.getTAssignmentAnswerAssign().getScore());
            testInfoVO.setCreatedBy(tAssignment.getUser().getCname());
            //获取测试对应学院
            List<SchoolAcademyVo> schoolAcademyVoList = new ArrayList<>();
            try {
                List<TAssignmentClass> tAssignmentClassList = tAssignmentClassJPA.findAssignmentClassById(tAssignment.getId());
                if (tAssignmentClassList.size() > 0) {
                    for (TAssignmentClass tAssignmentClass : tAssignmentClassList) {
                        SchoolAcademyVo schoolAcademyVo = new SchoolAcademyVo();
                        if (tAssignmentClass != null && tAssignmentClass.getSchoolAcademy() != null) {
                            schoolAcademyVo.setAcademyNumber(tAssignmentClass.getSchoolAcademy().getAcademyNumber());
                        }
                        schoolAcademyVoList.add(schoolAcademyVo);
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
            testInfoVO.setSchoolAcademy(schoolAcademyVoList);
            returnList.add(testInfoVO);
        }
        return returnList;
    }

    /**************************************************************************
     * Description 开始考试 获取当前考试是否还有再次作答的次数
     *
     * @author lixueteng
     * @date 2017-11-2
     * @param testId 考试的ID
     * @param userVo 当前登录人
     * @return 当前考试的剩余提交次数
     **************************************************************************/
    @Override
    public Integer getTestIsCanAnswer(Integer testId, UserVo userVo) {
        TAssignment exam = tAssignmentJPA.findOne(testId);
        //获取考试限制提交次数
        Integer timelimit = exam.getTAssignmentControl().getTimelimit();
        Integer currUserExamCommitTime = tAssignmentGradingJPA.getCurrUserExamCommitTime(testId, userVo.getUsername());
        if (null != currUserExamCommitTime) {
            return timelimit - currUserExamCommitTime;
        }
        return timelimit;
    }

    /**************************************************************************
     * Description 开始测试，获取测试题目数据
     *
     * @author lixueteng
     * @date 2017-09-17
     **************************************************************************/
    @Override
    public TestDetailVo getExamDetail(Integer testId, String username, Integer currpage, Integer pageSize) {
        List<TAssignmentAnswer> answers = new ArrayList<>();
        TestDetailVo testDetailVo = new TestDetailVo();
        //获取学生测试的那条记录
        TAssignment test = tAssignmentJPA.findOne(testId);
        if (test == null) {
            TestDetailVo sys = new TestDetailVo();
            return sys;

        }
        TAssignment parentTest = tAssignmentJPA.getOne(test.getTestParentId());
        //测试分数
        testDetailVo.setId(test.getId());
        if (parentTest.getTAssignmentAnswerAssign() != null) {
            testDetailVo.setScore(parentTest.getTAssignmentAnswerAssign().getScore());
        } else {
            testDetailVo.setScore(null);
        }
        testDetailVo.setTitle(parentTest.getTitle());
        testDetailVo.setUsername(username);
        List<ExamItemVo> itemVoList = new ArrayList<>();
        List<TAssignmentItem> tAssignmentItems = new ArrayList<>();

        int totalRecords = tAssignmentItemJPA.countTAssignmentItem(testId);
        if (totalRecords == 0) {
            totalRecords = 1;
        }
        Map<String, Integer> pageModel = new HashMap<>();//分页信息
        pageModel = shareService.getPage(currpage, pageSize, totalRecords);
        PageRequest pageable = PageRequest.of(currpage - 1, totalRecords);

        Page<TAssignmentItem> pageTAssignmentItems = tAssignmentItemJPA.findTAssignmentItemByExamId(testId, pageable);
        tAssignmentItems = pageTAssignmentItems.getContent();
        //获取大项中对应的小题
      /*  for(TAssignmentSection section:tAssignmentSections){
            Set<TAssignmentItem> tAssignmentItems = section.getTAssignmentItems();*/

        for (TAssignmentItem item : tAssignmentItems) {
            ExamItemVo itemVo = new ExamItemVo();
            itemVo.setDescription(item.getDescription());
            itemVo.setDescriptionTemp(item.getDescriptionTemp());
            itemVo.setId(item.getId());
            itemVo.setType(item.getType());
            itemVo.setScore(item.getScore());
            List<TAssignmentAnswerDto> tAssignmentAnswerDtos = new ArrayList<>();
            if (item.getType() != 8) {
                Set<TAssignmentAnswer> tAssignmentAnswers = item.getTAssignmentAnswers();
                //tAssignmentAnswers中的项按照选项（A,B,C,D）进行排序，防止D选项为“以上3个都对”而不显示在最后一个
                Set<TAssignmentAnswer> orderedTAssignmentAnswers = new TreeSet<TAssignmentAnswer>(new Comparator<TAssignmentAnswer>() {
                    @Override
                    public int compare(TAssignmentAnswer o1, TAssignmentAnswer o2) {
                        if (o1.getLabel() != null && !"".equals(o1.getLabel()) && o2.getLabel() != null && !"".equals(o2.getLabel())) {
                            return o1.getLabel().compareTo(o2.getLabel());
                        } else {
                            return 0;
                        }
                    }
                });
                orderedTAssignmentAnswers.addAll(tAssignmentAnswers);
                for (TAssignmentAnswer answer : orderedTAssignmentAnswers) {
                    TAssignmentAnswerDto answerDto = new TAssignmentAnswerDto();
                    answerDto.setText(answer.getText());
                    answerDto.setId(answer.getId());
                    answerDto.setLabel(answer.getLabel());
                    answerDto.setIscorrect(answer.getIscorrect());
                    tAssignmentAnswerDtos.add(answerDto);
                }
            } else {
                Set<TAssignmentAnswer> tAssignmentAnswers = item.getTAssignmentAnswers();
                List<TAssignmentAnswer> list = new ArrayList<>();
                for (TAssignmentAnswer tAssignmentAnswer : tAssignmentAnswers) {
                    list.add(tAssignmentAnswer);
                }
                Collections.sort(list, new Comparator<TAssignmentAnswer>() {//根据id排序解决set无序问题
                    @Override
                    public int compare(TAssignmentAnswer arg0, TAssignmentAnswer arg1) {
                        return (arg0.getId()).compareTo(arg1.getId());
                    }
                });
               /* Set<TAssignmentAnswer> orderedTAssignmentAnswers = new TreeSet<TAssignmentAnswer>(new Comparator<TAssignmentAnswer>() {
                    @Override
                    public int compare(TAssignmentAnswer o1, TAssignmentAnswer o2) {
                        if (o1.getId() != null && !"".equals(o1.getId()) && o2.getId() != null && !"".equals(o2.getId())) {
                            return o1.getId().compareTo(o2.getId());
                        } else
                            return 0;
                    }
                });*/
                //orderedTAssignmentAnswers.addAll(tAssignmentAnswers);
                for (TAssignmentAnswer answer : list) {
                    TAssignmentAnswerDto answerDto = new TAssignmentAnswerDto();
                    answerDto.setText(answer.getText());
                    answerDto.setId(answer.getId());
                    answerDto.setLabel(answer.getLabel());
                    answerDto.setIscorrect(answer.getIscorrect());
                    tAssignmentAnswerDtos.add(answerDto);
                }
            }
            itemVo.setAnswertext(tAssignmentAnswerDtos);
            itemVoList.add(itemVo);
        }


           /* for(TAssignmentItem item:tAssignmentItems){
                ExamItemVo itemVo=new ExamItemVo();
                itemVo.setDescription(item.getDescription());
                itemVo.setDescriptionTemp(item.getDescriptionTemp());
                itemVo.setId(item.getId());
                itemVo.setType(item.getType());
                List<TAssignmentAnswerDto> tAssignmentAnswerDtos=new ArrayList<>();
//                Set<TAssignmentAnswer> tAssignmentAnswers = item.getTAssignmentAnswers();
                List<TAssignmentAnswerDto> answerText = new ArrayList<>();
                //解决set集合顺序不确定问题
                List<TAssignmentAnswer> tAssignmentAnswers = tAssignmentItemJPA.findTAssignmentAnswerByItemId(item.getId());
                if(item.getType()!=8) {
                    //tAssignmentAnswers中的项按照选项（A,B,C,D）进行排序，防止D选项为“以上3个都对”而不显示在最后一个
                    Set<TAssignmentAnswer> orderedTAssignmentAnswers = new TreeSet<TAssignmentAnswer>(new Comparator<TAssignmentAnswer>() {
                        @Override
                        public int compare(TAssignmentAnswer o1, TAssignmentAnswer o2) {
                            if (o1.getLabel() != null && !"".equals(o1.getLabel()) && o2.getLabel() != null && !"".equals(o2.getLabel())) {
                                return o1.getLabel().compareTo(o2.getLabel());
                            } else
                                return 0;
                        }
                    });

                    orderedTAssignmentAnswers.addAll(tAssignmentAnswers);
                    answers.clear();
                    answers.addAll(orderedTAssignmentAnswers);
                }else{
                    answers.clear();
                   answers.addAll(tAssignmentAnswers);
                }
                for(TAssignmentAnswer answer:tAssignmentAnswers){
                    TAssignmentAnswerDto answerDto=new TAssignmentAnswerDto();
                    answerDto.setText(answer.getText());
                    answerDto.setId(answer.getId());
                    tAssignmentAnswerDtos.add(answerDto);
                }
                itemVo.setAnswertext(tAssignmentAnswerDtos);
                itemVoList.add(itemVo);
            }*/
        int totalPage = pageModel.get("totalPage");
        // 集合 分成几份
        List<List<ExamItemVo>> lists = ListUtil.averageAssign(itemVoList, pageSize);
        testDetailVo.setItemVoList(itemVoList);
        testDetailVo.setTotalItemNumber(itemVoList.size());
        testDetailVo.setExamItemVoList(lists);
        testDetailVo.setPageModel(pageModel);
        return testDetailVo;
    }

    /**************************************************************************
     * Description 开始测试，保存测试记录
     *
     * @author lixueteng
     * @date 2018-01-24
     **************************************************************************/
    @Override
    public void saveTAssignmentItemMapping(Map<String, String[]> map, int assignmentId, Integer submitTime, UserVo userVo) {
        //获取user
        User user = userJPA.findOne(userVo.getUsername());
        //初始化当前时间
        Date date = new Date();
        // 获取试卷对象
        TAssignment tAssignment = tAssignmentJPA.findOne(assignmentId);

        if (submitTime != 0) {//若是提交，查询以前的最大提交数并加一,没有则为第一次提交
            List<TAssignmentGrading> tAssignmentGradings = tAssignmentGradingJPA.findTAssignmentGradingByIdAndUsername(assignmentId, userVo.getUsername());
            if (tAssignmentGradings.size() > 0) {
                submitTime = tAssignmentGradings.get(0).getSubmitTime() + 1;
            }
        }
        for (TAssignmentSection tAssignmentSection : tAssignment.getTAssignmentSections()) {
            for (TAssignmentItem tAssignmentItem : tAssignmentSection.getTAssignmentItems()) {
                String[] answers = map.get("answers" + tAssignmentItem.getId());
                String[] answertexts = map.get("answertexts" + tAssignmentItem.getId());
                if (answers != null && answers.length > 0) {
                    for (int i = 0; i < answers.length; i++) {
                        TAssignmentItemMapping tAssignmentItemMapping = new TAssignmentItemMapping();
                        //设置学生试卷相关的题目记录
                        tAssignmentItemMapping.setTAssignmentItem(tAssignmentItem);
                        //设置学生试卷对象记录
                        tAssignmentItemMapping.setTAssignment(tAssignment);
                        //设置学生试卷相关的考生对象
                        tAssignmentItemMapping.setUserByStudent(user);
                        //设置学生试卷相关的答案记录
                        if (!answers[i].equals("-1")) {
                            tAssignmentItemMapping.setTAssignmentAnswer(tAssignmentAnswerJPA.findOne(Integer.parseInt(answers[i])));
                        }
                        if (answertexts != null) {
                            //设置学生试卷相关的答案记录
                            tAssignmentItemMapping.setAnswerText(answertexts[i]);
                        }
                        //设置学生试卷相关的提交时间
                        tAssignmentItemMapping.setSubmitDate(date);
                        //记录学生试卷是保存还是提交
                        tAssignmentItemMapping.setSubmitTime(submitTime);
                        //默认成绩为0
                        tAssignmentItemMapping.setAutoscore(new Double(0));
                        //保存过程记录
                        tAssignmentItemMappingJPA.save(tAssignmentItemMapping);
                    }

                }

            }
        }
    }

    /**************************************************************************
     * Description 开始测试，测试成绩保存
     *
     * @author lixueteng
     * @date 2018-01-24
     **************************************************************************/
    @Override
    public Integer saveTAssignmentGrade(Map<String, String[]> answerMap, int assignmentId, Integer submitTime, BigDecimal totalScore, String username) {
        User user = userJPA.findOne(username);
        TAssignment tAssignment = tAssignmentJPA.findOne(assignmentId);
        if (submitTime != 0) {//若是提交，查询以前的最大提交数并加一,没有则为第一次提交
            List<TAssignmentGrading> tAssignmentGradings = tAssignmentGradingJPA.findTAssignmentGradingByIdAndUsername(assignmentId, username);
            if (tAssignmentGradings.size() > 0) {
                submitTime = tAssignmentGradings.size() + 1;
            }
        }

        TAssignmentGrading tAssignmentGrade = new TAssignmentGrading();

        //考试的学生
        tAssignmentGrade.setUserByStudent(user);
        //考试的试题对象
        tAssignmentGrade.setTAssignment(tAssignment);

        //}
        //改变提交次数
        tAssignmentGrade.setSubmitTime(submitTime);
        //提交测验的学生
        tAssignmentGrade.setUserByStudent(user);

        Integer islate = 0;//0表示正常提交
        Date submitDate = new Date();
        Date duedate = tAssignment.getTAssignmentControl().getDuedate();
        tAssignmentGrade.setIslate(0);
        tAssignmentGrade.setSubmitdate(submitDate);
        tAssignmentGrade = tAssignmentGradingJPA.save(tAssignmentGrade);

        // 定义总成绩变量
        float totalGrading = 0;

        // 获取分数
        for (TAssignmentSection tAssignmentSection : tAssignment.getTAssignmentSections()) {
            for (TAssignmentItem tAssignmentItem : tAssignmentSection.getTAssignmentItems()) {
                String[] answers = answerMap.get("answers" + tAssignmentItem.getId());
                String[] answertexts = answerMap.get("answertexts" + tAssignmentItem.getId());
                List<TAssignmentItemMapping> tAssignmentItemMappings = tAssignmentItemMappingJPA.getTAssignmentItemMapping(tAssignment.getId(), tAssignmentItem.getId(), username, submitTime);
                if (tAssignmentItemMappings != null && tAssignmentItemMappings.size() > 0) {
                    for (TAssignmentItemMapping mapping : tAssignmentItemMappings) {
                        mapping.setTAssignmentGrading(tAssignmentGrade);
                        tAssignmentItemMappingJPA.save(mapping);
                    }
                }

                ArrayList<String> answersArray = new ArrayList<String>();
                for (TAssignmentAnswer tAssignmentAnswer : tAssignmentItem.getTAssignmentAnswers()) {
                    // 多选题正确答案赋值到数组中
                    if (tAssignmentItem.getType() == 1 && tAssignmentAnswer.getIscorrect() == 1) {// 属于多选题并且是正确选项
                        if (answers != null && answers.length > 0) {
                            answersArray.add(tAssignmentAnswer.getId().toString());
                        }

                    }

                    // 对错题判断
                    if (tAssignmentItem.getType() == 2 && tAssignmentAnswer.getIscorrect() == 1) {
                        if (answers != null && answers.length > 0 && tAssignmentAnswer.getId() == Integer.parseInt(answers[0])) {
                            totalGrading = tAssignmentItem.getScore().floatValue() + totalGrading;
                            for (TAssignmentItemMapping tAssignmentItemMapping : tAssignmentItemMappings) {
                                tAssignmentItemMapping.setAutoscore(tAssignmentItem.getScore());
                                tAssignmentItemMappingJPA.save(tAssignmentItemMapping);
                            }
                            break;
                        }
                    }
                    // 单选题判断
                    if (tAssignmentItem.getType() == 4 && tAssignmentAnswer.getIscorrect() == 1) {
                        if (answers != null && answers.length > 0 && tAssignmentAnswer.getId() == Integer.parseInt(answers[0])) {
                            totalGrading = tAssignmentItem.getScore().floatValue() + totalGrading;
                            for (TAssignmentItemMapping tAssignmentItemMapping : tAssignmentItemMappings) {
                                tAssignmentItemMapping.setAutoscore(tAssignmentItem.getScore());
                                tAssignmentItemMappingJPA.save(tAssignmentItemMapping);
                            }
                            break;
                        }
                    }

                }
                // 填空题题判断
                if (tAssignmentItem.getType() == 8 && answers != null && answers.length > 0) {

                    int count = 0;
                    for (int i = 0; i < answers.length; i++) {//统计答对的填空数量
                        if (answertexts[i] != null && answertexts[i].equals(tAssignmentAnswerJPA.findOne(Integer.valueOf(answers[i])).getText())) {
                            count++;
                        }
                    }
                    if (count != 0) {//如果有答对的题，计入得分
                        BigDecimal itemScore = new BigDecimal(tAssignmentItem.getScore());
                        //以小题得分除以总空格数并乘以答对的空格数计算得分
                        totalGrading = itemScore.multiply(new BigDecimal(count)).divide(new BigDecimal(answers.length)).floatValue() + totalGrading;

                        for (TAssignmentItemMapping tAssignmentItemMapping : tAssignmentItemMappings) {
                            tAssignmentItemMapping.setAutoscore(itemScore.multiply(new BigDecimal(count)).divide(new BigDecimal(answers.length)).doubleValue());
                            tAssignmentItemMappingJPA.save(tAssignmentItemMapping);
                        }
                    }
                }

                if (tAssignmentItem.getType() == 1) {
                    // 判断多选题是否正确
                    int flag = 1;
                    if (answers != null && answers.length == answersArray.size()) {
                        for (String a : answers) {
                            // 变量answers，判断是否数组相等,多选或少选都算错
                            int flagPart = 0;
                            for (String b : answersArray) {
                                if (a.equals(b)) {
                                    flagPart = 1;
                                }

                            }
                            if (flagPart == 0) {
                                flag = 0;
                            }

                        }

                    } else {
                        flag = 0;
                    }
                    //
                    if (flag > 0) {
                        totalGrading = tAssignmentItem.getScore().floatValue() + totalGrading;
                        for (TAssignmentItemMapping tAssignmentItemMapping : tAssignmentItemMappings) {
                            tAssignmentItemMapping.setAutoscore(tAssignmentItem.getScore());
                            tAssignmentItemMappingJPA.save(tAssignmentItemMapping);
                        }
                    }
                }
            }
        }
        int iTotalGrading = (int) (totalGrading + 0.5);
        //获取总分
        //BigDecimal finalScore =  new BigDecimal(iTotalGrading).divide(totalScore,1,BigDecimal.ROUND_HALF_UP).multiply(new BigDecimal(100));
        tAssignmentGrade.setFinalScore((double) iTotalGrading);
        // 提交后返回作业列表
        TAssignmentGrading save = tAssignmentGradingJPA.save(tAssignmentGrade);
        return save.getAccessmentgradingId();
    }

    /**************************************************************************
     * Description 开始测试，保存成绩到成绩册
     *
     * @author lixueteng
     * @date 2018-01-24
     **************************************************************************/
    @Override
    public void saveGradebook(Integer cid, int assignmentId, Integer tAssignmentGradeId, UserVo userVo, String apiGateWayHost, String jwtToken) {
        TAssignmentGrading tAssignmentGrade = tAssignmentGradingJPA.findOne(tAssignmentGradeId);
        //根据id获取测验
        TAssignment tAssignment = tAssignmentJPA.findOne(assignmentId);
        //查询作业（或测验）的控制项
        TAssignmentControl tAssignmentControl = tAssignment.getTAssignmentControl();
        //如果成绩需要加入成绩册，则加入成绩册
        if ("yes".equals(tAssignmentControl.getToGradebook())) {
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.MULTIPART_FORM_DATA);
//            headers.add("Authorization",jwtToken);
//            ;
//            MultiValueMap<String, Object> params= new LinkedMultiValueMap<>();//参数放入一个map中，restTemplate不能用hashMap
//            params.add("siteId",cid);
//            params.add("assignmentId",assignmentId);
//            params.add("points",tAssignmentGrade.getFinalScore());
//            params.add("username",userVo.getUsername());
//            params.add("cname",userVo.getCname());
//            params.add(ClientDatabase.QUERY_KEY, clientDatabaseContext.getCurrentDataSourceDto().getSchoolName());
//            String url = apiGateWayHost + "/transcript/saveRecord";
            String jsonReturnVo = transcriptInterface.saveExamRecord(tAssignmentGrade.getTAssignment().getId().toString(), tAssignmentGrade.getFinalScore(), userVo.getUsername(), userVo.getCname());
            //将请求参数放入map中
//            HttpEntity<MultiValueMap<String, Object>> request = new HttpEntity<>(params,headers);//将参数和header组成一个请求
//            RestTemplate restTemplate = new RestTemplate();
//            JSONObject response = restTemplate.postForObject(url, request, JSONObject.class);
        }
    }

    /**************************************************************************
     *Description 查询普通用户可参与的考试
     * @author 刘博越
     * @date 2019年5月27日
     **************************************************************************/
    public List<TAssignment> findTAssignment(int siteId, String type, UserVo userVo) {
        String classNumber = "";
        if (userVo.getClassNumber() != null) {
            classNumber = userVo.getClassNumber();
        }
        //所有考试
        List<TAssignment> tAssignments = tAssignmentJPA.findStudentExams(siteId, type, classNumber);
        return tAssignments;
    }

    /**************************************************************************
     *Description 查询测试题目
     * @author 黄浩
     * @date 2020年10月20日
     **************************************************************************/
    @Override
    public TestSectionVO getTestDetail(Integer testId, Integer page, Integer pageSize) {
        TestSectionVO testSectionVO = new TestSectionVO();
        TAssignment one = tAssignmentJPA.findOne(testId);

        //Integer parentId = one.getTestParentId();
        //TAssignment parentAssignment = tAssignmentJPA.getOne(parentId);

        //获取t_assignment_section表
        Set<TAssignmentSection> tAssignmentSections = one.getTAssignmentSections();
        for (TAssignmentSection tAssignmentSection : tAssignmentSections) {
            testSectionVO.setSectionIndex(tAssignmentSection.getSequence());
            testSectionVO.setSectionTitle(tAssignmentSection.getDescription());
            testSectionVO.setAssignmentId(tAssignmentSection.getTAssignment().getId());
        }

        List<ExamItemVo> itemVoList = new ArrayList<>();
        List<TAssignmentItem> tAssignmentItems;

        Pageable pageable = null;
        if (page > 0) {
            pageable = PageRequest.of(page - 1, pageSize);
        }

        Page<TAssignmentItem> pageTAssignmentItems = tAssignmentItemJPA.findTAssignmentItemByExamId(testId, pageable);
        testSectionVO.setExamItemVoCount(pageTAssignmentItems.getTotalElements());
        tAssignmentItems = pageTAssignmentItems.getContent();

        //获取大项中对应的小题（获取t_assignment_item表）
        for (TAssignmentItem item : tAssignmentItems) {
            ExamItemVo itemVo = new ExamItemVo();
            itemVo.setDescription(item.getDescription());
            itemVo.setDescriptionTemp(item.getDescriptionTemp());
            itemVo.setId(item.getId());
            itemVo.setType(item.getType());
            itemVo.setScore(item.getScore());
            itemVo.setSequence(item.getSequence());
            itemVo.setFalg(item.getFlag());
            itemVo.setGapsNumber(item.getGapsNumber());
            itemVo.setIsOrder(item.getIsOrder());
            itemVo.setItemParent(item.getItemParent());
            List<TAssignmentAnswerDto> tAssignmentAnswerDtos = new ArrayList<>();
            if (item.getType() != 8) {
                Set<TAssignmentAnswer> tAssignmentAnswers = item.getTAssignmentAnswers();
                //tAssignmentAnswers中的项按照选项（A,B,C,D）进行排序，防止D选项为“以上3个都对”而不显示在最后一个
                Set<TAssignmentAnswer> orderedTAssignmentAnswers = new TreeSet<>((o1, o2) -> {
                    if (o1.getLabel() != null && !"".equals(o1.getLabel()) && o2.getLabel() != null && !"".equals(o2.getLabel())) {
                        return o1.getLabel().compareTo(o2.getLabel());
                    } else {
                        return 0;
                    }
                });
                orderedTAssignmentAnswers.addAll(tAssignmentAnswers);
                //获取t_assignment_answer表
                for (TAssignmentAnswer answer : orderedTAssignmentAnswers) {
                    TAssignmentAnswerDto answerDto = new TAssignmentAnswerDto();
                    answerDto.setText(answer.getText());
                    answerDto.setId(answer.getId());
                    answerDto.setLabel(answer.getLabel());
                    answerDto.setIscorrect(answer.getIscorrect());
                    if (item.getType() == 5) {
                        answerDto.setWeight(answer.getWeight());
                    }
                    if (answer.getScore() != null) {
                        answerDto.setScore(answer.getScore().doubleValue());
                    }
                    tAssignmentAnswerDtos.add(answerDto);
                }
            } else {
                Set<TAssignmentAnswer> tAssignmentAnswers = item.getTAssignmentAnswers();
                List<TAssignmentAnswer> list = new ArrayList<>();
                for (TAssignmentAnswer tAssignmentAnswer : tAssignmentAnswers) {
                    list.add(tAssignmentAnswer);
                }
                //根据id排序解决set无序问题
                Collections.sort(list, Comparator.comparing(TAssignmentAnswer::getId));
                for (TAssignmentAnswer answer : list) {
                    TAssignmentAnswerDto answerDto = new TAssignmentAnswerDto();
                    answerDto.setText(answer.getText());
                    answerDto.setId(answer.getId());
                    answerDto.setLabel(answer.getLabel());
                    answerDto.setIscorrect(answer.getIscorrect());
                    if (answer.getScore() != null) {
                        answerDto.setScore(answer.getScore().doubleValue());
                    }
                    tAssignmentAnswerDtos.add(answerDto);
                }
            }
            itemVo.setAnswertext(tAssignmentAnswerDtos);
            itemVoList.add(itemVo);
        }
        testSectionVO.setItemVoList(itemVoList);
        return testSectionVO;
    }

    @Override
    public TestSectionVO getTestDetailNew(Integer testId, Integer page, Integer pageSize) {
        TestSectionVO testSectionVO = new TestSectionVO();
        TAssignment one = tAssignmentJPA.findOne(testId);
        //获取t_assignment_section表
        Set<TAssignmentSection> tAssignmentSections = one.getTAssignmentSections();
        for (TAssignmentSection tAssignmentSection : tAssignmentSections) {
            testSectionVO.setSectionIndex(tAssignmentSection.getSequence());
            testSectionVO.setSectionTitle(tAssignmentSection.getDescription());
            testSectionVO.setAssignmentId(tAssignmentSection.getTAssignment().getId());
        }

        List<ExamItemVo> itemVoList = new ArrayList<>();
        List<TAssignmentItem> tAssignmentItems = new ArrayList<>();

        Pageable pageable = null;
        if (page > 0) {
            pageable = PageRequest.of(page - 1, pageSize);
        }
        Page<TAssignmentItem> pageTAssignmentItems = tAssignmentItemJPA.findTAssignmentItemByExamId(testId, pageable);
        testSectionVO.setExamItemVoCount(pageTAssignmentItems.getTotalElements());
        tAssignmentItems = pageTAssignmentItems.getContent();

        //获取大项中对应的小题（获取t_assignment_item表）
        for (TAssignmentItem item : tAssignmentItems) {
            ExamItemVo itemVo = new ExamItemVo();
            itemVo.setDescription(item.getDescription());
            itemVo.setDescriptionTemp(item.getDescriptionTemp());
            itemVo.setId(item.getId());
            itemVo.setType(item.getType());
            itemVo.setScore(item.getScore());
            itemVo.setSequence(item.getSequence());
            itemVo.setFalg(item.getFlag());
            itemVo.setGapsNumber(item.getGapsNumber());
            itemVo.setIsOrder(item.getIsOrder());
            itemVo.setItemParent(item.getItemParent());
            List<TAssignmentAnswerDto> tAssignmentAnswerDtos = new ArrayList<>();
            if (item.getType() != 8) {
                Set<TAssignmentAnswer> tAssignmentAnswers = item.getTAssignmentAnswers();
                //tAssignmentAnswers中的项按照选项（A,B,C,D）进行排序，防止D选项为“以上3个都对”而不显示在最后一个
                Set<TAssignmentAnswer> orderedTAssignmentAnswers = new TreeSet<TAssignmentAnswer>(new Comparator<TAssignmentAnswer>() {
                    @Override
                    public int compare(TAssignmentAnswer o1, TAssignmentAnswer o2) {
                        if (o1.getLabel() != null && !"".equals(o1.getLabel()) && o2.getLabel() != null && !"".equals(o2.getLabel())) {
                            return o1.getLabel().compareTo(o2.getLabel());
                        } else {
                            return 0;
                        }
                    }
                });
                orderedTAssignmentAnswers.addAll(tAssignmentAnswers);
                //获取t_assignment_answer表
                for (TAssignmentAnswer answer : orderedTAssignmentAnswers) {
                    TAssignmentAnswerDto answerDto = new TAssignmentAnswerDto();
                    answerDto.setText(answer.getText());
                    answerDto.setId(answer.getId());
                    answerDto.setLabel(answer.getLabel());
                    answerDto.setIscorrect(answer.getIscorrect());
                    if (item.getType() == 5) {
                        answerDto.setWeight(answer.getWeight());
                    }
                    if (answer.getScore() != null) {
                        answerDto.setScore(answer.getScore().doubleValue());
                    }
                    tAssignmentAnswerDtos.add(answerDto);
                }
            } else {
                Set<TAssignmentAnswer> tAssignmentAnswers = item.getTAssignmentAnswers();
                List<TAssignmentAnswer> list = new ArrayList<>();
                for (TAssignmentAnswer tAssignmentAnswer : tAssignmentAnswers) {
                    list.add(tAssignmentAnswer);
                }
                Collections.sort(list, new Comparator<TAssignmentAnswer>() {//根据id排序解决set无序问题
                    @Override
                    public int compare(TAssignmentAnswer arg0, TAssignmentAnswer arg1) {
                        return (arg0.getId()).compareTo(arg1.getId());
                    }
                });
                for (TAssignmentAnswer answer : list) {
                    TAssignmentAnswerDto answerDto = new TAssignmentAnswerDto();
                    answerDto.setText(answer.getText());
                    answerDto.setId(answer.getId());
                    answerDto.setLabel(answer.getLabel());
                    answerDto.setIscorrect(answer.getIscorrect());
                    if (answer.getScore() != null) {
                        answerDto.setScore(answer.getScore().doubleValue());
                    }
                    tAssignmentAnswerDtos.add(answerDto);
                }
            }
            itemVo.setAnswertext(tAssignmentAnswerDtos);
            itemVoList.add(itemVo);
        }
        testSectionVO.setItemVoList(itemVoList);
        return testSectionVO;
    }

    /**************************************************************************
     *Description 生成测试
     * @author 黄浩
     * @date 2020年10月20日
     **************************************************************************/
    @Override
    @Transactional
    public boolean copyTest(Integer sourceTestId, Integer targetSiteId, TestSectionVO testSectionVO, String username) {
//        try {
        Date now = new Date();
        User user = userJPA.findOne(username);
        //获取源数据的测试
        TAssignment tAssignment = tAssignmentJPA.findOne(sourceTestId);
        //获取新保存的测试
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
            //获取新保存的测试
            wkFolder = wkFolderJPA.findTestFolder(wkChapter.getId(), tAssignment.getTitle(), 5);
            testChapterType = wkChapter.getType();
            testWkChapterId = wkChapter.getId();
        } else {
            //获取目标小节
            WkLesson wkLesson = wkLessonJPA.findWkLessonBySiteIdAndTitle(targetSiteId, tAssignment.getWkFolder().getWkLesson().getTitle(), tAssignment.getWkFolder().getWkLesson().getWkChapter().getType());
            Integer siteId = wkLesson.getWkChapter().getTCourseSite().getId();
            //复制测试信息，存储过程参数:目标lessonId,源folderId
            Query query = entityManager.createNativeQuery("{call proc_copy_lesson_exam_folder(:lessonId ,:folderId,:targetSiteId)}");
            query.setParameter("lessonId", wkLesson.getId());
            query.setParameter("folderId", tAssignment.getWkFolder().getId());
            query.setParameter("targetSiteId", targetSiteId);
            query.executeUpdate();
            //获取新保存的测试
            wkFolder = wkFolderJPA.findTestLessonIdFolder(wkLesson.getId(), tAssignment.getTitle(), 5);
            testChapterType = wkLesson.getWkChapter().getType();
            testWkChapterId = wkLesson.getWkChapter().getId();
        }
        //复制t_assignment_section
        TAssignment newTAssignment = new TAssignment();
        for (TAssignment t : wkFolder.getTAssignments()) {
            newTAssignment = t;
        }
        TAssignmentSection tAssignmentSection = new TAssignmentSection();
        tAssignmentSection.setTAssignment(newTAssignment);
        tAssignmentSection.setSequence(testSectionVO.getSectionIndex());
        tAssignmentSection.setCreatedTime(now);
        tAssignmentSection.setUser(user);
        tAssignmentSection.setDescription(testSectionVO.getSectionTitle());
        tAssignmentSection.setStatus(1);
        tAssignmentSectionJPA.save(tAssignmentSection);
        for (ExamItemVo examItemVo : testSectionVO.getItemVoList()) {

            TAssignmentItem tAssignmentItem = new TAssignmentItem();
            tAssignmentItem.setTAssignmentSection(tAssignmentSection);
            tAssignmentItem.setDescription(examItemVo.getDescription());
            tAssignmentItem.setDescriptionTemp(examItemVo.getDescriptionTemp());
            tAssignmentItem.setScore(examItemVo.getScore());
            tAssignmentItem.setUser(user);
            tAssignmentItem.setCreatedTime(now);
            tAssignmentItem.setType(examItemVo.getType());
            tAssignmentItem.setItemParent(examItemVo.getItemParent());
            tAssignmentItem.setFlag(examItemVo.getFalg());
            tAssignmentItem.setGapsNumber(examItemVo.getGapsNumber());
            tAssignmentItem.setIsOrder(examItemVo.getIsOrder());
            tAssignmentItem.setTAssignmentQuestionpools(new HashSet<TAssignmentQuestionpool>());
            tAssignmentItem.setTAssignmentAnswers(new HashSet<TAssignmentAnswer>());
            tAssignmentItemJPA.save(tAssignmentItem);
            for (TAssignmentAnswerDto tAssignmentAnswerDto : examItemVo.getAnswertext()) {
                TAssignmentAnswer answer = new TAssignmentAnswer();
                answer.setTAssignmentItem(tAssignmentItem);
                answer.setText(tAssignmentAnswerDto.getText());
                answer.setLabel(tAssignmentAnswerDto.getLabel());
                answer.setIscorrect(tAssignmentAnswerDto.getIscorrect());
                if (tAssignmentAnswerDto.getScore() != null) {
                    answer.setScore(new BigDecimal(tAssignmentAnswerDto.getScore()));
                }
                if (examItemVo.getType() == 5) {
                    answer.setWeight(tAssignmentAnswerDto.getWeight());
                }
                tAssignmentAnswerJPA.save(answer);
            }
        }
//            tAssignmentService.createGradebook(targetSiteId, newTAssignment.getId(), testChapterType, testWkChapterId, apiGateWayHost, jwtToken);
        return true;
//        }catch (Exception e){
//            e.printStackTrace();
//            return false;
//        }
    }

    /**************************************************************************
     *Description 查询拥有课程复制后的相同章节或小节
     * @author 黄浩
     * @date 2020年10月21日
     **************************************************************************/
    @Override
    public List<TCourseSiteVo> findCopySite(Integer cid, Integer assignmentId) {
        List<TCourseSite> list = new ArrayList<>();
        List<TCourseSiteVo> results = new ArrayList<>();
        TAssignment tAssignment = tAssignmentJPA.findOne(assignmentId);
        if (tAssignment.getWkFolder().getWkChapter() != null) {
            //章节下的考试测试情况
            list = tCourseSiteJPA.findCopySiteByChapter(tAssignment.getWkFolder().getWkChapter().getName(), tAssignment.getWkFolder().getWkChapter().getType(), cid);
        } else if (tAssignment.getWkFolder().getWkChapter() == null && tAssignment.getWkFolder().getWkLesson() != null) {
            //小节下的考试测试情况
            list = tCourseSiteJPA.findCopySiteByChapter(tAssignment.getWkFolder().getWkLesson().getWkChapter().getName(), tAssignment.getWkFolder().getWkLesson().getWkChapter().getType(), cid);
        }
        for (TCourseSite tCourseSite : list) {
            TCourseSiteVo tCourseSiteVo = new TCourseSiteVo();
            tCourseSiteVo.setId(tCourseSite.getId());
            tCourseSiteVo.setTitle(tCourseSite.getTitle());
            tCourseSiteVo.setTermId(tCourseSite.getSchoolTerm().getId());
            tCourseSiteVo.setTermName(tCourseSite.getSchoolTerm().getTermName());
            results.add(tCourseSiteVo);
        }
        return results;
    }
}
