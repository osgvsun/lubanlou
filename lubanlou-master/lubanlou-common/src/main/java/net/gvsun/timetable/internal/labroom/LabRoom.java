package net.gvsun.timetable.internal.labroom;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.ToString;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
*  Description 实验室labroom表单对象
*
*  @author weicheng
*  @date 2020/6/29 7:10
*/
@Data
@ToString
public class LabRoom implements Serializable {
	private static final long serialVersionUID = 1L;
	Integer id;

	/**实验室编号*/
	String labRoomNumber;

	/**实验室名称*/
	String labRoomName;

	/**联系电话*/
	String labRoomPhone;

	/**排序字段*/
	String sort;

	/**实验室英文名称*/
	String labRoomEnName;

	/**实验室简称*/
	String labRoonAbbreviation;

	/**实验室地点*/
	String labRoomAddress;

	/**使用面积*/
	BigDecimal labRoomArea;

	/**实验室容量*/
	Integer labRoomCapacity;

	/**可同时预约该实验室的并发次数（人数）*/
	Integer reservationNumber;

	/**是否为特殊实验室，1是，0或null否*/
	Integer isSpecial;

	/**管理机构*/
	String labRoomManagerAgencies;

	/**标志位（1实验分室1，2工作室，3会议室）*/
	Integer labCategory;

	/**是否开放(1是，0否)*/
	Integer isOpen;

	/**1可用 0不可用*/
	Integer isUsed;

	/**是否可预约（1是，0否）*/
	Integer labRoomReservation;

	/**实验室简介*/
	String labRoomIntroduction;

	/**规章制度*/
	String labRoomRegulations;

	/**获奖信息*/
	String labRoomPrizeInformation;

	/**实验室创建时间*/
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	LocalDateTime labRoomTimeCreate;

	/**实验室等级(0特级 1一级 2二级)*/
	Integer labRoomLevel;

	/**是否可以周末预约*/
	Integer openInweekend;

    BigDecimal startHour;

    BigDecimal endHour;

    BigDecimal startHourInweekend;

    BigDecimal endHourInweekend;

	Integer labRoomWorker;

	String majorName;

	Integer dean;

	Integer trainingCenterDirector;

	Integer trainingDepartmentDirrector;

	String labRoomAttentions;

	/**
	 */
	Integer CDictionaryByLabRoom;

	/**
	 */
	Integer CDictionaryByLabRoomSort;

	/**
	 */
	Integer CDictionaryByIsMultimedia;

	/**
	 */
	Integer CDictionaryByLabRoomClassification;

	/**
	 * 是否需要导师审核
	 */
	Integer CDictionaryByTeacherAudit;

	/**
	 * 是否需要审核
	 */
	Integer CDictionaryByIsAudit;

	/**
	 * 是否需要实训室管理员审核
	 */
	Integer CDictionaryByLabManagerAudit;

	/**
	 * 准入形式
	 */
	Integer CDictionaryByTrainType;

	String user;

	/**
	 * 是否需要安全准入
	 */
	Integer CDictionaryByAllowSecurityAccess;

	/**
	 */
	Integer CDictionaryByAllowLending;

	String systemRoom;

	Integer labCenter;

	Integer labAnnex;
	/**
	 */
	String schoolAcademy;
	/**
	 */
	String safetyOfficer;

	Integer labTemperature;

	Integer labHumidity;
	/**
	 */
	Integer labPm;
	/**
	 */
	String labAddressDetail;
	/**
	 */
	Integer floorNo;

	/**
	 */
	String buildNumber;

	/**
	 * 基地id
	 */
	Integer labBase;
	/**
	 * 所属学科
	 */
	String labRoomSubject;

	/**
	 * 是否校企共建：1是、0或null否
	 */
	Integer isSchoolEnterpriseCooperation;

	/**
	 * 是否生产性实训室：1是、0或null否
	 */
	Integer isRoductivity;
	/**
	 * 是否仿真实训室：1是、0或null否
	 */
	Integer isSimulation;

	/**
	 *实验中心id
	 */
	Integer labCenterId;
	Integer accessIsExam;

}
