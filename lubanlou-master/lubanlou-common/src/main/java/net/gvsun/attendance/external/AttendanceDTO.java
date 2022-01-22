package net.gvsun.attendance.external;

import lombok.Data;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

/**
 * Description :考勤管理
 *
 * @Author : cjl
 * @CreateTime : 2021/9/10 18:49

 **/
@Data
public class AttendanceDTO implements Serializable {
    /**
     *  当前页
     * */
    Integer currPage;
    /**
     *  页面大小
     * */
    Integer pageSize;
    /**
     *  开始日期
     * */
    String startDate;
    /**
     *  结束日期
     * */
    String endDate;
    /**
     *  工号
     * */
    String username;
    /**
     *  属地用户列表
     * */
    List<String> usernames;
}
