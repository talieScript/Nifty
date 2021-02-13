<template>
    <div class="collection">
        <div class="desc-container">
            <h2 class="title">{{collectionData.Title}}</h2>
            <p class="desc" v-html="collectionData.Description"></p>
        </div>
        <spinner v-if="loading" />
        <div v-else class="another-one">
            <div ref="masonary" class="masonary">
                <div class="image-container item" v-for="(picture, index) in collectionData.Pictures.pictures" :key="index">
                    <collection-image
                        :url="picture.Images[0].url"
                        :title="picture.Title"
                        :collection="picture.picture_collection"
                        @loaded="loaded"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CollectionImage from '../components/CollectionImage.vue';
import Masonry from 'masonry-layout';
import { API } from '../API.ts'
import Spinner from '../components/Spinner.vue'
export default {
    name: 'Collection',
    metaInfo() {
        const title = this.collectionData.Title
        const description = this.collectionData.Description
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
            collectionData: {},
            loading: false,
        }
    },
    components: {
        CollectionImage,
        Spinner
    },
    props: {
        windowWidth: {
            type: Number,
            required: true,
        }
    },
    watch: {
        collectionId: {
            immediate: true,
            async handler() {
                this.loading = true;
                await this.getCollectionData()
                this.loading = false;
                setTimeout(() => {
                    this.msnry = new Masonry( this.$refs.masonary, {
                        itemSelector: '.item',
                        gutter: 25,
                        percentPosition: true,
                        columnWidth: 0,
                        fitWidth: true,
                    });
                    this.msnry.reloadItems();
                    this.msnry.layout();
                }, 100)
                const noCollectionPics = this.collectionData.Pictures.pictures.filter(pic => {
                    return !pic.picture_collection
                })
                console.log('no collection, fix in admin', noCollectionPics)
            },
        }
    },
    computed: {
        collectionId() {
            const id = this.$store.state.activeCollection;
            return id;
        }
    },
    beforeDestroy() {
        this.$emit('showCollectionTabs', false),
        this.timeout = false;
    },
    methods: {
        async getCollectionData() {
            return await API.get(`/collections/${this.collectionId}`)
                .then((res) => {
                    this.collectionData = res.data
                })
            
        },
        loaded() {
            if (this.msnry) {
                this.msnry.reloadItems();
                this.msnry.layout();
            }
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
    .masonary {
        margin: 0 auto;
    }

</style>