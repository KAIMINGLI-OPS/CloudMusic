<template>
  <div id="main">
    <div class="backImage">
      <img src="./assets/img/bg.jpg" alt="">
    </div>
    <div id="app_content">
      <TopBar></TopBar>
      <CenterAll></CenterAll>
    </div>
  </div>
</template>
<script>
import CenterAll from './views/center/centerAll'
import TopBar from './components/commmon/topBar'
export default {
  name: 'App',
  components: {
    CenterAll,
    TopBar
  }
}
</script>

<style scoped>

img{
  width: 100%;
  filter:blur(80px);
}
#main {
  width: 1400PX;
  height: 500px;
  overflow: 100%;
  float: left;
  margin: 0 auto;
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
  height: 600PX;
  background-color: white;
}

</style>
