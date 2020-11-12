<template>
    <div id="comment">
        <div class="comment_form">

        </div>
        <div class="content">
            <div class="background">
                <img class="bgimg" :src="this.getNowMusicMenu.al.picUrl" alt="">
            </div>
            <div class="item" v-for="(item,index) in comment" :key='index'>
                <div class="left">
                    <img class="head_img" :src="item.user.avatarUrl" alt="">
                    <div class="text">
                        <div class="username">{{item.user.nickname}}</div>
                        <div class="commenttime">{{item.time | format}}</div>
                    </div>
                </div>
                <div class="comment_content">
                    <span class="comment_item">{{item.content}}</span>
                </div>
                <div class="right">
                    <span class="icon"><i class="el-icon-thumb">{{ item.likedCount > 0 ?`(${ item.likedCount})`:'' }}</i></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {getcooment} from '../../network/home.js'
import {formatDate} from '../../common/uctil'
export default {
    data()
    {
        return{
            comment:[]
        }
    },
    created()
    {
      
        this.getcomments();
    },
    methods:{
        getcomments()
        {
             let id= this.$route.params.id;
            getcooment(id).then(res=>{
                
                this.comment=res.comments;
                console.log(res);
            })
        }
    },
    computed:{
        ...mapGetters([
             "getNowMusic",
      "getNowMusicMenu",
      "getMusicListIds",
      "getMusicCount",
      "getDuration",
        ])
        
    },
    filters:{
        format(value)
        {
            let date=new Date(value);
            return formatDate(date,"yyyy-MM-dd");
        }
    }
}
</script>
<style  scoped>
#comment{
    width: 1100px;
    height: 800px;
     overflow: auto;
    
}
.content{
    width: 800px;
    height: 400px;
    margin: 20px auto;
}
.item{
    height: 60px;
    width: 800px;
    margin: 0 auto;
    border-top: 1px solid #999;
}
.left{
   line-height: 55px;
}
.head_img{
    width: 50px;
    border-radius: 50%;
    margin-left: 10px;
    margin-top: 5px;
    float: left;
}
.text{
    padding-left: 20px;
    float: left;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.commenttime{
    height: 20px;
     color: rgb(204, 204, 204);
}
.username{
   
    height: 20px;
}
.comment_content{
    height: 60px;
    display: flex;
   
}
.comment_item{
    align-self: center;
    margin-left: 40px ;
    
   
}
.right{
    float: right;
    position: relative;
    right: 0px;
    bottom: 18px;
    cursor: pointer;
}
.bgimg{
    width: 100%;
}
.icon{
    
}
</style>