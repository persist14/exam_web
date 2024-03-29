/*
 * @Description: 
 * @Author: 
 * @Date: 2023-06-14 08:40:59
 * @LastEditTime: 2023-06-14 18:26:32
 * @LastEditors: 
 * @Reference: 
 */
/**
 * 程序的入口, 类似java中的main
 */

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import { Switch, BrowserRouter } from "react-router-dom";
import "./utils/index.js"; // 引入各种prototype辅助方法
import store from "redux/store.js"; // redux store

// 开始引入各种自定义的组件
import App from "./components/App";
import Welcome from "./components/Welcome";
import Error from "./components/Error";
import Hello from "./components/Hello";
//import DBTable from './components/DBTable';

// 将DBTable组件做成动态路由, 减小bundle size
// 注意不要再import DBTable了, 不然就没意义了
// 一些比较大/不常用的组件, 都可以考虑做成动态路由
const DBTableContainer = (location, cb) => {
	require.ensure(
		[],
		(require) => {
			cb(null, require("./components/DBTable").default);
		},
		"DBTable"
	);
};
// 路由表, 只要menu.js中所有的叶子节点配置了路由就可以了
// 我本来想根据menu.js自动生成路由表, 但那样太不灵活了, 还是自己配置好些
const routes = (
	<Provider store={store}>
		<BrowserRouter>
			<Router history={hashHistory}>
				<Route path="/" component={App} exact>
					<IndexRoute component={Welcome} />
					<Switch>
						<Route exam path="examMannger">
							<Route
								path="question"
								tableName="question"
								getComponent={DBTableContainer}
								key={"question" + Math.random}
							/>
						</Route>
						<Route
							path="logger"
							tableName="logger"
							getComponent={DBTableContainer}
							key={"logger" + Math.random}
						/>
					</Switch>
					<Route path="*" component={Error} />
				</Route>
			</Router>
		</BrowserRouter>
	</Provider>
);

ReactDOM.render(routes, document.getElementById("root"));
