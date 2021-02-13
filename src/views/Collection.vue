<template>
    <div class="collection">
        <div class="desc-container">
            <h2 class="title">{{collectionData.Title}}</h2>
            <p class="desc" v-html="collectionData.Description"></p>
        </div>
        <div class="another-one">
            <div ref="masonary" class="masonary">
                <div class="image-container item" v-for="(picture, index) in collectionData.Pictures.pictures" :key="index">
                    <collection-image
                        :url="picture.Images[0].url"
                        :title="picture.Title"
                        :windowWidth="windowWidth"
                        :collection="picture.collection"
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
import Masonry from 'masonry-layout';
import { API } from '../API.ts'
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
        }
    },
    components: {
        CollectionImage,
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
                await this.getcollectionData()
                this.msnry.reloadItems();
                this.msnry.layout();
            },
        }
    },
    computed: {
        collectionId() {
            const id = this.$store.state.activeCollection;
            return id;
        }
    },
    mounted () {
        this.msnry = new Masonry( this.$refs.masonary, {
            itemSelector: '.item',
            gutter: 25,
            percentPosition: true,
            fitWidth: true,
        });
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
        async getcollectionData() {
            await API.get(`/collections/${this.collectionId}`)
                .then((res) => {
                    this.collectionData = res.data
                    console.log(this.collectionData.Pictures.pictures)
                })
        },
        loaded() {
            // this.msnry.reloadItems();
            // this.msnry.layout();
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

</style>