/*
 * @Description: 
 * @Author: 
 * @Date: 2023-06-14 08:40:59
 * @LastEditTime: 2023-06-14 18:22:13
 * @LastEditors: 
 * @Reference: 
 */
import React from "react";
import "./index.less";

/**
 * 展示欢迎界面
 */
class Welcome extends React.PureComponent {
	render() {
		return (
			<div>
				<h1 className="welcome-text">
					Welcome, 这里是欢迎界面, 欢迎来到考试管理系统~~~~
				</h1>
			</div>
		);
	}
}

export default Welcome;
