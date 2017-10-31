<!--
 * @desc 广告主系统 布局
 * @author Jazzy
 * @lastModify Jazzy
 * @date 2016-12-13
 -->

<style lang="scss" scoped>
    .ad {
        min-height: 100%;
        overflow-y: hidden;
    }

    .ad__main {
        min-height: calc(100vh - 68px - 61px - 196px);
    }
</style>
<style>
    
</style>

<template>
    <div class="ad" >
        <router-view name="header" ></router-view>
        <router-view name="navigator" ></router-view>
        <router-view class="ad__main"></router-view>
        <router-view name="footer" ></router-view>
        <router-view name="attachment" ></router-view>
    </div>
</template>

<script>
    export default {};
</script>