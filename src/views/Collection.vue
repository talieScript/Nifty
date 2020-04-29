<template>
    <div class="collection">
        <picture-modal
            :pic="activePicture"
            :show="modal"
            @close="closeModal"
        />
        <div class="another-one">
            <div v-masonry percentPosition stamp=".desc" collumn-width=".image-container" gutter=".gutter-sizer" class="container" transition-duration="0.3s" item-selector=".item" stagger="0.03s">
                <div class="desc-container">
                    <h2 class="title">{{collection.Title}}</h2>
                    <p class="desc" v-html="collection.Description"></p>
                </div>
                <div class="gutter-sizer"></div>
                <div v-masonry-tile fit-width="true" class="image-container item" v-for="(picture, index) in collection.pictures" :key="index">
                    <collection-image
                        :url="picture.Image.url"
                        :title="picture.Title"
                        @openModal="openModal"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
     import { toKebabCase } from '../utils.js'
     import CollectionImage from '../components/CollectionImage.vue';
     import PictureModal from '../components/PictureModal.vue';
    //  import PayPal from 'vue-paypal-checkout';
    export default {
        name: 'Collection',
        data() {
            return {
                paypal: {
                    sandbox: 'AaCSLEPU-GZnVGLdovCiCiOrc9LvE7I5UJDM7tGSUmY2L-jx0BFo0h1VP_2w0tLupb59QenPcLPmJC6K',
                    production: '<production client id>'
                },
                activePicture: {},
                modal: false,
            }
        },
        components: {
            CollectionImage,
            // PayPal
            PictureModal,
        },
        props: {
            collection: {
                type: Object,
                requied: true,
            },
        },
        watch: {
            collection(val) {
                if(val) {
                    this.$emit('activeCollectionChange', toKebabCase(this.collection.Title))
                }
            }
        },
        mounted () {
            this.$emit('activeCollectionChange', toKebabCase(this.collection.Title));
        },
        beforeDestroy() {
            this.$emit('closeCollections'),
            this.timeout = false;
        },
        methods: {
            openModal(title) {
                this.activePicture = this.collection.pictures.find(picture => picture.Title === title);
                this.modal = true;
                console
            },
            closeModal() {
                this.modal = false;
            }
        },
    }
</script>

<style lang="scss" scoped>
    .collection {
        width: 100%;
        padding-top: 60px;

        @media only screen and (min-width: 1000px) {
            margin-top: 40px;
        }
        @media only screen and (max-width: 1000px) {
            padding-top: 20px;
        }
    }
    .desc-container {
        position: absolute;
        width: 24vw;
        padding: 0 2vw;
        margin: 0 auto;
        margin-bottom: 10px;
        @media only screen and (max-width: 75em) {
            width: 30vw;
        }
        @media only screen and (max-width: 56.25em) {
             width: 40vw;
        }
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
        // padding-left: 10vw;
        // @media only screen and (max-width: 56.25em) {
        //     padding-left: 8vw;
        // }
        margin: 0 auto;
    }
    .image-container {
        margin: 0 auto;
        margin-bottom: 10px;
        width: 20vw;
        position: absolute;
        @media only screen and (max-width: 75em) {
            width: 32vw;
        };
        @media only screen and (max-width: 56.25em) {
            width: 40vw
         };
    }
    .gutter-sizer {
        width: 3vw;
        @media only screen and (max-width: 75em) {
            width: 8vw;
        };
        @media only screen and (max-width: 56.25em) {
            width: 3vw
         };
    }
    .another-one {
        width: 90%;
        margin: 0 auto;
    }

</style>