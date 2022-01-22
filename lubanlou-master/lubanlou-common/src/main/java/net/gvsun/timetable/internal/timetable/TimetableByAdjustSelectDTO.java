package net.gvsun.timetable.internal.timetable;



import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * Descriptions：直接排课-列表呈现vo
 *
 * @author weicheng
 * @date  2018-09-04
 */
public class TimetableByAdjustSelectDTO implements Serializable {
   private String search;
   private String courseNo;

    public String getSearch() {
        return search;
    }

    public void setSearch(String search) {
        this.search = search;
    }

    public String getCourseNo() {
        return courseNo;
    }

    public void setCourseNo(String courseNo) {
        this.courseNo = courseNo;
    }
}
