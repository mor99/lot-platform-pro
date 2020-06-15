import request from '@/utils/request';

// 用户名登录
export async function fakeAccountLogin(params) {
  // /api/user/login
  return request('/api/user/login', {
    method: 'POST',
    data: params,
  }).then((reponse) => { 
    const data = {...reponse}
    data.currentAuthority = 'user'
    localStorage.setItem("mytoken",data.accessToken)
    return data
    // reponse[currentAuthority] = 'user' });
})}

// 手机号登录
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
