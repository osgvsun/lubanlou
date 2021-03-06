package net.gvsun.gswork.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import net.gvsun.common.Result;
import net.gvsun.datasource.ClientDatabaseContext;
import net.gvsun.feign.TranscriptFeign;
import net.gvsun.gswork.datasource.entity.GroupAssignment;
import net.gvsun.gswork.datasource.entity.GroupCategory;
import net.gvsun.gswork.datasource.entity.UserGroup;
import net.gvsun.gswork.datasource.service.GroupAssignmentService;
import net.gvsun.gswork.datasource.service.GroupCategoryService;
import net.gvsun.gswork.datasource.service.TCourseSiteGroupService;
import net.gvsun.gswork.datasource.service.UserGroupService;
import net.gvsun.gswork.domain.*;
import net.gvsun.gswork.jpa.*;
import net.gvsun.gswork.redis.ConfigRedisHashService;
import net.gvsun.gswork.service.common.ShareService;
import net.gvsun.gswork.util.DateFormatUtil;
import net.gvsun.gswork.util.EmptyUtil;
import net.gvsun.gswork.vo.*;
import net.gvsun.gswork.vo.common.TopConfigVO;
import net.gvsun.gswork.vo.common.UserVo;
import net.gvsun.gswork.vo.group.*;
import net.gvsun.resource.dto.ResourceFileDto;
import net.gvsun.resource.service.ResourceContainerService;
import net.gvsun.similarity.Similarity;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.text.ParseException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

/**
 * Created by REM on 2021/3/3.
 */
@Service("WorkService")
public class WorkServiceImpl implements WorkService {
    @Autowired
    private TAssignmentJPA tAssignmentJPA;
    @Autowired
    private UserJPA userJPA;
    @Autowired
    private TAssignmentAnswerAssignJPA tAssignmentAnswerAssignJPA;
    @Autowired
    private TAssignmentControlJPA tAssignmentControlJPA;
    @Autowired
    private WkChapterJPA wkChapterJPA;
    @Autowired
    private WkLessonJPA wkLessonJPA;
    @Autowired
    private WkFolderJPA wkFolderJPA;
    @Autowired
    private EntityManager entityManager;
    @Autowired
    private TCourseSiteJPA tCourseSiteJPA;
    @Autowired
    private TAssignmentGradingJPA tAssignmentGradingJPA;
    @Autowired
    private TCourseSiteGroupJPA tCourseSiteGroupJPA;
    @Autowired
    private TCourseSiteUserJPA tCourseSiteUserJPA;
    @Autowired
    private ShareService shareService;
    @Autowired
    private ResourceContainerService resourceContainerService;
    @Autowired
    private ConfigRedisHashService configRedisHashService;
    @Autowired
    private ClientDatabaseContext clientDatabaseContext;
    @Autowired
    private TExperimentSkillJPA tExperimentSkillJPA;
    @Autowired
    private TranscriptFeign transcriptFeign;
    @Autowired
    private GroupCategoryService groupCategoryService;
    @Autowired
    private TCourseSiteGroupService tCourseSiteGroupService;
    @Autowired
    private UserGroupService userGroupService;
    @Autowired
    private GroupAssignmentService groupAssignmentService;
    @Autowired
    private RedisService redisService;

    /**************************************************************************
     * Description ????????????
     *
     * @author ??????
     * @date 2021???3???3???
     **************************************************************************/
    @Override
    public List<TAssignmentVO> assignmentList(Integer cid, Integer chapterType, String type, Integer isGroup, Integer page, Integer limit, String search) {
        List<TAssignmentVO> voList = new ArrayList<>();
        search = search == null ? "" : search;
        List<TAssignment> tAssignmentList = tAssignmentJPA.findTAssignmentIdBySiteIdPageSearch(cid, chapterType, type, isGroup, search, (page - 1) * limit, limit);
        //???????????????id?????????????????????(????????????????????????????????????)
        for (TAssignment tAssignment : tAssignmentList) {
            TAssignmentVO tAssignmentVO = new TAssignmentVO();
            tAssignmentVO.setId(tAssignment.getId());
            tAssignmentVO.setTitle(tAssignment.getTitle());
            tAssignmentVO.setStartDate(DateFormatUtil.dateToString1(tAssignment.getTAssignmentControl().getStartdate()));
            tAssignmentVO.setEndDate(DateFormatUtil.dateToString1(tAssignment.getTAssignmentControl().getDuedate()));
            tAssignmentVO.setCategoryId(tAssignment.getCategoryId());
            voList.add(tAssignmentVO);
        }
        return voList;
    }

    /**************************************************************************
     * Description ??????????????????
     *
     * @author ??????
     * @date 2021???3???3???
     **************************************************************************/
    @Override
    public Integer assignmentListCount(Integer cid, Integer chapterType, String type, Integer isGroup, String search) {
        search = search == null ? "" : search;
        List<TAssignment> tAssignmentList = tAssignmentJPA.findTAssignmentIdBySiteIdSearch(cid, chapterType, type, isGroup, search);
        return tAssignmentList.size();
    }

    /**************************************************************************
     * Description:????????????
     *
     * @author????????????
     * @date ???2018-2-05
     **************************************************************************/
    @Override
    @Transactional
    public Integer saveAssignment(TAssignmentVO tAssignmentVO, Integer cid, String username) {
        //?????? ????????????????????? ?????? ?????? ???????????????
        boolean flag = true;
        if (tAssignmentVO.getId() != null) {
            flag = false;
        }
        //??????????????????
        User user = userJPA.getOne(username);
        TAssignment tAssignment = null;
        //??????id???????????????
        if (flag) {
            tAssignment = new TAssignment();
            //??????????????? assignment?????????
            if (tAssignmentVO.getType() == 200) {
                tAssignment.setType("report");
            } else if (tAssignmentVO.getType() == 206) {
                tAssignment.setType("data");
            } else {
                tAssignment.setType("assignment");
            }
        } else {
            tAssignment = tAssignmentJPA.getOne(tAssignmentVO.getId());
        }
        //?????????????????????
        tAssignment.setTitle(tAssignmentVO.getTitle());
        //???????????????
        tAssignment.setContent(tAssignmentVO.getRequirement());
        //??????????????????
        tAssignment.setSiteId(cid);
        //?????? 1??????0?????????
        tAssignment.setStatus(1);
        //????????????
        tAssignment.setCreatedTime(DateFormatUtil.stringToDate1(tAssignmentVO.getStartDate()));
        tAssignment.setUser(user);
        //????????????0 ??????????????????1
        if (tAssignmentVO.getIsGroup() != null) {
            tAssignment.setIsGroup(tAssignmentVO.getIsGroup());
        }
        //1????????????0????????????
        if (tAssignmentVO.getIsAllModeify() != null) {
            tAssignment.setIsCheckAll(tAssignmentVO.getIsAllModeify());
        }
        //???????????????????????????1.?????????0.?????????
        if (tAssignmentVO.getIsNeedCommit() != null) {
            tAssignment.setNeedSubmit(tAssignmentVO.getIsNeedCommit());
        }
        //??????????????????????????????
        WkFolder wkFolder = null;
        if (flag) {
            //????????????
            wkFolder = new WkFolder();
            if (tAssignment.getType().equals("report")) {
                wkFolder.setType(200);
            } else if (tAssignment.getType().equals("data")) {
                wkFolder.setType(206);
            } else {
                //4 ??????
                wkFolder.setType(4);
            }
        } else {
            //????????????
            wkFolder = tAssignment.getWkFolder();
        }
        wkFolder.setName(tAssignmentVO.getTitle());
        wkFolder.setUser(user);
        wkFolder.setCreateTime(DateFormatUtil.stringToDate1(tAssignmentVO.getStartDate()));
        if (tAssignmentVO.getLessonId() != null && tAssignmentVO.getLessonId() != -1) {
            WkLesson wkLesson = null;
            if (flag) {
                wkLesson = new WkLesson();
            } else {
                wkLesson = wkFolder.getWkLesson();
            }
//            wkLesson.setId(tAssignmentVO.getLessonId());
            wkLesson = wkLessonJPA.getOne(tAssignmentVO.getLessonId());
            wkFolder.setWkLesson(wkLesson);
            wkFolder.setWkChapter(null);

        } else {

            WkChapter wkChapter = null;
            if (flag) {
                wkChapter = new WkChapter();
            } else {
                wkChapter = wkChapterJPA.getOne(tAssignmentVO.getChapterId());
            }
            if (wkChapter != null) {
                //1?????? 2?????? 3??????
                if (tAssignmentVO.getCategory() != null) {
                    wkChapter.setType(tAssignmentVO.getCategory());
                }
                wkChapter.setId(tAssignmentVO.getChapterId());
                wkFolder.setWkChapter(wkChapter);
                wkFolder.setWkLesson(null);
            } else {
                if (tAssignmentVO.getChapterId() != null) {
                    wkFolder.setWkChapter(wkChapterJPA.getOne(tAssignmentVO.getChapterId()));
                    wkFolder.setWkLesson(null);
                }
            }
        }
        if(tAssignmentVO.getExpProjectId()!=null){
            wkFolder.setExpSkillId(tAssignmentVO.getExpProjectId());
        }
        //???????????????
        wkFolder = wkFolderJPA.save(wkFolder);
        tAssignment.setWkFolder(wkFolder);
        //????????????????????????
        TAssignmentControl tAssignmentControl = null;
        if (flag) {
            tAssignmentControl = new TAssignmentControl();
        } else {
            tAssignmentControl = tAssignment.getTAssignmentControl();
        }
        //????????????????????????
        TAssignmentAnswerAssign tAssignmentAssign = null;
        if (flag) {
            tAssignmentAssign = new TAssignmentAnswerAssign();
        } else {
            tAssignmentAssign = tAssignment.getTAssignmentAnswerAssign();
        }
        tAssignment.setTAssignmentControl(null);
        tAssignment.setTAssignmentAnswerAssign(null);
        tAssignment = tAssignmentJPA.saveAndFlush(tAssignment);
        //?????????????????????????????????
        tAssignmentControl.setStartdate(DateFormatUtil.stringToDate1(tAssignmentVO.getStartDate()));
        tAssignmentControl.setDuedate(DateFormatUtil.stringToDate1(tAssignmentVO.getEndDate()));
        tAssignmentControl.setTAssignment(tAssignment);
        //??????????????????
        tAssignmentControl.setTimelimit(tAssignmentVO.getCommitTime());
        //yes????????????????????????no ?????????
        tAssignmentControl.setToGradebook(tAssignmentVO.getIsToGradebook() == 1 ? "yes" : "no");
        //yes?????????????????????no?????????
        tAssignmentControl.setGradeToStudent(tAssignmentVO.getIsGradeToStudent() == 1 ? "yes" : "no");
        //yes?????????????????????no?????????
        tAssignmentControl.setGradeToTotalGrade(tAssignmentVO.getIsGradeToTotalGrade() == 1 ? "yes" : "no");
        //??????????????????????????????1????????????????????????????????????2??????????????????3???????????????
        if (tAssignmentVO.getCommitType() != null) {
            tAssignmentControl.setSubmitType(tAssignmentVO.getCommitType());
        }
        //?????????????????? 1??? 0???
        if (tAssignmentVO.getRemarkStyle() != null) {
            tAssignmentControl.setIsOnlineMarking(tAssignmentVO.getRemarkStyle());
        }
        //??????????????????
        tAssignmentControl.setSubmitLate(tAssignmentVO.getSubmitLate());
        //????????????
        tAssignmentControl.setAppendixType(tAssignmentVO.getAppendixType());
        //??????????????????
        tAssignmentControl.setIsDuplicateChecking(tAssignmentVO.getIsDuplicateChecking());
        tAssignmentControl = tAssignmentControlJPA.saveAndFlush(tAssignmentControl);
        //????????????????????????
        if (tAssignmentAssign == null) {
            tAssignmentAssign = new TAssignmentAnswerAssign();
        }
        tAssignmentAssign.setUser(user);
        //????????????
//        tAssignmentAssign.setScore(tAssignmentVO.getScore());
        tAssignmentAssign.setScore(100.00);
        tAssignmentAssign.setTAssignment(tAssignment);
        tAssignmentAssign = tAssignmentAnswerAssignJPA.saveAndFlush(tAssignmentAssign);
        tAssignment.setTAssignmentControl(tAssignmentControl);
        tAssignment.setTAssignmentAnswerAssign(tAssignmentAssign);
        //??????????????????????????????id????????????
        tAssignment.setSequence(tAssignment.getId());
        //tAssignmentControlDAO.flush();
        //????????????
        if (tAssignmentVO.getFileUrl() != null && tAssignmentVO.getFileUrl() != "") {
            tAssignment.setTeacherFilePath(tAssignmentVO.getFileUrl());
        }
        tAssignment = tAssignmentJPA.saveAndFlush(tAssignment);

        //??????????????????????????????
        if (tAssignment.getNeedSubmit() != null && tAssignmentVO.getIsNeedCommit() != null) {
            if (tAssignmentVO.getIsNeedCommit() == 0) {
                gradeEnd(cid, tAssignment.getId());
            }
        }
        return tAssignment.getId();
    }

