import { request } from './request'

export function Login(phone,password) {
    return request({
        url:'/login/cellphone',
        params :{
            phone,
            password
        }
    })
}