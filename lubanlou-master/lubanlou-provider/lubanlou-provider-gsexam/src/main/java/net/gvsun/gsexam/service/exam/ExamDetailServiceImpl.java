package net.gvsun.gsexam.service.exam;

import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.gvsun.datasource.ClientDatabaseContext;
import net.gvsun.gsexam.constant.ConstantInterface;
import net.gvsun.gsexam.domain.*;
import net.gvsun.gsexam.dto.common.TAssignmentVo;
import net.gvsun.gsexam.dto.common.UserVo;
import net.gvsun.gsexam.dto.exam.TAssignmentItemMappingDTO;
import net.gvsun.gsexam.dto.exam.login.TAssignmentAnswerDto;
import net.gvsun.gsexam.jpa.*;
import net.gvsun.gsexam.service.common.ShareService;
import net.gvsun.gsexam.utils.*;
import net.gvsun.gsexam.vo.exam.*;
import net.gvsun.gsexam.vo.test.TestSectionVO;
import net.gvsun.similarity.Similarity;
import net.gvsun.web.util.AuthorizationUtil;
import org.apache.commons.lang3.StringEscapeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by 李雪腾 on 2017/9/13 0013.
 */
@Service("examDetailService")
public class ExamDetailServiceImpl implements ExamDetailService {

    @Autowired
    private TAssignmentJPA tAssignmentJPA;
    @Autowired
    private ShareService shareService;
    @Autowired
    private UserJPA userJPA;
    @Autowired
    private TAssignmentSectionJPA tAssignmentSectionJPA;
    @Autowired
    private TAssignmentItemJPA tAssignmentItemJPA;
    @Autowired
    private TAssignmentAnswerJPA tAssignmentAnswerJPA;
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private TAssignmentItemMappingJPA tAssignmentItemMappingJPA;
    @Autowired
    private TAssignmentGradingJPA tAssignmentGradingJPA;
    @Autowired
    private GradeBookService gradeBookService;
    @Autowired
    private TCourseSiteJPA tCourseSiteJPA;
    @Autowired
    private StringRedisTemplate stringRedisTemplate;
    @Autowired
    private ClientDatabaseContext clientDatabaseContext;
    @Autowired
    private ObjectMapper objectMapper;


    /**************************************************************************
     * Description 开始考试，插入数据，记录考生的考试情况
     *
     * @author lixueteng
     * @date 2017-09-12
     **************************************************************************/
    @Override
    public TAssignmentVo findExamByUserAndExam(UserVo user, TAssignmentVo exam) {
        return null;
    }

    /**************************************************************************
     * Description: 获取考试的大题
     *
     * @author：李雪腾
     * @date ：${DATE}
     **************************************************************************/

    public List<TAssignmentSection> findExamSections(List<TAssignmentItem> items) {
        String sectionIds = "";
        for (TAssignmentItem i : items) {
            sectionIds += i.getTAssignmentSection().getId() + ",";
        }
        if (sectionIds.length() != 0) {
            sectionIds = sectionIds.substring(0, sectionIds.length() - 1);
        }
        String sql = "select s from TAssignmentSection s " + " where s.id in ("
                + sectionIds + ")" + " order by s.sequence,s.id asc";
        List<TAssignmentSection> sections = entityManager.createQuery(sql).getResultList();
        return sections;
    }


    /**************************************************************************
     * Description 开始考试，保存考试的答题记录之前如果之前已经保存过数据，清空重写
     *
     * @author lixueteng
     * @date 2017-09-18
     **************************************************************************/
    @Transactional(rollbackFor = Exception.class)
    @Override
    public void deleteTAssignmentItemMapping(int assignemntId, Integer currpage, Integer pageSize, UserVo userVo) {
        Pageable pageable = PageRequest.of(currpage - 1, pageSize);
        //获取当前页的题目
        Page<TAssignmentItem> tAssignmentItemPage = tAssignmentItemJPA.findTAssignmentItemByExamId(assignemntId, pageable);
        List<TAssignmentItem> tAssignmentItemList = tAssignmentItemPage.getContent();
        //获取当前学生的当前页面的保存记录
        String itemIds = "";
        for (TAssignmentItem i : tAssignmentItemList) {
            itemIds += i.getId() + ",";
        }
        if (itemIds.length() != 0) {
            itemIds = itemIds.substring(0, itemIds.length() - 1);
        }
        String sql = "select c from TAssignmentItemMapping c where 1=1 ";
        sql += " and c.TAssignment.id =" + assignemntId;
        sql += " and c.userByStudent.username like '"
                + userVo.getUsername() + "' ";
        // sql += " and c.submitTime=0";
        sql += " and c.TAssignmentItem.id in (" + itemIds + ") ";
        // 获取当前学生保存未提交记录的列表
        List<TAssignmentItemMapping> tAssignmentItemMappingList = entityManager.createQuery(sql).getResultList();

        for (TAssignmentItemMapping tAssignmentItemMapping : tAssignmentItemMappingList) {
            tAssignmentItemMappingJPA.delete(tAssignmentItemMapping);
        }
    }

    /**************************************************************************
     * Description 开始考试，保存考试的答题记录
     *
     * @author lixueteng
     * @date 2017-09-19
     **************************************************************************/
    @Transactional(rollbackFor = Exception.class)
    @Override
    public BigDecimal saveTAssignmentItemMapping(Map<String, String[]> answerMap, Integer assignmentId, Integer submitTime, UserVo userVo, Integer grading) {
        Similarity similarity = new Similarity();
        //初始化当前时间
        String currentTime = DateFormatUtil.date2String(new Date(), "yyyy-MM-dd HH:mm:ss");
        //获取当前试卷对象
        TAssignment exam = tAssignmentJPA.findOne(assignmentId);
        Integer tAssignmentId = exam.getId();
        Integer itemId;
        String username = userVo.getUsername();
        String answerText = "";
        String score;
        List<String> sqlList;
        BigDecimal totalScore = new BigDecimal(0);
        String basesql = "INSERT INTO `t_assignment_item_mapping` (`assignment_id`, `item_id`, `answer_id`, `answer_text`, `student`, `submit_date`, `submit_time`,`grading_id`,`autoscore`) VALUES ";
        String sql = "";
        //获取当前考试的当前学生的题目列表
        List<TAssignmentItem> itemList = new ArrayList<>();
        //试题的答案
        Map<Integer, TAssignmentAnswer> itemAnswerMap = new HashMap<>();
        //每个题目的分数（用于试卷库中的题目）
        Map<Integer, Double> itemScoreMap = new HashMap<>();
        if (exam.getExamQuestionpool() == null) {//试卷来源于题库
            Set<TAssignmentSection> tAssignmentSections = exam.getTAssignmentSections();
            for (TAssignmentSection section : tAssignmentSections) {
                //当前考试的试题列表
                Set<TAssignmentItem> tAssignmentItems = section.getTAssignmentItems();
                for (TAssignmentItem item : tAssignmentItems) {
                    itemList.add(item);
                    //获取这个item 的answer
                    Set<TAssignmentAnswer> tAssignmentAnswers = new HashSet<>();
//                    if(item.getItemParent()!=null){
//                         tAssignmentAnswers=tAssignmentItemJPA.getTAssignmentAnswerByItemId(item.getItemParent());
//                    }else {
                    tAssignmentAnswers = item.getTAssignmentAnswers();
//                    }
                    for (TAssignmentAnswer answer : tAssignmentAnswers) {
                        itemAnswerMap.put(answer.getId(), answer);
                    }
                }
            }
        } else {//试卷来源于试卷库
            //试卷库
            ExamQuestionpool examQuestionpool = exam.getExamQuestionpool();
            //试卷库大项
            Set<ExamSection> examSections = examQuestionpool.getExamSections();
            //遍历试卷库大项获取题目题号
            for (ExamSection examSection : examSections) {
                Set<TAssignmentItem> tAssignmentItemSet = examSection.getTAssignmentItems();
                //每个题目的分数
                double eachItemScore = examSection.getItemScore();
                for (TAssignmentItem tAssignmentItem : tAssignmentItemSet) {
                    itemList.add(tAssignmentItem);
                    itemScoreMap.put(tAssignmentItem.getId(), eachItemScore);
                    //获取这个item 的answer
                    Set<TAssignmentAnswer> tAssignmentAnswers = tAssignmentItem.getTAssignmentAnswers();
                    for (TAssignmentAnswer answer : tAssignmentAnswers) {
                        itemAnswerMap.put(answer.getId(), answer);
                    }
                }
            }
        }
        if (exam.getExamQuestionpool() == null) {//试卷来源于题库
            for (TAssignmentItem item : itemList) {
                itemId = item.getId();
                int count = 0;
                score = "0";
                List<String> answersArray = new ArrayList<String>();
                sqlList = new ArrayList<String>();
                //获取这道题学生选择的答案
                String[] answers = answerMap.get("answers" + itemId);
                String[] answertexts = answerMap.get("answertexts" + itemId);
                if (answers != null && answers.length > 0) {
                    for (int i = 0; i < answers.length; i++) {
                        // 对错题判断和单选题判断
                        if (item.getType() == 2 || item.getType() == 4) {
                            TAssignmentAnswer tAssignmentAnswer = itemAnswerMap.get(Integer.valueOf(answers[i]));
                            if (tAssignmentAnswer.getIscorrect() == 1) {
                                score = item.getScore().toString();
                                totalScore = totalScore.add(new BigDecimal(item.getScore()));
                            }
                        }
                        // 填空题题判断
                        if (item.getType() == 8 && answertexts[i] != null) {
                            boolean isTrue = true;
                            // 针对isorder为空的填空以及有序填空
                            if (item.getIsOrder() == null || ("").equals(item.getIsOrder()) || item.getIsOrder() == 1) {
                                // 有序填空题
                               /* System.out.println("======answertexts"+answertexts[i]);
                                System.out.println("======answers"+answers[i]);
                                System.out.println("======answers=="+answers[i]+"===="+itemAnswerMap.get(Integer.valueOf(answers[i])).getText());*/
                               /* Integer parentId= tAssignmentAnswerJPA.getOne(Integer.valueOf(answers[i])).getTAssignmentItem().getItemParent();
                                if(parentId!=null){
                                   List<TAssignmentAnswer> t= tAssignmentAnswerJPA.findAnswersByTAssignmentId(parentId);
                                    for (TAssignmentAnswer t1:t) {
//                                        if(t1.getId().equals(Integer.valueOf(answers[i]))){
                                            if (answertexts[i].trim().equals(t1.getText())) {
                                                count++;
                                                isTrue = false;
                                            }
//                                        }
                                    }
                                }else {*/

                                String a = answertexts[i].trim();//学生提交答案
                                String b = itemAnswerMap.get(Integer.valueOf(answers[i])).getText().trim().toString();//题目中的正确答案
                                //将页面表单中的 ASCII 码160 空格替换为ASCII 码 32普通空格
                                a = a.replaceAll("\\u00A0+", " ");
                                b = b.replaceAll("\\u00A0+", " ");
                                if (a.equals(b)) {
                                    count++;
                                    isTrue = false;
                                }
                                /* }*/
                            } else if (item.getIsOrder() == 0) {
                                List<TAssignmentAnswer> answerList = new ArrayList<>(item.getTAssignmentAnswers());
                                // 无序填空题
                                for (int j = 0; j < answerList.size(); j++) {
                                    String a = answertexts[i].trim();//学生提交答案
                                    String b = answerList.get(j).getText();//题目中的正确答案
                                    //将页面表单中的 ASCII 码160 空格替换为ASCII 码 32普通空格
                                    a = a.replaceAll("\\u00A0+", " ");
                                    b = b.replaceAll("\\u00A0+", " ");
                                    if (a.equals(b)) {
                                        // 如果答案正确，则移除掉该答案
                                        item.getTAssignmentAnswers().remove(answerList.get(j));
                                        count++;
                                        isTrue = false;
                                    }
                                }
                            }
                            /*
                            if (isTrue) {
                                TAssignmentAnswer tAssignmentAnswer = tAssignmentAnswerJPA.getOne(Integer.valueOf(answers[i]));
                                tAssignmentAnswer.setGrade("0");
                                tAssignmentAnswer.setIscorrect(0);
                                tAssignmentAnswer.setScore(new BigDecimal(item.getScore()));
                                tAssignmentAnswerJPA.saveAndFlush(tAssignmentAnswer);
                            }
                            */
                        }
                        if (answertexts != null) {
                            if (item.getType() == 8) {
                                answerText = answertexts[i].trim();
                                answerText = answerText.replaceAll("'", "''");
                            }
                        }
                        //
                        String answerId = "";
                        if (item.getType() != 5) {
                            answerId = "'" + answers[i] + "'";
                        }
                        if (item.getType() != 8 && item.getType() != 5) {
                            answerText = "";
                        }
                        if (item.getType() != 5) {
                            sqlList.add("('" + tAssignmentId + "','" + itemId + "'," + answerId + ",'" + answerText + "','" + username + "','" + currentTime + "','1'," + grading + ",");
                        }

                    }
                }
                // 简答题系统判分
                if (item.getType() == 5) {
                    BigDecimal testScore = new BigDecimal(0.0);
                    int rightSize = 0;
                    if (answers != null && answers.length > 0) {
                        //过滤、转义富文本框的特殊字符以及标签
                        String text = answertexts[0].trim();
                        // <p>段落替换为换行
                        text = text.replaceAll("<p .*?>", "\r\n");
                        // <br><br/>替换为换行
                        text = text.replaceAll("<br\\s*/?>", "\r\n");
                        // 去掉其它的<>之间的东西
                        text = text.replaceAll("\\<.*?>", "");
                        //转义
                        text = StringEscapeUtils.unescapeHtml4(text);
                        if (answertexts.length > 0) {
                            for (int j = 0; j < answers.length; j++) {
                                TAssignmentAnswer tAssignmentAnswer = itemAnswerMap.get(Integer.valueOf(answers[j]));
                                //标准答案
                                if (tAssignmentAnswer.getIscorrect() == 1 && tAssignmentAnswer.getWeight() != null) {
                                    //相似度算法
                                    try {
                                        double sim = similarity.getSimilarity(text.replaceAll("\\u00A0+", " "), tAssignmentAnswer.getText().replaceAll("\\u00A0+", " "));
                                        totalScore = totalScore.add(new BigDecimal(item.getScore()).multiply(new BigDecimal(tAssignmentAnswer.getWeight())).multiply(new BigDecimal(sim)));
                                        testScore = testScore.add(new BigDecimal(item.getScore()).multiply(new BigDecimal(tAssignmentAnswer.getWeight())).multiply(new BigDecimal(sim)));
                                    } catch (IOException e) {
                                        e.printStackTrace();
                                    }
                                } else if (tAssignmentAnswer.getIscorrect() == 1 && tAssignmentAnswer.getWeight() == null) {
                                    if (text.replaceAll("\\u00A0+", " ").contains(tAssignmentAnswer.getText().replaceAll("\\u00A0+", " "))) {
                                        totalScore = totalScore.add(new BigDecimal(item.getScore()).multiply(new BigDecimal(1).divide(new BigDecimal(answers.length), 2, BigDecimal.ROUND_HALF_EVEN)));// 分数比例
                                        testScore = testScore.add(new BigDecimal(item.getScore()).multiply(new BigDecimal(1).divide(new BigDecimal(answers.length), 2, BigDecimal.ROUND_HALF_EVEN)));// 分数比例
                                    }
                                }
                                //关键词
                                else if (tAssignmentAnswer.getIscorrect() == 0) {
                                    if (text.replaceAll("\\u00A0+", " ").contains(tAssignmentAnswer.getText().replaceAll("\\u00A0+", " "))) {
                                        totalScore = totalScore.add(new BigDecimal(item.getScore()).multiply(new BigDecimal(tAssignmentAnswer.getWeight())));// 分数比例
                                        testScore = testScore.add(new BigDecimal(item.getScore()).multiply(new BigDecimal(tAssignmentAnswer.getWeight())));// 分数比例
                                    }
                                }
                            }
                            score = testScore.toString();
                            answerText = answertexts[0].trim();
                            answerText = answerText.replaceAll("'", "''");
                        } else {
                            answerText = "";
                        }
                        sqlList.add("('" + tAssignmentId + "','" + itemId + "',null,'" + answerText + "','" + username + "','" + currentTime + "','1'," + grading + ",");
                    }
                }
                if (item.getType() == 8 && count != 0) {
                    BigDecimal itemScore = new BigDecimal(item.getScore());
                    //以小题得分除以总空格数并乘以答对的空格数计算得分
                    //保留两位小数
                    totalScore = totalScore.add(itemScore.multiply(new BigDecimal(count)).divide(new BigDecimal(answers.length), 2, BigDecimal.ROUND_HALF_EVEN));
                    score = itemScore.multiply(new BigDecimal(count)).divide(new BigDecimal(answers.length), 2, BigDecimal.ROUND_HALF_EVEN).toString();
                }

                //多选题
                if (item.getType() == 1) {
                    for (TAssignmentAnswer tAssignmentAnswer : item.getTAssignmentAnswers()) {
                        if (tAssignmentAnswer.getIscorrect() == 1) {
                            answersArray.add(tAssignmentAnswer.getId().toString());
                        }
                    }
                    count = compare(answers, answersArray);
                    if (count != 0) {
                        score = new BigDecimal(count / 2.0).multiply(new BigDecimal(item.getScore())).toString();
                        totalScore = totalScore.add(new BigDecimal(count / 2.0).multiply(new BigDecimal(item.getScore())));
                    }
                }
                for (String string : sqlList) {
                    sql += string + "'" + score + "'),";
                }
            }
        } else {//试卷来源于试卷库
            for (TAssignmentItem item : itemList) {
                itemId = item.getId();
                int count = 0;
                score = "0";
                List<String> answersArray = new ArrayList<String>();
                sqlList = new ArrayList<String>();
                //获取这道题学生选择的答案
                String[] answers = answerMap.get("answers" + itemId);
                String[] answertexts = answerMap.get("answertexts" + itemId);
                if (answers != null && answers.length > 0) {
                    for (int i = 0; i < answers.length; i++) {
                        // 对错题判断和单选题判断
                        if (item.getType() == 2 || item.getType() == 4) {
                            TAssignmentAnswer tAssignmentAnswer = itemAnswerMap.get(Integer.valueOf(answers[i]));
                            if (tAssignmentAnswer.getIscorrect() == 1) {
                                score = Double.toString(itemScoreMap.get(item.getId()));
                                totalScore = totalScore.add(new BigDecimal(itemScoreMap.get(item.getId())));
                            }
                        }
                        // 填空题题判断
                        if (item.getType() == 8) {
                            if (answertexts[i] != null && answertexts[i].trim().replaceAll("\\u00A0+", " ").equals(itemAnswerMap.get(Integer.valueOf(answers[i])).getText().replaceAll("\\u00A0+", " "))) {
                                count++;
                            }
                        }
                        if (answertexts != null) {
                            if (item.getType() == 8) {
                                answerText = answertexts[i].trim();
                                answerText = answerText.replaceAll("'", "''");
                            }
                        }
                        //
                        String answerId = "";
                        if (item.getType() != 5) {
                            answerId = "'" + answers[i] + "'";
                        }
                        if (item.getType() != 8 && item.getType() != 5) {
                            answerText = "";
                        }
                        if (item.getType() != 5) {
                            sqlList.add("('" + tAssignmentId + "','" + itemId + "'," + answerId + ",'" + answerText + "','" + username + "','" + currentTime + "','1'," + grading + ",");
                        }

                    }
                }
                // 简答题系统判分
                if (item.getType() == 5) {
                    BigDecimal testScore = new BigDecimal(0.0);
                    int rightSize = 0;
                    if (answers != null && answers.length > 0) {
                        if (answertexts.length > 0) {
                            //过滤、转义富文本框的特殊字符以及标签
                            String text = answertexts[0].trim();
                            // <p>段落替换为换行
                            text = text.replaceAll("<p .*?>", "\r\n");
                            // <br><br/>替换为换行
                            text = text.replaceAll("<br\\s*/?>", "\r\n");
                            // 去掉其它的<>之间的东西
                            text = text.replaceAll("\\<.*?>", "");
                            //转义
                            text = StringEscapeUtils.unescapeHtml4(text);
                            for (int j = 0; j < answers.length; j++) {
                                TAssignmentAnswer tAssignmentAnswer = itemAnswerMap.get(Integer.valueOf(answers[j]));
                                //标准答案
                                if (tAssignmentAnswer.getIscorrect() == 1 && tAssignmentAnswer.getWeight() != null) {
                                    //相似度算法
                                    try {
                                        double sim = similarity.getSimilarity(text.replaceAll("\\u00A0+", " "), tAssignmentAnswer.getText().replaceAll("\\u00A0+", " "));
                                        totalScore = totalScore.add(new BigDecimal(item.getScore()).multiply(new BigDecimal(tAssignmentAnswer.getWeight())).multiply(new BigDecimal(sim)));
                                        testScore = testScore.add(new BigDecimal(item.getScore()).multiply(new BigDecimal(tAssignmentAnswer.getWeight())).multiply(new BigDecimal(sim)));
                                    } catch (IOException e) {
                                        e.printStackTrace();
                                    }
                                } else if (tAssignmentAnswer.getIscorrect() == 1 && tAssignmentAnswer.getWeight() == null) {
                                    if (text.replaceAll("\\u00A0+", " ").contains(tAssignmentAnswer.getText().replaceAll("\\u00A0+", " "))) {
                                        totalScore = totalScore.add(new BigDecimal(item.getScore()).multiply(new BigDecimal(1).divide(new BigDecimal(answers.length), 2, BigDecimal.ROUND_HALF_EVEN)));// 分数比例
                                        testScore = testScore.add(new BigDecimal(item.getScore()).multiply(new BigDecimal(1).divide(new BigDecimal(answers.length), 2, BigDecimal.ROUND_HALF_EVEN)));// 分数比例
                                    }
                                }
                                //关键词
                                else if (tAssignmentAnswer.getIscorrect() == 0) {
                                    if (text.replaceAll("\\u00A0+", " ").contains(tAssignmentAnswer.getText().replaceAll("\\u00A0+", " "))) {
                                        totalScore = totalScore.add(new BigDecimal(item.getScore()).multiply(new BigDecimal(tAssignmentAnswer.getWeight())));// 分数比例
                                        testScore = testScore.add(new BigDecimal(item.getScore()).multiply(new BigDecimal(tAssignmentAnswer.getWeight())));// 分数比例
                                    }
                                }
                            }
                            score = testScore.toString();
                            answerText = answertexts[0].trim();
                            answerText = answerText.replaceAll("'", "''");
                        } else {
                            answerText = "";
                        }
                        sqlList.add("('" + tAssignmentId + "','" + itemId + "',null,'" + answerText + "','" + username + "','" + currentTime + "','1'," + grading + ",");
                    }
                }
                if (item.getType() == 8) {
                    if (count != 0) {//如果有答对的题，计入得分
                        BigDecimal itemScore = new BigDecimal(itemScoreMap.get(item.getId()));
                        //以小题得分除以总空格数并乘以答对的空格数计算得分
                        //保留两位小数
                        totalScore = totalScore.add(itemScore.multiply(new BigDecimal(count)).divide(new BigDecimal(answers.length), 2, BigDecimal.ROUND_HALF_EVEN));
                        score = itemScore.multiply(new BigDecimal(count)).divide(new BigDecimal(answers.length), 2, BigDecimal.ROUND_HALF_EVEN).toString();
                    }
                }
                //多选题
                if (item.getType() == 1) {
                    for (TAssignmentAnswer tAssignmentAnswer : item.getTAssignmentAnswers()) {
                        if (tAssignmentAnswer.getIscorrect() == 1) {
                            answersArray.add(tAssignmentAnswer.getId().toString());
                        }
                    }
                    count = compare(answers, answersArray);
                    if (count != 0) {
                        score = new BigDecimal(count / 2.0).multiply(new BigDecimal(itemScoreMap.get(item.getId()))).toString();
                        totalScore = totalScore.add(new BigDecimal(count / 2.0).multiply(new BigDecimal(itemScoreMap.get(item.getId()))));
                    }

                }
                for (String string : sqlList) {
                    sql += string + "'" + score + "'),";
                }
            }
        }
        if (!"".equals(sql)) {
            sql = basesql + sql.substring(0, sql.length() - 1);
            entityManager.createNativeQuery(sql).executeUpdate();
        }

        return totalScore;
    }

