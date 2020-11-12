<template>
  <div>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(item, index) in banner" :key="index">
        <el-image :src="item.pic"></el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { getradiobanner } from "../../../network/radiostation.js";
export default {
  name: "RadioBanner",
  data() {
    return {
      banner: [],
    };
  },
  created() {
    this.getbanner();
  },
  methods: {
    getbanner() {
      getradiobanner().then((res) => {
          this.banner=res.data;
        
      });
    },
  },
};
</script>

<style  scoped>
</style>