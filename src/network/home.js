import { request } from './request'


export function getswiper()
{
    return request({
        url:'/banner',
    })
}