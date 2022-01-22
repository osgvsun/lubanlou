package net.dbsource.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
@TableName("sms_template")
public class SmsTemplate implements Serializable {

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;
    private String chineseName;
    private String englishName;



}