    /**************************************************************************
     * Description:????????????????????????
     *
     * @author?????????
     * @date ???2018-2-05
     **************************************************************************/
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void saveAssignmentGroup(Integer assignmentId, List<String> usernameArr, Integer groupNum, Integer cid, Integer flag, List<String> groupTitles) {

        //flag??????:0?????????1?????????
        TAssignment tAssignment = tAssignmentJPA.getOne(assignmentId);
        if (flag == 1) {
            List<TCourseSiteGroup> exitGroups = tCourseSiteGroupJPA.findAssignmentGroup(assignmentId);
            if (exitGroups.size() == 0) {
                //????????????
                if (groupNum != null) {
                    List<String> userVos = tCourseSiteUserJPA.getUsernamesBySiteId(cid);
                    //????????????
                    Collections.shuffle(userVos);
                    //??????list???groupNum???
                    List<List<String>> groupList = shareService.subStringList(userVos, groupNum);
                    for (List<String> group : groupList) {
                        //????????????????????????????????????
                        String usernames = group.stream().collect(Collectors.joining(","));
                        //??????
                        TCourseSiteGroup tCourseSiteGroup = new TCourseSiteGroup();
                        tCourseSiteGroup.setTCourseSite(tCourseSiteJPA.getOne(cid));
                        tCourseSiteGroup.setGroupTitle(tAssignment.getTitle());
                        tCourseSiteGroup.setDescription(usernames);
                        tCourseSiteGroup.setAssignmentId(assignmentId);
                        tCourseSiteGroup.setCreateDate(new Date());
                        tCourseSiteGroupJPA.save(tCourseSiteGroup);
                    }

                } else {
                    //?????????????????????
                    for (int i = 0 ;i < usernameArr.size(); i++) {
                        TCourseSiteGroup tCourseSiteGroup = new TCourseSiteGroup();
                        tCourseSiteGroup.setTCourseSite(tCourseSiteJPA.getOne(cid));
                        tCourseSiteGroup.setGroupTitle(groupTitles.get(i));
                        tCourseSiteGroup.setDescription(usernameArr.get(i));
                        tCourseSiteGroup.setAssignmentId(assignmentId);
                        tCourseSiteGroup.setCreateDate(new Date());
                        tCourseSiteGroupJPA.save(tCourseSiteGroup);
                    }
                }
            }
        } else {
            List<TCourseSiteGroup> tCourseSiteGroupList = tCourseSiteGroupJPA.findByNotAssignment(cid);
            String sql = " select user_id from user_group where group_id =:groupId ";
            Query nativeQuery = entityManager.createNativeQuery(sql);
            for (TCourseSiteGroup group : tCourseSiteGroupList) {
                nativeQuery.setParameter("groupId",group.getId());
                List<Integer> resultList = nativeQuery.getResultList();
                List<TCourseSiteUser> userList = tCourseSiteUserJPA.findAllById(resultList);
                String usernames = userList.stream().map(e -> e.getUser().getUsername().toString()).distinct().collect(Collectors.joining(","));
                TCourseSiteGroup tCourseSiteGroup = new TCourseSiteGroup();
                tCourseSiteGroup.setTCourseSite(tCourseSiteJPA.getOne(cid));
                tCourseSiteGroup.setGroupTitle(tAssignment.getTitle());
                tCourseSiteGroup.setDescription(usernames);
                tCourseSiteGroup.setAssignmentId(assignmentId);
                tCourseSiteGroupJPA.save(tCourseSiteGroup);
            }
        }
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void saveGroupAssignment(Integer assignmentId,Integer categoryId, Integer[] groupIds) {
        //????????????????????????
        QueryWrapper<GroupAssignment> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("assignment_id",assignmentId);
        groupAssignmentService.remove(queryWrapper);
        //?????????????????????
        List<GroupAssignment> list = new ArrayList<>();
        for (Integer groupId : groupIds) {
            GroupAssignment groupAssignment = new GroupAssignment();
            groupAssignment.setAssignmentId(assignmentId);
            groupAssignment.setGroupId(groupId);
            list.add(groupAssignment);
        }
        groupAssignmentService.saveBatch(list);
        //??????????????????????????????id
        TAssignment one = tAssignmentJPA.getOne(assignmentId);
        one.setCategoryId(categoryId);
        tAssignmentJPA.save(one);
    }

    @Override
    public void initGroupGrading(Integer assignmentId) {
        TAssignment assignment = tAssignmentJPA.getOne(assignmentId);
        List<TCourseSiteGroup> groupList = tCourseSiteGroupJPA.findAssignmentGroup(assignmentId);
        for (TCourseSiteGroup group : groupList) {
            //??????????????????????????????
            TAssignmentGrading grading = new TAssignmentGrading();
            grading.setTAssignment(assignment);
            grading.setIslate(2);
            grading.setGroupId(group.getId());
            grading.setTimes(0);
            tAssignmentGradingJPA.save(grading);
            //?????????????????????????????????????????????????????????
            String description = group.getDescription();
            String[] split = description.split(",");
            for (String username : split) {
                TAssignmentGrading stuGrading = new TAssignmentGrading();
                stuGrading.setSubmitTime(2);
                stuGrading.setTAssignment(assignment);
                stuGrading.setUserByStudent(userJPA.getOne(username));
                stuGrading.setIslate(2);
                stuGrading.setGroupId(group.getId());
                tAssignmentGradingJPA.save(stuGrading);
            }
        }
    }

    /**************************************************************************
     * Description:?????????????????????????????????
     *
     * @author?????????
     * @date ???2018-2-05
     **************************************************************************/
    @Override
    public List<UserVo> notInGroupStudents(Integer cid, Integer assignmentId, String exitUsernames) {
        List<TCourseSiteGroup> exitGroups = new ArrayList<>();
        List<TCourseSiteUser> notInGroup = new ArrayList<>();
        List<String> newUsernames = new ArrayList<>();
        exitUsernames = (exitUsernames == null ? "" : exitUsernames);
        //??????
        if (assignmentId != null) {
            exitGroups = tCourseSiteGroupJPA.findAssignmentGroup(assignmentId);
            //?????????????????????
            List<String> usernames = exitGroups.stream().map(e -> e.getDescription()).collect(Collectors.toList());
            //???????????????list
            for (String usernameArr : usernames) {
                for (String username : usernameArr.split(",")) {
                    newUsernames.add(username);
                }
            }
            notInGroup = tCourseSiteUserJPA.notInAssignmentStudent(cid, newUsernames);
        }
        //??????
        else {
            for (String username : exitUsernames.split(",")) {
                newUsernames.add(username);
            }
            notInGroup = tCourseSiteUserJPA.notInAssignmentStudent(cid, newUsernames);
        }
        List<UserVo> results = new ArrayList<>();
        for (TCourseSiteUser tCourseSiteUser : notInGroup) {
            UserVo userVo = new UserVo();
            userVo.setUsername(tCourseSiteUser.getUser().getUsername());
            userVo.setCname(tCourseSiteUser.getUser().getCname());
            results.add(userVo);
        }
        return results;
    }

    /**************************************************************************
     * Description:?????????????????????????????????????????????
     *
     * @author?????????
     * @date ???2020???3???30???
     **************************************************************************/
    @Override
    public void correctIslate(Integer assignmentId) {
        try {
            //??????????????????????????????????????????
            List<TAssignmentGrading> commitStudents = tAssignmentGradingJPA.findCommitStudents(assignmentId);
            if (commitStudents.size() > 0) {
                //????????????????????????
                TAssignment tAssignment = tAssignmentJPA.getOne(assignmentId);
                //????????????
                Date end = tAssignment.getTAssignmentControl().getDuedate();
                for (TAssignmentGrading tAssignmentGrading : commitStudents) {
                    //??????????????????
                    Date submitDate = tAssignmentGrading.getSubmitdate();
                    if (submitDate.getTime() < end.getTime()) {
                        tAssignmentGrading.setIslate(0);//??????????????????
                    } else if (submitDate.getTime() >= end.getTime()) {
                        tAssignmentGrading.setIslate(1);
                    }
                    tAssignmentGradingJPA.saveAndFlush(tAssignmentGrading);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**************************************************************************
     * Description ??????????????????????????????????????????????????????
     *
     * @author????????????
     * @date ???2018-3-14
     **************************************************************************/
    @Override
    @Transactional
    public void gradeEnd(Integer cid, Integer assignmentId) {
        //????????????
        TCourseSite tCourseSite = tCourseSiteJPA.getOne(cid);
        List<TAssignmentGrading> tAssignmentGradings = this.findTAssignmentGradingList(assignmentId, 1, new TAssignmentGrading());
        //??????????????????????????????
        Set<TCourseSiteUser> allStudents = tCourseSite.getTCourseSiteUsers();
        Set<TCourseSiteUser> allStudentsCommit = new HashSet<TCourseSiteUser>(allStudents);
        Set<TCourseSiteUser> notCommitStudents = new HashSet<TCourseSiteUser>();
        List<TCourseSiteUser> unCommit = new ArrayList<TCourseSiteUser>();
        if (tAssignmentGradings.size() != 0) {
            for (TCourseSiteUser t : allStudents) {
                for (TAssignmentGrading g : tAssignmentGradings) {
                    if (t.getUser().getUsername().equals(g.getUserByStudent().getUsername())) {
                        unCommit.add(t);
                    }
                }
            }
            for (TCourseSiteUser t : unCommit) {
                allStudentsCommit.remove(t);
            }
            notCommitStudents.addAll(allStudentsCommit);
        } else {
            notCommitStudents.addAll(allStudents);
        }
        StringBuilder insertUser = new StringBuilder();
        TAssignment tAssignment = tAssignmentJPA.getOne(assignmentId);
        //????????????????????????sql???0????????????????????????????????????1
        int flag = 0;
        if (tAssignment.getNeedSubmit() != null) {
            if (tAssignment.getNeedSubmit() == 0) {
                flag = 1;
            }
        }
        //??????????????????sql
        int i = 1;
        if (flag == 0) {
            for (TCourseSiteUser t : notCommitStudents) {
                insertUser.append("(?").append(i).append(",?").append(i + 1).append(",'1','2'),");
                i = i + 2;
            }
        }
        //????????????????????????sql
        if (flag == 1) {
            for (TCourseSiteUser t : notCommitStudents) {
                insertUser.append("(?").append(i).append(",?").append(i + 1).append(",'1','0'),");
                i = i + 2;
            }
        }
        if (insertUser.length() == 0) {

        } else {
            insertUser = new StringBuilder("insert into `t_assignment_grading` (`student`,`assignment_id`,`submit_time`,`islate`) values " + insertUser.substring(0, insertUser.length() - 1));

            Query query = entityManager.createNativeQuery(insertUser.toString());
            int j = 1;
            if (flag == 0) {
                for (TCourseSiteUser t : notCommitStudents) {
                    query.setParameter(j, t.getUser().getUsername());
                    query.setParameter(j + 1, assignmentId);
                    j = j + 2;
                }
            }
            if (flag == 1) {
                for (TCourseSiteUser t : notCommitStudents) {
                    query.setParameter(j, t.getUser().getUsername());
                    query.setParameter(j + 1, assignmentId);
                    j = j + 2;
                }
            }

            query.executeUpdate();
        }
    }

    /**************************************************************************
     * Description ???????????????id???user ???????????????????????????
     *
     * @author????????????
     * @date ???2018-3-14
     **************************************************************************/
    public List<TAssignmentGrading> findTAssignmentGradingList(Integer assignmentId, int flag, TAssignmentGrading tAssignmentGrading1) {
        StringBuffer sql = new StringBuffer("from TAssignmentGrading c where c.TAssignment.id = :assignmentId ");
        if (tAssignmentGrading1.getUserByStudent() != null) {
            if (tAssignmentGrading1.getUserByStudent().getCname() != null) {
                sql.append(" and c.userByStudent.cname like :cname ");
            }
            if (tAssignmentGrading1.getUserByStudent().getUsername() != null) {
                sql.append(" and c.userByStudent.username like :username ");
            }
        }
        sql.append(" order by  c.islate  desc");
        Query query = entityManager.createQuery(sql.toString());

        query.setParameter("assignmentId", assignmentId);
        if (tAssignmentGrading1.getUserByStudent() != null) {
            if (tAssignmentGrading1.getUserByStudent().getCname() != null) {
                query.setParameter("cname", "%" + tAssignmentGrading1.getUserByStudent().getCname() + "%");
            }
            if (tAssignmentGrading1.getUserByStudent().getUsername() != null) {
                query.setParameter("username", "%" + tAssignmentGrading1.getUserByStudent().getUsername() + "%");
            }
        }

        List<TAssignmentGrading> tAssignmentGradings = query.getResultList();
        Map<String, TAssignmentGrading> tAssignmentGradingsTemp = null;
        if (flag != 0) {//??????????????????????????????????????????????????????????????????
            tAssignmentGradingsTemp = new HashMap<String, TAssignmentGrading>();
            for (TAssignmentGrading tAssignmentGrading : tAssignmentGradings) {
                if (tAssignmentGradingsTemp.containsKey(tAssignmentGrading.getUserByStudent().getUsername())) {
                    if (tAssignmentGrading.getAccessmentgradingId() > (tAssignmentGradingsTemp.get(tAssignmentGrading.getUserByStudent().getUsername())).getAccessmentgradingId()) {
                        tAssignmentGradingsTemp.put(tAssignmentGrading.getUserByStudent().getUsername(), tAssignmentGrading);
                    }
                } else {
                    tAssignmentGradingsTemp.put(tAssignmentGrading.getUserByStudent().getUsername(), tAssignmentGrading);
                }
            }
        }
        if (tAssignmentGradingsTemp != null) {
            Set<String> set = tAssignmentGradingsTemp.keySet();
            tAssignmentGradings = new ArrayList<TAssignmentGrading>();
            for (String string : set) {
                tAssignmentGradings.add(tAssignmentGradingsTemp.get(string));
            }
        }
        return tAssignmentGradings;
    }

    /**************************************************************************
     * Description ???????????????id?????????????????????
     *
     * @author????????????
     * @date ???2018-3-14
     **************************************************************************/
    @Override
    public TAssignmentVO getTAssignmentInfoByAssignmentId(Integer cid, Integer assignmentId) {
        TAssignmentVO tAssignmentVO = new TAssignmentVO();
        //???????????????id????????????
        TAssignment tAssignment = tAssignmentJPA.getOne(assignmentId);
        //?????????????????????
        TAssignmentControl tAssignmentControl = tAssignment.getTAssignmentControl();
        //???????????????
        tAssignmentVO.setTitle(tAssignment.getTitle());
        //???????????????
        tAssignmentVO.setRequirement(tAssignment.getContent());
        //??????????????? ?????? ??????
        if (tAssignment.getWkFolder().getWkChapter() != null) {
            tAssignmentVO.setCategory(tAssignment.getWkFolder().getWkChapter().getType());
            tAssignmentVO.setChapterId(tAssignment.getWkFolder().getWkChapter().getId());
            tAssignmentVO.setChapterName(tAssignment.getWkFolder().getWkChapter().getName());
            if (tAssignment.getWkFolder().getWkLesson() != null) {
                tAssignmentVO.setLessonId(tAssignment.getWkFolder().getWkLesson().getId());
                tAssignmentVO.setLessonName(tAssignment.getWkFolder().getWkLesson().getTitle());
            }
        } else {
            tAssignmentVO.setCategory(tAssignment.getWkFolder().getWkLesson().getWkChapter().getType());
            tAssignmentVO.setChapterId(tAssignment.getWkFolder().getWkLesson().getWkChapter().getId());
            tAssignmentVO.setChapterName(tAssignment.getWkFolder().getWkLesson().getWkChapter().getName());
            if (tAssignment.getWkFolder().getWkLesson() != null) {
                tAssignmentVO.setLessonId(tAssignment.getWkFolder().getWkLesson().getId());
                tAssignmentVO.setLessonName(tAssignment.getWkFolder().getWkLesson().getTitle());
            }

        }
        if(tAssignment.getWkFolder().getExpSkillId()!=null){
            Integer expSkillId = tAssignment.getWkFolder().getExpSkillId();
            TExperimentSkill one = tExperimentSkillJPA.getOne(expSkillId);
            tAssignmentVO.setExpProjectId(one.getId());
            tAssignmentVO.setExpProjectName(one.getExperimentName());
        }
        //?????????????????? ???????????? ?????????????????? 0?????????1?????????
        tAssignmentVO.setFolderId(tAssignment.getWkFolder().getId());
        tAssignmentVO.setType(tAssignment.getIsGroup());
        tAssignmentVO.setMins(tAssignment.getMins());
        //???????????? ???????????????id

        //???????????????id
        //???????????????????????????????????? ?????????????????????
        if (tAssignment.getWkFolder().getWkLesson() != null) {
            tAssignmentVO.setLessonId(tAssignment.getWkFolder().getWkLesson().getId());
        }
        //?????????id
        tAssignmentVO.setId(tAssignment.getId());
        if (tAssignmentControl != null) {
            //??????????????????
            tAssignmentVO.setStartDate(DateFormatUtil.dateToString1(tAssignmentControl.getStartdate()));
            //??????????????????
            tAssignmentVO.setEndDate(DateFormatUtil.dateToString1(tAssignmentControl.getDuedate()));
            //?????????????????????????????? ?????????1
            tAssignmentVO.setIsToGradebook(tAssignmentControl.getToGradebook().equals("yes") ? 1 : 0);
            //??????????????????????????????
            tAssignmentVO.setIsGradeToStudent(tAssignmentControl.getGradeToStudent().equals("yes") ? 1 : 0);
            //??????????????????????????????
            tAssignmentVO.setIsGradeToTotalGrade(tAssignmentControl.getGradeToTotalGrade().equals("yes") ? 1 : 0);
            //??????????????????
            tAssignmentVO.setSubmitLate(tAssignmentControl.getSubmitLate());
            //?????????????????????
            tAssignmentVO.setAppendixType(tAssignmentControl.getAppendixType());
        }
        //???????????????
        tAssignmentVO.setIsAllModeify(tAssignment.getIsCheckAll());
        //??????????????????
        tAssignmentVO.setIsNeedCommit(tAssignment.getNeedSubmit());
        //??????????????? 0 ?????? 1??????
        if (tAssignmentControl != null) {
            tAssignmentVO.setRemarkStyle(tAssignmentControl.getIsOnlineMarking());
            //???????????????
            tAssignmentVO.setCommitType(tAssignmentControl.getSubmitType());
            //???????????????
            tAssignmentVO.setCommitTime(tAssignmentControl.getTimelimit());
            //??????????????????
            tAssignmentVO.setIsDuplicateChecking(tAssignmentControl.getIsDuplicateChecking());
        }
        //???????????????
        if (tAssignment.getTAssignmentAnswerAssign() != null) {
            tAssignmentVO.setScore(tAssignment.getTAssignmentAnswerAssign().getScore());
        }
        tAssignmentVO.setFileUrl(tAssignment.getTeacherFilePath());
        //???????????????????????????
        return tAssignmentVO;
    }

    /**************************************************************************
     * Description  ????????????
     *
     * @author????????????
     * @date ???2018-3-14
     **************************************************************************/
    @Override
    public void deleteAssignment(Integer assignmentId) {
        TAssignment tAssignment = tAssignmentJPA.getOne(assignmentId);
        transcriptFeign.deleteTranscript(assignmentId.toString(),null,null,tAssignment.getSiteId());
        Integer folderId = tAssignment.getWkFolder().getId();
        if (tAssignment != null) {
            tAssignmentJPA.delete(tAssignment);
        }
        WkFolder wkFolder = wkFolderJPA.findOne(folderId);
        if (wkFolder.getTAssignments() == null) {
            wkFolderJPA.delete(wkFolder);
        }

    }

    /**************************************************************************
     * Description  ??????????????????
     *
     * @author?????????
     * @date ???2021???3???10???
     **************************************************************************/
    @Override
    public List<TAssignmentGradingVO> correctedByTeacherData(Integer assignmentId, Integer page, Integer limit, String search, String submitDate,Integer islate,Integer siteId) {
        search = search == null ? "" : search;
        islate = islate==null?0:islate;
//        submitDate = submitDate == null ? "" : submitDate;
        List<TAssignmentGradingVO> already = new ArrayList<>();//????????????
        List<TAssignmentGradingVO> notYet = new ArrayList<>();//?????????
        List<TAssignmentGradingVO> late = new ArrayList<>();//??????
        List<TAssignmentGradingVO> reSubmit = new ArrayList<>();//???????????????
        //??????????????????????????????
        List<TAssignmentGrading> dataList = tAssignmentGradingJPA.findNewCommitList(assignmentId);
        List<TCourseSiteUser> userlist = tCourseSiteUserJPA.findStudentBySiteId(siteId);
        List<TAssignmentGrading> finalDataList = dataList;
        //??????????????????????????????????????????????????????????????????????????????
        List<TCourseSiteUser> collect = userlist.stream().filter(tCourseSiteUser -> {
            for (TAssignmentGrading grading : finalDataList) {
                if (grading.getUserByStudent().getUsername().equals(tCourseSiteUser.getUser().getUsername())) {
                    return false;
                }
            }
            return true;
        }).collect(Collectors.toList());
        //?????????????????????
        collect.forEach(tCourseSiteUser -> {
            TAssignmentGradingVO vo = new TAssignmentGradingVO();
            User user = tCourseSiteUser.getUser();
            vo.setUsername(user.getUsername());
            vo.setCname(user.getCname());
            notYet.add(vo);
        });
        for (TAssignmentGrading grading : dataList) {
            TAssignmentGradingVO gradingVO = new TAssignmentGradingVO();
            //???????????????id
            gradingVO.setGradingId(grading.getAccessmentgradingId());
            //????????????????????????id
            gradingVO.setAssignmentId(assignmentId);
            //??????????????????????????????
            gradingVO.setTitle(grading.getTAssignment().getTitle());
            //?????????????????????
            User gradingUser = grading.getUserByStudent();
            gradingVO.setUsername(gradingUser.getUsername());
            gradingVO.setCname(gradingUser.getCname());
            //???????????????
            gradingVO.setCommitContent(grading.getContent());
            //??????
            gradingVO.setGrading(grading.getFinalScore());
            //??????
            gradingVO.setScore(grading.getTAssignment().getTAssignmentAnswerAssign().getScore());
            //????????????
            gradingVO.setComment(grading.getComments());
            //????????????
            gradingVO.setCommitDate(grading.getSubmitdate());
            //??????????????????
            gradingVO.setCheckDate(grading.getGradeTime());
            //????????????
            gradingVO.setFinalGrading(grading.getFinalScore());
            //???????????? 0???????????? 1??????
            gradingVO.setCommitStatus(grading.getIslate());
            //???????????????url
            gradingVO.setFileUrl(grading.getGradeUrl());
            gradingVO.setSimilarity(grading.getSimilarity() == null ? "????????????????????????" : grading.getSimilarity().toString());
            if(grading.getSubmitTime()==0){
                notYet.add(gradingVO);
            }else{
                if(grading.getIslate()==0){
                    already.add(gradingVO);
                }else if(grading.getIslate()==1){
                    late.add(gradingVO);
                }
            }
            if(grading.getSubmitTime()==-1){
                reSubmit.add(gradingVO);
            }
        }
        List<TAssignmentGradingVO> returnList = new ArrayList<>();//????????????
        switch (islate){
            case 2:
                returnList =  already;
                break;
            case 3:
                returnList =  notYet;
                break;
            case 4:
                returnList =  late;
                break;
            case 5:
                returnList =  reSubmit;
                break;
            default:
                break;
        }
        return returnList.stream().skip((page-1)*limit).limit(limit).collect(Collectors.toList());
    }

    /**************************************************************************
     * Description  ????????????????????????
     *
     * @author?????????
     * @date ???2021???3???10???
     **************************************************************************/
    @Override
    public Integer correctedByTeacherDataCount(Integer assignmentId,String search, String submitDate,Integer islate,Integer siteId) {
        search = search == null ? "" : search;
        islate = islate==null?0:islate;
//        submitDate = submitDate == null ? "" : submitDate;
        List<TAssignmentGradingVO> already = new ArrayList<>();//????????????
        List<TAssignmentGradingVO> notYet = new ArrayList<>();//?????????
        List<TAssignmentGradingVO> late = new ArrayList<>();//??????
        List<TAssignmentGradingVO> reSubmit = new ArrayList<>();//???????????????
        //??????????????????????????????
        List<TAssignmentGrading> dataList = tAssignmentGradingJPA.findNewCommitList(assignmentId);
        List<TCourseSiteUser> userlist = tCourseSiteUserJPA.findStudentBySiteId(siteId);
        List<TAssignmentGrading> finalDataList = dataList;
        //??????????????????????????????????????????????????????????????????????????????
        List<TCourseSiteUser> collect = userlist.stream().filter(tCourseSiteUser -> {
            Boolean flag = false;
            for (TAssignmentGrading grading : finalDataList) {
                if (grading.getUserByStudent().getUsername().equals(tCourseSiteUser.getUser().getUsername())) {
                    flag = true;
                    break;
                }
            }
            return !flag;
        }).collect(Collectors.toList());
        //?????????????????????
        collect.forEach(tCourseSiteUser -> {
            TAssignmentGradingVO vo = new TAssignmentGradingVO();
            User user = tCourseSiteUser.getUser();
            vo.setUsername(user.getUsername());
            vo.setCname(user.getCname());
            notYet.add(vo);
        });
        for (TAssignmentGrading grading : dataList) {
            TAssignmentGradingVO gradingVO = new TAssignmentGradingVO();
            //???????????????id
            gradingVO.setGradingId(grading.getAccessmentgradingId());
            //????????????????????????id
            gradingVO.setAssignmentId(assignmentId);
            //??????????????????????????????
            gradingVO.setTitle(grading.getTAssignment().getTitle());
            //?????????????????????
            User gradingUser = grading.getUserByStudent();
            gradingVO.setUsername(gradingUser.getUsername());
            gradingVO.setCname(gradingUser.getCname());
            //???????????????
            gradingVO.setCommitContent(grading.getContent());
            //??????
            gradingVO.setGrading(grading.getFinalScore());
            //??????
            gradingVO.setScore(grading.getTAssignment().getTAssignmentAnswerAssign().getScore());
            //????????????
            gradingVO.setComment(grading.getComments());
            //????????????
            gradingVO.setCommitDate(grading.getSubmitdate());
            //??????????????????
            gradingVO.setCheckDate(grading.getGradeTime());
            //????????????
            gradingVO.setFinalGrading(grading.getFinalScore());
            //???????????? 0???????????? 1??????
            gradingVO.setCommitStatus(grading.getIslate());
            //???????????????url
            gradingVO.setFileUrl(grading.getGradeUrl());
            gradingVO.setSimilarity(grading.getSimilarity() == null ? "????????????????????????" : grading.getSimilarity().toString());
            if(grading.getSubmitTime()==0){
                notYet.add(gradingVO);
            }else{
                if(grading.getIslate()==0){
                    already.add(gradingVO);
                }else if(grading.getIslate()==1){
                    late.add(gradingVO);
                }
            }
            if(grading.getSubmitTime()==-1){
                reSubmit.add(gradingVO);
            }
        }
        switch (islate){
            case 2:
                return already.size();
            case 3:
                return notYet.size();
            case 4:
                return late.size();
            case 5:
                return reSubmit.size();
            default:
                return 0;
        }
    }

    /**************************************************************************
     * Description?????????????????????????????????
     *
     * @author????????????
     * @date ???2018-2-05
     **************************************************************************/
    @Override
    public Integer updateTAssignmentGrading(Integer gradingId, String content, Double finalScore, String username,Integer assignmentId) {
        //??????????????????
        TAssignmentGrading tAssignmentGrading = tAssignmentGradingJPA.getOne(gradingId);
        TAssignment one = tAssignmentJPA.getOne(assignmentId);
        //??????????????????
        User user = userJPA.getOne(username);
        //?????????????????????????????????????????????????????????????????????
        if(tAssignmentGrading==null){
            TAssignmentGrading grading = new TAssignmentGrading();
            grading.setTAssignment(one);
            grading.setUserByStudent(user);
            grading.setIslate(2);
            tAssignmentGrading = tAssignmentGradingJPA.save(grading);
        }
        tAssignmentGrading.setUserByGradeBy(user);
        //?????????????????????
        tAssignmentGrading.setGradeTime(new Date());
        Double score = null;
        if (finalScore != null) {
            if (tAssignmentGrading.getTAssignment().getTAssignmentAnswerAssign().getScore().compareTo(finalScore) == -1) {
                //???????????????????????????
                score = tAssignmentGrading.getTAssignment().getTAssignmentAnswerAssign().getScore();
            } else {
                score = finalScore;
            }
        } else {
            tAssignmentGrading.setGradeTime(null);
        }
        //????????????
        tAssignmentGrading.setFinalScore(score);
        //????????????
        if (!EmptyUtil.isEmpty(content)) {
            tAssignmentGrading.setComments(content.trim());
        }
        return tAssignmentGradingJPA.saveAndFlush(tAssignmentGrading).getAccessmentgradingId();
    }

    /**************************************************************************
     * Description???????????????????????????????????????
     *
     * @author?????????
     * @date ???2021???3???11???
     **************************************************************************/
    @Override
    public List<Integer> batchCorrect(Integer assignmentId, String students, String content, Double finalScore, String username) {
        List<Integer> gradingIds = new ArrayList<>();
        List<String> usernames = new ArrayList<>();
        for (String student : students.split(",")) {
            usernames.add(student);
        }
        //??????????????????
        List<TAssignmentGrading> dataList = tAssignmentGradingJPA.batchCorrectData(assignmentId, usernames);
        //??????????????????
        User user = userJPA.getOne(username);
        for (TAssignmentGrading tAssignmentGrading : dataList) {

            tAssignmentGrading.setUserByGradeBy(user);
            //?????????????????????
            tAssignmentGrading.setGradeTime(new Date());
            Double score = null;
            if (finalScore != null) {
                if (tAssignmentGrading.getTAssignment().getTAssignmentAnswerAssign().getScore().compareTo(finalScore) == -1) {
                    //???????????????????????????
                    score = tAssignmentGrading.getTAssignment().getTAssignmentAnswerAssign().getScore();
                } else {
                    score = finalScore;
                }
                //????????????
                tAssignmentGrading.setFinalScore(score);
            } else {
                tAssignmentGrading.setGradeTime(null);
            }

            //????????????
            if (!EmptyUtil.isEmpty(content)) {
                tAssignmentGrading.setComments(content);
            }
            tAssignmentGradingJPA.saveAndFlush(tAssignmentGrading);
            gradingIds.add(tAssignmentGrading.getAccessmentgradingId());
        }
        return gradingIds;
    }

    /**************************************************************************
     * Description ??????????????????
     *
     * @author ??????
     * @date 2021???3???3???
     **************************************************************************/
    @Override
    public List<TAssignmentVO> studentAssignmentList(Integer cid, Integer chapterType, String type, Integer isGroup, String student, String islate, Integer page, Integer limit, String search) {
        List<TAssignmentVO> voList = new ArrayList<>();
        search = search == null ? "" : search;
        islate = islate == null ? "" : islate;
        List<TAssignment> tAssignmentList = tAssignmentJPA.findStudentTAssignmentIdBySiteIdPageSearch(cid, chapterType, type, isGroup, student,search, (page - 1) * limit, limit);
        //???????????????id?????????????????????(????????????????????????????????????)
        for (TAssignment tAssignment : tAssignmentList) {
            TAssignmentVO tAssignmentVO = new TAssignmentVO();
            tAssignmentVO.setId(tAssignment.getId());
            tAssignmentVO.setTitle(tAssignment.getTitle());
            tAssignmentVO.setStartDate(DateFormatUtil.dateToString1(tAssignment.getTAssignmentControl().getStartdate()));
            tAssignmentVO.setEndDate(DateFormatUtil.dateToString1(tAssignment.getTAssignmentControl().getDuedate()));
            //??????????????????????????????
            Integer timeLimit = tAssignment.getTAssignmentControl().getTimelimit();
            if (timeLimit == 0)//?????????????????????
            {
                tAssignmentVO.setTimeLimit(-1);
            } else {//???????????????
                TAssignmentGrading latestStudentSubmit = tAssignmentGradingJPA.findNormalWorkStudentLatestSubmit(tAssignment.getId(), student);
                Integer submitTime = 0;
                if(latestStudentSubmit!=null){
                    submitTime = latestStudentSubmit.getTimes();
                }
                tAssignmentVO.setTimeLimit(timeLimit - submitTime);
            }
            //????????????????????????
            TAssignmentGrading commonWorkLatest = tAssignmentGradingJPA.findCommonWorkLatest(tAssignment.getId(), student);
            //islate???0???????????????1?????????2????????????3???????????????
            if(commonWorkLatest!=null){
                Integer submitTime = commonWorkLatest.getSubmitTime();
                Integer lateOrNot = commonWorkLatest.getIslate();
                if(submitTime==-1){
                    tAssignmentVO.setIslate(3);
                }else if(submitTime==1){
                    tAssignmentVO.setIslate(lateOrNot);
                }else{
                    tAssignmentVO.setIslate(2);
                }
            }else{
                tAssignmentVO.setIslate(2);
            }
            voList.add(tAssignmentVO);
        }
        return voList;
    }

    /**************************************************************************
     * Description ??????????????????????????????
     *
     * @author ??????
     * @date 2021???3???3???
     **************************************************************************/
    @Override
    public Integer studentAssignmentListCount(Integer cid, Integer chapterType, String type, Integer isGroup, String student, String islate, String search) {
        search = search == null ? "" : search;
        islate = islate == null ? "" : islate;
        List<TAssignment> tAssignmentList = tAssignmentJPA.findStudentTAssignmentIdBySiteIdSearch(cid, chapterType, type, isGroup, student, search);
        return tAssignmentList.size();
    }

    /**************************************************************************
     * Description???????????????????????????
     *
     * @author?????????
     * @date ???2021???3???22???
     **************************************************************************/
    @Override
    public Result<TAssignmentGradingVO> saveTAssignmentGrading(TAssignmentGradingVO tAssignmentGradingVO, String username) {
        //0:???????????? 1:??????
        Integer submitTime = tAssignmentGradingVO.getSubmitTime();
        //???????????????????????????
        User user = userJPA.getOne(username);
        //????????????
        TAssignment tAssignment = tAssignmentJPA.getOne(tAssignmentGradingVO.getAssignmentId());
        //?????????????????????????????????????????????????????????
        TAssignmentGrading latestNormalSubmit = tAssignmentGradingJPA.findCommonWorkLatest(tAssignment.getId(), username);
        TAssignmentGrading grading = new TAssignmentGrading();
        if(latestNormalSubmit==null){
            grading.setTimes(1);
        }else{
            if(latestNormalSubmit.getSubmitTime()==0){
                grading = latestNormalSubmit;
            }else{
                grading.setTimes(latestNormalSubmit.getTimes()+1);
            }
        }
        //?????????????????????????????????
        grading.setTAssignment(tAssignment);
        //???????????????????????????????????????url
        grading.setGradeUrl(tAssignmentGradingVO.getFileUrl());
        //???????????????????????????
        grading.setContent(tAssignmentGradingVO.getCommitContent());
        //?????????????????????
        grading.setUserByStudent(user);
        //?????????????????????
        grading.setSubmitdate(new Date());
        //?????????????????????0??????????????????????????????????????????????????????????????????1???????????????
        grading.setSubmitTime(tAssignmentGradingVO.getSubmitTime());
        //????????????
        Integer islate = 0;
        //??????????????????
        Date date = new Date();
        if (date.getTime() > tAssignment.getTAssignmentControl().getDuedate().getTime()) {
            //?????????????????????????????????????????????
            islate = 1;
        }
        grading.setIslate(islate);

        //??????
        if (tAssignment.getTAssignmentControl().getIsDuplicateChecking() == 1) {
            //??????????????????????????????
            List<TAssignmentGrading> otherCommits = tAssignmentGradingJPA.findOtherCommit(tAssignment.getId(), username);
            Similarity similarity = new Similarity();
            BigDecimal maxSim = new BigDecimal(0.0);
            for (TAssignmentGrading commit : otherCommits) {
                try {
                    if(tAssignmentGradingVO.getCommitContent()!=null && commit.getContent()!=null){
                        double sim = similarity.getSimilarity(tAssignmentGradingVO.getCommitContent().replaceAll("\\u00A0+", " "),
                                commit.getContent().replaceAll("\\u00A0+", " "));
                        if (maxSim.compareTo(new BigDecimal(sim)) < 0) {
                            maxSim = new BigDecimal(sim);
                        }
                    }
                } catch (IOException e) {
                    System.out.println("????????????????????????");
                    e.printStackTrace();
                }
            }
            grading.setSimilarity(maxSim);
        }

        tAssignmentGradingJPA.saveAndFlush(grading);
        return Result.ok(tAssignmentGradingVO);
    }

    /**************************************************************************
     * Description ??????????????????
     *
     * @author?????????
     * @date ???2021???3???23???
     **************************************************************************/
    @Override
    public List<TAssignmentGradingVO> gradingDetailByStudent(Integer assignmentId, String username) {
        List<TAssignmentGradingVO> list = new ArrayList<>();
        //?????????????????????????????????,
        List<TAssignmentGrading> gradings = tAssignmentGradingJPA.findAllStudentSubmit(assignmentId, username);
        //????????????????????????
        List<TAssignmentGrading> gradingList = tAssignmentGradingJPA.findNewCommitList(assignmentId);
        if(gradingList.size()>0){
            AtomicInteger index = new AtomicInteger(0);
            TAssignmentGrading grading = new TAssignmentGrading();
            grading = gradingList.stream()
                    .filter(s -> {
                        //?????????????????????????????????1
                        index.getAndIncrement();
                        return s.getUserByStudent().getUsername().equals(username);
                    }).findAny().get();
            if(grading==null){
                grading = gradings.get(0);
            }
            TAssignmentGradingVO gradingVO = new TAssignmentGradingVO();
            //???????????????id
            gradingVO.setGradingId(grading.getAccessmentgradingId());
            //????????????????????????id
            gradingVO.setAssignmentId(assignmentId);
            //??????????????????????????????
            gradingVO.setTitle(grading.getTAssignment().getTitle());
            //?????????????????????
            User gradingUser = grading.getUserByStudent();
            gradingVO.setUsername(gradingUser.getUsername());
            gradingVO.setCname(gradingUser.getCname());
            //???????????????
            gradingVO.setCommitContent(grading.getContent());
            //??????
            gradingVO.setGrading(grading.getFinalScore());
            //??????
            gradingVO.setScore(grading.getTAssignment().getTAssignmentAnswerAssign().getScore());
            //????????????
            gradingVO.setComment(grading.getComments());
            //????????????
            gradingVO.setCommitDate(grading.getSubmitdate());
            //??????????????????
            gradingVO.setCheckDate(grading.getGradeTime());
            //????????????
            gradingVO.setFinalGrading(grading.getFinalScore());
            //???????????? 0???????????? 1??????
            gradingVO.setCommitStatus(grading.getIslate());
            //???????????????url
            gradingVO.setFileUrl(grading.getGradeUrl());

            gradingVO.setSimilarity(grading.getSimilarity() == null ? "????????????????????????" : grading.getSimilarity().toString());

            gradingVO.setRank(index.get());

            gradingVO.setSubmitTime(grading.getSubmitTime());


            BigDecimal rank = new BigDecimal(Double.valueOf(gradingVO.getRank()));
            BigDecimal total = new BigDecimal(Double.valueOf(gradingList.size()));

            BigDecimal percent = rank.divide(total, 2, BigDecimal.ROUND_HALF_EVEN).multiply(new BigDecimal(100.0));
            gradingVO.setRankPercent((new BigDecimal(100).subtract(percent)).toString() + "%");
            list.add(gradingVO);
            for (int i=1;i<gradings.size();i++){
                TAssignmentGradingVO vo = new TAssignmentGradingVO();
                TAssignmentGrading tGrading = gradings.get(i);
                TAssignment tAssignment = tGrading.getTAssignment();
                User student = tGrading.getUserByStudent();
                vo.setAssignmentId(tAssignment.getId());
                vo.setTitle(tAssignment.getTitle());
                vo.setGradingId(tGrading.getAccessmentgradingId());
                vo.setCommitContent(tGrading.getContent());
                vo.setCommitDate(tGrading.getSubmitdate());
                vo.setFileUrl(tGrading.getGradeUrl());
                vo.setUsername(student.getUsername());
                vo.setCname(student.getCname());
                list.add(vo);
            }
        }
        return list;
    }

    /**************************************************************************
     * Description ????????????????????????
     *
     * @author?????????
     * @date ???2021???3???23???
     **************************************************************************/
    @Override
    public TAssignmentGradingVO gradingCommitByStudent(Integer assignmentId, String username) {
        //????????????????????????
        List<TAssignmentGrading> gradingList = tAssignmentGradingJPA.findStudentCommitData(assignmentId, username, 0);
        if (gradingList.size() == 0) {
            gradingList = tAssignmentGradingJPA.findStudentCommitData(assignmentId, username, 1);
        }
        TAssignmentGrading grading = gradingList.get(0);
        TAssignmentGradingVO gradingVO = new TAssignmentGradingVO();
        //???????????????id
        gradingVO.setGradingId(grading.getAccessmentgradingId());
        //????????????????????????id
        gradingVO.setAssignmentId(assignmentId);
        //??????????????????????????????
        gradingVO.setTitle(grading.getTAssignment().getTitle());
        //?????????????????????
        User gradingUser = grading.getUserByStudent();
        gradingVO.setUsername(gradingUser.getUsername());
        gradingVO.setCname(gradingUser.getCname());
        //???????????????
        gradingVO.setCommitContent(grading.getContent());
        //??????
        gradingVO.setGrading(grading.getFinalScore());
        //??????
        gradingVO.setScore(grading.getTAssignment().getTAssignmentAnswerAssign().getScore());
        //????????????
        gradingVO.setComment(grading.getComments());
        //????????????
        gradingVO.setCommitDate(grading.getSubmitdate());
        //??????????????????
        gradingVO.setCheckDate(grading.getGradeTime());
        //????????????
        gradingVO.setFinalGrading(grading.getFinalScore());
        //???????????? 0???????????? 1??????
        gradingVO.setCommitStatus(grading.getIslate());
        //???????????????url
        gradingVO.setFileUrl(grading.getGradeUrl());

        gradingVO.setSimilarity(grading.getSimilarity() == null ? "????????????????????????" : grading.getSimilarity().toString());

        gradingVO.setSubmitTime(grading.getSubmitTime());


//        BigDecimal rank = new BigDecimal(Double.valueOf(gradingVO.getRank()));
//        BigDecimal total = new BigDecimal(Double.valueOf(gradingList.size()));
//
//        BigDecimal percent = rank.divide(total, 2, BigDecimal.ROUND_HALF_EVEN).multiply(new BigDecimal(100.0));
//        gradingVO.setRankPercent(percent.toString() + "%");

        return gradingVO;
    }

    /**************************************************************************
     * Description ????????????????????????
     *
     * @author?????????
     * @date ???2021???3???23???
     **************************************************************************/
    @Override
    public List<TAssignmentVO> assignmentGroupList(Integer cid, Integer chapterType, String type, String student, Integer page, Integer limit, String search) {
        List<TAssignmentVO> voList = new ArrayList<>();
        search = search == null ? "" : search;
        List<TAssignment> tAssignmentList = tAssignmentJPA.findGroupTAssignmentBySiteIdPageSearch(cid, chapterType, type, student, search, (page - 1) * limit, limit);
        //???????????????id?????????????????????(????????????????????????????????????)
        for (TAssignment tAssignment : tAssignmentList) {
            TAssignmentVO tAssignmentVO = new TAssignmentVO();
            tAssignmentVO.setId(tAssignment.getId());
            tAssignmentVO.setTitle(tAssignment.getTitle());
            tAssignmentVO.setStartDate(DateFormatUtil.dateToString1(tAssignment.getTAssignmentControl().getStartdate()));
            tAssignmentVO.setEndDate(DateFormatUtil.dateToString1(tAssignment.getTAssignmentControl().getDuedate()));
            tAssignmentVO.setCategoryId(tAssignment.getCategoryId());
            //??????????????????????????????
            TCourseSiteGroup group = tCourseSiteGroupJPA.findAssignmentGroupByStudent(tAssignment.getId(), student);
            TAssignmentGrading latestGroupGrading = tAssignmentGradingJPA.findLatestGroupSubmitByGroupId(tAssignment.getId(), group.getId());
            //islate???0???????????????1?????????2????????????3???????????????
            if(latestGroupGrading!=null){
                Integer submitTime = latestGroupGrading.getSubmitTime();
                Integer islate = latestGroupGrading.getIslate();
                if(submitTime==-1){
                    tAssignmentVO.setIslate(3);
                }else if(submitTime==1){
                    tAssignmentVO.setIslate(islate);
                }else{
                    tAssignmentVO.setIslate(2);
                }
            }else{
                tAssignmentVO.setIslate(2);
            }
            //??????????????????????????????
            Integer timeLimit = tAssignment.getTAssignmentControl().getTimelimit();
            if (timeLimit == 0)//?????????????????????
            {
                tAssignmentVO.setTimeLimit(-1);
            } else {//???????????????
                TAssignmentGrading groupLatestSubmit = tAssignmentGradingJPA.getGroupLatestSubmit(tAssignment.getId(), group.getId());
                Integer times = 0;
                //?????????????????????
                if (groupLatestSubmit!=null) {
                    times = groupLatestSubmit.getTimes();
                }
                tAssignmentVO.setTimeLimit(timeLimit - times);
            }
            voList.add(tAssignmentVO);
        }
        return voList;
    }

    /**************************************************************************
     * Description ??????????????????????????????
     *
     * @author ??????
     * @date 2021???3???3???
     **************************************************************************/
    @Override
    public Integer assignmentGroupListCount(Integer cid, Integer chapterType, String type, String student, String search) {
        search = search == null ? "" : search;
        List<TAssignment> tAssignmentList = tAssignmentJPA.findGroupTAssignmentIdBySiteIdSearch(cid, chapterType, type, student, search);
        return tAssignmentList.size();
    }

    /**************************************************************************
     * Description ??????????????????
     *
     * @author ??????
     * @date 2021???3???3???
     **************************************************************************/
    @Override
    public List<DistributionDTO> assignmentDistributionCount(Integer assignmentId, String student) {
        List<DistributionDTO> resultList = new ArrayList<>();
        TCourseSiteGroup group = tCourseSiteGroupJPA.findAssignmentGroupByStudent(assignmentId, student);
        //??????????????????????????????
        List<TAssignmentGrading> gradingList = tAssignmentGradingJPA.findGradingBySubmitTimeAndIslate(assignmentId, 2, group.getId(),0);
        if (gradingList.size() > 0) {
            //????????????????????????
            resultList = JSON.parseArray(gradingList.get(0).getDistribution(), DistributionDTO.class);
        } else {
            //????????????????????????????????????
            //??????????????????????????????
            for (String username : group.getDescription().split(",")) {
                DistributionDTO distributionDTO = new DistributionDTO();
                distributionDTO.setUsername(userJPA.getOne(username).getUsername());
                distributionDTO.setCname(userJPA.getOne(username).getCname());
                distributionDTO.setDistribution("");
                resultList.add(distributionDTO);
            }
        }
        return resultList;
    }

    /**************************************************************************
     * Description ??????????????????
     *
     * @author ??????
     * @date 2021???3???3???
     **************************************************************************/
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void commitGroupAssignment(TAssignmentGradingVO tAssignmentGradingVO, String student) {
        //???????????????????????????????????????????????????
        Integer assignmentId = tAssignmentGradingVO.getAssignmentId();
        TAssignment tAssignment = tAssignmentJPA.getOne(assignmentId);
        Integer groupId = tAssignmentGradingVO.getGroupId();
        TAssignmentGrading tGrading = tAssignmentGradingJPA.findByAssignmentAndGroup(assignmentId, groupId);
        if(tGrading==null){//???????????????,???????????????????????????
            this.initGroupGradingData(groupId,assignmentId,tAssignmentGradingVO.getDistributionDTOList());
        }
        //?????????????????????????????????????????????
        TAssignmentGrading grading = new TAssignmentGrading();
        if(tGrading==null){//?????????????????????????????????
            grading.setTimes(1);
        }else{
            if(tGrading.getSubmitTime()==1){//??????????????????????????????????????????
                grading.setTimes(tGrading.getTimes()+1);
            }else{//??????????????????????????????????????????
                grading = tGrading;
            }
        }
        grading.setTAssignment(tAssignment);
        grading.setGroupId(groupId);
        grading.setSubmitdate(new Date());
        grading.setContent(tAssignmentGradingVO.getCommitContent());
        grading.setSubmitTime(tAssignmentGradingVO.getSubmitTime());
        grading.setGradeUrl(tAssignmentGradingVO.getFileUrl());
        //????????????
        Integer islate = 0;
        //??????????????????
        Date date = new Date();
        if (date.getTime() > tAssignment.getTAssignmentControl().getDuedate().getTime()) {
            //?????????????????????????????????????????????
            islate = 1;
        }
        grading.setIslate(islate);
        grading.setDistribution(JSON.toJSONString(tAssignmentGradingVO.getDistributionDTOList()));
        tAssignmentGradingJPA.save(grading);

    }
    /**************************************************************************
     * Description ????????????????????????????????????
     *
     * @author fubowen
     * @date 2021-8-9
     **************************************************************************/
    @Transactional(rollbackFor = Exception.class)
    public void initGroupGradingData(Integer groupId,Integer assignmentId,List<DistributionDTO> distributionDTOList){
        //????????????????????????????????????????????????????????????
//        TAssignmentGrading grading = new TAssignmentGrading();
        TAssignment one = tAssignmentJPA.getOne(assignmentId);
//        grading.setTAssignment(one);
//        grading.setSubmitdate(new Date());
//        grading.setIslate(2);
//        grading.setSubmitTime(1);
//        grading.setGroupId(groupId);
//        grading.setTimes(0);
//        tAssignmentGradingJPA.save(grading);
        //?????????????????????????????????????????????????????????????????????
        QueryWrapper<UserGroup> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("group_id",groupId);
        List<UserGroup> list = userGroupService.list(queryWrapper);
        List<TAssignmentGrading> gradings = new ArrayList<>();
        list.forEach(userGroup -> {
            TAssignmentGrading tGrading = new TAssignmentGrading();
            tGrading.setTAssignment(one);
            User user = tCourseSiteUserJPA.getOne(userGroup.getUserId()).getUser();
            tGrading.setUserByStudent(user);
            tGrading.setGroupId(groupId);
            tGrading.setSubmitTime(2);//2????????????????????????????????????
            tGrading.setDistribution(JSON.toJSONString(distributionDTOList));
            gradings.add(tGrading);
        });
        tAssignmentGradingJPA.saveAll(gradings);
    }
    /**************************************************************************
     * Description ??????????????????????????????????????????????????????
     *
     * @author fubowen
     * @date 2021-8-12
     **************************************************************************/
    public void initCommonGradingData(String username,Integer assignmentId){
        TAssignmentGrading grading = new TAssignmentGrading();
        grading.setTAssignment(tAssignmentJPA.getOne(assignmentId));
        grading.setUserByStudent(userJPA.getOne(username));
        grading.setIslate(2);
        tAssignmentGradingJPA.save(grading);
    }
    /**************************************************************************
     * Description ?????????????????????????????????????????????????????????????????????????????????
     *
     * @author fubowen
     * @date 2021-8-12
     **************************************************************************/
    public void initGroupWorkGrading(Integer groupId,Integer assignmentId){
        TAssignmentGrading grading = new TAssignmentGrading();
        grading.setTAssignment(tAssignmentJPA.getOne(assignmentId));
        grading.setGroupId(groupId);
        grading.setIslate(2);
        tAssignmentGradingJPA.save(grading);
    }

    /**************************************************************************
     * Description ????????????????????????
     *
     * @author?????????
     * @date ???2021???3???23???
     **************************************************************************/
    @Override
    public List<TAssignmentGradingVO> groupGradingDetailByStudent(Integer assignmentId,String student,Integer groupId) {
        List<TAssignmentGradingVO> resultList = new ArrayList<>();
        TAssignment tAssignment = tAssignmentJPA.getOne(assignmentId);
        //???????????????????????????????????????????????????
        List<TAssignmentGrading> list = tAssignmentGradingJPA.findGroupGrading(assignmentId, groupId);
        //?????????????????????????????????????????????
        List<TAssignmentGrading> groupSubmitRecord = tAssignmentGradingJPA.findGroupSubmitRecord(assignmentId, groupId);
        Integer rank = list.size();
        for (int i = 0; i < list.size(); i++) {
            if(student.equals(list.get(i).getUserByStudent().getUsername())){
                rank = i+1;
                break;
            }
        }
        BigDecimal percent = new BigDecimal(rank).divide(new BigDecimal(list.size()),2,BigDecimal.ROUND_HALF_EVEN).multiply(new BigDecimal(100.0));
        for (int i = 0; i < groupSubmitRecord.size(); i++) {
            TAssignmentGradingVO vo = new TAssignmentGradingVO();
            TAssignmentGrading grading = groupSubmitRecord.get(i);
            vo.setGradingId(grading.getAccessmentgradingId());
            vo.setAssignmentId(assignmentId);
            vo.setTitle(tAssignment.getTitle());//????????????
            vo.setCommitContent(grading.getContent());//????????????
            vo.setFileUrl(grading.getGradeUrl());//????????????
            vo.setSubmitTime(grading.getSubmitTime());//????????????
            if(i==0){
                vo.setCommitStatus(grading.getIslate());//????????????
                vo.setCheckDate(grading.getGradeTime());//????????????
                vo.setSimilarity(grading.getSimilarity() == null ? "????????????????????????" : grading.getSimilarity().toString());//?????????
                vo.setRank(rank);//??????
                vo.setRankPercent((new BigDecimal(100).subtract(percent)).toString() + "%");//???????????????
                vo.setComment(grading.getComments());//????????????
                vo.setFinalGrading(grading.getFinalScore());//????????????
            }
            resultList.add(vo);
        }
        return resultList;
    }

    /**
     * ??????????????????????????????
     */
    @Override
    public boolean isGroup(Integer assignmentId) {
        QueryWrapper<GroupAssignment> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("assignment_id",assignmentId);
        List<GroupAssignment> list = groupAssignmentService.list(queryWrapper);
        if (list.size() > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**************************************************************************
     * Description ????????????????????????
     *
     * @author ??????
     * @date 2021???3???3???
     **************************************************************************/
    @Override
    public List<GroupCorrectedVO> groupGradingList(Integer assignmentId, Integer islate, String userSearch, String submitDate, Integer page, Integer limit) {
        submitDate = (submitDate == null ? "" : submitDate);
        //islate?????????????????????????????????????????????????????????1????????????2???????????????3???????????????4????????????5??????????????????
        List<GroupCorrectedVO> already = new ArrayList<>();//?????????
        List<GroupCorrectedVO> notYet = new ArrayList<>();//?????????
        List<GroupCorrectedVO> late = new ArrayList<>();//??????
        List<GroupCorrectedVO> reSubmit = new ArrayList<>();//???????????????
//        List<TAssignmentGrading> gradingList = null;
//        if (EmptyUtil.isEmpty(userSearch)) {
//            gradingList = tAssignmentGradingJPA.findLatestGroupSubmitPage(assignmentId,(page - 1) * limit, limit);
//        } else {
//            //?????????????????????
//            User user = userJPA.findUSerByCName(userSearch);
//            String student = (user == null ? userSearch : user.getUsername());
//            TCourseSiteGroup group = tCourseSiteGroupJPA.findAssignmentGroupByStudent(assignmentId, student);
//            gradingList = tAssignmentGradingJPA.findLatestGroupSubmitByGroupId(assignmentId,group.getId());
//        }

        //??????????????????????????????????????????
        List<TAssignmentGrading> latestSubmit = tAssignmentGradingJPA.findGroupLatestSubmit(assignmentId);
        //??????????????????????????????
        QueryWrapper<GroupAssignment> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("assignment_id",assignmentId);
        List<GroupAssignment> list = groupAssignmentService.list(queryWrapper);
        //???????????????????????????????????????????????????
        List<GroupAssignment> collect = list.stream().filter(groupAssignment -> {
            for (TAssignmentGrading grading : latestSubmit) {
                if (groupAssignment.getGroupId().equals(grading.getGroupId())) {
                    return false;
                }
            }
            return true;
        }).collect(Collectors.toList());
        collect.forEach(groupAssignment -> {
            GroupCorrectedVO vo = new GroupCorrectedVO();
            Integer groupId = groupAssignment.getGroupId();
            vo.setGroupId(groupId);
            vo.setGroupTitle(tCourseSiteGroupJPA.getOne(groupId).getGroupTitle());
            notYet.add(vo);
        });

        for (TAssignmentGrading grading : latestSubmit) {
            TCourseSiteGroup group = tCourseSiteGroupJPA.getOne(grading.getGroupId());
            GroupCorrectedVO groupCorrectedVO = new GroupCorrectedVO();
            groupCorrectedVO.setGroupId(group.getId());
            groupCorrectedVO.setGroupTitle(group.getGroupTitle());
            groupCorrectedVO.setContent(grading.getContent());
            groupCorrectedVO.setFileIds(grading.getGradeUrl());
            groupCorrectedVO.setScore(grading.getFinalScore());
            groupCorrectedVO.setComment(grading.getComments());
            groupCorrectedVO.setDistributionDTOList(JSON.parseArray(grading.getDistribution(), DistributionDTO.class));
            groupCorrectedVO.setGradingId(grading.getAccessmentgradingId());
            if(grading.getSubmitTime()==0){
                notYet.add(groupCorrectedVO);
            }else{
                if(grading.getIslate()==0){
                    already.add(groupCorrectedVO);
                }else if(grading.getIslate()==1){
                    late.add(groupCorrectedVO);
                }
            }
            if(grading.getSubmitTime()==-1){
                reSubmit.add(groupCorrectedVO);
            }
        }
        List<GroupCorrectedVO> returnList = new ArrayList<>();//?????????list
        switch (islate){
            case 2:
                returnList =  already;
                break;
            case 3:
                returnList =  notYet;
                break;
            case 4:
                returnList =  late;
                break;
            case 5:
                returnList =  reSubmit;
                break;
            default:
                break;
        }
        return returnList.stream().skip((page-1)*limit).limit(limit).collect(Collectors.toList());
    }

    /**************************************************************************
     * Description ??????????????????????????????
     *
     * @author ??????
     * @date 2021???3???3???
     **************************************************************************/
    @Override
    public Integer groupGradingListCount(Integer assignmentId, Integer islate, String userSearch) {
        //islate?????????????????????????????????????????????????????????1????????????2???????????????3???????????????4????????????5??????????????????
        List<GroupCorrectedVO> already = new ArrayList<>();//?????????
        List<GroupCorrectedVO> notYet = new ArrayList<>();//?????????
        List<GroupCorrectedVO> late = new ArrayList<>();//??????
        List<GroupCorrectedVO> reSubmit = new ArrayList<>();//???????????????
        //??????????????????????????????????????????
        List<TAssignmentGrading> latestSubmit = tAssignmentGradingJPA.findGroupLatestSubmit(assignmentId);
        //??????????????????????????????
        QueryWrapper<GroupAssignment> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("assignment_id",assignmentId);
        List<GroupAssignment> list = groupAssignmentService.list(queryWrapper);
        //???????????????????????????????????????????????????
        List<GroupAssignment> collect = list.stream().filter(groupAssignment -> {
            Boolean flag = false;
            for (TAssignmentGrading grading : latestSubmit) {
                if (groupAssignment.getGroupId().equals(grading.getGroupId())) {
                    flag = true;
                    break;
                }
            }
            return !flag;
        }).collect(Collectors.toList());
        collect.forEach(groupAssignment -> {
            GroupCorrectedVO vo = new GroupCorrectedVO();
            Integer groupId = groupAssignment.getGroupId();
            vo.setGroupId(groupId);
            vo.setGroupTitle(tCourseSiteGroupJPA.getOne(groupId).getGroupTitle());
            notYet.add(vo);
        });

        for (TAssignmentGrading grading : latestSubmit) {
            TCourseSiteGroup group = tCourseSiteGroupJPA.getOne(grading.getGroupId());
            GroupCorrectedVO groupCorrectedVO = new GroupCorrectedVO();
            groupCorrectedVO.setGroupId(group.getId());
            groupCorrectedVO.setGroupTitle(group.getGroupTitle());
            groupCorrectedVO.setContent(grading.getContent());
            groupCorrectedVO.setFileIds(grading.getGradeUrl());
            groupCorrectedVO.setScore(grading.getFinalScore());
            groupCorrectedVO.setComment(grading.getComments());
            groupCorrectedVO.setDistributionDTOList(JSON.parseArray(grading.getDistribution(), DistributionDTO.class));
            groupCorrectedVO.setGradingId(grading.getAccessmentgradingId());
            if(grading.getSubmitTime()==0){
                notYet.add(groupCorrectedVO);
            }else{
                if(grading.getIslate()==0){
                    already.add(groupCorrectedVO);
                }else if(grading.getIslate()==1){
                    late.add(groupCorrectedVO);
                }
            }
            if(grading.getSubmitTime()==-1){
                reSubmit.add(groupCorrectedVO);
            }
        }
        switch (islate){
            case 2:
                return already.size();
            case 3:
                return notYet.size();
            case 4:
                return late.size();
            case 5:
                return reSubmit.size();
            default:
                return 0;
        }
    }

    /**************************************************************************
     * Description ??????????????????
     *
     * @author ??????
     * @date 2021???3???3???
     **************************************************************************/
    @Override
    public List<TAssignmentGradingVO> findGroupMemberGradingList(Integer groupId,Integer assignmentId) {
        List<DistributionDTO> distributionDTOList = null;
//        List<String> usernameList = new ArrayList<>();
//        for (String username : tCourseSiteGroup.getDescription().split(","))
//            usernameList.add(username);
        List<TAssignmentGrading> gradingList = tAssignmentGradingJPA.correctGroupByStudentData(assignmentId, 2, groupId);
        if (gradingList.size() > 0) {
            distributionDTOList = JSON.parseArray(gradingList.get(0).getDistribution(), DistributionDTO.class);
        }
        List<TAssignmentGradingVO> resultList = new ArrayList<>();
        int rank = 1;
        for (TAssignmentGrading grading : gradingList) {
            List<DistributionDTO> disList = new ArrayList<>();
            TAssignmentGradingVO gradingVO = new TAssignmentGradingVO();
            gradingVO.setGradingId(grading.getAccessmentgradingId());
            gradingVO.setUsername(grading.getUserByStudent().getUsername());//?????????
            gradingVO.setCname(grading.getUserByStudent().getCname());//??????
            gradingVO.setFinalGrading(grading.getFinalScore());//??????
            gradingVO.setComment(grading.getComments());//??????
            gradingVO.setFileUrl(grading.getGradeUrl());//??????
            gradingVO.setCheckDate(grading.getGradeTime());//????????????
            //??????
            DistributionDTO dis = null;
            if(distributionDTOList!=null){
                dis = distributionDTOList.stream().filter(distributionDTO -> distributionDTO.getUsername().equals(gradingVO.getUsername())).findAny().get();
            }
            disList.add(dis);
            gradingVO.setDistributionDTOList(disList);
            gradingVO.setRank(rank);//??????
            //???????????????
            BigDecimal dRrank = new BigDecimal(Double.valueOf(gradingVO.getRank()));
            BigDecimal total = new BigDecimal(Double.valueOf(gradingList.size()));

            BigDecimal percent = dRrank.divide(total, 2, BigDecimal.ROUND_HALF_EVEN).multiply(new BigDecimal(100.0));
            gradingVO.setRankPercent(percent.toString() + "%");
            rank++;
            resultList.add(gradingVO);
        }
        return resultList;
    }

    /**************************************************************************
     * Description ??????-????????????-????????????-??????pdf??????????????????
     *
     * @author ??????
     * @date 2018???12???12???
     **************************************************************************/
    @Override
    public String saveMarkingImageNew(String pdfDirector, Integer gradingId, Integer page, String imageString, Boolean clean) {
        //?????????
        String sep = System.getProperty("file.separator");
        //????????????
        String rootPath = pdfDirector + gradingId + sep;
        //??????????????????????????????
        TAssignmentGrading grading = tAssignmentGradingJPA.getOne(gradingId);
        //???????????????
        String result = this.saveReportImageNew(imageString, page, rootPath);
        //????????????????????????
        if (!result.equals("false")) {
            this.submitMarkingNew(result, gradingId, clean);
        }
        String markPage = "";
        if (!EmptyUtil.isEmpty(grading.getMarkedPages())) {
            markPage = grading.getMarkedPages() + "," + page;
        } else {
            markPage = page.toString();
        }
        grading.setMarkedPages(markPage);
        tAssignmentGradingJPA.saveAndFlush(grading);
        return result;
    }

    /**************************************************************************
     * Description:??????-??????????????????????????????
     *
     * @author????????????
     * @date ???2017-3-20
     **************************************************************************/
    public String saveReportImageNew(String imageString, Integer page, String imagePath) {

        if (imageString == null || imageString.equals("")) {
            return "false";
        }
        String[] imageStrings = imageString.split(",");

        imageString = imageStrings[1];

        Base64.Decoder decoder = Base64.getDecoder();

        try {
            //Base64??????
            byte[] bytes = decoder.decode(imageString);
            for (int i = 0; i < bytes.length; i++) {
                if (bytes[i] < 0) {//??????????????????
                    bytes[i] += 256;
                }
            }

            //??????jpeg??????
            System.out.println(imagePath);
            String filePath = imagePath + "pdf" + page + ".png";
            OutputStream out = new FileOutputStream(filePath);
            out.write(bytes);
            out.flush();
            out.close();
            return filePath;
        } catch (Exception e) {
            return "false";
        }
    }

    /**************************************************************************
     * Description ??????-????????????-????????????-??????pdf??????????????????
     *
     * @author ??????
     * @date 2018???12???12???
     **************************************************************************/
    public Integer submitMarkingNew(String filePath, Integer gradingId, Boolean clean) {
        TAssignmentGrading grading = tAssignmentGradingJPA.getOne(gradingId);
        String markingUrl = "";
        //????????????
        long directoryId = resourceContainerService.createDirectory("????????????/????????????");
        //????????????????????????
        ResourceFileDto resourceFileDto = resourceContainerService.uploadFileToDirectory(new File(filePath), directoryId);
        //?????????????????????true?????????????????????????????????
        if (clean) {
            markingUrl = resourceFileDto.getId().toString();
        } else {
            markingUrl = grading.getMarkingUrl() + "," + resourceFileDto.getId();
        }
        grading.setMarkingUrl(markingUrl);
        tAssignmentGradingJPA.saveAndFlush(grading);
        return gradingId;
    }

    /**************************************************************************
     * Description ??????????????????
     *
     * @author?????????
     * @date ???2021???3???23???
     **************************************************************************/
    @Override
    public TAssignmentGradingVO onlineMarkData(Integer gradingId) {
        //????????????????????????
        TAssignmentGrading grading = tAssignmentGradingJPA.getOne(gradingId);
        TAssignmentGradingVO gradingVO = new TAssignmentGradingVO();
        //???????????????id
        gradingVO.setGradingId(grading.getAccessmentgradingId());
        //????????????????????????id
        gradingVO.setAssignmentId(grading.getTAssignment().getId());
        //??????????????????????????????
        gradingVO.setTitle(grading.getTAssignment().getTitle());
        //???????????????
        gradingVO.setCommitContent(grading.getContent());
        //??????
        gradingVO.setGrading(grading.getFinalScore());
        //??????
        gradingVO.setScore(grading.getTAssignment().getTAssignmentAnswerAssign().getScore());
        //????????????
        gradingVO.setComment(grading.getComments());
        //????????????
        gradingVO.setCommitDate(grading.getSubmitdate());
        //??????????????????
        gradingVO.setCheckDate(grading.getGradeTime());
        //????????????
        gradingVO.setFinalGrading(grading.getFinalScore());
        //???????????? 0???????????? 1??????
        gradingVO.setCommitStatus(grading.getIslate());
        //???????????????url
        gradingVO.setFileUrl(grading.getGradeUrl());
        //????????????
        grading.setMarkedPages(null);
        tAssignmentGradingJPA.saveAndFlush(grading);
        return gradingVO;
    }

    /**************************************************************************
     * Description?????????????????????????????????
     *
     * @author?????????
     * @date ???2021???3???11???
     **************************************************************************/
    @Override
    public List<Integer> batchCorrectStudent(List<TAssignmentGradingVO> gradingVOList, String username) {
        List<Integer> gradingIds = new ArrayList<>();
        //??????????????????
        User user = userJPA.getOne(username);
        for (TAssignmentGradingVO gradingVO : gradingVOList) {
            TAssignmentGrading tAssignmentGrading = tAssignmentGradingJPA.getOne(gradingVO.getGradingId());
            tAssignmentGrading.setUserByGradeBy(user);
            //?????????????????????
            tAssignmentGrading.setGradeTime(new Date());
            Double score = null;
            if (gradingVO.getFinalGrading() != null) {
                if (tAssignmentGrading.getTAssignment().getTAssignmentAnswerAssign().getScore().compareTo(gradingVO.getFinalGrading()) == -1) {
                    //???????????????????????????
                    score = tAssignmentGrading.getTAssignment().getTAssignmentAnswerAssign().getScore();
                } else {
                    score = gradingVO.getFinalGrading();
                }
                //????????????
                tAssignmentGrading.setFinalScore(score);
            } else {
                tAssignmentGrading.setGradeTime(null);
            }

            //????????????
            if (!EmptyUtil.isEmpty(gradingVO.getComment())) {
                tAssignmentGrading.setComments(gradingVO.getComment());
            }
            tAssignmentGradingJPA.saveAndFlush(tAssignmentGrading);
            gradingIds.add(gradingVO.getGradingId());
        }
        return gradingIds;
    }

    /**************************************************************************
     * Description???????????????
     *
     * @author?????????
     * @date ???2021???3???11???
     **************************************************************************/
    @Override
    public Result<String> sendBackCommit(Integer gradingId) {
        TAssignmentGrading grading = tAssignmentGradingJPA.getOne(gradingId);
        if (grading == null) {
            return Result.failed("?????????????????????");
        } else {
            //submitTime:0:???????????????1:????????????2:??????????????????????????????,,-1:???????????????
            grading.setSubmitTime(-1);
            tAssignmentGradingJPA.save(grading);
            return Result.ok("?????????");
        }
    }

    /**************************************************************************
     * Description?????????????????????
     *
     * @author?????????
     * @date ???2021???3???11???
     **************************************************************************/
    @Override
    public ConfigShowDTO getAssignmentConfig(String module, String type) {
        Object config = configRedisHashService.get(clientDatabaseContext.getCurrentDataSourceDto().getSchoolName() + "-" + module + "-" + type);
        ConfigShowDTO configShowDTO = null;
        if (config == null) {
            //?????????
            configShowDTO = ConfigShowDTO.configShowDTO();
            configShowDTO.setTitle(clientDatabaseContext.getCurrentDataSourceDto().getSchoolName() + "-" + module + "-" + type);
            if (module.equals("knowledge") && type.equals("assignment")) {
                configShowDTO.setRepeatAssignment(0);
                configShowDTO.setOnlineMarking(0);
            } else if (module.equals("skill") && type.equals("assignment")) {
                configShowDTO.setOnlineMarking(0);
            } else if (module.equals("skill") && type.equals("report")) {
                configShowDTO.setRepeatAssignment(0);
            } else if (module.equals("experience") && type.equals("assignment")) {
                configShowDTO.setRepeatAssignment(0);
                configShowDTO.setOnlineMarking(0);
            }
            configRedisHashService.put(clientDatabaseContext.getCurrentDataSourceDto().getSchoolName() + "-" + module + "-" + type, JSON.toJSONString(configShowDTO));
        } else {
            configShowDTO = JSON.parseObject(config.toString(), ConfigShowDTO.class);
        }
        return configShowDTO;
    }

    /**************************************************************************
     * Description?????????????????????
     *
     * @author?????????
     * @date ???2021???3???11???
     **************************************************************************/
    @Override
    public ConfigShowDTO saveAssignmentConfig(ConfigShowDTO configShowDTO) {
        configRedisHashService.put(configShowDTO.getTitle(), JSON.toJSONString(configShowDTO));
        return configShowDTO;
    }

    /**************************************************************************
     * Description:????????????-??????????????????
     * @throws ParseException
     *
     * @author?????????
     * @date ???2020???7???22???
     **************************************************************************/
    @Override
    @Transactional
    public boolean saveRepateAssignment(TAssignmentVO tAssignmentVO, Integer siteId, String username) {
        boolean res = true;
        //???????????????????????????????????????
        String repeatTitles[] = tAssignmentVO.getRepeatTitles();
        if (tAssignmentVO.getRepeatNum() == null && repeatTitles.length==0 ) {
            return false;
        }
        //??????????????????
        if (tAssignmentVO.getRepeatNum() == null && repeatTitles != null) {
            for (int i = 0; i < repeatTitles.length; i++) {
                //???????????????????????????????????????????????????????????????
                if ((repeatTitles[i].equals("") || repeatTitles[i] == null)) {
                    res = false;
                    break;
                }
                //??????????????????????????????????????????????????????vo?????????vo????????????
                tAssignmentVO.setTitle(repeatTitles[i]);
                tAssignmentVO.setStartDate(tAssignmentVO.getRepeatStarts()[i]);
                tAssignmentVO.setEndDate(tAssignmentVO.getRepeatEnds()[i]);
                tAssignmentVO.setRequirement(tAssignmentVO.getRepeatRequirements()[i]);
                //??????????????????
                Integer assignmentId = this.saveAssignment(tAssignmentVO, siteId, username);
//            //???????????????
//            System.out.println("????????????createGradeBook??????");
            this.createGradeBook(siteId, assignmentId, "skill");
//            //??????????????????
//            knowledgeService.correctIslate(assignmentId);
//            //?????????????????????????????????t_assignment_grading???
//                this.gradeEnd(siteId, assignmentId);
            }
        } else {
            //????????????
            for (int i = 0; i < tAssignmentVO.getRepeatNum(); i++) {
                //??????????????????
                Integer assignmentId = this.saveAssignment(tAssignmentVO, siteId, username);
//            //???????????????
//            System.out.println("????????????createGradeBook??????");
            this.createGradeBook(siteId, assignmentId, "skill");
//            //??????????????????
//            knowledgeService.correctIslate(assignmentId);
//            //?????????????????????????????????t_assignment_grading???
//                this.gradeEnd(siteId, assignmentId);
            }
        }

        return res;
    }

    /**************************************************************************
     * Description???????????????????????????????????????
     *
     * @author?????????
     * @date ???2021???3???11???
     **************************************************************************/
    @Override
    public List<GroupCorrectedVO> findAssignmentGroupMember(Integer assignmentId) {
        List<TCourseSiteGroup> groupList = tCourseSiteGroupJPA.findAssignmentGroup(assignmentId);
        List<GroupCorrectedVO> groupVOList = new ArrayList<>();
        for (TCourseSiteGroup tCourseSiteGroup : groupList) {
            GroupCorrectedVO groupCorrectedVO = new GroupCorrectedVO();
            List<DistributionDTO> dtoList = new ArrayList<>();
            List<String> usernameList = new ArrayList<>();
            for (String username : tCourseSiteGroup.getDescription().split(",")) {
                usernameList.add(username);
            }
            List<User> userList = userJPA.findByUsernames(usernameList);
            for (User user:userList){
                DistributionDTO distributionDTO = new DistributionDTO();
                distributionDTO.setUsername(user.getUsername());
                distributionDTO.setCname(user.getCname());
            }
            groupCorrectedVO.setDistributionDTOList(dtoList);

            groupCorrectedVO.setGroupId(tCourseSiteGroup.getId());
            groupVOList.add(groupCorrectedVO);
        }
        return groupVOList;
    }
    /**************************************************************************
     * Description????????????????????????
     *
     * @author????????????
     * @date ???2018-2-05
     **************************************************************************/
    @Override
    public boolean createGradeBook(Integer cid, Integer assignmentId, String module) {
        //????????????
        TAssignment tAssignment = tAssignmentJPA.getOne(assignmentId);
        //??????????????????
        TCourseSite tCourseSite = tCourseSiteJPA.getOne(cid);
        //???????????????????????????????????????
        TAssignmentControl tAssignmentControl = tAssignment.getTAssignmentControl();
        //??????????????????????????????????????????????????????
        if ("yes".equals(tAssignmentControl.getToGradebook())) {
            TExperimentSkill tExperimentSkill = null;
            if (tAssignment.getWkFolder() != null) {
                if (tAssignment.getWkFolder().getWkLesson() != null) {
                    tExperimentSkill = tExperimentSkillJPA.findTExperimentSkillByChapterId(tAssignment.getWkFolder().getWkLesson().getId());
                }
                if (tAssignment.getWkFolder().getWkChapter() != null) {
                    tExperimentSkill = tExperimentSkillJPA.findTExperimentSkillByChapterId(tAssignment.getWkFolder().getWkChapter().getId());
                }
            }
            String result;
            JSONObject response = null;
                if(tExperimentSkill != null){
                    result = transcriptFeign.createGradeBook(cid,tCourseSite.getTitle(),assignmentId.toString(),tAssignment.getTitle(),
                            tAssignment.getType(),new BigDecimal(1).doubleValue(),module,tExperimentSkill.getId(),tExperimentSkill.getExperimentName(),
                            null,null,null,null,tExperimentSkill.getExperimentIsopen());
                }else{
                    result = transcriptFeign.createGradeBook(cid,tCourseSite.getTitle(),assignmentId.toString(),tAssignment.getTitle(),
                            tAssignment.getType(),new BigDecimal(1).doubleValue(),module,null,null,
                            null,null,null,null,null);
                }
                response = JSONObject.parseObject(result);
                if (response.getString("state").equals("success")) {
                    return true;
                } else {
                    return false;
                }

        } else {
            return true;
        }
    }
    /**************************************************************************
     * Description??????????????????????????????
     *
     * @author????????????
     * @date ???2018-2-05
     **************************************************************************/
    @Override
    public void saveGradebook(Integer cid, Integer gradingId) {
        System.out.println("??????saveGradebook??????");
        //?????????????????????
        TAssignmentGrading tAssignmentGrade = tAssignmentGradingJPA.getOne(gradingId);
        //??????id????????????
        TAssignment tAssignment = tAssignmentGrade.getTAssignment();
        //???????????????????????????????????????
        TAssignmentControl tAssignmentControl = tAssignment.getTAssignmentControl();
        //??????????????????????????????????????????????????????
        if ("yes".equals(tAssignmentControl.getToGradebook())) {
            //???????????????????????????
            List<TAssignmentGrading> tAssignmentGradings = tAssignmentGradingJPA.findTAssignmentGradingByIdAndUsername(tAssignment.getId(), tAssignmentGrade.getUserByStudent().getUsername());
            BigDecimal highScore = new BigDecimal(0);
            //?????????????????????????????????????????????????????????
            for (TAssignmentGrading tAssignmentGrading : tAssignmentGradings) {
                if (tAssignmentGrading.getFinalScore() != null && tAssignmentGrading.getFinalScore().compareTo(highScore.doubleValue()) == 1) {
                    highScore = new BigDecimal(tAssignmentGrading.getFinalScore());
                }
            }
            System.out.println("?????????????????????saveRecord???????????????:" + transcriptFeign.saveRecord(cid,tAssignment.getId().toString(),highScore.doubleValue(),tAssignmentGrade.getUserByStudent().getUsername(),tAssignmentGrade.getUserByStudent().getCname(),null,null,null));
        }
    }

    @Override
    public void batchSaveGradebook(Integer cid,String[] usernames,Double finalScore,Integer assignmentId) {
        List<net.gvsun.transcript.external.UserVo> list = new ArrayList<>();
        for (String username : usernames) {
            net.gvsun.transcript.external.UserVo vo = new net.gvsun.transcript.external.UserVo();
            vo.setUsername(username);
            vo.setCname(userJPA.getOne(username).getCname());
            vo.setFinalScore(finalScore);
            list.add(vo);
        }
        transcriptFeign.batchSaveRecord(cid,assignmentId.toString(), list);
    }


    @Override
    public List<GroupCategoryVO> getGroupCategoryBySiteId(Integer siteId) {
        List<GroupCategoryVO> resultList = new ArrayList<>();
        QueryWrapper<GroupCategory> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("site_id",siteId);
        List<GroupCategory> list = groupCategoryService.list(queryWrapper);
        list.forEach(groupCategory -> {
            GroupCategoryVO vo = new GroupCategoryVO();
            BeanUtils.copyProperties(groupCategory,vo);
            resultList.add(vo);
        });
        return resultList;
    }

    @Override
    public List<TCourseSiteGroupVO> getGroupByCategoryId(Integer categoryId) {
        List<TCourseSiteGroupVO> resultList = new ArrayList<>();
        QueryWrapper<net.gvsun.gswork.datasource.entity.TCourseSiteGroup> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("category_id",categoryId);
        List<net.gvsun.gswork.datasource.entity.TCourseSiteGroup> list = tCourseSiteGroupService.list(queryWrapper);
        list.forEach(tCourseSiteGroup -> {
            TCourseSiteGroupVO vo = new TCourseSiteGroupVO();
            BeanUtils.copyProperties(tCourseSiteGroup,vo);
            resultList.add(vo);
        });
        return resultList;
    }

    @Override
    public List<UserVo> getGroupUsersPage(Integer groupId,Integer page,Integer pageSize) {
        List<UserVo> list = new ArrayList<>();
        String sql = " SELECT " +
                " u.username, " +
                " u.cname " +
                " FROM " +
                " user_group ug " +
                " JOIN t_course_site_user tcsu ON ug.user_id = tcsu.id " +
                " JOIN `user` u ON tcsu.username = u.username " +
                " WHERE " +
                " ug.group_id =:groupId " +
                " LIMIT :start,:pageSize ";
        Query nativeQuery = entityManager.createNativeQuery(sql);
        nativeQuery.setParameter("groupId",groupId);
        nativeQuery.setParameter("start",(page-1)*pageSize);
        nativeQuery.setParameter("pageSize",pageSize);
        List<Object[]> resultList = nativeQuery.getResultList();
        resultList.forEach(objects -> {
            UserVo vo = new UserVo();
            vo.setUsername(objects[0].toString());
            vo.setCname(objects[1].toString());
            list.add(vo);
        });
        return list;
    }

    @Override
    public Integer getGroupUsersSize(Integer groupId) {
        QueryWrapper<UserGroup> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("group_id",groupId);
        return userGroupService.count(queryWrapper);
    }

    @Override
    public void saveGroupCategory(Integer categoryId, Integer siteId, String name) {
        GroupCategory groupCategory = new GroupCategory();
        if(categoryId==null){//??????
            groupCategory.setSiteId(siteId);
        }else{//??????
            groupCategory = groupCategoryService.getById(categoryId);
        }
        groupCategory.setName(name);
        groupCategoryService.saveOrUpdate(groupCategory);
    }

    @Override
    public void saveGroup(Integer groupId, Integer categoryId, String name,Integer siteId) {
        net.gvsun.gswork.datasource.entity.TCourseSiteGroup group = new net.gvsun.gswork.datasource.entity.TCourseSiteGroup();
        if(groupId==null){//??????
            group.setCategoryId(categoryId);
            group.setSiteId(siteId);
        }else{//??????
            group = tCourseSiteGroupService.getById(groupId);
        }
        //??????????????????
        group.setCreateDate(LocalDateTime.now());
        group.setGroupTitle(name);
        tCourseSiteGroupService.saveOrUpdate(group);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void saveGroupUsers(String[] usernames, Integer groupId,Integer siteId) {
        //???????????????????????????
        QueryWrapper<UserGroup> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("group_id",groupId);
        userGroupService.remove(queryWrapper);
        List<UserGroup> list = new ArrayList<>();
        for (String username : usernames) {
            UserGroup userGroup = new UserGroup();
            userGroup.setGroupId(groupId);
            TCourseSiteUser tcsUser = tCourseSiteUserJPA.findStudentByUsername(username, siteId);
            userGroup.setUserId(tcsUser.getId());
            list.add(userGroup);
        }
        userGroupService.saveBatch(list);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteGroupById(Integer groupId) {
        //????????????????????????
        QueryWrapper<UserGroup> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("group_id",groupId);
        userGroupService.remove(queryWrapper);
        //????????????
        tCourseSiteGroupService.removeById(groupId);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteGroupCategoryById(Integer categoryId) {
        //???????????????????????????????????????
        QueryWrapper<net.gvsun.gswork.datasource.entity.TCourseSiteGroup> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("category_id",categoryId);
        List<net.gvsun.gswork.datasource.entity.TCourseSiteGroup> list = tCourseSiteGroupService.list(queryWrapper);
        list.forEach(tCourseSiteGroup -> deleteGroupById(tCourseSiteGroup.getId()));
        //??????????????????
        groupCategoryService.removeById(categoryId);
    }

    @Override
    public List<UserVo> getSiteStudents(Integer siteId) {
        List<TCourseSiteUser> list = tCourseSiteUserJPA.findSiteStudents(siteId);
        List<UserVo> userVos = new ArrayList<>();
        list.forEach(tCourseSiteUser -> {
            UserVo vo = new UserVo();
            User user = tCourseSiteUser.getUser();
            vo.setUsername(user.getUsername());
            vo.setCname(user.getCname());
            userVos.add(vo);
        });
        return userVos;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void commonWorkBatchComment(String comments, Integer siteId, Integer assignmentId, String[] usernames) {
        List<TAssignmentGrading> list = new ArrayList<>();
        for (String username : usernames) {
            TAssignmentGrading grading = tAssignmentGradingJPA.findCommonWorkLatest(assignmentId, username);
            if(grading==null){
                //???????????????????????????????????????
                initCommonGradingData(username,assignmentId);
                grading = tAssignmentGradingJPA.findCommonWorkLatest(assignmentId, username);
            }
            grading.setComments(comments);
            list.add(grading);
        }
        tAssignmentGradingJPA.saveAll(list);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void commonWorkBatchScore(Double finalScore, Integer siteId, Integer assignmentId, String[] usernames) {
        List<TAssignmentGrading> list = new ArrayList<>();
        for (String username : usernames) {
            TAssignmentGrading grading = tAssignmentGradingJPA.findCommonWorkLatest(assignmentId, username);
            if(grading==null){
                //???????????????????????????????????????
                initCommonGradingData(username,assignmentId);
                grading = tAssignmentGradingJPA.findCommonWorkLatest(assignmentId, username);
            }
            grading.setFinalScore(finalScore);
            list.add(grading);

        }
        tAssignmentGradingJPA.saveAll(list);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void groupWorkGroupComment(String comments, Integer siteId, Integer assignmentId, Integer groupId) {
        List<TAssignmentGrading> list = new ArrayList<>();
        //?????????????????????????????????
        TAssignmentGrading latestGroupGrading = tAssignmentGradingJPA.findLatestGroupSubmitByGroupId(assignmentId, groupId);
        if(latestGroupGrading==null){
            //???????????????????????????????????????????????????????????????????????????????????????
            initGroupWorkGrading(groupId,assignmentId);
            latestGroupGrading = tAssignmentGradingJPA.findLatestGroupSubmitByGroupId(assignmentId, groupId);
        }
        latestGroupGrading.setComments(comments);
        list.add(latestGroupGrading);
        //??????????????????????????????
        List<TAssignmentGrading> studentGradingList = tAssignmentGradingJPA.findGroupStudentGrading(assignmentId, groupId);
        if(studentGradingList.size()==0){
            //???????????????????????????????????????????????????????????????????????????????????????
            initGroupGradingData(groupId,assignmentId,null);
            studentGradingList = tAssignmentGradingJPA.findGroupStudentGrading(assignmentId, groupId);
        }
        studentGradingList.forEach(tAssignmentGrading -> {
            tAssignmentGrading.setComments(comments);
            list.add(tAssignmentGrading);
        });
        //??????????????????
        tAssignmentGradingJPA.saveAll(list);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void groupWorkGroupScore(Double finalScore, Integer siteId, Integer assignmentId, Integer groupId,String username) {
        List<TAssignmentGrading> list = new ArrayList<>();
        //?????????????????????????????????
        TAssignmentGrading latestGroupGrading = tAssignmentGradingJPA.findLatestGroupSubmitByGroupId(assignmentId, groupId);
        if(latestGroupGrading==null){
            //???????????????????????????????????????????????????????????????????????????????????????
            initGroupWorkGrading(groupId,assignmentId);
            latestGroupGrading = tAssignmentGradingJPA.findLatestGroupSubmitByGroupId(assignmentId, groupId);
        }
        latestGroupGrading.setUserByGradeBy(userJPA.getOne(username));
        latestGroupGrading.setGradeTime(new Date());
        latestGroupGrading.setFinalScore(finalScore);
        list.add(latestGroupGrading);
        //??????????????????????????????
        List<TAssignmentGrading> studentGradingList = tAssignmentGradingJPA.findGroupStudentGrading(assignmentId, groupId);
        if(studentGradingList.size()==0){
            //???????????????????????????????????????????????????????????????????????????????????????
            initGroupGradingData(groupId,assignmentId,null);
            studentGradingList = tAssignmentGradingJPA.findGroupStudentGrading(assignmentId, groupId);
        }
        studentGradingList.forEach(tAssignmentGrading -> {
            tAssignmentGrading.setUserByGradeBy(userJPA.getOne(username));
            tAssignmentGrading.setGradeTime(new Date());
            tAssignmentGrading.setFinalScore(finalScore);
            list.add(tAssignmentGrading);
        });
        //??????????????????
        tAssignmentGradingJPA.saveAll(list);
    }

    @Override
    public List<String> getGroupUserList(Integer groupId) {
        String sql = " SELECT " +
                " tcsu.username " +
                " FROM " +
                " user_group ug " +
                " JOIN t_course_site_user tcsu ON ug.user_id = tcsu.id " +
                " WHERE " +
                " ug.group_id =:groupId ";
        Query nativeQuery = entityManager.createNativeQuery(sql);
        nativeQuery.setParameter("groupId",groupId);
        List<String> resultList = nativeQuery.getResultList();
        return resultList;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void groupMemberCommentAndScore(List<GroupMemberVO> voList, Integer siteId, Integer assignmentId, Integer groupId, String username) {
        List<TAssignmentGrading> list = new ArrayList<>();
        List<net.gvsun.transcript.external.UserVo> userVoList = new ArrayList<>();
        //?????????????????????????????????????????????????????????????????????
        List<TAssignmentGrading> studentGradingList = tAssignmentGradingJPA.findGroupStudentGrading(assignmentId, groupId);
        if(studentGradingList.size()==0){
            //???????????????????????????????????????????????????????????????????????????????????????
            initGroupGradingData(groupId,assignmentId,null);
        }
        voList.forEach(groupMemberVO -> {
            //????????????????????????????????????
            TAssignmentGrading grading = tAssignmentGradingJPA.findOneGroupStudentGrading(assignmentId, groupId, groupMemberVO.getUsername());
            grading.setUserByGradeBy(userJPA.getOne(username));
            grading.setGradeTime(new Date());
            grading.setFinalScore(groupMemberVO.getFinalScore());
            grading.setComments(groupMemberVO.getComments());
            list.add(grading);
            //??????uservo
            net.gvsun.transcript.external.UserVo userVo = new net.gvsun.transcript.external.UserVo();
            userVo.setUsername(groupMemberVO.getUsername());
            userVo.setCname(groupMemberVO.getCname());
            userVo.setFinalScore(groupMemberVO.getFinalScore());
            userVoList.add(userVo);
        });
        tAssignmentGradingJPA.saveAll(list);
        //??????????????????????????????
        transcriptFeign.batchSaveRecord(siteId,assignmentId.toString(),userVoList);
    }

    @Override
    public List<GroupMemberVO> groupMemberDisplay(Integer assignmentId, Integer groupId) {
        List<GroupMemberVO> list = new ArrayList<>();
        List<String> usernameList = getGroupUserList(groupId);
        usernameList.forEach(s -> {
            GroupMemberVO vo = new GroupMemberVO();
            vo.setGroupId(groupId);
            vo.setAssignmentId(assignmentId);
            vo.setUsername(s);
            vo.setCname(userJPA.getOne(s).getCname());
            TAssignmentGrading grading = tAssignmentGradingJPA.findOneGroupStudentGrading(assignmentId, groupId, s);
            if(grading!=null){
                vo.setComments(grading.getComments());
                vo.setFinalScore(grading.getFinalScore());
            }
            list.add(vo);
        });
        return list;
    }

    @Override
    public WorkSubmitVO latestCommonWorkSubmitApi(Integer assignmentId, String username) {
        TAssignmentGrading grading = tAssignmentGradingJPA.findCommonWorkLatest(assignmentId, username);
        WorkSubmitVO vo = new WorkSubmitVO();
        if(grading!=null){
            vo.setContent(grading.getContent());
            vo.setUrl(grading.getGradeUrl());
        }
        return vo;
    }

    @Override
    public WorkSubmitVO latestGroupWorkSubmitApi(Integer assignmentId, Integer groupId) {
        TAssignmentGrading grading = tAssignmentGradingJPA.findLatestGroupSubmitByGroupId(assignmentId, groupId);
        WorkSubmitVO vo = new WorkSubmitVO();
        if(grading!=null){
            vo.setContent(grading.getContent());
            vo.setUrl(grading.getGradeUrl());
            vo.setList(JSON.parseArray(grading.getDistribution(),DistributionDTO.class));
        }else{
            String sql = "SELECT\n" +
                    "\tu.username,\n" +
                    "\tu.cname \n" +
                    "FROM\n" +
                    "\tuser_group ug\n" +
                    "\tJOIN t_course_site_user tcsu ON ug.user_id = tcsu.id\n" +
                    "\tJOIN `user` u ON tcsu.username = u.username \n" +
                    "WHERE\n" +
                    "\tug.group_id =:groupId";
            Query nativeQuery = entityManager.createNativeQuery(sql);
            nativeQuery.setParameter("groupId",groupId);
            List<Object[]> resultList = nativeQuery.getResultList();
            List<DistributionDTO> list = new ArrayList<>();
            for (Object[] objects : resultList) {
                DistributionDTO dto = new DistributionDTO();
                dto.setUsername(objects[0].toString());
                dto.setCname(objects[1].toString());
                list.add(dto);
            }
            vo.setList(list);
        }
        return vo;
    }

    @Override
    public List<GroupManageVO> getGroupManageList(Integer siteId) {
        //???????????????????????????????????????????????????????????????list???
        String sql = " SELECT " +
                " u.username, " +
                " u.cname " +
                " FROM " +
                " user_group ug " +
                " JOIN t_course_site_user tcsu ON ug.user_id = tcsu.id " +
                " JOIN `user` u ON tcsu.username = u.username " +
                " WHERE " +
                " ug.group_id =:groupId ";
        Query nativeQuery = entityManager.createNativeQuery(sql);
        //??????
        List<GroupManageVO> list = new ArrayList<>();
        QueryWrapper<GroupCategory> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("site_id",siteId);
        List<GroupCategory> groupCategoryList = groupCategoryService.list(queryWrapper);
        for (GroupCategory groupCategory : groupCategoryList) {
            GroupManageVO categoryVO = new GroupManageVO();
            Integer categoryId = groupCategory.getId();
            categoryVO.setId(categoryId.toString());
            categoryVO.setName(groupCategory.getName());
            list.add(categoryVO);
            //??????
            QueryWrapper<net.gvsun.gswork.datasource.entity.TCourseSiteGroup> queryWrapper1 = new QueryWrapper<>();
            queryWrapper1.eq("category_id",categoryId);
            List<net.gvsun.gswork.datasource.entity.TCourseSiteGroup> groupList = tCourseSiteGroupService.list(queryWrapper1);
            for (net.gvsun.gswork.datasource.entity.TCourseSiteGroup group : groupList) {
                GroupManageVO groupVO = new GroupManageVO();
                Integer groupId = group.getId();
                groupVO.setId(categoryId+"_"+groupId.toString());
                groupVO.setName(group.getGroupTitle());
                groupVO.setPId(categoryId.toString());
                list.add(groupVO);
                //??????
                nativeQuery.setParameter("groupId",groupId);
                List<Object[]> resultList = nativeQuery.getResultList();
                for (Object[] objects : resultList) {
                    GroupManageVO studentVO = new GroupManageVO();
                    studentVO.setId(objects[0].toString());
                    studentVO.setName(objects[1].toString());
                    studentVO.setPId(categoryId+"_"+groupId.toString());
                    list.add(studentVO);
                }
            }
        }
        return list;
    }

    @Override
    public List<UserVo> getUserListGroupCanUse(Integer siteId, Integer categoryId) {
        String sql = " SELECT " +
                " u.username, " +
                " u.cname " +
                " FROM " +
                " user_group ug " +
                " JOIN t_course_site_user tcsu ON ug.user_id = tcsu.id " +
                " JOIN `user` u ON tcsu.username = u.username " +
                " WHERE " +
                " ug.group_id =:groupId ";
        Query nativeQuery = entityManager.createNativeQuery(sql);
        //??????????????????????????????
        List<UserVo> siteStudents = getSiteStudents(siteId);
        //????????????????????????????????????
        QueryWrapper<net.gvsun.gswork.datasource.entity.TCourseSiteGroup> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("category_id",categoryId);
        List<net.gvsun.gswork.datasource.entity.TCourseSiteGroup> groupList = tCourseSiteGroupService.list(queryWrapper);
        List<UserVo> returnList = siteStudents.stream().filter(userVo -> {
            for (net.gvsun.gswork.datasource.entity.TCourseSiteGroup group : groupList) {
                nativeQuery.setParameter("groupId", group.getId());
                List<Object[]> resultList = nativeQuery.getResultList();
                for (Object[] objects : resultList) {
                    if (objects[0].equals(userVo.getUsername())) {
                        return false;
                    }
                }
            }
            return true;
        }).collect(Collectors.toList());
        return returnList;
    }

    @Override
    public Integer getGroupIdByCategoryIdAndStudent(Integer categoryId, String username) {
        String sql = " SELECT tcsu.username FROM user_group ug JOIN t_course_site_user tcsu on ug.user_id = tcsu.id " +
                " WHERE ug.group_id =:groupId ";
        Query nativeQuery = entityManager.createNativeQuery(sql);
        QueryWrapper<net.gvsun.gswork.datasource.entity.TCourseSiteGroup> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("category_id",categoryId);
        List<net.gvsun.gswork.datasource.entity.TCourseSiteGroup> groupList = tCourseSiteGroupService.list(queryWrapper);
        for (net.gvsun.gswork.datasource.entity.TCourseSiteGroup group : groupList) {
            nativeQuery.setParameter("groupId",group.getId());
            List<String> resultList = nativeQuery.getResultList();
            if(resultList.contains(username)){
                return group.getId();
            }
        }
        return -1;
    }

    @Override
    public List<GroupVO> getGroupsByAssignmentId(Integer assignmentId) {
        QueryWrapper<GroupAssignment> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("assignment_id",assignmentId);
        List<GroupAssignment> list = groupAssignmentService.list(queryWrapper);
        List<GroupVO> voList = new ArrayList<>();
        for (GroupAssignment groupAssignment : list) {
            GroupVO groupVO = new GroupVO();
            Integer groupId = groupAssignment.getGroupId();
            TCourseSiteGroup one = tCourseSiteGroupJPA.getOne(groupId);
            groupVO.setGroupId(groupId);
            groupVO.setTitle(one.getGroupTitle());
            groupVO.setCategoryId(one.getCategoryId());
            voList.add(groupVO);
        }
        return voList;
    }

    @Override
    public List<TopConfigVO> getWorkTopInfo(Integer siteId) {
        //?????????????????????
        Map<String,TopConfigVO> map = new HashMap<>();
        List<TopConfigVO> list = new ArrayList<>();
        list.add(new TopConfigVO("??????-??????", "knowledge", "assignment"));
        list.add(new TopConfigVO("??????-????????????","skill","assignment"));
        list.add(new TopConfigVO("??????-????????????","200","report"));
        list.add(new TopConfigVO("??????-????????????","200","data"));
        list.add(new TopConfigVO("??????-????????????","experience","assignment"));
        //???redis???????????????????????????
        Map<String, Object> displayConfig = redisService.getTranscriptConfigFromRedis(siteId);
        String[] strings = new String[]{"allassignment","allexpwork","allexpreport","allexpdata","allexperiencework"};
        for (int i = 0; i < strings.length; i++) {
            if(displayConfig.get(strings[i]).equals(1)){
                map.put(strings[i],list.get(i));
            }
        }
        //???redis???????????????????????????
        Map<String, Object> nameConfig = redisService.getNameConfigFromRedis();
        List<TopConfigVO> returnList = new ArrayList<>();
        if(nameConfig==null){
            redisService.initCourseTemplateConfigToRedis();
        }
        nameConfig = redisService.getNameConfigFromRedis();
        Map<String, Object> finalNameConfig = nameConfig;
        map.forEach((s, topConfigVO) -> {
            if(s.contains("experience")){
                topConfigVO.setName(finalNameConfig.get("allexperience")+"-"+finalNameConfig.get(s).toString());
            }else if(s.contains("exp")){
                topConfigVO.setName(finalNameConfig.get("allskill")+"-"+finalNameConfig.get(s).toString());
            }else{
                topConfigVO.setName(finalNameConfig.get("allknowledge")+"-"+finalNameConfig.get(s).toString());
            }
            returnList.add(topConfigVO);
        });
        return returnList;
    }

}
