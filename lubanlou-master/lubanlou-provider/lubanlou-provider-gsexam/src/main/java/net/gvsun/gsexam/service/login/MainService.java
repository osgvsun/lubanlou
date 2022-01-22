package net.gvsun.gsexam.service.login;

import net.gvsun.gsexam.dto.exam.login.MainDto;

public interface MainService {

    /**************************************************************************
     * Description 查看已提交考试的成绩列表
     *
     * @author 魏诚
     * @date 2017-08-01
     **************************************************************************/
    public MainDto findMain(String authorityName) throws Exception  ;
}
