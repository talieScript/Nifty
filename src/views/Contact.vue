<template>
    <div class="contact">
        <h1 class="h1">Contact Us</h1>
        <img
            class="gallery-image"
            :src="imageUrl"
        >
        <p v-html="parsedContent" class="content"></p>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { getPicUrl } from '../utils.ts'
    import { API } from '../API.ts'
    import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

    export default Vue.extend({
        name: 'Contact',
        data() {
            return {
                content: '',
                imageUrl: '',
            }
        },
        created() {
            API.get('/contact-page')
                .then(({data}) => {
                    this.content = data.content;
                    console.log(data)
                    this.imageUrl = getPicUrl(data.Picture.url)
                })
        },
        computed: {
            parsedContent() {
                if (this.content){
                    const splitContent = this.content.split("\n");
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
            },
        },
    })
</script>

<style lang='scss' scoped>
    .contact {
        padding: 16px;
        text-align: left;
        background: #F0F3F4;
    }
    .gallery-image {
        box-shadow: -1px 4px 5px 1px rgba(0,0,0,0.30);
        float: left;
        margin: 30px 15px 15px 20px;
        width: 30vw;
        float: right;
        height: auto;
        border-radius: 5px;
    }
    .h1 {
        margin: 0;
        padding: 30px 0px 0px 20px;
        font-size: 35px;
    }
    .content {
        margin: 0;
        padding: 20px;
        font-size: 20px;
        line-height: 25px;
       @media only screen and (max-width: 56.25em) {
           font-size: 15px;
            line-height: unset;
        };
    }
</style>