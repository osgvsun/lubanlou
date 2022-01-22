package net.gvsun.gsexam.service.pool;

import net.gvsun.gsexam.domain.QuestionpoolCategory;
import net.gvsun.gsexam.domain.TAssignmentAnswer;
import net.gvsun.gsexam.domain.TAssignmentItem;
import net.gvsun.gsexam.domain.TAssignmentQuestionpool;
import net.gvsun.gsexam.dto.common.QuestionpoolCategoryVo;
import net.gvsun.gsexam.dto.common.TAssignmentQuestpoolVo;
import net.gvsun.gsexam.jpa.SystemLogJPA;
import net.gvsun.gsexam.jpa.TAssignmentAnswerJPA;
import net.gvsun.gsexam.jpa.TAssignmentItemJPA;
import net.gvsun.gsexam.jpa.TAssignmentQuestionpoolJPA;
import net.gvsun.gsexam.service.common.ShareService;
import net.gvsun.gsexam.utils.EmptyUtil;
import net.gvsun.gsexam.vo.questionpool.QuestionOptionVo;
import net.gvsun.gsexam.vo.questionpool.QuestionPoolVO;
import net.gvsun.gsexam.vo.questionpool.QuestionVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.*;

@Service("tAssignmentQuestionPoolService")
public class TAssignmentQuestionPoolPoolServiceImpl implements TAssignmentQuestionPoolService {

    @Autowired
    private SystemLogJPA systemLogJPA;
    @Autowired
    private ShareService shareService;
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private TAssignmentQuestionpoolJPA tAssignmentQuestionpoolJPA;
    @Autowired
    private TAssignmentAnswerJPA tAssignmentAnswerJPA;
    @Autowired
    private TAssignmentItemJPA tAssignmentItemJPA;


    /**************************************************************************
     * @Description: 新建考试-选择题库
     * @Author: 罗璇
     * @Date: 2017/9/23 23:04
     **************************************************************************/
    @Override
    public List<TAssignmentQuestpoolVo> findQuestionForAddTest(Integer cid, Integer type, Integer isTest) {
        //题库列表
        List<TAssignmentQuestionpool> pools = new ArrayList<TAssignmentQuestionpool>();
        //课程库
        List<TAssignmentQuestionpool> poolsSite = new ArrayList<TAssignmentQuestionpool>();
        //公共库
        List<TAssignmentQuestionpool> poolsPublic = new ArrayList<TAssignmentQuestionpool>();
        if (type == 2 || type == -1) {
            //查询课程库
            String sql = "select c from TAssignmentQuestionpool c join c.TCourseSites t where 1 = 1 ";
            if (isTest != null && isTest != -1) {//题库还是试卷库
                sql += " and c.isTest = " + isTest;
            }
            sql += " and c.type = 2";
            sql += " and t.id = " + cid;
            sql += " order by c.titleNum,c.title";
            poolsSite = entityManager.createQuery(sql).getResultList();
        }
        if (type == 1 || type == -1) {
            //查询公共库
            String sqlPublic = "select c from TAssignmentQuestionpool c where 1 = 1 ";
            if (isTest != null && isTest != -1) {//题库还是试卷库
                sqlPublic += " and c.isTest = " + isTest;
            }
            sqlPublic += " and c.type = 1";
            sqlPublic += " order by c.titleNum,c.title";
            poolsPublic = entityManager.createQuery(sqlPublic).getResultList();
        }
        pools.addAll(poolsSite);
        pools.addAll(poolsPublic);

        List<TAssignmentQuestpoolVo> rs = new ArrayList<TAssignmentQuestpoolVo>();
        for(TAssignmentQuestionpool tAssignmentQuestionpool:pools){
            TAssignmentQuestpoolVo tAssignmentQuestpoolVo = new TAssignmentQuestpoolVo();
            tAssignmentQuestpoolVo.setQuestionpoolId(tAssignmentQuestionpool.getQuestionpoolId());
            tAssignmentQuestpoolVo.setTitle(tAssignmentQuestionpool.getTitle());
            tAssignmentQuestpoolVo.setTAssignmentItemsSize(tAssignmentQuestionpool.getTAssignmentItems().size());
            rs.add(tAssignmentQuestpoolVo);
        }

        return rs;
    }

