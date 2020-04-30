<template>
    <div @click="$emit('close')" v-if="picture" class="container">
        <!-- <img
            class="image"
            :src="getPicUrl(picture.Image.url)"
            :alt="picture.Title"
        > -->
    </div>
</template>

<script>
    import Vue from 'vue'
    import { getPicUrl } from '../utils.ts';

    export default Vue.extend({
         name: 'PictureModal',
        props: {
            picture: {
                type: Object,
                default: null,
            }
        },
        data() {
            return {
                getPicUrl,
            }
        },
    })
</script>

<style lang="scss" scoped>
    .container {
        z-index: 9999999;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,0.5);
        height: 100%;
        width: 100%;
    }
</style>