<template>
    <div id="newsong">
        <div>
            <span>新音乐</span><span class="right">更多</span>
        </div>
        <el-row class="main">
            <el-col :span="12">
                <el-table :data="newsonglist.slice(0,5)" :show-header="showheader">
                    <el-table-column>
                        <template slot-scope="scope" >{{'0'+(scope.$index+1).toString()}}</template>
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">
                            <el-image style="width:60px" :src="scope.row.picUrl"></el-image>
                             <i class="el-icon-video-play"></i>
                        </template>
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">
                            <div><span>{{scope.row.name}}</span></div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col  :span="12">
                <el-table :data="newsonglist.slice(5,10)" :show-header="showheader">
                    <el-table-column>
                        <template slot-scope="scope" >{{'0'+(scope.$index+6).toString()}}</template>
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">
                            <el-image style="width:60px" :src="scope.row.picUrl"></el-image>
                             <i class="el-icon-video-play"></i>
                        </template>
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">
                            <div><span>{{scope.row.name}}</span></div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { getNewSong }  from '../../../network/home'
export default {
    name:'Newsong',
    data()
    {
        return{
            newsonglist:[],
            showheader:false
        }
    },
    created()
    {
        this.getnewsong();
    },
    methods:{
        getnewsong(){
            getNewSong().then(res=>{
                this.newsonglist=res.result;
                console.log("新音乐：");
                console.log(res);
            })
        }
    }
}
</script>
<style  scoped>
i{
    color: red;
    position: relative;
    left: -13px;
}
#newsong{
    margin-top: 40px;
}
.right{
    float: right;
}
.main{
    margin-top: 20px;
}
span{
    font-weight: bold;
}
</style>
