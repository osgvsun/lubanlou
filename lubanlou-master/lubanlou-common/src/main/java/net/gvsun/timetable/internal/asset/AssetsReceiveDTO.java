package net.gvsun.timetable.internal.asset;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

/************************************************************
 * Descriptions：申领记录
 *
 * author lay
 * date 2019-03-26
 ***************************************setId*********************/
@Data
public class AssetsReceiveDTO implements Serializable{
    private String id;
    //1、申领批次编号
    private String batchNumber;
    //2、申请单位：学院
    private String academyNumber;
    //3、申请人
    private String username;
    //4、部门
    private String department;
    //5、申请时间
    private String applicationTime;
    //6、开始使用时间
    private String beginTime;
    //7、结束使用时间
    private String endTime;
    //8、是否领取
    private  String isReceive;
    //9、领取人
    private String receiver;
    //10、领取时间
    private String receiveTime;
    //11、是否归还
    private String isReturn;
    //12、归还时间
    private String returnTime;
    //13、用途
    private String purpose;
    //14、库存备注,备注
    private String remarks;
    //15、物资类型
    private String goodsCategory;
    //16、审核时间
    private String auditDate;
    //17、当前状态
    private String status;
    //18、是否需要归还
    private Integer isNeedReturn;
    //18、file
    private String file;
    //15.当前审核层级
    private String curAuditLevel;
    private String curAuditLevelName;
    //15.审核标志位
    private Integer auditFlag;
    //15.流程发起标志位(0代表审核人 1代表发起人)
    private Integer appFlag;
    //15.拒绝原因
    private String rejectReason;
    //项目
    private Integer itemId;
    //金额
    private Double price;
    //入库批次id
    private Integer assetsInStorageId;
    //物资id
    private Integer assetsId;
    //领用数量
    private Integer quantity;

    private String applyUsername;

    //备注
    private String mem;

}