<template>
  <div id="recoommend">
    <div>
      <span>{{ title }}</span>
      <span class="more">{{ more }}</span>
    </div>
    <div class="main">
      <div
        class="item"
        v-for="(item, index) in recommendmusiclist"
        :key="index"
        @click="getsongsdetail(item.id)"
      >
        <img class="img" :src="item.picUrl" />
          <div class="details">
          <p class="icon"><i class="el-icon-video-play" style="font-size: 30px"></i></p>
        </div>
        <div class="name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getRecommendMusic,getsongsdetail } from "../../../network/home";
import {MUSIC_LISTIDS} from '../../../store/mutationType'
export default {
  name: "Recommendmusic",
  data() {
    return {
      title: "推荐歌单",
      recommendmusiclist: [],
      more:'更多'
    };
  },
  created() {
    this.getrecommendmusic();
  },
  methods: {
    getrecommendmusic() {
      getRecommendMusic().then((res) => {
        this.recommendmusiclist = res.result;
        // console.log("recommend:");
        // console.log(res);
      });
    },
    getsongsdetail(id)
    {
      this.$router.push("/songsdetail"+id);
      // getsongsdetail(id).then(res=>{
      //   console.log();
      // })
      // console.log(id);
      // this.$store.commit(MUSIC_LISTIDS,id);
    }
  },
};
</script>
<style  scoped>
.img {
  width: 100px;
}
.item:hover .icon {
  transform: translateX(-100%);
  transition-duration: 0.3s;
  display: inline-block;
  color: rgb(86, 86, 228);
}
.main {
  padding-left: 20px;
}
.name {
  margin-top: 5px;

  width: 150px;
  font-size: 15px;
  height: 20px;
  overflow: hidden;
}
.icon{
    color: transparent;
    display: inline-block;
    margin-bottom: 2px;
}
.details {
    height: 20px;
    width: 100px;
    display: inline-block;
}
.more{
    float: right;
}
.item {
  width: 200px;
  margin-top: 20px;
  display: inline-block;
  margin-left: 10px;
}
span {
  
  font-weight: bold;
}
</style>