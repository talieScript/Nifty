<template>
    <div>
        <ImageSkeletonLoader
            :show="loading"
            :height="imageHeight"
        />
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
                imageHeight: 0,
                loading: true,
            }
        },
        mounted() {
            const img = document.createElement('img');
            img.src = getPicUrl(this.url)
            console.log(img)
            let poll = setInterval(() => {
                if (img.naturalHeight) {
                    clearInterval(poll);
                    this.imageHeight = Math.floor(img.naturalHeight / 3);
                    console.log(this.imageHeight);
                }
            }, 10)
            this.$refs.image.addEventListener('load', () => {
                this.loading = false;
                img.remove()
            });

        },
    })
</script>

<style scoped>
    .image {
        box-shadow: -1px 4px 5px 1px rgba(0,0,0,0.30);        border-radius: 5px;
        width: 100%;
        display: none;
    }
    .caption {
        text-align: center;
        width: 80%;
        margin: 0 auto;
        border-bottom: 2px #ADADAD solid;
        padding: 15px  25px;
    }
</style>