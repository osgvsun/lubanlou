package net.gvsun.gsquestionpool.service.questionPool;

import net.gvsun.gsquestionpool.domain.*;
import net.gvsun.gsquestionpool.dto.UserVo;
import net.gvsun.gsquestionpool.jpa.*;
import net.gvsun.gsquestionpool.util.DateFormatUtil;
import net.gvsun.gsquestionpool.util.EmptyUtil;
import net.gvsun.gsquestionpool.vo.exampool.ExamMajorTermVO;
import net.gvsun.gsquestionpool.vo.exampool.ExamQuestionPoolVO;
import net.gvsun.gsquestionpool.vo.questionPool.*;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by Administrator on 2017/11/29.
 * @author
 */
@Service("questionPoolListService")
public class QuestionPoolListServiceImpl implements QuestionPoolListService {
    @Autowired
    private TAssignmentQuestionpoolJPA tAssignmentQuestionpoolJPA;
    @Autowired
    private TAssignmentItemComponentJPA tAssignmentItemComponentJPA;
    @Autowired
    private TAssignmentAnswerJPA tAssignmentAnswerJPA;
    @Autowired
    private QuestionPoolCategoryJPA questionPoolCategoryJPA;
    @Autowired
    private UserJPA userJPA;
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private TAssignmentItemJPA tAssignmentItemJPA;
    @Autowired
    private ExamQuestionpoolJPA examQuestionpoolJPA;
    @Autowired
    private TCourseSiteJPA tCourseSiteJPA;
    @Autowired
    private ExamSectionJPA examSectionJPA;
    @Autowired
    private TExerciseAnswerRecordJPA tExerciseAnswerRecordJPA;
    /**************************************************************************
     * Description 查看题库的试题
     *
     * @author 马帅
     * @date 2017-11-29
     **************************************************************************/
    @Override
    public List<QuestionVo> findquestionPoolList(Integer id, Integer currpage, String name, Integer type, Integer flag) {
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
        if(!EmptyUtil.isEmpty(flag)){
            sql += " and c.flag="+flag;
        }
        Query query = entityManager.createQuery(sql);
        query.setFirstResult((currpage-1)*10).setMaxResults(10);

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

    /**************************************************************************
     * Description 删除题库的试题
     *
     * @author 马帅
     * @date 2017-12-5
     **************************************************************************/
    @Override
    public void deleteTAssignmentItemById(Integer itemId, Integer questionId) {
        //将试题答案删除
        List<TAssignmentAnswer> tAssignmentAnswers = tAssignmentAnswerJPA.findAnswersByTAssignmentId(itemId);
        for(TAssignmentAnswer t : tAssignmentAnswers){
            tAssignmentAnswerJPA.delete(t);
        }
        //将试题和试题与题库相关的中间包数据删除
        TAssignmentItem tAssignmentItem = tAssignmentItemJPA.findOne(itemId);
        TAssignmentQuestionpool tAssignmentQuestionpool = tAssignmentQuestionpoolJPA.findOne(questionId);
        tAssignmentQuestionpool.getTAssignmentItems().remove(tAssignmentItem);
        tAssignmentQuestionpoolJPA.save(tAssignmentQuestionpool);
        //如果该试题未被测验所使用，则直接删除
        if(tAssignmentItem.getTAssignmentSection()==null){
            tAssignmentItemJPA.delete(tAssignmentItem);
        }
    }

    /**************************************************************************
     * Description 查询总题目数量
     *
     * @author 马帅
     * @date 2017-12-5
     **************************************************************************/
    @Override
    public Integer countTAssignmentItem(Integer id,String name,Integer type,Integer flag) {
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
        if(!EmptyUtil.isEmpty(flag)){
            sql += " and c.flag="+flag;
        }
        List<TAssignmentItem> tAssignmentItems = entityManager.createQuery(sql).getResultList();
        return tAssignmentItems.size();
    }

    /**************************************************************************
     * Description 新增题目
     *
     * @author 马帅
     * @date 2017-12-5
     **************************************************************************/
    @Override
    public void insertTAssignmentItem(String type, String stem, String answerLabel, String answerText, UserVo userVo, String answerLabelChoice, Integer questionPoolId, Integer itemId, Integer isOrder, String sanswerWeight, String singleWeight) {
        //所有选项
        String[] answerLabelChoices = answerLabelChoice.split("`");
        //正确答案
        String[] answerLabels = answerLabel.split("`");
        //答案内容
        String[] answerTexts = answerText.split("`");
        TAssignmentItem tAssignmentItem = new TAssignmentItem();
        if(itemId == null){
            tAssignmentItem.setDescription(stem);
            tAssignmentItem.setUser(userJPA.findOne(userVo.getUsername()));
            //当前时间
            SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            tAssignmentItem.setCreatedTime(DateFormatUtil.stringToDate1(df.format(new Date())));
            tAssignmentItem.setType(Integer.parseInt(type));
            //保存试题
            tAssignmentItemJPA.save(tAssignmentItem);
            //新增单选题或多选题
            if("4".equals(type)||"1".equals(type)) {
                //保存试题答案
                for (int i = 0; i < answerLabelChoices.length; i++) {
                    TAssignmentAnswer tAssignmentAnswer = new TAssignmentAnswer();
                    tAssignmentAnswer.setLabel(answerLabelChoices[i]);
                    tAssignmentAnswer.setText(answerTexts[i]);
                    int iscorrect = 0;
                    for (String string : answerLabels) {
                        if (string.equals(answerLabelChoices[i])) {
                            iscorrect = 1;
                        }
                    }
                    tAssignmentAnswer.setIscorrect(iscorrect);
                    tAssignmentAnswer.setTAssignmentItem(tAssignmentItem);
                    tAssignmentAnswerJPA.save(tAssignmentAnswer);
                }
            }
            //新增判断题
            if("2".equals(type)){
                for (int i = 0;i<answerLabelChoices.length; i++) {
                    TAssignmentAnswer tAssignmentAnswer = new TAssignmentAnswer();
                    tAssignmentAnswer.setLabel(answerLabelChoices[i]);
                    tAssignmentAnswer.setText(answerLabelChoices[i]);
                    int iscorrect = 0;
                    for (String string : answerLabels) {
                        if(string.equals(answerLabelChoices[i])){
                            iscorrect = 1;
                        }
                    }
                    tAssignmentAnswer.setIscorrect(iscorrect);
                    tAssignmentAnswer.setTAssignmentItem(tAssignmentItem);
                    tAssignmentAnswerJPA.save(tAssignmentAnswer);
                }
            }
            //新简答题
            if("5".equals(type)){
                if(answerTexts.length!=0){
                    Set<TAssignmentAnswer> answerList = new HashSet<TAssignmentAnswer>();
                    String answersString = answerTexts[0];
                    String[] answerStrings = answersString.split("&&");
                    String[] singleWeightArr = singleWeight.split("&&");
                    //标准答案与权重
                    TAssignmentAnswer sAnswer = new TAssignmentAnswer();
                    sAnswer.setText(answerLabel);
                    sAnswer.setIscorrect(1);
                    sAnswer.setLabel("标准答案");
                    sAnswer.setWeight(Double.valueOf(sanswerWeight));
                    sAnswer.setTAssignmentItem(tAssignmentItem);
                    tAssignmentAnswerJPA.save(sAnswer);
                    int count = 1;
                    //关键词与权重
                    for (int i = 0;i<answerStrings.length; i++) {
                        TAssignmentAnswer tAssignmentAnswer = new TAssignmentAnswer();
                        tAssignmentAnswer.setText(answerStrings[i]);
                        tAssignmentAnswer.setIscorrect(0);
                        tAssignmentAnswer.setWeight(Double.valueOf(singleWeightArr[i]));
                        tAssignmentAnswer.setTAssignmentItem(tAssignmentItem);
                        tAssignmentAnswer.setLabel("关键词"+count);
                        tAssignmentAnswerJPA.save(tAssignmentAnswer);
                        count++;
                    }
                    if(tAssignmentItem.getIsOrder()==null) {
                        tAssignmentItem.setIsOrder(isOrder);
                    }
                    tAssignmentItem.setTAssignmentAnswers(answerList);
                    tAssignmentItem.setIsOrder(isOrder);
                    tAssignmentItemJPA.save(tAssignmentItem);
                }
            }
            //新增填空题
            if("8".equals(type)){
                //将题目用‘{’分割
                String[] ss = stem.split("\\{");
                //获取题干
                String description = stem;
                for (int i = 1;i<ss.length; i++) {
                    String substring = ss[i].substring(0, ss[i].indexOf("}"));
                    if(substring.equals("")){
                        //将题干中的答案用"_________"代替
                        description = description.replace("{}", "_________");
                        continue;
                    }
                    if(substring.contains("|")){
                        String[] split = substring.split("\\|");
                        for (int j=0;j<split.length;j++){
                            TAssignmentAnswer tAssignmentAnswer = new TAssignmentAnswer();
                            tAssignmentAnswer.setText(split[j]);
                            tAssignmentAnswer.setIscorrect(1);
                            tAssignmentAnswer.setTAssignmentItem(tAssignmentItem);
                            tAssignmentAnswerJPA.save(tAssignmentAnswer);
                        }
                        //将题干中的答案用"_________"代替
                        description = description.replace("{"+substring+"}", "_________");
                    }else{
                        //获取答案
                        TAssignmentAnswer tAssignmentAnswer = new TAssignmentAnswer();
                        tAssignmentAnswer.setText(substring);
                        tAssignmentAnswer.setIscorrect(1);
                        tAssignmentAnswer.setTAssignmentItem(tAssignmentItem);
                        tAssignmentAnswerJPA.save(tAssignmentAnswer);
                        //将题干中的答案用"_________"代替
                        description = description.replace("{"+tAssignmentAnswer.getText()+"}", "_________");
                    }
                }
                tAssignmentItem.setGapsNumber(ss.length-1);
                if(tAssignmentItem.getIsOrder()==null) {
                    tAssignmentItem.setIsOrder(isOrder);
                }
                tAssignmentItem.setDescriptionTemp(description);
                tAssignmentItem = tAssignmentItemJPA.save(tAssignmentItem);
            }
            TAssignmentQuestionpool tAssignmentQuestionpool = tAssignmentQuestionpoolJPA.findOne(questionPoolId);
            Set<TAssignmentItem> items = tAssignmentQuestionpool.getTAssignmentItems();
            items.add(tAssignmentItem);
            tAssignmentQuestionpool.setTAssignmentItems(items);

            tAssignmentQuestionpoolJPA.save(tAssignmentQuestionpool);
        } else {
            TAssignmentItem oldtAssignmentItem = tAssignmentItemJPA.findOne(itemId);
            oldtAssignmentItem.setDescription(stem);
            oldtAssignmentItem.setUser(userJPA.findOne(userVo.getUsername()));
            //当前时间
            SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            oldtAssignmentItem.setCreatedTime(DateFormatUtil.stringToDate1(df.format(new Date())));
            oldtAssignmentItem.setType(Integer.parseInt(type));
            //保存试题
            tAssignmentItem =  tAssignmentItemJPA.save(oldtAssignmentItem);
            //将原答案清除
            for (TAssignmentAnswer tAssignmentAnswer : tAssignmentItem.getTAssignmentAnswers()) {
               List<TExerciseAnswerRecord> tExerciseAnswerRecordList=tExerciseAnswerRecordJPA.findRecordByANswerId(tAssignmentAnswer.getId());
                for (TExerciseAnswerRecord t:tExerciseAnswerRecordList) {
                    t.setTAssignmentAnswer(null);
                    tExerciseAnswerRecordJPA.save(t);
                }
                tAssignmentAnswerJPA.delete(tAssignmentAnswer);
            }
            if("4".equals(type)||"1".equals(type)) {
                //保存试题答案
                for (int i = 0; i < answerLabelChoices.length; i++) {
                    TAssignmentAnswer tAssignmentAnswer = new TAssignmentAnswer();
                    tAssignmentAnswer.setLabel(answerLabelChoices[i]);
                    tAssignmentAnswer.setText(answerTexts[i]);
                    int iscorrect = 0;
                    for (String string : answerLabels) {
                        if (string.equals(answerLabelChoices[i])) {
                            iscorrect = 1;
                        }
                    }
                    tAssignmentAnswer.setIscorrect(iscorrect);
                    tAssignmentAnswer.setTAssignmentItem(tAssignmentItem);
                    tAssignmentAnswerJPA.save(tAssignmentAnswer);
                }
            }
            //新增判断题
            if("2".equals(type)){
                for (int i = 0;i<answerLabelChoices.length; i++) {
                    TAssignmentAnswer tAssignmentAnswer = new TAssignmentAnswer();
                    tAssignmentAnswer.setLabel(answerLabelChoices[i]);
                    tAssignmentAnswer.setText(answerLabelChoices[i]);
                    int iscorrect = 0;
                    for (String string : answerLabels) {
                        if(string.equals(answerLabelChoices[i])){
                            iscorrect = 1;
                        }
                    }
                    tAssignmentAnswer.setIscorrect(iscorrect);
                    tAssignmentAnswer.setTAssignmentItem(tAssignmentItem);
                    tAssignmentAnswerJPA.save(tAssignmentAnswer);
                }
            }
            //新简答题
            if("5".equals(type)){
                if(answerTexts.length!=0){
                    Set<TAssignmentAnswer> answerList = new HashSet<TAssignmentAnswer>();
                    String answersString = answerTexts[0];
                    String[] answerStrings = answersString.split("&&");
                    String[] singleWeightArr = singleWeight.split("&&");
                    //标准答案与权重
                    TAssignmentAnswer sAnswer = new TAssignmentAnswer();
                    sAnswer.setText(answerLabel);
                    sAnswer.setIscorrect(1);
                    sAnswer.setLabel("标准答案");
                    sAnswer.setWeight(Double.valueOf(sanswerWeight));
                    sAnswer.setTAssignmentItem(tAssignmentItem);
                    tAssignmentAnswerJPA.save(sAnswer);
                    int count = 1;
                    for (int i = 0;i<answerStrings.length; i++) {
                        TAssignmentAnswer tAssignmentAnswer = new TAssignmentAnswer();
                        tAssignmentAnswer.setText(answerStrings[i]);
                        tAssignmentAnswer.setIscorrect(0);
                        tAssignmentAnswer.setLabel("关键词"+count);
                        tAssignmentAnswer.setWeight(Double.valueOf(singleWeightArr[i]));
                        tAssignmentAnswer.setTAssignmentItem(tAssignmentItem);
                        tAssignmentAnswerJPA.save(tAssignmentAnswer);
                        answerList.add(tAssignmentAnswer);
                        count++;
                    }
                    tAssignmentItem.setTAssignmentAnswers(answerList);
                    tAssignmentItem.setIsOrder(isOrder);
                    tAssignmentItemJPA.save(tAssignmentItem);
                }
            }
            //新增填空题
            if("8".equals(type)){
                //将题目用‘{’分割
                String[] ss = stem.split("\\{");
                //获取题干
                String description = stem;
                Set<TAssignmentAnswer> answerList = new HashSet<TAssignmentAnswer>();
                for (int i = 1;i<ss.length; i++) {
                    TAssignmentAnswer tAssignmentAnswer = new TAssignmentAnswer();
                    //获取答案
                    tAssignmentAnswer.setText(ss[i].substring(0, ss[i].indexOf("}")));
                    //将题干中的答案用"_________"代替
                    description = description.replace("{"+tAssignmentAnswer.getText()+"}", "_________");
                    tAssignmentAnswer.setIscorrect(1);
                    tAssignmentAnswer.setTAssignmentItem(tAssignmentItem);
                    tAssignmentAnswerJPA.save(tAssignmentAnswer);
                    answerList.add(tAssignmentAnswer);
                }
                tAssignmentItem.setGapsNumber(ss.length-1);
                if(tAssignmentItem.getIsOrder()==null) {
                    tAssignmentItem.setIsOrder(isOrder);
                }
                tAssignmentItem.setDescriptionTemp(description);
                tAssignmentItem.setTAssignmentAnswers(answerList);
                tAssignmentItemJPA.save(tAssignmentItem);
            }
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
        // 填空题时添加填空题类型，简答题添加判题方式
        if (tAssignmentItem.getType()==8||tAssignmentItem.getType()==5) {
            if (tAssignmentItem.getIsOrder()==null){
                question.setIsOrder(1);
            }else {
                question.setIsOrder(tAssignmentItem.getIsOrder());
            }
        }
        List<TAssignmentAnswer> answers = tAssignmentAnswerJPA.findAnswersByTAssignmentId(itemId);
        List<QuestionOptionVo> questionOptionVos = new ArrayList<QuestionOptionVo>();
        //试题答案，只需要简答题的试题答案
        String itemAnswer = "";
        String wordWeight = "";
        if (tAssignmentItem.getType()!=5){
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
        }else {
            for(TAssignmentAnswer answer:answers){
                QuestionOptionVo qoption = new QuestionOptionVo();
                qoption.setOptionNumber(answer.getLabel());
                qoption.setOptionText(answer.getText());
                if(answer.getIscorrect()==0){
                    qoption.setIscorrect(0);
                    itemAnswer += answer.getText() + "&&";
                    wordWeight += answer.getWeight() + "&&";
                }else {
                    qoption.setIscorrect(1);
                    question.setSanswer(answer.getText());
                    question.setSanswerWeight(answer.getWeight().toString());
                }
                questionOptionVos.add(qoption);
            }
            if (!EmptyUtil.isEmpty(wordWeight)) {
                wordWeight = wordWeight.substring(0,wordWeight.length() - 2);
            }

        }
        itemAnswer = itemAnswer.substring(0,itemAnswer.length() - 2);
        question.setItemAnswer(itemAnswer);
        question.setWordWeight(wordWeight);
        question.setItemOptions(questionOptionVos);
        return question;
    }

    /**************************************************************************
     * Description 题库模块-标记题目
     *
     * @author 洪春莹
     * @date 2018-10-30
     **************************************************************************/
    @Override
    public void markQuestionFlag(Integer itemId) {
        TAssignmentItem tAssignmentItem = tAssignmentItemJPA.findOne(itemId);
        tAssignmentItem.setFlag(1);
        tAssignmentItemJPA.save(tAssignmentItem);

    }

    /**************************************************************************
     * Description 题库模块-取消标记题目
     *
     * @author 洪春莹
     * @date 2018-10-30
     **************************************************************************/
    @Override
    public void markQuestionFlagBack(Integer itemId) {
        TAssignmentItem tAssignmentItem = tAssignmentItemJPA.findOne(itemId);
        tAssignmentItem.setFlag(0);
        tAssignmentItemJPA.save(tAssignmentItem);
    }

    /**************************************************************************
     * Description 查询左侧栏列表
     *
     * @author 马帅
     * @date 2017-12-12
     **************************************************************************/
    @Override
    public List<QuestionLeftVo> findQuestionPoolLeft() {
        //查询所有题库分类
        List<QuestionpoolCategory> categorys = questionPoolCategoryJPA.findQuestionPoolCategory();
        //创建题库分类VO层集合
        List<QuestionLeftVo> QuestionLeftVoList = new ArrayList<QuestionLeftVo>();
        //向题库分类VO层添加数据
        for(QuestionpoolCategory category : categorys){
            //创建题库分类VO
            QuestionLeftVo questionLeftVo = new QuestionLeftVo();
            //创建本题库分类下题库VO集合
            List<QuestionLeftChildrenVO> questionLeftChildrenVOList = new ArrayList<QuestionLeftChildrenVO>();
            questionLeftVo.setId(category.getId());
            questionLeftVo.setTitle(category.getTitle());
            //查询所有在本题库分类下所有的题库
            //List<TAssignmentQuestionpool> TAssignmentQuestionpoolList = tAssignmentQuestionpoolJPA.findLeftQuestionPool(1,0,category.getId());
            List<TAssignmentQuestionpool> TAssignmentQuestionpoolList = tAssignmentQuestionpoolJPA.findAllLeftQuestionPool(0,category.getId());
            //向本题库分类下题库VO集合添加数据
            for(TAssignmentQuestionpool t : TAssignmentQuestionpoolList){
                QuestionLeftChildrenVO questionLeftChildrenVO = new QuestionLeftChildrenVO();
                questionLeftChildrenVO.setId(t.getQuestionpoolId());
                questionLeftChildrenVO.setTitle(t.getTitle());
                questionLeftChildrenVO.setSelected(0);
                questionLeftChildrenVOList.add(questionLeftChildrenVO);
            }
            questionLeftVo.setLeftChildrens(questionLeftChildrenVOList);
            QuestionLeftVoList.add(questionLeftVo);
        }
        return QuestionLeftVoList;
    }

    /**************************************************************************
     * Description 查看当前站点下的题库
     *
     * @author lixueteng
     * @date 2017-12-1
     **************************************************************************/
    @Override
    public List<QuestionPoolVO> findQuestionPool(Integer currpage, Integer pageSize, Integer type, String title, String username){
        List<QuestionPoolVO> questionPoolVOList=new ArrayList<>();
        Pageable pageable=PageRequest.of(currpage-1,pageSize);
        Page<TAssignmentQuestionpool> questionPoolPageable=null;
        //获取公共题库

        //获取公共题库
        if(title!=null && !"".equals(title)){
            if(username!=null && !"".equals(username)){
                if(type!=null){
                    questionPoolPageable = tAssignmentQuestionpoolJPA.findQuestionPool4(1, 0, pageable,"%"+title+"%","%"+username+"%",type);
                }else {
                    questionPoolPageable = tAssignmentQuestionpoolJPA.findQuestionPool3(1, 0, pageable, "%" + title + "%", "%" + username + "%");
                }
            }else{
                if(type!=null){
                    questionPoolPageable = tAssignmentQuestionpoolJPA.findQuestionPool5(1, 0, pageable,"%"+title+"%",type);
                }else {
                    questionPoolPageable = tAssignmentQuestionpoolJPA.findQuestionPool1(1, 0, pageable, "%" + title + "%");
                }
            }
        }else if(username!=null && !"".equals(username)){
            if(type!=null){
                questionPoolPageable = tAssignmentQuestionpoolJPA.findQuestionPool6(1, 0, pageable,"%"+username+"%",type);
            }else {
                questionPoolPageable = tAssignmentQuestionpoolJPA.findQuestionPool2(1, 0, pageable, "%" + username + "%");
            }
        }else if(type!=null){
                questionPoolPageable = tAssignmentQuestionpoolJPA.findQuestionPool7(1, 0, pageable,type);
        }else{
            questionPoolPageable = tAssignmentQuestionpoolJPA.findQuestionPool(1, 0, pageable);
        }
//        Page<TAssignmentQuestionpool> questionPoolPageable = tAssignmentQuestionpoolJPA.findQuestionPool(1, 0, pageable);
        List<TAssignmentQuestionpool> questionPoolByCidList=questionPoolPageable.getContent();
        for(TAssignmentQuestionpool pool:questionPoolByCidList){
            QuestionPoolVO questionPoolVO=new QuestionPoolVO();
            questionPoolVO.setId(pool.getQuestionpoolId());
            questionPoolVO.setCreateTime(pool.getCreatedTime());
            questionPoolVO.setTitle(pool.getTitle());
            questionPoolVO.setType(pool.getType());
            questionPoolVO.setUsername(pool.getUser().getUsername());
            if(type!=null){
                if(pool.getQuestionpoolCategory().getId().equals(type)){
                    questionPoolVOList.add(questionPoolVO);
                }
            }else{
                questionPoolVOList.add(questionPoolVO);
            }
        }
        return questionPoolVOList;
    }
    /**************************************************************************
     * Description 获取题库分类列表
     *
     * @author lixueteng
     * @return 题库分类列表
     * @date 2017-12-1
     **************************************************************************/
    @Override
    public List<QuestionPoolCategoryVO> findAllQuestionPoolCategory(){
        List<QuestionPoolCategoryVO> questionPoolCategoryVOList=new ArrayList<>();
        List<QuestionpoolCategory> questionPoolCategories = questionPoolCategoryJPA.findAll();
        for(QuestionpoolCategory category:questionPoolCategories){
            QuestionPoolCategoryVO questionPoolCategoryVO=new QuestionPoolCategoryVO();
            BeanUtils.copyProperties(category,questionPoolCategoryVO);
            questionPoolCategoryVOList.add(questionPoolCategoryVO);
        }
        return questionPoolCategoryVOList;
    }
    /**************************************************************************
     * Description 新建题库
     *
     * @author lixueteng
     * @date 2017-12-4
     **************************************************************************/
    @Transactional(rollbackFor = Exception.class)
    @Override
    public void saveQuestionPool(QuestionPoolVO questionPoolVO, UserVo userVo, Integer siteId){
        //获取当前课程
        TCourseSite tCourseSite = tCourseSiteJPA.findOne(siteId);
        TAssignmentQuestionpool questionpool=new TAssignmentQuestionpool();
        //获取题库分类 type中存放的是题库的分类的id
        Integer category = questionPoolVO.getCategory();
        QuestionpoolCategory questionpoolCategory = questionPoolCategoryJPA.findOne(category);
        if(questionPoolVO.getId()!=null){
            questionpool = tAssignmentQuestionpoolJPA.findOne(questionPoolVO.getId());
        }
        questionpool.setTitle(questionPoolVO.getTitle());
        questionpool.setQuestionpoolCategory(questionpoolCategory);
        questionpool.setUser(userJPA.findOne(questionPoolVO.getUsername()));
        questionpool.setCreatedTime(questionPoolVO.getCreateTime());
        questionpool.setType(questionPoolVO.getType());
        //0为题库 1为试卷库
        questionpool.setIsTest(0);
        if (questionPoolVO.getType()==1&&questionpool.getTCourseSites()!=null) {//公共题库
            questionpool.getTCourseSites().remove(tCourseSite);
        }
        if (questionPoolVO.getType()!=1&&questionpool.getTCourseSites()!=null) {//非公共题库
            questionpool.getTCourseSites().add(tCourseSite);
        }
        if (questionPoolVO.getType()!=1&&questionpool.getTCourseSites()==null) {//新建题库
            questionpool.setTCourseSites(new HashSet<TCourseSite>());
            questionpool.getTCourseSites().add(tCourseSite);
        }
        tAssignmentQuestionpoolJPA.save(questionpool);
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
        if (questionpool.getQuestionpoolCategory()!=null){
            questionPoolVO.setCategory(questionpool.getQuestionpoolCategory().getId());
        }
        questionPoolVO.setCreateTime(questionpool.getCreatedTime());
        questionPoolVO.setType(questionpool.getType());
        return questionPoolVO;
    }
    /**************************************************************************
     * Description 根据题库的id删除对应的题库
     *
     * @author lixueteng
     * @date 2017-12-5
     * @param questionPoolId 题库的id
     * @return 根据id删除对应的题库
     **************************************************************************/
    @Transactional(rollbackFor = Exception.class)
    @Override
    public void deleteQuestionPoolById(Integer questionPoolId){
        TAssignmentQuestionpool questionpool = tAssignmentQuestionpoolJPA.findOne(questionPoolId);
        List<TAssignmentItemComponent> tAssignmentItemComponents = tAssignmentItemComponentJPA.findItemComponentByQuestionpoolId(questionPoolId);
        tAssignmentItemComponentJPA.deleteAll(tAssignmentItemComponents);
        tAssignmentQuestionpoolJPA.delete(questionpool);
    }
    /**************************************************************************
     * Description 获取题库的数量
     *
     * @author lixueteng
     * @date 2017-12-5
     * @return 题库的数量
     **************************************************************************/
    @Override
    public Integer countQuestionPool(Integer type,String title,String username){
        Integer questionPoolTotalRecords=0;
        String hql="select q from TAssignmentQuestionpool q where q.type=1 and q.isTest=0";
        if (title != null && !"".equals(title)) {
            if(username != null && !"".equals(username)){
                if(type!=null){
                    hql += " and q.title like '%" + title +"%'";
                    hql += " and q.user.username like '%" + username +"%'";
                    hql+=" and q.QuestionpoolCategory.id="+type;
                }else {
                    hql += " and q.title like '%" + title + "%'";
                    hql += " and q.user.username like '%" + username + "%'";
                }
            }else{
                if(type!=null) {
                    hql += " and q.title like '%" + title + "%'";
                    hql += " and q.QuestionpoolCategory.id=" + type;
                }else{
                    hql += " and q.title like '%" + title +"%'";
                }
            }
        }else if(username != null && !"".equals(username)){
            /*if(title != null && !"".equals(title)){
                hql += " and q.user.username like '%" + username +"%'";
                hql += " and q.title like '%" + title +"%'";*/
            if(type!=null){
                hql += " and q.user.username like '%" + username + "%'";
                hql+=" and q.QuestionpoolCategory.id="+type;
            }else {
                hql += " and q.user.username like '%" + username + "%'";
            }
        }else{
            if(type!=null) {
                hql += " and q.QuestionpoolCategory.id=" + type;
            }
        }
        Query query= entityManager.createQuery(hql);
        questionPoolTotalRecords=query.getResultList().size();


      /*  if(type!=null){
            questionPoolTotalRecords = tAssignmentQuestionpoolJPA.findQuestionPoolTotalRecordsWithType(1,0,type);
        }else{
            questionPoolTotalRecords = tAssignmentQuestionpoolJPA.findQuestionPoolTotalRecords(1,0);
        }*/
        return questionPoolTotalRecords;
    }

    /**************************************************************************
     * Description 获取所有的试卷库
     *
     * @author 张佳鸣
     * @date 2017-12-21
     **************************************************************************/
    @Override
    public List<TestLibraryVo> findAllTestLibrary(Integer currpage, Integer pageSize, Integer type){
        //联合查询所有的试卷库
        String sql="";
        List<TestLibraryVo> testLibraryVoList=new ArrayList<>();
        if(type!=null) {
            QuestionpoolCategory questionpoolCategory=questionPoolCategoryJPA.findOne(type);
            sql = "select e from ExamQuestionpool e where e.status = 1 and e.category=" + type+" order by e.id";
            Query query = entityManager.createQuery(sql);
            query.setFirstResult((currpage-1)*pageSize).setMaxResults(pageSize);
            List<ExamQuestionpool> examQuestionpoolList=query.getResultList();
            for (ExamQuestionpool examQuestionpool:examQuestionpoolList){
                TestLibraryVo testLibraryVo=new TestLibraryVo();
                testLibraryVo.setId(examQuestionpool.getId());
                testLibraryVo.setTitle(examQuestionpool.getTitle());
                testLibraryVo.setScore(examQuestionpool.getScore());
                testLibraryVo.setCreatedDate(examQuestionpool.getCreatedDate());
                testLibraryVo.setCreatedName(examQuestionpool.getCreatedName());
                testLibraryVo.setType(examQuestionpool.getType());
                testLibraryVo.setStatus(examQuestionpool.getStatus());
                testLibraryVo.setCategoryTitle(questionpoolCategory.getTitle());
                testLibraryVoList.add(testLibraryVo);
            }
        }else {
            sql = "select new net.gvsun.vo.questionPool.TestLibraryVo(e.id,e.title,e.score,e.createdDate,e.createdName,e.type,e.status,q.title) from ExamQuestionpool e ,QuestionpoolCategory q where e.category = q.id and e.status=1 order by e.id";
            Query query = entityManager.createQuery(sql);
            query.setFirstResult((currpage - 1) * pageSize).setMaxResults(pageSize);
            testLibraryVoList = query.getResultList();
        }
        return testLibraryVoList;
    }

    /**************************************************************************
     * Description 获取试卷库的数量
     *
     * @author 张佳鸣
     * @date 2017-12-31
     **************************************************************************/
    @Override
    public Integer countExamQuestionpool(Integer type){
        Integer examQuestionpoolTotalRecords=0;
        if(type!=null) {
            examQuestionpoolTotalRecords = examQuestionpoolJPA.findExamQuestionpoolTotalRecordsBycategory(type);
        }else{
            examQuestionpoolTotalRecords = examQuestionpoolJPA.findExamQuestionpoolTotalRecords();
        }
        return examQuestionpoolTotalRecords;
    }

    /**************************************************************************
     * Description 试卷库（假）删除
     *
     * @author 张佳鸣
     * @date 2017-12-25
     **************************************************************************/
    @Override
    public void deleteExamQuestionpool(Integer examQuestionpoolId) {
        ExamQuestionpool examQuestionpool= examQuestionpoolJPA.findOne(examQuestionpoolId);
        //设置status标志位为0，假删除
        examQuestionpool.setStatus(0);
        //保存
        examQuestionpoolJPA.save(examQuestionpool);
        examQuestionpoolJPA.flush();
    }
    /**************************************************************************
     * Description:查询课程下的题库列表
     *
     * @author：黄崔俊
     * @date ：2015-12-25
     **************************************************************************/
    @Override
    public List<QuestionPoolVO> findQuestionListBySiteId(Integer cid, String title, String username, Integer currpage, int pageSize, Integer type) {
        List<QuestionPoolVO> questionPoolVOList = new ArrayList<>();
        String hql = "select distinct q from TCourseSite t,TAssignmentQuestionpool q where q.questionpoolId in elements(t.TAssignmentQuestionpools) and t.id = "+cid+"";
        if (title != null && !"".equals(title)) {
            if(username != null && !"".equals(username)){
                if(type!=null){
                    hql += " and q.title like '%" + title +"%'";
                    hql += " and q.user.username like '%" + username +"%'";
                    hql+=" and q.QuestionpoolCategory.id="+type;
                }else {
                    hql += " and q.title like '%" + title + "%'";
                    hql += " and q.user.username like '%" + username + "%'";
                }
            }else{
                if(type!=null) {
                    hql += " and q.title like '%" + title + "%'";
                    hql += " and q.QuestionpoolCategory.id=" + type;
                }else{
                    hql += " and q.title like '%" + title +"%'";
                }
            }
        }else if(username != null && !"".equals(username)){
            /*if(title != null && !"".equals(title)){
                hql += " and q.user.username like '%" + username +"%'";
                hql += " and q.title like '%" + title +"%'";*/
            if(type!=null){
                hql += " and q.user.username like '%" + username + "%'";
                hql+=" and q.QuestionpoolCategory.id="+type;
            }else {
                hql += " and q.user.username like '%" + username + "%'";
            }
        }else{
            if(type!=null) {
                hql += " and q.QuestionpoolCategory.id=" + type;
            }
        }
        hql += " order by q.id asc";

        Query query= entityManager.createQuery(hql);
        query.setMaxResults(pageSize);
        query.setFirstResult((currpage-1)*pageSize);
        List<TAssignmentQuestionpool> tAssignmentQuestionpools = query.getResultList();

        //List<TAssignmentQuestionpool> tAssignmentQuestionpools = entityManager.createQuery(hql).getResultList();
        for (TAssignmentQuestionpool pool : tAssignmentQuestionpools){
                    QuestionPoolVO questionPoolVO = new QuestionPoolVO();
                    questionPoolVO.setId(pool.getQuestionpoolId());
                    questionPoolVO.setCreateTime(pool.getCreatedTime());
                    questionPoolVO.setTitle(pool.getTitle());
                    questionPoolVO.setType(pool.getType());
                    questionPoolVO.setUsername(pool.getUser().getUsername());
                    questionPoolVOList.add(questionPoolVO);
                    }
        return questionPoolVOList;

    }

    /**************************************************************************
     * Description:查询课程下的题库列表
     *
     * @author：黄崔俊
     * @date ：2015-12-25
     **************************************************************************/
    @Override
    public List<QuestionPoolVO> findQuestionListBySiteIdNumber(Integer cid, String title, String username, Integer type) {
        List<QuestionPoolVO> questionPoolVOList = new ArrayList<>();
        String hql = "select distinct q from TCourseSite t,TAssignmentQuestionpool q where q.questionpoolId in elements(t.TAssignmentQuestionpools) and t.id = "+cid+"";
        if (title != null && !"".equals(title)) {
            if(username != null && !"".equals(username)){
                if(type!=null){
                    hql += " and q.title like '%" + title +"%'";
                    hql += " and q.user.username like '%" + username +"%'";
                    hql+=" and q.QuestionpoolCategory.id="+type;
                }else {
                    hql += " and q.title like '%" + title + "%'";
                    hql += " and q.user.username like '%" + username + "%'";
                }
            }else{
                if(type!=null) {
                    hql += " and q.title like '%" + title + "%'";
                    hql += " and q.QuestionpoolCategory.id=" + type;
                }else{
                    hql += " and q.title like '%" + title +"%'";
                }
            }
        }else if(username != null && !"".equals(username)){
            /*if(title != null && !"".equals(title)){
                hql += " and q.user.username like '%" + username +"%'";
                hql += " and q.title like '%" + title +"%'";*/
            if(type!=null){
                hql += " and q.user.username like '%" + username + "%'";
                hql+=" and q.QuestionpoolCategory.id="+type;
            }else {
                hql += " and q.user.username like '%" + username + "%'";
            }
        }else{
            if(type!=null) {
                hql += " and q.QuestionpoolCategory.id=" + type;
            }
        }
        hql += " order by q.id asc";
        List<TAssignmentQuestionpool> tAssignmentQuestionpools = entityManager.createQuery(hql).getResultList();
        for (TAssignmentQuestionpool pool : tAssignmentQuestionpools) {
            QuestionPoolVO questionPoolVO = new QuestionPoolVO();
            questionPoolVO.setId(pool.getQuestionpoolId());
            questionPoolVO.setCreateTime(pool.getCreatedTime());
            questionPoolVO.setTitle(pool.getTitle());
            questionPoolVO.setType(pool.getType());
            questionPoolVO.setUsername(pool.getUser().getUsername());
                questionPoolVOList.add(questionPoolVO);
        }
        return questionPoolVOList;

    }



    @Override
    public ExamQuestionPoolVO findExamQuestionPoolVOById(Integer id, Integer type){
        ExamQuestionPoolVO examQuestionPoolVO = new ExamQuestionPoolVO();
        examQuestionPoolVO.setExamMajorTerms(new ArrayList<>());
        String sql = "select eq.title,eq.score,eq.created_name,eq.category,eq.created_date,es.item_count,es.item_score,es.name,es.id from exam_questionpool eq join exam_section es on es.exam_questionpool_id = eq.id where eq.id = "+id;
        Query query = entityManager.createNativeQuery(sql);
        List<Object[]> rseult = new ArrayList<>(query.getResultList());
        for (Object[] object : rseult){
            if(object[0]!=null){
                examQuestionPoolVO.setTitle(object[0].toString());
            }else{
                examQuestionPoolVO.setTitle("");
            }
            examQuestionPoolVO.setScore(Double.parseDouble(object[1].toString()));
            examQuestionPoolVO.setUsername(object[2].toString());
            examQuestionPoolVO.setCategory(Integer.parseInt(object[3].toString()));
            String time = object[4].toString();
            SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date date = null;
            try {
                date = sdf.parse(time);
            } catch (ParseException e) {
                e.printStackTrace();
            }
            examQuestionPoolVO.setCreateTime(date);
            ExamMajorTermVO examMajorTermVO = new ExamMajorTermVO();
            examMajorTermVO.setItemcount(Integer.parseInt(object[5].toString()));
            examMajorTermVO.setItemscore(Double.parseDouble(object[6].toString()));
            examMajorTermVO.setTitle(object[7].toString());
            if(type==1){
                sql = "select tai.type,taq.title from t_assignment_item tai join t_assignment_questionpool_item taqi on taqi.item_id = tai.id and tai.id = (SELECT item_id from exam_section_item where exam_section_id ="+object[8].toString()+" limit 1) join t_assignment_questionpool taq on taqi.questionpool_id = taq.questionpool_id";
                List<Object[]> result2 = new ArrayList<>(entityManager.createNativeQuery(sql).getResultList());
                if(result2.size()>0){
                    switch (Integer.parseInt(result2.get(0)[0].toString())){
                        case 1:
                            examMajorTermVO.setItemQuestionPoolType("多选题");
                            break;
                        case 2:
                            examMajorTermVO.setItemQuestionPoolType("判断题");
                            break;
                        case 4:
                            examMajorTermVO.setItemQuestionPoolType("单选题");
                            break;
                        case 5:
                            examMajorTermVO.setItemQuestionPoolType("简答题");
                            break;
                        case 8:
                            examMajorTermVO.setItemQuestionPoolType("填空题");
                            break;
                        case 9:
                            examMajorTermVO.setItemQuestionPoolType("匹配题");
                            break;
                        default:
                            examMajorTermVO.setItemQuestionPoolType("未知题型");

                    }
                    examMajorTermVO.setItemQuestionPoolName(result2.get(0)[1].toString());
                }
//                examQuestionPoolVO.getExamMajorTerms().add(examMajorTermVO);
            }
            examQuestionPoolVO.getExamMajorTerms().add(examMajorTermVO);
        }
        return examQuestionPoolVO;
    }
    /**************************************************************************
     * Description 保存题库并返回题库ID
     *
     * @author 吴奇臻
     * @date 2018-12-6
     **************************************************************************/
    @Override
    public int saveQuestionPoolApi(String questionPoolId, String title, String username, Date createdTime, String category, String type, String cid){
        QuestionPoolVO questionPoolVO=new QuestionPoolVO();
        if(questionPoolId!=null&&!"".equals(questionPoolId)){
            questionPoolVO.setId(Integer.parseInt(questionPoolId));
        }
        questionPoolVO.setTitle(title);
        questionPoolVO.setUsername(username);
        questionPoolVO.setCreateTime(createdTime);
        questionPoolVO.setCategory(Integer.parseInt(category));
        questionPoolVO.setType(Integer.valueOf(type));
        questionPoolVO= this.saveQuestionPoolForApi(questionPoolVO,Integer.parseInt(cid));
        return questionPoolVO.getId();
        }
    /**************************************************************************
     * Description 保存题库并返回题库ID
     *
     * @author 吴奇臻
     * @date 2018-12-6
     **************************************************************************/
    @Override
    public QuestionPoolVO saveQuestionPoolForApi(QuestionPoolVO questionPoolVO, Integer siteId){
        //获取当前课程
        TCourseSite tCourseSite = tCourseSiteJPA.findOne(siteId);
        TAssignmentQuestionpool questionpool=new TAssignmentQuestionpool();
        //获取题库分类 type中存放的是题库的分类的id
        Integer category = questionPoolVO.getCategory();
        QuestionpoolCategory questionpoolCategory = questionPoolCategoryJPA.findOne(category);
        if(questionPoolVO.getId()!=null){
            questionpool = tAssignmentQuestionpoolJPA.findOne(questionPoolVO.getId());
        }
        questionpool.setTitle(questionPoolVO.getTitle());
        questionpool.setQuestionpoolCategory(questionpoolCategory);
        questionpool.setUser(userJPA.findOne(questionPoolVO.getUsername()));
        questionpool.setCreatedTime(questionPoolVO.getCreateTime());
        questionpool.setType(questionPoolVO.getType());
        //0为题库 1为试卷库
        questionpool.setIsTest(0);
        if (questionPoolVO.getType()==1&&questionpool.getTCourseSites()!=null) {//公共题库
            questionpool.getTCourseSites().remove(tCourseSite);
        }
        if (questionPoolVO.getType()!=1&&questionpool.getTCourseSites()!=null) {//非公共题库
            questionpool.getTCourseSites().add(tCourseSite);
        }
        if (questionPoolVO.getType()!=1&&questionpool.getTCourseSites()==null) {//新建题库
            questionpool.setTCourseSites(new HashSet<TCourseSite>());
            questionpool.getTCourseSites().add(tCourseSite);
        }
        questionpool=tAssignmentQuestionpoolJPA.save(questionpool);
        questionPoolVO.setId(questionpool.getQuestionpoolId());
        return questionPoolVO;
    }
    @Override
    public String findTAssignmentQuestionById(Integer id){
        TAssignmentQuestionpool tAssignmentQuestionpool = tAssignmentQuestionpoolJPA.findOne(id);
        return tAssignmentQuestionpool.getTitle();
    }
}
