package net.gvsun.gsexam.service.login;

import net.gvsun.gsexam.domain.Authority;
import net.gvsun.gsexam.dto.exam.login.MainDto;
import net.gvsun.gsexam.jpa.AuthorityJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Service
public class MainServiceImpl implements MainService {
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private AuthorityJPA tAuthorityJPA;

    /**************************************************************************
     * Description 查看已提交考试的成绩列表
     *
     * @author 魏诚
     * @date 2017-08-01
     **************************************************************************/
    @Override
    public MainDto findMain(String authorityName) throws Exception {
               //获取当前登录用户
        Authority authority = tAuthorityJPA.getAuthorityByAuthorityName(authorityName);
        MainDto mainDto = new MainDto();
        mainDto.setAuthorityCname(authority.getCname());
        mainDto.setAcademyName(authority.getAuthorityName());
        return mainDto;
    }

}
