<template>
    <div id="center">
        <div id="leftmenu">
          <el-aside width="220px"  class="asisde">
            <Leftmenu></Leftmenu>
          </el-aside>
        </div>
        <div id="content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import Leftmenu from './leftmenu/leftmenu'
export default {
  name: '',
  components: {
    Leftmenu
  }
}
</script>
<style scoped>
#center{
  margin: 0;
  padding: 0;
}
.asisde{
  height: 800px;
  float: left;
  background-color: teal;
}

</style>
