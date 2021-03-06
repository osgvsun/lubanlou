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
     * Description:?????????-????????????
     *
     * @author??? ??????
     * @date???2019???4???24???
     *************************************************************************************/
    @Override
    public TranscriptVo findTGradeRecords(String module, String type, Integer siteId, String currpage, String pageSize, String cname, String username, String courseNumber, String classesNumber) {
        username = (username == null || username.equals("null")) ? "" : username;
        cname = (cname == null || cname.equals("null")) ? "" : cname;
        classesNumber = (classesNumber == null || classesNumber.equals("null")) ? "" : classesNumber;
        //????????????????????????1??????????????????0????????????????????????
        int maxScore = 0;
        if (calculationTotalWeight(module, type, siteId).compareTo(BigDecimal.ZERO) == 0) {
            maxScore = 1;
        }
        Query query = null;
        //?????????????????????????????????????????????
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
        // ????????????
        List<Object[]> queryHQLs = query.getResultList();
        //?????????????????????vo
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
                //?????????????????????????????????????????????0
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
     * Description:?????????-????????????
     *
     * @author??? ??????
     * @date???2019???4???24???
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
        // ????????????
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
            //????????????????????????
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
     * Description:?????????-?????????????????????
     *
     * @author??? ??????
     * @date???2019???4???25???
     *************************************************************************************/
    @Override
    @Transactional
    public void synchronizeTTestGrading(int siteId) {
        Query query = entityManager.createNativeQuery("{call proc_t_test_grading_synchronize(:siteId)}");
        query.setParameter("siteId", siteId);
        query.executeUpdate();
    }

    /*************************************************************************************
     * Description:?????????-????????????????????????
     *
     * @author??? ??????
     * @date???2019???4???25???
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
     * Description:?????????-????????????
     *
     * @author??? ??????
     * @date???2019???4???24???
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
        //????????????
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
        // ????????????

        return totalVo;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public void synchronizeTGradeObject(Integer siteId, String siteName, List<TGradeObjectVO> list) {
        List<TGradebook> tGradebooks = tGradebookJPA.findTGradebookInSite(siteId);
        TGradebook tGradebook = null;
        //?????????????????????????????????
        if (tGradebooks.size() > 0) {
            tGradebook = tGradebooks.get(0);
        } else {
            //????????????????????????????????????
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
                //???????????????1
                tGradeObject.setWeight(new BigDecimal(1.0));
                //????????????
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
     * Description??????????????????
     *
     * @author?????????
     * @date ???2019???4???26???
     **************************************************************************/
    @Override
    public boolean createGradeBook(Integer siteId, String siteName, String assignmentId,
                                   String assignmentTitle, String type, Double weight, String module,
                                   Integer experimentId, String experimentTitle, String courseNumber,
                                   String product, String termNumber, String termName, Integer isOpen) {
        //???????????????????????????
        List<TGradebook> tGradebooks = null;
        if (module.equals("experiment") || module.equals("practiceTimetable") || module.equals("configcenter")) {
            tGradebooks = tGradebookJPA.findTGradebookInCourseNumber(courseNumber);
        } else {
            tGradebooks = tGradebookJPA.findTGradebookInSite(siteId);//??????
        }
        TGradebook tGradebook = null;
        //?????????????????????????????????
        if (tGradebooks.size() > 0) {
            tGradebook = tGradebooks.get(0);
        } else {
            //????????????????????????????????????
            tGradebook = new TGradebook();
        }
        tGradebook.setSiteId(siteId);
        tGradebook.setTitle(siteName);
        tGradebook.setCourseNumber(courseNumber);
        tGradebook.setProduct(product);
        tGradebook.setTermNumber(termNumber);
        tGradebook.setTermName(termName);
        tGradebook = tGradebookJPA.save(tGradebook);
        //???????????????id?????????id????????????
        List<TGradeObject> tGradeObjects = null;
        if (module.equals("configcenter")) {
            tGradeObjects = tGradeObjectJPA.findListByExperimentTitle(experimentTitle);
        } else {
            tGradeObjects = tGradeObjectJPA.findTGradeObjectByBookIdAndAid(tGradebook.getId(), assignmentId);
        }
        TGradeObject tGradeObject = null;
        //???????????????????????????????????????????????????????????????????????????????????????????????????
        if (tGradeObjects.size() > 0) {
            tGradeObject = tGradeObjects.get(0);
        } else {
            //????????????????????????
            tGradeObject = new TGradeObject();
            if (experimentId != null) {
                tGradeObject.setExperimentId(experimentId);
            }
        }
        tGradeObject.setAssignmentId(assignmentId.toString());
        tGradeObject.setGradeId(tGradebook.getId());
        tGradeObject.setTitle(assignmentTitle);
        //????????????
        if (type.equals("attendence")) {
            type = "attendance";
        }
        tGradeObject.setType(type);
        //???????????????1
        tGradeObject.setWeight(new BigDecimal(weight));
        //????????????
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
     * Description?????????????????????
     *
     * @author?????????
     * @date ???2019???4???26???
     **************************************************************************/
    @Override
    public JsonReturnVo saveRecord(Integer siteId, String assignmentId, String username, String cname, Double points, String module, Integer experimentId, String courseNumber) {
        //?????????????????????????????????
        TGradeObject tGradeObject = null;
        if (!EmptyUtil.isEmpty(module) && assignmentId == null && module.equals("skill")) {
            //?????????assignmentId???????????????????????????
            tGradeObject = tGradeObjectJPA.findTGradeObjectBySiteIdAndExperimentId(siteId, experimentId).get(0);
        } else if (!EmptyUtil.isEmpty(module) && module.equals("experiment")) {
            tGradeObject = tGradeObjectJPA.findTGradeObjectByCourseNumber(courseNumber, assignmentId);
        } else {
            tGradeObject = tGradeObjectJPA.findTGradeObjectBySiteId(siteId, assignmentId);
        }
        //?????????????????????????????????????????????????????????????????????????????????
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
//                if (points.compareTo(tGradeRecord.getPoints().doubleValue())==1) {//??????????????????????????????
                tGradeRecord.setPoints(new BigDecimal(points));
//                }
            }
            tGradeRecord.setRecordTime(new Date());

            TGradeRecord newTGradeRecord = tGradeRecordJPA.save(tGradeRecord);
            return JsonReturnVo.successJson("???????????????????????????:" + newTGradeRecord.getPoints());
        } else {
            return JsonReturnVo.errorJson("???????????????????????????????????????");
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
            return Result.failed("????????????????????????????????????????????????????????????");
        }
        return Result.ok("????????????");
    }

    /****************************************************************************
     * Description:??????????????????(t_grade_object???)
     *
     * @author?????????
     * @date???2018-2-5
     *****************************************************************************/
    @Override
    public void singleWeightSetting(String weightStr, String idStr, String functionType) {
        if (idStr != null) {
            String[] weightArr = weightStr.split(",");
            String[] idArr = idStr.split(",");
            //??????????????????????????????
            int i = 0;
            //????????????????????????
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
     * Description ??????type????????????
     *
     * @author ??????
     * @date 2018???2???1???
     * @param siteId ??????id
     * @param type ?????????????????????
     * @return ??????List
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
//                //?????????????????????????????????
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
                //?????????????????????????????????
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
                //?????????????????????????????????
                String typeList[] = {"assignment", "exam", "test", "attendance", "group", "behavior", "expwork", "expreport", "exptest", "expdata", "expattendance", "practice",
                        "wordCloud", "knSpace", "remoteExp", "skSpace", "crSpace", "notice", "timetable", "resourceContainer", "resourceManagement", "onlineAtlas", "courseCopy", "manageExam", "manageTest", "experiencework"};
//                //siteId=0????????????????????????????????????,?????????12????????????????????????????????????????????????
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
            //???????????????????????????????????????????????????????????????
            String sql2 = "select w from TWeightSetting w where w.siteId=:siteId and w.type in('experiencework')";
            Query query1 = entityManager.createQuery(sql2);
            query1.setParameter("siteId", siteId);
            List<TWeightSetting> oldList = query1.getResultList();
            if (oldList.size() <= 0) {
                //?????????????????????????????????
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
        //??????????????????????????????
        else if ("action".equals(type)) {
            String sql = "select w from TWeightSetting w where w.siteId=:siteId and w.type = 'actionFullMark'";
            Query query = entityManager.createQuery(sql);
            query.setParameter("siteId", siteId);
            list = query.getResultList();
            if (list.size() <= 0) {
                //?????????????????????????????????
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
                //?????????????????????????????????
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
                //?????????????????????????????????
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
                //?????????????????????????????????
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
                //?????????????????????????????????
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
                //?????????????????????????????????
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
        //??????????????????????????????

        return tWeightSettingVOList;
    }

    /**************************************************************************
     * Description ???????????????VO
     *
     * @author ??????
     * @date 2018???1???31???
     * @param siteId ??????id
     * @param type ??????
     * @return ?????????VO
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
            //?????????BigDecimal??????String???????????????VO???
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
     * Description:??????????????????(t_weight_setting???)
     *
     * @author?????????
     * @date???2018-2-5
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

            //??????????????????????????????
            int i = 0;
            //????????????????????????
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
     * Description ??????type????????????
     *
     * @author ??????
     * @date 2018???8???19???
     **************************************************************************/
    @Override
    public TotalWeightSettingVO findTWeightSetting(Integer siteId) {
        //??????????????????????????????????????????
        List<TWeightSetting> tWeightSettings = tWeightSettingJPA.findTWeightSettingsBySiteId(siteId);
        TotalWeightSettingVO totalWeightSettingVO = new TotalWeightSettingVO();
        //?????????????????????
        Pattern pattern = Pattern.compile("^[-\\+]?[\\d]*$");
        //??????????????????
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
     * Description ???????????????
     *
     * @author ??????
     * @date 2019???5???14???
     **************************************************************************/
    @Override
    @Transactional
    public void deleteTranscript(String assignment, String type, String module, Integer siteId) {
        TGradeObject tGradeObject = null;
        Integer objectId = 0;
        //????????????
        if ("experience".equals(module)) {
            tGradeObject = tGradeObjectJPA.findTGradeObjectByTypeAndModule(type, module);
            if (tGradeObject != null) {
                objectId = tGradeObject.getId();
                tGradeObjectJPA.delete(tGradeObject);
            }
        }
        //?????????????????????
        if (assignment != null) {
            tGradeObject = tGradeObjectJPA.findTGradeObjectBySiteId(siteId, assignment);
            if (tGradeObject != null) {
                objectId = tGradeObject.getId();
                tGradeObjectJPA.delete(tGradeObject);
            }
        }
        //????????????
        if (objectId != 0) {
            String sql = "delete from t_grade_record where object_id = :objectId";
            Query nativeQuery = entityManager.createNativeQuery(sql);
            nativeQuery.setParameter("objectId", objectId);
            nativeQuery.executeUpdate();
        }
    }

    /****************************************************************************
     * Description:????????????????????????
     *
     * @author?????????
     * @date???2018-2-5
     *****************************************************************************/
    @Override
    @Transactional
    public void experimentWeightSetting(String weightStr, String idStr, String functionType) {
        if (idStr != null) {
            String[] weightArr = weightStr.split(",");
            String[] idArr = idStr.split(",");
            //??????????????????????????????
            int i = 0;
            //????????????????????????
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
     * Description:?????????-??????????????????
     *
     * @author??? ??????
     * @date???2019???4???25???
     *************************************************************************************/
    @Override
    public void initializeTTestGrading(Integer siteId, String student, String cname, Integer groupId, String groupTitle, String courseNumber, String classesNumber) {
        TTestGrading tTestGrading = null;
        //???????????????????????????????????????
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
     * Description:?????????-???????????????
     *
     * @author??? ??????
     * @date???2019???4???25???
     *************************************************************************************/
    @Override
    public void deleteTTestGrading(Integer siteId, String student) {
        TTestGrading tTestGrading = tTestGradingJPA.findTTestGradingByStudentAndSAndSiteId(student, siteId);
        if (tTestGrading != null) {
            tTestGradingJPA.delete(tTestGrading);
        }
    }

    /*************************************************************************************
     * Description:?????????-?????????????????????
     *
     * @author??? ??????
     * @date???2019???4???25???
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
     * Description:?????????-????????????
     *
     * @author??? ??????
     * @date???2019???4???24???
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
        // ????????????
        List<Object[]> queryHQLs = query.getResultList();
        //?????????????????????vo
        TranscriptVo transcriptVo = new TranscriptVo();
        if (queryHQLs.size() > 0) {
            List<SjtudcTranscriptVo> sjtudcTranscriptVoList = new ArrayList<>();

            //??????????????????
            String item = "";
            //?????????????????????
            String student = "";
            String[] arr = queryHQLs.get(0)[2].toString().split(",");
            for (int i = 0; i < arr.length; i++) {
                SjtudcTranscriptVo sjtudcTranscriptVo = new SjtudcTranscriptVo();
                sjtudcTranscriptVo.setPjname(arr[i]);
                sjtudcTranscriptVoList.add(sjtudcTranscriptVo);
            }
            //????????????
            //??????????????????????????????????????????
            String[] studentGrades = new String[queryHQLs.size() - 1];
            //??????????????????????????????
            int a = 0;
            //?????????????????????????????????????????????????????????studentGrades?????????
            for (int j = 1; j < queryHQLs.size(); j++) {
                studentGrades[a] = queryHQLs.get(j)[2].toString();
                a++;
                //??????????????????
                item += queryHQLs.get(j)[0].toString() + ",";
                //?????????????????????
                student += queryHQLs.get(j)[1].toString() + ",";
            }
            //?????????????????????
            a = 0;
            //????????????????????????????????????????????????
            String[] itemGrades = new String[arr.length];
            //??????????????????
            for (int k = 0; k < sjtudcTranscriptVoList.size(); k++) {
                //??????????????????????????????
                String grades = "";
                //??????????????????,????????????studentGrades???????????????
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
     * Description:?????????-??????assignmentId??????
     *
     * @author??? ??????
     * @date???2019???7???9???
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
     * Description:?????????-???????????????????????????????????????
     *
     * @author??? ??????
     * @date???2019???7???9???
     *************************************************************************************/
    @Override
    public boolean editTranscript(String student, Integer assignmentId, Double points) {

        TGradeRecord tGradeRecord = tGradeRecordJPA.findTGradeRecordByStudentNumberAndAssignmentId(student, assignmentId);
        tGradeRecord.setPoints(new BigDecimal(points).setScale(1, BigDecimal.ROUND_HALF_UP));
        tGradeRecordJPA.saveAndFlush(tGradeRecord);
        return true;
    }

    /**************************************************************************
     * Description excel??????????????????
     *
     * @author ??????
     * @date 2019???7???25???
     * @param
     **************************************************************************/
    @Override
    public boolean importRecordByExcel(byte[] bytes, String fileName, Integer siteId, String assignmentId) throws ParseException {
        Date now = new Date();
        String date = DateFormatUtil.dateToString1(now);
        //?????????????????????
        TGradeObject tGradeObject = tGradeObjectJPA.findTGradeObjectBySiteId(siteId, assignmentId);
        //???byte??????inputstream
        ByteArrayInputStream input = new ByteArrayInputStream(bytes);
        //??????????????????
        int result = 0;
        // ???????????????excel2007??????
        boolean isE2007 = false;
        if (fileName.endsWith("xlsx")) {
            isE2007 = true;
        }

        // ???????????????
        Workbook wb = null;
        // ??????????????????(2003??????2007)????????????
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
        // ?????????????????????
        Sheet sheet = wb.getSheetAt(0);
        // ?????????????????????????????????
        Iterator<Row> rows = sheet.rowIterator();
        Row rowContent = null;// ??????
        String insertUserData = "";
        String username = "";//????????????
        String cname = "";//????????????
        String points = ""; //??????
        int a = 0;

        while (rows.hasNext()) {
            if (a == 0) {
                rowContent = rows.next();
                a = 1;
            }
            // ???????????????
            Row row = rows.next();
            int column = sheet.getRow(0).getPhysicalNumberOfCells();
            for (int k = 0; k < column; k++) {
                if (row.getCell(k) != null) {
                    row.getCell(k).setCellType(Cell.CELL_TYPE_STRING);
                    String columnName = rowContent.getCell(k).getStringCellValue();
                    String excelContent = row.getCell(k).getStringCellValue();
                    if (columnName.equals("??????")) {
                        username = excelContent;
                    }
                    if (columnName.equals("??????")) {
                        cname = excelContent;
                    }
                    if (columnName.equals("??????")) {
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
     * Description:?????????-???????????????????????????
     *
     * @author??? ??????
     * @date???2019???10???9???
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
        return JsonReturnVo.successJson("????????????");
    }

    /*************************************************************************************
     * Description:?????????-????????????
     *
     * @author??? ??????
     * @date???2019???10???9???
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
     * Description:?????????-??????????????????
     *
     * @author??? ??????
     * @date???2019???10???9???
     *************************************************************************************/
    @Override
    public Result<String> savePracticeWeight(String courseNumber, float weight, Integer id, String title) {
        //????????????????????????
        List<TWeightSetting> exitWeightList = tWeightSettingJPA.findTWeightSettingByCourseNumber(courseNumber);
        BigDecimal totalWeight = new BigDecimal(0.0);
        for (TWeightSetting tWeightSetting : exitWeightList) {
            totalWeight = totalWeight.add(tWeightSetting.getWeight());
        }
        totalWeight = totalWeight.add(new BigDecimal(weight));
        int result = totalWeight.subtract(BigDecimal.ONE).compareTo(BigDecimal.ZERO);
        if (result == 1) {
            return Result.failed("???????????????????????????????????????1");
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
        return Result.ok("????????????");

    }

    /*************************************************************************************
     * Description:?????????-????????????
     *
     * @author??? ??????
     * @date???2019???10???9???
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
        //??????
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
        //??????
        if (page != null && limit != null) {
            nativeQuery.setParameter("a", (page - 1) * limit);
            nativeQuery.setParameter("b", limit);
        }
        List<Object[]> resultList = nativeQuery.getResultList();

        //??????
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
        //????????????
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
     * Description:?????????-????????????
     *
     * @author??? ??????
     * @date???2019???10???9???
     *************************************************************************************/
    @Override
    public boolean deleteTWeightSetting(Integer id) {

        TWeightSetting tWeightSetting = tWeightSettingJPA.findOne(id);
        tWeightSettingJPA.delete(tWeightSetting);
        return true;

    }

    /*************************************************************************************
     * Description:?????????-??????????????????
     *
     * @author??? ??????
     * @date???2019???10???22???
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
     * Description:?????????-????????????
     *
     * @author??? ??????
     * @date???2019???10???22???
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
        //??????
        query.setFirstResult((page - 1) * limit).setMaxResults(limit);
        List<TGradebook> tGradebookList = query.getResultList();

        //??????
        List<CourseDateVo> list = new ArrayList<>();
        for (TGradebook tGradebook : tGradebookList) {
            CourseDateVo courseDateVo = new CourseDateVo();
            courseDateVo.setId(tGradebook.getId());
            courseDateVo.setCourseName(tGradebook.getTitle());
            courseDateVo.setCourseNumber(tGradebook.getCourseNumber());
            courseDateVo.setTermNumber(tGradebook.getTermNumber());
            courseDateVo.setTermName(tGradebook.getTermName());
            //???????????????????????????????????????0??????????????????????????????0?????????????????????
            Integer count = objectWeightJPA.countObjectWeightByCourseNumber(tGradebook.getCourseNumber());
            courseDateVo.setEnable((count > 0) ? false : true);
            //????????????????????????????????????????????????0??????????????? ?????????0???????????????
            Integer countMarkedWork = tGradeObjectJPA.countMarkedWork(tGradebook.getId());
            courseDateVo.setMarked((countMarkedWork > 0) ? true : false);
            list.add(courseDateVo);
        }
        //????????????
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
        //??????
        CourseVo courseVo = new CourseVo();
        courseVo.setCode(0);
        courseVo.setMsg("");
        courseVo.setCount(count);
        courseVo.setData(list);
        return courseVo;
    }

    /*************************************************************************************
     * Description:?????????-??????????????????
     *
     * @author??? ??????
     * @date???2019???10???22???
     *************************************************************************************/
    @Override
    public CourseGradeObjectVo gradeObjectList(String termNumber, String courseNumber, String product, Integer page, Integer limit, String username) {
        termNumber = (termNumber == null ? "" : termNumber);
        courseNumber = (courseNumber == null ? "" : courseNumber);
        List<TGradebook> tGradebookList = tGradebookJPA.findByPracticeTimetablePage(product, termNumber, courseNumber, (page - 1) * limit, limit);
        //??????
        List<CourseDateVo> list = new ArrayList<>();
        for (TGradebook tGradebook : tGradebookList) {
            CourseDateVo courseDateVo = new CourseDateVo();
            courseDateVo.setId(tGradebook.getId());
            courseDateVo.setCourseName(tGradebook.getTitle());
            courseDateVo.setCourseNumber(tGradebook.getCourseNumber());
            courseDateVo.setTermNumber(tGradebook.getTermNumber());
            courseDateVo.setTermName(tGradebook.getTermName());
            //??????????????????
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
        //????????????
        List<TGradebook> tGradebookListCount = tGradebookJPA.findByPracticeTimetable(product, termNumber, courseNumber);
        Integer count = tGradebookListCount.size();
        //??????
        CourseGradeObjectVo courseGradeObjectVo = new CourseGradeObjectVo();
        courseGradeObjectVo.setCode(0);
        courseGradeObjectVo.setMsg("");
        courseGradeObjectVo.setCount(count);
        courseGradeObjectVo.setData(list);
        return courseGradeObjectVo;
    }

    /*************************************************************************************
     * Description:?????????-?????????????????????
     *
     * @author??? ??????
     * @date???2019???10???22???
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
     * Description:?????????-???????????????????????????????????????
     *
     * @author??? ??????
     * @date???2019???10???22???
     *************************************************************************************/
    @Override
    public TGradeObjectLayuiVo getTGradeObjectStatusByCourseNumber(String courseNumber) {
        Query query = entityManager.createNativeQuery("{call proc_practiceTimetable_work_weight_enable(:courseNumber)}");
        query.setParameter("courseNumber", courseNumber);
        List<Map<String, Object>> list = null;
        List<Object[]> results = query.getResultList();
        if (results.size() > 0) {
            //???????????????
            String weightIdArr[] = {"??????????????????????????????????????????????????????????????????"};
            if (results.get(0)[3] != null) {
                weightIdArr = results.get(0)[3].toString().split(",");
            }
            //??????
            list = new ArrayList<>();
            for (int i = 1; i < results.size(); i++) {
                Map<String, Object> map = new HashMap<>();
                //??????id
                map.put("workId", results.get(i)[0]);
                //????????????
                map.put("workName", results.get(i)[1]);
                //??????
                map.put("period", results.get(i)[2]);
                String enable[] = results.get(i)[3].toString().split(",");
                //?????????????????????
                for (int j = 0; j < weightIdArr.length; j++) {
                    //?????????????????????
                    map.put("scoreitem" + j, enable[j]);
                    //?????????id
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
     * Description:?????????-?????????????????????
     *
     * @author??? ??????
     * @date???2019???10???22???
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
     * Description:?????????-??????????????????
     *
     * @author??? ??????
     * @date???2019???10???30???
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
     * Description:?????????-???????????????????????????????????????
     *
     * @author??? ??????
     * @date???2019???10???22???
     *************************************************************************************/
    @Override
    public TGradeObjectLayuiVo scoreItemWeightList(String courseNumber) {
        Query query = entityManager.createNativeQuery("{call proc_practiceTimetable_work_weight_enable(:courseNumber)}");
        query.setParameter("courseNumber", courseNumber);
        List<Map<String, Object>> list = null;
        List<Object[]> results = query.getResultList();
        if (results.size() > 0) {
            //???????????????
            String weightIdArr[] = {"??????????????????????????????????????????????????????????????????"};
            if (results.get(0)[3] != null) {
                weightIdArr = results.get(0)[3].toString().split(",");
            }
            //??????
            list = new ArrayList<>();
            for (int i = 1; i < results.size(); i++) {
                Map<String, Object> map = new HashMap<>();
                //??????id
                map.put("workId", results.get(i)[0]);
                //????????????
                map.put("workName", results.get(i)[1]);
                //??????
                map.put("period", results.get(i)[2]);
                String weight[] = results.get(i)[4].toString().split(",");
                //?????????????????????
                for (int j = 0; j < weightIdArr.length; j++) {
                    //?????????????????????
                    map.put("scoreitem" + j, weight[j]);
                    //?????????id
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
     * Description:?????????-????????????????????????
     *
     * @author??? ??????
     * @date???2019???10???22???
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
            //???????????????
            String weightIdArr[] = {"??????????????????????????????????????????????????????????????????"};
            if (results.get(0)[2] != null) {
                weightIdArr = results.get(0)[2].toString().split(",");
            }
            //??????
            list = new ArrayList<>();
            for (int i = 1; i < results.size(); i++) {
                Map<String, Object> map = new HashMap<>();
                //????????????
                map.put("studentid", results.get(i)[0]);
                //????????????
                map.put("name", results.get(i)[1]);
                //??????
                String weight[] = results.get(i)[2].toString().split(",");
                //?????????????????????
                for (int j = 0; j < weightIdArr.length; j++) {
                    //?????????????????????
                    map.put("scoreitem" + j, weight[j]);
                    //?????????id
                    map.put("scoreitemId" + j, weightIdArr[j]);
                }
                list.add(map);
            }
        }
        //??????????????????
        Integer count = tTestGradingJPA.countStudent(courseNumber);
        TGradeObjectLayuiVo tGradeObjectLayuiVo = new TGradeObjectLayuiVo();
        tGradeObjectLayuiVo.setCode(0);
        tGradeObjectLayuiVo.setCount(count);
        tGradeObjectLayuiVo.setMsg("");
        tGradeObjectLayuiVo.setData(list);
        return tGradeObjectLayuiVo;
    }

    /*************************************************************************************
     * Description:?????????-????????????
     *
     * @author??? ??????
     * @date???2019???10???22???
     *************************************************************************************/
    @Override
    public boolean markingPracticeTimetable(List<ObjectWeightEnableVo> data) {

        Date date = new Date();
        //??????id
        String workId = data.get(0).getData()[1];
        //????????????????????????????????????
        List<TWeightSetting> tWeightSettingList = tWeightSettingJPA.findMarkWeight(data.get(0).getData()[0], Integer.valueOf(workId));
        //???????????????
        TGradeObject tGradeObject = tGradeObjectJPA.findOne(Integer.valueOf(workId));
        tGradeObject.setMarked(data.get(0).getMarked());
        tGradeObjectJPA.saveAndFlush(tGradeObject);
        //????????????
        String sql = "";
        for (ObjectWeightEnableVo objectWeightEnableVo : data) {
            String arr[] = objectWeightEnableVo.getData();
            //????????????
            String student = arr[2];
            if (student.equals("layTableCheckbox")) {
                continue;
            }
            String cname = tTestGradingJPA.findTTestGradingByStudentAndSAndCourseNumber(student, data.get(0).getData()[0]).getCname();
            int num = 0;
            for (int i = 3; i < arr.length; i++) {
                String points = arr[i];
                //-1.00????????????
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
     * Description:?????????-????????????????????????????????????
     *
     * @author??? ??????
     * @date???2019???10???22???
     *************************************************************************************/
    @Override
    public TGradeObjectLayuiVo gradebookTotalListPracticeTimetable(String courseNumber, String product, Integer page, Integer limit) {
        //?????????????????????
        List<TWeightSetting> tWeightSettingList = tWeightSettingJPA.findTWeightSettingByCourseNumber(courseNumber);
        Query query = entityManager.createNativeQuery("{call porc_gradebook_total_list_practiceTimetable(:courseNumber,:product,:page,:limit)}");
        query.setParameter("courseNumber", courseNumber);
        query.setParameter("product", product);
        query.setParameter("page", (page - 1) * limit);
        query.setParameter("limit", limit);
        List<Map<String, Object>> list = null;
        List<Object[]> results = query.getResultList();
        if (results.size() > 0) {
            //???????????????
            String weightIdArr[] = {"??????????????????????????????????????????????????????????????????"};
            if (results.get(0)[2] != null) {
                weightIdArr = results.get(0)[2].toString().split(",");
            }
            //??????
            list = new ArrayList<>();
            for (int i = 1; i < results.size(); i++) {
                //?????????
                BigDecimal totalScore = new BigDecimal(0.00);
                Map<String, Object> map = new HashMap<>();
                //????????????
                map.put("studentid", results.get(i)[0]);
                //????????????
                map.put("name", results.get(i)[1]);
                //??????
                String weight[] = results.get(i)[2].toString().split(",");
                //?????????????????????
                for (int j = 0; j < weightIdArr.length; j++) {
                    //?????????????????????
                    map.put("scoreitem" + j, weight[j]);
                    //?????????id
                    map.put("scoreitemId" + j, weightIdArr[j]);
                    //???????????????
                    BigDecimal score = new BigDecimal(weight[j]);
                    totalScore = totalScore.add(score.multiply(tWeightSettingList.get(j).getWeight()));
                    totalScore = totalScore.setScale(2, BigDecimal.ROUND_HALF_UP);
                }
                map.put("totalScore", totalScore.toString());
                list.add(map);
            }
        }
        //??????????????????
        Integer count = tTestGradingJPA.countStudent(courseNumber);
        TGradeObjectLayuiVo tGradeObjectLayuiVo = new TGradeObjectLayuiVo();
        tGradeObjectLayuiVo.setCode(0);
        tGradeObjectLayuiVo.setCount(count);
        tGradeObjectLayuiVo.setMsg("");
        tGradeObjectLayuiVo.setData(list);
        return tGradeObjectLayuiVo;
    }

    /*************************************************************************************
     * Description:?????????-??????????????????????????????
     *
     * @author??? ??????
     * @date???2019???10???22???
     *************************************************************************************/
    @Override
    public boolean insertStudents(List<UserVo> data) {
        String sql = "";
        for (UserVo userVo : data) {
            TTestGrading tTestGrading = null;
            if (!EmptyUtil.isEmpty(userVo.getCourseNumber())) {
                //?????????
                tTestGrading = tTestGradingJPA.findTTestGradingByStudentAndSAndCourseNumber(userVo.getUsername(), userVo.getCourseNumber());
                if (tTestGrading == null) {
                    tTestGrading = new TTestGrading();
                    tTestGrading.setStudent(userVo.getUsername());
                    tTestGrading.setCname(userVo.getCname());
                    tTestGrading.setCourseNumber(userVo.getCourseNumber());
                }
            } else {
                //?????????
                tTestGrading = tTestGradingJPA.findTTestGradingByStudentAndSAndSiteId(userVo.getUsername(), userVo.getSiteId());
                //????????????????????????
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
     * Description:?????????-????????????????????????????????????
     *
     * @author??? ??????
     * @date???2019???10???22???
     *************************************************************************************/
    @Override
    public List<TWeightSettingVO> getWeightByWorkId(Integer workId) {
        List<TWeightSettingVO> list = new ArrayList<>();
        //???????????????
        List<TWeightSetting> tWeightSettingList = tWeightSettingJPA.findTWeightSettingByObjectId(workId);
        //??????????????????
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
     * Description:?????????-????????????????????????
     *
     * @author??? ??????
     * @date???2019???10???22???
     *************************************************************************************/
    @Override
    public boolean copyCourseWeight(String sourceCourseNumber, String targetCourseNumber) {

        String sql = "";
        //????????????????????????id
        String workIdStr = tGradeObjectJPA.findTGradeObjectIdByCourseNumber(targetCourseNumber);
        //???????????????
        String workIdArr[] = workIdStr.split(",");
        //????????????id??????????????????
        int num = 0;
        //???????????????????????????id
        String weightIdStr = tWeightSettingJPA.findTWeightSettingIdByCourseNumber(targetCourseNumber);
        //???????????????
        String weightIdArr[] = weightIdStr.split(",");
        Query query = entityManager.createNativeQuery("{call proc_practiceTimetable_work_weight_enable(:sourceCourseNumber)}");
        query.setParameter("sourceCourseNumber", sourceCourseNumber);
        List<Object[]> results = query.getResultList();
        if (results.size() > 1) {
            for (int i = 1; i < results.size(); i++) {
                //?????????????????????????????????
                String courseWeightEnable[] = results.get(i)[3].toString().split(",");
                //????????????????????????
                String finalWeight[] = results.get(i)[4].toString().split(",");
                for (int j = 0; j < weightIdArr.length; j++) {
                    //?????????????????????1????????????0?????????
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
     * Description:?????????-????????????????????????
     *
     * @author??? ??????
     * @date???2019???10???22???
     *************************************************************************************/
    @Override
    @Transactional
    public boolean workUser(WorkUserVo workUserVo) {

        //???????????????????????????????????????
        String deleteSql = "delete from object_user where object_uid=:object_uid";
        Query nativeQuery = entityManager.createNativeQuery(deleteSql);
        nativeQuery.setParameter("object_uid", workUserVo.getUid());
        nativeQuery.executeUpdate();
        //?????????
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
     * Description:?????????-????????????????????????????????????????????????
     *
     * @author??? ??????
     * @date???2019???10???22???
     *************************************************************************************/
    @Override
    public List<Map<String, Object>> exportTotalListPracticeTimetable(String courseNumber, String product, Integer page, Integer limit) {
        //?????????????????????
        List<TWeightSetting> tWeightSettingList = tWeightSettingJPA.findTWeightSettingByCourseNumber(courseNumber);
        Query query = entityManager.createNativeQuery("{call porc_gradebook_total_list_practiceTimetable(:courseNumber,:product,:page,:limit)}");
        query.setParameter("courseNumber", courseNumber);
        query.setParameter("product", product);
        query.setParameter("page", (page - 1) * limit);
        query.setParameter("limit", limit);
        List<Map<String, Object>> list = null;
        List<Object[]> results = query.getResultList();
        if (results.size() > 0) {
            //???????????????
            String weightIdArr[] = {"??????????????????????????????????????????????????????????????????"};
            if (results.get(0)[2] != null) {
                weightIdArr = results.get(0)[2].toString().split(",");
            }
            //??????
            list = new ArrayList<>();
            for (int i = 1; i < results.size(); i++) {
                //?????????
                BigDecimal totalScore = new BigDecimal(0.00);
                // ?????????????????????????????????linkedhashmap
                Map<String, Object> map = new LinkedHashMap<>();
                //????????????
                map.put("studentid", results.get(i)[0]);
                //????????????
                map.put("name", results.get(i)[1]);
                //??????
                String weight[] = results.get(i)[2].toString().split(",");
                //?????????????????????
                for (int j = 0; j < weightIdArr.length; j++) {
                    //?????????????????????
                    map.put("scoreitem" + j, weight[j]);
                    //???????????????
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
     * Description:?????????-???????????????????????????????????????
     *
     * @author??? ??????
     * @date???2019???10???22???
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
            //???????????????
            String weightIdArr[] = {"??????????????????????????????????????????????????????????????????"};
            if (results.get(0)[2] != null) {
                weightIdArr = results.get(0)[2].toString().split(",");
            }
            //??????
            list = new ArrayList<>();
            for (int i = 1; i < results.size(); i++) {
                Map<String, Object> map = new LinkedHashMap<>();
                //????????????
                map.put("studentid", results.get(i)[0]);
                //????????????
                map.put("name", results.get(i)[1]);
                //??????
                String weight[] = results.get(i)[2].toString().split(",");
                //?????????????????????
                for (int j = 0; j < weightIdArr.length; j++) {
                    //?????????????????????
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
     * Description???????????????????????????
     *
     * @author?????????
     * @date ???2019???4???26???
     **************************************************************************/
    @Override
    public JsonReturnVo saveExperienceRecord(Integer siteId, Integer type, Integer groupId, String teacherPoints, String judgesPoints, String siteName, String title) {

        long startTime = System.currentTimeMillis();
        //????????????????????????????????????????????????
        BigDecimal teachWeight = tWeightSettingJPA.findTWeightSettingBySiteIdAndType(siteId, ConstantInterface.TEACHING_ACTIVITY_TYPE_TEACH).getWeight();
        BigDecimal judgesWeight = tWeightSettingJPA.findTWeightSettingBySiteIdAndType(siteId, ConstantInterface.TEACHING_ACTIVITY_TYPE_JUDGES).getWeight();
        long endTime = System.currentTimeMillis();
        System.out.println("???????????????/????????????????????????????????????" + (endTime - startTime) + "ms");

        long startTime2 = System.currentTimeMillis();
        //????????????
        BigDecimal points = (new BigDecimal(teacherPoints).multiply(teachWeight)).add(new BigDecimal(judgesPoints).multiply(judgesWeight));
        points = points.divide(teachWeight.add(judgesWeight));
        points = points.setScale(2, BigDecimal.ROUND_HALF_UP);
        long endTime2 = System.currentTimeMillis();
        System.out.println("???????????????/???????????????????????????????????????" + (endTime2 - startTime2) + "ms");
        //??????????????????
        long startTime3 = System.currentTimeMillis();
        TGradeObject tGradeObject = tGradeObjectJPA.findTGradeObjectByTypeAndModule(type.toString(), ConstantInterface.TEACHING_ACTIVITY_MODULE_EXPERIENCE);
        long endTime3 = System.currentTimeMillis();
        System.out.println("???????????????/????????????????????????????????????" + (endTime3 - startTime3) + "ms");
        //??????????????????
        long startTime4 = System.currentTimeMillis();
        if (tGradeObject == null) {
            this.createGradeBook(siteId, siteName, null, title, type.toString(), 1.0, ConstantInterface.TEACHING_ACTIVITY_MODULE_EXPERIENCE
                    , null, null, null, null, null, null, 1);
        }
        long endTime4 = System.currentTimeMillis();
        System.out.println("???????????????/????????????????????????????????????" + (endTime4 - startTime4) + "ms");

        long startTime1 = System.currentTimeMillis();
        //??????????????????
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
        System.out.println("???????????????/???????????????????????????????????????" + (endTime1 - startTime1) + "ms");
        return JsonReturnVo.successJson("????????????");


    }

    /*************************************************************************************
     * Description:?????????-????????????????????????????????????
     *
     * @author??? ??????
     * @date???2019???10???22???
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
     * Description:?????????-??????????????????????????????
     *
     * @author??? ??????
     * @date???2019???10???22???
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
     * Description:?????????-??????????????????????????????
     *
     * @author??? ??????
     * @date???2019???10???22???
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
     * Description:??????????????????
     *
     * @author??? ??????
     * @date???2020???3???30???
     *************************************************************************************/
    @Override
    public boolean submitTranscript(List<UserRecordVo> data) {
        TGradeObject tGradeObject = null;
        //??????????????????
        if(Objects.nonNull(data.get(0).getAssignmentId())){
            tGradeObject = tGradeObjectJPA.findTGradeObjectBySiteId(data.get(0).getSiteId(), data.get(0).getAssignmentId().toString());
        }
        if (Objects.nonNull(data.get(0).getAssignmentIdString())&&!"".equals(data.get(0).getAssignmentIdString())){
            tGradeObject = tGradeObjectJPA.findTGradeObjectBySiteId(data.get(0).getSiteId(), data.get(0).getAssignmentIdString());
        }
        //????????????????????????????????????false
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
     * Description:??????????????????????????????
     *
     * @author??? ??????
     * @date???2020???3???30???
     *************************************************************************************/
    @Override
    public boolean submitTranscriptBySite(List<UserRecordVo> data) {

        //??????????????????
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
     * Description:??????????????????????????????
     *
     * @author??? ??????
     * @date???2020???3???30???
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
     * Description:???????????????
     *
     * @author??? ??????
     * @date???2020???8???14???
     *************************************************************************************/
//    @Transactional
//    public boolean saveGradingItem(PracticeWeightVo practiceWeightVo) {
//        try {
//            TGradeObject tGradeObject = tGradeObjectJPA.findTGradeObjectByExperimentTitle(practiceWeightVo.getExperimentTitle());
//            //???????????????id
//            String weightIdStr = objectWeightJPA.findWeightIdStr(practiceWeightVo.getExperimentTitle());
//            List<String> params = new ArrayList<>();
//            for (String ids : weightIdStr.split(",")){
//                params.add(ids);
//            }
//            if (!EmptyUtil.isEmpty(weightIdStr)) {
//                //?????????????????????
//                String deleteOwSql = "delete from object_weight where object_id=:object_id";
//                String deleteWeightSql = "delete from t_weight_setting where id in (:weightIdStr)";
//                Query nativeQuery = entityManager.createNativeQuery(deleteOwSql);
//                nativeQuery.setParameter("object_id", tGradeObject.getId());
//                nativeQuery.executeUpdate();
//                Query nativeQuery1 = entityManager.createNativeQuery(deleteWeightSql);
//                nativeQuery1.setParameter("weightIdStr",params);
//                nativeQuery1.executeUpdate();
//            }
//            //?????????
//            for (TWeightSettingVO tWeightSettingVO : practiceWeightVo.gettWeightSettingVOList()) {
//                //???????????????
//                TWeightSetting tWeightSetting = new TWeightSetting();
//                tWeightSetting.setType(tWeightSettingVO.getType());//??????
//                tWeightSetting.setWeight(tWeightSettingVO.getWeight());//?????????
//                tWeightSetting.setCourseNumber(practiceWeightVo.getCourseNumber());
//                tWeightSetting.setLevel(tWeightSettingVO.getLevel());//??????
//                tWeightSetting.setPracticeId(tWeightSettingVO.getPracticeId());//??????????????????id
//                tWeightSetting.setParentId(tWeightSettingVO.getParentId());//?????????id
//                tWeightSetting = tWeightSettingJPA.saveAndFlush(tWeightSetting);
//                //????????????????????????????????????
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
     * Description:????????????????????????????????????????????????
     *
     * @author??? ??????
     * @date???2020???8???14???
     *************************************************************************************/
    @Override
    @Transactional
    public void calculateWeightByCorrect(String experimentTitle) {
        //??????????????????
        Integer maxLevel = this.maxLevel(experimentTitle);
        Integer num = 1;
        while (num <= maxLevel) {
            //???????????????????????????
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
     * Description:??????????????????????????????
     *
     * @author??? ??????
     * @date???2020???8???14???
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
     * Description:????????????
     *
     * @author??? ??????
     * @date???2020???8???14???
     *************************************************************************************/
    @Override
    public List<PracticeWeightShowVo> practiceWeightLevel(String experimentTitle, String student, Integer parentId) {
        //??????????????????
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
     * Description:?????????-????????????
     *
     * @author??? ??????
     * @date???2020???8???17???
     *************************************************************************************/
    @Override
    public boolean markingPracticeGrading(List<ObjectWeightEnableVo> data) {
        //?????????0????????????id?????????????????????id???????????????id???????????????????????????????????????????????????????????????id?????????????????????id???????????????id?????????????????????????????????
        //??????????????????id????????????

        Date date = new Date();
        //??????id
        Integer workId = tGradeObjectJPA.findTGradeObjectByExperimentTitle(data.get(0).getData()[0]).getId();
        //????????????
        String sql = "";
        for (ObjectWeightEnableVo objectWeightEnableVo : data) {
            //????????????
            String arr[] = objectWeightEnableVo.getData();
            //????????????
            String student = arr[1];
            int num = 0;
            String points = arr[3];
            Integer weightId = tWeightSettingJPA.findTWeightSettingByPracticeId(Integer.valueOf(arr[2])).getId();
            //-1.00????????????
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
     * Description:?????????-?????????????????????????????????
     *
     * @author??? ??????
     * @date???2020???8???17???
     *************************************************************************************/
    @Override
    @Transactional
    public boolean calculatePracticeGrading(String experimentTitle, String student) {
        //??????????????????
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
     * Description: ??????????????????
     *
     * @author:??????
     * @date:2020???9???18???
     **************************************************************************/
    @Override
    public byte[] exportReportWeightBySiteId(Integer siteId) {
        List<ReportWeightDto> reportWeightDtos = new ArrayList<>();
        List<TGradeObjectVO> list = new ArrayList<>();
        //????????????
        List<TGradeObjectVO> list0 = this.findTGradeObjects("knowledge", "assignment", siteId);
        //????????????
        List<TGradeObjectVO> list1 = this.findTGradeObjects("skill", "assignment", siteId);
        //????????????
        List<TGradeObjectVO> list2 = this.findTGradeObjects("experience", "assignment", siteId);
        //????????????
        List<TGradeObjectVO> list3 = this.findTGradeObjects("knowledge", "test", siteId);
        //????????????
        List<TGradeObjectVO> list4 = this.findTGradeObjects("skill", "test", siteId);
        //????????????
        List<TGradeObjectVO> list5 = this.findTGradeObjects("knowledge", "attendance", siteId);
        //????????????
        List<TGradeObjectVO> list6 = this.findTGradeObjects("skill", "attendance", siteId);
        //????????????
        List<TGradeObjectVO> list7 = this.findTGradeObjects("knowledge", "exam", siteId);
        //????????????
        List<TGradeObjectVO> list8 = this.findTGradeObjects("skill", "report", siteId);
        //????????????
        List<TGradeObjectVO> list9 = this.findTGradeObjects("skill", "data", siteId);
        Stream.of(list0, list1, list2, list3, list4, list5, list6, list7, list8, list9).forEach(list::addAll);


        //????????????
        TotalWeightSettingVO totalWeightSettingVO = this.findTWeightSetting(siteId);
        for (TGradeObjectVO tGradeObjectVO : list) {
            ReportWeightDto reportWeightDto = new ReportWeightDto();
            switch (tGradeObjectVO.getType()) {
                case "assignment":
                    reportWeightDto.setTypeTitle("??????");
                    break;
                case "test":
                    reportWeightDto.setTypeTitle("??????");
                    break;
                case "attendance":
                    reportWeightDto.setTypeTitle("??????");
                    break;
                case "exam":
                    reportWeightDto.setTypeTitle("??????");
                    break;
                case "report":
                    reportWeightDto.setTypeTitle("????????????");
                    break;
                case "data":
                    reportWeightDto.setTypeTitle("????????????");
                    break;

            }
            switch (tGradeObjectVO.getModule()) {
                case "knowledge":
                    reportWeightDto.setModule("??????");
                    break;
                case "skill":
                    reportWeightDto.setModule("??????");
                    break;
                case "experience":
                    reportWeightDto.setModule("??????");
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
        //????????????
        List<TWeightSettingVO> list10 = this.findTWeightSettingListByType(siteId, "action");
        for (TWeightSettingVO tWeightSettingVO : list10) {
            ReportWeightDto reportWeightDto = new ReportWeightDto();
            switch (tWeightSettingVO.getType()) {
                case "actionFullMark":
                    reportWeightDto.setTitle("????????????????????????????????????");
                    break;
                case "actionEffectiveStudyFullMark":
                    reportWeightDto.setTitle("??????????????????????????????????????????");
                    break;
                case "actionTotalStudyFullMark":
                    reportWeightDto.setTitle("???????????????????????????????????????");
                    break;
                case "actionOnlineTime":
                    reportWeightDto.setTitle("??????????????????????????????");
                    break;
                case "actionEffectiveStudy":
                    reportWeightDto.setTitle("????????????????????????????????????");
                    break;
                case "actionTotalStudy":
                    reportWeightDto.setTitle("?????????????????????????????????");
                    break;

            }
            reportWeightDto.setModule("????????????");
            reportWeightDto.setTypeTitle("????????????");
            reportWeightDto.setObjectWeight(tWeightSettingVO.getWeight().toString());
            reportWeightDto.setTypeWeight(totalWeightSettingVO.getActionWeight().toString());
            reportWeightDtos.add(reportWeightDto);
        }
        //????????????
        List<TWeightSettingVO> list11 = this.findTWeightSettingListByType(siteId, "groupStage");
        for (TWeightSettingVO tWeightSettingVO : list11) {
            ReportWeightDto reportWeightDto = new ReportWeightDto();
            reportWeightDto.setTitle(tWeightSettingVO.getName());
            reportWeightDto.setModule("??????");
            reportWeightDto.setTypeTitle("????????????");
            reportWeightDto.setObjectWeight(tWeightSettingVO.getWeight().toString());
            reportWeightDto.setTypeWeight(totalWeightSettingVO.getExperienceWeight().toString());
            reportWeightDto.setTeachWeight(totalWeightSettingVO.getTeachWeight().toString());
            reportWeightDto.setJudgeWeight(totalWeightSettingVO.getJudgesWeight().toString());
            reportWeightDtos.add(reportWeightDto);
        }

        //?????????????????????
        Integer assignmentCount = list0.size() + list1.size() + list2.size();
        //?????????????????????
        Integer testCount = list3.size() + list4.size();
        //?????????????????????
        Integer attendanceCount = list5.size() + list6.size();
        //?????????????????????
        Integer examCount = list7.size();
        //???????????????????????????
        Integer reportCount = list8.size();
        //???????????????????????????
        Integer dataCount = list9.size();
        //???????????????????????????
        Integer actionCount = list10.size();
        //???????????????????????????
        Integer experienceCount = list11.size();
        //??????????????????
        String title = "????????????";
        String filePath = null;
        //??????????????????
        //??????HSSFWorkbook??????(excel???????????????)
        HSSFWorkbook wb = new HSSFWorkbook();
        //????????????sheet?????????excel????????????
        title = title.replaceAll("\\/", "_");
        HSSFSheet sheet = wb.createSheet(title);
        //??????????????????????????????????????? ?????????????????????????????????
        Integer merge = 1;
        //?????????????????????
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
        //?????????????????????

        //??????????????????????????????
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
        //?????????????????????


        HSSFRow row = sheet.createRow((int) 0);
        //??????
        row.createCell(0).setCellValue("????????????");
        row.createCell(1).setCellValue("????????????");
        row.createCell(2).setCellValue("????????????");
        row.createCell(3).setCellValue("????????????");
        row.createCell(4).setCellValue("???????????????");
        row.createCell(5).setCellValue("??????????????????");
        row.createCell(6).setCellValue("??????????????????");
        int i = 1;
        for (ReportWeightDto reportWeightDto : reportWeightDtos) //????????????
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
            i++;    //??????
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
     * Description: ??????????????????????????????
     *
     * @author:fubowen
     * @date:2020-12-23
     **************************************************************************/
    @Override
    public List<ReportWeightDto> getGradeWeightBySiteId(Integer siteId) {
        List<ReportWeightDto> reportWeightDtos = new ArrayList<>();
        List<TGradeObjectVO> list = new ArrayList<>();
        //????????????
        List<TGradeObjectVO> list0 = this.findTGradeObjects("knowledge", "assignment", siteId);
        //????????????
        List<TGradeObjectVO> list1 = this.findTGradeObjects("skill", "assignment", siteId);
        //????????????
        List<TGradeObjectVO> list2 = this.findTGradeObjects("experience", "assignment", siteId);
        //????????????
        List<TGradeObjectVO> list3 = this.findTGradeObjects("knowledge", "test", siteId);
        //????????????
        List<TGradeObjectVO> list4 = this.findTGradeObjects("skill", "test", siteId);
        //????????????
        List<TGradeObjectVO> list5 = this.findTGradeObjects("knowledge", "attendance", siteId);
        //????????????
        List<TGradeObjectVO> list6 = this.findTGradeObjects("skill", "attendance", siteId);
        //????????????
        List<TGradeObjectVO> list7 = this.findTGradeObjects("knowledge", "exam", siteId);
        //????????????
        List<TGradeObjectVO> list8 = this.findTGradeObjects("skill", "report", siteId);
        //????????????
        List<TGradeObjectVO> list9 = this.findTGradeObjects("skill", "data", siteId);
        Stream.of(list0, list1, list2, list3, list4, list5, list6, list7, list8, list9).forEach(list::addAll);


        //????????????
        TotalWeightSettingVO totalWeightSettingVO = this.findTWeightSetting(siteId);
        for (TGradeObjectVO tGradeObjectVO : list) {
            ReportWeightDto reportWeightDto = new ReportWeightDto();
            switch (tGradeObjectVO.getType()) {
                case "assignment":
                    reportWeightDto.setTypeTitle("??????");
                    break;
                case "test":
                    reportWeightDto.setTypeTitle("??????");
                    break;
                case "attendance":
                    reportWeightDto.setTypeTitle("??????");
                    break;
                case "exam":
                    reportWeightDto.setTypeTitle("??????");
                    break;
                case "report":
                    reportWeightDto.setTypeTitle("????????????");
                    break;
                case "data":
                    reportWeightDto.setTypeTitle("????????????");
                    break;

            }
            switch (tGradeObjectVO.getModule()) {
                case "knowledge":
                    reportWeightDto.setModule("??????");
                    break;
                case "skill":
                    reportWeightDto.setModule("??????");
                    break;
                case "experience":
                    reportWeightDto.setModule("??????");
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
        //????????????
        List<TWeightSettingVO> list10 = this.findTWeightSettingListByType(siteId, "action");
        for (TWeightSettingVO tWeightSettingVO : list10) {
            ReportWeightDto reportWeightDto = new ReportWeightDto();
            switch (tWeightSettingVO.getType()) {
                case "actionFullMark":
                    reportWeightDto.setTitle("????????????????????????????????????");
                    break;
                case "actionEffectiveStudyFullMark":
                    reportWeightDto.setTitle("??????????????????????????????????????????");
                    break;
                case "actionTotalStudyFullMark":
                    reportWeightDto.setTitle("???????????????????????????????????????");
                    break;
                case "actionOnlineTime":
                    reportWeightDto.setTitle("??????????????????????????????");
                    break;
                case "actionEffectiveStudy":
                    reportWeightDto.setTitle("????????????????????????????????????");
                    break;
                case "actionTotalStudy":
                    reportWeightDto.setTitle("?????????????????????????????????");
                    break;

            }
            reportWeightDto.setModule("????????????");
            reportWeightDto.setTypeTitle("????????????");
            reportWeightDto.setObjectWeight(tWeightSettingVO.getWeight().toString());
            reportWeightDto.setTypeWeight(totalWeightSettingVO.getActionWeight().toString());
            reportWeightDtos.add(reportWeightDto);
        }
        //????????????
        List<TWeightSettingVO> list11 = this.findTWeightSettingListByType(siteId, "groupStage");
        for (TWeightSettingVO tWeightSettingVO : list11) {
            ReportWeightDto reportWeightDto = new ReportWeightDto();
            reportWeightDto.setTitle(tWeightSettingVO.getName());
            reportWeightDto.setModule("??????");
            reportWeightDto.setTypeTitle("????????????");
            reportWeightDto.setObjectWeight(tWeightSettingVO.getWeight() == null ? "" : tWeightSettingVO.getWeight().toString());
            reportWeightDto.setTypeWeight(totalWeightSettingVO.getExperienceWeight() == null ? "" : totalWeightSettingVO.getExperienceWeight().toString());
            reportWeightDto.setTeachWeight(totalWeightSettingVO.getTeachWeight() == null ? "" : totalWeightSettingVO.getTeachWeight().toString());
            reportWeightDto.setJudgeWeight(totalWeightSettingVO.getJudgesWeight() == null ? "" : totalWeightSettingVO.getJudgesWeight().toString());
            reportWeightDtos.add(reportWeightDto);
        }
        return reportWeightDtos;
    }

    /**************************************************************************
     * Description?????????????????????
     *
     * @author?????????
     * @date ???2019???4???26???
     **************************************************************************/
    @Override
    public JsonReturnVo saveExamRecord(String assignmentId, String username, String cname, Double points) {
        //?????????????????????????????????
        TGradeObject tGradeObject = tGradeObjectJPA.findTGradeObjectByAssignmentId(assignmentId);
        //?????????????????????????????????????????????????????????????????????????????????
        if (tGradeObject != null) {
            TGradeRecord tGradeRecord = tGradeRecordJPA.findTGradeRecordByStudentNumberAndObjectId(username, tGradeObject.getId());
            if (tGradeRecord == null) {
                tGradeRecord = new TGradeRecord();
                tGradeRecord.setStudentNumber(username);
                tGradeRecord.setCname(cname);
                tGradeRecord.setObjectId(tGradeObject.getId());
                tGradeRecord.setPoints(new BigDecimal(points));
            } else {
//                if (points.compareTo(tGradeRecord.getPoints().doubleValue())==1) {//??????????????????????????????
                tGradeRecord.setPoints(new BigDecimal(points));
//                }
            }
            tGradeRecord.setRecordTime(new Date());

            TGradeRecord newTGradeRecord = tGradeRecordJPA.save(tGradeRecord);
            if (newTGradeRecord != null) {
                System.out.println("??????????????????:" + newTGradeRecord.getCname() + ":" + newTGradeRecord.getPoints());
                return JsonReturnVo.successJson("????????????????????????:" + newTGradeRecord.getPoints());
            } else {
                return JsonReturnVo.errorJson("?????????????????????");
            }
        } else {
            System.out.println("??????????????????:????????????");
            return JsonReturnVo.errorJson("??????????????????????????????????????????");
        }
    }

    /**************************************************************************
     * Description?????????????????????????????????
     *
     * @author?????????
     * @date ???2020???10???28???
     **************************************************************************/
    @Override
    public boolean getIndicatorAndSave(String workUid, String timetableId, String businessTime, String apiGateWayHost) {
//        try {
        String[] idArr = timetableId.split(",");
        String[] bussinessArr = businessTime.split(",");
        //?????????????????????
        net.gvsun.configcenter.internal.api.CommonResult<List<TimetableDTO>> result = configcenterFeign.info(Integer.valueOf(idArr[0]));
        List<TimetableDTO> timetableInfoDTOS = result.getData();
        List<ConfigIndicatorDTO> configIndicatorDTOS = timetableInfoDTOS.get(0).getTimetableProcessDTOS().get(0).getConfigIndicators();
        for (int i = 0; i < idArr.length; i++) {
            //???????????????
            saveIndicator(configIndicatorDTOS, tGradeObjectJPA.findTGradeObjectByExperimentTitle(workUid).getId(), bussinessArr[i]);
        }
        return true;
//        } catch (Exception e) {
//            System.out.println("????????????????????????" + e);
//            return false;
//        }
    }

    //???????????????
    public void saveIndicator(List<ConfigIndicatorDTO> configIndicatorDTOS, Integer objectId, String businessTime) {
        String start = businessTime.split("~")[0];
        String end = businessTime.split("~")[1];
        for (ConfigIndicatorDTO configIndicatorDTO : configIndicatorDTOS) {
            //???????????????
            TWeightSetting tWeightSetting = new TWeightSetting();
            tWeightSetting.setType(configIndicatorDTO.getIndicatorCname());
            tWeightSetting.setPracticeId(configIndicatorDTO.getId());
            tWeightSetting.setParentId(configIndicatorDTO.getParentId());
            tWeightSetting.setWeight(new BigDecimal(configIndicatorDTO.getStandardScore()));
            //????????????
            tWeightSetting.setCreateDate(DateFormatUtil.stringToDate1(start));
            //????????????
            tWeightSetting.setModifyDate(DateFormatUtil.stringToDate1(end));
            tWeightSetting = tWeightSettingJPA.save(tWeightSetting);
            //??????????????????????????????
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
     * Description??????????????????????????????
     *
     * @author?????????
     * @date ???2020???10???28???
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
     * Description:???????????????????????????(t_grade_object???)
     *
     * @author?????????
     * @date???2018-2-6
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
     * Description:??????????????????????????????
     *
     * @author?????????
     * @date???2021???1???29???
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
     * Description:??????????????????????????????
     *
     * @author?????????
     * @date???2021???1???29???
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
            //??????
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
     * Description:??????????????????
     *
     * @author?????????
     * @date???2021???1???29???
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
        //????????????
        jdbcOperations.update("delete tgr from t_grade_record tgr where tgr.object_id in " + objectIdSql, courseNumber, product);
        //????????????
        jdbcOperations.update("delete ttg from t_test_grading ttg where ttg.course_number = ?", courseNumber);
        jdbcOperations.update("delete ou from object_user ou where ou.object_uid in " + objectUidSql, courseNumber, product);
        //???????????????
        jdbcOperations.update("delete tws from t_weight_setting tws where tws.id in (select DISTINCT ow.weight_id from object_weight ow where ow.object_id in " + objectIdSql + ")", courseNumber, product);
        jdbcOperations.update("delete ow from object_weight ow where ow.object_id in " + objectIdSql, courseNumber, product);
        //????????????
        jdbcOperations.update("delete tgo from t_grade_object tgo where tgo.grade_id = (select tg.id from t_gradebook tg where tg.course_number = ? and tg.product = ? )", courseNumber, product);
        //????????????
        jdbcOperations.update("delete tg from t_gradebook tg where tg.course_number = ? and tg.product = ? ", courseNumber, product);

    }

    /*************************************************************************************
     * Description:?????????-??????????????????
     *
     * @author??? ??????
     * @date???2019???10???9???
     *************************************************************************************/
    @Override
    public Result<String> copyPracticeWeight(String courseNumber, String ids) {
        //??????????????????????????????
        List<Integer> idList = Arrays.asList(ids.split(",")).stream().map(s -> Integer.valueOf(s.trim())).collect(Collectors.toList());
        List<TWeightSetting> copyWeights = tWeightSettingJPA.findByIds(idList);
        //????????????????????????
        List<TWeightSetting> exitWeightList = tWeightSettingJPA.findTWeightSettingByCourseNumber(courseNumber);
        //??????
        BigDecimal totalWeight = new BigDecimal(0.0);
        for (TWeightSetting tWeightSetting : exitWeightList) {
            totalWeight = totalWeight.add(tWeightSetting.getWeight());
        }
        for (TWeightSetting tWeightSetting : copyWeights) {
            totalWeight = totalWeight.add(tWeightSetting.getWeight());
        }
        int result = totalWeight.subtract(BigDecimal.ONE).compareTo(BigDecimal.ZERO);
        if (result == 1) {
            return Result.failed("???????????????????????????????????????1");
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
        return Result.ok("????????????");
    }

    /*************************************************************************************
     * Description:?????????-????????????api
     *
     * @author??? ??????
     * @date???2021???12???3???
     *************************************************************************************/
    @Override
    public List<TranscriptVo> findTGradeRecordsApi(String module, String type, Integer siteId, String assignmentSearch, String userSearch) {
        //????????????
        List<TGradebook> tGradebookList = tGradebookJPA.findTGradebookInSite(siteId);
        List<TranscriptVo> transcriptVoList = new ArrayList<>();
        if (tGradebookList == null || tGradebookList.size() == 0) {
            return transcriptVoList;
        }
        //??????????????????
        List<TTestGrading> tTestGradingList = tTestGradingJPA.findTTestGradingsBySiteId(siteId);
        //Sql??????
        String sql = "select tgo.assignment_id,tgo.title,tgr.student_number,tgr.points from t_grade_object tgo " +
                "inner join t_gradebook tg on tgo.grade_id = tg.id " +
                "inner join t_grade_record tgr on tgo.id = tgr.object_id " +
                "where tg.site_id =:siteId and tgo.module =:module and tgo.type =:type ";
        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("siteId", siteId);
        query.setParameter("module", module);
        query.setParameter("type", type);
        // ????????????
        List<Object[]> queryHQLs = query.getResultList();
        //????????????
        if (queryHQLs.size() > 0) {
            String assignmentId = "";
            for (Object[] objects : queryHQLs) {
                TranscriptVo transcriptVo = new TranscriptVo();
                //?????????????????????assignmentId?????????
                if (!assignmentId.equals(objects[0].toString())) {
                    transcriptVo.setSiteId(siteId);
                    transcriptVo.setSiteName(tGradebookList.get(0).getTitle());
                    transcriptVo.setAssignmentId(objects[0].toString());
                    transcriptVo.setTitle(objects[1].toString());
                    transcriptVoList.add(transcriptVo);
                }
                assignmentId = objects[0].toString();
            }
            //????????????
            for (TranscriptVo transcriptVo : transcriptVoList) {
                List<Object[]> assignmentObjects = queryHQLs.stream().filter(objects -> objects[0].equals(transcriptVo.getAssignmentId())).collect(Collectors.toList());
                List<TranscriptInfoVo> transcriptInfoVoList = new ArrayList<>();
                for (TTestGrading tTestGrading : tTestGradingList) {
                    TranscriptInfoVo transcriptInfoVo = new TranscriptInfoVo();
                    transcriptInfoVo.setUsername(tTestGrading.getStudent());
                    transcriptInfoVo.setCname(tTestGrading.getCname());
                    transcriptInfoVo.setResults("0.00");
                    //?????????????????????
                    Optional<Object[]> assignmentObjectOptional = assignmentObjects.stream().filter(item -> item[2].equals(tTestGrading.getStudent())).findFirst();
                    if (assignmentObjectOptional.isPresent()) {
                        Object[] objects = assignmentObjectOptional.get();
                        transcriptInfoVo.setResults(objects[3].toString());
                    }

                    transcriptInfoVoList.add(transcriptInfoVo);
                    transcriptVo.setTranscriptInfoVos(transcriptInfoVoList);
                }
            }

            //??????????????????
            if (Objects.nonNull(assignmentSearch) && !"".equals(assignmentSearch.trim())) {
                transcriptVoList = transcriptVoList.stream().filter(transcriptVo -> transcriptVo.getAssignmentId().equals(assignmentSearch) || transcriptVo.getTitle().contains(assignmentSearch)).collect(Collectors.toList());
            }
            //????????????????????????
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
