package net.gvsun.gsexam.service.exam;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import net.gvsun.common.LayTableVO;
import net.gvsun.gsexam.domain.*;
import net.gvsun.gsexam.dto.common.SchoolClassesVo;
import net.gvsun.gsexam.dto.common.SchoolVo;
import net.gvsun.gsexam.dto.common.UserVo;
import net.gvsun.gsexam.jpa.*;
import net.gvsun.gsexam.service.common.ShareService;
import net.gvsun.gsexam.utils.DateFormatUtil;
import net.gvsun.gsexam.utils.EmptyUtil;
import net.gvsun.gsexam.vo.admit.AdmissionVo;
import net.gvsun.gsexam.vo.admit.TimetableResult;
import net.gvsun.gsexam.vo.exam.ExamListVo;
import net.gvsun.gsexam.vo.exam.SchoolTermVO;
import net.gvsun.gsexam.vo.exam.TAssignmentGradingVO;
import net.gvsun.gsexam.vo.exam.TCourseSiteVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service("examListService")
public class ExamListServiceImpl implements ExamListService {
    @Autowired
    private TAssignmentJPA tAssignmentJPA;
    @Autowired
    private TAssignmentGradingJPA tAssignmentGradingJPA;
    @Autowired
    private TAssignmentAnswerAssignJPA tAssignmentAnswerAssignJPA;
    @Autowired
    private TAssignmentClassJPA tAssignmentClassJPA;
    @Autowired
    private SubscribeExamInfoJPA subscribeExamInfoJPA;
    @Autowired
    private SubscribeExamJPA subscribeExamJPA;
    @Autowired
    private ShareService shareService;
    @Autowired
    private TCourseSiteJPA tCourseSiteJPA;
    @Autowired
    private UserJPA userJPA;
    @Autowired
    private SchoolJPA schoolJPA;
    @Autowired
    private SchoolAcademyJPA schoolAcademyJPA;
    @Autowired
    private SchoolClassesJPA schoolClassesJPA;
    @Autowired
    private SchoolTermJPA schoolTermJPA;
    @Autowired
    private EntityManager entityManager;
    @Autowired
    private WkChapterJPA wkChapterJPA;
    @Autowired
    private TimetableAppointmentJPA timetableAppointmentJPA;
    @Autowired
    private SystemTimeJPA systemTimeJPA;
    @Autowired
    private SchoolWeekJPA schoolWeekJPA;
    @Autowired
    private SystemCampusJPA systemCampusJPA;
    @Autowired
    @Qualifier("datasourceRestTemplate")
    private RestTemplate restTemplate;


