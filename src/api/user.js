
import request from '@/utils/request'

export const login = data => request({
  url: '/api/login',
  method: 'post',
  data
})

export const getUserInfo = params => request({
  url: '/api/getuserinfo',
  method: 'get',
  params
})

export const logout = params => request({
  url: '/api/logout',
  method: 'get',
  params
})