    /**************************************************************************
     * @Description: 更新题库池，根据所选的题库类别和是否公共题库
     * @Author: fubowen
     * @Date: 2020-12-17
     **************************************************************************/
    @Override
    public List<TAssignmentQuestpoolVo> updateQuestionPool(Integer cid, Integer type, Integer isTest, Integer categoryId, Integer questionType) {
        //题库列表
        List<TAssignmentQuestionpool> pools = new ArrayList<TAssignmentQuestionpool>();
        //课程库
        List<TAssignmentQuestionpool> poolsSite = new ArrayList<TAssignmentQuestionpool>();
        //公共库
        List<TAssignmentQuestionpool> poolsPublic = new ArrayList<TAssignmentQuestionpool>();
        if (type == 2 || type == -1) {
            //查询课程库
            String sql = "select c from TAssignmentQuestionpool c join c.TCourseSites t where 1 = 1 ";
            if (isTest != null && isTest != -1) {//题库还是试卷库
                sql += " and c.isTest = " + isTest;
            }
            if(categoryId!=null){
                sql += "and c.QuestionpoolCategory.id = " + categoryId;
            }
            sql += " and c.type = 2";
            sql += " and t.id = " + cid;
            sql += " order by c.titleNum,c.title";
            poolsSite = entityManager.createQuery(sql).getResultList();
        }
        if (type == 1 || type == -1) {
            //查询公共库
            String sqlPublic = "select c from TAssignmentQuestionpool c where 1 = 1 ";
            if (isTest != null && isTest != -1) {//题库还是试卷库
                sqlPublic += " and c.isTest = " + isTest;
            }
            if(categoryId!=null){
                sqlPublic += "and c.QuestionpoolCategory.id = " + categoryId;
            }
            sqlPublic += " and c.type = 1";
            sqlPublic += " order by c.titleNum,c.title";
            poolsPublic = entityManager.createQuery(sqlPublic).getResultList();
        }
        pools.addAll(poolsSite);
        pools.addAll(poolsPublic);

        List<TAssignmentQuestpoolVo> rs = new ArrayList<TAssignmentQuestpoolVo>();
        for(TAssignmentQuestionpool tAssignmentQuestionpool:pools){
            TAssignmentQuestpoolVo tAssignmentQuestpoolVo = new TAssignmentQuestpoolVo();
            tAssignmentQuestpoolVo.setQuestionpoolId(tAssignmentQuestionpool.getQuestionpoolId());
            tAssignmentQuestpoolVo.setTitle(tAssignmentQuestionpool.getTitle());
            if(questionType!=null){
                Set<TAssignmentItem> itemSet = tAssignmentQuestionpool.getTAssignmentItems();
                Iterator<TAssignmentItem> iterator = itemSet.iterator();
                int count = 0;
                while(iterator.hasNext()){
                    if(iterator.next().getType().equals(questionType)){
                        count++;
                    }
                }
                tAssignmentQuestpoolVo.setTAssignmentItemsSize(count);
            }else{
                tAssignmentQuestpoolVo.setTAssignmentItemsSize(tAssignmentQuestionpool.getTAssignmentItems().size());
            }
            rs.add(tAssignmentQuestpoolVo);
        }

        return rs;
    }

    /**************************************************************************
     * @Description: 根据题库id，题目类型来获取题库该类题目总数(新建考试-增加题目)
     * @Author: 罗璇
     * @Date: 2017/10/9 21:57
     **************************************************************************/
    @Override
    public Map<String, String> getItemCountStr(Integer questionpoolId,String type) {
        String poolNameString = tAssignmentQuestionpoolJPA.findOne(questionpoolId).getTitle();
        Map<String, String> map = new LinkedHashMap<String, String>();
        String sql = "select count(t) " +
                     "from TAssignmentQuestionpool q join q.TAssignmentItems t " +
                     "where q.questionpoolId = " + questionpoolId +
                     " and t.type = " + type;
        Integer questionpoolQuantity = Integer.valueOf(entityManager.createQuery(sql).getSingleResult().toString());
        map.put("poolNameString",(poolNameString + "(" + questionpoolQuantity + ")"));
        return map;
    }
    /**************************************************************************
     * @Description: 根据题库id，题目数量和题目类型来判断是否超出题库该类题目总数
     * @Author: 罗璇
     * @Date: 2017/10/9 23:00
     **************************************************************************/
    @Override
    public String checkTestItemCount(Integer questionpoolId, Integer quantity, Integer type,Integer gapsNumber) {
        String sql = "select count(t) " +
                    "from TAssignmentQuestionpool q join q.TAssignmentItems t " +
                    "where q.questionpoolId = " + questionpoolId +
                    " and t.type = " + type;
        // 如果是填空题，则需要判断填空题空的个数
        if (type == 8 && gapsNumber != null) {
            sql+="and t.gapsNumber = '" + gapsNumber+"'";
        }
        Integer questionpoolQuantity = Integer.valueOf(entityManager.createQuery(sql).getSingleResult().toString());
        if(questionpoolQuantity >= quantity){
            return "success";
        }else{
            return "failure";
        }
    }