    /**************************************************************************
     * Description 查看已提交考试的成绩列表
     *
     * @author 魏诚
     * @date 2017-08-01
     **************************************************************************/
    @Override
    public List<ExamListVo> findExamList(int id, UserVo userVo, String authorityName, String type, Integer dictionary) {
        //获取该学生预约过的考试 在时间范围内
        //获取当前登录人的预约信息
        List<TAssignment> tAssignments = new ArrayList<TAssignment>();
        //dictionary：1 参数id为课程id;2 参数id为章节id;3 参数id为小节id
        switch (dictionary) {
            case 1: {
                if ("TEACHER".equals(authorityName)) {
                    TCourseSiteVo tCourseSiteVo = this.findCourseSiteById(id);
                    if (tCourseSiteVo.getTitle().equals("全校考试")) {
                        tAssignments = tAssignmentJPA.findTAssignmentExamBySiteIdAndSchoolAcademy(id, type, userVo.getAcademyNumber());
                        List<Integer> idList = tAssignments.stream().map(TAssignment::getId).collect(Collectors.toList());
                        List<TAssignment> makeUpExams = tAssignmentJPA.findStudentMakeUpExams(idList);
                        List<Integer> mExams = makeUpExams.stream().map(TAssignment::getId).collect(Collectors.toList());
                        while (mExams.size()!=0){
                            List<TAssignment> makeExams = tAssignmentJPA.findStudentMakeUpExams(mExams);
                            makeUpExams.addAll(makeExams);
                            mExams = makeExams.stream().map(TAssignment::getId).collect(Collectors.toList());
                        }
                        if (makeUpExams.size()>0) {
                            tAssignments.addAll(makeUpExams);
                        }
                        tAssignments = tAssignments.stream().sorted(Comparator.comparing(TAssignment::getId).reversed()).collect(Collectors.toList());
                    } else {
                        tAssignments = tAssignmentJPA.findTAssignmentExamBySiteId(id, type);
                    }
                } else if ("SUPERADMIN".equals(authorityName)) {
                    tAssignments = tAssignmentJPA.findTAssignmentExamBySiteId(id, type);
                } else {
                    TCourseSiteVo tCourseSiteVo = this.findCourseSiteById(id);
                    if (tCourseSiteVo.getTitle().equals("全校考试")) {
                        tAssignments = this.findTAssignment(id, type, userVo);
                    }else {
                        tAssignments = tAssignmentJPA.findTAssignmentExamByStudentAndSiteId(id, type);
                    }
                }
                break;
            }
            case 2: {
                tAssignments = tAssignmentJPA.findByChapterIdAndType(id, "exam");
                break;
            }
            case 3: {
                tAssignments = tAssignmentJPA.findByLessonIdAndType(id, "exam");
                break;
            }
            default:
        }

        List<ExamListVo> examListDtos = new ArrayList<ExamListVo>();
        for (TAssignment tAssignment : tAssignments) {
            ExamListVo examListDto = new ExamListVo();
            examListDto.setId(tAssignment.getId());
            examListDto.setIsMakeUpExam(tAssignment.getIsMakeUpExam());
            examListDto.setOldAssignmentId(tAssignment.getOldAssignmentId());
            examListDto.setStartTime(tAssignment.getTAssignmentControl().getStartdate());
            examListDto.setQrcodeUrl(tAssignment.getQrcodeUrl());
            examListDto.setCreatedBy(tAssignment.getUser().getCname());
            //将数据库的时间类型转String
            if (tAssignment.getTAssignmentControl().getStartdate() != null) {
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                String date = sdf.format(tAssignment.getTAssignmentControl().getStartdate());
                examListDto.setStartTime1(date);
            }
            examListDto.setDueTime(tAssignment.getTAssignmentControl().getDuedate());
            //将数据库的时间类型转String
            if (tAssignment.getTAssignmentControl().getDuedate() != null) {
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                String date = sdf.format(tAssignment.getTAssignmentControl().getDuedate());
                examListDto.setDueTime1(date);
            }
            examListDto.setTitle(tAssignment.getTitle());
            examListDto.setStatus(tAssignment.getStatus());
            examListDto.setAcademyNumber(tAssignment.getSchoolAcademy());
            examListDto.setTimes(tAssignmentGradingJPA.countTAssignmentGradingById(tAssignment.getId(), userVo.getUsername()));
            examListDto.setMin(tAssignment.getMins());
            examListDto.setLimitTime(tAssignment.getTAssignmentControl().getTimelimit());
            examListDto.setCid(tAssignment.getSiteId());
            //获取考试对应班级
            if ("exam".equals(type)) {
                List<SchoolClassesVo> schoolClassesVoList = new ArrayList<>();
                List<TAssignmentClass> tAssignmentClassList = tAssignmentClassJPA.findAssignmentClassById(tAssignment.getId());
                if (tAssignmentClassList.size() > 0) {
                    for (TAssignmentClass tAssignmentClass : tAssignmentClassList) {
                        SchoolClassesVo schoolClassesVo = new SchoolClassesVo();
                        if (tAssignmentClass != null && tAssignmentClass.getSchoolClass() != null) {
                            schoolClassesVo.setClassNumber(tAssignmentClass.getSchoolClass().getClassNumber());
                        }
                        schoolClassesVoList.add(schoolClassesVo);
                    }
                }
                examListDto.setSchoolClass(schoolClassesVoList);
            }

            //如果是补考，获取对应补考名单
            if ("1".equals(tAssignment.getIsMakeUpExam())) {
                //获取成绩不合格补考名单
                Double passingScore = tAssignmentAnswerAssignJPA.findTAssignmentAnswerAssignByExamId(tAssignment.getOldAssignmentId()).getPassingScore();
                List<TAssignmentGradingVO> tAssignmentGradingVOList = new ArrayList<>();
                List<TAssignmentGrading> tAssignmentGradingList = tAssignmentGradingJPA.findTAssignmentGradingById(tAssignment.getOldAssignmentId(), passingScore);
                if (tAssignmentGradingList.size() > 0) {
                    for (TAssignmentGrading tAssignmentGrading : tAssignmentGradingList) {
                        TAssignmentGradingVO tAssignmentGradingVO = new TAssignmentGradingVO();
                        tAssignmentGradingVO.setTitle(tAssignmentGrading.getTAssignment().getTitle());
                        tAssignmentGradingVO.setUsername(tAssignmentGrading.getUserByStudent().getUsername());
                        tAssignmentGradingVO.setCname(tAssignmentGrading.getUserByStudent().getCname());
                        tAssignmentGradingVO.setScore(tAssignmentGrading.getFinalScore());
                        tAssignmentGradingVOList.add(tAssignmentGradingVO);
                    }
                }
                //获取未参加考试补考名单
                List<UserVo> notTakeExamUserList;
                if(tCourseSiteJPA.getOne(id).getTitle().equals("全校考试")){
                    notTakeExamUserList = this.findNotTakeExamListByExamIdAllSchool(tAssignment.getOldAssignmentId());
                }else{
                    notTakeExamUserList = this.findNotTakeExamListByExamId(tAssignment.getOldAssignmentId(),id);
                }
                if (notTakeExamUserList.size() > 0) {
                    for (UserVo u : notTakeExamUserList) {
                        TAssignmentGradingVO tAssignmentGradingVO = new TAssignmentGradingVO();
                        tAssignmentGradingVO.setTitle(tAssignment.getTitle());
                        tAssignmentGradingVO.setUsername(u.getUsername());
                        tAssignmentGradingVO.setCname(u.getCname());
                        tAssignmentGradingVOList.add(tAssignmentGradingVO);
                    }
                }
                examListDto.settAssignmentGrading(tAssignmentGradingVOList);
            }
            if("STUDENT".equals(authorityName)){
                //过滤掉当前用户已经通过的考试，补考就不再显示
                List<TAssignmentGradingVO> tagVos = examListDto.gettAssignmentGrading();
                Boolean flag = false;
                if(tagVos!=null && tagVos.size()>0){
                    for (TAssignmentGradingVO tagVo : tagVos) {
                        if(userVo.getUsername().equals(tagVo.getUsername())) {
                            flag = true;
                        }
                    }
                    if(!flag){
                        continue;
                    }
                }
            }
            //判断是否是来自预约考试
            if (tAssignment.getSubScribeExamId() != null && tAssignment.getSubScribeExamId() != -1) {
                //获取当前考试的预约考试
                SubscribeExam subscribeExam = subscribeExamJPA.findOne(tAssignment.getSubScribeExamId());
                if ("TEACHER".equals(authorityName)) {
                    examListDtos.add(examListDto);
                } else {
                    //获取当前预约考试的信息列表
                    List<SubscribeExamInfo> subscribeExamInfos = subscribeExamInfoJPA.getExamStatusByusernameAndId(subscribeExam.getId(), userVo.getUsername());
                    if (subscribeExamInfos.size() > 0) {
                        examListDtos.add(examListDto);
                    }
                }
            } else {
                //普通的考试 所有的人都可以开始考试
                examListDtos.add(examListDto);
            }
        }
        //获取当前登录用户
        return examListDtos;
    }

