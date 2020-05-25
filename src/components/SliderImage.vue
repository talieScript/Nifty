<template>
       <div class="slider-img-card">
            <image-skeleton-loader
                class="loader"
                :show="loading"
            />
            <img
                class="slider-img"
                :src="getPicUrl(picture.Images[0].url)"
                :alt="picture.Title"
                ref="image"
                :style="`display: ${loading ? 'none' : 'block'}`"
            >
            <transition name="fade">
                <div v-if="active && !loading" class="slider-caption">
                    <p>
                        {{ picture.Title }}
                    </p>
                    <md-button
                        @click="toPicture"
                        class="md-dense md-accent">
                        See More <md-icon>chevron_right</md-icon>
                    </md-button>
                </div>
            </transition>
        </div>
</template>

<script>
    import ImageSkeletonLoader from '../components/ImageSkeletonLoader.vue';
    import { getPicUrl } from '../utils.js';
    import { toKebabCase } from '../utils.js';

    export default {
        name: 'SilderImage',
        components: {
            ImageSkeletonLoader,
        },
       props: {
            picture: {
                type: Object,
                required: true
            },
            active: {
                type: Boolean,
                required: true
            },
            collection: {
                type: String,
                required: true
            }
        },
        methods: {
            toPicture() {
                this.$emit('toPicturePage', this.picture)
            }
        },
        data() {
            return {
                loading: true,
                getPicUrl,
                toKebabCase
            }
        },
        mounted () {
            this.$refs.image.addEventListener('load', () => {
                this.loading = false;
            });
        },
    }
</script>

<style lang="scss" scoped>
    .loader {
        height: 60vh;
        width: 60vh;
    }
    .slider-img {
        box-shadow: -1px 4px 5px 1px rgba(0,0,0,0.30);
        max-height: 90%;
        border-radius: 5px;
    }
    .slider-caption {
        display: flex;
        align-items: center;
        justify-content: space-between;

         p {
             margin: 0;
             color: #5d5b6a
         }
    }
    .slider-img-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 95%;
        padding: 15px;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter-active {
        transition-delay: .2s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>