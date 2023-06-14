// 登录成功的事件
export const loginSuccessCreator = (data) => {
  return {type: 'LOGIN_SUCCESS', payload: data};
};
// 退出登录事件
export const logoutSuccessCreator = () => {
  console.log(1111);
  // 退出之后并清除token
  localStorage.setItem('token', '')
  return { type: 'LOGOUT_SUCCESS'}
}

const initState = {
  login: false,  // 是否已登录
  user: {}, // 登录后的用户名
  pointer: 660 // 积分
};

const reducer = (state = initState, action) => {
  console.log(action.payload, '>>>>>>>>>>>');
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {...state, login: true, user: { name: action.payload.username, pointer: action.payload.pointer } };
    case 'LOGOUT_SUCCESS':
      return { ...state, login: false }
    default:
      return state;
  }
};

export default {initState, reducer};