    @Override
    public BigDecimal saveTAssignmentItemMappingRedis(Map<String, String[]> answerMap, Integer assignmentId, Integer submitTime, UserVo userVo, Integer grading) {
        Similarity similarity = new Similarity();
        // 初始化当前时间
        String currentTime = DateFormatUtil.date2String(new Date(), "yyyy-MM-dd HH:mm:ss");
        // 获取当前试卷对象
        TAssignment exam = tAssignmentJPA.findOne(assignmentId);
        Integer tAssignmentId = exam.getId();
        Integer itemId;
        String username = userVo.getUsername();
        String answerText = "";
        String score;
        BigDecimal totalScore = new BigDecimal(0);
        List<TAssignmentItemMappingDTO> tAssignmentItemMappingDTOList = new ArrayList<>(32);
        // 获取当前考试的当前学生的题目列表
        List<TAssignmentItem> itemList = new ArrayList<>();
        // 试题的答案
        Map<Integer, TAssignmentAnswer> itemAnswerMap = new HashMap<>();
        // 每个题目的分数（用于试卷库中的题目）
        Map<Integer, Double> itemScoreMap = new HashMap<>();
        if (exam.getExamQuestionpool() == null) {
            // 试卷来源于题库
            Set<TAssignmentSection> tAssignmentSections = exam.getTAssignmentSections();
            for (TAssignmentSection section : tAssignmentSections) {
                // 当前考试的试题列表
                Set<TAssignmentItem> tAssignmentItems = section.getTAssignmentItems();
                for (TAssignmentItem item : tAssignmentItems) {
                    itemList.add(item);
                    // 获取这个item 的answer
                    Set<TAssignmentAnswer> tAssignmentAnswers = item.getTAssignmentAnswers();
                    for (TAssignmentAnswer answer : tAssignmentAnswers) {
                        itemAnswerMap.put(answer.getId(), answer);
                    }
                }
            }
        } else {
            // 试卷来源于试卷库
            // 试卷库
            ExamQuestionpool examQuestionpool = exam.getExamQuestionpool();
            // 试卷库大项
            Set<ExamSection> examSections = examQuestionpool.getExamSections();
            // 遍历试卷库大项获取题目题号
            for (ExamSection examSection : examSections) {
                Set<TAssignmentItem> tAssignmentItemSet = examSection.getTAssignmentItems();
                // 每个题目的分数
                double eachItemScore = examSection.getItemScore();
                for (TAssignmentItem tAssignmentItem : tAssignmentItemSet) {
                    itemList.add(tAssignmentItem);
                    itemScoreMap.put(tAssignmentItem.getId(), eachItemScore);
                    // 获取这个item 的answer
                    Set<TAssignmentAnswer> tAssignmentAnswers = tAssignmentItem.getTAssignmentAnswers();
                    for (TAssignmentAnswer answer : tAssignmentAnswers) {
                        itemAnswerMap.put(answer.getId(), answer);
                    }
                }
            }
        }
        if (exam.getExamQuestionpool() == null) {
            // 试卷来源于题库
            for (TAssignmentItem item : itemList) {
                itemId = item.getId();
                int count = 0;
                score = "0";
                List<String> answersArray = new ArrayList<String>();
                List<TAssignmentItemMappingDTO> selectItemList = new ArrayList<>();
                // 获取这道题学生选择的答案
                String[] answers = answerMap.get("answers" + itemId);
                String[] answertexts = answerMap.get("answertexts" + itemId);
                if (answers != null && answers.length > 0) {
                    for (int i = 0; i < answers.length; i++) {
                        // 对错题判断和单选题判断
                        if (item.getType() == 2 || item.getType() == 4) {
                            TAssignmentAnswer tAssignmentAnswer = itemAnswerMap.get(Integer.valueOf(answers[i]));
                            if (tAssignmentAnswer.getIscorrect() == 1) {
                                score = item.getScore().toString();
                                totalScore = totalScore.add(new BigDecimal(item.getScore()));
                            }
                        }
                        // 填空题题判断
                        if (item.getType() == 8 && answertexts[i] != null) {
                            // 针对isorder为空的填空以及有序填空
                            if (item.getIsOrder() == null || ("").equals(item.getIsOrder()) || item.getIsOrder() == 1) {
                                // 有序填空题 replaceAll("\\u00A0+", " ")将页面表单中的 ASCII 码160 空格替换为ASCII 码 32普通空格
                                String StandardAnswer = itemAnswerMap.get(Integer.valueOf(answers[i])).getText().replaceAll("\\u00A0+", " ");
                                Boolean flag = false;
                                String[] split = StandardAnswer.split("\\|");
                                for (String s : split) {
                                    Boolean flag1 = true;//标识学生答案符合一种情况，后面用分隔符划分的标准答案也就不用判断了
                                    if (s.contains("*")) {
                                        String[] split1 = s.split("\\*");
                                        String answerByStu = answertexts[i].trim().replaceAll("\\u00A0+", " ");
                                        for (String s1 : split1) {
                                            if (answerByStu.contains(s1)) {
                                                answerByStu = answerByStu.substring(answerByStu.indexOf(s1) + 1);
                                            } else {
                                                flag1 = false;
                                                break;
                                            }
                                        }
                                    } else {
                                        if (!answertexts[i].trim().replaceAll("\\u00A0+", " ").equals(s)) {
                                            flag1 = false;
                                        }
                                    }
                                    if (flag1) {
                                        flag = true;
                                        break;
                                    }
                                }
                                if (flag) {
                                    count++;
                                }
                            } else if (item.getIsOrder() == 0) {
                                List<TAssignmentAnswer> answerList = new ArrayList<>(item.getTAssignmentAnswers());
                                // 无序填空题
                                for (int j = 0; j < answerList.size(); j++) {
                                    if (answertexts[i].trim().replaceAll("\\u00A0+", " ").equals(answerList.get(j).getText().replaceAll("\\u00A0+", " "))) {
                                        // 如果答案正确，则移除掉该答案
                                        item.getTAssignmentAnswers().remove(answerList.get(j));
                                        count++;
                                    }
                                }
                            }
                            /*
                            if (isTrue) {
                                TAssignmentAnswer tAssignmentAnswer = tAssignmentAnswerJPA.getOne(Integer.valueOf(answers[i]));
                                tAssignmentAnswer.setGrade("0");
                                tAssignmentAnswer.setIscorrect(0);
                                tAssignmentAnswer.setScore(new BigDecimal(item.getScore()));
                                tAssignmentAnswerJPA.saveAndFlush(tAssignmentAnswer);
                            }
                            */
                        }
                        if (answertexts != null) {
                            if (item.getType() == 8) {
                                answerText = answertexts[i].trim();
                            }
                        }
                        String answerId = "";
                        if (item.getType() != 5) {
                            answerId = answers[i];
                        }
                        if (item.getType() != 8 && item.getType() != 5) {
                            answerText = "";
                        }
                        if (item.getType() != 5) {
                            TAssignmentItemMappingDTO tAssignmentItemMappingDTO = new TAssignmentItemMappingDTO();
                            tAssignmentItemMappingDTO.setAssignmentId(tAssignmentId);
                            tAssignmentItemMappingDTO.setItemId(itemId);
                            tAssignmentItemMappingDTO.setAnswerId(Integer.valueOf(answerId));
                            tAssignmentItemMappingDTO.setAnswerText(answerText);
                            tAssignmentItemMappingDTO.setStudent(username);
                            tAssignmentItemMappingDTO.setSubmitDate(currentTime);
                            tAssignmentItemMappingDTO.setSubmitTime(1);
                            tAssignmentItemMappingDTO.setGradingId(grading);
                            selectItemList.add(tAssignmentItemMappingDTO);
                        }
                    }
                }
                // 简答题系统判分
                if (item.getType() == 5 && (item.getIsOrder() == null || item.getIsOrder() == 1)) {
                    BigDecimal testScore = new BigDecimal(0.0);
                    int rightSize = 0;
                    if (answers != null && answers.length > 0) {
                        if (answertexts.length > 0) {
                            //过滤、转义富文本框的特殊字符以及标签
                            String text = answertexts[0].trim();
                            // <p>段落替换为换行
                            text = text.replaceAll("<p .*?>", "\r\n");
                            // <br><br/>替换为换行
                            text = text.replaceAll("<br\\s*/?>", "\r\n");
                            // 去掉其它的<>之间的东西
                            text = text.replaceAll("\\<.*?>", "");
                            //转义
                            text = StringEscapeUtils.unescapeHtml4(text);
                            for (int j = 0; j < answers.length; j++) {
                                TAssignmentAnswer tAssignmentAnswer = itemAnswerMap.get(Integer.valueOf(answers[j]));
                                //标准答案
                                if (tAssignmentAnswer.getIscorrect() == 1 && tAssignmentAnswer.getWeight() != null) {
                                    //相似度算法
                                    try {
                                        double sim = similarity.getSimilarity(text.replaceAll("\\u00A0+", " "), tAssignmentAnswer.getText().replaceAll("\\u00A0+", " "));
                                        totalScore = totalScore.add(new BigDecimal(item.getScore()).multiply(new BigDecimal(tAssignmentAnswer.getWeight())).multiply(new BigDecimal(sim)));
                                        testScore = testScore.add(new BigDecimal(item.getScore()).multiply(new BigDecimal(tAssignmentAnswer.getWeight())).multiply(new BigDecimal(sim)));
                                    } catch (IOException e) {
                                        e.printStackTrace();
                                    }
                                } else if (tAssignmentAnswer.getIscorrect() == 1 && tAssignmentAnswer.getWeight() == null) {
                                    if (text.replaceAll("\\u00A0+", " ").contains(tAssignmentAnswer.getText().replaceAll("\\u00A0+", " "))) {
                                        totalScore = totalScore.add(new BigDecimal(item.getScore()).multiply(new BigDecimal(1).divide(new BigDecimal(answers.length), 2, BigDecimal.ROUND_HALF_EVEN)));// 分数比例
                                        testScore = testScore.add(new BigDecimal(item.getScore()).multiply(new BigDecimal(1).divide(new BigDecimal(answers.length), 2, BigDecimal.ROUND_HALF_EVEN)));// 分数比例
                                    }
                                }
                                //关键词
                                else if (tAssignmentAnswer.getIscorrect() == 0) {
                                    if (text.replaceAll("\\u00A0+", " ").contains(tAssignmentAnswer.getText().replaceAll("\\u00A0+", " "))) {
                                        totalScore = totalScore.add(new BigDecimal(item.getScore()).multiply(new BigDecimal(tAssignmentAnswer.getWeight())));// 分数比例
                                        testScore = testScore.add(new BigDecimal(item.getScore()).multiply(new BigDecimal(tAssignmentAnswer.getWeight())));// 分数比例
                                    }
                                }
                            }
                            score = testScore.toString();
                            answerText = answertexts[0].trim();
                        } else {
                            answerText = "";
                        }
                        TAssignmentItemMappingDTO tAssignmentItemMappingDTO = new TAssignmentItemMappingDTO();
                        tAssignmentItemMappingDTO.setAssignmentId(tAssignmentId);
                        tAssignmentItemMappingDTO.setItemId(itemId);
                        tAssignmentItemMappingDTO.setStudent(username);
                        tAssignmentItemMappingDTO.setAnswerText(answerText);
                        tAssignmentItemMappingDTO.setSubmitDate(currentTime);
                        tAssignmentItemMappingDTO.setSubmitTime(1);
                        tAssignmentItemMappingDTO.setGradingId(grading);
                        selectItemList.add(tAssignmentItemMappingDTO);
                    }
                }
                //简答题手动判题，只存提交记录，不计算
                if (item.getIsOrder() != null) {
                    if (item.getType() == 5 && item.getIsOrder() == 0) {
                        TAssignmentItemMappingDTO tAssignmentItemMappingDTO = new TAssignmentItemMappingDTO();
                        tAssignmentItemMappingDTO.setAssignmentId(tAssignmentId);
                        tAssignmentItemMappingDTO.setItemId(itemId);
                        if (answerText != null && answertexts.length > 0) {
                            tAssignmentItemMappingDTO.setAnswerText(answertexts[0].trim());
                        } else {
                            tAssignmentItemMappingDTO.setAnswerText("");
                            tAssignmentItemMappingDTO.setStudent(username);
                            tAssignmentItemMappingDTO.setSubmitDate(currentTime);
                            tAssignmentItemMappingDTO.setSubmitTime(1);
                            tAssignmentItemMappingDTO.setGradingId(grading);
                            selectItemList.add(tAssignmentItemMappingDTO);
                        }
                    }
                }
                if (item.getType() == 8 && count != 0) {
                    BigDecimal itemScore = new BigDecimal(item.getScore());
                    //以小题得分除以总空格数并乘以答对的空格数计算得分
                    //保留两位小数
                    totalScore = totalScore.add(itemScore.multiply(new BigDecimal(count)).divide(new BigDecimal(answers.length), 2, BigDecimal.ROUND_HALF_EVEN));
                    score = itemScore.multiply(new BigDecimal(count)).divide(new BigDecimal(answers.length), 2, BigDecimal.ROUND_HALF_EVEN).toString();
                }
                //多选题
                if (item.getType() == 1) {
                    for (TAssignmentAnswer tAssignmentAnswer : item.getTAssignmentAnswers()) {
                        if (tAssignmentAnswer.getIscorrect() == 1) {
                            answersArray.add(tAssignmentAnswer.getId().toString());
                        }
                    }
                    count = compare(answers, answersArray);
                    if (count != 0) {
                        score = new BigDecimal(count / 2.0).multiply(new BigDecimal(item.getScore())).toString();
                        totalScore = totalScore.add(new BigDecimal(count / 2.0).multiply(new BigDecimal(item.getScore())));
                    }
                }

                for (TAssignmentItemMappingDTO tAssignmentItemMappingDTO : selectItemList) {
                    if (tAssignmentItemMappingDTO.getAssignmentId() != null) {
                        tAssignmentItemMappingDTO.setAutoScore(Double.valueOf(score));
                        tAssignmentItemMappingDTOList.add(tAssignmentItemMappingDTO);
                    }
                }

            }
        } else {
            // 试卷来源于试卷库
            for (TAssignmentItem item : itemList) {
                List<TAssignmentItemMappingDTO> selectItemList = new ArrayList<>(4);
                itemId = item.getId();
                int count = 0;
                score = "0";
                List<String> answersArray = new ArrayList<String>();
                //获取这道题学生选择的答案
                String[] answers = answerMap.get("answers" + itemId);
                String[] answertexts = answerMap.get("answertexts" + itemId);
                if (answers != null && answers.length > 0) {
                    for (int i = 0; i < answers.length; i++) {
                        // 对错题判断和单选题判断
                        if (item.getType() == 2 || item.getType() == 4) {
                            TAssignmentAnswer tAssignmentAnswer = itemAnswerMap.get(Integer.valueOf(answers[i]));
                            if (tAssignmentAnswer.getIscorrect() == 1) {
                                score = Double.toString(itemScoreMap.get(item.getId()));
                                totalScore = totalScore.add(new BigDecimal(itemScoreMap.get(item.getId())));
                            }
                        }
                        // 填空题题判断
//                        if (item.getType() == 8) {
//                            if (answertexts[i] != null && answertexts[i].trim().replaceAll("\\u00A0+", " ").equals(itemAnswerMap.get(Integer.valueOf(answers[i])).getText().replaceAll("\\u00A0+", " "))) {
//                                count++;
//                            }
//                        }
                        if (item.getType() == 8 && answertexts[i] != null) {
                            Boolean flag = false;
                            // 针对isorder为空的填空以及有序填空
                            if (item.getIsOrder() == null || ("").equals(item.getIsOrder()) || item.getIsOrder() == 1) {
                                // 有序填空题 replaceAll("\\u00A0+", " ")将页面表单中的 ASCII 码160 空格替换为ASCII 码 32普通空格
                                String StandardAnswer = itemAnswerMap.get(Integer.valueOf(answers[i])).getText().replaceAll("\\u00A0+", " ");
                                String[] split = StandardAnswer.split("\\|");
                                for (String s : split) {
                                    if (s.contains("*")) {
                                        String[] split1 = s.split("\\*");
                                        String answerByStu = answertexts[i].trim().replaceAll("\\u00A0+", " ");
                                        for (String s1 : split1) {
                                            if (answerByStu.contains(s1)) {
                                                answerByStu = answerByStu.substring(answerByStu.indexOf(s1) + 1);
                                            } else {
                                                break;
                                            }
                                        }
                                    } else {
                                        if (answertexts[i].trim().replaceAll("\\u00A0+", " ").equals(itemAnswerMap.get(Integer.valueOf(answers[i])).getText().replaceAll("\\u00A0+", " "))) {

                                        } else {
                                            flag = false;
                                        }
                                    }
                                    if (flag) {
                                        count++;
                                        break;
                                    }
                                }
                            } else if (item.getIsOrder() == 0) {
                                List<TAssignmentAnswer> answerList = new ArrayList<>(item.getTAssignmentAnswers());
                                // 无序填空题
                                for (int j = 0; j < answerList.size(); j++) {
                                    String[] split = answerList.get(j).getText().split("\\|");
                                    for (String s : split) {
                                        if (s.contains("*")) {
                                            String[] split1 = s.split("\\*");
                                            String answerByStu = answertexts[i].trim().replaceAll("\\u00A0+", " ");
                                            for (String s1 : split1) {
                                                if (answerByStu.contains(s1)) {
                                                    answerByStu = answerByStu.substring(answerByStu.indexOf(s1) + 1);
                                                } else {
                                                    flag = false;
                                                    break;
                                                }
                                            }
                                        } else {
                                            if (answertexts[i].trim().replaceAll("\\u00A0+", " ").equals(answerList.get(j).getText().replaceAll("\\u00A0+", " "))) {

                                            } else {
                                                flag = false;
                                            }
                                        }
                                        if (flag) {
                                            item.getTAssignmentAnswers().remove(answerList.get(j));
                                            count++;
                                            break;
                                        }
                                    }
                                }
                            }
                            if (flag) {
                                count++;
                            }
                        }
                        if (answertexts != null) {
                            if (item.getType() == 8) {
                                answerText = answertexts[i].trim();
                            }
                        }
                        String answerId = "";
                        if (item.getType() != 5) {
                            answerId = answers[i];
                        }
                        if (item.getType() != 8 && item.getType() != 5) {
                            answerText = "";
                        }
                        if (item.getType() != 5) {
                            TAssignmentItemMappingDTO tAssignmentItemMappingDTO = new TAssignmentItemMappingDTO();
                            tAssignmentItemMappingDTO.setAssignmentId(tAssignmentId);
                            tAssignmentItemMappingDTO.setItemId(itemId);
                            tAssignmentItemMappingDTO.setAnswerId(Integer.valueOf(answerId));
                            tAssignmentItemMappingDTO.setAnswerText(answerText);
                            tAssignmentItemMappingDTO.setStudent(username);
                            tAssignmentItemMappingDTO.setSubmitDate(currentTime);
                            tAssignmentItemMappingDTO.setSubmitTime(1);
                            tAssignmentItemMappingDTO.setGradingId(grading);
                            selectItemList.add(tAssignmentItemMappingDTO);
                        }
                    }
                }
                // 简答题系统判分
                if (item.getType() == 5 && (item.getIsOrder() == 1 || item.getIsOrder() == null)) {
                    BigDecimal testScore = new BigDecimal(0.0);
                    int rightSize = 0;
                    if (answers != null && answers.length > 0) {
                        //判断学生答了题
                        if (answertexts.length > 0) {
                            //过滤、转义富文本框的特殊字符以及标签
                            String text = answertexts[0].trim();
                            // <p>段落替换为换行
                            text = text.replaceAll("<p .*?>", "\r\n");
                            // <br><br/>替换为换行
                            text = text.replaceAll("<br\\s*/?>", "\r\n");
                            // 去掉其它的<>之间的东西
                            text = text.replaceAll("\\<.*?>", "");
                            //转义
                            text = StringEscapeUtils.unescapeHtml4(text);
                            for (int j = 0; j < answers.length; j++) {
                                TAssignmentAnswer tAssignmentAnswer = itemAnswerMap.get(Integer.valueOf(answers[j]));
                                //标准答案
                                if (tAssignmentAnswer.getIscorrect() == 1 && tAssignmentAnswer.getWeight() != null) {
                                    //相似度算法
                                    try {
                                        double sim = similarity.getSimilarity(text.replaceAll("\\u00A0+", " "), tAssignmentAnswer.getText().replaceAll("\\u00A0+", " "));
                                        totalScore = totalScore.add(new BigDecimal(item.getScore()).multiply(new BigDecimal(tAssignmentAnswer.getWeight())).multiply(new BigDecimal(sim)));
                                        testScore = testScore.add(new BigDecimal(item.getScore()).multiply(new BigDecimal(tAssignmentAnswer.getWeight())).multiply(new BigDecimal(sim)));
                                    } catch (IOException e) {
                                        e.printStackTrace();
                                    }
                                } else if (tAssignmentAnswer.getIscorrect() == 1 && tAssignmentAnswer.getWeight() == null) {
                                    if (text.replaceAll("\\u00A0+", " ").contains(tAssignmentAnswer.getText().replaceAll("\\u00A0+", " "))) {
                                        totalScore = totalScore.add(new BigDecimal(item.getScore()).multiply(new BigDecimal(1).divide(new BigDecimal(answers.length), 2, BigDecimal.ROUND_HALF_EVEN)));// 分数比例
                                        testScore = testScore.add(new BigDecimal(item.getScore()).multiply(new BigDecimal(1).divide(new BigDecimal(answers.length), 2, BigDecimal.ROUND_HALF_EVEN)));// 分数比例
                                    }
                                }
                                //关键词
                                else if (tAssignmentAnswer.getIscorrect() == 0) {
                                    if (text.replaceAll("\\u00A0+", " ").contains(tAssignmentAnswer.getText().replaceAll("\\u00A0+", " "))) {
                                        totalScore = totalScore.add(new BigDecimal(item.getScore()).multiply(new BigDecimal(tAssignmentAnswer.getWeight())));// 分数比例
                                        testScore = testScore.add(new BigDecimal(item.getScore()).multiply(new BigDecimal(tAssignmentAnswer.getWeight())));// 分数比例
                                    }
                                }
                                TAssignmentItemMappingDTO tAssignmentItemMappingDTO = new TAssignmentItemMappingDTO();
                                tAssignmentItemMappingDTO.setAssignmentId(tAssignmentId);
                                tAssignmentItemMappingDTO.setItemId(itemId);
                                tAssignmentItemMappingDTO.setAnswerId(Integer.valueOf(answers[j]));
                                tAssignmentItemMappingDTO.setAnswerText(answertexts[0].trim());
                                tAssignmentItemMappingDTO.setStudent(username);
                                tAssignmentItemMappingDTO.setSubmitDate(currentTime);
                                tAssignmentItemMappingDTO.setSubmitTime(1);
                                tAssignmentItemMappingDTO.setGradingId(grading);
                                selectItemList.add(tAssignmentItemMappingDTO);
                            }
                            score = testScore.toString();
                        }//判断学生未答题
                        else {
                            for (int k = 0; k < answers.length; k++) {
                                TAssignmentItemMappingDTO tAssignmentItemMappingDTO = new TAssignmentItemMappingDTO();
                                tAssignmentItemMappingDTO.setAssignmentId(tAssignmentId);
                                tAssignmentItemMappingDTO.setItemId(itemId);
                                tAssignmentItemMappingDTO.setAnswerId(Integer.valueOf(answers[k]));
                                tAssignmentItemMappingDTO.setStudent(username);
                                tAssignmentItemMappingDTO.setSubmitDate(currentTime);
                                tAssignmentItemMappingDTO.setSubmitTime(1);
                                tAssignmentItemMappingDTO.setGradingId(grading);
                                selectItemList.add(tAssignmentItemMappingDTO);
                            }
                        }
                    }
                }
                //简答题手动判题，只存提交记录，不计算
                if (item.getType() == 5 && item.getIsOrder() == 0) {
                    for (int m = 0; m < answers.length; m++) {
                        TAssignmentItemMappingDTO tAssignmentItemMappingDTO = new TAssignmentItemMappingDTO();
                        tAssignmentItemMappingDTO.setAssignmentId(tAssignmentId);
                        tAssignmentItemMappingDTO.setItemId(itemId);
                        tAssignmentItemMappingDTO.setAnswerId(Integer.valueOf(answers[m]));
                        if (answertexts.length > 0) {
                            tAssignmentItemMappingDTO.setAnswerText(answertexts[0].trim());
                        }
                        tAssignmentItemMappingDTO.setStudent(username);
                        tAssignmentItemMappingDTO.setSubmitDate(currentTime);
                        tAssignmentItemMappingDTO.setSubmitTime(1);
                        tAssignmentItemMappingDTO.setGradingId(grading);
                        selectItemList.add(tAssignmentItemMappingDTO);
                    }
                }
                if (item.getType() == 8) {
                    if (count != 0) {//如果有答对的题，计入得分
                        BigDecimal itemScore = new BigDecimal(itemScoreMap.get(item.getId()));
                        // 以小题得分除以总空格数并乘以答对的空格数计算得分
                        // 保留两位小数
                        totalScore = totalScore.add(itemScore.multiply(new BigDecimal(count)).divide(new BigDecimal(answers.length), 2, BigDecimal.ROUND_HALF_EVEN));
                        score = itemScore.multiply(new BigDecimal(count)).divide(new BigDecimal(answers.length), 2, BigDecimal.ROUND_HALF_EVEN).toString();
                    }
                }
                // 多选题
                if (item.getType() == 1) {
                    for (TAssignmentAnswer tAssignmentAnswer : item.getTAssignmentAnswers()) {
                        if (tAssignmentAnswer.getIscorrect() == 1) {
                            answersArray.add(tAssignmentAnswer.getId().toString());
                        }
                    }
                    count = compare(answers, answersArray);
                    if (count != 0) {
                        score = new BigDecimal(count / 2.0).multiply(new BigDecimal(itemScoreMap.get(item.getId()))).toString();
                        totalScore = totalScore.add(new BigDecimal(count / 2.0).multiply(new BigDecimal(itemScoreMap.get(item.getId()))));
                    }
                }

                for (TAssignmentItemMappingDTO tAssignmentItemMappingDTO : selectItemList) {
                    if (tAssignmentItemMappingDTO.getAssignmentId() != null) {
                        tAssignmentItemMappingDTO.setAutoScore(Double.valueOf(score));
                        tAssignmentItemMappingDTOList.add(tAssignmentItemMappingDTO);
                    }
                }
            }
        }
        stringRedisTemplate.opsForHash().put(ConstantInterface.TAssignmentItemMappingKey + "-" + clientDatabaseContext.getCurrentDataSourceDto().getSchoolName(), username + "_assignmentId" + assignmentId + "_gradingId" + grading, JSONObject.toJSONString(tAssignmentItemMappingDTOList));
        return totalScore;
    }


