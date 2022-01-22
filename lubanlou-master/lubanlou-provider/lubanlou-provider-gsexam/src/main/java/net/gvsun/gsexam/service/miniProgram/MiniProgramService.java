package net.gvsun.gsexam.service.miniProgram;

import com.alibaba.fastjson.JSONObject;

/**
 * Created by HCY on 2019/5/24 0013.
 */
public interface MiniProgramService {

    /**************************************************************************
     * Description 获取考试列表
     *
     * @author 洪春莹
     * @date 2019-05-24
     **************************************************************************/
    JSONObject getExamList(Integer tCourseSiteId);

}
