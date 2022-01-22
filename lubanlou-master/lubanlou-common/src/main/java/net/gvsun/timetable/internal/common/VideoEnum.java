package net.gvsun.timetable.internal.common;



/**
 * @Auther:lay
 * @Date: 2021/1/8 09:06
 * @Description:
 */
public enum VideoEnum {
    FLV("flv"),
    RTMP("rtmp"),
    M3U8("m3u8");

    /**
     * 视频格式
     */
    String type;

    VideoEnum(String type){
        this.type = type;
    }
}