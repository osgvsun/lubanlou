package net.gvsun.gsquestionpool.service.questionPool;

/**************************************************************************
 * Description: 题库导入导出service
 *
 * @author:lixueteng
 * @date:2017/12/6 0006
 **************************************************************************/
public interface QuestionPoolInAndOutService {


    /**************************************************************************
     * Description: 题库excel导出
     *
     * @author:lixueteng
     * @date:2017/12/6 0006
     * @param questionPoolId 题库的id
     **************************************************************************/
    public byte[] exportExcelQuestionPoolById(Integer questionPoolId);
}
