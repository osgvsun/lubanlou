    package net.gvsun.gsexam.service.test;

    import net.gvsun.gsexam.dto.common.UserVo;
    import net.gvsun.gsexam.vo.exam.TCourseSiteVo;
    import net.gvsun.gsexam.vo.test.TestDetailVo;
    import net.gvsun.gsexam.vo.test.TestInfoVO;
    import net.gvsun.gsexam.vo.test.TestSectionVO;

    import java.math.BigDecimal;
    import java.util.List;
    import java.util.Map;

    /**************************************************************************
     * Description:测试service
     *
     * @author:lixueteng
     * @date:2018/1/18 0018
     **************************************************************************/
    public interface TestInfoService {

        /**************************************************************************
         * Description 保存测试
         *
         * @param testInfoVO 新建测试信息vo
         * @return 新建测试的id
         * @author lixueteng
         * @date 2018-01-18
         **************************************************************************/
        public Integer saveTest(TestInfoVO testInfoVO, UserVo userVo, Integer cid, String projectName);
        /**************************************************************************
         * Description 测试列表
         *
         * @param cid 站点id
         * @return  测试VO集合
         * @author lixueteng
         * @date 2018-01-18
         **************************************************************************/
        public List<TestInfoVO> findAllTest(UserVo userVo, String authorityName, Integer id, Integer dictionary);
        /**************************************************************************
         * Description 开始测试 获取当前测试是否还有再次作答的次数
         *
         * @author lixueteng
         * @date 2017-11-2
         * @param testId 测试的ID
         * @param userVo 当前登录人
         * @return 当前测试的剩余提交次数
         **************************************************************************/
        public Integer getTestIsCanAnswer(Integer testId, UserVo userVo);

        /**************************************************************************
         * Description 开始测试，获取测试题目数据
         *
         * @author lixueteng
         * @date 2017-09-17
         **************************************************************************/
        public TestDetailVo getExamDetail(Integer testId, String username, Integer currpage, Integer pageSize);
        /**************************************************************************
         * Description 开始测试，保存测试记录
         *
         * @author lixueteng
         * @date 2018-01-24
         **************************************************************************/
        public void saveTAssignmentItemMapping(Map<String, String[]> map, int assignmentId, Integer submitTime, UserVo userVo);
        /**************************************************************************
         * Description 开始测试，测试成绩保存
         *
         * @author lixueteng
         * @date 2018-01-24
         **************************************************************************/
        Integer saveTAssignmentGrade(Map<String, String[]> answerMap, int assignmentId, Integer submitTime, BigDecimal totalScore, String username);
        /**************************************************************************
         * Description 开始测试，保存成绩到成绩册
         *
         * @author lixueteng
         * @date 2018-01-24
         **************************************************************************/
        public void saveGradebook(Integer cid, int assignmentId, Integer tAssignmentGradeId, UserVo userVo, String apiGateWayHost, String jwtToken);
        /**************************************************************************
         *Description 查询测试题目
         * @author 黄浩
         * @date 2020年10月20日
         **************************************************************************/
        public TestSectionVO getTestDetail(Integer testId,Integer page,Integer pageSize);
        /**************************************************************************
         *Description 测试复制获取测试题目
         * @author fubowen
         * @date 2021-8-24
         **************************************************************************/
        public TestSectionVO getTestDetailNew(Integer testId,Integer page,Integer pageSize);
        /**************************************************************************
         *Description 复制测试
         * @author 黄浩
         * @date 2020年10月20日
         **************************************************************************/
        public boolean copyTest(Integer sourceTestId, Integer targetSiteId, TestSectionVO testSectionVO,String username);
        /**************************************************************************
         *Description 查询拥有课程复制后的相同章节或小节
         * @author 黄浩
         * @date 2020年10月21日
         **************************************************************************/
        public List<TCourseSiteVo> findCopySite(Integer cid, Integer assignmentId);
    }