    /**************************************************************************
     * Description 查看补考名单
     *
     * @author 洪春莹
     * @date 2018-12-14
     **************************************************************************/
    @Override
    public List<TAssignmentGradingVO> makeupExamStudentList(Integer examId,Integer siteId) {
        List<TAssignmentGradingVO> tAssignmentGradingVOList = new ArrayList<>();
        //获取及格成绩
        Double passingScore = tAssignmentAnswerAssignJPA.findTAssignmentAnswerAssignByExamId(examId).getPassingScore();
        //获取通过学生名单
        List<String> passingList = tAssignmentGradingJPA.findPassingStudentById(examId, passingScore);
        //查找所有成绩低于及格线的成绩记录
        List<TAssignmentGrading> tAssignmentGradingList = tAssignmentGradingJPA.findTAssignmentGradingById(examId, passingScore);
        String tassignmentTitle = tAssignmentJPA.findOne(examId).getTitle() == null ? "" : tAssignmentJPA.findOne(examId).getTitle();
        //添加所有不及格成绩记录
        for (TAssignmentGrading tAssignmentGrading : tAssignmentGradingList) {
            if (!passingList.contains(tAssignmentGrading.getUserByStudent().getUsername())) {
                TAssignmentGradingVO tAssignmentGradingVO = new TAssignmentGradingVO();
                tAssignmentGradingVO.setTitle(tassignmentTitle);
                tAssignmentGradingVO.setUsername(tAssignmentGrading.getUserByStudent().getUsername());
                tAssignmentGradingVO.setCname(tAssignmentGrading.getUserByStudent().getCname());
                tAssignmentGradingVO.setScore(tAssignmentGrading.getFinalScore());
                tAssignmentGradingVOList.add(tAssignmentGradingVO);
            }
        }
        /*//查找所有完成考试的名单
        List<String> finishExamList = tAssignmentGradingJPA.findAllStudentById(examId);
        //查找所有应参加考试的人员名单
        List<UserVo> examAllStudentList = this.findAllStudentByExamId(examId);*/
        //查找所有未参加考试名单
        List<UserVo> examNotTakeList;
        if(tCourseSiteJPA.getOne(siteId).getTitle().equals("全校考试")){
            examNotTakeList = this.findNotTakeExamListByExamIdAllSchool(tAssignmentJPA.getOne(examId).getOldAssignmentId());
        }else{
            examNotTakeList = this.findNotTakeExamListByExamId(tAssignmentJPA.getOne(examId).getOldAssignmentId(),siteId);
        }
        //添加所有未参加考试记录
        for (UserVo u : examNotTakeList) {
            TAssignmentGradingVO tAssignmentGradingVO = new TAssignmentGradingVO();
            tAssignmentGradingVO.setTitle(tassignmentTitle);
            tAssignmentGradingVO.setUsername(u.getUsername());
            tAssignmentGradingVO.setCname(u.getCname());
            tAssignmentGradingVOList.add(tAssignmentGradingVO);
        }
        return tAssignmentGradingVOList;
    }

    /**************************************************************************
     * Description 查找考试成员列表
     * @author 洪春莹
     * @date 2018年12月17日
     **************************************************************************/
    @Override
    public List<UserVo> findAllStudent(String username, String cname, Integer currpage) {
        List<UserVo> userVoList = new ArrayList<>();
        String sql = "select t from User t where 1=1";
        if (!EmptyUtil.isEmpty(cname)) {
            sql += "and t.cname like '%" + cname + "%'";
        }
        if (!EmptyUtil.isEmpty(username)) {
            sql += "and t.username like '%" + username + "%'";
        }
        Query query = entityManager.createQuery(sql);
        query.setFirstResult((currpage - 1) * 20).setMaxResults(20);
        List<User> users = query.getResultList();
        for (User user : users) {
            UserVo userVo = new UserVo();
            userVo.setUsername(user.getUsername());
            userVo.setCname(user.getCname());
            if (user.getUserSexy() != null && user.getUserSexy().equals("1")) {
                userVo.setSex("男");
            } else {
                userVo.setSex("女");
            }
            //用户权限
            userVo.setAuthorityVoList(shareService.findAuthByUsername(user.getUsername()));
            //学院
            if (user.getSchoolAcademy() != null) {
                userVo.setSchoolAcademy(user.getSchoolAcademy().getAcademyNumber());
                userVo.setAcademyName(user.getSchoolAcademy().getAcademyName());
            }
            //班级
            if (user.getSchoolClass() != null) {
                userVo.setSchoolClass(user.getSchoolClass().getClassNumber());
                userVo.setClassName(user.getSchoolClass().getClassName());
            }
            userVoList.add(userVo);
        }
        return userVoList;
    }

    /**************************************************************************
     * Description 考试成员列表数量
     * @author 洪春莹
     * @date 2018年12月20日
     **************************************************************************/
    @Override
    public Integer countStudentList(String username, String cname) {
        String sql = "select count(t) from User t where 1=1";
        if (!EmptyUtil.isEmpty(cname)) {
            sql += "and t.cname like '%" + cname + "%'";
        }
        if (!EmptyUtil.isEmpty(username)) {
            sql += "and t.username like '%" + username + "%'";
        }
        Query query = entityManager.createQuery(sql);
        Long count = (Long) query.getSingleResult();

        return count.intValue();

    }

    /**************************************************************************
     * Description 保存补考添加的学生
     * @author 洪春莹
     * @date 2018-12-19
     **************************************************************************/
    @Override
    public void saveStudentToExam(Integer examId, String[] username) {
        int a = username.length;
        //获取选中需要添加的学生
        List<User> userList = userJPA.findStudentByUsername(username);
        for (int i = 0; i < a; i++) {
            List<TAssignmentGrading> tAssignmentGradings = tAssignmentGradingJPA.findTAssignmentGradingByIdAndUsername(examId, username[i]);
            if (tAssignmentGradings.size() == 0) {
                for (User user : userList) {
                    //获取到的学生信息保存到成绩表里，成绩置为0
                    TAssignmentGrading tAssignmentGrading = new TAssignmentGrading();
                    //保存考试id
                    tAssignmentGrading.setTAssignment(tAssignmentJPA.findOne(examId));
                    //保存时间
                    Calendar calendar = Calendar.getInstance();
                    Date date = calendar.getTime();
                    tAssignmentGrading.setSubmitdate(date);
                    //保存学号
                    tAssignmentGrading.setUserByStudent(user);
                    //保存成绩
                    tAssignmentGrading.setFinalScore(0.0);
                    tAssignmentGradingJPA.save(tAssignmentGrading);
                }
            }

        }

    }

    /**************************************************************************
     * Description 站点动态获取
     *
     * @author 李雪腾
     * @date 2017-10-18
     * @return 站点集合
     **************************************************************************/
    @Override
    public List<TCourseSiteVo> findAllTCourseSite(String search) {
        if (Objects.isNull(search)){
            search = "";
        }
        List<TCourseSiteVo> tCourseSiteVoList = new ArrayList<>();
        List<TCourseSite> tCourseSiteList = tCourseSiteJPA.findAllTCourseSiteByStatus(1,"%"+search+"%");
        for (TCourseSite tCourseSite : tCourseSiteList) {
            TCourseSiteVo tCourseSiteVo = new TCourseSiteVo();
            tCourseSiteVo.setId(tCourseSite.getId()).setTitle(tCourseSite.getTitle());
            tCourseSiteVoList.add(tCourseSiteVo);
        }
        return tCourseSiteVoList;
    }

