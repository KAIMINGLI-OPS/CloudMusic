<template>
  <div class="titlebox">
    <span>{{name}}:</span>
    <div class="title_item" v-for="(item,index) in titles" :key="index">
      <span :class="[currentindex===index ? 'active' : '']" @click="change(item,index)">{{ item }}</span>
      <i style="paddingLeft:10px;color:#666;">{{index === titles.length-1 ? '' : "|"}}</i>
    </div>
  </div>
</template>
<script>
export default {
  name: "TitleBox",
  props: {
    name: {
      type: String,
      default: "",
    },
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
        currentindex:0,
    };
  },
  methods: {
    change(item, index) {
        this.currentindex=index;
      this.$emit("changeitem", item, index);
    },
  },
};
</script>
<style scoped>
.titlebox{
    margin-top: 5px;
}
.title_item{
    display: inline-block;
    padding-left:  10px;
}
span.active{
   
    color: #f5f5f5;
}
</style>