package net.gvsun.gsquestionpool.service.common;


import net.gvsun.gsquestionpool.dto.AuthorityVo;
import net.gvsun.gsquestionpool.dto.DataResourceVO;
import net.gvsun.gsquestionpool.dto.UserVo;

import java.io.File;
import java.util.List;
import java.util.Map;

public interface ShareService {

	/**************************************************************************
	 * Description 通用模块-获取登录用户信息
	 *
	 * @author 魏诚
	 * @date 2017-08-01
	 **************************************************************************/
	public UserVo getUser();

	/**************************************************************************
	 * Description 通用模块-根据username获取用户信息
	 *
	 * @author 魏诚
	 * @date 2017-08-16
	 **************************************************************************/
	public UserVo getUserByUsername(String username);

	/***********************************************************************************************
	 * Description ：通用模塊service層定義-修改登录的角色
	 *
	 * @作者：魏诚
	 * @日期：2016-11-17
	 ***********************************************************************************************/
	public void changeRole(final String authorityName) ;

	/**************************************************************************
	 * Description 通用模块-根据authorityName获取權限信息
	 *
	 * @author 魏诚
	 * @date 2017-08-16
	 **************************************************************************/
	public AuthorityVo getAuthorityByName(String authorityName);
	/**************************************************************************
	 * Description 通用模块-分页展示信息
	 *
	 * @author lixueteng
	 * @date 2017-09-21
	 **************************************************************************/
	public Map<String, Integer> getPage(int currpage, int pageSize, int totalRecords);
	/**************************************************************************
	 * Description 根据用户名获取用户权限信息
	 *
	 * @author 罗璇
	 * @date 2017年10月26日
	 **************************************************************************/
	public List<AuthorityVo> findAuthByUsername(String username);
	/**************************************************************************
	 * Description 根据权限名获取权限信息
	 *
	 * @author 罗璇
	 * @date 2017年10月26日
	 **************************************************************************/
	public AuthorityVo findAuthVoByAuthId(Integer authId);

	public Boolean changeDataResource(String dataSource);
	public List<DataResourceVO> findAllDataResource();

	/**************************************************************************
	 * @Description 浙江外国语统一身份认证通过身份证号码查找用户
	 * @author 张德冰
	 * @date 2019-05-14
	 **************************************************************************/
	public UserVo getUserByMasterMajor(String username);
	public String findStageMangeByType();
	public void quickSort(int[] arr, int low, int high);
	public boolean deleteDir(File dir);
	}