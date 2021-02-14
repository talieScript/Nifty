<template>
    <div class="artist">
        <img
            class="mug-shot"
            :src="mugShotUrl"
        >
        <p class="content" v-html="parsedContent"></p>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { API } from '../API.ts'
    import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
    import { getPicUrl } from '../utils.js'


    export default Vue.extend({
        name: 'Artist',
        metaInfo: {
            titleTemplate: '%s | Nigel Emery',
        },
        data() {
            return {
                header: '',
                content: '',
                mugShotUrl: '',
                getPicUrl
            }
        },
        created () {
            API.get('/artist-page')
                .then(res => {
                   this.content = res.data.Content;
                   this.header = res.data.Header;
                   this.mugShotUrl = getPicUrl(res.data.Mug_Shot.url);
                })
                .catch(err => console.log(err))
        },
        mounted () {
            this.$store.commit('setShowCollectionTabs', false);
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
            }
        }
    })
</script>

<style scoped>
.artist {
    text-align: left;
    background: #F0F3F4;
}
.content {
    margin: 0;
    padding: 20px;
    font-size: 20px;
    line-height: 25px;
}

.mug-shot {
    box-shadow: -1px 4px 5px 1px rgba(0,0,0,0.30);
    float: left;
    margin: 30px 15px 15px 20px;
    width: 30vw;
    float: right;
    height: auto;
    border-radius: 5px;
}
</style>