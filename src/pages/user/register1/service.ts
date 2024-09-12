import request from '@/utils/request';
import { UserRegisterParams } from './index';

export async function fakeRegister(params: UserRegisterParams) {
  console.log(params)
  return request.post('/api/user/register', {
    data: params,
  });
}
