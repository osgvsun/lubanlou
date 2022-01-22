package net.gvsun.usercenter.internal;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

public class LogDto implements Serializable {
    private Long id;
    private String log;
    private String logController;
    private Date datetime;
    private String datetimeFormat;
    private String operator;
    private String acceptor;
    private String operand;
    private String action;
    private String ip;
    private String tableName;
    private String tableRowUid;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLog() {
        return log;
    }

    public void setLog(String log) {
        this.log = log;
    }

    public String getLogController() {
        return logController;
    }

    public void setLogController(String logController) {
        this.logController = logController;
    }

    public String getDatetime() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        if (datetimeFormat != null) {
            format = new SimpleDateFormat(datetimeFormat);
        }
        if (datetime != null)
            return format.format(datetime);
        else
            return null;
    }

    public void setDatetime(Date datetime) {
        this.datetime = datetime;
    }

    public void setDatetime(Date datetime, String format) {
        this.datetime = datetime;
        this.datetimeFormat = format;
    }

    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }

    public String getAcceptor() {
        return acceptor;
    }

    public void setAcceptor(String acceptor) {
        this.acceptor = acceptor;
    }

    public String getOperand() {
        return operand;
    }

    public void setOperand(String operand) {
        this.operand = operand;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public String getTableRowUid() {
        return tableRowUid;
    }

    public void setTableRowUid(String tableRowUid) {
        this.tableRowUid = tableRowUid;
    }
}
