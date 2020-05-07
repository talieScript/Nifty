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
                    <silder-image
                        :picture="picture"
                        :active="activeSlide === index"
                        :collection="toKebabCase(findCollection(picture.picture_collection).Title)"
                        @changeActiveCollection="changeActiveCollection"
                    />
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
    import { API } from '../API.ts';
    import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
    import { toKebabCase } from '../utils.js';
    import SilderImage from '../components/SliderImage.vue'


    export default Vue.extend({
        name: 'Home',
        metaInfo() {
            return {
                titleTemplate: '%s | Home',
                meta: [
                    { name: 'description', content: 'Nifty Art Gallery is the working studio and gallery of Nigel Emery.' },
                ]
            }
        },
        props: {
            collections: {
                type: Array,
                required: true,
            }
        },
        components: {
            SilderImage,
        },
        data() {
            return {
                swiper: null,
                loading: true,
                data: {},
                loaded: false,
                activeSlide: 0,
                toKebabCase,
                loadedImages: {}
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
            findCollection(id) {
                return this.collections.find(collection => collection.id == id);
            },
            changeActiveCollection(collection) {
                this.$emit('activeCollectionChange', collection)
            }
        },
        watch: {
            async sliderPics(val) {
                console.log(val)
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
                            mousewheel: {
                                invert: true,
                            },
                        });
                     }, 10)
                    setTimeout(() => {
                        this.swiper.on('slideChange', () => {
                            this.activeSlide = this.swiper.realIndex
                        });
                    }, 20)
                    // create object with false values
                    // set event listener to set value to true  when finnished loading
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
        color: #5d5b6a;

        h1 {
            font-size: 25px;
            color: #5d5b6a
        }

        p {
            font-size: 15px;
            line-height: 23px
        }
    }
    .swiper-slide {
        display: flex;
        justify-content: center;
        align-items: center;
        width: fit-content;
    }
    .heading {
        margin: 0;
        color: #5d5b6a;
        line-height: 25px;
    }
    .recent-additions {
        font-size: 25px;
        text-align: center;
        color: #5d5b6a;
    }
    .swiper-container {
        width: 100%;
        height: 60vh;
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
</style>
