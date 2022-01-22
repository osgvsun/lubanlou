package net.gvsun.common;

/**
 * @author 李涵
 * @Description 视频类型枚举类
 * @Date 2020/12/2 15:54
 * @return
 **/
public enum VideoEnum {
    FLV("flv"),
    RTMP("rtmp"),
    M3U8("m3u8");

    /**
     * 视频格式
     */
    String type;

    VideoEnum(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }
}
