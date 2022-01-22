package net.gvsun.gsexam.service.exam;

import net.gvsun.gsexam.dto.common.TAssignmentGradingDto;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
public class TAssignmentGradingServiceImpl implements TAssignmentGradingService {
    @PersistenceContext
    private EntityManager entityManager;
    /**************************************************************************
     * Description 查看已提交考试的成绩列表
     *
     * @author 魏诚
     * @date 2017-08-01
     **************************************************************************/
    @Override
    public List<TAssignmentGradingDto> findExamGradingList(int currpage, int pageSize, HttpServletRequest request) throws Exception {
        // 调用存储过程
        StringBuffer sql = new StringBuffer("from TAssignmentGrading c where c.TAssignment.id = "+request.getParameter("examId")+" and c.submitTime > 0");
        //查询条件
        if(request.getParameter("cname")!=null&&request.getParameter("cname")!=""){
            sql.append(" and c.userByStudent.cname like '%"+ request.getParameter("cname") +"%'");
        }
        if(request.getParameter("number")!=null&&request.getParameter("number")!=""){
            sql.append(" and c.userByStudent.username like '%"+ request.getParameter("number") +"%'");
        }
        if(request.getParameter("sortType")!=null&&request.getParameter("sortType").equals("up")){
            sql.append("order by c.finalScore asc");
        }
        if(request.getParameter("sortType")!=null&&request.getParameter("sortType").equals("down")){
            sql.append("order by c.finalScore desc");
        }
        Query query = entityManager.createQuery(sql.toString());
        // 返回结果
        List<TAssignmentGradingDto> queryHQLs = query.getResultList();
        //获取当前登录用户
        return queryHQLs;
    }

}
