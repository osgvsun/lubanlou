package net.gvsun.gsexam.service.exam;

import com.alibaba.fastjson.JSON;
import net.gvsun.datasource.ClientDatabaseContext;
import net.gvsun.feign.UsercenterFeign;
import net.gvsun.gsexam.domain.*;
import net.gvsun.gsexam.dto.common.TAssignmentItemMappingDto;
import net.gvsun.gsexam.dto.common.UserVo;
import net.gvsun.gsexam.dto.exam.UserInfoDTO;
import net.gvsun.gsexam.jpa.*;
import net.gvsun.gsexam.utils.EmptyUtil;
import net.gvsun.gsexam.vo.exam.ExamInfoVo;
import net.gvsun.gsexam.vo.layui.LayuiDataVo;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.*;


/**************************************************************************
 * Description 考试成绩
 *
 * @author lixueteng
 * @date 2017-09-26
 **************************************************************************/
@Service("examGradingService")
public class ExamGradingServiceImpl implements ExamGradingService {

    @Autowired
    private TAssignmentGradingJPA tAssignmentGradingJPA;
    @Autowired
    private TAssignmentJPA tAssignmentJPA;
    @Autowired
    private TAssignmentItemMappingJPA tAssignmentItemMappingJPA;
    @Autowired
    private TAssignmentAnswerAssignJPA tAssignmentAnswerAssignJPA;
    @Autowired
    private ExamListService examListService;
    @Autowired
    private EntityManager entityManager;
    @Autowired
    private SchoolJPA schoolJPA;
    @Autowired
    private UserJPA userJPA;
    @Autowired
    private TCourseSiteJPA tCourseSiteJPA;
    @Autowired
    private WkUploadJPA wkUploadJPA;
    @Autowired
    @Qualifier("datasourceRestTemplate")
    private RestTemplate restTemplate;
    @Autowired
    private ClientDatabaseContext clientDatabaseContext;
    @Autowired
    private UsercenterFeign usercenterFeign;
    @Autowired
    private TAssignmentClassJPA tAssignmentClassJPA;

    /**************************************************************************
     * Description 开始考试，获取考试的记录
     *
     * @author lixueteng
     * @date 2017-09-26
     **************************************************************************/
    @Override
    public List<Map> getTAssignmentItemMapping(Integer examId, UserVo userVo) {
        Integer gradingId = this.findTAssignmentGradingByTestIdAndUser(examId, userVo);
        List<Map> mapList = new ArrayList<>();
        Map<Integer, Object> recordMap = new HashMap<>();
        Map<Integer, String> itemTextMap = new HashMap<>();
        if (gradingId != -1) {
            TAssignmentGrading tAssignmentGrading = tAssignmentGradingJPA.findOne(gradingId);
            if (tAssignmentGrading.getAccessmentgradingId() != null) {
                //查询学生最新一次的答题记录
                TAssignment parentTAssignment = tAssignmentGrading.getTAssignment();
                List<TAssignment> tAssignments = tAssignmentJPA.findExamByUserAndExamIdWithoutStatus(parentTAssignment.getId(), tAssignmentGrading.getUserByStudent().getUsername());
                TAssignment tAssignment = tAssignments.get(tAssignments.size() - 1);
                //答题记录去掉提交筛选条件
                List<TAssignmentItemMapping> itemMappings = tAssignmentItemMappingJPA.
                        findMappingByNameAndAssignmentId(tAssignmentGrading.getUserByStudent().getUsername(), tAssignment.getId());
                Integer itemId = 0;
                for (TAssignmentItemMapping tAssignmentItemMapping : itemMappings) {
                    itemId = tAssignmentItemMapping.getTAssignmentItem().getId();
                    if (tAssignmentItemMapping.getTAssignmentAnswer() != null) {
                        //判断题，单选多选题 填空题
                        TAssignmentItemMappingDto tAssignmentItemMappingDto =
                                new TAssignmentItemMappingDto(tAssignmentItemMapping.getTAssignmentItem().getId(), tAssignmentItemMapping.getAnswerText());
                        recordMap.put(tAssignmentItemMapping.getTAssignmentAnswer().getId(), tAssignmentItemMappingDto);
                    } else {
                        itemTextMap.put(itemId, tAssignmentItemMapping.getAnswerText());
                    }
                }

            }
        }
        mapList.add(recordMap);
        mapList.add(itemTextMap);
        return mapList;
    }

