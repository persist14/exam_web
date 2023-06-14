module.exports = [
	{
		key: "id", // 传递给后端的key
		title: "序号", // 前端显示的名字

		// 其实dataType对前端的意义不大, 更重要的是生成后端接口时要用到, 所以要和DB中的类型一致
		// 对java而言, int/float/varchar/datetime会映射为Long/Double/String/Date
		dataType: "int", // 数据类型, 目前可用的: int/float/varchar/datetime

		// 这一列是否是主键?
		// 如果不指定主键, 不能update/delete, 但可以insert
		// 如果指定了主键, insert/update时不能填写主键的值;
		// 只有int/varchar可以作为主键, 但是实际上主键一般都是自增id
		// primary: true,

		// 可用的showType: normal/radio/select/checkbox/multiSelect/textarea/image/file/cascader
		showType: "normal", // 默认是normal, 就是最普通的输入框

		showInTable: true, // 这一列是否要在table中展示, 默认true
		disabled: true, // 表单中这一列是否禁止编辑, 默认false
		showInForm: false, // 不显示弹框项
		// 扩展接口, 决定了这一列渲染成什么样子
		render: (text, record, index) => index + 1
	},
	{
		key: "title",
		title: "题目",
		dataType: "varchar", // 对于普通的input框, 可以设置addonBefore/addonAfter
		placeholder: "请输入题目",
		validator: [{ type: "string", required: true, message: "请输入题目!" }]
		// addonBefore: (<Icon type="user"/>),
		// addonAfter: '切克闹',
		// defaultValue: 'foolbear', // 默认值, 只在insert时生效, update时不生效
	},
	{
		key: "class",
		title: "班级",
		dataType: "string",
		placeholder: "请输入班级",
		// min: 10,
		// defaultValue: 70, // 默认值
		disabled: false,
		validator: [{ type: "string", required: true, message: "请输入班级" }]
		// showInForm: false, // 这一列是否要在表单中展示, 默认true. 这种列一般都是不需要用户输入的, DB就会给一个默认值那种
	},
	{
		key: "score",
		title: "分值",
		dataType: "string",
		placeholder: "请输入分值",
		validator: [{ type: "string", required: true, message: "请输入分值!" }],
		// showType: 'radio',
		// options: [{key: '1', value: '男'}, {key: '2', value: '女'}],
		// defaultValue: '1',
		disabled: false
	},
	{
		key: "titleType",
		title: "题目类型",
		dataType: "string",
		showType: "select",
		options: [
			{ key: "1", value: "测试" },
			{ key: "2", value: "计算机" }
		],
		defaultValue: "1",
		disabled: false,
		placeholder: "请选择题目类型",
		validator: [{ type: "string", required: true, message: "请选择题目类型" }]
		// key: 'marriage',
		// title: '婚否',
		// dataType: 'varchar',
		// showType: 'select',
		// options: [{key: 'yes', value: '已婚'}, {key: 'no', value: '未婚'}],

		// // 对于dataSchema可以设置校验规则, querySchema不能设置
		// // 设置校验规则, 参考https://github.com/yiminghe/async-validator#rules
		// validator: [{type: 'string', required: true, message: '必须选择婚否!'}],
	},
	{
		key: "diff_level",
		title: "难度系数",
		dataType: "string",
		showType: "select",
		options: [
			{ key: "1", value: "简单" },
			{ key: "2", value: "适中" },
			{ key: "3", value: "困难" }
		],
		defaultValue: "1",
		validator: [{ type: "string", required: true, message: "请选择难度!" }]
		// showType: 'checkbox',
		// options: [{key: '1', value: '吃饭'}, {key: '2', value: '睡觉'}, {key: '3', value: '打豆豆'}],
		// defaultValue: ['1', '2'],
		// validator: [{type: 'array', required: true, message: '请至少选择一项兴趣'}],
		// width: 120 // 指定这一列的宽度
	},
	{
		key: "prodName",
		title: "出题人",
		dataType: "normal",
		showInForm: false
		// showType: 'multiSelect',
		// options: [{key: 'lan', value: '懒'}, {key: 'zhai', value: '宅'}],
		// validator: [{type: 'array', required: true, message: '请选择优点'}],
	},
	{
		key: "answer",
		title: "答案",
		dataType: "varchar",
		placeholder: "请输入答案"
		// showType: 'image',  // 后端必须提供图片上传接口
		// showInTable: false,
	},
	// {
	//   key: 'desc',
	//   title: '个人简介',
	//   dataType: 'varchar',
	//   showType: 'textarea',  // 用于编辑大段的文本
	//   showInTable: false,
	//   defaultValue: '个人简介个人简介个人简介',
	//   validator: [{type: 'string', max: 20, message: '最长20个字符'}],
	// },
	{
		key: "created_at",
		title: "时间",
		dataType: "string",
		showInTable: true,
		showInForm: false, // 这个只是测试下...如果一列在table和form中都不出现, 那就不如直接去掉.
		width: 150
	}
];
