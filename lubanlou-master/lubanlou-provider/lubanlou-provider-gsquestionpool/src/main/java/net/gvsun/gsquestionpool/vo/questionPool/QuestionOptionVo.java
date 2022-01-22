package net.gvsun.gsquestionpool.vo.questionPool;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

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
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        QuestionOptionVo that = (QuestionOptionVo) o;

        return new EqualsBuilder()
                .append(optionNumber, that.optionNumber)
                .append(optionText, that.optionText)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(optionNumber)
                .append(optionText)
                .toHashCode();
    }

    @Override
    public String toString() {
        return super.toString();
    }
}
