package net.gvsun.gswork.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import net.gvsun.feign.TimetableFeign;
import net.gvsun.gswork.domain.*;
import net.gvsun.gswork.jpa.*;
import net.gvsun.gswork.util.DateFormatUtil;
import net.gvsun.gswork.vo.courseInfo.*;
import net.gvsun.timetable.internal.timetable.JudgeConflictTimeTableVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by Remli on 2021/4/30.
 */
@Service("CourseInfoService")
public class CourseInfoServiceImpl implements CourseInfoService{
    @Autowired
    private TCourseSiteJPA tCourseSiteJPA;
    @Autowired
    private SchoolWeekJPA schoolWeekJPA;
    @Autowired
    private SchoolTermJPA schoolTermJPA;
    @Autowired
    private EntityManager entityManager;
    @Autowired
    private SystemCampusJPA systemCampusJPA;
    @Autowired
    private SystemTimeJPA systemTimeJPA;
    @Autowired
    private TimetableDocumentRelatedJPA timetableDocumentRelatedJPA;
    @Autowired
    private WkUploadJPA wkUploadJPA;
    @Autowired
    private TimetableGroupRelatedJPA timetableGroupRelatedJPA;
    @Autowired
    private TCourseSiteGroupJPA tCourseSiteGroupJPA;
    @Autowired
    private TimetableFeign timetableFeign;
    /**************************************************************************
     * Description 获取当前周
     *
     * @author 李雪腾
     * @date 2017-10-18
     * @return 站点集合
     **************************************************************************/
    @Override
    public Integer getCurrWeek(Integer cid) {
        TCourseSite one = tCourseSiteJPA.getOne(cid);
        SchoolTerm schoolTerm = one.getSchoolTerm();
        Date date = new Date();
        List<SchoolWeek> weeks = schoolWeekJPA.findSchoolWeek(new Date(), schoolTerm.getId());
        if (weeks.size() > 0) {
            return weeks.get(0).getWeek();
        } else {//如果是暑假和寒假期间则显示第一周的数据
            return 1;
        }
    }
    /************************************
     * 功能：更具weekid获取课表顶部栏信息
     * 作者：lixueteng
     * 日期：2018-02-02
     *************************************/
    @Override
    public List<CourseTableTopDateInfoVO> getCourseTableTopInfo(Integer cid, Integer weekId) {
        Integer schoolTermId = 0;
        if (cid != null) {
            //获取当前学期
            TCourseSite courseSite = tCourseSiteJPA.getOne(cid);
            //获取当前学期
            schoolTermId = courseSite.getSchoolTerm().getId();
        } else {
            schoolTermId = schoolTermJPA.getNowTerm();
        }
        List<CourseTableTopDateInfoVO> returnList = new ArrayList<>();
        List<SchoolWeek> all = schoolWeekJPA.findSchoolWeekByTermId(schoolTermId, weekId);
        for (SchoolWeek schoolWeek : all) {
            CourseTableTopDateInfoVO vo = new CourseTableTopDateInfoVO();
            vo.setTopDate(DateFormatUtil.dateToString2(schoolWeek.getDate()));
            String weekDayStr = "";
            switch (schoolWeek.getWeekday()) {
                case 1:
                    weekDayStr = "星期一";
                    break;
                case 2:
                    weekDayStr = "星期二";
                    break;
                case 3:
                    weekDayStr = "星期三";
                    break;
                case 4:
                    weekDayStr = "星期四";
                    break;
                case 5:
                    weekDayStr = "星期五";
                    break;
                case 6:
                    weekDayStr = "星期六";
                    break;
                case 7:
                    weekDayStr = "星期日";
                    break;
                default:
                    weekDayStr = "星期一";
            }
            vo.setWeekDay(weekDayStr);
            returnList.add(vo);
        }
        return returnList;
    }

