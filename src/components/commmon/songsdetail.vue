<template>
    <div id="songsdetail">
        <div class="detail_top">
            <img :src="coverImgUrl" alt="">
            <div class="main">
                 <div class="top">
                <div class="songsbutton"><div class="dan">歌单</div></div>
                <div class="title"><span>{{name}}</span></div>
                <div class="count"><span>歌曲数:</span>{{trackcount}} <span>播放量:</span> <span>{{playcount}}</span></div>
                <div class="creat"><span>创建时间：</span><span class="sp">{{createtime | showdate}}</span>
                    <span>        创作：</span><span class="sp">{{nickname}}</span>
                </div>
            </div>
            <div class="bottom">
                <el-button @click="playall" class="playbtn" type="sucess" icon="el-icon-video-play">播放歌单</el-button>
                <div class="tags">
                    <span>标签：</span>
                    <span class="kk" v-for="(item,index) in tags" :key="index">{{item}}<span> | </span></span>
                </div>
                <div class="message">
                    <span>简介：</span>    
                {{description}}</div>
            </div>
            </div>
        </div>
        <div class="table">
          <el-table :data="tablelist.slice(0,30)">
              <el-table-column label="" type="index"></el-table-column>
              <el-table-column label="歌曲" prop="name"></el-table-column>
              <el-table-column label="歌手" prop="ar[0].name"></el-table-column>
              <el-table-column label="专辑" prop="al.name"></el-table-column>
              <el-table-column label="时长" prop="dt"></el-table-column>
          </el-table>
        </div>
    </div>
</template>
<script>
import { mapGetters} from 'vuex'
import {getsongsdetail,getMusicMenu,getMusicUrl} from '../../network/home.js'
import {formatDate,songTimeFormat, timeFormat} from '../../common/uctil'
import{MUSIC_LISTIDS,NOW_MUSIC,NOW_MUSICMENU,SET_COUNT} from '../../store/mutationType'
export default {
    name:'songsdetail',
    data()
    {
        return{
            songsdetail:'',
            creater:{},
            coverImgUrl:'',
            description:'',
            tags:[],
            nickname:'',
            name:'',
            trackids:[],
            trackcount: 0,
            playcount:0,
            createtime:0,
            ids:[],
            tablelist:[]
        }
    },
    created(){
        let id= this.$route.params.id;
         getsongsdetail(id).then(res=>{
               this.songsdetail=res.playlist;
               this.description=this.songsdetail.description;
               this.creater=this.songsdetail.creator;
                this.coverImgUrl=this.songsdetail.coverImgUrl;
                this.tags=this.songsdetail.tags;
                this.nickname=this.creater.nickname;
                this.name=this.songsdetail.name;
                this.trackids=this.songsdetail.trackIds;
                this.trackcount=this.songsdetail.trackCount;
                this.playcount=this.songsdetail.playCount;
                this.createtime=this.songsdetail.createTime;
                this.songsdetail.trackIds.forEach((item)=>{
                    this.ids.push(item.id);
                    getMusicMenu(item.id).then(res=>{
                        //console.log(res.songs[0]);
                        let song=res.songs[0];
                        song.dt=timeFormat(song.dt);
                         this.tablelist.push(song);
                    })
                })
                //  console.log(this.createtime);
                //  console.log(res);
            }),
            this.getallmusic();
    },
    methods:{
        playall()
        {
            this.$store.commit(MUSIC_LISTIDS,this.ids);
            this.getmusicurl(this.getMusicListIds[this.getMusicCount]);
            this.getmusicmenu(this.getMusicListIds[this.getMusicCount])
           
        },
        getallmusic()
        {
           console.log(this.tablelist);
        },
        getmusicurl(id)
        {
            getMusicUrl(id).then(res=>
            {
                //console.log(res.data[0].url);
                this.$store.commit(NOW_MUSIC,res.data[0].url);
            })
        },
        getmusicmenu(id)
        {
            getMusicMenu(id).then(res=>{
                //console.log(res.songs[0]);
                this.$store.commit(NOW_MUSICMENU,res.songs[0]);
            })
        }
    },
    filters:{
        showdate(value)
        {
            let date=new Date(value);
            return formatDate(date,"yyyy-MM-dd");
        },
        showTime(value){
            return songTimeFormat(value);
        }
    },
    computed:{
        ...mapGetters(["getMusicListIds", "getMusicCount"]),
    }
}
</script>
<style  scoped>
#songsdetail{
    margin: 20px ;
    overflow: auto;
}

.top{
    float: left;
    height: 80px;
    margin-left: 10px;
}
.title{
    float: left;
    margin-left: 20px;
    font-size: 28px;
}
.count{
    float: left;
    margin-left: 90px;
    font-size: 20px;
    color: #999;
}
.creat{
    margin-top: 45px;
    margin-left: 65px;
    color: #999;
}
.sp{
    color: rgb(247, 85, 85);
}
.songsbutton{
    float: left;
    border: 2px red solid ;
    border-radius: 3px;
    width: 40px;
    height: 20px;
    padding: 0 auto;
    line-height: 20px;

}
.dan{
    text-align: center;
    margin:0 auto;
    width: 40px;
    height: 40px;
    font-weight: bold ;
}    
img{
    width: 300px;
    float: left;
    margin-left: 20px;
}
.main{
    float: left;
    width: 700px;
}
.bottom{
    margin-top: 20px;
    margin-left: 20px ;
    float: left;
    height: 80px;
    width: 600px;
    
}
.playbtn{
    margin-left: 60px;
}
.tags{
    margin-top: 20px;
    margin-left: 55px;
}
.kk{
    color: rgb(247, 85, 85);
}
.message{
    margin-left: 55px;
    margin-top: 10px;
    width: 700px;
    height: 95px;
    line-height: 25px;
    word-spacing: 20px;
    overflow: hidden;
    color: #666;
    text-overflow:ellipsis
}
.table{
    width: 1100px;
    height: 400px;
    background-color: rgb(247, 85, 85);
    float: left;
    margin-top: 30px;
    margin-left: 20px;
}
.tabs{
    width: 200px;
}
</style>