<template>
    <div class="collection">
        <div v-if="timeout" v-masonry fit-width stamp=".desc" :collumn-width="20" :gutter="10" class="container" transition-duration="0.3s" item-selector=".item">
            <div class="desc-container">
                <h2 class="title">{{collection.Title}}</h2>
                <p class="desc" v-html="collection.Description"></p>
            </div>
            <div v-masonry-tile class="image-container item" v-for="(picture, index) in collection.pictures" :key="index">
                <img
                    class="image"
                    :src="getPicUrl(picture.Image.url)"
                    :alt="picture.Title">
                <p class="caption">
                    {{ picture.Title }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import { getPicUrl } from '../utils.ts'
     import { toKebabCase } from '../utils.js'
    export default {
        name: 'Collection',
        data() {
            return {
                getPicUrl,
                timeout: false,
            }
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
        created () {
            setTimeout(() => {
                this.timeout = true;
            }, 200)
        },
        beforeDestroy() {
            this.$emit('closeCollections'),
            this.timeout = false;
        }
    }
</script>

<style lang="scss" scoped>
    .collection {
        padding-top: 60px;

        @media only screen and (min-width: 1000px) {
            margin-top: 40px;
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
        padding-left: 15px;
        @media only screen and (max-width: 75em) {
            padding-left: 7px;
        }

    }
    .image-container {
        margin-bottom: 10px;
        width: 24vw;
        position: absolute;
        @media only screen and (max-width: 75em) {
            width: 32vw;
        };
        @media only screen and (max-width: 56.25em) {
            width: 40vw
         };
    }
    .image {
        box-shadow: -1px 4px 5px 1px rgba(0,0,0,0.30);        border-radius: 5px;
        width: 100%;
    }
    .caption {
        // text-align: center;
        width: 80%;
        margin: 0 auto;
        border-bottom: 2px #ADADAD solid;
        padding: 15px  25px;
    }
</style>