    /**************************************************************************
     * Description 站点动态获取并分页
     *
     * @author 李雪腾
     * @date 2017-10-18
     * @return 站点集合
     **************************************************************************/
    @Override
    public LayTableVO<List<TCourseSiteVo>> findAllTCourseSitePage(Integer page, Integer limit, String search) {
        if (Objects.isNull(search)){
            search = "";
        }
        List<TCourseSiteVo> tCourseSiteVoList = new ArrayList<>();
        List<TCourseSite> tCourseSiteList = tCourseSiteJPA.findAllTCourseSiteByStatusPage(1,"%"+search+"%",(page-1)*limit,limit);
        for (TCourseSite tCourseSite : tCourseSiteList) {
            TCourseSiteVo tCourseSiteVo = new TCourseSiteVo();
            tCourseSiteVo.setId(tCourseSite.getId()).setTitle(tCourseSite.getTitle());
            tCourseSiteVoList.add(tCourseSiteVo);
        }
        Integer total = tCourseSiteJPA.findAllTCourseSiteByStatus(1,"%"+search+"%").size();
        return LayTableVO.ok(tCourseSiteVoList,Long.valueOf(total));
    }

    /**************************************************************************
     *Description 查询全部站点
     * @author 曹焕
     * @date 2019年8月29日
     * **************************************************************************/
    @Override
    public List<TCourseSiteVo> findAllSite(String search) {
        if (Objects.isNull(search)){
            search = "";
        }
        List<TCourseSiteVo> tCourseSiteVoList = new ArrayList<>();
        List<TCourseSite> tCourseSiteList = tCourseSiteJPA.findAllTCourseSiteByStatus(1,"%"+search+"%");
        for (TCourseSite tCourseSite : tCourseSiteList) {
            TCourseSiteVo tCourseSiteVo = new TCourseSiteVo();
            tCourseSiteVo.setId(tCourseSite.getId()).setTitle(tCourseSite.getTitle());
            tCourseSiteVo.setTermName(tCourseSite.getSchoolTerm().getTermName());
            tCourseSiteVo.setCname(tCourseSite.getUserByCreatedBy().getCname());
            tCourseSiteVo.setIsopen(tCourseSite.getIsOpen());
            tCourseSiteVoList.add(tCourseSiteVo);
        }
        return tCourseSiteVoList;
    }

    /**************************************************************************
     *Description 通过id查找站点
     * @author 曹焕
     * @date 2019年8月29日
     * **************************************************************************/
    @Override
    public TCourseSiteVo findCourseSiteById(Integer siteId) {
        TCourseSite tCourseSite = tCourseSiteJPA.findOne(siteId);
        TCourseSiteVo tCourseSiteVo = new TCourseSiteVo();
        tCourseSiteVo.setSiteCode(tCourseSite.getSiteCode());
        tCourseSiteVo.setId(tCourseSite.getId());
        tCourseSiteVo.setTitle(tCourseSite.getTitle());
        tCourseSiteVo.setIsopen(tCourseSite.getIsOpen());
        if (tCourseSite.getUserByCreatedBy() != null) {
            tCourseSiteVo.setUserByCreatedBy(tCourseSite.getUserByCreatedBy().getUsername());
        }
        if (tCourseSite.getSchoolTerm() != null) {
            tCourseSiteVo.setTermId(tCourseSite.getSchoolTerm().getId());
        }
        return tCourseSiteVo;
    }

    /**************************************************************************
     *Description 通过id查找学期
     * @author 曹焕
     * @date 2019年8月29日
     * **************************************************************************/
    @Override
    public SchoolTermVO findSchoolTermById(Integer termId) {
        SchoolTerm schoolTerm = schoolTermJPA.findOne(termId);
        SchoolTermVO schoolTermVO = new SchoolTermVO();
        schoolTermVO.setTermStart(schoolTerm.getTermStart().toString());
        schoolTermVO.setTermEnd(schoolTerm.getTermEnd().toString());
        schoolTermVO.setId(schoolTerm.getId());
        schoolTermVO.setTermName(schoolTerm.getTermName());
        schoolTermVO.setTermCode(schoolTerm.getTermCode());
        schoolTermVO.setYearCode(schoolTerm.getYearCode());
        return schoolTermVO;
    }

    /**************************************************************************
     *Description 保存站点
     * @author 曹焕
     * @date 2019年8月29日
     * **************************************************************************/
    @Override
    public void saveTCourseSite(TCourseSiteVo tCourseSiteVo) {
        TCourseSite tCourseSite = new TCourseSite();
        if (tCourseSiteVo.getId() != null) {
            tCourseSite = tCourseSiteJPA.findOne(tCourseSiteVo.getId());
        }
        tCourseSite.setStatus(1);
        tCourseSite.setIsOpen(1);
        tCourseSite.setTitle(tCourseSiteVo.getTitle());
        tCourseSite.setSiteCode(tCourseSiteVo.getSiteCode());
        tCourseSite.setSchoolTerm(schoolTermJPA.findOne(tCourseSiteVo.getTermId()));
        tCourseSite.setUserByCreatedBy(userJPA.findOne(tCourseSiteVo.getUserByCreatedBy()));
        tCourseSiteJPA.save(tCourseSite);
    }

    /**************************************************************************
     *Description 保存学期
     * @author 曹焕
     * @date 2019年8月29日
     * **************************************************************************/
    @Override
    public void saveSchoolTerm(SchoolTermVO schoolTermVO) throws Exception {
        SchoolTerm schoolTerm = new SchoolTerm();
        if (schoolTermVO.getId() != null) {
            schoolTerm = schoolTermJPA.findOne(schoolTermVO.getId());
        }
        schoolTerm.setTermCode(schoolTermVO.getTermCode());
        schoolTerm.setYearCode(schoolTermVO.getYearCode());
        schoolTerm.setTermName(schoolTermVO.getTermName());
        schoolTerm.setTermStart(new SimpleDateFormat("yyyy-MM-dd").parse(schoolTermVO.getTermStart()));
        schoolTerm.setTermEnd(new SimpleDateFormat("yyyy-MM-dd").parse(schoolTermVO.getTermEnd()));
        schoolTermJPA.save(schoolTerm);
    }

