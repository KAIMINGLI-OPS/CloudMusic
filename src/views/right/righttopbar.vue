<template>
  <div id="topbar">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
      <el-tab-pane
        v-for="item in tabs"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "Righttopbar",
  data() {
    return {
      activeName: "/home/rtstyle",
      tabs: [
        { label: "个性推荐", name: "/home/rightstyle" },
        { label: "歌单", name: "/home/rightsongs" },
        { label: "主播电台", name: "/home/rightanchor" },
        { label: "排行榜", name: "/home/rightlist" },
        { label: "歌手", name: "/home/rightsinger" },
        { label: "最新音乐", name: "/home/rightnewsing" },
      ],
    };
  },
  methods: {
    handleClick(tab, event, name) {
      this.$router.replace(tab.name);
      this.activeName = tab.name;
    },
  },
  created() {},
};
</script>
<style  scoped>
.tabs {
  display: flex;
  justify-content: center;
}
#topbar {
  margin: 0 auto;
  cursor: pointer
}
</style>