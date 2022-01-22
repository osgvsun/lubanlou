# auditserver微服务运行准备

## 数据库
auditserver 数据库
运行auditserver.sql文件

## redis
key: platform-oauth2-datasource
value: auditserver
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
      "url": "jdbc:mysql://localhost:3306/auditserver?useUnilocalhostcode=true&characterEncoding=utf-8&zeroDateTimeBehavior=convertToNull&transformedBitIsBoolean=true&useSSL=false&autoReconnect=true&serverTimezone=Asia/Shanghai",
      "username": "root"
    }
  ],
  "projectName": "auditserver",
  "siteUrl": "http://www.gengshang.com"
}
```


# 审核配置表字段说明


## c_message_properties表
```text
 project_name 项目名称 例：limsproduct
 business_config_item 项目配置业务 例：TimetableAuditOrNot
 business_config_status 业务配置状态 例：yes
 info 备注 例：是否排课审核
 ```

## c_message_properties_extend表
```text
  project_name 项目名称 例：limsproduct
  business_config_item 项目配置业务 例：isPrestoreOrNot
  business_config_item_extend 项目配置业务拓展 例：isPrestoreOrNotPersonal
  business_config_extend_status 业务配置状态 例：yes
  info 备注 例：是否启用个人预存缴费形式
```
