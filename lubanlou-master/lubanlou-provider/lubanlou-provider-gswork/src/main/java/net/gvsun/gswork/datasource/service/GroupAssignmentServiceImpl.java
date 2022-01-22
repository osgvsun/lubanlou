package net.gvsun.gswork.datasource.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import net.gvsun.gswork.datasource.entity.GroupAssignment;
import net.gvsun.gswork.datasource.mapper.GroupAssignmentMapper;
import org.springframework.stereotype.Service;

@Service
public class GroupAssignmentServiceImpl extends ServiceImpl<GroupAssignmentMapper, GroupAssignment> implements GroupAssignmentService {
}