    /**************************************************************************
     * Description 通过itmsId查询小题
     *
     * @author 马帅
     * @date 2017-12-1
     **************************************************************************/
    @Override
    public QuestionVo findQuestionOptionById(Integer itemId) {
        TAssignmentItem tAssignmentItem = tAssignmentItemJPA.findOne(itemId);
        QuestionVo question = new QuestionVo();
        question.setId(tAssignmentItem.getId());
        question.setTitle(tAssignmentItem.getDescription());
        question.setType(tAssignmentItem.getType());

        List<TAssignmentAnswer> answers = tAssignmentAnswerJPA.findAnswersByTAssignmentId(itemId);
        List<QuestionOptionVo> questionOptionVos = new ArrayList<QuestionOptionVo>();
        //试题答案，只需要简答题的试题答案
        String itemAnswer = "";
        for(TAssignmentAnswer answer:answers){
            QuestionOptionVo qoption = new QuestionOptionVo();
            qoption.setOptionNumber(answer.getLabel());
            qoption.setOptionText(answer.getText());
            if(answer.getIscorrect()==1){
                qoption.setIscorrect(1);
                itemAnswer += answer.getText() + "&&";
            }else {
                qoption.setIscorrect(0);
            }
            questionOptionVos.add(qoption);
        }
        itemAnswer = itemAnswer.substring(0,itemAnswer.length() - 2);
        question.setItemAnswer(itemAnswer);
        question.setItemOptions(questionOptionVos);
        return question;
    }
    /**************************************************************************
     * Description 根据题库的id查询题库
     *
     * @author lixueteng
     * @date 2017-12-5
     * @param questionPoolId 题库的id
     * @return 根据id查询出对应的题库的vo
     **************************************************************************/
    @Override
    public QuestionPoolVO findQuestionPoolById(Integer questionPoolId){
        QuestionPoolVO questionPoolVO=new QuestionPoolVO();
        TAssignmentQuestionpool questionpool = tAssignmentQuestionpoolJPA.findOne(questionPoolId);
        questionPoolVO.setId(questionpool.getQuestionpoolId());
        questionPoolVO.setTitle(questionpool.getTitle());
        questionPoolVO.setUsername(questionpool.getUser().getUsername());
        questionPoolVO.setCreateTime(questionpool.getCreatedTime());
        return questionPoolVO;
    }
    /**************************************************************************
     * Description 查看题库的试题
     *
     * @author 马帅
     * @date 2017-11-29
     **************************************************************************/
    @Override
    public List<QuestionVo> findquestionPoolList(Integer id, Integer currpage, String name, Integer type, Integer limit) {
        //通过题库id查询本题库所对应的所有试题
        TAssignmentQuestionpool tAssignmentQuestionpool = tAssignmentQuestionpoolJPA.findOne(id);
        List<QuestionVo> questionVos = new ArrayList<QuestionVo>();
        String ids = "";
        for (TAssignmentItem tAssignmentItem : tAssignmentQuestionpool.getTAssignmentItems()) {
            ids += "'"+tAssignmentItem.getId()+"',";
        }
        if(!ids.equals("")){
            ids= ids.substring(0, ids.length()-1);
        }else {
            ids="''";
        }
        String sql = "select c from TAssignmentItem c where c.id in ("+ids+")";
        if(!EmptyUtil.isEmpty(name)){
            sql+=" and c.description like '%"+ name +"%'";
        }
        if(!EmptyUtil.isEmpty(type)){
            sql += " and c.type="+type;
        }
        Query query = entityManager.createQuery(sql);
        query.setFirstResult((currpage-1)*limit).setMaxResults(limit);

        List<TAssignmentItem> tAssignmentItems = query.getResultList();
        //将试题放入到QuestionVo中
        for(TAssignmentItem tAssignment : tAssignmentItems){
            QuestionVo questionDto = new QuestionVo();
            //放入试题id
            questionDto.setId(tAssignment.getId());
            //放入试题标题（题干）
            if(type==null||type!=8){
                questionDto.setTitle(tAssignment.getDescription());
            }else if(type==8){
                questionDto.setTitle(tAssignment.getDescriptionTemp());
            }
            //放入试题类型
            questionDto.setType(tAssignment.getType());
            //单选与多选题
            if(tAssignment.getType()==1||tAssignment.getType()==4){
                //放入试题选项与试题答案
                List<TAssignmentAnswer> tAssignmentAnswers = tAssignmentAnswerJPA.findAnswersByTAssignmentId(tAssignment.getId());
                List<QuestionOptionVo> itemOptions = new ArrayList<QuestionOptionVo>();
                //试题答案
                String itemAnswer = "";
                for(TAssignmentAnswer tAssignmentAnswer : tAssignmentAnswers){
                    QuestionOptionVo questionOptionDto = new QuestionOptionVo();
                    questionOptionDto.setOptionNumber(tAssignmentAnswer.getLabel());
                    questionOptionDto.setOptionText(tAssignmentAnswer.getText());
                    itemOptions.add(questionOptionDto);
                    //判断改选项是否为正确
                    if(tAssignmentAnswer.getIscorrect()==1){
                        itemAnswer += tAssignmentAnswer.getLabel() + ",";
                    }
                }
                //将答案最后一个,删除
                itemAnswer = itemAnswer.substring(0,itemAnswer.length() - 1);
                questionDto.setItemOptions(itemOptions);
                questionDto.setItemAnswer(itemAnswer);
            } else {
                List<QuestionOptionVo> itemOptions = new ArrayList<QuestionOptionVo>();
                //放入试题选项与试题答案
                List<TAssignmentAnswer> tAssignmentAnswers = tAssignmentAnswerJPA.findAnswersByTAssignmentId(tAssignment.getId());
                //试题答案
                String itemAnswer = "";
                for(TAssignmentAnswer tAssignmentAnswer : tAssignmentAnswers){
                    //判断该选项是否为正确
                    if(tAssignmentAnswer.getIscorrect()==1){
                        itemAnswer += tAssignmentAnswer.getText() + ",";
                    }
                }
                if(!itemAnswer.equals("")){
                    itemAnswer = itemAnswer.substring(0,itemAnswer.length() - 1);
                }
                questionDto.setItemOptions(itemOptions);
                questionDto.setItemAnswer(itemAnswer);
            }
            questionVos.add(questionDto);
        }
        return questionVos;
    }
    /**************************************************************************
     * Description 查询总题目数量
     *
     * @author 马帅
     * @date 2017-12-5
     **************************************************************************/
    @Override
    public Integer countTAssignmentItem(Integer id,String name,Integer type) {
        TAssignmentQuestionpool tAssignmentQuestionpool = tAssignmentQuestionpoolJPA.findOne(id);
        String ids = "";
        for (TAssignmentItem tAssignmentItem : tAssignmentQuestionpool.getTAssignmentItems()) {
            ids += "'"+tAssignmentItem.getId()+"',";
        }
        if(!ids.equals("")){
            ids= ids.substring(0, ids.length()-1);
        }else {
            ids="''";
        }
        String sql = "select c from TAssignmentItem c where c.id in ("+ids+")";
        if(!EmptyUtil.isEmpty(name)){
            sql+=" and c.description like '%"+ name +"%'";
        }
        if(!EmptyUtil.isEmpty(type)){
            sql += " and c.type="+type;
        }
        List<TAssignmentItem> tAssignmentItems = entityManager.createQuery(sql).getResultList();
        return tAssignmentItems.size();
    }
    /**************************************************************************
     * Description 试卷库--根据小题的id获取对应的试题的list
     * @param ids 试题的id
     * @param currpage 第几页
     * @return 查询到的所有的小题
     * @author lixueteng
     * @date 2017年12月27日
     **************************************************************************/
    @Override
    public List<QuestionVo> showAllQuestionByIds(Integer[] ids, Integer currpage, Integer limit){
        List<QuestionVo> returnList=new ArrayList<>();
        Pageable pageable=PageRequest.of(currpage-1,limit);
        Page<TAssignmentItem> itemWithItemIds = tAssignmentItemJPA.findItemWithItemIds(ids,pageable);
        //将试题放入到QuestionVo中
        for(TAssignmentItem tAssignment : itemWithItemIds.getContent()){
            QuestionVo questionDto = new QuestionVo();
            //放入试题id
            questionDto.setId(tAssignment.getId());
            //放入试题标题（题干）
            questionDto.setTitle(tAssignment.getDescription());
            //放入试题类型
            questionDto.setType(tAssignment.getType());
            //单选与多选题
            if(tAssignment.getType()==1||tAssignment.getType()==4){
                //放入试题选项与试题答案
                List<TAssignmentAnswer> tAssignmentAnswers = tAssignmentAnswerJPA.findAnswersByTAssignmentId(tAssignment.getId());
                List<QuestionOptionVo> itemOptions = new ArrayList<QuestionOptionVo>();
                //试题答案
                String itemAnswer = "";
                for(TAssignmentAnswer tAssignmentAnswer : tAssignmentAnswers){
                    QuestionOptionVo questionOptionDto = new QuestionOptionVo();
                    questionOptionDto.setOptionNumber(tAssignmentAnswer.getLabel());
                    questionOptionDto.setOptionText(tAssignmentAnswer.getText());
                    itemOptions.add(questionOptionDto);
                    //判断改选项是否为正确
                    if(tAssignmentAnswer.getIscorrect()==1){
                        itemAnswer += tAssignmentAnswer.getLabel() + ",";
                    }
                }
                //将答案最后一个,删除
                itemAnswer = itemAnswer.substring(0,itemAnswer.length() - 1);
                questionDto.setItemOptions(itemOptions);
                questionDto.setItemAnswer(itemAnswer);
            } else {
                List<QuestionOptionVo> itemOptions = new ArrayList<QuestionOptionVo>();
                //放入试题选项与试题答案
                List<TAssignmentAnswer> tAssignmentAnswers = tAssignmentAnswerJPA.findAnswersByTAssignmentId(tAssignment.getId());
                //试题答案
                String itemAnswer = "";
                for(TAssignmentAnswer tAssignmentAnswer : tAssignmentAnswers){
                    //判断该选项是否为正确
                    if(tAssignmentAnswer.getIscorrect()==1){
                        itemAnswer += tAssignmentAnswer.getText() + ",";
                    }
                }
                if(!itemAnswer.equals("")){
                    itemAnswer = itemAnswer.substring(0,itemAnswer.length() - 1);
                }
                questionDto.setItemOptions(itemOptions);
                questionDto.setItemAnswer(itemAnswer);
            }
            returnList.add(questionDto);
        }

        return returnList;

    }

