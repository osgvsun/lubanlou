package net.gvsun.common;

public final class RedisKey {

    /**
     * 实验室
     */
    public static class Lims {
        //在线客户群信息
        public static final String CUSTOMER_CHATCLUB_ONLINE_INFORMATION = "customer-chatclub-online-information";

        //在线个人用户信息
        public static final String CUSTOMER_CHAT_ONLINE_INFORMATION = "customer-chat-online-information";

        //个人用户对话信息
        public static final String CUSTOMER_CHAT_DIALOGUE_INFORMATION = "customer-chat-dialogue-information";

        //客户群名单信息
        public static final String CUSTOMER_CHATCLUB_USER_INFORMATION = "customer-chatclub-user-information";

        //客户群对话信息
        public static final String CUSTOMER_CHATCLUB_DIALOGUE_INFORMATION = "customer-chatclub-dialogue-information";

        //客户群基本信息
        public static final String CUSTOMER_KOWNLEDGE_INFORMATION = "customer-kownledge-information";

        //知识库信息
        public static final String CUSTOMER_CHATCLUB_INFORMATION = "customer-chatclub-information";
    }

    /**
     * 客服系统
     */
    public static class Customer {
        //在线客户群信息
        public static final String CUSTOMER_CHATCLUB_ONLINE_INFORMATION = "customer-chatclub-online-information";

        //在线个人用户信息
        public static final String CUSTOMER_CHAT_ONLINE_INFORMATION = "customer-chat-online-information";

        //个人用户对话信息
        public static final String CUSTOMER_CHAT_DIALOGUE_INFORMATION = "customer-chat-dialogue-information";

        //客户群名单信息
        public static final String CUSTOMER_CHATCLUB_USER_INFORMATION = "customer-chatclub-user-information";

        //客户群对话信息
        public static final String CUSTOMER_CHATCLUB_DIALOGUE_INFORMATION = "customer-chatclub-dialogue-information";

        //客户群基本信息
        public static final String CUSTOMER_KOWNLEDGE_INFORMATION = "customer-kownledge-information";

        //知识库信息
        public static final String CUSTOMER_CHATCLUB_INFORMATION = "customer-chatclub-information";
    }

    /**
     * OAuth2
     */
    public static class OAuth2 {
        //各个系统的多数据源配置
        public static final String PLATFORM_OAUTH2_DATASOURCE = "platform-oauth2-datasource";

        //发放的访问令牌
        public static final String PLATFORM_OAUTH2_TOKEN = "platform-oauth2-token";

        //全量用户
        public static final String PLATFORM_OAUTH2_USERS = "platform-oauth2-users";

        //Cookie
        public static final String PLATFORM_OAUTH2_COOKIE = "platform-oauth2-cookie";

        //废弃
        public static final String PLATFORM_OAUTH2_SESSION = "platform-oauth2-session";
    }

    /**
     * 教学平台
     */
    public static class Teach {
        //远程实验主机reids中key
        public static final String REMOTE_HOST_TYPE_KEY = "platform-teach-remoteHost";

        //远程实验主机reids中key
        public static final String REMOTE_HOST_TYPE_KEY_SITE = "platform-teach-remoteHost-site";

        //用户信息reids中key
        public static final String USER_HOST_TYPE_KEY = OAuth2.PLATFORM_OAUTH2_USERS;

        /**
         * 用于保存成绩册各分项以及模块的隐藏显示的配置信息；
         * 用于保存各课程权限与成绩册各分项的隐藏显示的配置信息
         */
        public static final String PLATFORM_TEACH_CONFIG = "platform-teach-config";

    }

    /**
     * CMS
     */
    public static class Cms {
        // redis中cms阅读次数的key
        public static final String PLATFORM_CMS_READNUM = "platform-cms-readNum";

        // redis中公告的key
        public static final String PLATFORM_CMS_ANNOUNCEMENT = "platform-cms-announcement";

        // redis中的菜单信息key
        public static final String PLATFORM_CMS_MENUINFO = "platform-cms-menuInfo";

        // redis中的数据源主模板对应表Key
        public static final String PLATFORM_CMS_DATASOURCE = "platform-cms-datasource";
    }

    /**
     * 资源容器
     */
    public static class Resource {
        //fastDFS配置
        public static final String PLATFORM_RESOURCE_FASTDFS = "platform-resources-fastDFS";
    }

    /**
     * 大创
     */
    public static class StudentInnovation {
        //PROJECT_NAME 多数据源数据项目名称
        public static final String PROJECT_NAME = "studentinnovation";
    }

    /**
     * 项目管理
     */
    public static class XMGL {
        public static final String PLATFORM_OAUTH2_DATASOURCE = OAuth2.PLATFORM_OAUTH2_DATASOURCE;
    }

    /**
     * 运营平台
     */
    public static class YYPT {
        public static final String PLATFORM_OAUTH2_DATASOURCE = OAuth2.PLATFORM_OAUTH2_DATASOURCE;
    }

    /**
     * 配置
     */
    public static class Config {
        public static final String CONFIG_TIMETABLE_BATCH_MAXNUM_PER_WEEK = "config-timetable-batch-maxnum-per-week";
    }

    /**
     * 成绩册
     */
    public static class Transcript {
        //成绩变化记录
        public static final String PLATFORM_TRANSCRIPT_RECORD_CHANGE = "platform-transcript-record-change";
    }

}
