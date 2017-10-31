<!--
 * @desc 系统顶部组件
 * @author Ivan
 * @lastModify Ivan
 * @date 2017-02-22
 -->

<style lang="scss" scoped>
	@import '~scss/base';
    @import '~scss/mixins/vertical_align';
</style>
<style lang="scss">
    @import '~scss/base';

    .header__btn-notice {
        .el-badge__content {
            position: absolute;
            border: 0;
            width: 8px;
            height: 8px;
            right: -2px;

            &.is-hidden {
                display: none;
            }
        }
    }

    .header__notic-list {
        padding: 0;
    }
</style>

<template>
    <header class="header">
        this is header
    </header>
</template>

<script>
    export default {
    };
</script>