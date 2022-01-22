package net.gvsun.gsexam.vo.layui;

import lombok.Data;

import java.io.Serializable;

@Data
public class LayuiDataVo implements Serializable {

    /**
     * 用户名
     */
    private String username;
    /**
     * 姓名
     */
    private String cname;
    /**
     * 学院
     */
    private String academyName;
    /**
     * 性别
     */
    private String sex;
    /**
     * 图片地址
     */
    private String photoUrl;

    /**
     * 学生成绩
     */
    private double score;
    /**
     * 班级
     */
    private String className;

    /**
     * 考试提交日期
     */
    private String commitDate;
    /**
     * 是否及格
     */
    private String isPassing;
    /**
     * 对应的成绩的id
     */
    private Integer gradingId;
    /**
     * 对应的考试名称
     */
    private String title;
    /**
     * 证书编号
     */
    private String code;
    /**
     * 证书名称
     */
    private String certificateTitle;
    /**
     * 编号前缀
     */
    private String prefix;
    /**
     * 编号前缀
     */
    private String schoolPhotoUrl;

    private Integer testId;

}
