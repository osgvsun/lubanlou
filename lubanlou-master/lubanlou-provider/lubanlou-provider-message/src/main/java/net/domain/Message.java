package net.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.extension.handlers.FastjsonTypeHandler;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * The persistent class for the user database table.
 * 
 */
@Data
@Entity
@Table(name = "message")
public class Message implements Serializable {
	private static final long serialVersionUID = 1L;
	/**
	 * 主键
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@TableId(value = "id", type = IdType.AUTO)
	private Integer id;
	/**
	 * 消息内容
	 */
	@Column(name = "message_content", nullable = false, columnDefinition = "TEXT")
	private String messageContent;
	/**
	 * 消息链接地址
	 */
	@Column(name = "message_html", columnDefinition = "TEXT")
	private String messageHtml;
	/**
	 * (外键)消息来源项目
	 */
	@Column(name="project")
	private Integer project;
	/**
	 * 消息主题
	 */
	@Column(name="message_topic")
	private String messageTopic;

	/**
	 * 是否已读：0未读，1已读
	 */
	@Column(name="read_status")
	private Integer readStatus;
	/**
	 * 创建者username
	 */
	@Column(name="create_username")
	private String createUsername;
	/**
	 * 创建者名称
	 */
	@Column(name="create_cname")
	private String createCname;

	/**
	 * 创建时间
	 */
	@Column(name="created_time")
	private Date createdTime;

	private String projectName;
	private String subTopic;
	/**
	 * 数据处理
	 */
	String  dataProcess;
	/**
	 * 标题
	 */
	String title;

	/**
	 * 通用业务类型
	 */
	@Column(name="business_type")
	private String businessType;

	/**
	 * 通用业务主键
	 */
	@Column(name="business_uid")
	private String businessUid;

	/**
	 * 通用业务识别字段
	 */
	@Column(name="general_identification")
	private String generalIdentification;
}