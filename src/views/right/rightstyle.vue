<template>
  <div id="rightstyle">
       <Swiper></Swiper>
       <div class="recoomend">
         <Recommendmusic></Recommendmusic>
         <Singelmusic></Singelmusic>
         <Newsong></Newsong>
       </div>
       <div class="singel"></div>
       <div class="newsong">
         
       </div>
  </div>
</template>
<script>
import Swiper from "../../components/commmon/swiper/swiper";
import {getRecommendMusic,getSingelMusic,getNewSong} from '../../network/home'
import Newsong from '../../components/commmon/home/newsong'
import Recommendmusic from '../../components/commmon/home/recommendmusic'
import Singelmusic from '../../components/commmon/home/singelmusic'
export default {
  name: "",
  components: {
      Swiper,
      Newsong,
      Recommendmusic,
      Singelmusic
  },
  created()
  {
    // this.getrecommendmusic();
    // this.getsinglemusic();
    // this.getnewsong();
  },
  methods:{
    test()
    {
       this.getrecommendmusic();
       this.getsinglemusic();
       this.getnewsong();
    },
    getrecommendmusic()
    {
      getRecommendMusic().then(res=>{
        console.log(res);
      });
    },
    getsinglemusic()
    {
      getSingelMusic().then(res=>{
        console.log(res);
      })
    },
    getnewsong()
    {
      getNewSong().then(res=>{
        console.log(res);
      })
    }
  }
};
</script>
<style scoped>
</style>