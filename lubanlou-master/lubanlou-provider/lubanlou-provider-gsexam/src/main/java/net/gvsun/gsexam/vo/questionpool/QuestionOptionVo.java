package net.gvsun.gsexam.vo.questionpool;

import java.io.Serializable;

/**************************************************************************
 * Description:试题选项的vo
 *
 * @author:lixueteng
 * @date:2017/11/28 0028
 **************************************************************************/
public class QuestionOptionVo implements Serializable {
    /**
     * 选项的前标 A,B ,C D
     */
    private String optionNumber;
    /**
     * 选项的内容
     */
    private String optionText;
    /**
     * 选项的对错
     */
    public Integer iscorrect;

    public Integer getIscorrect() {
        return iscorrect;
    }

    public void setIscorrect(Integer iscorrect) {
        this.iscorrect = iscorrect;
    }

    public String getOptionNumber() {
        return optionNumber;
    }

    public void setOptionNumber(String optionNumber) {
        this.optionNumber = optionNumber;
    }

    public String getOptionText() {
        return optionText;
    }

    public void setOptionText(String optionText) {
        this.optionText = optionText;
    }


    @Override
    public String toString() {
        return super.toString();
    }
}
