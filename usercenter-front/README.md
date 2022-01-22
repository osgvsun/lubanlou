# usercenter-front前端服务运行准备

## 数据库

teacher_info_center 数据库



## redis

key: platform-oauth2-datasource
value:
usercenter-front

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
			"url": "jdbc:mysql://localhost/teacher_info_center?useUnilocalhostcode=true&characterEncoding=utf-8&zeroDateTimeBehavior=convertToNull&transformedBitIsBoolean=true&useSSL=false&autoReconnect=true&serverTimezone=Asia/Shanghai",
			"username": "root"
		}
	],
	"projectName": "usercenter-front",
	"siteUrl": ""
}
```