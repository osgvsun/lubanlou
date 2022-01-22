package net.gvsun.timetable.internal.asset;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

/************************************************************
 * Descriptions：申购记录
 *
 * author lay
 * date 2019-03-26
 ***************************************setId*********************/
@Data
public class AssetsInStorageDTO implements Serializable{
    //1.ID
    private Integer id;
    //物资申领ID
    private Integer applyId;
    //入库人
    private String username;
    //申购人
    private String applicantUserName;
    //2.入库日期
    private String date;
    //3.入库编号
    private String batchNumber;
    //4.学院
    private String academyNumber;
    //5.部门
    private String department;
    //6.物品分类
    private String goodsCategory;
    //7.总价
    private BigDecimal totalPrice;
    //8.发票号
    private String invoiceNumber;
    //9.发票图片
    private String invoiceImageUrl;
    //10.入库单图片
    private String goDownEntry;
    //11.备注
    private String remarks;
    //12.物品柜
    private String cabinet;
    //13.状态
    private String status;
    //14.file
    private String file;
    //15.当前审核层级
    private String curAuditLevel;
    private String curAuditLevelName;
    //15.审核标志位
    private Integer auditFlag;
    //15.流程发起标志位(0代表审核人 1代表发起人)
    private Integer appFlag;
    //16.采购日期
    private String applyDate;
    //16.拒绝原因
    private String rejectReason;
    //文件Id
    private String fileId;

}