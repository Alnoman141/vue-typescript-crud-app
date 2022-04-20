import { IsUser } from '@/types/user'
import request from '@/utils/request'

export const getUsers = (params: any) =>
  request({
    url: '/users',
    method: 'get',
    params
  })

export const submitUser = (params: any) =>
  request({
    url: '/user',
    method: 'post',
    data:  params 
  })

export const getUserData = (id: number) =>
  request({
    url: '/user/' + id,
    method: 'get',
  })

export const updateUser = (data: IsUser) =>
  request({
    url: '/user/' + data.id,
    method: 'post',
    data:  data
  }) 
 
 export const deleteUser = (id: number) =>
  request({
    url: '/user/delete/' + id,
    method: 'get',
  })  
