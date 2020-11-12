<template>
    <div id="single">
        <div id="top">
            <span>{{name}}</span>
            <span class="more">{{more}}</span>
        </div>
        <div id="main">
            <div class="list" v-for="(item,index) in singlelist" :key="index">
                    <img :src="item.picUrl" alt="">
                    <p class="icon"><i class="el-icon-video-play" style="font-size: 30px"></i></p>
                    <div class="name">
                         <span>{{item.name}}</span>
                    </div>
                   
            </div>
        </div>
    </div>
</template>
<script>
import {getSingelMusic} from '../../../network/home'
export default {
    name:'Singlemusic',
    data()
    {
        return{
            singlelist:[],
            name:'',
            more:'更多'
        }
    },
    created()
    {
        this.getsingelmusic();
    },
    methods:{
        getsingelmusic()
        {
            getSingelMusic().then(res=>{
                this.name=res.name;
                this.singlelist=res.result;
                // console.log("独家放送：");
                // console.log(res);
            })
        }
    }
}
</script>
<style  scoped>
#single{
    margin-top: 40px;
}
#main{
    margin-top: 20px;
    overflow: auto;
    
}
img{
    width: 300px
}
.list:hover .icon{
    display: inline-block;
    color: rgb(79, 79, 230);
    transform:  translateX(-100%);
    transition-duration: 0.3s;
}
.list{
    width: 350px;
    display: inline-block;
}
.name{
    width: 300px;
    height: 20px;
}
.more{
    float: right;
}
span{
    font-weight: bold;
}
.icon{
    display: inline-block;
    color: transparent;
}
</style>