    private int compare(String[] array, List<String> list) {
        int result = 2;
        if (array == null || array.length == 0 || array.length > list.size()) {
            result = 0;

        } else {
            if (array.length == list.size()) {
                for (String string : array) {
                    if (!list.contains(string)) {
                        result = 0;
                        break;
                    }
                }
            } else {
                result = 1;
                for (String string : array) {
                    if (!list.contains(string)) {
                        result = 0;
                        break;
                    }
                }
            }
        }

        return result;
    }

    /**************************************************************************
     * Description 开始考试，保存考试
     *
     * @author lixueteng
     * @date 2017-09-19
     **************************************************************************/
    @Transactional
    @Override
    public String saveExam(BigDecimal totalScore, Integer assignmentId, Integer submitTime, Integer simulation, Integer cid, UserVo userVo, Integer grading) {
        String result = "未更新成绩册";
        //如果为提交,则计入打分表
        if (submitTime > 0) {
            //将总分取整
            double dTotalScore = totalScore.doubleValue();
            int iTotalScore = (int) (dTotalScore + 0.5);
            totalScore = new BigDecimal(iTotalScore);
            Integer gradingId = this.saveTAssignmentGradeForTest(totalScore, assignmentId, submitTime, userVo, grading);
            if ((simulation == null || 1 != simulation) && gradingId != null) {
                //如果不是模拟，则根据测验查询成绩是否进成绩册
                TAssignment tAssignment = tAssignmentJPA.findOne(assignmentId);
                //设置试卷已经提交
                tAssignment.setStatus(1);
                tAssignmentJPA.save(tAssignment);
                result = gradeBookService.saveGradebook(cid, tAssignment.getId(), gradingId, userVo);
            }
        }
        if (submitTime == 0) {
            Integer tAssignmentGradeId = this.saveTAssignmentGradeForTest(totalScore, assignmentId, submitTime, userVo, grading);
        }
        return result;
    }

    @Override
    public String saveExamRedis(BigDecimal totalScore, Integer assignmentId, Integer submitTime, Integer simulation, Integer cid, UserVo userVo, Integer grading) {
        String result = "未更新成绩册";
        //如果为提交,则计入打分表
        if (submitTime > 0) {
            //将总分取整
            double dTotalScore = totalScore.doubleValue();
            int iTotalScore = (int) (dTotalScore + 0.5);
            totalScore = new BigDecimal(iTotalScore);
            Integer gradingId = this.saveTAssignmentGradeForTest(totalScore, assignmentId, submitTime, userVo, grading);
            if ((simulation == null || 1 != simulation) && gradingId != null) {
                //如果不是模拟，则根据测验查询成绩是否进成绩册
                TAssignment tAssignment = tAssignmentJPA.findOne(assignmentId);
                //设置试卷已经提交
                tAssignment.setStatus(1);
                long time5 = System.currentTimeMillis();
                tAssignmentJPA.save(tAssignment);
                long time6 = System.currentTimeMillis();
                result = gradeBookService.saveGradebook(cid, tAssignment.getId(), gradingId, userVo);
                long time7 = System.currentTimeMillis();
                System.out.println("tAssignmentJPA.save------>" + (time6 - time5));
                System.out.println("gradeBookService.saveGradebook------>" + (time7 - time6));
            }
        }
        if (submitTime == 0) {
            this.saveTAssignmentGradeForTest(totalScore, assignmentId, submitTime, userVo, grading);
        }
        return result;
    }

    /**************************************************************************
     * Description 开始考试，获取当前总分
     *
     * @author lixueteng
     * @date 2017-09-19
     **************************************************************************/
    @Override
    public BigDecimal findTotalScoreByMapping(Integer assignmentId, UserVo userVo) {
        // 获取试卷对象
        TAssignment tAssignment = tAssignmentJPA.findOne(assignmentId);
        Integer itemId = 0;// 初始化小题id
        String username = userVo.getUsername();// 当前用户名
        String answerText = "";// 初始化答案内容
        String score;// 初始化小题分数
        BigDecimal totalScore = new BigDecimal(0);// 初始化总分
        for (TAssignmentSection tAssignmentSection : tAssignment
                .getTAssignmentSections()) {
            for (TAssignmentItem tAssignmentItem : tAssignmentSection
                    .getTAssignmentItems()) {
                itemId = tAssignmentItem.getId();
                score = "0";
                int count = 0;
                List<String> answersArray = new ArrayList<String>();
                Set<TAssignmentItemMapping> mappings = tAssignmentItem
                        .getTAssignmentItemMappings();
                String answerIds = "";
                String answerTexts = "";
                for (TAssignmentItemMapping m : mappings) {
                    if (m.getTAssignmentAnswer() != null) {
                        answerIds += m.getTAssignmentAnswer().getId() + ",.,";
                        answerTexts += m.getAnswerText() + ",.,";
                    }
                }
                if (answerIds.length() != 0) {
                    answerIds = answerIds.substring(0, answerIds.length() - 3);
                }
                if (answerTexts.length() != 0) {
                    answerTexts = answerTexts.substring(0,
                            answerTexts.length() - 3);
                }
                String[] answers = answerIds.split(",.,");
                String[] answertexts = answerTexts.split(",.,");

                if (mappings != null && mappings.size() > 0) {
                    for (int i = 0; i < answertexts.length; i++) {

                        // 对错题判断和单选题判断
                        if (tAssignmentItem.getType() == 2
                                || tAssignmentItem.getType() == 4) {
                            TAssignmentAnswer tAssignmentAnswer = tAssignmentAnswerJPA.findOne(Integer.valueOf(answers[i]));
                            if (tAssignmentAnswer.getIscorrect() == 1) {
                                score = tAssignmentItem.getScore().toString();
                                totalScore = totalScore.add(new BigDecimal(tAssignmentItem.getScore()));
                            }
                        }

                        // 填空题题判断
                        if (tAssignmentItem.getType() == 8) {
                            if (answertexts != null && answertexts.length > 0) {
                                if (answertexts[i] != null && answertexts[i].trim().equals(tAssignmentAnswerJPA.findOne(Integer.valueOf(answers[i])).getText())) {
                                    count++;
                                }
                            }
                        }

                        // 简答题
                        if (tAssignmentItem.getType() == 5) {
                            for (TAssignmentItemMapping m : mappings) {
                                score = Double.toString(m.getAutoscore());
                            }
                            totalScore = totalScore.add(new BigDecimal(score));
                        }

                        if (answertexts != null && answertexts.length > 0) {
                            answerText = answertexts[i].trim();
                        }
                    }

                }
                if (tAssignmentItem.getType() == 8) {
                    if (count != 0) {// 如果有答对的题，计入得分
                        BigDecimal itemScore = new BigDecimal(tAssignmentItem.getScore());
                        // 以小题得分除以总空格数并乘以答对的空格数计算得分
                        totalScore = totalScore.add(itemScore.multiply(
                                new BigDecimal(count)).divide(new BigDecimal(answers.length), 2, BigDecimal.ROUND_HALF_EVEN));

                        score = itemScore.multiply(new BigDecimal(count)).divide(new BigDecimal(answers.length), 2, BigDecimal.ROUND_HALF_EVEN).toString();
                    }
                }

                if (tAssignmentItem.getType() == 1) {
                    for (TAssignmentAnswer tAssignmentAnswer : tAssignmentItem
                            .getTAssignmentAnswers()) {
                        if (tAssignmentAnswer.getIscorrect() == 1) {
                            answersArray.add(tAssignmentAnswer.getId()
                                    .toString());
                        }
                    }
                    count = compare(answers, answersArray);
                    if (count != 0) {
                        score = new BigDecimal(count / 2.0).multiply(new BigDecimal(tAssignmentItem.getScore())).toString();
                        totalScore = totalScore.add(new BigDecimal(count / 2.0)
                                .multiply(new BigDecimal(tAssignmentItem.getScore())));
                    }

                }

            }
        }

        return totalScore;
    }

