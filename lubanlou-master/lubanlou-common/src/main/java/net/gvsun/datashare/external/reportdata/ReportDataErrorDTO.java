package net.gvsun.datashare.external.reportdata;

import lombok.Data;

import java.io.Serializable;

/**
 * Created by Administrator on 2021/9/11.
 */
@Data
public class ReportDataErrorDTO implements Serializable{
    private String primaryKey;
    private String log;
}
