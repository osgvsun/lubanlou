package net.gvsun.datashare.external.shareddata;

import java.io.Serializable;
import java.util.List;

public class SharedData implements Serializable {

    private String dataSource;
    private String originSystem;

    private String data;

    public String getDataSource() {
        return dataSource;
    }

    public void setDataSource(String dataSource) {
        this.dataSource = dataSource;
    }

    public String getOriginSystem() {
        return originSystem;
    }

    public void setOriginSystem(String originSystem) {
        this.originSystem = originSystem;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }
}
