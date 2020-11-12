import { request } from './request'

export  function getlyric(id)
{
    return request({
        url:"/lyric",
        params:{
            id
        }
    })
}