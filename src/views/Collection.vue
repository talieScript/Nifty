<template>
    <div class="collection">
        <div class="desc-container">
            <h2 class="title">{{collection.Title}}</h2>
            <p class="desc" v-html="collection.Description"></p>
        </div>
        <div class="another-one">
            <div ref="masonary" class="masonary">
                <div class="image-container item" v-for="(picture, index) in collection.Pictures.pictures" :key="index">
                    <collection-image
                        :url="picture.Images[0].url"
                        :title="picture.Title"
                        :windowWidth="windowWidth"
                        @openModal="openModal"
                        @toImagePage="toImagePage"
                        @loaded="loaded"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
     import { toKebabCase } from '../utils.js'
     import CollectionImage from '../components/CollectionImage.vue';
     import Masonry from 'masonry-layout'
    export default {
        name: 'Collection',
        metaInfo() {
            const title = this.collection.Title
            const description = this.collection.Description
            return {
                titleTemplate: `%s | ${title}`,
                meta: [
                    { name: 'description', content: description },
                ]
            }
        },
        data() {
            return {
                activePicture: {},
                modal: false,
                msnry: undefined,
            }
        },
        components: {
            CollectionImage,
        },
        props: {
            collection: {
                type: Object,
                requied: true,
            },
            windowWidth: {
                type: Number,
                requied: true,
            }
        },
        watch: {
            collection(val) {
                if(val) {
                    this.$emit('activeCollectionChange', toKebabCase(this.collection.Title))
                }
            }
        },
        mounted () {
            console.log(this.collection)
            this.$emit('activeCollectionChange', toKebabCase(this.collection.Title));
            this.msnry = new Masonry( this.$refs.masonary, {
                itemSelector: '.item',
                gutter: 25,
                percentPosition: true,
                fitWidth: true,
            })
            console.log(this.msnry)
        },
        beforeDestroy() {
            this.$emit('showCollectionTabs', false),
            this.timeout = false;
        },
        methods: {
            openModal(title) {
                const picture = this.collection.Pictures.pictures.find(picture => picture.Title === title);
                this.$emit('openModal', picture)
            },
            toImagePage(title) {
                const path =
                    `/collections/${toKebabCase(this.collection.Title)}/${toKebabCase(title)}`;
                this.$router.push({ path });
            },
            loaded() {
                this.msnry.reloadItems();
                this.msnry.layout();
            }
        },
    }
</script>

<style lang="scss" scoped>
    .masonary {
        margin: 0 auto;
    }
    .collection {
        width: 100%;
        padding-top: 30px;

        @media only screen and (min-width: 1000px) {
            margin-top: 40px;
        }
        @media only screen and (max-width: 1000px) {
            padding-top: 20px;
        }
    }
    .desc-container {
        margin: 10px 50px;
    }
    .title {
      font-size: 25px;
      line-height: 23px;
      @media only screen and (max-width: 75em) {
          font-size: 19px;
          line-height: 17px;
      }
    }
    .desc {
        font-size: 18px;
        line-height: 23px;
        @media only screen and (max-width: 75em) {
            font-size: 14px;
            line-height: 17px;
        }
    }
    .container {
        margin: 0 auto;
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
    .gutter-sizer {
        width: 3vw;
        @media only screen and (max-width: 75em) {
            width: 3vw;
        };
        @media only screen and (max-width: 56.25em) {
            width: 50px
         };
    }
    .another-one {
        width: 90%;
        margin: 0 auto;
    }

</style>