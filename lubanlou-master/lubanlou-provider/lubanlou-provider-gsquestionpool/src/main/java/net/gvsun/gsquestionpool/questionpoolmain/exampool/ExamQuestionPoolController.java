package net.gvsun.gsquestionpool.questionpoolmain.exampool;

import net.gvsun.gsquestionpool.dto.UserVo;
import net.gvsun.gsquestionpool.service.common.ShareService;
import net.gvsun.gsquestionpool.service.exampool.ExamQuestionPoolService;
import net.gvsun.gsquestionpool.vo.exampool.ExamMajorTermVO;
import net.gvsun.gsquestionpool.vo.exampool.ExamQuestionPoolVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**************************************************************************
 * Description:试卷库的controller
 *
 * @author:lixueteng
 * @date:2017/12/20 0020
 **************************************************************************/
@Controller
@RequestMapping("/examPool")
public class ExamQuestionPoolController {
    @Autowired
    private ShareService shareService;
    @Autowired
    private ExamQuestionPoolService examQuestionPoolService;
    /**************************************************************************
     * Description 试卷库--手动组卷
     *
     * @author 李雪腾
     * @date 2017年12月05日
     **************************************************************************/
    @RequestMapping("/saveManuallyPool")
    public String saveManuallyPool(HttpServletRequest request, Integer id){
        //手动新增试卷库;;;
        String currUsername = getCurrUser().getUsername();
        String username = currUsername;
        ExamQuestionPoolVO pool=new ExamQuestionPoolVO();
        //试卷标题
        pool.setTitle(request.getParameter("examPoolTitle"));
        //试卷分类
        Integer examQuestionPoolcategory = Integer.valueOf(request.getParameter("category"));
        pool.setCategory(examQuestionPoolcategory);
        pool.setCreateTime(new Date());
        pool.setUsername(username);
        //试卷的总分
        //获取所有的大项
//        if(id==null){};
        String[] sectionIndex = request.getParameterValues("sectionIndex");
        double totalScore = 0;
        List<ExamMajorTermVO> sections=new ArrayList<>();
        if(sectionIndex!=null){for(int i=0;i<sectionIndex.length;i++){
            ExamMajorTermVO majorTerm=new ExamMajorTermVO();
            //获取每个大项的总分
            String sectionTotalScore = request.getParameter("totalscore" + sectionIndex[i]);
            totalScore+=Double.parseDouble(sectionTotalScore);
            //获取每个大项的title
            String sectionTitle= request.getParameter("section"+sectionIndex[i]);
            majorTerm.setTitle(sectionTitle);
            //获取大项中题目的数量
            String itemCount = request.getParameter("itemcount" + sectionIndex[i]);
            majorTerm.setItemcount(Integer.parseInt(itemCount));
            //获取大项中每一个题的分数
            String itemscore = request.getParameter("itemscore"+sectionIndex[i]);
            majorTerm.setItemscore(Double.parseDouble(itemscore));
            //获取大项下面对应的所有的小题的id
            List<Integer> ids=new ArrayList<>();
            String sectionStr = request.getParameter("sectionStr" + sectionIndex[i]);
            String[] idsArray = sectionStr.split(",");
            for(int j=0;j<idsArray.length;j++){
                ids.add(Integer.parseInt(idsArray[j]));
            }
            majorTerm.setItemids(ids);
            sections.add(majorTerm);
            pool.setScore(totalScore);
        }}


        pool.setExamMajorTerms(sections);

        examQuestionPoolService.saveManuallyPool(pool,id);
        return "redirect:/questionPool/testLibrary";
    }

