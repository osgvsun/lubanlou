package net.gvsun.transcript.external;

import java.io.Serializable;

/**
 * Created by REM on 2019/12/19.
 * @author REM
 * @description 工种及对应老师
 */

public class WorkUserVo implements Serializable{
    /**
     * 工种id
     */
    private String uid;

    /**
     * 用户名数组
     */
    private String[] data;

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String[] getData() {
        return data;
    }

    public void setData(String[] data) {
        this.data = data;
    }
}
