import request from '@/utils/request';

export async function fakeAccountLogin(params) {
  console.log(params)
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  console.log(mobile)
  return request(`/api/login/captcha?mobile=${mobile}`);
}
