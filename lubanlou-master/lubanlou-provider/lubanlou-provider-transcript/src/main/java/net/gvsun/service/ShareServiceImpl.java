package net.gvsun.service;

import net.gvsun.util.EmptyUtil;
import net.gvsun.vo.UserVo;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Transient;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Set;

/**
 * Created by REM on 2019/2/26.
 */
@Service("ShareService")
public class ShareServiceImpl implements ShareService{
}
