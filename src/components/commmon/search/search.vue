<template>
  <div class="search">
    <div class="search_title">
      <h1>
        搜索歌曲<span>{{ keywords }}</span
        >
        结果<span>{{ totals }}</span>
      </h1>
    </div>
    <div class="search_main">
      <el-table class="table" :data="searchdata" :lazy="true" style="" @row-dblclick="playMusicList">
        <el-table-column type="index" ></el-table-column>
        <el-table-column label="收藏" >
          <a href="#" class="icon">
            <i class="el-icon-star-off"></i>
          </a>
        </el-table-column>
        <el-table-column prop="artists[0].name" label="歌手"></el-table-column>
        <el-table-column prop="name" label="歌曲"></el-table-column>
        <el-table-column prop="album.name" label="专辑"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { search } from "../../../network/search";
import {getMusicUrl,getMusicMenu} from '../../../network/home'
import { NOW_MUSICMENU, NOW_MUSIC } from '../../../store/mutationType'
export default {
  data() {
    return {
      keywords: "",
      searchdata: [],
      totals: 0,
    };
  },
  watch:{
    $route :function(to,from){
       if(to.params.keywords===undefined) return;
       this.keywords=to.params.keywords;
       this.searchAll(this.keywords,0,30,1);
     }
   } ,
  methods: {
    searchAll(keyword, offset, limit, type) {
      search(keyword, offset, limit, type).then((res) => {
        this.totals = res.result.songCount;
        this.searchdata = res.result.songs;
        console.log( this.searchdata);
      });
    },
    playMusicList(row)
    {
      this.getmusicurl(row.id);
      this.getmusicmenu(row.id);
    },
    getmusicurl(id)
    {
      getMusicUrl(id).then(res=>{
        console.log(res.data[0].url);
        this.$store.commit(NOW_MUSIC,res.data[0].url);
      })
    },
    getmusicmenu(id)
    {
      getMusicMenu(id).then(res=>{
        console.log(res.songs[0]);
        this.$store.commit(NOW_MUSICMENU,res.songs[0]);
      })
    }
  },
  created() {
    //this.$router.params.keywords;
    this.keywords = this.$route.params.keywords;
    this.searchAll(this.keywords, 0, 30, 1);
  },
  
};
</script>
<style  scoped>

.search_title{
    float: left;
    height: 40px;
    width: 1000px;
    margin-left: 20px ;
    font-size: 12px;
}
span{
    color: tomato;
}
.search_main {
    background-color: teal;
  height: 600px;
  width: 1120px;
  float: left;
  overflow: auto;
  margin: 20px ;
  
}
</style>