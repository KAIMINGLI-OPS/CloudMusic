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
export function logout()
{
    return request({
        url:'logout',
    })
}