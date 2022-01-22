package net.gvsun.timetable.internal.labroom;

import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

/**
 *  Description 教务排课计划表school_course对象
 *
 *  @author weicheng
 *  @date 2020/6/29 20:39
 */
@Data
@ToString
public class CommonServer implements Serializable {
	private static final long serialVersionUID = 1L;
	Integer id;
	/**
	 * 服务器名称
	 */
	String serverName;

	/**
	 * 服务器ip
	 */
	String serverIp;
	/**
	 * 服务器端口号
	 */
	String serverSn;
	/**
	 * 服务器端口号
	 */
	String serverMac;
	/**
	 * 类型
	 */
	String serverType;
}
