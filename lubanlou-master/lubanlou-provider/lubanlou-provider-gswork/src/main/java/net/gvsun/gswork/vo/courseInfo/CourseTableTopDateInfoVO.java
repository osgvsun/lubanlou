package net.gvsun.gswork.vo.courseInfo;

import java.io.Serializable;

/**************************************************************************
 * Description:
 *
 * @author:lixueteng
 * @date:2018/2/2 0002
 **************************************************************************/
public class CourseTableTopDateInfoVO implements Serializable {

    /**
     * 日期
     */
    private String topDate;
    /**
     * 星期几
     */
    private String weekDay;

    public String getTopDate() {
        return topDate;
    }

    public CourseTableTopDateInfoVO setTopDate(String topDate) {
        this.topDate = topDate;
        return this;
    }

    public String getWeekDay() {
        return weekDay;
    }

    public CourseTableTopDateInfoVO setWeekDay(String weekDay) {
        this.weekDay = weekDay;
        return this;
    }
}
