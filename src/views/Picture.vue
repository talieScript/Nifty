<template>
    <div>
        <!-- <collection-image
            url=""
            title=""
            :windowWidth="0"
        /> -->
        {{ picture }}
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    // import CollectionImage from '../components/CollectionImage.vue';
    import { toKebabCase } from '../utils.js'

    export default Vue.extend({
        name: 'Picture',
        data() {
            return {
                picture: {}
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
        created() {
            console.log('here')
            const splitRoute = this.$router.currentRoute.path.split('/');
            const collection = this.collections.find(collection => {
                return toKebabCase(collection.Title.toLowerCase()) === splitRoute[splitRoute.length - 2]
            })
            this.$emit(
                'activeCollectionChange',
                toKebabCase(collection.Title)
            )
            const picture = collection.pictures.find(picture => {
                return toKebabCase(picture.Title.toLowerCase()) === splitRoute[splitRoute.length - 1]
            })
            this.picture = picture;
        }
    })
</script>

<style scoped>

</style>