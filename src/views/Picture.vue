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
           <h2>{{ picture.Title }}</h2>
            <p class="description" v-html="parsedDescription"></p>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import CollectionImage from '../components/CollectionImage.vue';
    import { toKebabCase, getPicUrl } from '../utils.js';
    import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
    import { API } from '../API.ts'

    export default Vue.extend({
        name: 'Picture',
        data() {
            return {
                picture: {},
                getPicUrl,
                collection: {},
                description: ''
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
        },
        created() {
             API.get('/picture-description')
            .then(res => {
                this.description = res.data.Description;
            })
            .catch(err => console.log(err))
        },
        methods: {
            back() {
                this.$router.push('/collections/' + toKebabCase(this.collection.Title))
            }
        },
        computed: {
            parsedDescription() {
                if (this.description.length){
                    const splitContent = this.description.split("\n");
                    const doc = {
                        nodeType: 'document',
                        content: splitContent.map(para => {
                            return {
                                nodeType: 'paragraph',
                                content: [{
                                    nodeType: 'text',
                                    value: para,
                                    marks: []
                                }]
                            }
                        })
                    }
                    return documentToHtmlString(doc)
                }
                return '';
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
        padding-top: 60px;
        color: rgb(145, 145, 145);

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
        display: flex;
        flex-direction: column;
        width: 50%;
        margin-left: 25px;
    }
</style>