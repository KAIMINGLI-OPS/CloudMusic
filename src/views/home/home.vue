<template>
    <div id="right_home">
        <div class="right_top">
            <Righttopbar class="tab"></Righttopbar>
        </div>
        <div class="right_content">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
          
        </div>
    </div>
</template>
<script>
import Righttopbar from '../right/righttopbar'
export default {
    components:{
        Righttopbar
    }
    
}
</script>
<style  scoped>
#right_home{
    display: inline-block;
    width: 1180px;
    height: 800px;
    background-color: violet;
    
}
.right_top{
    
    margin: 20px ;
}
.tab{
    margin: 0 auto;
    width: 600px;
    height: 20px;
}
.right_content{
    margin: 20px ;  
    padding: 20px;  
}
    
</style>