    /**************************************************************************
     *Description 查找全部学期
     * @author 曹焕
     * @date 2019年8月29日
     * **************************************************************************/
    @Override
    public List<SchoolTermVO> findAllSchoolTerm() {
        List<SchoolTermVO> schoolTermVOList = new ArrayList<>();
        List<SchoolTerm> schoolTermList = schoolTermJPA.findAllTerm();
        for (SchoolTerm schoolTerm : schoolTermList) {
            SchoolTermVO schoolTermVO = new SchoolTermVO();
            schoolTermVO.setId(schoolTerm.getId());
            schoolTermVO.setTermName(schoolTerm.getTermName());
            schoolTermVO.setTermEnd(schoolTerm.getTermEnd().toString());
            schoolTermVO.setTermStart(schoolTerm.getTermStart().toString());
            schoolTermVOList.add(schoolTermVO);
        }
        return schoolTermVOList;
    }

    @Override
    public List<UserVo> findAllTeacherByAuthor() {
        String sql = "SELECT DISTINCT u.username,u.cname from user u INNER JOIN user_authority  ua on u.username=ua.user_id where ua.authority_id in(2)";
        Query query = entityManager.createNativeQuery(sql);
        List<Object[]> d = query.getResultList();
        List<UserVo> userVos = new ArrayList<>();
        for (Object[] o : d) {
            UserVo userVo = new UserVo();
            userVo.setCname(o[1].toString());
            userVo.setUsername(o[0].toString());
            userVos.add(userVo);
        }
        return userVos;
    }


    /**************************************************************************
     * Description 查找所有已提交并已过时的考试
     *
     * @author 洪春莹
     * @date 2018-12-13
     **************************************************************************/
    @Override
    public List<ExamListVo> findMakeUpExamList(Integer siteId) {
        List<ExamListVo> examListDtos = new ArrayList<ExamListVo>();
        //当前时间
        Calendar calendar = Calendar.getInstance();
        Date date1 = calendar.getTime();
        //获取可以补考的考试（所有已发布并过时的）
        List<TAssignment> tAssignments = tAssignmentJPA.findTAssignmentExamByStudentAndSiteId(siteId, "exam");
        for (TAssignment tAssignment : tAssignments) {
            if (tAssignment.getTAssignmentControl().getDuedate().before(date1)) {
                ExamListVo examListDto = new ExamListVo();
                examListDto.setId(tAssignment.getId());
                examListDto.setStartTime(tAssignment.getTAssignmentControl().getStartdate());
                examListDto.setDueTime(tAssignment.getTAssignmentControl().getDuedate());
                examListDto.setTitle(tAssignment.getTitle());
                examListDto.setStatus(tAssignment.getStatus());
                examListDto.setAcademyNumber(tAssignment.getSchoolAcademy());
                examListDtos.add(examListDto);
            }
        }
        return examListDtos;
    }

    /*************************************************************************************
     * Description:个人信息
     *
     * @author： 洪春莹
     * @date：2019-3-11
     *************************************************************************************/
    @Override
    public UserVo findUserByUserName(String userName) {
        User user = userJPA.findOne(userName);
        UserVo userVo = new UserVo();
        //姓名
        userVo.setCname(user.getCname());
        //用户名
        userVo.setUsername(user.getUsername());
        //性别
        if ("1".equals(user.getUserSexy())) {
            userVo.setSex("男");
        } else {
            userVo.setSex("女");
        }
        //学院
        if (user.getSchoolAcademy() != null) {
            userVo.setSchoolAcademy(user.getSchoolAcademy().getAcademyNumber());
            userVo.setAcademyName(user.getSchoolAcademy().getAcademyName());
        }
        //班级
        if (user.getSchoolClass() != null) {
            userVo.setSchoolClass(user.getSchoolClass().getClassNumber());
            userVo.setClassName(user.getSchoolClass().getClassName());
        }
        //个人信息图片url
        userVo.setPhotoUrl(user.getPhotoUrl());
        return userVo;
    }

    /*************************************************************************************
     * Description:保存个人信息
     *
     * @author： 洪春莹
     * @date：2019-3-12
     *************************************************************************************/
    @Override
    public void saveUserInfo(UserVo userVo) {
        User user = userJPA.findOne(userVo.getUsername());
        if (user == null) {
            user = new User();
        }
        //设置学号
        if (userVo.getUsername() != null && userVo.getUsername() != "") {
            user.setUsername(userVo.getUsername());
        }
        //设置姓名
        if (userVo.getCname() != null && userVo.getCname() != "") {
            user.setCname(userVo.getCname());
        }
        //设置学院
        if (userVo.getSchoolAcademy() != null && userVo.getSchoolAcademy() != "") {
            user.setSchoolAcademy(schoolAcademyJPA.getSchoolAcademiesByAcademyNumber(userVo.getSchoolAcademy()));
        }
        //设置班级
        if (userVo.getSchoolClass() != null && userVo.getSchoolClass() != "") {
            user.setSchoolClass(schoolClassesJPA.getSchoolClassByClassNumber(userVo.getSchoolClass()));
        }
        //设置性别
        if (userVo.getSex() != null && userVo.getSex() != "") {
            user.setUserSexy(userVo.getSex());
        }
        userJPA.save(user);

    }

    /*************************************************************************************
     * Description:个人中心--保存个人照片
     *
     * @author： 洪春莹
     * @date：2019-3-18
     *************************************************************************************/
    @Override
    public void saveMyInfoPhoto(UserVo userVo, String fileid) {
        User user = userJPA.findOne(userVo.getUsername());
        user.setPhotoUrl(fileid);
        userJPA.save(user);
    }

    /**************************************************************************
     * Description 个人中心-个人信息(图片删除)
     *
     * @author 曹焕
     * @date 2018年8月24日
     **************************************************************************/
    @Override
    public void deleteImg(String username) {
        User user = userJPA.findOne(username);
        user.setPhotoUrl(null);
        userJPA.save(user);
    }

    /*************************************************************************************
     * Description:证书信息
     *
     * @author： 洪春莹
     * @date：2019-3-14
     *************************************************************************************/
    @Override
    public SchoolVo findSchoolByProjectName(String projectName) {
        School school = schoolJPA.selectFirst();
        SchoolVo schoolVo = new SchoolVo();
        if (school != null) {
            //学校编号
            schoolVo.setNumber(school.getNumber());
            //学校名称
            schoolVo.setName(school.getName());
            //项目名称（配置项）
            schoolVo.setProjectName(projectName);
            //证书名称
            schoolVo.setTitle(school.getTitle());
            //编号前缀
            schoolVo.setPrefix(school.getPrefix());
            //学校公章图片
            schoolVo.setPhotoUrl(school.getPhotoUrl());
        }
        return schoolVo;
    }

