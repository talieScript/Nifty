<template>
    <div class="picture">
        <div class="image">
            <md-button @click="back" @click.stop class="md-accent back-btn">
                <md-icon class="overlay-icon">keyboard_backspace</md-icon> Back to collection
            </md-button>
            <collection-image
                :url="picture.Image.url"
                :title="picture.Title"
                :windowWidth="0"
                :picturePage="true"
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
                getPicUrl,
                collection: {}
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
            this.collection = this.collections.find(collection => {
                return toKebabCase(collection.Title.toLowerCase()) === splitRoute[splitRoute.length - 2]
            })
            this.$emit(
                'activeCollectionChange',
                toKebabCase(this.collection.Title)
            )
            this.$emit('showCollectionTabs', true)
            const picture = this.collection.pictures.find(picture => {
                return toKebabCase(picture.Title.toLowerCase()) === splitRoute[splitRoute.length - 1]
            })
            this.picture = picture;
            console.log(picture)
        },
        methods: {
            back() {
                this.$router.push('/collections/' + toKebabCase(this.collection.Title))
            }
        },
    })
</script>

<style lang="scss" scoped>
    .picture {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 100%;
        width: 100%;
        padding: 40px;

        @media only screen and (min-width: 1000px) {
            // margin-top: 40px;
        }
        @media only screen and (max-width: 1000px) {
            padding-top: 20px;
        }
    }
    .back-btn {
        position: absolute;
        top: 0;
    }
    .image {
        padding-top: 50px;
        position: relative;
        width: 50%;
        margin-right: 0;
    }
    .infomation {
        width: 50%;
        margin-left: 25px;
    }
</style>