    /************************************
     * 功能：获取课表信息
     * 作者：Hezhaoyi
     * 日期：2020-3-2
     *************************************/
    @Override
    public List<DoubleClassCourseInfoVO> getCourseInfoNew(Integer cid, Integer weekId) {

        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
        SimpleDateFormat sdfTime = new SimpleDateFormat("HH:mm:ss");
        List<TimetableAppointmentVO> timetableAppointmentVOList = new ArrayList<>();
        StringBuffer hql = new StringBuffer("select distinct c from TimetableAppointment c left join " +
                "c.timetableAppointmentSameNumbers s left join fetch c.timetableSkillRelateds where 1=1 ");
        // 引掉学期查询条件（因为站点本身就包含了学期概念）
        // hql.append(" and c.tCourseSite.schoolTerm.id ="+termId+" ");
        hql.append(" and c.tCourseSite.id = :cid ");
//        if (weekId != 0) {
//            hql.append(" and ((c.startWeek <= :weekId and c.endWeek >= :weekId ) ");
//            hql.append(" or (s.startWeek <= :weekId and s.endWeek >= :weekId ))");
//        }
        System.out.println(hql.toString());
        Query query = entityManager.createQuery(hql.toString());

        query.setParameter("cid", cid);
//        if (weekId != 0) {
//            query.setParameter("weekId", weekId);
//        }
        Integer schoolTermId = 0;
        if (cid != null) {
            //获取当前学期
            TCourseSite courseSite = tCourseSiteJPA.getOne(cid);
            //获取当前学期
            schoolTermId = courseSite.getSchoolTerm().getId();
        } else {
            schoolTermId = schoolTermJPA.getNowTerm();
        }
        List<TimetableAppointment> resultList = query.getResultList();
        List<TimetableAppointment> list = new ArrayList<>();
        for (TimetableAppointment app : resultList) {
            Set<TimetableAppointmentSameNumber> snList = app.getTimetableAppointmentSameNumbers();
            if (snList.size() > 0) {
                Iterator<TimetableAppointmentSameNumber> iterator = snList.iterator();
                while (iterator.hasNext()) {
                    TimetableAppointment ta = new TimetableAppointment();
                    TimetableAppointmentSameNumber tasn = iterator.next();
                    ta.setStartWeek(tasn.getStartWeek());
                    ta.setEndWeek(tasn.getEndWeek());
                    ta.setTotalWeeks(tasn.getTotalWeeks());
                    ta.setStartClass(tasn.getStartClass());
                    ta.setEndClass(tasn.getEndClass());
                    ta.setTotalClasses(tasn.getTotalClasses());
                    ta.setWeekday(app.getWeekday());
                    ta.setMemo(app.getMemo());
                    ta.setId(app.getId());
                    ta.setAssignmentId(app.getAssignmentId());
                    ta.setPreparation(app.getPreparation());
                    ta.setKnowledgeOther(app.getKnowledgeOther());
                    ta.setKnowledgeLink(app.getKnowledgeLink());
                    ta.setSkillLink(app.getSkillLink());
                    ta.setSkillOther(app.getSkillOther());
                    ta.setTimetableSkillRelateds(app.getTimetableSkillRelateds());
                    ta.setChapterName(app.getChapterName());

                    if ((ta.getStartWeek() <= weekId) && (ta.getEndWeek() >= weekId)) {
                        list.add(ta);
                    }
                }
            } else {

                if (Objects.isNull(app.getTermId())||app.getTermId()==0||(app.getStartWeek() <= weekId&& app.getEndWeek
                        () >= weekId)) {
                    list.add(app);
                }
            }

        }

        for (TimetableAppointment appointment : list) {
            TimetableAppointmentVO appointmentVO = new TimetableAppointmentVO();
            appointmentVO.setId(appointment.getId());
            appointmentVO.setCourseContent(appointment.getPreparation());
            appointmentVO.setCourseAddress(appointment.getMemo());
            appointmentVO.setStartClass(appointment.getStartClass());
            appointmentVO.setEndClass(appointment.getEndClass());
            //课程起止时间
            //获取默认校区编号
            String campusNumber = systemCampusJPA.getDefultCampus().getCampusNumber();
            SystemTime startTime = systemTimeJPA.findByCampusNumberAndId(campusNumber, String.valueOf(appointment
                    .getStartClass()));
            if (startTime != null) {
                appointmentVO.setStartTime(sdf.format(startTime.getStartDate()));
            }
            SystemTime endTime = systemTimeJPA.findByCampusNumberAndId(campusNumber, String.valueOf(appointment
                    .getEndClass()));
            if (endTime != null) {
                appointmentVO.setEndTime(sdf.format(endTime.getEndDate()));
            }
            //拼接课程起止时间 日期+时间 用于和镜像时间匹配
            SchoolWeek schoolWeek = schoolWeekJPA.findDateByTermIdAndWeekAndWeekday(schoolTermId, weekId, appointment
                    .getWeekday());
            String startDateTime ;
            if(Objects.nonNull(appointment.getTermId())&&appointment.getTermId()!=0){
                startDateTime     = DateFormatUtil.dateToString2(schoolWeek.getDate()) + " " + sdfTime.format
                        (startTime.getStartDate());
                appointmentVO.setStartDateTime(DateFormatUtil.stringToDate1(startDateTime));
                String endDateTime = DateFormatUtil.dateToString2(schoolWeek.getDate()) + " " + sdfTime.format(endTime
                        .getEndDate());
                appointmentVO.setEndDateTime(DateFormatUtil.stringToDate1(endDateTime));

                appointmentVO.setWeekDay(appointment.getWeekday());
            }else{

            }
            appointmentVO.setAssignmentId(appointment.getAssignmentId());
            //知识其他信息
            if (appointment.getKnowledgeOther() != null && !appointment.getKnowledgeOther().equals("")) {
                appointmentVO.setKnowledgeOther(appointment.getKnowledgeOther());
            }
            //知识链接
            if (appointment.getKnowledgeLink() != null && !appointment.getKnowledgeLink().equals("")) {
                appointmentVO.setKnowledgeLink(appointment.getKnowledgeLink());
            }
            //技能其他信息
            if (appointment.getSkillOther() != null && !appointment.getSkillOther().equals("")) {
                appointmentVO.setSkillOther(appointment.getSkillOther());
            }
            //技能链接
            if (appointment.getSkillLink() != null && !appointment.getSkillLink().equals("")) {
                appointmentVO.setSkillLink(appointment.getSkillLink());
            }
            if (appointment.getTimetableSkillRelateds().size() > 0) {
                List<TimetableSkillRelated> timetableSkillRelatedList = appointment.getTimetableSkillRelateds();
                List<SkillVO> skillVOList = new ArrayList<>();
                for (TimetableSkillRelated timetableSkillRelated : timetableSkillRelatedList) {
                    SkillVO skillVO = new SkillVO();
                    if (timetableSkillRelated.getTExperimentSkill() != null) {
                        skillVO.setSkillId(timetableSkillRelated.getTExperimentSkill().getId().toString());
                        skillVO.setSkillName(timetableSkillRelated.getTExperimentSkill().getExperimentName());
                        skillVOList.add(skillVO);
                    }
                }
                appointmentVO.setSkillVOList(skillVOList);
            }
            //文档
            if (timetableDocumentRelatedJPA.findTimetableDocumentRelatedsByAppointmentId(appointment.getId()).size()
                    > 0) {
                List<TimetableDocumentRelated> timetableDocumentRelatedList = timetableDocumentRelatedJPA
                        .findTimetableDocumentRelatedsByAppointmentId(appointment.getId());
                List<DocumentVO> documentVOList = new ArrayList<>();
                for (TimetableDocumentRelated timetableDocumentRelated : timetableDocumentRelatedList) {
                    if (wkUploadJPA.findWkUploadById(timetableDocumentRelated.getWkUpload()) != null) {
                        WkUpload wkUpload = wkUploadJPA.findWkUploadById(timetableDocumentRelated.getWkUpload());
                        DocumentVO documentVO = new DocumentVO();
                        documentVO.setFileName(wkUpload.getName());
                        documentVO.setFileUrl(wkUpload.getNewUrl());
                        documentVOList.add(documentVO);
                    }
                }
                appointmentVO.setDocumentVOList(documentVOList);
            }
            //分组
            if (timetableGroupRelatedJPA.findTimetableGroupRelatedsByAppointmentId(appointment.getId()).size() > 0) {
                String group = "";
                List<TimetableGroupRelated> timetableGroupRelatedList = timetableGroupRelatedJPA
                        .findTimetableGroupRelatedsByAppointmentId(appointment.getId());
                List<DocumentVO> documentVOList = new ArrayList<>();
                for (TimetableGroupRelated timetableGroupRelated : timetableGroupRelatedList) {
                    if (tCourseSiteGroupJPA.findGroupById(timetableGroupRelated.getGroupId()) != null) {
                        TCourseSiteGroup tCourseSiteGroup = tCourseSiteGroupJPA.findGroupById(timetableGroupRelated
                                .getGroupId());
                        group = group + tCourseSiteGroup.getGroupTitle() + ",";
                    }
                }
                appointmentVO.setGroup(group);
            }
            appointmentVO.setChapterName(appointment.getChapterName());
            timetableAppointmentVOList.add(appointmentVO);
        }
        //获取systemtime信息
//        Pageable pageable = PageRequest.of(0, 8);
        //获取默认校区编号
        String campusNumber = systemCampusJPA.getDefultCampus().getCampusNumber();
        List<SystemTime> sysTimeInfo = systemTimeJPA.findByCampusNumber(campusNumber);
        List<DoubleClassCourseInfoVO> doubleClassCourseInfoVOS = new ArrayList<>();
        //先查出来前八个
        int i = 0;
        //开始时间
        //开始数字
        int startClass = 0;
        //开始几次
        for (SystemTime systemTime : sysTimeInfo) {
            //现在是i=1
            startClass = systemTime.getSection();

            DoubleClassCourseInfoVO vo1 = new DoubleClassCourseInfoVO();
            vo1.setStatus(1);
            vo1.setStartClassInt(startClass);
            vo1.setEndClassInt(startClass);
            if (systemTime.getStartDate() != null) {
                vo1.setClassStartTime(sdf.format(systemTime.getStartDate()));
            }
            if (systemTime.getEndDate() != null) {
                vo1.setClassEndTime(sdf.format(systemTime.getEndDate()));
            }
            //建立map
            Map<Integer, TimetableAppointmentVO> map = new HashMap<>();
            for (int j = 1; j <= 7; j++) {
                map.put(j, new TimetableAppointmentVO());
            }
            for (TimetableAppointmentVO appointmentVO : timetableAppointmentVOList) {
                if(Objects.nonNull(appointmentVO.getWeekDay())){
                    if (appointmentVO.getEndClass() - appointmentVO.getStartClass() <= 1) {
                        if (appointmentVO.getStartClass() >=
                                vo1.getStartClassInt()
                                && appointmentVO.getStartClass() <= vo1.getEndClassInt()) {
                            map.put(appointmentVO.getWeekDay(), appointmentVO);
                        } else if (appointmentVO.getEndClass() >= vo1.getStartClassInt()
                                && appointmentVO.getEndClass() <= vo1.getEndClassInt()) {
                            map.put(appointmentVO.getWeekDay(), appointmentVO);
                        }
                    } else if (appointmentVO.getEndClass() - appointmentVO.getStartClass() >= 1) {
                        if (appointmentVO.getStartClass() >= vo1.getStartClassInt()
                                && appointmentVO.getStartClass() <= vo1.getEndClassInt()) {
                            map.put(appointmentVO.getWeekDay(), appointmentVO);
                        }
                        if (appointmentVO.getEndClass() >= vo1.getStartClassInt()
                                && appointmentVO.getEndClass() <= vo1.getEndClassInt()) {

                        }
                        if (appointmentVO.getStartClass() <= vo1.getEndClassInt()
                                && appointmentVO.getEndClass() >= vo1.getStartClassInt()) {
                            map.put(appointmentVO.getWeekDay(), appointmentVO);
                        }
                    }
                }
            }
            vo1.setMapInfo(map);
            doubleClassCourseInfoVOS.add(vo1);
        }

        return doubleClassCourseInfoVOS;
    }

