# oauth2微服务运行准备

## 数据库

oauth2 数据库
运行oauth2.sql文件

## redis
key: platform-oauth2-datasource
value:
oauth2
```json
{
  "dataSourceDtos": [
    {
      "date": "2022年1月14日",
      "defaultDataSource": true,
      "password": "0822",
      "personInCharge": "admin",
      "schoolCname": "学校名称",
      "schoolName": "limsproduct",
      "url": "jdbc:mysql://localhost:3306/oauth2?useUnilocalhostcode=true&characterEncoding=utf-8&zeroDateTimeBehavior=convertToNull&transformedBitIsBoolean=true&useSSL=false&autoReconnect=true&serverTimezone=Asia/Shanghai",
      "username": "root"
    }
  ],
  "projectName": "oauth2",
  "siteUrl": "http://www.gengshang.com"
}
```


### OAuth2部署部署流程

OAuth2不依赖任何微服务，部署OAuth2之前不需要先部署其他服务。

配置文件说明：
- `server_hose`：OAuth2运行的IP地址和端口
- `db_host`：数据库地址
- `db_name`：数据库名
- `db_user`：用户名
- `db_pwd`：密码
- `gitlab_Host`：Gitlab地址，不需要Gitlab登录的项目，此配置可以使用默认值