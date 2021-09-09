<template>
    <div class='footer'>
        <el-row type="flex" justify="space-between">
            <el-col :span="6"  >
                <router-link to="/home" class="el-icon-arrow-left"></router-link>
            </el-col>
            <el-col :span="6" >
                <a href="#" class="el-icon-chat-round"></a>
            </el-col>
            <el-col :span="6" >
                <a href="#" class="el-icon-thumb"></a>
            </el-col>
            <el-col :span="6" >
                <a href="#" class="el-icon-star-off"></a>
            </el-col>

        </el-row>
    </div>
</template>

<script>
export default {
    name:'ZhihuFooter'
}
</script>

<style scoped>
@import '../css/ZhihuFooter.css';
</style>