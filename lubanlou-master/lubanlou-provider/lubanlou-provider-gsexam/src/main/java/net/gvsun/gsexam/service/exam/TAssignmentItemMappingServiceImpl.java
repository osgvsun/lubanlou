package net.gvsun.gsexam.service.exam;

import net.gvsun.gsexam.dto.common.TAssignmentGradingDto;
import net.gvsun.gsexam.dto.common.TAssignmentItemMappingVo;
import net.gvsun.gsexam.jpa.TAssignmentJPA;
import net.gvsun.gsexam.service.common.ShareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Service
public class TAssignmentItemMappingServiceImpl implements TAssignmentItemMappingService {

    @Autowired
    private TAssignmentJPA tAssignmentJPA;
    @Autowired
    private ShareService shareService;
    @PersistenceContext
    private EntityManager entityManager;

    /**************************************************************************
     * Description 查看学生分项答题记录及打分表
     *
     * @author 魏诚
     * @date 2017-08-01
     **************************************************************************/
    @Override
    public List<TAssignmentItemMappingVo> findTAssignmentItemMappingsByTAssignmentGrading(
            TAssignmentGradingDto tAssignmentGrading){
      /*  TAssignment parentTAssignment = tAssignmentGrading.getTAssignment();
        String sql = "from TAssignment c where c.testParentId = '"+parentTAssignment.getId()+"' and c.user.username = '"+ tAssignmentGrading.getUserByStudent().getUsername() +"'";
        List<TAssignment> tAssignments = entityManager.createQuery(sql).getResultList();
        TAssignment tAssignment = tAssignments.get(0);

        //tAssignmentGrading.getSubmitTime()获取最后一次的提交次数
        //sql = "from TAssignmentItemMapping c where c.userByStudent.username like '" + tAssignmentGrading.getUserByStudent().getUsername() + "' and c.submitTime='"+tAssignmentGrading.getSubmitTime()+"' and c.TAssignment.id = '" + tAssignment.getId() +"'";
        //答题记录去掉提交筛选条件
        sql = "from TAssignmentItemMapping c where c.userByStudent.username like '" + tAssignmentGrading.getUserByStudent().getUsername() + "' and c.TAssignment.id = '" + tAssignment.getId() +"'";
        List<TAssignmentItemMapping> itemMappings = entityManager.createQuery(sql).getResultList();
*/        return null;
    }
}
