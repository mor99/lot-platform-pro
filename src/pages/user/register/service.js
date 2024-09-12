import request from '@/utils/request';
import axios from 'axios'
import {history} from 'umi'
import {message} from 'antd'
// import { response } from 'express';

export async function fakeRegister(params) {
  console.log(params)
  return axios.post('/api/user/register', params).then((response)=>{
    if (response.status === 201) {
        message.success("注册成功,请登录!")
        history.push('/user/login')
      }
      else {
        message.error("注册失败,请重试!")
      }
  });
}


/* .then((reponse) => {
    if (reponse.status === 201) {
      message.success("注册成功,请登录!")
      history.push('/user/login')
    }
    else {
      message.error("注册失败,请重试!")
    }
  }) */