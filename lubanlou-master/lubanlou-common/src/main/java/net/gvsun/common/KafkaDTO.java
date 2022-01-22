package net.gvsun.common;


import java.io.Serializable;

public class KafkaDTO implements Serializable {
    private MessageTopic messageTopic;
    private String data;
    private String dataSource;

    public MessageTopic getMessageTopic() {
        return messageTopic;
    }

    public void setMessageTopic(MessageTopic messageTopic) {
        this.messageTopic = messageTopic;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getDataSource() {
        return dataSource;
    }

    public void setDataSource(String dataSource) {
        this.dataSource = dataSource;
    }
}