    /**
     * 根据题库id获取改题库下所有题目的id
     *
     * @param questionPoolId
     * @return
     * @author 罗璇
     * @date 2018年5月7日
     */
    @Override
    public List<Integer> getItemsIdsByPoolId(Integer questionPoolId) {
        String sql = "select tai.id from t_assignment_item tai join " +
                    " t_assignment_questionpool_item taq on tai.id = taq.item_id " +
                    " where taq.questionpool_id = "+questionPoolId;
        List<Integer> rs = entityManager.createNativeQuery(sql).getResultList();
        return rs;
    }
    /**************************************************************************
     * Description get QuestionPool By QuestionPoolId
     *
     * @author Daniel
     * @date 2018-12-11
     **************************************************************************/
    @Override
    public List<TAssignmentQuestpoolVo> getQuestionPoolWithIds(String questionPoolStr){
        //题库列表
        List<TAssignmentQuestionpool> pools = new ArrayList<TAssignmentQuestionpool>();
        //返回的题库数据
        List<TAssignmentQuestpoolVo> rs = new ArrayList<TAssignmentQuestpoolVo>();
        //查询语句
        String sql = "select t  from TAssignmentQuestionpool t where t.questionpoolId in (" + questionPoolStr + ")";
        pools = entityManager.createQuery(sql).getResultList();
        for(TAssignmentQuestionpool tAssignmentQuestionpool:pools){
            TAssignmentQuestpoolVo tAssignmentQuestpoolVo = new TAssignmentQuestpoolVo();
            tAssignmentQuestpoolVo.setQuestionpoolId(tAssignmentQuestionpool.getQuestionpoolId());
            tAssignmentQuestpoolVo.setTitle(tAssignmentQuestionpool.getTitle());
            tAssignmentQuestpoolVo.setTAssignmentItemsSize(tAssignmentQuestionpool.getTAssignmentItems().size());
            rs.add(tAssignmentQuestpoolVo);
        }
        return rs;
    }
    /**************************************************************************
     * Description 查询所有题库类别
     *
     * @author fubowen
     * @date 2020-12-15
     **************************************************************************/
    @Override
    public List<QuestionpoolCategoryVo> getAllQuestionPoolCategory() {
        List<QuestionpoolCategoryVo> list = new ArrayList<>();
        List<QuestionpoolCategory> resultList = entityManager.createNamedQuery("QuestionpoolCategory.findAll").getResultList();
        for (QuestionpoolCategory qc:resultList){
            QuestionpoolCategoryVo qcvo = new QuestionpoolCategoryVo();
            qcvo.setId(qc.getId());
            qcvo.setTitle(qc.getTitle());
            list.add(qcvo);
        }
        return list;
    }
}
