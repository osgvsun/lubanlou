package net.gvsun.gsquestionpool.service.questionPool;

import net.gvsun.gsquestionpool.dto.UserVo;
import org.apache.poi.ss.usermodel.Sheet;

import java.util.Map;
import java.util.Set;

/**************************************************************************
 * Description:题库中文件上传
 *
 * @author:lixueteng
 * @date:2017/12/15 0015
 **************************************************************************/
public interface QuestionPoolUpLoadService {
    /**************************************************************************
     * Description: excel的解析
     *
     * @author:lixueteng
     * @date:2017/12/6 0006
     * @param questionPoolId 题库的id
     **************************************************************************/
    public Map<String, String> resolveExcelWithQUestionPool(byte[] bytes, String fileName, Integer questionPoolId,UserVo userVo,String filePath, String datasource);
    /**************************************************************************
     * Description: excel的解析 试卷库中大项的excel导入
     *
     * @author:lixueteng
     * @date:2017/12/6 0006
     **************************************************************************/
    public Set<Integer> resolveExcelWithExamPool(byte[] bytes, String filename, UserVo userVo);
    /**************************************************************************
     * Description: excel检查
     *
     * @author:陈敬
     * @date:2018年10月29日
     * @return [x, y]表示Excel中出错的位置
     **************************************************************************/
    public Map<String, String> checkExcelWithQuestionPool(Sheet sheet);
}
