package net.gvsun.teacherinformationcenter.service;

import net.gvsun.datasource.dto.GvsunDataSourceDto;
import net.gvsun.teacherinformationcenter.vo.User;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public interface ShareService {
    GvsunDataSourceDto getCurrDbSource();

    net.gvsun.session.dto.User getCurrentUserFromUnifySession(HttpServletRequest request);
}
