import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import globalConfig from "config";
import { login, register as regUser } from "../../apis/login";
import ajax from "../../utils/ajax";
import Logger from "../../utils/Logger";
import { message } from "antd";
import "./index.less";
import { loginSuccessCreator } from "../../redux/Login.js";
import regIcon from "../../assets/imgs/to.png";

const logger = Logger.getLogger("Login");

/**
 * 定义Login组件
 */
class Login extends React.PureComponent {
	// 这个login样式是直接从网上找的: https://colorlib.com/wp/html5-and-css3-login-forms/
	// 一般而言公司内部都会提供基于LDAP的统一登录, 用到这个登录组件的场景应该挺少的

	state = {
		username: "", // 当前输入的用户名
		password: "", // 当前输入的密码
		confirm: "",
		requesting: false, // 当前是否正在请求服务端接口
		register: false // 注册页面
	};

	// controlled components

	handleUsernameInput = (e) => {
		this.setState({ username: e.target.value });
	};

	handlePasswordInput = (e) => {
		this.setState({ password: e.target.value });
	};
	handleConfirmPasswordInput = (e) => {
		this.setState({ confirm: e.target.value });
	};
	register = () => {
		this.setState({ register: !this.state.register });
	};
	/**
	 * 处理表单的submit事件
	 *
	 * @param e
	 */
	handleSubmit = async (e) => {
		// async可以配合箭头函数
		console.log(12333);
		const { register, username, password, confirm } = this.state;
		e.preventDefault(); // 这个很重要, 防止跳转
		// 确认密码是否一致
		if (register && password !== confirm) return message.error("密码不一致");
		this.setState({ requesting: true });
		const hide = message.loading("正在验证...", 0);
		logger.debug("username = %s, password = %s", username, password);

		try {
			// 服务端验证
			let res;
			if (register) {
				res = await regUser({
					username,
					password,
					confirm
				});
			} else {
				// 登录
				res = await login({ username, password });
			}
			console.log(res);
			hide();
			logger.debug("login validate return: result %o", res);
			if (res.success && res.data) {
				message.success(register ? "注册成功" : "登录成功");
				// 如果登录成功, 触发一个loginSuccess的action, payload就是登录后的用户名
				!register && this.props.handleLoginSuccess(res.data);
				// 存储token
				localStorage.setItem("token", res.data.token);
			} else {
				message.error(`登录失败: ${res.msg}`);
				// this.setState({ requesting: false });
			}
		} catch (exception) {
			hide();
			message.error(`网络请求出错: ${exception.message}`);
			logger.error("login error, %o", exception);
			// this.setState({ requesting: false });
		}
	};

	render() {
		// 整个组件被一个id="loginDIV"的div包围, 样式都设置到这个div中
		return (
			<div id="loginDIV">
				<div className="login">
					<div className="register" onClick={this.register}>
						<span>{this.state.register ? "登录" : "注册"}</span>
						<img src={regIcon} alt="加载失败" />
					</div>
					<div className="login-box">
						<form onSubmit={this.handleSubmit}>
							<input
								className="login-input"
								type="text"
								value={this.state.username}
								onChange={this.handleUsernameInput}
								placeholder="用户名"
								required="required"
							/>
							<input
								className="login-input"
								type="password"
								value={this.state.password}
								onChange={this.handlePasswordInput}
								placeholder="密码"
								required="required"
							/>
							{this.state.register && (
								<input
									className="login-input"
									type="password"
									value={this.state.confirm}
									onChange={this.handleConfirmPasswordInput}
									placeholder="确认密码"
									required="required"
								/>
							)}
							<button
								className="btn btn-primary btn-block btn-large"
								type="submit">
								{this.state.register ? "注册" : "登录"}
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleLoginSuccess: bindActionCreators(loginSuccessCreator, dispatch)
	};
};

// 不需要从state中获取什么, 所以传一个null
export default connect(null, mapDispatchToProps)(Login);