    /**************************************************************************
     * Description 开始考试，获取考试的记录的成绩
     *
     * @author lixueteng
     * @date 2017-09-26
     **************************************************************************/
    @Override
    public Integer findTAssignmentGradingByTestIdAndUser(Integer examId, UserVo userVo) {
        String username = userVo.getUsername();
        List<TAssignmentGrading> tAssignmentGradings = tAssignmentGradingJPA.findTAssignmentGradingByIdAndUsername(examId, username);
        TAssignmentGrading tAssignmentGrading = new TAssignmentGrading();
        if (tAssignmentGradings.size() != 0) {
            tAssignmentGrading = tAssignmentGradings.get(0);
            return tAssignmentGrading.getAccessmentgradingId();
        } else {
            return -1;
        }
    }

    /**************************************************************************
     * Description 开始考试，获取当前考试的详情
     *
     * @author lixueteng
     * @date 2017-10-17
     **************************************************************************/
    @Override
    public ExamInfoVo findExamInfo(Integer examId, UserVo userVo) {
        ExamInfoVo examInfoVo = new ExamInfoVo();
        //获取哪一门考试
        TAssignment exam = tAssignmentJPA.findOne(examId);
        examInfoVo.setExamTitle(exam.getTitle());
        examInfoVo.setTeacherName(exam.getUser().getCname());
        examInfoVo.setStartTime(exam.getTAssignmentControl().getStartdate());
        examInfoVo.setEndTime(exam.getTAssignmentControl().getDuedate());
        examInfoVo.setScore(exam.getTAssignmentAnswerAssign().getScore());
        examInfoVo.setExamDescription(exam.getDescription());
        //获取一共要提交的人数
        Integer totalNumber = 100;
        //TODO 配合考试预约打通
        //获取已经提交的人数
        List<String> commitStudentList = tAssignmentGradingJPA.getCommitStudentNumber(examId);
        examInfoVo.setCommitNumber(commitStudentList.size());
        examInfoVo.setUnCommitNumber(totalNumber - commitStudentList.size());
        return examInfoVo;
    }