    /**************************************************************************
     * Description 开始考试，保存学生答题
     *
     * @author lixueteng
     * @date 2017-09-19
     **************************************************************************/
    @Override
    public Integer saveTAssignmentGradeForTest(BigDecimal totalScore, Integer assignmentId, Integer submitTime, UserVo userVo, Integer grading) {
        String username = userVo.getUsername();
        //判断是考试还是测试
        // 试卷
        TAssignment tAssignment = tAssignmentJPA.findOne(assignmentId);
        TAssignment parentTAssignment = null;
        if (tAssignment.getTestParentId() != null) {
            // 考试
            parentTAssignment = tAssignmentJPA.findOne(tAssignment.getTestParentId());
        } else {
            parentTAssignment = tAssignment;
        }

        // 打分表
        TAssignmentGrading tAssignmentGrade = tAssignmentGradingJPA.findOne(grading);
        if (tAssignmentGrade == null) {
            tAssignmentGrade = new TAssignmentGrading();
        }
        // 查询最大提交数
        List<TAssignmentGrading> tAssignmentGradingsSubmit = tAssignmentGradingJPA.findMaxSubmitTime(parentTAssignment.getId(), userVo.getUsername());
        if (submitTime != 0) {// 若是提交，查询以前的最大提交数并加一,没有则为第一次提交
            if (tAssignmentGradingsSubmit.size() > 1) {
                submitTime = tAssignmentGradingsSubmit.get(0).getSubmitTime() + 1;
            } else if (tAssignmentGradingsSubmit.size() == 1 && !parentTAssignment.getId().equals(assignmentId)) {
                submitTime = tAssignmentGradingsSubmit.get(0).getSubmitTime() + 1;
            }
        }
        tAssignmentGrade.setFinalScore(totalScore.doubleValue());

        // 考试的试题对象
        tAssignmentGrade.setTestId(assignmentId);
        // 考试对象
        tAssignmentGrade.setTAssignment(parentTAssignment);
        // 改变提交次数
        tAssignmentGrade.setSubmitTime(submitTime);
        // 考试的学生
        tAssignmentGrade.setUserByStudent(userJPA.findOne(username));

        Integer islate = 0;// 0表示正常提交
        Calendar submitDate = Calendar.getInstance();
        Calendar dueDate = Calendar.getInstance();
        dueDate.setTime(parentTAssignment.getTAssignmentControl().getDuedate());
        if (submitDate.after(dueDate)) {
            islate = 1;// 1表示迟交
        }
        tAssignmentGrade.setIslate(islate);
        tAssignmentGrade.setSubmitdate(submitDate.getTime());
        // 提交后返回作业列表
        tAssignmentGradingJPA.save(tAssignmentGrade);
        return tAssignmentGrade.getAccessmentgradingId();

    }

    /**************************************************************************
     * Description 开始考试，查找学生的考试
     *
     * @author lixueteng
     * @date 2017-09-22
     **************************************************************************/
    @Override
    public Integer findTAssignmentForExam(Integer examId, String username) {
        User duser = userJPA.findOne(username);
        TAssignment exam = tAssignmentJPA.findOne(examId);
        //判断是否有过考生的考试记录
        List<TAssignment> tAssignments = tAssignmentJPA.findExamByUserAndExamId(examId, username);
        TAssignment examTAssignment = new TAssignment();
        if (tAssignments.size() > 0) {
            examTAssignment = tAssignments.get(0);
        } else {
            examTAssignment.setUser(duser);
            examTAssignment.setTestParentId(exam.getId());
            examTAssignment.setStatus(0);
            examTAssignment.setCreatedTime(new Date());
            examTAssignment = tAssignmentJPA.save(examTAssignment);
        }
        return examTAssignment.getId();
    }


    /**************************************************************************
     * Description 开始考试 获取考试小题的id
     *
     * @author lixueteng
     * @date 2017-09-22
     **************************************************************************/
    @Override
    public List<Integer> findTAssignmentItemIds(Integer examId) {
        List<Integer> idsList = new ArrayList<>();
        TAssignment exam = tAssignmentJPA.findOne(examId);
        if (exam.getExamQuestionpool() == null) {//试题来源于题库
            Set<TAssignmentSection> tAssignmentSections = exam.getTAssignmentSections();
            for (TAssignmentSection section : tAssignmentSections) {
                Set<TAssignmentItem> tAssignmentItems = section.getTAssignmentItems();
                for (TAssignmentItem item : tAssignmentItems) {
                    idsList.add(item.getId());
                }
            }
        } else {//试题来源于试卷库
            //试卷库
            ExamQuestionpool examQuestionpool = exam.getExamQuestionpool();
            //试卷库大项
            Set<ExamSection> examSections = examQuestionpool.getExamSections();
            //遍历试卷库大项获取题目题号
            for (ExamSection examSection : examSections) {
                Set<TAssignmentItem> tAssignmentItemSet = examSection.getTAssignmentItems();
                for (TAssignmentItem tAssignmentItem : tAssignmentItemSet) {
                    idsList.add(tAssignmentItem.getId());
                }
            }
        }
        return idsList;
    }


    /**************************************************************************
     * Description 开始考试 根据当前的考试获取老师颁发的考试
     *
     * @author lixueteng
     * @date 2017-09-22
     **************************************************************************/
    @Override
    public Integer findParentExamByExamId(Integer examId) {
        TAssignment exam = tAssignmentJPA.findOne(examId);
        Integer testParentId = exam.getTestParentId();
        return testParentId;
    }

    /**************************************************************************
     * Description 开始考试 获取本次考试的结果
     *
     * @author lixueteng
     * @date 2017-09-27
     **************************************************************************/
    @Override
    public ExamResultVo getExamResult(Integer examId, UserVo userVo) {
        TAssignment exam = tAssignmentJPA.findOne(examId);
        Integer gradingId = this.getStudentExamSubmitTime(examId, userVo);
        //获取学生的成绩
        TAssignmentGrading tAssignmentGrading = tAssignmentGradingJPA.findOne(gradingId);
        //获取学生提交的次数
        Integer submitTime = tAssignmentGrading.getSubmitTime();
        //获取限制提交的次数
        Integer timelimit = exam.getTAssignmentControl().getTimelimit();
        ExamResultVo examResultVo = new ExamResultVo();
        examResultVo.setTotalSubmitTime(timelimit);
        examResultVo.setRemainSubmitTime(timelimit - submitTime);
        //获取学生考试成绩
        examResultVo.setScore(tAssignmentGrading.getFinalScore());
        examResultVo.setTitle(exam.getTitle());
        return examResultVo;

    }

    /**************************************************************************
     * Description 开始考试 获取学生的考试的提交次数
     *
     * @author lixueteng
     * @date 2017-09-27
     **************************************************************************/
    @Override
    public Integer getStudentExamSubmitTime(Integer examId, UserVo userVo) {
        //查询当前学生当前考试的 登录次数
        List<TAssignmentGrading> gradingList = tAssignmentGradingJPA.findStudentSubmitTime(examId, userVo.getUsername());
        return gradingList.get(0).getAccessmentgradingId();
    }

    /**************************************************************************
     * Description 开始考试 获取当前学生考试没有作答的题目的数量
     *
     * @author lixueteng
     * @date 2017-11-2
     **************************************************************************/
    @Override
    public Integer getItemIsNotAnswer(Integer examId, UserVo userVo) {
        List<Integer> restItemWithUsernameAndExamId = tAssignmentItemMappingJPA.findRestItemWithUsernameAndExamId(examId, userVo.getUsername());
        return restItemWithUsernameAndExamId.size();
    }

    /**************************************************************************
     * Description 开始考试 获取考试总的试题的数量
     *
     * @author lixueteng
     * @date 2017-11-2
     **************************************************************************/
    @Override
    public Integer getItemCountWithExamId(Integer examId) {
        int totalRecords = tAssignmentItemJPA.countTAssignmentItem(examId);
        return totalRecords;
    }

    @Override
    public void testJunit() {
        System.out.println("测试开始");
        TAssignment tAssignment = new TAssignment();
        tAssignment.setTitle("来自junit测试的数据");
        tAssignmentJPA.save(tAssignment);
    }

    /**************************************************************************
     * Description 获取当前测试信息
     *
     * @author：黄浩
     * @date ：2018年5月21日
     **************************************************************************/
    @Override
    public TAssignmentsVO findExamById(Integer examId, String username, Integer grading) {
        TAssignmentsVO tAssignmentsVO = new TAssignmentsVO();
        TAssignment tAssignment = tAssignmentJPA.findOne(examId);
        if (tAssignment != null) {
            tAssignmentsVO.setId(tAssignment.getId());
            tAssignmentsVO.setTitle(tAssignment.getTitle());
            //开始时间跟结束时间格式转换
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
            if (tAssignment.getTAssignmentControl() != null) {
                //开始时间
                String startDate = sdf.format(tAssignment.getTAssignmentControl().getStartdate());
                tAssignmentsVO.setStartDate(startDate);
                //结束时间
                String endDate = sdf.format(tAssignment.getTAssignmentControl().getDuedate());
                tAssignmentsVO.setEndDate(endDate);
            }
            //总分
            if (tAssignment.getTAssignmentAnswerAssign() != null) {
                tAssignmentsVO.setScore(tAssignment.getTAssignmentAnswerAssign().getScore());
            }
            //教师
            if (tAssignment.getUser() != null) {
                tAssignmentsVO.setTeacher(tAssignment.getUser().getCname());
            }
            tAssignmentsVO.setAssignmentType(tAssignment.getType());
            //当前人的成绩
            TAssignmentGrading tAssignmentGrading = tAssignmentGradingJPA.findOne(grading);
            tAssignmentsVO.setStudent(tAssignmentGrading.getUserByStudent().getCname());
            tAssignmentsVO.setStuScore(tAssignmentGrading.getFinalScore());
            //日期
            String date = sdf.format(tAssignmentGrading.getSubmitdate());
            tAssignmentsVO.setCommitDate(date);
            tAssignmentsVO.setEvaluation(tAssignment.getEvaluation());
            tAssignmentsVO.setKeyword(tAssignment.getKeyword());
            tAssignmentsVO.setConclusion(tAssignment.getConclusion());
        }

        return tAssignmentsVO;
    }

    /**************************************************************************
     * Description:考试-查询学生答题详情
     *
     * @author：黄浩
     * @date ：2018年5月21日
     **************************************************************************/
    @Override
    public List<ExamDetailsVO> findTestDetail(Integer testId, String username, Integer gradingId, Integer currpage, Integer pageSize, Integer dictionary, String search) {
        List<ExamDetailsVO> examDetailsVOList = new ArrayList<>();
        List<TAssignmentItem> tAssignmentItems = new ArrayList<>();
        TAssignmentGrading tAssignmentGrading = tAssignmentGradingJPA.findOne(gradingId);
        List<TAssignment> tAssignmentList = tAssignmentJPA.findExamByUserAndExamIdWithoutStatus(testId, username);
        if (tAssignmentList.size() > 0) {
            TAssignment tAssignment = tAssignmentList.get(tAssignmentGrading.getSubmitTime() - 1);
            switch (dictionary) {
                case 1: {
                    if (tAssignment.getExamQuestionpool() == null) {
                        //查询题目
                        String sql = "select i from TAssignmentItem i where i.TAssignmentSection.TAssignment.id =" + tAssignment.getId() + " and (i.type<>5 and i.type <>8) ";
                        if (!EmptyUtil.isEmpty(search)) {
                            sql += " and i.description like :search ";
                        }
                        sql += " order by i.TAssignmentSection.id,i.id asc";
                        Query query = entityManager.createQuery(sql);
                        if (!EmptyUtil.isEmpty(search)) {
                            query.setParameter("search", "%" + search + "%");
                        }
                        query.setMaxResults(pageSize);
                        if (currpage == 0) {
                            query.setFirstResult(0);
                        } else {
                            query.setFirstResult((currpage - 1) * pageSize);
                        }
                        tAssignmentItems = query.getResultList();
                    } else {
                        Pageable pageable = PageRequest.of(currpage - 1, pageSize);
                        if (!EmptyUtil.isEmpty(search)) {
                            tAssignmentItems = tAssignmentItemJPA.findPaperItemByExamIdSearch(testId, (currpage - 1) * pageSize, pageSize, search);
                        } else {
                            tAssignmentItems = tAssignmentItemJPA.findPaperItemByExamId(testId, (currpage - 1) * pageSize, pageSize);
                        }
                    }
                    break;
                }
                case 2: {
                    if (tAssignment.getExamQuestionpool() == null) {
                        //查询题目
                        String sql = "select i from TAssignmentItem i where i.TAssignmentSection.TAssignment.id =" + tAssignment.getId() + " and (i.type=5 or i.type =8) ";
                        if (!EmptyUtil.isEmpty(search)) {
                            sql += " and i.description like :search ";
                        }
                        sql += " order by i.TAssignmentSection.id,i.id asc";
                        Query query = entityManager.createQuery(sql);
                        if (!EmptyUtil.isEmpty(search)) {
                            query.setParameter("search", "%" + search + "%");
                        }
                        query.setMaxResults(pageSize);
                        if (currpage == 0) {
                            query.setFirstResult(0);
                        } else {
                            query.setFirstResult((currpage - 1) * pageSize);
                        }
                        tAssignmentItems = query.getResultList();
                    } else {
                        Pageable pageable = PageRequest.of(currpage - 1, pageSize);

                        if (!EmptyUtil.isEmpty(search)) {
                            tAssignmentItems = tAssignmentItemJPA.findPaperItemByExamId1Search(testId, (currpage - 1) * pageSize, pageSize, search);
                        } else {
                            tAssignmentItems = tAssignmentItemJPA.findPaperItemByExamId1(testId, (currpage - 1) * pageSize, pageSize);
                        }
                    }
                    break;
                }
                case 0: {
                    if (tAssignment.getExamQuestionpool() == null) {
                        //查询题目
                        String sql = "select i from TAssignmentItem i where i.TAssignmentSection.TAssignment.id =" + tAssignment.getId();
                        sql += " order by i.TAssignmentSection.id,i.id asc";
                        Query query = entityManager.createQuery(sql);
                        query.setMaxResults(pageSize);
                        if (currpage == 0) {
                            query.setFirstResult(0);
                        } else {
                            query.setFirstResult((currpage - 1) * pageSize);
                        }
                        tAssignmentItems = query.getResultList();
                    } else {
                        tAssignmentItems = tAssignmentItemJPA.findAllPaperItemByExamId(testId, (currpage - 1) * pageSize, pageSize);
                    }
                    break;
                }
                default:
            }

//            List<TAssignmentItem> tAssignmentItems = tAssignmentItemJPA.findTAssignmentItemByExamId(tAssignment.getId());
            for (TAssignmentItem tai : tAssignmentItems) {
                ExamDetailsVO examDetailsVO = new ExamDetailsVO();
                examDetailsVO.setId(tai.getId());
                examDetailsVO.setGrade(tai.getScore());
                //题干
                examDetailsVO.setTitle(tai.getDescription());
                if (tai.getType() == 8) {
                    examDetailsVO.setTitle(tai.getDescriptionTemp());
                }
                //题目类型
                examDetailsVO.setType(tai.getType());
                // 填空题则获取是否有序，简答题判分类型
                if (tai.getType() == 8 || tai.getType() == 5) {
                    examDetailsVO.setIsOrder(tai.getIsOrder());
                }
                //获取题目得分
                List<TAssignmentItemMapping> tAssignmentItemMappingScoreList = tAssignmentItemMappingJPA.findListScoreByItemId(tai.getId(), tAssignment.getId());
                if (tAssignmentItemMappingScoreList.size() > 0) {
                    examDetailsVO.setOverriderScore(tAssignmentItemMappingScoreList.get(0).getOveriderScore() == null
                            ? "" : tAssignmentItemMappingScoreList.get(0).getOveriderScore().toString());
                    examDetailsVO.setScore(tAssignmentItemMappingScoreList.get(0).getAutoscore());
                }
                //获取学生回答
                List<TAssignmentItemMapping> tAssignmentItemMappingList = tAssignmentItemMappingJPA.findListScoreByItemIdAndUsername(tai.getId(), username, tAssignment.getId());
                List<TAssignmentItemMappingsVO> tAssignmentItemMappingsVOList = new ArrayList<>();
                for (TAssignmentItemMapping taim : tAssignmentItemMappingList) {
                    TAssignmentItemMappingsVO tAssignmentItemMappingsVO = new TAssignmentItemMappingsVO();
                    tAssignmentItemMappingsVO.setId(Integer.valueOf(taim.getId()));
                    if (taim.getTAssignmentAnswer() != null) {
                        tAssignmentItemMappingsVO.setAnswerId(taim.getTAssignmentAnswer().getId());
                    }
                    tAssignmentItemMappingsVO.setAnswerText(taim.getAnswerText());
                    tAssignmentItemMappingsVOList.add(tAssignmentItemMappingsVO);
                }
                examDetailsVO.setMapping(tAssignmentItemMappingsVOList);
                //获取选项
                List<TAssignmentAnswersVO> tAssignmentAnswerVOList = new ArrayList<>();
                List<TAssignmentAnswer> tAssignmentAnswers = tAssignmentAnswerJPA.findAnswersByTAssignmentId(tai.getId());
                for (TAssignmentAnswer ta : tAssignmentAnswers) {
                    TAssignmentAnswersVO tAssignmentAnswersVO = new TAssignmentAnswersVO();
                    tAssignmentAnswersVO.setAnswerId(ta.getId());
                    tAssignmentAnswersVO.setText(ta.getText());
                    tAssignmentAnswersVO.setIsCorrect(ta.getIscorrect());
                    tAssignmentAnswersVO.setLabel(ta.getLabel());
                    tAssignmentAnswerVOList.add(tAssignmentAnswersVO);
                }
                examDetailsVO.setAnswer(tAssignmentAnswerVOList);
                examDetailsVOList.add(examDetailsVO);
            }
        }
        return examDetailsVOList;
    }

