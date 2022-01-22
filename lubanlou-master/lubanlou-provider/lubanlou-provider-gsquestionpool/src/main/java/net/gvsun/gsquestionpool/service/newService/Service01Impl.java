package net.gvsun.gsquestionpool.service.newService;

import net.gvsun.gsquestionpool.domain.*;
import net.gvsun.gsquestionpool.jpa.*;
import net.gvsun.gsquestionpool.util.EmptyUtil;
import net.gvsun.gsquestionpool.vo.common.CommonVO;
import net.gvsun.gsquestionpool.vo.questionPool.QuestionOptionVo;
import net.gvsun.gsquestionpool.vo.questionPool.QuestionPoolVO;
import net.gvsun.gsquestionpool.vo.questionPool.QuestionVo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.*;
import java.util.function.Consumer;

@Service
public class Service01Impl implements Service01 {
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private TAssignmentQuestionpoolJPA tAssignmentQuestionpoolJPA;
    @Autowired
    private UserJPA userJPA;
    @Autowired
    private QuestionPoolCategoryJPA questionPoolCategoryJPA;
    @Autowired
    private TCourseSiteJPA tCourseSiteJPA;
    @Autowired
    private TAssignmentAnswerJPA tAssignmentAnswerJPA;

    @Override
    public List<CommonVO> findAllQuestionPoolCategory() {
        String sql = "SELECT * FROM questionpool_category";
        Query nativeQuery = entityManager.createNativeQuery(sql);
        List<Object[]> resultList = nativeQuery.getResultList();
        List<CommonVO> list = new ArrayList<>();
        resultList.forEach(objects -> {
            CommonVO commonVO = new CommonVO();
            commonVO.setId(objects[0].toString());
            commonVO.setName(objects[1].toString());
            list.add(commonVO);
        });
        return list;
    }

    @Override
    public List<QuestionPoolVO> findQuestionPoolList(Integer categoryId, Integer type, String title, String owner,Integer page,Integer pageSize) {
        String sql = "SELECT\n" +
                "\tquestionpool_id \n" +
                "FROM\n" +
                "\tt_assignment_questionpool \n" +
                "WHERE\n" +
                "\t1 = 1 \n" ;
        if(categoryId!=null){
            sql += "\tAND category_id =:categoryId \n" ;
        }
        if(type!=null){
            sql += "\tAND type =:type \n" ;
        }
        if(!EmptyUtil.isEmpty(title)){
            sql += "\tAND title LIKE CONCAT( '%',:title, '%' ) \n" ;
        }
        if(!EmptyUtil.isEmpty(owner)){
            sql += "\tAND OWNER LIKE CONCAT('%',:owner,'%')";
        }
        sql += "\tlimit :start,:pageSize";
        Query nativeQuery = entityManager.createNativeQuery(sql);
        if(categoryId!=null){
            nativeQuery.setParameter("categoryId",categoryId);
        }
        if(type!=null){
            nativeQuery.setParameter("type",type);
        }
        if(!EmptyUtil.isEmpty(title)){
            nativeQuery.setParameter("title",title);
        }
        if(!EmptyUtil.isEmpty(owner)){
            nativeQuery.setParameter("owner",owner);
        }
        nativeQuery.setParameter("start",(page-1)*pageSize);
        nativeQuery.setParameter("pageSize",pageSize);
        List<Integer> resultList = nativeQuery.getResultList();
        List<QuestionPoolVO> list = new ArrayList<>();
        resultList.forEach(i -> {
            QuestionPoolVO questionPoolVO = new QuestionPoolVO();
            TAssignmentQuestionpool one = tAssignmentQuestionpoolJPA.findOne(i);
            questionPoolVO.setUsername(one.getUser().getUsername());
            questionPoolVO.setId(i);
            questionPoolVO.setCreateTime(one.getCreatedTime());
            questionPoolVO.setTitle(one.getTitle());
            questionPoolVO.setType(one.getType());
            list.add(questionPoolVO);
        });
        return list;
    }

