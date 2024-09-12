import request from '@/utils/request';

// 用户名登录
export async function fakeAccountLogin(params) {
  return request('/api/user/login', {
    method: 'POST',
    data: params,
  }).then((response) => {
    const data = {...response}
    data.currentAuthority = 'user'
    localStorage.setItem('username',params.username)
    localStorage.setItem("mytoken",data.accessToken)
    return data
    // reponse[currentAuthority] = 'user' });
})
}

// 手机号登录
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}