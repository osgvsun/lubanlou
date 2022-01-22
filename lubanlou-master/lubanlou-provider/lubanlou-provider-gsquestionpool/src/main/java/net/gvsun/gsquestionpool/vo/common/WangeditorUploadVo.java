package net.gvsun.gsquestionpool.vo.common;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import java.io.Serializable;
import java.util.Arrays;

/**
 * Created by Administrator on 2017/12/16.
 */
public class WangeditorUploadVo implements Serializable {
    Integer errno;
    String[] data;

    public Integer getErrno() {
        return errno;
    }

    public void setErrno(Integer errno) {
        this.errno = errno;
    }

    public String[] getData() {
        return data;
    }

    public void setData(String[] data) {
        this.data = data;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        WangeditorUploadVo that = (WangeditorUploadVo) o;

        return new EqualsBuilder()
                .append(errno, that.errno)
                .append(data, that.data)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(errno)
                .append(data)
                .toHashCode();
    }

    @Override
    public String toString() {
        return "WangeditorUploadVo{" +
                "errno=" + errno +
                ", data=" + Arrays.toString(data) +
                '}';
    }
}
