<template>
    <div>
        <div v-if="!loading" class="swiper-container">
            <div class="swiper-wrapper">
                <div
                    v-for="(picture, index) in sliderPics"
                    :key="picture.id"
                    class="swiper-slide"
                >
                    <div class="slider-img-card">
                        <img
                            class="slider-img"
                            :src="getPicUrl(picture)"
                        >
                        <transition name="fade">
                            <p v-if="index + 1 === activeSlide + 1" class="slider-caption">
                                {{ picture.Title }}
                                <md-button class="md-dense md-accent">
                                    See More <md-icon>chevron_right</md-icon>
                                </md-button>
                            </p>
                        </transition>
                    </div>
                </div>
            </div>
            <!-- Add Arrows -->
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { API, IMAGE_URL } from '../API.ts'

    export default Vue.extend({
        name: 'Home',
        components: {
        },
        data() {
            return {
                swiper: null,
                loading: true,
                data: {},
                loaded: false,
                activeSlide: 0
            }
        },
        methods: {
            getData() {
                if(!this.loaded) {
                    API.get('/home-page')
                        .then(res => {
                            this.data = res.data
                            this.loading = false;
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
            },
            getPicUrl(picObj) {
                const path = picObj.Image.url;
                return `${IMAGE_URL}${path}`;
            },
        },
        watch: {
            async sliderPics(val) {
                if(val && !this.loaded) {
                    setTimeout(() => {
                        this.swiper = new window.Swiper('.swiper-container', {
                            slidesPerView: 'auto',
                            centeredSlides: true,
                            navigation: {
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            },
                            autoplay: {
                                delay: 10000,
                            },
                        });
                     }, 10)
                    setTimeout(() => {
                        this.swiper.on('slideChange', () => {
                            this.activeSlide = this.swiper.realIndex
                        });
                    }, 20)
                }
            }
        },
        computed: {
            sliderPics() {
                return this.data.slider ? this.data.slider.pictures : null;
            }
        },
        mounted () {
            this.getData()
        },
    })
</script>

<style lang="scss" scoped>
    .swiper-container {
        width: 100vw;
        height: 80vh;
        background-color:  #EEEEEE;
    }
    .slider-img {
        box-shadow: -1px 4px 5px 1px rgba(0,0,0,0.30);
        max-height: 90%;

    }
    .swiper-slide {
        display: flex;
        justify-content: center;
        align-items: center;
        width: fit-content;
    }

    .swiper-button-next, .swiper-button-prev {
        color: #2F89A0;
    }

    .slider-caption {
        display: flex;
        align-items: center;
        justify-content: space-between;
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
