package net.gvsun.gsquestionpool.service.newService;

import net.gvsun.gsquestionpool.vo.common.CommonVO;
import net.gvsun.gsquestionpool.vo.questionPool.QuestionPoolVO;
import net.gvsun.gsquestionpool.vo.questionPool.QuestionVo;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface Service01 {
    /**
     *获取全部题库分类
     * @return
     */
    List<CommonVO> findAllQuestionPoolCategory();

    /**
     * 分页查询题库列表
     * @param categoryId
     * @param type
     * @param title
     * @param owner
     * @param page
     * @param pageSize
     * @return
     */
    List<QuestionPoolVO> findQuestionPoolList(Integer categoryId, Integer type, String title, String owner,Integer page,Integer pageSize);

    /**
     * 查询题库列表数量
     * @param categoryId
     * @param type
     * @param title
     * @param owner
     * @return
     */
    Integer countQuestionPoolList(Integer categoryId, Integer type, String title, String owner);

    /**
     * 保存题库
     * @param title
     * @param categoryId
     * @param type
     * @param questionPoolId
     * @param siteId
     * @param username
     */
    void saveQuestionPool(String title, Integer categoryId, Integer type, Integer questionPoolId, Integer siteId,String username);

    /**
     * 保存题库类别
     * @param title
     * @param categoryId
     */
    void saveQuestionPoolCategory(String title,Integer categoryId);

    /**
     * 分页查询题库内题目列表
     * @param questionPoolId
     * @param page
     * @param pageSize
     * @param name
     * @param type
     * @param flag
     * @return
     */
    List<QuestionVo> findQuestionList(Integer questionPoolId,Integer page,Integer pageSize,String name,Integer type,Integer flag);

    /**
     * 查询题库内题目列表数量
     * @param questionPoolId
     * @param name
     * @param type
     * @param flag
     * @return
     */
    Integer countQuestionList(Integer questionPoolId,String name,Integer type,Integer flag);
}
