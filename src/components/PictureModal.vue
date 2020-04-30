<template>
    <transition name="fade">
        <div @click="$emit('close')" v-if="picture" class="container">
            <div class="image-card">>
                <img
                    class="image"
                    :src="getPicUrl(picture.Image.url)"
                    :alt="picture.Title"
                    v-on:click.stop
                >
                <div class="caption">
                    <span>{{picture.Title}}</span>
                    <md-button @click="toPicturePage" v-on:click.stop class="md-accent md-raised caption-btn">
                        See options
                    </md-button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import Vue from 'vue'
    import { getPicUrl } from '../utils.ts';
    import { toKebabCase } from '../utils.js';

    export default Vue.extend({
         name: 'PictureModal',
        props: {
            picture: {
                type: Object,
                default: null,
            },
            collections: {
                type: Array,
                required: true,
            }
        },
        data() {
            return {
                getPicUrl,
            }
        },
        methods: {
            toPicturePage() {
                const collection = this.collections.find(collection => collection.id == this.picture.collection);
                const path =
                    `/collections/${toKebabCase(collection.Title)}/${toKebabCase(this.picture.Title)}`;
                this.$emit('close');

                this.$router.push({ path, props: this.picture });
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
        background-color: rgba(0,0,0,0.65);
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 30px 0;
    }
    .image-card {
        display: flex;
        width: fit-content;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .image {
        height: 60%;
        border-radius: 5px;
        @media only screen and (max-width: 45em) {
            width: 100%;
            height: auto;
         };
    }
    .caption {
        color: #F0F3F4;
        font-size: 28px;
        margin-top: 30px;
        width: 100%;
        position: relative;
        text-align: center;
    }
    .caption-btn {
        color: #F0F3F4;
        position: absolute;
        right: 0;
        top: 0;
        margin-top: -10px;
    }
    .fade-delay-enter-active, .fade-delay-leave-active {
        transition: opacity .3s;
    }
</style>