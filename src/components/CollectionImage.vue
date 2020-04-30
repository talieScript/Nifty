<template>
    <div class="image-card">
        <ImageSkeletonLoader
            :show="loading"
            class="loader"
        />
        <div @click="$emit('openModal', title)" class="expand-icon">
            <md-icon class="overlay-icon">fullscreen</md-icon>
            <md-tooltip md-direction="bottom">Fullscreen</md-tooltip>
        </div>
        <img
            class="image"
            :src="getPicUrl(url)"
            :alt="title"
            ref="image"
            :style="`display: ${loading ? 'none' : 'block'}`"
        >
        <p class="caption">
            {{ title }}
        </p>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { getPicUrl } from '../utils.ts';
    import ImageSkeletonLoader from './ImageSkeletonLoader.vue'

    export default Vue.extend({
        name: 'CollectionImage',
        components: {
            ImageSkeletonLoader,
        },
        props: {
            url: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
        },
        data() {
            return {
                getPicUrl,
                loading: true,
                imageHeight: 0,
            }
        },
        mounted() {
            this.$refs.image.addEventListener('load', () => {
                this.loading = false;
                this.imageHeight = this.$refs.image.height;
            });
        },
    })
</script>

<style lang="scss" scoped>
    .image {
        box-shadow: -1px 4px 5px 1px rgba(0,0,0,0.30);        border-radius: 5px;
        width: 100%;
        display: none;
        transition: all .5s;
        cursor: pointer;
        position: relative;
        &:hover {
            filter: brightness(75%);
        }
    }
    .expand-icon:hover ~ .image {
        filter: brightness(75%);
    }
    .expand-icon {
        z-index: 1;
        position: absolute;
        right: 5px;
        bottom: 55px;
        i {
            color: rgba(255, 255, 255, 0.7) !important;
            cursor: pointer;
            font-size: 35px !important;
        }
    }
    .image:hover ~ .expand-icon {
        opacity: 0;
    }
    .caption {
        text-align: center;
        width: 80%;
        margin: 0 auto;
        padding: 15px  25px;
    }
    .loader {
        height: 24vw;
        @media only screen and (max-width: 75em) {
            height: 32vw;
        };
        @media only screen and (max-width: 56.25em) {
            height: 40vw
        };
    }
</style>