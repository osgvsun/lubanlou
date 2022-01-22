package net.gvsun.timetable.internal.common;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
import lombok.ToString;
import net.gvsun.timetable.internal.timetable.TimetableTeacherDTO;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Description VO-泛型通用vo-泛型页面对象业务对象
 *
 * @author weicheng
 * @date 2020/6/15 11:22
 */
@Data
@ToString
public class PageInfoByRedisDTO<T> implements Serializable {

    private static final long serialVersionUID = 2355512314235134L;

    /**
     * 泛型页面对象业务分类pageInfo
     * 1:封装页面的对象信息
     * 2:封装页面的私有信息
     */
    private Class<T> pageInfo;

    private List<TimetableTeacherDTO> dto;
    /**
     * 通用查询字符
     */
    private String username;
    /**
     * 标识
     */
    private String courseNo;
    /**
     * 学期
     */
    private String term;
    /**
     * 页面缓存的功能编号
     */
    private String pageName;
    /**
     * 创建日期
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createDate;
}
