<style lang="scss">
    // 基本组件样式覆盖
    @import '~scss/base',
            '~scss/controls/button',
            '~scss/controls/checkbox',
            '~scss/controls/pagination',
            '~scss/controls/radio',
            '~scss/controls/notice',
            '~scss/controls/iconfont',
            '~scss/controls/dropdown',
            '~scss/controls/input',
            '~scss/controls/popover',
            '~scss/controls/loading',
            '~scss/controls/dialog',
            '~scss/controls/step',
            '~scss/controls/table',
            '~scss/controls/message';

    // 全局样式
    @import '~scss/global';

    // 原子类
    @import '~scss/mixins/atom';


    html, body {
        height: 100%;
        font-family: $f-family;
    }
    body {
        height: 100%;
    }
    * {
        box-sizing: border-box;
    }

    #container {
        width: 100%;
        min-height: 100%;
        background-color: $tool-color__level-4;
    }
</style>

<template>
    <div id="container">
        <router-view></router-view>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    
    export default {
        computed: {
            ...mapGetters([
                'getAccount'
            ])
        },

        methods: {
            ...mapActions([
                'clearCurrentAccount'
            ])
        }
    };
</script>