<template>
    <div>
        <div v-if="!loading" class="swiper-container">
            <div class="swiper-wrapper">
                <div
                    v-for="picture in sliderPics"
                    :key="picture.id"
                    class="swiper-slide"
                    :style="`width: ${getImgWidth(picture.id)}`"
                >
                    <img
                        :id="`img-${picture.id}`"
                        class="slider-img"
                        :src="getPicUrl(picture)"
                    >
                    <p class="slider-caption">text here</p>
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
            getImgWidth(img) {
                console.log(document.getElementById(`img-${img}`))
            }
        },
        watch: {
            sliderPics(val) {
                if(val && !this.loaded) {
                    console.log(val)
                    setTimeout(() => {
                        this.swiper = new window.Swiper('.swiper-container', {
                            slidesPerView: 'auto',
                            centeredSlides: true,
                            spaceBetween: 30,
                            // Navigation arrows
                            navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                            autoplay: {
                                delay: 5000,
                            },
                            },
                        });
                     }, 10)
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
        // width: 100%;
        max-height: 90%;
        box-shadow: -1px 4px 5px 1px rgba(0,0,0,0.30);
    }
    .swiper-slide {
        display: flex;
        justify-content: center;
        align-items: center;
        width: fit-content;
    }

    .slider-caption {

    }

</style>
