<template>
  <div id="bottombar">
    <div id="scroll">
      <el-slider
        ref="slider"
        v-model="musicDuration"
        @click="musicDurationChange"
        :max="totalDuration"
        :show-tooltip="false"
      >
      </el-slider>
    </div>
    <div class="content">
      <div class="left">
        <img :src="getNowMusicMenu.al.picUrl" alt="" />
        <div class="detail">
          <div class="sing_title">
            <a>
              {{ getNowMusicMenu.name || getNowMusicMenu.al.name }}-{{
                getNowMusicMenu.ar[0].name
              }}</a
            >
          </div>
          <div class="sing_time">
            <span>{{ musicDuration | showTime }}</span
            >/
            <span>{{ getTime }}</span>
          </div>
        </div>
      </div>
      <div class="play">
        <div class="pre" style="cursor: pointer" @click="premusic">
          <i class="el-icon-caret-left"></i>
        </div>
        <div class="start" style="cursor: pointer" @click="playmusic">
          <i class="el-icon-video-pause color-green" v-show="isplay"></i>

          <i class="el-icon-video-play" v-show="!isplay"></i>
        </div>
        <div class="next" style="cursor: pointer" @click="nextmusic">
          <i style="font-size: 40px" class="el-icon-caret-right"></i>
        </div>
      </div>
      <div class="more">
        <el-button type="sucess" @click="tolyric">显示歌词</el-button>
        <el-button type="sucess" @click="time">查看格式</el-button>
        <el-button type="sucess" @click="comment">评论</el-button>
      </div>
      <div id="lyric" v-show="lyricShow">
        <div class="header">
          <h1 class="title">{{ getNowMusicMenu.name }}</h1>
          <h2 class="title">{{ getNowMusicMenu.ar[0].name }}</h2>
        </div>
        <div class="lyric_border">
          <div class="lyricMove">
            <div
              class="lyric_content"
              v-for="(item, index) in lyricdata"
              :key="index"
              :style="{ 'font-size': index == currentRow ? '40px' : '28px','color':index == currentRow ? 'red' :'black' }"
            >
              <p>{{ item.text }}</p>
            </div>
          </div>
        </div>
      </div>
      <audio :src="getNowMusic" autoplay ref="audio"></audio>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import jquery from 'jquery'
