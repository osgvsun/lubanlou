package net.gvsun.attendance.dbsource.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import net.gvsun.attendance.dbsource.entity.AttendanceMode;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Description :
 *
 * @Author : cjl
 * @CreateTime : 2021/9/14 13:56
 **/
@Component
@Mapper
public interface AttendanceModeMapper extends BaseMapper<AttendanceMode> {
    /**
     * Description :获取已设置的考勤模式
     *
     * @Author : cjl
     * @CreateTime : 2021/9/14
     **/
    @Select(" SELECT a.id,a.hardware_type,a.enabled " +
            " FROM attendance_mode a " +
            " where a.enabled = #{enabled}"  )
    List<AttendanceMode> getAttendanceMode(int enabled);
}
