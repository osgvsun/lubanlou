# gsquestionpool微服务运行准备

## 数据库

teach 数据库
运行teach.sql文件(取消勾选"在每个运行中运行多个查询")

## redis
key: platform-oauth2-datasource
value:
proteach
```json
{
	"dataSourceDtos": [
		{
			"date": "2022年1月14日",
			"defaultDataSource": true,
			"password": "123456",
			"personInCharge": "admin",
			"schoolCname": "庚商学院",
			"schoolName": "limsproduct",
			"url": "jdbc:mysql://localhost:3306/teach?useUnilocalhostcode=true&characterEncoding=utf-8&zeroDateTimeBehavior=convertToNull&transformedBitIsBoolean=true&useSSL=false&autoReconnect=true&serverTimezone=Asia/Shanghai",
			"username": "root"
		}
	],
	"projectName": "GvsunTeach",
	"siteUrl": "http://www.gengshang.com"
}
```