<style lang="scss" scoped>
    @import '~scss/base';
    @import '~scss/mixins/_img';
    @import '~scss/mixins/vertical_align';
    $file: './../../images/';
    #hint{
        margin: 0 auto;
        width: 100%;
        height: 100%;
        min-width: 800px;
        min-height: 800px;
    }
    .hint-bg{
        position: relative;
        width: 100%;
        img{
            width: 100%;
            pointer-events: none;
        }
    }
    .hit-tip{
        $width: 300px;
        position: absolute;
        left: 50%;
        top: 45%;
        width: $width;
        margin-left: -$width / 2;
        text-align: center;
        font-size: 18px;
        color: white;
    }
    .hit-tip__desc{
        margin-bottom: 100px;
    }
    .hit-tip-btn{
        @include flex_center(space-between);
        .hit-tip-btn__button{
            width: 120px;
            height: 40px;
            @include flex_center();
            font-size: 14px;
            border-radius: 4px;
            cursor: pointer;
            background-color: $main-color__light;
            &:hover{
                background-color: lighten($main-color__light, 4%);
            }
        }
    }
</style>

<template>
    <div id="hint">
        <div class="hint-bg">
            <img :src="errimg" alt="">
            <div class="hit-tip">
                <div
                    class="hit-tip__desc">{{errText}}</div>
                <div class="hit-tip-btn">
                    <div
                        @click="store"
                        class="hit-tip-btn__button">媒体商城</div>
                    <div
                        @click="pre"
                        class="hit-tip-btn__button">上一页</div>
                </div>
                
            </div>
        </div>
    </div>

</template>

<script>
    import CONSTANTS from 'constants';
    import ERROR from 'images/error.png';
    const reasons = CONSTANTS.COPYWRITINGS.errorPage.reasons;

    export default {
        data() {
            return {
                errType: 0,
                errimg: ERROR
            };
        },

        computed: {
            errText() {
                return reasons[this.errType] || reasons[0];
            }
        },
        methods: {
            store() {
                this.$router.push({name: 'ad.store'});
            },

            pre() {
                window.history.back();
            }
        },

        mounted() {
            this.errType = this.$route.query.t;
        }
    };
</script>