    /*************************************************************************************
     * Description:保存证书信息
     *
     * @author： 洪春莹
     * @date：2019-3-14
     *************************************************************************************/
    @Override
    public void saveCertificate(SchoolVo schoolVo, String projectName) {
        School school = schoolJPA.findSchoolByProjectName(projectName);
        //学校名称
        if (schoolVo.getName() != null && schoolVo.getName() != "") {
            school.setName(schoolVo.getName());
        }
        //证书名称
        if (schoolVo.getTitle() != null && schoolVo.getTitle() != "") {
            school.setTitle(schoolVo.getTitle());
        }
        //编号前缀
        if (schoolVo.getPrefix() != null && schoolVo.getPrefix() != "") {
            school.setPrefix(schoolVo.getPrefix());
        }

        schoolJPA.save(school);

    }

    /*************************************************************************************
     * Description:证书设置--保存公章照片
     *
     * @author： 洪春莹
     * @date：2019-3-18
     *************************************************************************************/
    @Override
    public void saveSchoolPhoto(SchoolVo schoolVo, String fileid) {
        School school = schoolJPA.selectFirst();
        school.setPhotoUrl(fileid);
        schoolJPA.save(school);
    }

    /**************************************************************************
     *Description 证书设置-图片删除
     * @author 洪春莹
     * @date 2019年3月19日
     **************************************************************************/
    @Override
    public void deleteSchoolImg(String projectName) {
        School school = schoolJPA.findSchoolByProjectName(projectName);
        school.setPhotoUrl(null);
        schoolJPA.save(school);
    }

    /**************************************************************************
     * Description 查找未参加考试对象名单（不分页）（普通考试）
     *
     * @author 刘博越
     * @date 2019-6-24
     **************************************************************************/
    public List<UserVo> findNotTakeExamListByExamId(Integer assignmentId,Integer siteId) {
        String sql = "SELECT DISTINCT\n" +
                "\t( username ) \n" +
                "FROM\n" +
                "\tt_course_site_user \n" +
                "WHERE\n" +
                "\tsite_id =:siteId \n" +
                "\tAND username NOT IN (\n" +
                "\tSELECT DISTINCT\n" +
                "\t\t( student ) \n" +
                "\tFROM\n" +
                "\t\tt_assignment_grading \n" +
                "WHERE\n" +
                "\tassignment_id =:assignmentId)";
        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("assignmentId",assignmentId);
        query.setParameter("siteId",siteId);
        List<String> list = query.getResultList();
        List<UserVo> studentList = new ArrayList<>();
        list.forEach(s -> {
            UserVo u = new UserVo();
            User user = userJPA.getOne(s);
            u.setUsername(s);
            u.setCname(user.getCname());
            studentList.add(u);
        });
        return studentList;
    }

    /**************************************************************************
     * Description 查找未参加考试对象名单（不分页）（全校考试）
     *
     * @author 刘博越
     * @date 2019-6-24
     **************************************************************************/
    public List<UserVo> findNotTakeExamListByExamIdAllSchool(Integer examId) {
        String sql = "SELECT distinct username,cname FROM `user` WHERE classes_number in \n" +
                "(SELECT class_number FROM t_assignment_class WHERE assignment_id =:assignmentId)\n" +
                "and username not in (SELECT student FROM t_assignment_grading WHERE assignment_id =:assignmentId)";
        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("assignmentId",examId);
        List<Object[]> objects = query.getResultList();
        List<UserVo> studentList = new ArrayList<>();
        for (Object[] o : objects) {
            UserVo u = new UserVo();
            u.setUsername(o[0].toString());
            u.setCname(o[1].toString());
            studentList.add(u);
        }
        return studentList;
    }

    /**************************************************************************
     * Description 查找未参加考试对象名单数量
     *
     * @author 刘博越
     * @date 2019-6-4
     **************************************************************************/
    @Override
    public Integer countNotTakeExamList(Integer examId,String search,Integer cid) {
        String sql = "select DISTINCT(u.username),u.cname from user u join t_course_site_user tcsu on u.username = tcsu.username " +
                " left join t_assignment_grading ag on u.username=ag.student" +
                " where tcsu.site_id =:siteId and u.user_status = 1 and ag.assignment_id !=:assignmentId ";
        if (!EmptyUtil.isEmpty(search)) {
            sql += " and (u.username like CONCAT('%',:search,'%') or u.cname like CONCAT('%',:search,'%') or u.classes_number like CONCAT('%',:search,'%') )";
        }
        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("siteId",cid);
        query.setParameter("assignmentId",examId);
        if (!EmptyUtil.isEmpty(search)) {
            query.setParameter("search",search);
        }
        Integer count = query.getResultList().size();
        return count;
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
        if (tAssignments.size()>0){
            //通过原考试id查询包含的补考
            List<Integer> idList = tAssignments.stream().map(TAssignment::getId).collect(Collectors.toList());
            List<TAssignment> makeUpExams = tAssignmentJPA.findStudentMakeUpExams(idList);
            List<Integer> mExams = makeUpExams.stream().map(TAssignment::getId).collect(Collectors.toList());

            while (mExams.size()!=0){
                List<TAssignment> makeExams = tAssignmentJPA.findStudentMakeUpExams(mExams);
                makeUpExams.addAll(makeExams);
                mExams = makeExams.stream().map(TAssignment::getId).collect(Collectors.toList());
            }
            //判断是否为该学生需要的补考
            for (TAssignment tAssignment : makeUpExams) {
                //判断是否通过，没通过添加
                Boolean flag = this.isPass(userVo.getUsername(), tAssignment.getOldAssignmentId());
                if (!flag) {
                    tAssignments.add(tAssignment);
                }
            }
        }
        return tAssignments;
    }

