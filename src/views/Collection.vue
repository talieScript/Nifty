<template>
    <div class="collection">
        <div v-masonry="containerId" fit-width stamp=".desc" :collumn-width="20" :gutter="10" class="picture-container" transition-duration="0.3s" item-selector=".item">
            <div class="desc-container">
                <h2 class="title">{{collection.Title}}</h2>
                <p class="desc" v-html="collection.Description"></p>
            </div>
            <div v-masonry-tile class="item" v-for="(picture, index) in collection.pictures" :key="index">
                <img
                    class="image"
                    :src="getPicUrl(picture.Image.url)"
                >
            </div>
        </div>
    </div>
</template>

<script>
    import { getPicUrl } from '../utils.ts'
    export default {
        name: 'Collection',
        data() {
            return {
                getPicUrl
            }
        },
        props: {
            collection: {
                type: Object,
                requied: true,
            },
        },
    }
</script>

<style lang="scss" scoped>
    .collection {
        padding-top: 20px;

        @media only screen and (min-width: 1000px) {
            margin-top: 50px;
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
    }
    .title {
      font-size: 25px;
      line-height: 23px;
    }
    .desc {
        font-size: 18px;
        line-height: 23px
    }
    .picture-container {
        padding-left: 15px;
        @media only screen and (max-width: 75em) {
            padding-left: 7px;
        }
    }
    .image {
        box-shadow: -1px 4px 5px 1px rgba(0,0,0,0.30);
        max-height: 90%;
        border-radius: 5px;
        width: 24vw;
        margin-bottom: 10px;
        @media only screen and (max-width: 75em) {
            width: 32vw;
        };
    }
</style>