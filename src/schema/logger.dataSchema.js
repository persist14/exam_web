/*
 * @Description:
 * @Author:
 * @Date: 2023-06-14 08:40:59
 * @LastEditTime: 2023-06-14 17:53:22
 * @LastEditors: Please set LastEditors
 * @Reference:
 */

// 定义某个表的querySchema
// schema的结构和含义参考下面的例子
// 注意: 所有的key不能重复

module.exports = [
	{
		key: "created_at", // 传递给后端的字段名
		title: "日期", // 前端显示的名称
		dataType: "string",
		showType: "normal"
	},
	{
		key: "user",
		title: "用户名",
		dataType: "string",
		showType: "normal",
		defaultValue: ""
	},
	{
		key: "operator",
		title: "操作",
		dataType: "string"
	},
	{
		key: "time",
		title: "时间",
		dataType: "string"
	},
	{
		key: "hash",
		title: "hash值",
		dataType: "string"
	},
	{
		key: "truth",
		title: "真实性",
		dataType: "string"
	}
];