    /**************************************************************************
     *Description 查询该考试是否及格
     * @author 刘博越
     * @date 2019年5月27日
     **************************************************************************/
    public boolean isPass(String username, Integer assignmentId) {
        //获取及格成绩
        TAssignmentAnswerAssign tAssignmentAnswerAssign = tAssignmentAnswerAssignJPA.findTAssignmentAnswerAssignByExamId(assignmentId);
        Double passingScore = tAssignmentAnswerAssign.getPassingScore();
        Integer count = tAssignmentGradingJPA.countFindTAssignmentGradingById(assignmentId, passingScore, username);
        if (count > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**************************************************************************
     * Description 准考证数据
     *
     * @author 黄浩
     * @date 2020年11月3日
     **************************************************************************/
    @Override
    public AdmissionVo admission(String username, Integer siteId, String apiGateWayHost, String datasource) {
        List<AdmissionVo> list = new ArrayList<>();
        String url = apiGateWayHost + "/configcenter/api/timetable/info?businessId=" + siteId;
        try {
            if (datasource != null && !datasource.equals("")) {
                url += "&query_datasource=" + datasource;
            }
            System.out.println("单个url：" + url);
            AdmissionVo admissionVo = new AdmissionVo();
            //教学获取
            admissionVo.setCname(userJPA.findOne(username).getCname());
            //获取章节名
            List<String> chapterNames = wkChapterJPA.findAdmitChapter(siteId);
            //科目
            String subject1 = chapterNames.get(0);
            String subject2 = chapterNames.get(1);
            admissionVo.setSubject1(subject1);
            admissionVo.setSubject2(subject2);
            //测评时间
            TimetableAppointment timetableAppointment1 = timetableAppointmentJPA.findBySiteIdAndChapterName(siteId, subject1 + ",");
            TimetableAppointment timetableAppointment2 = timetableAppointmentJPA.findBySiteIdAndChapterName(siteId, subject2 + ",");
            SystemCampus systemCampus = systemCampusJPA.findDefault();
            SystemTime startSystemTime1 = systemTimeJPA.findByTimeNameAndCampus(timetableAppointment1.getStartClass().toString(), systemCampus.getCampusNumber());
            SystemTime endSystemTime1 = systemTimeJPA.findByTimeNameAndCampus(timetableAppointment1.getEndClass().toString(), systemCampus.getCampusNumber());

            SystemTime startSystemTime2 = systemTimeJPA.findByTimeNameAndCampus(timetableAppointment2.getStartClass().toString(), systemCampus.getCampusNumber());
            SystemTime endSystemTime2 = systemTimeJPA.findByTimeNameAndCampus(timetableAppointment2.getEndClass().toString(), systemCampus.getCampusNumber());

            admissionVo.setTime1(startSystemTime1.getStartDate().toString() + "~" + endSystemTime1.getEndDate().toString());
            admissionVo.setTime2(startSystemTime2.getStartDate().toString() + "~" + endSystemTime2.getEndDate().toString());
            //测评日期
            SchoolWeek schoolWeek = schoolWeekJPA.findByTermAndWeekAndWeekday(timetableAppointment1.getTermId(), timetableAppointment1.getStartWeek(), timetableAppointment1.getWeekday());
            admissionVo.setDate(DateFormatUtil.date2String(schoolWeek.getDate(), "yyyy-MM-dd"));
            //考试地点，考场
            admissionVo.setAddress(timetableAppointment1.getMemo());
            admissionVo.setRoom(timetableAppointment1.getKnowledgeOther());

            String result = restTemplate.getForObject(url, String.class);
            System.out.println("单个数据：" + result);
            JSONArray jsonArray = JSON.parseObject(result).getJSONArray("data");
            JSONObject o = jsonArray.getJSONObject(0).getJSONArray("timetableProcessDTOS").getJSONObject(0);
            JSONObject o1 = o.getJSONArray("timetableResults").getJSONObject(0);
            //测评等级
            String level[] = o1.getString("evaluationScore7").split("_");
            admissionVo.setLevel(level[level.length - 1]);
            //剩余学生相关信息
            JSONObject oResult = jsonArray.getJSONObject(0).getJSONArray("timetableProcessDTOS").getJSONObject(1);
            JSONArray oResult1 = oResult.getJSONArray("timetableResults");
            List<TimetableResult> timetableResults = oResult1.toJavaList(TimetableResult.class);
            //根据用户名获取某一条对象
            TimetableResult timetableResult = timetableResults.stream().filter(item -> item.getEvaluationScore1().equals(username + "_" + admissionVo.getCname())).findFirst().get();
            String[] sex = timetableResult.getEvaluationScore2().split("_");
            admissionVo.setSex(sex[sex.length - 1]);
            admissionVo.setSchool(timetableResult.getEvaluationScore7());
            admissionVo.setOrganization(timetableResult.getEvaluationScore8());
            admissionVo.setNumber(timetableResult.getEvaluationScore3());
            String[] arr = timetableResult.getEvaluationScore10().split("_");
            admissionVo.setDirection(arr[arr.length - 1]);
            for (int i = 0; i < timetableResults.size(); i++) {
                if (timetableResult.getId().equals(timetableResults.get(i).getId())) {
                    admissionVo.setSeat(i + 1);
                    break;
                }
            }
            return admissionVo;
        } catch (Exception e) {
            e.printStackTrace();
            return new AdmissionVo();
        }
    }

    /**************************************************************************
     * Description 准入列表
     *
     * @author 黄浩
     * @date 2020年11月3日
     **************************************************************************/
    @Override
    public List<AdmissionVo> admissionList(Integer siteId, String search, String apiGateWayHost, String student, String datasource) {
        List<AdmissionVo> list = new ArrayList<>();
        String url = apiGateWayHost + "/configcenter/api/timetable/info?businessId=" + siteId;
        try {
            if (datasource != null && !datasource.equals("")) {
                url += "&query_datasource=" + datasource;
            }
            System.out.println("列表url：" + url);
            String result = restTemplate.getForObject(url, String.class);
            System.out.println("列表数据：" + result);
            JSONArray jsonArray = JSON.parseObject(result).getJSONArray("data");
            JSONObject o = jsonArray.getJSONObject(0).getJSONArray("timetableProcessDTOS").getJSONObject(0);
            JSONObject o1 = o.getJSONArray("timetableResults").getJSONObject(0);
            //测评等级
            String level[] = o1.getString("evaluationScore7").split("_");
            //剩余学生相关信息
            JSONObject oResult = jsonArray.getJSONObject(0).getJSONArray("timetableProcessDTOS").getJSONObject(1);
            JSONArray oResult1 = oResult.getJSONArray("timetableResults");
            List<TimetableResult> timetableResults = oResult1.toJavaList(TimetableResult.class);
            for (TimetableResult t : timetableResults) {
                AdmissionVo admissionVo = new AdmissionVo();
                admissionVo.setUsername(t.getEvaluationScore1().split("_")[0]);
                admissionVo.setCname(t.getEvaluationScore1().split("_")[1]);
                admissionVo.setNumber(t.getEvaluationScore3());
                admissionVo.setPhone(t.getEvaluationScore12());
                admissionVo.setEmail(t.getEvaluationScore5());
                admissionVo.setLevel(level[level.length - 1]);
                String[] arr = t.getEvaluationScore10().split("_");
                admissionVo.setDirection(arr[arr.length - 1]);
                list.add(admissionVo);
            }
            if (search != "") {
                String a = "";
            }
            if (student != null && student != "") {
                list = list.stream().filter(item -> item.getUsername().equals(student)).collect(Collectors.toList());
            } else if (search != null && !search.equals("")) {
                list = list.stream().filter(item -> item.getCname().equals(search)).collect(Collectors.toList());
            }

        } catch (Exception e) {
            e.printStackTrace();

        }
        return list;
    }

    /**************************************************************************
     * Description 学生考试汇总
     *
     * @author 黄浩
     * @date 2020年11月25日
     **************************************************************************/
    @Override
    public List<ExamListVo> studentExams(String username, String type, String search, Integer page, Integer limit,Integer siteId) {
        List<TAssignment> tAssignmentList = new ArrayList<>();
        if (search != null && search != "") {
            tAssignmentList = tAssignmentJPA.searchStudentExams(username, type, search, (page - 1) * limit, limit);
        } else {
            tAssignmentList = tAssignmentJPA.studentExams(username, type, (page - 1) * limit, limit);
        }
        List<ExamListVo> examListDtos = new ArrayList<ExamListVo>();
        for (TAssignment tAssignment : tAssignmentList) {
            ExamListVo examListDto = new ExamListVo();
            examListDto.setId(tAssignment.getId());
            examListDto.setIsMakeUpExam(tAssignment.getIsMakeUpExam());
            examListDto.setOldAssignmentId(tAssignment.getOldAssignmentId());
            examListDto.setStartTime(tAssignment.getTAssignmentControl().getStartdate());
            examListDto.setQrcodeUrl(tAssignment.getQrcodeUrl());
            //将数据库的时间类型转String
            if (tAssignment.getTAssignmentControl().getStartdate() != null) {
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                String date = sdf.format(tAssignment.getTAssignmentControl().getStartdate());
                examListDto.setStartTime1(date);
            }
            examListDto.setDueTime(tAssignment.getTAssignmentControl().getDuedate());
            //将数据库的时间类型转String
            if (tAssignment.getTAssignmentControl().getDuedate() != null) {
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                String date = sdf.format(tAssignment.getTAssignmentControl().getDuedate());
                examListDto.setDueTime1(date);
            }
            examListDto.setTitle(tAssignment.getTitle());
            examListDto.setStatus(tAssignment.getStatus());
            examListDto.setAcademyNumber(tAssignment.getSchoolAcademy());
            examListDto.setTimes(tAssignmentGradingJPA.countTAssignmentGradingById(tAssignment.getId(), username));
            examListDto.setMin(tAssignment.getMins());
            examListDto.setLimitTime(tAssignment.getTAssignmentControl().getTimelimit());
            examListDto.setCid(tAssignment.getSiteId());

            //如果是补考，获取对应补考名单
            if ("1".equals(tAssignment.getIsMakeUpExam())) {
                //获取成绩不合格补考名单
                Double passingScore = tAssignmentAnswerAssignJPA.findTAssignmentAnswerAssignByExamId(tAssignment.getId()).getPassingScore();
                List<TAssignmentGradingVO> tAssignmentGradingVOList = new ArrayList<>();
                List<TAssignmentGrading> tAssignmentGradingList = tAssignmentGradingJPA.findTAssignmentGradingById(tAssignment.getOldAssignmentId(), passingScore);
                if (tAssignmentGradingList.size() > 0) {
                    for (TAssignmentGrading tAssignmentGrading : tAssignmentGradingList) {
                        TAssignmentGradingVO tAssignmentGradingVO = new TAssignmentGradingVO();
                        tAssignmentGradingVO.setTitle(tAssignmentGrading.getTAssignment().getTitle());
                        tAssignmentGradingVO.setUsername(tAssignmentGrading.getUserByStudent().getUsername());
                        tAssignmentGradingVO.setCname(tAssignmentGrading.getUserByStudent().getCname());
                        tAssignmentGradingVO.setScore(tAssignmentGrading.getFinalScore());
                        tAssignmentGradingVOList.add(tAssignmentGradingVO);
                    }
                }
                //获取未参加考试补考名单
                List<UserVo> notTakeExamUserList;
                if(tCourseSiteJPA.getOne(siteId).getTitle().equals("全校考试")){
                    notTakeExamUserList = this.findNotTakeExamListByExamIdAllSchool(tAssignment.getOldAssignmentId());
                }else{
                    notTakeExamUserList = this.findNotTakeExamListByExamId(tAssignment.getOldAssignmentId(),siteId);
                }
                if (notTakeExamUserList.size() > 0) {
                    for (UserVo u : notTakeExamUserList) {
                        TAssignmentGradingVO tAssignmentGradingVO = new TAssignmentGradingVO();
                        tAssignmentGradingVO.setTitle(tAssignment.getTitle());
                        tAssignmentGradingVO.setUsername(u.getUsername());
                        tAssignmentGradingVO.setCname(u.getCname());
                        tAssignmentGradingVOList.add(tAssignmentGradingVO);
                    }
                }
                examListDto.settAssignmentGrading(tAssignmentGradingVOList);
            }
            examListDtos.add(examListDto);
        }
        return examListDtos;
    }

    /**************************************************************************
     * Description 学生考试汇总数量
     *
     * @author 黄浩
     * @date 2020年11月25日
     **************************************************************************/
    @Override
    public Integer countStudentExams(String username, String type, String search) {
        if (search != null && search != "") {
            return tAssignmentJPA.countSearchStudentExams(username, type, search);
        } else {
            return tAssignmentJPA.countStudentExams(username, type);
        }
    }

    @Override
    public Boolean examCanDelete(Integer assignmentId) {
        String sql = "select count(*) from t_assignment where old_assignment_id =:assignmentId";
        Query nativeQuery = entityManager.createNativeQuery(sql);
        nativeQuery.setParameter("assignmentId",assignmentId);
        int i = Integer.parseInt(nativeQuery.getSingleResult().toString());
        return i==0;
    }
}