    /**************************************************************************
     * Description:考试-查询学生答题详情
     *
     * @author：黄浩
     * @date ：2018年5月21日
     **************************************************************************/
    @Override
    public List<Map> findTestDetailMapping(Integer testId, String username) {
        List<Map> mapList = new ArrayList<>();
        Map<Integer, Object> recordMap = new HashMap<>();
        List<TAssignment> tAssignmentList = tAssignmentJPA.findExamByUserAndExamIdWithoutStatus(testId, username);
        if (tAssignmentList.size() > 0) {
            TAssignment tAssignment = tAssignmentList.get(tAssignmentList.size() - 1);
            //查询题目
            List<TAssignmentItem> tAssignmentItems = tAssignmentItemJPA.findTAssignmentItemByExamId(tAssignment.getId());
            for (TAssignmentItem tai : tAssignmentItems) {
                //获取学生回答
                List<TAssignmentItemMapping> tAssignmentItemMappingList = tAssignmentItemMappingJPA.findListScoreByItemIdAndUsername(tai.getId(), username, tAssignment.getId());
                if (tAssignmentItemMappingList.size() > 0) {
                    List<TAssignmentItemMappingsVO> tAssignmentItemMappingsVOList = new ArrayList<>();
                    for (TAssignmentItemMapping taim : tAssignmentItemMappingList) {
                        TAssignmentItemMappingsVO tAssignmentItemMappingsVO = new TAssignmentItemMappingsVO();
                        recordMap.put(taim.getTAssignmentAnswer().getId(), taim.getId());
                    }
                }
            }
        }
        mapList.add(recordMap);
        return mapList;
    }

    /**************************************************************************
     * Description 根据username和examId统计该学生的已提交考试题目个数
     *
     * @author 曹焕
     * @date 2018-10-15
     **************************************************************************/
    @Override
    public Integer countTestamDetail(Integer examId, Integer gradingId, String username, Integer dictionary, String search) {
        //dictionary：1客观题，2主观题
        List<TAssignmentItem> tAssignmentItems = new ArrayList<>();
        List<TAssignment> tAssignmentList = tAssignmentJPA.findExamByUserAndExamIdWithoutStatus(examId, username);
        TAssignmentGrading tAssignmentGrading = tAssignmentGradingJPA.findOne(gradingId);
        if (tAssignmentList.size() > 0) {
            TAssignment tAssignment = tAssignmentList.get(tAssignmentGrading.getSubmitTime() - 1);
            switch (dictionary) {
                case 1: {
                    if (tAssignment.getExamQuestionpool() == null) {
                        if (EmptyUtil.isEmpty(search)) {
                            tAssignmentItems = tAssignmentItemJPA.findTAssignmentItemByExamId1(tAssignment.getId());
                        } else {
                            tAssignmentItems = tAssignmentItemJPA.findTAssignmentItemByExamId1Search(tAssignment.getId(), search);
                        }
                    } else {
                        if (EmptyUtil.isEmpty(search)) {
                            tAssignmentItems = tAssignmentItemJPA.countPaperItemByExamId(tAssignment.getId());
                        } else {
                            tAssignmentItems = tAssignmentItemJPA.countPaperItemByExamIdSearch(tAssignment.getId(), search);
                        }
                    }
                    break;
                }
                case 2: {
                    if (tAssignment.getExamQuestionpool() == null) {
                        if (EmptyUtil.isEmpty(search)) {
                            tAssignmentItems = tAssignmentItemJPA.findTAssignmentItemByExamId2(tAssignment.getId());
                        } else {
                            tAssignmentItems = tAssignmentItemJPA.findTAssignmentItemByExamId2Search(tAssignment.getId(), search);
                        }
                    } else {
                        if (EmptyUtil.isEmpty(search)) {
                            tAssignmentItems = tAssignmentItemJPA.countPaperItemByExamId1(tAssignment.getId());
                        } else {
                            tAssignmentItems = tAssignmentItemJPA.countPaperItemByExamId1Search(tAssignment.getId(), search);
                        }
                    }
                    break;
                }
                case 0: {
                    if (tAssignment.getExamQuestionpool() == null) {
                        tAssignmentItems = tAssignmentItemJPA.findTAssignmentItemByExamId(tAssignment.getId());
                    } else {
                        tAssignmentItems = tAssignmentItemJPA.findAllItemByExamId(tAssignment.getId());
                    }
                    break;
                }
            }

        }
        return tAssignmentItems.size();
    }

    /**************************************************************************
     * Description:测验-查询学生答题详情
     *
     * @author：黄浩
     * @date ：2018年5月21日
     **************************************************************************/
    @Override
    public List<ExamDetailsVO> findExamDetail(Integer examId, String username, Integer gradingId, Integer currpage, Integer pageSize, Integer dictionary) {
        List<ExamDetailsVO> examDetailsVOList = new ArrayList<>();
        //查询题目
        String sql = "";
        switch (dictionary) {
            case 0:
                sql = "select i from TAssignmentItem i where i.TAssignmentSection.TAssignment.id =:examId order by i.TAssignmentSection.id,i.id asc";
                break;
            case 1:
                sql = "select i from TAssignmentItem i where i.TAssignmentSection.TAssignment.id =:examId and (i.type<>5 and i.type<>8) order by i.TAssignmentSection.id,i.id asc";
                break;
            case 2:
                sql = "select i from TAssignmentItem i where i.TAssignmentSection.TAssignment.id =:examId and (i.type=5 or i.type=8) order by i.TAssignmentSection.id,i.id asc";
                break;
            default:
        }
        Query query = entityManager.createQuery(sql);
        query.setParameter("examId", examId);
        query.setMaxResults(pageSize);
        if (currpage == 0) {
            query.setFirstResult(0);
        } else {
            query.setFirstResult((currpage - 1) * pageSize);
        }
        List<TAssignmentItem> tAssignmentItems = new ArrayList<TAssignmentItem>(query.getResultList());
        for (TAssignmentItem tai : tAssignmentItems) {
            ExamDetailsVO examDetailsVO = new ExamDetailsVO();
            //题干
            examDetailsVO.setTitle(tai.getDescription());
            if (tai.getType() == 8) {
                examDetailsVO.setTitle(tai.getDescriptionTemp());
            }
            //题目类型
            examDetailsVO.setType(tai.getType());
            //获取题目得分
            TAssignmentItemMapping tAssignmentItemMapping = tAssignmentItemMappingJPA.findScoreByItemAndUsername(tai.getId(), username, gradingId, examId);
            if (tAssignmentItemMapping != null) {
                examDetailsVO.setScore(tAssignmentItemMapping.getAutoscore());
            }
            if (tAssignmentItemMapping == null) {
                examDetailsVO.setScore(0.0);
            }
            //获取学生回答
            List<TAssignmentItemMapping> tAssignmentItemMappingList = tAssignmentItemMappingJPA.findListScoreByItemAndUsername(tai.getId(), username, gradingId, examId);
            List<TAssignmentItemMappingsVO> tAssignmentItemMappingsVOList = new ArrayList<>();
            for (TAssignmentItemMapping taim : tAssignmentItemMappingList) {
                TAssignmentItemMappingsVO tAssignmentItemMappingsVO = new TAssignmentItemMappingsVO();
                tAssignmentItemMappingsVO.setId(Integer.valueOf(taim.getId()));
                if (taim.getTAssignmentAnswer() != null) {
                    tAssignmentItemMappingsVO.setAnswerId(taim.getTAssignmentAnswer().getId());
                }
                tAssignmentItemMappingsVO.setAnswerText(taim.getAnswerText());
                tAssignmentItemMappingsVOList.add(tAssignmentItemMappingsVO);
            }
            examDetailsVO.setMapping(tAssignmentItemMappingsVOList);
            //获取选项
            List<TAssignmentAnswersVO> tAssignmentAnswersVOList = new ArrayList<>();
            List<TAssignmentAnswer> tAssignmentAnswers = tAssignmentAnswerJPA.findAnswersByTAssignmentId(tai.getId());
            for (TAssignmentAnswer ta : tAssignmentAnswers) {
                TAssignmentAnswersVO tAssignmentAnswersVO = new TAssignmentAnswersVO();
                tAssignmentAnswersVO.setAnswerId(ta.getId());
                tAssignmentAnswersVO.setText(ta.getText());
                tAssignmentAnswersVO.setIsCorrect(ta.getIscorrect());
                tAssignmentAnswersVO.setLabel(ta.getLabel());
                tAssignmentAnswersVOList.add(tAssignmentAnswersVO);
            }
            examDetailsVO.setAnswer(tAssignmentAnswersVOList);
            examDetailsVOList.add(examDetailsVO);
        }
        return examDetailsVOList;
    }

    /**************************************************************************
     * Description:测验-查询学生答题详情
     *
     * @author：黄浩
     * @date ：2018年5月21日
     **************************************************************************/
    @Override
    public List<Map> findExamDetailMapping(Integer examId, String username, Integer gradingId) {
        List<Map> mapList = new ArrayList<>();
        Map<Integer, Object> recordMap = new HashMap<>();
        //查询题目
        List<TAssignmentItem> tAssignmentItems = tAssignmentItemJPA.findTAssignmentItemByExamId(examId);
        for (TAssignmentItem tai : tAssignmentItems) {
            //获取学生回答
            List<TAssignmentItemMapping> tAssignmentItemMappingList = tAssignmentItemMappingJPA.findListScoreByItemAndUsername(tai.getId(), username, gradingId, examId);
            if (tAssignmentItemMappingList.size() > 0) {
                List<TAssignmentItemMappingsVO> tAssignmentItemMappingsVOList = new ArrayList<>();
                for (TAssignmentItemMapping taim : tAssignmentItemMappingList) {
                    TAssignmentItemMappingsVO tAssignmentItemMappingsVO = new TAssignmentItemMappingsVO();
                    recordMap.put(taim.getTAssignmentAnswer().getId(), taim.getId());
                }
            }
        }
        mapList.add(recordMap);
        return mapList;
    }

    /**************************************************************************
     * Description 根据examId统计该学生的已提交考试题目个数
     *
     * @author 曹焕
     * @date 2018-10-15
     **************************************************************************/
    @Override
    public Integer countExamDetail(Integer examId, Integer dictionary) {
        List<TAssignmentItem> tAssignmentItems = new ArrayList<>();
        switch (dictionary) {
            case 0:
                //不区分
                tAssignmentItems = tAssignmentItemJPA.findTAssignmentItemByExamId(examId);
                break;
            case 1:
                //客观题
                tAssignmentItems = tAssignmentItemJPA.findTAssignmentItemByExamId1(examId);
                break;
            case 2:
                //主观题
                tAssignmentItems = tAssignmentItemJPA.findTAssignmentItemByExamId2(examId);
                break;
            default:
        }
        return tAssignmentItems.size();
    }

    /**************************************************************************
     * Description 新建t_assignment_grading
     *
     * @author 黄浩
     * @date 2018年12月8日
     **************************************************************************/
    @Override
    public Integer insertTAssignmentGrading(Integer assignmentId, Integer submitTime, UserVo userVo) {
        TAssignmentGrading tAssignmentGrading = new TAssignmentGrading();
        tAssignmentGrading.setTAssignment(tAssignmentJPA.findOne(assignmentId));

        tAssignmentGrading.setSubmitTime(submitTime);
        tAssignmentGrading.setUserByStudent(userJPA.findOne(userVo.getUsername()));
        tAssignmentGradingJPA.saveAndFlush(tAssignmentGrading);
        return tAssignmentGrading.getAccessmentgradingId();
    }

    /**************************************************************************
     * Description 保存pdf图片
     *
     * @author 黄浩
     * @date 2018年12月12日
     **************************************************************************/
    @Override
    public String saveMarkingImage(String pdfDirector, Integer gradingId, Integer page, String imageString) {
        //分隔符
        String sep = System.getProperty("file.separator");
        //项目目录
        String rootPath = pdfDirector + gradingId + sep;
        File markingFolder = new File(rootPath);
        if (!markingFolder.exists() && !markingFolder.isDirectory()) {
            NetFileDiskUtils.mkDirectory(rootPath);
        }
        //根据主键查询提交记录
        String result = this.saveReportImage(imageString, page, rootPath);
        return result;
    }

