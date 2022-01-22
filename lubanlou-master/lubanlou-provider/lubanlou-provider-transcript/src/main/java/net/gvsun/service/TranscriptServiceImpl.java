package net.gvsun.service;

import net.gvsun.common.Result;
import net.gvsun.configcenter.internal.ConfigIndicatorDTO;
import net.gvsun.configcenter.internal.TimetableDTO;
import net.gvsun.domain.entity.*;
import net.gvsun.domain.respositiry.*;
import net.gvsun.dto.ReportWeightDto;
import net.gvsun.feign.ConfigcenterFeign;
import net.gvsun.feign.UsercenterFeign;
import net.gvsun.transcript.external.TGradeObjectVO;
import net.gvsun.usercenter.internal.ResultDataDto;
import net.gvsun.usercenter.internal.UserDetailDto;
import net.gvsun.util.ConstantInterface;
import net.gvsun.util.DateFormatUtil;
import net.gvsun.util.EmptyUtil;
import net.gvsun.vo.*;
import net.gvsun.vo.practicetimetable.*;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Example;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.text.ParseException;
import java.util.*;
import java.util.function.Consumer;
import java.util.regex.Pattern;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Created by REM on 2019/2/26.
 */
@Service("TranscriptService")
public class TranscriptServiceImpl implements TranscriptService {
    @Autowired
    private EntityManager entityManager;
    @Autowired
    private TGradebookJPA tGradebookJPA;
    @Autowired
    private TGradeObjectJPA tGradeObjectJPA;
    @Autowired
    private TGradeRecordJPA tGradeRecordJPA;
    @Autowired
    private TWeightSettingJPA tWeightSettingJPA;
    @Autowired
    private TTestGradingJPA tTestGradingJPA;
    @Autowired
    private ObjectWeightJPA objectWeightJPA;
    @Autowired
    private ObjectUserJPA objectUserJPA;
    @Autowired
    @Qualifier("datasourceRestTemplate")
    private RestTemplate restTemplate;
    @Autowired
    private UsercenterFeign usercenterFeign;
    @Autowired
    private ConfigcenterFeign configcenterFeign;
    @Autowired
    private JdbcOperations jdbcOperations;

    /*************************************************************************************
     * Description:成绩册-获取成绩
     *
     * @author： 黄浩
     * @date：2019年4月24日
     *************************************************************************************/
    @Override
    public TranscriptVo findTGradeRecords(String module, String type, Integer siteId, String currpage, String pageSize, String cname, String username, String courseNumber, String classesNumber) {
        username = (username == null || username.equals("null")) ? "" : username;
        cname = (cname == null || cname.equals("null")) ? "" : cname;
        classesNumber = (classesNumber == null || classesNumber.equals("null")) ? "" : classesNumber;
        //是否取最高成绩，1：最高成绩，0：按平时权重成绩
        int maxScore = 0;
        if (calculationTotalWeight(module, type, siteId).compareTo(BigDecimal.ZERO) == 0) {
            maxScore = 1;
        }
        Query query = null;
        //暂时将实验项目与教学技能区分开
        if (module.equals("experiment")) {
            query = entityManager.createNativeQuery("{call proc_gradebook_list_experiment(:module,:type,:courseNumber,:username,:cname,:currpage,:pageSize)}");
            query.setParameter("module", module);
            query.setParameter("type", type);
            query.setParameter("courseNumber", courseNumber);
            query.setParameter("username", username);
            query.setParameter("cname", cname);
            query.setParameter("currpage", currpage);
            query.setParameter("pageSize", pageSize);
        } else {
            query = entityManager.createNativeQuery("{call proc_gradebook_list(:module,:type,:siteId,:username,:cname,:currpage,:pageSize,:classesNumber,:maxResult)}");
            query.setParameter("module", module);
            query.setParameter("type", type);
            query.setParameter("siteId", siteId);
            query.setParameter("username", username);
            query.setParameter("cname", cname);
            query.setParameter("currpage", currpage);
            query.setParameter("pageSize", pageSize);
            query.setParameter("classesNumber", classesNumber);
            query.setParameter("maxResult", maxScore);
        }
        // 返回结果
        List<Object[]> queryHQLs = query.getResultList();
        //将返回结果封入vo
        TranscriptVo transcriptVo = new TranscriptVo();
        if (queryHQLs.size() > 0) {
            transcriptVo.setTitle(queryHQLs.get(0)[2].toString());
            transcriptVo.setSiteName(queryHQLs.get(0)[3].toString());
            transcriptVo.setSiteId(siteId);
            String[] arr = transcriptVo.getTitle().split(",");
            int arrLength = arr.length;
            List<TranscriptInfoVo> transcriptInfoVoList = new ArrayList<>();
            for (int i = 1; i < queryHQLs.size(); i++) {
                TranscriptInfoVo transcriptInfoVo = new TranscriptInfoVo();
                if (queryHQLs.get(i)[0] != null) {
                    transcriptInfoVo.setCname(queryHQLs.get(i)[0].toString());
                }
                if (queryHQLs.get(i)[1] != null) {
                    transcriptInfoVo.setUsername(queryHQLs.get(i)[1].toString());
                }
                String results = queryHQLs.get(i)[2].toString();

                transcriptInfoVo.setResults(results);

                transcriptInfoVo.setWeightResult(Double.valueOf(queryHQLs.get(i)[3].toString()));
                if (type.equals("assignment") && module.equals("knowledge")) {
                    transcriptInfoVo.setAdditionScore(Double.valueOf(queryHQLs.get(i)[4].toString()));
                }
                if (type.equals("test") && module.equals("knowledge")) {
                    transcriptInfoVo.setAdditionScore(Double.valueOf(queryHQLs.get(i)[5].toString()));
                }
                if (type.equals("exam") && module.equals("knowledge")) {
                    transcriptInfoVo.setAdditionScore(Double.valueOf(queryHQLs.get(i)[6].toString()));
                }
                if (type.equals("attendance")) {
                    transcriptInfoVo.setAdditionScore(Double.valueOf(queryHQLs.get(i)[7].toString()));
                }
                if (type.equals("action")) {
                    transcriptInfoVo.setAdditionScore(Double.valueOf(queryHQLs.get(i)[6].toString()));
                }
                if (type.equals("assignment") && module.equals("skill")) {
                    transcriptInfoVo.setAdditionScore(Double.valueOf(queryHQLs.get(i)[8].toString()));
                }
                if (type.equals("behavioral") && module.equals("other")) {
                    transcriptInfoVo.setAdditionScore(Double.valueOf(queryHQLs.get(i)[9].toString()));
                }
                if (type.equals("experiment") && module.equals("skill")) {
                    transcriptInfoVo.setAdditionScore(Double.valueOf(queryHQLs.get(i)[10].toString()));
                }
                if (type.equals("prepareExam") && module.equals("skill")) {
                    transcriptInfoVo.setAdditionScore(Double.valueOf(queryHQLs.get(i)[11].toString()));
                }
                //暂时无实验报告额外成绩，先设为0
                if (type.equals("report") && module.equals("skill")) {
                    transcriptInfoVo.setAdditionScore(Double.valueOf(queryHQLs.get(i)[10].toString()));
                }
                if (type.equals("prepareTest") && module.equals("skill")) {
                    transcriptInfoVo.setAdditionScore(Double.valueOf(queryHQLs.get(i)[5].toString()));
                }
                if (type.equals("data") && module.equals("skill")) {
                    transcriptInfoVo.setAdditionScore(Double.valueOf(queryHQLs.get(i)[6].toString()));
                }
                if (type.equals("attendance") && module.equals("skill")) {
                    transcriptInfoVo.setAdditionScore(Double.valueOf(queryHQLs.get(i)[7].toString()));
                }
                if (module.equals("experience")) {
                    transcriptInfoVo.setAdditionScore(Double.valueOf(queryHQLs.get(i)[4].toString()));
                    transcriptInfoVo.setGroupRanking((queryHQLs.get(i)[5].toString()));
                    transcriptInfoVo.setGroupMarking((queryHQLs.get(i)[6].toString()));
                }
                if (module.equals("nominals")) {
                    transcriptInfoVo.setGroupId(Integer.valueOf(queryHQLs.get(i)[12].toString()));
                    transcriptInfoVo.setGroupTitle(queryHQLs.get(i)[13].toString());
                }
                transcriptInfoVoList.add(transcriptInfoVo);
            }
            transcriptVo.setTranscriptInfoVos(transcriptInfoVoList);

        }
        return transcriptVo;
    }

    /*************************************************************************************
     * Description:成绩册-获取成绩
     *
     * @author： 黄浩
     * @date：2019年4月24日
     *************************************************************************************/
    @Override
    public List<Object[]> findTGradeRecordsForGvsunTeach(String module, String type, Integer siteId, String currpage, String pageSize, String cname, String username, String classesNumber) {
        username = (username == null) ? "" : username;
        cname = (cname == null) ? "" : cname;
        classesNumber = (classesNumber == null) ? "" : classesNumber;
        int maxScore = 0;
        if (calculationTotalWeight(module, type, siteId).compareTo(BigDecimal.ZERO) == 0) {
            maxScore = 1;
        }
        Query query = entityManager.createNativeQuery("{call proc_gradebook_list(:module,:type,:siteId,:username,:cname,:currpage,:pageSize,:classesNumber,:maxResult)}");
        // 返回结果
        query.setParameter("module", module);
        query.setParameter("type", type);
        query.setParameter("siteId", siteId);
        query.setParameter("username", username);
        query.setParameter("cname", cname);
        query.setParameter("currpage", currpage);
        query.setParameter("pageSize", pageSize);
        query.setParameter("classesNumber", classesNumber);
        query.setParameter("maxResult", maxScore);
        List<Object[]> queryHQLs = query.getResultList();
        String[] arr = queryHQLs.get(0)[2].toString().split(",");
        int arrLength = arr.length;
        for (int i = 1; i < queryHQLs.size(); i++) {

            String results = queryHQLs.get(i)[2].toString();
            //补全没查到的成绩
            String[] resultArr = results.split(",");
            int resultLength = resultArr.length;
            if (arrLength - resultLength > 0) {
                for (int j = 0; j < arrLength - resultLength; j++) {
                    results += ",0.00";
                }
            }
            queryHQLs.get(i)[2] = results;
        }
        return queryHQLs;
    }

    /*************************************************************************************
     * Description:成绩册-更新最新总成绩
     *
     * @author： 黄浩
     * @date：2019年4月25日
     *************************************************************************************/
    @Override
    @Transactional
    public void synchronizeTTestGrading(int siteId) {
        Query query = entityManager.createNativeQuery("{call proc_t_test_grading_synchronize(:siteId)}");
        query.setParameter("siteId", siteId);
        query.executeUpdate();
    }

    /*************************************************************************************
     * Description:成绩册-更新最新额外成绩
     *
     * @author： 黄浩
     * @date：2019年4月25日
     *************************************************************************************/
    @Override
    @Transactional
    public void saveTTestGrading(String module, String type, int siteId, String student, float score) {
        Query query = entityManager.createNativeQuery("{call proc_t_test_grading_update(:module,:type,:siteId,:student,:score)}");
        query.setParameter("module", module);
        query.setParameter("type", type);
        query.setParameter("siteId", siteId);
        query.setParameter("student", student);
        query.setParameter("score", score);
        query.executeUpdate();
    }

