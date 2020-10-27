<template>
  <div id="main">
    <div class="backImage">
      <img src="./assets/img/bg.jpg" alt="">
    </div>
    <div id="app_content">
      <topBar></topBar>
      <centerAll></centerAll>
    </div>
  </div>
</template>
<script>
import centerAll from './views/center/centerAll'
import topBar from './components/commmon/topBar'
export default {
  name: 'App',
  components: {
    centerAll,
    topBar
  }
}
</script>

<style scoped>
.{
  margin: 0;
  padding: 0;
}
img{
  width: 100%;
  filter:blur(80px);
}
#main {
  width: 100%;
  height: 500px;
  overflow: 100%;
  float: left;
}
.backImage{
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}
#app_content{
  margin:100PX auto ;
  width: 1400PX;
  height: 800PX;
  background-color: black;
}

</style>
