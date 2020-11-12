<template>
    <div id="lyric">
        <div class="header">
            <h1> {{getNowMusicMenu.name}}</h1>
            <h2>{{getNowMusicMenu.ar[0].name}}</h2>
        </div>
        <div class="lyricMove">
            <div class="lyric_content" v-for="(item,index) in lyricdata" :key="index" :style="{'font-size':(index==currentRow?'1.3rem':'.9rem')}">
                 <p >{{item.text}}</p>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import {getlyric} from '../../network/lyric'
import {formatLyric} from '../../common/uctil'
export default {
    name:'Lyric',
    data()
    {
        return{
            lyricdata:[],
            name:'',
            singer:'',
            currentRow:''
        }
    },
    created()
    {
        let id= this.$route.params.id;
        this.getlyrics(id);
    },
    methods:{
        getlyrics(id)
        {
             getlyric(id).then(res=>{
                 console.log(res);
            this.format(res.lrc.lyric);
            //console.log(this.lyricdata);
        })
        },
        format(data)
        {
             var tempdata= data.split("\n");
            tempdata.map((item)=>{
                var arr= item.split(']');
                let obj={};
                obj.time= arr[0].replace('[','');
                obj.text= arr[1];
                this.lyricdata.push(obj);
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
        ]),
    },
    watch:{
        lyricCurrent()
        {
            this.lyricdata.forEach((element,index)=>{
                console.log(this.getDuration);
                if(this.getDuration==element.time){
                    this.lyricMove.top=-index * 2.5 + 6 + "rem";
                    this.currentRow=index;
                }
            })
        }
    }
}
</script>
<style  scoped>
#lyric{
    width: 1100px;
    float: left;
    padding-top: 50px ;
    height: 600px;
    overflow: hidden;
}
.header{
    width: 200px;
    height: 50px;
    margin: 0 auto;
}
.lyricMove{
    margin-top: 50px;
    width: 1100px;
    height: 500px;
    border: 1px red solid;
    
}
p{
    width: 300px;
    height: 50px;
    margin: 0 auto;
}
.lyric_content{
    width: 400px;
    margin: 30px auto;
    font-size: 30px;
    font-family:Arial, Helvetica, sans-serif
}
</style>