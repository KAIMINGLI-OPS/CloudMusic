<template>
    <div class="singercard">
        <div>
            <img class="singer_img" :src="card.picUrl" alt="" >
        </div>
        <div class="singer_bottom">
            <span>{{card.name}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name:"SingerCard",
    props:{
        card:{
            type:Object,
            default()
            {
                return {};
            }
        }
    },
    data()
    {

    }
}
</script>

<style  scoped>
.singercard{
    display: inline-block;
    margin:5px 10px 5px 0px;
}
.singer_img{
    width: 200px;

}
.singer_bottom.active{
    color: violet;
}
</style>