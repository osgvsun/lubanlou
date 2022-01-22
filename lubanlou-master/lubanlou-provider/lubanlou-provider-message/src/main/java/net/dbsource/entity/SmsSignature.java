package net.dbsource.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

@Data
@TableName("sms_signature")
public class SmsSignature implements Serializable {

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;
    private String signName;



}
