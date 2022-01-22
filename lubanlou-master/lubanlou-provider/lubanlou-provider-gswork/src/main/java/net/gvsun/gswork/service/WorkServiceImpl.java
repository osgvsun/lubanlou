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
     * Description 作业列表
     *
     * @author 黄浩
     * @date 2021年3月3日
     **************************************************************************/
    @Override
    public List<TAssignmentVO> assignmentList(Integer cid, Integer chapterType, String type, Integer isGroup, Integer page, Integer limit, String search) {
        List<TAssignmentVO> voList = new ArrayList<>();
        search = search == null ? "" : search;
        List<TAssignment> tAssignmentList = tAssignmentJPA.findTAssignmentIdBySiteIdPageSearch(cid, chapterType, type, isGroup, search, (page - 1) * limit, limit);
        //页面只显示id，标题，状态值(开始结束状态，用时间判断)
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
     * Description 作业列表数量
     *
     * @author 黄浩
     * @date 2021年3月3日
     **************************************************************************/
    @Override
    public Integer assignmentListCount(Integer cid, Integer chapterType, String type, Integer isGroup, String search) {
        search = search == null ? "" : search;
        List<TAssignment> tAssignmentList = tAssignmentJPA.findTAssignmentIdBySiteIdSearch(cid, chapterType, type, isGroup, search);
        return tAssignmentList.size();
    }

    /**************************************************************************
     * Description:保存作业
     *
     * @author：李雪腾
     * @date ：2018-2-05
     **************************************************************************/
    @Override
    @Transactional
    public Integer saveAssignment(TAssignmentVO tAssignmentVO, Integer cid, String username) {
        //标志 用来判断是新增 还是 编辑 默认是新增
        boolean flag = true;
        if (tAssignmentVO.getId() != null) {
            flag = false;
        }
        //获取当前用户
        User user = userJPA.getOne(username);
        TAssignment tAssignment = null;
        //没有id表示是新增
        if (flag) {
            tAssignment = new TAssignment();
            //作业的类型 assignment是作业
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
        //保存一部分数据
        tAssignment.setTitle(tAssignmentVO.getTitle());
        //作业的要求
        tAssignment.setContent(tAssignmentVO.getRequirement());
        //作业所属站点
        tAssignment.setSiteId(cid);
        //状态 1发布0未发布
        tAssignment.setStatus(1);
        //创建时间
        tAssignment.setCreatedTime(DateFormatUtil.stringToDate1(tAssignmentVO.getStartDate()));
        tAssignment.setUser(user);
        //普通作业0 还是小组作业1
        if (tAssignmentVO.getIsGroup() != null) {
            tAssignment.setIsGroup(tAssignmentVO.getIsGroup());
        }
        //1全部修改0部分修改
        if (tAssignmentVO.getIsAllModeify() != null) {
            tAssignment.setIsCheckAll(tAssignmentVO.getIsAllModeify());
        }
        //作业是否需要提交：1.需要；0.不需要
        if (tAssignmentVO.getIsNeedCommit() != null) {
            tAssignment.setNeedSubmit(tAssignmentVO.getIsNeedCommit());
        }
        //先保存考试所属文件夹
        WkFolder wkFolder = null;
        if (flag) {
            //新建作业
            wkFolder = new WkFolder();
            if (tAssignment.getType().equals("report")) {
                wkFolder.setType(200);
            } else if (tAssignment.getType().equals("data")) {
                wkFolder.setType(206);
            } else {
                //4 作业
                wkFolder.setType(4);
            }
        } else {
            //编辑作业
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
                //1知识 2技能 3体验
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
        //保存文件夹
        wkFolder = wkFolderJPA.save(wkFolder);
        tAssignment.setWkFolder(wkFolder);
        //记录考试的控制表
        TAssignmentControl tAssignmentControl = null;
        if (flag) {
            tAssignmentControl = new TAssignmentControl();
        } else {
            tAssignmentControl = tAssignment.getTAssignmentControl();
        }
        //记录考试的设置表
        TAssignmentAnswerAssign tAssignmentAssign = null;
        if (flag) {
            tAssignmentAssign = new TAssignmentAnswerAssign();
        } else {
            tAssignmentAssign = tAssignment.getTAssignmentAnswerAssign();
        }
        tAssignment.setTAssignmentControl(null);
        tAssignment.setTAssignmentAnswerAssign(null);
        tAssignment = tAssignmentJPA.saveAndFlush(tAssignment);
        //设置开始时间和结束时间
        tAssignmentControl.setStartdate(DateFormatUtil.stringToDate1(tAssignmentVO.getStartDate()));
        tAssignmentControl.setDuedate(DateFormatUtil.stringToDate1(tAssignmentVO.getEndDate()));
        tAssignmentControl.setTAssignment(tAssignment);
        //获取次数限制
        tAssignmentControl.setTimelimit(tAssignmentVO.getCommitTime());
        //yes成绩发布到成绩册no 不发布
        tAssignmentControl.setToGradebook(tAssignmentVO.getIsToGradebook() == 1 ? "yes" : "no");
        //yes成绩公布给学生no不公布
        tAssignmentControl.setGradeToStudent(tAssignmentVO.getIsGradeToStudent() == 1 ? "yes" : "no");
        //yes成绩计入总成绩no不计入
        tAssignmentControl.setGradeToTotalGrade(tAssignmentVO.getIsGradeToTotalGrade() == 1 ? "yes" : "no");
        //学生提交作业的形式，1表示输入文字或上传附件，2表示仅文字，3表示仅附件
        if (tAssignmentVO.getCommitType() != null) {
            tAssignmentControl.setSubmitType(tAssignmentVO.getCommitType());
        }
        //是否在线批阅 1是 0否
        if (tAssignmentVO.getRemarkStyle() != null) {
            tAssignmentControl.setIsOnlineMarking(tAssignmentVO.getRemarkStyle());
        }
        //是否允许迟交
        tAssignmentControl.setSubmitLate(tAssignmentVO.getSubmitLate());
        //附件格式
        tAssignmentControl.setAppendixType(tAssignmentVO.getAppendixType());
        //是否开启查重
        tAssignmentControl.setIsDuplicateChecking(tAssignmentVO.getIsDuplicateChecking());
        tAssignmentControl = tAssignmentControlJPA.saveAndFlush(tAssignmentControl);
        //保存作业的设置表
        if (tAssignmentAssign == null) {
            tAssignmentAssign = new TAssignmentAnswerAssign();
        }
        tAssignmentAssign.setUser(user);
        //设置分数
//        tAssignmentAssign.setScore(tAssignmentVO.getScore());
        tAssignmentAssign.setScore(100.00);
        tAssignmentAssign.setTAssignment(tAssignment);
        tAssignmentAssign = tAssignmentAnswerAssignJPA.saveAndFlush(tAssignmentAssign);
        tAssignment.setTAssignmentControl(tAssignmentControl);
        tAssignment.setTAssignmentAnswerAssign(tAssignmentAssign);
        //给作业排序，初始值和id保持一致
        tAssignment.setSequence(tAssignment.getId());
        //tAssignmentControlDAO.flush();
        //保存附件
        if (tAssignmentVO.getFileUrl() != null && tAssignmentVO.getFileUrl() != "") {
            tAssignment.setTeacherFilePath(tAssignmentVO.getFileUrl());
        }
        tAssignment = tAssignmentJPA.saveAndFlush(tAssignment);

        //如果是无需提交的作业
        if (tAssignment.getNeedSubmit() != null && tAssignmentVO.getIsNeedCommit() != null) {
            if (tAssignmentVO.getIsNeedCommit() == 0) {
                gradeEnd(cid, tAssignment.getId());
            }
        }
        return tAssignment.getId();
    }

    /**************************************************************************
     * Description:保存小组作业关系
     *
     * @author：黄浩
     * @date ：2018-2-05
     **************************************************************************/
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void saveAssignmentGroup(Integer assignmentId, List<String> usernameArr, Integer groupNum, Integer cid, Integer flag, List<String> groupTitles) {

        //flag来源:0小组，1：自选
        TAssignment tAssignment = tAssignmentJPA.getOne(assignmentId);
        if (flag == 1) {
            List<TCourseSiteGroup> exitGroups = tCourseSiteGroupJPA.findAssignmentGroup(assignmentId);
            if (exitGroups.size() == 0) {
                //如果随机
                if (groupNum != null) {
                    List<String> userVos = tCourseSiteUserJPA.getUsernamesBySiteId(cid);
                    //打乱顺序
                    Collections.shuffle(userVos);
                    //拆分list成groupNum个
                    List<List<String>> groupList = shareService.subStringList(userVos, groupNum);
                    for (List<String> group : groupList) {
                        //拼接成以逗号隔开的字符串
                        String usernames = group.stream().collect(Collectors.joining(","));
                        //保存
                        TCourseSiteGroup tCourseSiteGroup = new TCourseSiteGroup();
                        tCourseSiteGroup.setTCourseSite(tCourseSiteJPA.getOne(cid));
                        tCourseSiteGroup.setGroupTitle(tAssignment.getTitle());
                        tCourseSiteGroup.setDescription(usernames);
                        tCourseSiteGroup.setAssignmentId(assignmentId);
                        tCourseSiteGroup.setCreateDate(new Date());
                        tCourseSiteGroupJPA.save(tCourseSiteGroup);
                    }

                } else {
                    //指定新增多个组
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
        //先删除中间表信息
        QueryWrapper<GroupAssignment> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("assignment_id",assignmentId);
        groupAssignmentService.remove(queryWrapper);
        //保存中间表信息
        List<GroupAssignment> list = new ArrayList<>();
        for (Integer groupId : groupIds) {
            GroupAssignment groupAssignment = new GroupAssignment();
            groupAssignment.setAssignmentId(assignmentId);
            groupAssignment.setGroupId(groupId);
            list.add(groupAssignment);
        }
        groupAssignmentService.saveBatch(list);
        //保存作业关联小组类别id
        TAssignment one = tAssignmentJPA.getOne(assignmentId);
        one.setCategoryId(categoryId);
        tAssignmentJPA.save(one);
    }

    @Override
    public void initGroupGrading(Integer assignmentId) {
        TAssignment assignment = tAssignmentJPA.getOne(assignmentId);
        List<TCourseSiteGroup> groupList = tCourseSiteGroupJPA.findAssignmentGroup(assignmentId);
        for (TCourseSiteGroup group : groupList) {
            //保存一条小组成绩记录
            TAssignmentGrading grading = new TAssignmentGrading();
            grading.setTAssignment(assignment);
            grading.setIslate(2);
            grading.setGroupId(group.getId());
            grading.setTimes(0);
            tAssignmentGradingJPA.save(grading);
            //为作业关联的小组及组内学生创建一条记录
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
     * Description:获取未成作业小组的成员
     *
     * @author：黄浩
     * @date ：2018-2-05
     **************************************************************************/
    @Override
    public List<UserVo> notInGroupStudents(Integer cid, Integer assignmentId, String exitUsernames) {
        List<TCourseSiteGroup> exitGroups = new ArrayList<>();
        List<TCourseSiteUser> notInGroup = new ArrayList<>();
        List<String> newUsernames = new ArrayList<>();
        exitUsernames = (exitUsernames == null ? "" : exitUsernames);
        //编辑
        if (assignmentId != null) {
            exitGroups = tCourseSiteGroupJPA.findAssignmentGroup(assignmentId);
            //获取已有的学生
            List<String> usernames = exitGroups.stream().map(e -> e.getDescription()).collect(Collectors.toList());
            //组合到一个list
            for (String usernameArr : usernames) {
                for (String username : usernameArr.split(",")) {
                    newUsernames.add(username);
                }
            }
            notInGroup = tCourseSiteUserJPA.notInAssignmentStudent(cid, newUsernames);
        }
        //新增
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
     * Description:作业修改截止时候后校准提交状态
     *
     * @author：黄浩
     * @date ：2020年3月30日
     **************************************************************************/
    @Override
    public void correctIslate(Integer assignmentId) {
        try {
            //获取正常提交与迟交的学生列表
            List<TAssignmentGrading> commitStudents = tAssignmentGradingJPA.findCommitStudents(assignmentId);
            if (commitStudents.size() > 0) {
                //获取当前作业信息
                TAssignment tAssignment = tAssignmentJPA.getOne(assignmentId);
                //截止时间
                Date end = tAssignment.getTAssignmentControl().getDuedate();
                for (TAssignmentGrading tAssignmentGrading : commitStudents) {
                    //学生提交时间
                    Date submitDate = tAssignmentGrading.getSubmitdate();
                    if (submitDate.getTime() < end.getTime()) {
                        tAssignmentGrading.setIslate(0);//正常提交校准
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
     * Description 作业截止功能，无需提交就可以打分方法
     *
     * @author：李雪腾
     * @date ：2018-3-14
     **************************************************************************/
    @Override
    @Transactional
    public void gradeEnd(Integer cid, Integer assignmentId) {
        //获取站点
        TCourseSite tCourseSite = tCourseSiteJPA.getOne(cid);
        List<TAssignmentGrading> tAssignmentGradings = this.findTAssignmentGradingList(assignmentId, 1, new TAssignmentGrading());
        //未提交作业的学生列表
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
        //标记位：作业截止sql为0，作业无需提交可以打分为1
        int flag = 0;
        if (tAssignment.getNeedSubmit() != null) {
            if (tAssignment.getNeedSubmit() == 0) {
                flag = 1;
            }
        }
        //作业截止功能sql
        int i = 1;
        if (flag == 0) {
            for (TCourseSiteUser t : notCommitStudents) {
                insertUser.append("(?").append(i).append(",?").append(i + 1).append(",'1','2'),");
                i = i + 2;
            }
        }
        //无需提交就能打分sql
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
     * Description 根据作业的id和user 获取学生的提交情况
     *
     * @author：李雪腾
     * @date ：2018-3-14
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
        if (flag != 0) {//如果不是学生则只能看到每个学生的最新提交记录
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
     * Description 根据作业的id获取作业的信息
     *
     * @author：李雪腾
     * @date ：2018-3-14
     **************************************************************************/
    @Override
    public TAssignmentVO getTAssignmentInfoByAssignmentId(Integer cid, Integer assignmentId) {
        TAssignmentVO tAssignmentVO = new TAssignmentVO();
        //根据作业的id获取作业
        TAssignment tAssignment = tAssignmentJPA.getOne(assignmentId);
        //获取作业控制表
        TAssignmentControl tAssignmentControl = tAssignment.getTAssignmentControl();
        //作业的标题
        tAssignmentVO.setTitle(tAssignment.getTitle());
        //作业的要求
        tAssignmentVO.setRequirement(tAssignment.getContent());
        //设置是知识 技能 体验
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
        //获取作业类型 普通作业 还是小组作业 0是普通1是小组
        tAssignmentVO.setFolderId(tAssignment.getWkFolder().getId());
        tAssignmentVO.setType(tAssignment.getIsGroup());
        tAssignmentVO.setMins(tAssignment.getMins());
        //设置章节 获取章节的id

        //获取课时的id
        //判断有可能就是在章节下面 所以就没有小节
        if (tAssignment.getWkFolder().getWkLesson() != null) {
            tAssignmentVO.setLessonId(tAssignment.getWkFolder().getWkLesson().getId());
        }
        //作业的id
        tAssignmentVO.setId(tAssignment.getId());
        if (tAssignmentControl != null) {
            //获取开始时间
            tAssignmentVO.setStartDate(DateFormatUtil.dateToString1(tAssignmentControl.getStartdate()));
            //获取结束时间
            tAssignmentVO.setEndDate(DateFormatUtil.dateToString1(tAssignmentControl.getDuedate()));
            //是否作业添加到成绩册 默认是1
            tAssignmentVO.setIsToGradebook(tAssignmentControl.getToGradebook().equals("yes") ? 1 : 0);
            //是否将成绩公布给学生
            tAssignmentVO.setIsGradeToStudent(tAssignmentControl.getGradeToStudent().equals("yes") ? 1 : 0);
            //是否将成绩计入总成绩
            tAssignmentVO.setIsGradeToTotalGrade(tAssignmentControl.getGradeToTotalGrade().equals("yes") ? 1 : 0);
            //是否允许迟交
            tAssignmentVO.setSubmitLate(tAssignmentControl.getSubmitLate());
            //提交的附件格式
            tAssignmentVO.setAppendixType(tAssignmentControl.getAppendixType());
        }
        //批改的形式
        tAssignmentVO.setIsAllModeify(tAssignment.getIsCheckAll());
        //是否需要提交
        tAssignmentVO.setIsNeedCommit(tAssignment.getNeedSubmit());
        //批阅的形式 0 离线 1在线
        if (tAssignmentControl != null) {
            tAssignmentVO.setRemarkStyle(tAssignmentControl.getIsOnlineMarking());
            //提交的形式
            tAssignmentVO.setCommitType(tAssignmentControl.getSubmitType());
            //提交的次数
            tAssignmentVO.setCommitTime(tAssignmentControl.getTimelimit());
            //是否开启查重
            tAssignmentVO.setIsDuplicateChecking(tAssignmentControl.getIsDuplicateChecking());
        }
        //作业的分数
        if (tAssignment.getTAssignmentAnswerAssign() != null) {
            tAssignmentVO.setScore(tAssignment.getTAssignmentAnswerAssign().getScore());
        }
        tAssignmentVO.setFileUrl(tAssignment.getTeacherFilePath());
        //获取上传的文件信息
        return tAssignmentVO;
    }

    /**************************************************************************
     * Description  删除作业
     *
     * @author：李雪腾
     * @date ：2018-3-14
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
     * Description  提交作业列表
     *
     * @author：黄浩
     * @date ：2021年3月10日
     **************************************************************************/
    @Override
    public List<TAssignmentGradingVO> correctedByTeacherData(Integer assignmentId, Integer page, Integer limit, String search, String submitDate,Integer islate,Integer siteId) {
        search = search == null ? "" : search;
        islate = islate==null?0:islate;
//        submitDate = submitDate == null ? "" : submitDate;
        List<TAssignmentGradingVO> already = new ArrayList<>();//正常提交
        List<TAssignmentGradingVO> notYet = new ArrayList<>();//未提交
        List<TAssignmentGradingVO> late = new ArrayList<>();//迟交
        List<TAssignmentGradingVO> reSubmit = new ArrayList<>();//需重新提交
        //查询学生最新一次提交
        List<TAssignmentGrading> dataList = tAssignmentGradingJPA.findNewCommitList(assignmentId);
        List<TCourseSiteUser> userlist = tCourseSiteUserJPA.findStudentBySiteId(siteId);
        List<TAssignmentGrading> finalDataList = dataList;
        //通过比较课程用户与成绩表，筛选出没有记录的即为未提交
        List<TCourseSiteUser> collect = userlist.stream().filter(tCourseSiteUser -> {
            for (TAssignmentGrading grading : finalDataList) {
                if (grading.getUserByStudent().getUsername().equals(tCourseSiteUser.getUser().getUsername())) {
                    return false;
                }
            }
            return true;
        }).collect(Collectors.toList());
        //收集未提交名单
        collect.forEach(tCourseSiteUser -> {
            TAssignmentGradingVO vo = new TAssignmentGradingVO();
            User user = tCourseSiteUser.getUser();
            vo.setUsername(user.getUsername());
            vo.setCname(user.getCname());
            notYet.add(vo);
        });
        for (TAssignmentGrading grading : dataList) {
            TAssignmentGradingVO gradingVO = new TAssignmentGradingVO();
            //设置成绩的id
            gradingVO.setGradingId(grading.getAccessmentgradingId());
            //成绩对应的作业的id
            gradingVO.setAssignmentId(assignmentId);
            //成绩对应的作业的标题
            gradingVO.setTitle(grading.getTAssignment().getTitle());
            //获取成绩的学生
            User gradingUser = grading.getUserByStudent();
            gradingVO.setUsername(gradingUser.getUsername());
            gradingVO.setCname(gradingUser.getCname());
            //提交的内容
            gradingVO.setCommitContent(grading.getContent());
            //成绩
            gradingVO.setGrading(grading.getFinalScore());
            //总分
            gradingVO.setScore(grading.getTAssignment().getTAssignmentAnswerAssign().getScore());
            //教师评语
            gradingVO.setComment(grading.getComments());
            //提交时间
            gradingVO.setCommitDate(grading.getSubmitdate());
            //教师批阅时间
            gradingVO.setCheckDate(grading.getGradeTime());
            //最终成绩
            gradingVO.setFinalGrading(grading.getFinalScore());
            //提交状态 0正常提交 1迟交
            gradingVO.setCommitStatus(grading.getIslate());
            //上传文档的url
            gradingVO.setFileUrl(grading.getGradeUrl());
            gradingVO.setSimilarity(grading.getSimilarity() == null ? "该作业未开启查重" : grading.getSimilarity().toString());
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
        List<TAssignmentGradingVO> returnList = new ArrayList<>();//返回结果
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
     * Description  提交作业列表总数
     *
     * @author：黄浩
     * @date ：2021年3月10日
     **************************************************************************/
    @Override
    public Integer correctedByTeacherDataCount(Integer assignmentId,String search, String submitDate,Integer islate,Integer siteId) {
        search = search == null ? "" : search;
        islate = islate==null?0:islate;
//        submitDate = submitDate == null ? "" : submitDate;
        List<TAssignmentGradingVO> already = new ArrayList<>();//正常提交
        List<TAssignmentGradingVO> notYet = new ArrayList<>();//未提交
        List<TAssignmentGradingVO> late = new ArrayList<>();//迟交
        List<TAssignmentGradingVO> reSubmit = new ArrayList<>();//需重新提交
        //查询学生最新一次提交
        List<TAssignmentGrading> dataList = tAssignmentGradingJPA.findNewCommitList(assignmentId);
        List<TCourseSiteUser> userlist = tCourseSiteUserJPA.findStudentBySiteId(siteId);
        List<TAssignmentGrading> finalDataList = dataList;
        //通过比较课程用户与成绩表，筛选出没有记录的即为未提交
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
        //收集未提交名单
        collect.forEach(tCourseSiteUser -> {
            TAssignmentGradingVO vo = new TAssignmentGradingVO();
            User user = tCourseSiteUser.getUser();
            vo.setUsername(user.getUsername());
            vo.setCname(user.getCname());
            notYet.add(vo);
        });
        for (TAssignmentGrading grading : dataList) {
            TAssignmentGradingVO gradingVO = new TAssignmentGradingVO();
            //设置成绩的id
            gradingVO.setGradingId(grading.getAccessmentgradingId());
            //成绩对应的作业的id
            gradingVO.setAssignmentId(assignmentId);
            //成绩对应的作业的标题
            gradingVO.setTitle(grading.getTAssignment().getTitle());
            //获取成绩的学生
            User gradingUser = grading.getUserByStudent();
            gradingVO.setUsername(gradingUser.getUsername());
            gradingVO.setCname(gradingUser.getCname());
            //提交的内容
            gradingVO.setCommitContent(grading.getContent());
            //成绩
            gradingVO.setGrading(grading.getFinalScore());
            //总分
            gradingVO.setScore(grading.getTAssignment().getTAssignmentAnswerAssign().getScore());
            //教师评语
            gradingVO.setComment(grading.getComments());
            //提交时间
            gradingVO.setCommitDate(grading.getSubmitdate());
            //教师批阅时间
            gradingVO.setCheckDate(grading.getGradeTime());
            //最终成绩
            gradingVO.setFinalGrading(grading.getFinalScore());
            //提交状态 0正常提交 1迟交
            gradingVO.setCommitStatus(grading.getIslate());
            //上传文档的url
            gradingVO.setFileUrl(grading.getGradeUrl());
            gradingVO.setSimilarity(grading.getSimilarity() == null ? "该作业未开启查重" : grading.getSimilarity().toString());
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
     * Description：作业评语和作业的打分
     *
     * @author：李雪腾
     * @date ：2018-2-05
     **************************************************************************/
    @Override
    public Integer updateTAssignmentGrading(Integer gradingId, String content, Double finalScore, String username,Integer assignmentId) {
        //获取成绩信息
        TAssignmentGrading tAssignmentGrading = tAssignmentGradingJPA.getOne(gradingId);
        TAssignment one = tAssignmentJPA.getOne(assignmentId);
        //获取当前用户
        User user = userJPA.getOne(username);
        //没有提交记录的话，为学生创建一条，用于教师打分
        if(tAssignmentGrading==null){
            TAssignmentGrading grading = new TAssignmentGrading();
            grading.setTAssignment(one);
            grading.setUserByStudent(user);
            grading.setIslate(2);
            tAssignmentGrading = tAssignmentGradingJPA.save(grading);
        }
        tAssignmentGrading.setUserByGradeBy(user);
        //作业的批改日期
        tAssignmentGrading.setGradeTime(new Date());
        Double score = null;
        if (finalScore != null) {
            if (tAssignmentGrading.getTAssignment().getTAssignmentAnswerAssign().getScore().compareTo(finalScore) == -1) {
                //超过分值则赋为满分
                score = tAssignmentGrading.getTAssignment().getTAssignmentAnswerAssign().getScore();
            } else {
                score = finalScore;
            }
        } else {
            tAssignmentGrading.setGradeTime(null);
        }
        //设置分数
        tAssignmentGrading.setFinalScore(score);
        //设置评语
        if (!EmptyUtil.isEmpty(content)) {
            tAssignmentGrading.setComments(content.trim());
        }
        return tAssignmentGradingJPA.saveAndFlush(tAssignmentGrading).getAccessmentgradingId();
    }

    /**************************************************************************
     * Description：作业评语和作业的批量打分
     *
     * @author：黄浩
     * @date ：2021年3月11日
     **************************************************************************/
    @Override
    public List<Integer> batchCorrect(Integer assignmentId, String students, String content, Double finalScore, String username) {
        List<Integer> gradingIds = new ArrayList<>();
        List<String> usernames = new ArrayList<>();
        for (String student : students.split(",")) {
            usernames.add(student);
        }
        //获取成绩信息
        List<TAssignmentGrading> dataList = tAssignmentGradingJPA.batchCorrectData(assignmentId, usernames);
        //获取当前用户
        User user = userJPA.getOne(username);
        for (TAssignmentGrading tAssignmentGrading : dataList) {

            tAssignmentGrading.setUserByGradeBy(user);
            //作业的批改日期
            tAssignmentGrading.setGradeTime(new Date());
            Double score = null;
            if (finalScore != null) {
                if (tAssignmentGrading.getTAssignment().getTAssignmentAnswerAssign().getScore().compareTo(finalScore) == -1) {
                    //超过分值则赋为满分
                    score = tAssignmentGrading.getTAssignment().getTAssignmentAnswerAssign().getScore();
                } else {
                    score = finalScore;
                }
                //设置分数
                tAssignmentGrading.setFinalScore(score);
            } else {
                tAssignmentGrading.setGradeTime(null);
            }

            //设置评语
            if (!EmptyUtil.isEmpty(content)) {
                tAssignmentGrading.setComments(content);
            }
            tAssignmentGradingJPA.saveAndFlush(tAssignmentGrading);
            gradingIds.add(tAssignmentGrading.getAccessmentgradingId());
        }
        return gradingIds;
    }

    /**************************************************************************
     * Description 学生作业列表
     *
     * @author 黄浩
     * @date 2021年3月3日
     **************************************************************************/
    @Override
    public List<TAssignmentVO> studentAssignmentList(Integer cid, Integer chapterType, String type, Integer isGroup, String student, String islate, Integer page, Integer limit, String search) {
        List<TAssignmentVO> voList = new ArrayList<>();
        search = search == null ? "" : search;
        islate = islate == null ? "" : islate;
        List<TAssignment> tAssignmentList = tAssignmentJPA.findStudentTAssignmentIdBySiteIdPageSearch(cid, chapterType, type, isGroup, student,search, (page - 1) * limit, limit);
        //页面只显示id，标题，状态值(开始结束状态，用时间判断)
        for (TAssignment tAssignment : tAssignmentList) {
            TAssignmentVO tAssignmentVO = new TAssignmentVO();
            tAssignmentVO.setId(tAssignment.getId());
            tAssignmentVO.setTitle(tAssignment.getTitle());
            tAssignmentVO.setStartDate(DateFormatUtil.dateToString1(tAssignment.getTAssignmentControl().getStartdate()));
            tAssignmentVO.setEndDate(DateFormatUtil.dateToString1(tAssignment.getTAssignmentControl().getDuedate()));
            //获取作业可提交总次数
            Integer timeLimit = tAssignment.getTAssignmentControl().getTimelimit();
            if (timeLimit == 0)//不限制提交次数
            {
                tAssignmentVO.setTimeLimit(-1);
            } else {//有限制次数
                TAssignmentGrading latestStudentSubmit = tAssignmentGradingJPA.findNormalWorkStudentLatestSubmit(tAssignment.getId(), student);
                Integer submitTime = 0;
                if(latestStudentSubmit!=null){
                    submitTime = latestStudentSubmit.getTimes();
                }
                tAssignmentVO.setTimeLimit(timeLimit - submitTime);
            }
            //查询学生提交记录
            TAssignmentGrading commonWorkLatest = tAssignmentGradingJPA.findCommonWorkLatest(tAssignment.getId(), student);
            //islate：0正常提交；1迟交；2未提交；3需重新提交
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
     * Description 学生学生作业列表数量
     *
     * @author 黄浩
     * @date 2021年3月3日
     **************************************************************************/
    @Override
    public Integer studentAssignmentListCount(Integer cid, Integer chapterType, String type, Integer isGroup, String student, String islate, String search) {
        search = search == null ? "" : search;
        islate = islate == null ? "" : islate;
        List<TAssignment> tAssignmentList = tAssignmentJPA.findStudentTAssignmentIdBySiteIdSearch(cid, chapterType, type, isGroup, student, search);
        return tAssignmentList.size();
    }

    /**************************************************************************
     * Description：保存作业提交内容
     *
     * @author：黄浩
     * @date ：2021年3月22日
     **************************************************************************/
    @Override
    public Result<TAssignmentGradingVO> saveTAssignmentGrading(TAssignmentGradingVO tAssignmentGradingVO, String username) {
        //0:保存草稿 1:提交
        Integer submitTime = tAssignmentGradingVO.getSubmitTime();
        //获取提交作业的学生
        User user = userJPA.getOne(username);
        //获取作业
        TAssignment tAssignment = tAssignmentJPA.getOne(tAssignmentGradingVO.getAssignmentId());
        //判断首次提交，获取创建作业时创建的记录
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
        //学生提交作业对应的作业
        grading.setTAssignment(tAssignment);
        //学生提交的作业对应的文件的url
        grading.setGradeUrl(tAssignmentGradingVO.getFileUrl());
        //学生作业提交的内容
        grading.setContent(tAssignmentGradingVO.getCommitContent());
        //作业对应的学生
        grading.setUserByStudent(user);
        //作业的提交时间
        grading.setSubmitdate(new Date());
        //作业提交标志，0表示仅保存未提交，教师在提交作业列表中不能看1表示已提交
        grading.setSubmitTime(tAssignmentGradingVO.getSubmitTime());
        //是否迟交
        Integer islate = 0;
        //获取当前时间
        Date date = new Date();
        if (date.getTime() > tAssignment.getTAssignmentControl().getDuedate().getTime()) {
            //当前时间大于作业的最晚提交时间
            islate = 1;
        }
        grading.setIslate(islate);

        //查重
        if (tAssignment.getTAssignmentControl().getIsDuplicateChecking() == 1) {
            //获取其他学生所有提交
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
                    System.out.println("判断相似度时报错");
                    e.printStackTrace();
                }
            }
            grading.setSimilarity(maxSim);
        }

        tAssignmentGradingJPA.saveAndFlush(grading);
        return Result.ok(tAssignmentGradingVO);
    }

    /**************************************************************************
     * Description 学生查看作业
     *
     * @author：黄浩
     * @date ：2021年3月23日
     **************************************************************************/
    @Override
    public List<TAssignmentGradingVO> gradingDetailByStudent(Integer assignmentId, String username) {
        List<TAssignmentGradingVO> list = new ArrayList<>();
        //查询学生所有已提交记录,
        List<TAssignmentGrading> gradings = tAssignmentGradingJPA.findAllStudentSubmit(assignmentId, username);
        //学生最新成绩列表
        List<TAssignmentGrading> gradingList = tAssignmentGradingJPA.findNewCommitList(assignmentId);
        if(gradingList.size()>0){
            AtomicInteger index = new AtomicInteger(0);
            TAssignmentGrading grading = new TAssignmentGrading();
            grading = gradingList.stream()
                    .filter(s -> {
                        //每比对一个元素，数值加1
                        index.getAndIncrement();
                        return s.getUserByStudent().getUsername().equals(username);
                    }).findAny().get();
            if(grading==null){
                grading = gradings.get(0);
            }
            TAssignmentGradingVO gradingVO = new TAssignmentGradingVO();
            //设置成绩的id
            gradingVO.setGradingId(grading.getAccessmentgradingId());
            //成绩对应的作业的id
            gradingVO.setAssignmentId(assignmentId);
            //成绩对应的作业的标题
            gradingVO.setTitle(grading.getTAssignment().getTitle());
            //获取成绩的学生
            User gradingUser = grading.getUserByStudent();
            gradingVO.setUsername(gradingUser.getUsername());
            gradingVO.setCname(gradingUser.getCname());
            //提交的内容
            gradingVO.setCommitContent(grading.getContent());
            //成绩
            gradingVO.setGrading(grading.getFinalScore());
            //总分
            gradingVO.setScore(grading.getTAssignment().getTAssignmentAnswerAssign().getScore());
            //教师评语
            gradingVO.setComment(grading.getComments());
            //提交时间
            gradingVO.setCommitDate(grading.getSubmitdate());
            //教师批阅时间
            gradingVO.setCheckDate(grading.getGradeTime());
            //最终成绩
            gradingVO.setFinalGrading(grading.getFinalScore());
            //提交状态 0正常提交 1迟交
            gradingVO.setCommitStatus(grading.getIslate());
            //上传文档的url
            gradingVO.setFileUrl(grading.getGradeUrl());

            gradingVO.setSimilarity(grading.getSimilarity() == null ? "该作业未开启查重" : grading.getSimilarity().toString());

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
     * Description 学生编辑提交作业
     *
     * @author：黄浩
     * @date ：2021年3月23日
     **************************************************************************/
    @Override
    public TAssignmentGradingVO gradingCommitByStudent(Integer assignmentId, String username) {
        //学生最新成绩列表
        List<TAssignmentGrading> gradingList = tAssignmentGradingJPA.findStudentCommitData(assignmentId, username, 0);
        if (gradingList.size() == 0) {
            gradingList = tAssignmentGradingJPA.findStudentCommitData(assignmentId, username, 1);
        }
        TAssignmentGrading grading = gradingList.get(0);
        TAssignmentGradingVO gradingVO = new TAssignmentGradingVO();
        //设置成绩的id
        gradingVO.setGradingId(grading.getAccessmentgradingId());
        //成绩对应的作业的id
        gradingVO.setAssignmentId(assignmentId);
        //成绩对应的作业的标题
        gradingVO.setTitle(grading.getTAssignment().getTitle());
        //获取成绩的学生
        User gradingUser = grading.getUserByStudent();
        gradingVO.setUsername(gradingUser.getUsername());
        gradingVO.setCname(gradingUser.getCname());
        //提交的内容
        gradingVO.setCommitContent(grading.getContent());
        //成绩
        gradingVO.setGrading(grading.getFinalScore());
        //总分
        gradingVO.setScore(grading.getTAssignment().getTAssignmentAnswerAssign().getScore());
        //教师评语
        gradingVO.setComment(grading.getComments());
        //提交时间
        gradingVO.setCommitDate(grading.getSubmitdate());
        //教师批阅时间
        gradingVO.setCheckDate(grading.getGradeTime());
        //最终成绩
        gradingVO.setFinalGrading(grading.getFinalScore());
        //提交状态 0正常提交 1迟交
        gradingVO.setCommitStatus(grading.getIslate());
        //上传文档的url
        gradingVO.setFileUrl(grading.getGradeUrl());

        gradingVO.setSimilarity(grading.getSimilarity() == null ? "该作业未开启查重" : grading.getSimilarity().toString());

        gradingVO.setSubmitTime(grading.getSubmitTime());


//        BigDecimal rank = new BigDecimal(Double.valueOf(gradingVO.getRank()));
//        BigDecimal total = new BigDecimal(Double.valueOf(gradingList.size()));
//
//        BigDecimal percent = rank.divide(total, 2, BigDecimal.ROUND_HALF_EVEN).multiply(new BigDecimal(100.0));
//        gradingVO.setRankPercent(percent.toString() + "%");

        return gradingVO;
    }

    /**************************************************************************
     * Description 学生小组作业列表
     *
     * @author：黄浩
     * @date ：2021年3月23日
     **************************************************************************/
    @Override
    public List<TAssignmentVO> assignmentGroupList(Integer cid, Integer chapterType, String type, String student, Integer page, Integer limit, String search) {
        List<TAssignmentVO> voList = new ArrayList<>();
        search = search == null ? "" : search;
        List<TAssignment> tAssignmentList = tAssignmentJPA.findGroupTAssignmentBySiteIdPageSearch(cid, chapterType, type, student, search, (page - 1) * limit, limit);
        //页面只显示id，标题，状态值(开始结束状态，用时间判断)
        for (TAssignment tAssignment : tAssignmentList) {
            TAssignmentVO tAssignmentVO = new TAssignmentVO();
            tAssignmentVO.setId(tAssignment.getId());
            tAssignmentVO.setTitle(tAssignment.getTitle());
            tAssignmentVO.setStartDate(DateFormatUtil.dateToString1(tAssignment.getTAssignmentControl().getStartdate()));
            tAssignmentVO.setEndDate(DateFormatUtil.dateToString1(tAssignment.getTAssignmentControl().getDuedate()));
            tAssignmentVO.setCategoryId(tAssignment.getCategoryId());
            //先获取该作业所在小组
            TCourseSiteGroup group = tCourseSiteGroupJPA.findAssignmentGroupByStudent(tAssignment.getId(), student);
            TAssignmentGrading latestGroupGrading = tAssignmentGradingJPA.findLatestGroupSubmitByGroupId(tAssignment.getId(), group.getId());
            //islate：0正常提交；1迟交；2未提交；3需重新提交
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
            //获取作业可提交总次数
            Integer timeLimit = tAssignment.getTAssignmentControl().getTimelimit();
            if (timeLimit == 0)//不限制提交次数
            {
                tAssignmentVO.setTimeLimit(-1);
            } else {//有限制次数
                TAssignmentGrading groupLatestSubmit = tAssignmentGradingJPA.getGroupLatestSubmit(tAssignment.getId(), group.getId());
                Integer times = 0;
                //获取已提交次数
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
     * Description 学生小组作业列表数量
     *
     * @author 黄浩
     * @date 2021年3月3日
     **************************************************************************/
    @Override
    public Integer assignmentGroupListCount(Integer cid, Integer chapterType, String type, String student, String search) {
        search = search == null ? "" : search;
        List<TAssignment> tAssignmentList = tAssignmentJPA.findGroupTAssignmentIdBySiteIdSearch(cid, chapterType, type, student, search);
        return tAssignmentList.size();
    }

    /**************************************************************************
     * Description 获取小组分工
     *
     * @author 黄浩
     * @date 2021年3月3日
     **************************************************************************/
    @Override
    public List<DistributionDTO> assignmentDistributionCount(Integer assignmentId, String student) {
        List<DistributionDTO> resultList = new ArrayList<>();
        TCourseSiteGroup group = tCourseSiteGroupJPA.findAssignmentGroupByStudent(assignmentId, student);
        //判断是否有人提交作业
        List<TAssignmentGrading> gradingList = tAssignmentGradingJPA.findGradingBySubmitTimeAndIslate(assignmentId, 2, group.getId(),0);
        if (gradingList.size() > 0) {
            //存在则读取现有的
            resultList = JSON.parseArray(gradingList.get(0).getDistribution(), DistributionDTO.class);
        } else {
            //不存在则读取小组成员信息
            //查询当前登录人所在组
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
     * Description 小组提交作业
     *
     * @author 黄浩
     * @date 2021年3月3日
     **************************************************************************/
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void commitGroupAssignment(TAssignmentGradingVO tAssignmentGradingVO, String student) {
        //判断成绩表中有没有数据，没有则新建
        Integer assignmentId = tAssignmentGradingVO.getAssignmentId();
        TAssignment tAssignment = tAssignmentJPA.getOne(assignmentId);
        Integer groupId = tAssignmentGradingVO.getGroupId();
        TAssignmentGrading tGrading = tAssignmentGradingJPA.findByAssignmentAndGroup(assignmentId, groupId);
        if(tGrading==null){//第一次提交,初始化小组成绩数据
            this.initGroupGradingData(groupId,assignmentId,tAssignmentGradingVO.getDistributionDTOList());
        }
        //判断最新一条记录是提交还是草稿
        TAssignmentGrading grading = new TAssignmentGrading();
        if(tGrading==null){//没提交过就新建一条记录
            grading.setTimes(1);
        }else{
            if(tGrading.getSubmitTime()==1){//最新一条是提交就新建一条记录
                grading.setTimes(tGrading.getTimes()+1);
            }else{//最新一条是草稿就覆盖原有记录
                grading = tGrading;
            }
        }
        grading.setTAssignment(tAssignment);
        grading.setGroupId(groupId);
        grading.setSubmitdate(new Date());
        grading.setContent(tAssignmentGradingVO.getCommitContent());
        grading.setSubmitTime(tAssignmentGradingVO.getSubmitTime());
        grading.setGradeUrl(tAssignmentGradingVO.getFileUrl());
        //是否迟交
        Integer islate = 0;
        //获取当前时间
        Date date = new Date();
        if (date.getTime() > tAssignment.getTAssignmentControl().getDuedate().getTime()) {
            //当前时间大于作业的最晚提交时间
            islate = 1;
        }
        grading.setIslate(islate);
        grading.setDistribution(JSON.toJSONString(tAssignmentGradingVO.getDistributionDTOList()));
        tAssignmentGradingJPA.save(grading);

    }
    /**************************************************************************
     * Description 初始化小组作业成绩表数据
     *
     * @author fubowen
     * @date 2021-8-9
     **************************************************************************/
    @Transactional(rollbackFor = Exception.class)
    public void initGroupGradingData(Integer groupId,Integer assignmentId,List<DistributionDTO> distributionDTOList){
        //先创建小组作业数据，每个组员共用一条数据
//        TAssignmentGrading grading = new TAssignmentGrading();
        TAssignment one = tAssignmentJPA.getOne(assignmentId);
//        grading.setTAssignment(one);
//        grading.setSubmitdate(new Date());
//        grading.setIslate(2);
//        grading.setSubmitTime(1);
//        grading.setGroupId(groupId);
//        grading.setTimes(0);
//        tAssignmentGradingJPA.save(grading);
        //再为每个组员创建一条成绩数据，用于记录教师打分
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
            tGrading.setSubmitTime(2);//2表示是记录组员成绩的数据
            tGrading.setDistribution(JSON.toJSONString(distributionDTOList));
            gradings.add(tGrading);
        });
        tAssignmentGradingJPA.saveAll(gradings);
    }
    /**************************************************************************
     * Description 初始化普通作业作业某个学生成绩表数据
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
     * Description 为了给没提交过的小组作业打分，创建一条小组作业成绩数据
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
     * Description 学生小组查看作业
     *
     * @author：黄浩
     * @date ：2021年3月23日
     **************************************************************************/
    @Override
    public List<TAssignmentGradingVO> groupGradingDetailByStudent(Integer assignmentId,String student,Integer groupId) {
        List<TAssignmentGradingVO> resultList = new ArrayList<>();
        TAssignment tAssignment = tAssignmentJPA.getOne(assignmentId);
        //获取全部学生成绩，根据成绩倒序排列
        List<TAssignmentGrading> list = tAssignmentGradingJPA.findGroupGrading(assignmentId, groupId);
        //查询学生所在小组提交的作业记录
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
            vo.setTitle(tAssignment.getTitle());//作业名称
            vo.setCommitContent(grading.getContent());//提交内容
            vo.setFileUrl(grading.getGradeUrl());//提交附件
            vo.setSubmitTime(grading.getSubmitTime());//提交时间
            if(i==0){
                vo.setCommitStatus(grading.getIslate());//提交状态
                vo.setCheckDate(grading.getGradeTime());//批改时间
                vo.setSimilarity(grading.getSimilarity() == null ? "该作业未开启查重" : grading.getSimilarity().toString());//重复率
                vo.setRank(rank);//排名
                vo.setRankPercent((new BigDecimal(100).subtract(percent)).toString() + "%");//排名百分比
                vo.setComment(grading.getComments());//教师评语
                vo.setFinalGrading(grading.getFinalScore());//批阅结果
            }
            resultList.add(vo);
        }
        return resultList;
    }

    /**
     * 判断作业是否已经分组
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
     * Description 小组作业批改列表
     *
     * @author 黄浩
     * @date 2021年3月3日
     **************************************************************************/
    @Override
    public List<GroupCorrectedVO> groupGradingList(Integer assignmentId, Integer islate, String userSearch, String submitDate, Integer page, Integer limit) {
        submitDate = (submitDate == null ? "" : submitDate);
        //islate标识要查询每个小组作业的提交状态，包括1：全部，2：已提交，3：未提交，4：迟交，5：需重新提交
        List<GroupCorrectedVO> already = new ArrayList<>();//已提交
        List<GroupCorrectedVO> notYet = new ArrayList<>();//未提交
        List<GroupCorrectedVO> late = new ArrayList<>();//迟交
        List<GroupCorrectedVO> reSubmit = new ArrayList<>();//需重新提交
//        List<TAssignmentGrading> gradingList = null;
//        if (EmptyUtil.isEmpty(userSearch)) {
//            gradingList = tAssignmentGradingJPA.findLatestGroupSubmitPage(assignmentId,(page - 1) * limit, limit);
//        } else {
//            //查询学生所在组
//            User user = userJPA.findUSerByCName(userSearch);
//            String student = (user == null ? userSearch : user.getUsername());
//            TCourseSiteGroup group = tCourseSiteGroupJPA.findAssignmentGroupByStudent(assignmentId, student);
//            gradingList = tAssignmentGradingJPA.findLatestGroupSubmitByGroupId(assignmentId,group.getId());
//        }

        //获取本作业，各组最新提交记录
        List<TAssignmentGrading> latestSubmit = tAssignmentGradingJPA.findGroupLatestSubmit(assignmentId);
        //获取本作业关联的小组
        QueryWrapper<GroupAssignment> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("assignment_id",assignmentId);
        List<GroupAssignment> list = groupAssignmentService.list(queryWrapper);
        //遍历这些小组，没有记录的就是未提交
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
        List<GroupCorrectedVO> returnList = new ArrayList<>();//返回的list
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
     * Description 小组作业批改列表数量
     *
     * @author 黄浩
     * @date 2021年3月3日
     **************************************************************************/
    @Override
    public Integer groupGradingListCount(Integer assignmentId, Integer islate, String userSearch) {
        //islate标识要查询每个小组作业的提交状态，包括1：全部，2：已提交，3：未提交，4：迟交，5：需重新提交
        List<GroupCorrectedVO> already = new ArrayList<>();//已提交
        List<GroupCorrectedVO> notYet = new ArrayList<>();//未提交
        List<GroupCorrectedVO> late = new ArrayList<>();//迟交
        List<GroupCorrectedVO> reSubmit = new ArrayList<>();//需重新提交
        //获取本作业，各组最新提交记录
        List<TAssignmentGrading> latestSubmit = tAssignmentGradingJPA.findGroupLatestSubmit(assignmentId);
        //获取本作业关联的小组
        QueryWrapper<GroupAssignment> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("assignment_id",assignmentId);
        List<GroupAssignment> list = groupAssignmentService.list(queryWrapper);
        //遍历这些小组，没有记录的就是未提交
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
     * Description 获取小组成员
     *
     * @author 黄浩
     * @date 2021年3月3日
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
            gradingVO.setUsername(grading.getUserByStudent().getUsername());//用户名
            gradingVO.setCname(grading.getUserByStudent().getCname());//姓名
            gradingVO.setFinalGrading(grading.getFinalScore());//得分
            gradingVO.setComment(grading.getComments());//评语
            gradingVO.setFileUrl(grading.getGradeUrl());//文件
            gradingVO.setCheckDate(grading.getGradeTime());//打分时间
            //分工
            DistributionDTO dis = null;
            if(distributionDTOList!=null){
                dis = distributionDTOList.stream().filter(distributionDTO -> distributionDTO.getUsername().equals(gradingVO.getUsername())).findAny().get();
            }
            disList.add(dis);
            gradingVO.setDistributionDTOList(disList);
            gradingVO.setRank(rank);//排名
            //排名百分比
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
     * Description 技能-实验资源-实验报告-保存pdf图片（优化）
     *
     * @author 黄浩
     * @date 2018年12月12日
     **************************************************************************/
    @Override
    public String saveMarkingImageNew(String pdfDirector, Integer gradingId, Integer page, String imageString, Boolean clean) {
        //分隔符
        String sep = System.getProperty("file.separator");
        //项目目录
        String rootPath = pdfDirector + gradingId + sep;
        //根据主键查询提交记录
        TAssignmentGrading grading = tAssignmentGradingJPA.getOne(gradingId);
        //保存成图片
        String result = this.saveReportImageNew(imageString, page, rootPath);
        //上传至文件服务器
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
     * Description:作业-保存实验报告批阅图片
     *
     * @author：裴继超
     * @date ：2017-3-20
     **************************************************************************/
    public String saveReportImageNew(String imageString, Integer page, String imagePath) {

        if (imageString == null || imageString.equals("")) {
            return "false";
        }
        String[] imageStrings = imageString.split(",");

        imageString = imageStrings[1];

        Base64.Decoder decoder = Base64.getDecoder();

        try {
            //Base64解码
            byte[] bytes = decoder.decode(imageString);
            for (int i = 0; i < bytes.length; i++) {
                if (bytes[i] < 0) {//调整数据异常
                    bytes[i] += 256;
                }
            }

            //生成jpeg图片
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
     * Description 技能-实验资源-实验报告-保存pdf图片（优化）
     *
     * @author 黄浩
     * @date 2018年12月12日
     **************************************************************************/
    public Integer submitMarkingNew(String filePath, Integer gradingId, Boolean clean) {
        TAssignmentGrading grading = tAssignmentGradingJPA.getOne(gradingId);
        String markingUrl = "";
        //创建目录
        long directoryId = resourceContainerService.createDirectory("教学平台/在线批阅");
        //上传至文件服务器
        ResourceFileDto resourceFileDto = resourceContainerService.uploadFileToDirectory(new File(filePath), directoryId);
        //第一次循环回传true，会覆盖之前的批阅记录
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
     * Description 在线批阅数据
     *
     * @author：黄浩
     * @date ：2021年3月23日
     **************************************************************************/
    @Override
    public TAssignmentGradingVO onlineMarkData(Integer gradingId) {
        //学生最新成绩列表
        TAssignmentGrading grading = tAssignmentGradingJPA.getOne(gradingId);
        TAssignmentGradingVO gradingVO = new TAssignmentGradingVO();
        //设置成绩的id
        gradingVO.setGradingId(grading.getAccessmentgradingId());
        //成绩对应的作业的id
        gradingVO.setAssignmentId(grading.getTAssignment().getId());
        //成绩对应的作业的标题
        gradingVO.setTitle(grading.getTAssignment().getTitle());
        //提交的内容
        gradingVO.setCommitContent(grading.getContent());
        //成绩
        gradingVO.setGrading(grading.getFinalScore());
        //总分
        gradingVO.setScore(grading.getTAssignment().getTAssignmentAnswerAssign().getScore());
        //教师评语
        gradingVO.setComment(grading.getComments());
        //提交时间
        gradingVO.setCommitDate(grading.getSubmitdate());
        //教师批阅时间
        gradingVO.setCheckDate(grading.getGradeTime());
        //最终成绩
        gradingVO.setFinalGrading(grading.getFinalScore());
        //提交状态 0正常提交 1迟交
        gradingVO.setCommitStatus(grading.getIslate());
        //上传文档的url
        gradingVO.setFileUrl(grading.getGradeUrl());
        //重置页数
        grading.setMarkedPages(null);
        tAssignmentGradingJPA.saveAndFlush(grading);
        return gradingVO;
    }

    /**************************************************************************
     * Description：小组作业各学生的打分
     *
     * @author：黄浩
     * @date ：2021年3月11日
     **************************************************************************/
    @Override
    public List<Integer> batchCorrectStudent(List<TAssignmentGradingVO> gradingVOList, String username) {
        List<Integer> gradingIds = new ArrayList<>();
        //获取当前用户
        User user = userJPA.getOne(username);
        for (TAssignmentGradingVO gradingVO : gradingVOList) {
            TAssignmentGrading tAssignmentGrading = tAssignmentGradingJPA.getOne(gradingVO.getGradingId());
            tAssignmentGrading.setUserByGradeBy(user);
            //作业的批改日期
            tAssignmentGrading.setGradeTime(new Date());
            Double score = null;
            if (gradingVO.getFinalGrading() != null) {
                if (tAssignmentGrading.getTAssignment().getTAssignmentAnswerAssign().getScore().compareTo(gradingVO.getFinalGrading()) == -1) {
                    //超过分值则赋为满分
                    score = tAssignmentGrading.getTAssignment().getTAssignmentAnswerAssign().getScore();
                } else {
                    score = gradingVO.getFinalGrading();
                }
                //设置分数
                tAssignmentGrading.setFinalScore(score);
            } else {
                tAssignmentGrading.setGradeTime(null);
            }

            //设置评语
            if (!EmptyUtil.isEmpty(gradingVO.getComment())) {
                tAssignmentGrading.setComments(gradingVO.getComment());
            }
            tAssignmentGradingJPA.saveAndFlush(tAssignmentGrading);
            gradingIds.add(gradingVO.getGradingId());
        }
        return gradingIds;
    }

    /**************************************************************************
     * Description：返回修改
     *
     * @author：黄浩
     * @date ：2021年3月11日
     **************************************************************************/
    @Override
    public Result<String> sendBackCommit(Integer gradingId) {
        TAssignmentGrading grading = tAssignmentGradingJPA.getOne(gradingId);
        if (grading == null) {
            return Result.failed("学生未提交作业");
        } else {
            //submitTime:0:保存草稿，1:已提交，2:保存学生最新提交记录,,-1:被打回状态
            grading.setSubmitTime(-1);
            tAssignmentGradingJPA.save(grading);
            return Result.ok("已发回");
        }
    }

    /**************************************************************************
     * Description：获取模板配置
     *
     * @author：黄浩
     * @date ：2021年3月11日
     **************************************************************************/
    @Override
    public ConfigShowDTO getAssignmentConfig(String module, String type) {
        Object config = configRedisHashService.get(clientDatabaseContext.getCurrentDataSourceDto().getSchoolName() + "-" + module + "-" + type);
        ConfigShowDTO configShowDTO = null;
        if (config == null) {
            //初始化
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
     * Description：保存模板配置
     *
     * @author：黄浩
     * @date ：2021年3月11日
     **************************************************************************/
    @Override
    public ConfigShowDTO saveAssignmentConfig(ConfigShowDTO configShowDTO) {
        configRedisHashService.put(configShowDTO.getTitle(), JSON.toJSONString(configShowDTO));
        return configShowDTO;
    }

    /**************************************************************************
     * Description:实验作业-保存重复作业
     * @throws ParseException
     *
     * @author：黄浩
     * @date ：2020年7月22日
     **************************************************************************/
    @Override
    @Transactional
    public boolean saveRepateAssignment(TAssignmentVO tAssignmentVO, Integer siteId, String username) {
        boolean res = true;
        //前端已判断所有元素为空情况
        String repeatTitles[] = tAssignmentVO.getRepeatTitles();
        if (tAssignmentVO.getRepeatNum() == null && repeatTitles.length==0 ) {
            return false;
        }
        //一次新增一条
        if (tAssignmentVO.getRepeatNum() == null && repeatTitles != null) {
            for (int i = 0; i < repeatTitles.length; i++) {
                //判断为空的情况是可能未打开重复作业功能。。
                if ((repeatTitles[i].equals("") || repeatTitles[i] == null)) {
                    res = false;
                    break;
                }
                //将标题、开始时间、结束时间、要求封入vo，其他vo字段不变
                tAssignmentVO.setTitle(repeatTitles[i]);
                tAssignmentVO.setStartDate(tAssignmentVO.getRepeatStarts()[i]);
                tAssignmentVO.setEndDate(tAssignmentVO.getRepeatEnds()[i]);
                tAssignmentVO.setRequirement(tAssignmentVO.getRepeatRequirements()[i]);
                //调用保存方法
                Integer assignmentId = this.saveAssignment(tAssignmentVO, siteId, username);
//            //创建成绩册
//            System.out.println("开始调用createGradeBook方法");
            this.createGradeBook(siteId, assignmentId, "skill");
//            //校准提交状态
//            knowledgeService.correctIslate(assignmentId);
//            //新建作业时学生数据写入t_assignment_grading表
//                this.gradeEnd(siteId, assignmentId);
            }
        } else {
            //批量新增
            for (int i = 0; i < tAssignmentVO.getRepeatNum(); i++) {
                //调用保存方法
                Integer assignmentId = this.saveAssignment(tAssignmentVO, siteId, username);
//            //创建成绩册
//            System.out.println("开始调用createGradeBook方法");
            this.createGradeBook(siteId, assignmentId, "skill");
//            //校准提交状态
//            knowledgeService.correctIslate(assignmentId);
//            //新建作业时学生数据写入t_assignment_grading表
//                this.gradeEnd(siteId, assignmentId);
            }
        }

        return res;
    }

    /**************************************************************************
     * Description：获取作业所有小组以及成员
     *
     * @author：黄浩
     * @date ：2021年3月11日
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
     * Description：创建作业成绩册
     *
     * @author：李雪腾
     * @date ：2018-2-05
     **************************************************************************/
    @Override
    public boolean createGradeBook(Integer cid, Integer assignmentId, String module) {
        //获取作业
        TAssignment tAssignment = tAssignmentJPA.getOne(assignmentId);
        //获取站点信息
        TCourseSite tCourseSite = tCourseSiteJPA.getOne(cid);
        //查询作业（或测验）的控制项
        TAssignmentControl tAssignmentControl = tAssignment.getTAssignmentControl();
        //如果成绩需要加入成绩册，则创建成绩册
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
     * Description：作业成绩计入成绩册
     *
     * @author：李雪腾
     * @date ：2018-2-05
     **************************************************************************/
    @Override
    public void saveGradebook(Integer cid, Integer gradingId) {
        System.out.println("调用saveGradebook方法");
        //获取作业的成绩
        TAssignmentGrading tAssignmentGrade = tAssignmentGradingJPA.getOne(gradingId);
        //根据id获取测验
        TAssignment tAssignment = tAssignmentGrade.getTAssignment();
        //查询作业（或测验）的控制项
        TAssignmentControl tAssignmentControl = tAssignment.getTAssignmentControl();
        //如果成绩需要加入成绩册，则加入成绩册
        if ("yes".equals(tAssignmentControl.getToGradebook())) {
            //查询对应的打分记录
            List<TAssignmentGrading> tAssignmentGradings = tAssignmentGradingJPA.findTAssignmentGradingByIdAndUsername(tAssignment.getId(), tAssignmentGrade.getUserByStudent().getUsername());
            BigDecimal highScore = new BigDecimal(0);
            //循化遍历打分记录把最高成绩保存到成绩册
            for (TAssignmentGrading tAssignmentGrading : tAssignmentGradings) {
                if (tAssignmentGrading.getFinalScore() != null && tAssignmentGrading.getFinalScore().compareTo(highScore.doubleValue()) == 1) {
                    highScore = new BigDecimal(tAssignmentGrading.getFinalScore());
                }
            }
            System.out.println("调用成绩微服务saveRecord返回结果为:" + transcriptFeign.saveRecord(cid,tAssignment.getId().toString(),highScore.doubleValue(),tAssignmentGrade.getUserByStudent().getUsername(),tAssignmentGrade.getUserByStudent().getCname(),null,null,null));
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
        if(categoryId==null){//新增
            groupCategory.setSiteId(siteId);
        }else{//编辑
            groupCategory = groupCategoryService.getById(categoryId);
        }
        groupCategory.setName(name);
        groupCategoryService.saveOrUpdate(groupCategory);
    }

    @Override
    public void saveGroup(Integer groupId, Integer categoryId, String name,Integer siteId) {
        net.gvsun.gswork.datasource.entity.TCourseSiteGroup group = new net.gvsun.gswork.datasource.entity.TCourseSiteGroup();
        if(groupId==null){//新增
            group.setCategoryId(categoryId);
            group.setSiteId(siteId);
        }else{//编辑
            group = tCourseSiteGroupService.getById(groupId);
        }
        //设置编辑时间
        group.setCreateDate(LocalDateTime.now());
        group.setGroupTitle(name);
        tCourseSiteGroupService.saveOrUpdate(group);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void saveGroupUsers(String[] usernames, Integer groupId,Integer siteId) {
        //先删除组内全部用户
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
        //先删除小组内成员
        QueryWrapper<UserGroup> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("group_id",groupId);
        userGroupService.remove(queryWrapper);
        //删除小组
        tCourseSiteGroupService.removeById(groupId);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteGroupCategoryById(Integer categoryId) {
        //先删除类别下的全部小组数据
        QueryWrapper<net.gvsun.gswork.datasource.entity.TCourseSiteGroup> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("category_id",categoryId);
        List<net.gvsun.gswork.datasource.entity.TCourseSiteGroup> list = tCourseSiteGroupService.list(queryWrapper);
        list.forEach(tCourseSiteGroup -> deleteGroupById(tCourseSiteGroup.getId()));
        //删除类别数据
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
                //为该学生初始化一条成绩数据
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
                //为该学生初始化一条成绩数据
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
        //首先给最新的组提交评语
        TAssignmentGrading latestGroupGrading = tAssignmentGradingJPA.findLatestGroupSubmitByGroupId(assignmentId, groupId);
        if(latestGroupGrading==null){
            //对于没有提交记录的小组，为该小组创建一条成绩数据，用于打分
            initGroupWorkGrading(groupId,assignmentId);
            latestGroupGrading = tAssignmentGradingJPA.findLatestGroupSubmitByGroupId(assignmentId, groupId);
        }
        latestGroupGrading.setComments(comments);
        list.add(latestGroupGrading);
        //再给组内学生记录评语
        List<TAssignmentGrading> studentGradingList = tAssignmentGradingJPA.findGroupStudentGrading(assignmentId, groupId);
        if(studentGradingList.size()==0){
            //对于没有提交记录的小组，创建该小组的组员成绩数据，用于打分
            initGroupGradingData(groupId,assignmentId,null);
            studentGradingList = tAssignmentGradingJPA.findGroupStudentGrading(assignmentId, groupId);
        }
        studentGradingList.forEach(tAssignmentGrading -> {
            tAssignmentGrading.setComments(comments);
            list.add(tAssignmentGrading);
        });
        //最后一并保存
        tAssignmentGradingJPA.saveAll(list);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void groupWorkGroupScore(Double finalScore, Integer siteId, Integer assignmentId, Integer groupId,String username) {
        List<TAssignmentGrading> list = new ArrayList<>();
        //首先给最新的组提交评语
        TAssignmentGrading latestGroupGrading = tAssignmentGradingJPA.findLatestGroupSubmitByGroupId(assignmentId, groupId);
        if(latestGroupGrading==null){
            //对于没有提交记录的小组，为该小组创建一条成绩数据，用于打分
            initGroupWorkGrading(groupId,assignmentId);
            latestGroupGrading = tAssignmentGradingJPA.findLatestGroupSubmitByGroupId(assignmentId, groupId);
        }
        latestGroupGrading.setUserByGradeBy(userJPA.getOne(username));
        latestGroupGrading.setGradeTime(new Date());
        latestGroupGrading.setFinalScore(finalScore);
        list.add(latestGroupGrading);
        //再给组内学生记录评语
        List<TAssignmentGrading> studentGradingList = tAssignmentGradingJPA.findGroupStudentGrading(assignmentId, groupId);
        if(studentGradingList.size()==0){
            //对于没有提交记录的小组，创建该小组的组员成绩数据，用于打分
            initGroupGradingData(groupId,assignmentId,null);
            studentGradingList = tAssignmentGradingJPA.findGroupStudentGrading(assignmentId, groupId);
        }
        studentGradingList.forEach(tAssignmentGrading -> {
            tAssignmentGrading.setUserByGradeBy(userJPA.getOne(username));
            tAssignmentGrading.setGradeTime(new Date());
            tAssignmentGrading.setFinalScore(finalScore);
            list.add(tAssignmentGrading);
        });
        //最后一并保存
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
        //判断成绩表有没有组员成绩记录，没有则为其初始化
        List<TAssignmentGrading> studentGradingList = tAssignmentGradingJPA.findGroupStudentGrading(assignmentId, groupId);
        if(studentGradingList.size()==0){
            //对于没有提交记录的小组，创建该小组的组员成绩数据，用于打分
            initGroupGradingData(groupId,assignmentId,null);
        }
        voList.forEach(groupMemberVO -> {
            //保存到本地成绩成绩数据库
            TAssignmentGrading grading = tAssignmentGradingJPA.findOneGroupStudentGrading(assignmentId, groupId, groupMemberVO.getUsername());
            grading.setUserByGradeBy(userJPA.getOne(username));
            grading.setGradeTime(new Date());
            grading.setFinalScore(groupMemberVO.getFinalScore());
            grading.setComments(groupMemberVO.getComments());
            list.add(grading);
            //封装uservo
            net.gvsun.transcript.external.UserVo userVo = new net.gvsun.transcript.external.UserVo();
            userVo.setUsername(groupMemberVO.getUsername());
            userVo.setCname(groupMemberVO.getCname());
            userVo.setFinalScore(groupMemberVO.getFinalScore());
            userVoList.add(userVo);
        });
        tAssignmentGradingJPA.saveAll(list);
        //批量保存成绩到成绩册
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
        //嵌套循环把小组类别、小组、学生都放到返回值list中
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
        //分隔
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
            //分隔
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
                //分隔
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
        //先获取课程下全部用户
        List<UserVo> siteStudents = getSiteStudents(siteId);
        //获取小组类别下的全部小组
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
        //初始化返回数据
        Map<String,TopConfigVO> map = new HashMap<>();
        List<TopConfigVO> list = new ArrayList<>();
        list.add(new TopConfigVO("知识-作业", "knowledge", "assignment"));
        list.add(new TopConfigVO("技能-实验作业","skill","assignment"));
        list.add(new TopConfigVO("技能-实验报告","200","report"));
        list.add(new TopConfigVO("技能-实验数据","200","data"));
        list.add(new TopConfigVO("体验-体验作业","experience","assignment"));
        //从redis里获取显示配置信息
        Map<String, Object> displayConfig = redisService.getTranscriptConfigFromRedis(siteId);
        String[] strings = new String[]{"allassignment","allexpwork","allexpreport","allexpdata","allexperiencework"};
        for (int i = 0; i < strings.length; i++) {
            if(displayConfig.get(strings[i]).equals(1)){
                map.put(strings[i],list.get(i));
            }
        }
        //从redis里获取别名配置信息
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
