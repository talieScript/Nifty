<template>
    <div class="home">
        <div class="nifty-header">
            <h1 class="heading">{{data.Heading}}</h1>
            <p v-html="into"></p>
        </div>
        <h3 class="recent-additions">Recent Additions</h3>
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
                            :src="getPicUrl(picture.Image.url)"
                        >
                        <transition name="fade">
                            <div v-if="index === activeSlide" class="slider-caption">
                                <p>
                                    {{ picture.Title }}
                                </p>
                                <md-button class="md-dense md-accent">
                                    See More <md-icon>chevron_right</md-icon>
                                </md-button>
                            </div>
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
    import { getPicUrl } from '../utils.ts'
    import { API } from '../API.ts'
    import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

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
                activeSlide: 0,
                getPicUrl
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
        },
        watch: {
            async sliderPics(val) {
                if(val && !this.loaded) {
                    setTimeout(() => {
                        this.swiper = new window.Swiper('.swiper-container', {
                            slidesPerView: 'auto',
                            centeredSlides: true,
                            speed: 1000,
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
            },
            into() {
                if (this.data.Intro){
                    const splitContent = this.data.Intro.split("\n");
                    const doc = {
                        nodeType: 'document',
                        content: splitContent.map(para => {
                            return {
                                nodeType: 'paragraph',
                                content: [{
                                    nodeType: 'text',
                                    value: para,
                                    marks: []
                                }]
                            }
                        })
                    }
                    return documentToHtmlString(doc)
                }
                return '';
            },
        },
        mounted () {
            this.getData()
        },
    })
</script>

<style lang="scss" scoped>
    .home {
        padding-top: 10px;
        background-color: #F0F3F4;
    }
    .nifty-header {
        padding: 30px 25px;
        width: 98%;
        margin: 25px auto;
        border-top: solid #222831 1px;
        border-bottom: solid 1px #222831;

        h1 {
            font-size: 25px;
        }

        p {
            font-size: 15px;
            line-height: 23px
        }
    }
    .heading {
        margin: 0;
        color: #222831;
        line-height: 25px;
    }
    .recent-additions {
        font-size: 25px;
        text-align: center;
    }
    .swiper-container {
        width: 100%;
        height: 60vh;
    }
    .slider-img {
        box-shadow: -1px 4px 5px 1px rgba(0,0,0,0.30);
        max-height: 90%;
        border-radius: 5px;
    }
    .swiper-slide {
        display: flex;
        justify-content: center;
        align-items: center;
        width: fit-content;
    }

    .swiper-button-next, .swiper-button-prev {
        color: #222831;
        border-radius: 5px;
        height: 60px;
        margin-top: calc(-1 * 60px/ 2);
        transition: background-color .5s;
        &:hover {
            background-color: rgba(#F0F3F4, .4);
        }
    }

    .slider-caption {
        display: flex;
        align-items: center;
        justify-content: space-between;

         p {
             margin: 0;
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
