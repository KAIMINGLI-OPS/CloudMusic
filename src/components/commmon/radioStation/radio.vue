<template>
    <div id="radio">
        <div class="banner">
            <RadioBanner></RadioBanner>
        </div>
        <div class="radio_banner_content">
            <RadioHot></RadioHot>
            <ProgramList></ProgramList>
        </div>
    </div>
</template>

<script>
import RadioBanner from './radioBanner'
import RadioHot from './radiohot'
import ProgramList from './programlist'
export default {
    components:{
        RadioBanner,
        RadioHot,
        ProgramList
    }
    
}
</script>

<style  scoped>
#radio{
    float: left;
    width: 1100px;
    margin: 20px;
}
</style>