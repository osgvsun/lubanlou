package net.gvsun.iot.external;
import lombok.Data;

/**
 *
 * @Description 物联设备DTO
 *
 * @author SmarkLee
 * @Date 2021/10/8 9:04
 * @return 
 **/
@Data
public class ServerDTO {
    /**
     * 服务器mac地址
     */
    String mac;

    /**
     * 服务器名称
     */
    String name;

    /**
     * 服务器IP
     */
    String ip;

    /**
     * 服务器端口
     */
    String port;

    /**
     * 服务器类型（SRS-FLV:FLV视频流服务器,SRS-RTMP：RTMP视频流服务器,IOT:物联服务器）
     */
    String type;

    /**
     * 服务器地址
     */
    String address;
}