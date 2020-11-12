import { request } from './request'


export function getswiper()
{
    return request({
        url:'/banner',
    })
}
export function getMusicUrl(musicId){
    return request({
        url:"song/url",
        params:{
           id:musicId,
        }
    })
}
export function getMusicMenu(musicId){
    return request({
        url:"song/detail",
        params:{
           ids:musicId,
        }
    })
}
//推荐歌单
export function getRecommendMusic(limit=10){
    return request({
        url:"/personalized",
       params:{
        limit
       }
    })
}
//独家放送
export function getSingelMusic(){
    return request({
        url:"/personalized/privatecontent",
    })
}
//新音乐
export function getNewSong(limit=10){
    return request({
        url:"/personalized/newsong",
        params:{
            limit,
        }
    })
}
//获取歌单详情
export function getsongsdetail(id){
    return request({
        url:"/playlist/detail",
        params:{
            id,
        }
    })
}
//获取评论
export function getcooment(id,limit=20,offset=0){
    return request(
        {
            url:"/comment/music",
            params:{
                id,
                limit,
                offset
            }
        }
    )
}