    /**************************************************************************
     * Description 试卷库-自动组卷
     *
     * @author 马帅
     * @date 2017-12-21
     **************************************************************************/
    @RequestMapping("/autoExamSection")
    public String addExamSection(HttpServletRequest request, Integer id){
        //获取当前用户
        String currUsername = getCurrUser().getUsername();
        String username = currUsername;
        //以下获取表单发送的参数
        //试卷库名称
        String examQuestionPoolTitle = request.getParameter("examQuestionPoolTitle");
        //试卷库分类
        Integer examQuestionPoolcategory = Integer.valueOf(request.getParameter("category"));
        //试卷库创建者

        //试卷库创建时间
        Date date = new Date();
        //试卷库总分
        double score = Double.valueOf(request.getParameter("score"));
        //试卷库大项
        List<ExamMajorTermVO> sections=new ArrayList<>();
        //试卷库VO
        ExamQuestionPoolVO pool=new ExamQuestionPoolVO();
        pool.setId(id);
        pool.setTitle(examQuestionPoolTitle);
        pool.setCategory(examQuestionPoolcategory);
        pool.setCreateTime(date);
        pool.setScore(score);
        pool.setUsername(username);

        //获取试卷库大项的页面id集合
        String examSectionIds[] = request.getParameterValues("examSectionId");
        //循环页面上所有的试卷库大项并获取参数值
        if(examSectionIds!=null){
            for(int i=0;i<examSectionIds.length;i++){
                //以下获取表单发送的参数,根据大项的页面id不同区分
                //试卷库大项名称
                String examSectionTitle = request.getParameter("examSectionTitle_"+examSectionIds[i]);
                //试卷库大项的小题数量
                int itemcount = Integer.valueOf(request.getParameter("itemcount_"+examSectionIds[i]));
                //试卷库大项的小题分值
                double itemscore = Double.valueOf(request.getParameter("itemscore_"+examSectionIds[i]));
                //试卷库大项对应的小题
                List<Integer> itemIds = new ArrayList<>();
                //试卷库大项vo
                ExamMajorTermVO examMajorTermVO= new ExamMajorTermVO();
                examMajorTermVO.setTitle(examSectionTitle);
                examMajorTermVO.setItemcount(itemcount);
                examMajorTermVO.setItemscore(itemscore);
                //获取选定的试题库id
                int questionpoolId = Integer.valueOf(request.getParameter("questionpoolId_"+examSectionIds[i]));
                examMajorTermVO.setItemQuestionPoolId(questionpoolId);
                //获取选定的试题库题型
                int questionType = Integer.valueOf(request.getParameter("questionType_"+examSectionIds[i]));
                examMajorTermVO.setItemType(questionType);
                //按照数量随机查询选中试题库下所有小题id
                List<Integer> allItemIds = examQuestionPoolService.findQuestionPoolByCount(examMajorTermVO,questionpoolId,questionType);
                itemIds = getRandomNum(allItemIds,itemcount);
                //添加到试卷库大项对应的小题
                examMajorTermVO.setItemids(itemIds);
                //添加该大项到大项集合
                sections.add(examMajorTermVO);
            }
        }
        //试卷大项放入试卷库
        pool.setExamMajorTerms(sections);
        //保存试卷库
        examQuestionPoolService.saveAutoPool(pool,id);
        return "redirect:/questionPool/testLibrary";
    }


    /**************************************************************************
     * Description 工具方法-获取当前登陆用户
     *
     * @author 罗璇
     * @date 2017年9月7日
     **************************************************************************/
    public UserVo getCurrUser(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserVo userVo = null;
        if(auth!=null&&auth.getPrincipal()!=null){
            String un;
            if(auth.getPrincipal() instanceof User){
                un = ((User)auth.getPrincipal()).getUsername().toString();
            }else{
                un = auth.getPrincipal().toString();
            }
            userVo = shareService.getUserByUsername(un);
        }
        return userVo;
    }

    /**************************************************************************
     * Description 工具方法-返回随机数
     *
     * @author 马帅
     * @date 2017年12月21日
     **************************************************************************/
    public List<Integer> getRandomNum(List<Integer> list, int selected) {
        List<Integer> reList = new ArrayList<Integer>();
        Random random = new Random();
        // 先抽取，备选数量的个数
        if (list.size() >= selected) {
            for (int i = 0; i < selected; i++) {
                // 随机数的范围为0-list.size()-1;
                int target = random.nextInt(list.size());
                reList.add(list.get(target));
                list.remove(target);
            }
        } else {
            selected = list.size();
            for (int i = 0; i < selected; i++) {
                // 随机数的范围为0-list.size()-1;
                int target = random.nextInt(list.size());
                reList.add(list.get(target));
                list.remove(target);
            }
        }
        return reList;
    }

    /**************************************************************************
     * Description 查询计算题库不同类型题目的个数
     *
     * @author 张佳鸣
     * @date 2017年12月25日
     **************************************************************************/
    @RequestMapping("/calcQuestionpoolNum")
    public @ResponseBody
    Map<Integer, String> calcQuestionpoolNum(Integer questionpoolId){
        Map<Integer, String> map = new HashMap<Integer, String>();
        map = examQuestionPoolService.calcQuestionpoolNum(questionpoolId);
        return map;
    }

}
