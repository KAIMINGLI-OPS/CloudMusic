import { request } from './request'


export function getSinger(area=-1,type=-1,initial=-1,limit=30){
    return request({
        url:"/artist/list",
        params:{
            type,
            initial,
            area,
            limit,
        }
    })
}