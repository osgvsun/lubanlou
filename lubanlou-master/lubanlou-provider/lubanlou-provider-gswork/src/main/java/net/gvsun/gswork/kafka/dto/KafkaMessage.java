package net.gvsun.gswork.kafka.dto;

import java.io.Serializable;

public class KafkaMessage<E> implements Serializable {
    private MESSAGE_TYPE messageType;
    private String data;

    public MESSAGE_TYPE getMessageType() {
        return messageType;
    }

    public void setMessageType(MESSAGE_TYPE messageType) {
        this.messageType = messageType;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public enum MESSAGE_TYPE {
        USER_REGISTER("用户注册"),
        BATCH_IMPORT_USER("批量导入用户"),
        AUTHORITY_CHANGED("用户权限变化"),
        USER_FORBIDDEN("用户禁用"),
        USER_ENABLE("用户启用");
        private String desc;

        MESSAGE_TYPE(String desc) {
            this.desc = desc;
        }

        @Override
        public String toString() {
            return desc;
        }
    }
}
