<template>
    <div class="picture">
        <!-- <collection-image
            :src="getPicUrl(picture.Image.url)"
            title=""
            :windowWidth="0"
        /> -->
        {{ picture }}
        {{ getPicUrl }}
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    // import CollectionImage from '../components/CollectionImage.vue';
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
            // CollectionImage,
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
        }
    })
</script>

<style lang="scss" scoped>
    .picture {
        width: 100%;
        padding-top: 60px;

        @media only screen and (min-width: 1000px) {
            margin-top: 40px;
        }
        @media only screen and (max-width: 1000px) {
            padding-top: 20px;
        }
    }
</style>