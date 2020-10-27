<template>
    <div id="app">
        center
        <div id="leftmenu">
            <leftmenu></leftmenu>
        </div>
        <div id="content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import leftmenu from './leftmenu/leftmenu'
export default {
  name: 'center',
  components: {
    leftmenu
  }
}
</script>
<style scoped>

</style>