import {
  NOW_MUSICMENU,
  NOW_MUSIC,
  ADD_COUNT,
  SUB_COUNT,
  CLEAR_COUNT,
  SET_DURATION,
  SET_PLAY,
} from "../../store/mutationType.js";
import { getMusicUrl, getMusicMenu } from "../../network/home.js";
import { getlyric } from "../../network/lyric";
import { Lyric } from "../../components/commmon/lyric";
import { timeFormat, songTimeFormat } from "../../common/uctil";
export default {
  data() {
    return {
      isplay: false,
      musicDuration: 0,
      totalDuration: 100,
      lyricdata: [],
      currentRow: "",
      lyricdiv: {},
      lyricShow:false
    };
  },
  mounted() {
    this.musicDurationChange();
  },

  computed: {
    ...mapGetters([
      "getNowMusic",
      "getNowMusicMenu",
      "getMusicListIds",
      "getMusicCount",
      "getDuration",
    ]),
    getTime() {
      return timeFormat(this.getNowMusicMenu.dt);
    },
  },
  methods: {
    musicDurationChange() {
      let audio = this.$refs.audio;

      audio.currentTime = this.musicDuration;
      audio.addEventListener("timeupdate", () => {
        this.totalDuration = audio.duration;
        this.musicDuration = audio.currentTime;
        var musicDurationtime = this.musicDuration.toFixed(3);
        //console.log(musicDurationtime);

        this.$store.commit(SET_DURATION, audio.currentTime);
        if (audio.currentTime >= audio.duration) {
          if (this.getMusicListIds.length > 0) {
            this.nextmusic();
          }
          this.isplay = false;
          this.$store.commit(SET_PLAY, this.isplay);
        }
      }),
      this.isplay = true;
      this.$store.commit(SET_PLAY, this.isplay);
    },
    premusic() {
      if (this.getMusicListIds.length === 0) return false;
      this.$store.commit(SUB_COUNT);
      this.getmusicurl(this.getMusicListIds[this.getMusicCount]);
      this.getmusicmenu(this.getMusicListIds[this.getMusicCount]);
       let id = this.getNowMusicMenu.id;
       this.lyricdata=[];
        this.getlyrics(id);
    },
    playmusic() {
      if (this.getNowMusic !== "") {
        if (!this.$refs.audio.paused) {
          this.$refs.audio.pause();
        } else {
          this.$refs.audio.play();
        }
      }
      this.isplay = !this.isplay;
      this.$store.commit(SET_PLAY, this.isplay);
    },
    nextmusic() {
      if (this.getMusicListIds.length === 0) return false;
      this.$store.commit(ADD_COUNT);
      console.log(this.getMusicCount);
      this.getmusicurl(this.getMusicListIds[this.getMusicCount]);
      this.getmusicmenu(this.getMusicListIds[this.getMusicCount]);
       let id = this.getNowMusicMenu.id;
       this.lyricdata=[];
        this.getlyrics(id);
    },
    getmusicurl(id) {
      getMusicUrl(id).then((res) => {
        this.$store.commit(NOW_MUSIC, res.data[0].url);
      });
    },
    getmusicmenu(id) {
      getMusicMenu(id).then((res) => {
        this.$store.commit(NOW_MUSICMENU, res.songs[0]);
      });
    },
    tolyric() {
      this.lyricdata = [];
      let id = this.getNowMusicMenu.id;
      console.log(id);
      // this.$router.push("/lyric"+this.getNowMusicMenu.id);
      this.getlyrics(id);
      console.log(this.lyricdata);
      this.lyricShow=!this.lyricShow;
    },
    getlyrics(id) {
     
      getlyric(id).then((res) => {
        console.log(res.lrc.lyric);
        this.format(res.lrc.lyric);
        //console.log(this.lyricdata);
      });
    },
    format(data) {
      var tempdata = data.split("\n");
      tempdata.map((item) => {
        var arr = item.split("]");
        let obj = {};
        //obj.time = arr[0].replace("[", "");
        obj.time = this.parseTime(arr[0].replace("[", ""));
        obj.text = arr[1];
        this.lyricdata.push(obj);
      });
    },
    comparetime() {
      var arr = this.lyricdata;
      let musicDurationtime = this.musicDuration.toFixed(3);
      console.log(musicDurationtime);
      console.log();
    },
    /*解析时间*/
    parseTime: function (time) {
      var tl = time.split(":");
      switch (tl.length) {
        case 1:
          return parseFloat(tl[0]);
        case 2:
          return parseFloat(tl[0]) * 60 + parseFloat(tl[1]);
        case 3:
          return (
            parseFloat(tl[0]) * 3600 +
            parseFloat(tl[1]) * 60 +
            parseFloat(tl[2])
          );
      }
    },
    time() {
      let audio = this.$refs.audio;
      console.log(audio.currentTime);
    },
    comment()
    {
      let id= this.getNowMusicMenu.id;
      this.$router.push('comment'+id);
    }
  },
  created() {
    this.lyricdiv = document.getElementsByClassName("lyricMove");
  },
  filters: {
    showTime(value) {
      return songTimeFormat(value);
    },
  },
  watch: {
    musicDuration(newmusicDuration, oldmusicDuration) {
      this.lyricdata.forEach((item, index) => {
        if (item.time < newmusicDuration) {
          if (item.time > oldmusicDuration) {
            this.currentRow = index;
             $(".lyricMove").animate({top:'-=48px'});
          }
        }
      });
    },
  },
};
</script>
<style  scoped>
#bottombar {
  width: 1400px;
  height: 200px;
  background-color: white;
  border:1px solid gray;
}

.left {
  width: 400px;
  height: 100px;
  float: left;
  display: flex;
  align-items: center;
  /* background-color: green; */
  padding: 20px;
}
.detail {
  width: 200px;
  margin-left: 20px;
  display: inline-block;
  
}
.left img {
  width: 50px;
  border-radius: 50%;
}
.sing_time {
  margin-top: 10px;
}
.play {
  color: brown;
  width: 400px;
  height: 100px;
  float: left;
  /* background-color: rebeccapurple; */
  display: flex;
  font-size: 40px;
  margin-top: 40px;
  margin-left: 40px;
}
.more {
  width: 400px;
  height: 100px;
  float: left;
  /* background-color: yellowgreen; */
}

#lyric {
  position: absolute;
  top: 50px;
  left: -60px;
  float: left;
  width: 100%;
  height: 100%;
}
.header {
  
  width: 50%;
  height: 20%;
  margin: 0 auto;
}
.title{
   
  width: 100px;
  height: 30px;
  margin: 20px auto;
}
.lyric_border{
   
   width: 1200px;
   height: 800px;
   margin: 0 auto;
   overflow: hidden;
}
.lyricMove {
    width: 100%;
    position: relative;
    margin-top: 20px;
    text-align: center;
    padding-top: 200px ;
    height: 600px;
    
}
p {
  font-size: 24px;
}


</style>