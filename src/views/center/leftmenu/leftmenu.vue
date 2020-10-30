<template>
<div>
    <el-menu
      background-color="#fff"
      text-color="#333"
      active-text-color="#ffd04b"
      default-active="1">
      <el-menu-item index="1">
          <template>
            <i class="el-icon-bangzhu"></i>
          <span>发现音乐</span>
          </template>
      </el-menu-item>
      <el-menu-item index="2">
          <template>
            <i class="el-icon-download"></i>
          <span>下载管理</span>
          </template>
      </el-menu-item>
      <el-menu-item index="3">
          <template>
            <i class="el-icon-coin"></i>
          <span>我的云盘</span>
          </template>
      </el-menu-item>
      <el-menu-item index="4">
          <template>
            <i class="el-icon-star-off"></i>
          <span>我的收藏</span>
          </template>
      </el-menu-item>
    </el-menu>
</div>
</template>
<script>
export default {
    name:"Leftmenu"
}
</script>
<style scoped>

</style>
