import { message } from "antd";
import { quesCreate, quesDel, quesQuery, quesUpd } from "../apis/ques";
import { loggerQuery } from "../apis/logger";
/* 定义action creator */
export const getTableDataCreator = (data) => {
	return (dispatch) => {
		quesQuery(data).then((res) => {
			if (res.code === 0) {
				dispatch({
					type: "GET_LIST",
					payload: JSON.parse(JSON.stringify({ list: res.data }))
				});
			}
		});
	};
};
export const setTableDataCreator = (data) => {
	return (dispatch) => {
		quesCreate(data).then((res) => {
			if (res.code === 0) {
				message.success("数据新增成功");
			} else {
				message.error("数据新增失败");
			}
		});
	};
};
export const updateTableItemsCreator = (data) => {
	return (dispath) => {
		quesUpd(data).then((res) => {
			console.log(res, ">>>>>>>>更新数据");
		});
	};
};
export const deleteTabkItemsCreator = (id) => {
	return () => {
		quesDel(id).then((res) => {
			console.log(res, ">>>>>>>>删除数据");
		});
	};
};
export const getLoggerTableCreator = () => {
	return (dispatch) => {
		loggerQuery().then((res) => {
			dispatch({
				type: "GET_LIST",
				payload: JSON.parse(JSON.stringify({ list: res.data }))
			});
		});
	};
};
/* 定义初始状态, 每个组件只需要关心自己的状态 */
const initState = {
	tableList: [] // table数据
};

/* 定义reducer, 每个组件只有一个reducer */
const reducer = (state = initState, action = {}) => {
	console.log(action, ">>>>acxtions");
	switch (action.type) {
		case "GET_LIST":
			return { ...state, tableList: action.payload.list };
		default: // 注意必须要有default语句
			return state;
	}
};

/* 导出的字段名称固定, 方便后续的store去处理 */
export default { initState, reducer };
