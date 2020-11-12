<template>
  <div>
    <TitleBox
      class="rightsinger"
      :name="name1"
      :titles="titles1"
      @changeitem="change1"
    ></TitleBox>
    <TitleBox
      class="rightsinger"
      :name="name2"
      :titles="titles2"
      @changeitem="change2"
    ></TitleBox>
    <TitleBox
      class="rightsinger"
      :name="name3"
      :titles="titles3"
      @changeitem="change3"
    ></TitleBox>
    <div class="singercards">
      <SingerCard
        v-for="(item, index) in allsingers"
        :key="index"
        :card="item"
        class="singercard"
      ></SingerCard>
    </div>
  </div>
</template>
<script>
import TitleBox from "../../components/commmon/singerlist/titlebox";
import SingerCard from "../../components/commmon/singerlist/singercard";
import { getSinger } from "../../network/singer";
export default {
  name: "",
  components: {
    TitleBox,
    SingerCard,
  },
  data() {
    return {
      titles1: ["华语", "欧美", "日本", "韩国", "其他"],
      titles2: ["全部", "男歌手", "女歌手", "乐队组合"],
      titles3: [
        "全部",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "#",
      ],
      name1: "语种",
      name2: "歌手",
      name3: "筛选",
      allsingers: [],
      id1: -1,
      initial: -1,
      area: -1,
      limit: 30,
    };
  },
  created()
  {
      this.change();
  },
  methods: {
    getsingerlist(id1, initial, area, limit) {
      console.log(id1, initial, area, limit);
      getSinger(area, id1, initial, limit).then((res) => {
        this.allsingers = res.artists;
         //console.log(res.artists);
      });
    },
    change()
    {
      this.getsingerlist(this.id1, this.initial, this.area, this.limit);
    },
    change1(item, index) {
      switch (item) {
        case "欧美":
          this.area = 96;
          break;
        case "华语":
          this.area = 7;
          break;
        case "日本":
          this.area = 8;
          break;
        case "韩国":
          this.area = 16;
          break;
        case "其他":
          this.area = 0;
          break;
        default:
          this.area = -1;
      }
      
      this.getsingerlist(this.id1, this.initial, this.area, this.limit);
    },
    change2(item, index) {
      switch (item) {
        case "男歌手":
          this.id1 = 1;
          break;
        case "女歌手":
          this.id1 = 2;
          break;
        case "乐队组合":
          this.id1 = 3;
          break;
        default:
          this.id1 = -1;
      }
      this.getsingerlist(this.id1, this.initial, this.area, this.limit);
    },
    change3(item, index) {
      console.log(item);
      switch (item) {
        case "#":
          this.initial = 0;
          break;
        case "热门":
          this.initial = -1;
          break;
        default:
          this.initial = item.toLowerCase();
          this.getsingerlist(this.id1, this.initial, this.area, this.limit);
      }
    },
  },
};
</script>
<style  scoped>
.singercard{
  width: 200px;
  
}
.singercards{
  margin-top: 30px;
  height: 600px;
  
}
</style>