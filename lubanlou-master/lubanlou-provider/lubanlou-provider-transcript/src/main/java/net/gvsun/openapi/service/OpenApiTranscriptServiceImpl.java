package net.gvsun.openapi.service;

import net.gvsun.common.Result;
import net.gvsun.domain.respositiry.*;
import net.gvsun.openapi.entity.*;
import net.gvsun.domain.respositiry.*;
import net.gvsun.openapi.mapper.TGradeBookMapper;
import net.gvsun.openapi.mapper.TGradeObjectMapper;
import net.gvsun.openapi.mapper.TGradeRecordtMapper;
import net.gvsun.openapi.mapper.TTestGradingMapper;
import net.gvsun.util.EmptyUtil;
import net.gvsun.vo.UserRecordVo;
import net.gvsun.vo.UserVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.util.*;

/**
 * Created by REM on 2019/2/26.
 */
@Service("OpenApiTranscriptService")
public class OpenApiTranscriptServiceImpl implements OpenApiTranscriptService {
    @Autowired
    private EntityManager entityManager;
    @Autowired
    private TGradeBookMapper tGradeBookMapper;
    @Autowired
    private TGradeObjectMapper tGradeObjectMapper;
    @Autowired
    private TTestGradingMapper tTestGradingMapper;
    @Autowired
    private TGradeRecordtMapper tGradeRecordtMapper;
    @Autowired
    @Qualifier("datasourceRestTemplate")
    private RestTemplate restTemplate;
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
    /**************************************************************************
     * Description：创建成绩册
     *
     * @author：黄浩
     * @date ：2019年4月26日
     **************************************************************************/
    @Override
    public Result createGradeBook(Integer siteId, String siteName, Integer assignmentId,
                                  String assignmentTitle, String type, Double weight, String module,
                                  Integer experimentId, String experimentTitle, String courseNumber,
                                  String product, String termNumber, String termName, Integer isOpen) {
        //查询课程对应成绩簿
        List<TGradebook> tGradebooks = null;
        if (module.equals("experiment") || module.equals("practiceTimetable")) {
            tGradebooks = tGradeBookMapper.findTGradebookInCourseNumber(courseNumber);
        } else {
            tGradebooks = tGradeBookMapper.findTGradebookInSite(siteId);//教学
        }
        TGradebook tGradebook = null;
        //有成绩册则使用该成绩册
        if (tGradebooks.size() > 0) {
            tGradebook = tGradebooks.get(0);
            tGradebook.setSiteId(siteId);
            tGradebook.setTitle(siteName);
            tGradebook.setCourseNumber(courseNumber);
            tGradebook.setProduct(product);
            tGradebook.setTermNumber(termNumber);
            tGradebook.setTermName(termName);
            tGradeBookMapper.updateById(tGradebook);

        } else {
            //该课程站点无成绩册则新建
            tGradebook = new TGradebook();
            tGradebook.setSiteId(siteId);
            tGradebook.setTitle(siteName);
            tGradebook.setCourseNumber(courseNumber);
            tGradebook.setProduct(product);
            tGradebook.setTermNumber(termNumber);
            tGradebook.setTermName(termName);

            tGradeBookMapper.add(tGradebook);


        }
        //根据成绩册id和测验id查找试题
        List<TGradeObject> tGradeObjects = tGradeObjectMapper.findTGradeObjectByBookIdAndAid(tGradebook.getId(), assignmentId.toString());
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
        int objectId = 0;
        if (tGradeObjects.size() > 0) {
            objectId = tGradeObjectMapper.updateById(tGradeObject);
        }else {
            objectId = tGradeObjectMapper.add(tGradeObject);
        }
        Result result = new Result();
        if (objectId != 0) {
            result.setCode(200);
            result.setMsg("保存成功");
        } else {
            result.setCode(500);
            result.setMsg("后台报错");
        }
        return result;
    }
    /*************************************************************************************
     * Description:成绩册-批量增加学生
     *
     * @author： 黄浩
     * @date：2019年10月22日
     *************************************************************************************/
    @Override
    public Result insertStudents(List<UserVo> data) {
        Result result = new Result();
        try {
            String sql = "";
            for (UserVo userVo : data) {
                TTestGrading tTestGrading = null;
                if (!EmptyUtil.isEmpty(userVo.getCourseNumber())) {
                    //工训用
                    tTestGrading = tTestGradingMapper.findTTestGradingByStudentAndSAndCourseNumber(userVo.getUsername(), userVo.getCourseNumber());
                    if (tTestGrading==null){
                        tTestGrading = new TTestGrading();
                        tTestGrading.setStudent(userVo.getUsername());
                        tTestGrading.setCname(userVo.getCname());
                        tTestGrading.setCourseNumber(userVo.getCourseNumber());
                    }
                } else {
                    //教学用
                    tTestGrading = tTestGradingMapper.findTTestGradingByStudentAndSAndSiteId(userVo.getUsername(), userVo.getSiteId());
                    //判断是否已有数据
                    if (tTestGrading == null) {
                        tTestGrading = new TTestGrading();
                        tTestGrading.setStudent(userVo.getUsername());
                        tTestGrading.setCname(userVo.getCname());
                        tTestGrading.setSiteId(userVo.getSiteId());
                    }
                }
                if (tTestGrading==null) {
                    tTestGradingMapper.insert(tTestGrading);
                }
            }
            result.setCode(200);
            result.setMsg("保存成功");
            return result;
        } catch (RuntimeException e) {
            result.setCode(500);
            result.setMsg("添加学生信息报错：" + e);
            System.out.println("添加学生信息报错：" + e);
            return result;
        }
    }

