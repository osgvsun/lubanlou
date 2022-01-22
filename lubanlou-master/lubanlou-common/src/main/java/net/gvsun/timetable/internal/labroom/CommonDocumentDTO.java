package net.gvsun.timetable.internal.labroom;


import lombok.Data;
import java.io.Serializable;
import java.util.Calendar;

/**
*  Description
*
*  @author weicheng
*  @date 2021/2/18 10:46
*/
@Data
public class CommonDocumentDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	Integer id;
	Integer type;
	String documentName;
	String businessType;
	String businessId;
	String documentUrl;
	String resourceUrl;
	LabRoom labRoom;
	Integer labRoomDevice;
	Integer flag;
	String comments;
	Calendar createdAt;
	Integer settingId;

}
