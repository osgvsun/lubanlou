# message微服务运行准备

## 数据库

message 数据库
运行message.sql文件

## redis
key: platform-oauth2-datasource
value:
message
```json
{
  "dataSourceDtos": [
    {
      "date": "2022年1月14日",
      "defaultDataSource": true,
      "password": "123456",
      "personInCharge": "admin",
      "schoolCname": "学校名称",
      "schoolName": "limsproduct",
      "url": "jdbc:mysql://localhost:3306/message?useUnilocalhostcode=true&characterEncoding=utf-8&zeroDateTimeBehavior=convertToNull&transformedBitIsBoolean=true&useSSL=false&autoReconnect=true&serverTimezone=Asia/Shanghai",
      "username": "root"
    }
  ],
  "projectName": "message",
  "siteUrl": "http://www.gengshang.com"
}
```
