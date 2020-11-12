<template>
    <div id="radiohot">
        <div class="title"></div>
        <div class="body">
            <div>
                <img src="" alt="">
                <div><span></span></div>
                <div><span></span></div>
            </div>
        </div>
    </div>
</template>

<script>
import {getradiohot} from '../../../network/radiostation'
export default {
    name:'RadioHot',
    data()
    {
        return{

        }
    },
    created()
    {
        this.gethot();
    },
    methods:{
        gethot()
        {
            getradiohot().then(res=>{
                console.log(res);
            })
        }
    }
}
</script>

<style  scoped>

</style>