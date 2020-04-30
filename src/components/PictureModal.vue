<template>
    <transition name="fade">
        <div @click="$emit('close')" v-if="picture" class="container">
            <img
                class="image"
                :src="getPicUrl(picture.Image.url)"
                :alt="picture.Title"
                @click="nothing"
                v-on:click.stop
            >
        </div>
    </transition>
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
        methods: {
            nothing() {
                console.log('nothing')
            }
        },
        created () {
            document.addEventListener('keydown', (event) => {
                if(event.key === "Escape"){
                    this.$emit('close')
                }
            });
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
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .image {
        height: 75%;
    }
    .fade-delay-enter-active, .fade-delay-leave-active {
        transition: opacity .3s;
    }
</style>