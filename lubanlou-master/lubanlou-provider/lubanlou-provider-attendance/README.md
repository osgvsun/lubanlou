# attendance微服务运行准备

## 数据库
attendance 数据库(只需要建立空库就行)

## redis
key: platform-oauth2-datasource
value: attendance
```json
{
	"dataSourceDtos": [
		{
			"date": "2022年1月14日",
			"defaultDataSource": true,
			"password": "123456",
			"personInCharge": "admin",
			"schoolCname": "学院名称",
			"schoolName": "schoolname",
			"url": "jdbc:mysql://localhost:3306/attendance?useUnilocalhostcode=true&characterEncoding=utf-8&zeroDateTimeBehavior=convertToNull&transformedBitIsBoolean=true&useSSL=false&autoReconnect=true&serverTimezone=Asia/Shanghai",
			"username": "root"
		}
	],
	"projectName": "attendance",
	"siteUrl": "http://www.gengshang.com"
}
```