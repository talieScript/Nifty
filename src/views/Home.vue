<template>
    <div class="home">
        <div class="nifty-header">
            <h1 class="heading">{{data.Heading}}</h1>
            <p v-html="into"></p>
        </div>
        <h3 class="recent-additions">Recent Additions</h3>
        <div class="masonary-wrapper">
            <div ref="masonary" class="masonary">
                <div class="image-container item" v-for="(picture, index) in sliderPics" :key="index">
                    <collection-image
                        :url="picture.Images[0].url"
                        :title="picture.Title"
                        :windowWidth="windowWidth"
                        :collection="picture.picture_collection || ''"
                        @loaded="imageLoaded"
                        @openModal="openModal"
                        @toImagePage="openModal"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { API } from '@/API.ts';
    import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
    import { toKebabCase } from '@/utils.js';
    import CollectionImage from '../components/CollectionImage.vue';
    import Masonry from 'masonry-layout'

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
            windowWidth: {
                type: Number,
                required: true,
            }
        },
        components: {
            CollectionImage
        },
        data() {
            return {
                swiper: null,
                loading: true,
                data: {},
                loaded: false,
                activeSlide: 0,
                toKebabCase,
                loadedImages: {},
                msnry: undefined,
            }
        },
        methods: {
            toImagePage(title) {
                const path =
                    `/collections/${toKebabCase(this.collection.Title)}/${toKebabCase(title)}`;
                this.$router.push({ path });
            },
            openModal(title) {
                const picture = this.sliderPics.find(picture => picture.Title === title);
                this.$emit('openModal', picture)
            },
            imageLoaded() {
                this.msnry.reloadItems();
                this.msnry.layout();
            },
            getPicureCollection(picture) {
                console.log(picture.picture_collection);
                return toKebabCase(this.findCollection(picture.picture_collection).Title)
            },
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
        },
        computed: {
            collections() {
                return this.store.state.collections
            },
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
            this.msnry = new Masonry( this.$refs.masonary, {
                itemSelector: '.item',
                gutter: 25,
                percentPosition: true,
                fitWidth: true,
            });
            setTimeout(() => {
                this.msnry.layout()
            }, 1000)
        },
    })
</script>

<style lang="scss" scoped>
    .home {
        padding-top: 10px;
        background-color: blue($color: #000000);
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
     .gutter-sizer {
        width: 3vw;
        @media only screen and (max-width: 75em) {
            width: 3vw;
        };
        @media only screen and (max-width: 56.25em) {
            width: 50px
         };
    }
      .image-container {
        margin: 0 auto;
        margin-bottom: 10px;
        width: 27vw;
        position: absolute;
        @media only screen and (max-width: 75em) {
            width: 42vw;
        };
        @media only screen and (max-width: 56.25em) {
            width: 80vw
         };
    }
    .masonary-wrapper {
        width: 90%;
        margin: 0 auto;
    }
</style>
