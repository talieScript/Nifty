<template>
    <div class="picture">
        <md-button @click="toPicturePage" @click.stop class="md-accent back-btn">
            <md-icon class="overlay-icon">keyboard_backspace</md-icon> Back to collection
        </md-button>
        <div class="image">
            <collection-image
                :url="picture.Image.url"
                :title="picture.Title"
                :windowWidth="0"
            />
        </div>
        <div class="infomation">
            {{ picture }}
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import CollectionImage from '../components/CollectionImage.vue';
    import { toKebabCase, getPicUrl } from '../utils.js'

    export default Vue.extend({
        name: 'Picture',
        data() {
            return {
                picture: {},
                getPicUrl
            }
        },
        components: {
            CollectionImage,
        },
        props: {
            collections: {
                type: Array,
                required: true,
            }
        },
        mounted() {
            const splitRoute = this.$router.currentRoute.path.split('/');
            const collection = this.collections.find(collection => {
                return toKebabCase(collection.Title.toLowerCase()) === splitRoute[splitRoute.length - 2]
            })
            this.$emit(
                'activeCollectionChange',
                toKebabCase(collection.Title)
            )
            this.$emit('showCollectionTabs', true)
            const picture = collection.pictures.find(picture => {
                return toKebabCase(picture.Title.toLowerCase()) === splitRoute[splitRoute.length - 1]
            })
            this.picture = picture;
            console.log(picture)
        }
    })
</script>

<style lang="scss" scoped>
    .picture {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 100%;
        width: 100%;
        padding-top: 60px;

        @media only screen and (min-width: 1000px) {
            margin-top: 40px;
        }
        @media only screen and (max-width: 1000px) {
            padding-top: 20px;
        }
    }
    .back-btn {
        position: absolute;
        top: 120px;
         @media only screen and (max-width: 1000px) {
           top: 50px;
         }
    }
    .image {
        position: relative;
        width: 40%;
        margin-right: 0;
        margin-left: 20px;
    }
    .infomation {
        width: 45%;
        margin-left: 25px;
    }
</style>