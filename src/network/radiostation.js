import { request } from './request'

//电台banner
export function getradiobanner()
{
    return request({
        url:'/dj/banner',
    })
    
}

//热门电台
export function getradiohot(limit,offset)
{
    return request({
        url:'/dj/hot',
        params:{
            limit,
            offset
        }
    })
}
//电台节目榜单
export function getradioprogramlist(limit,offset)
{
    return request({
        url:'/dj/program/toplist',
        params:{
            limit,
            offset
        }
    })
}
