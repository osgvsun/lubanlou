package net.gvsun.attendance.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import net.gvsun.attendance.dbsource.entity.AttendanceMode;
import net.gvsun.attendance.dbsource.mapper.AttendanceModeMapper;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Description :
 *
 * @Author : cjl
 * @CreateTime : 2021/9/14 13:54
 **/
@Service
public class AttendanceModeServiceImpl extends ServiceImpl<AttendanceModeMapper, AttendanceMode> implements AttendanceModeService {

}