    /**************************************************************************
     * Description 开始考试，获取当前考试的学生成绩列表
     *
     * @author lixueteng
     * @date 2017-10-18
     **************************************************************************/
    @Override
    public List<LayuiDataVo> findExamGradingList(Integer examId, String authorityName, Integer currpage, Integer pageSize, String projectName, String search, String username) {
        Object data = usercenterFeign.getBasicInfo(username).getData();
        String s = JSON.toJSONString(data);
        List<UserInfoDTO> userInfoDTOS = JSON.parseArray(s, UserInfoDTO.class);
        List<LayuiDataVo> allExamGrading = new ArrayList<>();
        if (authorityName.equals("STUDENT")) {
            String sql = "select g from TAssignmentGrading g where g.TAssignment.id=" + examId + " and g.userByStudent.username='" + username + "'";
            Query query = entityManager.createQuery(sql);
            query.setFirstResult((currpage - 1) * pageSize).setMaxResults(pageSize);
            List<TAssignmentGrading> examAllGrading = query.getResultList();
            for (TAssignmentGrading grading : examAllGrading) {
                LayuiDataVo examGradingVo = new LayuiDataVo();
                //姓名
                examGradingVo.setCname(grading.getUserByStudent().getCname());
                //学号
                examGradingVo.setUsername(grading.getUserByStudent().getUsername());
                //性别
                if (grading.getUserByStudent().getUserSexy() == "1") {
                    examGradingVo.setSex("男");
                } else {
                    examGradingVo.setSex("女");
                }
                //学院
                if (grading.getUserByStudent().getSchoolAcademy() != null) {
                    examGradingVo.setAcademyName(grading.getUserByStudent().getSchoolAcademy().getAcademyName());
                }
                //班级
                if (grading.getUserByStudent().getSchoolClass() != null) {
                    examGradingVo.setClassName(grading.getUserByStudent().getSchoolClass().getClassName());
                }
                //个人图片
                try {
                    for (UserInfoDTO userInfoDTO : userInfoDTOS) {
                        examGradingVo.setPhotoUrl(userInfoDTO.getIdentificationPhoto());
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
                //考试名称
                examGradingVo.setTitle(tAssignmentJPA.findOne(examId).getTitle());
                //日期
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                String date = sdf.format(grading.getSubmitdate());
                examGradingVo.setCommitDate(date);
                //成绩
                examGradingVo.setScore(grading.getFinalScore());

                Double passingScore = tAssignmentAnswerAssignJPA.findTAssignmentAnswerAssignByExamId(examId).getPassingScore();
                //是否合格
                if (passingScore == null) {
                    examGradingVo.setIsPassing("未设置合格分数");
                } else {
                    if (grading.getTAssignment().getEffectiveDays() == null || grading.getTAssignment().getEffectiveDays() == 0) {
                        if (passingScore > grading.getFinalScore()) {
                            examGradingVo.setIsPassing("不合格");
                        } else {
                            examGradingVo.setIsPassing("合格");
                        }
                    } else {
                        //设置了合格有效期后
                        Calendar c = Calendar.getInstance();
                        c.setTime(grading.getSubmitdate());
                        c.add(Calendar.DATE, grading.getTAssignment().getEffectiveDays());
                        int res = new Date().compareTo(c.getTime());
                        if (passingScore <= grading.getFinalScore() && res == -1) {
                            examGradingVo.setIsPassing("合格");
                        } else {
                            examGradingVo.setIsPassing("不合格");
                        }
                    }

                }
                //考试成绩id
                examGradingVo.setGradingId(grading.getAccessmentgradingId());
                School school = schoolJPA.selectFirst();
                if (school != null) {
                    //合格证书编号(前缀+日期+成绩id)
                    SimpleDateFormat sdf1 = new SimpleDateFormat("yyyyMMdd");
                    String date1 = sdf1.format(grading.getSubmitdate());
                    examGradingVo.setCode(school.getPrefix() + date1 + grading.getAccessmentgradingId());
                    //证书名称
                    examGradingVo.setCertificateTitle(school.getTitle());
                    //证书公章图片
                    examGradingVo.setSchoolPhotoUrl(school.getPhotoUrl());
                }
                allExamGrading.add(examGradingVo);
            }
        } else {
            String sql = "select g from TAssignmentGrading g where g.TAssignment.id= :examId" +
                    " and g.finalScore = (select max(finalScore) from TAssignmentGrading a where " +
                    " a.TAssignment.id = :examId  and a.submitTime > 0 " + " and a.userByStudent.username like g.userByStudent.username)";
            if (!EmptyUtil.isEmpty(search)) {
                sql += " and (g.userByStudent.username like :search or g.userByStudent.cname like :search or g.userByStudent.schoolClass.classNumber like :search)";
            }
            sql += " group by g.TAssignment.id, g.userByStudent.username";
            Query query = entityManager.createQuery(sql);
            query.setParameter("examId", examId);
            if (!EmptyUtil.isEmpty(search)) {
                query.setParameter("search", "%" + search + "%");
            }
            query.setFirstResult((currpage - 1) * pageSize).setMaxResults(pageSize);
            List<TAssignmentGrading> examAllGrading = query.getResultList();
            for (TAssignmentGrading grading : examAllGrading) {
                LayuiDataVo examGradingVo = new LayuiDataVo();
                examGradingVo.setCname(grading.getUserByStudent().getCname());
                examGradingVo.setUsername(grading.getUserByStudent().getUsername());
                //性别
                examGradingVo.setSex(grading.getUserByStudent().getUserSexy());
                //学院
                if (grading.getUserByStudent().getSchoolAcademy() != null) {
                    examGradingVo.setAcademyName(grading.getUserByStudent().getSchoolAcademy().getAcademyName());
                }
                //个人图片
                try {
                    for (UserInfoDTO userInfoDTO : userInfoDTOS) {
                        examGradingVo.setPhotoUrl(userInfoDTO.getIdentificationPhoto());
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
                //考试名称
                examGradingVo.setTitle(tAssignmentJPA.findOne(examId).getTitle());
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                if (grading.getSubmitdate() != null) {
                    String date = sdf.format(grading.getSubmitdate());
                    examGradingVo.setCommitDate(date);
                }
                examGradingVo.setScore(grading.getFinalScore());
                if (grading.getUserByStudent().getSchoolClass() != null) {
                    examGradingVo.setClassName(grading.getUserByStudent().getSchoolClass().getClassName());
                }
                Double passingScore = tAssignmentAnswerAssignJPA.findTAssignmentAnswerAssignByExamId(examId).getPassingScore();
                if (passingScore == null) {
                    examGradingVo.setIsPassing("未设置合格分数");
                } else {
                    if (grading.getTAssignment().getEffectiveDays() == null || grading.getTAssignment().getEffectiveDays() == 0) {
                        if (passingScore > grading.getFinalScore()) {
                            examGradingVo.setIsPassing("不合格");
                        } else {
                            examGradingVo.setIsPassing("合格");
                        }
                    } else {
                        //设置了合格有效期后
                        Calendar c = Calendar.getInstance();
                        c.setTime(grading.getSubmitdate());
                        c.add(Calendar.DATE, grading.getTAssignment().getEffectiveDays());
                        int res = new Date().compareTo(c.getTime());
                        if (passingScore <= grading.getFinalScore() && res == -1) {
                            examGradingVo.setIsPassing("合格");
                        } else {
                            examGradingVo.setIsPassing("不合格");
                        }
                    }

                }
                //考试成绩id
                examGradingVo.setGradingId(grading.getAccessmentgradingId());
                School school = schoolJPA.findSchoolByProjectName(projectName);
                if (school != null) {
                    //合格证书编号(前缀+日期+成绩id)
                    SimpleDateFormat sdf1 = new SimpleDateFormat("yyyyMMdd");
                    String date1 = sdf1.format(grading.getSubmitdate());
                    examGradingVo.setCode(school.getPrefix() + date1 + grading.getAccessmentgradingId());
                    //证书名称
                    examGradingVo.setCertificateTitle(school.getTitle());
                    //证书公章图片
                    examGradingVo.setSchoolPhotoUrl(school.getPhotoUrl());
                }
                allExamGrading.add(examGradingVo);
            }
        }
        return allExamGrading;
    }

    /**************************************************************************
     * Description 获取当前考试未参加考试学生列表
     *
     * @author 刘博越
     * @date 2019-6-3
     **************************************************************************/
    @Override
    public List<LayuiDataVo> findNotTakeExamList(Integer examId, Integer currpage, Integer pageSize, String search, Integer cid) {
        List<LayuiDataVo> returnList = new ArrayList<>();
        String sql = "SELECT DISTINCT(tcsu.username),u.cname FROM `user` u join t_course_site_user tcsu on u.username = tcsu.username WHERE tcsu.site_id =:siteId and u.user_status = 1 and tcsu.username not in \n" +
                "(SELECT student FROM t_assignment_grading WHERE assignment_id =:assignmentId)";
        if (!EmptyUtil.isEmpty(search)) {
            sql += " and (u.username like CONCAT('%',:search,'%') or u.cname like CONCAT('%',:search,'%') )";
        }
        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("siteId", cid);
        query.setParameter("assignmentId", examId);
        if (!EmptyUtil.isEmpty(search)) {
            query.setParameter("search", search);
        }
        query.setFirstResult((currpage - 1) * pageSize).setMaxResults(pageSize);
        List<Object[]> objects = query.getResultList();
        for (Object[] o : objects) {
            LayuiDataVo l = new LayuiDataVo();
            l.setUsername(o[0].toString());
            l.setCname(o[1].toString());
            returnList.add(l);
        }
        return returnList;
    }

    @Override
    public Integer countNotTakeExamList(Integer examId, String search, Integer cid) {
        String sql = "SELECT DISTINCT(tcsu.username),u.cname FROM `user` u join t_course_site_user tcsu on u.username = tcsu.username WHERE tcsu.site_id =:siteId and u.user_status = 1 and tcsu.username not in \n" +
                "(SELECT student FROM t_assignment_grading WHERE assignment_id =:assignmentId)";
        if (!EmptyUtil.isEmpty(search)) {
            sql += " and (u.username like CONCAT('%',:search,'%') or u.cname like CONCAT('%',:search,'%') )";
        }
        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("siteId", cid);
        query.setParameter("assignmentId", examId);
        if (!EmptyUtil.isEmpty(search)) {
            query.setParameter("search", search);
        }
        List<Object[]> resultList = query.getResultList();
        return resultList.size();
    }

    @Override
    public List<LayuiDataVo> findNotTakeExamListAllSchool(Integer examId, Integer currpage, Integer pageSize, String search) {
        List<LayuiDataVo> returnList = new ArrayList<>();
        List<TAssignmentClass> assignmentClassById = tAssignmentClassJPA.findAssignmentClassById(examId);
        if (assignmentClassById.size() > 0) {
            String sql = "SELECT distinct username,cname FROM `user` WHERE classes_number in \n" +
                    "(SELECT class_number FROM t_assignment_class WHERE assignment_id =:assignmentId)\n" +
                    "and username not in (SELECT student FROM t_assignment_grading WHERE assignment_id =:assignmentId)";
            if (!EmptyUtil.isEmpty(search)) {
                sql += " and (username like CONCAT('%',:search,'%') or cname like CONCAT('%',:search,'%'))";
            }
            Query nativeQuery = entityManager.createNativeQuery(sql);
            nativeQuery.setParameter("assignmentId", examId);
            if (!EmptyUtil.isEmpty(search)) {
                nativeQuery.setParameter("search", search);
            }
            nativeQuery.setFirstResult((currpage - 1) * pageSize).setMaxResults(pageSize);
            List<Object[]> resultList = nativeQuery.getResultList();
            for (Object[] o : resultList) {
                LayuiDataVo l = new LayuiDataVo();
                l.setUsername(o[0].toString());
                l.setCname(o[1].toString());
                returnList.add(l);
            }
        }
        return returnList;
    }

    @Override
    public Integer countNotTakeExamListAllSchool(Integer examId, String search) {
        List<TAssignmentClass> assignmentClassById = tAssignmentClassJPA.findAssignmentClassById(examId);
        if (assignmentClassById.size() > 0) {
            String sql = "SELECT distinct username,cname FROM `user` WHERE classes_number in \n" +
                    "(SELECT class_number FROM t_assignment_class WHERE assignment_id =:assignmentId)\n" +
                    "and username not in (SELECT student FROM t_assignment_grading WHERE assignment_id =:assignmentId)";
            if (!EmptyUtil.isEmpty(search)) {
                sql += " and (username like CONCAT('%',:search,'%') or cname like CONCAT('%',:search,'%'))";
            }
            Query nativeQuery = entityManager.createNativeQuery(sql);
            nativeQuery.setParameter("assignmentId", examId);
            if (!EmptyUtil.isEmpty(search)) {
                nativeQuery.setParameter("search", search);
            }
            List<Object[]> resultList = nativeQuery.getResultList();
            return resultList.size();
        }
        return 0;
    }

    /**************************************************************************
     * Description 学生成绩列表数量
     * @author 洪春莹
     * @date 2018年12月20日
     **************************************************************************/
    @Override
    public Integer countExamGradingList(Integer examId, String username, String authorityName, String search) {
        if (authorityName.equals("STUDENT")) {
            String sql = "select g from TAssignmentGrading g where g.TAssignment.id=" + examId + " and g.userByStudent.username='" + username + "'";
            Query query = entityManager.createQuery(sql);
            List<TAssignmentGrading> examAllGrading = query.getResultList();
            return examAllGrading.size();
        } else {
            String sql = "select g from TAssignmentGrading g where g.TAssignment.id=" + examId;
            if (!EmptyUtil.isEmpty(search)) {
                sql += " and (g.userByStudent.username like :search or g.userByStudent.cname like :search or g.userByStudent.schoolClass.classNumber like :search )";
            }
            sql += " group by g.userByStudent.username";
            Query query = entityManager.createQuery(sql);
            if (!EmptyUtil.isEmpty(search)) {
                query.setParameter("search", "%" + search + "%");
            }
            List<TAssignmentGrading> examAllGrading = query.getResultList();
            return examAllGrading.size();
        }
    }

    /**************************************************************************
     * Description 导出成绩单
     *
     * @author 洪春莹
     * @date 2018年12月19日
     **************************************************************************/
    @Override
    public byte[] exportGradeList(Integer examId) {
        TAssignment tAssignment = tAssignmentJPA.getOne(examId);
        //根据examId获取需要导出的数据
        List<LayuiDataVo> examGradingList = this.findAllExamGradingById(examId);
        //根据考试id获取考试名称
        String examTitle = tAssignmentJPA.findOne(examId).getTitle();
        //获取题库标题
        String title = examTitle + "成绩单";
        String filePath = null;
        //获取题目集合
        //创建HSSFWorkbook对象(excel的文档对象)
        HSSFWorkbook wb = new HSSFWorkbook();
        //建立新的sheet对象（excel的表单）
        title = title.replaceAll("\\/", "_");
        HSSFSheet sheet = wb.createSheet(title);
        HSSFRow row = sheet.createRow((int) 0);
        //表头
        row.createCell(0).setCellValue("学号");
        row.createCell(1).setCellValue("姓名");
        row.createCell(2).setCellValue("班级");
        row.createCell(3).setCellValue("成绩");
        if (tAssignment.getType().equals("exam")) {
            row.createCell(4).setCellValue("是否合格");
            row.createCell(5).setCellValue("提交日期");
        } else {
            row.createCell(4).setCellValue("提交日期");
        }
        int i = 1;
        for (LayuiDataVo layuiDataVo : examGradingList) {
            row = sheet.createRow((int) i);
            row.createCell(0).setCellValue(layuiDataVo.getUsername());
            row.createCell(1).setCellValue(layuiDataVo.getCname());
            row.createCell(2).setCellValue(layuiDataVo.getClassName());
            row.createCell(3).setCellValue(layuiDataVo.getScore());
            if (tAssignment.getType().equals("exam")) {
                row.createCell(4).setCellValue(layuiDataVo.getIsPassing());
                row.createCell(5).setCellValue(layuiDataVo.getCommitDate());
            } else {
                row.createCell(4).setCellValue(layuiDataVo.getCommitDate());
            }
            i++;    //行标
        }
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        try {
            wb.write(byteArrayOutputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
        byte[] bytes = byteArrayOutputStream.toByteArray();
        return bytes;
    }

    /**************************************************************************
     * Description 获取当前考试的学生成绩列表
     *
     * @author 洪春莹
     * @date 2018-12-20
     **************************************************************************/
    @Override
    public List<LayuiDataVo> findAllExamGradingById(Integer examId) {
        List<LayuiDataVo> allExamGrading = new ArrayList<>();
        String sql = " SELECT " +
                " accessmentgrading_id, " +
                " submitdate, " +
                " t_assignment_grading.student, " +
                " max( final_score ) AS final_score " +
                " FROM " +
                " t_assignment_grading " +
                " WHERE " +
                " assignment_id =  " + examId +
                " GROUP BY " +
                " student ";
        List<Object[]> lists = new ArrayList<Object[]>(entityManager.createNativeQuery(sql).getResultList());
        for (Object[] grading : lists) {
            LayuiDataVo examGradingVo = new LayuiDataVo();
            //保存成绩id
            if (grading[0] != null) {
                examGradingVo.setGradingId(Integer.parseInt(grading[0].toString()));
            }
            //提交时间
            if (grading[1] != null) {
                examGradingVo.setCommitDate(grading[1].toString());
            }
            //学生信息
            if (grading[2] != null) {
                examGradingVo.setCname(userJPA.findUserByUsername(grading[2].toString()).getCname());
                examGradingVo.setUsername(grading[2].toString());
                if (userJPA.findUserByUsername(grading[2].toString()).getSchoolClass() != null) {
                    examGradingVo.setClassName(userJPA.findUserByUsername(grading[2].toString()).getSchoolClass().getClassName());
                }
            }
            //最终成绩
            if (grading[3] != null) {
                examGradingVo.setScore(Double.parseDouble(grading[3].toString()));
            }
            Double passingScore = tAssignmentAnswerAssignJPA.findTAssignmentAnswerAssignByExamId(examId).getPassingScore();
            if (passingScore == null) {
                examGradingVo.setIsPassing("未设置合格分数");
            } else {
                if (passingScore > examGradingVo.getScore()) {
                    examGradingVo.setIsPassing("不合格");
                } else {
                    examGradingVo.setIsPassing("合格");
                }
            }
            allExamGrading.add(examGradingVo);
        }
        return allExamGrading;
    }

    /**************************************************************************以下是大仪新增************************************************************************
     * Description 开始考试，获取考试的记录
     *
     * @author lixueteng
     * @date 2017-09-26
     **************************************************************************/
    @Override
    public List<Map> getTAssignmentItemMapping(Integer examId, String username) {
        Integer gradingId = this.findTAssignmentGradingByTestIdAndUser(examId, username);
        List<Map> mapList = new ArrayList<>();
        Map<Integer, Object> recordMap = new HashMap<>();
        Map<Integer, String> itemTextMap = new HashMap<>();
        if (gradingId != -1) {
            TAssignmentGrading tAssignmentGrading = tAssignmentGradingJPA.findOne(gradingId);
            if (tAssignmentGrading.getAccessmentgradingId() != null) {
                //查询学生最新一次的答题记录
                TAssignment parentTAssignment = tAssignmentGrading.getTAssignment();
                List<TAssignment> tAssignments = tAssignmentJPA.findExamByUserAndExamIdWithoutStatus(parentTAssignment.getId(), tAssignmentGrading.getUserByStudent().getUsername());
                TAssignment tAssignment = tAssignments.get(tAssignments.size() - 1);
                //答题记录去掉提交筛选条件
                List<TAssignmentItemMapping> itemMappings = tAssignmentItemMappingJPA.
                        findMappingByNameAndAssignmentId(tAssignmentGrading.getUserByStudent().getUsername(), tAssignment.getId());
                Integer itemId = 0;
                for (TAssignmentItemMapping tAssignmentItemMapping : itemMappings) {
                    itemId = tAssignmentItemMapping.getTAssignmentItem().getId();
                    if (tAssignmentItemMapping.getTAssignmentAnswer() != null) {
                        //判断题，单选多选题 填空题
                        TAssignmentItemMappingDto tAssignmentItemMappingDto =
                                new TAssignmentItemMappingDto(tAssignmentItemMapping.getTAssignmentItem().getId(), tAssignmentItemMapping.getAnswerText());
                        recordMap.put(tAssignmentItemMapping.getTAssignmentAnswer().getId(), tAssignmentItemMappingDto);
                    } else {
                        itemTextMap.put(itemId, tAssignmentItemMapping.getAnswerText());
                    }
                }

            }
        }
        mapList.add(recordMap);
        mapList.add(itemTextMap);
        return mapList;
    }

    /**************************************************************************
     * Description 开始考试，获取考试的记录的成绩
     *
     * @author lixueteng
     * @date 2017-09-26
     **************************************************************************/
    @Override
    public Integer findTAssignmentGradingByTestIdAndUser(Integer examId, String username) {
        List<TAssignmentGrading> tAssignmentGradings = tAssignmentGradingJPA.findTAssignmentGradingByIdAndUsername(examId, username);
        TAssignmentGrading tAssignmentGrading = new TAssignmentGrading();
        if (tAssignmentGradings.size() != 0) {
            tAssignmentGrading = tAssignmentGradings.get(0);
            return tAssignmentGrading.getAccessmentgradingId();
        } else {
            return -1;
        }
    }

    /**************************************************************************
     * Description:测验-根据测验id和user查询学生的测验提交情况
     *
     * @author：裴继超
     * @date ：2017-1-4
     **************************************************************************/
    @Override
    public List<LayuiDataVo> findTestGradingList(Integer examId, String authorityName, UserVo userVo, Integer page, Integer limit, String search) {
        // TODO Auto-generated method stub
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        StringBuffer sql = new StringBuffer("from TAssignmentGrading c where c.TAssignment.id = " + examId + " and c.submitTime > 0");
        if (authorityName.equals("STUDENT")) {//学生，查看历史提交记录
            sql.append(" and c.userByStudent.username like '" + userVo.getUsername() + "'");
        } else {//普通教师
            String cname = "";
            String username = "";
            //如果为教师登录，则查看学生的最高成绩
            sql.append(" and c.finalScore = (select max(finalScore) from TAssignmentGrading a where " +
                    "a.TAssignment.id = " + examId + " and a.submitTime > 0 " + " and a.userByStudent.username like c.userByStudent.username)");
            if (!EmptyUtil.isEmpty(search)) {
                sql.append(" and (g.userByStudent.username like :search or g.userByStudent.cname like :search or g.userByStudent.schoolClass.classNumber like :search) ");
            }
            sql.append(" group by c.TAssignment.id, c.userByStudent.username");
        }
        System.out.println(sql);
        Query query = entityManager.createQuery(sql.toString());
        if (!EmptyUtil.isEmpty(search)) {
            query.setParameter("search", "%" + search + "%");
        }
        query.setFirstResult((page - 1) * limit).setMaxResults(limit);
        List<TAssignmentGrading> tAssignmentGradings = query.getResultList();
        List<LayuiDataVo> tAssignmentGradingVOList = new ArrayList<>();
        for (TAssignmentGrading t : tAssignmentGradings) {
            LayuiDataVo tAssignmentGradingVO = new LayuiDataVo();
            if (t.getUserByStudent() != null) {
                tAssignmentGradingVO.setUsername(t.getUserByStudent().getUsername());
                tAssignmentGradingVO.setCname(t.getUserByStudent().getCname());
                //班级
                if (t.getUserByStudent().getSchoolClass() != null) {
                    tAssignmentGradingVO.setClassName(t.getUserByStudent().getSchoolClass().getClassName());
                }
            }
            tAssignmentGradingVO.setTitle(t.getTAssignment().getTitle());
            tAssignmentGradingVO.setGradingId(t.getAccessmentgradingId());
            if (t.getSubmitdate() != null) {
                tAssignmentGradingVO.setCommitDate(sdf.format(t.getSubmitdate()));
            }
            tAssignmentGradingVO.setScore(t.getFinalScore());
            tAssignmentGradingVO.setTestId(t.getTestId());
            tAssignmentGradingVOList.add(tAssignmentGradingVO);
        }
        return tAssignmentGradingVOList;
    }

    /**************************************************************************
     * Description:是否合格（中医院）
     *
     * @author：黄浩
     * @date ：2020年12月24日
     **************************************************************************/
    @Override
    public boolean isPass(String username) {
        boolean re = false;
        Integer cid = tCourseSiteJPA.specialSiteId();
        List<TAssignment> tAssignmentList = tAssignmentJPA.findTAssignmentExamBySiteId(cid, "exam");
        String sql = "select g from TAssignmentGrading g where g.TAssignment.id= :examId" +
                " and g.finalScore = (select max(finalScore) from TAssignmentGrading a where " +
                " a.TAssignment.id = :examId  and a.submitTime > 0 " + " and a.userByStudent.username like g.userByStudent.username)";
        sql += " and (g.userByStudent.username = :username )";
        sql += " group by g.TAssignment.id, g.userByStudent.username";
        Query query = entityManager.createQuery(sql);
        query.setParameter("examId", tAssignmentList.get(0).getId());
        query.setParameter("username", username);
        List<TAssignmentGrading> results = query.getResultList();
        if (results.size() > 0) {
            TAssignmentGrading grading = results.get(0);
            Double passingScore = grading.getTAssignment().getTAssignmentAnswerAssign().getPassingScore();
            if (passingScore == null) {
                re = false;
            } else {
                if (grading.getTAssignment().getEffectiveDays() == 0) {
                    if (passingScore > grading.getFinalScore()) {
                        re = false;
                    } else {
                        re = true;
                    }
                } else {
                    //设置了合格有效期后
                    Calendar c = Calendar.getInstance();
                    c.setTime(grading.getSubmitdate());
                    c.add(Calendar.DATE, grading.getTAssignment().getEffectiveDays());
                    int res = new Date().compareTo(c.getTime());
                    if (passingScore <= grading.getFinalScore() && res == -1) {
                        re = true;
                    } else {
                        re = false;
                    }
                }
            }
        }
        return re;
    }

    /**************************************************************************
     * Description 保存机构报告上传、专家报告上传接口
     *
     * @author 黄浩
     * @date 2020年12月28日
     **************************************************************************/
    @Override
    public boolean saveReport(Integer gradingId, String fileName, String fileId, Integer type, String username) {
        TAssignmentGrading tAssignmentGrading = tAssignmentGradingJPA.findOne(gradingId);
        WkUpload upload = new WkUpload();
        upload.settAssignmentGrading(tAssignmentGrading);
        upload.setUser(userJPA.findOne(username));
        upload.setName(fileName);
        upload.setNewUrl(fileId);
        upload.setType(type);
        Timestamp upTime = new Timestamp(System.currentTimeMillis());
        upload.setUpTime(upTime);
        wkUploadJPA.save(upload);
        return true;
    }

    /**************************************************************************
     * Description 获取机构报告id、专家报告上传id
     *
     * @author 黄浩
     * @date 2020年12月28日
     **************************************************************************/
    @Override
    public Long getReportId(Integer gradingId, Integer type) {
        WkUpload wkUpload = wkUploadJPA.findByGradingId(gradingId, type);
        return Long.valueOf(wkUpload.getNewUrl());
    }

    /**************************************************************************
     * Description 查看学生成绩在第几位
     *
     * @author 黄浩
     * @date 2021年1月4日
     **************************************************************************/
    @Override
    public int sortScore(Integer examId, String student) {
        String sql = "select g.userByStudent.username from TAssignmentGrading g where g.TAssignment.id= :examId" +
                " and g.finalScore = (select max(finalScore) from TAssignmentGrading a where " +
                " a.TAssignment.id = :examId  and a.submitTime > 0 " + " and a.userByStudent.username like g.userByStudent.username)";
        sql += " group by g.TAssignment.id, g.userByStudent.username  order by g.finalScore desc";
        Query query = entityManager.createQuery(sql);
        query.setParameter("examId", examId);
        List<String> students = query.getResultList();
        int sort = -1;
        for (int i = 0; i < students.size(); i++) {
            if (students.get(i).equals(student)) {
                sort = i;
                break;
            }
        }
//        BigDecimal per = new BigDecimal((double)sort).divide(new BigDecimal((double)students.size()),2,BigDecimal.ROUND_HALF_EVEN);
//        per = per.multiply(new BigDecimal(100.0));
//        String result = sort+"（前"+per+"%)";
        return sort;
    }

    /**************************************************************************
     * Description 学生免考
     *
     * @author 黄浩
     * @date 2021年1月18日
     **************************************************************************/
    @Override
    public void examFree(Integer examId, String[] students, String username) {
        TAssignment tAssignment = tAssignmentJPA.findOne(examId);
        User gradeUser = userJPA.findOne(username);
        Date date = new Date();
        for (String student : students) {
            TAssignmentGrading tAssignmentGrading = new TAssignmentGrading();
            tAssignmentGrading.setUserByStudent(userJPA.findOne(student));
            tAssignmentGrading.setFinalScore(tAssignment.getTAssignmentAnswerAssign().getPassingScore());
            tAssignmentGrading.setUserByGradeBy(gradeUser);
            tAssignmentGrading.setSubmitdate(date);
            tAssignmentGrading.setGradeTime(date);
            tAssignmentGrading.setSubmitTime(1);
            tAssignmentGrading.setIslate(0);
            tAssignmentGrading.setTAssignment(tAssignment);
            tAssignmentGradingJPA.save(tAssignmentGrading);
        }
    }
}