    /************************************
     * 功能：获取镜像信息
     * 作者：Hezhaoyi
     * 日期：2020-12-8
     *************************************/
    @Override
    public List<TimetableVirtualImageDTO> getTodayVirtualImage(Integer cid, String apiGateWayHost) throws Exception {

        JudgeConflictTimeTableVO timeTableVO = new JudgeConflictTimeTableVO();
        timeTableVO.setCourseNo(String.valueOf(cid));

        String result = timetableFeign.getTodayVirtualImageByCourseId(timeTableVO);
        JSONObject jsonObject = JSONObject.parseObject(result);
        List<Object[]> retList = new ArrayList<>();
        JSONArray jsonArray = jsonObject.getJSONArray("data");
        List<TimetableVirtualImageDTO> virtualImageDTOS = new ArrayList<>();
        if (jsonArray != null) {
            for (int i = 0; i < jsonArray.size(); i++) {
                JSONObject o = jsonArray.getJSONObject(i);
                TimetableVirtualImageDTO virtualImageDTO = new TimetableVirtualImageDTO();
                //课程id
                String courseId = o.getString("courseId");
                virtualImageDTO.setCourseId(courseId);
                //镜像id
                String virtualImage = o.getString("virtualImage");
                virtualImageDTO.setVirtualImage(virtualImage);
                //开始时间
                String startTime = o.getString("startTime");
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                Date startDate = sdf.parse(startTime);
                virtualImageDTO.setStartTime(startDate);

                //结束时间
                String endTime = o.getString("endTime");
                Date endDate = sdf.parse(endTime);
                virtualImageDTO.setEndTime(endDate);
                //预约id
                int id = o.getInteger("id");
                virtualImageDTO.setId(id);
                //区分镜像(0为华栖云)
                int flag = o.getInteger("flag");
                virtualImageDTO.setFlag(flag);
                virtualImageDTOS.add(virtualImageDTO);
            }
        }

        return virtualImageDTOS;
    }
    /**************************************************************************
     * Description 获取当前课程的所有周
     *
     * @author qxr
     * @date 2018-8-10
     * @return 站点里的周次集合
     **************************************************************************/
    @Override
    public List<Integer> getWeekLsit(Integer cid) {
        TCourseSite one = tCourseSiteJPA.getOne(cid);
        SchoolTerm schoolTerm = one.getSchoolTerm();
        Date date = new Date();
        List<SchoolWeek> weeks = schoolWeekJPA.findWeekList(schoolTerm.getId());
        List<Integer> weekList = new ArrayList<>();
        for (SchoolWeek week : weeks) {
            weekList.add(week.getWeek());
        }
        Set<Integer> setWeekList = new HashSet<Integer>(weekList);
        weekList.clear();
        weekList.addAll(setWeekList);
        return weekList;
    }
}