    /*************************************************************************************
     * Description:提交到成绩册
     *
     * @author： 黄浩
     * @date：2020年3月30日
     *************************************************************************************/
    @Override
    public Result submitTranscript(List<UserRecordVo> data) {
        Result result = new Result();
        try {
            //获取作业信息
            TGradeObject tGradeObject = tGradeObjectMapper.findTGradeObjectBySiteId(data.get(0).getSiteId(), data.get(0).getAssignmentId().toString());
            for (UserRecordVo userRecordVo : data) {
                this.initializeTTestGrading(userRecordVo.getSiteId(), userRecordVo.getUsername(), userRecordVo.getCname(), null, null, null, null);
                TGradeRecord tGradeRecord = tGradeRecordtMapper.findTGradeRecordByStudentNumberAndObjectId(userRecordVo.getUsername(), tGradeObject.getId());
                if (tGradeRecord == null) {
                    tGradeRecord = new TGradeRecord();
                    tGradeRecord.setStudentNumber(userRecordVo.getUsername());
                    tGradeRecord.setCname(userRecordVo.getCname());
                    tGradeRecord.setObjectId(tGradeObject.getId());
                    tGradeRecord.setRecordTime(new Date());
                    tGradeRecord.setPoints(new BigDecimal(userRecordVo.getPoints() == null ? 0.0 : userRecordVo.getPoints()));
                    tGradeRecordtMapper.insert(tGradeRecord);
                } else {
                    tGradeRecord.setRecordTime(new Date());
                    tGradeRecord.setPoints(new BigDecimal(userRecordVo.getPoints() == null ? 0.0 : userRecordVo.getPoints()));
                    tGradeRecordtMapper.updateById(tGradeRecord);
                }
            }
            result.setCode(200);
            result.setMsg("保存成功");
            return result;
        } catch (RuntimeException e) {
            System.out.println("提交到成绩册报错：" + e);
            result.setCode(500);
            result.setMsg("提交到成绩册报错：" + e);
            return result;
        }
    }
    /*************************************************************************************
     * Description:成绩册-初始化总成绩
     *
     * @author： 黄浩
     * @date：2019年4月25日
     *************************************************************************************/
    public void initializeTTestGrading(Integer siteId, String student, String cname, Integer groupId, String groupTitle, String courseNumber, String classesNumber) {
        TTestGrading tTestGrading = null;
        //实验项目与教学技能暂时分开
        if (!EmptyUtil.isEmpty(courseNumber)) {
            tTestGrading = tTestGradingMapper.findTTestGradingByStudentAndSAndCourseNumber(student, courseNumber);
        } else {
            tTestGrading = tTestGradingMapper.findTTestGradingByStudentAndSAndSiteId(student, siteId);
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
            tTestGradingMapper.insert(tTestGrading);
        }
    }
    /**************************************************************************
     * Description：新增成绩数据
     *
     * @author：黄浩
     * @date ：2019年4月26日
     **************************************************************************/
    @Override
    public Result saveRecord(Integer siteId, Integer assignmentId, String username, String cname, Double points, String module, Integer experimentId, String courseNumber) {
        Result result = new Result();
        //查询某一项作业的成绩册
        TGradeObject tGradeObject = null;
        if (!EmptyUtil.isEmpty(module) && assignmentId == null && module.equals("skill")) {
            //凌速无assignmentId的实验项目特殊情况
            tGradeObject = tGradeObjectMapper.findTGradeObjectBySiteIdAndExperimentId(siteId, experimentId).get(0);
        } else if (!EmptyUtil.isEmpty(module) && module.equals("experiment")) {
            tGradeObject = tGradeObjectMapper.findTGradeObjectByCourseNumber(courseNumber, assignmentId.toString());
        } else {
            tGradeObject = tGradeObjectMapper.findTGradeObjectBySiteId(siteId, assignmentId.toString());
        }
        //如果学生信息在保存成绩之前没有查询到，在此进行自动添加
        this.initializeTTestGrading(siteId, username, cname, null, null, courseNumber, null);
        if (tGradeObject != null) {
            TGradeRecord tGradeRecord = tGradeRecordtMapper.findTGradeRecordByStudentNumberAndObjectId(username, tGradeObject.getId());
            if (tGradeRecord == null) {
                tGradeRecord = new TGradeRecord();
                tGradeRecord.setStudentNumber(username);
                tGradeRecord.setCname(cname);
                tGradeRecord.setObjectId(tGradeObject.getId());
                tGradeRecord.setPoints(new BigDecimal(points));
                tGradeRecord.setRecordTime(new Date());
                tGradeRecordtMapper.insert(tGradeRecord);
            } else {
                tGradeRecord.setRecordTime(new Date());
                tGradeRecord.setPoints(new BigDecimal(points));
                tGradeRecordtMapper.updateById(tGradeRecord);
            }

            result.setCode(200);
            result.setMsg("保存成功");
            return result;
        } else {
            result.setCode(200);
            result.setMsg("无报错，保存失败，可能成绩册不存在");
            return result;
        }
    }
}