    @Override
    public Integer countQuestionPoolList(Integer categoryId, Integer type, String title, String owner) {
        String sql = "SELECT\n" +
                "\tcount(questionpool_id) \n" +
                "FROM\n" +
                "\tt_assignment_questionpool \n" +
                "WHERE\n" +
                "\t1 = 1 \n" ;
        if(categoryId!=null){
            sql += "\tAND category_id =:categoryId \n" ;
        }
        if(type!=null){
            sql += "\tAND type =:type \n" ;
        }
        if(!EmptyUtil.isEmpty(title)){
            sql += "\tAND title LIKE CONCAT( '%',:title, '%' ) \n" ;
        }
        if(!EmptyUtil.isEmpty(owner)){
            sql += "\tAND OWNER LIKE CONCAT('%',:owner,'%')";
        }
        Query nativeQuery = entityManager.createNativeQuery(sql);
        if(categoryId!=null){
            nativeQuery.setParameter("categoryId",categoryId);
        }
        if(type!=null){
            nativeQuery.setParameter("type",type);
        }
        if(!EmptyUtil.isEmpty(title)){
            nativeQuery.setParameter("title",title);
        }
        if(!EmptyUtil.isEmpty(owner)){
            nativeQuery.setParameter("owner",owner);
        }
        return Integer.parseInt(nativeQuery.getSingleResult().toString());
    }
    @Transactional(rollbackFor = Exception.class)
    @Override
    public void saveQuestionPool(String title, Integer categoryId, Integer type, Integer questionPoolId, Integer siteId,String username) {
        TAssignmentQuestionpool questionpool = new TAssignmentQuestionpool();
        if(questionPoolId!=null){
            questionpool = tAssignmentQuestionpoolJPA.getOne(questionPoolId);
            questionpool.setModifyTime(new Date());
        }else{
            questionpool.setCreatedTime(new Date());
        }
        questionpool.setTitle(title);
        questionpool.setUser(userJPA.getOne(username));
        questionpool.setType(type);
        questionpool.setQuestionpoolCategory(questionPoolCategoryJPA.getOne(categoryId));
        //处理中间表t_course_questionpool,先删除在添加
        if(questionpool.getTCourseSites()!=null){
            questionpool.getTCourseSites().clear();
        }
        Set<TCourseSite> hashSet = new HashSet<>();
        if(type.equals(2) && siteId!=null) {
            hashSet.add(tCourseSiteJPA.getOne(siteId));
            questionpool.setTCourseSites(hashSet);
        }
        tAssignmentQuestionpoolJPA.save(questionpool);
    }

    @Override
    public void saveQuestionPoolCategory(String title, Integer categoryId) {
        QuestionpoolCategory questionpoolCategory = new QuestionpoolCategory();
        if (categoryId != null){
            questionpoolCategory = questionPoolCategoryJPA.findOne(categoryId);
        }
        questionpoolCategory.setTitle(title);
        questionPoolCategoryJPA.save(questionpoolCategory);
    }

    @Override
    public List<QuestionVo> findQuestionList(Integer questionPoolId, Integer page, Integer pageSize, String name, Integer type, Integer flag) {
        List<QuestionVo> questionVos = new ArrayList<QuestionVo>();
        String sql = "select tai from TAssignmentQuestionpool taq join taq.TAssignmentItems tai where taq.questionpoolId =:questionPoolId ";
        if(!EmptyUtil.isEmpty(name)){
            sql += " and tai.description like concat('%',:name,'%') ";
        }
        if(type!=null){
            sql += " and tai.type =:type ";
        }
        if(flag!=null){
            sql += " and tai.flag =:flag ";
        }
        Query query = entityManager.createQuery(sql);
        query.setParameter("questionPoolId",questionPoolId);
        if(!EmptyUtil.isEmpty(name)){
            query.setParameter("name",name);
        }
        if(type!=null){
            query.setParameter("type",type);
        }
        if(flag!=null){
            query.setParameter("flag",flag);
        }
        query.setFirstResult((page-1)*pageSize);
        query.setMaxResults(pageSize);

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
            //放入试题标志
            questionDto.setFlag(tAssignment.getFlag());
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
                if(itemAnswer.length()>0){
                    itemAnswer = itemAnswer.substring(0,itemAnswer.length() - 1);
                    questionDto.setItemOptions(itemOptions);
                    questionDto.setItemAnswer(itemAnswer);
                }

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
            if (tAssignment.getType()==5){
                questionDto.setIsOrder(tAssignment.getIsOrder()==null?1:tAssignment.getIsOrder());
            }
            questionVos.add(questionDto);
        }
        return questionVos;
    }

    @Override
    public Integer countQuestionList(Integer questionPoolId, String name, Integer type, Integer flag) {
        String sql = "select count(tai) from TAssignmentQuestionpool taq join taq.TAssignmentItems tai where taq.questionpoolId =:questionPoolId ";
        if(!EmptyUtil.isEmpty(name)){
            sql += " and tai.description like concat('%',:name,'%') ";
        }
        if(type!=null){
            sql += " and tai.type =:type ";
        }
        if(flag!=null){
            sql += " and tai.flag =:flag ";
        }
        Query query = entityManager.createQuery(sql);
        query.setParameter("questionPoolId",questionPoolId);
        if(!EmptyUtil.isEmpty(name)){
            query.setParameter("name",name);
        }
        if(type!=null){
            query.setParameter("type",type);
        }
        if(flag!=null){
            query.setParameter("flag",flag);
        }
        return Integer.parseInt(query.getSingleResult().toString());
    }
}
