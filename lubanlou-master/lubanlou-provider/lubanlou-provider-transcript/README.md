# transcript微服务运行准备

## 数据库

transcript 数据库
运行transcript.sql文件

## redis

key: platform-oauth2-datasource
value:
transcript
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
      "url": "jdbc:mysql://localhost:3306/transcript?useUnilocalhostcode=true&characterEncoding=utf-8&zeroDateTimeBehavior=convertToNull&transformedBitIsBoolean=true&useOldAliasMetadataBehavior=true&useSSL=false&autoReconnect=true&serverTimezone=Asia/Shanghai",
      "username": "root"
    }
  ],
  "projectName": "transcript",
  "siteUrl": "http://www.gengshang.com"
}
```