    /**************************************************************************
     * Description:作业-保存实验报告批阅图片
     *
     * @author：裴继超
     * @date ：2017-3-20
     **************************************************************************/
    public String saveReportImage(String imageString, Integer page, String imagePath) {

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
            OutputStream out = new FileOutputStream(imagePath + "pdf" + page + ".png");
            out.write(bytes);
            out.flush();
            out.close();
            return "success";
        } catch (Exception e) {
            return "false";
        }
    }

    /**************************************************************************
     * Description 生成pdf
     *
     * @author 黄浩
     * @date 2018年12月12日
     **************************************************************************/
    @Override
    public String submitMarking(String pdfDirector, Integer gradingId, Integer siteId, String postUrl, UserVo userVo, Integer page) {
        //分隔符
        String sep = System.getProperty("file.separator");
        //项目目录
        String rootPath = null;

        rootPath = pdfDirector + gradingId + sep;
        //获取文件个数
        long p = shareService.getFileSize(new File(rootPath));

        ArrayList<String> imageUrllist = new ArrayList<String>();
        for (int i = 1; i <= page; i++) {
            imageUrllist.add(rootPath + "/pdf" + i + ".png");
        }

        String pdfUrl = rootPath + "result.pdf";
        File file = shareService.Pdf(imageUrllist, pdfUrl);
        try {
            file.createNewFile();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        //上传至文件服务器
        String resourceFile = saveOnlineMarkingPdf(postUrl, pdfUrl, siteId.toString(), file.getName(), userVo.getUsername(), gradingId);
        return resourceFile;
    }

    /**************************************************************************
     * Description:批改后的pdf上传至文件服务器
     *
     * @author：黄浩
     * @date ：2018年10月18日
     **************************************************************************/
    public String saveOnlineMarkingPdf(String path, String pdfPath, String siteId, String fileName, String username, Integer gradingId) {
        TAssignmentGrading tAssignmentGrading = tAssignmentGradingJPA.findOne(gradingId);
        String upUrl = path + "/uploadFileNew";

        //封装上传文件所需请求参数
        TCourseSite tCourseSite = tCourseSiteJPA.findOne(Integer.valueOf(siteId));
        Map<String, String> param = new HashMap<>(8);
        param.put("fileTag1", "pdf");
        param.put("directoryId", "1");
        param.put("username", username);
        param.put("siteName", tCourseSite.getTitle());
        param.put("publicState", "0");

        // 上传文件
        File file = new File(pdfPath);
        String fileId = HttpClientUtil.doPostFile(upUrl, file, param);

        // 获取文件
        String getUrl = path + "/getFileById";
        // 封装获取文件所需参数
        // 封装头信息
        Map<String, String> header = new HashMap<>(8);
        header.put("Authorization", AuthorizationUtil.getAuthorization(username).getJwtToken());
        param.clear();
        param.put("fileId", fileId);

        return HttpClientUtil.doPost(getUrl, param, header);
    }

    @Override
    public String findTestDetailMappingJson(Integer testId, String username) {
        // 返回的json
        String json = "{";
        List<TAssignment> tAssignmentList = tAssignmentJPA.findExamByUserAndExamIdWithoutStatus(testId, username);
        if (tAssignmentList.size() > 0) {
            TAssignment tAssignment = tAssignmentList.get(tAssignmentList.size() - 1);
            //查询题目
            List<TAssignmentItem> tAssignmentItems = tAssignmentItemJPA.findTAssignmentItemByExamId(tAssignment.getId());
            for (TAssignmentItem tai : tAssignmentItems) {
                //获取学生回答
                List<TAssignmentItemMapping> tAssignmentItemMappingList = tAssignmentItemMappingJPA.findListScoreByItemIdAndUsername(tai.getId(), username, tAssignment.getId());
                if (tAssignmentItemMappingList.size() > 0) {
                    for (TAssignmentItemMapping taim : tAssignmentItemMappingList) {
                        json += "\"" + taim.getTAssignmentAnswer().getId() + "\":\"" + taim.getId() + "\",";
                    }
                }
            }
        }
        if (json.length() > 1) {
            json = json.substring(0, json.length() - 1);
        }
        json += "}";
        return json;
    }

    /**************************************************************************以下是大仪新增************************************************************************
     * Description 考试模块-检查考试资格
     *
     * @author 林志威
     * @date 2018-06-27
     **************************************************************************/
    @Override
    public boolean checkExamAvaliable(Integer examId, String username) {
        TAssignment exam = tAssignmentJPA.findOne(examId);
        Integer gradingId = this.getStudentExamSubmitTime(examId, username);
        //获取学生的成绩
        TAssignmentGrading tAssignmentGrading = tAssignmentGradingJPA.findOne(gradingId);
        //获取学生提交的次数
        Integer submitTime = 0;
        if (tAssignmentGrading != null) {
            submitTime = tAssignmentGrading.getSubmitTime();
        }

        //获取限制提交的次数
        Integer timelimit = exam.getTAssignmentControl().getTimelimit();
        if (submitTime >= timelimit) {
            return false;
        } else {
            return true;
        }

    }

    /**************************************************************************
     * Description 开始考试 获取学生的考试的提交次数
     *
     * @author lixueteng
     * @date 2017-09-27
     **************************************************************************/
    @Override
    public Integer getStudentExamSubmitTime(Integer examId, String username) {
        //查询当前学生当前考试的 登录次数
        List<TAssignmentGrading> gradingList = tAssignmentGradingJPA.findStudentSubmitTime(examId, username);
        return gradingList.get(0).getAccessmentgradingId();
    }

    /**************************************************************************
     * Description 开始考试 获取本次考试的结果(大仪)
     *
     * @author 徐明杭
     * @date 2018-10-08
     **************************************************************************/
    @Override
    public ExamResultForDyVo getExamResultDetail(Integer examId, String username, String accessScore) {
        TAssignment exam = tAssignmentJPA.findOne(examId);
        Integer gradingId = this.getStudentExamSubmitTime(examId, username);
        //获取学生的成绩
        TAssignmentGrading tAssignmentGrading = tAssignmentGradingJPA.findOne(gradingId);
        //获取学生提交的次数
        Integer submitTime = tAssignmentGrading.getSubmitTime();
        //获取限制提交的次数
        Integer timelimit = exam.getTAssignmentControl().getTimelimit();
        ExamResultForDyVo examResultVo = new ExamResultForDyVo();
        examResultVo.setRemainSubmitTime(timelimit - submitTime);
        //获取学生考试成绩
        examResultVo.setScore(tAssignmentGrading.getFinalScore());
        examResultVo.setTitle(exam.getTitle());
        examResultVo.setUsername(username);
        examResultVo.setExamId(examId);
        examResultVo.setAccessScore(Double.valueOf(accessScore));
        return examResultVo;

    }

    /**************************************************************************
     * Description 开始考试 获取当前考试是否还有再次作答的次数
     *
     * @author lixueteng
     * @date 2017-11-2
     * @param examId 考试的ID
     * @param userVo 当前登录人
     * @return 当前考试的剩余提交次数
     **************************************************************************/
    @Override
    public boolean getExamIsCanAnswer(Integer examId, String username) {
        TAssignment exam = tAssignmentJPA.findOne(examId);
        //获取考试限制提交次数
        Integer timelimit = exam.getTAssignmentControl().getTimelimit();
        Integer currUserExamCommitTime = tAssignmentGradingJPA.getCurrUserExamCommitTime(examId, username);
        //无限制次数或一次都没有考过
        if (timelimit == 0 || currUserExamCommitTime == null) {
            return true;
        }
        if (timelimit - currUserExamCommitTime > 0) {
            return true;
        }
        return false;
    }

    /**************************************************************************
     * Description 创建试卷并生成试卷
     *
     * @author lixueteng
     * @date 2017-09-12
     **************************************************************************/
    @Override
    public Integer createExamPaper(int examId, String username) {
        // 生成试卷并返回试卷id
        Integer examTAssignmentId = this.findTAssignmentForExam(examId, username);
        return examTAssignmentId;
    }

    /**************************************************************************
     * Description 开始考试，组卷
     *
     * @author lixueteng
     * @date 2017-09-12
     **************************************************************************/
    @Transactional
    @Override
    public Integer createRandomExam(Integer examId, Integer examParentId, String username) {
        TAssignment exam = tAssignmentJPA.findOne(examId);//考生考试的记录
        TAssignment examParent = tAssignmentJPA.findOne(examParentId);//发布的考试
        if (exam != null && exam.getTAssignmentSections() != null && exam.getTAssignmentSections().size() > 0 && exam.getTAssignmentSections().iterator().next().getTAssignmentItems().size() > 0) {//该试卷已出
            return examId;
        } else {//若没有则新增
            if (examParent.getExamQuestionpool() == null) {//考试的试卷库为空，则表示试卷来源于题库
                Integer i = 1;
                for (TAssignmentItemComponent tAssignmentItemComponent : examParent.getTAssignmentItemComponents()) {
                    TAssignmentSection tAssignmentSection = new TAssignmentSection();
                    tAssignmentSection.setCreatedTime(new Date());
                    String description = null;
                    if (tAssignmentItemComponent.getItemType() == 1) {
                        description = "多选题";
                    }
                    if (tAssignmentItemComponent.getItemType() == 2) {
                        description = "对错题";
                    }
                    if (tAssignmentItemComponent.getItemType() == 4) {
                        description = "单选题";
                    }
                    if (tAssignmentItemComponent.getItemType() == 8) {
                        description = "填空题";
                    }
                    if (tAssignmentItemComponent.getItemType() == 5) {
                        description = "简答题";
                    }
                    tAssignmentSection.setDescription(description);
                    tAssignmentSection.setTAssignment(exam);
                    tAssignmentSection.setSequence(i);
                    tAssignmentSection = tAssignmentSectionJPA.save(tAssignmentSection);
                    Integer questionpoolId = tAssignmentItemComponent.getTAssignmentQuestionpool().getQuestionpoolId();
                    String queryString = "select t.id from t_assignment_item t";
                    queryString += " left join t_assignment_questionpool_item m on t.id=m.item_id";
                    queryString += " where t.type='" + tAssignmentItemComponent.getItemType() + "'";
                    queryString += " and m.questionpool_id='" + questionpoolId + "'";
                    if (tAssignmentItemComponent.getItemType() == 8) {
                        queryString += " and t.gaps_number='" + tAssignmentItemComponent.getItemGapnumber() + "'";
                    }

                    List<Integer> tAssignmentItems = entityManager.createNativeQuery(queryString).getResultList();
                    //根据总题数，抽取需要的提的数量的随机数
                    Collections.shuffle(tAssignmentItems);
                    Integer min = tAssignmentItemComponent.getItemQuantity();//要抽取的题的数量
                    Integer max = tAssignmentItems.size();//题的总数
                    if (min > max) {
                        min = max;
                    }
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                    String currentTime = sdf.format(Calendar.getInstance().getTime());
                    String score = Double.toString(tAssignmentItemComponent.getItemScore());
                    String insertsql = "insert into `t_assignment_item` (`section_id`, `sequence`, `description`, `description_temp`, `score`, `created_by`, `created_time`, `type`, `item_parent`,`flag`, `gaps_number`,`is_order`) ";
                    //遍历出抽到的题的id
                    String ids = "(";
                    String idss = "";
                    for (i = 0; i < min; i++) {
                        if (i != min - 1) {
                            ids += "'" + tAssignmentItems.get(i) + "',";
                            idss += "" + tAssignmentItems.get(i) + ",";
                        } else {
                            ids += "'" + tAssignmentItems.get(i) + "')";
                            idss += "" + tAssignmentItems.get(i) + "";
                        }
                    }
                    if (!"()".equals(ids) && !"(".equals(ids)) {
                        insertsql += " select '" + tAssignmentSection.getId() + "', `sequence`, `description`, `description_temp`, '" + score + "', '" + username + "', '" + currentTime + "', `type`, `id` ,`flag`,`gaps_number`,`is_order` from t_assignment_item where id in " + ids;
                        insertsql += " ORDER BY INSTR('," + idss + ",',CONCAT(',',id,','))";

                        entityManager.createNativeQuery(insertsql).executeUpdate();
                        insertsql = "insert into t_assignment_answer (`item_id`,`text`,`label`,`iscorrect`,`weight`) ";
                        insertsql += "select (select c.id from `t_assignment_item` c where c.section_id ='" + tAssignmentSection.getId() + "' and c.item_parent = item_id and c.created_by = '" + username + "'),`text`,`label`,`iscorrect`,`weight` from `t_assignment_answer` where item_id in " + ids;
                        //把抽到的题插入到考试题中
                        entityManager.createNativeQuery(insertsql).executeUpdate();
                    }
                }
            } else {
                // 考试的试卷库不为空表示题目来源于试卷库,则不需要组卷
                // 获取试卷库并设置考试的试卷库外键
                ExamQuestionpool examQuestionpool = examParent.getExamQuestionpool();
                exam.setExamQuestionpool(examQuestionpool);
                tAssignmentJPA.save(exam);
            }
        }

        return examId;
    }

    /**************************************************************************
     * Description 学生开始测试-根据现有测试，创建一个测试副本，用于给小题打分
     *
     * @author fubowen
     * @date 2021-7-13
     **************************************************************************/
    @Transactional(rollbackFor = Exception.class)
    @Override
    public Integer copyTestForGrading(Integer testId, String username) {
        User user = userJPA.findOne(username);
        TAssignment test = tAssignmentJPA.findOne(testId);//原测试-测试模板
        //判断是否有过考生的考试记录
        List<TAssignment> tAssignments = tAssignmentJPA.findExamByUserAndExamId(testId, username);
        TAssignment testTAssignment = new TAssignment();//根据测试模板生成的副本
        if (tAssignments.size() > 0) {
            testTAssignment = tAssignments.get(0);
        } else {
            testTAssignment.setUser(user);
            testTAssignment.setTestParentId(test.getId());
            testTAssignment.setStatus(0);
            testTAssignment.setCreatedTime(new Date());
            testTAssignment = tAssignmentJPA.save(testTAssignment);
        }
        if (testTAssignment != null && testTAssignment.getTAssignmentSections() != null && testTAssignment.getTAssignmentSections().size() > 0 && testTAssignment.getTAssignmentSections().iterator().next().getTAssignmentItems().size() > 0) {//该试卷已出
            return testTAssignment.getId();
        } else {//若没有则新增
            Set<TAssignmentSection> sections = test.getTAssignmentSections();
            Integer i = 1;
            for (TAssignmentSection section : sections) {
                TAssignmentSection tAssignmentSection = new TAssignmentSection();
                tAssignmentSection.setCreatedTime(new Date());
                tAssignmentSection.setDescription(section.getDescription());
                tAssignmentSection.setTAssignment(testTAssignment);
                tAssignmentSection.setSequence(i);
                tAssignmentSection = tAssignmentSectionJPA.save(tAssignmentSection);
                Set<TAssignmentItem> tAssignmentItems = section.getTAssignmentItems();
                for (TAssignmentItem tAssignmentItem : tAssignmentItems) {
                    TAssignmentItem item = new TAssignmentItem();
                    item.setTAssignmentSection(tAssignmentSection);
                    item.setDescription(tAssignmentItem.getDescription());
                    item.setDescriptionTemp(tAssignmentItem.getDescriptionTemp());
                    item.setScore(tAssignmentItem.getScore());
                    item.setCreatedTime(new Date());
                    item.setType(tAssignmentItem.getType());
                    item.setItemParent(tAssignmentItem.getItemParent());
                    item.setGapsNumber(tAssignmentItem.getGapsNumber());
                    item.setIsOrder(tAssignmentItem.getIsOrder());
                    item.setStatus(0);
                    item = tAssignmentItemJPA.save(item);
                    Set<TAssignmentAnswer> tAssignmentAnswers = tAssignmentItem.getTAssignmentAnswers();
                    for (TAssignmentAnswer tAssignmentAnswer : tAssignmentAnswers) {
                        TAssignmentAnswer answer = new TAssignmentAnswer();
                        answer.setTAssignmentItem(item);
                        answer.setText(tAssignmentAnswer.getText());
                        answer.setLabel(tAssignmentAnswer.getLabel());
                        answer.setIscorrect(tAssignmentAnswer.getIscorrect());
                        answer.setWeight(tAssignmentAnswer.getWeight());
                        tAssignmentAnswerJPA.save(answer);
                    }
                }
            }
        }

        return testTAssignment.getId();
    }

    /**************************************************************************
     * Description 开始考试，获取考试题目数据
     *
     * @author lixueteng
     * @date 2017-09-17
     **************************************************************************/
    @Transactional
    @Override
    public ExamDetailVo getExamDetail(Integer examId, String username, Integer pageNumber, Integer pageSize) {
        //获取学生考试的那条记录
        TAssignment exam = tAssignmentJPA.findOne(examId);
        //获取参加的是那个考试
        TAssignment parentExam = tAssignmentJPA.findOne(exam.getTestParentId());
        //根据题目来源获取考试题目
        int totalRecords = 0;//题目数量
        Map<String, Integer> pageModel = new HashMap<>();//分页信息
        List<TAssignmentItem> tAssignmentItems = new ArrayList<>();
        if (parentExam.getExamQuestionpool() == null) {//考试试卷库为空表示题目来源于题库
            //获取考试题目数量
            totalRecords = tAssignmentItemJPA.countTAssignmentItem(examId);
            pageModel = shareService.getPage(pageNumber, pageSize, totalRecords);
            Pageable pageable = PageRequest.of(pageNumber - 1, totalRecords);
            //获取所有的题目 PageRequest.of(pageNumber - 1, pagzSize, null);
            Page<TAssignmentItem> pageTAssignmentItems = tAssignmentItemJPA.findTAssignmentItemByExamId(examId, pageable);
            tAssignmentItems = pageTAssignmentItems.getContent();
        } else {
            //考试试卷库不为空表示题目来源于试卷库
            /*//获取试卷库id
            Integer examQuestionpoolId = exam.getExamQuestionpool().getId();
            //获取考试题目数量
            String queryString = "select count(t) from t_assignment_item t,exam_section e1,exam_section_item e2"
                       + "where t.id = e2.item_id "
                       + "and e2.exam_section_id = e1.id "
                       + "and e1.exam_questionpool_id ='"+examQuestionpoolId+"'";
            totalRecords = Integer.valueOf(entityManager.createNativeQuery(queryString).getSingleResult().toString());
            pageModel = shareService.getPage(pageNumber, pageSize, totalRecords);
            Pageable pageable = PageRequest.of(pageNumber-1, totalRecords);
            //获取所有的题目 PageRequest.of(pageNumber - 1, pagzSize, null);
            Page<TAssignmentItem> pageTAssignmentItems = tAssignmentItemJPA.findTAssignmentItemByExamQuestionpool(examQuestionpoolId, pageable);
            tAssignmentItems = pageTAssignmentItems.getContent();*/

            //获取试卷库
            ExamQuestionpool examQuestionpool = exam.getExamQuestionpool();
            List<TAssignmentItem> tAssignmentItemList = new ArrayList<>();
            //遍历试卷库大项获取所有试题id
            Set<ExamSection> examSections = examQuestionpool.getExamSections();//试卷库大项
            for (ExamSection examSection : examSections) {
                //试题
                Set<TAssignmentItem> tAssignmentItemSet = examSection.getTAssignmentItems();
                for (TAssignmentItem tAssignmentItem : tAssignmentItemSet) {
                    tAssignmentItem.setScore(examSection.getItemScore());
                    tAssignmentItemList.add(tAssignmentItem);
                }
            }
            Collections.sort(tAssignmentItemList, new Comparator<TAssignmentItem>() {//根据id排序解决set无序问题
                @Override
                public int compare(TAssignmentItem arg0, TAssignmentItem arg1) {
                    return (arg0.getId()).compareTo(arg1.getId());
                }
            });
            totalRecords = tAssignmentItemList.size();
            pageModel = shareService.getPage(pageNumber, pageSize, totalRecords);
            //获取所有的题目
            tAssignmentItems = tAssignmentItemList.subList(pageNumber - 1, totalRecords);
        }
        ExamDetailVo examDetailVo = new ExamDetailVo();
        examDetailVo.setId(examId);
        List<Integer> idsList = new ArrayList<>();
        examDetailVo.setStatus(exam.getStatus());
        List<ExamItemVo> examItemVoList = new ArrayList<>();
        // 转换实体为dto
        for (TAssignmentItem items : tAssignmentItems) {
            ExamItemVo item = new ExamItemVo();
            item.setId(items.getId());
            idsList.add(items.getId());
            item.setDescription(items.getDescription());
            item.setType(items.getType());
            item.setScore(items.getScore());
            item.setGapsNumber(items.getGapsNumber());
            item.setIsOrder(items.getIsOrder());
            List<TAssignmentAnswerDto> answerText = new ArrayList<>();
            //解决set集合顺序不确定问题
            List<TAssignmentAnswer> tAssignmentAnswers = tAssignmentItemJPA.findTAssignmentAnswerByItemId(items.getId());
            for (TAssignmentAnswer answer : tAssignmentAnswers) {
                TAssignmentAnswerDto answerDto = new TAssignmentAnswerDto();
                answerDto.setId(answer.getId());
                answerDto.setText(answer.getText());
                answerDto.setLabel(answer.getLabel());
                answerDto.setIscorrect(answer.getIscorrect());
                answerText.add(answerDto);
            }
            item.setAnswertext(answerText);
            if (items.getType() == 8 && items.getIsOrder() != null && items.getIsOrder() == 0) {
                List<TAssignmentAnswerDto> answerDtos = new ArrayList<>();
                answerText.stream().limit(items.getGapsNumber()).forEach(s -> answerDtos.add(s));
                item.setAnswertext(answerDtos);
            }
            //判断是否是填空题
            if (item.getType() == 8) {
                item.setDescriptionTemp(items.getDescriptionTemp());
            }
            examItemVoList.add(item);
        }
        examDetailVo.setItemIds(idsList);
        //获取一共多少页
        int totalPage = pageModel.get("totalPage");
        // 集合 分成几份
        List<List<ExamItemVo>> lists = ListUtil.averageAssign(examItemVoList, pageSize);
        //考试的标题
        examDetailVo.setTitle(parentExam.getTitle());
        examDetailVo.setExamItemVoList(lists);
        //当前考试的人
        examDetailVo.setUsername(username);
        //考试的时间
        Integer mins = parentExam.getMins();
        examDetailVo.setTotalTime(mins);
        //获取毫秒
        mins = mins * 60 * 1000;
        //获取考试的创建时间
        Date examStartTime = exam.getCreatedTime();
        //计算本次考试剩余的时间
        Date now = new Date();
        long time = examStartTime.getTime();
        time = time + mins;

        long restTime = time - now.getTime();
        examDetailVo.setSubmitTime(restTime / 1000);
        //考试的分数
        examDetailVo.setScore(parentExam.getTAssignmentAnswerAssign().getScore());
        examDetailVo.setPageModel(pageModel);
        System.out.println("考试时间:" + examDetailVo.getSubmitTime());
        return examDetailVo;
    }

    /**************************************************************************
     * Description 开始考试，保存考试的答题记录
     *
     * @author lixueteng
     * @date 2017-09-19
     **************************************************************************/
    @Transactional(rollbackFor = Exception.class)
    @Override
    public BigDecimal saveTAssignmentItemMapping(Map<String, String[]> answerMap, Integer assignmentId, Integer submitTime, String username, Integer grading) {
        //初始化当前时间
        String currentTime = DateFormatUtil.date2String(new Date(), "yyyy-MM-dd HH:mm:ss");
        //获取当前试卷对象
        TAssignment exam = tAssignmentJPA.findOne(assignmentId);
        Integer tAssignmentId = exam.getId();
        Integer itemId;
        String answerText = "";
        String score;
        List<String> sqlList;
        BigDecimal totalScore = new BigDecimal(0);
        String basesql = "INSERT INTO `t_assignment_item_mapping` (`assignment_id`, `item_id`, `answer_id`, `answer_text`, `student`, `submit_date`, `submit_time`,`grading_id`,`autoscore`) VALUES ";
        String sql = "";
        //获取当前考试的当前学生的题目列表
        List<TAssignmentItem> itemList = new ArrayList<>();
        //试题的答案
        Map<Integer, TAssignmentAnswer> itemAnswerMap = new HashMap<>();
        //每个题目的分数（用于试卷库中的题目）
        Map<Integer, Double> itemScoreMap = new HashMap<>();
        if (exam.getExamQuestionpool() == null) {//试卷来源于题库
            Set<TAssignmentSection> tAssignmentSections = exam.getTAssignmentSections();
            for (TAssignmentSection section : tAssignmentSections) {
                //当前考试的试题列表
                Set<TAssignmentItem> tAssignmentItems = section.getTAssignmentItems();
                for (TAssignmentItem item : tAssignmentItems) {
                    itemList.add(item);
                    //获取这个item 的answer
                    Set<TAssignmentAnswer> tAssignmentAnswers = item.getTAssignmentAnswers();
                    for (TAssignmentAnswer answer : tAssignmentAnswers) {
                        itemAnswerMap.put(answer.getId(), answer);
                    }
                }
            }
        } else {//试卷来源于试卷库
            //试卷库
            ExamQuestionpool examQuestionpool = exam.getExamQuestionpool();
            //试卷库大项
            Set<ExamSection> examSections = examQuestionpool.getExamSections();
            //遍历试卷库大项获取题目题号
            for (ExamSection examSection : examSections) {
                Set<TAssignmentItem> tAssignmentItemSet = examSection.getTAssignmentItems();
                //每个题目的分数
                double eachItemScore = examSection.getItemScore();
                for (TAssignmentItem tAssignmentItem : tAssignmentItemSet) {
                    itemList.add(tAssignmentItem);
                    itemScoreMap.put(tAssignmentItem.getId(), eachItemScore);
                    //获取这个item 的answer
                    Set<TAssignmentAnswer> tAssignmentAnswers = tAssignmentItem.getTAssignmentAnswers();
                    for (TAssignmentAnswer answer : tAssignmentAnswers) {
                        itemAnswerMap.put(answer.getId(), answer);
                    }
                }
            }
        }
        if (exam.getExamQuestionpool() == null) {//试卷来源于题库
            for (TAssignmentItem item : itemList) {
                itemId = item.getId();
                int count = 0;
                score = "0";
                List<String> answersArray = new ArrayList<String>();
                sqlList = new ArrayList<String>();
                //获取这道题学生选择的答案
                answerMap.get("answers" + itemId);
                String[] answers = (String[]) answerMap.get("answers" + itemId);
                String[] answertexts = (String[]) answerMap.get("answertexts" + itemId);
                if (answers != null && answers.length > 0) {
                    for (int i = 0; i < answers.length; i++) {
                        // 对错题判断和单选题判断
                        if (item.getType() == 2 || item.getType() == 4) {
                            TAssignmentAnswer tAssignmentAnswer = itemAnswerMap.get(Integer.valueOf(answers[i]));
                            if (tAssignmentAnswer.getIscorrect() == 1) {
                                score = item.getScore().toString();
                                totalScore = totalScore.add(new BigDecimal(item.getScore()));
                            }
                        }
                        // 填空题题判断
                        if (item.getType() == 8) {
                            if (answertexts[i] != null && answertexts[i].trim().equals(itemAnswerMap.get(Integer.valueOf(answers[i])).getText())) {
                                count++;
                            }
                        }
                        //简答题
                        if (item.getType() == 5) {
                            int answersSize = item.getTAssignmentAnswers().size();
                            int rightSize = 0;
                            for (TAssignmentAnswer tAssignmentAnswer : item.getTAssignmentAnswers()) {
                                if (answers[i].contains(tAssignmentAnswer.getText())) {
                                    rightSize += 1;
                                }
                            }
                            double ss = rightSize / (answersSize * 1.0);//分数比例
                            score = new BigDecimal(ss).multiply(new BigDecimal(item.getScore())).toString();
                            answerText = answers[i];
                        }
                        if (answertexts != null) {
                            if (item.getType() == 5 || item.getType() == 8) {
                                answerText = answertexts[i].trim();
                            }
                        }
                        //
                        String answerId = "";
                        if (item.getType() == 5) {
                            answerId = null;
                        } else {
                            answerId = "'" + answers[i] + "'";
                        }
                        if (item.getType() != 8 && item.getType() != 5) {
                            answerText = "";
                        }
                        sqlList.add("('" + tAssignmentId + "','" + itemId + "'," + answerId + ",'" + answerText + "','" + username + "','" + currentTime + "','1'," + grading + ",");

                    }
                }
                if (item.getType() == 8) {
                    if (count != 0) {//如果有答对的题，计入得分
                        BigDecimal itemScore = new BigDecimal(item.getScore());
                        //以小题得分除以总空格数并乘以答对的空格数计算得分
                        //保留两位小数
                        totalScore = totalScore.add(itemScore.multiply(new BigDecimal(count)).divide(new BigDecimal(answers.length), 2, BigDecimal.ROUND_HALF_EVEN));

                        score = itemScore.multiply(new BigDecimal(count)).divide(new BigDecimal(answers.length), 2, BigDecimal.ROUND_HALF_EVEN).toString();
                    }
                }
                //多选题
                if (item.getType() == 1) {
                    for (TAssignmentAnswer tAssignmentAnswer : item.getTAssignmentAnswers()) {
                        if (tAssignmentAnswer.getIscorrect() == 1) {
                            answersArray.add(tAssignmentAnswer.getId().toString());
                        }
                    }
                    count = compare(answers, answersArray);
                    if (count != 0) {
                        score = new BigDecimal(count / 2.0).multiply(new BigDecimal(item.getScore())).toString();
                        totalScore = totalScore.add(new BigDecimal(count / 2.0).multiply(new BigDecimal(item.getScore())));
                    }

                }
                for (String string : sqlList) {
                    sql += string + "'" + score + "'),";
                }
            }
        } else {//试卷来源于试卷库
            for (TAssignmentItem item : itemList) {
                itemId = item.getId();
                int count = 0;
                score = "0";
                List<String> answersArray = new ArrayList<String>();
                sqlList = new ArrayList<String>();
                //获取这道题学生选择的答案
                String[] answers = (String[]) answerMap.get("answers" + itemId);
                String[] answertexts = (String[]) answerMap.get("answertexts" + itemId);
                if (answers != null && answers.length > 0) {
                    for (int i = 0; i < answers.length; i++) {
                        // 对错题判断和单选题判断
                        if (item.getType() == 2 || item.getType() == 4) {
                            TAssignmentAnswer tAssignmentAnswer = itemAnswerMap.get(Integer.valueOf(answers[i]));
                            if (tAssignmentAnswer.getIscorrect() == 1) {
                                score = Double.toString(itemScoreMap.get(item.getId()));
                                totalScore = totalScore.add(new BigDecimal(itemScoreMap.get(item.getId())));
                            }
                        }
                        // 填空题题判断
                        if (item.getType() == 8) {
                            if (answertexts[i] != null && answertexts[i].trim().equals(itemAnswerMap.get(Integer.valueOf(answers[i])).getText())) {
                                count++;
                            }
                        }
                        //简答题
                        if (item.getType() == 5) {
                            int answersSize = item.getTAssignmentAnswers().size();
                            int rightSize = 0;
                            for (TAssignmentAnswer tAssignmentAnswer : item.getTAssignmentAnswers()) {
                                if (answers[i].contains(tAssignmentAnswer.getText())) {
                                    rightSize += 1;
                                }
                            }
                            double ss = rightSize / (answersSize * 1.0);//分数比例
                            score = new BigDecimal(ss).multiply(new BigDecimal(itemScoreMap.get(item.getId()))).toString();
                            answerText = answers[i];
                        }
                        if (answertexts != null) {
                            if (item.getType() == 5 || item.getType() == 8) {
                                answerText = answertexts[i].trim();
                            }
                        }
                        //
                        String answerId = "";
                        if (item.getType() == 5) {
                            answerId = null;
                        } else {
                            answerId = "'" + answers[i] + "'";
                        }
                        if (item.getType() != 8 && item.getType() != 5) {
                            answerText = "";
                        }
                        sqlList.add("('" + tAssignmentId + "','" + itemId + "'," + answerId + ",'" + answerText + "','" + username + "','" + currentTime + "','1'," + grading + ",");

                    }
                }
                if (item.getType() == 8) {
                    if (count != 0) {//如果有答对的题，计入得分
                        BigDecimal itemScore = new BigDecimal(itemScoreMap.get(item.getId()));
                        //以小题得分除以总空格数并乘以答对的空格数计算得分
                        //保留两位小数
                        totalScore = totalScore.add(itemScore.multiply(new BigDecimal(count)).divide(new BigDecimal(answers.length), 2, BigDecimal.ROUND_HALF_EVEN));

                        score = itemScore.multiply(new BigDecimal(count)).divide(new BigDecimal(answers.length), 2, BigDecimal.ROUND_HALF_EVEN).toString();
                    }
                }
                //多选题
                if (item.getType() == 1) {
                    for (TAssignmentAnswer tAssignmentAnswer : item.getTAssignmentAnswers()) {
                        if (tAssignmentAnswer.getIscorrect() == 1) {
                            answersArray.add(tAssignmentAnswer.getId().toString());
                        }
                    }
                    count = compare(answers, answersArray);
                    if (count != 0) {
                        score = new BigDecimal(count / 2.0).multiply(new BigDecimal(itemScoreMap.get(item.getId()))).toString();
                        totalScore = totalScore.add(new BigDecimal(count / 2.0).multiply(new BigDecimal(itemScoreMap.get(item.getId()))));
                    }

                }
                for (String string : sqlList) {
                    sql += string + "'" + score + "'),";
                }
            }
        }
        if (!"".equals(sql)) {
            sql = basesql + sql.substring(0, sql.length() - 1);

            entityManager.createNativeQuery(sql).executeUpdate();
        }

        return totalScore;
    }

    /**************************************************************************
     * Description 开始考试，保存学生答题
     *
     * @author lixueteng
     * @date 2017-09-19
     **************************************************************************/
    @Override
    public Integer saveTAssignmentGradeForTest(BigDecimal totalScore, Integer assignmentId, Integer submitTime, String username, Integer grading) {
        //判断是考试还是测试
        // 试卷
        TAssignment tAssignment = tAssignmentJPA.findOne(assignmentId);
        TAssignment parentTAssignment = null;
        if (tAssignment.getTestParentId() != null) {
            // 考试
            parentTAssignment = tAssignmentJPA.findOne(tAssignment.getTestParentId());
        } else {
            parentTAssignment = tAssignment;
        }

        // 打分表
        TAssignmentGrading tAssignmentGrade = tAssignmentGradingJPA.findOne(grading);
        if (tAssignmentGrade == null) {
            tAssignmentGrade = new TAssignmentGrading();
        }
//        TAssignmentGrading tAssignmentGrade = new TAssignmentGrading();
        // 查询最大提交数
        List<TAssignmentGrading> tAssignmentGradingsSubmit = tAssignmentGradingJPA
                .findMaxSubmitTime(parentTAssignment.getId(), username);
        if (submitTime != 0) {// 若是提交，查询以前的最大提交数并加一,没有则为第一次提交
            if (tAssignmentGradingsSubmit.size() > 0) {
                submitTime = tAssignmentGradingsSubmit.get(0).getSubmitTime() + 1;
            }
        }
        tAssignmentGrade.setFinalScore(totalScore.doubleValue());

        // 考试的试题对象
        tAssignmentGrade.setTestId(assignmentId);
        // 考试对象
        tAssignmentGrade.setTAssignment(parentTAssignment);
        // 改变提交次数
        tAssignmentGrade.setSubmitTime(submitTime);
        // 考试的学生
        tAssignmentGrade.setUserByStudent(userJPA.findOne(username));

        Integer islate = 0;// 0表示正常提交
        Calendar submitDate = Calendar.getInstance();
        Calendar dueDate = Calendar.getInstance();
        dueDate.setTime(parentTAssignment.getTAssignmentControl().getDuedate());
        if (submitDate.after(dueDate)) {
            islate = 1;// 1表示迟交
        }
        tAssignmentGrade.setIslate(islate);
        tAssignmentGrade.setSubmitdate(submitDate.getTime());
        // 提交后返回作业列表
        try {
            tAssignmentGradingJPA.save(tAssignmentGrade);
        } catch (Exception e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return null;
        }
        return tAssignmentGrade.getAccessmentgradingId();

    }

    @Override
    @Transactional
    public synchronized String synchronizeAnswerDetails(Integer gradingId) {
        TAssignmentGrading tAssignmentGrading = tAssignmentGradingJPA.findOne(gradingId);
        String hashKey = tAssignmentGrading.getUserByStudent().getUsername() + "_assignmentId" + tAssignmentGrading.getTestId() + "_gradingId" + tAssignmentGrading.getAccessmentgradingId();
//        Map entries = stringRedisTemplate.opsForHash().entries(ConstantInterface.TAssignmentItemMappingKey + "-" + clientDatabaseContext.getCurrentDataSourceDto().getSchoolName());
        Object entries = stringRedisTemplate.opsForHash().get(ConstantInterface.TAssignmentItemMappingKey + "-" + clientDatabaseContext.getCurrentDataSourceDto().getSchoolName(), hashKey);
        List<TAssignmentItemMappingDTO> tAssignmentItemMappingDTOList = new ArrayList<>(16);
        if (entries != null) {
            tAssignmentItemMappingDTOList.addAll(JSONObject.parseArray(entries.toString(), TAssignmentItemMappingDTO.class));
        }
//        if (entries != null) {
//            Collection collection = entries.values();
//            Iterator i = collection.iterator();
//            while (i.hasNext()) {
//                tAssignmentItemMappingDTOList.addAll(JSONObject.parseArray(i.next().toString(), TAssignmentItemMappingDTO.class));
//            }
//        }

        StringBuilder valueSql = new StringBuilder(" INSERT INTO `t_assignment_item_mapping` (`assignment_id`, `item_id`, `answer_id`, `answer_text`, `student`, `submit_date`, `submit_time`,`grading_id`,`autoscore`) VALUES ");
        if (tAssignmentItemMappingDTOList.size() > 0) {
            for (int i = 0; i < tAssignmentItemMappingDTOList.size(); i++) {
                valueSql.append("(?,?,?,?,?,?,?,?,?),");
            }
            valueSql.deleteCharAt(valueSql.length() - 1);
            Query query = entityManager.createNativeQuery(valueSql.toString());
            int i = 1;
            for (TAssignmentItemMappingDTO tAssignmentItemMappingDTO : tAssignmentItemMappingDTOList) {
                query.setParameter(i++, tAssignmentItemMappingDTO.getAssignmentId());
                query.setParameter(i++, tAssignmentItemMappingDTO.getItemId());
                query.setParameter(i++, tAssignmentItemMappingDTO.getAnswerId());
                query.setParameter(i++, tAssignmentItemMappingDTO.getAnswerText());
                query.setParameter(i++, tAssignmentItemMappingDTO.getStudent());
                query.setParameter(i++, tAssignmentItemMappingDTO.getSubmitDate());
                query.setParameter(i++, tAssignmentItemMappingDTO.getSubmitTime());
                query.setParameter(i++, tAssignmentItemMappingDTO.getGradingId());
                query.setParameter(i++, tAssignmentItemMappingDTO.getAutoScore());
            }
            query.executeUpdate();
            stringRedisTemplate.opsForHash().delete(ConstantInterface.TAssignmentItemMappingKey + "-" + clientDatabaseContext.getCurrentDataSourceDto().getSchoolName(), hashKey);
        }
        System.out.println("同步答题详情------>" + clientDatabaseContext.getCurrentDataSourceDto().getSchoolName());
        return "ok";

    }

    /**************************************************************************
     * Description:考试-需手动打分的简答题
     *
     * @author：黄浩
     * @date ：2020年9月25日
     **************************************************************************/
    @Override
    public List<ExamDetailsVO> findExamGradeItems(Integer testId, String username, Integer currpage, Integer pageSize) {
        List<ExamDetailsVO> examDetailsVOList = new ArrayList<>();
        List<TAssignment> tAssignmentList = tAssignmentJPA.findExamByUserAndExamIdWithoutStatus(testId, username);
        if (tAssignmentList.size() > 0) {
            TAssignment tAssignment = tAssignmentList.get(tAssignmentList.size() - 1);

            //查询题目,字段status值为0则表示未经过老师手动打分，为1则表示已经有老师手动打过分。
            String sql = "select i from TAssignmentItem i where i.TAssignmentSection.TAssignment.id =" + tAssignment.getId() + " and (i.type=5 or i.type=8) and i.status = 0 order by i.TAssignmentSection.id,i.id asc";
            Query query = entityManager.createQuery(sql);
            query.setMaxResults(pageSize);
            if (currpage == 0) {
                query.setFirstResult(0);
            } else {
                query.setFirstResult((currpage - 1) * pageSize);
            }
            List<TAssignmentItem> tAssignmentItems = new ArrayList<TAssignmentItem>(query.getResultList());

//            List<TAssignmentItem> tAssignmentItems = tAssignmentItemJPA.findTAssignmentItemByExamId(tAssignment.getId());
            for (TAssignmentItem tai : tAssignmentItems) {
                ExamDetailsVO examDetailsVO = new ExamDetailsVO();
                examDetailsVO.setId(tai.getId());
                examDetailsVO.setGrade(tai.getScore());
                //题干
                examDetailsVO.setTitle(tai.getDescription());
                //题目类型
                examDetailsVO.setType(tai.getType());
                // 填空题则获取是否有序，简答题判分类型
                if (tai.getType() == 8 || tai.getType() == 5) {
                    examDetailsVO.setIsOrder(tai.getIsOrder());
                }
                //获取题目得分
                List<TAssignmentItemMapping> tAssignmentItemMappingScoreList = tAssignmentItemMappingJPA.findListScoreByItemId(tai.getId(), tAssignment.getId());
                if (tAssignmentItemMappingScoreList.size() > 0) {
                    examDetailsVO.setScore(tAssignmentItemMappingScoreList.get(0).getAutoscore());
                }
                //获取学生回答
                List<TAssignmentItemMapping> tAssignmentItemMappingList = tAssignmentItemMappingJPA.findListScoreByItemIdAndUsername(tai.getId(), username, tAssignment.getId());
                List<TAssignmentItemMappingsVO> tAssignmentItemMappingsVOList = new ArrayList<>();
                for (TAssignmentItemMapping taim : tAssignmentItemMappingList) {
                    TAssignmentItemMappingsVO tAssignmentItemMappingsVO = new TAssignmentItemMappingsVO();
                    tAssignmentItemMappingsVO.setId(Integer.valueOf(taim.getId()));
                    if (taim.getTAssignmentAnswer() != null) {
                        tAssignmentItemMappingsVO.setAnswerId(taim.getTAssignmentAnswer().getId());
                    }
                    tAssignmentItemMappingsVO.setAnswerText(taim.getAnswerText());
                    tAssignmentItemMappingsVOList.add(tAssignmentItemMappingsVO);
                }
                examDetailsVO.setMapping(tAssignmentItemMappingsVOList);
                //获取选项
                List<TAssignmentAnswersVO> tAssignmentAnswerVOList = new ArrayList<>();
                List<TAssignmentAnswer> tAssignmentAnswers = tAssignmentAnswerJPA.findAnswersByTAssignmentId(tai.getId());
                for (TAssignmentAnswer ta : tAssignmentAnswers) {
                    TAssignmentAnswersVO tAssignmentAnswersVO = new TAssignmentAnswersVO();
                    tAssignmentAnswersVO.setAnswerId(ta.getId());
                    tAssignmentAnswersVO.setText(ta.getText());
                    tAssignmentAnswersVO.setIsCorrect(ta.getIscorrect());
                    tAssignmentAnswersVO.setLabel(ta.getLabel());
                    tAssignmentAnswerVOList.add(tAssignmentAnswersVO);
                }
                examDetailsVO.setAnswer(tAssignmentAnswerVOList);
                examDetailsVOList.add(examDetailsVO);
            }
        }

        return examDetailsVOList;
    }

    /**************************************************************************
     * Description:考试-需手动打分的简答题数量
     *
     * @author：黄浩
     * @date ：2020年9月25日
     **************************************************************************/
    @Override
    public long countExamGradeItems(Integer testId, String username) {
        long count = 0;
        List<ExamDetailsVO> examDetailsVOList = new ArrayList<>();
        List<TAssignment> tAssignmentList = tAssignmentJPA.findExamByUserAndExamIdWithoutStatus(testId, username);
        if (tAssignmentList.size() > 0) {
            TAssignment tAssignment = tAssignmentList.get(tAssignmentList.size() - 1);

            //查询题目
            String sql = "select count(i) from TAssignmentItem i where i.TAssignmentSection.TAssignment.id =" + tAssignment.getId() + " and i.status = 0 and (i.type=5 or i.type =8)";
            count = (Long) entityManager.createQuery(sql).getSingleResult();

        }
        return count;
    }

    /**************************************************************************
     * Description:考试-老师手动打分解答题
     *
     * @author：黄浩
     * @date ：2020年9月25日
     **************************************************************************/
    @Override
    public boolean gradeItem(Integer itemId, Integer gradingId, Double score) {
        try {
            //获取当前答题详情
            List<TAssignmentItemMapping> mappingList = tAssignmentItemMappingJPA.findScoreByItemAndGrading(itemId, gradingId);
            TAssignmentItemMapping taim = mappingList.get(0);
            //修改当前答题详情成绩
            taim.setOveriderScore(score);
            //修改题目标记
            TAssignmentItem tai = taim.getTAssignmentItem();
            tai.setStatus(1);
            tAssignmentItemJPA.save(tai);
            taim.setTAssignmentItem(tai);
            //获取当前分数，总得分相加
            TAssignmentGrading tag = taim.getTAssignmentGrading();
            double finalScore = 0.0;
            BigDecimal authScore = new BigDecimal(taim.getAutoscore());
            BigDecimal bscore = new BigDecimal(score);
            //系统评分小于手动评分为加法，否则为减法
            if (taim.getAutoscore() < score) {
                BigDecimal cha = bscore.subtract(authScore);
                finalScore = new BigDecimal(tag.getFinalScore()).add(cha).doubleValue();
            } else if (taim.getAutoscore() > score) {
                BigDecimal cha = authScore.subtract(bscore);
                finalScore = new BigDecimal(tag.getFinalScore()).subtract(cha).doubleValue();
            }
            tag.setFinalScore(finalScore);
            tAssignmentGradingJPA.saveAndFlush(tag);
            taim.setTAssignmentGrading(tag);
            tAssignmentItemMappingJPA.saveAndFlush(taim);
            return true;
        } catch (Exception e) {
            System.out.println("简答题打分的报错信息：" + e);
            return false;
        }
    }

    /**************************************************************************
     * Description 开始考试，保存学生答题
     *
     * @author lixueteng
     * @date 2017-09-19
     **************************************************************************/
    @Override
    public Integer saveTAssignmentGradeForTest1(Double totalScore, Integer assignmentId, String username, Integer gradingId) {
        Integer submitTime = 1;
        //判断是考试还是测试
        // 试卷
        TAssignment tAssignment = tAssignmentJPA.findOne(assignmentId);
        TAssignment parentTAssignment = null;
        if (tAssignment.getTestParentId() != null) {
            // 考试
            parentTAssignment = tAssignmentJPA.findOne(tAssignment.getTestParentId());
        } else {
            parentTAssignment = tAssignment;
        }

        // 打分表
        TAssignmentGrading tAssignmentGrade = null;
        if (gradingId == null) {
            tAssignmentGrade = new TAssignmentGrading();
        } else {
            tAssignmentGrade = tAssignmentGradingJPA.findOne(gradingId);
        }
        // 查询最大提交数
        List<TAssignmentGrading> tAssignmentGradingsSubmit = tAssignmentGradingJPA.findMaxSubmitTime(parentTAssignment.getId(), username);
        if (tAssignmentGradingsSubmit.size() > 1) {
            submitTime = tAssignmentGradingsSubmit.get(0).getSubmitTime() + 1;
        }
        tAssignmentGrade.setFinalScore(totalScore.doubleValue());

        // 考试的试题对象
        tAssignmentGrade.setTestId(assignmentId);
        // 考试对象
        tAssignmentGrade.setTAssignment(parentTAssignment);
        // 改变提交次数
        tAssignmentGrade.setSubmitTime(submitTime);
        // 考试的学生
        tAssignmentGrade.setUserByStudent(userJPA.findOne(username));

        Integer islate = 0;// 0表示正常提交
        Calendar submitDate = Calendar.getInstance();
        Calendar dueDate = Calendar.getInstance();
        dueDate.setTime(parentTAssignment.getTAssignmentControl().getDuedate());
        if (submitDate.after(dueDate)) {
            islate = 1;// 1表示迟交
        }
        tAssignmentGrade.setIslate(islate);
        tAssignmentGrade.setSubmitdate(submitDate.getTime());
        // 提交后返回作业列表
        tAssignmentGradingJPA.save(tAssignmentGrade);
        return tAssignmentGrade.getAccessmentgradingId();
    }

    /**************************************************************************
     * Description:考试-查询学生答题详情
     *
     * @author：黄浩
     * @date ：2018年5月21日
     **************************************************************************/
    @Override
    public List<TestSectionVO> findTestDetail(Integer testId, String username, Integer gradingId) {
        List<TestSectionVO> testSectionVOList = new ArrayList<>();
        List<TAssignmentItem> tAssignmentItems = new ArrayList<>();
        TAssignmentGrading tAssignmentGrading = tAssignmentGradingJPA.findOne(gradingId);
        List<TAssignment> tAssignmentList = tAssignmentJPA.findExamByUserAndExamIdWithoutStatus(testId, username);
        if (tAssignmentList.size() > 0) {
            TAssignment tAssignment = tAssignmentList.get(tAssignmentGrading.getSubmitTime() - 1);
            if (tAssignment.getExamQuestionpool() == null) {
                List<TAssignmentSection> tAssignmentSections = tAssignmentSectionJPA.findSetionByTAssignmentId(tAssignment.getId());
                for (TAssignmentSection tAssignmentSection : tAssignmentSections) {
                    int correctCount = 0;
                    TestSectionVO ts = new TestSectionVO();
                    ts.setSectionTitle(tAssignmentSection.getDescription());
                    List<ExamDetailsVO> detailsVOS = new ArrayList<>();
                    for (TAssignmentItem tai : tAssignmentSection.getTAssignmentItems()) {
                        ExamDetailsVO examDetailsVO = new ExamDetailsVO();
                        examDetailsVO.setId(tai.getId());
                        examDetailsVO.setGrade(tai.getScore());
                        //题干
                        String title = "";
                        title = tai.getDescription();
                        if (tai.getType() == 8) {
                            title = tai.getDescriptionTemp();
                        }
                        title = title.replaceAll("<", "&lt;");
                        title = title.replaceAll("\n", "<w:br/>");

                        examDetailsVO.setTitle(title);

                        //题目类型
                        examDetailsVO.setType(tai.getType());
                        // 填空题则获取是否有序，简答题判分类型
                        if (tai.getType() == 8 || tai.getType() == 5) {
                            examDetailsVO.setIsOrder(tai.getIsOrder());
                        }
                        //获取题目得分
                        List<TAssignmentItemMapping> tAssignmentItemMappingScoreList = tAssignmentItemMappingJPA.findListScoreByItemId(tai.getId(), tAssignment.getId());
                        if (tAssignmentItemMappingScoreList.size() > 0) {
                            examDetailsVO.setOverriderScore(tAssignmentItemMappingScoreList.get(0).getOveriderScore() == null
                                    ? "" : tAssignmentItemMappingScoreList.get(0).getOveriderScore().toString());
                            examDetailsVO.setScore(tAssignmentItemMappingScoreList.get(0).getAutoscore());
                        }
                        //获取学生回答
                        List<TAssignmentItemMapping> tAssignmentItemMappingList = tAssignmentItemMappingJPA.findListScoreByItemIdAndUsername(tai.getId(), username, tAssignment.getId());
                        List<TAssignmentItemMappingsVO> tAssignmentItemMappingsVOList = new ArrayList<>();
                        for (TAssignmentItemMapping taim : tAssignmentItemMappingList) {
                            TAssignmentItemMappingsVO tAssignmentItemMappingsVO = new TAssignmentItemMappingsVO();
                            tAssignmentItemMappingsVO.setId(Integer.valueOf(taim.getId()));
                            tAssignmentItemMappingsVO.setLabel(taim.getTAssignmentAnswer() == null ? null : taim.getTAssignmentAnswer().getLabel());
                            if (taim.getTAssignmentAnswer() != null) {
                                tAssignmentItemMappingsVO.setAnswerId(taim.getTAssignmentAnswer().getId());
                            }
                            String answerText = taim.getAnswerText().replaceAll("<", "&lt;");
                            tAssignmentItemMappingsVO.setAnswerText(answerText);
                            tAssignmentItemMappingsVOList.add(tAssignmentItemMappingsVO);
                        }
                        examDetailsVO.setMapping(tAssignmentItemMappingsVOList);
                        //获取选项
                        List<TAssignmentAnswersVO> tAssignmentAnswerVOList = new ArrayList<>();
                        List<TAssignmentAnswer> tAssignmentAnswers = tAssignmentAnswerJPA.findAnswersByTAssignmentId(tai.getId());
                        for (TAssignmentAnswer ta : tAssignmentAnswers) {
                            TAssignmentAnswersVO tAssignmentAnswersVO = new TAssignmentAnswersVO();
                            tAssignmentAnswersVO.setAnswerId(ta.getId());
                            String text = ta.getText();
                            text = text.replaceAll("<", "&lt;");
                            text = text.replaceAll("\n", "<w:br/>");
                            tAssignmentAnswersVO.setText(text);
                            tAssignmentAnswersVO.setIsCorrect(ta.getIscorrect() == 1 ? 1 : 0);
                            tAssignmentAnswersVO.setLabel(ta.getLabel());
                            tAssignmentAnswerVOList.add(tAssignmentAnswersVO);
                        }
                        examDetailsVO.setAnswer(tAssignmentAnswerVOList);
                        if (examDetailsVO.getGrade() != null && examDetailsVO.getScore() != null) {
                            if (examDetailsVO.getGrade().toString().equals(examDetailsVO.getScore().toString())) {
                                correctCount++;
                            }
                        }
                        detailsVOS.add(examDetailsVO);
                        ts.setItems(detailsVOS);
                    }
                    ts.setCorrectCount(correctCount);
                    testSectionVOList.add(ts);
                }
            } else {
                Set<ExamSection> examSections = tAssignment.getExamQuestionpool().getExamSections();
                for (ExamSection examSection : examSections) {
                    int correctCount = 0;
                    TestSectionVO ts = new TestSectionVO();
                    ts.setSectionTitle(examSection.getName());
                    List<ExamDetailsVO> detailsVOS = new ArrayList<>();
                    for (TAssignmentItem tai : examSection.getTAssignmentItems()) {
                        ExamDetailsVO examDetailsVO = new ExamDetailsVO();
                        examDetailsVO.setId(tai.getId());
                        examDetailsVO.setGrade(tai.getScore());
                        //题干
                        String title = "";
                        title = tai.getDescription();
                        if (tai.getType() == 8) {
                            title = tai.getDescriptionTemp();
                        }
                        title = title.replaceAll("<", "&lt;");
                        title = title.replaceAll("\n", "<w:br/>");

                        examDetailsVO.setTitle(title);

                        //题目类型
                        examDetailsVO.setType(tai.getType());
                        // 填空题则获取是否有序，简答题判分类型
                        if (tai.getType() == 8 || tai.getType() == 5) {
                            examDetailsVO.setIsOrder(tai.getIsOrder());
                        }
                        //获取题目得分
                        List<TAssignmentItemMapping> tAssignmentItemMappingScoreList = tAssignmentItemMappingJPA.findListScoreByItemId(tai.getId(), tAssignment.getId());
                        if (tAssignmentItemMappingScoreList.size() > 0) {
                            examDetailsVO.setOverriderScore(tAssignmentItemMappingScoreList.get(0).getOveriderScore() == null
                                    ? "" : tAssignmentItemMappingScoreList.get(0).getOveriderScore().toString());
                            examDetailsVO.setScore(tAssignmentItemMappingScoreList.get(0).getAutoscore());
                        }
                        //获取学生回答
                        List<TAssignmentItemMapping> tAssignmentItemMappingList = tAssignmentItemMappingJPA.findListScoreByItemIdAndUsername(tai.getId(), username, tAssignment.getId());
                        List<TAssignmentItemMappingsVO> tAssignmentItemMappingsVOList = new ArrayList<>();
                        for (TAssignmentItemMapping taim : tAssignmentItemMappingList) {
                            TAssignmentItemMappingsVO tAssignmentItemMappingsVO = new TAssignmentItemMappingsVO();
                            tAssignmentItemMappingsVO.setId(Integer.valueOf(taim.getId()));
                            tAssignmentItemMappingsVO.setLabel(taim.getTAssignmentAnswer() == null ? null : taim.getTAssignmentAnswer().getLabel());
                            if (taim.getTAssignmentAnswer() != null) {
                                tAssignmentItemMappingsVO.setAnswerId(taim.getTAssignmentAnswer().getId());
                            }
                            String answerText = taim.getAnswerText().replaceAll("<", "&lt;");
                            tAssignmentItemMappingsVO.setAnswerText(answerText);
                            tAssignmentItemMappingsVOList.add(tAssignmentItemMappingsVO);
                        }
                        examDetailsVO.setMapping(tAssignmentItemMappingsVOList);
                        //获取选项
                        List<TAssignmentAnswersVO> tAssignmentAnswerVOList = new ArrayList<>();
                        List<TAssignmentAnswer> tAssignmentAnswers = tAssignmentAnswerJPA.findAnswersByTAssignmentId(tai.getId());
                        for (TAssignmentAnswer ta : tAssignmentAnswers) {
                            TAssignmentAnswersVO tAssignmentAnswersVO = new TAssignmentAnswersVO();
                            tAssignmentAnswersVO.setAnswerId(ta.getId());
                            String text = ta.getText();
                            text = text.replaceAll("<", "&lt;");
                            text = text.replaceAll("\n", "<w:br/>");
                            tAssignmentAnswersVO.setText(text);
                            tAssignmentAnswersVO.setIsCorrect(ta.getIscorrect() == 1 ? 1 : 0);
                            tAssignmentAnswersVO.setLabel(ta.getLabel());
                            tAssignmentAnswerVOList.add(tAssignmentAnswersVO);
                        }
                        examDetailsVO.setAnswer(tAssignmentAnswerVOList);
                        if (examDetailsVO.getGrade() != null && examDetailsVO.getScore() != null) {
                            if (examDetailsVO.getGrade().toString().equals(examDetailsVO.getScore().toString())) {
                                correctCount++;
                            }
                        }
                        detailsVOS.add(examDetailsVO);
                        ts.setItems(detailsVOS);
                    }
                    ts.setCorrectCount(correctCount);
                    testSectionVOList.add(ts);
                }
            }
        }
        return testSectionVOList;
    }

    /**************************************************************************
     * Description:考试-获取报告雷达图数据
     *
     * @author：黄浩
     * @date ：2021年1月5日
     **************************************************************************/
    @Override
    public List<TestSectionVO> radarMapData(Integer testId, String username, Integer gradingId) {
        List<TestSectionVO> testSectionVOList = new ArrayList<>();
        List<TAssignmentItem> tAssignmentItems = new ArrayList<>();
        TAssignmentGrading tAssignmentGrading = tAssignmentGradingJPA.findOne(gradingId);
        List<TAssignment> tAssignmentList = tAssignmentJPA.findExamByUserAndExamIdWithoutStatus(testId, username);
        if (tAssignmentList.size() > 0) {
            TAssignment tAssignment = tAssignmentList.get(tAssignmentGrading.getSubmitTime() - 1);
            if (tAssignment.getExamQuestionpool() == null) {
                List<TAssignmentSection> tAssignmentSections = tAssignmentSectionJPA.findSetionByTAssignmentId(tAssignment.getId());
                for (TAssignmentSection tAssignmentSection : tAssignmentSections) {
                    int correctCount = 0;
                    TestSectionVO ts = new TestSectionVO();
                    ts.setSectionTitle(tAssignmentSection.getDescription());
                    List<ExamDetailsVO> detailsVOS = new ArrayList<>();
                    for (TAssignmentItem tai : tAssignmentSection.getTAssignmentItems()) {
                        ExamDetailsVO examDetailsVO = new ExamDetailsVO();
                        examDetailsVO.setId(tai.getId());
                        examDetailsVO.setGrade(tai.getScore());
                        //获取题目得分
                        List<TAssignmentItemMapping> tAssignmentItemMappingScoreList = tAssignmentItemMappingJPA.findListScoreByItemId(tai.getId(), tAssignment.getId());
                        if (tAssignmentItemMappingScoreList.size() > 0) {
                            examDetailsVO.setOverriderScore(tAssignmentItemMappingScoreList.get(0).getOveriderScore() == null
                                    ? "" : tAssignmentItemMappingScoreList.get(0).getOveriderScore().toString());
                            examDetailsVO.setScore(tAssignmentItemMappingScoreList.get(0).getAutoscore());
                        }
                        if (examDetailsVO.getGrade() != null && examDetailsVO.getScore() != null) {
                            if (examDetailsVO.getGrade().toString().equals(examDetailsVO.getScore().toString())) {
                                correctCount++;
                            }
                        }
                    }
                    ts.setCorrectCount(correctCount);
                    testSectionVOList.add(ts);
                }
            } else {
                Set<ExamSection> examSections = tAssignment.getExamQuestionpool().getExamSections();
                for (ExamSection examSection : examSections) {
                    int correctCount = 0;
                    TestSectionVO ts = new TestSectionVO();
                    ts.setSectionTitle(examSection.getName());
                    List<ExamDetailsVO> detailsVOS = new ArrayList<>();
                    for (TAssignmentItem tai : examSection.getTAssignmentItems()) {
                        ExamDetailsVO examDetailsVO = new ExamDetailsVO();
                        examDetailsVO.setId(tai.getId());
                        examDetailsVO.setGrade(tai.getScore());
                        //获取题目得分
                        List<TAssignmentItemMapping> tAssignmentItemMappingScoreList = tAssignmentItemMappingJPA.findListScoreByItemId(tai.getId(), tAssignment.getId());
                        if (tAssignmentItemMappingScoreList.size() > 0) {
                            examDetailsVO.setOverriderScore(tAssignmentItemMappingScoreList.get(0).getOveriderScore() == null
                                    ? "" : tAssignmentItemMappingScoreList.get(0).getOveriderScore().toString());
                            examDetailsVO.setScore(tAssignmentItemMappingScoreList.get(0).getAutoscore());
                        }
                        if (examDetailsVO.getGrade() != null && examDetailsVO.getScore() != null) {
                            if (examDetailsVO.getGrade().toString().equals(examDetailsVO.getScore().toString())) {
                                correctCount++;
                            }
                        }
                    }
                    ts.setCorrectCount(correctCount);
                    testSectionVOList.add(ts);
                }
            }
        }
        return testSectionVOList;
    }
}
