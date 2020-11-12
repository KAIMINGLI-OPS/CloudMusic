import { request } from './request'

export function search(keywords,offset=0,limit=30,type=1000) {
    return request({
        url:'/search',
        params :{
            keywords,
            offset,
            limit,
            type
        }
    })
}