    /*************************************************************************************
     * Description:成绩册-获取成绩
     *
     * @author： 黄浩
     * @date：2019年4月24日
     *************************************************************************************/
    @Override
    public TotalVo findTotalGradeBooks(Integer siteId, String currpage, String pageSize, String username, String cname, String classesNumber) {
        username = (username == null) ? "" : username;
        cname = (cname == null) ? "" : cname;
        classesNumber = (classesNumber == null) ? "" : classesNumber;
        Query query = entityManager.createNativeQuery("{call proc_gradebook_total_list(:siteId,:username,:cname,:currpage,:pageSize,:classesNumber)}");
        query.setParameter("siteId", siteId);
        query.setParameter("username", username);
        query.setParameter("cname", cname);
        query.setParameter("currpage", currpage);
        query.setParameter("pageSize", pageSize);
        query.setParameter("classesNumber", classesNumber);
        List<Object[]> queryHQLs = query.getResultList();
        TotalVo totalVo = new TotalVo();
        //定义列表
        List<TotalGradeBookVO> totalGradeBookVOs = new ArrayList<TotalGradeBookVO>();
        if (queryHQLs.size() > 0) {
            totalVo.setSiteName(queryHQLs.get(0)[20].toString());
            for (Object[] object : queryHQLs) {
                TotalGradeBookVO totalGradeBookVO = new TotalGradeBookVO();
                totalGradeBookVO.setId(Integer.parseInt(object[0].toString()));
                totalGradeBookVO.setSiteId(Integer.parseInt(object[1].toString()));
                totalGradeBookVO.setCname(object[2].toString());
                totalGradeBookVO.setUsername(object[3].toString());
                totalGradeBookVO.setAssignmentScore(object[4].toString());
                totalGradeBookVO.setTestScore(object[5].toString());
                totalGradeBookVO.setSkillTestScore(object[6].toString());
                totalGradeBookVO.setExamScore(object[7].toString());
                totalGradeBookVO.setAttendenceScore(object[8].toString());
                totalGradeBookVO.setExperimentScore(object[9].toString());
                totalGradeBookVO.setActionScore(object[10].toString());
                totalGradeBookVO.setExperienceScore(object[11].toString());
                totalGradeBookVO.setSkillAssignmentScore(object[12].toString());
                totalGradeBookVO.setSkillReportScore(object[13].toString());
                totalGradeBookVO.setSkillDataScore(object[14].toString());
                totalGradeBookVO.setSkillAttendanceScore(object[15].toString());
                totalGradeBookVO.setExperienceWorkScore(object[16].toString());
                if (object[17] != null) {
                    totalGradeBookVO.setWeightScore(object[17].toString());
                }
                if (object[18] != null) {
                    totalGradeBookVO.setAdditionScore(object[18].toString());
                }
                if (object[19] != null) {
                    totalGradeBookVO.setUpdateTime(object[19].toString());
                }
                totalGradeBookVOs.add(totalGradeBookVO);
            }
        }
        totalVo.setTotalInfoVos(totalGradeBookVOs);
        // 返回结果

        return totalVo;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public void synchronizeTGradeObject(Integer siteId, String siteName, List<TGradeObjectVO> list) {
        List<TGradebook> tGradebooks = tGradebookJPA.findTGradebookInSite(siteId);
        TGradebook tGradebook = null;
        //有成绩册则使用该成绩册
        if (tGradebooks.size() > 0) {
            tGradebook = tGradebooks.get(0);
        } else {
            //该课程站点无成绩册则新建
            tGradebook = new TGradebook();
        }
        tGradebook.setSiteId(siteId);
        tGradebook.setTitle(siteName);
        tGradebook = tGradebookJPA.save(tGradebook);
        List<TGradeObject> newTGradeObjects = new ArrayList<>();
        for (TGradeObjectVO t : list) {
            List<TGradeObject> tGradeObjects = tGradeObjectJPA.findTGradeObjectByBookIdAndAid(tGradebook.getId(), t.getAssignmentId());
            if (tGradeObjects.size() == 0) {
                TGradeObject tGradeObject = new TGradeObject();
                tGradeObject.setAssignmentId(t.getAssignmentId().toString());
                tGradeObject.setGradeId(tGradebook.getId());
                tGradeObject.setTitle(t.getAssignmentTitle());
                tGradeObject.setType(t.getType());
                //默认权重为1
                tGradeObject.setWeight(new BigDecimal(1.0));
                //设置模块
                tGradeObject.setModule(t.getModule());
                tGradeObject.setIsOpen(1);
                tGradeObject.setReleased(0);
                tGradeObject.setMarked(1);
                if (t.getExperimentId() != null) {
                    tGradeObject.setExperimentId(t.getExperimentId());
                }
                if (!EmptyUtil.isEmpty(t.getAssignmentTitle())) {
                    tGradeObject.setExperimentTitle(t.getAssignmentTitle());
                }
                newTGradeObjects.add(tGradeObject);
            }
        }
        tGradeObjectJPA.saveAll(newTGradeObjects);
    }

    /**************************************************************************
     * Description：创建成绩册
     *
     * @author：黄浩
     * @date ：2019年4月26日
     **************************************************************************/
    @Override
    public boolean createGradeBook(Integer siteId, String siteName, String assignmentId,
                                   String assignmentTitle, String type, Double weight, String module,
                                   Integer experimentId, String experimentTitle, String courseNumber,
                                   String product, String termNumber, String termName, Integer isOpen) {
        //查询课程对应成绩簿
        List<TGradebook> tGradebooks = null;
        if (module.equals("experiment") || module.equals("practiceTimetable") || module.equals("configcenter")) {
            tGradebooks = tGradebookJPA.findTGradebookInCourseNumber(courseNumber);
        } else {
            tGradebooks = tGradebookJPA.findTGradebookInSite(siteId);//教学
        }
        TGradebook tGradebook = null;
        //有成绩册则使用该成绩册
        if (tGradebooks.size() > 0) {
            tGradebook = tGradebooks.get(0);
        } else {
            //该课程站点无成绩册则新建
            tGradebook = new TGradebook();
        }
        tGradebook.setSiteId(siteId);
        tGradebook.setTitle(siteName);
        tGradebook.setCourseNumber(courseNumber);
        tGradebook.setProduct(product);
        tGradebook.setTermNumber(termNumber);
        tGradebook.setTermName(termName);
        tGradebook = tGradebookJPA.save(tGradebook);
        //根据成绩册id和测验id查找试题
        List<TGradeObject> tGradeObjects = null;
        if (module.equals("configcenter")) {
            tGradeObjects = tGradeObjectJPA.findListByExperimentTitle(experimentTitle);
        } else {
            tGradeObjects = tGradeObjectJPA.findTGradeObjectByBookIdAndAid(tGradebook.getId(), assignmentId);
        }
        TGradeObject tGradeObject = null;
        //查询是否有该作业（或测验）的成绩单，有成绩单则直接添加学生成绩记录
        if (tGradeObjects.size() > 0) {
            tGradeObject = tGradeObjects.get(0);
        } else {
            //没有则新建成绩单
            tGradeObject = new TGradeObject();
            if (experimentId != null) {
                tGradeObject.setExperimentId(experimentId);
            }
        }
        tGradeObject.setAssignmentId(assignmentId.toString());
        tGradeObject.setGradeId(tGradebook.getId());
        tGradeObject.setTitle(assignmentTitle);
        //拼错处理
        if (type.equals("attendence")) {
            type = "attendance";
        }
        tGradeObject.setType(type);
        //默认权重为1
        tGradeObject.setWeight(new BigDecimal(weight));
        //设置模块
        tGradeObject.setModule(module);
        tGradeObject.setIsOpen(isOpen == null ? 1 : isOpen);
        if (!EmptyUtil.isEmpty(experimentTitle)) {
            tGradeObject.setExperimentTitle(experimentTitle);
        }
        tGradeObject.setReleased(0);
        tGradeObject.setMarked(1);

        tGradeObjectJPA.save(tGradeObject);
        if (tGradeObject.getId() != null) {
            return true;
        } else {
            return false;
        }
    }

    /**************************************************************************
     * Description：新增成绩数据
     *
     * @author：黄浩
     * @date ：2019年4月26日
     **************************************************************************/
    @Override
    public JsonReturnVo saveRecord(Integer siteId, String assignmentId, String username, String cname, Double points, String module, Integer experimentId, String courseNumber) {
        //查询某一项作业的成绩册
        TGradeObject tGradeObject = null;
        if (!EmptyUtil.isEmpty(module) && assignmentId == null && module.equals("skill")) {
            //凌速无assignmentId的实验项目特殊情况
            tGradeObject = tGradeObjectJPA.findTGradeObjectBySiteIdAndExperimentId(siteId, experimentId).get(0);
        } else if (!EmptyUtil.isEmpty(module) && module.equals("experiment")) {
            tGradeObject = tGradeObjectJPA.findTGradeObjectByCourseNumber(courseNumber, assignmentId);
        } else {
            tGradeObject = tGradeObjectJPA.findTGradeObjectBySiteId(siteId, assignmentId);
        }
        //如果学生信息在保存成绩之前没有查询到，在此进行自动添加
        this.initializeTTestGrading(siteId, username, cname, null, null, courseNumber, null);
        if (tGradeObject != null) {
            TGradeRecord tGradeRecord = tGradeRecordJPA.findTGradeRecordByStudentNumberAndObjectId(username, tGradeObject.getId());
            if (tGradeRecord == null) {
                tGradeRecord = new TGradeRecord();
                tGradeRecord.setStudentNumber(username);
                tGradeRecord.setCname(cname);
                tGradeRecord.setObjectId(tGradeObject.getId());
                tGradeRecord.setPoints(new BigDecimal(points));
            } else {
//                if (points.compareTo(tGradeRecord.getPoints().doubleValue())==1) {//如果新成绩高，则覆盖
                tGradeRecord.setPoints(new BigDecimal(points));
//                }
            }
            tGradeRecord.setRecordTime(new Date());

            TGradeRecord newTGradeRecord = tGradeRecordJPA.save(tGradeRecord);
            return JsonReturnVo.successJson("保存成功，返回成绩:" + newTGradeRecord.getPoints());
        } else {
            return JsonReturnVo.errorJson("保存失败，可能成绩册不存在");
        }
    }

    @Override
    public Result batchSaveRecord(Integer siteId, String assignmentId, List<net.gvsun.transcript.external.UserVo> list) {
        TGradeObject tGradeObject = tGradeObjectJPA.findTGradeObjectBySiteId(siteId, assignmentId);
        if (tGradeObject != null) {
            List<TGradeRecord> recordList = new ArrayList<>();
            for (net.gvsun.transcript.external.UserVo userVo : list) {
                String username = userVo.getUsername();
                String cname = userVo.getCname();
                initializeTTestGrading(siteId, username, cname, null, null, null, null);
                TGradeRecord tGradeRecord = tGradeRecordJPA.findTGradeRecordByStudentNumberAndObjectId(username, tGradeObject.getId());
                if (tGradeRecord == null) {
                    tGradeRecord = new TGradeRecord();
                    tGradeRecord.setStudentNumber(username);
                    tGradeRecord.setCname(cname);
                    tGradeRecord.setObjectId(tGradeObject.getId());
                    tGradeRecord.setPoints(new BigDecimal(userVo.getFinalScore()));
                } else {
                    tGradeRecord.setPoints(new BigDecimal(userVo.getFinalScore()));
                }
                tGradeRecord.setRecordTime(new Date());
                recordList.add(tGradeRecord);
            }
            tGradeRecordJPA.saveAll(recordList);
        } else {
            return Result.failed("保存失败，指定成绩册不存在，请创建成绩册");
        }
        return Result.ok("保存成功");
    }

    /****************************************************************************
     * Description:设置成绩权重(t_grade_object表)
     *
     * @author：黄浩
     * @date：2018-2-5
     *****************************************************************************/
    @Override
    public void singleWeightSetting(String weightStr, String idStr, String functionType) {
        if (idStr != null) {
            String[] weightArr = weightStr.split(",");
            String[] idArr = idStr.split(",");
            //如果成绩簿题目不为空
            int i = 0;
            //每个题目设置权重
            for (String objectId : idArr) {
                TGradeObject getTGradeObject = new TGradeObject();
                getTGradeObject.setId(Integer.valueOf(objectId));
                Example<TGradeObject> example = Example.of(getTGradeObject);
                TGradeObject tGradeObject = tGradeObjectJPA.findOne(example).get();
                if (weightStr != null) {
                    String weights = weightArr[i];
                    String weightList[] = weights.split("\\.");
                    if (Integer.valueOf(functionType) == 0) {
                        BigDecimal weight = new BigDecimal(Integer.valueOf(weightList[0]) / 100.0);
                        tGradeObject.setWeight(weight);
                        weight = weight.setScale(2, BigDecimal.ROUND_HALF_UP);
                        if (weight.compareTo(BigDecimal.ZERO) == 0.00) {
                            tGradeObject.setIsOpen(0);
                        } else {
                            tGradeObject.setIsOpen(1);
                        }
                    }
                    if (Integer.valueOf(functionType) == 1) {
                        BigDecimal weight = new BigDecimal(0 / 100.0);
                        tGradeObject.setIsOpen(1);
                        tGradeObject.setWeight(weight);
                    }
                }
                if (Integer.valueOf(functionType) == 2) {
                    BigDecimal weight = new BigDecimal(100 / 100.0);
                    tGradeObject.setIsOpen(1);
                    tGradeObject.setWeight(weight);
                }
                tGradeObjectJPA.save(tGradeObject);
                i++;
            }
        }
    }

    /**************************************************************************
     * Description 通过type查询权重
     *
     * @author 马帅
     * @date 2018年2月1日
     * @param siteId 站点id
     * @param type 需要查询的类型
     * @return 权重List
     **************************************************************************/
    @Override
    public List<TWeightSettingVO> findTWeightSettingListByType(Integer siteId, String type) {
        List<TWeightSetting> list = new ArrayList<>();
        List<TWeightSettingVO> tWeightSettingVOList = new ArrayList<>();
        if ("groupStage".equals(type)) {
            List<TGradeObject> tGradeObjectList = tGradeObjectJPA.findTGradeObjectBySiteIdAndModule(siteId, "experience");
            for (TGradeObject t : tGradeObjectList) {
                TWeightSettingVO tWeightSettingVO = new TWeightSettingVO();
                tWeightSettingVO.setId(t.getId());
                tWeightSettingVO.setType(t.getType());
                tWeightSettingVO.setWeight(t.getWeight());
                tWeightSettingVO.setName(t.getTitle());
                tWeightSettingVOList.add(tWeightSettingVO);
            }
        }
//        else if ("exScore".equals(type)) {
//            String type1 = "('expreport','exptest','expwork')";
//            String sql = "select w from TWeightSetting w where w.siteId=" + siteId;
//            sql += " and w.type in " + type1;
//            list = entityManager.createQuery(sql).getResultList();
//            if (list.size() <= 0) {
//                //向数据库中添加相关数据
//                String typeList[] = {"expreport", "exptest", "expwork","exdata","exattendance"};
//                for (int i = 0; i < 5; i++) {
//                    TWeightSetting setting = new TWeightSetting();
//                    setting.setSiteId(siteId);
//                    setting.setType(typeList[i]);
//                    setting.setWeight(new BigDecimal(1));
//                    setting.setCreateDate(Calendar.getInstance().getTime());
//                    setting.setModifyDate(Calendar.getInstance().getTime());
//                    tWeightSettingJPA.save(setting);
//
//                }
//            }
//            list = entityManager.createQuery(sql).getResultList();
//            for (TWeightSetting t : list) {
//                TWeightSettingVO tWeightSettingVO = new TWeightSettingVO();
//                tWeightSettingVO.setId(t.getId());
//                tWeightSettingVO.setType(t.getType());
//                tWeightSettingVO.setWeight(t.getWeight());
//                tWeightSettingVOList.add(tWeightSettingVO);
//            }
//        }
        else if ("groupTeach".equals(type)) {
            String sql = "select w from TWeightSetting w where w.siteId=:siteId and w.type in('teach','judges')";
            Query query = entityManager.createQuery(sql);
            query.setParameter("siteId", siteId);
            list = query.getResultList();
            if (list.size() <= 0) {
                //向数据库中添加相关数据
                String typeList[] = {"teach", "judges"};
                for (int i = 0; i < 2; i++) {
                    TWeightSetting setting = new TWeightSetting();
                    setting.setSiteId(siteId);
                    setting.setType(typeList[i]);
                    setting.setWeight(new BigDecimal(1));
                    setting.setCreateDate(Calendar.getInstance().getTime());
                    setting.setModifyDate(Calendar.getInstance().getTime());
                    tWeightSettingJPA.save(setting);
                }
            }
            list = query.getResultList();
            for (TWeightSetting t : list) {
                TWeightSettingVO tWeightSettingVO = new TWeightSettingVO();
                tWeightSettingVO.setId(t.getId());
                tWeightSettingVO.setType(t.getType());
                tWeightSettingVO.setWeight(t.getWeight());
                tWeightSettingVOList.add(tWeightSettingVO);
            }
        } else if ("allWeightSetting".equals(type)) {
            String sql = "select w from TWeightSetting w where w.siteId=:siteId and w.type in('assignment','exam','test','attendance','group','behavior', 'expwork','expreport', 'exptest','expdata','expattendance','experiencework')";
            Query query = entityManager.createQuery(sql);
            query.setParameter("siteId", siteId);
            list = query.getResultList();
            if (list.size() < 12) {
                //向数据库中添加相关数据
                String typeList[] = {"assignment", "exam", "test", "attendance", "group", "behavior", "expwork", "expreport", "exptest", "expdata", "expattendance", "practice",
                        "wordCloud", "knSpace", "remoteExp", "skSpace", "crSpace", "notice", "timetable", "resourceContainer", "resourceManagement", "onlineAtlas", "courseCopy", "manageExam", "manageTest", "experiencework"};
//                //siteId=0为基础数据（跟成绩相关）,应该有12条，如果不够，则通过代码新增数据
                for (int i = 0; i < 11; i++) {
                    TWeightSetting tweight = tWeightSettingJPA.findTWeightSettingBySiteIdAndType(siteId, typeList[i]);
                    TWeightSetting setting;
                    if (tweight != null) {
                        setting = tweight;
                    } else {
                        setting = new TWeightSetting();
                    }
                    setting.setSiteId(siteId);
                    setting.setType(typeList[i]);
                    setting.setWeight(new BigDecimal(1));
                    setting.setCreateDate(Calendar.getInstance().getTime());
                    setting.setModifyDate(Calendar.getInstance().getTime());
                    if (siteId == 0) {
                        setting.setDisplay(1);
                    } else {
                        TWeightSetting tws = tWeightSettingJPA.findTWeightSettingBySiteIdAndType(0, typeList[i]);
                        if (tws == null) {
                            TWeightSetting a = new TWeightSetting();
                            a.setSiteId(0);
                            a.setType(typeList[i]);
                            a.setWeight(new BigDecimal(1));
                            a.setDisplay(1);
                            tWeightSettingJPA.save(a);
                        }
                        setting.setDisplay(tWeightSettingJPA.findTWeightSettingBySiteIdAndType(0, typeList[i]).getDisplay());
                    }
                    tWeightSettingJPA.save(setting);
                }
            }
            list = query.getResultList();
            for (TWeightSetting t : list) {
                TWeightSettingVO tWeightSettingVO = new TWeightSettingVO();
                tWeightSettingVO.setId(t.getId());
                tWeightSettingVO.setType(t.getType());
                tWeightSettingVO.setWeight(t.getWeight());
                tWeightSettingVO.setDisPlay(t.getDisplay());
                tWeightSettingVOList.add(tWeightSettingVO);
            }
            //旧课程新增两个权重处理，新课程不会走此步骤
            String sql2 = "select w from TWeightSetting w where w.siteId=:siteId and w.type in('experiencework')";
            Query query1 = entityManager.createQuery(sql2);
            query1.setParameter("siteId", siteId);
            List<TWeightSetting> oldList = query1.getResultList();
            if (oldList.size() <= 0) {
                //向数据库中添加相关数据
                String typeList[] = {"experiencework"};
                for (int j = 0; j < 1; j++) {
                    TWeightSetting setting = new TWeightSetting();
                    setting.setSiteId(siteId);
                    setting.setType(typeList[j]);
                    setting.setWeight(new BigDecimal(1));
                    setting.setCreateDate(Calendar.getInstance().getTime());
                    setting.setModifyDate(Calendar.getInstance().getTime());
                    if (siteId == 0) {
                        setting.setDisplay(1);
                    } else {
                        TWeightSetting tws = tWeightSettingJPA.findTWeightSettingBySiteIdAndType(0, typeList[j]);
                        if (tws == null) {
                            TWeightSetting a = new TWeightSetting();
                            a.setSiteId(0);
                            a.setType(typeList[j]);
                            a.setWeight(new BigDecimal(1));
                            a.setDisplay(1);
                            tWeightSettingJPA.save(a);
                        }
                        setting.setDisplay(tWeightSettingJPA.findTWeightSettingBySiteIdAndType(0, typeList[j]).getDisplay());
                    }
                    tWeightSettingJPA.save(setting);
                }
                oldList = query1.getResultList();
                for (TWeightSetting t : oldList) {
                    TWeightSettingVO tWeightSettingVO = new TWeightSettingVO();
                    tWeightSettingVO.setId(t.getId());
                    tWeightSettingVO.setType(t.getType());
                    tWeightSettingVO.setWeight(t.getWeight());
                    tWeightSettingVO.setDisPlay(t.getDisplay());
                    tWeightSettingVOList.add(tWeightSettingVO);
                }
            }
        }
        //学习行为各项权重开始
        else if ("action".equals(type)) {
            String sql = "select w from TWeightSetting w where w.siteId=:siteId and w.type = 'actionFullMark'";
            Query query = entityManager.createQuery(sql);
            query.setParameter("siteId", siteId);
            list = query.getResultList();
            if (list.size() <= 0) {
                //向数据库中添加相关数据
                TWeightSetting setting = new TWeightSetting();
                setting.setSiteId(siteId);
                setting.setType("actionFullMark");
                setting.setWeight(new BigDecimal(0.66));
                setting.setCreateDate(Calendar.getInstance().getTime());
                setting.setModifyDate(Calendar.getInstance().getTime());
                tWeightSettingJPA.save(setting);
            }
            list = query.getResultList();
            for (TWeightSetting t : list) {
                TWeightSettingVO tWeightSettingVO = new TWeightSettingVO();
                tWeightSettingVO.setId(t.getId());
                tWeightSettingVO.setType(t.getType());
                tWeightSettingVO.setWeight(t.getWeight());
                tWeightSettingVOList.add(tWeightSettingVO);
            }
            String sql4 = "select w from TWeightSetting w where w.siteId=:siteId and w.type = 'actionEffectiveStudyFullMark'";
            Query query1 = entityManager.createQuery(sql4);
            query1.setParameter("siteId", siteId);
            list = query1.getResultList();
            if (list.size() <= 0) {
                //向数据库中添加相关数据
                TWeightSetting setting = new TWeightSetting();
                setting.setSiteId(siteId);
                setting.setType("actionEffectiveStudyFullMark");
                setting.setWeight(new BigDecimal(0.66));
                setting.setCreateDate(Calendar.getInstance().getTime());
                setting.setModifyDate(Calendar.getInstance().getTime());
                tWeightSettingJPA.save(setting);
            }
            list = query1.getResultList();
            for (TWeightSetting t : list) {
                TWeightSettingVO tWeightSettingVO = new TWeightSettingVO();
                tWeightSettingVO.setId(t.getId());
                tWeightSettingVO.setType(t.getType());
                tWeightSettingVO.setWeight(t.getWeight());
                tWeightSettingVOList.add(tWeightSettingVO);
            }
            String sql5 = "select w from TWeightSetting w where w.siteId=:siteId and w.type = 'actionTotalStudyFullMark'";
            Query query2 = entityManager.createQuery(sql5);
            query2.setParameter("siteId", siteId);
            list = query2.getResultList();
            if (list.size() <= 0) {
                //向数据库中添加相关数据
                TWeightSetting setting = new TWeightSetting();
                setting.setSiteId(siteId);
                setting.setType("actionTotalStudyFullMark");
                setting.setWeight(new BigDecimal(0.66));
                setting.setCreateDate(Calendar.getInstance().getTime());
                setting.setModifyDate(Calendar.getInstance().getTime());
                tWeightSettingJPA.save(setting);
            }
            list = query2.getResultList();
            for (TWeightSetting t : list) {
                TWeightSettingVO tWeightSettingVO = new TWeightSettingVO();
                tWeightSettingVO.setId(t.getId());
                tWeightSettingVO.setType(t.getType());
                tWeightSettingVO.setWeight(t.getWeight());
                tWeightSettingVOList.add(tWeightSettingVO);
            }
            String sql1 = "select w from TWeightSetting w where w.siteId=:siteId and w.type = 'actionOnlineTime'";
            Query query3 = entityManager.createQuery(sql1);
            query3.setParameter("siteId", siteId);
            list = query3.getResultList();
            if (list.size() <= 0) {
                //向数据库中添加相关数据
                TWeightSetting setting = new TWeightSetting();
                setting.setSiteId(siteId);
                setting.setType("actionOnlineTime");
                setting.setWeight(new BigDecimal(1));
                setting.setCreateDate(Calendar.getInstance().getTime());
                setting.setModifyDate(Calendar.getInstance().getTime());
                tWeightSettingJPA.save(setting);
            }
            list = query3.getResultList();
            for (TWeightSetting t : list) {
                TWeightSettingVO tWeightSettingVO = new TWeightSettingVO();
                tWeightSettingVO.setId(t.getId());
                tWeightSettingVO.setType(t.getType());
                tWeightSettingVO.setWeight(t.getWeight());
                tWeightSettingVOList.add(tWeightSettingVO);
            }
            String sql2 = "select w from TWeightSetting w where w.siteId=:siteId and w.type = 'actionEffectiveStudy'";
            Query query4 = entityManager.createQuery(sql2);
            query4.setParameter("siteId", siteId);
            list = query4.getResultList();
            if (list.size() <= 0) {
                //向数据库中添加相关数据
                TWeightSetting setting = new TWeightSetting();
                setting.setSiteId(siteId);
                setting.setType("actionEffectiveStudy");
                setting.setWeight(new BigDecimal(1));
                setting.setCreateDate(Calendar.getInstance().getTime());
                setting.setModifyDate(Calendar.getInstance().getTime());
                tWeightSettingJPA.save(setting);
            }
            list = query4.getResultList();
            for (TWeightSetting t : list) {
                TWeightSettingVO tWeightSettingVO = new TWeightSettingVO();
                tWeightSettingVO.setId(t.getId());
                tWeightSettingVO.setType(t.getType());
                tWeightSettingVO.setWeight(t.getWeight());
                tWeightSettingVOList.add(tWeightSettingVO);
            }
            String sql3 = "select w from TWeightSetting w where w.siteId=:siteId and w.type = 'actionTotalStudy'";
            Query query5 = entityManager.createQuery(sql3);
            query5.setParameter("siteId", siteId);
            list = query5.getResultList();
            if (list.size() <= 0) {
                //向数据库中添加相关数据
                TWeightSetting setting = new TWeightSetting();
                setting.setSiteId(siteId);
                setting.setType("actionTotalStudy");
                setting.setWeight(new BigDecimal(1));
                setting.setCreateDate(Calendar.getInstance().getTime());
                setting.setModifyDate(Calendar.getInstance().getTime());
                tWeightSettingJPA.save(setting);
            }
            list = query5.getResultList();
            for (TWeightSetting t : list) {
                TWeightSettingVO tWeightSettingVO = new TWeightSettingVO();
                tWeightSettingVO.setId(t.getId());
                tWeightSettingVO.setType(t.getType());
                tWeightSettingVO.setWeight(t.getWeight());
                tWeightSettingVOList.add(tWeightSettingVO);
            }
        }
        //学习行为各项权重结束

        return tWeightSettingVOList;
    }

    /**************************************************************************
     * Description 查询成绩册VO
     *
     * @author 马帅
     * @date 2018年1月31日
     * @param siteId 站点id
     * @param type 类型
     * @return 成绩册VO
     **************************************************************************/
    @Override
    public List<TGradeObjectVO> findTGradeObjects(String module, String type, Integer siteId) {
        List<TGradeObjectVO> tGradeObjectVOList = new ArrayList<TGradeObjectVO>();
        List<TGradeObject> tGradeObjects = null;
        if (module.equals("skill") && EmptyUtil.isEmpty(type)) {
            tGradeObjects = tGradeObjectJPA.findTGradeObjectBySiteIdAndModuleGroupByExperimentId(siteId, module);
        } else {
            tGradeObjects = tGradeObjectJPA.findTGradeObjectBySiteIdAndModuleAndType(siteId, module, type);
        }
        for (TGradeObject t : tGradeObjects) {
            TGradeObjectVO tGradeObjectVO = new TGradeObjectVO();
            tGradeObjectVO.setId(t.getId());
            tGradeObjectVO.setName(t.getTitle());
            //将权重BigDecimal转成String类型在放入VO中
            tGradeObjectVO.setPerWeight(t.getWeight().multiply(new BigDecimal(100)).toString() + "%");
            tGradeObjectVO.setWeight(t.getWeight());
            tGradeObjectVO.setType(t.getType());
            tGradeObjectVO.setModule(t.getModule());
            if (module.equals("skill")) {
                tGradeObjectVO.setExperimentId(t.getExperimentId());
            }
            tGradeObjectVO.setAssignmentId(t.getAssignmentId());
            tGradeObjectVOList.add(tGradeObjectVO);
        }
        return tGradeObjectVOList;
    }

    /****************************************************************************
     * Description:设置成绩权重(t_weight_setting表)
     *
     * @author：黄浩
     * @date：2018-2-5
     *****************************************************************************/
    @Override
    public void weightSetting(String weightStr, String idStr, String functionType, String displayStr) {
        if (idStr != null) {
            String[] weightArr = weightStr.split(",");
            String[] idArr = idStr.split(",");
            String[] displayArr = null;
            if (!EmptyUtil.isEmpty(displayStr)) {
                displayArr = displayStr.split(",");
            }

            //如果成绩簿题目不为空
            int i = 0;
            //每个题目设置权重
            //
            for (String objectId : idArr) {
                TWeightSetting getTWeightSetting = new TWeightSetting();
                getTWeightSetting.setId(Integer.valueOf(objectId));
                Example<TWeightSetting> example = Example.of(getTWeightSetting);
                TWeightSetting tWeightSetting = tWeightSettingJPA.findOne(example).get();
                if (weightStr != null) {
                    String weights = weightArr[i];
                    //String weightList[] = weights.split(".");
                    if (Integer.valueOf(functionType) == 0) {
                        BigDecimal weight = new BigDecimal(Math.floor(Double.valueOf(weights)) / 100.0);
                        tWeightSetting.setWeight(weight);
                    }
                    if (Integer.valueOf(functionType) == 1) {
                        BigDecimal weight = new BigDecimal(0 / 100.0);
                        tWeightSetting.setWeight(weight);
                    }
                }
                if (Integer.valueOf(functionType) == 2) {
                    BigDecimal weight = new BigDecimal(100 / 100.0);
                    tWeightSetting.setWeight(weight);
                }
                if (!EmptyUtil.isEmpty(displayStr)) {
                    if (Integer.valueOf(displayArr[i]) == 0) {
                        BigDecimal weight = new BigDecimal(0 / 100.0);
                        tWeightSetting.setWeight(weight);
                    }
                    tWeightSetting.setDisplay(Integer.parseInt(displayArr[i]));
                }
                tWeightSettingJPA.save(tWeightSetting);
                i++;
            }
        }
    }

    /**************************************************************************
     * Description 通过type查询权重
     *
     * @author 魏诚
     * @date 2018年8月19日
     **************************************************************************/
    @Override
    public TotalWeightSettingVO findTWeightSetting(Integer siteId) {
        //获取该站点的所有全局权重定义
        List<TWeightSetting> tWeightSettings = tWeightSettingJPA.findTWeightSettingsBySiteId(siteId);
        TotalWeightSettingVO totalWeightSettingVO = new TotalWeightSettingVO();
        //判断是否为整数
        Pattern pattern = Pattern.compile("^[-\\+]?[\\d]*$");
        //定义小组权重
        List<Map<Integer, Double>> weightGroupWeights = new ArrayList<Map<Integer, Double>>();
        for (TWeightSetting tWeightSetting : tWeightSettings) {
            String weightType = pattern.matcher(tWeightSetting.getType()).matches() ? ConstantInterface.STRING_COMMON_TRUE : tWeightSetting.getType();
            if (ConstantInterface.TEACHING_ACTIVITY_TYPE_ASSIGNMENT.equals(weightType)) {
                totalWeightSettingVO.setAssignmentWeight(tWeightSetting.getWeight().doubleValue());
            } else if (ConstantInterface.TEACHING_ACTIVITY_TYPE_TEST.equals(weightType)) {
                totalWeightSettingVO.setTestWeight(tWeightSetting.getWeight().doubleValue());
            } else if (ConstantInterface.TEACHING_ACTIVITY_TYPE_EXAM.equals(weightType)) {
                totalWeightSettingVO.setExamWeight(tWeightSetting.getWeight().doubleValue());
            } else if (ConstantInterface.TEACHING_ACTIVITY_TYPE_EXPTEST.equals(weightType)) {
                totalWeightSettingVO.setSkillTestWeight(tWeightSetting.getWeight().doubleValue());
            } else if (ConstantInterface.TEACHING_ACTIVITY_TYPE_ATTENDENCE.equals(weightType)) {
                totalWeightSettingVO.setAttendenceWeight(tWeightSetting.getWeight().doubleValue());
            } else if (ConstantInterface.TEACHING_ACTIVITY_TYPE_EXPERIMENT.equals(weightType)) {
                totalWeightSettingVO.setExperimentWeight(tWeightSetting.getWeight().doubleValue());
            } else if (ConstantInterface.TEACHING_ACTIVITY_TYPE_TEACH.equals(weightType)) {
                totalWeightSettingVO.setTeachWeight(tWeightSetting.getWeight().doubleValue());
            } else if (ConstantInterface.TEACHING_ACTIVITY_TYPE_JUDGES.equals(weightType)) {
                totalWeightSettingVO.setJudgesWeight(tWeightSetting.getWeight().doubleValue());
            } else if (ConstantInterface.TEACHING_ACTIVITY_TYPE_GROUP.equals(weightType)) {
                totalWeightSettingVO.setExperienceWeight(tWeightSetting.getWeight().doubleValue());
            } else if (ConstantInterface.TEACHING_ACTIVITY_TYPE_BEHAVIOR.equals(weightType)) {
                totalWeightSettingVO.setActionWeight(tWeightSetting.getWeight().doubleValue());
            } else if (ConstantInterface.TEACHING_ACTIVITY_TYPE_EXPWORK.equals(weightType)) {
                totalWeightSettingVO.setSkillAssignmentWeight(tWeightSetting.getWeight().doubleValue());
            } else if (ConstantInterface.TEACHING_ACTIVITY_TYPE_EXPREPORT.equals(weightType)) {
                totalWeightSettingVO.setSkillReportWeight(tWeightSetting.getWeight().doubleValue());
            } else if (ConstantInterface.TEACHING_ACTIVITY_TYPE_EXPDATA.equals(weightType)) {
                totalWeightSettingVO.setSkillDataWeight(tWeightSetting.getWeight().doubleValue());
            } else if (ConstantInterface.TEACHING_ACTIVITY_TYPE_EXPATTENDANCE.equals(weightType)) {
                totalWeightSettingVO.setSkillAttendanceWeight(tWeightSetting.getWeight().doubleValue());
            } else if (ConstantInterface.TEACHING_ACTIVITY_TYPE_EXPERIENCEWORK.equals(weightType)) {
                totalWeightSettingVO.setExperienceWorkWeight(tWeightSetting.getWeight().doubleValue());
            }
        }
        return totalWeightSettingVO;
    }

    /**************************************************************************
     * Description 删除成绩册
     *
     * @author 黄浩
     * @date 2019年5月14日
     **************************************************************************/
    @Override
    @Transactional
    public void deleteTranscript(String assignment, String type, String module, Integer siteId) {
        TGradeObject tGradeObject = null;
        Integer objectId = 0;
        //删除小组
        if ("experience".equals(module)) {
            tGradeObject = tGradeObjectJPA.findTGradeObjectByTypeAndModule(type, module);
            if (tGradeObject != null) {
                objectId = tGradeObject.getId();
                tGradeObjectJPA.delete(tGradeObject);
            }
        }
        //删除除小组外的
        if (assignment != null) {
            tGradeObject = tGradeObjectJPA.findTGradeObjectBySiteId(siteId, assignment);
            if (tGradeObject != null) {
                objectId = tGradeObject.getId();
                tGradeObjectJPA.delete(tGradeObject);
            }
        }
        //删除成绩
        if (objectId != 0) {
            String sql = "delete from t_grade_record where object_id = :objectId";
            Query nativeQuery = entityManager.createNativeQuery(sql);
            nativeQuery.setParameter("objectId", objectId);
            nativeQuery.executeUpdate();
        }
    }

    /****************************************************************************
     * Description:设置实验项目权重
     *
     * @author：黄浩
     * @date：2018-2-5
     *****************************************************************************/
    @Override
    @Transactional
    public void experimentWeightSetting(String weightStr, String idStr, String functionType) {
        if (idStr != null) {
            String[] weightArr = weightStr.split(",");
            String[] idArr = idStr.split(",");
            //如果成绩簿题目不为空
            int i = 0;
            //每个题目设置权重
            for (String objectId : idArr) {
                BigDecimal weight = null;
                String sql = "update t_grade_object set weight = :weight";
                if (weightStr != null) {
                    String weights = weightArr[i];
                    String weightList[] = weights.split("\\.");
                    if (Integer.valueOf(functionType) == 0) {
                        weight = new BigDecimal(Integer.valueOf(weightList[0]) / 100.0);
                        sql += weight;
                    }
                    if (Integer.valueOf(functionType) == 1) {
                        weight = new BigDecimal(0 / 100.0);
                        sql += weight;
                    }
                }
                if (Integer.valueOf(functionType) == 2) {
                    weight = new BigDecimal(100 / 100.0);
                    sql += weight;
                }
                sql += " where experiment_id = :objectId";
                Query nativeQuery = entityManager.createNativeQuery(sql);
                nativeQuery.setParameter("weight", weight);
                nativeQuery.setParameter("objectId", objectId);
                nativeQuery.executeUpdate();
                i++;
            }
        }
    }

    /*************************************************************************************
     * Description:成绩册-初始化总成绩
     *
     * @author： 黄浩
     * @date：2019年4月25日
     *************************************************************************************/
    @Override
    public void initializeTTestGrading(Integer siteId, String student, String cname, Integer groupId, String groupTitle, String courseNumber, String classesNumber) {
        TTestGrading tTestGrading = null;
        //实验项目与教学技能暂时分开
        if (!EmptyUtil.isEmpty(courseNumber)) {
            tTestGrading = tTestGradingJPA.findTTestGradingByStudentAndSAndCourseNumber(student, courseNumber);
        } else {
            tTestGrading = tTestGradingJPA.findTTestGradingByStudentAndSAndSiteId(student, siteId);
        }
        if (tTestGrading == null) {
            tTestGrading = new TTestGrading();
            tTestGrading.setSiteId(siteId);
            tTestGrading.setStudent(student);
            tTestGrading.setCname(cname);
            tTestGrading.setGroupId(groupId);
            tTestGrading.setGroupTitle(groupTitle);
            tTestGrading.setCourseNumber(courseNumber);
            tTestGrading.setClassesNumber(classesNumber);
            tTestGradingJPA.save(tTestGrading);
        }
    }

    /*************************************************************************************
     * Description:成绩册-删除总成绩
     *
     * @author： 黄浩
     * @date：2019年4月25日
     *************************************************************************************/
    @Override
    public void deleteTTestGrading(Integer siteId, String student) {
        TTestGrading tTestGrading = tTestGradingJPA.findTTestGradingByStudentAndSAndSiteId(student, siteId);
        if (tTestGrading != null) {
            tTestGradingJPA.delete(tTestGrading);
        }
    }

    /*************************************************************************************
     * Description:成绩册-批量删除总成绩
     *
     * @author： 黄浩
     * @date：2019年4月25日
     *************************************************************************************/
    @Override
    public void deleteTTestGradings(Integer siteId, String students) {
        String[] usernames = students.split(",");
        List<TTestGrading> list = tTestGradingJPA.findTTestGradingByUsernamesAndsiteId(usernames, siteId);
        if (list.size() > 0) {
            tTestGradingJPA.deleteAll(list);
        }
    }

    /*************************************************************************************
     * Description:成绩册-获取成绩
     *
     * @author： 黄浩
     * @date：2019年4月24日
     *************************************************************************************/
    @Override
    public TranscriptVo findTGradeRecordsPage(String module, String type, Integer siteId, String currpage, String pageSize, String cname, String username, String classesNumber) {
        username = (username == null) ? "" : username;
        cname = (cname == null) ? "" : cname;
        classesNumber = (classesNumber == null) ? "" : classesNumber;
        int maxScore = 0;
        if (calculationTotalWeight(module, type, siteId).compareTo(BigDecimal.ZERO) == 0) {
            maxScore = 1;
        }
        Query query = entityManager.createNativeQuery("{call proc_gradebook_list(:module,:type,:siteId,:username,:cname,:currpage,:pageSize,:classesNumber,:maxResult)}");
        query.setParameter("module", module);
        query.setParameter("type", type);
        query.setParameter("siteId", siteId);
        query.setParameter("username", username);
        query.setParameter("cname", cname);
        query.setParameter("currpage", currpage);
        query.setParameter("pageSize", pageSize);
        query.setParameter("classesNumber", classesNumber);
        query.setParameter("maxResult", maxScore);
        Object assignmentId[] = findAssignmentId(module, type, siteId);
        // 返回结果
        List<Object[]> queryHQLs = query.getResultList();
        //将返回结果封入vo
        TranscriptVo transcriptVo = new TranscriptVo();
        if (queryHQLs.size() > 0) {
            List<SjtudcTranscriptVo> sjtudcTranscriptVoList = new ArrayList<>();

            //定义学生姓名
            String item = "";
            //定义学生用户名
            String student = "";
            String[] arr = queryHQLs.get(0)[2].toString().split(",");
            for (int i = 0; i < arr.length; i++) {
                SjtudcTranscriptVo sjtudcTranscriptVo = new SjtudcTranscriptVo();
                sjtudcTranscriptVo.setPjname(arr[i]);
                sjtudcTranscriptVoList.add(sjtudcTranscriptVo);
            }
            //放入成绩
            //先建一个数组，长度为学生人数
            String[] studentGrades = new String[queryHQLs.size() - 1];
            //定义一个数组计数参数
            int a = 0;
            //循环所有学生的成绩字符串数组，将其放入studentGrades数组中
            for (int j = 1; j < queryHQLs.size(); j++) {
                studentGrades[a] = queryHQLs.get(j)[2].toString();
                a++;
                //拼接学生姓名
                item += queryHQLs.get(j)[0].toString() + ",";
                //拼接学生用户名
                student += queryHQLs.get(j)[1].toString() + ",";
            }
            //初始化计数参数
            a = 0;
            //再建一个数组，长度为考试分项长度
            String[] itemGrades = new String[arr.length];
            //循环放入成绩
            for (int k = 0; k < sjtudcTranscriptVoList.size(); k++) {
                //初始化成绩字符串参数
                String grades = "";
                //循环拼接成绩,循环体为studentGrades字符串数组
                for (int m = 0; m < studentGrades.length; m++) {
                    grades += studentGrades[m].split(",")[k] + ",";
                }
                sjtudcTranscriptVoList.get(k).setPjitem(grades);
                sjtudcTranscriptVoList.get(k).setAssignmentId(Integer.valueOf(assignmentId[k].toString()));
                sjtudcTranscriptVoList.get(k).setStudent(student.split(","));

            }

            transcriptVo.setSjtudcTranscriptVos(sjtudcTranscriptVoList);
            transcriptVo.setTitle(item);
            transcriptVo.setSiteId(siteId);
        }

        return transcriptVo;
    }

    /*************************************************************************************
     * Description:成绩册-获取assignmentId集合
     *
     * @author： 黄浩
     * @date：2019年7月9日
     *************************************************************************************/
    public Object[] findAssignmentId(String module, String type, Integer siteId) {
        String sql = "select GROUP_CONCAT(tgo.assignment_id order by tgo.assignment_id asc) " +
                " from t_gradebook tg " +
                " inner join t_grade_object tgo on tg.id=tgo.grade_id and tgo.module =:module and tgo.type=:type where tg.site_id= :siteId group by tg.site_id";
        Query nativeQuery = entityManager.createNativeQuery(sql);
        nativeQuery.setParameter("module", module);
        nativeQuery.setParameter("type", type);
        nativeQuery.setParameter("siteId", siteId);
        String result = nativeQuery.getSingleResult().toString();
        return result.split(",");
    }

    /*************************************************************************************
     * Description:成绩册-修改某学生某个成绩册的成绩
     *
     * @author： 黄浩
     * @date：2019年7月9日
     *************************************************************************************/
    @Override
    public boolean editTranscript(String student, Integer assignmentId, Double points) {

        TGradeRecord tGradeRecord = tGradeRecordJPA.findTGradeRecordByStudentNumberAndAssignmentId(student, assignmentId);
        tGradeRecord.setPoints(new BigDecimal(points).setScale(1, BigDecimal.ROUND_HALF_UP));
        tGradeRecordJPA.saveAndFlush(tGradeRecord);
        return true;
    }

    /**************************************************************************
     * Description excel导入学生成绩
     *
     * @author 黄浩
     * @date 2019年7月25日
     * @param
     **************************************************************************/
    @Override
    public boolean importRecordByExcel(byte[] bytes, String fileName, Integer siteId, String assignmentId) throws ParseException {
        Date now = new Date();
        String date = DateFormatUtil.dateToString1(now);
        //获取成绩册信息
        TGradeObject tGradeObject = tGradeObjectJPA.findTGradeObjectBySiteId(siteId, assignmentId);
        //将byte转为inputstream
        ByteArrayInputStream input = new ByteArrayInputStream(bytes);
        //用于判断结果
        int result = 0;
        // 判断是否是excel2007格式
        boolean isE2007 = false;
        if (fileName.endsWith("xlsx")) {
            isE2007 = true;
        }

        // 建立输入流
        Workbook wb = null;
        // 根据文件格式(2003或者2007)来初始化
        if (isE2007) {
            try {
                wb = new XSSFWorkbook(input);
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else {
            try {
                wb = new HSSFWorkbook(input);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        // 获得第一个表单
        Sheet sheet = wb.getSheetAt(0);
        // 获得第一个表单的迭代器
        Iterator<Row> rows = sheet.rowIterator();
        Row rowContent = null;// 表头
        String insertUserData = "";
        String username = "";//学生学号
        String cname = "";//学生姓名
        String points = ""; //成绩
        int a = 0;

        while (rows.hasNext()) {
            if (a == 0) {
                rowContent = rows.next();
                a = 1;
            }
            // 获得行数据
            Row row = rows.next();
            int column = sheet.getRow(0).getPhysicalNumberOfCells();
            for (int k = 0; k < column; k++) {
                if (row.getCell(k) != null) {
                    row.getCell(k).setCellType(Cell.CELL_TYPE_STRING);
                    String columnName = rowContent.getCell(k).getStringCellValue();
                    String excelContent = row.getCell(k).getStringCellValue();
                    if (columnName.equals("学号")) {
                        username = excelContent;
                    }
                    if (columnName.equals("姓名")) {
                        cname = excelContent;
                    }
                    if (columnName.equals("分数")) {
                        points = excelContent;
                    }
                }
            }
            a++;
            TGradeRecord tGradeRecord = new TGradeRecord();
            tGradeRecord.setStudentNumber(username);
            tGradeRecord.setCname(cname);
            tGradeRecord.setPoints(new BigDecimal(points));
            tGradeRecord.setObjectId(tGradeObject.getId());
            tGradeRecord.setRecordTime(now);
            tGradeRecordJPA.save(tGradeRecord);
        }

        return true;
    }

    /*************************************************************************************
     * Description:成绩册-修改实验项目状态值
     *
     * @author： 黄浩
     * @date：2019年10月9日
     *************************************************************************************/
    @Override
    @Transactional
    public JsonReturnVo editIsOpen(Integer experimentId, Integer flag) {

        Integer isOpen = (flag == 0 ? 1 : 0);
        String sql = "update t_grade_object set is_open = :isOpen where experiment_id = :experimentId";
        Query nativeQuery = entityManager.createNativeQuery(sql);
        nativeQuery.setParameter("isOpen", isOpen);
        nativeQuery.setParameter("experimentId", experimentId);
        nativeQuery.executeUpdate();
        return JsonReturnVo.successJson("修改成功");
    }

    /*************************************************************************************
     * Description:成绩册-保存权重
     *
     * @author： 黄浩
     * @date：2019年10月9日
     *************************************************************************************/
    @Override
    public boolean saveTWeightSetting(String courseNumber, float weight, Integer id, String title) {

        TWeightSetting tWeightSetting = null;
        if (id != null) {
            tWeightSetting = tWeightSettingJPA.findOne(id);
        }
        if (tWeightSetting == null) {
            tWeightSetting = new TWeightSetting();
            tWeightSetting.setCourseNumber(courseNumber);
        }
        tWeightSetting.setWeight(new BigDecimal(weight));
        tWeightSetting.setType(title);
        tWeightSettingJPA.saveAndFlush(tWeightSetting);
        return true;

    }

    /*************************************************************************************
     * Description:成绩册-保存工训权重
     *
     * @author： 黄浩
     * @date：2019年10月9日
     *************************************************************************************/
    @Override
    public Result<String> savePracticeWeight(String courseNumber, float weight, Integer id, String title) {
        //获取之前的评分项
        List<TWeightSetting> exitWeightList = tWeightSettingJPA.findTWeightSettingByCourseNumber(courseNumber);
        BigDecimal totalWeight = new BigDecimal(0.0);
        for (TWeightSetting tWeightSetting : exitWeightList) {
            totalWeight = totalWeight.add(tWeightSetting.getWeight());
        }
        totalWeight = totalWeight.add(new BigDecimal(weight));
        int result = totalWeight.subtract(BigDecimal.ONE).compareTo(BigDecimal.ZERO);
        if (result == 1) {
            return Result.failed("保存失败，所有评分项已超过1");
        }
        TWeightSetting tWeightSetting = null;
        if (id != null) {
            tWeightSetting = tWeightSettingJPA.findOne(id);
        }
        if (tWeightSetting == null) {
            tWeightSetting = new TWeightSetting();
            tWeightSetting.setCourseNumber(courseNumber);
        }
        tWeightSetting.setWeight(new BigDecimal(weight));
        tWeightSetting.setType(title);

        tWeightSettingJPA.saveAndFlush(tWeightSetting);
        return Result.ok("保存成功");

    }

    /*************************************************************************************
     * Description:成绩册-权重列表
     *
     * @author： 黄浩
     * @date：2019年10月9日
     *************************************************************************************/
    @Override
    public CourseWeightVo findTWeightSettingByCourseNumber(String courseNumber, String termUId, Integer page, Integer limit, String product) {
        String sql = "select tws.type,tws.id,tws.weight,tg.title,tg.term_name from t_gradebook tg " +
                "inner join t_weight_setting tws on tg.course_number = tws.course_number  where tg.product = :product";
        if (!EmptyUtil.isEmpty(courseNumber)) {
            sql += " and tg.course_number=:courseNumber";
        }
        if (!EmptyUtil.isEmpty(termUId)) {
            sql += " and tg.term_number=:termUId";
        }
        //分页
        if (page != null && limit != null) {
            sql += " limit :a,:b";
        }
        Query nativeQuery = entityManager.createNativeQuery(sql);
        nativeQuery.setParameter("product", product);
        if (!EmptyUtil.isEmpty(courseNumber)) {
            nativeQuery.setParameter("courseNumber", courseNumber);
        }
        if (!EmptyUtil.isEmpty(termUId)) {
            nativeQuery.setParameter("termUId", termUId);
        }
        //分页
        if (page != null && limit != null) {
            nativeQuery.setParameter("a", (page - 1) * limit);
            nativeQuery.setParameter("b", limit);
        }
        List<Object[]> resultList = nativeQuery.getResultList();

        //封装
        List<TWeightSettingVO> list = new ArrayList<>();
        for (Object[] objects : resultList) {
            TWeightSettingVO tWeightSettingVO = new TWeightSettingVO();
            if (objects[0] != null) {
                tWeightSettingVO.setName(objects[0].toString());
            }
            if (objects[1] != null) {
                tWeightSettingVO.setId(Integer.valueOf(objects[1].toString()));
            }
            if (objects[2] != null) {
                tWeightSettingVO.setWeight(new BigDecimal(Double.valueOf(objects[2].toString())));
            }
            if (objects[3] != null) {
                tWeightSettingVO.setLesson(objects[3].toString());
            }
            if (objects[4] != null) {
                tWeightSettingVO.setTerm(objects[4].toString());
            }

            list.add(tWeightSettingVO);
        }
        //获取总数
        String countSql = "select count(*) from t_gradebook tg " +
                "inner join t_weight_setting tws on tg.course_number = tws.course_number  where tg.product = :product";
        if (!EmptyUtil.isEmpty(courseNumber)) {
            countSql += " and tg.course_number=:courseNumber";
        }
        if (!EmptyUtil.isEmpty(termUId)) {
            countSql += " and tg.term_number=:termUId";
        }
        Query nativeQuery1 = entityManager.createNativeQuery(countSql);
        nativeQuery1.setParameter("product", product);
        if (!EmptyUtil.isEmpty(courseNumber)) {
            nativeQuery1.setParameter("courseNumber", courseNumber);
        }
        if (!EmptyUtil.isEmpty(termUId)) {
            nativeQuery1.setParameter("termUId", termUId);
        }
        Integer count = Integer.valueOf(nativeQuery1.getSingleResult().toString());
        CourseWeightVo courseWeightVo = new CourseWeightVo();
        courseWeightVo.setCode(0);
        courseWeightVo.setMsg("");
        courseWeightVo.setCount(count);
        courseWeightVo.setData(list);
        return courseWeightVo;
    }

    /*************************************************************************************
     * Description:成绩册-删除权重
     *
     * @author： 黄浩
     * @date：2019年10月9日
     *************************************************************************************/
    @Override
    public boolean deleteTWeightSetting(Integer id) {

        TWeightSetting tWeightSetting = tWeightSettingJPA.findOne(id);
        tWeightSettingJPA.delete(tWeightSetting);
        return true;

    }

    /*************************************************************************************
     * Description:成绩册-获取某一权重
     *
     * @author： 黄浩
     * @date：2019年10月22日
     *************************************************************************************/
    @Override
    public TWeightSettingVO findWeightById(Integer id) {

        TWeightSettingVO tWeightSettingVO = new TWeightSettingVO();
        TWeightSetting tWeightSetting = tWeightSettingJPA.findOne(id);
        tWeightSettingVO.setId(tWeightSetting.getId());
        tWeightSettingVO.setName(tWeightSetting.getType());
        tWeightSettingVO.setWeight(tWeightSetting.getWeight());
        return tWeightSettingVO;

    }

    /*************************************************************************************
     * Description:成绩册-获取课程
     *
     * @author： 黄浩
     * @date：2019年10月22日
     *************************************************************************************/
    @Override
    public CourseVo courseList(String termNumber, String courseNumber, String product, Integer page, Integer limit) {
        String sql = "select t from TGradebook t where t.product = :product";
        if (!EmptyUtil.isEmpty(termNumber)) {
            sql += " and t.termNumber=:termNumber";
        }
        if (!EmptyUtil.isEmpty(courseNumber)) {
            sql += " and t.courseNumber=:courseNumber";
        }
        Query query = entityManager.createQuery(sql);
        query.setParameter("product", product);
        if (!EmptyUtil.isEmpty(termNumber)) {
            query.setParameter("termNumber", termNumber);
        }
        if (!EmptyUtil.isEmpty(courseNumber)) {
            query.setParameter("courseNumber", courseNumber);
        }
        //分页
        query.setFirstResult((page - 1) * limit).setMaxResults(limit);
        List<TGradebook> tGradebookList = query.getResultList();

        //封装
        List<CourseDateVo> list = new ArrayList<>();
        for (TGradebook tGradebook : tGradebookList) {
            CourseDateVo courseDateVo = new CourseDateVo();
            courseDateVo.setId(tGradebook.getId());
            courseDateVo.setCourseName(tGradebook.getTitle());
            courseDateVo.setCourseNumber(tGradebook.getCourseNumber());
            courseDateVo.setTermNumber(tGradebook.getTermNumber());
            courseDateVo.setTermName(tGradebook.getTermName());
            //获取工种权重设置数量，大于0则表示不能再更改，为0则表示可以设置
            Integer count = objectWeightJPA.countObjectWeightByCourseNumber(tGradebook.getCourseNumber());
            courseDateVo.setEnable((count > 0) ? false : true);
            //判断课程下是否有工种打过分，大于0表示打过分 ，等于0表示未打分
            Integer countMarkedWork = tGradeObjectJPA.countMarkedWork(tGradebook.getId());
            courseDateVo.setMarked((countMarkedWork > 0) ? true : false);
            list.add(courseDateVo);
        }
        //获取总数
        String countSql = "select count(*) from TGradebook t where t.product = :product";
        if (!EmptyUtil.isEmpty(termNumber)) {
            countSql += " and t.termNumber=:termNumber";
        }
        if (!EmptyUtil.isEmpty(courseNumber)) {
            countSql += " and t.courseNumber=:courseNumber";
        }
        Query countQuery = entityManager.createQuery(countSql);
        countQuery.setParameter("product", product);
        if (!EmptyUtil.isEmpty(termNumber)) {
            countQuery.setParameter("termNumber", termNumber);
        }
        if (!EmptyUtil.isEmpty(courseNumber)) {
            countQuery.setParameter("courseNumber", courseNumber);
        }
//        countQuery.setFirstResult((page - 1) * limit).setMaxResults(limit);
        Integer count = Integer.valueOf(countQuery.getSingleResult().toString());
        //封装
        CourseVo courseVo = new CourseVo();
        courseVo.setCode(0);
        courseVo.setMsg("");
        courseVo.setCount(count);
        courseVo.setData(list);
        return courseVo;
    }

    /*************************************************************************************
     * Description:成绩册-获取工种列表
     *
     * @author： 黄浩
     * @date：2019年10月22日
     *************************************************************************************/
    @Override
    public CourseGradeObjectVo gradeObjectList(String termNumber, String courseNumber, String product, Integer page, Integer limit, String username) {
        termNumber = (termNumber == null ? "" : termNumber);
        courseNumber = (courseNumber == null ? "" : courseNumber);
        List<TGradebook> tGradebookList = tGradebookJPA.findByPracticeTimetablePage(product, termNumber, courseNumber, (page - 1) * limit, limit);
        //封装
        List<CourseDateVo> list = new ArrayList<>();
        for (TGradebook tGradebook : tGradebookList) {
            CourseDateVo courseDateVo = new CourseDateVo();
            courseDateVo.setId(tGradebook.getId());
            courseDateVo.setCourseName(tGradebook.getTitle());
            courseDateVo.setCourseNumber(tGradebook.getCourseNumber());
            courseDateVo.setTermNumber(tGradebook.getTermNumber());
            courseDateVo.setTermName(tGradebook.getTermName());
            //获取工种信息
            String objectSql = "";
            if (!EmptyUtil.isEmpty(username)) {
                objectSql += "select tgo.title,tgo.id,tgo.marked from t_grade_object tgo " +
                        " inner join object_user ou on tgo.experiment_title=ou.object_uid " +
                        " where tgo.grade_id= :grade_id and ou.username = :username ";
            } else {
                objectSql += "select tgo.title,tgo.id,tgo.marked from t_grade_object tgo " +
                        " where tgo.grade_id= :grade_id ";
            }
            Query nativeQuery = entityManager.createNativeQuery(objectSql);
            nativeQuery.setParameter("grade_id", tGradebook.getId());
//            nativeQuery.setParameter("teacher",teacher);
            if (!EmptyUtil.isEmpty(username)) {
                nativeQuery.setParameter("username", username);
            }
            List<Object[]> objectList = nativeQuery.getResultList();
            List<TGradeObjectVO> gradeObjectVOS = new ArrayList<>();
            for (Object[] o : objectList) {
                TGradeObjectVO tGradeObjectVO = new TGradeObjectVO();
                if (o[0] != null) {
                    tGradeObjectVO.setName(o[0].toString());
                }
                if (o[1] != null) {
                    tGradeObjectVO.setId(Integer.valueOf(o[1].toString()));
                }
                if (o[2] != null) {
                    tGradeObjectVO.setMarked(Integer.valueOf(o[2].toString()));
                }
                gradeObjectVOS.add(tGradeObjectVO);
            }
            courseDateVo.setWork(gradeObjectVOS);
            list.add(courseDateVo);
        }
        //获取总数
        List<TGradebook> tGradebookListCount = tGradebookJPA.findByPracticeTimetable(product, termNumber, courseNumber);
        Integer count = tGradebookListCount.size();
        //封装
        CourseGradeObjectVo courseGradeObjectVo = new CourseGradeObjectVo();
        courseGradeObjectVo.setCode(0);
        courseGradeObjectVo.setMsg("");
        courseGradeObjectVo.setCount(count);
        courseGradeObjectVo.setData(list);
        return courseGradeObjectVo;
    }

    /*************************************************************************************
     * Description:成绩册-获取评分项列表
     *
     * @author： 黄浩
     * @date：2019年10月22日
     *************************************************************************************/
    @Override
    public List<TWeightSettingVO> getWeightByCourseNumber(String courseNumber) {
        List<TWeightSettingVO> list = new ArrayList<>();
        List<TWeightSetting> tWeightSettingList = tWeightSettingJPA.findTWeightSettingByCourseNumber(courseNumber);
        int num = 0;
        for (TWeightSetting t : tWeightSettingList) {
            TWeightSettingVO tWeightSettingVO = new TWeightSettingVO();
            tWeightSettingVO.setId(t.getId());
            tWeightSettingVO.setField("scoreitem" + num);
            tWeightSettingVO.setName(t.getType() + "(" + t.getWeight() + ")");
            list.add(tWeightSettingVO);
            num++;
        }
        return list;
    }

    /*************************************************************************************
     * Description:成绩册-获取工种使用评分项情况列表
     *
     * @author： 黄浩
     * @date：2019年10月22日
     *************************************************************************************/
    @Override
    public TGradeObjectLayuiVo getTGradeObjectStatusByCourseNumber(String courseNumber) {
        Query query = entityManager.createNativeQuery("{call proc_practiceTimetable_work_weight_enable(:courseNumber)}");
        query.setParameter("courseNumber", courseNumber);
        List<Map<String, Object>> list = null;
        List<Object[]> results = query.getResultList();
        if (results.size() > 0) {
            //评分项分割
            String weightIdArr[] = {"该课程无评分项，请先去设置评分项再进行打分。"};
            if (results.get(0)[3] != null) {
                weightIdArr = results.get(0)[3].toString().split(",");
            }
            //封装
            list = new ArrayList<>();
            for (int i = 1; i < results.size(); i++) {
                Map<String, Object> map = new HashMap<>();
                //工种id
                map.put("workId", results.get(i)[0]);
                //工种名称
                map.put("workName", results.get(i)[1]);
                //学时
                map.put("period", results.get(i)[2]);
                String enable[] = results.get(i)[3].toString().split(",");
                //评分项拆分封装
                for (int j = 0; j < weightIdArr.length; j++) {
                    //评分项是否启用
                    map.put("scoreitem" + j, enable[j]);
                    //评分项id
                    map.put("scoreitemId" + j, weightIdArr[j]);
                }
                list.add(map);
            }
        }
        TGradeObjectLayuiVo tGradeObjectLayuiVo = new TGradeObjectLayuiVo();
        tGradeObjectLayuiVo.setCode(0);
        tGradeObjectLayuiVo.setCount(results.size() - 1);
        tGradeObjectLayuiVo.setMsg("");
        tGradeObjectLayuiVo.setData(list);
        return tGradeObjectLayuiVo;
    }

    /*************************************************************************************
     * Description:成绩册-权重状态值修改
     *
     * @author： 黄浩
     * @date：2019年10月22日
     *************************************************************************************/
    @Override
    @Transactional
    public boolean editWeightEnable(List<ObjectWeightEnableVo> data) {

        if (data.size() > 0) {
            String deleteSql = "DELETE from object_weight where id IN(select n.id from(select ow.id as id from  t_grade_object tgo " +
                    "inner join t_gradebook tg on tg.id=tgo.grade_id " +
                    "inner join t_weight_setting as tws on tws.course_number = tg.course_number " +
                    "inner join object_weight as ow on ow.object_id=tgo.id and ow.weight_id=tws.id " +
                    "where tg.course_number = :course_number and tg.product='practiceTimetable' ) as n)";
            Query nativeQuery = entityManager.createNativeQuery(deleteSql);
            nativeQuery.setParameter("course_number", data.get(0).getData()[0]);
            nativeQuery.executeUpdate();
        }

        String sql = "";
        for (ObjectWeightEnableVo objectWeightEnableVo : data) {
            String arr[] = objectWeightEnableVo.getData();
            for (int i = 2; i < arr.length; i++) {
                sql += "('" + arr[1] + "','" + arr[i] + "','1'),";
                ObjectWeight objectWeight = new ObjectWeight();
                objectWeight.setObjectId(Integer.valueOf(arr[1]));
                objectWeight.setWeightId(Integer.valueOf(arr[i]));
                objectWeight.setEnable(Integer.valueOf(1));
                objectWeightJPA.save(objectWeight);
            }
        }
        return true;

    }

    /*************************************************************************************
     * Description:成绩册-工种权重计算
     *
     * @author： 黄浩
     * @date：2019年10月30日
     *************************************************************************************/
    @Override
    @Transactional
    public boolean calculateWorkWeight(String courseNumber) {

        Query query = entityManager.createNativeQuery("{call proc_work_final_weight_calculate(:courseNumber)}");
        query.setParameter("courseNumber", courseNumber);
        query.executeUpdate();
        return true;

    }

    /*************************************************************************************
     * Description:成绩册-获取工种使用评分项情况列表
     *
     * @author： 黄浩
     * @date：2019年10月22日
     *************************************************************************************/
    @Override
    public TGradeObjectLayuiVo scoreItemWeightList(String courseNumber) {
        Query query = entityManager.createNativeQuery("{call proc_practiceTimetable_work_weight_enable(:courseNumber)}");
        query.setParameter("courseNumber", courseNumber);
        List<Map<String, Object>> list = null;
        List<Object[]> results = query.getResultList();
        if (results.size() > 0) {
            //评分项分割
            String weightIdArr[] = {"该课程无评分项，请先去设置评分项再进行打分。"};
            if (results.get(0)[3] != null) {
                weightIdArr = results.get(0)[3].toString().split(",");
            }
            //封装
            list = new ArrayList<>();
            for (int i = 1; i < results.size(); i++) {
                Map<String, Object> map = new HashMap<>();
                //工种id
                map.put("workId", results.get(i)[0]);
                //工种名称
                map.put("workName", results.get(i)[1]);
                //学时
                map.put("period", results.get(i)[2]);
                String weight[] = results.get(i)[4].toString().split(",");
                //评分项拆分封装
                for (int j = 0; j < weightIdArr.length; j++) {
                    //评分项是否启用
                    map.put("scoreitem" + j, weight[j]);
                    //评分项id
                    map.put("scoreitemId" + j, weightIdArr[j]);
                }
                list.add(map);
            }
        }
        TGradeObjectLayuiVo tGradeObjectLayuiVo = new TGradeObjectLayuiVo();
        tGradeObjectLayuiVo.setCode(0);
        tGradeObjectLayuiVo.setCount(results.size() - 1);
        tGradeObjectLayuiVo.setMsg("");
        tGradeObjectLayuiVo.setData(list);
        return tGradeObjectLayuiVo;
    }

    /*************************************************************************************
     * Description:成绩册-获取工种成绩列表
     *
     * @author： 黄浩
     * @date：2019年10月22日
     *************************************************************************************/
    @Override
    public TGradeObjectLayuiVo gradebookListPracticeTimetable(String courseNumber, String product, Integer workId, Integer page, Integer limit) {
        Query query = entityManager.createNativeQuery("{call porc_gradebook_list_practiceTimetable(:courseNumber,:product,:workId,:page,:limit)}");
        query.setParameter("courseNumber", courseNumber);
        query.setParameter("product", product);
        query.setParameter("workId", workId);
        query.setParameter("page", (page - 1) * limit);
        query.setParameter("limit", limit);
        List<Map<String, Object>> list = null;
        List<Object[]> results = query.getResultList();
        if (results.size() > 0) {
            //评分项分割
            String weightIdArr[] = {"该课程无评分项，请先去设置评分项再进行打分。"};
            if (results.get(0)[2] != null) {
                weightIdArr = results.get(0)[2].toString().split(",");
            }
            //封装
            list = new ArrayList<>();
            for (int i = 1; i < results.size(); i++) {
                Map<String, Object> map = new HashMap<>();
                //学生学号
                map.put("studentid", results.get(i)[0]);
                //学生姓名
                map.put("name", results.get(i)[1]);
                //成绩
                String weight[] = results.get(i)[2].toString().split(",");
                //评分项拆分封装
                for (int j = 0; j < weightIdArr.length; j++) {
                    //评分项是否启用
                    map.put("scoreitem" + j, weight[j]);
                    //评分项id
                    map.put("scoreitemId" + j, weightIdArr[j]);
                }
                list.add(map);
            }
        }
        //获取学生总数
        Integer count = tTestGradingJPA.countStudent(courseNumber);
        TGradeObjectLayuiVo tGradeObjectLayuiVo = new TGradeObjectLayuiVo();
        tGradeObjectLayuiVo.setCode(0);
        tGradeObjectLayuiVo.setCount(count);
        tGradeObjectLayuiVo.setMsg("");
        tGradeObjectLayuiVo.setData(list);
        return tGradeObjectLayuiVo;
    }

    /*************************************************************************************
     * Description:成绩册-工训打分
     *
     * @author： 黄浩
     * @date：2019年10月22日
     *************************************************************************************/
    @Override
    public boolean markingPracticeTimetable(List<ObjectWeightEnableVo> data) {

        Date date = new Date();
        //工种id
        String workId = data.get(0).getData()[1];
        //获取可以打分的评分项列表
        List<TWeightSetting> tWeightSettingList = tWeightSettingJPA.findMarkWeight(data.get(0).getData()[0], Integer.valueOf(workId));
        //修改状态值
        TGradeObject tGradeObject = tGradeObjectJPA.findOne(Integer.valueOf(workId));
        tGradeObject.setMarked(data.get(0).getMarked());
        tGradeObjectJPA.saveAndFlush(tGradeObject);
        //新增语句
        String sql = "";
        for (ObjectWeightEnableVo objectWeightEnableVo : data) {
            String arr[] = objectWeightEnableVo.getData();
            //学生学号
            String student = arr[2];
            if (student.equals("layTableCheckbox")) {
                continue;
            }
            String cname = tTestGradingJPA.findTTestGradingByStudentAndSAndCourseNumber(student, data.get(0).getData()[0]).getCname();
            int num = 0;
            for (int i = 3; i < arr.length; i++) {
                String points = arr[i];
                //-1.00为未打分
                if (!points.equals("-1.00")) {
                    TGradeRecord tGradeRecord = tGradeRecordJPA.findByStudentNumberAndObjectIdAndWeightId(student, Integer.valueOf(workId), tWeightSettingList.get(num).getId());
                    if (tGradeRecord == null) {
                        tGradeRecord = new TGradeRecord();
                        tGradeRecord.setStudentNumber(student);
                        tGradeRecord.setWeightId(tWeightSettingList.get(num).getId());
                        tGradeRecord.setCname(cname);
                        tGradeRecord.setObjectId(Integer.valueOf(workId));
                    }
                    tGradeRecord.setPoints(new BigDecimal(points));
                    tGradeRecord.setRecordTime(date);
                    tGradeRecordJPA.save(tGradeRecord);
                }
                num++;
            }
        }
        return true;
    }

    /*************************************************************************************
     * Description:成绩册-获取课程成绩列表（工训）
     *
     * @author： 黄浩
     * @date：2019年10月22日
     *************************************************************************************/
    @Override
    public TGradeObjectLayuiVo gradebookTotalListPracticeTimetable(String courseNumber, String product, Integer page, Integer limit) {
        //获取评分项列表
        List<TWeightSetting> tWeightSettingList = tWeightSettingJPA.findTWeightSettingByCourseNumber(courseNumber);
        Query query = entityManager.createNativeQuery("{call porc_gradebook_total_list_practiceTimetable(:courseNumber,:product,:page,:limit)}");
        query.setParameter("courseNumber", courseNumber);
        query.setParameter("product", product);
        query.setParameter("page", (page - 1) * limit);
        query.setParameter("limit", limit);
        List<Map<String, Object>> list = null;
        List<Object[]> results = query.getResultList();
        if (results.size() > 0) {
            //评分项分割
            String weightIdArr[] = {"该课程无评分项，请先去设置评分项再进行打分。"};
            if (results.get(0)[2] != null) {
                weightIdArr = results.get(0)[2].toString().split(",");
            }
            //封装
            list = new ArrayList<>();
            for (int i = 1; i < results.size(); i++) {
                //总成绩
                BigDecimal totalScore = new BigDecimal(0.00);
                Map<String, Object> map = new HashMap<>();
                //学生学号
                map.put("studentid", results.get(i)[0]);
                //学生姓名
                map.put("name", results.get(i)[1]);
                //成绩
                String weight[] = results.get(i)[2].toString().split(",");
                //评分项拆分封装
                for (int j = 0; j < weightIdArr.length; j++) {
                    //评分项是否启用
                    map.put("scoreitem" + j, weight[j]);
                    //评分项id
                    map.put("scoreitemId" + j, weightIdArr[j]);
                    //计算总成绩
                    BigDecimal score = new BigDecimal(weight[j]);
                    totalScore = totalScore.add(score.multiply(tWeightSettingList.get(j).getWeight()));
                    totalScore = totalScore.setScale(2, BigDecimal.ROUND_HALF_UP);
                }
                map.put("totalScore", totalScore.toString());
                list.add(map);
            }
        }
        //获取学生总数
        Integer count = tTestGradingJPA.countStudent(courseNumber);
        TGradeObjectLayuiVo tGradeObjectLayuiVo = new TGradeObjectLayuiVo();
        tGradeObjectLayuiVo.setCode(0);
        tGradeObjectLayuiVo.setCount(count);
        tGradeObjectLayuiVo.setMsg("");
        tGradeObjectLayuiVo.setData(list);
        return tGradeObjectLayuiVo;
    }

    /*************************************************************************************
     * Description:成绩册-批量增加学生（工训）
     *
     * @author： 黄浩
     * @date：2019年10月22日
     *************************************************************************************/
    @Override
    public boolean insertStudents(List<UserVo> data) {
        String sql = "";
        for (UserVo userVo : data) {
            TTestGrading tTestGrading = null;
            if (!EmptyUtil.isEmpty(userVo.getCourseNumber())) {
                //工训用
                tTestGrading = tTestGradingJPA.findTTestGradingByStudentAndSAndCourseNumber(userVo.getUsername(), userVo.getCourseNumber());
                if (tTestGrading == null) {
                    tTestGrading = new TTestGrading();
                    tTestGrading.setStudent(userVo.getUsername());
                    tTestGrading.setCname(userVo.getCname());
                    tTestGrading.setCourseNumber(userVo.getCourseNumber());
                }
            } else {
                //教学用
                tTestGrading = tTestGradingJPA.findTTestGradingByStudentAndSAndSiteId(userVo.getUsername(), userVo.getSiteId());
                //判断是否已有数据
                if (tTestGrading == null) {
                    tTestGrading = new TTestGrading();
                    tTestGrading.setStudent(userVo.getUsername());
                    tTestGrading.setCname(userVo.getCname());
                    tTestGrading.setSiteId(userVo.getSiteId());
                }
            }
            if (tTestGrading != null) {
                tTestGradingJPA.save(tTestGrading);
            }
        }
        return true;
    }

    /*************************************************************************************
     * Description:成绩册-获取只能打分的评分项列表
     *
     * @author： 黄浩
     * @date：2019年10月22日
     *************************************************************************************/
    @Override
    public List<TWeightSettingVO> getWeightByWorkId(Integer workId) {
        List<TWeightSettingVO> list = new ArrayList<>();
        //获取评分项
        List<TWeightSetting> tWeightSettingList = tWeightSettingJPA.findTWeightSettingByObjectId(workId);
        //获取工种信息
        TGradeObject tGradeObject = tGradeObjectJPA.findOne(workId);
        int num = 0;
        if (tWeightSettingList.size() == 0) {
            TWeightSettingVO tWeightSettingVO = new TWeightSettingVO();
            tWeightSettingVO.setWorkName(tGradeObject.getTitle());
            list.add(tWeightSettingVO);
        }
        if (tWeightSettingList.size() > 0) {
            for (TWeightSetting t : tWeightSettingList) {
                TWeightSettingVO tWeightSettingVO = new TWeightSettingVO();
                tWeightSettingVO.setId(t.getId());
                tWeightSettingVO.setField("scoreitem" + num);
                tWeightSettingVO.setName(t.getType() + "(" + t.getWeight() + ")");
                tWeightSettingVO.setWorkName(tGradeObject.getTitle());
                list.add(tWeightSettingVO);
                num++;
            }
        }
        return list;
    }

    /*************************************************************************************
     * Description:成绩册-复制课程工种权重
     *
     * @author： 黄浩
     * @date：2019年10月22日
     *************************************************************************************/
    @Override
    public boolean copyCourseWeight(String sourceCourseNumber, String targetCourseNumber) {

        String sql = "";
        //获取新课程的工种id
        String workIdStr = tGradeObjectJPA.findTGradeObjectIdByCourseNumber(targetCourseNumber);
        //分割成数组
        String workIdArr[] = workIdStr.split(",");
        //设置工种id数组计数参数
        int num = 0;
        //获取新课程的评分项id
        String weightIdStr = tWeightSettingJPA.findTWeightSettingIdByCourseNumber(targetCourseNumber);
        //分割成数组
        String weightIdArr[] = weightIdStr.split(",");
        Query query = entityManager.createNativeQuery("{call proc_practiceTimetable_work_weight_enable(:sourceCourseNumber)}");
        query.setParameter("sourceCourseNumber", sourceCourseNumber);
        List<Object[]> results = query.getResultList();
        if (results.size() > 1) {
            for (int i = 1; i < results.size(); i++) {
                //源课程的工种权重状态值
                String courseWeightEnable[] = results.get(i)[3].toString().split(",");
                //源课程的工种权重
                String finalWeight[] = results.get(i)[4].toString().split(",");
                for (int j = 0; j < weightIdArr.length; j++) {
                    //判断状态值，为1复制，为0不复制
                    if (Integer.valueOf(courseWeightEnable[j]) == 1) {
                        ObjectWeight objectWeight = new ObjectWeight();
                        objectWeight.setObjectId(Integer.valueOf(workIdArr[num]));
                        objectWeight.setWeightId(Integer.valueOf(weightIdArr[j]));
                        objectWeight.setEnable(1);
                        objectWeight.setFinalWeight(new BigDecimal(finalWeight[j]));
                    }
                }
                num++;
            }
            return true;
        } else {
            return false;
        }

    }

    /*************************************************************************************
     * Description:成绩册-工种与用户的关系
     *
     * @author： 黄浩
     * @date：2019年10月22日
     *************************************************************************************/
    @Override
    @Transactional
    public boolean workUser(WorkUserVo workUserVo) {

        //先删除跟工种关联的所有数据
        String deleteSql = "delete from object_user where object_uid=:object_uid";
        Query nativeQuery = entityManager.createNativeQuery(deleteSql);
        nativeQuery.setParameter("object_uid", workUserVo.getUid());
        nativeQuery.executeUpdate();
        //再新增
        for (String username : workUserVo.getData()) {
            String insertSql = "insert into object_user (object_uid,username) values (:uid,:username)";
            Query insert = entityManager.createNativeQuery(insertSql);
            insert.setParameter("uid", workUserVo.getUid());
            insert.setParameter("username", username);
            insert.executeUpdate();
        }

        return true;

    }

    /*************************************************************************************
     * Description:成绩册-获取课程成绩列表（工训，导出用）
     *
     * @author： 黄浩
     * @date：2019年10月22日
     *************************************************************************************/
    @Override
    public List<Map<String, Object>> exportTotalListPracticeTimetable(String courseNumber, String product, Integer page, Integer limit) {
        //获取评分项列表
        List<TWeightSetting> tWeightSettingList = tWeightSettingJPA.findTWeightSettingByCourseNumber(courseNumber);
        Query query = entityManager.createNativeQuery("{call porc_gradebook_total_list_practiceTimetable(:courseNumber,:product,:page,:limit)}");
        query.setParameter("courseNumber", courseNumber);
        query.setParameter("product", product);
        query.setParameter("page", (page - 1) * limit);
        query.setParameter("limit", limit);
        List<Map<String, Object>> list = null;
        List<Object[]> results = query.getResultList();
        if (results.size() > 0) {
            //评分项分割
            String weightIdArr[] = {"该课程无评分项，请先去设置评分项再进行打分。"};
            if (results.get(0)[2] != null) {
                weightIdArr = results.get(0)[2].toString().split(",");
            }
            //封装
            list = new ArrayList<>();
            for (int i = 1; i < results.size(); i++) {
                //总成绩
                BigDecimal totalScore = new BigDecimal(0.00);
                // 这里需要排序，所以要用linkedhashmap
                Map<String, Object> map = new LinkedHashMap<>();
                //学生学号
                map.put("studentid", results.get(i)[0]);
                //学生姓名
                map.put("name", results.get(i)[1]);
                //成绩
                String weight[] = results.get(i)[2].toString().split(",");
                //评分项拆分封装
                for (int j = 0; j < weightIdArr.length; j++) {
                    //评分项是否启用
                    map.put("scoreitem" + j, weight[j]);
                    //计算总成绩
                    BigDecimal score = new BigDecimal(weight[j]);
                    totalScore = totalScore.add(score.multiply(tWeightSettingList.get(j).getWeight()));
                    totalScore = totalScore.setScale(2, BigDecimal.ROUND_HALF_UP);
                }
                map.put("totalScore", totalScore.toString());
                list.add(map);
            }
        }
        return list;
    }

    /*************************************************************************************
     * Description:成绩册-获取工种成绩列表（导出用）
     *
     * @author： 黄浩
     * @date：2019年10月22日
     *************************************************************************************/
    @Override
    public List<Map<String, Object>> exportListPracticeTimetable(String courseNumber, String product, Integer workId, Integer page, Integer limit) {
        Query query = entityManager.createNativeQuery("{call porc_gradebook_list_practiceTimetable(:courseNumber,:product,:workId,:page,:limit)}");
        query.setParameter("courseNumber", courseNumber);
        query.setParameter("product", product);
        query.setParameter("workId", workId);
        query.setParameter("page", (page - 1) * limit);
        query.setParameter("limit", limit);
        List<Map<String, Object>> list = null;
        List<Object[]> results = query.getResultList();
        if (results.size() > 0) {
            //评分项分割
            String weightIdArr[] = {"该课程无评分项，请先去设置评分项再进行打分。"};
            if (results.get(0)[2] != null) {
                weightIdArr = results.get(0)[2].toString().split(",");
            }
            //封装
            list = new ArrayList<>();
            for (int i = 1; i < results.size(); i++) {
                Map<String, Object> map = new LinkedHashMap<>();
                //学生学号
                map.put("studentid", results.get(i)[0]);
                //学生姓名
                map.put("name", results.get(i)[1]);
                //成绩
                String weight[] = results.get(i)[2].toString().split(",");
                //评分项拆分封装
                for (int j = 0; j < weightIdArr.length; j++) {
                    //评分项是否启用
                    if (weight[j].equals("-1")) {
                        map.put("scoreitem" + j, "");
                    } else {
                        map.put("scoreitem" + j, weight[j]);
                    }
                }
                list.add(map);
            }
        }
        return list;
    }

    /**************************************************************************
     * Description：新增小组成绩数据
     *
     * @author：黄浩
     * @date ：2019年4月26日
     **************************************************************************/
    @Override
    public JsonReturnVo saveExperienceRecord(Integer siteId, Integer type, Integer groupId, String teacherPoints, String judgesPoints, String siteName, String title) {

        long startTime = System.currentTimeMillis();
        //查询小组的导师成绩与评委成绩权重
        BigDecimal teachWeight = tWeightSettingJPA.findTWeightSettingBySiteIdAndType(siteId, ConstantInterface.TEACHING_ACTIVITY_TYPE_TEACH).getWeight();
        BigDecimal judgesWeight = tWeightSettingJPA.findTWeightSettingBySiteIdAndType(siteId, ConstantInterface.TEACHING_ACTIVITY_TYPE_JUDGES).getWeight();
        long endTime = System.currentTimeMillis();
        System.out.println("执行代码块/方法查询权重结束需要时间" + (endTime - startTime) + "ms");

        long startTime2 = System.currentTimeMillis();
        //计算分数
        BigDecimal points = (new BigDecimal(teacherPoints).multiply(teachWeight)).add(new BigDecimal(judgesPoints).multiply(judgesWeight));
        points = points.divide(teachWeight.add(judgesWeight));
        points = points.setScale(2, BigDecimal.ROUND_HALF_UP);
        long endTime2 = System.currentTimeMillis();
        System.out.println("执行代码块/方法计算查分数结束需要时间" + (endTime2 - startTime2) + "ms");
        //查询小组项目
        long startTime3 = System.currentTimeMillis();
        TGradeObject tGradeObject = tGradeObjectJPA.findTGradeObjectByTypeAndModule(type.toString(), ConstantInterface.TEACHING_ACTIVITY_MODULE_EXPERIENCE);
        long endTime3 = System.currentTimeMillis();
        System.out.println("执行代码块/方法查询小组项目需要时间" + (endTime3 - startTime3) + "ms");
        //不存在则创建
        long startTime4 = System.currentTimeMillis();
        if (tGradeObject == null) {
            this.createGradeBook(siteId, siteName, null, title, type.toString(), 1.0, ConstantInterface.TEACHING_ACTIVITY_MODULE_EXPERIENCE
                    , null, null, null, null, null, null, 1);
        }
        long endTime4 = System.currentTimeMillis();
        System.out.println("执行代码块/方法不存在则创建需要时间" + (endTime4 - startTime4) + "ms");

        long startTime1 = System.currentTimeMillis();
        //获取小组成员
        List<TTestGrading> tTestGradingList = tTestGradingJPA.findTTestGradingByGroupId(groupId);
        for (TTestGrading tTestGrading : tTestGradingList) {
            TGradeRecord tGradeRecord = tGradeRecordJPA.findTGradeRecordByStudentNumberAndObjectId(tTestGrading.getStudent(), tGradeObject.getId());
            if (tGradeRecord == null) {
                tGradeRecord = new TGradeRecord();
                tGradeRecord.setStudentNumber(tTestGrading.getStudent());
                tGradeRecord.setCname(tTestGrading.getCname());
                tGradeRecord.setObjectId(tGradeObject.getId());
            }
            tGradeRecord.setPoints(points);
            tGradeRecord.setRecordTime(new Date());

            tGradeRecordJPA.save(tGradeRecord);
        }
        long endTime1 = System.currentTimeMillis();
        System.out.println("执行代码块/方法成绩册保存结束需要时间" + (endTime1 - startTime1) + "ms");
        return JsonReturnVo.successJson("保存成功");


    }

    /*************************************************************************************
     * Description:成绩册-批量设置学生小组（教学）
     *
     * @author： 黄浩
     * @date：2019年10月22日
     *************************************************************************************/
    @Override
    @Transactional
    public boolean groupStudents(List<UserVo> data) {
        List<String> username = new ArrayList<>();

        String sql = "";
        for (UserVo userVo : data) {
            username.add(userVo.getUsername());
            this.initializeTTestGrading(userVo.getSiteId(), userVo.getUsername(), userVo.getCname(), null, null, null, null);
        }
        sql = "update  t_test_grading set group_id = :group_id where site_id = :site_id and student in (:a)";
        Query nativeQuery = entityManager.createNativeQuery(sql);
        nativeQuery.setParameter("group_id", data.get(0).getGroupId());
        nativeQuery.setParameter("site_id", data.get(0).getSiteId());
        nativeQuery.setParameter("a", username);
        nativeQuery.executeUpdate();
        return true;

    }

    /*************************************************************************************
     * Description:成绩册-更新组内排名（教学）
     *
     * @author： 黄浩
     * @date：2019年10月22日
     *************************************************************************************/
    @Override
    @Transactional
    public boolean updateGroupStudentRanking(List<UserVo> data) {

        for (UserVo userVo : data) {
            String sql = "update t_test_grading set group_ranking = :group_ranking , group_marking=:group_marking where student = :student and group_id = :group_id";
            Query nativeQuery = entityManager.createNativeQuery(sql);
            nativeQuery.setParameter("group_ranking", userVo.getGroupRanking());
            nativeQuery.setParameter("group_marking", userVo.getGroupMarking());
            nativeQuery.setParameter("student", userVo.getUsername());
            nativeQuery.setParameter("group_id", userVo.getGroupId());
            nativeQuery.executeUpdate();
        }
        return true;

    }

    /*************************************************************************************
     * Description:成绩册-删除小组成员（教学）
     *
     * @author： 黄浩
     * @date：2019年10月22日
     *************************************************************************************/
    @Override
    @Transactional
    public boolean deleteGroupStudent(List<UserVo> data) {

        for (UserVo userVo : data) {
            String sql = "update t_test_grading set group_id = null,group_marking=null,group_ranking=null where student = :student and site_id = :site_id";
            Query nativeQuery = entityManager.createNativeQuery(sql);
            nativeQuery.setParameter("student", userVo.getUsername());
            nativeQuery.setParameter("site_id", userVo.getSiteId());
            nativeQuery.executeUpdate();
        }
        return true;

    }

    /*************************************************************************************
     * Description:提交到成绩册
     *
     * @author： 黄浩
     * @date：2020年3月30日
     *************************************************************************************/
    @Override
    public boolean submitTranscript(List<UserRecordVo> data) {
        TGradeObject tGradeObject = null;
        //获取作业信息
        if(Objects.nonNull(data.get(0).getAssignmentId())){
            tGradeObject = tGradeObjectJPA.findTGradeObjectBySiteId(data.get(0).getSiteId(), data.get(0).getAssignmentId().toString());
        }
        if (Objects.nonNull(data.get(0).getAssignmentIdString())&&!"".equals(data.get(0).getAssignmentIdString())){
            tGradeObject = tGradeObjectJPA.findTGradeObjectBySiteId(data.get(0).getSiteId(), data.get(0).getAssignmentIdString());
        }
        //查不到作业信息跳出，返回false
        if (Objects.isNull(tGradeObject)){
            return false;
        }
        for (UserRecordVo userRecordVo : data) {
            this.initializeTTestGrading(userRecordVo.getSiteId(), userRecordVo.getUsername(), userRecordVo.getCname(), null, null, null, null);
            TGradeRecord tGradeRecord = tGradeRecordJPA.findTGradeRecordByStudentNumberAndObjectId(userRecordVo.getUsername(), tGradeObject.getId());
            if (tGradeRecord == null) {
                tGradeRecord = new TGradeRecord();
                tGradeRecord.setStudentNumber(userRecordVo.getUsername());
                tGradeRecord.setCname(userRecordVo.getCname());
                tGradeRecord.setObjectId(tGradeObject.getId());
                tGradeRecord.setPoints(new BigDecimal(userRecordVo.getPoints() == null ? 0.0 : userRecordVo.getPoints()));
            } else {
                tGradeRecord.setPoints(new BigDecimal(userRecordVo.getPoints() == null ? 0.0 : userRecordVo.getPoints()));
            }
            tGradeRecord.setRecordTime(new Date());

            tGradeRecordJPA.save(tGradeRecord);

        }
        return true;

    }

    /*************************************************************************************
     * Description:课程维度提交到成绩册
     *
     * @author： 黄浩
     * @date：2020年3月30日
     *************************************************************************************/
    @Override
    public boolean submitTranscriptBySite(List<UserRecordVo> data) {

        //获取作业信息
        for (UserRecordVo userRecordVo : data) {
            this.initializeTTestGrading(userRecordVo.getSiteId(), userRecordVo.getUsername(), userRecordVo.getCname(), null, null, null, null);
            TGradeRecord tGradeRecord = tGradeRecordJPA.findTGradeRecordByStudentNumberAndAssignmentId(userRecordVo.getUsername(), userRecordVo.getAssignmentId());
            if (tGradeRecord == null) {
                TGradeObject tGradeObject = tGradeObjectJPA.findTGradeObjectBySiteId(userRecordVo.getSiteId(), userRecordVo.getAssignmentId().toString());
                tGradeRecord = new TGradeRecord();
                tGradeRecord.setStudentNumber(userRecordVo.getUsername());
                tGradeRecord.setCname(userRecordVo.getCname());
                tGradeRecord.setObjectId(tGradeObject.getId());
                tGradeRecord.setPoints(new BigDecimal(userRecordVo.getPoints() == null ? 0.0 : userRecordVo.getPoints()));
            } else {
                tGradeRecord.setPoints(new BigDecimal(userRecordVo.getPoints() == null ? 0.0 : userRecordVo.getPoints()));
            }
            tGradeRecord.setRecordTime(new Date());

            tGradeRecordJPA.save(tGradeRecord);

        }
        return true;

    }

    /*************************************************************************************
     * Description:提交行为成绩到成绩册
     *
     * @author： 黄浩
     * @date：2020年3月30日
     *************************************************************************************/
    @Override
    public boolean submitBehavior(List<TimetableOnlineTimeVO> data) {

        for (TimetableOnlineTimeVO timetableOnlineTimeVO : data) {
            this.initializeTTestGrading(timetableOnlineTimeVO.getSiteId(), timetableOnlineTimeVO.getUserVo().getUsername(), timetableOnlineTimeVO.getUserVo().getCname(), null, null, null, null);
            TTestGrading tTestGrading = tTestGradingJPA.findTTestGradingByStudentAndSAndSiteId(timetableOnlineTimeVO.getUserVo().getUsername(), timetableOnlineTimeVO.getSiteId());
            tTestGrading.setActionGrade(timetableOnlineTimeVO.getFinalScore() == null ? new BigDecimal(0.0) : timetableOnlineTimeVO.getFinalScore());
            tTestGrading.setAdditionActionScore(timetableOnlineTimeVO.getAdditionActionScore());
            tTestGradingJPA.save(tTestGrading);
        }
        return true;

    }

    /*************************************************************************************
     * Description:保存评分项
     *
     * @author： 黄浩
     * @date：2020年8月14日
     *************************************************************************************/
//    @Transactional
//    public boolean saveGradingItem(PracticeWeightVo practiceWeightVo) {
//        try {
//            TGradeObject tGradeObject = tGradeObjectJPA.findTGradeObjectByExperimentTitle(practiceWeightVo.getExperimentTitle());
//            //获取评分项id
//            String weightIdStr = objectWeightJPA.findWeightIdStr(practiceWeightVo.getExperimentTitle());
//            List<String> params = new ArrayList<>();
//            for (String ids : weightIdStr.split(",")){
//                params.add(ids);
//            }
//            if (!EmptyUtil.isEmpty(weightIdStr)) {
//                //删除评分项数据
//                String deleteOwSql = "delete from object_weight where object_id=:object_id";
//                String deleteWeightSql = "delete from t_weight_setting where id in (:weightIdStr)";
//                Query nativeQuery = entityManager.createNativeQuery(deleteOwSql);
//                nativeQuery.setParameter("object_id", tGradeObject.getId());
//                nativeQuery.executeUpdate();
//                Query nativeQuery1 = entityManager.createNativeQuery(deleteWeightSql);
//                nativeQuery1.setParameter("weightIdStr",params);
//                nativeQuery1.executeUpdate();
//            }
//            //再新增
//            for (TWeightSettingVO tWeightSettingVO : practiceWeightVo.gettWeightSettingVOList()) {
//                //保存评分项
//                TWeightSetting tWeightSetting = new TWeightSetting();
//                tWeightSetting.setType(tWeightSettingVO.getType());//名称
//                tWeightSetting.setWeight(tWeightSettingVO.getWeight());//标准分
//                tWeightSetting.setCourseNumber(practiceWeightVo.getCourseNumber());
//                tWeightSetting.setLevel(tWeightSettingVO.getLevel());//等级
//                tWeightSetting.setPracticeId(tWeightSettingVO.getPracticeId());//工训的评分项id
//                tWeightSetting.setParentId(tWeightSettingVO.getParentId());//上一级id
//                tWeightSetting = tWeightSettingJPA.saveAndFlush(tWeightSetting);
//                //保存评分项与工种关联关系
//                ObjectWeight ow = new ObjectWeight();
//                ow.setObjectId(tGradeObject.getId());
//                ow.setWeightId(tWeightSetting.getId());
//                objectWeightJPA.saveAndFlush(ow);
//            }
//            return true;
//        } catch (Exception e) {
//            e.printStackTrace();
//            return false;
//        }
//    }

    /*************************************************************************************
     * Description:根据标准分计算评分项权重（工训）
     *
     * @author： 黄浩
     * @date：2020年8月14日
     *************************************************************************************/
    @Override
    @Transactional
    public void calculateWeightByCorrect(String experimentTitle) {
        //获取最大级数
        Integer maxLevel = this.maxLevel(experimentTitle);
        Integer num = 1;
        while (num <= maxLevel) {
            //计算当前等级的权重
            if (num == 1) {
                String sql = "{call proc_work_final_weight_calculate_level1(:experimentTitle)}";
                Query nativeQuery = entityManager.createNativeQuery(sql);
                nativeQuery.setParameter("experimentTitle", experimentTitle);
                nativeQuery.executeUpdate();
            } else {
                List<TWeightSetting> tWeightSettingList = tWeightSettingJPA.practiceWeightShow(experimentTitle, num - 1);
                for (TWeightSetting tWeightSetting : tWeightSettingList) {
                    String sql = "{call proc_work_final_weight_calculate_level(:tWeightSettingId)}";
                    Query nativeQuery = entityManager.createNativeQuery(sql);
                    nativeQuery.setParameter("tWeightSettingId", tWeightSetting.getId());
                    nativeQuery.executeUpdate();
                }
            }
            num++;
        }
    }

    /*************************************************************************************
     * Description:获取最大级数（工训）
     *
     * @author： 黄浩
     * @date：2020年8月14日
     *************************************************************************************/
    public Integer maxLevel(String experimentTitle) {
        String maxSql = "select max(tws.`level`) from t_weight_setting tws" +
                " inner join object_weight ow on tws.id=ow.weight_id " +
                " inner join t_grade_object tgo on tgo.id=ow.object_id " +
                " where tgo.experiment_title=:experimentTitle";
        Query nativeQuery = entityManager.createNativeQuery(maxSql);
        nativeQuery.setParameter("experimentTitle", experimentTitle);
        List<Integer> maxLevels = nativeQuery.getResultList();
        return maxLevels.get(0);
    }

    /*************************************************************************************
     * Description:获取数据
     *
     * @author： 黄浩
     * @date：2020年8月14日
     *************************************************************************************/
    @Override
    public List<PracticeWeightShowVo> practiceWeightLevel(String experimentTitle, String student, Integer parentId) {
        //获取最大级数
        Integer maxLevel = this.maxLevel(experimentTitle);
        String sql = "select tws.type,tws.weight,tws.practice_id,tws.parent_id,tgr.student_number,IFNULL(tgr.points,0) from t_weight_setting tws" +
                "  left join object_weight ow on tws.id=ow.weight_id" +
                "  left join t_grade_object tgo on tgo.id=ow.object_id" +
                "  left join t_grade_record tgr on tgr.weight_id=tws.id" +
                "  where tgo.experiment_title=:experimentTitle and tgr.student_number=:student";
        if (parentId != 0) {
            sql += " and tws.parent_id =:parentId";
        } else {
            sql += " and tws.parent_id is null";
        }
        Query nativeQuery = entityManager.createNativeQuery(sql);
        nativeQuery.setParameter("experimentTitle", experimentTitle);
        nativeQuery.setParameter("student", student);
        if (parentId != 0) {
            nativeQuery.setParameter("parentId", parentId);
        }

        List<Object[]> list = nativeQuery.getResultList();
        List<PracticeWeightShowVo> practiceWeightShowVoList = new ArrayList<>();
        for (Object[] o : list) {
            PracticeWeightShowVo tWeightSettingVO = new PracticeWeightShowVo();
            tWeightSettingVO.setName(o[0].toString());
            tWeightSettingVO.setWeight(o[1].toString());
            tWeightSettingVO.setLevel(Integer.valueOf(o[2].toString()));
            tWeightSettingVO.setPracticeId(Integer.valueOf(o[3].toString()));
            tWeightSettingVO.setParentId(Integer.valueOf(o[4].toString()));
            tWeightSettingVO.setScore(o[4].toString());
            if (tWeightSettingVO.getLevel() + 1 < maxLevel) {
                tWeightSettingVO.setData(this.practiceWeightLevel(experimentTitle, student, tWeightSettingVO.getParentId()));
            }

            practiceWeightShowVoList.add(tWeightSettingVO);
        }
        return practiceWeightShowVoList;
    }

    /*************************************************************************************
     * Description:成绩册-工训打分
     *
     * @author： 黄浩
     * @date：2020年8月17日
     *************************************************************************************/
    @Override
    public boolean markingPracticeGrading(List<ObjectWeightEnableVo> data) {
        //数组第0项为工种id（视情况工训的id跟成绩册的id二选一），第一项为学生学号，第二项为评分项id（视情况工训的id跟成绩册的id二选一），第三项为分数
        //先按获取工训id方式处理

        Date date = new Date();
        //工种id
        Integer workId = tGradeObjectJPA.findTGradeObjectByExperimentTitle(data.get(0).getData()[0]).getId();
        //新增语句
        String sql = "";
        for (ObjectWeightEnableVo objectWeightEnableVo : data) {
            //删除语句
            String arr[] = objectWeightEnableVo.getData();
            //学生学号
            String student = arr[1];
            int num = 0;
            String points = arr[3];
            Integer weightId = tWeightSettingJPA.findTWeightSettingByPracticeId(Integer.valueOf(arr[2])).getId();
            //-1.00为未打分
            if (!points.equals("-1.00")) {
                sql += "('" + student + "','" + points + "','" + workId + "','" + date + "','" + weightId + "'),";
                TGradeRecord tGradeRecord = tGradeRecordJPA.findByStudentNumberAndObjectIdAndWeightId(student, workId, weightId);
                tGradeRecord.setPoints(new BigDecimal(points));
                tGradeRecord.setRecordTime(date);
                tGradeRecordJPA.save(tGradeRecord);
            }
        }
        return true;

    }

    /*************************************************************************************
     * Description:成绩册-往上级计算成绩（工训）
     *
     * @author： 黄浩
     * @date：2020年8月17日
     *************************************************************************************/
    @Override
    @Transactional
    public boolean calculatePracticeGrading(String experimentTitle, String student) {
        //获取最大级数
        Integer maxLevel = this.maxLevel(experimentTitle);
        while (maxLevel > 1) {
            String sql = "{proc_work_score_calculate(:experimentTitle,:maxLevel,:student)}";
            Query nativeQuery = entityManager.createNativeQuery(sql);
            nativeQuery.setParameter("experimentTitle", experimentTitle);
            nativeQuery.setParameter("maxLevel", maxLevel);
            nativeQuery.setParameter("student", student);
            nativeQuery.executeUpdate();
            maxLevel--;
        }
        return true;
    }

    /**************************************************************************
     * Description: 考核方式导出
     *
     * @author:黄浩
     * @date:2020年9月18日
     **************************************************************************/
    @Override
    public byte[] exportReportWeightBySiteId(Integer siteId) {
        List<ReportWeightDto> reportWeightDtos = new ArrayList<>();
        List<TGradeObjectVO> list = new ArrayList<>();
        //知识作业
        List<TGradeObjectVO> list0 = this.findTGradeObjects("knowledge", "assignment", siteId);
        //技能作业
        List<TGradeObjectVO> list1 = this.findTGradeObjects("skill", "assignment", siteId);
        //体验作业
        List<TGradeObjectVO> list2 = this.findTGradeObjects("experience", "assignment", siteId);
        //知识测试
        List<TGradeObjectVO> list3 = this.findTGradeObjects("knowledge", "test", siteId);
        //技能测试
        List<TGradeObjectVO> list4 = this.findTGradeObjects("skill", "test", siteId);
        //知识考勤
        List<TGradeObjectVO> list5 = this.findTGradeObjects("knowledge", "attendance", siteId);
        //技能考勤
        List<TGradeObjectVO> list6 = this.findTGradeObjects("skill", "attendance", siteId);
        //知识考试
        List<TGradeObjectVO> list7 = this.findTGradeObjects("knowledge", "exam", siteId);
        //实验报告
        List<TGradeObjectVO> list8 = this.findTGradeObjects("skill", "report", siteId);
        //实验数据
        List<TGradeObjectVO> list9 = this.findTGradeObjects("skill", "data", siteId);
        Stream.of(list0, list1, list2, list3, list4, list5, list6, list7, list8, list9).forEach(list::addAll);


        //总评权重
        TotalWeightSettingVO totalWeightSettingVO = this.findTWeightSetting(siteId);
        for (TGradeObjectVO tGradeObjectVO : list) {
            ReportWeightDto reportWeightDto = new ReportWeightDto();
            switch (tGradeObjectVO.getType()) {
                case "assignment":
                    reportWeightDto.setTypeTitle("作业");
                    break;
                case "test":
                    reportWeightDto.setTypeTitle("测试");
                    break;
                case "attendance":
                    reportWeightDto.setTypeTitle("考勤");
                    break;
                case "exam":
                    reportWeightDto.setTypeTitle("考试");
                    break;
                case "report":
                    reportWeightDto.setTypeTitle("实验报告");
                    break;
                case "data":
                    reportWeightDto.setTypeTitle("实验数据");
                    break;

            }
            switch (tGradeObjectVO.getModule()) {
                case "knowledge":
                    reportWeightDto.setModule("知识");
                    break;
                case "skill":
                    reportWeightDto.setModule("技能");
                    break;
                case "experience":
                    reportWeightDto.setModule("体验");
                    break;
            }
            reportWeightDto.setTitle(tGradeObjectVO.getName());
            reportWeightDto.setObjectWeight(tGradeObjectVO.getWeight().toString());

            if (tGradeObjectVO.getType().equals("assignment") && tGradeObjectVO.getModule().equals("knowledge")) {
                reportWeightDto.setTypeWeight(totalWeightSettingVO.getAssignmentWeight().toString());
                reportWeightDto.setCount(list0.size());
            } else if (tGradeObjectVO.getType().equals("assignment") && tGradeObjectVO.getModule().equals("skill")) {
                reportWeightDto.setTypeWeight(totalWeightSettingVO.getSkillAssignmentWeight().toString());
                reportWeightDto.setCount(list1.size());
            } else if (tGradeObjectVO.getType().equals("assignment") && tGradeObjectVO.getModule().equals("experience")) {
                reportWeightDto.setTypeWeight(totalWeightSettingVO.getExperienceWorkWeight().toString());
                reportWeightDto.setCount(list2.size());
            } else if (tGradeObjectVO.getType().equals("test") && tGradeObjectVO.getModule().equals("knowledge")) {
                reportWeightDto.setTypeWeight(totalWeightSettingVO.getTestWeight().toString());
                reportWeightDto.setCount(list3.size());
            } else if (tGradeObjectVO.getType().equals("test") && tGradeObjectVO.getModule().equals("skill")) {
                reportWeightDto.setTypeWeight(totalWeightSettingVO.getSkillTestWeight().toString());
                reportWeightDto.setCount(list4.size());
            } else if (tGradeObjectVO.getType().equals("attendance") && tGradeObjectVO.getModule().equals("knowledge")) {
                reportWeightDto.setTypeWeight(totalWeightSettingVO.getAttendenceWeight().toString());
                reportWeightDto.setCount(list5.size());
            } else if (tGradeObjectVO.getType().equals("attendance") && tGradeObjectVO.getModule().equals("skill")) {
                reportWeightDto.setTypeWeight(totalWeightSettingVO.getSkillAttendanceWeight().toString());
                reportWeightDto.setCount(list6.size());
            } else if (tGradeObjectVO.getType().equals("exam") && tGradeObjectVO.getModule().equals("knowledge")) {
                reportWeightDto.setTypeWeight(totalWeightSettingVO.getExamWeight().toString());
                reportWeightDto.setCount(list7.size());
            } else if (tGradeObjectVO.getType().equals("report") && tGradeObjectVO.getModule().equals("skill")) {
                reportWeightDto.setTypeWeight(totalWeightSettingVO.getSkillReportWeight().toString());
                reportWeightDto.setCount(list8.size());
            } else if (tGradeObjectVO.getType().equals("data") && tGradeObjectVO.getModule().equals("skill")) {
                reportWeightDto.setTypeWeight(totalWeightSettingVO.getSkillDataWeight().toString());
                reportWeightDto.setCount(list9.size());
            }
            reportWeightDtos.add(reportWeightDto);
        }
        //学习行为
        List<TWeightSettingVO> list10 = this.findTWeightSettingListByType(siteId, "action");
        for (TWeightSettingVO tWeightSettingVO : list10) {
            ReportWeightDto reportWeightDto = new ReportWeightDto();
            switch (tWeightSettingVO.getType()) {
                case "actionFullMark":
                    reportWeightDto.setTitle("学习行为在线时长满分权重");
                    break;
                case "actionEffectiveStudyFullMark":
                    reportWeightDto.setTitle("学习行为有效学习次数满分权重");
                    break;
                case "actionTotalStudyFullMark":
                    reportWeightDto.setTitle("学习行为登录总次数满分权重");
                    break;
                case "actionOnlineTime":
                    reportWeightDto.setTitle("学习行为登录时长权重");
                    break;
                case "actionEffectiveStudy":
                    reportWeightDto.setTitle("学习行为有效学习次数权重");
                    break;
                case "actionTotalStudy":
                    reportWeightDto.setTitle("学习行为登录总次数权重");
                    break;

            }
            reportWeightDto.setModule("学习行为");
            reportWeightDto.setTypeTitle("学习行为");
            reportWeightDto.setObjectWeight(tWeightSettingVO.getWeight().toString());
            reportWeightDto.setTypeWeight(totalWeightSettingVO.getActionWeight().toString());
            reportWeightDtos.add(reportWeightDto);
        }
        //学习小组
        List<TWeightSettingVO> list11 = this.findTWeightSettingListByType(siteId, "groupStage");
        for (TWeightSettingVO tWeightSettingVO : list11) {
            ReportWeightDto reportWeightDto = new ReportWeightDto();
            reportWeightDto.setTitle(tWeightSettingVO.getName());
            reportWeightDto.setModule("体验");
            reportWeightDto.setTypeTitle("学习小组");
            reportWeightDto.setObjectWeight(tWeightSettingVO.getWeight().toString());
            reportWeightDto.setTypeWeight(totalWeightSettingVO.getExperienceWeight().toString());
            reportWeightDto.setTeachWeight(totalWeightSettingVO.getTeachWeight().toString());
            reportWeightDto.setJudgeWeight(totalWeightSettingVO.getJudgesWeight().toString());
            reportWeightDtos.add(reportWeightDto);
        }

        //第一列作业行数
        Integer assignmentCount = list0.size() + list1.size() + list2.size();
        //第一列测试行数
        Integer testCount = list3.size() + list4.size();
        //第一列考勤行数
        Integer attendanceCount = list5.size() + list6.size();
        //第一列考试行数
        Integer examCount = list7.size();
        //第一列实验报告行数
        Integer reportCount = list8.size();
        //第一列实验数据行数
        Integer dataCount = list9.size();
        //第一列学习行为行数
        Integer actionCount = list10.size();
        //第一列学习小组行数
        Integer experienceCount = list11.size();
        //获取题库标题
        String title = "考核方式";
        String filePath = null;
        //获取题目集合
        //创建HSSFWorkbook对象(excel的文档对象)
        HSSFWorkbook wb = new HSSFWorkbook();
        //建立新的sheet对象（excel的表单）
        title = title.replaceAll("\\/", "_");
        HSSFSheet sheet = wb.createSheet(title);
        //指定合并开始行、合并结束行 合并开始列、合并结束列
        Integer merge = 1;
        //合并第一列开始
        if (assignmentCount > 1) {
            CellRangeAddress rangeAddress = new CellRangeAddress(1, assignmentCount, 0, 0);
            sheet.addMergedRegion(rangeAddress);
            merge = rangeAddress.getLastRow();
        } else {
            merge += assignmentCount;
        }
        if (testCount > 1) {
            CellRangeAddress rangeAddress = new CellRangeAddress(merge + 1, merge + testCount, 0, 0);
            sheet.addMergedRegion(rangeAddress);
            merge = rangeAddress.getLastRow();
        } else {
            merge += testCount;
        }

        if (attendanceCount > 1) {
            CellRangeAddress rangeAddress = new CellRangeAddress(merge + 1, merge + attendanceCount, 0, 0);
            sheet.addMergedRegion(rangeAddress);
            merge = rangeAddress.getLastRow();
        } else {
            merge += attendanceCount;
        }

        if (examCount > 1) {
            CellRangeAddress rangeAddress = new CellRangeAddress(merge + 1, merge + examCount, 0, 0);
            sheet.addMergedRegion(rangeAddress);
            merge = rangeAddress.getLastRow();
        } else {
            merge += examCount;
        }

        if (reportCount > 1) {
            CellRangeAddress rangeAddress = new CellRangeAddress(merge + 1, merge + reportCount, 0, 0);
            sheet.addMergedRegion(rangeAddress);
            merge = rangeAddress.getLastRow();
        } else {
            merge += reportCount;
        }

        if (dataCount > 1) {
            CellRangeAddress rangeAddress = new CellRangeAddress(merge + 1, merge + dataCount, 0, 0);
            sheet.addMergedRegion(rangeAddress);
            merge = rangeAddress.getLastRow();
        } else {
            merge += dataCount;
        }
        if (actionCount > 1) {
            CellRangeAddress rangeAddress = new CellRangeAddress(merge + 1, merge + actionCount, 0, 0);
            sheet.addMergedRegion(rangeAddress);
            merge = rangeAddress.getLastRow();
        } else {
            merge += actionCount;
        }
        if (experienceCount > 1) {
            CellRangeAddress rangeAddress = new CellRangeAddress(merge + 1, merge + experienceCount, 0, 0);
            sheet.addMergedRegion(rangeAddress);
        }
        //合并第一列结束

        //合并第二、第五列开始
        if (list0.size() > 1) {
            CellRangeAddress rangeAddress = new CellRangeAddress(1, list0.size(), 1, 1);
            CellRangeAddress rangeAddress1 = new CellRangeAddress(1, list0.size(), 4, 4);
            sheet.addMergedRegion(rangeAddress);
            sheet.addMergedRegion(rangeAddress1);
            merge = rangeAddress.getLastRow();
        } else {
            merge += list0.size();
        }
        if (list1.size() > 1) {
            CellRangeAddress rangeAddress = new CellRangeAddress(merge + 1, merge + list1.size(), 1, 1);
            CellRangeAddress rangeAddress1 = new CellRangeAddress(merge + 1, merge + list1.size(), 4, 4);
            sheet.addMergedRegion(rangeAddress);
            sheet.addMergedRegion(rangeAddress1);
            merge = rangeAddress.getLastRow();
        } else {
            merge += list1.size();
        }
        if (list2.size() > 1) {
            CellRangeAddress rangeAddress = new CellRangeAddress(merge + 1, merge + list2.size(), 1, 1);
            CellRangeAddress rangeAddress1 = new CellRangeAddress(merge + 1, merge + list2.size(), 4, 4);
            sheet.addMergedRegion(rangeAddress);
            sheet.addMergedRegion(rangeAddress1);
            merge = rangeAddress.getLastRow();
        } else {
            merge += list2.size();
        }
        if (list3.size() > 1) {
            CellRangeAddress rangeAddress = new CellRangeAddress(merge + 1, merge + list3.size(), 1, 1);
            CellRangeAddress rangeAddress1 = new CellRangeAddress(merge + 1, merge + list3.size(), 4, 4);
            sheet.addMergedRegion(rangeAddress);
            sheet.addMergedRegion(rangeAddress1);
            merge = rangeAddress.getLastRow();
        } else {
            merge += list3.size();
        }
        if (list4.size() > 1) {
            CellRangeAddress rangeAddress = new CellRangeAddress(merge + 1, merge + list4.size(), 1, 1);
            CellRangeAddress rangeAddress1 = new CellRangeAddress(merge + 1, merge + list4.size(), 4, 4);
            sheet.addMergedRegion(rangeAddress);
            sheet.addMergedRegion(rangeAddress1);
            merge = rangeAddress.getLastRow();
        } else {
            merge += list4.size();
        }
        if (list5.size() > 1) {
            CellRangeAddress rangeAddress = new CellRangeAddress(merge + 1, merge + list5.size(), 1, 1);
            CellRangeAddress rangeAddress1 = new CellRangeAddress(merge + 1, merge + list5.size(), 4, 4);
            sheet.addMergedRegion(rangeAddress);
            sheet.addMergedRegion(rangeAddress1);
            merge = rangeAddress.getLastRow();
        } else {
            merge += list5.size();
        }
        if (list6.size() > 1) {
            CellRangeAddress rangeAddress = new CellRangeAddress(merge + 1, merge + list6.size(), 1, 1);
            CellRangeAddress rangeAddress1 = new CellRangeAddress(merge + 1, merge + list6.size(), 4, 4);
            sheet.addMergedRegion(rangeAddress);
            sheet.addMergedRegion(rangeAddress1);
            merge = rangeAddress.getLastRow();
        } else {
            merge += list6.size();
        }
        if (list7.size() > 1) {
            CellRangeAddress rangeAddress = new CellRangeAddress(merge + 1, merge + list7.size(), 1, 1);
            CellRangeAddress rangeAddress1 = new CellRangeAddress(merge + 1, merge + list7.size(), 4, 4);
            sheet.addMergedRegion(rangeAddress);
            sheet.addMergedRegion(rangeAddress1);
            merge = rangeAddress.getLastRow();
        } else {
            merge += list7.size();
        }
        if (list8.size() > 1) {
            CellRangeAddress rangeAddress = new CellRangeAddress(merge + 1, merge + list8.size(), 1, 1);
            CellRangeAddress rangeAddress1 = new CellRangeAddress(merge + 1, merge + list8.size(), 4, 4);
            sheet.addMergedRegion(rangeAddress);
            sheet.addMergedRegion(rangeAddress1);
            merge = rangeAddress.getLastRow();
        } else {
            merge += list8.size();
        }
        if (list9.size() > 1) {
            CellRangeAddress rangeAddress = new CellRangeAddress(merge + 1, merge + list9.size(), 1, 1);
            CellRangeAddress rangeAddress1 = new CellRangeAddress(merge + 1, merge + list9.size(), 4, 4);
            sheet.addMergedRegion(rangeAddress);
            sheet.addMergedRegion(rangeAddress1);
            merge = rangeAddress.getLastRow();
        } else {
            merge += list9.size();
        }
        if (list10.size() > 1) {
            CellRangeAddress rangeAddress = new CellRangeAddress(merge + 1, merge + list10.size(), 1, 1);
            CellRangeAddress rangeAddress1 = new CellRangeAddress(merge + 1, merge + list10.size(), 4, 4);
            sheet.addMergedRegion(rangeAddress);
            sheet.addMergedRegion(rangeAddress1);
            merge = rangeAddress.getLastRow();
        } else {
            merge += list10.size();
        }
        if (list11.size() > 1) {
            CellRangeAddress rangeAddress = new CellRangeAddress(merge + 1, merge + list11.size(), 1, 1);
            CellRangeAddress rangeAddress1 = new CellRangeAddress(merge + 1, merge + list11.size(), 4, 4);
            CellRangeAddress rangeAddress2 = new CellRangeAddress(merge + 1, merge + list11.size(), 5, 5);
            CellRangeAddress rangeAddress3 = new CellRangeAddress(merge + 1, merge + list11.size(), 6, 6);
            sheet.addMergedRegion(rangeAddress);
            sheet.addMergedRegion(rangeAddress1);
            sheet.addMergedRegion(rangeAddress2);
            sheet.addMergedRegion(rangeAddress3);
        }
        //合并第二列结束


        HSSFRow row = sheet.createRow((int) 0);
        //表头
        row.createCell(0).setCellValue("考核方式");
        row.createCell(1).setCellValue("所属模块");
        row.createCell(2).setCellValue("考核项目");
        row.createCell(3).setCellValue("单项权重");
        row.createCell(4).setCellValue("总成绩权重");
        row.createCell(5).setCellValue("导师打分权重");
        row.createCell(6).setCellValue("评委打分权重");
        int i = 1;
        for (ReportWeightDto reportWeightDto : reportWeightDtos) //遍历题目
        {
            row = sheet.createRow((int) i);
            row.createCell(0).setCellValue(reportWeightDto.getTypeTitle());
            row.createCell(1).setCellValue(reportWeightDto.getModule());
            row.createCell(2).setCellValue(reportWeightDto.getTitle());
            row.createCell(3).setCellValue(reportWeightDto.getObjectWeight());
            row.createCell(4).setCellValue(reportWeightDto.getTypeWeight());
            if (!EmptyUtil.isEmpty(reportWeightDto.getTeachWeight())) {
                row.createCell(5).setCellValue(reportWeightDto.getTeachWeight());
            }
            if (!EmptyUtil.isEmpty(reportWeightDto.getJudgeWeight())) {
                row.createCell(6).setCellValue(reportWeightDto.getJudgeWeight());
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
     * Description: 获取成绩权重表格对象
     *
     * @author:fubowen
     * @date:2020-12-23
     **************************************************************************/
    @Override
    public List<ReportWeightDto> getGradeWeightBySiteId(Integer siteId) {
        List<ReportWeightDto> reportWeightDtos = new ArrayList<>();
        List<TGradeObjectVO> list = new ArrayList<>();
        //知识作业
        List<TGradeObjectVO> list0 = this.findTGradeObjects("knowledge", "assignment", siteId);
        //技能作业
        List<TGradeObjectVO> list1 = this.findTGradeObjects("skill", "assignment", siteId);
        //体验作业
        List<TGradeObjectVO> list2 = this.findTGradeObjects("experience", "assignment", siteId);
        //知识测试
        List<TGradeObjectVO> list3 = this.findTGradeObjects("knowledge", "test", siteId);
        //技能测试
        List<TGradeObjectVO> list4 = this.findTGradeObjects("skill", "test", siteId);
        //知识考勤
        List<TGradeObjectVO> list5 = this.findTGradeObjects("knowledge", "attendance", siteId);
        //技能考勤
        List<TGradeObjectVO> list6 = this.findTGradeObjects("skill", "attendance", siteId);
        //知识考试
        List<TGradeObjectVO> list7 = this.findTGradeObjects("knowledge", "exam", siteId);
        //实验报告
        List<TGradeObjectVO> list8 = this.findTGradeObjects("skill", "report", siteId);
        //实验数据
        List<TGradeObjectVO> list9 = this.findTGradeObjects("skill", "data", siteId);
        Stream.of(list0, list1, list2, list3, list4, list5, list6, list7, list8, list9).forEach(list::addAll);


        //总评权重
        TotalWeightSettingVO totalWeightSettingVO = this.findTWeightSetting(siteId);
        for (TGradeObjectVO tGradeObjectVO : list) {
            ReportWeightDto reportWeightDto = new ReportWeightDto();
            switch (tGradeObjectVO.getType()) {
                case "assignment":
                    reportWeightDto.setTypeTitle("作业");
                    break;
                case "test":
                    reportWeightDto.setTypeTitle("测试");
                    break;
                case "attendance":
                    reportWeightDto.setTypeTitle("考勤");
                    break;
                case "exam":
                    reportWeightDto.setTypeTitle("考试");
                    break;
                case "report":
                    reportWeightDto.setTypeTitle("实验报告");
                    break;
                case "data":
                    reportWeightDto.setTypeTitle("实验数据");
                    break;

            }
            switch (tGradeObjectVO.getModule()) {
                case "knowledge":
                    reportWeightDto.setModule("知识");
                    break;
                case "skill":
                    reportWeightDto.setModule("技能");
                    break;
                case "experience":
                    reportWeightDto.setModule("体验");
                    break;
            }
            reportWeightDto.setTitle(tGradeObjectVO.getName());
            reportWeightDto.setObjectWeight(tGradeObjectVO.getWeight().toString());

            if (tGradeObjectVO.getType().equals("assignment") && tGradeObjectVO.getModule().equals("knowledge")) {
                reportWeightDto.setTypeWeight(totalWeightSettingVO.getAssignmentWeight().toString());
                reportWeightDto.setCount(list0.size());
            } else if (tGradeObjectVO.getType().equals("assignment") && tGradeObjectVO.getModule().equals("skill")) {
                reportWeightDto.setTypeWeight(totalWeightSettingVO.getSkillAssignmentWeight().toString());
                reportWeightDto.setCount(list1.size());
            } else if (tGradeObjectVO.getType().equals("assignment") && tGradeObjectVO.getModule().equals("experience")) {
                reportWeightDto.setTypeWeight(totalWeightSettingVO.getExperienceWorkWeight().toString());
                reportWeightDto.setCount(list2.size());
            } else if (tGradeObjectVO.getType().equals("test") && tGradeObjectVO.getModule().equals("knowledge")) {
                reportWeightDto.setTypeWeight(totalWeightSettingVO.getTestWeight().toString());
                reportWeightDto.setCount(list3.size());
            } else if (tGradeObjectVO.getType().equals("test") && tGradeObjectVO.getModule().equals("skill")) {
                reportWeightDto.setTypeWeight(totalWeightSettingVO.getSkillTestWeight().toString());
                reportWeightDto.setCount(list4.size());
            } else if (tGradeObjectVO.getType().equals("attendance") && tGradeObjectVO.getModule().equals("knowledge")) {
                reportWeightDto.setTypeWeight(totalWeightSettingVO.getAttendenceWeight().toString());
                reportWeightDto.setCount(list5.size());
            } else if (tGradeObjectVO.getType().equals("attendance") && tGradeObjectVO.getModule().equals("skill")) {
                reportWeightDto.setTypeWeight(totalWeightSettingVO.getSkillAttendanceWeight().toString());
                reportWeightDto.setCount(list6.size());
            } else if (tGradeObjectVO.getType().equals("exam") && tGradeObjectVO.getModule().equals("knowledge")) {
                reportWeightDto.setTypeWeight(totalWeightSettingVO.getExamWeight().toString());
                reportWeightDto.setCount(list7.size());
            } else if (tGradeObjectVO.getType().equals("report") && tGradeObjectVO.getModule().equals("skill")) {
                reportWeightDto.setTypeWeight(totalWeightSettingVO.getSkillReportWeight().toString());
                reportWeightDto.setCount(list8.size());
            } else if (tGradeObjectVO.getType().equals("data") && tGradeObjectVO.getModule().equals("skill")) {
                reportWeightDto.setTypeWeight(totalWeightSettingVO.getSkillDataWeight().toString());
                reportWeightDto.setCount(list9.size());
            }
            reportWeightDtos.add(reportWeightDto);
        }
        //学习行为
        List<TWeightSettingVO> list10 = this.findTWeightSettingListByType(siteId, "action");
        for (TWeightSettingVO tWeightSettingVO : list10) {
            ReportWeightDto reportWeightDto = new ReportWeightDto();
            switch (tWeightSettingVO.getType()) {
                case "actionFullMark":
                    reportWeightDto.setTitle("学习行为在线时长满分权重");
                    break;
                case "actionEffectiveStudyFullMark":
                    reportWeightDto.setTitle("学习行为有效学习次数满分权重");
                    break;
                case "actionTotalStudyFullMark":
                    reportWeightDto.setTitle("学习行为登录总次数满分权重");
                    break;
                case "actionOnlineTime":
                    reportWeightDto.setTitle("学习行为登录时长权重");
                    break;
                case "actionEffectiveStudy":
                    reportWeightDto.setTitle("学习行为有效学习次数权重");
                    break;
                case "actionTotalStudy":
                    reportWeightDto.setTitle("学习行为登录总次数权重");
                    break;

            }
            reportWeightDto.setModule("学习行为");
            reportWeightDto.setTypeTitle("学习行为");
            reportWeightDto.setObjectWeight(tWeightSettingVO.getWeight().toString());
            reportWeightDto.setTypeWeight(totalWeightSettingVO.getActionWeight().toString());
            reportWeightDtos.add(reportWeightDto);
        }
        //学习小组
        List<TWeightSettingVO> list11 = this.findTWeightSettingListByType(siteId, "groupStage");
        for (TWeightSettingVO tWeightSettingVO : list11) {
            ReportWeightDto reportWeightDto = new ReportWeightDto();
            reportWeightDto.setTitle(tWeightSettingVO.getName());
            reportWeightDto.setModule("体验");
            reportWeightDto.setTypeTitle("学习小组");
            reportWeightDto.setObjectWeight(tWeightSettingVO.getWeight() == null ? "" : tWeightSettingVO.getWeight().toString());
            reportWeightDto.setTypeWeight(totalWeightSettingVO.getExperienceWeight() == null ? "" : totalWeightSettingVO.getExperienceWeight().toString());
            reportWeightDto.setTeachWeight(totalWeightSettingVO.getTeachWeight() == null ? "" : totalWeightSettingVO.getTeachWeight().toString());
            reportWeightDto.setJudgeWeight(totalWeightSettingVO.getJudgesWeight() == null ? "" : totalWeightSettingVO.getJudgesWeight().toString());
            reportWeightDtos.add(reportWeightDto);
        }
        return reportWeightDtos;
    }

    /**************************************************************************
     * Description：新增成绩数据
     *
     * @author：黄浩
     * @date ：2019年4月26日
     **************************************************************************/
    @Override
    public JsonReturnVo saveExamRecord(String assignmentId, String username, String cname, Double points) {
        //查询某一项作业的成绩册
        TGradeObject tGradeObject = tGradeObjectJPA.findTGradeObjectByAssignmentId(assignmentId);
        //如果学生信息在保存成绩之前没有查询到，在此进行自动添加
        if (tGradeObject != null) {
            TGradeRecord tGradeRecord = tGradeRecordJPA.findTGradeRecordByStudentNumberAndObjectId(username, tGradeObject.getId());
            if (tGradeRecord == null) {
                tGradeRecord = new TGradeRecord();
                tGradeRecord.setStudentNumber(username);
                tGradeRecord.setCname(cname);
                tGradeRecord.setObjectId(tGradeObject.getId());
                tGradeRecord.setPoints(new BigDecimal(points));
            } else {
//                if (points.compareTo(tGradeRecord.getPoints().doubleValue())==1) {//如果新成绩高，则覆盖
                tGradeRecord.setPoints(new BigDecimal(points));
//                }
            }
            tGradeRecord.setRecordTime(new Date());

            TGradeRecord newTGradeRecord = tGradeRecordJPA.save(tGradeRecord);
            if (newTGradeRecord != null) {
                System.out.println("成绩保存结果:" + newTGradeRecord.getCname() + ":" + newTGradeRecord.getPoints());
                return JsonReturnVo.successJson("成绩册成绩更新为:" + newTGradeRecord.getPoints());
            } else {
                return JsonReturnVo.errorJson("成绩册保存失败");
            }
        } else {
            System.out.println("成绩保存结果:没存进去");
            return JsonReturnVo.errorJson("成绩册保存失败，未创建成绩册");
        }
    }

    /**************************************************************************
     * Description：获取评分项数据并保存
     *
     * @author：黄浩
     * @date ：2020年10月28日
     **************************************************************************/
    @Override
    public boolean getIndicatorAndSave(String workUid, String timetableId, String businessTime, String apiGateWayHost) {
//        try {
        String[] idArr = timetableId.split(",");
        String[] bussinessArr = businessTime.split(",");
        //获取评分项数据
        net.gvsun.configcenter.internal.api.CommonResult<List<TimetableDTO>> result = configcenterFeign.info(Integer.valueOf(idArr[0]));
        List<TimetableDTO> timetableInfoDTOS = result.getData();
        List<ConfigIndicatorDTO> configIndicatorDTOS = timetableInfoDTOS.get(0).getTimetableProcessDTOS().get(0).getConfigIndicators();
        for (int i = 0; i < idArr.length; i++) {
            //保存评分项
            saveIndicator(configIndicatorDTOS, tGradeObjectJPA.findTGradeObjectByExperimentTitle(workUid).getId(), bussinessArr[i]);
        }
        return true;
//        } catch (Exception e) {
//            System.out.println("保存评分项报错：" + e);
//            return false;
//        }
    }

    //保存评分项
    public void saveIndicator(List<ConfigIndicatorDTO> configIndicatorDTOS, Integer objectId, String businessTime) {
        String start = businessTime.split("~")[0];
        String end = businessTime.split("~")[1];
        for (ConfigIndicatorDTO configIndicatorDTO : configIndicatorDTOS) {
            //保存评分项
            TWeightSetting tWeightSetting = new TWeightSetting();
            tWeightSetting.setType(configIndicatorDTO.getIndicatorCname());
            tWeightSetting.setPracticeId(configIndicatorDTO.getId());
            tWeightSetting.setParentId(configIndicatorDTO.getParentId());
            tWeightSetting.setWeight(new BigDecimal(configIndicatorDTO.getStandardScore()));
            //开始时间
            tWeightSetting.setCreateDate(DateFormatUtil.stringToDate1(start));
            //结束时间
            tWeightSetting.setModifyDate(DateFormatUtil.stringToDate1(end));
            tWeightSetting = tWeightSettingJPA.save(tWeightSetting);
            //保存评分项与工种关系
            ObjectWeight objectWeight = new ObjectWeight();
            objectWeight.setObjectId(objectId);
            objectWeight.setWeightId(tWeightSetting.getId());
            objectWeightJPA.save(objectWeight);
            if (Objects.nonNull(configIndicatorDTO.getConfigIndicatorDTOS())&&configIndicatorDTO.getConfigIndicatorDTOS().size() > 0) {
                this.saveIndicator(configIndicatorDTO.getConfigIndicatorDTOS(), objectId, businessTime);
            }
        }
    }

    /**************************************************************************
     * Description：保存分级评分项打分
     *
     * @author：黄浩
     * @date ：2020年10月28日
     **************************************************************************/
    @Override
    public boolean saveIndicatorScore(List<GradeIndicatorDTO> gradeIndicatorDTOList) {
        String workUid = gradeIndicatorDTOList.get(0).getWorkUid();
        String student = gradeIndicatorDTOList.get(0).getStudent();
        String cname = gradeIndicatorDTOList.get(0).getGradeByCname();
        String gradeBy = gradeIndicatorDTOList.get(0).getGradeBy();
        String start = gradeIndicatorDTOList.get(0).getBusinessTime().split("~")[0];
        String end = gradeIndicatorDTOList.get(0).getBusinessTime().split("~")[1];
        String courseNumber = tGradebookJPA.findPracticeCourseNumber(workUid);
        String studentCname = tTestGradingJPA.findTTestGradingByStudentAndSAndCourseNumber(student, courseNumber).getCname();
        Integer objectId = tGradeObjectJPA.findTGradeObjectByExperimentTitle(workUid).getId();
        for (GradeIndicatorDTO gradeIndicatorDTO : gradeIndicatorDTOList) {
            Integer practiceId = gradeIndicatorDTO.getPracticeId();

            TGradeRecord tGradeRecord = tGradeRecordJPA.findPractice(workUid, practiceId, student, gradeBy, start, end);
            if (tGradeRecord == null) {
                tGradeRecord = new TGradeRecord();
                tGradeRecord.setPoints(new BigDecimal(gradeIndicatorDTO.getScore()));
                tGradeRecord.setStudentNumber(student);
                tGradeRecord.setCname(studentCname);
                tGradeRecord.setWeightId(tWeightSettingJPA.findTWeightSettingByPracticeIdDate(practiceId, start, end).getId());
                tGradeRecord.setObjectId(objectId);
                tGradeRecord.setRecordTime(new Date());
                tGradeRecord.setGradeBy(gradeBy);
                tGradeRecord.setGradeCname(cname);
            } else {
                tGradeRecord.setPoints(new BigDecimal(gradeIndicatorDTO.getScore()));
            }
            tGradeRecordJPA.save(tGradeRecord);
        }
        return true;
    }

    /****************************************************************************
     * Description:计算各个部分总权重(t_grade_object表)
     *
     * @author：马帅
     * @date：2018-2-6
     *****************************************************************************/
    public BigDecimal calculationTotalWeight(String module, String type, Integer siteId) {
        BigDecimal tWeight = new BigDecimal(0);
        List<TGradeObject> objectList = tGradeObjectJPA.findTGradeObjectBySiteIdAndModuleAndType(siteId, module, type);
        for (TGradeObject t : objectList) {
            tWeight = tWeight.add(t.getWeight());
        }
        return tWeight;
    }

    /****************************************************************************
     * Description:获取学习行为额外成绩
     *
     * @author：黄浩
     * @date：2021年1月29日
     *****************************************************************************/
    @Override
    public BigDecimal additionActionScore(String username, Integer siteId) {
        BigDecimal result = new BigDecimal(0.0);
        TTestGrading tTestGrading = tTestGradingJPA.findTTestGradingByStudentAndSAndSiteId(username, siteId);
        if (tTestGrading != null && tTestGrading.getAdditionActionScore() != null) {
            result = tTestGrading.getAdditionActionScore();
        }
        return result;
    }

    /****************************************************************************
     * Description:获取流程成绩报表数据
     *
     * @author：黄浩
     * @date：2021年1月29日
     *****************************************************************************/
    @Override
    public List<UserDTO> configGradeData(GradeIndicatorDTO gradeIndicatorDTO) {
        List<UserDTO> userDTOS = new ArrayList<>();
        String courseNumber = tGradebookJPA.findPracticeCourseNumber(gradeIndicatorDTO.getWorkUid());
        String start = gradeIndicatorDTO.getBusinessTime().split("~")[0];
        String end = gradeIndicatorDTO.getBusinessTime().split("~")[1];
        List<TTestGrading> tTestGradingList = null;
        boolean isSearch = EmptyUtil.isEmpty(gradeIndicatorDTO.getGradeBy());
        if (!EmptyUtil.isEmpty(gradeIndicatorDTO.getSearch())) {
            tTestGradingList = tTestGradingJPA.courseStudent(courseNumber, gradeIndicatorDTO.getSearch());
        } else {
            tTestGradingList = tTestGradingJPA.courseStudent(courseNumber);
        }
        for (TTestGrading tTestGrading : tTestGradingList) {
            UserDTO userDTO = new UserDTO();
            userDTO.setStudent(tTestGrading.getStudent());
            userDTO.setCname(tTestGrading.getCname());
            //分数
            String sql = "select ifnull(sum(tgr.points),0),tgr.grade_by,tgr.grade_cname from t_grade_record tgr " +
                    "inner join t_grade_object tgo on tgo.id = tgr.object_id " +
                    "where tgo.experiment_title = :workUid ";
            if (!isSearch) {
                sql += " and (tgr.grade_by like CONCAT('%',:gradeBy,'%') or tgr.grade_cname like CONCAT('%',:gradeBy,'%'))";
            }
            sql += "  and tgr.weight_id in (select tws.id from t_weight_setting tws where tws.create_date = :start and tws.modify_date = :end ) " +
                    " and tgr.student_number = :student" +
                    " group by tgr.grade_by ";
            Query query = entityManager.createNativeQuery(sql);
            query.setParameter("workUid", gradeIndicatorDTO.getWorkUid());
            query.setParameter("start", start);
            query.setParameter("end", end);
            query.setParameter("student", tTestGrading.getStudent());
            if (!isSearch) {
                query.setParameter("gradeBy", gradeIndicatorDTO.getGradeBy());
            }
            List<Object[]> objects = query.getResultList();
            List<GradeIndicatorDTO> grades = new ArrayList<>();
            for (Object[] o : objects) {
                GradeIndicatorDTO grade = new GradeIndicatorDTO();
                grade.setScore(Double.valueOf(o[0].toString()));
                grade.setGradeBy(o[1].toString());
                grade.setGradeByCname(o[2].toString());
                grades.add(grade);
            }
            userDTO.setGradeList(grades);
            userDTOS.add(userDTO);
        }
        return userDTOS;
    }

    /****************************************************************************
     * Description:获取打分教师
     *
     * @author：黄浩
     * @date：2021年1月29日
     *****************************************************************************/
    @Override
    public List<UserDetailDto> getConfigTeacher(GradeIndicatorDTO gradeIndicatorDTO) {
//        List<ObjectUser> objectUserList = objectUserJPA.findUsernameByUid(gradeIndicatorDTO.getWorkUid());
        String courseNumber = tGradebookJPA.findPracticeCourseNumber(gradeIndicatorDTO.getWorkUid());
        String sql = "select username from object_user where object_uid = :objectUid " +
                "and username not in (select student from t_test_grading where course_number = :courseNumber)";
        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("objectUid", gradeIndicatorDTO.getWorkUid());
        query.setParameter("courseNumber", courseNumber);
        List<String> list = query.getResultList();
        String usernames = "";
        for (String username : list) {
            usernames += username + ",";
        }
        usernames = usernames.substring(0, usernames.length() - 1);
//        ResultDataDto<List<UserInfoDTO>> resultDto = restTemplate.getForObject("http://localhost/api/usercenter/getBasicInfo?usernames=" +usernames, ResultDataDto.class);
        ResultDataDto<List<UserDetailDto>> resultDto = usercenterFeign.getBasicInfo(usernames);
        return resultDto.getData();
    }

    @Override
    public void saveCourseTemplate(String title, Integer display) {
        TWeightSetting setting = tWeightSettingJPA.findTWeightSettingBySiteIdAndType(0, title);
        setting.setDisplay(display);
        tWeightSettingJPA.save(setting);
        List<TWeightSetting> twsList = tWeightSettingJPA.findTWeightSettingsByType(title);
        for (TWeightSetting tWeightSetting : twsList) {
            tWeightSetting.setDisplay(display);
            if (display == 0) {
                ;
            }
            tWeightSetting.setWeight(new BigDecimal(0));
        }
        tWeightSettingJPA.saveAll(twsList);
    }

    @Override
    public List<TWeightSettingVO> findTWeightSettingListByTypeNew(String type) {
        List<TWeightSetting> twsList = tWeightSettingJPA.findTWeightSettingsByType(type);
        List<TWeightSettingVO> list = new ArrayList<>();
        for (TWeightSetting tWeightSetting : twsList) {
            TWeightSettingVO t = new TWeightSettingVO();
            t.setId(tWeightSetting.getId());
            t.setType(tWeightSetting.getType());
            t.setWeight(tWeightSetting.getWeight());
            t.setDisPlay(tWeightSetting.getDisplay());
            t.setSiteId(tWeightSetting.getSiteId());
            list.add(t);
        }
        return list;
    }

    @Override
    public void saveSystemWeightSetting(List<TWeightSettingVO> list) {
        for (TWeightSettingVO vo : list) {
            List<TWeightSetting> twsList = tWeightSettingJPA.findTWeightSettingsByType(vo.getType());
            for (TWeightSetting tWeightSetting : twsList) {
                tWeightSetting.setDisplay(vo.getDisPlay());
                if (vo.getDisPlay() == 0) {
                    tWeightSetting.setWeight(new BigDecimal(0));
                }
            }
            tWeightSettingJPA.saveAll(twsList);
        }
    }

    @Override
    public void deleteTranscriptByCourseNumber(String courseNumber, String product) {
        String objectIdSql = "(select tgo.id from t_grade_object tgo inner join t_gradebook tg on tgo.grade_id = tg.id where tg.course_number = ? and tg.product = ?)";
        String objectUidSql = "(select tgo.experiment_title from t_grade_object tgo inner join t_gradebook tg on tgo.grade_id = tg.id where tg.course_number = ? and tg.product = ?)";
        //删除成绩
        jdbcOperations.update("delete tgr from t_grade_record tgr where tgr.object_id in " + objectIdSql, courseNumber, product);
        //删除学生
        jdbcOperations.update("delete ttg from t_test_grading ttg where ttg.course_number = ?", courseNumber);
        jdbcOperations.update("delete ou from object_user ou where ou.object_uid in " + objectUidSql, courseNumber, product);
        //删除评分项
        jdbcOperations.update("delete tws from t_weight_setting tws where tws.id in (select DISTINCT ow.weight_id from object_weight ow where ow.object_id in " + objectIdSql + ")", courseNumber, product);
        jdbcOperations.update("delete ow from object_weight ow where ow.object_id in " + objectIdSql, courseNumber, product);
        //删除工种
        jdbcOperations.update("delete tgo from t_grade_object tgo where tgo.grade_id = (select tg.id from t_gradebook tg where tg.course_number = ? and tg.product = ? )", courseNumber, product);
        //删除课程
        jdbcOperations.update("delete tg from t_gradebook tg where tg.course_number = ? and tg.product = ? ", courseNumber, product);

    }

    /*************************************************************************************
     * Description:成绩册-复制工训权重
     *
     * @author： 黄浩
     * @date：2019年10月9日
     *************************************************************************************/
    @Override
    public Result<String> copyPracticeWeight(String courseNumber, String ids) {
        //查询需要复制的评分项
        List<Integer> idList = Arrays.asList(ids.split(",")).stream().map(s -> Integer.valueOf(s.trim())).collect(Collectors.toList());
        List<TWeightSetting> copyWeights = tWeightSettingJPA.findByIds(idList);
        //查询原有的评分项
        List<TWeightSetting> exitWeightList = tWeightSettingJPA.findTWeightSettingByCourseNumber(courseNumber);
        //校验
        BigDecimal totalWeight = new BigDecimal(0.0);
        for (TWeightSetting tWeightSetting : exitWeightList) {
            totalWeight = totalWeight.add(tWeightSetting.getWeight());
        }
        for (TWeightSetting tWeightSetting : copyWeights) {
            totalWeight = totalWeight.add(tWeightSetting.getWeight());
        }
        int result = totalWeight.subtract(BigDecimal.ONE).compareTo(BigDecimal.ZERO);
        if (result == 1) {
            return Result.failed("保存失败，所有评分项已超过1");
        }
        Date date = new Date();
        List<TWeightSetting> saveList = new ArrayList<>();
        for (TWeightSetting tWeightSetting : copyWeights) {
            TWeightSetting saveWeight = new TWeightSetting();
            saveWeight.setType(tWeightSetting.getType());
            saveWeight.setCourseNumber(courseNumber);
            saveWeight.setCreateDate(date);
            saveWeight.setWeight(tWeightSetting.getWeight());
            saveList.add(saveWeight);
        }
        tWeightSettingJPA.saveAll(saveList);
        return Result.ok("复制成功");
    }

    /*************************************************************************************
     * Description:成绩册-获取成绩api
     *
     * @author： 黄浩
     * @date：2021年12月3日
     *************************************************************************************/
    @Override
    public List<TranscriptVo> findTGradeRecordsApi(String module, String type, Integer siteId, String assignmentSearch, String userSearch) {
        //查询课程
        List<TGradebook> tGradebookList = tGradebookJPA.findTGradebookInSite(siteId);
        List<TranscriptVo> transcriptVoList = new ArrayList<>();
        if (tGradebookList == null || tGradebookList.size() == 0) {
            return transcriptVoList;
        }
        //获取课程学生
        List<TTestGrading> tTestGradingList = tTestGradingJPA.findTTestGradingsBySiteId(siteId);
        //Sql查询
        String sql = "select tgo.assignment_id,tgo.title,tgr.student_number,tgr.points from t_grade_object tgo " +
                "inner join t_gradebook tg on tgo.grade_id = tg.id " +
                "inner join t_grade_record tgr on tgo.id = tgr.object_id " +
                "where tg.site_id =:siteId and tgo.module =:module and tgo.type =:type ";
        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("siteId", siteId);
        query.setParameter("module", module);
        query.setParameter("type", type);
        // 返回结果
        List<Object[]> queryHQLs = query.getResultList();
        //封装作业
        if (queryHQLs.size() > 0) {
            String assignmentId = "";
            for (Object[] objects : queryHQLs) {
                TranscriptVo transcriptVo = new TranscriptVo();
                //如果不是同一个assignmentId就封装
                if (!assignmentId.equals(objects[0].toString())) {
                    transcriptVo.setSiteId(siteId);
                    transcriptVo.setSiteName(tGradebookList.get(0).getTitle());
                    transcriptVo.setAssignmentId(objects[0].toString());
                    transcriptVo.setTitle(objects[1].toString());
                    transcriptVoList.add(transcriptVo);
                }
                assignmentId = objects[0].toString();
            }
            //封装成绩
            for (TranscriptVo transcriptVo : transcriptVoList) {
                List<Object[]> assignmentObjects = queryHQLs.stream().filter(objects -> objects[0].equals(transcriptVo.getAssignmentId())).collect(Collectors.toList());
                List<TranscriptInfoVo> transcriptInfoVoList = new ArrayList<>();
                for (TTestGrading tTestGrading : tTestGradingList) {
                    TranscriptInfoVo transcriptInfoVo = new TranscriptInfoVo();
                    transcriptInfoVo.setUsername(tTestGrading.getStudent());
                    transcriptInfoVo.setCname(tTestGrading.getCname());
                    transcriptInfoVo.setResults("0.00");
                    //查询如果有成绩
                    Optional<Object[]> assignmentObjectOptional = assignmentObjects.stream().filter(item -> item[2].equals(tTestGrading.getStudent())).findFirst();
                    if (assignmentObjectOptional.isPresent()) {
                        Object[] objects = assignmentObjectOptional.get();
                        transcriptInfoVo.setResults(objects[3].toString());
                    }

                    transcriptInfoVoList.add(transcriptInfoVo);
                    transcriptVo.setTranscriptInfoVos(transcriptInfoVoList);
                }
            }

            //根据作业过滤
            if (Objects.nonNull(assignmentSearch) && !"".equals(assignmentSearch.trim())) {
                transcriptVoList = transcriptVoList.stream().filter(transcriptVo -> transcriptVo.getAssignmentId().equals(assignmentSearch) || transcriptVo.getTitle().contains(assignmentSearch)).collect(Collectors.toList());
            }
            //根据单个学生过滤
            if (Objects.nonNull(userSearch) && !"".equals(userSearch.trim())) {
                for (TranscriptVo transcriptVo : transcriptVoList) {
                    List<TranscriptInfoVo> searchList = transcriptVo.getTranscriptInfoVos().stream().filter(transcriptInfoVo -> transcriptInfoVo.getCname().contains(userSearch)||transcriptInfoVo.getUsername().contains(userSearch)).collect(Collectors.toList());
                    transcriptVo.setTranscriptInfoVos(searchList);
                }
            }
        }
        return transcriptVoList;
    }
}
